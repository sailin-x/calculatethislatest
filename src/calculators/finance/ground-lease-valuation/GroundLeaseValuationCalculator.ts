import { Calculator } from '../../types';
import { GroundLeaseValuationInputs, GroundLeaseValuationOutputs } from './types';
import { calculateGroundLeaseValuation } from './formulas';
import { validateGroundLeaseValuationInputs } from './validation';
import { generateGroundLeaseValuationReport } from './formulas';

export const GroundLeaseValuationCalculator: Calculator<GroundLeaseValuationInputs, GroundLeaseValuationOutputs> = {
  id: 'ground-lease-valuation',
  name: 'Ground Lease Valuation Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Comprehensive ground lease valuation and analysis tool for real estate investments',
  longDescription: `A professional-grade ground lease valuation calculator that provides comprehensive analysis of ground lease investments. This calculator evaluates the present value, risk profile, and investment potential of ground leases using advanced financial modeling techniques including discounted cash flow analysis, sensitivity analysis, and scenario modeling.

Key Features:
• Present value calculation using discounted cash flow analysis
• Risk assessment and scoring based on tenant credit, market conditions, and lease terms
• Sensitivity analysis for key variables including rent escalation, discount rates, and market conditions
• Scenario analysis for best case, base case, and worst case outcomes
• Comparable market analysis and benchmarking
• Comprehensive due diligence checklist and risk mitigation strategies
• Professional reporting with detailed investment recommendations

This calculator is essential for real estate investors, lenders, appraisers, and property managers evaluating ground lease opportunities. It provides the analytical framework needed to make informed investment decisions and assess the long-term value and risk profile of ground lease investments.`,

  inputs: {
    // Property Information
    propertyAddress: {
      type: 'string',
      label: 'Property Address',
      description: 'Full address of the property',
      required: true,
      placeholder: '123 Main Street, City, State ZIP'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property being leased',
      required: true,
      options: [
        { value: 'commercial', label: 'Commercial' },
        { value: 'residential', label: 'Residential' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'mixed_use', label: 'Mixed Use' }
      ]
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total square footage of the property',
      required: true,
      min: 0,
      unit: 'sq ft'
    },
    landSize: {
      type: 'number',
      label: 'Land Size (acres)',
      description: 'Total land area in acres',
      required: true,
      min: 0,
      unit: 'acres'
    },
    zoning: {
      type: 'string',
      label: 'Zoning Classification',
      description: 'Current zoning classification',
      required: true,
      placeholder: 'R-1, C-2, etc.'
    },
    currentUse: {
      type: 'string',
      label: 'Current Use',
      description: 'Current use of the property',
      required: true,
      placeholder: 'Office building, retail store, etc.'
    },
    highestBestUse: {
      type: 'string',
      label: 'Highest and Best Use',
      description: 'Highest and best use of the property',
      required: true,
      placeholder: 'Mixed-use development, office tower, etc.'
    },

    // Lease Information
    leaseType: {
      type: 'select',
      label: 'Lease Type',
      description: 'Type of ground lease',
      required: true,
      options: [
        { value: 'ground_lease', label: 'Ground Lease' },
        { value: 'land_lease', label: 'Land Lease' },
        { value: 'master_lease', label: 'Master Lease' },
        { value: 'sublease', label: 'Sublease' }
      ]
    },
    leaseStartDate: {
      type: 'date',
      label: 'Lease Start Date',
      description: 'Date when the lease commenced',
      required: true
    },
    leaseEndDate: {
      type: 'date',
      label: 'Lease End Date',
      description: 'Date when the lease expires',
      required: true
    },
    leaseTerm: {
      type: 'number',
      label: 'Lease Term (years)',
      description: 'Total lease term in years',
      required: true,
      min: 1,
      max: 99,
      unit: 'years'
    },
    remainingTerm: {
      type: 'number',
      label: 'Remaining Term (years)',
      description: 'Remaining lease term in years',
      required: true,
      min: 0,
      max: 99,
      unit: 'years'
    },
    renewalOptions: {
      type: 'number',
      label: 'Renewal Options',
      description: 'Number of renewal options available',
      required: true,
      min: 0,
      max: 10,
      unit: 'options'
    },
    renewalTerm: {
      type: 'number',
      label: 'Renewal Term (years)',
      description: 'Length of each renewal term in years',
      required: true,
      min: 1,
      max: 20,
      unit: 'years'
    },

    // Financial Information
    currentRent: {
      type: 'number',
      label: 'Current Annual Rent',
      description: 'Current annual rent payment',
      required: true,
      min: 0,
      unit: 'USD'
    },
    rentEscalation: {
      type: 'number',
      label: 'Rent Escalation Rate (%)',
      description: 'Annual rent escalation rate',
      required: true,
      min: 0,
      max: 50,
      unit: '%'
    },
    rentEscalationFrequency: {
      type: 'select',
      label: 'Rent Escalation Frequency',
      description: 'Frequency of rent escalations',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'biennial', label: 'Biennial' },
        { value: 'quinquennial', label: 'Every 5 Years' },
        { value: 'decennial', label: 'Every 10 Years' }
      ]
    },
    rentReviewClause: {
      type: 'boolean',
      label: 'Rent Review Clause',
      description: 'Whether the lease includes a rent review clause',
      required: true
    },
    rentReviewFrequency: {
      type: 'number',
      label: 'Rent Review Frequency (years)',
      description: 'Frequency of rent reviews in years',
      required: true,
      min: 1,
      max: 20,
      unit: 'years'
    },
    rentReviewMethod: {
      type: 'select',
      label: 'Rent Review Method',
      description: 'Method used for rent reviews',
      required: true,
      options: [
        { value: 'market', label: 'Market Rate' },
        { value: 'cpi', label: 'CPI Index' },
        { value: 'fixed', label: 'Fixed Rate' },
        { value: 'hybrid', label: 'Hybrid' }
      ]
    },

    // Operating Information
    operatingExpenses: {
      type: 'number',
      label: 'Annual Operating Expenses',
      description: 'Annual operating expenses for the property',
      required: true,
      min: 0,
      unit: 'USD'
    },
    propertyTaxes: {
      type: 'number',
      label: 'Annual Property Taxes',
      description: 'Annual property taxes',
      required: true,
      min: 0,
      unit: 'USD'
    },
    insurance: {
      type: 'number',
      label: 'Annual Insurance',
      description: 'Annual insurance costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    maintenance: {
      type: 'number',
      label: 'Annual Maintenance',
      description: 'Annual maintenance costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    utilities: {
      type: 'number',
      label: 'Annual Utilities',
      description: 'Annual utility costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    managementFees: {
      type: 'number',
      label: 'Annual Management Fees',
      description: 'Annual property management fees',
      required: true,
      min: 0,
      unit: 'USD'
    },

    // Market Information
    marketRent: {
      type: 'number',
      label: 'Market Rent (per sq ft/year)',
      description: 'Current market rent per square foot per year',
      required: true,
      min: 0,
      unit: 'USD/sq ft/year'
    },
    marketCapRate: {
      type: 'number',
      label: 'Market Cap Rate (%)',
      description: 'Market capitalization rate',
      required: true,
      min: 0,
      max: 20,
      unit: '%'
    },
    marketDiscountRate: {
      type: 'number',
      label: 'Market Discount Rate (%)',
      description: 'Market discount rate for similar investments',
      required: true,
      min: 0,
      max: 30,
      unit: '%'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected market growth rate',
      required: true,
      min: -10,
      max: 20,
      unit: '%'
    },

    // Improvements
    buildingValue: {
      type: 'number',
      label: 'Building Value',
      description: 'Current value of improvements on the property',
      required: true,
      min: 0,
      unit: 'USD'
    },
    buildingAge: {
      type: 'number',
      label: 'Building Age (years)',
      description: 'Age of the building in years',
      required: true,
      min: 0,
      max: 100,
      unit: 'years'
    },
    buildingCondition: {
      type: 'select',
      label: 'Building Condition',
      description: 'Current condition of the building',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ]
    },
    remainingEconomicLife: {
      type: 'number',
      label: 'Remaining Economic Life (years)',
      description: 'Remaining economic life of the building',
      required: true,
      min: 0,
      max: 100,
      unit: 'years'
    },
    depreciationRate: {
      type: 'number',
      label: 'Depreciation Rate (%)',
      description: 'Annual depreciation rate of the building',
      required: true,
      min: 0,
      max: 10,
      unit: '%'
    },

    // Risk Factors
    tenantCredit: {
      type: 'select',
      label: 'Tenant Credit Rating',
      description: 'Credit rating of the tenant',
      required: true,
      options: [
        { value: 'aaa', label: 'AAA' },
        { value: 'aa', label: 'AA' },
        { value: 'a', label: 'A' },
        { value: 'bbb', label: 'BBB' },
        { value: 'bb', label: 'BB' },
        { value: 'b', label: 'B' },
        { value: 'ccc', label: 'CCC' },
        { value: 'default', label: 'Default' }
      ]
    },
    leaseSecurity: {
      type: 'select',
      label: 'Lease Security',
      description: 'Level of security for the lease',
      required: true,
      options: [
        { value: 'guaranteed', label: 'Guaranteed' },
        { value: 'secured', label: 'Secured' },
        { value: 'unsecured', label: 'Unsecured' },
        { value: 'subordinated', label: 'Subordinated' }
      ]
    },
    marketRisk: {
      type: 'select',
      label: 'Market Risk',
      description: 'Level of market risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    redevelopmentRisk: {
      type: 'select',
      label: 'Redevelopment Risk',
      description: 'Risk of redevelopment',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },

    // Legal and Regulatory
    zoningRestrictions: {
      type: 'boolean',
      label: 'Zoning Restrictions',
      description: 'Whether there are zoning restrictions',
      required: true
    },
    environmentalIssues: {
      type: 'boolean',
      label: 'Environmental Issues',
      description: 'Whether there are environmental issues',
      required: true
    },
    titleIssues: {
      type: 'boolean',
      label: 'Title Issues',
      description: 'Whether there are title issues',
      required: true
    },
    easements: {
      type: 'boolean',
      label: 'Easements',
      description: 'Whether there are easements on the property',
      required: true
    },

    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for analysis in years',
      required: true,
      min: 1,
      max: 50,
      unit: 'years'
    },
    terminalCapRate: {
      type: 'number',
      label: 'Terminal Cap Rate (%)',
      description: 'Terminal capitalization rate',
      required: true,
      min: 0,
      max: 20,
      unit: '%'
    },
    reversionValue: {
      type: 'number',
      label: 'Reversion Value',
      description: 'Expected reversion value at end of analysis period',
      required: true,
      min: 0,
      unit: 'USD'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for present value calculations',
      required: true,
      min: 0,
      max: 30,
      unit: '%'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected inflation rate',
      required: true,
      min: -5,
      max: 15,
      unit: '%'
    },

    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and reporting',
      required: true,
      options: [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'JPY', label: 'Japanese Yen (JPY)' },
        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' }
      ]
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying percentages and ratios',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'basis-points', label: 'Basis Points' }
      ]
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Whether to include charts in the analysis',
      required: true
    }
  },

  outputs: {
    // Valuation Analysis
    presentValue: {
      type: 'number',
      label: 'Present Value',
      description: 'Present value of the ground lease',
      unit: 'USD'
    },
    netPresentValue: {
      type: 'number',
      label: 'Net Present Value',
      description: 'Net present value of the investment',
      unit: 'USD'
    },
    internalRateOfReturn: {
      type: 'number',
      label: 'Internal Rate of Return',
      description: 'Internal rate of return on the investment',
      unit: '%'
    },
    yieldToMaturity: {
      type: 'number',
      label: 'Yield to Maturity',
      description: 'Yield to maturity of the lease',
      unit: '%'
    },
    capitalizationRate: {
      type: 'number',
      label: 'Capitalization Rate',
      description: 'Effective capitalization rate',
      unit: '%'
    },

    // Cash Flow Analysis
    annualCashFlow: {
      type: 'number',
      label: 'Annual Cash Flow',
      description: 'Annual net cash flow',
      unit: 'USD'
    },
    totalCashFlow: {
      type: 'number',
      label: 'Total Cash Flow',
      description: 'Total cash flow over analysis period',
      unit: 'USD'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'Cash on Cash Return',
      description: 'Cash on cash return on investment',
      unit: '%'
    },
    debtServiceCoverage: {
      type: 'number',
      label: 'Debt Service Coverage',
      description: 'Debt service coverage ratio',
      unit: 'ratio'
    },

    // Income Analysis
    grossIncome: {
      type: 'number',
      label: 'Gross Income',
      description: 'Gross income from the lease',
      unit: 'USD'
    },
    netOperatingIncome: {
      type: 'number',
      label: 'Net Operating Income',
      description: 'Net operating income',
      unit: 'USD'
    },
    effectiveGrossIncome: {
      type: 'number',
      label: 'Effective Gross Income',
      description: 'Effective gross income after adjustments',
      unit: 'USD'
    },
    vacancyLoss: {
      type: 'number',
      label: 'Vacancy Loss',
      description: 'Loss due to vacancy',
      unit: 'USD'
    },
    collectionLoss: {
      type: 'number',
      label: 'Collection Loss',
      description: 'Loss due to collection issues',
      unit: 'USD'
    },

    // Expense Analysis
    totalExpenses: {
      type: 'number',
      label: 'Total Expenses',
      description: 'Total operating expenses',
      unit: 'USD'
    },
    expenseRatio: {
      type: 'number',
      label: 'Expense Ratio',
      description: 'Ratio of expenses to gross income',
      unit: '%'
    },
    netIncomeMultiplier: {
      type: 'number',
      label: 'Net Income Multiplier',
      description: 'Net income multiplier',
      unit: 'multiplier'
    },

    // Market Analysis
    marketValue: {
      type: 'number',
      label: 'Market Value',
      description: 'Estimated market value',
      unit: 'USD'
    },
    marketValuePerSquareFoot: {
      type: 'number',
      label: 'Market Value per Sq Ft',
      description: 'Market value per square foot',
      unit: 'USD/sq ft'
    },
    marketValuePerAcre: {
      type: 'number',
      label: 'Market Value per Acre',
      description: 'Market value per acre',
      unit: 'USD/acre'
    },
    comparableValue: {
      type: 'number',
      label: 'Comparable Value',
      description: 'Value based on comparable sales',
      unit: 'USD'
    },

    // Risk Metrics
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk score (1-10 scale)',
      unit: 'score'
    },
    probabilityOfDefault: {
      type: 'number',
      label: 'Probability of Default',
      description: 'Probability of tenant default',
      unit: '%'
    },
    lossGivenDefault: {
      type: 'number',
      label: 'Loss Given Default',
      description: 'Expected loss in case of default',
      unit: '%'
    },
    expectedLoss: {
      type: 'number',
      label: 'Expected Loss',
      description: 'Expected loss from default risk',
      unit: 'USD'
    },

    // Analysis
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis and recommendations'
    }
  },

  calculate: (inputs: GroundLeaseValuationInputs): GroundLeaseValuationOutputs => {
    // Validate inputs
    const validationResult = validateGroundLeaseValuationInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Calculate valuation
    const metrics = calculateGroundLeaseValuation(inputs);
    
    // Generate analysis
    const analysis = generateGroundLeaseValuationReport(inputs, metrics);

    return {
      ...metrics,
      analysis
    };
  },

  generateReport: (inputs: GroundLeaseValuationInputs, outputs: GroundLeaseValuationOutputs): string => {
    return generateGroundLeaseValuationReport(inputs, outputs);
  },

  formulas: {
    presentValue: 'PV = Σ(CFt / (1 + r)^t) + TV / (1 + r)^n',
    netPresentValue: 'NPV = PV - Initial Investment',
    internalRateOfReturn: 'IRR: NPV = 0 when r = IRR',
    capitalizationRate: 'Cap Rate = NOI / Property Value',
    cashOnCashReturn: 'CoC = Annual Cash Flow / Total Investment',
    riskScore: 'Risk Score = f(Tenant Credit, Market Risk, Lease Security, etc.)'
  },

  examples: [
    {
      name: 'Commercial Ground Lease',
      description: 'A 50-year ground lease for a commercial office building',
      inputs: {
        propertyAddress: '123 Business District, Downtown, NY 10001',
        propertyType: 'commercial',
        propertySize: 50000,
        landSize: 2.5,
        zoning: 'C-2',
        currentUse: 'Office building',
        highestBestUse: 'Mixed-use development',
        leaseType: 'ground_lease',
        leaseStartDate: '2020-01-01',
        leaseEndDate: '2070-01-01',
        leaseTerm: 50,
        remainingTerm: 45,
        renewalOptions: 2,
        renewalTerm: 10,
        currentRent: 500000,
        rentEscalation: 2.5,
        rentEscalationFrequency: 'annual',
        rentReviewClause: true,
        rentReviewFrequency: 5,
        rentReviewMethod: 'market',
        operatingExpenses: 100000,
        propertyTaxes: 75000,
        insurance: 25000,
        maintenance: 50000,
        utilities: 30000,
        managementFees: 20000,
        marketRent: 15,
        marketCapRate: 6.5,
        marketDiscountRate: 8.5,
        marketGrowthRate: 2.0,
        buildingValue: 5000000,
        buildingAge: 5,
        buildingCondition: 'excellent',
        remainingEconomicLife: 45,
        depreciationRate: 2.0,
        tenantCredit: 'aa',
        leaseSecurity: 'guaranteed',
        marketRisk: 'low',
        redevelopmentRisk: 'low',
        zoningRestrictions: false,
        environmentalIssues: false,
        titleIssues: false,
        easements: false,
        analysisPeriod: 45,
        terminalCapRate: 7.0,
        reversionValue: 8000000,
        discountRate: 8.5,
        inflationRate: 2.0,
        currency: 'USD',
        displayFormat: 'percentage',
        includeCharts: true
      }
    },
    {
      name: 'Retail Ground Lease',
      description: 'A 30-year ground lease for a retail shopping center',
      inputs: {
        propertyAddress: '456 Shopping Plaza, Suburban, CA 90210',
        propertyType: 'retail',
        propertySize: 75000,
        landSize: 5.0,
        zoning: 'C-3',
        currentUse: 'Shopping center',
        highestBestUse: 'Mixed retail and entertainment',
        leaseType: 'ground_lease',
        leaseStartDate: '2015-06-01',
        leaseEndDate: '2045-06-01',
        leaseTerm: 30,
        remainingTerm: 20,
        renewalOptions: 1,
        renewalTerm: 15,
        currentRent: 750000,
        rentEscalation: 3.0,
        rentEscalationFrequency: 'annual',
        rentReviewClause: true,
        rentReviewFrequency: 3,
        rentReviewMethod: 'cpi',
        operatingExpenses: 150000,
        propertyTaxes: 100000,
        insurance: 35000,
        maintenance: 75000,
        utilities: 45000,
        managementFees: 30000,
        marketRent: 12,
        marketCapRate: 7.0,
        marketDiscountRate: 9.0,
        marketGrowthRate: 2.5,
        buildingValue: 8000000,
        buildingAge: 8,
        buildingCondition: 'good',
        remainingEconomicLife: 22,
        depreciationRate: 2.5,
        tenantCredit: 'a',
        leaseSecurity: 'secured',
        marketRisk: 'medium',
        redevelopmentRisk: 'medium',
        zoningRestrictions: true,
        environmentalIssues: false,
        titleIssues: false,
        easements: true,
        analysisPeriod: 20,
        terminalCapRate: 7.5,
        reversionValue: 12000000,
        discountRate: 9.0,
        inflationRate: 2.5,
        currency: 'USD',
        displayFormat: 'percentage',
        includeCharts: true
      }
    }
  ],

  tags: [
    'ground lease',
    'valuation',
    'real estate',
    'investment analysis',
    'cash flow',
    'present value',
    'risk assessment',
    'commercial real estate',
    'land lease',
    'property investment',
    'financial modeling',
    'discounted cash flow',
    'cap rate',
    'irr',
    'sensitivity analysis'
  ],

  category_info: {
    category: 'finance',
    subcategory: 'real-estate',
    name: 'Ground Lease Valuation',
    description: 'Professional ground lease valuation and investment analysis tools',
    icon: '🏢',
    color: '#4CAF50'
  }
};
