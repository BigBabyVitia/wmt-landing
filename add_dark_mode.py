import os
import re

mappings = {
    r'\bbg-white\b(?!/| dark:bg-)': r'bg-white dark:bg-[hsl(220,20%,7%)]',
    r'\bbg-gray-50\b(?!/| dark:bg-)': r'bg-gray-50 dark:bg-[hsl(220,18%,10%)]',
    r'\bbg-gray-100\b(?!/| dark:bg-)': r'bg-gray-100 dark:bg-[hsl(220,18%,14%)]',
    r'\bbg-gray-200\b(?!/| dark:bg-)': r'bg-gray-200 dark:bg-[hsl(220,18%,18%)]',
    r'\bborder-gray-100\b(?! dark:border-)': r'border-gray-100 dark:border-white/[0.06]',
    r'\bborder-gray-200\b(?! dark:border-)': r'border-gray-200 dark:border-white/10',
    r'\bborder-gray-300\b(?! dark:border-)': r'border-gray-300 dark:border-white/20',
    r'\btext-gray-900\b(?! dark:text-)': r'text-gray-900 dark:text-white',
    r'\btext-gray-800\b(?! dark:text-)': r'text-gray-800 dark:text-gray-100',
    r'\btext-gray-700\b(?! dark:text-)': r'text-gray-700 dark:text-gray-200',
    r'\btext-gray-600\b(?! dark:text-)': r'text-gray-600 dark:text-gray-400',
    r'\btext-gray-500\b(?! dark:text-)': r'text-gray-500 dark:text-gray-400',
    r'\btext-gray-400\b(?! dark:text-)': r'text-gray-400 dark:text-gray-500',
    r'\btext-black\b(?! \b|dark:text-)': r'text-black dark:text-white',
    r'\bbg-black\b(?! \b|dark:bg-)': r'bg-black dark:bg-[hsl(220,20%,4%)]'
}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    orig_content = content
    # For each mapping, replace using regex string replacements
    for pattern, replacement in mappings.items():
        content = re.sub(pattern, replacement, content)
        
    if orig_content != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
