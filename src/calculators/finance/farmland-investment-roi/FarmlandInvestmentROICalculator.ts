import { Calculator } from '../../../types/calculator';
import { calculateFarmlandInvestmentROI, generateFarmlandInvestmentAnalysis } from './formulas';
import { validateFarmlandInvestmentInputs } from './validation';

export const FarmlandInvestmentROICalculator: Calculator = {
  id: 'farmland-investment-roi-calculator',
  name: 'Farmland Investment ROI Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate ROI, cash flow, and investment analysis for farmland investments including crop yields, land appreciation, and operational costs.',
  inputs: [
    { id: 'landAcres', name: 'Land Size (Acres)', type: 'number', unit: 'acres', required: true, description: 'Total acreage of the farmland', placeholder: '100', min: 1, max: 100000 },
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: true, description: 'Total purchase price of the farmland', placeholder: '500000', min: 10000, max: 100000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Initial down payment amount', placeholder: '100000', min: 5000, max: 50000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate for financing', placeholder: '5.5', min: 1, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 5, max: 50 },
    { id: 'annualCropRevenue', name: 'Annual Crop Revenue', type: 'number', unit: 'USD', required: true, description: 'Expected annual revenue from crop sales', placeholder: '75000', min: 0, max: 10000000 },
    { id: 'cropType', name: 'Primary Crop Type', type: 'select', required: true, description: 'Main crop being grown', placeholder: 'Select crop type', options: ['corn', 'soybeans', 'wheat', 'cotton', 'rice', 'sorghum', 'barley', 'oats', 'sunflowers', 'canola', 'mixed', 'other'] },
    { id: 'yieldPerAcre', name: 'Yield per Acre', type: 'number', unit: 'bushels/acre', required: true, description: 'Expected crop yield per acre', placeholder: '180', min: 1, max: 1000 },
    { id: 'cropPrice', name: 'Crop Price per Unit', type: 'number', unit: 'USD/bushel', required: true, description: 'Expected selling price per unit', placeholder: '4.50', min: 0.1, max: 100 },
    { id: 'operatingCosts', name: 'Annual Operating Costs', type: 'number', unit: 'USD', required: true, description: 'Total annual operating costs (seed, fertilizer, equipment, labor)', placeholder: '45000', min: 0, max: 5000000 },
    { id: 'landTaxes', name: 'Annual Property Taxes', type: 'number', unit: 'USD', required: true, description: 'Annual property taxes on the land', placeholder: '3000', min: 0, max: 100000 },
    { id: 'insuranceCosts', name: 'Annual Insurance Costs', type: 'number', unit: 'USD', required: true, description: 'Annual insurance premiums for the farm', placeholder: '2000', min: 0, max: 50000 },
    { id: 'maintenanceCosts', name: 'Annual Maintenance Costs', type: 'number', unit: 'USD', required: true, description: 'Annual maintenance and repair costs', placeholder: '5000', min: 0, max: 100000 },
    { id: 'landAppreciation', name: 'Annual Land Appreciation', type: 'number', unit: '%', required: true, description: 'Expected annual appreciation rate of the land', placeholder: '3', min: -10, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: true, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 15 },
    { id: 'holdingPeriod', name: 'Investment Holding Period', type: 'number', unit: 'years', required: true, description: 'Expected holding period for the investment', placeholder: '10', min: 1, max: 50 },
    { id: 'soilQuality', name: 'Soil Quality Rating', type: 'select', required: true, description: 'Overall soil quality and productivity rating', placeholder: 'Select soil quality', options: ['excellent', 'good', 'average', 'poor', 'marginal'] },
    { id: 'irrigationType', name: 'Irrigation Type', type: 'select', required: true, description: 'Type of irrigation system available', placeholder: 'Select irrigation type', options: ['none', 'drip', 'sprinkler', 'flood', 'center-pivot', 'subsurface'] },
    { id: 'climateZone', name: 'Climate Zone', type: 'select', required: true, description: 'Climate zone and growing conditions', placeholder: 'Select climate zone', options: ['arid', 'semi-arid', 'temperate', 'humid', 'tropical', 'mediterranean'] },
    { id: 'marketAccess', name: 'Market Access', type: 'select', required: true, description: 'Proximity to markets and transportation', placeholder: 'Select market access', options: ['excellent', 'good', 'average', 'poor', 'remote'] },
    { id: 'governmentSubsidies', name: 'Government Subsidies', type: 'number', unit: 'USD', required: false, description: 'Annual government subsidies or payments', placeholder: '5000', min: 0, max: 100000 },
    { id: 'conservationPrograms', name: 'Conservation Programs', type: 'select', required: false, description: 'Participation in conservation programs', placeholder: 'Select conservation programs', options: ['none', 'crop-insurance', 'conservation-reserve', 'wetlands-reserve', 'environmental-quality-incentives'] },
    { id: 'organicCertification', name: 'Organic Certification', type: 'select', required: false, description: 'Organic certification status', placeholder: 'Select certification status', options: ['none', 'certified-organic', 'transitioning', 'conventional'] },
    { id: 'energyCosts', name: 'Annual Energy Costs', type: 'number', unit: 'USD', required: false, description: 'Annual energy costs for operations', placeholder: '3000', min: 0, max: 50000 },
    { id: 'laborCosts', name: 'Annual Labor Costs', type: 'number', unit: 'USD', required: false, description: 'Annual labor costs for farm operations', placeholder: '15000', min: 0, max: 200000 },
    { id: 'equipmentCosts', name: 'Annual Equipment Costs', type: 'number', unit: 'USD', required: false, description: 'Annual equipment costs and depreciation', placeholder: '8000', min: 0, max: 100000 },
    { id: 'waterRights', name: 'Water Rights', type: 'select', required: false, description: 'Water rights and access status', placeholder: 'Select water rights', options: ['owned', 'leased', 'shared', 'none', 'restricted'] },
    { id: 'mineralRights', name: 'Mineral Rights', type: 'select', required: false, description: 'Mineral rights ownership status', placeholder: 'Select mineral rights', options: ['owned', 'leased', 'shared', 'none', 'sold'] },
    { id: 'zoningRestrictions', name: 'Zoning Restrictions', type: 'select', required: false, description: 'Zoning and land use restrictions', placeholder: 'Select zoning restrictions', options: ['none', 'agricultural-only', 'mixed-use', 'development-restricted', 'conservation-easement'] }
  ],
  outputs: [
    { id: 'totalInvestment', name: 'Total Investment', type: 'number', unit: 'USD', description: 'Total amount invested including down payment and closing costs' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Net annual cash flow from operations' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly mortgage payment' },
    { id: 'annualROI', name: 'Annual ROI', type: 'number', unit: '%', description: 'Annual return on investment percentage' },
    { id: 'totalROI', name: 'Total ROI', type: 'number', unit: '%', description: 'Total return on investment over holding period' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Annual cash-on-cash return percentage' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years to break even on the investment' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'Net present value of the investment' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'Internal rate of return percentage' },
    { id: 'landValueAppreciation', name: 'Land Value Appreciation', type: 'number', unit: 'USD', description: 'Total land value appreciation over holding period' },
    { id: 'operatingExpenseRatio', name: 'Operating Expense Ratio', type: 'number', unit: '%', description: 'Operating expenses as percentage of revenue' },
    { id: 'debtServiceCoverageRatio', name: 'Debt Service Coverage Ratio', type: 'number', unit: 'ratio', description: 'Debt service coverage ratio' },
    { id: 'profitMargin', name: 'Profit Margin', type: 'number', unit: '%', description: 'Net profit margin percentage' },
    { id: 'yieldEfficiency', name: 'Yield Efficiency', type: 'number', unit: 'USD/acre', description: 'Revenue per acre efficiency' },
    { id: 'riskScore', name: 'Investment Risk Score', type: 'number', unit: 'score', description: 'Overall investment risk assessment score' },
    { id: 'investmentRecommendation', name: 'Investment Recommendation', type: 'string', description: 'Overall investment recommendation based on analysis' },
    { id: 'keyRiskFactors', name: 'Key Risk Factors', type: 'string', description: 'Primary risk factors to consider' },
    { id: 'optimizationOpportunities', name: 'Optimization Opportunities', type: 'string', description: 'Potential opportunities to improve returns' },
    { id: 'marketAnalysis', name: 'Market Analysis', type: 'string', description: 'Analysis of market conditions and trends' },
    { id: 'sustainabilityMetrics', name: 'Sustainability Metrics', type: 'string', description: 'Environmental and sustainability considerations' },
    { id: 'farmlandInvestmentAnalysis', name: 'Farmland Investment Analysis', type: 'string', description: 'Comprehensive farmland investment analysis report' }
  ],
  calculate: (inputs) => {
    return calculateFarmlandInvestmentROI(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateFarmlandInvestmentAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = monthly payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    },
    {
      name: 'Annual Cash Flow',
      formula: 'Cash Flow = Revenue - Operating Costs - Debt Service - Taxes - Insurance - Maintenance',
      description: 'Net annual cash flow from farm operations'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash Return = (Annual Cash Flow / Total Investment) × 100',
      description: 'Annual return on total cash invested'
    },
    {
      name: 'Total ROI',
      formula: 'Total ROI = [(Final Value - Initial Investment) / Initial Investment] × 100',
      description: 'Total return including appreciation and cash flow over holding period'
    },
    {
      name: 'Net Present Value',
      formula: 'NPV = Σ[CFt / (1 + r)^t] - Initial Investment',
      description: 'Where CFt = cash flow in year t, r = discount rate'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = Net Operating Income / Annual Debt Service',
      description: 'Ability to cover debt payments with operating income'
    },
    {
      name: 'Operating Expense Ratio',
      formula: 'OER = (Operating Expenses / Gross Revenue) × 100',
      description: 'Operating expenses as percentage of total revenue'
    },
    {
      name: 'Yield Efficiency',
      formula: 'Yield Efficiency = (Crop Revenue - Operating Costs) / Total Acres',
      description: 'Net revenue per acre after operating costs'
    }
  ],
  examples: [
    {
      name: 'Midwest Corn Farm',
      inputs: {
        landAcres: '200',
        purchasePrice: '800000',
        downPayment: '160000',
        interestRate: '5.25',
        loanTerm: '25',
        annualCropRevenue: '120000',
        cropType: 'corn',
        yieldPerAcre: '185',
        cropPrice: '4.75',
        operatingCosts: '65000',
        landTaxes: '4000',
        insuranceCosts: '2500',
        maintenanceCosts: '6000',
        landAppreciation: '2.5',
        inflationRate: '2.0',
        holdingPeriod: '15',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good',
        governmentSubsidies: '8000',
        conservationPrograms: 'crop-insurance',
        organicCertification: 'conventional',
        energyCosts: '4000',
        laborCosts: '18000',
        equipmentCosts: '10000',
        waterRights: 'owned',
        mineralRights: 'owned',
        zoningRestrictions: 'agricultural-only'
      },
      description: 'Typical Midwest corn farm with good soil quality and market access'
    },
    {
      name: 'California Vineyard',
      inputs: {
        landAcres: '50',
        purchasePrice: '1500000',
        downPayment: '300000',
        interestRate: '4.75',
        loanTerm: '30',
        annualCropRevenue: '200000',
        cropType: 'other',
        yieldPerAcre: '4',
        cropPrice: '2500',
        operatingCosts: '120000',
        landTaxes: '8000',
        insuranceCosts: '5000',
        maintenanceCosts: '15000',
        landAppreciation: '4.0',
        inflationRate: '2.5',
        holdingPeriod: '20',
        soilQuality: 'excellent',
        irrigationType: 'drip',
        climateZone: 'mediterranean',
        marketAccess: 'excellent',
        governmentSubsidies: '0',
        conservationPrograms: 'none',
        organicCertification: 'certified-organic',
        energyCosts: '6000',
        laborCosts: '45000',
        equipmentCosts: '12000',
        waterRights: 'owned',
        mineralRights: 'owned',
        zoningRestrictions: 'agricultural-only'
      },
      description: 'Premium California vineyard with organic certification and excellent market access'
    },
    {
      name: 'Texas Cattle Ranch',
      inputs: {
        landAcres: '500',
        purchasePrice: '2000000',
        downPayment: '400000',
        interestRate: '5.5',
        loanTerm: '25',
        annualCropRevenue: '150000',
        cropType: 'mixed',
        yieldPerAcre: '2',
        cropPrice: '800',
        operatingCosts: '80000',
        landTaxes: '12000',
        insuranceCosts: '4000',
        maintenanceCosts: '8000',
        landAppreciation: '3.5',
        inflationRate: '2.2',
        holdingPeriod: '12',
        soilQuality: 'average',
        irrigationType: 'none',
        climateZone: 'semi-arid',
        marketAccess: 'average',
        governmentSubsidies: '12000',
        conservationPrograms: 'conservation-reserve',
        organicCertification: 'conventional',
        energyCosts: '3000',
        laborCosts: '25000',
        equipmentCosts: '15000',
        waterRights: 'shared',
        mineralRights: 'leased',
        zoningRestrictions: 'agricultural-only'
      },
      description: 'Large Texas cattle ranch with mixed agricultural operations'
    }
  ]
};
