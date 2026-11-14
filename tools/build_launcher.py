import os
from PIL import Image

APP = r'G:\HASAD\hasad-app'
LOGO = os.path.join(APP, 'assets', 'images', 'logo')
RES = os.path.join(APP, 'android', 'app', 'src', 'main', 'res')
mark_lime = Image.open(r'G:\HASAD\HASAD logo.png').convert('RGBA')
mark_lime = mark_lime.crop(mark_lime.getbbox())

BG = (255, 255, 255, 255)


def _fit(im, box_w, box_h):
    # scale preserving aspect ratio to fit inside box
    scale = min(box_w / im.width, box_h / im.height)
    nw = max(1, int(im.width * scale))
    nh = max(1, int(im.height * scale))
    return im.resize((nw, nh), Image.LANCZOS)


def square_icon(size, bg=BG, ratio=0.88):
    box = int(size * ratio)
    im = _fit(mark_lime, box, box)
    canvas = Image.new('RGBA', (size, size), bg)
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    return canvas


def adaptive_fg(size):
    box = int(size * 0.72)
    im = _fit(mark_lime, box, box)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    return canvas


densities = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
for name, factor in densities.items():
    d = os.path.join(RES, 'mipmap-' + name)
    square_icon(int(48 * factor)).convert('RGB').save(os.path.join(d, 'ic_launcher.png'))
    # round icon: circular crop
    s = int(48 * factor)
    sq = square_icon(s)
    mask = Image.new('L', (s, s), 0)
    from PIL import ImageDraw
    ImageDraw.Draw(mask).ellipse((0, 0, s - 1, s - 1), fill=255)
    round_icon = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    round_icon.paste(sq, (0, 0), mask)
    round_icon.save(os.path.join(d, 'ic_launcher_round.png'))
    adaptive_fg(int(108 * factor)).save(os.path.join(d, 'ic_launcher_foreground.png'))
    # native splash logo (drawable splash)
    splash = Image.new('RGBA', (int(200 * factor), int(200 * factor)), (0, 0, 0, 0))
    m = mark_lime.resize((int(150 * factor), int(150 * factor)), Image.LANCZOS)
    splash.paste(m, ((splash.width - m.width) // 2, (splash.height - m.height) // 2), m)
    splash.save(os.path.join(RES, 'drawable-' + name, 'splash.png'))
    # generic drawable splash (used by values/styles fallback)
    if name == 'mdpi':
        splash.save(os.path.join(RES, 'drawable', 'splash.png'))

# colors
colors = os.path.join(RES, 'values', 'colors.xml')
open(colors, 'w', encoding='utf-8').write(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#FFFFFF</color>\n</resources>\n')

# web icons + favicon
web = os.path.join(APP, 'web')
if os.path.isdir(web):
    for size in (192, 512):
        p = os.path.join(web, 'icons', f'Icon-{size}.png')
        if os.path.isdir(os.path.dirname(p)):
            square_icon(size, bg=(0, 0, 0, 0), ratio=0.98).save(p)
    square_icon(64).save(os.path.join(web, 'favicon.png'))
print('launcher icons done')
