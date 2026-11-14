from PIL import Image
src = r'G:\HASAD\hasad-app\assets\images\logo\hasad_mark.png'
im = Image.open(src).convert('RGBA')
bbox = im.getbbox()
im = im.crop(bbox)
for size in (32, 180, 192, 512):
    out = r'G:\HASAD\Hasad website\public\favicons\favicon-%d.png' % size
    import os
    os.makedirs(r'G:\HASAD\Hasad website\public\favicons', exist_ok=True)
    im.resize((size, size), Image.LANCZOS).save(out)
    print('saved', out, size)
# also save a 32x32 as favicon.png in public root for legacy
im.resize((32,32), Image.LANCZOS).save(r'G:\HASAD\Hasad website\public\favicon.png')
print('saved favicon.png')
