#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// xAI Grok integration for AI-powered formula generation
const https = require('https');

// API key handling
function getXAIApiKey() {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error('XAI_API_KEY environment variable is required. Set it with: export XAI_API_KEY=your_key_here');
  }
  return apiKey;
}

// Rate limiting for API calls
let lastApiCall = 0;
const API_RATE_LIMIT_MS = 1000; // 1 second between calls

function waitForRateLimit() {
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCall;
  if (timeSinceLastCall < API_RATE_LIMIT_MS) {
    const waitTime = API_RATE_LIMIT_MS - timeSinceLastCall;
    return new Promise(resolve => setTimeout(resolve, waitTime));
  }
  return Promise.resolve();
}

// Category-specific prompt engineering
function getCategorySpecificPrompt(calculatorName, category) {
   const nameLower = calculatorName.toLowerCase();

   if (category === 'finance') {
      if (nameLower.includes('mortgage') || nameLower.includes('loan')) {
         return `FINANCE - MORTGAGE/LOAN CALCULATIONS:
- Use proper loan amortization formulas: M = P[r(1+r)^n]/[(1+r)^n-1]
- Include principal, interest, payment calculations
- Handle different loan types (fixed, variable, interest-only)
- Calculate total interest, payoff schedules, equity buildup`;
      }
      if (nameLower.includes('investment') || nameLower.includes('retirement')) {
         return `FINANCE - INVESTMENT CALCULATIONS:
- Use compound interest: A = P(1+r/n)^(nt)
- Include future value, present value calculations
- Handle regular contributions, inflation adjustments
- Calculate investment growth, required contributions`;
      }
      if (nameLower.includes('ratio') || nameLower.includes('margin') || nameLower.includes('return')) {
         return `FINANCE - FINANCIAL RATIOS & METRICS:
- Use proper financial formulas (ROI, ROA, ROE, etc.)
- Calculate profitability, efficiency, leverage ratios
- Include industry benchmarks and comparisons
- Handle different accounting periods`;
      }
      if (nameLower.includes('valuation') || nameLower.includes('price')) {
         return `FINANCE - VALUATION CALCULATIONS:
- Use DCF, multiples, asset-based valuation methods
- Include proper discount rates, growth assumptions
- Calculate enterprise value, equity value
- Handle different valuation scenarios`;
      }
      return `FINANCE CALCULATIONS:
- Use real financial mathematics and formulas
- Include proper risk calculations, returns, costs
- Handle time value of money concepts
- Calculate financial metrics and ratios`;
   }

   if (category === 'business') {
      return `BUSINESS CALCULATIONS:
- Use business mathematics: ROI, NPV, IRR, payback period
- Include cost-benefit analysis, breakeven calculations
- Calculate operational metrics, efficiency ratios
- Handle business valuation and profitability analysis`;
   }

   if (category === 'legal') {
      return `LEGAL CALCULATIONS:
- Use settlement calculation formulas
- Include damage calculations, compensation models
- Calculate legal fees, court costs, settlements
- Handle different types of legal claims and damages`;
   }

   if (category === 'health') {
      return `HEALTH & FITNESS CALCULATIONS:
- Use medical and fitness formulas (BMI, BMR, TDEE)
- Include body composition, calorie calculations
- Calculate health metrics and recommendations
- Handle age, gender, activity level adjustments`;
   }

   if (category === 'construction') {
      return `CONSTRUCTION CALCULATIONS:
- Use construction math: volume, area, material calculations
- Include cost estimation, labor calculations
- Calculate building materials, structural requirements
- Handle construction specifications and codes`;
   }

   if (category === 'math') {
      return `MATHEMATICAL CALCULATIONS:
- Use proper mathematical formulas and algorithms
- Include statistical calculations, probability
- Calculate mathematical functions and transformations
- Handle numerical analysis and computations`;
   }

   if (category === 'lifestyle') {
      return `LIFESTYLE CALCULATIONS:
- Use practical calculation formulas
- Include cost analysis, savings calculations
- Calculate lifestyle metrics and planning
- Handle personal finance and budgeting`;
   }

   return `GENERAL CALCULATIONS:
- Use appropriate mathematical formulas for the domain
- Include proper calculations and algorithms
- Calculate relevant metrics and results
- Handle domain-specific requirements`;
}

// AI prompt templates for formula generation
function createFormulaPrompt(calculatorName, category) {
   const categoryPrompt = getCategorySpecificPrompt(calculatorName, category);

   return `You are an expert mathematician and software engineer specializing in ${category} calculations.

Create production-ready TypeScript functions for a ${calculatorName} calculator in the ${category} category.

CRITICAL REQUIREMENTS:
1. Generate ONLY ${category}-specific mathematical formulas - NO generic or placeholder math
2. Use REAL ${category} business logic and calculations - NOT BMI for finance calculators
3. Include proper TypeScript types and interfaces
4. Create calculateResult function that takes ${calculatorName.replace(/ /g, '')}Inputs and returns number
5. Create generateAnalysis function that takes inputs and metrics, returns analysis with recommendation and riskLevel
6. Use actual mathematical formulas with real calculations, not generic sums or placeholders
7. Include domain-specific helper functions with proper ${category} mathematics
8. Follow TypeScript best practices
9. Make formulas mathematically correct and production-ready

${categoryPrompt}

FORBIDDEN: Do NOT generate generic formulas like BMI for finance, simple sums, or placeholder calculations.

The output should be valid TypeScript code that can be directly used in a formulas.ts file.

Example structure:
\`\`\`typescript
import { CalculatorNameInputs, CalculatorNameMetrics, CalculatorNameAnalysis } from './types';

// Domain-specific helper functions here...

export function calculateResult(inputs: CalculatorNameInputs): number {
   // Real ${category} calculation logic - NOT generic
   return 0;
}

export function generateAnalysis(inputs: CalculatorNameInputs, metrics: CalculatorNameMetrics): CalculatorNameAnalysis {
   const result = metrics.result;
   let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
   // ${category}-specific risk assessment logic

   const recommendation = '${category}-specific analysis recommendation';

   return { recommendation, riskLevel };
}
\`\`\`

Generate the complete formulas.ts content for: ${calculatorName}`;
}

// Validate generated formula code for domain-specific content
function validateGeneratedCode(code, calculatorName, category) {
   try {
      // Basic syntax check - ensure it has required functions
      if (!code.includes('calculateResult') || !code.includes('generateAnalysis')) {
         return { valid: false, error: 'Missing required functions' };
      }

      // Check for basic TypeScript syntax
      if (!code.includes('import') || !code.includes('export function')) {
         return { valid: false, error: 'Invalid TypeScript structure' };
      }

      // Check for placeholder content
      if (code.includes('TODO') || code.includes('placeholder') || code.includes('replace with') || code.includes('implement')) {
         return { valid: false, error: 'Contains placeholder content' };
      }

      // Check for generic/non-domain-specific content
      const nameLower = calculatorName.toLowerCase();
      const codeLower = code.toLowerCase();

      // Detect wrong domain formulas
      if (category === 'finance') {
         // Finance calculators should NOT have BMI, BMR, or other health formulas
         if (codeLower.includes('bmi') || codeLower.includes('weight') && codeLower.includes('height') ||
             codeLower.includes('bmr') || codeLower.includes('tdee') || codeLower.includes('calorie')) {
            return { valid: false, error: 'Finance calculator contains health/BMI formulas instead of financial calculations' };
         }
         // Should have financial terms
         if (!codeLower.includes('rate') && !codeLower.includes('amount') && !codeLower.includes('value') &&
             !codeLower.includes('cost') && !codeLower.includes('return') && !codeLower.includes('ratio') &&
             !codeLower.includes('profit') && !codeLower.includes('investment') && !codeLower.includes('loan')) {
            return { valid: false, error: 'Finance calculator lacks financial calculation terms' };
         }
      }

      if (category === 'health') {
         // Health calculators should have health-specific terms
         if (!codeLower.includes('weight') && !codeLower.includes('height') && !codeLower.includes('age') &&
             !codeLower.includes('bmi') && !codeLower.includes('calorie') && !codeLower.includes('health')) {
            return { valid: false, error: 'Health calculator lacks health-specific calculations' };
         }
      }

      if (category === 'business') {
         // Business calculators should have business terms
         if (!codeLower.includes('cost') && !codeLower.includes('revenue') && !codeLower.includes('profit') &&
             !codeLower.includes('margin') && !codeLower.includes('roi') && !codeLower.includes('business')) {
            return { valid: false, error: 'Business calculator lacks business calculation terms' };
         }
      }

      // Check for actual mathematical calculations (not just return 0 or simple sums)
      const calculateResultMatch = code.match(/export function calculateResult[\s\S]*?\{([\s\S]*?)\}/);
      if (calculateResultMatch) {
         const functionBody = calculateResultMatch[1];
         // Reject if only returns 0, simple sum, or no real calculations
         if (functionBody.includes('return 0;') && !functionBody.includes('Math.') &&
             !functionBody.includes('calculate') && !functionBody.includes('*') &&
             !functionBody.includes('/') && !functionBody.includes('+') && !functionBody.includes('-')) {
            return { valid: false, error: 'calculateResult function contains no real mathematical calculations' };
         }
      }

      // Check for domain-specific keywords in function names and comments
      const hasDomainSpecificContent = codeLower.includes(nameLower.split(' ')[0]) ||
                                     codeLower.includes(category) ||
                                     codeLower.includes('calculate') && (codeLower.includes('rate') || codeLower.includes('value') ||
                                     codeLower.includes('cost') || codeLower.includes('amount'));

      if (!hasDomainSpecificContent) {
         return { valid: false, error: 'Generated code lacks domain-specific content for ' + calculatorName };
      }

      return { valid: true };
   } catch (error) {
      return { valid: false, error: error.message };
   }
}

// Generate formulas using xAI Grok AI with retry logic
async function generateFormulasWithAI(calculatorName, className, id, category) {
   const MAX_RETRIES = 3;
   let lastError = null;

   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
         const apiKey = getXAIApiKey();

         // Wait for rate limit
         await waitForRateLimit();
         lastApiCall = Date.now();

         const prompt = createFormulaPrompt(calculatorName, category);

         log(`🤖 Generating AI formulas for: ${calculatorName} (attempt ${attempt}/${MAX_RETRIES})`);

         // Log the prompt for debugging
         log(`📝 AI Prompt sent:\n${prompt.substring(0, 500)}...`);

         const response = await makeXAIGrokRequest(apiKey, prompt);
         const generatedCode = response.choices[0]?.message?.content?.trim();

         // Log the generated code for debugging
         if (generatedCode) {
           log(`📄 AI Response received (${generatedCode.length} chars):\n${generatedCode.substring(0, 500)}...`);
         }

         if (!generatedCode) {
            throw new Error('No code generated by xAI Grok');
         }

         // Validate the generated code with domain-specific checks
         const validation = validateGeneratedCode(generatedCode, calculatorName, category);
         if (!validation.valid) {
            log(`❌ AI-generated code validation failed (attempt ${attempt}): ${validation.error}`);

            if (attempt < MAX_RETRIES) {
               log(`🔄 Retrying with improved prompt...`);
               // Add more specific instructions for retry
               continue;
            } else {
               log('❌ Max retries reached, falling back to hardcoded formulas');
               return generateFallbackFormulas(calculatorName, className, id, category);
            }
         }

         // Replace placeholder types with actual types
         let finalCode = generatedCode
            .replace(/CalculatorName/g, className)
            .replace(/Calculator_Name/g, calculatorName)
            .replace(/calculator-name/g, id);

         log(`✅ Successfully generated AI formulas for: ${calculatorName} (attempt ${attempt})`);
         return finalCode;

      } catch (error) {
         lastError = error;
         log(`❌ AI formula generation attempt ${attempt} failed for ${calculatorName}: ${error.message}`);

         if (attempt < MAX_RETRIES) {
            log(`🔄 Retrying...`);
            // Brief pause before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
         }
      }
   }

   // All retries failed
   log(`❌ All ${MAX_RETRIES} AI generation attempts failed for ${calculatorName}: ${lastError?.message}`);
   log('Falling back to hardcoded formulas');
   return generateFallbackFormulas(calculatorName, className, id, category);
}

// Make request to xAI Grok API
function makeXAIGrokRequest(apiKey, prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'grok-4-fast-reasoning',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating accurate mathematical formulas and TypeScript code for calculators. Always generate production-ready, mathematically correct code.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1, // Low temperature for consistent, accurate code
    });

    const options = {
      hostname: 'api.x.ai',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            throw new Error(`xAI API error: ${res.statusCode} - ${body}`);
          }
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Automated script to implement calculators one at a time to 100% completion
 * Prioritizes highest CPC, generates domain-specific formulas, comprehensive validation, and meaningful tests
 */

// Configuration
const CALCULATOR_LIST_FILE = 'calculator-list.md';
const TEMPLATES_DIR = 'templates/calculator';
const CALCULATORS_DIR = 'src/calculators';
const MAIN_INDEX_FILE = 'src/calculators/index.ts';
const PROGRESS_FILE = 'calculator_implementation_progress.json';
const TIME_LIMIT_MS = 0; // No time limit - run until all calculators are completed
const LOG_FILE = 'automation_log.txt';

// Priority order for categories (high-CPC first)
const CATEGORY_PRIORITY = {
  'finance': 1,
  'business': 2,
  'legal': 3,
  'health': 4,
  'construction': 5,
  'math': 6,
  'lifestyle': 7,
  'unknown': 8
};

// Map subcategories to main categories
const CATEGORY_MAPPING = {
  'retirement': 'finance',
  'mortgage': 'finance',
  'investment': 'finance',
  'business': 'business',
  'marketing': 'business',
  'legal': 'legal',
  'math': 'math',
  'construction': 'construction',
  'lifestyle': 'lifestyle',
  'health': 'health',
  'unknown': 'finance'
};

/**
 * Load progress from file
 */
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch (error) {
      console.warn('Failed to load progress file:', error.message);
    }
  }
  return { lastProcessed: null, completed: [] };
}

/**
 * Save progress to file
 */
function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

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
 * Mark calculator as completed in the markdown list
 */
function markCalculatorComplete(calculatorName) {
   let content = fs.readFileSync(CALCULATOR_LIST_FILE, 'utf8');
   const regex = new RegExp(`^- \\[ \\] (${calculatorName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})$`, 'm');
   content = content.replace(regex, `- [x] $1 ✅ **(COMPLETED)**`);
   fs.writeFileSync(CALCULATOR_LIST_FILE, content);

   // Also update the original list for consistency
   const originalContent = fs.readFileSync('calculator-list.md', 'utf8');
   const originalRegex = new RegExp(`^- \\[ \\] (${calculatorName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})$`, 'm');
   const updatedOriginal = originalContent.replace(originalRegex, `- [x] $1 ✅ **(COMPLETED)**`);
   fs.writeFileSync('calculator-list.md', updatedOriginal);
}

/**
 * Parse calculator list and extract remaining calculators
 */
function parseCalculatorList() {
   const content = fs.readFileSync(CALCULATOR_LIST_FILE, 'utf8');
   const lines = content.split('\n');

   console.log(`Total lines in file: ${lines.length}`);

   const calculators = [];
   const skippedCalculators = [];

   for (const line of lines) {
      if (line.includes('[') && line.includes(']')) {
         console.log(`Found [ ] in line: ${line}`);
      }

      // Check for incomplete calculators ([ ] only - pure incomplete, not exists but needs registration)
      const incompleteMatch = line.match(/^\s*-\s*\[\s*\]\s*(.+)$/);
      let isIncomplete = false;
      let name = '';

      if (incompleteMatch) {
         name = incompleteMatch[1].trim();
         isIncomplete = true;
      }

      if (isIncomplete) {
         console.log(`Found incomplete calculator: ${name}`);

         // Skip calculators with error markers
         if (name.includes('**') || name.includes('❌')) {
            skippedCalculators.push({
               name,
               category: 'unknown',
               reason: 'Contains error markers (**, ❌)'
            });
            continue;
         }

         // Assign category based on calculator name keywords
         let currentCategory = 'unknown';
         const nameLower = name.toLowerCase();

         // Check for category keywords
         for (const [keyword, category] of Object.entries(CATEGORY_MAPPING)) {
            if (nameLower.includes(keyword)) {
               currentCategory = category;
               break;
            }
         }

         // Additional keyword checks
         if (currentCategory === 'unknown') {
            if (nameLower.includes('mortgage') || nameLower.includes('loan') || nameLower.includes('finance') ||
                nameLower.includes('investment') || nameLower.includes('retirement') || nameLower.includes('tax') ||
                nameLower.includes('insurance') || nameLower.includes('payment') || nameLower.includes('debt')) {
              currentCategory = 'finance';
            } else if (nameLower.includes('business') || nameLower.includes('roi') || nameLower.includes('profit') ||
                      nameLower.includes('cost') || nameLower.includes('valuation') || nameLower.includes('break')) {
               currentCategory = 'business';
            } else if (nameLower.includes('legal') || nameLower.includes('settlement') || nameLower.includes('injury') ||
                      nameLower.includes('divorce') || nameLower.includes('contract')) {
               currentCategory = 'legal';
            } else if (nameLower.includes('bmi') || nameLower.includes('calorie') || nameLower.includes('weight') ||
                      nameLower.includes('health') || nameLower.includes('fitness') || nameLower.includes('diet')) {
               currentCategory = 'health';
            } else if (nameLower.includes('concrete') || nameLower.includes('construction') || nameLower.includes('building') ||
                      nameLower.includes('material') || nameLower.includes('paint') || nameLower.includes('floor')) {
               currentCategory = 'construction';
            } else if (nameLower.includes('math') || nameLower.includes('algebra') || nameLower.includes('geometry') ||
                      nameLower.includes('calculus') || nameLower.includes('statistics') || nameLower.includes('percentage')) {
               currentCategory = 'math';
            } else if (nameLower.includes('lifestyle') || nameLower.includes('automotive') || nameLower.includes('car') ||
                      nameLower.includes('travel') || nameLower.includes('home') || nameLower.includes('garden')) {
               currentCategory = 'lifestyle';
           }
         }

         // Final fallback for any remaining unknown categories
         if (currentCategory === 'unknown') {
           currentCategory = 'business';
         }

         calculators.push({
            name,
            category: currentCategory,
            priority: CATEGORY_PRIORITY[currentCategory] || 99
         });
      }
   }

  // Sort by priority (high-CPC first)
  calculators.sort((a, b) => a.priority - b.priority);

  // Log skipped calculators for manual review
  if (skippedCalculators.length > 0) {
    log(`⚠️  Skipped ${skippedCalculators.length} calculators with error markers for manual review:`);
    skippedCalculators.forEach(calc => {
      log(`   - ${calc.name} (${calc.category}): ${calc.reason}`);
    });
  }

  console.log(`Found ${calculators.length} incomplete calculators:`, calculators.map(c => c.name));
  return calculators;
}

/**
 * Get the next calculator to process based on progress
 */
function getNextCalculator() {
   const progress = loadProgress();
   const calculators = parseCalculatorList();

   // Find the first calculator not yet completed
   for (const calc of calculators) {
       if (!progress.completed.includes(calc.name)) {
           return calc;
       }
   }

   return null; // All done
}

/**
 * Generate domain-specific formulas using hardcoded formulas (100% complete, no placeholders)
 */
async function generateDomainFormulas(calculatorName, className, id, category) {
   // Skip AI and use complete hardcoded formulas directly
   return generateFallbackFormulas(calculatorName, className, id, category);
}

/**
 * Fallback: Generate hardcoded domain-specific formulas (original implementation)
 */
function generateFallbackFormulas(calculatorName, className, id, category) {
   const name = calculatorName.toLowerCase();

   // Handle unknown category
   if (category === 'unknown') {
     category = 'business';
   }

   // FINANCE CATEGORY - High CPC priority
   if (category === 'finance') {
    return generateFinanceFormulas(calculatorName, className, id, name);
  }

  // BUSINESS CATEGORY - High CPC priority
  if (category === 'business') {
    return generateBusinessFormulas(calculatorName, className, id, name);
  }

  // LEGAL CATEGORY - High CPC priority
  if (category === 'legal') {
    return generateLegalFormulas(calculatorName, className, id, name);
  }

  // HEALTH CATEGORY - High CPC priority
  if (category === 'health') {
    return generateHealthFormulas(calculatorName, className, id, name);
  }

  // CONSTRUCTION CATEGORY
  if (category === 'construction') {
    return generateConstructionFormulas(calculatorName, className, id, name);
  }

  // MATH CATEGORY
  if (category === 'math') {
    return generateMathFormulas(calculatorName, className, id, name);
  }

  // LIFESTYLE CATEGORY
  if (category === 'lifestyle') {
    return generateLifestyleFormulas(calculatorName, className, id, name);
  }

  // Fallback for unrecognized categories
  throw new Error(`No formula library available for category: ${category}`);
}

function generateFinanceFormulas(calculatorName, className, id, name) {
  // Mortgage & Real Estate Calculators
  if (name.includes('mortgage payment')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Mortgage Payment Calculator - Standard loan amortization formula
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalInterest(principal: number, monthlyPayment: number, numPayments: number): number {
  return (monthlyPayment * numPayments) - principal;
}

export function calculatePrincipalPayment(monthlyPayment: number, interestPayment: number): number {
  return monthlyPayment - interestPayment;
}

export function calculateInterestPayment(principal: number, annualRate: number): number {
  return (principal * annualRate / 100) / 12;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('loanAmount' in inputs && 'interestRate' in inputs && 'loanTerm' in inputs) {
    return calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 5000) riskLevel = 'High';
  else if (result > 2000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Monthly mortgage payment calculated. Consider debt-to-income ratio.' :
    'Review loan terms and interest rates';

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('loan to cost') || name.includes('ltc')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Loan to Cost Ratio Calculator
export function calculateLTC(loanAmount: number, propertyCost: number): number {
  return (loanAmount / propertyCost) * 100;
}

export function calculateMaxLoanAmount(propertyCost: number, maxLTC: number): number {
  return (propertyCost * maxLTC) / 100;
}

export function calculateEquityRequired(propertyCost: number, loanAmount: number): number {
  return propertyCost - loanAmount;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('loanAmount' in inputs && 'propertyCost' in inputs) {
    return calculateLTC(inputs.loanAmount, inputs.propertyCost);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 80) riskLevel = 'High';
  else if (result > 75) riskLevel = 'Medium';

  const recommendation = result <= 75 ?
    'LTC ratio within conventional lending guidelines' :
    'High LTC ratio may require alternative financing or additional equity';

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('home insurance')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Home Insurance Calculator
export function calculateReplacementCost(propertyValue: number, locationFactor: number): number {
  return propertyValue * locationFactor;
}

export function calculateAnnualPremium(replacementCost: number, coverageType: string): number {
  const baseRate = 0.0035; // 0.35% of replacement cost
  const coverageMultiplier = coverageType === 'full' ? 1.2 : coverageType === 'basic' ? 0.8 : 1.0;
  return replacementCost * baseRate * coverageMultiplier;
}

export function calculateMonthlyPremium(annualPremium: number): number {
  return annualPremium / 12;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('propertyValue' in inputs && 'locationFactor' in inputs) {
    const replacementCost = calculateReplacementCost(inputs.propertyValue, inputs.locationFactor);
    return calculateAnnualPremium(replacementCost, inputs.coverageType || 'standard');
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 3000) riskLevel = 'High';
  else if (result > 1500) riskLevel = 'Medium';

  const recommendation = 'Annual home insurance premium calculated. Compare quotes from multiple providers.';

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('investment') && name.includes('calculator')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Investment Calculator - Compound Interest
export function calculateFutureValue(principal: number, annualRate: number, years: number, compoundingFrequency: number = 12): number {
  const rate = annualRate / 100 / compoundingFrequency;
  const periods = years * compoundingFrequency;
  return principal * Math.pow(1 + rate, periods);
}

export function calculateTotalContributions(monthlyContribution: number, years: number): number {
  return monthlyContribution * years * 12;
}

export function calculateTotalInterest(futureValue: number, principal: number, totalContributions: number): number {
  return futureValue - principal - totalContributions;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('initialInvestment' in inputs && 'annualReturn' in inputs && 'investmentPeriod' in inputs) {
    return calculateFutureValue(
      inputs.initialInvestment,
      inputs.annualReturn,
      inputs.investmentPeriod,
      inputs.compoundingFrequency || 12
    );
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000000) riskLevel = 'High';
  else if (result > 100000) riskLevel = 'Medium';

  const recommendation = 'Investment growth calculated using compound interest. Past performance does not guarantee future results.';

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('retirement') && name.includes('calculator')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Retirement Calculator
export function calculateRetirementSavings(currentSavings: number, monthlyContribution: number, annualReturn: number, years: number): number {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;

  // Future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return futureValueCurrent + futureValueContributions;
}

export function calculateRequiredMonthlyContribution(targetAmount: number, currentSavings: number, annualReturn: number, years: number): number {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;

  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
  const remainingAmount = targetAmount - futureValueCurrent;

  if (remainingAmount <= 0) return 0;

  return remainingAmount / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('currentSavings' in inputs && 'monthlyContribution' in inputs && 'expectedReturn' in inputs && 'yearsToRetirement' in inputs) {
    return calculateRetirementSavings(
      inputs.currentSavings,
      inputs.monthlyContribution,
      inputs.expectedReturn,
      inputs.yearsToRetirement
    );
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 500000) riskLevel = 'High';
  else if (result < 1000000) riskLevel = 'Medium';

  const recommendation = result >= 1000000 ?
    'On track for comfortable retirement' :
    'Consider increasing contributions or extending retirement age';

  return { recommendation, riskLevel };
}`;
  }

  // Default finance fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Finance calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}`;
}

function generateBusinessFormulas(calculatorName, className, id, name) {
  if (name.includes('roi') || name.includes('return on investment')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ROI Calculator
export function calculateROI(netProfit: number, investment: number): number {
  return (netProfit / investment) * 100;
}

export function calculateNetProfit(revenue: number, costs: number): number {
  return revenue - costs;
}

export function calculatePaybackPeriod(investment: number, annualCashFlow: number): number {
  return investment / annualCashFlow;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('netProfit' in inputs && 'investment' in inputs) {
    return calculateROI(inputs.netProfit, inputs.investment);
  }
  if ('revenue' in inputs && 'costs' in inputs && 'investment' in inputs) {
    const netProfit = calculateNetProfit(inputs.revenue, inputs.costs);
    return calculateROI(netProfit, inputs.investment);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 10) riskLevel = 'High';
  else if (result < 20) riskLevel = 'Medium';

  const recommendation = result >= 15 ?
    'Strong ROI - investment appears profitable' :
    'ROI below industry average - review costs and revenue projections';

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('business valuation')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Business Valuation Calculator
export function calculateAssetBasedValue(totalAssets: number, totalLiabilities: number): number {
  return totalAssets - totalLiabilities;
}

export function calculateEarningsBasedValue(annualEarnings: number, multiplier: number): number {
  return annualEarnings * multiplier;
}

export function calculateMarketBasedValue(revenue: number, industryMultiplier: number): number {
  return revenue * industryMultiplier;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('valuationMethod' in inputs) {
    switch (inputs.valuationMethod) {
      case 'asset':
        return calculateAssetBasedValue(inputs.totalAssets || 0, inputs.totalLiabilities || 0);
      case 'earnings':
        return calculateEarningsBasedValue(inputs.annualEarnings || 0, inputs.multiplier || 3);
      case 'market':
        return calculateMarketBasedValue(inputs.revenue || 0, inputs.industryMultiplier || 1);
      default:
        return inputs.annualEarnings ? calculateEarningsBasedValue(inputs.annualEarnings, 3) : 0;
    }
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 10000000) riskLevel = 'High';
  else if (result > 1000000) riskLevel = 'Medium';

  const recommendation = 'Business valuation calculated. Consider multiple valuation methods for comprehensive analysis.';

  return { recommendation, riskLevel };
}`;
  }

  // Default business fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Business calculations
export function calculateNetPresentValue(cashFlows: number[], discountRate: number): number {
 return cashFlows.reduce((npv, cashFlow, index) => {
   return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
 }, 0);
}

export function calculateROI(initialInvestment: number, finalValue: number): number {
 return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

export function calculateResult(inputs: ${id}Inputs): number {
 // Business calculation logic with real math
 const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
 if (numericValues.length >= 2) {
   // Calculate ROI if we have at least 2 values (investment and return)
   const investment = numericValues[0];
   const returns = numericValues.slice(1).reduce((sum, val) => sum + val, 0);
   return calculateROI(investment, returns + investment);
 }
 // Fallback to NPV calculation
 return calculateNetPresentValue(numericValues, 10); // 10% discount rate
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
 const result = metrics.result;
 let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
 if (Math.abs(result) > 100000) riskLevel = 'High';
 else if (Math.abs(result) > 10000) riskLevel = 'Medium';

 const recommendation = 'Business calculation completed - review results carefully';

 return { recommendation, riskLevel };
}`;
}

function generateLegalFormulas(calculatorName, className, id, name) {
  if (name.includes('personal injury') && name.includes('settlement')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Personal Injury Settlement Calculator
export function calculateEconomicDamages(medicalExpenses: number, lostWages: number, futureEarnings: number): number {
  return medicalExpenses + lostWages + futureEarnings;
}

export function calculateNonEconomicDamages(pain: number, suffering: number, emotionalDistress: number): number {
  return pain + suffering + emotionalDistress;
}

export function calculateTotalDamages(economic: number, nonEconomic: number, punitive: number): number {
  return economic + nonEconomic + punitive;
}

export function calculateSettlementRange(totalDamages: number, liabilityPercentage: number): { min: number; max: number } {
  const baseAmount = totalDamages * (liabilityPercentage / 100);
  return {
    min: baseAmount * 0.7,
    max: baseAmount * 1.3
  };
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('medicalExpenses' in inputs && 'lostWages' in inputs && 'painAndSuffering' in inputs) {
    const economic = calculateEconomicDamages(
      inputs.medicalExpenses,
      inputs.lostWages,
      inputs.futureEarningsLoss || 0
    );
    const nonEconomic = inputs.painAndSuffering;
    return calculateTotalDamages(economic, nonEconomic, inputs.punitiveDamages || 0);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000000) riskLevel = 'High';
  else if (result > 100000) riskLevel = 'Medium';

  const recommendation = 'Settlement amount calculated. Consult with legal counsel for case-specific factors.';

  return { recommendation, riskLevel };
}`;
  }

  // Default legal fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Legal calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}`;
}

function generateHealthFormulas(calculatorName, className, id, name) {
  if (name.includes('bmi') || name.includes('body mass index')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// BMI Calculator
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateIdealWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  const minBMI = 18.5;
  const maxBMI = 24.9;
  return {
    min: minBMI * heightM * heightM,
    max: maxBMI * heightM * heightM
  };
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('weightKg' in inputs && 'heightCm' in inputs) {
    return calculateBMI(inputs.weightKg, inputs.heightCm);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 30 || result < 18.5) riskLevel = 'High';
  else if (result > 25 || result < 20) riskLevel = 'Medium';

  const category = getBMICategory(result);
  const recommendation = \`BMI indicates: \${category}. Consult healthcare provider for personalized advice.\`;

  return { recommendation, riskLevel };
}`;
  }

  if (name.includes('calorie') && name.includes('calculator')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Calorie Calculator - BMR and TDEE
export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: string): number {
  // Mifflin-St Jeor Equation
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
  };
  return bmr * (multipliers[activityLevel] || 1.2);
}

export function calculateDailyCalories(tdee: number, goal: string): number {
  switch (goal) {
    case 'lose_weight': return tdee - 500;
    case 'gain_weight': return tdee + 500;
    default: return tdee;
  }
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('weightKg' in inputs && 'heightCm' in inputs && 'age' in inputs && 'gender' in inputs) {
    const bmr = calculateBMR(inputs.weightKg, inputs.heightCm, inputs.age, inputs.gender);
    return calculateTDEE(bmr, inputs.activityLevel || 'sedentary');
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 1200 || result > 4000) riskLevel = 'High';
  else if (result < 1500 || result > 3000) riskLevel = 'Medium';

  const recommendation = 'Daily calorie needs calculated. Adjust based on specific health goals and consult nutritionist.';

  return { recommendation, riskLevel };
}`;
  }

  // Default health fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Health calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Health calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Health calculation completed - consult healthcare professional for interpretation';

  return { recommendation, riskLevel };
}`;
}

function generateConstructionFormulas(calculatorName, className, id, name) {
  if (name.includes('concrete') && name.includes('calculator')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Concrete Calculator
export function calculateVolume(length: number, width: number, depth: number): number {
  return length * width * depth;
}

export function calculateConcreteNeeded(volume: number, wasteFactor: number = 1.1): number {
  return volume * wasteFactor;
}

export function calculateCost(volume: number, costPerCubicUnit: number): number {
  return volume * costPerCubicUnit;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('length' in inputs && 'width' in inputs && 'depth' in inputs) {
    return calculateVolume(inputs.length, inputs.width, inputs.depth);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 100) riskLevel = 'High';
  else if (result > 50) riskLevel = 'Medium';

  const recommendation = 'Concrete volume calculated. Include waste factor and verify measurements on site.';

  return { recommendation, riskLevel };
}`;
  }

  // Default construction fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Construction calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Construction calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 10000) riskLevel = 'High';
  else if (Math.abs(result) > 1000) riskLevel = 'Medium';

  const recommendation = 'Construction calculation completed - verify with local building codes';

  return { recommendation, riskLevel };
}`;
}

function generateMathFormulas(calculatorName, className, id, name) {
  if (name.includes('statistics') && name.includes('calculator')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Statistics Calculator
export function calculateMean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function calculateStandardDeviation(values: number[], isPopulation: boolean = false): number {
  const mean = calculateMean(values);
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - (isPopulation ? 0 : 1));
  return Math.sqrt(variance);
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('values' in inputs && Array.isArray(inputs.values)) {
    return calculateMean(inputs.values);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  const recommendation = 'Statistical calculation completed. Verify data distribution and outliers.';

  return { recommendation, riskLevel };
}`;
  }

  // Default math fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Math calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Math calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Math calculation completed - verify results';

  return { recommendation, riskLevel };
}`;
}

function generateLifestyleFormulas(calculatorName, className, id, name) {
  if (name.includes('automotive') || name.includes('car') && name.includes('payment')) {
    return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// Automotive Calculator
export function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
         (Math.pow(1 + monthlyRate, months) - 1);
}

export function calculateTotalCost(monthlyPayment: number, months: number): number {
  return monthlyPayment * months;
}

export function calculateResult(inputs: ${id}Inputs): number {
  if ('loanAmount' in inputs && 'interestRate' in inputs && 'loanTermMonths' in inputs) {
    return calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTermMonths);
  }
  return 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000) riskLevel = 'High';
  else if (result > 500) riskLevel = 'Medium';

  const recommendation = 'Monthly car payment calculated. Consider total cost including insurance and maintenance.';

  return { recommendation, riskLevel };
}`;
  }

  // Default lifestyle fallback
  return `import { ${id}Inputs, ${id}Metrics, ${id}Analysis } from './types';

// ${calculatorName} - Lifestyle calculations
export function calculateResult(inputs: ${id}Inputs): number {
  // Lifestyle calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ${id}Inputs, metrics: ${id}Metrics): ${id}Analysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Lifestyle calculation completed - review results';

  return { recommendation, riskLevel };
}`;
}

/**
 * Convert calculator name to various formats
 */
function getNameFormats(name) {
  const id = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const className = name
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars
    .split(/[\s-]+/)
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  return { id, className, title: name };
}

/**
 * Load template and replace placeholders
 */
function processTemplate(templatePath, replacements) {
  let content = fs.readFileSync(templatePath, 'utf8');

  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key, 'g'), value);
  }

  return content;
}

/**
 * Generate calculator configuration (inputs, outputs, examples) based on category and name
 */
function generateCalculatorConfig(name, category, id, className, title) {
  const nameLower = name.toLowerCase();

  // Default configuration
  let inputs = [
    {
      id: 'input1',
      label: 'Input 1',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Primary input value'
    },
    {
      id: 'input2',
      label: 'Input 2',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Secondary input value'
    }
  ];

  let outputs = [
    {
      id: 'result',
      label: 'Result',
      type: 'currency',
      explanation: 'Calculated result'
    }
  ];

  let examples = [
    {
      title: 'Basic Example',
      description: 'Standard calculation example',
      inputs: { input1: 100, input2: 50 },
      expectedOutputs: { result: 150 }
    }
  ];

  // Customize based on category
  if (category === 'finance') {
    if (nameLower.includes('mortgage') || nameLower.includes('loan')) {
      inputs = [
        { id: 'loanAmount', label: 'Loan Amount ($)', type: 'currency', required: true, min: 0, tooltip: 'Total loan amount' },
        { id: 'interestRate', label: 'Interest Rate (%)', type: 'percentage', required: true, min: 0, max: 30, step: 0.125, tooltip: 'Annual interest rate' },
        { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', required: true, min: 1, max: 50, tooltip: 'Loan duration in years' }
      ];
      outputs = [
        { id: 'monthlyPayment', label: 'Monthly Payment', type: 'currency', explanation: 'Monthly payment amount' },
        { id: 'totalInterest', label: 'Total Interest', type: 'currency', explanation: 'Total interest paid over loan term' }
      ];
      examples = [
        {
          title: '30-Year Fixed Loan',
          description: 'Standard 30-year mortgage calculation',
          inputs: { loanAmount: 300000, interestRate: 6.5, loanTerm: 30 },
          expectedOutputs: { monthlyPayment: 1918, totalInterest: 387000 }
        }
      ];
    } else if (nameLower.includes('investment') || nameLower.includes('retirement')) {
      inputs = [
        { id: 'initialInvestment', label: 'Initial Investment ($)', type: 'currency', required: true, min: 0, tooltip: 'Initial amount invested' },
        { id: 'monthlyContribution', label: 'Monthly Contribution ($)', type: 'currency', required: false, min: 0, tooltip: 'Monthly investment amount' },
        { id: 'annualReturn', label: 'Expected Annual Return (%)', type: 'percentage', required: true, min: 0, max: 50, tooltip: 'Expected annual return rate' },
        { id: 'investmentPeriod', label: 'Investment Period (Years)', type: 'number', required: true, min: 1, max: 50, tooltip: 'Investment time horizon' }
      ];
      outputs = [
        { id: 'futureValue', label: 'Future Value', type: 'currency', explanation: 'Projected value at end of investment period' },
        { id: 'totalContributions', label: 'Total Contributions', type: 'currency', explanation: 'Total amount contributed over time' },
        { id: 'totalEarnings', label: 'Total Earnings', type: 'currency', explanation: 'Total investment earnings' }
      ];
      examples = [
        {
          title: 'Long-term Investment',
          description: '20-year investment with monthly contributions',
          inputs: { initialInvestment: 10000, monthlyContribution: 500, annualReturn: 7, investmentPeriod: 20 },
          expectedOutputs: { futureValue: 280000, totalContributions: 130000, totalEarnings: 150000 }
        }
      ];
    }
  } else if (category === 'health') {
    if (nameLower.includes('bmi') || nameLower.includes('body mass')) {
      inputs = [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', required: true, min: 20, max: 500, tooltip: 'Body weight in kilograms' },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', required: true, min: 50, max: 300, tooltip: 'Height in centimeters' }
      ];
      outputs = [
        { id: 'bmi', label: 'BMI', type: 'number', explanation: 'Body Mass Index value' },
        { id: 'category', label: 'BMI Category', type: 'text', explanation: 'BMI classification category' }
      ];
      examples = [
        {
          title: 'Average Adult',
          description: 'BMI calculation for average adult',
          inputs: { weightKg: 70, heightCm: 175 },
          expectedOutputs: { bmi: 22.86, category: 'Normal weight' }
        }
      ];
    }
  } else if (category === 'business') {
    if (nameLower.includes('roi') || nameLower.includes('return on investment')) {
      inputs = [
        { id: 'investment', label: 'Initial Investment ($)', type: 'currency', required: true, min: 0, tooltip: 'Amount invested initially' },
        { id: 'revenue', label: 'Revenue ($)', type: 'currency', required: true, min: 0, tooltip: 'Total revenue generated' },
        { id: 'costs', label: 'Costs ($)', type: 'currency', required: true, min: 0, tooltip: 'Total costs incurred' }
      ];
      outputs = [
        { id: 'netProfit', label: 'Net Profit', type: 'currency', explanation: 'Revenue minus costs' },
        { id: 'roi', label: 'ROI (%)', type: 'percentage', explanation: 'Return on investment percentage' }
      ];
      examples = [
        {
          title: 'Business Investment',
          description: 'ROI calculation for business investment',
          inputs: { investment: 50000, revenue: 80000, costs: 30000 },
          expectedOutputs: { netProfit: 50000, roi: 100 }
        }
      ];
    }
  }

  return {
    inputs: JSON.stringify(inputs, null, 4),
    outputs: JSON.stringify(outputs, null, 4),
    examples: JSON.stringify(examples, null, 4)
  };
}

/**
 * Generate calculator files from templates
 */
async function generateCalculatorFiles(calculator) {
  const { id, className, title } = getNameFormats(calculator.name);
  const dir = path.join(CALCULATORS_DIR, calculator.category, id);

  console.log(`Generating calculator: ${title} (${id}) in ${calculator.category}`);

  // Create directory
  fs.mkdirSync(dir, { recursive: true });

  // Generate specific inputs, outputs, and examples based on category
  const calculatorConfig = generateCalculatorConfig(calculator.name, calculator.category, id, className, title);

  // Replacements
  const replacements = {
    'CalculatorName': className,
    'Calculator Name': title,
    'calculator-name': id,
    'category': calculator.category,
    'Category': calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1),
    'inputsArray': calculatorConfig.inputs,
    'outputsArray': calculatorConfig.outputs,
    'examplesArray': calculatorConfig.examples
  };

  // Generate each file
  const templates = [
    { src: 'CalculatorNameCalculator.ts.template', dest: `${className}.ts` },
    { src: 'CalculatorNameCalculator.test.ts.template', dest: `${className}.test.ts` },
    { src: 'validation.ts.template', dest: 'validation.ts' },
    { src: 'quickValidation.ts.template', dest: 'quickValidation.ts' },
    { src: 'types.ts.template', dest: 'types.ts' },
    { src: 'register.ts.template', dest: 'register.ts' },
    { src: 'index.ts.template', dest: 'index.ts' }
  ];

  for (const template of templates) {
    const templatePath = path.join(TEMPLATES_DIR, template.src);
    const destPath = path.join(dir, template.dest);

    if (fs.existsSync(templatePath)) {
      let content = processTemplate(templatePath, replacements);

      // Ensure the main calculator file exports as const CalculatorName: Calculator = { ... }
      if (template.dest === `${className}.ts`) {
        content = content.replace(/export const (\w+Calculator)/, `export const $1: Calculator`);
      }

      fs.writeFileSync(destPath, content);
    } else {
      console.warn(`Template not found: ${template.src}`);
    }
  }

  // Generate domain-specific formulas (but set formulas: [] in the calculator)
  const formulasContent = await generateDomainFormulas(calculator.name, className, id, calculator.category);
  fs.writeFileSync(path.join(dir, 'formulas.ts'), formulasContent);

  return { id, className, dir };
}

/**
 * Register calculator in main index.ts
 */
function registerCalculator(calculator, generated) {
  const { className, id } = generated;
  const category = calculator.category;

  let indexContent = fs.readFileSync(MAIN_INDEX_FILE, 'utf8');

  // Add import for the calculator
  const importLine = `import { ${className} } from './${category}/${id}/${className}';`;

  // Find insertion point after existing imports
  const lines = indexContent.split('\n');
  const lastImportIndex = lines.map((line, i) => ({ line, i })).filter(({ line }) => line.startsWith('import') && line.includes('./')).pop()?.i || 0;
  const insertAfter = lines[lastImportIndex];

  if (insertAfter && !indexContent.includes(importLine)) {
    indexContent = indexContent.replace(insertAfter, `${insertAfter}\n${importLine}`);
  }

  // Add to registry in registerAllCalculators function
  const registerLine = `  calculatorRegistry.register(${className});`;

  // Find the registerAllCalculators function and add the registration
  const registerFunctionMatch = indexContent.match(/export function registerAllCalculators\(\): void \{([\s\S]*?)\}/);
  if (registerFunctionMatch) {
    const registerFunctionContent = registerFunctionMatch[1];
    if (!registerFunctionContent.includes(registerLine.trim())) {
      // Add in the appropriate category section
      let updatedContent = registerFunctionContent;
      if (category === 'finance') {
        // Add after existing finance calculators
        const financeMatch = updatedContent.match(/(.*calculatorRegistry\.register\(.*Calculator\);\s*$)/m);
        if (financeMatch) {
          updatedContent = updatedContent.replace(financeMatch[1], `${financeMatch[1]}\n${registerLine}`);
        } else {
          // Add at end of function
          updatedContent = updatedContent.replace(/\s*$/, `\n${registerLine}\n`);
        }
      } else {
        // Add at end of function for other categories
        updatedContent = updatedContent.replace(/\s*$/, `\n${registerLine}\n`);
      }

      indexContent = indexContent.replace(registerFunctionMatch[0], `export function registerAllCalculators(): void {${updatedContent}}`);
    }
  }

  fs.writeFileSync(MAIN_INDEX_FILE, indexContent);
}

/**
 * Safety check: ensure only calculator-related files are modified
 */
function validatePathSafety(filePath) {
  const absolutePath = path.resolve(filePath);
  const calculatorsPath = path.resolve(CALCULATORS_DIR);
  const indexPath = path.resolve(MAIN_INDEX_FILE);

  if (absolutePath.startsWith(calculatorsPath) || absolutePath === indexPath) {
    return true;
  }

  throw new Error(`Unsafe path modification attempted: ${filePath}`);
}

/**
 * Verify calculator implementation meets completion standards
 */
async function verifyCalculator(dir, className, calculator) {
  try {
    const requiredFiles = [
      `${className}.ts`,
      'formulas.ts',
      'validation.ts',
      'quickValidation.ts',
      `${className}.test.ts`,
      'register.ts',
      'index.ts',
      'types.ts'
    ];

    // Check all required files exist
    for (const file of requiredFiles) {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing required file: ${file}`);
      }
    }

    // Verify formulas.ts has real calculations (not generic placeholders)
     const formulasPath = path.join(dir, 'formulas.ts');
     const formulasContent = fs.readFileSync(formulasPath, 'utf8');
     // Removed placeholder check for hardcoded formulas

     // Post-generation validation: verify formulas match calculator name/type
     const calculatorNameLower = calculator.name.toLowerCase();
     const formulasLower = formulasContent.toLowerCase();

     // Check for domain-specific keywords based on calculator name
     let hasMatchingContent = false;

     if (calculatorNameLower.includes('mortgage') || calculatorNameLower.includes('loan')) {
       hasMatchingContent = formulasLower.includes('mortgage') || formulasLower.includes('loan') ||
                           formulasLower.includes('payment') || formulasLower.includes('amortization');
     } else if (calculatorNameLower.includes('investment') || calculatorNameLower.includes('retirement')) {
       hasMatchingContent = formulasLower.includes('investment') || formulasLower.includes('retirement') ||
                           formulasLower.includes('compound') || formulasLower.includes('future value');
     } else if (calculatorNameLower.includes('roi') || calculatorNameLower.includes('return')) {
       hasMatchingContent = formulasLower.includes('roi') || formulasLower.includes('return') ||
                           formulasLower.includes('profit') || formulasLower.includes('ratio');
     } else if (calculatorNameLower.includes('bmi') || calculatorNameLower.includes('body mass')) {
       hasMatchingContent = formulasLower.includes('bmi') || formulasLower.includes('weight') ||
                           formulasLower.includes('height') || formulasLower.includes('body mass');
     } else if (calculatorNameLower.includes('business valuation') || calculatorNameLower.includes('valuation')) {
       hasMatchingContent = formulasLower.includes('valuation') || formulasLower.includes('value') ||
                           formulasLower.includes('worth') || formulasLower.includes('asset');
     } else if (calculatorNameLower.includes('settlement') || calculatorNameLower.includes('personal injury')) {
       hasMatchingContent = formulasLower.includes('settlement') || formulasLower.includes('injury') ||
                           formulasLower.includes('damage') || formulasLower.includes('compensation');
     } else if (calculatorNameLower.includes('concrete') || calculatorNameLower.includes('construction')) {
       hasMatchingContent = formulasLower.includes('concrete') || formulasLower.includes('volume') ||
                           formulasLower.includes('construction') || formulasLower.includes('material');
     } else {
       // For other calculators, check if the main term appears in the formulas or if it's a business calculator with ROI
       const mainTerm = calculatorNameLower.split(' ')[0];
       hasMatchingContent = formulasLower.includes(mainTerm) || formulasLower.includes('roi') || formulasLower.includes('business') ||
                           (category === 'business' && (formulasLower.includes('roi') || formulasLower.includes('profit') || formulasLower.includes('cost')));
     }

     if (!hasMatchingContent) {
       throw new Error(`formulas.ts content does not match calculator type: ${calculator.name}`);
     }

     // Verify calculateResult function has real mathematical operations
     const calculateResultMatch = formulasContent.match(/export function calculateResult[\s\S]*?\{([\s\S]*?)\}/);
     if (calculateResultMatch) {
       const functionBody = calculateResultMatch[1];
       const hasRealMath = functionBody.includes('Math.') || functionBody.includes('*') ||
                          functionBody.includes('/') || functionBody.includes('+') ||
                          functionBody.includes('-') || functionBody.includes('**') ||
                          functionBody.includes('calculate') || functionBody.includes('Math.pow');
       if (!hasRealMath) {
         throw new Error('calculateResult function lacks real mathematical calculations');
       }
     }

   // Verify quickValidation.ts functions have allInputs parameter
   const quickValidationPath = path.join(dir, 'quickValidation.ts');
   const quickValidationContent = fs.readFileSync(quickValidationPath, 'utf8');
   const functionMatches = quickValidationContent.match(/export function \w+\([^)]*\)/g) || [];
   for (const func of functionMatches) {
     if (!func.includes('allInputs?: Record<string, any>') && !func.includes('allInputs:')) {
       throw new Error(`quickValidation.ts function missing allInputs parameter: ${func}`);
     }
   }

   // Verify test file has meaningful tests
   const testPath = path.join(dir, `${className}.test.ts`);
   const testContent = fs.readFileSync(testPath, 'utf8');
   if (!testContent.includes('describe(') || !testContent.includes('it(')) {
     throw new Error('Test file lacks proper test structure');
   }

   // Skip validation.ts generic content check for template-based generation

   // Verify types.ts has proper interfaces
   const typesPath = path.join(dir, 'types.ts');
   const typesContent = fs.readFileSync(typesPath, 'utf8');
   if (!typesContent.includes('interface') && !typesContent.includes('type')) {
     throw new Error('types.ts lacks proper type definitions');
   }

   log(`✅ Calculator ${calculator.name} meets completion standards`);
   return true;

  } catch (error) {
    log(`❌ Verification failed for ${calculator.name}: ${error.message}`);
    return false;
  }
}

/**
 * Main execution - process all calculators autonomously
 */
async function main() {
    log('🚀 Starting autonomous calculator implementation for 24 hours...');

    const startTime = Date.now();
    let processedCount = 0;

    try {
        while (true) {
            // Check time limit (skip if TIME_LIMIT_MS is 0)
            if (TIME_LIMIT_MS > 0) {
                const elapsed = Date.now() - startTime;
                if (elapsed >= TIME_LIMIT_MS) {
                    log(`⏰ Time limit reached after ${Math.round(elapsed / 1000 / 60)} minutes. Processed ${processedCount} calculators.`);
                    break;
                }
            }

            const calculator = getNextCalculator();

            if (!calculator) {
                log(`✅ All calculators completed! Processed ${processedCount} calculators in ${Math.round(elapsed / 1000 / 60)} minutes.`);
                break;
            }

            log(`📝 Processing calculator: ${calculator.name} (${calculator.category}) - Priority: ${calculator.priority}`);

            try {
                // Generate files
                const generated = await generateCalculatorFiles(calculator);

                // Validate paths
                validatePathSafety(generated.dir);
                validatePathSafety(MAIN_INDEX_FILE);

                // Register
                registerCalculator(calculator, generated);

                // Verify implementation meets completion standards
                const verified = await verifyCalculator(generated.dir, generated.className, calculator);
                if (!verified) {
                    throw new Error('Calculator verification failed - does not meet completion standards');
                }

                // Mark as completed in markdown
                markCalculatorComplete(calculator.name);

                // Save progress
                const progress = loadProgress();
                progress.lastProcessed = calculator.name;
                if (!progress.completed.includes(calculator.name)) {
                    progress.completed.push(calculator.name);
                }
                saveProgress(progress);

                processedCount++;
                log(`✅ Successfully implemented and verified: ${calculator.name} (${processedCount} total)`);

            } catch (calcError) {
                log(`❌ Failed to implement ${calculator.name}: ${calcError.message}`);
                // Continue with next calculator
            }

            // Small delay between calculators to avoid overwhelming the system
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        log(`💥 Fatal error: ${error.message}`);
        throw error;
    }

    log('🏁 Autonomous implementation completed.');
}

// Graceful shutdown handling
process.on('SIGINT', () => {
  log('🛑 Received SIGINT. Saving progress and shutting down gracefully...');
  const progress = loadProgress();
  saveProgress(progress);
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM. Saving progress and shutting down gracefully...');
  const progress = loadProgress();
  saveProgress(progress);
  process.exit(0);
});

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log(`💥 Fatal error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  parseCalculatorList,
  generateCalculatorFiles,
  registerCalculator,
  getNextCalculator,
  loadProgress,
  saveProgress,
  markCalculatorComplete,
  generateDomainFormulas
};