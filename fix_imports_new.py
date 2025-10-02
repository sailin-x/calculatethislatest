import os
import re

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

# Build mapping
mapping = {}
for root, dirs, files in os.walk('src/calculators'):
    if 'register.ts' in files:
        path = os.path.relpath(root, 'src/calculators')
        if '/' in path:
            # nested: category/subcategory
            parts = path.split('/')
            sub = parts[-1]
            snake = sub.replace('-', '_')
            mapping[snake] = path
        else:
            # flat: CalculatorNameCalculator
            if path.endswith('Calculator'):
                snake = camel_to_snake(path[:-11])  # remove 'Calculator'
                mapping[snake] = path

# Read the index.ts
with open('src/calculators/index.ts', 'r') as f:
    content = f.read()

# Pattern for imports
import_pattern = re.compile(r"from '\./([^']+)Calculator'")

fixed_count = 0
unresolved_count = 0

def replace_import(match):
    global fixed_count, unresolved_count
    path_part = match.group(1)
    original_path = path_part
    if path_part.startswith('register_'):
        path_part = path_part[8:]
    snake = path_part
    if snake in mapping:
        new_path = f"./{mapping[snake]}"
        if f"'{new_path}'" != f"'./{original_path}Calculator'":
            fixed_count += 1
        return f"from '{new_path}'"
    else:
        unresolved_count += 1
        return match.group(0)

new_content = import_pattern.sub(replace_import, content)

# Write back
with open('src/calculators/index.ts', 'w') as f:
    f.write(new_content)

print(f"Fixed {fixed_count} imports, {unresolved_count} unresolved")