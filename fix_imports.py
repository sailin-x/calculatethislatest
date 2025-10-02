import re

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def fix_imports(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    fixed_lines = []
    for line in lines:
        # Match import statements like from './SomePathCalculator'
        match = re.search(r"from '\./(.*)Calculator'", line)
        if match:
            # Extract the path part before Calculator
            path_part = match.group(1)
            # Convert camelCase path to snake_case
            snake_path = camel_to_snake(path_part)
            # Replace the import path with snake_case version
            line = re.sub(r"from '\./.*Calculator'", f"from './{snake_path}Calculator'", line)
        fixed_lines.append(line)

    with open(file_path, 'w') as f:
        f.writelines(fixed_lines)

if __name__ == "__main__":
    fix_imports('src/calculators/index.ts')