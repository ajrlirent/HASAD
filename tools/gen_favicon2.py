from PIL import Image
src = r'G:\HASAD\hasad-app\assets\images\logo\hasad_mark.png'
im = Image.open(src).convert('RGBA')
bbox = im.getbbox()
im = im.crop(bbox)
# recolor all non-transparent pixels to #86d620
NEW = (134, 214, 32, 255)
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a > 0:
            px[x, y] = NEW
for size in (32, 180, 192, 512):
    out = r'G:\HASAD\Hasad website\public\favicons\favicon-%d.png' % size
    im.resize((size, size), Image.LANCZOS).save(out)
    print('saved', out, size)
im.resize((32,32), Image.LANCZOS).save(r'G:\HASAD\Hasad website\public\favicon.png')
print('saved favicon.png')
# also regenerate a 16x16? skip
