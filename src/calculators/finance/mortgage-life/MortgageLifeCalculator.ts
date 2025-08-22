import { Calculator } from '../../../types/calculator';
import { calculateMortgageLifeInsurance, generateMortgageLifeAnalysis } from './formulas';
import { validateMortgageLifeInputs } from './validation';

export const MortgageLifeCalculator: Calculator = {
  id: 'mortgage-life-calculator',
  name: 'Mortgage Life Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage life insurance needs, coverage amounts, and policy analysis for protecting your family and home.',
  inputs: [
    { id: 'mortgageBalance', name: 'Mortgage Balance', type: 'number', unit: 'USD', required: true, description: 'Current mortgage loan balance', placeholder: '250000', min: 10000, max: 5000000 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current property market value', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: true, description: 'Monthly mortgage payment', placeholder: '1200', min: 100, max: 50000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%/year', required: false, description: 'Mortgage interest rate', placeholder: '4.5', min: 0, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Remaining loan term in years', placeholder: '25', min: 1, max: 50 },
    { id: 'borrowerAge', name: 'Borrower Age', type: 'number', unit: 'years', required: true, description: 'Primary borrower age', placeholder: '35', min: 18, max: 85 },
    { id: 'coBorrowerAge', name: 'Co-Borrower Age', type: 'number', unit: 'years', required: false, description: 'Co-borrower age (if applicable)', placeholder: '32', min: 18, max: 85 },
    { id: 'healthStatus', name: 'Health Status', type: 'select', required: false, description: 'Overall health status', placeholder: 'Select health status', options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Prefer Not to Say'] },
    { id: 'smokingStatus', name: 'Smoking Status', type: 'select', required: false, description: 'Tobacco use status', placeholder: 'Select smoking status', options: ['Non-Smoker', 'Former Smoker', 'Occasional Smoker', 'Regular Smoker', 'Prefer Not to Say'] },
    { id: 'occupation', name: 'Occupation', type: 'select', required: false, description: 'Primary occupation category', placeholder: 'Select occupation', options: ['Professional', 'Office Worker', 'Skilled Labor', 'Unskilled Labor', 'Military', 'Student', 'Retired', 'Self-Employed', 'Other'] },
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: false, description: 'Annual household income', placeholder: '75000', min: 0, max: 10000000 },
    { id: 'otherDebts', name: 'Other Debts', type: 'number', unit: 'USD', required: false, description: 'Total other outstanding debts', placeholder: '25000', min: 0, max: 5000000 },
    { id: 'savings', name: 'Savings & Investments', type: 'number', unit: 'USD', required: false, description: 'Total savings and investments', placeholder: '50000', min: 0, max: 10000000 },
    { id: 'dependents', name: 'Number of Dependents', type: 'number', required: false, description: 'Number of financial dependents', placeholder: '2', min: 0, max: 10 },
    { id: 'dependentsAge', name: 'Dependents Age', type: 'number', unit: 'years', required: false, description: 'Average age of dependents', placeholder: '8', min: 0, max: 25 },
    { id: 'yearsToRetirement', name: 'Years to Retirement', type: 'number', unit: 'years', required: false, description: 'Years until planned retirement', placeholder: '30', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%/year', required: false, description: 'Expected investment return rate', placeholder: '6', min: 0, max: 15 },
    { id: 'lifeExpectancy', name: 'Life Expectancy', type: 'number', unit: 'years', required: false, description: 'Expected life expectancy', placeholder: '85', min: 50, max: 120 },
    { id: 'existingLifeInsurance', name: 'Existing Life Insurance', type: 'number', unit: 'USD', required: false, description: 'Existing life insurance coverage', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'policyType', name: 'Policy Type', type: 'select', required: false, description: 'Preferred life insurance policy type', placeholder: 'Select policy type', options: ['Term Life', 'Whole Life', 'Universal Life', 'Variable Life', 'Mortgage Protection', 'Decreasing Term', 'Level Term', 'Return of Premium'] },
    { id: 'policyTerm', name: 'Policy Term', type: 'number', unit: 'years', required: false, description: 'Desired policy term length', placeholder: '30', min: 1, max: 50 },
    { id: 'coverageAmount', name: 'Coverage Amount', type: 'number', unit: 'USD', required: false, description: 'Desired coverage amount', placeholder: '300000', min: 10000, max: 10000000 },
    { id: 'premiumFrequency', name: 'Premium Frequency', type: 'select', required: false, description: 'Premium payment frequency', placeholder: 'Select frequency', options: ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually'] },
    { id: 'riders', name: 'Policy Riders', type: 'multiselect', required: false, description: 'Additional policy riders', placeholder: 'Select riders', options: ['Accidental Death', 'Disability Waiver', 'Critical Illness', 'Long-Term Care', 'Child Rider', 'Spouse Rider', 'Guaranteed Insurability', 'Return of Premium'] },
    { id: 'underwritingClass', name: 'Underwriting Class', type: 'select', required: false, description: 'Expected underwriting classification', placeholder: 'Select class', options: ['Preferred Plus', 'Preferred', 'Standard Plus', 'Standard', 'Substandard', 'Unknown'] },
    { id: 'familyHistory', name: 'Family Medical History', type: 'select', required: false, description: 'Family medical history risk', placeholder: 'Select risk level', options: ['Low Risk', 'Moderate Risk', 'High Risk', 'Unknown'] },
    { id: 'lifestyleFactors', name: 'Lifestyle Factors', type: 'multiselect', required: false, description: 'Lifestyle and risk factors', placeholder: 'Select factors', options: ['Regular Exercise', 'Healthy Diet', 'Moderate Alcohol', 'Recreational Sports', 'Travel', 'Hazardous Hobbies', 'Military Service', 'None'] },
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: false, description: 'Analysis time period', placeholder: '20', min: 1, max: 50 }
  ],
  outputs: [
    { id: 'mortgageProtectionNeeded', name: 'Mortgage Protection Needed', type: 'number', unit: 'USD', description: 'Recommended mortgage protection amount' },
    { id: 'totalLifeInsuranceNeeded', name: 'Total Life Insurance Needed', type: 'number', unit: 'USD', description: 'Total recommended life insurance coverage' },
    { id: 'additionalCoverageNeeded', name: 'Additional Coverage Needed', type: 'number', unit: 'USD', description: 'Additional coverage beyond existing policies' },
    { id: 'monthlyPremium', name: 'Estimated Monthly Premium', type: 'number', unit: 'USD', description: 'Estimated monthly premium cost' },
    { id: 'annualPremium', name: 'Estimated Annual Premium', type: 'number', unit: 'USD', description: 'Estimated annual premium cost' },
    { id: 'totalPremiumCost', name: 'Total Premium Cost', type: 'number', unit: 'USD', description: 'Total premium cost over policy term' },
    { id: 'coverageAnalysis', name: 'Coverage Analysis', type: 'object', description: 'Detailed coverage analysis and recommendations' },
    { id: 'policyComparison', name: 'Policy Comparison', type: 'object', description: 'Comparison of different policy types' },
    { id: 'costBenefitAnalysis', name: 'Cost-Benefit Analysis', type: 'object', description: 'Cost-benefit analysis of insurance options' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'object', description: 'Risk assessment and underwriting analysis' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Insurance recommendations and next steps' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key insurance metrics and analysis' },
    { id: 'mortgageLifeAnalysis', name: 'Mortgage Life Analysis', type: 'string', description: 'Comprehensive mortgage life insurance analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageLifeInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageLifeAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Mortgage Protection Need',
      formula: 'Mortgage Protection = Mortgage Balance + (Monthly Payment × 12 × Years)',
      description: 'Calculates the amount needed to pay off mortgage and provide income replacement'
    },
    {
      name: 'Total Life Insurance Need',
      formula: 'Total Need = Mortgage Protection + Income Replacement + Debt Coverage + Education + Final Expenses',
      description: 'Calculates total life insurance coverage needed'
    },
    {
      name: 'Income Replacement',
      formula: 'Income Replacement = Annual Income × Years to Retirement × (1 - Tax Rate)',
      description: 'Calculates income replacement needs'
    },
    {
      name: 'Premium Calculation',
      formula: 'Premium = Coverage Amount × Rate per $1000 × Age Factor × Health Factor',
      description: 'Calculates insurance premium based on coverage and risk factors'
    },
    {
      name: 'Coverage Gap',
      formula: 'Coverage Gap = Total Need - Existing Coverage',
      description: 'Calculates the gap between needed and existing coverage'
    },
    {
      name: 'Cost-Benefit Ratio',
      formula: 'Cost-Benefit = Total Premium Cost / Coverage Amount',
      description: 'Calculates the cost-benefit ratio of insurance coverage'
    },
    {
      name: 'Risk-Adjusted Premium',
      formula: 'Risk-Adjusted Premium = Base Premium × Risk Multiplier',
      description: 'Adjusts premium based on health and lifestyle risk factors'
    }
  ]
};