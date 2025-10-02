import { Calculator } from '../../types/calculator';

export const RefinanceCalculator: Calculator = {
  id: 'refinance-calculator',
  name: 'Refinance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate potential savings and break-even analysis for mortgage refinancing',
  inputs: [
    // Current Loan Details
    { id: 'currentLoanBalance', name: 'Current Loan Balance', type: 'number', unit: 'USD', required: true, description: 'Remaining balance on current mortgage', placeholder: '250000', min: 0, max: 10000000 },
    { id: 'currentInterestRate', name: 'Current Interest Rate', type: 'number', unit: '%', required: true, description: 'Current annual interest rate', placeholder: '6.5', min: 0, max: 20, step: 0.125 },
    { id: 'currentMonthlyPayment', name: 'Current Monthly Payment', type: 'number', unit: 'USD', required: true, description: 'Current monthly mortgage payment', placeholder: '1580', min: 0, max: 50000 },
    { id: 'currentLoanTerm', name: 'Current Loan Term', type: 'number', unit: 'years', required: true, description: 'Remaining years on current loan', placeholder: '25', min: 1, max: 50 },
    { id: 'currentLoanType', name: 'Current Loan Type', type: 'select', required: true, description: 'Type of current mortgage', options: [
      { value: 'conventional', label: 'Conventional' },
      { value: 'fha', label: 'FHA' },
      { value: 'va', label: 'VA' },
      { value: 'usda', label: 'USDA' }
    ] },
    { id: 'currentPMI', name: 'Current PMI', type: 'number', unit: 'USD', required: false, description: 'Current monthly PMI payment', placeholder: '0', min: 0, max: 1000 },
    { id: 'currentPropertyTaxes', name: 'Current Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Current monthly property taxes', placeholder: '300', min: 0, max: 5000 },
    { id: 'currentInsurance', name: 'Current Insurance', type: 'number', unit: 'USD', required: false, description: 'Current monthly homeowners insurance', placeholder: '150', min: 0, max: 2000 },

    // New Loan Details
    { id: 'newLoanAmount', name: 'New Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Amount of new refinance loan', placeholder: '250000', min: 0, max: 10000000 },
    { id: 'newInterestRate', name: 'New Interest Rate', type: 'number', unit: '%', required: true, description: 'New annual interest rate', placeholder: '5.5', min: 0, max: 20, step: 0.125 },
    { id: 'newLoanTerm', name: 'New Loan Term', type: 'number', unit: 'years', required: true, description: 'Term of new loan', placeholder: '30', min: 1, max: 50 },
    { id: 'newLoanType', name: 'New Loan Type', type: 'select', required: true, description: 'Type of new mortgage', options: [
      { value: 'conventional', label: 'Conventional' },
      { value: 'fha', label: 'FHA' },
      { value: 'va', label: 'VA' },
      { value: 'usda', label: 'USDA' }
    ] },
    { id: 'newPMI', name: 'New PMI', type: 'number', unit: 'USD', required: false, description: 'New monthly PMI payment', placeholder: '0', min: 0, max: 1000 },
    { id: 'newPropertyTaxes', name: 'New Property Taxes', type: 'number', unit: 'USD', required: false, description: 'New monthly property taxes', placeholder: '300', min: 0, max: 5000 },
    { id: 'newInsurance', name: 'New Insurance', type: 'number', unit: 'USD', required: false, description: 'New monthly homeowners insurance', placeholder: '150', min: 0, max: 2000 },

    // Property and Financial Details
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current estimated property value', placeholder: '350000', min: 0, max: 10000000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: true, description: 'Total closing costs for refinance', placeholder: '5000', min: 0, max: 50000 },
    { id: 'appraisalFee', name: 'Appraisal Fee', type: 'number', unit: 'USD', required: false, description: 'Appraisal fee', placeholder: '500', min: 0, max: 2000 },
    { id: 'titleInsurance', name: 'Title Insurance', type: 'number', unit: 'USD', required: false, description: 'Title insurance cost', placeholder: '1000', min: 0, max: 5000 },
    { id: 'escrowFunding', name: 'Escrow Funding', type: 'number', unit: 'USD', required: false, description: 'Escrow account funding', placeholder: '2000', min: 0, max: 10000 },
    { id: 'prepaidInterest', name: 'Prepaid Interest', type: 'number', unit: 'USD', required: false, description: 'Prepaid interest at closing', placeholder: '500', min: 0, max: 5000 },
    { id: 'lenderCredits', name: 'Lender Credits', type: 'number', unit: 'USD', required: false, description: 'Credits from lender', placeholder: '0', min: -10000, max: 10000 },
    { id: 'sellerCredits', name: 'Seller Credits', type: 'number', unit: 'USD', required: false, description: 'Credits from seller', placeholder: '0', min: -10000, max: 10000 },

    // Financial Factors
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Marginal tax rate for interest deduction', placeholder: '22', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%', required: false, description: 'Expected return on alternative investments', placeholder: '7', min: 0, max: 20 },
    { id: 'plannedOwnershipYears', name: 'Planned Ownership Years', type: 'number', unit: 'years', required: false, description: 'How long you plan to own the property', placeholder: '10', min: 1, max: 50 },
    { id: 'monthlyIncome', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Monthly household income', placeholder: '8000', min: 0, max: 1000000 },
    { id: 'monthlyDebts', name: 'Monthly Debts', type: 'number', unit: 'USD', required: false, description: 'Other monthly debt payments', placeholder: '500', min: 0, max: 100000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'Property occupancy type', options: [
      { value: 'primary-residence', label: 'Primary Residence' },
      { value: 'second-home', label: 'Second Home' },
      { value: 'investment', label: 'Investment Property' }
    ] },
    { id: 'refinancePurpose', name: 'Refinance Purpose', type: 'select', required: false, description: 'Primary reason for refinancing', options: [
      { value: 'lower-rate', label: 'Lower Interest Rate' },
      { value: 'lower-payment', label: 'Lower Monthly Payment' },
      { value: 'cash-out', label: 'Cash Out' },
      { value: 'shorter-term', label: 'Shorter Loan Term' },
      { value: 'remove-pmi', label: 'Remove PMI' },
      { value: 'debt-consolidation', label: 'Debt Consolidation' }
    ] },
    { id: 'cashOutAmount', name: 'Cash Out Amount', type: 'number', unit: 'USD', required: false, description: 'Amount of cash to take out', placeholder: '0', min: 0, max: 1000000 },
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current market conditions', options: [
      { value: 'declining', label: 'Declining Rates' },
      { value: 'stable', label: 'Stable Rates' },
      { value: 'rising', label: 'Rising Rates' }
    ] }
  ],
  outputs: [
    { id: 'monthlySavings', name: 'Monthly Savings', type: 'number', unit: 'USD', description: 'Monthly payment reduction' },
    { id: 'annualSavings', name: 'Annual Savings', type: 'number', unit: 'USD', description: 'Annual payment reduction' },
    { id: 'breakEvenMonths', name: 'Break-Even Months', type: 'number', description: 'Months to recoup closing costs' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', description: 'Years to recoup closing costs' },
    { id: 'totalSavings5Years', name: '5-Year Total Savings', type: 'number', unit: 'USD', description: 'Total savings over 5 years' },
    { id: 'totalSavings10Years', name: '10-Year Total Savings', type: 'number', unit: 'USD', description: 'Total savings over 10 years' },
    { id: 'totalSavingsLife', name: 'Life of Loan Savings', type: 'number', unit: 'USD', description: 'Total savings over loan term' },
    { id: 'newMonthlyPayment', name: 'New Monthly Payment', type: 'number', unit: 'USD', description: 'New monthly mortgage payment' },
    { id: 'newTotalMonthlyPayment', name: 'New Total Monthly Payment', type: 'number', unit: 'USD', description: 'New total monthly payment including taxes and insurance' },
    { id: 'currentTotalMonthlyPayment', name: 'Current Total Monthly Payment', type: 'number', unit: 'USD', description: 'Current total monthly payment including taxes and insurance' },
    { id: 'interestSavings', name: 'Interest Savings', type: 'number', unit: 'USD', description: 'Total interest savings over loan term' },
    { id: 'principalIncrease', name: 'Principal Increase', type: 'number', unit: 'USD', description: 'Additional principal paid due to refinance' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'Net present value of refinance' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR of refinance investment' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Years to payback closing costs' },
    { id: 'refinanceScore', name: 'Refinance Score', type: 'number', description: 'Overall refinance recommendation score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk assessment score (0-100)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Refinance feasibility score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Refinance recommendation' },
    { id: 'keyBenefits', name: 'Key Benefits', type: 'string', description: 'Primary benefits of refinancing' },
    { id: 'keyRisks', name: 'Key Risks', type: 'string', description: 'Primary risks of refinancing' },
    { id: 'refinanceAnalysis', name: 'Refinance Analysis', type: 'string', description: 'Comprehensive refinance analysis report' }
  ],
  calculate: (inputs) => {
    // Import calculation functions
    const { calculateRefinance } = require('./formulas');
    return calculateRefinance(inputs);
  },
  generateReport: (inputs, outputs) => {
    // Import report generation function
    const { generateRefinanceAnalysis } = require('./formulas');
    return generateRefinanceAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
