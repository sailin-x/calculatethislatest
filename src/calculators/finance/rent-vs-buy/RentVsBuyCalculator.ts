import { Calculator } from '../../../types/calculator';
import { calculateRentVsBuy, generateRentVsBuyAnalysis } from './formulas';
import { validateRentVsBuyInputs } from './validation';

export const RentVsBuyCalculator: Calculator = {
  id: 'rent-vs-buy-calculator',
  name: 'Rent vs. Buy Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Compare the financial implications of renting versus buying a home, including total costs, equity building, and long-term financial impact.',
  inputs: [
    { id: 'homePrice', name: 'Home Price', type: 'number', unit: 'USD', required: true, description: 'Purchase price of the home', placeholder: '400000', min: 50000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Down payment amount', placeholder: '80000', min: 0, max: 10000000 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Mortgage loan term in years', placeholder: '30', min: 5, max: 50 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: false, description: 'Annual mortgage interest rate', placeholder: '6.5', min: 0.1, max: 20 },
    { id: 'monthlyRent', name: 'Monthly Rent', type: 'number', unit: 'USD', required: true, description: 'Monthly rental payment', placeholder: '2500', min: 100, max: 50000 },
    { id: 'rentIncreaseRate', name: 'Rent Increase Rate', type: 'number', unit: '%', required: false, description: 'Annual rent increase rate', placeholder: '3.0', min: -50, max: 50 },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%', required: false, description: 'Annual property tax rate', placeholder: '1.2', min: 0, max: 10 },
    { id: 'homeInsuranceRate', name: 'Home Insurance Rate', type: 'number', unit: '%', required: false, description: 'Annual home insurance rate', placeholder: '0.5', min: 0, max: 5 },
    { id: 'maintenanceRate', name: 'Maintenance Rate', type: 'number', unit: '%', required: false, description: 'Annual maintenance cost rate', placeholder: '1.0', min: 0, max: 10 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '200', min: 0, max: 5000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'One-time closing costs', placeholder: '12000', min: 0, max: 100000 },
    { id: 'renterInsurance', name: 'Renter Insurance', type: 'number', unit: 'USD/month', required: false, description: 'Monthly renter insurance cost', placeholder: '25', min: 0, max: 500 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD/month', required: false, description: 'Monthly utilities cost', placeholder: '200', min: 0, max: 2000 },
    { id: 'homeAppreciationRate', name: 'Home Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Annual home appreciation rate', placeholder: '3.0', min: -50, max: 50 },
    { id: 'investmentReturnRate', name: 'Investment Return Rate', type: 'number', unit: '%', required: false, description: 'Annual return on alternative investments', placeholder: '7.0', min: -50, max: 50 },
    { id: 'taxDeductionRate', name: 'Tax Deduction Rate', type: 'number', unit: '%', required: false, description: 'Tax bracket for mortgage interest deduction', placeholder: '22.0', min: 0, max: 50 },
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: false, description: 'Number of years to analyze', placeholder: '10', min: 1, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Annual inflation rate', placeholder: '2.5', min: -50, max: 50 },
    { id: 'opportunityCost', name: 'Opportunity Cost', type: 'number', unit: 'USD/month', required: false, description: 'Monthly opportunity cost of down payment', placeholder: '400', min: 0, max: 10000 },
    { id: 'movingCosts', name: 'Moving Costs', type: 'number', unit: 'USD', required: false, description: 'One-time moving costs', placeholder: '3000', min: 0, max: 50000 },
    { id: 'renovationCosts', name: 'Renovation Costs', type: 'number', unit: 'USD', required: false, description: 'One-time renovation costs', placeholder: '15000', min: 0, max: 500000 },
    { id: 'propertyManagementFees', name: 'Property Management Fees', type: 'number', unit: '%', required: false, description: 'Property management fees if renting out', placeholder: '8.0', min: 0, max: 20 },
    { id: 'vacancyRate', name: 'Vacancy Rate', type: 'number', unit: '%', required: false, description: 'Vacancy rate if renting out', placeholder: '5.0', min: 0, max: 50 },
    { id: 'rentalIncome', name: 'Rental Income', type: 'number', unit: 'USD/month', required: false, description: 'Potential rental income if buying', placeholder: '2800', min: 0, max: 50000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Credit score for mortgage qualification', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Current debt-to-income ratio', placeholder: '35.0', min: 0, max: 100 },
    { id: 'emergencyFund', name: 'Emergency Fund', type: 'number', unit: 'USD', required: false, description: 'Available emergency fund', placeholder: '25000', min: 0, max: 1000000 },
    { id: 'jobStability', name: 'Job Stability', type: 'select', required: false, description: 'Job stability assessment', placeholder: 'stable', options: ['very-stable', 'stable', 'moderate', 'unstable', 'very-unstable'] },
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current real estate market conditions', placeholder: 'normal', options: ['buyers-market', 'normal', 'sellers-market', 'hot-market'] },
    { id: 'locationGrowth', name: 'Location Growth', type: 'select', required: false, description: 'Location growth potential', placeholder: 'moderate', options: ['declining', 'slow', 'moderate', 'strong', 'explosive'] }
  ],
  outputs: [
    { id: 'monthlyMortgagePayment', name: 'Monthly Mortgage Payment', type: 'number', unit: 'USD', description: 'Monthly mortgage payment (P&I)' },
    { id: 'monthlyHomeownershipCost', name: 'Monthly Homeownership Cost', type: 'number', unit: 'USD', description: 'Total monthly cost of homeownership' },
    { id: 'monthlyRentalCost', name: 'Monthly Rental Cost', type: 'number', unit: 'USD', description: 'Total monthly cost of renting' },
    { id: 'totalHomeownershipCost', name: 'Total Homeownership Cost', type: 'number', unit: 'USD', description: 'Total cost of homeownership over analysis period' },
    { id: 'totalRentalCost', name: 'Total Rental Cost', type: 'number', unit: 'USD', description: 'Total cost of renting over analysis period' },
    { id: 'homeEquity', name: 'Home Equity', type: 'number', unit: 'USD', description: 'Estimated home equity at end of period' },
    { id: 'investmentValue', name: 'Investment Value', type: 'number', unit: 'USD', description: 'Value of down payment if invested instead' },
    { id: 'netHomeownershipValue', name: 'Net Homeownership Value', type: 'number', unit: 'USD', description: 'Net value of homeownership (equity - total cost)' },
    { id: 'netRentalValue', name: 'Net Rental Value', type: 'number', unit: 'USD', description: 'Net value of renting (investment - total cost)' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years until homeownership becomes cheaper' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Financial recommendation (Buy/Rent/Consider)' },
    { id: 'monthlySavings', name: 'Monthly Savings', type: 'number', unit: 'USD', description: 'Monthly savings with recommended option' },
    { id: 'totalSavings', name: 'Total Savings', type: 'number', unit: 'USD', description: 'Total savings over analysis period' },
    { id: 'roiComparison', name: 'ROI Comparison', type: 'number', unit: '%', description: 'Return on investment comparison' },
    { id: 'cashFlowAnalysis', name: 'Cash Flow Analysis', type: 'string', description: 'Monthly cash flow comparison' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Risk factors for each option' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits of homeownership' },
    { id: 'opportunityCostAnalysis', name: 'Opportunity Cost Analysis', type: 'string', description: 'Analysis of opportunity costs' },
    { id: 'marketTiming', name: 'Market Timing', type: 'string', description: 'Market timing considerations' },
    { id: 'liquidityComparison', name: 'Liquidity Comparison', type: 'string', description: 'Liquidity comparison between options' },
    { id: 'yearlyComparison', name: 'Yearly Comparison', type: 'string', description: 'Year-by-year cost comparison' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'string', description: 'Sensitivity to key variables' },
    { id: 'decisionMatrix', name: 'Decision Matrix', type: 'string', description: 'Multi-factor decision matrix' },
    { id: 'rentVsBuyAnalysis', name: 'Rent vs. Buy Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateRentVsBuy(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateRentVsBuyAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Mortgage Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1] where L = loan amount, c = monthly interest rate, n = total payments',
      description: 'Calculates monthly principal and interest payment'
    },
    {
      name: 'Total Homeownership Cost',
      formula: 'Total Cost = (Monthly Payment × 12 × Years) + Property Tax + Insurance + Maintenance + HOA + Closing Costs + Renovation',
      description: 'Sum of all homeownership costs over the analysis period'
    },
    {
      name: 'Total Rental Cost',
      formula: 'Total Cost = (Monthly Rent × 12 × Years) + Renter Insurance + Utilities + Moving Costs',
      description: 'Sum of all rental costs over the analysis period'
    },
    {
      name: 'Home Equity',
      formula: 'Equity = Home Value × (1 + Appreciation Rate)^Years - Remaining Mortgage Balance',
      description: 'Estimated home equity at end of analysis period'
    },
    {
      name: 'Investment Value',
      formula: 'Investment Value = Down Payment × (1 + Investment Return Rate)^Years',
      description: 'Value of down payment if invested instead of buying'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = (Total Homeownership Cost - Total Rental Cost) / (Monthly Rental Cost - Monthly Homeownership Cost)',
      description: 'Years until homeownership becomes financially advantageous'
    }
  ],
  examples: [
    {
      name: 'First-Time Homebuyer',
      inputs: {
        homePrice: 350000,
        downPayment: 70000,
        monthlyRent: 2200,
        interestRate: 6.5,
        propertyTaxRate: 1.2,
        homeInsuranceRate: 0.5,
        maintenanceRate: 1.0,
        analysisPeriod: 10
      },
      description: 'Analysis for a first-time homebuyer with 20% down payment'
    },
    {
      name: 'High-Cost Market',
      inputs: {
        homePrice: 800000,
        downPayment: 160000,
        monthlyRent: 4500,
        interestRate: 7.0,
        propertyTaxRate: 1.5,
        homeInsuranceRate: 0.6,
        maintenanceRate: 1.2,
        hoaFees: 400,
        analysisPeriod: 15
      },
      description: 'Analysis in a high-cost real estate market'
    },
    {
      name: 'Investment Property',
      inputs: {
        homePrice: 500000,
        downPayment: 100000,
        monthlyRent: 2800,
        rentalIncome: 3200,
        interestRate: 6.8,
        propertyTaxRate: 1.3,
        homeInsuranceRate: 0.5,
        maintenanceRate: 1.1,
        propertyManagementFees: 8.0,
        vacancyRate: 5.0,
        analysisPeriod: 20
      },
      description: 'Analysis considering potential rental income'
    }
  ],
  tags: ['rent', 'buy', 'homeownership', 'mortgage', 'real-estate', 'investment', 'financial-planning', 'break-even', 'equity'],
  references: [
    'National Association of Realtors (NAR)',
    'Consumer Financial Protection Bureau (CFPB)',
    'Federal Reserve Economic Data (FRED)',
    'Real estate market analysis reports'
  ]
};