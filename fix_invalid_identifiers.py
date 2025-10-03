#!/usr/bin/env python3
"""
Script to fix invalid JavaScript identifiers that start with digits in src/calculators/index.ts

This script:
1. Scans all import statements in the file
2. Finds any destructured import identifiers that start with digits
3. Converts them to valid JavaScript identifiers (e.g., 401k_planCalculator → FourZeroOneKPlanCalculator)
4. Also updates any corresponding references in the registerAllCalculators function
"""

import re
import os

def number_to_word(num_str):
    """Convert a digit string to word representation"""
    word_map = {
        '0': 'Zero',
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
        '4': 'Four',
        '5': 'Five',
        '6': 'Six',
        '7': 'Seven',
        '8': 'Eight',
        '9': 'Nine'
    }
    return ''.join(word_map.get(digit, digit) for digit in num_str)

def convert_invalid_identifier(identifier):
    """Convert an invalid identifier starting with digits to a valid one"""
    if not identifier or not identifier[0].isdigit():
        return identifier

    # Find the leading digits
    digit_match = re.match(r'^(\d+)', identifier)
    if not digit_match:
        return identifier

    digits = digit_match.group(1)
    rest = identifier[len(digits):]

    # Convert digits to words
    word_prefix = number_to_word(digits)

    # Capitalize first letter of rest if it exists
    if rest and rest[0].islower():
        rest = rest[0].upper() + rest[1:]

    return word_prefix + rest

def process_file(file_path):
    """Process the TypeScript file to fix invalid identifiers"""
    print(f"Processing {file_path}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    modified_lines = []
    changes_made = []

    # Track identifier mappings
    identifier_map = {}

    for i, line in enumerate(lines):
        original_line = line

        # Check for import statements with destructured imports
        import_match = re.search(r'import\s*\{\s*([^}]+)\s*\}\s*from', line)
        if import_match:
            destructured = import_match.group(1)
            # Split by comma and clean up
            identifiers = [id.strip() for id in destructured.split(',')]

            new_identifiers = []
            for identifier in identifiers:
                # Remove any aliases (part after 'as')
                base_identifier = identifier.split(' as ')[0].strip()

                if base_identifier and base_identifier[0].isdigit():
                    new_identifier = convert_invalid_identifier(base_identifier)
                    identifier_map[base_identifier] = new_identifier
                    changes_made.append(f"Import: {base_identifier} -> {new_identifier}")

                    # Replace in the line
                    if ' as ' in identifier:
                        alias = identifier.split(' as ')[1].strip()
                        line = line.replace(f'{base_identifier} as {alias}', f'{new_identifier} as {alias}')
                    else:
                        line = line.replace(base_identifier, new_identifier)

                    new_identifiers.append(new_identifier if ' as ' not in identifier else f'{new_identifier} as {alias}')
                else:
                    new_identifiers.append(identifier)

        # Check for registerAllCalculators function references
        if 'calculatorRegistry.register(' in line:
            for old_id, new_id in identifier_map.items():
                if old_id in line:
                    line = line.replace(old_id, new_id)
                    changes_made.append(f"Reference: {old_id} -> {new_id}")

        modified_lines.append(line)

    # Write back the modified content
    new_content = '\n'.join(modified_lines)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Made {len(changes_made)} changes:")
    for change in changes_made:
        print(f"  {change}")

    return len(changes_made) > 0

def main():
    file_path = 'src/calculators/index.ts'

    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return 1

    if process_file(file_path):
        print("Successfully fixed invalid identifiers!")
        return 0
    else:
        print("No invalid identifiers found.")
        return 0

if __name__ == '__main__':
    exit(main())