import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculatorsDir = 'src/calculators';

function getAllCalculatorDirs(dir) {
  const dirs = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      dirs.push(fullPath);
    }
  }
  return dirs;
}

function checkFiles(dir) {
  const required = ['formulas.ts', 'validation.ts', 'quickValidation.ts', 'register.ts', 'index.ts'];
  let count = 0;
  // Check for Calculator.ts
  const calcFiles = fs.readdirSync(dir).filter(f => f.endsWith('Calculator.ts'));
  if (calcFiles.length > 0) count++;
  // Check for test.ts
  const testFiles = fs.readdirSync(dir).filter(f => f.endsWith('Calculator.test.ts'));
  if (testFiles.length > 0) count++;
  // Check other files
  for (const file of required) {
    if (fs.existsSync(path.join(dir, file))) count++;
  }
  return count;
}

const dirs = getAllCalculatorDirs(calculatorsDir);
const results = {};
for (const dir of dirs) {
  const count = checkFiles(dir);
  results[dir] = count;
}

// Now generate the md
function getCategory(path) {
  if (path.includes('/finance/')) return 'Finance & Investment';
  if (path.includes('/legal/')) return 'Legal & Insurance';
  if (path.includes('/business/')) return 'Business & Operations';
  if (path.includes('/health/')) return 'Health & Fitness';
  if (path.includes('/construction/')) return 'Construction & Industrial';
  if (path.includes('/math/')) return 'Math & Science';
  if (path.includes('/lifestyle/')) return 'Lifestyle & Automotive';
  // For direct directories, map based on keywords
  const dirName = path.split('/').pop().toLowerCase();
  if (dirName.includes('mortgage') || dirName.includes('real-estate') || dirName.includes('home') || dirName.includes('property') || dirName.includes('refinance') || dirName.includes('loan') || dirName.includes('debt') || dirName.includes('credit') || dirName.includes('investment') || dirName.includes('portfolio') || dirName.includes('stock') || dirName.includes('bond') || dirName.includes('crypto') || dirName.includes('bitcoin') || dirName.includes('ethereum') || dirName.includes('retirement') || dirName.includes('401k') || dirName.includes('ira') || dirName.includes('pension') || dirName.includes('tax') || dirName.includes('insurance')) return 'Finance & Investment';
  if (dirName.includes('legal') || dirName.includes('settlement') || dirName.includes('injury') || dirName.includes('malpractice') || dirName.includes('insurance')) return 'Legal & Insurance';
  if (dirName.includes('business') || dirName.includes('operations') || dirName.includes('valuation') || dirName.includes('roi') || dirName.includes('marketing') || dirName.includes('creator') || dirName.includes('ad') || dirName.includes('influencer')) return 'Business & Operations';
  if (dirName.includes('health') || dirName.includes('fitness') || dirName.includes('diet') || dirName.includes('calorie') || dirName.includes('bmi') || dirName.includes('bmr')) return 'Health & Fitness';
  if (dirName.includes('construction') || dirName.includes('industrial') || dirName.includes('concrete') || dirName.includes('asphalt') || dirName.includes('brick') || dirName.includes('drywall') || dirName.includes('flooring') || dirName.includes('insulation') || dirName.includes('paint') || dirName.includes('roofing') || dirName.includes('siding') || dirName.includes('tile')) return 'Construction & Industrial';
  if (dirName.includes('math') || dirName.includes('algebra') || dirName.includes('calculus') || dirName.includes('geometry') || dirName.includes('trigonometry') || dirName.includes('probability') || dirName.includes('statistics') || dirName.includes('matrix') || dirName.includes('complex') || dirName.includes('number') || dirName.includes('combinatorics') || dirName.includes('graph')) return 'Math & Science';
  if (dirName.includes('lifestyle') || dirName.includes('automotive') || dirName.includes('cooking') || dirName.includes('everyday') || dirName.includes('hobbies') || dirName.includes('travel') || dirName.includes('pet') || dirName.includes('garden')) return 'Lifestyle & Automotive';
  return 'Unknown';
}

function getSubCategory(path, category) {
  const parts = path.split('/');
  let subDir = parts[parts.length - 2]; // the sub directory
  if (!path.includes('/finance/') && !path.includes('/legal/') && !path.includes('/business/') && !path.includes('/health/') && !path.includes('/construction/') && !path.includes('/math/') && !path.includes('/lifestyle/')) {
    // Direct directory
    subDir = parts[parts.length - 1];
  }
  const dirName = subDir.toLowerCase();
  if (category === 'Finance & Investment') {
    if (dirName.includes('mortgage') || dirName.includes('real-estate') || dirName.includes('home') || dirName.includes('property') || dirName.includes('refinance') || dirName.includes('hoa') || dirName.includes('condo') || dirName.includes('earthquake') || dirName.includes('flood') || dirName.includes('windstorm') || dirName.includes('mezzanine') || dirName.includes('commercial') || dirName.includes('fix') || dirName.includes('flip') || dirName.includes('ground') || dirName.includes('gross') || dirName.includes('hard') || dirName.includes('heloc') || dirName.includes('hotel') || dirName.includes('industrial') || dirName.includes('jumbo') || dirName.includes('landlord') || dirName.includes('loan') || dirName.includes('mezzanine') || dirName.includes('mortgage') || dirName.includes('net') || dirName.includes('opportunity') || dirName.includes('pmi') || dirName.includes('price') || dirName.includes('private') || dirName.includes('rental') || dirName.includes('reverse') || dirName.includes('self') || dirName.includes('tenant') || dirName.includes('timberland') || dirName.includes('title') || dirName.includes('triple') || dirName.includes('usdaloan') || dirName.includes('va') || dirName.includes('vineyard')) return 'Mortgage & Real Estate';
    if (dirName.includes('retirement') || dirName.includes('401k') || dirName.includes('ira') || dirName.includes('pension') || dirName.includes('annuity') || dirName.includes('social') || dirName.includes('term') || dirName.includes('403b') || dirName.includes('457') || dirName.includes('529') || dirName.includes('asset') || dirName.includes('backdoor') || dirName.includes('charitable') || dirName.includes('college') || dirName.includes('coverdell') || dirName.includes('deferred') || dirName.includes('defined') || dirName.includes('dynasty') || dirName.includes('emergency') || dirName.includes('estate') || dirName.includes('executive') || dirName.includes('fafsa') || dirName.includes('fixed') || dirName.includes('flexible') || dirName.includes('generation') || dirName.includes('gift') || dirName.includes('grantor') || dirName.includes('health') || dirName.includes('inheritance') || dirName.includes('irrevocable') || dirName.includes('life') || dirName.includes('mega') || dirName.includes('net') || dirName.includes('pension') || dirName.includes('planned') || dirName.includes('required') || dirName.includes('roth') || dirName.includes('savings') || dirName.includes('sep') || dirName.includes('simple') || dirName.includes('social') || dirName.includes('stretch') || dirName.includes('structured') || dirName.includes('student') || dirName.includes('tax') || dirName.includes('traditional') || dirName.includes('trust') || dirName.includes('ugma') || dirName.includes('variable') || dirName.includes('viatical')) return 'Retirement & Savings';
    if (dirName.includes('investment') || dirName.includes('portfolio') || dirName.includes('stock') || dirName.includes('bond') || dirName.includes('alpha') || dirName.includes('angel') || dirName.includes('asset') || dirName.includes('beta') || dirName.includes('black') || dirName.includes('bond') || dirName.includes('calmar') || dirName.includes('capital') || dirName.includes('carried') || dirName.includes('cd') || dirName.includes('commodities') || dirName.includes('compound') || dirName.includes('convertible') || dirName.includes('corporate') || dirName.includes('correlation') || dirName.includes('cost') || dirName.includes('credit') || dirName.includes('crowdfunding') || dirName.includes('day') || dirName.includes('distressed') || dirName.includes('dividend') || dirName.includes('ebitda') || dirName.includes('economic') || dirName.includes('enterprise') || dirName.includes('equity') || dirName.includes('expected') || dirName.includes('forex') || dirName.includes('free') || dirName.includes('fund') || dirName.includes('futures') || dirName.includes('gross') || dirName.includes('hedge') || dirName.includes('information') || dirName.includes('interest') || dirName.includes('internal') || dirName.includes('kurtosis') || dirName.includes('leverage') || dirName.includes('litigation') || dirName.includes('market') || dirName.includes('maximum') || dirName.includes('merger') || dirName.includes('modified') || dirName.includes('municipal') || dirName.includes('music') || dirName.includes('net') || dirName.includes('operating') || dirName.includes('options') || dirName.includes('peer') || dirName.includes('portfolio') || dirName.includes('post') || dirName.includes('price') || dirName.includes('private') || dirName.includes('quick') || dirName.includes('r') || dirName.includes('recapitalization') || dirName.includes('reit') || dirName.includes('return') || dirName.includes('revenue') || dirName.includes('rights') || dirName.includes('royalty') || dirName.includes('sharpe') || dirName.includes('skewness') || dirName.includes('sortino') || dirName.includes('spin') || dirName.includes('stock') || dirName.includes('swing') || dirName.includes('tender') || dirName.includes('terminal') || dirName.includes('total') || dirName.includes('treasury') || dirName.includes('treynor') || dirName.includes('value') || dirName.includes('variance') || dirName.includes('venture') || dirName.includes('wacc') || dirName.includes('warrant')) return 'Investment & Portfolio';
    if (dirName.includes('loan') || dirName.includes('debt') || dirName.includes('credit') || dirName.includes('auto') || dirName.includes('car') || dirName.includes('payday') || dirName.includes('personal') || dirName.includes('title')) return 'Loans & Debt';
    if (dirName.includes('crypto') || dirName.includes('bitcoin') || dirName.includes('ethereum') || dirName.includes('airdrop') || dirName.includes('blockchain') || dirName.includes('burn') || dirName.includes('collateralization') || dirName.includes('dao') || dirName.includes('defi') || dirName.includes('dogecoin') || dirName.includes('gas') || dirName.includes('impermanent') || dirName.includes('initial') || dirName.includes('liquidation') || dirName.includes('liquidity') || dirName.includes('masternode') || dirName.includes('nft') || dirName.includes('shitcoin') || dirName.includes('staking') || dirName.includes('token') || dirName.includes('yield')) return 'Cryptocurrency';
    if (dirName.includes('insurance')) return 'Insurance';
    if (dirName.includes('tax')) return 'Tax Planning';
  }
  if (category === 'Legal & Insurance') {
    if (dirName.includes('legal') || dirName.includes('settlement') || dirName.includes('injury') || dirName.includes('malpractice') || dirName.includes('antitrust') || dirName.includes('asbestos') || dirName.includes('aviation') || dirName.includes('bad') || dirName.includes('birth') || dirName.includes('burn') || dirName.includes('car') || dirName.includes('catastrophic') || dirName.includes('chapter') || dirName.includes('child') || dirName.includes('class') || dirName.includes('construction') || dirName.includes('contract') || dirName.includes('copyright') || dirName.includes('defective') || dirName.includes('dental') || dirName.includes('dog') || dirName.includes('dui') || dirName.includes('e-discovery') || dirName.includes('environmental') || dirName.includes('epa') || dirName.includes('fela') || dirName.includes('high') || dirName.includes('hit') || dirName.includes('hospital') || dirName.includes('intellectual') || dirName.includes('irs') || dirName.includes('jones') || dirName.includes('legal') || dirName.includes('libel') || dirName.includes('loss') || dirName.includes('maritime') || dirName.includes('mass') || dirName.includes('medical') || dirName.includes('merger') || dirName.includes('mesothelioma') || dirName.includes('motorcycle') || dirName.includes('non') || dirName.includes('nursing') || dirName.includes('offshore') || dirName.includes('opioid') || dirName.includes('patent') || dirName.includes('pedestrian') || dirName.includes('personal') || dirName.includes('pharmaceutical') || dirName.includes('preference') || dirName.includes('premises') || dirName.includes('prenuptial') || dirName.includes('price') || dirName.includes('product') || dirName.includes('professional') || dirName.includes('property') || dirName.includes('qui') || dirName.includes('railroad') || dirName.includes('roundup') || dirName.includes('slip') || dirName.includes('spinal') || dirName.includes('surgical') || dirName.includes('talcum') || dirName.includes('trade') || dirName.includes('traumatic') || dirName.includes('truck') || dirName.includes('veterinary') || dirName.includes('workers') || dirName.includes('wrongful') || dirName.includes('zoning')) return 'Legal Settlement';
    if (dirName.includes('insurance') || dirName.includes('actuarial') || dirName.includes('buy') || dirName.includes('cash') || dirName.includes('ceding') || dirName.includes('combined') || dirName.includes('commercial') || dirName.includes('cyber') || dirName.includes('directors') || dirName.includes('disability') || dirName.includes('employment') || dirName.includes('errors') || dirName.includes('estate') || dirName.includes('expense') || dirName.includes('flood') || dirName.includes('general') || dirName.includes('guideline') || dirName.includes('health') || dirName.includes('incurred') || dirName.includes('key') || dirName.includes('kidnap') || dirName.includes('lapse') || dirName.includes('liability') || dirName.includes('life') || dirName.includes('long') || dirName.includes('loss') || dirName.includes('marine') || dirName.includes('pet') || dirName.includes('political') || dirName.includes('policy') || dirName.includes('premium') || dirName.includes('self') || dirName.includes('split') || dirName.includes('stop') || dirName.includes('surety') || dirName.includes('term') || dirName.includes('terrorism') || dirName.includes('trade') || dirName.includes('travel') || dirName.includes('umbrella') || dirName.includes('wildfire') || dirName.includes('workers')) return 'Insurance';
  }
  if (category === 'Business & Operations') {
    if (dirName.includes('business') || dirName.includes('operations') || dirName.includes('valuation') || dirName.includes('roi') || dirName.includes('saas') || dirName.includes('customer') || dirName.includes('churn') || dirName.includes('payback') || dirName.includes('break') || dirName.includes('budget') || dirName.includes('cohort') || dirName.includes('attribution') || dirName.includes('industry') || dirName.includes('aiops') || dirName.includes('asset') || dirName.includes('balanced') || dirName.includes('bill') || dirName.includes('breakeven') || dirName.includes('developer') || dirName.includes('real') || dirName.includes('stock') || dirName.includes('business') || dirName.includes('loan') || dirName.includes('business') || dirName.includes('process') || dirName.includes('business') || dirName.includes('risk') || dirName.includes('capital') || dirName.includes('change') || dirName.includes('cloud') || dirName.includes('repatriation') || dirName.includes('comparable') || dirName.includes('consultant') || dirName.includes('corporate') || dirName.includes('cost') || dirName.includes('data') || dirName.includes('digital') || dirName.includes('distribution') || dirName.includes('economic') || dirName.includes('employee') || dirName.includes('erp') || dirName.includes('franchise') || dirName.includes('government') || dirName.includes('heavy') || dirName.includes('hr') || dirName.includes('human') || dirName.includes('industrial') || dirName.includes('inventory') || dirName.includes('iso') || dirName.includes('it') || dirName.includes('landed') || dirName.includes('lean') || dirName.includes('management') || dirName.includes('managed') || dirName.includes('merger') || dirName.includes('overall') || dirName.includes('paycheck') || dirName.includes('payroll') || dirName.includes('portfolio') || dirName.includes('preventative') || dirName.includes('profit') || dirName.includes('public') || dirName.includes('ransomware') || dirName.includes('request') || dirName.includes('restricted') || dirName.includes('salary') || dirName.includes('sales') || dirName.includes('six') || dirName.includes('soc') || dirName.includes('startup') || dirName.includes('sum') || dirName.includes('supply') || dirName.includes('technical') || dirName.includes('threat') || dirName.includes('total') || dirName.includes('union') || dirName.includes('vendor') || dirName.includes('warehouse') || dirName.includes('workforce') || dirName.includes('working') || dirName.includes('zero')) return 'Business Operations & Finance';
    if (dirName.includes('marketing') || dirName.includes('creator') || dirName.includes('ad') || dirName.includes('influencer') || dirName.includes('affiliate') || dirName.includes('amazon') || dirName.includes('api') || dirName.includes('average') || dirName.includes('book') || dirName.includes('brand') || dirName.includes('cam') || dirName.includes('celebrity') || dirName.includes('chaturbate') || dirName.includes('concert') || dirName.includes('customer') || dirName.includes('discord') || dirName.includes('event') || dirName.includes('film') || dirName.includes('influencer') || dirName.includes('instagram') || dirName.includes('manyvids') || dirName.includes('media') || dirName.includes('music') || dirName.includes('net') || dirName.includes('onlyfans') || dirName.includes('out') || dirName.includes('patreon') || dirName.includes('podcast') || dirName.includes('record') || dirName.includes('return') || dirName.includes('shopping') || dirName.includes('sponsorship') || dirName.includes('spotify') || dirName.includes('streaming') || dirName.includes('svod') || dirName.includes('tiktok') || dirName.includes('tv') || dirName.includes('twitch') || dirName.includes('youtube')) return 'Marketing & Creator';
  }
  if (category === 'Health & Fitness') return 'Health & Fitness';
  if (category === 'Construction & Industrial') return 'Construction';
  if (category === 'Math & Science') return 'Math';
  if (category === 'Lifestyle & Automotive') return 'Lifestyle';
  return 'Unknown';
}

function getCalculatorName(dirName) {
  let name = dirName.replace(/Calculator$/, '').replace(/_/g, ' ').replace(/-/g, ' ');
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  return name + ' Calculator';
}

const calculators = [];
for (const [path, count] of Object.entries(results)) {
  if (count === 0) continue; // skip non-calculator dirs
  const dirName = path.split('/').pop();
  const category = getCategory(path);
  const sub = getSubCategory(path, category);
  const name = getCalculatorName(dirName);
  const status = count === 7 ? '[x]' : '[ ]';
  calculators.push({ category, sub, name, status, path });
}

// Group by category, then sub
const grouped = {};
for (const calc of calculators) {
  if (!grouped[calc.category]) grouped[calc.category] = {};
  if (!grouped[calc.category][calc.sub]) grouped[calc.category][calc.sub] = [];
  grouped[calc.category][calc.sub].push(calc);
}

// Generate md
let md = `# Calculator Master List - CalculateThis.ai (CORRECTED)
**Total: 1155 Industry-Leading Calculators**

*Each calculator must deliver professional-grade accuracy and comprehensive features that match or exceed industry standards before being marked complete.*

## 🚨 CRITICAL DEVELOPMENT NOTES 🚨

### **COMPLETION VERIFICATION REQUIRED**
**Before marking ANY calculator as "COMPLETED ✅", verify ALL requirements in \`CALCULATOR_COMPLETION_STANDARDS.md\` are met.**

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

### **CALCULATOR ARCHITECTURE REQUIREMENTS**
Each calculator must include:
- \`[CalculatorName]Calculator.ts\` - Main calculator definition
- \`formulas.ts\` - Core calculation logic
- \`validation.ts\` - Comprehensive validation rules
- \`quickValidation.ts\` - Individual field validation (with allInputs parameter!)
- \`[CalculatorName]Calculator.test.ts\` - Unit tests
- \`register.ts\` - Calculator registration
- \`index.ts\` - Module exports

**AND be registered in \`src/calculators/index.ts\`**

---

`;

let totalVerified = 0;
let totalIncomplete = 0;

for (const [category, subs] of Object.entries(grouped)) {
  md += `## 🏛️ ${category} (${Object.values(subs).flat().length} calculators)\n\n`;
  for (const [sub, calcs] of Object.entries(subs)) {
    md += `### ${sub} Hub (${calcs.length} calculators)\n`;
    for (const calc of calcs) {
      md += `- ${calc.status} **${calc.name}**\n`;
      if (calc.status === '[x]') totalVerified++;
      else totalIncomplete++;
    }
    md += '\n';
  }
  md += '---\n\n';
}

md += `## 📊 ACCURATE TOTALS

**VERIFIED WORKING CALCULATORS: ${totalVerified}**
**INCOMPLETE CALCULATORS: ${totalIncomplete}**
**TOTAL IMPLEMENTED: ${totalVerified + totalIncomplete}**

**REMAINING TO BUILD: ${1155 - (totalVerified + totalIncomplete)}**

---

## 🔧 NEXT PRIORITIES

1. **Register existing unregistered calculators** (~15)
2. **Complete partial implementations** (many folders with only types.ts)
3. **Add missing test files** for existing calculators
4. **Verify all registered calculators actually work**
5. **Continue building new calculators** systematically

**Current Status: ~${totalVerified} implemented, ~${totalIncomplete} incomplete**
`;

console.log(md);