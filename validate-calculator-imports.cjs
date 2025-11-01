#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateCalculatorImports() {
  console.log('🔍 Validating calculator imports...');

  const indexPath = 'src/calculators/index.ts';
  if (!fs.existsSync(indexPath)) {
    console.error('❌ src/calculators/index.ts not found');
    return false;
  }

  const content = fs.readFileSync(indexPath, 'utf8');
  const lines = content.split('\n');

  // Create mapping of calculator names to directories
  const calculatorMap = {};
  const financeDir = 'src/calculators/finance';

  if (fs.existsSync(financeDir)) {
    fs.readdirSync(financeDir).forEach(dir => {
      const dirPath = path.join(financeDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const indexPath = path.join(dirPath, 'index.ts');
        if (fs.existsSync(indexPath)) {
          const indexContent = fs.readFileSync(indexPath, 'utf8');
          const exportMatch = indexContent.match(/export \{ (\w+) \} from '\.\/(\w+)\.ts'/);
          if (exportMatch) {
            calculatorMap[exportMatch[1]] = dir;
          }
        }
      }
    });
  }

  let hasErrors = false;
  let importCount = 0;

  lines.forEach((line, index) => {
    if (line.includes('import') && line.includes('./finance/')) {
      importCount++;
      const match = line.match(/import \{ (\w+) \} from '\.\/finance\/([^']+)'/);
      if (match) {
        const calculatorName = match[1];
        const importPath = match[2];
        const expectedDir = calculatorMap[calculatorName];
        const fullPath = path.join('src/calculators/finance', importPath + '.ts');
        const exists = fs.existsSync(fullPath);

        if (!exists) {
          console.error(`❌ Line ${index + 1}: ${calculatorName} - ./finance/${importPath} does not exist`);
          if (expectedDir) {
            console.error(`   💡 Expected: ./finance/${expectedDir}/${calculatorName}`);
          }
          hasErrors = true;
        }
      }
    }
  });

  console.log(`📊 Checked ${importCount} finance calculator imports`);

  if (!hasErrors) {
    console.log('✅ All calculator imports are valid!');
    return true;
  } else {
    console.log('❌ Found invalid calculator imports');
    return false;
  }
}

// Run validation
if (require.main === module) {
  const isValid = validateCalculatorImports();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateCalculatorImports };