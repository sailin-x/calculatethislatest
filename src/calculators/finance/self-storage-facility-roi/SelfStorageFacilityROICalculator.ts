import { Calculator } from '../../../types/Calculator';
import { calculateSelfStorageFacilityROI } from './formulas';
import { generateSelfStorageFacilityROIAnalysis } from './formulas';

export interface SelfStorageFacilityROIInputs {
  // Property Details
  propertyValue: number;
  purchasePrice: number;
  squareFootage: number;
  unitCount: number;
  averageUnitSize: number;
  propertyAge: number;
  propertyType: 'indoor' | 'outdoor' | 'climate-controlled' | 'mixed';
  
  // Financial Details
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  closingCosts: number;
  
  // Revenue Assumptions
  averageOccupancyRate: number;
  averageRentPerSqFt: number;
  lateFees: number;
  insuranceSales: number;
  packingSupplySales: number;
  otherAncillaryIncome: number;
  
  // Operating Expenses
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  managementFees: number;
  marketing: number;
  administrative: number;
  security: number;
  landscaping: number;
  pestControl: number;
  trashRemoval: number;
  
  // Market Factors
  marketGrowthRate: number;
  rentGrowthRate: number;
  expenseGrowthRate: number;
  vacancyRate: number;
  
  // Investment Timeline
  holdingPeriod: number;
  exitCapRate: number;
  appreciationRate: number;
  
  // Additional Factors
  locationQuality: 'prime' | 'secondary' | 'tertiary';
  competitionLevel: 'low' | 'medium' | 'high';
  economicConditions: 'growing' | 'stable' | 'declining';
  regulatoryEnvironment: 'favorable' | 'neutral' | 'restrictive';
}

export interface SelfStorageFacilityROIOutputs {
  // Financial Metrics
  totalInvestment: number;
  annualRevenue: number;
  annualExpenses: number;
  netOperatingIncome: number;
  cashOnCashReturn: number;
  capRate: number;
  totalROI: number;
  internalRateOfReturn: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  breakEvenOccupancy: number;
  
  // Property Performance
  grossRentMultiplier: number;
  pricePerSqFt: number;
  pricePerUnit: number;
  revenuePerSqFt: number;
  expenseRatio: number;
  
  // Investment Analysis
  paybackPeriod: number;
  netPresentValue: number;
  profitMargin: number;
  debtServiceCoverageRatio: number;
  
  // Market Analysis
  marketValue: number;
  equityBuildUp: number;
  totalReturn: number;
  appreciationValue: number;
  
  // Risk Assessment
  riskScore: number;
  marketRisk: number;
  operationalRisk: number;
  financialRisk: number;
  
  // Recommendations
  recommendation: string;
  investmentGrade: 'A' | 'B' | 'C' | 'D';
  keyStrengths: string[];
  keyRisks: string[];
  improvementSuggestions: string[];
}

export const SelfStorageFacilityROICalculator: Calculator = {
  id: 'self-storage-facility-roi-calculator',
  name: 'Self-Storage Facility ROI Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate return on investment for self-storage facilities, including cash flow analysis, market performance metrics, and investment risk assessment.',
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      required: true,
      unit: 'USD',
      description: 'Current market value of the self-storage facility',
      min: 100000,
      max: 100000000,
      step: 10000
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      required: true,
      unit: 'USD',
      description: 'Price paid or offered for the facility',
      min: 100000,
      max: 100000000,
      step: 10000
    },
    {
      id: 'squareFootage',
      name: 'Total Square Footage',
      type: 'number',
      required: true,
      unit: 'sq ft',
      description: 'Total rentable square footage of the facility',
      min: 1000,
      max: 1000000,
      step: 100
    },
    {
      id: 'unitCount',
      name: 'Number of Units',
      type: 'number',
      required: true,
      description: 'Total number of storage units available',
      min: 10,
      max: 10000,
      step: 1
    },
    {
      id: 'averageUnitSize',
      name: 'Average Unit Size',
      type: 'number',
      required: true,
      unit: 'sq ft',
      description: 'Average size of storage units',
      min: 5,
      max: 1000,
      step: 1
    },
    {
      id: 'propertyAge',
      name: 'Property Age',
      type: 'number',
      required: true,
      unit: 'years',
      description: 'Age of the facility in years',
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'indoor', label: 'Indoor' },
        { value: 'outdoor', label: 'Outdoor' },
        { value: 'climate-controlled', label: 'Climate Controlled' },
        { value: 'mixed', label: 'Mixed' }
      ],
      description: 'Type of storage facility'
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      required: true,
      unit: 'USD',
      description: 'Initial down payment amount',
      min: 0,
      max: 100000000,
      step: 1000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Annual interest rate on financing',
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      required: true,
      unit: 'years',
      description: 'Length of the loan in years',
      min: 1,
      max: 30,
      step: 1
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      required: true,
      unit: 'USD',
      description: 'Total closing costs and fees',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'averageOccupancyRate',
      name: 'Average Occupancy Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Average occupancy rate of the facility',
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'averageRentPerSqFt',
      name: 'Average Rent per Sq Ft',
      type: 'number',
      required: true,
      unit: 'USD/sq ft/month',
      description: 'Average monthly rent per square foot',
      min: 0.1,
      max: 10,
      step: 0.1
    },
    {
      id: 'lateFees',
      name: 'Late Fees',
      type: 'number',
      required: false,
      unit: 'USD/month',
      description: 'Average monthly late fees collected',
      min: 0,
      max: 10000,
      step: 100
    },
    {
      id: 'insuranceSales',
      name: 'Insurance Sales',
      type: 'number',
      required: false,
      unit: 'USD/month',
      description: 'Monthly revenue from tenant insurance sales',
      min: 0,
      max: 10000,
      step: 100
    },
    {
      id: 'packingSupplySales',
      name: 'Packing Supply Sales',
      type: 'number',
      required: false,
      unit: 'USD/month',
      description: 'Monthly revenue from packing supplies',
      min: 0,
      max: 10000,
      step: 100
    },
    {
      id: 'otherAncillaryIncome',
      name: 'Other Ancillary Income',
      type: 'number',
      required: false,
      unit: 'USD/month',
      description: 'Other monthly ancillary income',
      min: 0,
      max: 10000,
      step: 100
    },
    {
      id: 'propertyTaxes',
      name: 'Property Taxes',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual property taxes',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual property insurance costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual utility costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual maintenance costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'managementFees',
      name: 'Management Fees',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual property management fees',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'marketing',
      name: 'Marketing',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual marketing and advertising costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'administrative',
      name: 'Administrative',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual administrative costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'security',
      name: 'Security',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual security costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'landscaping',
      name: 'Landscaping',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual landscaping costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'pestControl',
      name: 'Pest Control',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual pest control costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'trashRemoval',
      name: 'Trash Removal',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual trash removal costs',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'marketGrowthRate',
      name: 'Market Growth Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected annual market growth rate',
      min: -10,
      max: 20,
      step: 0.5
    },
    {
      id: 'rentGrowthRate',
      name: 'Rent Growth Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected annual rent growth rate',
      min: -5,
      max: 15,
      step: 0.5
    },
    {
      id: 'expenseGrowthRate',
      name: 'Expense Growth Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected annual expense growth rate',
      min: 0,
      max: 10,
      step: 0.5
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected vacancy rate',
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'holdingPeriod',
      name: 'Holding Period',
      type: 'number',
      required: true,
      unit: 'years',
      description: 'Expected holding period for the investment',
      min: 1,
      max: 30,
      step: 1
    },
    {
      id: 'exitCapRate',
      name: 'Exit Cap Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected cap rate at exit',
      min: 2,
      max: 15,
      step: 0.1
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Expected annual property appreciation rate',
      min: -5,
      max: 10,
      step: 0.5
    },
    {
      id: 'locationQuality',
      name: 'Location Quality',
      type: 'select',
      required: true,
      options: [
        { value: 'prime', label: 'Prime' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'tertiary', label: 'Tertiary' }
      ],
      description: 'Quality of the facility location'
    },
    {
      id: 'competitionLevel',
      name: 'Competition Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      description: 'Level of competition in the market'
    },
    {
      id: 'economicConditions',
      name: 'Economic Conditions',
      type: 'select',
      required: true,
      options: [
        { value: 'growing', label: 'Growing' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ],
      description: 'Current economic conditions in the market'
    },
    {
      id: 'regulatoryEnvironment',
      name: 'Regulatory Environment',
      type: 'select',
      required: true,
      options: [
        { value: 'favorable', label: 'Favorable' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'restrictive', label: 'Restrictive' }
      ],
      description: 'Regulatory environment for self-storage facilities'
    }
  ],
  outputs: [
    {
      id: 'totalInvestment',
      name: 'Total Investment',
      type: 'number',
      unit: 'USD',
      description: 'Total amount invested including down payment and closing costs'
    },
    {
      id: 'annualRevenue',
      name: 'Annual Revenue',
      type: 'number',
      unit: 'USD',
      description: 'Total annual revenue from all sources'
    },
    {
      id: 'annualExpenses',
      name: 'Annual Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income (revenue minus expenses)'
    },
    {
      id: 'cashOnCashReturn',
      name: 'Cash on Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual cash return on total investment'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate based on NOI and property value'
    },
    {
      id: 'totalROI',
      name: 'Total ROI',
      type: 'number',
      unit: '%',
      description: 'Total return on investment over holding period'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return over holding period'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Average monthly cash flow'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Annual cash flow after debt service'
    },
    {
      id: 'totalCashFlow',
      name: 'Total Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Total cash flow over holding period'
    },
    {
      id: 'breakEvenOccupancy',
      name: 'Break-Even Occupancy',
      type: 'number',
      unit: '%',
      description: 'Occupancy rate needed to break even'
    },
    {
      id: 'grossRentMultiplier',
      name: 'Gross Rent Multiplier',
      type: 'number',
      description: 'Property value divided by gross annual rent'
    },
    {
      id: 'pricePerSqFt',
      name: 'Price per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Purchase price per square foot'
    },
    {
      id: 'pricePerUnit',
      name: 'Price per Unit',
      type: 'number',
      unit: 'USD/unit',
      description: 'Purchase price per storage unit'
    },
    {
      id: 'revenuePerSqFt',
      name: 'Revenue per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft/year',
      description: 'Annual revenue per square foot'
    },
    {
      id: 'expenseRatio',
      name: 'Expense Ratio',
      type: 'number',
      unit: '%',
      description: 'Operating expenses as percentage of revenue'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover initial investment'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: 'USD',
      description: 'Net present value of the investment'
    },
    {
      id: 'profitMargin',
      name: 'Profit Margin',
      type: 'number',
      unit: '%',
      description: 'Profit margin as percentage of revenue'
    },
    {
      id: 'debtServiceCoverageRatio',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      description: 'NOI divided by annual debt service'
    },
    {
      id: 'marketValue',
      name: 'Market Value',
      type: 'number',
      unit: 'USD',
      description: 'Estimated market value at exit'
    },
    {
      id: 'equityBuildUp',
      name: 'Equity Build-Up',
      type: 'number',
      unit: 'USD',
      description: 'Equity build-up over holding period'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total return including appreciation and cash flow'
    },
    {
      id: 'appreciationValue',
      name: 'Appreciation Value',
      type: 'number',
      unit: 'USD',
      description: 'Value appreciation over holding period'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'marketRisk',
      name: 'Market Risk',
      type: 'number',
      description: 'Market risk assessment score (1-100)'
    },
    {
      id: 'operationalRisk',
      name: 'Operational Risk',
      type: 'number',
      description: 'Operational risk assessment score (1-100)'
    },
    {
      id: 'financialRisk',
      name: 'Financial Risk',
      type: 'number',
      description: 'Financial risk assessment score (1-100)'
    },
    {
      id: 'recommendation',
      name: 'Recommendation',
      type: 'string',
      description: 'Investment recommendation based on analysis'
    },
    {
      id: 'investmentGrade',
      name: 'Investment Grade',
      type: 'string',
      description: 'Investment grade rating (A, B, C, D)'
    },
    {
      id: 'keyStrengths',
      name: 'Key Strengths',
      type: 'array',
      description: 'Key strengths of the investment'
    },
    {
      id: 'keyRisks',
      name: 'Key Risks',
      type: 'array',
      description: 'Key risks associated with the investment'
    },
    {
      id: 'improvementSuggestions',
      name: 'Improvement Suggestions',
      type: 'array',
      description: 'Suggestions to improve investment performance'
    }
  ],
  calculate: (inputs: SelfStorageFacilityROIInputs) => {
    return calculateSelfStorageFacilityROI(inputs);
  },
  generateReport: (inputs: SelfStorageFacilityROIInputs, outputs: SelfStorageFacilityROIOutputs) => {
    return generateSelfStorageFacilityROIAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Net Operating Income',
      formula: 'NOI = Annual Revenue - Annual Expenses',
      description: 'Net operating income calculation'
    },
    {
      name: 'Cash on Cash Return',
      formula: 'CoC = (Annual Cash Flow / Total Investment) × 100',
      description: 'Cash on cash return calculation'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (NOI / Property Value) × 100',
      description: 'Capitalization rate calculation'
    },
    {
      name: 'Gross Rent Multiplier',
      formula: 'GRM = Property Value / Annual Revenue',
      description: 'Gross rent multiplier calculation'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = NOI / Annual Debt Service',
      description: 'Debt service coverage ratio calculation'
    },
    {
      name: 'Break-Even Occupancy',
      formula: 'Break-Even = (Annual Expenses / Annual Revenue at 100% Occupancy) × 100',
      description: 'Break-even occupancy rate calculation'
    }
  ],
  examples: [
    {
      name: 'Small Indoor Facility',
      inputs: {
        propertyValue: 1500000,
        purchasePrice: 1400000,
        squareFootage: 25000,
        unitCount: 200,
        averageUnitSize: 125,
        propertyAge: 5,
        propertyType: 'indoor',
        downPayment: 350000,
        interestRate: 6.5,
        loanTerm: 25,
        closingCosts: 35000,
        averageOccupancyRate: 85,
        averageRentPerSqFt: 1.2,
        lateFees: 500,
        insuranceSales: 800,
        packingSupplySales: 300,
        otherAncillaryIncome: 200,
        propertyTaxes: 15000,
        insurance: 12000,
        utilities: 8000,
        maintenance: 10000,
        managementFees: 15000,
        marketing: 5000,
        administrative: 8000,
        security: 6000,
        landscaping: 3000,
        pestControl: 2000,
        trashRemoval: 1500,
        marketGrowthRate: 3.0,
        rentGrowthRate: 2.5,
        expenseGrowthRate: 2.0,
        vacancyRate: 15,
        holdingPeriod: 10,
        exitCapRate: 7.5,
        appreciationRate: 2.0,
        locationQuality: 'secondary',
        competitionLevel: 'medium',
        economicConditions: 'stable',
        regulatoryEnvironment: 'neutral'
      }
    },
    {
      name: 'Large Climate-Controlled Facility',
      inputs: {
        propertyValue: 5000000,
        purchasePrice: 4800000,
        squareFootage: 80000,
        unitCount: 600,
        averageUnitSize: 133,
        propertyAge: 3,
        propertyType: 'climate-controlled',
        downPayment: 1200000,
        interestRate: 6.0,
        loanTerm: 25,
        closingCosts: 120000,
        averageOccupancyRate: 92,
        averageRentPerSqFt: 1.8,
        lateFees: 1500,
        insuranceSales: 2500,
        packingSupplySales: 800,
        otherAncillaryIncome: 500,
        propertyTaxes: 45000,
        insurance: 35000,
        utilities: 25000,
        maintenance: 20000,
        managementFees: 40000,
        marketing: 12000,
        administrative: 15000,
        security: 12000,
        landscaping: 8000,
        pestControl: 4000,
        trashRemoval: 3000,
        marketGrowthRate: 4.0,
        rentGrowthRate: 3.0,
        expenseGrowthRate: 2.5,
        vacancyRate: 8,
        holdingPeriod: 15,
        exitCapRate: 6.5,
        appreciationRate: 3.0,
        locationQuality: 'prime',
        competitionLevel: 'low',
        economicConditions: 'growing',
        regulatoryEnvironment: 'favorable'
      }
    },
    {
      name: 'Outdoor Storage Facility',
      inputs: {
        propertyValue: 800000,
        purchasePrice: 750000,
        squareFootage: 15000,
        unitCount: 100,
        averageUnitSize: 150,
        propertyAge: 8,
        propertyType: 'outdoor',
        downPayment: 187500,
        interestRate: 7.0,
        loanTerm: 20,
        closingCosts: 20000,
        averageOccupancyRate: 78,
        averageRentPerSqFt: 0.8,
        lateFees: 300,
        insuranceSales: 400,
        packingSupplySales: 150,
        otherAncillaryIncome: 100,
        propertyTaxes: 8000,
        insurance: 6000,
        utilities: 3000,
        maintenance: 8000,
        managementFees: 10000,
        marketing: 3000,
        administrative: 5000,
        security: 4000,
        landscaping: 2000,
        pestControl: 1500,
        trashRemoval: 1000,
        marketGrowthRate: 2.0,
        rentGrowthRate: 1.5,
        expenseGrowthRate: 2.5,
        vacancyRate: 22,
        holdingPeriod: 8,
        exitCapRate: 8.5,
        appreciationRate: 1.5,
        locationQuality: 'tertiary',
        competitionLevel: 'high',
        economicConditions: 'stable',
        regulatoryEnvironment: 'neutral'
      }
    }
  ],
  tags: [
    'self-storage',
    'real-estate',
    'investment',
    'roi',
    'cash-flow',
    'commercial-property',
    'storage-facility',
    'property-management',
    'investment-analysis',
    'real-estate-investment'
  ],
  references: [
    {
      title: 'Self-Storage Industry Report',
      url: 'https://www.insideselfstorage.com/industry-data',
      description: 'Comprehensive industry data and trends'
    },
    {
      title: 'Self-Storage Investment Guide',
      url: 'https://www.nareit.com/investing/investment-guides/self-storage',
      description: 'Investment guide for self-storage facilities'
    },
    {
      title: 'Self-Storage Market Analysis',
      url: 'https://www.cbre.com/insights/reports/us-self-storage-market-report',
      description: 'Market analysis and performance metrics'
    }
  ]
};