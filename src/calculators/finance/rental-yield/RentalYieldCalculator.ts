import { Calculator } from '../../../types/calculator';

export const RentalYieldCalculator: Calculator = {
  id: 'rental-yield-calculator',
  name: 'Rental Yield Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate rental yield metrics including gross yield, net yield, and cash-on-cash return for real estate investments',
  inputs: [
    // Property Details
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the property', placeholder: '300000', min: 0, max: 10000000 },
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: false, description: 'Original purchase price', placeholder: '280000', min: 0, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '60000', min: 0, max: 10000000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Total closing costs', placeholder: '9000', min: 0, max: 10000 },
    { id: 'renovationCosts', name: 'Renovation Costs', type: 'number', unit: 'USD', required: false, description: 'Renovation and improvement costs', placeholder: '15000', min: 0, max: 500000 },

    // Rental Income
    { id: 'monthlyRent', name: 'Monthly Rent', type: 'number', unit: 'USD', required: true, description: 'Monthly rental income', placeholder: '2500', min: 0, max: 50000 },
    { id: 'annualRent', name: 'Annual Rent', type: 'number', unit: 'USD', required: false, description: 'Annual rental income (calculated if not provided)', placeholder: '30000', min: 0, max: 600000 },
    { id: 'vacancyRate', name: 'Vacancy Rate', type: 'number', unit: '%', required: false, description: 'Expected vacancy rate', placeholder: '5', min: 0, max: 50 },
    { id: 'rentGrowthRate', name: 'Rent Growth Rate', type: 'number', unit: '%', required: false, description: 'Annual rent growth rate', placeholder: '3', min: -10, max: 20 },
    { id: 'otherIncome', name: 'Other Income', type: 'number', unit: 'USD', required: false, description: 'Other monthly income (parking, storage, etc.)', placeholder: '100', min: 0, max: 5000 },
    { id: 'lateFees', name: 'Late Fees', type: 'number', unit: 'USD', required: false, description: 'Average monthly late fees', placeholder: '50', min: 0, max: 1000 },

    // Operating Expenses
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes', placeholder: '3600', min: 0, max: 50000 },
    { id: 'insurance', name: 'Insurance', type: 'number', unit: 'USD', required: false, description: 'Annual insurance premium', placeholder: '1800', min: 0, max: 10000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly HOA fees', placeholder: '0', min: 0, max: 2000 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD', required: false, description: 'Monthly utilities (if paid by owner)', placeholder: '0', min: 0, max: 2000 },
    { id: 'maintenance', name: 'Maintenance', type: 'number', unit: 'USD', required: false, description: 'Monthly maintenance costs', placeholder: '200', min: 0, max: 5000 },
    { id: 'propertyManagement', name: 'Property Management', type: 'number', unit: '%', required: false, description: 'Property management fee percentage', placeholder: '8', min: 0, max: 20 },
    { id: 'repairs', name: 'Repairs', type: 'number', unit: 'USD', required: false, description: 'Monthly repair allowance', placeholder: '150', min: 0, max: 3000 },
    { id: 'landscaping', name: 'Landscaping', type: 'number', unit: 'USD', required: false, description: 'Monthly landscaping costs', placeholder: '50', min: 0, max: 1000 },
    { id: 'pestControl', name: 'Pest Control', type: 'number', unit: 'USD', required: false, description: 'Monthly pest control costs', placeholder: '25', min: 0, max: 500 },
    { id: 'advertising', name: 'Advertising', type: 'number', unit: 'USD', required: false, description: 'Monthly advertising costs', placeholder: '30', min: 0, max: 500 },
    { id: 'legalFees', name: 'Legal Fees', type: 'number', unit: 'USD', required: false, description: 'Annual legal fees', placeholder: '500', min: 0, max: 5000 },
    { id: 'accountingFees', name: 'Accounting Fees', type: 'number', unit: 'USD', required: false, description: 'Annual accounting fees', placeholder: '300', min: 0, max: 3000 },

    // Financing Details
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: false, description: 'Mortgage loan amount', placeholder: '240000', min: 0, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: false, description: 'Annual interest rate', placeholder: '6.5', min: 0, max: 20, step: 0.125 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'pmi', name: 'PMI', type: 'number', unit: 'USD', required: false, description: 'Monthly PMI payment', placeholder: '0', min: 0, max: 1000 },

    // Property Details
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of rental property', options: [
      { value: 'single-family', label: 'Single Family Home' },
      { value: 'condo', label: 'Condominium' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'duplex', label: 'Duplex' },
      { value: 'triplex', label: 'Triplex' },
      { value: 'fourplex', label: 'Fourplex' },
      { value: 'apartment', label: 'Apartment Building' },
      { value: 'commercial', label: 'Commercial Property' }
    ] },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', required: false, description: 'Property square footage', placeholder: '1500', min: 0, max: 100000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false, description: 'Number of bedrooms', placeholder: '3', min: 0, max: 20 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false, description: 'Number of bathrooms', placeholder: '2', min: 0, max: 20 },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year property was built', placeholder: '2000', min: 1800, max: 2030 },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Property location type', options: [
      { value: 'urban', label: 'Urban' },
      { value: 'suburban', label: 'Suburban' },
      { value: 'rural', label: 'Rural' }
    ] },

    // Market Factors
    { id: 'appreciationRate', name: 'Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Annual property appreciation rate', placeholder: '3', min: -20, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current market conditions', options: [
      { value: 'hot', label: 'Hot Market' },
      { value: 'stable', label: 'Stable Market' },
      { value: 'cooling', label: 'Cooling Market' },
      { value: 'declining', label: 'Declining Market' }
    ] },
    { id: 'holdingPeriod', name: 'Holding Period', type: 'number', unit: 'years', required: false, description: 'Expected holding period', placeholder: '10', min: 1, max: 50 },

    // Tax Information
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Marginal tax rate', placeholder: '22', min: 0, max: 50 },
    { id: 'depreciationPeriod', name: 'Depreciation Period', type: 'number', unit: 'years', required: false, description: 'Depreciation period for tax purposes', placeholder: '27.5', min: 0, max: 50 },

    // Analysis Period
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'select', required: false, description: 'Period for yield analysis', options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'annually', label: 'Annually' },
      { value: '5-year', label: '5-Year' },
      { value: '10-year', label: '10-Year' }
    ] }
  ],
  outputs: [
    { id: 'grossYield', name: 'Gross Yield', type: 'number', unit: '%', description: 'Gross rental yield (annual rent / property value)' },
    { id: 'netYield', name: 'Net Yield', type: 'number', unit: '%', description: 'Net rental yield after expenses' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Annual cash flow return on investment' },
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total cash invested' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Monthly net cash flow' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Annual net cash flow' },
    { id: 'grossAnnualIncome', name: 'Gross Annual Income', type: 'number', unit: 'USD', description: 'Total annual rental income' },
    { id: 'netAnnualIncome', name: 'Net Annual Income', type: 'number', unit: 'USD', description: 'Annual income after expenses' },
    { id: 'totalAnnualExpenses', name: 'Total Annual Expenses', type: 'number', unit: 'USD', description: 'Total annual operating expenses' },
    { id: 'operatingExpenseRatio', name: 'Operating Expense Ratio', type: 'number', unit: '%', description: 'Operating expenses as percentage of gross income' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage Ratio', type: 'number', description: 'Net operating income to debt service ratio' },
    { id: 'breakEvenRent', name: 'Break-Even Rent', type: 'number', unit: 'USD', description: 'Minimum rent needed to break even' },
    { id: 'breakEvenOccupancy', name: 'Break-Even Occupancy', type: 'number', unit: '%', description: 'Minimum occupancy rate to break even' },
    { id: 'rentToPriceRatio', name: 'Rent-to-Price Ratio', type: 'number', description: 'Annual rent to property value ratio' },
    { id: 'priceToRentRatio', name: 'Price-to-Rent Ratio', type: 'number', description: 'Property value to annual rent ratio' },
    { id: 'capRate', name: 'Cap Rate', type: 'number', unit: '%', description: 'Capitalization rate' },
    { id: 'totalROI', name: 'Total ROI', type: 'number', unit: '%', description: 'Total return on investment including appreciation' },
    { id: 'annualizedROI', name: 'Annualized ROI', type: 'number', unit: '%', description: 'Annualized total return' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Years to recoup initial investment' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR over holding period' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'NPV of investment' },
    { id: 'yieldScore', name: 'Yield Score', type: 'number', description: 'Overall yield quality score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Investment risk assessment (0-100)' },
    { id: 'cashFlowScore', name: 'Cash Flow Score', type: 'number', description: 'Cash flow quality score (0-100)' },
    { id: 'marketScore', name: 'Market Score', type: 'number', description: 'Market condition score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    { id: 'keyStrengths', name: 'Key Strengths', type: 'string', description: 'Primary investment strengths' },
    { id: 'keyRisks', name: 'Key Risks', type: 'string', description: 'Primary investment risks' },
    { id: 'rentalYieldAnalysis', name: 'Rental Yield Analysis', type: 'string', description: 'Comprehensive rental yield analysis report' }
  ],
  calculate: (inputs) => {
    // Import calculation functions
    const { calculateRentalYield } = require('./formulas');
    return calculateRentalYield(inputs);
  },
  generateReport: (inputs, outputs) => {
    // Import report generation function
    const { generateRentalYieldAnalysis } = require('./formulas');
    return generateRentalYieldAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
