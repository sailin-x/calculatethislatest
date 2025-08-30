import { Calculator } from '@/types/calculator';
import { RealEstateDepreciationScheduleCalculator } from './RealEstateDepreciationScheduleCalculator';

export const realEstateDepreciationScheduleCalculator: Calculator = {
  id: 'real-estate-depreciation-schedule',
  name: 'Real Estate Depreciation Schedule Calculator',
  description: 'Comprehensive depreciation schedule calculator for real estate properties, including straight-line, accelerated, bonus depreciation, cost segregation, and Section 179 analysis. Calculate annual depreciation, tax savings, and generate detailed schedules for tax planning and financial analysis.',
  category: 'finance',
  tags: ['real-estate', 'depreciation', 'tax-planning', 'cost-segregation', 'bonus-depreciation', 'section-179', 'tax-savings', 'financial-analysis', 'property-investment', 'tax-deductions'],
  component: RealEstateDepreciationScheduleCalculator,
  inputs: {
    propertyName: {
      type: 'string',
      label: 'Property Name',
      description: 'Name or identifier for the property',
      required: true,
      placeholder: 'Enter property name'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of real estate property',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'single-family', label: 'Single-Family' },
        { value: 'land-development', label: 'Land Development' }
      ]
    },
    propertyAddress: {
      type: 'string',
      label: 'Property Address',
      description: 'Physical address of the property',
      required: true,
      placeholder: 'Enter property address'
    },
    acquisitionDate: {
      type: 'date',
      label: 'Acquisition Date',
      description: 'Date when the property was acquired',
      required: true
    },
    placedInServiceDate: {
      type: 'date',
      label: 'Placed in Service Date',
      description: 'Date when the property was placed in service for business use',
      required: true
    },
    totalCost: {
      type: 'number',
      label: 'Total Cost',
      description: 'Total cost basis of the property',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: '500000'
    },
    landValue: {
      type: 'number',
      label: 'Land Value',
      description: 'Value allocated to land (not depreciable)',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '100000'
    },
    buildingValue: {
      type: 'number',
      label: 'Building Value',
      description: 'Value allocated to building structure',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '350000'
    },
    improvementsValue: {
      type: 'number',
      label: 'Improvements Value',
      description: 'Value of property improvements',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '50000'
    },
    personalPropertyValue: {
      type: 'number',
      label: 'Personal Property Value',
      description: 'Value of personal property included in purchase',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '0'
    },
    depreciationMethod: {
      type: 'select',
      label: 'Depreciation Method',
      description: 'Method used for depreciation calculations',
      required: true,
      options: [
        { value: 'straight-line', label: 'Straight-Line' },
        { value: 'accelerated', label: 'Accelerated (MACRS)' },
        { value: 'bonus', label: 'Bonus Depreciation' },
        { value: 'cost-segregation', label: 'Cost Segregation' },
        { value: 'section-179', label: 'Section 179' },
        { value: 'bonus-depreciation', label: 'Bonus Depreciation' }
      ]
    },
    recoveryPeriod: {
      type: 'number',
      label: 'Recovery Period (Years)',
      description: 'Number of years over which to depreciate the property',
      required: true,
      min: 1,
      max: 50,
      step: 0.5,
      placeholder: '27.5'
    },
    convention: {
      type: 'select',
      label: 'Convention',
      description: 'Depreciation convention to apply',
      required: true,
      options: [
        { value: 'mid-month', label: 'Mid-Month' },
        { value: 'mid-quarter', label: 'Mid-Quarter' },
        { value: 'half-year', label: 'Half-Year' },
        { value: 'full-year', label: 'Full-Year' }
      ]
    },
    salvageValue: {
      type: 'number',
      label: 'Salvage Value',
      description: 'Estimated salvage value at end of useful life',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '0'
    },
    salvageValuePercentage: {
      type: 'number',
      label: 'Salvage Value (%)',
      description: 'Salvage value as percentage of total cost',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '0'
    },
    costSegregationStudy: {
      type: 'boolean',
      label: 'Cost Segregation Study',
      description: 'Whether a cost segregation study has been performed'
    },
    costSegregationStudyCost: {
      type: 'number',
      label: 'Cost Segregation Study Cost',
      description: 'Cost of the cost segregation study',
      min: 0,
      step: 100,
      placeholder: '0'
    },
    bonusDepreciationEligible: {
      type: 'boolean',
      label: 'Bonus Depreciation Eligible',
      description: 'Whether the property is eligible for bonus depreciation'
    },
    bonusDepreciationPercentage: {
      type: 'number',
      label: 'Bonus Depreciation Percentage',
      description: 'Percentage of bonus depreciation to apply',
      min: 0,
      max: 100,
      step: 1,
      placeholder: '100'
    },
    bonusDepreciationYear: {
      type: 'number',
      label: 'Bonus Depreciation Year',
      description: 'Year in which bonus depreciation is taken',
      min: 2017,
      placeholder: '2024'
    },
    section179Eligible: {
      type: 'boolean',
      label: 'Section 179 Eligible',
      description: 'Whether the property is eligible for Section 179 deduction'
    },
    section179Deduction: {
      type: 'number',
      label: 'Section 179 Deduction',
      description: 'Amount of Section 179 deduction to take',
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    section179Year: {
      type: 'number',
      label: 'Section 179 Year',
      description: 'Year in which Section 179 deduction is taken',
      min: 2017,
      placeholder: '2024'
    },
    dispositionDate: {
      type: 'date',
      label: 'Disposition Date',
      description: 'Date when property is sold or disposed of (optional)'
    },
    dispositionType: {
      type: 'select',
      label: 'Disposition Type',
      description: 'Type of disposition',
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'exchange', label: 'Exchange' },
        { value: 'abandonment', label: 'Abandonment' },
        { value: 'casualty', label: 'Casualty' },
        { value: 'theft', label: 'Theft' },
        { value: 'condemnation', label: 'Condemnation' }
      ]
    },
    dispositionAmount: {
      type: 'number',
      label: 'Disposition Amount',
      description: 'Amount received from disposition',
      min: 0,
      step: 1000,
      placeholder: '0'
    },
    adjustedBasis: {
      type: 'number',
      label: 'Adjusted Basis',
      description: 'Adjusted basis at time of disposition',
      min: 0,
      step: 1000,
      placeholder: '0'
    },
    taxYear: {
      type: 'number',
      label: 'Tax Year',
      description: 'Tax year for calculations',
      required: true,
      min: 2017,
      placeholder: '2024'
    },
    taxRate: {
      type: 'number',
      label: 'Federal Tax Rate (%)',
      description: 'Federal income tax rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '24'
    },
    stateTaxRate: {
      type: 'number',
      label: 'State Tax Rate (%)',
      description: 'State income tax rate',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5'
    },
    localTaxRate: {
      type: 'number',
      label: 'Local Tax Rate (%)',
      description: 'Local income tax rate',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2'
    },
    amtEligible: {
      type: 'boolean',
      label: 'Alternative Minimum Tax',
      description: 'Whether subject to Alternative Minimum Tax'
    },
    amtAdjustments: {
      type: 'number',
      label: 'AMT Adjustments',
      description: 'AMT adjustments to depreciation',
      min: 0,
      step: 1000,
      placeholder: '0'
    },
    passiveActivity: {
      type: 'boolean',
      label: 'Passive Activity',
      description: 'Whether this is a passive activity'
    },
    materialParticipation: {
      type: 'boolean',
      label: 'Material Participation',
      description: 'Whether materially participating in the activity'
    },
    realEstateProfessional: {
      type: 'boolean',
      label: 'Real Estate Professional',
      description: 'Whether taxpayer is a real estate professional'
    },
    reportFormat: {
      type: 'select',
      label: 'Report Format',
      description: 'Format for depreciation reports',
      options: [
        { value: 'detailed', label: 'Detailed' },
        { value: 'summary', label: 'Summary' },
        { value: 'schedule', label: 'Schedule' },
        { value: 'tax-form', label: 'Tax Form' }
      ]
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Whether to include charts in reports'
    },
    includeCalculations: {
      type: 'boolean',
      label: 'Include Calculations',
      description: 'Whether to include calculation details'
    },
    includeTaxImpact: {
      type: 'boolean',
      label: 'Include Tax Impact',
      description: 'Whether to include tax impact analysis'
    },
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for financial calculations',
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ]
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying numbers',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    }
  },
  outputs: {
    metrics: {
      type: 'object',
      label: 'Depreciation Metrics',
      description: 'Key depreciation and tax metrics',
      schema: {
        totalDepreciableBasis: { type: 'number', label: 'Total Depreciable Basis' },
        totalDepreciationTaken: { type: 'number', label: 'Total Depreciation Taken' },
        remainingBasis: { type: 'number', label: 'Remaining Basis' },
        currentYearDepreciation: { type: 'number', label: 'Current Year Depreciation' },
        accumulatedDepreciation: { type: 'number', label: 'Accumulated Depreciation' },
        costSegregationSavings: { type: 'number', label: 'Cost Segregation Savings' },
        acceleratedDepreciation: { type: 'number', label: 'Accelerated Depreciation' },
        bonusDepreciationTaken: { type: 'number', label: 'Bonus Depreciation Taken' },
        section179DeductionTaken: { type: 'number', label: 'Section 179 Deduction Taken' },
        taxSavings: { type: 'number', label: 'Tax Savings' },
        effectiveTaxRate: { type: 'number', label: 'Effective Tax Rate' },
        netTaxBenefit: { type: 'number', label: 'Net Tax Benefit' },
        cashFlowImpact: { type: 'number', label: 'Cash Flow Impact' },
        recoveryPercentage: { type: 'number', label: 'Recovery Percentage' },
        yearsRemaining: { type: 'number', label: 'Years Remaining' },
        annualDepreciation: { type: 'number', label: 'Annual Depreciation' },
        monthlyDepreciation: { type: 'number', label: 'Monthly Depreciation' },
        gainOrLoss: { type: 'number', label: 'Gain or Loss' },
        recapturedDepreciation: { type: 'number', label: 'Recaptured Depreciation' },
        capitalGain: { type: 'number', label: 'Capital Gain' },
        taxLiability: { type: 'number', label: 'Tax Liability' },
        depreciationEfficiency: { type: 'number', label: 'Depreciation Efficiency' },
        taxBenefitRatio: { type: 'number', label: 'Tax Benefit Ratio' },
        cashFlowEnhancement: { type: 'number', label: 'Cash Flow Enhancement' },
        roiOnDepreciation: { type: 'number', label: 'ROI on Depreciation' }
      }
    },
    analysis: {
      type: 'object',
      label: 'Depreciation Analysis',
      description: 'Comprehensive analysis of depreciation strategy',
      schema: {
        depreciationStrategy: { type: 'string', label: 'Depreciation Strategy' },
        strategyScore: { type: 'number', label: 'Strategy Score' },
        keyBenefits: { type: 'array', label: 'Key Benefits', items: { type: 'string' } },
        keyRisks: { type: 'array', label: 'Key Risks', items: { type: 'string' } },
        recommendations: { type: 'array', label: 'Recommendations', items: { type: 'string' } },
        taxAnalysis: { type: 'string', label: 'Tax Analysis' },
        cashFlowAnalysis: { type: 'string', label: 'Cash Flow Analysis' },
        roiAnalysis: { type: 'string', label: 'ROI Analysis' },
        riskAnalysis: { type: 'string', label: 'Risk Analysis' }
      }
    },
    depreciationSchedule: {
      type: 'object',
      label: 'Depreciation Schedule',
      description: 'Annual depreciation schedule',
      schema: {
        propertyName: { type: 'string', label: 'Property Name' },
        propertyType: { type: 'string', label: 'Property Type' },
        acquisitionDate: { type: 'string', label: 'Acquisition Date' },
        totalCost: { type: 'number', label: 'Total Cost' },
        landValue: { type: 'number', label: 'Land Value' },
        depreciableBasis: { type: 'number', label: 'Depreciable Basis' },
        recoveryPeriod: { type: 'number', label: 'Recovery Period' },
        depreciationMethod: { type: 'string', label: 'Depreciation Method' },
        convention: { type: 'string', label: 'Convention' },
        years: { type: 'array', label: 'Years', items: { type: 'object' } },
        totalDepreciation: { type: 'number', label: 'Total Depreciation' },
        remainingBasis: { type: 'number', label: 'Remaining Basis' }
      }
    },
    componentSchedules: {
      type: 'array',
      label: 'Component Schedules',
      description: 'Individual component depreciation schedules for cost segregation',
      items: {
        type: 'object',
        schema: {
          componentName: { type: 'string', label: 'Component Name' },
          componentType: { type: 'string', label: 'Component Type' },
          originalCost: { type: 'number', label: 'Original Cost' },
          recoveryPeriod: { type: 'number', label: 'Recovery Period' },
          depreciationMethod: { type: 'string', label: 'Depreciation Method' },
          years: { type: 'array', label: 'Years', items: { type: 'object' } },
          totalDepreciation: { type: 'number', label: 'Total Depreciation' },
          remainingBasis: { type: 'number', label: 'Remaining Basis' }
        }
      }
    },
    taxImpacts: {
      type: 'array',
      label: 'Tax Impacts',
      description: 'Annual tax impact analysis',
      items: {
        type: 'object',
        schema: {
          year: { type: 'number', label: 'Year' },
          depreciationDeduction: { type: 'number', label: 'Depreciation Deduction' },
          taxSavings: { type: 'number', label: 'Tax Savings' },
          effectiveTaxRate: { type: 'number', label: 'Effective Tax Rate' },
          marginalTaxRate: { type: 'number', label: 'Marginal Tax Rate' },
          netTaxBenefit: { type: 'number', label: 'Net Tax Benefit' },
          cashFlowImpact: { type: 'number', label: 'Cash Flow Impact' }
        }
      }
    },
    costSegregationAnalysis: {
      type: 'object',
      label: 'Cost Segregation Analysis',
      description: 'Analysis of cost segregation benefits',
      schema: {
        eligible: { type: 'boolean', label: 'Eligible' },
        potentialSavings: { type: 'number', label: 'Potential Savings' },
        studyCost: { type: 'number', label: 'Study Cost' },
        netBenefit: { type: 'number', label: 'Net Benefit' },
        paybackPeriod: { type: 'number', label: 'Payback Period' },
        recommended: { type: 'boolean', label: 'Recommended' },
        analysis: { type: 'string', label: 'Analysis' }
      }
    },
    bonusDepreciationAnalysis: {
      type: 'object',
      label: 'Bonus Depreciation Analysis',
      description: 'Analysis of bonus depreciation benefits',
      schema: {
        eligible: { type: 'boolean', label: 'Eligible' },
        maximumDeduction: { type: 'number', label: 'Maximum Deduction' },
        recommendedDeduction: { type: 'number', label: 'Recommended Deduction' },
        taxSavings: { type: 'number', label: 'Tax Savings' },
        analysis: { type: 'string', label: 'Analysis' }
      }
    },
    section179Analysis: {
      type: 'object',
      label: 'Section 179 Analysis',
      description: 'Analysis of Section 179 deduction benefits',
      schema: {
        eligible: { type: 'boolean', label: 'Eligible' },
        maximumDeduction: { type: 'number', label: 'Maximum Deduction' },
        recommendedDeduction: { type: 'number', label: 'Recommended Deduction' },
        taxSavings: { type: 'number', label: 'Tax Savings' },
        analysis: { type: 'string', label: 'Analysis' }
      }
    },
    dispositionAnalysis: {
      type: 'object',
      label: 'Disposition Analysis',
      description: 'Analysis of property disposition tax consequences',
      schema: {
        dispositionType: { type: 'string', label: 'Disposition Type' },
        taxConsequences: { type: 'string', label: 'Tax Consequences' },
        recaptureAmount: { type: 'number', label: 'Recapture Amount' },
        capitalGainAmount: { type: 'number', label: 'Capital Gain Amount' },
        totalTaxLiability: { type: 'number', label: 'Total Tax Liability' },
        recommendations: { type: 'array', label: 'Recommendations', items: { type: 'string' } }
      }
    },
    taxLiabilityAnalysis: {
      type: 'object',
      label: 'Tax Liability Analysis',
      description: 'Analysis of tax liability and savings',
      schema: {
        currentYearTax: { type: 'number', label: 'Current Year Tax' },
        projectedTaxSavings: { type: 'number', label: 'Projected Tax Savings' },
        effectiveTaxRate: { type: 'number', label: 'Effective Tax Rate' },
        marginalTaxRate: { type: 'number', label: 'Marginal Tax Rate' },
        analysis: { type: 'string', label: 'Analysis' }
      }
    },
    depreciationSummary: {
      type: 'string',
      label: 'Depreciation Summary',
      description: 'Summary of depreciation strategy and results'
    },
    recommendations: {
      type: 'array',
      label: 'Recommendations',
      description: 'Recommendations for optimizing depreciation strategy',
      items: { type: 'string' }
    },
    keyMetrics: {
      type: 'object',
      label: 'Key Metrics',
      description: 'Key performance metrics and ratios',
      schema: {
        totalDepreciableBasis: { type: 'number', label: 'Total Depreciable Basis' },
        totalDepreciationTaken: { type: 'number', label: 'Total Depreciation Taken' },
        remainingBasis: { type: 'number', label: 'Remaining Basis' },
        currentYearDepreciation: { type: 'number', label: 'Current Year Depreciation' },
        taxSavings: { type: 'number', label: 'Tax Savings' },
        effectiveTaxRate: { type: 'number', label: 'Effective Tax Rate' },
        cashFlowImpact: { type: 'number', label: 'Cash Flow Impact' },
        recoveryPercentage: { type: 'number', label: 'Recovery Percentage' },
        yearsRemaining: { type: 'number', label: 'Years Remaining' },
        annualDepreciation: { type: 'number', label: 'Annual Depreciation' },
        monthlyDepreciation: { type: 'number', label: 'Monthly Depreciation' },
        depreciationEfficiency: { type: 'number', label: 'Depreciation Efficiency' },
        taxBenefitRatio: { type: 'number', label: 'Tax Benefit Ratio' },
        cashFlowEnhancement: { type: 'number', label: 'Cash Flow Enhancement' },
        roiOnDepreciation: { type: 'number', label: 'ROI on Depreciation' }
      }
    },
    assumptions: {
      type: 'object',
      label: 'Assumptions',
      description: 'Key assumptions used in calculations',
      schema: {
        depreciationMethod: { type: 'string', label: 'Depreciation Method' },
        recoveryPeriod: { type: 'number', label: 'Recovery Period' },
        convention: { type: 'string', label: 'Convention' },
        taxRate: { type: 'number', label: 'Tax Rate' },
        stateTaxRate: { type: 'number', label: 'State Tax Rate' },
        localTaxRate: { type: 'number', label: 'Local Tax Rate' },
        costSegregationStudy: { type: 'boolean', label: 'Cost Segregation Study' },
        bonusDepreciationEligible: { type: 'boolean', label: 'Bonus Depreciation Eligible' },
        section179Eligible: { type: 'boolean', label: 'Section 179 Eligible' },
        amtEligible: { type: 'boolean', label: 'AMT Eligible' },
        passiveActivity: { type: 'boolean', label: 'Passive Activity' },
        realEstateProfessional: { type: 'boolean', label: 'Real Estate Professional' }
      }
    }
  },
  features: [
    'Comprehensive depreciation calculations for all property types',
    'Support for multiple depreciation methods (straight-line, MACRS, bonus, cost segregation)',
    'Section 179 deduction analysis and optimization',
    'Cost segregation study analysis and recommendations',
    'Bonus depreciation calculations and eligibility assessment',
    'Annual depreciation schedule generation',
    'Tax impact analysis and cash flow projections',
    'Disposition analysis with recapture calculations',
    'Alternative Minimum Tax (AMT) considerations',
    'Passive activity and real estate professional status analysis',
    'Property type-specific recovery periods and conventions',
    'Cross-field validation and business logic checks',
    'Detailed reporting with multiple output formats',
    'Comprehensive error handling and validation',
    'Real-time calculation updates',
    'Export capabilities for tax reporting',
    'Scenario analysis and comparison tools',
    'Integration with tax planning strategies'
  ],
  examples: [
    {
      name: 'Residential Rental Property',
      description: 'Calculate depreciation for a $500,000 residential rental property with 27.5-year recovery period',
      inputs: {
        propertyName: 'Residential Rental Property',
        propertyType: 'residential',
        totalCost: 500000,
        landValue: 100000,
        buildingValue: 350000,
        improvementsValue: 50000,
        depreciationMethod: 'straight-line',
        recoveryPeriod: 27.5,
        taxRate: 24
      }
    },
    {
      name: 'Commercial Office Building',
      description: 'Analyze depreciation for a $2M commercial office building with cost segregation study',
      inputs: {
        propertyName: 'Commercial Office Building',
        propertyType: 'office',
        totalCost: 2000000,
        landValue: 400000,
        buildingValue: 1400000,
        improvementsValue: 200000,
        depreciationMethod: 'cost-segregation',
        recoveryPeriod: 39,
        costSegregationStudy: true,
        bonusDepreciationEligible: true
      }
    },
    {
      name: 'Bonus Depreciation Example',
      description: 'Calculate bonus depreciation benefits for eligible property',
      inputs: {
        propertyName: 'Bonus Depreciation Property',
        propertyType: 'commercial',
        totalCost: 1000000,
        landValue: 200000,
        buildingValue: 700000,
        improvementsValue: 100000,
        depreciationMethod: 'bonus',
        recoveryPeriod: 39,
        bonusDepreciationEligible: true,
        bonusDepreciationPercentage: 100
      }
    },
    {
      name: 'Section 179 Deduction',
      description: 'Analyze Section 179 deduction for qualifying property',
      inputs: {
        propertyName: 'Section 179 Property',
        propertyType: 'commercial',
        totalCost: 800000,
        landValue: 150000,
        buildingValue: 550000,
        improvementsValue: 100000,
        depreciationMethod: 'section-179',
        recoveryPeriod: 39,
        section179Eligible: true,
        section179Deduction: 500000
      }
    }
  ],
  relatedCalculators: [
    'real-estate-investment-roi',
    '1031-exchange',
    'real-estate-cash-flow',
    'cap-rate-calculator',
    'real-estate-tax-deductions',
    'mortgage-calculator',
    'real-estate-development-pro-forma',
    'real-estate-crowdfunding',
    'property-tax-calculator',
    'real-estate-investment-analysis'
  ]
};