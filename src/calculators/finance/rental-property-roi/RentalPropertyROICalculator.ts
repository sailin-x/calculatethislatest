import { Calculator } from '../../types/calculator';

export const RentalPropertyROICalculator: Calculator = {
  id: 'RentalPropertyRoi-calculator',
  name: 'Rental Property ROI Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate return on investment for rental properties including cash flow, appreciation, and total returns',
  inputs: [
    // Property Purchase Details
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: true, description: 'Property purchase price', placeholder: '300000', min: 0, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Down payment amount', placeholder: '60000', min: 0, max: 10000000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: true, description: 'Total closing costs', placeholder: '9000', min: 0, max: 10000 },
    { id: 'renovationCosts', name: 'Renovation Costs', type: 'number', unit: 'USD', required: false, description: 'Renovation and improvement costs', placeholder: '15000', min: 0, max: 500000 },
    { id: 'purchaseDate', name: 'Purchase Date', type: 'date', required: false, description: 'Date of property purchase', placeholder: '20240101' },

    // Financing Details
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Mortgage loan amount', placeholder: '240000', min: 0, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '6.5', min: 0, max: 20, step: 0.125 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of mortgage loan', options: [
      { value: 'conventional', label: 'Conventional' },
      { value: 'fha', label: 'FHA' },
      { value: 'va', label: 'VA' },
      { value: 'usda', label: 'USDA' }
    ] },
    { id: 'pmi', name: 'PMI', type: 'number', unit: 'USD', required: false, description: 'Monthly PMI payment', placeholder: '0', min: 0, max: 1000 },

    // Rental Income
    { id: 'monthlyRent', name: 'Monthly Rent', type: 'number', unit: 'USD', required: true, description: 'Monthly rental income', placeholder: '2500', min: 0, max: 50000 },
    { id: 'vacancyRate', name: 'Vacancy Rate', type: 'number', unit: '%', required: false, description: 'Expected vacancy rate', placeholder: '5', min: 0, max: 50 },
    { id: 'rentGrowthRate', name: 'Rent Growth Rate', type: 'number', unit: '%', required: false, description: 'Annual rent growth rate', placeholder: '3', min: -10, max: 20 },
    { id: 'otherIncome', name: 'Other Income', type: 'number', unit: 'USD', required: false, description: 'Other monthly income (parking, storage, etc.)', placeholder: '100', min: 0, max: 5000 },

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

    // Exit Strategy
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: false, description: 'Planned exit strategy', options: [
      { value: 'sell', label: 'Sell Property' },
      { value: 'refinance', label: 'Refinance' },
      { value: '1031-exchange', label: '1031 Exchange' },
      { value: 'HoldLongTerm', label: 'Hold Long Term' }
    ] },
    { id: 'sellingCosts', name: 'Selling Costs', type: 'number', unit: '%', required: false, description: 'Selling costs as percentage of sale price', placeholder: '6', min: 0, max: 20 }
  ],
  outputs: [
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total cash invested' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Monthly net cash flow' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Annual net cash flow' },
    { id: 'cashOnCashReturn', name: 'CashOnCash Return', type: 'number', unit: '%', description: 'Annual cash flow return on investment' },
    { id: 'capRate', name: 'Cap Rate', type: 'number', unit: '%', description: 'Capitalization rate' },
    { id: 'totalROI', name: 'Total ROI', type: 'number', unit: '%', description: 'Total return on investment including appreciation' },
    { id: 'annualizedROI', name: 'Annualized ROI', type: 'number', unit: '%', description: 'Annualized total return' },
    { id: 'breakEvenRent', name: 'Break-Even Rent', type: 'number', unit: 'USD', description: 'Minimum rent needed to break even' },
    { id: 'breakEvenOccupancy', name: 'Break-Even Occupancy', type: 'number', unit: '%', description: 'Minimum occupancy rate to break even' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage Ratio', type: 'number', description: 'Net operating income to debt service ratio' },
    { id: 'grossRentMultiplier', name: 'Gross Rent Multiplier', type: 'number', description: 'Property value to gross annual rent ratio' },
    { id: 'netOperatingIncome', name: 'Net Operating Income', type: 'number', unit: 'USD', description: 'Annual net operating income' },
    { id: 'operatingExpenseRatio', name: 'Operating Expense Ratio', type: 'number', unit: '%', description: 'Operating expenses as percentage of gross income' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Net profit margin' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Annual equity build-up from principal payments' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits from deductions' },
    { id: 'appreciationValue', name: 'Appreciation Value', type: 'number', unit: 'USD', description: 'Annual property appreciation' },
    { id: 'totalReturn', name: 'Total Return', type: 'number', unit: 'USD', description: 'Total annual return including all factors' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Years to recoup initial investment' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR over holding period' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'NPV of investment' },
    { id: 'investmentScore', name: 'Investment Score', type: 'number', description: 'Overall investment quality score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Investment risk assessment (0-100)' },
    { id: 'cashFlowScore', name: 'Cash Flow Score', type: 'number', description: 'Cash flow quality score (0-100)' },
    { id: 'appreciationScore', name: 'Appreciation Score', type: 'number', description: 'Appreciation potential score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    { id: 'keyStrengths', name: 'Key Strengths', type: 'string', description: 'Primary investment strengths' },
    { id: 'keyRisks', name: 'Key Risks', type: 'string', description: 'Primary investment risks' },
    { id: 'rentalPropertyAnalysis', name: 'Rental Property Analysis', type: 'string', description: 'Comprehensive rental property investment analysis' }
  ],
  calculate: (inputs) => {
    // Import calculation functions
    const { calculateRentalPropertyROI } = require('./formulas');
    return calculateRentalPropertyROI(inputs);
  },
  generateReport: (inputs, outputs) => {
    // Import report generation function
    const { generateRentalPropertyAnalysis } = require('./formulas');
    return generateRentalPropertyAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
