import os
import re
from pathlib import Path

def transform_path(path):
    """Transform import path to match actual directory name."""
    # Remove leading './'
    path = path.lstrip('./')
    # Take the last part after '/'
    last_part = path.split('/')[-1]
    # Replace '-' with '_'
    snake_case = last_part.replace('-', '_')
    # Add 'Calculator' suffix
    return snake_case + 'Calculator'

def get_existing_dirs():
    """Get set of existing directory names in src/calculators."""
    dirs = set()
    for item in os.listdir('src/calculators'):
        path = Path('src/calculators') / item
        if path.is_dir():
            dirs.add(item)
    return dirs

def find_calculators_without_register():
    """Find directories with *Calculator.ts but no register.ts."""
    missing_register = []
    for root, dirs, files in os.walk('src/calculators'):
        has_calculator = any(f.endswith('Calculator.ts') for f in files)
        has_register = 'register.ts' in files
        if has_calculator and not has_register:
            # Get relative path from src/calculators
            rel_path = os.path.relpath(root, 'src/calculators')
            missing_register.append(rel_path)
    return missing_register

def generate_register_file(dir_name):
    """Generate register.ts for a directory."""
    # Find the calculator file
    dir_path = Path('src/calculators') / dir_name
    calculator_files = [f for f in os.listdir(dir_path) if f.endswith('Calculator.ts')]
    if not calculator_files:
        return None

    calculator_file = calculator_files[0]
    calculator_name = calculator_file[:-3]  # remove .ts

    # Derive category and subcategory from dir_name
    parts = dir_name.split('/')
    if len(parts) >= 2:
        category = parts[0]
        subcategory = ' '.join(word.capitalize() for word in parts[1].replace('-', ' ').replace('_', ' ').split())
    else:
        category = 'misc'
        subcategory = dir_name.replace('-', ' ').replace('_', ' ').title()

    # Use a valid variable name for export
    var_name = dir_name.replace('/', '_').replace('-', '_') + 'Registration'

    content = f"""import {{ {calculator_name} }} from './{calculator_file}';

export const {var_name} = {{
  id: '{dir_name}',
  category: '{category}',
  subcategory: '{subcategory}',
  calculator: {calculator_name},
}};
"""

    register_path = dir_path / 'register.ts'
    with open(register_path, 'w') as f:
        f.write(content)
    return register_path

def fix_imports():
    """Fix imports in index.ts."""
    existing_dirs = get_existing_dirs()

    with open('src/calculators/index.ts', 'r') as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    fixed_count = 0
    removed_count = 0

    for line in lines:
        if line.startswith('import'):
            # Extract the path
            match = re.search(r"from '\./([^']+)'", line)
            if match:
                original_path = match.group(1)
                transformed = transform_path(original_path)
                if transformed in existing_dirs:
                    # Replace the import
                    new_line = line.replace(f"'./{original_path}'", f"'./{transformed}'")
                    new_lines.append(new_line)
                    if new_line != line:
                        fixed_count += 1
                else:
                    # Remove invalid import
                    removed_count += 1
                    continue
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    new_content = '\n'.join(new_lines)
    with open('src/calculators/index.ts', 'w') as f:
        f.write(new_content)

    return fixed_count, removed_count

def main():
    print("Generating missing register.ts files...")
    missing = find_calculators_without_register()
    generated = 0
    for dir_name in missing:
        if generate_register_file(dir_name):
            generated += 1
    print(f"Generated {generated} register.ts files")

    print("Fixing imports...")
    fixed, removed = fix_imports()
    print(f"Fixed {fixed} imports, removed {removed} invalid imports")

if __name__ == '__main__':
    main()