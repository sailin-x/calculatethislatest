import os
import re
from pathlib import Path

def calculate_depth(file_path):
    """Calculate the directory depth from src/calculators/."""
    # file_path is like src/calculators/finance/home-insurance/file.ts
    rel_path = os.path.relpath(file_path, 'src/calculators')
    # rel_path is finance/home-insurance/file.ts
    # Depth is number of directories in rel_path minus 1 (for the file)
    parts = rel_path.split('/')
    depth = len([p for p in parts[:-1] if p])  # exclude empty and file
    return depth

def get_correct_import(target_dir, module, depth):
    """Get the correct relative import path."""
    ups = '../' * depth
    return f"{ups}{target_dir}/{module}"

def fix_imports_in_file(file_path):
    """Fix broken relative imports in a single file."""
    depth = calculate_depth(file_path)
    with open(file_path, 'r') as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    fixed = False

    # Patterns for broken imports: ../../../engines/, ../../../types/, etc.
    patterns = [
        (r"('../../../engines/([^']+)')", 'engines'),
        (r"('../../../types/([^']+)')", 'types'),
        (r"('../../../utils/([^']+)')", 'utils'),
        (r"('../../../lib/([^']+)')", 'lib'),
        (r"('../../../hooks/([^']+)')", 'hooks'),
    ]

    for line in lines:
        original_line = line
        for pattern, target_dir in patterns:
            match = re.search(pattern, line)
            if match:
                full_match = match.group(1)
                module = match.group(2)
                correct_path = get_correct_import(target_dir, module, depth)
                line = line.replace(full_match, f"'{correct_path}'")
                fixed = True
        new_lines.append(line)

    if fixed:
        new_content = '\n'.join(new_lines)
        with open(file_path, 'w') as f:
            f.write(new_content)
        return True
    return False

def find_calculator_files():
    """Find all .ts files in src/calculators/ recursively."""
    files = []
    for root, dirs, files_in_dir in os.walk('src/calculators'):
        for file in files_in_dir:
            if file.endswith('.ts'):
                files.append(os.path.join(root, file))
    return files

def main():
    print("Scanning calculator files for broken relative imports...")
    files = find_calculator_files()
    fixed_count = 0
    for file_path in files:
        if fix_imports_in_file(file_path):
            fixed_count += 1
            print(f"Fixed imports in {file_path}")
    print(f"Fixed imports in {fixed_count} files.")

if __name__ == '__main__':
    main()