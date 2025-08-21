import { Calculator } from '../../../types/calculator';

export const TaxCalculator: Calculator = {
  id: 'tax-calculator',
  name: 'Tax Calculator',
  category: 'finance',
  subcategory: 'taxes',
  description: 'Calculate federal and state income taxes, estimate refunds or amounts owed, and analyze tax optimization strategies',
  inputs: [
    // Basic Information
    { id: 'filingStatus', name: 'Filing Status', type: 'select', required: true, description: 'Tax filing status', options: [
      { value: 'single', label: 'Single' },
      { value: 'married-filing-jointly', label: 'Married Filing Jointly' },
      { value: 'married-filing-separately', label: 'Married Filing Separately' },
      { value: 'head-of-household', label: 'Head of Household' },
      { value: 'qualifying-widow', label: 'Qualifying Widow(er)' }
    ] },
    { id: 'taxYear', name: 'Tax Year', type: 'select', required: true, description: 'Tax year for calculation', options: [
      { value: '2024', label: '2024' },
      { value: '2023', label: '2023' },
      { value: '2022', label: '2022' }
    ] },
    { id: 'age', name: 'Age', type: 'number', required: false, description: 'Your age (for certain credits)', placeholder: '35', min: 0, max: 120 },

    // Income Sources
    { id: 'wages', name: 'Wages & Salary', type: 'number', unit: 'USD', required: false, description: 'W-2 wages and salary income', placeholder: '75000', min: 0, max: 10000000 },
    { id: 'selfEmployment', name: 'Self-Employment Income', type: 'number', unit: 'USD', required: false, description: 'Self-employment income (Schedule C)', placeholder: '25000', min: 0, max: 10000000 },
    { id: 'interest', name: 'Interest Income', type: 'number', unit: 'USD', required: false, description: 'Interest income (1099-INT)', placeholder: '500', min: 0, max: 1000000 },
    { id: 'dividends', name: 'Dividend Income', type: 'number', unit: 'USD', required: false, description: 'Dividend income (1099-DIV)', placeholder: '1000', min: 0, max: 1000000 },
    { id: 'capitalGains', name: 'Capital Gains', type: 'number', unit: 'USD', required: false, description: 'Capital gains (Schedule D)', placeholder: '2000', min: 0, max: 1000000 },
    { id: 'rentalIncome', name: 'Rental Income', type: 'number', unit: 'USD', required: false, description: 'Rental income (Schedule E)', placeholder: '15000', min: 0, max: 1000000 },
    { id: 'businessIncome', name: 'Business Income', type: 'number', unit: 'USD', required: false, description: 'Other business income', placeholder: '5000', min: 0, max: 1000000 },
    { id: 'otherIncome', name: 'Other Income', type: 'number', unit: 'USD', required: false, description: 'Other income (alimony, unemployment, etc.)', placeholder: '1000', min: 0, max: 1000000 },

    // Deductions
    { id: 'standardDeduction', name: 'Standard Deduction', type: 'select', required: false, description: 'Use standard deduction or itemize?', options: [
      { value: 'standard', label: 'Standard Deduction' },
      { value: 'itemized', label: 'Itemized Deductions' }
    ] },
    { id: 'stateLocalTaxes', name: 'State & Local Taxes', type: 'number', unit: 'USD', required: false, description: 'State and local taxes paid (SALT deduction)', placeholder: '8000', min: 0, max: 10000 },
    { id: 'mortgageInterest', name: 'Mortgage Interest', type: 'number', unit: 'USD', required: false, description: 'Mortgage interest paid', placeholder: '12000', min: 0, max: 100000 },
    { id: 'charitableContributions', name: 'Charitable Contributions', type: 'number', unit: 'USD', required: false, description: 'Charitable contributions', placeholder: '2000', min: 0, max: 100000 },
    { id: 'medicalExpenses', name: 'Medical Expenses', type: 'number', unit: 'USD', required: false, description: 'Medical expenses exceeding 7.5% of AGI', placeholder: '5000', min: 0, max: 100000 },
    { id: 'casualtyLosses', name: 'Casualty Losses', type: 'number', unit: 'USD', required: false, description: 'Casualty and theft losses', placeholder: '0', min: 0, max: 100000 },
    { id: 'miscDeductions', name: 'Miscellaneous Deductions', type: 'number', unit: 'USD', required: false, description: 'Other itemized deductions', placeholder: '0', min: 0, max: 100000 },

    // Above-the-Line Deductions
    { id: 'studentLoanInterest', name: 'Student Loan Interest', type: 'number', unit: 'USD', required: false, description: 'Student loan interest paid', placeholder: '2500', min: 0, max: 2500 },
    { id: 'iraContribution', name: 'Traditional IRA Contribution', type: 'number', unit: 'USD', required: false, description: 'Traditional IRA contribution', placeholder: '6000', min: 0, max: 7000 },
    { id: 'hsaContribution', name: 'HSA Contribution', type: 'number', unit: 'USD', required: false, description: 'Health Savings Account contribution', placeholder: '3650', min: 0, max: 4150 },
    { id: 'selfEmploymentTax', name: 'Self-Employment Tax', type: 'number', unit: 'USD', required: false, description: 'Self-employment tax deduction', placeholder: '3531', min: 0, max: 100000 },
    { id: 'selfEmploymentHealth', name: 'Self-Employment Health Insurance', type: 'number', unit: 'USD', required: false, description: 'Self-employed health insurance deduction', placeholder: '5000', min: 0, max: 100000 },
    { id: 'alimonyPaid', name: 'Alimony Paid', type: 'number', unit: 'USD', required: false, description: 'Alimony paid (pre-2019 agreements)', placeholder: '0', min: 0, max: 100000 },

    // Credits
    { id: 'childTaxCredit', name: 'Child Tax Credit', type: 'number', required: false, description: 'Number of qualifying children', placeholder: '2', min: 0, max: 10 },
    { id: 'childCareCredit', name: 'Child Care Credit', type: 'number', unit: 'USD', required: false, description: 'Child and dependent care expenses', placeholder: '3000', min: 0, max: 10000 },
    { id: 'earnedIncomeCredit', name: 'Earned Income Credit', type: 'select', required: false, description: 'Qualify for Earned Income Credit?', options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ] },
    { id: 'educationCredits', name: 'Education Credits', type: 'number', unit: 'USD', required: false, description: 'Qualified education expenses', placeholder: '4000', min: 0, max: 10000 },
    { id: 'saversCredit', name: 'Saver\'s Credit', type: 'select', required: false, description: 'Qualify for Saver\'s Credit?', options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ] },
    { id: 'adoptionCredit', name: 'Adoption Credit', type: 'number', unit: 'USD', required: false, description: 'Adoption expenses', placeholder: '0', min: 0, max: 100000 },
    { id: 'foreignTaxCredit', name: 'Foreign Tax Credit', type: 'number', unit: 'USD', required: false, description: 'Foreign taxes paid', placeholder: '0', min: 0, max: 100000 },

    // State Taxes
    { id: 'stateOfResidence', name: 'State of Residence', type: 'select', required: false, description: 'State for tax calculation', options: [
      { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' }, { value: 'ar', label: 'Arkansas' },
      { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' }, { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' },
      { value: 'fl', label: 'Florida' }, { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
      { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' }, { value: 'ks', label: 'Kansas' },
      { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' }, { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' },
      { value: 'ma', label: 'Massachusetts' }, { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
      { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' }, { value: 'nv', label: 'Nevada' },
      { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' }, { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' },
      { value: 'nc', label: 'North Carolina' }, { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
      { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' }, { value: 'sc', label: 'South Carolina' },
      { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' }, { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' },
      { value: 'vt', label: 'Vermont' }, { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
      { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
    ] },
    { id: 'stateIncome', name: 'State Taxable Income', type: 'number', unit: 'USD', required: false, description: 'State taxable income (if different from federal)', placeholder: '70000', min: 0, max: 10000000 },
    { id: 'stateDeductions', name: 'State Deductions', type: 'number', unit: 'USD', required: false, description: 'State-specific deductions', placeholder: '5000', min: 0, max: 100000 },
    { id: 'stateCredits', name: 'State Credits', type: 'number', unit: 'USD', required: false, description: 'State-specific credits', placeholder: '500', min: 0, max: 10000 },

    // Withholding and Payments
    { id: 'federalWithholding', name: 'Federal Withholding', type: 'number', unit: 'USD', required: false, description: 'Federal income tax withheld', placeholder: '12000', min: 0, max: 1000000 },
    { id: 'stateWithholding', name: 'State Withholding', type: 'number', unit: 'USD', required: false, description: 'State income tax withheld', placeholder: '4000', min: 0, max: 1000000 },
    { id: 'estimatedPayments', name: 'Estimated Tax Payments', type: 'number', unit: 'USD', required: false, description: 'Estimated tax payments made', placeholder: '2000', min: 0, max: 1000000 },
    { id: 'otherPayments', name: 'Other Tax Payments', type: 'number', unit: 'USD', required: false, description: 'Other tax payments (extension, etc.)', placeholder: '0', min: 0, max: 1000000 },

    // Alternative Minimum Tax
    { id: 'amtIncome', name: 'AMT Income', type: 'number', unit: 'USD', required: false, description: 'Alternative Minimum Tax income', placeholder: '0', min: 0, max: 10000000 },
    { id: 'amtPreferences', name: 'AMT Preferences', type: 'number', unit: 'USD', required: false, description: 'AMT preference items', placeholder: '0', min: 0, max: 1000000 },

    // Analysis Options
    { id: 'analysisType', name: 'Analysis Type', type: 'select', required: false, description: 'Type of tax analysis to perform', options: [
      { value: 'basic', label: 'Basic Tax Calculation' },
      { value: 'detailed', label: 'Detailed Analysis' },
      { value: 'optimization', label: 'Tax Optimization' },
      { value: 'comparison', label: 'Scenario Comparison' }
    ] }
  ],
  outputs: [
    { id: 'grossIncome', name: 'Gross Income', type: 'number', unit: 'USD', description: 'Total gross income' },
    { id: 'adjustedGrossIncome', name: 'Adjusted Gross Income (AGI)', type: 'number', unit: 'USD', description: 'AGI after above-the-line deductions' },
    { id: 'taxableIncome', name: 'Taxable Income', type: 'number', unit: 'USD', description: 'Income subject to tax after deductions' },
    { id: 'federalTax', name: 'Federal Tax', type: 'number', unit: 'USD', description: 'Federal income tax liability' },
    { id: 'stateTax', name: 'State Tax', type: 'number', unit: 'USD', description: 'State income tax liability' },
    { id: 'totalTax', name: 'Total Tax', type: 'number', unit: 'USD', description: 'Combined federal and state tax' },
    { id: 'effectiveTaxRate', name: 'Effective Tax Rate', type: 'number', unit: '%', description: 'Total tax as percentage of gross income' },
    { id: 'marginalTaxRate', name: 'Marginal Tax Rate', type: 'number', unit: '%', description: 'Tax rate on next dollar of income' },
    { id: 'federalRefund', name: 'Federal Refund', type: 'number', unit: 'USD', description: 'Federal tax refund or amount owed' },
    { id: 'stateRefund', name: 'State Refund', type: 'number', unit: 'USD', description: 'State tax refund or amount owed' },
    { id: 'totalRefund', name: 'Total Refund', type: 'number', unit: 'USD', description: 'Combined refund or amount owed' },
    { id: 'standardDeductionAmount', name: 'Standard Deduction', type: 'number', unit: 'USD', description: 'Standard deduction amount' },
    { id: 'itemizedDeductions', name: 'Itemized Deductions', type: 'number', unit: 'USD', description: 'Total itemized deductions' },
    { id: 'totalCredits', name: 'Total Credits', type: 'number', unit: 'USD', description: 'Total tax credits' },
    { id: 'alternativeMinimumTax', name: 'Alternative Minimum Tax', type: 'number', unit: 'USD', description: 'AMT liability if applicable' },
    { id: 'taxBrackets', name: 'Tax Brackets', type: 'array', description: 'Breakdown of income by tax bracket' },
    { id: 'deductionAnalysis', name: 'Deduction Analysis', type: 'array', description: 'Analysis of deductions and their impact' },
    { id: 'creditAnalysis', name: 'Credit Analysis', type: 'array', description: 'Analysis of credits and their impact' },
    { id: 'withholdingAnalysis', name: 'Withholding Analysis', type: 'object', description: 'Analysis of withholding adequacy' },
    { id: 'optimizationSuggestions', name: 'Optimization Suggestions', type: 'array', description: 'Suggestions for tax optimization' },
    { id: 'taxSavings', name: 'Potential Tax Savings', type: 'number', unit: 'USD', description: 'Potential tax savings from optimization' },
    { id: 'nextYearProjection', name: 'Next Year Projection', type: 'object', description: 'Projected taxes for next year' },
    { id: 'taxEfficiencyScore', name: 'Tax Efficiency Score', type: 'number', description: 'Tax efficiency assessment (0-100)' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Tax planning recommendations' },
    { id: 'keyInsights', name: 'Key Insights', type: 'string', description: 'Key tax insights and observations' },
    { id: 'taxAnalysis', name: 'Tax Analysis', type: 'string', description: 'Comprehensive tax analysis report' }
  ],
  calculate: (inputs) => {
    const { calculateTax } = require('./formulas');
    return calculateTax(inputs);
  },
  generateReport: (inputs, outputs) => {
    const { generateTaxAnalysis } = require('./formulas');
    return generateTaxAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
