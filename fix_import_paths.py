import re
import os

def to_pascal_case(snake_str):
    # Convert snake_case to PascalCase, handling existing camelCase
    return re.sub(r'(?:^|_)([a-z])', lambda m: m.group(1).upper(), snake_str)

def fix_import_paths(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Pattern for import lines
    pattern = r"import\s*\{\s*(\w+)\s*\}\s*from\s*'\./([^']+)';"

    def replace_match(match):
        var_name = match.group(1)
        old_path = match.group(2)

        base = var_name[:-10]  # remove 'Calculator'

        candidates = [
            var_name,
            base,
            to_pascal_case(base)
        ]

        for cand in candidates:
            dir_path = f'src/calculators/{cand}'
            if os.path.isdir(dir_path):
                file_name = cand + 'Calculator'
                file_path = f'{dir_path}/{file_name}.ts'
                if os.path.isfile(file_path):
                    new_path = f'./{cand}/{file_name}'
                    return f"import {{ {var_name} }} from '{new_path}';"

        # If none found, keep old
        return match.group(0)

    new_content = re.sub(pattern, replace_match, content)

    with open(file_path, 'w') as f:
        f.write(new_content)

if __name__ == "__main__":
    fix_import_paths('src/calculators/index.ts')