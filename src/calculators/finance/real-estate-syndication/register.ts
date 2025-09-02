import { CalculatorMetadata } from '@/types/calculators';
import { RealEstateSyndicationCalculator } from './RealEstateSyndicationCalculator';

export const realEstateSyndicationCalculator: CalculatorMetadata = {
  id: 'real-estate-syndication',
  name: 'Real Estate Syndication Calculator',
  description: 'Comprehensive calculator for real estate syndication analysis, including waterfall structures, investor returns, sponsor compensation, and risk assessment.',
  category: 'finance',
  tags: [
    'real-estate',
    'syndication',
    'investment',
    'waterfall',
    'sponsor',
    'investor',
    'returns',
    'irr',
    'cash-flow',
    'risk-assessment',
    'tax-analysis',
    'compliance'
  ],
  component: RealEstateSyndicationCalculator,
  inputs: {
    projectInformation: {
      projectName: { type: 'string', required: true, description: 'Name of the syndication project' },
      projectType: { type: 'select', required: true, description: 'Type of real estate project', options: ['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'] },
      projectAddress: { type: 'string', required: true, description: 'Property address' },
      acquisitionDate: { type: 'date', required: true, description: 'Date of property acquisition' },
      projectedHoldPeriod: { type: 'number', required: true, description: 'Projected hold period in years', min: 1, max: 30 },
      exitStrategy: { type: 'select', required: true, description: 'Planned exit strategy', options: ['sale', 'refinance', '1031-exchange', 'hold', 'partial-sale'] }
    },
    propertyDetails: {
      totalAcquisitionCost: { type: 'currency', required: true, description: 'Total cost to acquire the property' },
      propertyValue: { type: 'currency', required: true, description: 'Current property value' },
      landValue: { type: 'currency', required: true, description: 'Value of the land component' },
      buildingValue: { type: 'currency', required: true, description: 'Value of the building component' },
      squareFootage: { type: 'number', required: true, description: 'Total square footage' },
      numberOfUnits: { type: 'number', required: true, description: 'Number of units in the property' },
      occupancyRate: { type: 'percentage', required: true, description: 'Current occupancy rate', min: 0, max: 100 },
      currentRentRoll: { type: 'currency', required: true, description: 'Annual gross rental income' },
      projectedRentGrowth: { type: 'percentage', required: true, description: 'Projected annual rent growth rate', min: -10, max: 20 },
      operatingExpenses: { type: 'currency', required: true, description: 'Annual operating expenses' },
      operatingExpenseRatio: { type: 'percentage', required: true, description: 'Operating expenses as percentage of gross income', min: 0, max: 100 }
    },
    financingStructure: {
      totalEquityNeeded: { type: 'currency', required: true, description: 'Total equity required for the project' },
      sponsorEquity: { type: 'currency', required: true, description: 'Equity contribution from sponsor' },
      investorEquity: { type: 'currency', required: true, description: 'Equity contribution from investors' },
      debtFinancing: { type: 'currency', required: true, description: 'Amount of debt financing' },
      loanType: { type: 'select', required: true, description: 'Type of loan', options: ['conventional', 'fha', 'usda', 'va', 'hard-money', 'bridge', 'construction', 'permanent'] },
      interestRate: { type: 'percentage', required: true, description: 'Interest rate on the loan', min: 0, max: 25 },
      loanTerm: { type: 'number', required: true, description: 'Loan term in years', min: 1, max: 50 },
      amortizationPeriod: { type: 'number', required: true, description: 'Amortization period in years', min: 1, max: 50 },
      loanPoints: { type: 'percentage', required: true, description: 'Loan points as percentage', min: 0, max: 10 },
      loanFees: { type: 'currency', required: true, description: 'Additional loan fees' }
    },
    syndicationStructure: {
      syndicationType: { type: 'select', required: true, description: 'Type of syndication offering', options: ['506(b)', '506(c)', 'crowdfunding', 'private-placement', 'reit', 'direct-investment'] },
      minimumInvestment: { type: 'currency', required: true, description: 'Minimum investment amount per investor' },
      maximumInvestors: { type: 'number', required: true, description: 'Maximum number of investors allowed', min: 1, max: 2000 },
      sponsorPromote: { type: 'percentage', required: true, description: 'Sponsor promote percentage', min: 0, max: 50 },
      managementFee: { type: 'percentage', required: true, description: 'Annual management fee percentage', min: 0, max: 20 },
      acquisitionFee: { type: 'percentage', required: true, description: 'Acquisition fee percentage', min: 0, max: 10 },
      dispositionFee: { type: 'percentage', required: true, description: 'Disposition fee percentage', min: 0, max: 10 },
      refinanceFee: { type: 'percentage', required: true, description: 'Refinance fee percentage', min: 0, max: 5 }
    },
    waterfallStructure: {
      preferredReturn: { type: 'percentage', required: true, description: 'Preferred return rate for investors', min: 0, max: 20 },
      catchUpPercentage: { type: 'percentage', required: true, description: 'Catch-up percentage for sponsor', min: 0, max: 100 },
      promoteTier1: { type: 'percentage', required: true, description: 'First promote tier percentage', min: 0, max: 50 },
      promoteTier2: { type: 'percentage', required: true, description: 'Second promote tier percentage', min: 0, max: 50 },
      promoteTier3: { type: 'percentage', required: true, description: 'Third promote tier percentage', min: 0, max: 50 },
      tier1Threshold: { type: 'percentage', required: true, description: 'First tier IRR threshold', min: 0, max: 30 },
      tier2Threshold: { type: 'percentage', required: true, description: 'Second tier IRR threshold', min: 0, max: 30 },
      tier3Threshold: { type: 'percentage', required: true, description: 'Third tier IRR threshold', min: 0, max: 30 }
    },
    operatingAssumptions: {
      grossRentMultiplier: { type: 'number', required: true, description: 'Gross rent multiplier', min: 1, max: 50 },
      capRate: { type: 'percentage', required: true, description: 'Capitalization rate', min: 1, max: 20 },
      exitCapRate: { type: 'percentage', required: true, description: 'Exit capitalization rate', min: 1, max: 20 },
      appreciationRate: { type: 'percentage', required: true, description: 'Annual property appreciation rate', min: -10, max: 20 },
      inflationRate: { type: 'percentage', required: true, description: 'Annual inflation rate', min: -5, max: 15 },
      vacancyRate: { type: 'percentage', required: true, description: 'Vacancy rate', min: 0, max: 50 },
      collectionLossRate: { type: 'percentage', required: true, description: 'Collection loss rate', min: 0, max: 20 },
      maintenanceReserve: { type: 'currency', required: true, description: 'Maintenance reserve per unit', min: 0, max: 1000 },
      capitalExpenditureReserve: { type: 'percentage', required: true, description: 'Capital expenditure reserve percentage', min: 0, max: 20 }
    },
    taxInformation: {
      taxRate: { type: 'percentage', required: true, description: 'Federal tax rate', min: 0, max: 50 },
      stateTaxRate: { type: 'percentage', required: true, description: 'State tax rate', min: 0, max: 15 },
      localTaxRate: { type: 'percentage', required: true, description: 'Local tax rate', min: 0, max: 10 },
      depreciationMethod: { type: 'select', required: true, description: 'Depreciation method', options: ['straight-line', 'declining-balance', 'sum-of-years-digits', 'units-of-production'] },
      recoveryPeriod: { type: 'number', required: true, description: 'Depreciation recovery period in years', min: 1, max: 50 },
      bonusDepreciationEligible: { type: 'boolean', required: true, description: 'Whether property is eligible for bonus depreciation' },
      bonusDepreciationPercentage: { type: 'percentage', required: true, description: 'Bonus depreciation percentage', min: 0, max: 100 }
    },
    exitAssumptions: {
      exitYear: { type: 'number', required: true, description: 'Year of planned exit', min: 1, max: 30 },
      exitValue: { type: 'currency', required: true, description: 'Projected exit value' },
      sellingCosts: { type: 'percentage', required: true, description: 'Selling costs as percentage', min: 0, max: 20 },
      refinanceAmount: { type: 'currency', required: true, description: 'Refinance amount if applicable' },
      refinanceCosts: { type: 'percentage', required: true, description: 'Refinance costs as percentage', min: 0, max: 10 }
    },
    investorInformation: {
      investorCount: { type: 'number', required: true, description: 'Number of investors', min: 1, max: 2000 },
      averageInvestment: { type: 'currency', required: true, description: 'Average investment per investor' },
      accreditedInvestorRequirement: { type: 'boolean', required: true, description: 'Whether accredited investors are required' },
      foreignInvestorAllowed: { type: 'boolean', required: true, description: 'Whether foreign investors are allowed' },
      selfDirectedIRAAllowed: { type: 'boolean', required: true, description: 'Whether self-directed IRAs are allowed' }
    },
    complianceLegal: {
      secCompliance: { type: 'boolean', required: true, description: 'SEC compliance required' },
      blueSkyCompliance: { type: 'boolean', required: true, description: 'Blue Sky compliance required' },
      offeringMemorandum: { type: 'boolean', required: true, description: 'Offering memorandum required' },
      operatingAgreement: { type: 'boolean', required: true, description: 'Operating agreement required' },
      subscriptionAgreement: { type: 'boolean', required: true, description: 'Subscription agreement required' },
      legalFees: { type: 'currency', required: true, description: 'Legal fees' },
      accountingFees: { type: 'currency', required: true, description: 'Accounting fees' },
      complianceFees: { type: 'currency', required: true, description: 'Compliance fees' }
    },
    reportingPreferences: {
      reportFormat: { type: 'select', required: true, description: 'Report format preference', options: ['detailed', 'summary', 'executive'] },
      includeCharts: { type: 'boolean', required: true, description: 'Include charts in reports' },
      includeTaxAnalysis: { type: 'boolean', required: true, description: 'Include tax analysis in reports' },
      includeRiskAnalysis: { type: 'boolean', required: true, description: 'Include risk analysis in reports' },
      currency: { type: 'select', required: true, description: 'Currency for calculations', options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] },
      displayFormat: { type: 'select', required: true, description: 'Display format preference', options: ['currency', 'percentage', 'decimal'] }
    }
  },
  outputs: {
    metrics: {
      netOperatingIncome: { type: 'currency', description: 'Net operating income' },
      capRate: { type: 'percentage', description: 'Capitalization rate' },
      totalEquityInvestment: { type: 'currency', description: 'Total equity investment' },
      totalDebtFinancing: { type: 'currency', description: 'Total debt financing' },
      loanToValueRatio: { type: 'percentage', description: 'Loan-to-value ratio' },
      debtService: { type: 'currency', description: 'Annual debt service' },
      cashFlow: { type: 'currency', description: 'Annual cash flow' },
      cashOnCashReturn: { type: 'percentage', description: 'Cash-on-cash return' },
      projectedIRR: { type: 'percentage', description: 'Projected internal rate of return' },
      projectedEquityMultiple: { type: 'decimal', description: 'Projected equity multiple' },
      investorIRR: { type: 'percentage', description: 'Investor IRR' },
      sponsorIRR: { type: 'percentage', description: 'Sponsor IRR' }
    },
    cashFlowProjections: {
      year: { type: 'number', description: 'Year of projection' },
      grossIncome: { type: 'currency', description: 'Projected gross income' },
      netOperatingIncome: { type: 'currency', description: 'Projected net operating income' },
      debtService: { type: 'currency', description: 'Projected debt service' },
      cashFlow: { type: 'currency', description: 'Projected cash flow' },
      cumulativeCashFlow: { type: 'currency', description: 'Cumulative cash flow' }
    },
    waterfallCalculations: {
      tier: { type: 'number', description: 'Waterfall tier number' },
      tierName: { type: 'string', description: 'Name of the tier' },
      irrThreshold: { type: 'percentage', description: 'IRR threshold for the tier' },
      promotePercentage: { type: 'percentage', description: 'Promote percentage for the tier' },
      investorShare: { type: 'percentage', description: 'Investor share percentage' },
      sponsorShare: { type: 'percentage', description: 'Sponsor share percentage' }
    },
    analysis: {
      riskAssessment: {
        overallRisk: { type: 'string', description: 'Overall risk level (low/medium/high)' },
        riskScore: { type: 'number', description: 'Risk score (0-100)' },
        riskFactors: { type: 'array', description: 'Key risk factors' }
      },
      keyBenefits: { type: 'array', description: 'Key benefits of the investment' },
      keyRisks: { type: 'array', description: 'Key risks of the investment' },
      recommendations: { type: 'array', description: 'Investment recommendations' }
    },
    investorSummary: {
      totalInvestors: { type: 'number', description: 'Total number of investors' },
      averageInvestment: { type: 'currency', description: 'Average investment per investor' },
      projectedIRR: { type: 'percentage', description: 'Projected IRR for investors' },
      projectedEquityMultiple: { type: 'decimal', description: 'Projected equity multiple for investors' },
      minimumInvestment: { type: 'currency', description: 'Minimum investment amount' },
      maximumInvestment: { type: 'currency', description: 'Maximum investment amount' },
      accreditedInvestorRequirement: { type: 'boolean', description: 'Whether accredited investors are required' },
      foreignInvestorAllowed: { type: 'boolean', description: 'Whether foreign investors are allowed' },
      selfDirectedIRAAllowed: { type: 'boolean', description: 'Whether self-directed IRAs are allowed' }
    },
    sponsorSummary: {
      equityContribution: { type: 'currency', description: 'Sponsor equity contribution' },
      promoteValue: { type: 'currency', description: 'Value of sponsor promote' },
      projectedIRR: { type: 'percentage', description: 'Projected IRR for sponsor' },
      totalCompensation: { type: 'currency', description: 'Total sponsor compensation' },
      managementFees: { type: 'currency', description: 'Management fees' },
      acquisitionFees: { type: 'currency', description: 'Acquisition fees' },
      dispositionFees: { type: 'currency', description: 'Disposition fees' }
    },
    taxAnalysis: {
      depreciationExpense: { type: 'currency', description: 'Annual depreciation expense' },
      taxableIncome: { type: 'currency', description: 'Taxable income' },
      taxLiability: { type: 'currency', description: 'Tax liability' },
      afterTaxCashFlow: { type: 'currency', description: 'After-tax cash flow' },
      effectiveTaxRate: { type: 'percentage', description: 'Effective tax rate' },
      depreciationMethod: { type: 'string', description: 'Depreciation method used' },
      recoveryPeriod: { type: 'number', description: 'Depreciation recovery period' },
      bonusDepreciationEligible: { type: 'boolean', description: 'Whether bonus depreciation is eligible' },
      bonusDepreciationPercentage: { type: 'percentage', description: 'Bonus depreciation percentage' }
    },
    sensitivityAnalysis: {
      scenarios: {
        scenario: { type: 'string', description: 'Scenario name' },
        capRate: { type: 'percentage', description: 'Cap rate for scenario' },
        irr: { type: 'percentage', description: 'IRR for scenario' },
        equityMultiple: { type: 'decimal', description: 'Equity multiple for scenario' }
      },
      keyVariables: { type: 'array', description: 'Key variables analyzed' },
      impactLevels: { type: 'array', description: 'Impact levels (Low/Medium/High)' }
    },
    stressTestResults: {
      testName: { type: 'string', description: 'Name of the stress test' },
      scenario: { type: 'string', description: 'Stress test scenario' },
      impact: { type: 'string', description: 'Impact level (Low/Medium/High)' },
      irrImpact: { type: 'percentage', description: 'Impact on IRR' },
      cashFlowImpact: { type: 'percentage', description: 'Impact on cash flow' },
      recommendation: { type: 'string', description: 'Recommendation based on stress test' }
    }
  },
  features: [
    'Comprehensive real estate syndication analysis',
    'Waterfall structure calculations with multiple tiers',
    'Investor and sponsor return projections',
    'Cash flow projections with rent growth and expense inflation',
    'Risk assessment and scoring',
    'Tax analysis including depreciation and bonus depreciation',
    'Sensitivity analysis with multiple scenarios',
    'Stress testing with recommendations',
    'Compliance and legal requirement tracking',
    'Multiple syndication types (506(b), 506(c), crowdfunding, etc.)',
    'Investor qualification and fee structure analysis',
    'Exit strategy planning and analysis',
    'Detailed reporting with customizable formats'
  ],
  examples: [
    {
      name: 'Multifamily Syndication',
      description: '50-unit apartment complex with 70% LTV financing, 8% preferred return, and 20% sponsor promote',
      inputs: {
        projectType: 'multifamily',
        totalAcquisitionCost: 5000000,
        propertyValue: 5000000,
        numberOfUnits: 50,
        currentRentRoll: 600000,
        totalEquityNeeded: 1500000,
        debtFinancing: 3500000,
        preferredReturn: 8,
        sponsorPromote: 20,
        projectedHoldPeriod: 5
      }
    },
    {
      name: 'Commercial Office Syndication',
      description: 'Class A office building with 506(c) offering, 10% preferred return, and tiered promote structure',
      inputs: {
        projectType: 'office',
        totalAcquisitionCost: 15000000,
        propertyValue: 15000000,
        currentRentRoll: 1800000,
        totalEquityNeeded: 4500000,
        debtFinancing: 10500000,
        syndicationType: '506(c)',
        preferredReturn: 10,
        tier1Threshold: 12,
        tier2Threshold: 15,
        tier3Threshold: 18,
        projectedHoldPeriod: 7
      }
    },
    {
      name: 'Retail Strip Center Syndication',
      description: 'Neighborhood retail center with conservative leverage and high cash-on-cash returns',
      inputs: {
        projectType: 'retail',
        totalAcquisitionCost: 3000000,
        propertyValue: 3000000,
        currentRentRoll: 360000,
        totalEquityNeeded: 1200000,
        debtFinancing: 1800000,
        preferredReturn: 6,
        sponsorPromote: 15,
        projectedHoldPeriod: 3
      }
    }
  ],
  relatedCalculators: [
    'real-estate-investment-roi',
    'real-estate-cash-flow',
    'real-estate-depreciation-schedule',
    'real-estate-development-pro-forma',
    'real-estate-crowdfunding',
    'real-estate-1031-exchange',
    'real-estate-cap-rate',
    'real-estate-irr',
    'real-estate-waterfall',
    'real-estate-tax-analysis'
  ]
};