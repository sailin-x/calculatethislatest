import { Calculator } from '@/types/calculator';
import { OpportunityZoneInvestmentCalculator } from './OpportunityZoneInvestmentCalculator';

export const opportunityZoneInvestmentCalculator: Calculator = {
  id: 'opportunity-zone-investment',
  name: 'Opportunity Zone Investment ROI Calculator',
  description: 'Calculate and analyze the return on investment (ROI) for Opportunity Zone investments. Evaluate tax benefits including deferral, exclusion, and basis step-up benefits. Compare performance against traditional investments and assess risk factors to make informed investment decisions.',
  category: 'finance',
  tags: [
    'opportunity-zone',
    'roi',
    'investment',
    'tax-benefits',
    'real-estate',
    'capital-gains',
    'tax-deferral',
    'tax-exclusion',
    'basis-step-up',
    'investment-analysis',
    'risk-assessment',
    'comparison-analysis',
    'financial-modeling',
    'tax-planning',
    'investment-strategy'
  ],
  component: OpportunityZoneInvestmentCalculator,
  inputs: {
    // Investment Information
    investmentAmount: {
      label: 'Investment Amount',
      type: 'number',
      required: true,
      description: 'Total amount invested in the opportunity zone',
      placeholder: '1000000',
      min: 1,
      max: 1000000000,
      step: 1000,
      unit: 'USD'
    },
    investmentDate: {
      label: 'Investment Date',
      type: 'date',
      required: true,
      description: 'Date when the investment was made',
      placeholder: '2023-01-01'
    },
    investmentType: {
      label: 'Investment Type',
      type: 'select',
      required: true,
      description: 'Type of investment in the opportunity zone',
      options: [
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'business', label: 'Business' },
        { value: 'infrastructure', label: 'Infrastructure' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'development', label: 'Development' }
      ]
    },
    investmentStructure: {
      label: 'Investment Structure',
      type: 'select',
      required: true,
      description: 'Structure of the investment',
      options: [
        { value: 'direct', label: 'Direct' },
        { value: 'fund', label: 'Fund' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'syndication', label: 'Syndication' }
      ]
    },

    // Property Information
    propertyValue: {
      label: 'Property Value',
      type: 'number',
      required: true,
      description: 'Current market value of the property',
      placeholder: '1500000',
      min: 1,
      max: 1000000000,
      step: 1000,
      unit: 'USD'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property being invested in',
      options: [
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'land', label: 'Land' },
        { value: 'other', label: 'Other' }
      ]
    },
    propertySize: {
      label: 'Property Size',
      type: 'number',
      required: true,
      description: 'Size of the property in square feet',
      placeholder: '20000',
      min: 1,
      max: 10000000,
      step: 100,
      unit: 'sq ft'
    },
    numberOfUnits: {
      label: 'Number of Units',
      type: 'number',
      required: false,
      description: 'Number of units in the property (if applicable)',
      placeholder: '50',
      min: 0,
      max: 10000,
      step: 1
    },

    // Opportunity Zone Information
    opportunityZoneLocation: {
      label: 'Zone Location',
      type: 'text',
      required: true,
      description: 'Location of the opportunity zone',
      placeholder: 'Zone City, State'
    },
    opportunityZoneTier: {
      label: 'Zone Tier',
      type: 'select',
      required: true,
      description: 'Tier classification of the opportunity zone',
      options: [
        { value: 'tier_1', label: 'Tier 1 (Low Income)' },
        { value: 'tier_2', label: 'Tier 2 (Contiguous)' },
        { value: 'tier_3', label: 'Tier 3 (Other)' }
      ]
    },

    // Tax Information
    originalGainAmount: {
      label: 'Original Gain Amount',
      type: 'number',
      required: true,
      description: 'Amount of the original capital gain being reinvested',
      placeholder: '500000',
      min: 1,
      max: 1000000000,
      step: 1000,
      unit: 'USD'
    },
    originalGainType: {
      label: 'Gain Type',
      type: 'select',
      required: true,
      description: 'Type of the original gain',
      options: [
        { value: 'capital_gain', label: 'Capital Gain' },
        { value: 'ordinary_income', label: 'Ordinary Income' },
        { value: 'mixed', label: 'Mixed' }
      ]
    },
    investorTaxRate: {
      label: 'Investor Tax Rate',
      type: 'number',
      required: true,
      description: 'Investor\'s marginal tax rate',
      placeholder: '23.8',
      min: 0,
      max: 100,
      step: 0.1,
      unit: '%'
    },
    stateTaxRate: {
      label: 'State Tax Rate',
      type: 'number',
      required: true,
      description: 'State tax rate',
      placeholder: '5.0',
      min: 0,
      max: 100,
      step: 0.1,
      unit: '%'
    },
    localTaxRate: {
      label: 'Local Tax Rate',
      type: 'number',
      required: true,
      description: 'Local tax rate',
      placeholder: '2.0',
      min: 0,
      max: 100,
      step: 0.1,
      unit: '%'
    },

    // Investment Timeline
    investmentPeriod: {
      label: 'Investment Period',
      type: 'number',
      required: true,
      description: 'Length of the investment in years',
      placeholder: '10',
      min: 1,
      max: 30,
      step: 1,
      unit: 'years'
    },
    deferralPeriod: {
      label: 'Deferral Period',
      type: 'number',
      required: true,
      description: 'Period for tax deferral in years',
      placeholder: '7',
      min: 0,
      max: 30,
      step: 1,
      unit: 'years'
    },
    exclusionPeriod: {
      label: 'Exclusion Period',
      type: 'number',
      required: true,
      description: 'Period for tax exclusion in years',
      placeholder: '5',
      min: 0,
      max: 30,
      step: 1,
      unit: 'years'
    },

    // Investment Returns
    expectedAnnualReturn: {
      label: 'Expected Annual Return',
      type: 'number',
      required: true,
      description: 'Expected annual return on investment',
      placeholder: '12.0',
      min: -100,
      max: 1000,
      step: 0.1,
      unit: '%'
    },
    expectedAppreciation: {
      label: 'Expected Appreciation',
      type: 'number',
      required: true,
      description: 'Expected annual property appreciation',
      placeholder: '5.0',
      min: -100,
      max: 1000,
      step: 0.1,
      unit: '%'
    },
    expectedCashFlow: {
      label: 'Expected Cash Flow',
      type: 'number',
      required: true,
      description: 'Expected annual cash flow return',
      placeholder: '8.0',
      min: -100,
      max: 1000,
      step: 0.1,
      unit: '%'
    },
    expectedExitValue: {
      label: 'Expected Exit Value',
      type: 'number',
      required: true,
      description: 'Expected property value at exit',
      placeholder: '2500000',
      min: 1,
      max: 1000000000,
      step: 1000,
      unit: 'USD'
    },

    // Risk Factors
    marketRisk: {
      label: 'Market Risk',
      type: 'select',
      required: true,
      description: 'Level of market risk',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    regulatoryRisk: {
      label: 'Regulatory Risk',
      type: 'select',
      required: true,
      description: 'Level of regulatory risk',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    liquidityRisk: {
      label: 'Liquidity Risk',
      type: 'select',
      required: true,
      description: 'Level of liquidity risk',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    developmentRisk: {
      label: 'Development Risk',
      type: 'select',
      required: true,
      description: 'Level of development risk',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  },
  outputs: {
    totalReturn: {
      label: 'Total Return',
      type: 'percentage',
      description: 'Total return on investment before tax benefits'
    },
    afterTaxReturn: {
      label: 'After-Tax Return',
      type: 'percentage',
      description: 'Total return on investment after tax benefits'
    },
    internalRateOfReturn: {
      label: 'Internal Rate of Return (IRR)',
      type: 'percentage',
      description: 'Internal rate of return on the investment'
    },
    totalTaxBenefit: {
      label: 'Total Tax Benefit',
      type: 'currency',
      description: 'Total tax benefits from opportunity zone investment'
    },
    taxDeferralBenefit: {
      label: 'Tax Deferral Benefit',
      type: 'currency',
      description: 'Tax benefit from deferring capital gains'
    },
    taxExclusionBenefit: {
      label: 'Tax Exclusion Benefit',
      type: 'currency',
      description: 'Tax benefit from excluding gains from taxation'
    },
    basisStepUpBenefit: {
      label: 'Basis Step-Up Benefit',
      type: 'currency',
      description: 'Tax benefit from stepping up basis to fair market value'
    },
    cashOnCashReturn: {
      label: 'Cash-on-Cash Return',
      type: 'percentage',
      description: 'Annual cash flow return on invested capital'
    },
    equityMultiple: {
      label: 'Equity Multiple',
      type: 'number',
      description: 'Total return multiple on invested equity'
    },
    netPresentValue: {
      label: 'Net Present Value (NPV)',
      type: 'currency',
      description: 'Net present value of the investment'
    },
    paybackPeriod: {
      label: 'Payback Period',
      type: 'number',
      description: 'Time to recover initial investment',
      unit: 'years'
    },
    effectiveTaxRate: {
      label: 'Effective Tax Rate',
      type: 'percentage',
      description: 'Effective tax rate after opportunity zone benefits'
    },
    riskScore: {
      label: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (0-100)'
    }
  },
  features: [
    'Comprehensive ROI calculation for opportunity zone investments',
    'Tax benefit analysis including deferral, exclusion, and basis step-up',
    'Risk assessment and scoring',
    'Comparison analysis against traditional investments',
    'Investment timeline management',
    'Revenue projection modeling',
    'Market condition analysis',
    'Regulatory compliance tracking',
    'Liquidity risk assessment',
    'Development risk evaluation',
    'Investment recommendation generation',
    'Detailed financial metrics breakdown',
    'After-tax return calculations',
    'Cash flow analysis',
    'Equity multiple calculations',
    'Net present value analysis',
    'Payback period calculation',
    'Effective tax rate computation',
    'Investment rating system',
    'Key strengths and weaknesses identification'
  ],
  examples: [
    {
      name: 'High-Growth Urban Opportunity Zone',
      description: 'A $1M investment in a Tier 1 opportunity zone with strong market growth and tax benefits',
      inputs: {
        investmentAmount: 1000000,
        propertyValue: 1500000,
        expectedAnnualReturn: 15.0,
        expectedAppreciation: 6.0,
        marketRisk: 'medium',
        regulatoryRisk: 'low',
        liquidityRisk: 'medium',
        developmentRisk: 'low'
      }
    },
    {
      name: 'Conservative Suburban Investment',
      description: 'A $500K investment in a stable suburban opportunity zone with moderate returns',
      inputs: {
        investmentAmount: 500000,
        propertyValue: 750000,
        expectedAnnualReturn: 8.0,
        expectedAppreciation: 3.0,
        marketRisk: 'low',
        regulatoryRisk: 'low',
        liquidityRisk: 'high',
        developmentRisk: 'low'
      }
    },
    {
      name: 'High-Risk Development Project',
      description: 'A $2M investment in a development project with high potential returns and risks',
      inputs: {
        investmentAmount: 2000000,
        propertyValue: 3000000,
        expectedAnnualReturn: 20.0,
        expectedAppreciation: 8.0,
        marketRisk: 'high',
        regulatoryRisk: 'medium',
        liquidityRisk: 'high',
        developmentRisk: 'high'
      }
    }
  ],
  relatedCalculators: [
    'real-estate-investment-roi',
    'capital-gains-tax',
    'investment-property-calculator',
    'real-estate-cash-flow',
    'investment-return-calculator',
    'tax-deferral-calculator',
    'real-estate-comparison',
    'investment-risk-assessment',
    'real-estate-valuation',
    'investment-portfolio-analysis'
  ]
};