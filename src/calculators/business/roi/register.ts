import { CalculatorRegistration } from '../../types/calculator';
import { calculateROI } from './formulas';
import { validateROIInputs } from './validation';
import { ROIInputs } from './types';

const roiCalculator: CalculatorRegistration = {
  id: 'roi',
  name: 'ROI Calculator',
  description: 'Comprehensive return on investment analysis with risk assessment, sensitivity analysis, and optimization insights',
  category: 'business',
  tags: ['roi', 'return-on-investment', 'investment-analysis', 'financial-metrics', 'risk-assessment', 'npv', 'irr', 'payback-period', 'business-metrics'],
  inputs: {
    initialInvestment: {
      type: 'number',
      label: 'Initial Investment',
      required: true,
      min: 0.01,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter initial investment amount',
      description: 'The initial amount invested'
    },
    finalValue: {
      type: 'number',
      label: 'Final Value',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter final value',
      description: 'The final value of the investment'
    },
    totalReturn: {
      type: 'number',
      label: 'Total Return',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter total return',
      description: 'Total return from the investment'
    },
    investmentPeriod: {
      type: 'number',
      label: 'Investment Period (months)',
      required: true,
      min: 1,
      max: 600,
      step: 1,
      placeholder: 'Enter investment period in months',
      description: 'Duration of the investment in months'
    },
    startDate: {
      type: 'date',
      label: 'Start Date',
      required: true,
      placeholder: 'Select start date',
      description: 'Investment start date'
    },
    endDate: {
      type: 'date',
      label: 'End Date',
      required: true,
      placeholder: 'Select end date',
      description: 'Investment end date'
    },
    investmentType: {
      type: 'select',
      label: 'Investment Type',
      required: true,
      options: [
        { value: 'business', label: 'Business Investment' },
        { value: 'marketing', label: 'Marketing Campaign' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'stocks', label: 'Stocks' },
        { value: 'crypto', label: 'Cryptocurrency' },
        { value: 'startup', label: 'Startup' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'software', label: 'Software' },
        { value: 'advertising', label: 'Advertising' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'Select investment type',
      description: 'Type of investment'
    },
    investmentCategory: {
      type: 'select',
      label: 'Investment Category',
      required: true,
      options: [
        { value: 'capital-expenditure', label: 'Capital Expenditure' },
        { value: 'operational-expense', label: 'Operational Expense' },
        { value: 'marketing-campaign', label: 'Marketing Campaign' },
        { value: 'acquisition', label: 'Acquisition' },
        { value: 'development', label: 'Development' },
        { value: 'infrastructure', label: 'Infrastructure' }
      ],
      placeholder: 'Select investment category',
      description: 'Category of investment'
    },
    additionalRevenue: {
      type: 'number',
      label: 'Additional Revenue',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter additional revenue generated',
      description: 'Additional revenue generated from the investment'
    },
    costSavings: {
      type: 'number',
      label: 'Cost Savings',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter cost savings',
      description: 'Cost savings achieved through the investment'
    },
    operationalCosts: {
      type: 'number',
      label: 'Operational Costs',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter operational costs',
      description: 'Ongoing operational costs'
    },
    maintenanceCosts: {
      type: 'number',
      label: 'Maintenance Costs',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter maintenance costs',
      description: 'Maintenance and upkeep costs'
    },
    marketingCosts: {
      type: 'number',
      label: 'Marketing Costs',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter marketing costs',
      description: 'Marketing and promotional costs'
    },
    personnelCosts: {
      type: 'number',
      label: 'Personnel Costs',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter personnel costs',
      description: 'Personnel and labor costs'
    },
    riskLevel: {
      type: 'select',
      label: 'Risk Level',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      placeholder: 'Select risk level',
      description: 'Risk level of the investment'
    },
    marketConditions: {
      type: 'select',
      label: 'Market Conditions',
      required: true,
      options: [
        { value: 'recession', label: 'Recession' },
        { value: 'stable', label: 'Stable' },
        { value: 'growth', label: 'Growth' },
        { value: 'boom', label: 'Boom' }
      ],
      placeholder: 'Select market conditions',
      description: 'Current market conditions'
    },
    competitivePressure: {
      type: 'number',
      label: 'Competitive Pressure (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate competitive pressure from 1-10',
      description: 'Level of competitive pressure in the market'
    },
    regulatoryRisk: {
      type: 'number',
      label: 'Regulatory Risk (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate regulatory risk from 1-10',
      description: 'Level of regulatory risk'
    },
    industry: {
      type: 'select',
      label: 'Industry',
      required: true,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'retail', label: 'Retail' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'services', label: 'Services' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'Select industry',
      description: 'Industry sector'
    },
    businessStage: {
      type: 'select',
      label: 'Business Stage',
      required: true,
      options: [
        { value: 'startup', label: 'Startup' },
        { value: 'growth', label: 'Growth' },
        { value: 'mature', label: 'Mature' },
        { value: 'scale', label: 'Scale' }
      ],
      placeholder: 'Select business stage',
      description: 'Current stage of the business'
    },
    businessModel: {
      type: 'select',
      label: 'Business Model',
      required: true,
      options: [
        { value: 'b2b', label: 'B2B' },
        { value: 'b2c', label: 'B2C' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'subscription', label: 'Subscription' },
        { value: 'transactional', label: 'Transactional' }
      ],
      placeholder: 'Select business model',
      description: 'Business model type'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter discount rate',
      description: 'Discount rate for time value of money calculations'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter inflation rate',
      description: 'Expected inflation rate'
    },
    opportunityCost: {
      type: 'number',
      label: 'Opportunity Cost (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter opportunity cost',
      description: 'Opportunity cost of capital'
    },
    projectionPeriod: {
      type: 'number',
      label: 'Projection Period (months)',
      required: true,
      min: 1,
      max: 120,
      step: 1,
      placeholder: 'Enter projection period',
      description: 'Period for future projections'
    },
    growthRate: {
      type: 'number',
      label: 'Growth Rate (%)',
      required: true,
      min: -50,
      max: 500,
      step: 0.1,
      placeholder: 'Enter growth rate',
      description: 'Expected growth rate'
    },
    decayRate: {
      type: 'number',
      label: 'Decay Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter decay rate',
      description: 'Expected decay rate'
    },
    bestCaseScenario: {
      type: 'number',
      label: 'Best Case Scenario (%)',
      required: true,
      min: 0,
      max: 1000,
      step: 0.1,
      placeholder: 'Enter best case scenario ROI',
      description: 'Best case scenario ROI percentage'
    },
    worstCaseScenario: {
      type: 'number',
      label: 'Worst Case Scenario (%)',
      required: true,
      min: -100,
      max: 100,
      step: 0.1,
      placeholder: 'Enter worst case scenario ROI',
      description: 'Worst case scenario ROI percentage'
    },
    mostLikelyScenario: {
      type: 'number',
      label: 'Most Likely Scenario (%)',
      required: true,
      min: 0,
      max: 500,
      step: 0.1,
      placeholder: 'Enter most likely scenario ROI',
      description: 'Most likely scenario ROI percentage'
    },
    taxRate: {
      type: 'number',
      label: 'Tax Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter tax rate',
      description: 'Applicable tax rate'
    },
    depreciationRate: {
      type: 'number',
      label: 'Depreciation Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter depreciation rate',
      description: 'Depreciation rate for assets'
    },
    salvageValue: {
      type: 'number',
      label: 'Salvage Value',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter salvage value',
      description: 'Salvage value at end of investment period'
    },
    strategicValue: {
      type: 'number',
      label: 'Strategic Value (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate strategic value from 1-10',
      description: 'Strategic value of the investment'
    },
    marketPositioning: {
      type: 'number',
      label: 'Market Positioning (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate market positioning from 1-10',
      description: 'Market positioning strength'
    },
    competitiveAdvantage: {
      type: 'number',
      label: 'Competitive Advantage (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate competitive advantage from 1-10',
      description: 'Competitive advantage strength'
    },
    scalability: {
      type: 'number',
      label: 'Scalability (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Rate scalability from 1-10',
      description: 'Scalability potential'
    }
  },
  calculate: (inputs: ROIInputs, allInputs?: Record<string, any>) => {
    return calculateROI(inputs, allInputs);
  },
  validate: (inputs: ROIInputs, allInputs?: Record<string, any>) => {
    return validateROIInputs(inputs, allInputs);
  },
  examples: [
    {
      name: 'Business Investment',
      inputs: {
        initialInvestment: 100000,
        finalValue: 150000,
        totalReturn: 50000,
        investmentPeriod: 12,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        investmentType: 'business',
        investmentCategory: 'capital-expenditure',
        additionalRevenue: 20000,
        costSavings: 10000,
        operationalCosts: 5000,
        maintenanceCosts: 2000,
        marketingCosts: 8000,
        personnelCosts: 15000,
        riskLevel: 'medium',
        marketConditions: 'stable',
        competitivePressure: 6,
        regulatoryRisk: 4,
        industry: 'technology',
        businessStage: 'growth',
        businessModel: 'b2b',
        discountRate: 10,
        inflationRate: 2,
        opportunityCost: 8,
        projectionPeriod: 24,
        growthRate: 15,
        decayRate: 5,
        bestCaseScenario: 80,
        worstCaseScenario: 20,
        mostLikelyScenario: 50,
        taxRate: 25,
        depreciationRate: 10,
        salvageValue: 5000,
        strategicValue: 8,
        marketPositioning: 7,
        competitiveAdvantage: 6,
        scalability: 8
      }
    },
    {
      name: 'Marketing Campaign',
      inputs: {
        initialInvestment: 50000,
        finalValue: 80000,
        totalReturn: 30000,
        investmentPeriod: 6,
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        investmentType: 'marketing',
        investmentCategory: 'marketing-campaign',
        additionalRevenue: 25000,
        costSavings: 5000,
        operationalCosts: 3000,
        maintenanceCosts: 1000,
        marketingCosts: 50000,
        personnelCosts: 8000,
        riskLevel: 'medium',
        marketConditions: 'growth',
        competitivePressure: 7,
        regulatoryRisk: 3,
        industry: 'retail',
        businessStage: 'growth',
        businessModel: 'b2c',
        discountRate: 12,
        inflationRate: 3,
        opportunityCost: 10,
        projectionPeriod: 12,
        growthRate: 20,
        decayRate: 8,
        bestCaseScenario: 100,
        worstCaseScenario: 30,
        mostLikelyScenario: 60,
        taxRate: 30,
        depreciationRate: 15,
        salvageValue: 2000,
        strategicValue: 6,
        marketPositioning: 8,
        competitiveAdvantage: 7,
        scalability: 6
      }
    },
    {
      name: 'Real Estate Investment',
      inputs: {
        initialInvestment: 500000,
        finalValue: 650000,
        totalReturn: 150000,
        investmentPeriod: 60,
        startDate: '2024-01-01',
        endDate: '2028-12-31',
        investmentType: 'real-estate',
        investmentCategory: 'capital-expenditure',
        additionalRevenue: 30000,
        costSavings: 15000,
        operationalCosts: 12000,
        maintenanceCosts: 8000,
        marketingCosts: 2000,
        personnelCosts: 5000,
        riskLevel: 'low',
        marketConditions: 'stable',
        competitivePressure: 4,
        regulatoryRisk: 6,
        industry: 'real-estate',
        businessStage: 'mature',
        businessModel: 'transactional',
        discountRate: 8,
        inflationRate: 2.5,
        opportunityCost: 6,
        projectionPeriod: 60,
        growthRate: 8,
        decayRate: 2,
        bestCaseScenario: 50,
        worstCaseScenario: 15,
        mostLikelyScenario: 30,
        taxRate: 20,
        depreciationRate: 5,
        salvageValue: 400000,
        strategicValue: 7,
        marketPositioning: 6,
        competitiveAdvantage: 5,
        scalability: 4
      }
    }
  ],
  relatedCalculators: [
    'customer-lifetime-value', 'customer-acquisition-cost', 'churn-rate-calculator', 'business-valuation', 'payback-period'
  ]
};

export default roiCalculator;
