import { Calculator } from '../../../types/calculator';
import { calculateFixAndFlip, generateFixAndFlipAnalysis } from './formulas';
import { validateFixAndFlipInputs } from './validation';

export const FixAndFlipCalculator: Calculator = {
  id: 'fix-and-flip-calculator',
  name: 'Fix and Flip Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate profitability, ROI, and investment analysis for fix and flip real estate projects including purchase costs, renovation expenses, and selling considerations.',
  inputs: [
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: true, description: 'Price paid for the property', placeholder: '200000', min: 10000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Cash down payment for purchase', placeholder: '40000', min: 1000, max: 5000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate on financing', placeholder: '8', min: 1, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'months', required: true, description: 'Duration of the loan in months', placeholder: '12', min: 3, max: 36 },
    { id: 'renovationBudget', name: 'Renovation Budget', type: 'number', unit: 'USD', required: true, description: 'Total budget for renovations and repairs', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'renovationTime', name: 'Renovation Time', type: 'number', unit: 'months', required: true, description: 'Estimated time to complete renovations', placeholder: '3', min: 1, max: 24 },
    { id: 'afterRepairValue', name: 'After Repair Value (ARV)', type: 'number', unit: 'USD', required: true, description: 'Estimated property value after renovations', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'sellingCosts', name: 'Selling Costs', type: 'number', unit: 'USD', required: true, description: 'Real estate commissions, closing costs, and fees', placeholder: '17500', min: 0, max: 500000 },
    { id: 'holdingCosts', name: 'Monthly Holding Costs', type: 'number', unit: 'USD', required: true, description: 'Monthly expenses (utilities, insurance, taxes)', placeholder: '800', min: 0, max: 10000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property being flipped', options: ['single-family', 'duplex', 'townhouse', 'condo', 'multi-family', 'commercial'] },
    { id: 'propertyCondition', name: 'Property Condition', type: 'select', required: true, description: 'Current condition of the property', options: ['excellent', 'good', 'fair', 'poor', 'needs-major-repairs'] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: true, description: 'Type of real estate market', options: ['hot', 'stable', 'slow', 'declining'] },
    { id: 'location', name: 'Location', type: 'string', required: true, description: 'Property location (city, state)', placeholder: 'Phoenix, AZ' },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', unit: 'sq ft', required: false, description: 'Total square footage of the property', placeholder: '2000', min: 100, max: 10000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false, description: 'Number of bedrooms', placeholder: '3', min: 0, max: 10 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false, description: 'Number of bathrooms', placeholder: '2', min: 0, max: 10 },
    { id: 'lotSize', name: 'Lot Size', type: 'number', unit: 'acres', required: false, description: 'Size of the lot in acres', placeholder: '0.25', min: 0.01, max: 100 },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year the property was built', placeholder: '1990', min: 1800, max: 2024 },
    { id: 'purchaseClosingCosts', name: 'Purchase Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Closing costs for purchase transaction', placeholder: '5000', min: 0, max: 100000 },
    { id: 'inspectionCosts', name: 'Inspection Costs', type: 'number', unit: 'USD', required: false, description: 'Cost of property inspections', placeholder: '500', min: 0, max: 5000 },
    { id: 'permitCosts', name: 'Permit Costs', type: 'number', unit: 'USD', required: false, description: 'Cost of building permits and fees', placeholder: '2000', min: 0, max: 50000 },
    { id: 'insuranceCosts', name: 'Insurance Costs', type: 'number', unit: 'USD', required: false, description: 'Insurance costs during renovation', placeholder: '1500', min: 0, max: 10000 },
    { id: 'utilityCosts', name: 'Utility Costs', type: 'number', unit: 'USD', required: false, description: 'Utility costs during renovation', placeholder: '300', min: 0, max: 5000 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Property taxes during holding period', placeholder: '2400', min: 0, max: 50000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly HOA fees if applicable', placeholder: '0', min: 0, max: 2000 },
    { id: 'contingencyBudget', name: 'Contingency Budget', type: 'number', unit: 'USD', required: false, description: 'Additional budget for unexpected costs', placeholder: '5000', min: 0, max: 100000 },
    { id: 'marketingCosts', name: 'Marketing Costs', type: 'number', unit: 'USD', required: false, description: 'Costs for marketing and staging', placeholder: '2000', min: 0, max: 50000 },
    { id: 'carryingCosts', name: 'Carrying Costs', type: 'number', unit: 'USD', required: false, description: 'Additional carrying costs not included above', placeholder: '0', min: 0, max: 100000 },
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: false, description: 'Planned exit strategy', options: ['sell', 'rent', 'refinance', 'wholesale'] },
    { id: 'targetROI', name: 'Target ROI', type: 'number', unit: '%', required: false, description: 'Target return on investment percentage', placeholder: '20', min: 5, max: 100 },
    { id: 'riskTolerance', name: 'Risk Tolerance', type: 'select', required: false, description: 'Investor risk tolerance level', options: ['conservative', 'moderate', 'aggressive'] },
    { id: 'experienceLevel', name: 'Experience Level', type: 'select', required: false, description: 'Investor experience level', options: ['beginner', 'intermediate', 'expert'] },
    { id: 'teamSize', name: 'Team Size', type: 'number', required: false, description: 'Number of people on renovation team', placeholder: '3', min: 1, max: 20 },
    { id: 'contractorCosts', name: 'Contractor Costs', type: 'number', unit: 'USD', required: false, description: 'Additional contractor or labor costs', placeholder: '0', min: 0, max: 500000 },
    { id: 'materialCosts', name: 'Material Costs', type: 'number', unit: 'USD', required: false, description: 'Additional material costs', placeholder: '0', min: 0, max: 500000 },
    { id: 'designCosts', name: 'Design Costs', type: 'number', unit: 'USD', required: false, description: 'Architectural or design costs', placeholder: '0', min: 0, max: 50000 },
    { id: 'landscapingCosts', name: 'Landscaping Costs', type: 'number', unit: 'USD', required: false, description: 'Landscaping and exterior costs', placeholder: '0', min: 0, max: 100000 },
    { id: 'applianceCosts', name: 'Appliance Costs', type: 'number', unit: 'USD', required: false, description: 'Cost of new appliances', placeholder: '0', min: 0, max: 50000 },
    { id: 'furnitureCosts', name: 'Furniture Costs', type: 'number', unit: 'USD', required: false, description: 'Cost of staging furniture', placeholder: '0', min: 0, max: 50000 },
    { id: 'storageCosts', name: 'Storage Costs', type: 'number', unit: 'USD', required: false, description: 'Storage costs during renovation', placeholder: '0', min: 0, max: 10000 },
    { id: 'cleanupCosts', name: 'Cleanup Costs', type: 'number', unit: 'USD', required: false, description: 'Cleanup and disposal costs', placeholder: '0', min: 0, max: 20000 },
    { id: 'legalCosts', name: 'Legal Costs', type: 'number', unit: 'USD', required: false, description: 'Legal fees and costs', placeholder: '0', min: 0, max: 25000 },
    { id: 'titleCosts', name: 'Title Costs', type: 'number', unit: 'USD', required: false, description: 'Title insurance and related costs', placeholder: '0', min: 0, max: 10000 },
    { id: 'escrowCosts', name: 'Escrow Costs', type: 'number', unit: 'USD', required: false, description: 'Escrow and closing service costs', placeholder: '0', min: 0, max: 10000 },
    { id: 'surveyCosts', name: 'Survey Costs', type: 'number', unit: 'USD', required: false, description: 'Property survey costs', placeholder: '0', min: 0, max: 5000 },
    { id: 'appraisalCosts', name: 'Appraisal Costs', type: 'number', unit: 'USD', required: false, description: 'Property appraisal costs', placeholder: '0', min: 0, max: 1000 },
    { id: 'homeWarranty', name: 'Home Warranty', type: 'number', unit: 'USD', required: false, description: 'Home warranty costs', placeholder: '0', min: 0, max: 1000 },
    { id: 'homeInspection', name: 'Home Inspection', type: 'number', unit: 'USD', required: false, description: 'Home inspection costs for buyer', placeholder: '0', min: 0, max: 1000 },
    { id: 'creditRepair', name: 'Credit Repair', type: 'number', unit: 'USD', required: false, description: 'Credit repair costs for buyer', placeholder: '0', min: 0, max: 5000 },
    { id: 'buyerIncentives', name: 'Buyer Incentives', type: 'number', unit: 'USD', required: false, description: 'Incentives offered to buyer', placeholder: '0', min: 0, max: 50000 },
    { id: 'priceReduction', name: 'Price Reduction', type: 'number', unit: 'USD', required: false, description: 'Potential price reduction if needed', placeholder: '0', min: 0, max: 100000 },
    { id: 'timeOnMarket', name: 'Time on Market', type: 'number', unit: 'days', required: false, description: 'Expected days on market', placeholder: '30', min: 1, max: 365 },
    { id: 'marketAppreciation', name: 'Market Appreciation', type: 'number', unit: '%', required: false, description: 'Expected market appreciation during project', placeholder: '2', min: -20, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected inflation rate during project', placeholder: '3', min: 0, max: 15 },
    { id: 'opportunityCost', name: 'Opportunity Cost', type: 'number', unit: '%', required: false, description: 'Opportunity cost of capital', placeholder: '8', min: 0, max: 25 }
  ],
  outputs: [
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total cash investment required' },
    { id: 'totalCosts', name: 'Total Costs', type: 'number', unit: 'USD', description: 'Total project costs including all expenses' },
    { id: 'grossProfit', name: 'Gross Profit', type: 'number', unit: 'USD', description: 'Gross profit before taxes and fees' },
    { id: 'netProfit', name: 'Net Profit', type: 'number', unit: 'USD', description: 'Net profit after all costs and taxes' },
    { id: 'roi', name: 'ROI', type: 'number', unit: '%', description: 'Return on investment percentage' },
    { id: 'cashOnCashReturn', name: 'Cash on Cash Return', type: 'number', unit: '%', description: 'Cash on cash return percentage' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly loan payment' },
    { id: 'totalHoldingCosts', name: 'Total Holding Costs', type: 'number', unit: 'USD', description: 'Total holding costs for the project' },
    { id: 'breakEvenPrice', name: 'Break Even Price', type: 'number', unit: 'USD', description: 'Minimum selling price to break even' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Profit margin percentage' },
    { id: 'projectDuration', name: 'Project Duration', type: 'number', unit: 'months', description: 'Total project duration in months' },
    { id: 'monthlyProfit', name: 'Monthly Profit', type: 'number', unit: 'USD', description: 'Average monthly profit' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Project risk assessment score (1-100)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (1-100)' },
    { id: 'maxPurchasePrice', name: 'Maximum Purchase Price', type: 'number', unit: 'USD', description: 'Maximum purchase price for target ROI' },
    { id: 'minARV', name: 'Minimum ARV', type: 'number', unit: 'USD', description: 'Minimum after repair value needed' },
    { id: 'maxRenovationBudget', name: 'Maximum Renovation Budget', type: 'number', unit: 'USD', description: 'Maximum renovation budget for target ROI' },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', description: 'Total loan amount needed' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid on loan' },
    { id: 'debtService', name: 'Debt Service', type: 'number', unit: 'USD', description: 'Total debt service payments' },
    { id: 'equityRequired', name: 'Equity Required', type: 'number', unit: 'USD', description: 'Total equity investment required' },
    { id: 'liquidityRatio', name: 'Liquidity Ratio', type: 'number', description: 'Ratio of liquid assets to total investment' },
    { id: 'debtToEquityRatio', name: 'Debt to Equity Ratio', type: 'number', description: 'Debt to equity ratio for the project' },
    { id: 'cashFlow', name: 'Cash Flow', type: 'number', unit: 'USD', description: 'Monthly cash flow during project' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'months', description: 'Time to recover initial investment' },
    { id: 'irr', name: 'IRR', type: 'number', unit: '%', description: 'Internal rate of return' },
    { id: 'npv', name: 'NPV', type: 'number', unit: 'USD', description: 'Net present value at target rate' },
    { id: 'profitabilityIndex', name: 'Profitability Index', type: 'number', description: 'Profitability index ratio' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'string', description: 'Sensitivity analysis results' },
    { id: 'marketAnalysis', name: 'Market Analysis', type: 'string', description: 'Market condition analysis' },
    { id: 'riskFactors', name: 'Risk Factors', type: 'string', description: 'Key risk factors identified' },
    { id: 'optimizationOpportunities', name: 'Optimization Opportunities', type: 'string', description: 'Opportunities to improve profitability' },
    { id: 'exitStrategyRecommendation', name: 'Exit Strategy Recommendation', type: 'string', description: 'Recommended exit strategy' },
    { id: 'timelineAnalysis', name: 'Timeline Analysis', type: 'string', description: 'Project timeline analysis' },
    { id: 'fixAndFlipAnalysis', name: 'Fix and Flip Analysis', type: 'string', description: 'Comprehensive fix and flip analysis report' }
  ],
  calculate: (inputs) => {
    return calculateFixAndFlip(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateFixAndFlipAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Investment',
      formula: 'Total Investment = Down Payment + Purchase Closing Costs + Renovation Budget + Contingency Budget + Other Costs',
      description: 'Sum of all cash investments required for the project'
    },
    {
      name: 'Loan Amount',
      formula: 'Loan Amount = Purchase Price - Down Payment',
      description: 'Amount borrowed to finance the purchase'
    },
    {
      name: 'Monthly Payment',
      formula: 'Monthly Payment = Loan Amount × (Monthly Interest Rate × (1 + Monthly Interest Rate)^Loan Term) / ((1 + Monthly Interest Rate)^Loan Term - 1)',
      description: 'Monthly payment on the loan using standard amortization formula'
    },
    {
      name: 'Total Holding Costs',
      formula: 'Total Holding Costs = (Monthly Holding Costs + Monthly Payment) × Project Duration',
      description: 'Total costs to hold the property during renovation and sale'
    },
    {
      name: 'Total Costs',
      formula: 'Total Costs = Purchase Price + Purchase Closing Costs + Renovation Budget + Total Holding Costs + Selling Costs + Other Costs',
      description: 'Sum of all costs associated with the project'
    },
    {
      name: 'Gross Profit',
      formula: 'Gross Profit = After Repair Value - Total Costs',
      description: 'Profit before taxes and other considerations'
    },
    {
      name: 'Net Profit',
      formula: 'Net Profit = Gross Profit - Taxes - Additional Fees',
      description: 'Final profit after all deductions'
    },
    {
      name: 'ROI',
      formula: 'ROI = (Net Profit / Total Investment) × 100',
      description: 'Return on investment as a percentage'
    },
    {
      name: 'Cash on Cash Return',
      formula: 'Cash on Cash Return = (Net Profit / Total Investment) × 100',
      description: 'Cash return on cash invested'
    },
    {
      name: 'Profit Margin',
      formula: 'Profit Margin = (Net Profit / After Repair Value) × 100',
      description: 'Profit margin as a percentage of final value'
    },
    {
      name: 'Break Even Price',
      formula: 'Break Even Price = Total Costs',
      description: 'Minimum selling price to cover all costs'
    },
    {
      name: 'Project Duration',
      formula: 'Project Duration = Renovation Time + Time on Market',
      description: 'Total time from purchase to sale'
    },
    {
      name: 'Monthly Profit',
      formula: 'Monthly Profit = Net Profit / Project Duration',
      description: 'Average monthly profit over the project period'
    },
    {
      name: 'Debt to Equity Ratio',
      formula: 'Debt to Equity Ratio = Loan Amount / Total Investment',
      description: 'Ratio of debt to equity in the project'
    },
    {
      name: 'Payback Period',
      formula: 'Payback Period = Total Investment / Monthly Profit',
      description: 'Time to recover the initial investment'
    },
    {
      name: '70% Rule',
      formula: 'Maximum Purchase Price = (After Repair Value × 0.7) - Renovation Budget',
      description: 'Traditional fix and flip rule of thumb'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Base Risk + Market Risk + Property Risk + Financial Risk + Timeline Risk',
      description: 'Composite risk assessment score'
    },
    {
      name: 'Feasibility Score',
      formula: 'Feasibility Score = (ROI × 0.4) + (Risk Score × 0.3) + (Market Conditions × 0.3)',
      description: 'Overall project feasibility assessment'
    }
  ],
  examples: [
    {
      name: 'Standard Fix and Flip',
      inputs: {
        purchasePrice: '200000',
        downPayment: '40000',
        interestRate: '8',
        loanTerm: '12',
        renovationBudget: '50000',
        renovationTime: '3',
        afterRepairValue: '350000',
        sellingCosts: '17500',
        holdingCosts: '800',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'stable',
        location: 'Phoenix, AZ'
      },
      description: 'Typical fix and flip project with moderate renovation budget and stable market conditions'
    },
    {
      name: 'Quick Flip - Minimal Renovation',
      inputs: {
        purchasePrice: '150000',
        downPayment: '30000',
        interestRate: '10',
        loanTerm: '6',
        renovationBudget: '15000',
        renovationTime: '1',
        afterRepairValue: '200000',
        sellingCosts: '10000',
        holdingCosts: '600',
        propertyType: 'single-family',
        propertyCondition: 'good',
        marketType: 'hot',
        location: 'Austin, TX'
      },
      description: 'Quick flip with minimal renovations in a hot market'
    },
    {
      name: 'Major Renovation Project',
      inputs: {
        purchasePrice: '300000',
        downPayment: '60000',
        interestRate: '9',
        loanTerm: '18',
        renovationBudget: '100000',
        renovationTime: '6',
        afterRepairValue: '550000',
        sellingCosts: '27500',
        holdingCosts: '1200',
        propertyType: 'single-family',
        propertyCondition: 'poor',
        marketType: 'stable',
        location: 'Denver, CO'
      },
      description: 'Major renovation project requiring extensive work and longer timeline'
    },
    {
      name: 'Conservative Investment',
      inputs: {
        purchasePrice: '180000',
        downPayment: '45000',
        interestRate: '7',
        loanTerm: '12',
        renovationBudget: '30000',
        renovationTime: '2',
        afterRepairValue: '280000',
        sellingCosts: '14000',
        holdingCosts: '700',
        propertyType: 'single-family',
        propertyCondition: 'fair',
        marketType: 'slow',
        location: 'Cleveland, OH'
      },
      description: 'Conservative approach with higher down payment and lower risk profile'
    },
    {
      name: 'High-End Flip',
      inputs: {
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '8.5',
        loanTerm: '15',
        renovationBudget: '150000',
        renovationTime: '4',
        afterRepairValue: '850000',
        sellingCosts: '42500',
        holdingCosts: '2000',
        propertyType: 'single-family',
        propertyCondition: 'good',
        marketType: 'hot',
        location: 'Miami, FL'
      },
      description: 'High-end property flip with premium finishes and luxury market targeting'
    }
  ]
};
