import { Calculator } from '../../types/calculator';

export const RentVsBuyCalculator: Calculator = {
  id: 'rent-vs-buy-calculator',
  name: 'Rent vs. Buy Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Compare the financial implications of renting vs buying a home, including costs, benefits, and long-term analysis',
  inputs: [
    // Property Details
    { id: 'homePrice', name: 'Home Price', type: 'number', unit: 'USD', required: true, description: 'Purchase price of the home', placeholder: '400000', min: 0, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Down payment amount', placeholder: '80000', min: 0, max: 10000000 },
    { id: 'downPaymentPercent', name: 'Down Payment %', type: 'number', unit: '%', required: false, description: 'Down payment percentage (calculated if not provided)', placeholder: '20', min: 0, max: 100 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Total closing costs', placeholder: '12000', min: 0, max: 100000 },
    { id: 'closingCostsPercent', name: 'Closing Costs %', type: 'number', unit: '%', required: false, description: 'Closing costs as percentage of home price', placeholder: '3', min: 0, max: 10 },

    // Financing Details
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: false, description: 'Mortgage loan amount (calculated if not provided)', placeholder: '320000', min: 0, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '6.5', min: 0, max: 20, step: 0.125 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'pmi', name: 'PMI', type: 'number', unit: 'USD', required: false, description: 'Monthly PMI payment', placeholder: '0', min: 0, max: 1000 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%', required: false, description: 'PMI rate as percentage of loan', placeholder: '0.5', min: 0, max: 2 },

    // Renting Details
    { id: 'monthlyRent', name: 'Monthly Rent', type: 'number', unit: 'USD', required: true, description: 'Monthly rental payment', placeholder: '2500', min: 0, max: 50000 },
    { id: 'rentIncreaseRate', name: 'Rent Increase Rate', type: 'number', unit: '%', required: false, description: 'Annual rent increase rate', placeholder: '3', min: 0, max: 20 },
    { id: 'rentersInsurance', name: 'Renters Insurance', type: 'number', unit: 'USD', required: false, description: 'Monthly renters insurance', placeholder: '25', min: 0, max: 500 },
    { id: 'securityDeposit', name: 'Security Deposit', type: 'number', unit: 'USD', required: false, description: 'Security deposit amount', placeholder: '2500', min: 0, max: 10000 },

    // Homeownership Costs
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes', placeholder: '4000', min: 0, max: 50000 },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%', required: false, description: 'Property tax rate as percentage of home value', placeholder: '1', min: 0, max: 5 },
    { id: 'homeownersInsurance', name: 'Homeowners Insurance', type: 'number', unit: 'USD', required: false, description: 'Annual homeowners insurance', placeholder: '1200', min: 0, max: 10000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly HOA fees', placeholder: '0', min: 0, max: 2000 },
    { id: 'maintenance', name: 'Maintenance', type: 'number', unit: 'USD', required: false, description: 'Monthly maintenance costs', placeholder: '300', min: 0, max: 5000 },
    { id: 'maintenancePercent', name: 'Maintenance %', type: 'number', unit: '%', required: false, description: 'Maintenance as percentage of home value', placeholder: '1', min: 0, max: 5 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD', required: false, description: 'Monthly utilities (if not included in rent)', placeholder: '200', min: 0, max: 2000 },

    // Market Factors
    { id: 'homeAppreciationRate', name: 'Home Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Annual home appreciation rate', placeholder: '3', min: -20, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%', required: false, description: 'Expected annual investment return on savings', placeholder: '7', min: 0, max: 20 },
    { id: 'sellingCosts', name: 'Selling Costs', type: 'number', unit: '%', required: false, description: 'Selling costs as percentage of home value', placeholder: '6', min: 0, max: 15 },

    // Time Horizon
    { id: 'timeHorizon', name: 'Time Horizon', type: 'number', unit: 'years', required: true, description: 'How long you plan to stay in the home', placeholder: '7', min: 1, max: 50 },
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'select', required: false, description: 'Period for detailed analysis', options: [
      { value: '1-year', label: '1 Year' },
      { value: '3-year', label: '3 Years' },
      { value: '5-year', label: '5 Years' },
      { value: '7-year', label: '7 Years' },
      { value: '10-year', label: '10 Years' },
      { value: '15-year', label: '15 Years' },
      { value: '30-year', label: '30 Years' }
    ] },

    // Tax Information
    { id: 'marginalTaxRate', name: 'Marginal Tax Rate', type: 'number', unit: '%', required: false, description: 'Your marginal tax rate', placeholder: '22', min: 0, max: 50 },
    { id: 'stateTaxRate', name: 'State Tax Rate', type: 'number', unit: '%', required: false, description: 'State tax rate', placeholder: '5', min: 0, max: 15 },
    { id: 'propertyTaxDeductible', name: 'Property Tax Deductible', type: 'select', required: false, description: 'Can you deduct property taxes?', options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'partial', label: 'Partial' }
    ] },

    // Personal Factors
    { id: 'currentSavings', name: 'Current Savings', type: 'number', unit: 'USD', required: false, description: 'Current savings/investments', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'monthlySavings', name: 'Monthly Savings', type: 'number', unit: 'USD', required: false, description: 'Monthly savings amount', placeholder: '1000', min: 0, max: 50000 },
    { id: 'emergencyFund', name: 'Emergency Fund', type: 'number', unit: 'USD', required: false, description: 'Emergency fund requirement', placeholder: '15000', min: 0, max: 100000 },
    { id: 'lifestylePreference', name: 'Lifestyle Preference', type: 'select', required: false, description: 'Lifestyle preference factor', options: [
      { value: 'flexibility', label: 'Flexibility (Renting)' },
      { value: 'stability', label: 'Stability (Buying)' },
      { value: 'neutral', label: 'Neutral' }
    ] },
    { id: 'maintenancePreference', name: 'Maintenance Preference', type: 'select', required: false, description: 'Maintenance responsibility preference', options: [
      { value: 'avoid', label: 'Avoid Maintenance' },
      { value: 'handle', label: 'Handle Maintenance' },
      { value: 'neutral', label: 'Neutral' }
    ] }
  ],
  outputs: [
    { id: 'monthlyRentCost', name: 'Monthly Rent Cost', type: 'number', unit: 'USD', description: 'Total monthly cost of renting' },
    { id: 'monthlyBuyCost', name: 'Monthly Buy Cost', type: 'number', unit: 'USD', description: 'Total monthly cost of buying' },
    { id: 'annualRentCost', name: 'Annual Rent Cost', type: 'number', unit: 'USD', description: 'Total annual cost of renting' },
    { id: 'annualBuyCost', name: 'Annual Buy Cost', type: 'number', unit: 'USD', description: 'Total annual cost of buying' },
    { id: 'totalRentCost', name: 'Total Rent Cost', type: 'number', unit: 'USD', description: 'Total cost of renting over time horizon' },
    { id: 'totalBuyCost', name: 'Total Buy Cost', type: 'number', unit: 'USD', description: 'Total cost of buying over time horizon' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly mortgage payment' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over time horizon' },
    { id: 'totalPrincipal', name: 'Total Principal', type: 'number', unit: 'USD', description: 'Total principal paid over time horizon' },
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', description: 'Projected home value at end of time horizon' },
    { id: 'equity', name: 'Equity', type: 'number', unit: 'USD', description: 'Projected equity at end of time horizon' },
    { id: 'netBuyCost', name: 'Net Buy Cost', type: 'number', unit: 'USD', description: 'Net cost of buying (costs minus equity)' },
    { id: 'opportunityCost', name: 'Opportunity Cost', type: 'number', unit: 'USD', description: 'Opportunity cost of down payment and closing costs' },
    { id: 'taxSavings', name: 'Tax Savings', type: 'number', unit: 'USD', description: 'Total tax savings from homeownership' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years until buying becomes cheaper than renting' },
    { id: 'breakEvenMonths', name: 'Break-Even Months', type: 'number', unit: 'months', description: 'Months until buying becomes cheaper than renting' },
    { id: 'costDifference', name: 'Cost Difference', type: 'number', unit: 'USD', description: 'Difference between total rent and buy costs' },
    { id: 'monthlySavings', name: 'Monthly Savings', type: 'number', unit: 'USD', description: 'Monthly savings from chosen option' },
    { id: 'totalSavings', name: 'Total Savings', type: 'number', unit: 'USD', description: 'Total savings over time horizon' },
    { id: 'roi', name: 'ROI', type: 'number', unit: '%', description: 'Return on investment for buying' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR of buying vs renting' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'NPV of buying vs renting' },
    { id: 'financialScore', name: 'Financial Score', type: 'number', description: 'Financial comparison score (0-100)' },
    { id: 'lifestyleScore', name: 'Lifestyle Score', type: 'number', description: 'Lifestyle preference score (0-100)' },
    { id: 'overallScore', name: 'Overall Score', type: 'number', description: 'Overall recommendation score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Primary recommendation (Rent or Buy)' },
    { id: 'keyFactors', name: 'Key Factors', type: 'string', description: 'Key factors influencing the decision' },
    { id: 'risks', name: 'Risks', type: 'string', description: 'Primary risks to consider' },
    { id: 'rentVsBuyAnalysis', name: 'Rent vs Buy Analysis', type: 'string', description: 'Comprehensive rent vs buy analysis report' }
  ],
  calculate: (inputs) => {
    const { calculateRentVsBuy } = require('./formulas');
    return calculateRentVsBuy(inputs);
  },
  generateReport: (inputs, outputs) => {
    const { generateRentVsBuyAnalysis } = require('./formulas');
    return generateRentVsBuyAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
