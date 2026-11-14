import os, re, io
from PIL import Image
import resvg_py
src=r'G:\HASAD\tools\iconsrc'
out=r'G:\HASAD\tools\icons_png'
os.makedirs(out,exist_ok=True)
for f in sorted(os.listdir(src)):
    if not f.endswith('.svg'): continue
    s=open(os.path.join(src,f),encoding='utf-8').read()
    # remove full-canvas background rect paths
    s=re.sub(r'<path[^>]*d="M0 0h512v512H0z"[^>]*/>','',s)
    s=re.sub(r'<path[^>]*d="M0 0h512v512H0V0z"[^>]*/>','',s)
    s=re.sub(r'<rect[^>]*width="512"[^>]*height="512"[^>]*/>','',s)
    s=re.sub(r'fill="#000(000)?"','fill="#FFFFFF"',s)
    if 'fill="#FFFFFF"' not in s.split('>',1)[0]:
        s=s.replace('<svg ','<svg fill="#FFFFFF" ',1)
    png=resvg_py.svg_to_bytes(svg_string=s, width=512, height=512, background=None)
    im=Image.open(io.BytesIO(png)).convert('RGBA')
    bbox=im.getbbox()
    if not bbox:
        print('EMPTY',f); continue
    im=im.crop(bbox)
    # contain in 440x440, centered on 512
    scale=min(440/im.width,440/im.height)
    im=im.resize((max(1,int(im.width*scale)),max(1,int(im.height*scale))),Image.LANCZOS)
    canvas=Image.new('RGBA',(512,512),(0,0,0,0))
    canvas.paste(im,((512-im.width)//2,(512-im.height)//2),im)
    canvas.save(os.path.join(out,f.replace('.svg','.png')))
    print('rendered',f,bbox)
