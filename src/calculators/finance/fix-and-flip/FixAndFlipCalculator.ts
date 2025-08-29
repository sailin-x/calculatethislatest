import { Calculator } from '../../../types/calculator';
import { calculateFixAndFlip, generateFixAndFlipAnalysis } from './formulas';
import { validateFixAndFlipInputs } from './validation';
import { FixAndFlipInputs, FixAndFlipOutputs } from './types';

export const FixAndFlipCalculator: Calculator = {
  id: 'fix-and-flip-calculator',
  name: 'Fix and Flip Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Comprehensive fix and flip investment analysis tool for real estate investors to evaluate renovation projects, calculate returns, and assess profitability.',
  
  longDescription: `
    The Fix and Flip Calculator is a comprehensive real estate investment analysis tool designed for investors to evaluate fix and flip projects, calculate potential returns, and assess project profitability. This professional calculator provides detailed analysis of purchase costs, renovation expenses, holding costs, and exit strategies.
  
    **Key Features:**
    • **Purchase Analysis**: Property valuation, closing costs, and financing options
    • **Renovation Planning**: Detailed renovation budgeting and timeline management
    • **Holding Cost Analysis**: Monthly expenses, property taxes, insurance, and utilities
    • **Exit Strategy Planning**: Market analysis, comparable properties, and selling costs
    • **Profitability Analysis**: ROI, cash-on-cash return, and profit margin calculations
    • **Risk Assessment**: Market risk, renovation risk, timeline risk, and financing risk
    • **Timeline Management**: Project phases, critical path analysis, and milestone tracking
    • **Sensitivity Analysis**: Impact of key variables on project profitability
    • **Market Analysis**: Comparable property analysis and market trend assessment
    • **Financing Options**: Hard money, private money, conventional, and cash analysis
  
    **Use Cases:**
    • Fix and flip project evaluation and analysis
    • Real estate investment decision making
    • Renovation project planning and budgeting
    • Exit strategy development and optimization
    • Risk assessment and mitigation planning
    • Investment committee presentations
    • Project timeline and resource planning
    • Market analysis and pricing strategy
  `,

  inputs: [
    // Property Information
    { id: 'propertyAddress', name: 'Property Address', type: 'text', required: true, description: 'Property address', placeholder: '123 Main St, City, State', maxLength: 200 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property', placeholder: 'Select property type', options: ['single_family', 'townhouse', 'condo', 'multi_family', 'commercial', 'land'] },
    { id: 'propertySize', name: 'Property Size', type: 'number', unit: 'sq ft', required: true, description: 'Square footage of property', placeholder: '2000', min: 100, max: 100000 },
    { id: 'lotSize', name: 'Lot Size', type: 'number', unit: 'sq ft', required: true, description: 'Square footage of lot', placeholder: '5000', min: 100, max: 1000000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: true, description: 'Number of bedrooms', placeholder: '3', min: 0, max: 20 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: true, description: 'Number of bathrooms', placeholder: '2', min: 0, max: 20 },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: true, description: 'Year property was built', placeholder: '1990', min: 1800, max: 2030 },
    { id: 'propertyCondition', name: 'Property Condition', type: 'select', required: true, description: 'Current condition of property', placeholder: 'Select condition', options: ['excellent', 'good', 'fair', 'poor', 'needs_work'] },
    
    // Purchase Information
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: true, description: 'Purchase price of property', placeholder: '200000', min: 10000, max: 10000000 },
    { id: 'purchaseDate', name: 'Purchase Date', type: 'date', required: true, description: 'Expected purchase date', placeholder: '2024-01-15' },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: true, description: 'Total closing costs', placeholder: '8000', min: 0, max: 500000 },
    { id: 'inspectionCosts', name: 'Inspection Costs', type: 'number', unit: 'USD', required: false, description: 'Property inspection costs', placeholder: '500', min: 0, max: 10000 },
    { id: 'titleInsurance', name: 'Title Insurance', type: 'number', unit: 'USD', required: false, description: 'Title insurance cost', placeholder: '1000', min: 0, max: 10000 },
    { id: 'transferTaxes', name: 'Transfer Taxes', type: 'number', unit: 'USD', required: false, description: 'Transfer taxes', placeholder: '2000', min: 0, max: 50000 },
    { id: 'attorneyFees', name: 'Attorney Fees', type: 'number', unit: 'USD', required: false, description: 'Legal fees', placeholder: '1500', min: 0, max: 10000 },
    { id: 'otherPurchaseCosts', name: 'Other Purchase Costs', type: 'number', unit: 'USD', required: false, description: 'Other purchase-related costs', placeholder: '1000', min: 0, max: 50000 },
    
    // Financing Information
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Down payment amount', placeholder: '40000', min: 0, max: 5000000 },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Loan amount', placeholder: '160000', min: 0, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '8.5', min: 0, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'months', required: true, description: 'Loan term in months', placeholder: '12', min: 1, max: 360 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: true, description: 'Type of financing', placeholder: 'Select loan type', options: ['hard_money', 'private_money', 'conventional', 'cash', 'portfolio'] },
    { id: 'originationFee', name: 'Origination Fee', type: 'number', unit: 'USD', required: false, description: 'Loan origination fee', placeholder: '3200', min: 0, max: 100000 },
    { id: 'points', name: 'Points', type: 'number', unit: 'points', required: false, description: 'Loan points', placeholder: '2', min: 0, max: 10 },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: false, description: 'Monthly loan payment', placeholder: '1540', min: 0, max: 100000 },
    
    // Renovation Information
    { id: 'renovationBudget', name: 'Renovation Budget', type: 'number', unit: 'USD', required: true, description: 'Total renovation budget', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'renovationTimeline', name: 'Renovation Timeline', type: 'number', unit: 'months', required: true, description: 'Renovation timeline in months', placeholder: '3', min: 1, max: 24 },
    { id: 'structuralWork', name: 'Structural Work', type: 'boolean', required: false, description: 'Include structural work', placeholder: 'false' },
    { id: 'structuralWorkCost', name: 'Structural Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of structural work', placeholder: '15000', min: 0, max: 500000 },
    { id: 'electricalWork', name: 'Electrical Work', type: 'boolean', required: false, description: 'Include electrical work', placeholder: 'true' },
    { id: 'electricalWorkCost', name: 'Electrical Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of electrical work', placeholder: '8000', min: 0, max: 100000 },
    { id: 'plumbingWork', name: 'Plumbing Work', type: 'boolean', required: false, description: 'Include plumbing work', placeholder: 'true' },
    { id: 'plumbingWorkCost', name: 'Plumbing Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of plumbing work', placeholder: '6000', min: 0, max: 100000 },
    { id: 'hvacWork', name: 'HVAC Work', type: 'boolean', required: false, description: 'Include HVAC work', placeholder: 'true' },
    { id: 'hvacWorkCost', name: 'HVAC Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of HVAC work', placeholder: '12000', min: 0, max: 50000 },
    { id: 'roofingWork', name: 'Roofing Work', type: 'boolean', required: false, description: 'Include roofing work', placeholder: 'false' },
    { id: 'roofingWorkCost', name: 'Roofing Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of roofing work', placeholder: '15000', min: 0, max: 100000 },
    { id: 'kitchenRemodel', name: 'Kitchen Remodel', type: 'boolean', required: false, description: 'Include kitchen remodel', placeholder: 'true' },
    { id: 'kitchenRemodelCost', name: 'Kitchen Remodel Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of kitchen remodel', placeholder: '25000', min: 0, max: 200000 },
    { id: 'bathroomRemodel', name: 'Bathroom Remodel', type: 'boolean', required: false, description: 'Include bathroom remodel', placeholder: 'true' },
    { id: 'bathroomRemodelCost', name: 'Bathroom Remodel Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of bathroom remodel', placeholder: '15000', min: 0, max: 100000 },
    { id: 'flooringWork', name: 'Flooring Work', type: 'boolean', required: false, description: 'Include flooring work', placeholder: 'true' },
    { id: 'flooringWorkCost', name: 'Flooring Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of flooring work', placeholder: '8000', min: 0, max: 50000 },
    { id: 'paintingWork', name: 'Painting Work', type: 'boolean', required: false, description: 'Include painting work', placeholder: 'true' },
    { id: 'paintingWorkCost', name: 'Painting Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of painting work', placeholder: '5000', min: 0, max: 30000 },
    { id: 'landscapingWork', name: 'Landscaping Work', type: 'boolean', required: false, description: 'Include landscaping work', placeholder: 'false' },
    { id: 'landscapingWorkCost', name: 'Landscaping Work Cost', type: 'number', unit: 'USD', required: false, description: 'Cost of landscaping work', placeholder: '5000', min: 0, max: 50000 },
    { id: 'permitsAndFees', name: 'Permits and Fees', type: 'number', unit: 'USD', required: false, description: 'Building permits and fees', placeholder: '2000', min: 0, max: 20000 },
    { id: 'contingencyBudget', name: 'Contingency Budget', type: 'number', unit: 'USD', required: false, description: 'Contingency budget', placeholder: '5000', min: 0, max: 100000 },
    
    // Holding Costs
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD/month', required: true, description: 'Monthly property taxes', placeholder: '300', min: 0, max: 10000 },
    { id: 'insurance', name: 'Insurance', type: 'number', unit: 'USD/month', required: true, description: 'Monthly insurance cost', placeholder: '150', min: 0, max: 5000 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD/month', required: false, description: 'Monthly utilities cost', placeholder: '200', min: 0, max: 2000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '0', min: 0, max: 2000 },
    { id: 'propertyManagement', name: 'Property Management', type: 'number', unit: 'USD/month', required: false, description: 'Monthly property management cost', placeholder: '0', min: 0, max: 5000 },
    { id: 'maintenance', name: 'Maintenance', type: 'number', unit: 'USD/month', required: false, description: 'Monthly maintenance cost', placeholder: '100', min: 0, max: 2000 },
    { id: 'otherHoldingCosts', name: 'Other Holding Costs', type: 'number', unit: 'USD/month', required: false, description: 'Other monthly holding costs', placeholder: '50', min: 0, max: 2000 },
    
    // Market Information
    { id: 'marketTrends', name: 'Market Trends', type: 'select', required: false, description: 'Local market trends', placeholder: 'Select trends', options: ['appreciating', 'stable', 'declining'] },
    { id: 'averageDaysOnMarket', name: 'Average Days on Market', type: 'number', unit: 'days', required: false, description: 'Average days on market', placeholder: '45', min: 1, max: 365 },
    { id: 'marketAbsorptionRate', name: 'Market Absorption Rate', type: 'number', unit: 'months', required: false, description: 'Months of inventory', placeholder: '3', min: 0.1, max: 24 },
    
    // Exit Strategy
    { id: 'targetSalePrice', name: 'Target Sale Price', type: 'number', unit: 'USD', required: true, description: 'Target sale price', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'targetSaleDate', name: 'Target Sale Date', type: 'date', required: true, description: 'Target sale date', placeholder: '2024-07-15' },
    { id: 'sellingStrategy', name: 'Selling Strategy', type: 'select', required: false, description: 'Selling strategy', placeholder: 'Select strategy', options: ['mls', 'fsbo', 'wholesale', 'auction', 'investor_network'] },
    { id: 'realtorCommission', name: 'Realtor Commission', type: 'number', unit: '%', required: false, description: 'Realtor commission percentage', placeholder: '6', min: 0, max: 15 },
    { id: 'closingCostsSeller', name: 'Seller Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Seller closing costs', placeholder: '5000', min: 0, max: 100000 },
    { id: 'stagingCosts', name: 'Staging Costs', type: 'number', unit: 'USD', required: false, description: 'Property staging costs', placeholder: '3000', min: 0, max: 50000 },
    { id: 'marketingCosts', name: 'Marketing Costs', type: 'number', unit: 'USD', required: false, description: 'Marketing and advertising costs', placeholder: '2000', min: 0, max: 20000 },
    
    // Timeline
    { id: 'acquisitionTimeline', name: 'Acquisition Timeline', type: 'number', unit: 'days', required: false, description: 'Days to acquire property', placeholder: '30', min: 1, max: 365 },
    { id: 'renovationTimeline', name: 'Renovation Timeline', type: 'number', unit: 'days', required: false, description: 'Days for renovation', placeholder: '90', min: 1, max: 730 },
    { id: 'marketingTimeline', name: 'Marketing Timeline', type: 'number', unit: 'days', required: false, description: 'Days to sell property', placeholder: '45', min: 1, max: 365 },
    { id: 'totalProjectTimeline', name: 'Total Project Timeline', type: 'number', unit: 'days', required: false, description: 'Total project timeline', placeholder: '165', min: 1, max: 1095 },
    
    // Risk Factors
    { id: 'marketRisk', name: 'Market Risk', type: 'select', required: false, description: 'Market risk level', placeholder: 'Select risk level', options: ['low', 'medium', 'high'] },
    { id: 'renovationRisk', name: 'Renovation Risk', type: 'select', required: false, description: 'Renovation risk level', placeholder: 'Select risk level', options: ['low', 'medium', 'high'] },
    { id: 'financingRisk', name: 'Financing Risk', type: 'select', required: false, description: 'Financing risk level', placeholder: 'Select risk level', options: ['low', 'medium', 'high'] },
    { id: 'timelineRisk', name: 'Timeline Risk', type: 'select', required: false, description: 'Timeline risk level', placeholder: 'Select risk level', options: ['low', 'medium', 'high'] },
    
    // Analysis Parameters
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'months', required: true, description: 'Analysis period in months', placeholder: '12', min: 1, max: 60 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: true, description: 'Discount rate for analysis', placeholder: '12', min: 0, max: 50 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Tax rate for capital gains', placeholder: '15', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Annual inflation rate', placeholder: '2.5', min: -10, max: 20 },
    { id: 'appreciationRate', name: 'Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Annual property appreciation rate', placeholder: '3', min: -20, max: 20 },
    
    // Reporting Preferences
    { id: 'currency', name: 'Currency', type: 'select', required: false, description: 'Display currency', placeholder: 'Select currency', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] },
    { id: 'displayFormat', name: 'Display Format', type: 'select', required: false, description: 'Number display format', placeholder: 'Select format', options: ['percentage', 'decimal', 'basis-points'] },
    { id: 'includeCharts', name: 'Include Charts', type: 'boolean', required: false, description: 'Include visual charts in analysis', placeholder: 'true' }
  ],

  outputs: [
    // Investment Analysis
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total amount invested' },
    { id: 'totalCosts', name: 'Total Costs', type: 'number', unit: 'USD', description: 'Total project costs' },
    { id: 'totalRevenue', name: 'Total Revenue', type: 'number', unit: 'USD', description: 'Total revenue from sale' },
    { id: 'netProfit', name: 'Net Profit', type: 'number', unit: 'USD', description: 'Net profit after all costs' },
    { id: 'roi', name: 'ROI', type: 'number', unit: '%', description: 'Return on investment percentage' },
    { id: 'cashOnCashReturn', name: 'Cash on Cash Return', type: 'number', unit: '%', description: 'Cash on cash return percentage' },
    { id: 'annualizedReturn', name: 'Annualized Return', type: 'number', unit: '%', description: 'Annualized return percentage' },
    
    // Financial Metrics
    { id: 'purchaseCosts', name: 'Purchase Costs', type: 'number', unit: 'USD', description: 'Total purchase costs' },
    { id: 'renovationCosts', name: 'Renovation Costs', type: 'number', unit: 'USD', description: 'Total renovation costs' },
    { id: 'holdingCosts', name: 'Holding Costs', type: 'number', unit: 'USD', description: 'Total holding costs' },
    { id: 'sellingCosts', name: 'Selling Costs', type: 'number', unit: 'USD', description: 'Total selling costs' },
    { id: 'financingCosts', name: 'Financing Costs', type: 'number', unit: 'USD', description: 'Total financing costs' },
    
    // Timeline Analysis
    { id: 'totalTimeline', name: 'Total Timeline', type: 'number', unit: 'days', description: 'Total project timeline' },
    { id: 'holdingPeriod', name: 'Holding Period', type: 'number', unit: 'days', description: 'Total holding period' },
    
    // Profitability Analysis
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Profit margin percentage' },
    { id: 'profitPerSquareFoot', name: 'Profit per Square Foot', type: 'number', unit: 'USD/sq ft', description: 'Profit per square foot' },
    { id: 'profitPerDay', name: 'Profit per Day', type: 'number', unit: 'USD/day', description: 'Profit per day of project' },
    { id: 'breakEvenPrice', name: 'Break Even Price', type: 'number', unit: 'USD', description: 'Break even sale price' },
    
    // Risk Metrics
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Overall risk score (1-10)' },
    { id: 'probabilityOfProfit', name: 'Probability of Profit', type: 'number', unit: '%', description: 'Probability of making a profit' },
    { id: 'expectedValue', name: 'Expected Value', type: 'number', unit: 'USD', description: 'Expected value of investment' },
    
    // Market Analysis
    { id: 'afterRepairValue', name: 'After Repair Value', type: 'number', unit: 'USD', description: 'Estimated after repair value' },
    { id: 'marketValue', name: 'Market Value', type: 'number', unit: 'USD', description: 'Current market value' },
    { id: 'pricePerSquareFoot', name: 'Price per Square Foot', type: 'number', unit: 'USD/sq ft', description: 'Price per square foot' },
    
    // Financing Analysis
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly loan payment' },
    { id: 'totalInterestPaid', name: 'Total Interest Paid', type: 'number', unit: 'USD', description: 'Total interest paid' },
    { id: 'loanToValueRatio', name: 'Loan to Value Ratio', type: 'number', unit: 'ratio', description: 'Loan to value ratio' },
    
    // Cash Flow Analysis
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Monthly cash flow' },
    { id: 'totalCashFlow', name: 'Total Cash Flow', type: 'number', unit: 'USD', description: 'Total cash flow' },
    
    // Project Rating
    { id: 'projectRating', name: 'Project Rating', type: 'string', description: 'Overall project rating' },
    { id: 'riskRating', name: 'Risk Rating', type: 'string', description: 'Overall risk rating' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    
    // Comprehensive Analysis
    { id: 'fixAndFlipAnalysis', name: 'Fix and Flip Analysis Report', type: 'string', description: 'Comprehensive project analysis with recommendations' }
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
      formula: 'Total Investment = Down Payment + Closing Costs + Renovation Budget',
      description: 'Total amount invested in the project'
    },
    {
      name: 'Total Costs',
      formula: 'Total Costs = Purchase Costs + Renovation Costs + Holding Costs + Selling Costs + Financing Costs',
      description: 'Total project costs'
    },
    {
      name: 'Net Profit',
      formula: 'Net Profit = Target Sale Price - Total Costs',
      description: 'Net profit after all costs'
    },
    {
      name: 'ROI',
      formula: 'ROI = (Net Profit / Total Investment) × 100',
      description: 'Return on investment percentage'
    },
    {
      name: 'Cash on Cash Return',
      formula: 'Cash on Cash Return = (Net Profit / Total Investment) × 100',
      description: 'Cash on cash return percentage'
    },
    {
      name: 'Profit Margin',
      formula: 'Profit Margin = (Net Profit / Target Sale Price) × 100',
      description: 'Profit margin percentage'
    },
    {
      name: 'Profit per Square Foot',
      formula: 'Profit per Square Foot = Net Profit / Property Size',
      description: 'Profit per square foot'
    },
    {
      name: 'Profit per Day',
      formula: 'Profit per Day = Net Profit / Total Timeline',
      description: 'Profit per day of project'
    },
    {
      name: 'Break Even Price',
      formula: 'Break Even Price = Total Costs',
      description: 'Break even sale price'
    },
    {
      name: 'Loan to Value Ratio',
      formula: 'LTV = Loan Amount / Purchase Price',
      description: 'Loan to value ratio'
    },
    {
      name: 'Monthly Payment',
      formula: 'Monthly Payment = P × (r(1+r)^n) / ((1+r)^n - 1)',
      description: 'Monthly loan payment using amortization formula'
    },
    {
      name: 'After Repair Value',
      formula: 'ARV = Purchase Price + Renovation Budget + Market Appreciation',
      description: 'Estimated after repair value'
    }
  ],

  examples: [
    {
      name: 'Single Family Home Flip',
      description: 'Typical single family home fix and flip project with moderate renovations',
      inputs: {
        propertyAddress: '123 Oak Street, Suburbia, CA',
        propertyType: 'single_family',
        propertySize: 2000,
        lotSize: 6000,
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 1985,
        propertyCondition: 'fair',
        purchasePrice: 250000,
        purchaseDate: '2024-01-15',
        closingCosts: 10000,
        downPayment: 50000,
        loanAmount: 200000,
        interestRate: 8.5,
        loanTerm: 12,
        loanType: 'hard_money',
        renovationBudget: 60000,
        renovationTimeline: 3,
        kitchenRemodel: true,
        kitchenRemodelCost: 25000,
        bathroomRemodel: true,
        bathroomRemodelCost: 15000,
        electricalWork: true,
        electricalWorkCost: 8000,
        plumbingWork: true,
        plumbingWorkCost: 6000,
        hvacWork: true,
        hvacWorkCost: 12000,
        flooringWork: true,
        flooringWorkCost: 8000,
        paintingWork: true,
        paintingWorkCost: 5000,
        propertyTaxes: 350,
        insurance: 180,
        utilities: 250,
        maintenance: 120,
        targetSalePrice: 380000,
        targetSaleDate: '2024-07-15',
        realtorCommission: 6,
        closingCostsSeller: 6000,
        stagingCosts: 3000,
        marketingCosts: 2000,
        acquisitionTimeline: 30,
        renovationTimeline: 90,
        marketingTimeline: 45,
        totalProjectTimeline: 165,
        marketRisk: 'medium',
        renovationRisk: 'medium',
        financingRisk: 'low',
        timelineRisk: 'medium',
        analysisPeriod: 12,
        discountRate: 12,
        taxRate: 15,
        inflationRate: 2.5,
        appreciationRate: 3
      }
    },
    {
      name: 'Townhouse Quick Flip',
      description: 'Quick flip of a townhouse with minimal renovations',
      inputs: {
        propertyAddress: '456 Pine Avenue, Downtown, NY',
        propertyType: 'townhouse',
        propertySize: 1500,
        lotSize: 2000,
        bedrooms: 2,
        bathrooms: 2,
        yearBuilt: 1995,
        propertyCondition: 'good',
        purchasePrice: 180000,
        purchaseDate: '2024-02-01',
        closingCosts: 8000,
        downPayment: 36000,
        loanAmount: 144000,
        interestRate: 9.0,
        loanTerm: 6,
        loanType: 'hard_money',
        renovationBudget: 25000,
        renovationTimeline: 2,
        kitchenRemodel: true,
        kitchenRemodelCost: 15000,
        paintingWork: true,
        paintingWorkCost: 4000,
        flooringWork: true,
        flooringWorkCost: 6000,
        propertyTaxes: 250,
        insurance: 120,
        utilities: 180,
        targetSalePrice: 240000,
        targetSaleDate: '2024-05-01',
        realtorCommission: 5,
        closingCostsSeller: 4000,
        stagingCosts: 2000,
        marketingCosts: 1500,
        acquisitionTimeline: 20,
        renovationTimeline: 60,
        marketingTimeline: 30,
        totalProjectTimeline: 110,
        marketRisk: 'low',
        renovationRisk: 'low',
        financingRisk: 'medium',
        timelineRisk: 'low',
        analysisPeriod: 6,
        discountRate: 15,
        taxRate: 15,
        inflationRate: 2.5,
        appreciationRate: 2
      }
    }
  ],

  tags: ['Fix and Flip', 'Real Estate Investment', 'Renovation', 'Property Investment', 'House Flipping', 'ROI Analysis', 'Real Estate Development', 'Investment Analysis'],

  category_info: {
    name: 'Fix and Flip',
    description: 'Professional tools for fix and flip real estate investment analysis and project management'
  }
};
