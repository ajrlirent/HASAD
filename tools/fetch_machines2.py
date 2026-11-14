import os, time, json, urllib.request, urllib.parse
from PIL import Image

MACHINES_DIR = r'G:\HASAD\hasad-backend\storage\app\public\hasad_machines'
os.makedirs(MACHINES_DIR, exist_ok=True)
UA = "HASAD-MachineFetcher/1.0 (contact: hasad@local)"

JOBS = [
    ("husqvarna_t600.png", "rototiller garden machine"),
    ("vaderstad_tempo.png", "seed planter machine agriculture"),
    ("checchi_wolf.png", "vegetable transplanter machine"),
    ("richel_serre.png", "polytunnel greenhouse"),
    ("jcb_balefork.png", "bale fork tractor attachment"),
    ("auger_tariere.png", "earth auger drilling machine"),
    ("kuhn_profile.png", "feed mixer wagon agricultural"),
]

def search_commons(term):
    url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=" + urllib.parse.quote(term) + "&srnamespace=6&format=json&srlimit=3"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read())
            hits = data.get("query", {}).get("search", [])
            if not hits: return None
            return hits[0]["title"]
        except Exception as e:
            print("SEARCH ERR", term, e); time.sleep(20)
    return None

def get_image_url(title):
    url = "https://commons.wikimedia.org/w/api.php?action=query&titles=" + urllib.parse.quote(title) + "&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read())
            pages = data.get("query", {}).get("pages", {})
            for pid, p in pages.items():
                ii = p.get("imageinfo", [])
                if ii:
                    return ii[0].get("thumburl") or ii[0].get("url")
        except Exception as e:
            print("IMGURL ERR", title, e); time.sleep(20)
    return None

def download(url, path):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r:
                with open(path, "wb") as f:
                    f.write(r.read())
            return True
        except Exception as e:
            print("   download err:", e); time.sleep(20)
    return False

def remove_white_bg(img):
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 225 and g > 225 and b > 225:
                px[x, y] = (r, g, b, 0)
    bbox = img.getchannel("A").getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

for fname, term in JOBS:
    out = os.path.join(MACHINES_DIR, fname)
    print("===", fname, "<-", term)
    title = search_commons(term)
    if not title:
        print("   no search hit"); time.sleep(8); continue
    print("   hit:", title)
    imgurl = get_image_url(title)
    if not imgurl:
        print("   no image url"); time.sleep(8); continue
    print("   url:", imgurl)
    tmp = os.path.join(MACHINES_DIR, "_tmp_" + fname)
    if not download(imgurl, tmp):
        time.sleep(8); continue
    try:
        im = Image.open(tmp)
        im.thumbnail((900, 900), Image.LANCZOS)
        small = os.path.join(MACHINES_DIR, "_small_" + fname)
        im.save(small)
    except Exception as e:
        print("   resize err:", e); small = tmp
    try:
        im = Image.open(small if os.path.exists(small) else tmp)
        im2 = remove_white_bg(im)
        im2.save(out)
        print("   OK", im2.size, im2.mode)
    except Exception as e:
        print("   err:", e)
    for p in (tmp, small):
        if os.path.exists(p): os.remove(p)
    time.sleep(8)

print("DONE")
