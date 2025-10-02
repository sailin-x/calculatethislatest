import re

def main():
    file_path = 'src/calculators/index.ts'

    with open(file_path, 'r') as f:
        lines = f.readlines()

    # Parse imports
    imported_vars = set()
    for line in lines:
        if line.strip().startswith('import {'):
            match = re.search(r'import \{ ([^}]+) \} from', line)
            if match:
                vars_str = match.group(1)
                vars_list = [v.strip() for v in vars_str.split(',')]
                imported_vars.update(vars_list)

    print(f"Imported vars: {len(imported_vars)}")

    # Find the registerAllCalculators function
    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if 'export function registerAllCalculators(): void {' in line:
            start_idx = i
        if start_idx is not None and line.strip() == '}':
            end_idx = i
            break

    if start_idx is None or end_idx is None:
        print("Function not found")
        return

    print(f"Function from line {start_idx} to {end_idx}")

    # Process the function lines
    new_lines = lines[:start_idx + 1]  # include the function start
    for i in range(start_idx + 1, end_idx):
        line = lines[i]
        # Check if it's calculatorRegistry.register(variable);
        match = re.search(r'calculatorRegistry\.register\(([^)]+)\);', line)
        if match:
            var = match.group(1).strip()
            if var not in imported_vars:
                print(f"Removing: {line.strip()}")
                continue  # skip this line
        new_lines.append(line)

    new_lines.extend(lines[end_idx:])  # add the rest

    # Write back
    with open(file_path, 'w') as f:
        f.writelines(new_lines)

    print("Fixed the file")

if __name__ == '__main__':
    main()