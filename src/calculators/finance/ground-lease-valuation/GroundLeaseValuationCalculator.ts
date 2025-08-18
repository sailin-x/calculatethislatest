import { Calculator } from '../../../types/calculator';
import { calculateGroundLeaseValuation, generateGroundLeaseAnalysis } from './formulas';
import { validateGroundLeaseInputs } from './validation';

export const GroundLeaseValuationCalculator: Calculator = {
  id: 'ground-lease-valuation-calculator',
  name: 'Ground Lease Valuation Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate the value of ground leases, land lease payments, and investment analysis for long-term land leasing arrangements including reversionary value and income stream analysis.',
  inputs: [
    { id: 'landValue', name: 'Land Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the land', placeholder: '1000000', min: 10000, max: 100000000 },
    { id: 'leaseTerm', name: 'Lease Term', type: 'number', unit: 'years', required: true, description: 'Duration of the ground lease', placeholder: '99', min: 1, max: 999 },
    { id: 'annualRent', name: 'Annual Rent', type: 'number', unit: 'USD', required: true, description: 'Annual ground rent payment', placeholder: '50000', min: 1000, max: 10000000 },
    { id: 'rentEscalation', name: 'Rent Escalation Rate', type: 'number', unit: '%', required: true, description: 'Annual rent increase percentage', placeholder: '2.5', min: 0, max: 20 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: true, description: 'Required rate of return for the investment', placeholder: '8.5', min: 1, max: 25 },
    { id: 'landAppreciation', name: 'Land Appreciation Rate', type: 'number', unit: '%', required: true, description: 'Expected annual land value appreciation', placeholder: '3.0', min: -10, max: 15 },
    { id: 'reversionaryValue', name: 'Reversionary Value', type: 'number', unit: 'USD', required: false, description: 'Value of land at lease end (optional)', placeholder: '2000000', min: 0, max: 100000000 },
    { id: 'leaseType', name: 'Lease Type', type: 'select', required: true, description: 'Type of ground lease arrangement', options: ['net', 'gross', 'triple-net', 'percentage'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property on the land', options: ['residential', 'commercial', 'industrial', 'mixed-use', 'agricultural'] },
    { id: 'location', name: 'Location', type: 'select', required: true, description: 'Geographic location classification', options: ['urban', 'suburban', 'rural', 'coastal', 'mountain'] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: true, description: 'Current market conditions', options: ['hot', 'stable', 'declining', 'emerging'] },
    { id: 'tenantCredit', name: 'Tenant Credit Rating', type: 'select', required: false, description: 'Credit quality of the tenant', options: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'unknown'] },
    { id: 'leaseStartDate', name: 'Lease Start Date', type: 'string', required: false, description: 'Date when lease payments begin', placeholder: '2024-01-01' },
    { id: 'paymentFrequency', name: 'Payment Frequency', type: 'select', required: false, description: 'How often rent is paid', options: ['monthly', 'quarterly', 'semi-annually', 'annually'] },
    { id: 'operatingExpenses', name: 'Operating Expenses', type: 'number', unit: 'USD', required: false, description: 'Annual operating expenses for landowner', placeholder: '5000', min: 0, max: 1000000 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes', placeholder: '15000', min: 0, max: 1000000 },
    { id: 'insurance', name: 'Insurance Costs', type: 'number', unit: 'USD', required: false, description: 'Annual insurance costs', placeholder: '3000', min: 0, max: 100000 },
    { id: 'maintenance', name: 'Maintenance Costs', type: 'number', unit: 'USD', required: false, description: 'Annual maintenance costs', placeholder: '2000', min: 0, max: 100000 },
    { id: 'managementFees', name: 'Management Fees', type: 'number', unit: 'USD', required: false, description: 'Annual property management fees', placeholder: '1000', min: 0, max: 100000 },
    { id: 'vacancyRate', name: 'Vacancy Rate', type: 'number', unit: '%', required: false, description: 'Expected vacancy rate', placeholder: '5', min: 0, max: 50 },
    { id: 'collectionLoss', name: 'Collection Loss Rate', type: 'number', unit: '%', required: false, description: 'Expected collection loss percentage', placeholder: '2', min: 0, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected inflation rate', placeholder: '2.0', min: -5, max: 15 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Effective tax rate on rental income', placeholder: '25', min: 0, max: 50 },
    { id: 'riskScore', name: 'Risk Score', type: 'number', required: false, description: 'Overall risk assessment (1-10)', placeholder: '5', min: 1, max: 10 },
    { id: 'marketLiquidity', name: 'Market Liquidity', type: 'select', required: false, description: 'Market liquidity for similar properties', options: ['high', 'medium', 'low'] }
  ],
  outputs: [
    { id: 'presentValue', name: 'Present Value', type: 'number', unit: 'USD', description: 'Present value of the ground lease' },
    { id: 'netPresentValue', name: 'Net Present Value', type: 'number', unit: 'USD', description: 'NPV of the ground lease investment' },
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR of the ground lease investment' },
    { id: 'cashOnCashReturn', name: 'Cash-on-Cash Return', type: 'number', unit: '%', description: 'Annual cash-on-cash return' },
    { id: 'capRate', name: 'Cap Rate', type: 'number', unit: '%', description: 'Capitalization rate' },
    { id: 'totalIncome', name: 'Total Income', type: 'number', unit: 'USD', description: 'Total income over lease term' },
    { id: 'totalExpenses', name: 'Total Expenses', type: 'number', unit: 'USD', description: 'Total expenses over lease term' },
    { id: 'netIncome', name: 'Net Income', type: 'number', unit: 'USD', description: 'Net income over lease term' },
    { id: 'reversionaryValue', name: 'Reversionary Value', type: 'number', unit: 'USD', description: 'Value of land at lease end' },
    { id: 'totalReturn', name: 'Total Return', type: 'number', unit: '%', description: 'Total return including reversion' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years to break even on investment' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Time to recover initial investment' },
    { id: 'profitabilityIndex', name: 'Profitability Index', type: 'number', description: 'PI ratio for investment analysis' },
    { id: 'annualizedReturn', name: 'Annualized Return', type: 'number', unit: '%', description: 'Annualized total return' },
    { id: 'riskAdjustedReturn', name: 'Risk-Adjusted Return', type: 'number', unit: '%', description: 'Return adjusted for risk' },
    { id: 'sensitivityScore', name: 'Sensitivity Score', type: 'number', description: 'Investment sensitivity to market changes' },
    { id: 'marketValue', name: 'Market Value', type: 'number', unit: 'USD', description: 'Estimated market value of the lease' },
    { id: 'investmentGrade', name: 'Investment Grade', type: 'string', description: 'Investment quality rating' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended investment action' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Average monthly cash flow' },
    { id: 'yearlyCashFlow', name: 'Yearly Cash Flow', type: 'number', unit: 'USD', description: 'Average yearly cash flow' },
    { id: 'cashFlowGrowth', name: 'Cash Flow Growth Rate', type: 'number', unit: '%', description: 'Expected cash flow growth rate' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Equity accumulation over time' },
    { id: 'taxBenefits', name: 'Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits' },
    { id: 'inflationHedge', name: 'Inflation Hedge Score', type: 'number', description: 'Inflation protection rating (1-10)' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', description: 'Investment liquidity rating (1-10)' },
    { id: 'diversificationScore', name: 'Diversification Score', type: 'number', description: 'Portfolio diversification benefit (1-10)' },
    { id: 'groundLeaseAnalysis', name: 'Ground Lease Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateGroundLeaseValuation(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateGroundLeaseAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Present Value of Ground Lease',
      formula: 'PV = Σ(Annual Rent × (1 + Escalation Rate)^t) / (1 + Discount Rate)^t',
      description: 'Calculates the present value of future rent payments'
    },
    {
      name: 'Net Present Value',
      formula: 'NPV = Present Value - Land Value',
      description: 'Net present value of the ground lease investment'
    },
    {
      name: 'Capitalization Rate',
      formula: 'Cap Rate = Annual Rent / Land Value',
      description: 'Annual return on land value'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'CoC = (Annual Rent - Annual Expenses) / Land Value',
      description: 'Annual cash return on investment'
    },
    {
      name: 'Reversionary Value',
      formula: 'RV = Land Value × (1 + Appreciation Rate)^Lease Term',
      description: 'Future value of land at lease end'
    },
    {
      name: 'Total Return',
      formula: 'TR = (Total Income + Reversionary Value - Land Value) / Land Value',
      description: 'Total return including income and reversion'
    },
    {
      name: 'Internal Rate of Return',
      formula: 'IRR = Rate where NPV = 0',
      description: 'Rate of return that makes NPV zero'
    },
    {
      name: 'Profitability Index',
      formula: 'PI = Present Value / Land Value',
      description: 'Ratio of present value to initial investment'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Years when cumulative cash flow = 0',
      description: 'Time to recover initial investment'
    },
    {
      name: 'Risk-Adjusted Return',
      formula: 'RAR = Total Return / Risk Score',
      description: 'Return adjusted for investment risk'
    },
    {
      name: 'Inflation Hedge Score',
      formula: 'IHS = (Rent Escalation Rate - Inflation Rate) / 2',
      description: 'Protection against inflation (1-10 scale)'
    },
    {
      name: 'Liquidity Score',
      formula: 'LS = Market Liquidity Factor × Property Type Factor',
      description: 'Investment liquidity rating (1-10 scale)'
    }
  ],
  examples: [
    {
      name: 'Urban Commercial Ground Lease',
      inputs: {
        landValue: 2000000,
        leaseTerm: 99,
        annualRent: 120000,
        rentEscalation: 2.5,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'triple-net',
        propertyType: 'commercial',
        location: 'urban',
        marketType: 'hot',
        tenantCredit: 'A',
        paymentFrequency: 'monthly',
        operatingExpenses: 10000,
        propertyTaxes: 30000,
        insurance: 5000,
        maintenance: 3000,
        managementFees: 2000,
        vacancyRate: 2,
        collectionLoss: 1,
        inflationRate: 2.0,
        taxRate: 25,
        riskScore: 4,
        marketLiquidity: 'high'
      },
      description: 'High-value urban commercial ground lease with strong tenant credit'
    },
    {
      name: 'Suburban Residential Ground Lease',
      inputs: {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 7.5,
        landAppreciation: 2.5,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        tenantCredit: 'BBB',
        paymentFrequency: 'monthly',
        operatingExpenses: 3000,
        propertyTaxes: 8000,
        insurance: 2000,
        maintenance: 1500,
        managementFees: 1000,
        vacancyRate: 5,
        collectionLoss: 2,
        inflationRate: 2.0,
        taxRate: 22,
        riskScore: 6,
        marketLiquidity: 'medium'
      },
      description: 'Moderate suburban residential ground lease with stable market conditions'
    },
    {
      name: 'Rural Agricultural Ground Lease',
      inputs: {
        landValue: 300000,
        leaseTerm: 30,
        annualRent: 15000,
        rentEscalation: 1.5,
        discountRate: 9.0,
        landAppreciation: 1.5,
        leaseType: 'gross',
        propertyType: 'agricultural',
        location: 'rural',
        marketType: 'declining',
        tenantCredit: 'BB',
        paymentFrequency: 'annually',
        operatingExpenses: 2000,
        propertyTaxes: 5000,
        insurance: 1500,
        maintenance: 1000,
        managementFees: 500,
        vacancyRate: 10,
        collectionLoss: 5,
        inflationRate: 1.5,
        taxRate: 20,
        riskScore: 8,
        marketLiquidity: 'low'
      },
      description: 'Lower-value rural agricultural ground lease with higher risk profile'
    }
  ]
};
