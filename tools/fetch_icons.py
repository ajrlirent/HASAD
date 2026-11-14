import os, urllib.request, io, re
from PIL import Image
import resvg_py

outdir=r'G:\HASAD\tools\iconsrc'
os.makedirs(outdir, exist_ok=True)
icons = {
 'farm-tractor':'delapouite/farm-tractor.svg',
 'plow':'delapouite/plow.svg',
 'plant-seed':'delapouite/plant-seed.svg',
 'spray':'lorc/spray.svg',
 'wheat':'lorc/wheat.svg',
 'pitchfork':'delapouite/pitchfork.svg',
 'manual-water-pump':'delapouite/manual-water-pump.svg',
 'greenhouse':'delapouite/greenhouse.svg',
 'cow':'delapouite/cow.svg',
 'forklift':'delapouite/forklift.svg',
 'truck':'delapouite/truck.svg',
 'sickle':'delapouite/sickle.svg',
 'jeep':'delapouite/jeep.svg',
 'toolbox':'delapouite/toolbox.svg',
 'round-straw-bale':'delapouite/round-straw-bale.svg',
 'grain-bundle':'delapouite/grain-bundle.svg',
 'scythe':'lorc/scythe.svg',
 'round-silo':'delapouite/round-silo.svg',
}
for name,path in icons.items():
    url='https://raw.githubusercontent.com/game-icons/icons/master/'+path
    dst=os.path.join(outdir,name+'.svg')
    if os.path.exists(dst) and os.path.getsize(dst)>500: continue
    try:
        req=urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        data=urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        open(dst,'w',encoding='utf-8').write(data)
        print('ok',name,len(data))
    except Exception as e:
        print('FAIL',name,e)
