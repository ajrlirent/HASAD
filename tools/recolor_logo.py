from PIL import Image
src = r'G:\HASAD\hasad-app\assets\images\logo\hasad_logo.png'
im = Image.open(src).convert('RGBA')
px = im.load()
w, h = im.size
NEW = (134, 214, 32, 255)
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a > 0:
            # recolor dark green / any non-transparent to #86d620
            px[x, y] = NEW
im.save(r'G:\HASAD\hasad-app\assets\images\logo\hasad_logo_green.png')
print('saved', im.size)
# also recolor the mark
src2 = r'G:\HASAD\hasad-app\assets\images\logo\hasad_mark.png'
im2 = Image.open(src2).convert('RGBA')
px2 = im2.load()
w2, h2 = im2.size
for y in range(h2):
    for x in range(w2):
        r, g, b, a = px2[x, y]
        if a > 0:
            px2[x, y] = NEW
im2.save(r'G:\HASAD\hasad-app\assets\images\logo\hasad_mark_green.png')
print('saved mark', im2.size)
