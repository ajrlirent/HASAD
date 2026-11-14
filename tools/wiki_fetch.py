import json, os, urllib.parse, urllib.request
from PIL import Image
import io

UA={'User-Agent':'HASAD-demo/1.0 (local test)'}
queries={
 'ensileuse':'forage harvester field',
 'telehandler':'telehandler farm',
 'mini-loader':'compact wheel loader agriculture',
 'feed-mixer':'feed mixer wagon',
 'greenhouse':'greenhouse agriculture',
 'motoculteur':'two-wheel tractor',
 'pickup':'pickup truck farm',
 'rotary-tiller':'rotary tiller',
 'potato-harvester':'potato harvester',
}
os.makedirs(r'G:\HASAD\tools\wiki',exist_ok=True)
def get(url):
    req=urllib.request.Request(url,headers=UA)
    return urllib.request.urlopen(req,timeout=60).read()
for key,q in queries.items():
    try:
        api='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch='+urllib.parse.quote(q)+'&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json'
        d=json.loads(get(api))
        pages=d.get('query',{}).get('pages',{})
        cands=[]
        for p in pages.values():
            ii=p.get('imageinfo',[{}])[0]
            if ii.get('mime') not in ('image/jpeg','image/png'): continue
            if ii.get('width',0)<800: continue
            cands.append((p['title'],ii.get('thumburl') or ii.get('url')))
        print('==',key,q,len(cands))
        for i,(t,u) in enumerate(cands[:3]):
            try:
                data=get(u)
                ext='.jpg' if not u.lower().endswith('.png') else '.png'
                fn=os.path.join(r'G:\HASAD\tools\wiki',f'{key}-{i}{ext}')
                open(fn,'wb').write(data)
                im=Image.open(io.BytesIO(data))
                print('  saved',i,im.size,t[:70])
            except Exception as e: print('  dlfail',i,e)
    except Exception as e:
        print('FAIL',key,e)
