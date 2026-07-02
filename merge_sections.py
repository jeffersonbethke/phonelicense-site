#!/usr/bin/env python3
"""
Merges Meet Your Guides section into index.html before the PRICING section.
"""

import re
import json

def extract_script(html, script_type):
    pattern = rf'<script type="{re.escape(script_type)}">(.*?)</script>'
    m = re.search(pattern, html, re.DOTALL)
    if not m:
        raise ValueError(f"Could not find script tag: {script_type}")
    return m.group(1).strip()

def replace_script(html, script_type, new_content):
    pattern = rf'<script type="{re.escape(script_type)}">(.*?)</script>'
    m = re.search(pattern, html, re.DOTALL)
    if not m:
        raise ValueError(f"Could not find script tag: {script_type}")
    start, end = m.span()
    open_tag = f'<script type="{script_type}">'
    close_tag = '</script>'
    return html[:start] + open_tag + new_content + close_tag + html[end:]

with open('/Users/jeff/phonelicense-site/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

with open('/Users/jeff/Desktop/Meet Your Guides _standalone_.html', 'r', encoding='utf-8') as f:
    guides_html = f.read()

print("Parsing manifests...")
index_manifest = json.loads(extract_script(index_html, '__bundler/manifest'))
guides_manifest = json.loads(extract_script(guides_html, '__bundler/manifest'))

print("Merging manifests...")
# Check for UUID collisions (unlikely but safe)
collisions = set(index_manifest.keys()) & set(guides_manifest.keys())
if collisions:
    print(f"  WARNING: {len(collisions)} UUID collisions — guides assets will override index assets for those keys")
merged_manifest = {**index_manifest, **guides_manifest}
print(f"  Total assets: {len(merged_manifest)}")

print("Parsing templates...")
index_template = json.loads(extract_script(index_html, '__bundler/template'))
guides_template = json.loads(extract_script(guides_html, '__bundler/template'))

# Extract body content from guides template
guides_body_match = re.search(r'<body[^>]*>(.*)</body>', guides_template, re.DOTALL)
if not guides_body_match:
    raise ValueError("No <body> tag found in guides template")
guides_section = guides_body_match.group(1).strip()
print(f"  Guides section: {len(guides_section)} chars")

# Also extract any <style> blocks from guides template head, to carry over CSS
guides_styles_match = re.findall(r'<style[^>]*>(.*?)</style>', guides_template, re.DOTALL)
guides_styles = '\n'.join(guides_styles_match) if guides_styles_match else ''
print(f"  Guides CSS blocks: {len(guides_styles_match)}")

# Insert guides styles into index template <head>
if guides_styles:
    # Append before </head>
    index_template = index_template.replace('</head>', f'<style>\n{guides_styles}\n</style>\n</head>', 1)
    print("  Injected guides CSS into <head>")

# Insert guides section before the PRICING section in index template
pricing_marker = '<!-- ============================ PRICING ============================'
if pricing_marker not in index_template:
    raise ValueError("Could not find PRICING section marker in index template")

separator = '\n\n<!-- ============================ MEET YOUR GUIDES ============================ -->\n'
index_template = index_template.replace(
    pricing_marker,
    separator + guides_section + '\n\n' + pricing_marker,
    1
)
print("  Inserted guides section before PRICING")

print("Writing merged file...")
# Escape </script> inside JSON to prevent the browser from terminating the script tag early.
def safe_json(obj):
    return json.dumps(obj).replace('</', '<\\/')

merged_html = replace_script(index_html, '__bundler/manifest', safe_json(merged_manifest))
merged_html = replace_script(merged_html, '__bundler/template', safe_json(index_template))

with open('/Users/jeff/phonelicense-site/index.html', 'w', encoding='utf-8') as f:
    f.write(merged_html)

print(f"\nDone. New index.html size: {len(merged_html):,} bytes")
print("The Meet Your Guides section is now inserted before PRICING.")
