import io
from PIL import Image
import resvg_py
s=open(r'G:\HASAD\tools\iconsrc\combine-harvester.svg',encoding='utf-8').read()
png=resvg_py.svg_to_bytes(svg_string=s,width=512,height=512,background=None)
im=Image.open(io.BytesIO(png)).convert('RGBA')
print(im.getbbox())
a=im.getchannel('A').resize((44,44))
for y in range(44):
    print(''.join('#' if a.getpixel((x,y))>140 else ' ' for x in range(44)))
