#!/usr/bin/env python3

import re

# Fix registry malformations in src/calculators/index.ts

def fix_registry_malformations():
    with open('src/calculators/index.ts', 'r') as f:
        content = f.read()

    # Pattern to match: calculatorRegistry.register(_calculator);something
    # Replace with: calculatorRegistry.register(something_calculator);

    # Find all malformed registrations
    pattern = r'calculatorRegistry\.register\(_calculator\);\s*([a-zA-Z0-9_-]+)'
    matches = re.findall(pattern, content)

    print(f"Found {len(matches)} malformed registrations to fix")

    # Replace each malformed registration
    for match in matches:
        old_pattern = f'calculatorRegistry.register(_calculator);{match}'
        new_replacement = f'calculatorRegistry.register({match}_calculator);'
        content = content.replace(old_pattern, new_replacement)

    # Write back the fixed content
    with open('src/calculators/index.ts', 'w') as f:
        f.write(content)

    # Verify the fix
    with open('src/calculators/index.ts', 'r') as f:
        fixed_content = f.read()

    remaining_malformed = len(re.findall(r'calculatorRegistry\.register\(_calculator\);', fixed_content))
    total_regs = len(re.findall(r'calculatorRegistry\.register\(', fixed_content))

    print(f"✅ Fixed {len(matches)} malformed registrations!")
    print(f"📊 Remaining malformed: {remaining_malformed}")
    print(f"📊 Total registrations: {total_regs}")

if __name__ == "__main__":
    fix_registry_malformations()