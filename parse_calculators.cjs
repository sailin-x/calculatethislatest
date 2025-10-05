const fs = require('fs');
const path = require('path');

// Read calculator-list.md
const content = fs.readFileSync('calculator-list.md', 'utf8');

// Extract calculator entries
const lines = content.split('\n');
const calculators = [];

for (const line of lines) {
  const match = line.match(/^- \[([ x])\] (.+?)(?:\s*✅.*)?$/);
  if (match) {
    const status = match[1] === 'x' ? 'completed' : 'pending';
    const name = match[2].replace(/\*\*/g, '').trim();
    calculators.push({ name, status, originalLine: line });
  }
}

console.log(`Found ${calculators.length} calculators in list`);

// Get all calculator directories
const calculatorDir = 'src/calculators';
const directories = fs.readdirSync(calculatorDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${directories.length} directories`);

// Function to normalize names for matching
function normalizeName(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .replace(/calculator$/, '');
}

// Create a map of normalized names to directories
const dirMap = new Map();
for (const dir of directories) {
  const normalized = normalizeName(dir.replace(/Calculator$/, ''));
  dirMap.set(normalized, dir);
}

// Check which calculators have directories
const accurateList = [];
const implemented = [];
const unimplemented = [];

for (const calc of calculators) {
  const normalized = normalizeName(calc.name);
  const hasDir = dirMap.has(normalized);

  if (hasDir) {
    implemented.push(calc.name);
    accurateList.push(`- [x] ${calc.name}`);
  } else {
    unimplemented.push(calc.name);
    accurateList.push(`- [ ] ${calc.name}`);
  }
}

// Remove duplicates
const seen = new Set();
const uniqueList = [];
for (const line of accurateList) {
  const name = line.replace(/^- \[.\] /, '');
  if (!seen.has(name)) {
    seen.add(name);
    uniqueList.push(line);
  }
}

console.log(`Implemented: ${implemented.length}`);
console.log(`Unimplemented: ${unimplemented.length}`);
console.log(`Total unique: ${uniqueList.length}`);

// Create the accurate markdown
const header = `# Calculator Master List - CalculateThis.ai (ACCURATE)
**Total: ~${uniqueList.length} Industry-Leading Calculators**

*Each calculator must deliver professional-grade accuracy and comprehensive features that match or exceed industry standards before being marked complete.*

## 🚨 CRITICAL DEVELOPMENT NOTES 🚨

### **VALIDATION FUNCTION SIGNATURE REQUIREMENT**
**ALL validation functions in quickValidation.ts files MUST include the \`allInputs\` parameter:**

\`\`\`typescript
// ✅ CORRECT - Include allInputs parameter
export function validateFieldName(value: any, allInputs?: Record<string, any>): ValidationResult {
  // validation logic
}

// ❌ WRONG - Missing allInputs parameter (causes runtime error)
export function validateFieldName(value: any): ValidationResult {
  // validation logic
}
\`\`\`

**This is CRITICAL because:**
- The \`ValidationEngine\` expects all validator functions to accept \`allInputs\`
- Missing this parameter causes \`Uncaught ReferenceError: allInputs is not defined\`
- This error breaks the entire application and shows blank screen
- **ALWAYS include \`allInputs?: Record<string, any>\` in validation function signatures**

### **CALCULATOR ARCHITECTURE REQUIREMENTS**
Each calculator must include:
- \`[CalculatorName]Calculator.ts\` - Main calculator definition
- \`formulas.ts\` - Core calculation logic
- \`validation.ts\` - Comprehensive validation rules
- \`quickValidation.ts\` - Individual field validation (with allInputs parameter!)
- \`[CalculatorName]Calculator.test.ts\` - Unit tests
- \`register.ts\` - Calculator registration
- \`index.ts\` - Module exports

---

## 📊 Progress Summary

**Total Calculators: ${uniqueList.length}**
- **Completed: ${implemented.length}** ✅
- **Remaining: ${unimplemented.length}** ⏳

---

`;

const output = header + uniqueList.join('\n') + '\n';

// Write to file
fs.writeFileSync('calculator-list-ACCURATE.md', output);

console.log('Created calculator-list-ACCURATE.md');

// Write unimplemented list for the script
fs.writeFileSync('unimplemented_calculators.txt', unimplemented.join('\n'));

console.log('Created unimplemented_calculators.txt');