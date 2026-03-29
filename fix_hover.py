import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    orig_content = content
    
    # regex to find prefixes like hover:, focus:, group-hover:
    # structure: prefix:original_class dark:fallback_class
    # Example: hover:bg-white dark:bg-[hsl(220,20%,7%)]
    # We want: hover:bg-white dark:hover:bg-[hsl(220,20%,7%)]
    
    pattern = r'\b((?:hover|focus|active|group-hover):)([a-z0-9-]+)\s+dark:([a-z0-9-\[\]\.,%]+)'
    
    # Replacement function to inject the prefix into the dark class
    def replace_func(match):
        prefix = match.group(1) # e.g. "hover:"
        orig_class = match.group(2) # e.g. "bg-white"
        dark_class = match.group(3) # e.g. "bg-[hsl...]"
        
        # If dark_class already has the prefix, skip
        if prefix in dark_class:
            return match.group(0)
            
        return f"{prefix}{orig_class} dark:{prefix}{dark_class}"
        
    content = re.sub(pattern, replace_func, content)
    
    if orig_content != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed hover in {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
