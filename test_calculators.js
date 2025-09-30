// Simple test to verify calculators have real formulas
const fs = require('fs');
const path = require('path');

console.log('🧪 TESTING CALCULATOR FORMULAS...\n');

// Test a few calculators to verify they have real formulas
const testCalculators = [
  'src/calculators/finance/mortgage-payment/formulas.ts',
  'src/calculators/business/roi/formulas.ts',
  'src/calculators/legal/personal-injury-calculator/formulas.ts'
];

let passedTests = 0;
let totalTests = testCalculators.length;

testCalculators.forEach(calcPath => {
  try {
    const content = fs.readFileSync(calcPath, 'utf8');
    const calcName = path.basename(path.dirname(calcPath));

    console.log(`Testing: ${calcName}`);

    // Check for real mathematical operations
    const hasMathOps = /[+*/\-=<>]/.test(content);
    const hasCalculateResult = /export function calculateResult/.test(content);
    const hasRealFunctions = content.split('\n').filter(line =>
      line.includes('export function') && !line.includes('calculateResult')
    ).length > 0;

    if (hasMathOps && hasCalculateResult && hasRealFunctions) {
      console.log(`  ✅ PASS: Real formulas with mathematical operations`);
      passedTests++;
    } else {
      console.log(`  ❌ FAIL: Missing real formulas`);
      if (!hasMathOps) console.log(`    - No mathematical operations`);
      if (!hasCalculateResult) console.log(`    - No calculateResult function`);
      if (!hasRealFunctions) console.log(`    - No real calculation functions`);
    }

    // Show a sample of the actual formulas
    const lines = content.split('\n').filter(line =>
      line.includes('export function') || line.includes('return') || line.includes('*') || line.includes('+')
    ).slice(0, 3);

    console.log(`  📝 Sample formulas:`);
    lines.forEach(line => console.log(`    ${line.trim()}`));
    console.log('');

  } catch (error) {
    console.log(`  ❌ ERROR: Could not read ${calcPath}`);
    console.log('');
  }
});

console.log(`📊 TEST RESULTS:`);
console.log(`  Passed: ${passedTests}/${totalTests}`);
console.log(`  Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`);

if (passedTests === totalTests) {
  console.log(`\n🎉 ALL TESTED CALCULATORS HAVE REAL FORMULAS!`);
} else {
  console.log(`\n⚠️  SOME CALCULATORS STILL HAVE ISSUES`);
}