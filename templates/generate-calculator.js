#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Calculator Template Generator
 *
 * Generates a complete calculator implementation from templates.
 *
 * Usage: node generate-calculator.js <calculator-name> <category> <subcategory> [description]
 *
 * Example: node generate-calculator.js "Investment Return" finance "Investment Analysis" "Calculate return on investment"
 */

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
}

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '');
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readTemplate(templateName) {
  const templatePath = path.join(__dirname, 'calculator', `${templateName}.template`);
  return fs.readFileSync(templatePath, 'utf8');
}

function replacePlaceholders(content, replacements) {
  let result = content;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

function generateCalculator(calculatorName, category, subcategory, description = '') {
  const baseName = toCamelCase(calculatorName);
  const pascalName = toPascalCase(calculatorName);
  const kebabName = toKebabCase(calculatorName);

  const replacements = {
    'CalculatorName': pascalName,
    'calculator-name': kebabName,
    'Calculator Name': calculatorName,
    'category': category,
    'Subcategory Name': subcategory,
    'Brief description of what this calculator does and its purpose.': description || `Calculate ${calculatorName.toLowerCase()} values and analysis.`,
    'primaryInput': `${baseName}Value`,
    'Primary Input Label': `${calculatorName} Value`,
    'Description of what this input represents': `The primary value for ${calculatorName.toLowerCase()} calculation`,
    'secondaryInput': `${baseName}Rate`,
    'Secondary Input Label': `${calculatorName} Rate`,
    'Description of the secondary input': `The rate or percentage for ${calculatorName.toLowerCase()}`,
    'selectInput': `${baseName}Type`,
    'Select Input Label': `${calculatorName} Type`,
    'Choose from available options': `Select the type of ${calculatorName.toLowerCase()}`,
    'primaryResult': `${baseName}Result`,
    'Primary Result': `${calculatorName} Result`,
    'Explanation of what this result represents': `The calculated ${calculatorName.toLowerCase()} result`,
    'secondaryResult': `${baseName}Percentage`,
    'Secondary Result': `${calculatorName} Percentage`,
    'Explanation of the secondary result': `The percentage result for ${calculatorName.toLowerCase()}`
  };

  // Create calculator directory
  const calculatorDir = path.join(__dirname, '..', 'src', 'calculators', category, kebabName);
  fs.mkdirSync(calculatorDir, { recursive: true });

  // Generate files from templates
  const templates = [
    'CalculatorNameCalculator.ts',
    'types.ts',
    'formulas.ts',
    'validation.ts',
    'quickValidation.ts',
    'CalculatorNameCalculator.test.ts',
    'index.ts',
    'register.ts'
  ];

  templates.forEach(template => {
    const templateContent = readTemplate(template);
    const fileContent = replacePlaceholders(templateContent, replacements);
    const fileName = template.replace('CalculatorName', pascalName);
    const filePath = path.join(calculatorDir, fileName);
    fs.writeFileSync(filePath, fileContent);
    console.log(`Generated: ${filePath}`);
  });

  console.log(`\nCalculator "${calculatorName}" generated successfully!`);
  console.log(`Location: ${calculatorDir}`);
  console.log('\nNext steps:');
  console.log('1. Review and customize the generated files');
  console.log('2. Implement the actual calculation formulas in formulas.ts');
  console.log('3. Update validation rules in validation.ts');
  console.log('4. Add the calculator to the registry in src/data/calculatorRegistry.ts');
  console.log('5. Run tests: npm test');
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('Usage: node generate-calculator.js <calculator-name> <category> <subcategory> [description]');
  console.error('Example: node generate-calculator.js "Investment Return" finance "Investment Analysis" "Calculate return on investment"');
  process.exit(1);
}

const [calculatorName, category, subcategory, ...descriptionParts] = args;
const description = descriptionParts.join(' ');

try {
  generateCalculator(calculatorName, category, subcategory, description);
} catch (error) {
  console.error('Error generating calculator:', error.message);
  process.exit(1);
}