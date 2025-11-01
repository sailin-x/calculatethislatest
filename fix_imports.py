import re
import sys

file_path = sys.argv[1] if len(sys.argv) > 1 else 'src/calculators/index.ts'

with open(file_path, 'r') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []

for line in lines:
    if 'from \'./' in line:
        match = re.search(r"import \{ (.+) as (.+) \} from '(.+)';", line)
        if match:
            variable = match.group(2)
            path = match.group(3)
            if variable.endswith('CalculatorCalculator'):
                correct_path = './' + variable[:-10]
                line = line.replace(f"from '{path}'", f"from '{correct_path}'")
    new_lines.append(line)

with open(file_path, 'w') as f:
    f.write('\n'.join(new_lines))