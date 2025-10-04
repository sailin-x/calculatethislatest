import re

# Read all dirs
with open('all_dirs.txt') as f:
    dirs = [line.strip() for line in f if line.strip()]

dirs = [d.split('/')[-1] for d in dirs]

# Generate human names
def to_human(name):
    if name.endswith('Calculator'):
        name = name[:-10]
    name = name.replace('_', ' ').title()
    return name + ' Calculator'

human_names = [to_human(d) for d in dirs]

# Read existing
with open('existing_names.txt') as f:
    existing = set(line.split('] ')[1].strip() for line in f if line.strip())

# Find missing
missing = [h for h in human_names if h not in existing]

# Categorize
categories = {
    'Mortgage & Real Estate Hub': [],
    'Retirement & Savings Hub': [],
    'Investment & Portfolio Hub': [],
    'Loans & Debt Hub': [],
    'Cryptocurrency Hub': [],
    'Legal Settlement Hub': [],
    'Insurance Hub': [],
    'Business Operations & Finance Hub': [],
    'Marketing & Creator Hub': [],
    'Health & Fitness Hub': [],
    'Construction Hub': [],
    'Math Hub': [],
    'Lifestyle & Automotive Hub': [],
}

def categorize(name):
    n = name.lower()
    if 'mortgage' in n or 'real estate' in n or 'property' in n or 'home' in n or 'rental' in n:
        return 'Mortgage & Real Estate Hub'
    elif 'retirement' in n or '401k' in n or 'ira' in n or 'annuity' in n or 'social security' in n or 'life insurance' in n or 'savings' in n or 'pension' in n or 'college' in n or 'student loan' in n:
        return 'Retirement & Savings Hub'
    elif 'investment' in n or 'portfolio' in n or 'stock' in n or 'bond' in n or 'dividend' in n or 'equity' in n or 'forex' in n or 'futures' in n or 'options' in n or 'reit' in n:
        return 'Investment & Portfolio Hub'
    elif 'loan' in n or 'debt' in n or 'credit' in n:
        return 'Loans & Debt Hub'
    elif 'crypto' in n or 'bitcoin' in n or 'blockchain' in n or 'nft' in n or 'ethereum' in n:
        return 'Cryptocurrency Hub'
    elif 'legal' in n or 'settlement' in n or 'lawsuit' in n or 'malpractice' in n or 'injury' in n or 'accident' in n or 'divorce' in n or 'patent' in n:
        return 'Legal Settlement Hub'
    elif 'insurance' in n:
        return 'Insurance Hub'
    elif 'business' in n or 'marketing' in n or 'roi' in n or 'valuation' in n or 'payback' in n or 'break even' in n or 'churn' in n or 'saas' in n or 'customer' in n:
        return 'Business Operations & Finance Hub'
    elif 'health' in n or 'fitness' in n or 'calorie' in n or 'diet' in n or 'bmi' in n or 'body' in n or 'blood' in n or 'cholesterol' in n:
        return 'Health & Fitness Hub'
    elif 'construction' in n or 'concrete' in n or 'drywall' in n or 'flooring' in n or 'roofing' in n:
        return 'Construction Hub'
    elif 'math' in n or 'algebra' in n or 'calculus' in n or 'geometry' in n or 'trigonometry' in n or 'probability' in n:
        return 'Math Hub'
    else:
        return 'Lifestyle & Automotive Hub'

for name in missing:
    cat = categorize(name)
    categories[cat].append(name)

# Read content
with open('calculator-list-CORRECTED.md') as f:
    content = f.read()

# Update top total
content = content.replace('**Total: ~1000 Industry-Leading Calculators**', '**Total: 1155 Industry-Leading Calculators**')

# Update each category
for cat, items in categories.items():
    if not items:
        continue
    pattern = r'### ' + re.escape(cat) + r' \(\d+ calculators\)'
    match = re.search(pattern, content)
    if not match:
        continue
    start = match.start()
    next_match = re.search(r'###|---', content[start+1:])
    if next_match:
        end = start + next_match.start()
    else:
        end = len(content)
    section = content[start:end]
    existing_count = len(re.findall(r'^- \[', section))
    new_count = existing_count + len(items)
    new_header = f'### {cat} ({new_count} calculators)'
    content = content.replace(match.group(), new_header)
    # Add items
    last_lines = re.findall(r'^- \[.*\n', section)
    if last_lines:
        last_item = last_lines[-1]
        insert_pos = content.find(last_item, start) + len(last_item)
        new_items = '\n'.join(f'- [ ] {item}' for item in sorted(items)) + '\n'
        content = content[:insert_pos] + new_items + content[insert_pos:]

# Update bottom
main_cats = {
    'Finance & Investment': ['Mortgage & Real Estate Hub', 'Retirement & Savings Hub', 'Investment & Portfolio Hub', 'Loans & Debt Hub', 'Cryptocurrency Hub'],
    'Legal, Insurance & Settlements': ['Legal Settlement Hub', 'Insurance Hub'],
    'Business, Marketing & Operations': ['Business Operations & Finance Hub', 'Marketing & Creator Hub'],
    'Health, Fitness & Diet': ['Health & Fitness Hub'],
    'Construction & Industrial': ['Construction Hub'],
    'Math & Science': ['Math Hub'],
    'Lifestyle & Automotive': ['Lifestyle & Automotive Hub'],
}

total_verified = 0
for main, subs in main_cats.items():
    verified = 0
    for sub in subs:
        pattern = r'### ' + re.escape(sub) + r' \(\d+ calculators\)'
        match = re.search(pattern, content)
        if match:
            start = match.start()
            next_match = re.search(r'###|---', content[start+1:])
            if next_match:
                end = start + next_match.start()
            else:
                end = len(content)
            section = content[start:end]
            verified += len(re.findall(r'^- \[x\]', section))
    total_verified += verified
    pattern = r'- ' + re.escape(main) + r': \d+'
    content = re.sub(pattern, f'- {main}: {verified}', content)

content = re.sub(r'\*\*VERIFIED WORKING CALCULATORS: \d+\*\*', f'**VERIFIED WORKING CALCULATORS: {total_verified}**', content)
total_implemented = len(dirs)
remaining = total_implemented - total_verified
content = re.sub(r'\*\*TOTAL IMPLEMENTED: \d+\*\*', f'**TOTAL IMPLEMENTED: {total_implemented}**', content)
content = re.sub(r'\*\*REMAINING TO BUILD: \d+\*\*', f'**REMAINING TO BUILD: {remaining}**', content)

# Write back
with open('calculator-list-CORRECTED.md', 'w') as f:
    f.write(content)

print(f"Added {len(missing)} missing calculators.")