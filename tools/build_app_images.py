import os, io, colorsys
from PIL import Image
import resvg_py

APP = r'G:\HASAD\hasad-app'
IMG = os.path.join(APP, 'assets', 'images')
ICONS = os.path.join(r'G:\HASAD\tools\iconsrc')
MACH = os.path.join(r'G:\HASAD\tools\machines')
VEC = os.path.join(r'G:\HASAD\tools\vector_png')
DARK = '#01341D'
GREEN = '#5DBB46'
LIME = '#6FCB3B'


def render_icon(name, colour, size=512, fill_canvas=None):
    s = open(os.path.join(ICONS, name + '.svg'), encoding='utf-8').read()
    s = s.replace('fill="#fff"', f'fill="{colour}"')
    s = s.replace('fill="#FFFFFF"', f'fill="{colour}"')
    s = s.replace('<svg ', f'<svg fill="{colour}" ', 1)
    png = resvg_py.svg_to_bytes(svg_string=s, width=size, height=size, background=None)
    im = Image.open(io.BytesIO(png)).convert('RGBA')
    b = im.getbbox()
    if b:
        im = im.crop(b)
    return im


def fit(im, box):
    scale = min(box[0] / im.width, box[1] / im.height)
    return im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)


def save_icon(name, colour, out, size=302):
    im = render_icon(name, colour, 512)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    im = fit(im, (int(size * 0.82), int(size * 0.82)))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    canvas.save(out)


save_icon('farm-tractor', DARK, os.path.join(IMG, 'categories', 'cat1image.png'), 302)
save_icon('plow', DARK, os.path.join(IMG, 'categories', 'cat2image.png'), 302)

# implements images used by the attachment pickers
att = {
    '5dents.png': 'pitchfork',
    'Godet2dents.png': 'sickle',
    'Marteaux.png': 'scythe',
    'Tarière.png': 'grain-bundle',
    'trenchuse.png': 'plow',
}
for fn, icon in att.items():
    save_icon(icon, GREEN, os.path.join(IMG, 'attachments', fn), 500)

# onboarding illustrations: green machines on a soft green blob
blob = Image.new('RGBA', (700, 700), (0, 0, 0, 0))
tractor = Image.open(os.path.join(MACH, 'agri_tractor.png')).convert('RGBA')
combine = Image.open(os.path.join(MACH, 'combine_harvester.png')).convert('RGBA')

for target, machine, size in [('onboarding1.png', tractor, (252, 353)), ('onboarding2.png', combine, (322, 322))]:
    canvas = Image.new('RGBA', size, (0, 0, 0, 0))
    background = Image.new('RGBA', size, (0, 0, 0, 0))
    db = Image.new('RGBA', (size[0], size[1]), (0, 0, 0, 0))
    from PIL import ImageDraw
    d = ImageDraw.Draw(db)
    d.ellipse([int(size[0] * 0.04), int(size[1] * 0.10), int(size[0] * 0.96), int(size[1] * 0.92)],
              fill=(111, 203, 59, 46))
    canvas = Image.alpha_composite(background, db)
    m = fit(machine, (int(size[0] * 0.94), int(size[1] * 0.62)))
    canvas.paste(m, ((size[0] - m.width) // 2, int(size[1] * 0.50) - m.height // 2), m)
    canvas.save(os.path.join(IMG, 'onboarding', target))

# yellow spot -> lime green spot
yp = Image.open(os.path.join(IMG, 'onboarding', 'yellowspot.png')).convert('RGBA')
out = Image.new('RGBA', yp.size)
sp, op = yp.load(), out.load()
for y in range(yp.height):
    for x in range(yp.width):
        r, g, b, a = sp[x, y]
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        nr, ng, nb = colorsys.hls_to_rgb(0.27, l, s)
        op[x, y] = (int(nr * 255), int(ng * 255), int(nb * 255), a)
out.save(os.path.join(IMG, 'onboarding', 'yellowspot.png'))

# provider home illustrations
p1 = fit(tractor, (700, 500))
p1.save(os.path.join(IMG, 'providerhome', 'Minipelle.png'))
p2 = fit(combine, (700, 500))
p2.save(os.path.join(IMG, 'providerhome', 'Pletuse.png'))

# machines showcase: 4 machines in a row
row = Image.new('RGBA', (2172, 724), (0, 0, 0, 0))
items = [tractor, combine, Image.open(os.path.join(MACH, 'seeder_planter.png')).convert('RGBA'),
         Image.open(os.path.join(MACH, 'crop_sprayer.png')).convert('RGBA')]
x = 0
for it in items:
    it2 = fit(it, (500, 600))
    row.paste(it2, (x + (543 - it2.width) // 2, (724 - it2.height) // 2), it2)
    x += 543
row.save(os.path.join(IMG, 'providerhome', 'empty_machines_showcase.png'))

# login image: use a green machine on transparent
li = fit(Image.open(os.path.join(MACH, 'agri_tractor.png')).convert('RGBA'), (1000, 700))
li.save(os.path.join(IMG, 'auth', 'loginimage.png'))

print('app images rebuilt')
