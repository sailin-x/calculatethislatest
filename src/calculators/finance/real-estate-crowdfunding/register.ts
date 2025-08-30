import { Calculator } from '@/types/calculator';
import { RealEstateCrowdfundingCalculator } from './RealEstateCrowdfundingCalculator';

export const realEstateCrowdfundingCalculator: Calculator = {
  id: 'real-estate-crowdfunding',
  name: 'Real Estate Crowdfunding Calculator',
  description: 'Analyze real estate crowdfunding investment opportunities with comprehensive return metrics, risk assessment, cash flow projections, and platform analysis. Calculate IRR, equity multiple, cash-on-cash returns, and evaluate liquidity options, tax implications, and exit strategies.',
  category: 'finance',
  tags: ['real-estate-crowdfunding', 'investment-analysis', 'crowdfunding', 'real-estate', 'irr', 'equity-multiple', 'cash-flow', 'risk-assessment', 'platform-analysis', 'tax-analysis'],
  component: RealEstateCrowdfundingCalculator,
  inputs: {
    // Investment Information
    investmentAmount: {
      type: 'number',
      label: 'Investment Amount',
      description: 'Amount to invest in the crowdfunding opportunity',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      unit: 'USD'
    },
    minimumInvestment: {
      type: 'number',
      label: 'Minimum Investment',
      description: 'Minimum investment amount required by the platform',
      required: true,
      min: 100,
      max: 100000,
      step: 100,
      placeholder: '1000',
      unit: 'USD'
    },
    maximumInvestment: {
      type: 'number',
      label: 'Maximum Investment',
      description: 'Maximum investment amount allowed by the platform',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '1000000',
      unit: 'USD'
    },
    investmentType: {
      type: 'select',
      label: 'Investment Type',
      description: 'Type of crowdfunding investment',
      required: true,
      options: [
        { value: 'equity', label: 'Equity' },
        { value: 'debt', label: 'Debt' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'preferred_equity', label: 'Preferred Equity' },
        { value: 'mezzanine', label: 'Mezzanine' }
      ],
      placeholder: 'Select investment type'
    },
    investmentTerm: {
      type: 'number',
      label: 'Investment Term (months)',
      description: 'Duration of the investment in months',
      required: true,
      min: 1,
      max: 120,
      step: 1,
      placeholder: '60',
      unit: 'months'
    },
    targetIRR: {
      type: 'number',
      label: 'Target IRR (%)',
      description: 'Target internal rate of return',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '12',
      unit: '%'
    },
    targetCashOnCash: {
      type: 'number',
      label: 'Target Cash-on-Cash Return (%)',
      description: 'Target annual cash-on-cash return',
      required: true,
      min: 0,
      max: 30,
      step: 0.1,
      placeholder: '8',
      unit: '%'
    },
    targetEquityMultiple: {
      type: 'number',
      label: 'Target Equity Multiple',
      description: 'Target equity multiple over the investment term',
      required: true,
      min: 1,
      max: 5,
      step: 0.1,
      placeholder: '2.5',
      unit: 'x'
    },

    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Current market value of the property',
      required: true,
      min: 100000,
      max: 100000000,
      step: 10000,
      placeholder: '2000000',
      unit: 'USD'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of real estate property',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'land', label: 'Land' },
        { value: 'mixed_use', label: 'Mixed Use' }
      ],
      placeholder: 'Select property type'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total square footage of the property',
      required: true,
      min: 1000,
      max: 1000000,
      step: 100,
      placeholder: '50000',
      unit: 'sq ft'
    },
    propertyLocation: {
      type: 'text',
      label: 'Property Location',
      description: 'Location of the property',
      required: false,
      maxLength: 100,
      placeholder: 'Austin, TX'
    },
    propertyCondition: {
      type: 'select',
      label: 'Property Condition',
      description: 'Current condition of the property',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_repair', label: 'Needs Repair' }
      ],
      placeholder: 'Select condition'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '10',
      unit: 'years'
    },
    occupancyRate: {
      type: 'number',
      label: 'Occupancy Rate (%)',
      description: 'Current occupancy rate of the property',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '95',
      unit: '%'
    },
    capRate: {
      type: 'number',
      label: 'Cap Rate (%)',
      description: 'Capitalization rate of the property',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '6.5',
      unit: '%'
    },

    // Financial Metrics
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price',
      description: 'Purchase price of the property',
      required: true,
      min: 100000,
      max: 100000000,
      step: 10000,
      placeholder: '2000000',
      unit: 'USD'
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      description: 'Down payment amount',
      required: true,
      min: 0,
      max: 100000000,
      step: 10000,
      placeholder: '400000',
      unit: 'USD'
    },
    loanAmount: {
      type: 'number',
      label: 'Loan Amount',
      description: 'Mortgage loan amount',
      required: true,
      min: 0,
      max: 100000000,
      step: 10000,
      placeholder: '1600000',
      unit: 'USD'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate on the loan',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5.5',
      unit: '%'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Term of the mortgage loan',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      unit: 'years'
    },
    monthlyRent: {
      type: 'number',
      label: 'Monthly Rent',
      description: 'Monthly rental income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '150000',
      unit: 'USD'
    },
    annualRent: {
      type: 'number',
      label: 'Annual Rent',
      description: 'Annual rental income',
      required: true,
      min: 0,
      max: 12000000,
      step: 10000,
      placeholder: '1800000',
      unit: 'USD'
    },
    operatingExpenses: {
      type: 'number',
      label: 'Operating Expenses',
      description: 'Annual operating expenses',
      required: true,
      min: 0,
      max: 10000000,
      step: 10000,
      placeholder: '720000',
      unit: 'USD'
    },
    propertyManagementFee: {
      type: 'number',
      label: 'Property Management Fee (%)',
      description: 'Property management fee as percentage of rent',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5',
      unit: '%'
    },
    vacancyRate: {
      type: 'number',
      label: 'Vacancy Rate (%)',
      description: 'Expected vacancy rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '5',
      unit: '%'
    },
    maintenanceReserve: {
      type: 'number',
      label: 'Maintenance Reserve',
      description: 'Annual maintenance reserve',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '90000',
      unit: 'USD'
    },
    insuranceCost: {
      type: 'number',
      label: 'Insurance Cost',
      description: 'Annual insurance cost',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '24000',
      unit: 'USD'
    },
    propertyTaxRate: {
      type: 'number',
      label: 'Property Tax Rate (%)',
      description: 'Annual property tax rate',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '1.2',
      unit: '%'
    },

    // Crowdfunding Platform Information
    platformFee: {
      type: 'number',
      label: 'Platform Fee (%)',
      description: 'Platform fee charged by the crowdfunding platform',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2',
      unit: '%'
    },
    platformFeeType: {
      type: 'select',
      label: 'Platform Fee Type',
      description: 'Type of platform fee structure',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'flat', label: 'Flat Fee' },
        { value: 'tiered', label: 'Tiered' }
      ],
      placeholder: 'Select fee type'
    },
    minimumHoldPeriod: {
      type: 'number',
      label: 'Minimum Hold Period (months)',
      description: 'Minimum holding period required by the platform',
      required: true,
      min: 0,
      max: 120,
      step: 1,
      placeholder: '12',
      unit: 'months'
    },
    liquidityOptions: {
      type: 'select',
      label: 'Liquidity Options',
      description: 'Available liquidity options',
      required: true,
      options: [
        { value: 'none', label: 'None' },
        { value: 'secondary_market', label: 'Secondary Market' },
        { value: 'buyback_program', label: 'Buyback Program' },
        { value: 'periodic_redemption', label: 'Periodic Redemption' }
      ],
      placeholder: 'Select liquidity options'
    },
    secondaryMarketFee: {
      type: 'number',
      label: 'Secondary Market Fee (%)',
      description: 'Fee for selling on secondary market',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '1',
      unit: '%'
    },
    earlyExitPenalty: {
      type: 'number',
      label: 'Early Exit Penalty (%)',
      description: 'Penalty for early exit',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5',
      unit: '%'
    },

    // Market and Economic Factors
    marketAppreciationRate: {
      type: 'number',
      label: 'Market Appreciation Rate (%)',
      description: 'Expected annual market appreciation rate',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '3',
      unit: '%'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected annual inflation rate',
      required: true,
      min: -5,
      max: 15,
      step: 0.1,
      placeholder: '2.5',
      unit: '%'
    },
    localEconomicGrowth: {
      type: 'number',
      label: 'Local Economic Growth (%)',
      description: 'Expected local economic growth rate',
      required: true,
      min: -10,
      max: 15,
      step: 0.1,
      placeholder: '2',
      unit: '%'
    },
    interestRateEnvironment: {
      type: 'select',
      label: 'Interest Rate Environment',
      description: 'Current interest rate environment',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'rising', label: 'Rising' },
        { value: 'falling', label: 'Falling' }
      ],
      placeholder: 'Select environment'
    },
    marketVolatility: {
      type: 'select',
      label: 'Market Volatility',
      description: 'Expected market volatility',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select volatility'
    },

    // Risk Factors
    propertyMarketRisk: {
      type: 'select',
      label: 'Property Market Risk',
      description: 'Risk level of the property market',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select risk level'
    },
    tenantCreditRisk: {
      type: 'select',
      label: 'Tenant Credit Risk',
      description: 'Risk level of tenant credit quality',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select risk level'
    },
    interestRateRisk: {
      type: 'select',
      label: 'Interest Rate Risk',
      description: 'Risk level of interest rate fluctuations',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select risk level'
    },
    liquidityRisk: {
      type: 'select',
      label: 'Liquidity Risk',
      description: 'Risk level of investment liquidity',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select risk level'
    },
    regulatoryRisk: {
      type: 'select',
      label: 'Regulatory Risk',
      description: 'Risk level of regulatory changes',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'Select risk level'
    },
    sponsorTrackRecord: {
      type: 'select',
      label: 'Sponsor Track Record',
      description: 'Quality of the sponsor\'s track record',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      placeholder: 'Select track record'
    },

    // Tax Considerations
    taxBracket: {
      type: 'number',
      label: 'Tax Bracket (%)',
      description: 'Investor\'s federal tax bracket',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '24',
      unit: '%'
    },
    stateTaxRate: {
      type: 'number',
      label: 'State Tax Rate (%)',
      description: 'State tax rate',
      required: true,
      min: 0,
      max: 15,
      step: 0.1,
      placeholder: '5',
      unit: '%'
    },
    localTaxRate: {
      type: 'number',
      label: 'Local Tax Rate (%)',
      description: 'Local tax rate',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '1',
      unit: '%'
    },
    depreciationRecapture: {
      type: 'boolean',
      label: 'Depreciation Recapture',
      description: 'Whether depreciation recapture applies',
      required: true,
      placeholder: 'true'
    },
    section1031Eligible: {
      type: 'boolean',
      label: 'Section 1031 Eligible',
      description: 'Whether the investment is eligible for 1031 exchange',
      required: true,
      placeholder: 'false'
    },
    qualifiedBusinessIncome: {
      type: 'boolean',
      label: 'Qualified Business Income',
      description: 'Whether QBI deduction applies',
      required: true,
      placeholder: 'true'
    },

    // Exit Strategy
    exitStrategy: {
      type: 'select',
      label: 'Exit Strategy',
      description: 'Planned exit strategy',
      required: true,
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'ipo', label: 'IPO' },
        { value: 'merger', label: 'Merger' },
        { value: 'hold', label: 'Hold' }
      ],
      placeholder: 'Select exit strategy'
    },
    projectedExitValue: {
      type: 'number',
      label: 'Projected Exit Value',
      description: 'Projected value at exit',
      required: true,
      min: 100000,
      max: 100000000,
      step: 10000,
      placeholder: '2500000',
      unit: 'USD'
    },
    projectedExitYear: {
      type: 'number',
      label: 'Projected Exit Year',
      description: 'Year of projected exit',
      required: true,
      min: 1,
      max: 20,
      step: 1,
      placeholder: '5',
      unit: 'years'
    },
    exitCosts: {
      type: 'number',
      label: 'Exit Costs',
      description: 'Estimated costs associated with exit',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '125000',
      unit: 'USD'
    },

    // Additional Investment Options
    leverageRatio: {
      type: 'number',
      label: 'Leverage Ratio (%)',
      description: 'Target leverage ratio',
      required: true,
      min: 0,
      max: 95,
      step: 1,
      placeholder: '80',
      unit: '%'
    },
    preferredReturn: {
      type: 'number',
      label: 'Preferred Return (%)',
      description: 'Preferred return rate',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '8',
      unit: '%'
    },
    promoteStructure: {
      type: 'boolean',
      label: 'Promote Structure',
      description: 'Whether promote structure applies',
      required: true,
      placeholder: 'false'
    },
    promotePercentage: {
      type: 'number',
      label: 'Promote Percentage (%)',
      description: 'Percentage of promote',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '20',
      unit: '%'
    },
    waterfallStructure: {
      type: 'select',
      label: 'Waterfall Structure',
      description: 'Type of waterfall structure',
      required: true,
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'complex', label: 'Complex' },
        { value: 'custom', label: 'Custom' }
      ],
      placeholder: 'Select structure'
    },

    // Analysis Parameters
    includeTaxes: {
      type: 'boolean',
      label: 'Include Tax Analysis',
      description: 'Whether to include tax analysis in calculations',
      required: true,
      placeholder: 'true'
    },
    includeInflation: {
      type: 'boolean',
      label: 'Include Inflation',
      description: 'Whether to include inflation in calculations',
      required: true,
      placeholder: 'true'
    },
    includeAppreciation: {
      type: 'boolean',
      label: 'Include Appreciation',
      description: 'Whether to include appreciation in calculations',
      required: true,
      placeholder: 'true'
    },
    includeLiquidity: {
      type: 'boolean',
      label: 'Include Liquidity Analysis',
      description: 'Whether to include liquidity analysis',
      required: true,
      placeholder: 'true'
    },
    riskAdjustment: {
      type: 'boolean',
      label: 'Risk Adjustment',
      description: 'Whether to apply risk adjustments',
      required: true,
      placeholder: 'true'
    },
    scenarioAnalysis: {
      type: 'boolean',
      label: 'Scenario Analysis',
      description: 'Whether to include scenario analysis',
      required: true,
      placeholder: 'true'
    },

    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'Select currency'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'Select format'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Whether to include charts in results',
      required: true,
      placeholder: 'true'
    },
    includeComparisons: {
      type: 'boolean',
      label: 'Include Comparisons',
      description: 'Whether to include benchmark comparisons',
      required: true,
      placeholder: 'true'
    },
    includeTimeline: {
      type: 'boolean',
      label: 'Include Timeline',
      description: 'Whether to include timeline analysis',
      required: true,
      placeholder: 'true'
    }
  },
  outputs: {
    // Basic Information
    investmentAmount: {
      type: 'number',
      label: 'Investment Amount',
      description: 'Original investment amount',
      unit: 'USD'
    },
    effectiveInvestment: {
      type: 'number',
      label: 'Effective Investment',
      description: 'Investment amount after platform fees',
      unit: 'USD'
    },
    investmentType: {
      type: 'string',
      label: 'Investment Type',
      description: 'Type of crowdfunding investment'
    },
    investmentTerm: {
      type: 'number',
      label: 'Investment Term',
      description: 'Duration of the investment',
      unit: 'months'
    },
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Current market value of the property',
      unit: 'USD'
    },
    propertyType: {
      type: 'string',
      label: 'Property Type',
      description: 'Type of real estate property'
    },

    // Return Metrics
    totalReturn: {
      type: 'number',
      label: 'Total Return',
      description: 'Total return over the investment period',
      unit: 'USD'
    },
    annualizedReturn: {
      type: 'number',
      label: 'Annualized Return',
      description: 'Annualized return percentage',
      unit: '%'
    },
    irr: {
      type: 'number',
      label: 'IRR',
      description: 'Internal rate of return',
      unit: '%'
    },
    equityMultiple: {
      type: 'number',
      label: 'Equity Multiple',
      description: 'Equity multiple over the investment period',
      unit: 'x'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'Cash-on-Cash Return',
      description: 'Annual cash-on-cash return',
      unit: '%'
    },

    // Risk Metrics
    riskAdjustedReturn: {
      type: 'number',
      label: 'Risk Adjusted Return',
      description: 'Risk-adjusted return percentage',
      unit: '%'
    },
    sharpeRatio: {
      type: 'number',
      label: 'Sharpe Ratio',
      description: 'Risk-adjusted return measure'
    },
    maximumDrawdown: {
      type: 'number',
      label: 'Maximum Drawdown',
      description: 'Maximum potential loss',
      unit: '%'
    },
    valueAtRisk: {
      type: 'number',
      label: 'Value at Risk',
      description: 'Potential loss at confidence level',
      unit: '%'
    },

    // Cash Flow Analysis
    monthlyCashFlow: {
      type: 'number',
      label: 'Monthly Cash Flow',
      description: 'Monthly cash flow from the investment',
      unit: 'USD'
    },
    annualCashFlow: {
      type: 'number',
      label: 'Annual Cash Flow',
      description: 'Annual cash flow from the investment',
      unit: 'USD'
    },
    totalCashFlow: {
      type: 'number',
      label: 'Total Cash Flow',
      description: 'Total cash flow over the investment period',
      unit: 'USD'
    },
    cashFlowYield: {
      type: 'number',
      label: 'Cash Flow Yield',
      description: 'Cash flow yield percentage',
      unit: '%'
    },

    // Tax Analysis
    taxableIncome: {
      type: 'number',
      label: 'Taxable Income',
      description: 'Annual taxable income from the investment',
      unit: 'USD'
    },
    taxLiability: {
      type: 'number',
      label: 'Tax Liability',
      description: 'Annual tax liability',
      unit: 'USD'
    },
    afterTaxReturn: {
      type: 'number',
      label: 'After-Tax Return',
      description: 'Return after taxes',
      unit: '%'
    },
    taxEfficiency: {
      type: 'number',
      label: 'Tax Efficiency',
      description: 'Tax efficiency percentage',
      unit: '%'
    },

    // Platform Analysis
    platformFees: {
      type: 'number',
      label: 'Platform Fees',
      description: 'Total platform fees',
      unit: 'USD'
    },
    totalFees: {
      type: 'number',
      label: 'Total Fees',
      description: 'Total fees including platform fees',
      unit: 'USD'
    },
    netInvestment: {
      type: 'number',
      label: 'Net Investment',
      description: 'Net investment after all fees',
      unit: 'USD'
    },
    feeImpact: {
      type: 'number',
      label: 'Fee Impact',
      description: 'Impact of fees on returns',
      unit: '%'
    },

    // Liquidity Analysis
    liquidityScore: {
      type: 'number',
      label: 'Liquidity Score',
      description: 'Liquidity score (0-100)',
      unit: 'score'
    },
    timeToLiquidity: {
      type: 'number',
      label: 'Time to Liquidity',
      description: 'Time required to achieve liquidity',
      unit: 'months'
    },
    secondaryMarketValue: {
      type: 'number',
      label: 'Secondary Market Value',
      description: 'Estimated value on secondary market',
      unit: 'USD'
    },

    // Property Performance
    propertyAppreciation: {
      type: 'number',
      label: 'Property Appreciation',
      description: 'Expected property appreciation rate',
      unit: '%'
    },
    rentalGrowth: {
      type: 'number',
      label: 'Rental Growth',
      description: 'Expected rental growth rate',
      unit: '%'
    },
    marketValueGrowth: {
      type: 'number',
      label: 'Market Value Growth',
      description: 'Expected market value growth rate',
      unit: '%'
    },

    // Analysis Arrays
    cashFlowProjections: {
      type: 'array',
      label: 'Cash Flow Projections',
      description: 'Monthly cash flow projections',
      schema: {
        period: { type: 'number', label: 'Period' },
        date: { type: 'string', label: 'Date' },
        rentalIncome: { type: 'number', label: 'Rental Income', unit: 'USD' },
        operatingExpenses: { type: 'number', label: 'Operating Expenses', unit: 'USD' },
        debtService: { type: 'number', label: 'Debt Service', unit: 'USD' },
        netCashFlow: { type: 'number', label: 'Net Cash Flow', unit: 'USD' },
        cumulativeCashFlow: { type: 'number', label: 'Cumulative Cash Flow', unit: 'USD' },
        returnOnInvestment: { type: 'number', label: 'Return on Investment', unit: '%' }
      }
    },
    exitScenarios: {
      type: 'array',
      label: 'Exit Scenarios',
      description: 'Different exit scenarios and their probabilities',
      schema: {
        scenario: { type: 'string', label: 'Scenario' },
        probability: { type: 'number', label: 'Probability', unit: '%' },
        exitValue: { type: 'number', label: 'Exit Value', unit: 'USD' },
        exitYear: { type: 'number', label: 'Exit Year', unit: 'years' },
        totalReturn: { type: 'number', label: 'Total Return', unit: '%' },
        irr: { type: 'number', label: 'IRR', unit: '%' },
        equityMultiple: { type: 'number', label: 'Equity Multiple', unit: 'x' }
      }
    },
    riskScenarios: {
      type: 'array',
      label: 'Risk Scenarios',
      description: 'Potential risk scenarios and mitigation strategies',
      schema: {
        scenario: { type: 'string', label: 'Scenario' },
        probability: { type: 'number', label: 'Probability', unit: '%' },
        impact: { type: 'string', label: 'Impact' },
        description: { type: 'string', label: 'Description' },
        mitigation: { type: 'string', label: 'Mitigation Strategy' }
      }
    },

    // Analysis Object
    analysis: {
      type: 'object',
      label: 'Investment Analysis',
      description: 'Comprehensive investment analysis and recommendations',
      schema: {
        investmentRating: { type: 'string', label: 'Investment Rating' },
        riskRating: { type: 'string', label: 'Risk Rating' },
        liquidityRating: { type: 'string', label: 'Liquidity Rating' },
        taxEfficiencyRating: { type: 'string', label: 'Tax Efficiency Rating' },
        recommendation: { type: 'string', label: 'Recommendation' },
        keyStrengths: { type: 'array', label: 'Key Strengths', items: { type: 'string' } },
        keyWeaknesses: { type: 'array', label: 'Key Weaknesses', items: { type: 'string' } },
        optimizationSuggestions: { type: 'array', label: 'Optimization Suggestions', items: { type: 'string' } },
        investmentRisks: { type: 'array', label: 'Investment Risks', items: { type: 'string' } },
        mitigationStrategies: { type: 'array', label: 'Mitigation Strategies', items: { type: 'string' } },
        contingencyPlans: { type: 'array', label: 'Contingency Plans', items: { type: 'string' } },
        marketOutlook: { type: 'string', label: 'Market Outlook' },
        marketFactors: { type: 'array', label: 'Market Factors', items: { type: 'string' } },
        economicImpact: { type: 'array', label: 'Economic Impact', items: { type: 'string' } },
        futureProjections: { type: 'array', label: 'Future Projections', items: { type: 'string' } },
        taxImplications: { type: 'array', label: 'Tax Implications', items: { type: 'string' } },
        taxOptimization: { type: 'array', label: 'Tax Optimization', items: { type: 'string' } },
        taxRisks: { type: 'array', label: 'Tax Risks', items: { type: 'string' } },
        liquidityFactors: { type: 'array', label: 'Liquidity Factors', items: { type: 'string' } },
        exitOptions: { type: 'array', label: 'Exit Options', items: { type: 'string' } },
        secondaryMarketAnalysis: { type: 'array', label: 'Secondary Market Analysis', items: { type: 'string' } },
        platformStrengths: { type: 'array', label: 'Platform Strengths', items: { type: 'string' } },
        platformWeaknesses: { type: 'array', label: 'Platform Weaknesses', items: { type: 'string' } },
        platformComparison: { type: 'array', label: 'Platform Comparison', items: { type: 'string' } },
        nextSteps: { type: 'array', label: 'Next Steps', items: { type: 'string' } },
        timeline: { type: 'array', label: 'Timeline', items: { type: 'string' } },
        priorityActions: { type: 'array', label: 'Priority Actions', items: { type: 'string' } },
        performanceBenchmarks: { type: 'array', label: 'Performance Benchmarks', items: { type: 'object' } },
        presentationPoints: { type: 'array', label: 'Presentation Points', items: { type: 'string' } },
        decisionFactors: { type: 'array', label: 'Decision Factors', items: { type: 'string' } },
        summaryPoints: { type: 'array', label: 'Summary Points', items: { type: 'string' } }
      }
    },

    // Additional Metrics
    investmentRating: {
      type: 'string',
      label: 'Investment Rating',
      description: 'Overall investment rating'
    },
    riskRating: {
      type: 'string',
      label: 'Risk Rating',
      description: 'Overall risk rating'
    },
    liquidityRating: {
      type: 'string',
      label: 'Liquidity Rating',
      description: 'Overall liquidity rating'
    },
    taxEfficiencyRating: {
      type: 'string',
      label: 'Tax Efficiency Rating',
      description: 'Overall tax efficiency rating'
    },

    // Investment Details
    investmentMultiple: {
      type: 'number',
      label: 'Investment Multiple',
      description: 'Total investment multiple',
      unit: 'x'
    },
    modifiedIRR: {
      type: 'number',
      label: 'Modified IRR',
      description: 'Modified internal rate of return',
      unit: '%'
    },
    sortinoRatio: {
      type: 'number',
      label: 'Sortino Ratio',
      description: 'Downside risk-adjusted return measure'
    },
    beta: {
      type: 'number',
      label: 'Beta',
      description: 'Market risk measure'
    },

    // Summary
    investmentSummary: {
      type: 'object',
      label: 'Investment Summary',
      description: 'Summary of the investment analysis',
      schema: {
        totalInvestment: { type: 'number', label: 'Total Investment', unit: 'USD' },
        projectedReturn: { type: 'number', label: 'Projected Return', unit: 'USD' },
        riskLevel: { type: 'string', label: 'Risk Level' },
        liquidityLevel: { type: 'string', label: 'Liquidity Level' },
        recommendation: { type: 'string', label: 'Recommendation' }
      }
    }
  },
  features: [
    'Comprehensive investment analysis with IRR, equity multiple, and cash-on-cash returns',
    'Risk assessment with multiple risk factors and scenarios',
    'Cash flow projections with monthly and annual breakdowns',
    'Tax analysis including tax efficiency and after-tax returns',
    'Platform analysis with fee impact and comparison',
    'Liquidity analysis with secondary market options',
    'Exit scenario analysis with multiple strategies',
    'Market and economic factor integration',
    'Property-specific analysis based on type and characteristics',
    'Real-time validation with cross-field checks',
    'Comprehensive reporting with charts and comparisons',
    'Investment rating and recommendation system',
    'Performance benchmarking against industry standards',
    'Timeline and action item generation',
    'Risk mitigation strategy recommendations'
  ],
  examples: [
    {
      name: 'Multifamily Equity Investment',
      description: 'Analyze a $50,000 equity investment in a $2M multifamily property with 12% target IRR',
      inputs: {
        investmentAmount: 50000,
        investmentType: 'equity',
        propertyType: 'multifamily',
        propertyValue: 2000000,
        targetIRR: 12,
        platformFee: 2,
        liquidityOptions: 'secondary_market'
      }
    },
    {
      name: 'Commercial Debt Investment',
      description: 'Evaluate a $25,000 debt investment in a commercial property with 8% preferred return',
      inputs: {
        investmentAmount: 25000,
        investmentType: 'debt',
        propertyType: 'commercial',
        propertyValue: 5000000,
        preferredReturn: 8,
        platformFee: 1.5,
        liquidityOptions: 'buyback_program'
      }
    },
    {
      name: 'Land Development Investment',
      description: 'Assess a $100,000 investment in land development with high appreciation potential',
      inputs: {
        investmentAmount: 100000,
        investmentType: 'equity',
        propertyType: 'land',
        propertyValue: 1000000,
        marketAppreciationRate: 8,
        platformFee: 3,
        liquidityOptions: 'none'
      }
    }
  ],
  relatedCalculators: [
    'mortgage-calculator',
    'real-estate-investment-calculator',
    'cap-rate-calculator',
    'cash-on-cash-return-calculator',
    'irr-calculator',
    'real-estate-roi-calculator',
    'property-tax-calculator',
    'mortgage-payment-calculator',
    'real-estate-cash-flow-calculator',
    'investment-property-calculator'
  ]
};