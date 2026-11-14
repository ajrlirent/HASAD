import os, io, re
from PIL import Image, ImageDraw, ImageFont
import resvg_py

APP = r'G:\HASAD\hasad-app'
TOOLS = r'G:\HASAD\tools'
LOGO_DIR = os.path.join(APP, 'assets', 'images', 'logo')
IMG_DIR = os.path.join(APP, 'assets', 'images')
FONT_BOLD = os.path.join(APP, 'assets', 'fonts', 'montsserat', 'Montserrat-Bold.ttf')
FONT_LIGHT = os.path.join(APP, 'assets', 'fonts', 'montsserat', 'Montserrat-Light.ttf')

os.makedirs(LOGO_DIR, exist_ok=True)

# --- HASAD mark: four petals + centre square (same geometry as website favicon) ---
PETALS = '''
  <path d="M24 24H46C55.9411 24 64 32.0589 64 42V60H42C32.0589 60 24 51.9411 24 42V24Z" fill="{c}"/>
  <path d="M104 24H82C72.0589 24 64 32.0589 64 42V60H86C95.9411 60 104 51.9411 104 42V24Z" fill="{c}"/>
  <path d="M24 104H46C55.9411 104 64 95.9411 64 86V68H42C32.0589 68 24 76.0589 24 86V104Z" fill="{c}"/>
  <path d="M104 104H82C72.0589 104 64 95.9411 64 86V68H86C95.9411 68 104 76.0589 104 86V104Z" fill="{c}"/>
  <rect x="57" y="57" width="14" height="14" fill="{c}"/>
'''

def render_mark(colour, size=512):
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' + PETALS.format(c=colour) + '</svg>'
    png = resvg_py.svg_to_bytes(svg_string=svg, width=size, height=size, background=None)
    return Image.open(io.BytesIO(png)).convert('RGBA')

def build_logo(mark_colour, text_colour, path, wordmark=True, mark_px=260):
    mark = render_mark(mark_colour, mark_px)
    if not wordmark:
        mark.save(path)
        return
    text = 'HASAD'
    candidate = 190
    font = ImageFont.truetype(FONT_BOLD, candidate)
    # fit text height to mark
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    target_th = int(mark_px * 0.42)
    size = int(candidate * target_th / max(1, th))
    font = ImageFont.truetype(FONT_BOLD, size)
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    gap = int(mark_px * 0.20)
    pad = int(mark_px * 0.10)
    W = mark_px + gap + tw + pad * 2
    H = mark_px + pad * 2
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.paste(mark, (pad, pad), mark)
    draw = ImageDraw.Draw(canvas)
    draw.text((pad + mark_px + gap - bbox[0], pad + (mark_px - th) // 2 - bbox[1]),
              text, font=font, fill=text_colour)
    # tight crop, keep small breathing room
    b = canvas.getbbox()
    canvas = canvas.crop(b)
    canvas.save(path)
    print('logo', os.path.basename(path), canvas.size)

build_logo('#01341D', '#01341D', os.path.join(LOGO_DIR, 'hasad_logo.png'))
build_logo('#FFFFFF', '#FFFFFF', os.path.join(LOGO_DIR, 'hasad_logo_white.png'))
build_logo('#6FCB3B', '#6FCB3B', os.path.join(LOGO_DIR, 'hasad_logo_accent.png'))
build_logo('#01341D', '#01341D', os.path.join(LOGO_DIR, 'hasad_mark.png'), wordmark=False, mark_px=512)
build_logo('#FFFFFF', '#FFFFFF', os.path.join(LOGO_DIR, 'hasad_mark_white.png'), wordmark=False, mark_px=512)
build_logo('#6FCB3B', '#6FCB3B', os.path.join(LOGO_DIR, 'hasad_mark_accent.png'), wordmark=False, mark_px=512)

# --- launcher / splash native icon: mark on brand green ---
mark = render_mark('#6FCB3B', 640)
bg = Image.new('RGBA', (1024, 1024), (1, 52, 29, 255))
bg.paste(mark, ((1024 - 640) // 2, (1024 - 640) // 2), mark)
bg.save(os.path.join(LOGO_DIR, 'native.png'))
bg.convert('RGB').save(os.path.join(LOGO_DIR, 'launcher.png'))
print('native ok')

# --- category icons: white silhouettes on transparent, 512x512 ---
ICON_SRC = {
    'tracteurs': 'farm-tractor',
    'moissonneuses-batteuses': 'combine-harvester',
    'ensileuses-recolteuses-fourrageres': 'grain-bundle',
    'pulverisateurs-automoteurs': 'spray',
    'chargeurs-telescopiques': 'forklift',
    'transport-logistique-agricole': 'truck',
    'machines-recolte-specialisee': 'sickle',
    'motoculteurs-motopompes': 'manual-water-pump',
    'quads-utilitaires-agricoles': 'jeep',
    'outils-accessoires': 'toolbox',
    'travail-du-sol': 'plow',
    'semoirs-plantation': 'plant-seed',
    'pulverisation-epandage': 'spray',
    'fenaison-pressage': 'round-straw-bale',
    'irrigation-pompage': 'manual-water-pump',
    'recolte-battage': 'wheat',
    'manutention-agricole': 'pitchfork',
    'elevage-stabulation': 'cow',
    'serres-horticulture': 'greenhouse',
}

def white_icon(svg_text):
    svg_text = re.sub(r'<path[^>]*d="M0 0h512v512H0z"[^>]*/>', '', svg_text)
    svg_text = re.sub(r'<rect[^>]*width="512"[^>]*height="512"[^>]*/>', '', svg_text)
    svg_text = re.sub(r'fill="#0{3,6}"', 'fill="#FFFFFF"', svg_text)
    if 'fill="#FFFFFF"' not in svg_text.split('>', 1)[0]:
        svg_text = svg_text.replace('<svg ', '<svg fill="#FFFFFF" ', 1)
    png = resvg_py.svg_to_bytes(svg_string=svg_text, width=512, height=512, background=None)
    im = Image.open(io.BytesIO(png)).convert('RGBA')
    b = im.getbbox()
    if b:
        im = im.crop(b)
    scale = min(430 / im.width, 430 / im.height)
    im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)
    canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    canvas.paste(im, ((512 - im.width) // 2, (512 - im.height) // 2), im)
    return canvas

for target, src in ICON_SRC.items():
    svg_path = os.path.join(TOOLS, 'iconsrc', src + '.svg')
    if not os.path.exists(svg_path):
        print('MISSING ICON', src)
        continue
    icon = white_icon(open(svg_path, encoding='utf-8').read())
    icon.save(os.path.join(IMG_DIR, target + '.png'))
print('category icons done:', len(ICON_SRC))
