import { Calculator } from '../../types/calculator';
import { calculateHotelFeasibility, generateHotelFeasibilityAnalysis } from './formulas';
import { validateHotelFeasibilityInputs } from './validation';

export const HotelFeasibilityCalculator: Calculator = {
  id: 'hotel-feasibility-calculator',
  name: 'Hotel Feasibility & ADR Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate hotel feasibility, Average Daily Rate (ADR), revenue projections, and investment returns based on market analysis, operating costs, and competitive factors.',
  inputs: [
    { id: 'totalRooms', name: 'Total Rooms', type: 'number', required: true, description: 'Number of hotel rooms', placeholder: '100', min: 1, max: 10000 },
    { id: 'roomTypes', name: 'Room Types', type: 'multiselect', required: false, description: 'Types of rooms available', placeholder: 'Select room types', options: ['standard', 'deluxe', 'suite', 'presidential-suite', 'accessible', 'connecting'] },
    { id: 'averageRoomSize', name: 'Average Room Size', type: 'number', unit: 'sq ft', required: false, description: 'Average size of hotel rooms', placeholder: '350', min: 100, max: 2000 },
    { id: 'hotelType', name: 'Hotel Type', type: 'select', required: false, description: 'Type of hotel property', placeholder: 'full-service', options: ['budget', 'midscale', 'upscale', 'luxury', 'boutique', 'resort', 'business', 'airport', 'extended-stay'] },
    { id: 'starRating', name: 'Star Rating', type: 'select', required: false, description: 'Hotel star rating', placeholder: '3', options: ['1', '2', '3', '4', '5'] },
    { id: 'location', name: 'Location Type', type: 'select', required: false, description: 'Location of the hotel', placeholder: 'urban', options: ['urban', 'suburban', 'airport', 'resort', 'highway', 'downtown', 'business-district'] },
    { id: 'market', name: 'Market Type', type: 'select', required: false, description: 'Type of market', placeholder: 'business', options: ['business', 'leisure', 'mixed', 'convention', 'airport', 'resort'] },
    { id: 'seasonality', name: 'Seasonality Factor', type: 'select', required: false, description: 'Seasonal demand variation', placeholder: 'moderate', options: ['low', 'moderate', 'high', 'extreme'] },
    { id: 'competitionLevel', name: 'Competition Level', type: 'select', required: false, description: 'Level of local competition', placeholder: 'medium', options: ['low', 'medium', 'high', 'very-high'] },
    { id: 'marketDemand', name: 'Market Demand', type: 'select', required: false, description: 'Overall market demand', placeholder: 'strong', options: ['weak', 'moderate', 'strong', 'very-strong'] },
    { id: 'occupancyRate', name: 'Expected Occupancy Rate', type: 'number', unit: '%', required: false, description: 'Expected average occupancy rate', placeholder: '75', min: 0, max: 100 },
    { id: 'baseADR', name: 'Base ADR', type: 'number', unit: 'USD', required: false, description: 'Base Average Daily Rate', placeholder: '150', min: 20, max: 2000 },
    { id: 'revPAR', name: 'Expected RevPAR', type: 'number', unit: 'USD', required: false, description: 'Expected Revenue Per Available Room', placeholder: '112.5', min: 10, max: 1500 },
    { id: 'constructionCost', name: 'Construction Cost per Room', type: 'number', unit: 'USD', required: false, description: 'Construction cost per room', placeholder: '150000', min: 50000, max: 1000000 },
    { id: 'landCost', name: 'Land Cost', type: 'number', unit: 'USD', required: false, description: 'Total land acquisition cost', placeholder: '5000000', min: 0, max: 100000000 },
    { id: 'softCosts', name: 'Soft Costs', type: 'number', unit: 'USD', required: false, description: 'Architecture, engineering, permits, etc.', placeholder: '2000000', min: 0, max: 50000000 },
    { id: 'furnitureCost', name: 'Furniture, Fixtures & Equipment', type: 'number', unit: 'USD', required: false, description: 'FF&E cost per room', placeholder: '25000', min: 5000, max: 200000 },
    { id: 'operatingExpenses', name: 'Operating Expenses per Room', type: 'number', unit: 'USD', required: false, description: 'Annual operating expenses per room', placeholder: '25000', min: 5000, max: 100000 },
    { id: 'laborCosts', name: 'Labor Costs per Room', type: 'number', unit: 'USD', required: false, description: 'Annual labor costs per room', placeholder: '35000', min: 10000, max: 150000 },
    { id: 'utilityCosts', name: 'Utility Costs per Room', type: 'number', unit: 'USD', required: false, description: 'Annual utility costs per room', placeholder: '8000', min: 1000, max: 30000 },
    { id: 'maintenanceCosts', name: 'Maintenance Costs per Room', type: 'number', unit: 'USD', required: false, description: 'Annual maintenance costs per room', placeholder: '5000', min: 1000, max: 25000 },
    { id: 'insuranceCosts', name: 'Insurance Costs per Room', type: 'number', unit: 'USD', required: false, description: 'Annual insurance costs per room', placeholder: '3000', min: 500, max: 15000 },
    { id: 'propertyTaxes', name: 'Property Taxes per Room', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes per room', placeholder: '4000', min: 500, max: 20000 },
    { id: 'managementFees', name: 'Management Fees', type: 'number', unit: '%', required: false, description: 'Hotel management fees percentage', placeholder: '3', min: 0, max: 10 },
    { id: 'franchiseFees', name: 'Franchise Fees', type: 'number', unit: '%', required: false, description: 'Franchise fees percentage', placeholder: '5', min: 0, max: 15 },
    { id: 'financingRate', name: 'Financing Rate', type: 'number', unit: '%', required: false, description: 'Interest rate on construction loan', placeholder: '6.5', min: 0, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Loan term in years', placeholder: '25', min: 5, max: 40 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: '%', required: false, description: 'Down payment percentage', placeholder: '25', min: 10, max: 50 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Effective tax rate', placeholder: '25', min: 0, max: 50 },
    { id: 'depreciationPeriod', name: 'Depreciation Period', type: 'number', unit: 'years', required: false, description: 'Depreciation period for tax purposes', placeholder: '39', min: 15, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: -10, max: 20 },
    { id: 'revenueGrowth', name: 'Revenue Growth Rate', type: 'number', unit: '%', required: false, description: 'Expected annual revenue growth', placeholder: '3', min: -20, max: 30 },
    { id: 'expenseGrowth', name: 'Expense Growth Rate', type: 'number', unit: '%', required: false, description: 'Expected annual expense growth', placeholder: '2.5', min: -10, max: 20 },
    { id: 'exitYear', name: 'Exit Year', type: 'number', required: false, description: 'Year to exit investment', placeholder: '10', min: 3, max: 30 },
    { id: 'exitCapRate', name: 'Exit Cap Rate', type: 'number', unit: '%', required: false, description: 'Cap rate at exit', placeholder: '7', min: 3, max: 15 },
    { id: 'additionalRevenue', name: 'Additional Revenue Sources', type: 'multiselect', required: false, description: 'Additional revenue sources', placeholder: 'Select sources', options: ['restaurant', 'bar', 'spa', 'fitness-center', 'conference-rooms', 'parking', 'shuttle-service', 'gift-shop', 'laundry-service', 'room-service'] },
    { id: 'amenities', name: 'Hotel Amenities', type: 'multiselect', required: false, description: 'Hotel amenities and services', placeholder: 'Select amenities', options: ['pool', 'gym', 'spa', 'restaurant', 'bar', 'concierge', 'valet-parking', 'free-wifi', 'business-center', 'meeting-rooms', 'event-space', 'shuttle-service', 'room-service', 'laundry-service', 'gift-shop'] }
  ],
  outputs: [
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total project investment required' },
    { id: 'constructionCostTotal', name: 'Total Construction Cost', type: 'number', unit: 'USD', description: 'Total construction cost' },
    { id: 'totalProjectCost', name: 'Total Project Cost', type: 'number', unit: 'USD', description: 'Total project cost including land and soft costs' },
    { id: 'annualRevenue', name: 'Annual Revenue', type: 'number', unit: 'USD', description: 'Projected annual revenue' },
    { id: 'annualExpenses', name: 'Annual Expenses', type: 'number', unit: 'USD', description: 'Projected annual operating expenses' },
    { id: 'netOperatingIncome', name: 'Net Operating Income', type: 'number', unit: 'USD', description: 'Annual net operating income' },
    { id: 'cashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Annual cash flow after debt service' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Cash-on-cash return on investment' },
    { id: 'capRate', name: 'Cap Rate', type: 'number', unit: '%', description: 'Capitalization rate' },
    { id: 'irr', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'Projected IRR over investment period' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Time to recover initial investment' },
    { id: 'breakEvenOccupancy', name: 'Break-Even Occupancy', type: 'number', unit: '%', description: 'Occupancy rate needed to break even' },
    { id: 'breakEvenADR', name: 'Break-Even ADR', type: 'number', unit: 'USD', description: 'ADR needed to break even' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Net profit margin' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage Ratio', type: 'number', description: 'DSCR - ability to cover debt payments' },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', description: 'Required loan amount' },
    { id: 'monthlyPayment', name: 'Monthly Loan Payment', type: 'number', unit: 'USD', description: 'Monthly debt service payment' },
    { id: 'annualDebtService', name: 'Annual Debt Service', type: 'number', unit: 'USD', description: 'Annual debt service payments' },
    { id: 'equityRequired', name: 'Equity Required', type: 'number', unit: 'USD', description: 'Required equity investment' },
    { id: 'exitValue', name: 'Exit Value', type: 'number', unit: 'USD', description: 'Projected property value at exit' },
    { id: 'totalReturn', name: 'Total Return', type: 'number', unit: '%', description: 'Total return including appreciation' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Overall project feasibility score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Project risk assessment (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    { id: 'keyMetrics', name: 'Key Performance Metrics', type: 'string', description: 'Summary of key performance indicators' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'string', description: 'Impact of key variables on returns' },
    { id: 'hotelFeasibilityAnalysis', name: 'Hotel Feasibility Analysis', type: 'string', description: 'Comprehensive feasibility analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHotelFeasibility(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHotelFeasibilityAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Investment Calculation',
      formula: 'Total Investment = Land Cost + Construction Cost + Soft Costs + FF&E',
      description: 'Calculates the total capital required for the project'
    },
    {
      name: 'Annual Revenue Calculation',
      formula: 'Annual Revenue = Total Rooms × Occupancy Rate × ADR × 365',
      description: 'Calculates projected annual room revenue'
    },
    {
      name: 'Net Operating Income',
      formula: 'NOI = Annual Revenue - Operating Expenses',
      description: 'Net operating income before debt service and taxes'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = NOI / Total Investment',
      description: 'Capitalization rate based on NOI and total investment'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash = (NOI - Debt Service) / Equity Investment',
      description: 'Return on equity investment'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = NOI / Annual Debt Service',
      description: 'Ability to cover debt payments from operating income'
    },
    {
      name: 'Break-Even Occupancy',
      formula: 'Break-Even Occupancy = (Operating Expenses + Debt Service) / (ADR × 365)',
      description: 'Minimum occupancy needed to cover all costs'
    }
  ],
  examples: [
    {
      name: 'Midscale Business Hotel',
      inputs: {
        totalRooms: 120,
        hotelType: 'midscale',
        starRating: '3',
        location: 'business-district',
        market: 'business',
        occupancyRate: 75,
        baseADR: 140,
        constructionCost: 120000,
        landCost: 3000000,
        softCosts: 1500000,
        furnitureCost: 20000,
        operatingExpenses: 22000,
        laborCosts: 30000,
        financingRate: 6.5,
        loanTerm: 25,
        downPayment: 25,
        additionalRevenue: ['restaurant', 'conference-rooms', 'parking'],
        amenities: ['pool', 'gym', 'free-wifi', 'business-center']
      },
      description: 'Typical midscale business hotel in a business district'
    },
    {
      name: 'Luxury Resort',
      inputs: {
        totalRooms: 200,
        hotelType: 'resort',
        starRating: '5',
        location: 'resort',
        market: 'leisure',
        seasonality: 'high',
        occupancyRate: 65,
        baseADR: 350,
        constructionCost: 300000,
        landCost: 15000000,
        softCosts: 5000000,
        furnitureCost: 50000,
        operatingExpenses: 45000,
        laborCosts: 60000,
        financingRate: 6.0,
        loanTerm: 30,
        downPayment: 30,
        additionalRevenue: ['restaurant', 'spa', 'conference-rooms', 'gift-shop'],
        amenities: ['pool', 'spa', 'restaurant', 'concierge', 'valet-parking', 'room-service']
      },
      description: 'High-end luxury resort with extensive amenities'
    },
    {
      name: 'Budget Airport Hotel',
      inputs: {
        totalRooms: 80,
        hotelType: 'airport',
        starRating: '2',
        location: 'airport',
        market: 'airport',
        occupancyRate: 80,
        baseADR: 85,
        constructionCost: 80000,
        landCost: 2000000,
        softCosts: 800000,
        furnitureCost: 12000,
        operatingExpenses: 18000,
        laborCosts: 22000,
        financingRate: 7.0,
        loanTerm: 20,
        downPayment: 20,
        additionalRevenue: ['shuttle-service', 'parking'],
        amenities: ['free-wifi', 'shuttle-service']
      },
      description: 'Budget-friendly airport hotel with basic amenities'
    }
  ]
};
