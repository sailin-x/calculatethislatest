#!/bin/bash

# Script to register all existing legal calculators

INDEX_FILE="src/calculators/index.ts"

# Get all legal calculator directories
LEGAL_DIRS=$(ls src/calculators/legal/)

# Build the import block
IMPORT_BLOCK=""
REGISTER_BLOCK=""
REGISTRATION_BLOCK=""
REGISTER_FUNCTION_BLOCK=""

for dir in $LEGAL_DIRS; do
    # Convert directory name to class name
    CLASS_NAME=$(echo $dir | sed 's/-calculator//' | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' | sed 's/ //g')
    if [[ $dir == *calculator ]]; then
        CLASS_NAME="${CLASS_NAME}Calculator"
    fi

    IMPORT_BLOCK="${IMPORT_BLOCK}import { $CLASS_NAME } from './legal/$dir';
import { register${CLASS_NAME} } from './legal/$dir/register';
"
    REGISTER_BLOCK="${REGISTER_BLOCK}calculatorRegistry.register($CLASS_NAME);
"
    REGISTER_FUNCTION_BLOCK="${REGISTER_FUNCTION_BLOCK}register${CLASS_NAME}();
"
done

# Find the insertion point - after the last finance import
LAST_FINANCE_LINE=$(grep -n "from '\./finance/" "$INDEX_FILE" | tail -1 | cut -d: -f1)

if [ -z "$LAST_FINANCE_LINE" ]; then
    echo "Could not find finance imports"
    exit 1
fi

# Insert all imports at once
echo "$IMPORT_BLOCK" >> temp_imports.txt
sed -i "${LAST_FINANCE_LINE}r temp_imports.txt" "$INDEX_FILE"
rm temp_imports.txt

# Find the registration section
REGISTER_START=$(grep -n "calculatorRegistry.register" "$INDEX_FILE" | tail -1 | cut -d: -f1)
REGISTER_FUNCTION_START=$(grep -n "register.*Calculator" "$INDEX_FILE" | tail -1 | cut -d: -f1)

if [ -z "$REGISTER_START" ]; then
    echo "Could not find registration section"
    exit 1
fi

# Insert all registrations at once
echo "$REGISTER_BLOCK" >> temp_register.txt
sed -i "${REGISTER_START}r temp_register.txt" "$INDEX_FILE"
rm temp_register.txt

if [ ! -z "$REGISTER_FUNCTION_START" ]; then
    echo "$REGISTER_FUNCTION_BLOCK" >> temp_register_func.txt
    sed -i "${REGISTER_FUNCTION_START}r temp_register_func.txt" "$INDEX_FILE"
    rm temp_register_func.txt
fi

echo "Registered all legal calculators"