#!/usr/bin/env ts-node

/**
 * Calculator Verification Script
 * 
 * This script verifies that all calculators marked as "COMPLETED" in the 
 * calculator list actually meet the completion standards.
 */

import * as fs from 'fs';
import * as path from 'path';
import { calculatorRegistry } from '../src/data/calculatorRegistry';

interface CalculatorStatus {
  name: string;
  path: string;
  hasMainFile: boolean;
  hasFormulas: boolean;
  hasValidation: boolean;
  hasQuickValidation: boolean;
  hasTests: boolean;
  hasIndex: boolean;
  isRegistered: boolean;
  issues: string[];
}

const REQUIRED_FILES = [
  'Calculator.ts',
  'formulas.ts', 
  'validation.ts',
  'quickValidation.ts',
  'Calculator.test.ts',
  'index.ts'
];

/**
 * Check if a calculator directory has all required files
 */
function checkCalculatorFiles(calculatorPath: string, calculatorName: string): CalculatorStatus {
  const status: CalculatorStatus = {
    name: calculatorName,
    path: calculatorPath,
    hasMainFile: false,
    hasFormulas: false,
    hasValidation: false,
    hasQuickValidation: false,
    hasTests: false,
    hasIndex: false,
    isRegistered: false,
    issues: []
  };

  if (!fs.existsSync(calculatorPath)) {
    status.issues.push('Directory does not exist');
    return status;
  }

  const files = fs.readdirSync(calculatorPath);
  
  // Check for main calculator file
  const mainFile = files.find(f => f.endsWith('Calculator.ts') && !f.endsWith('.test.ts'));
  status.hasMainFile = !!mainFile;
  if (!mainFile) {
    status.issues.push('Missing main calculator file (*Calculator.ts)');
  }

  // Check for other required files
  status.hasFormulas = files.includes('formulas.ts');
  if (!status.hasFormulas) {
    status.issues.push('Missing formulas.ts');
  }

  status.hasValidation = files.includes('validation.ts');
  if (!status.hasValidation) {
    status.issues.push('Missing validation.ts');
  }

  status.hasQuickValidation = files.includes('quickValidation.ts');
  if (!status.hasQuickValidation) {
    status.issues.push('Missing quickValidation.ts');
  }

  const testFile = files.find(f => f.endsWith('Calculator.test.ts'));
  status.hasTests = !!testFile;
  if (!testFile) {
    status.issues.push('Missing test file (*Calculator.test.ts)');
  }

  status.hasIndex = files.includes('index.ts');
  if (!status.hasIndex) {
    status.issues.push('Missing index.ts');
  }

  // Check if registered (this would need to be updated based on actual registry)
  // For now, we'll check if it appears in the registry
  const registeredCalculators = calculatorRegistry.getAllCalculators();
  const calculatorId = calculatorName.toLowerCase().replace(/\s+/g, '-');
  status.isRegistered = registeredCalculators.some(calc => 
    calc.id.includes(calculatorId) || calc.title.toLowerCase().includes(calculatorName.toLowerCase())
  );

  if (!status.isRegistered) {
    status.issues.push('Not registered in calculator registry');
  }

  return status;
}

/**
 * Scan all calculator directories
 */
function scanCalculators(): CalculatorStatus[] {
  const calculatorsDir = path.join(__dirname, '../src/calculators');
  const results: CalculatorStatus[] = [];

  function scanCategory(categoryPath: string) {
    if (!fs.existsSync(categoryPath)) return;
    
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const calculatorPath = path.join(categoryPath, item.name);
        const calculatorName = item.name.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const status = checkCalculatorFiles(calculatorPath, calculatorName);
        results.push(status);
      }
    }
  }

  // Scan each category
  const categories = ['finance', 'business', 'legal', 'health', 'construction', 'math', 'lifestyle', 'technology'];
  
  for (const category of categories) {
    const categoryPath = path.join(calculatorsDir, category);
    scanCategory(categoryPath);
  }

  return results;
}

/**
 * Generate verification report
 */
function generateReport(results: CalculatorStatus[]): void {
  console.log('🔍 CALCULATOR VERIFICATION REPORT');
  console.log('================================\n');

  const completed = results.filter(r => r.issues.length === 0);
  const incomplete = results.filter(r => r.issues.length > 0);

  console.log(`📊 SUMMARY:`);
  console.log(`Total Calculators Found: ${results.length}`);
  console.log(`✅ Fully Complete: ${completed.length}`);
  console.log(`❌ Incomplete: ${incomplete.length}`);
  console.log(`📈 Completion Rate: ${((completed.length / results.length) * 100).toFixed(1)}%\n`);

  if (completed.length > 0) {
    console.log('✅ COMPLETED CALCULATORS:');
    console.log('========================');
    completed.forEach(calc => {
      console.log(`  ✓ ${calc.name}`);
    });
    console.log('');
  }

  if (incomplete.length > 0) {
    console.log('❌ INCOMPLETE CALCULATORS:');
    console.log('==========================');
    incomplete.forEach(calc => {
      console.log(`  ❌ ${calc.name}`);
      calc.issues.forEach(issue => {
        console.log(`     - ${issue}`);
      });
      console.log('');
    });
  }

  console.log('🔧 RECOMMENDATIONS:');
  console.log('===================');
  
  const missingTests = incomplete.filter(c => !c.hasTests).length;
  const missingValidation = incomplete.filter(c => !c.hasValidation).length;
  const missingQuickValidation = incomplete.filter(c => !c.hasQuickValidation).length;
  const notRegistered = incomplete.filter(c => !c.isRegistered).length;

  if (missingTests > 0) {
    console.log(`📝 ${missingTests} calculators need test files`);
  }
  if (missingValidation > 0) {
    console.log(`🔍 ${missingValidation} calculators need validation.ts`);
  }
  if (missingQuickValidation > 0) {
    console.log(`⚡ ${missingQuickValidation} calculators need quickValidation.ts`);
  }
  if (notRegistered > 0) {
    console.log(`📋 ${notRegistered} calculators need to be registered`);
  }

  console.log('\n💡 Next Steps:');
  console.log('1. Complete missing files for incomplete calculators');
  console.log('2. Register unregistered calculators in src/calculators/index.ts');
  console.log('3. Update calculator-list.md to reflect accurate status');
  console.log('4. Run tests to verify functionality');
}

/**
 * Main execution
 */
function main(): void {
  console.log('🚀 Starting calculator verification...\n');
  
  const results = scanCalculators();
  generateReport(results);
  
  console.log('\n✨ Verification complete!');
}

// Run the script
if (require.main === module) {
  main();
}

export { scanCalculators, checkCalculatorFiles, generateReport };