#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CALCULATORS_DIR = 'src/calculators';
const MAIN_INDEX_FILE = 'src/calculators/index.ts';
const LOG_FILE = 'comprehensive_audit_log.txt';

// Required files for each calculator
const REQUIRED_FILES = [
  'CalculatorNameCalculator.ts',
  'formulas.ts',
  'validation.ts',
  'quickValidation.ts',
  'CalculatorNameCalculator.test.ts',
  'register.ts',
  'index.ts'
];

// Audit results
let auditResults = {
  total: 0,
  completed: 0,
  incomplete: 0,
  partial: 0,
  issues: [],
  details: []
};

/**
 * Log message to console and file
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

/**
 * Get all calculator directories
 */
function getAllCalculatorDirs() {
  const categories = fs.readdirSync(CALCULATORS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const calculators = [];
  for (const category of categories) {
    const categoryPath = path.join(CALCULATORS_DIR, category);
    if (fs.existsSync(categoryPath)) {
      const categoryDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => ({
          name: dirent.name,
          category: category,
          path: path.join(categoryPath, dirent.name)
        }));
      calculators.push(...categoryDirs);
    }
  }
  return calculators;
}

/**
 * Check if all required files exist
 */
function checkRequiredFiles(calculator) {
  const issues = [];
  const className = calculator.name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');

  for (const file of REQUIRED_FILES) {
    const actualFile = file.replace('CalculatorName', className);
    const filePath = path.join(calculator.path, actualFile);
    if (!fs.existsSync(filePath)) {
      issues.push(`Missing file: ${actualFile}`);
    }
  }

  return issues;
}

/**
 * Check validation functions have allInputs parameter
 */
function checkValidationSignatures(calculator) {
  const issues = [];
  const quickValidationPath = path.join(calculator.path, 'quickValidation.ts');

  if (!fs.existsSync(quickValidationPath)) {
    return ['quickValidation.ts does not exist'];
  }

  try {
    const content = fs.readFileSync(quickValidationPath, 'utf8');
    const functionMatches = content.match(/export function \w+\([^)]*\)/g) || [];

    for (const func of functionMatches) {
      if (!func.includes('allInputs?: Record<string, any>') && !func.includes('allInputs:')) {
        issues.push(`Validation function missing allInputs parameter: ${func}`);
      }
    }
  } catch (error) {
    issues.push(`Error reading quickValidation.ts: ${error.message}`);
  }

  return issues;
}

/**
 * Check formulas have real mathematical calculations
 */
function checkFormulasQuality(calculator) {
  const issues = [];
  const formulasPath = path.join(calculator.path, 'formulas.ts');

  if (!fs.existsSync(formulasPath)) {
    return ['formulas.ts does not exist'];
  }

  try {
    const content = fs.readFileSync(formulasPath, 'utf8');

    // Check for placeholder content
    if (content.includes('TODO') || content.includes('placeholder') ||
        content.includes('replace with') || content.includes('implement')) {
      issues.push('Contains placeholder content');
    }

    // Check for calculateResult function
    if (!content.includes('calculateResult')) {
      issues.push('Missing calculateResult function');
    }

    // Check for generateAnalysis function
    if (!content.includes('generateAnalysis')) {
      issues.push('Missing generateAnalysis function');
    }

    // Check for real mathematical operations
    const calculateResultMatch = content.match(/export function calculateResult[\s\S]*?\{([\s\S]*?)\}/);
    if (calculateResultMatch) {
      const functionBody = calculateResultMatch[1];
      const hasRealMath = functionBody.includes('Math.') || functionBody.includes('*') ||
                         functionBody.includes('/') || functionBody.includes('+') ||
                         functionBody.includes('-') || functionBody.includes('**') ||
                         functionBody.includes('calculate') || functionBody.includes('Math.pow');

      if (!hasRealMath) {
        issues.push('calculateResult function lacks real mathematical calculations');
      }
    }

  } catch (error) {
    issues.push(`Error reading formulas.ts: ${error.message}`);
  }

  return issues;
}

/**
 * Check if calculator is registered in main index
 */
function checkRegistration(calculator) {
  const issues = [];
  const className = calculator.name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');

  if (!fs.existsSync(MAIN_INDEX_FILE)) {
    return ['Main index.ts does not exist'];
  }

  try {
    const content = fs.readFileSync(MAIN_INDEX_FILE, 'utf8');

    // Check import
    const importPattern = new RegExp(`import.*${className}.*from.*${calculator.category}/${calculator.name}`, 'i');
    if (!importPattern.test(content)) {
      issues.push('Not imported in main index.ts');
    }

    // Check registration
    const registerPattern = new RegExp(`calculatorRegistry\.register\\(${className}\\)`, 'i');
    if (!registerPattern.test(content)) {
      issues.push('Not registered in registerAllCalculators function');
    }

  } catch (error) {
    issues.push(`Error checking registration: ${error.message}`);
  }

  return issues;
}

/**
 * Check test file quality
 */
function checkTestQuality(calculator) {
  const issues = [];
  const className = calculator.name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');

  const testPath = path.join(calculator.path, `${className}.test.ts`);

  if (!fs.existsSync(testPath)) {
    return [`Test file does not exist: ${className}.test.ts`];
  }

  try {
    const content = fs.readFileSync(testPath, 'utf8');

    if (!content.includes('describe(') || !content.includes('it(')) {
      issues.push('Test file lacks proper test structure');
    }

    if (!content.includes('calculateResult') && !content.includes('generateAnalysis')) {
      issues.push('Test file does not test core functions');
    }

  } catch (error) {
    issues.push(`Error reading test file: ${error.message}`);
  }

  return issues;
}

/**
 * Determine completion status
 */
function determineStatus(issues) {
  if (issues.length === 0) {
    return 'completed';
  }

  // Check for critical issues
  const criticalIssues = issues.filter(issue =>
    issue.includes('Missing file:') ||
    issue.includes('does not exist') ||
    issue.includes('Not imported') ||
    issue.includes('Not registered')
  );

  if (criticalIssues.length > 0) {
    return 'incomplete';
  }

  return 'partial';
}

/**
 * Audit single calculator
 */
function auditCalculator(calculator) {
  log(`🔍 Auditing: ${calculator.name} (${calculator.category})`);

  const allIssues = [
    ...checkRequiredFiles(calculator),
    ...checkValidationSignatures(calculator),
    ...checkFormulasQuality(calculator),
    ...checkRegistration(calculator),
    ...checkTestQuality(calculator)
  ];

  const status = determineStatus(allIssues);

  const result = {
    name: calculator.name,
    category: calculator.category,
    status: status,
    issues: allIssues,
    path: calculator.path
  };

  auditResults.details.push(result);

  if (status === 'completed') {
    auditResults.completed++;
    log(`✅ COMPLETED: ${calculator.name}`);
  } else if (status === 'incomplete') {
    auditResults.incomplete++;
    log(`❌ INCOMPLETE: ${calculator.name} (${allIssues.length} issues)`);
  } else {
    auditResults.partial++;
    log(`⚠️  PARTIAL: ${calculator.name} (${allIssues.length} issues)`);
  }

  if (allIssues.length > 0) {
    allIssues.forEach(issue => log(`   - ${issue}`));
  }

  return result;
}

/**
 * Generate audit report
 */
function generateReport() {
  log('\n' + '='.repeat(80));
  log('📊 COMPREHENSIVE CALCULATOR AUDIT REPORT');
  log('='.repeat(80));

  log(`\n📈 SUMMARY:`);
  log(`   Total calculators found: ${auditResults.total}`);
  log(`   ✅ Completed: ${auditResults.completed}`);
  log(`   ⚠️  Partial: ${auditResults.partial}`);
  log(`   ❌ Incomplete: ${auditResults.incomplete}`);

  log(`\n📋 DETAILED RESULTS:`);

  const completed = auditResults.details.filter(c => c.status === 'completed');
  const partial = auditResults.details.filter(c => c.status === 'partial');
  const incomplete = auditResults.details.filter(c => c.status === 'incomplete');

  if (completed.length > 0) {
    log(`\n✅ COMPLETED CALCULATORS (${completed.length}):`);
    completed.forEach(calc => log(`   - ${calc.category}/${calc.name}`));
  }

  if (partial.length > 0) {
    log(`\n⚠️  PARTIAL CALCULATORS (${partial.length}):`);
    partial.forEach(calc => {
      log(`   - ${calc.category}/${calc.name} (${calc.issues.length} issues)`);
      calc.issues.forEach(issue => log(`     • ${issue}`));
    });
  }

  if (incomplete.length > 0) {
    log(`\n❌ INCOMPLETE CALCULATORS (${incomplete.length}):`);
    incomplete.forEach(calc => {
      log(`   - ${calc.category}/${calc.name} (${calc.issues.length} issues)`);
      calc.issues.forEach(issue => log(`     • ${issue}`));
    });
  }

  log(`\n🔍 AUDIT COMPLETED: ${new Date().toISOString()}`);
  log('='.repeat(80));
}

/**
 * Main audit function
 */
async function main() {
  log('🚀 Starting comprehensive calculator audit...');

  // Clear previous log
  if (fs.existsSync(LOG_FILE)) {
    fs.unlinkSync(LOG_FILE);
  }

  const calculators = getAllCalculatorDirs();
  auditResults.total = calculators.length;

  log(`Found ${calculators.length} calculator directories to audit`);

  for (const calculator of calculators) {
    auditCalculator(calculator);
  }

  generateReport();

  log('\n🏁 Audit completed successfully');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log(`💥 Fatal error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  auditCalculator,
  getAllCalculatorDirs,
  generateReport
};