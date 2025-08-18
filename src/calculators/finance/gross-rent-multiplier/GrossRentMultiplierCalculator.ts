import { Calculator } from '../../../types/calculator';
import { calculateGrossRentMultiplier, generateGrossRentMultiplierAnalysis } from './formulas';
import { validateGrossRentMultiplierInputs } from './validation';

export const GrossRentMultiplierCalculator: Calculator = {
  id: 'gross-rent-multiplier-calculator',
  name: 'Gross Rent Multiplier Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate the Gross Rent Multiplier (GRM) for real estate investment analysis, property valuation, and market comparison including income potential and investment feasibility assessment.',
  inputs: [
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value or purchase price of the property', placeholder: '500000', min: 10000, max: 100000000 },
    { id: 'grossAnnualRent', name: 'Gross Annual Rent', type: 'number', unit: 'USD', required: true, description: 'Total annual rental income before expenses', placeholder: '60000', min: 1000, max: 10000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of real estate property', options: ['single-family', 'multi-family', 'apartment', 'commercial', 'industrial', 'mixed-use', 'condo', 'townhouse'] },
    { id: 'location', name: 'Location', type: 'select', required: true, description: 'Geographic location classification', options: ['urban', 'suburban', 'rural', 'coastal', 'mountain', 'downtown', 'residential'] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: true, description: 'Current market conditions', options: ['hot', 'stable', 'declining', 'emerging', 'balanced'] },
    { id: 'propertyAge', name: 'Property Age', type: 'number', unit: 'years', required: false, description: 'Age of the property in years', placeholder: '15', min: 0, max: 200 },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', unit: 'sq ft', required: false, description: 'Total square footage of the property', placeholder: '2000', min: 100, max: 100000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false, description: 'Number of bedrooms', placeholder: '3', min: 0, max: 20 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false, description: 'Number of bathrooms', placeholder: '2', min: 0, max: 20 },
    { id: 'parkingSpaces', name: 'Parking Spaces', type: 'number', required: false, description: 'Number of parking spaces', placeholder: '2', min: 0, max: 50 },
    { id: 'condition', name: 'Property Condition', type: 'select', required: false, description: 'Overall condition of the property', options: ['excellent', 'good', 'fair', 'poor', 'needs-renovation'] },
    { id: 'amenities', name: 'Amenities', type: 'multiselect', required: false, description: 'Property amenities', options: ['pool', 'gym', 'parking', 'balcony', 'fireplace', 'central-air', 'hardwood-floors', 'granite-countertops', 'stainless-steel-appliances', 'walk-in-closet', 'garden', 'patio', 'basement', 'attic', 'garage'] },
    { id: 'vacancyRate', name: 'Vacancy Rate', type: 'number', unit: '%', required: false, description: 'Expected vacancy rate for the property', placeholder: '5', min: 0, max: 50 },
    { id: 'operatingExpenses', name: 'Operating Expenses', type: 'number', unit: 'USD', required: false, description: 'Annual operating expenses', placeholder: '15000', min: 0, max: 1000000 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes', placeholder: '8000', min: 0, max: 100000 },
    { id: 'insurance', name: 'Insurance Costs', type: 'number', unit: 'USD', required: false, description: 'Annual insurance costs', placeholder: '3000', min: 0, max: 100000 },
    { id: 'maintenance', name: 'Maintenance Costs', type: 'number', unit: 'USD', required: false, description: 'Annual maintenance costs', placeholder: '5000', min: 0, max: 100000 },
    { id: 'managementFees', name: 'Management Fees', type: 'number', unit: 'USD', required: false, description: 'Annual property management fees', placeholder: '2000', min: 0, max: 100000 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD', required: false, description: 'Annual utilities costs', placeholder: '4000', min: 0, max: 100000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Annual HOA fees', placeholder: '2400', min: 0, max: 100000 },
    { id: 'marketRent', name: 'Market Rent', type: 'number', unit: 'USD', required: false, description: 'Current market rent for similar properties', placeholder: '5500', min: 0, max: 100000 },
    { id: 'comparableSales', name: 'Comparable Sales', type: 'number', unit: 'USD', required: false, description: 'Average price of comparable properties sold recently', placeholder: '480000', min: 0, max: 100000000 },
    { id: 'appreciationRate', name: 'Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual property appreciation rate', placeholder: '3.5', min: -10, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected inflation rate', placeholder: '2.0', min: -5, max: 15 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Effective tax rate on rental income', placeholder: '25', min: 0, max: 50 },
    { id: 'riskScore', name: 'Risk Score', type: 'number', required: false, description: 'Overall risk assessment (1-10)', placeholder: '5', min: 1, max: 10 },
    { id: 'marketLiquidity', name: 'Market Liquidity', type: 'select', required: false, description: 'Market liquidity for similar properties', options: ['high', 'medium', 'low'] }
  ],
  outputs: [
    { id: 'grossRentMultiplier', name: 'Gross Rent Multiplier', type: 'number', description: 'GRM ratio (Property Value / Gross Annual Rent)' },
    { id: 'netRentMultiplier', name: 'Net Rent Multiplier', type: 'number', description: 'NRM ratio (Property Value / Net Annual Rent)' },
    { id: 'pricePerSquareFoot', name: 'Price per Square Foot', type: 'number', unit: 'USD/sq ft', description: 'Property value per square foot' },
    { id: 'rentPerSquareFoot', name: 'Rent per Square Foot', type: 'number', unit: 'USD/sq ft', description: 'Annual rent per square foot' },
    { id: 'monthlyRent', name: 'Monthly Rent', type: 'number', unit: 'USD', description: 'Average monthly rent' },
    { id: 'netAnnualRent', name: 'Net Annual Rent', type: 'number', unit: 'USD', description: 'Annual rent after expenses' },
    { id: 'netMonthlyRent', name: 'Net Monthly Rent', type: 'number', unit: 'USD', description: 'Monthly rent after expenses' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Annual cash return on investment' },
    { id: 'capRate', name: 'Cap Rate', type: 'number', unit: '%', description: 'Capitalization rate' },
    { id: 'totalExpenses', name: 'Total Expenses', type: 'number', unit: 'USD', description: 'Total annual expenses' },
    { id: 'expenseRatio', name: 'Expense Ratio', type: 'number', unit: '%', description: 'Expenses as percentage of gross rent' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Net profit margin' },
    { id: 'breakEvenRent', name: 'Break-Even Rent', type: 'number', unit: 'USD', description: 'Minimum rent needed to break even' },
    { id: 'rentalYield', name: 'Rental Yield', type: 'number', unit: '%', description: 'Annual rental yield' },
    { id: 'investmentGrade', name: 'Investment Grade', type: 'string', description: 'Investment quality rating' },
    { id: 'marketComparison', name: 'Market Comparison', type: 'string', description: 'Comparison with market averages' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended investment action' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Investment risk evaluation' },
    { id: 'valueAnalysis', name: 'Value Analysis', type: 'string', description: 'Property value analysis' },
    { id: 'incomeAnalysis', name: 'Income Analysis', type: 'string', description: 'Rental income analysis' },
    { id: 'marketAnalysis', name: 'Market Analysis', type: 'string', description: 'Market position analysis' },
    { id: 'sensitivityScore', name: 'Sensitivity Score', type: 'number', description: 'Investment sensitivity to market changes' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', description: 'Investment liquidity rating (1-10)' },
    { id: 'diversificationScore', name: 'Diversification Score', type: 'number', description: 'Portfolio diversification benefit (1-10)' },
    { id: 'inflationHedge', name: 'Inflation Hedge Score', type: 'number', description: 'Inflation protection rating (1-10)' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Annual equity accumulation' },
    { id: 'totalReturn', name: 'Total Return', type: 'number', unit: '%', description: 'Total return including appreciation' },
    { id: 'grossRentMultiplierAnalysis', name: 'Gross Rent Multiplier Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateGrossRentMultiplier(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateGrossRentMultiplierAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Gross Rent Multiplier (GRM)',
      formula: 'GRM = Property Value / Gross Annual Rent',
      description: 'Basic ratio for property valuation and market comparison'
    },
    {
      name: 'Net Rent Multiplier (NRM)',
      formula: 'NRM = Property Value / Net Annual Rent',
      description: 'Ratio considering expenses and net income'
    },
    {
      name: 'Price per Square Foot',
      formula: 'Price/sq ft = Property Value / Square Footage',
      description: 'Property value normalized by size'
    },
    {
      name: 'Rent per Square Foot',
      formula: 'Rent/sq ft = Gross Annual Rent / Square Footage',
      description: 'Rental income normalized by size'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'CoC = (Net Annual Rent / Property Value) × 100',
      description: 'Annual cash return on investment'
    },
    {
      name: 'Capitalization Rate',
      formula: 'Cap Rate = (Net Annual Rent / Property Value) × 100',
      description: 'Annual return on property value'
    },
    {
      name: 'Expense Ratio',
      formula: 'Expense Ratio = (Total Expenses / Gross Annual Rent) × 100',
      description: 'Expenses as percentage of gross income'
    },
    {
      name: 'Profit Margin',
      formula: 'Profit Margin = (Net Annual Rent / Gross Annual Rent) × 100',
      description: 'Net profit as percentage of gross income'
    },
    {
      name: 'Break-Even Rent',
      formula: 'Break-Even = Total Expenses / 12',
      description: 'Minimum monthly rent to cover expenses'
    },
    {
      name: 'Rental Yield',
      formula: 'Rental Yield = (Gross Annual Rent / Property Value) × 100',
      description: 'Gross rental return on property value'
    },
    {
      name: 'Total Return',
      formula: 'Total Return = Rental Yield + Appreciation Rate',
      description: 'Combined return from income and appreciation'
    },
    {
      name: 'Tax Benefits',
      formula: 'Tax Benefits = (Net Annual Rent × Tax Rate) / 100',
      description: 'Annual tax savings from rental income'
    },
    {
      name: 'Equity Build-Up',
      formula: 'Equity Build-Up = Property Value × Appreciation Rate / 100',
      description: 'Annual equity accumulation from appreciation'
    }
  ],
  examples: [
    {
      name: 'Urban Single-Family Home',
      inputs: {
        propertyValue: 750000,
        grossAnnualRent: 72000,
        propertyType: 'single-family',
        location: 'urban',
        marketType: 'hot',
        propertyAge: 10,
        squareFootage: 2500,
        bedrooms: 4,
        bathrooms: 3,
        parkingSpaces: 2,
        condition: 'excellent',
        amenities: ['central-air', 'hardwood-floors', 'granite-countertops', 'fireplace'],
        vacancyRate: 3,
        operatingExpenses: 18000,
        propertyTaxes: 12000,
        insurance: 4000,
        maintenance: 6000,
        managementFees: 3000,
        utilities: 5000,
        hoaFees: 0,
        marketRent: 6500,
        comparableSales: 720000,
        appreciationRate: 4.0,
        inflationRate: 2.5,
        taxRate: 28,
        riskScore: 4,
        marketLiquidity: 'high'
      },
      description: 'High-value urban single-family home with strong rental demand'
    },
    {
      name: 'Suburban Multi-Family Property',
      inputs: {
        propertyValue: 1200000,
        grossAnnualRent: 144000,
        propertyType: 'multi-family',
        location: 'suburban',
        marketType: 'stable',
        propertyAge: 15,
        squareFootage: 8000,
        bedrooms: 12,
        bathrooms: 8,
        parkingSpaces: 8,
        condition: 'good',
        amenities: ['parking', 'balcony', 'central-air'],
        vacancyRate: 5,
        operatingExpenses: 36000,
        propertyTaxes: 20000,
        insurance: 8000,
        maintenance: 12000,
        managementFees: 6000,
        utilities: 15000,
        hoaFees: 0,
        marketRent: 12000,
        comparableSales: 1150000,
        appreciationRate: 3.0,
        inflationRate: 2.0,
        taxRate: 25,
        riskScore: 6,
        marketLiquidity: 'medium'
      },
      description: 'Stable suburban multi-family property with consistent cash flow'
    },
    {
      name: 'Rural Commercial Property',
      inputs: {
        propertyValue: 400000,
        grossAnnualRent: 48000,
        propertyType: 'commercial',
        location: 'rural',
        marketType: 'declining',
        propertyAge: 25,
        squareFootage: 3000,
        bedrooms: 0,
        bathrooms: 2,
        parkingSpaces: 10,
        condition: 'fair',
        amenities: ['parking', 'basement'],
        vacancyRate: 8,
        operatingExpenses: 15000,
        propertyTaxes: 8000,
        insurance: 3000,
        maintenance: 8000,
        managementFees: 2000,
        utilities: 4000,
        hoaFees: 0,
        marketRent: 4000,
        comparableSales: 380000,
        appreciationRate: 1.5,
        inflationRate: 2.0,
        taxRate: 22,
        riskScore: 8,
        marketLiquidity: 'low'
      },
      description: 'Lower-value rural commercial property with higher risk profile'
    }
  ]
};
