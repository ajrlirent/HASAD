import os
from PIL import Image, ImageFilter
import numpy as np
src=r'G:\HASAD\Hasad website\src\assets\images'
out=r'G:\HASAD\tools\machines'
os.makedirs(out,exist_ok=True)
for f in sorted(os.listdir(src)):
    if not (f.startswith('cutout') and f.endswith('.jpg')): continue
    im=Image.open(os.path.join(src,f)).convert('RGB')
    a=np.asarray(im).astype(np.int16)
    mn=a.min(axis=2); mx=a.max(axis=2)
    # near-white & low saturation -> transparent, soft edge
    white=255-mn
    sat=mx-mn
    alpha=np.clip((255-white*1.0)*3,0,255)  # not right
    # define alpha from distance below 250 on min channel
    d=250-mn
    alpha=np.clip(d*6,0,255)
    alpha[sat>40]=255
    # boost fully opaque for green/metal body
    alpha[mn<225]=255
    rgba=np.dstack([a.astype(np.uint8),alpha.astype(np.uint8)])
    img=Image.fromarray(rgba,'RGBA')
    bbox=img.getbbox()
    img=img.crop(bbox)
    scale=min(1.0,900/max(img.size))
    if scale<1: img=img.resize((int(img.width*scale),int(img.height*scale)),Image.LANCZOS)
    name=f.split('_1794')[0].replace('cutout_','')+'.png'
    img.save(os.path.join(out,name))
    print(name,img.size, bbox)
