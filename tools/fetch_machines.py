import os, time, json, urllib.request, urllib.parse

MACHINES_DIR = r'G:\HASAD\hasad-backend\storage\app\public\hasad_machines'
os.makedirs(MACHINES_DIR, exist_ok=True)

JOBS = [
    ("jd_6120m.png", "John Deere tractor"),
    ("kubota_m5091.png", "Kubota tractor"),
    ("claas_lexion.png", "Claas combine harvester"),
    ("nh_cr890.png", "New Holland combine harvester"),
    ("jd_8600i.png", "John Deere forage harvester"),
    ("case_patriot.png", "Case IH Patriot sprayer"),
    ("manitou_mlt.png", "Manitou telehandler"),
    ("jcb_416s.png", "JCB wheel loader"),
    ("krone_tx460.png", "Krone agricultural trailer"),
    ("grimme_se.png", "Grimme potato harvester"),
    ("husqvarna_t600.png", "Husqvarna tiller"),
    ("polaris_ranger.png", "Polaris Ranger UTV"),
    ("lemken_juwel.png", "Lemken plough"),
    ("kuhn_hr4004.png", "Kuhn rotary tiller"),
    ("vaderstad_tempo.png", "Vaderstad Tempo seeder"),
    ("checchi_wolf.png", "Checchi Magli transplanter"),
    ("amazone_ux.png", "Amazone sprayer"),
    ("rauch_axis.png", "Rauch fertilizer spreader"),
    ("krone_easycut.png", "Krone mower conditioner"),
    ("nh_rollbelt.png", "New Holland round baler"),
    ("irrifrance_optima.png", "irrigation pump agricultural"),
    ("claas_dominator.png", "Claas Dominator combine"),
    ("manitou_mi25.png", "Manitou forklift"),
    ("kuhn_profile.png", "Kuhn feed mixer"),
    ("richel_serre.png", "greenhouse tunnel"),
    ("lemken_charrue.png", "Lemken plough"),
    ("kuhn_harrow.png", "Kuhn harrow"),
    ("manitou_bucket.png", "Manitou bucket"),
    ("jcb_balefork.png", "JCB bale fork"),
    ("kuhn_mulcher.png", "Kuhn mulcher"),
    ("auger_tariere.png", "post hole auger"),
]

UA = "HASAD-MachineFetcher/1.0 (contact: hasad@local)"

def search_commons(term):
    url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=" + urllib.parse.quote(term) + "&srnamespace=6&format=json&srlimit=3"
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read())
            hits = data.get("query", {}).get("search", [])
            if not hits:
                return None
            return hits[0]["title"]
        except Exception as e:
            print("SEARCH ERR", term, e, "(attempt %d)" % (attempt+1))
            time.sleep(15)
    return None

def get_image_url(title):
    url = "https://commons.wikimedia.org/w/api.php?action=query&titles=" + urllib.parse.quote(title) + "&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json"
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read())
            pages = data.get("query", {}).get("pages", {})
            for pid, p in pages.items():
                ii = p.get("imageinfo", [])
                if ii:
                    # prefer thumbnail url if available
                    return ii[0].get("thumburl") or ii[0].get("url")
        except Exception as e:
            print("IMGURL ERR", title, e, "(attempt %d)" % (attempt+1))
            time.sleep(15)
    return None

def download(url, path):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r:
                with open(path, "wb") as f:
                    f.write(r.read())
            return
        except Exception as e:
            print("   download err:", e, "(attempt %d)" % (attempt+1))
            time.sleep(15)
    raise Exception("download failed")

from PIL import Image

def remove_white_bg(img):
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 225 and g > 225 and b > 225:
                px[x, y] = (r, g, b, 0)
    # crop to alpha bbox
    bbox = img.getchannel("A").getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def process_one(fname, term):
    out = os.path.join(MACHINES_DIR, fname)
    # skip if already a valid transparent png
    if os.path.exists(out):
        try:
            im = Image.open(out)
            if im.mode == "RGBA" and "A" in im.getbands():
                bbox = im.getchannel("A").getbbox()
                if bbox and bbox != (0, 0, im.width, im.height):
                    print("SKIP (valid alpha):", fname)
                    return True
        except Exception:
            pass
    print("===", fname, "<-", term)
    title = search_commons(term)
    if not title:
        print("   no search hit")
        return False
    print("   hit:", title)
    imgurl = get_image_url(title)
    if not imgurl:
        print("   no image url")
        return False
    print("   url:", imgurl)
    tmp = os.path.join(MACHINES_DIR, "_tmp_" + fname)
    try:
        download(imgurl, tmp)
    except Exception as e:
        print("   download err:", e)
        return False
    # resize to max 500px for rembg memory
    try:
        im = Image.open(tmp)
        im.thumbnail((500, 500), Image.LANCZOS)
        small = os.path.join(MACHINES_DIR, "_small_" + fname)
        im.save(small)
    except Exception as e:
        print("   resize err:", e)
        small = tmp
    # try rembg (u2net) first
    try:
        from rembg import remove, new_session
        session = new_session("u2net")
        with open(small, "rb") as f:
            inp = f.read()
        out_bytes = remove(inp, session=session)
        with open(out, "wb") as f:
            f.write(out_bytes)
        im = Image.open(out)
        print("   rembg OK", im.size, im.mode)
        for p in (tmp, small):
            if os.path.exists(p): os.remove(p)
        return True
    except Exception as e:
        print("   rembg err:", str(e)[:120])
    # fallback: white removal
    try:
        im = Image.open(small if os.path.exists(small) else tmp)
        im2 = remove_white_bg(im)
        im2.save(out)
        print("   white-removal OK", im2.size, im2.mode)
        for p in (tmp, small):
            if os.path.exists(p): os.remove(p)
        return True
    except Exception as e:
        print("   white-removal err:", e)
        for p in (tmp, small):
            if os.path.exists(p): os.remove(p)
        return False

ok = 0
for fname, term in JOBS:
    if process_one(fname, term):
        ok += 1
    time.sleep(5.0)

print("DONE: %d/%d succeeded" % (ok, len(JOBS)))
