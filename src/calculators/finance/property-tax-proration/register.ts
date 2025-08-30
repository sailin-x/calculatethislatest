import { Calculator } from '@/types/calculator';
import { PropertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';

export const propertyTaxProrationCalculator: Calculator = {
  id: 'property-tax-proration',
  name: 'Property Tax Proration Calculator',
  description: 'Calculate and analyze property tax proration for real estate transactions, including seller/buyer responsibilities, escrow analysis, and settlement summaries.',
  category: 'finance',
  tags: ['property-tax-proration', 'real-estate', 'tax-analysis', 'closing-costs', 'escrow'],
  component: PropertyTaxProrationCalculator,
  inputs: {
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'The current market value of the property',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: '500000',
      unit: 'USD'
    },
    propertyAddress: {
      type: 'string',
      label: 'Property Address',
      description: 'The full address of the property',
      required: true,
      maxLength: 200,
      placeholder: '123 Main St, Anytown, CA 90210'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'The type of property being sold',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'land', label: 'Land' },
        { value: 'agricultural', label: 'Agricultural' }
      ]
    },
    propertySize: {
      type: 'number',
      label: 'Property Size',
      description: 'The size of the property in square feet',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '2500',
      unit: 'sq ft'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age',
      description: 'The age of the property in years',
      required: false,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15',
      unit: 'years'
    },
    propertyUse: {
      type: 'select',
      label: 'Property Use',
      description: 'The current use of the property',
      required: true,
      options: [
        { value: 'primary_residence', label: 'Primary Residence' },
        { value: 'secondary_residence', label: 'Secondary Residence' },
        { value: 'investment', label: 'Investment' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'vacant', label: 'Vacant' }
      ]
    },
    propertyCondition: {
      type: 'select',
      label: 'Property Condition',
      description: 'The current condition of the property',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_repair', label: 'Needs Repair' }
      ]
    },

    // Location Information
    state: {
      type: 'string',
      label: 'State',
      description: 'The state where the property is located',
      required: true,
      maxLength: 50,
      placeholder: 'CA'
    },
    county: {
      type: 'string',
      label: 'County',
      description: 'The county where the property is located',
      required: true,
      maxLength: 100,
      placeholder: 'Los Angeles'
    },
    city: {
      type: 'string',
      label: 'City',
      description: 'The city where the property is located',
      required: true,
      maxLength: 100,
      placeholder: 'Anytown'
    },
    zipCode: {
      type: 'string',
      label: 'ZIP Code',
      description: 'The ZIP code of the property',
      required: true,
      pattern: '^\\d{5}(-\\d{4})?$',
      placeholder: '90210'
    },
    schoolDistrict: {
      type: 'string',
      label: 'School District',
      description: 'The school district serving the property',
      required: true,
      maxLength: 100,
      placeholder: 'Anytown Unified'
    },

    // Tax Rates and Assessments
    countyTaxRate: {
      type: 'number',
      label: 'County Tax Rate',
      description: 'County tax rate per $1,000 of assessed value',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '1.25',
      unit: 'per $1000'
    },
    cityTaxRate: {
      type: 'number',
      label: 'City Tax Rate',
      description: 'City tax rate per $1,000 of assessed value',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '0.5',
      unit: 'per $1000'
    },
    schoolTaxRate: {
      type: 'number',
      label: 'School Tax Rate',
      description: 'School tax rate per $1,000 of assessed value',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '1.0',
      unit: 'per $1000'
    },
    specialDistrictTaxRate: {
      type: 'number',
      label: 'Special District Tax Rate',
      description: 'Special district tax rate per $1,000 of assessed value',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '0.25',
      unit: 'per $1000'
    },
    assessmentRatio: {
      type: 'number',
      label: 'Assessment Ratio',
      description: 'The ratio of assessed value to market value (percentage)',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '100',
      unit: '%'
    },

    // Exemptions
    homesteadExemption: {
      type: 'boolean',
      label: 'Homestead Exemption',
      description: 'Whether the property qualifies for homestead exemption'
    },
    homesteadExemptionAmount: {
      type: 'number',
      label: 'Homestead Exemption Amount',
      description: 'The amount of homestead exemption',
      required: false,
      min: 0,
      step: 100,
      placeholder: '7000',
      unit: 'USD',
      dependsOn: 'homesteadExemption'
    },
    seniorExemption: {
      type: 'boolean',
      label: 'Senior Exemption',
      description: 'Whether the property qualifies for senior exemption'
    },
    seniorExemptionAmount: {
      type: 'number',
      label: 'Senior Exemption Amount',
      description: 'The amount of senior exemption',
      required: false,
      min: 0,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'seniorExemption'
    },
    veteranExemption: {
      type: 'boolean',
      label: 'Veteran Exemption',
      description: 'Whether the property qualifies for veteran exemption'
    },
    veteranExemptionAmount: {
      type: 'number',
      label: 'Veteran Exemption Amount',
      description: 'The amount of veteran exemption',
      required: false,
      min: 0,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'veteranExemption'
    },
    disabilityExemption: {
      type: 'boolean',
      label: 'Disability Exemption',
      description: 'Whether the property qualifies for disability exemption'
    },
    disabilityExemptionAmount: {
      type: 'number',
      label: 'Disability Exemption Amount',
      description: 'The amount of disability exemption',
      required: false,
      min: 0,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'disabilityExemption'
    },

    // Assessment Information
    assessedValue: {
      type: 'number',
      label: 'Assessed Value',
      description: 'The current assessed value of the property',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: '500000',
      unit: 'USD'
    },
    previousAssessedValue: {
      type: 'number',
      label: 'Previous Assessed Value',
      description: 'The previous year\'s assessed value',
      required: false,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: '480000',
      unit: 'USD'
    },
    assessmentDate: {
      type: 'date',
      label: 'Assessment Date',
      description: 'The date of the current assessment',
      required: true,
      placeholder: '2024-01-01'
    },
    lastReassessmentDate: {
      type: 'date',
      label: 'Last Reassessment Date',
      description: 'The date of the last reassessment',
      required: true,
      placeholder: '2020-01-01'
    },
    reassessmentCycle: {
      type: 'number',
      label: 'Reassessment Cycle',
      description: 'The reassessment cycle in years',
      required: false,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '4',
      unit: 'years'
    },

    // Proration Specific Information
    closingDate: {
      type: 'date',
      label: 'Closing Date',
      description: 'The date of property closing',
      required: true,
      placeholder: '2024-06-15'
    },
    taxYear: {
      type: 'number',
      label: 'Tax Year',
      description: 'The tax year for the proration',
      required: true,
      min: 1900,
      max: 2100,
      step: 1,
      placeholder: '2024'
    },
    prorationMethod: {
      type: 'select',
      label: 'Proration Method',
      description: 'The method used for calculating proration',
      required: true,
      options: [
        { value: '365_day', label: '365 Day Year' },
        { value: '360_day', label: '360 Day Year' },
        { value: 'actual_days', label: 'Actual Days' },
        { value: 'banker_30_360', label: 'Banker\'s 30/360' }
      ]
    },
    sellerOccupiedUntil: {
      type: 'date',
      label: 'Seller Occupied Until',
      description: 'The date until which the seller occupied the property',
      required: true,
      placeholder: '2024-06-14'
    },
    buyerOccupiedFrom: {
      type: 'date',
      label: 'Buyer Occupied From',
      description: 'The date from which the buyer will occupy the property',
      required: true,
      placeholder: '2024-06-15'
    },
    taxPaymentSchedule: {
      type: 'select',
      label: 'Tax Payment Schedule',
      description: 'The frequency of tax payments',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ]
    },
    lastTaxPaymentDate: {
      type: 'date',
      label: 'Last Tax Payment Date',
      description: 'The date of the last tax payment',
      required: true,
      placeholder: '2024-01-01'
    },
    nextTaxPaymentDate: {
      type: 'date',
      label: 'Next Tax Payment Date',
      description: 'The date of the next tax payment',
      required: true,
      placeholder: '2025-01-01'
    },
    lastTaxPaymentAmount: {
      type: 'number',
      label: 'Last Tax Payment Amount',
      description: 'The amount of the last tax payment',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '15000',
      unit: 'USD'
    },
    nextTaxPaymentAmount: {
      type: 'number',
      label: 'Next Tax Payment Amount',
      description: 'The amount of the next tax payment',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '15000',
      unit: 'USD'
    },

    // Escrow Information
    escrowAccount: {
      type: 'boolean',
      label: 'Escrow Account',
      description: 'Whether there is an escrow account for taxes'
    },
    escrowMonthlyPayment: {
      type: 'number',
      label: 'Escrow Monthly Payment',
      description: 'The monthly escrow payment for taxes',
      required: false,
      min: 0,
      max: 100000,
      step: 10,
      placeholder: '500',
      unit: 'USD',
      dependsOn: 'escrowAccount'
    },
    escrowBalance: {
      type: 'number',
      label: 'Escrow Balance',
      description: 'The current escrow balance',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '2000',
      unit: 'USD',
      dependsOn: 'escrowAccount'
    },
    escrowProrationMethod: {
      type: 'select',
      label: 'Escrow Proration Method',
      description: 'The method for prorating escrow funds',
      required: true,
      options: [
        { value: 'seller_pays_all', label: 'Seller Pays All' },
        { value: 'buyer_pays_all', label: 'Buyer Pays All' },
        { value: 'split_50_50', label: 'Split 50/50' },
        { value: 'custom_split', label: 'Custom Split' }
      ]
    },
    customEscrowSplit: {
      type: 'number',
      label: 'Custom Escrow Split',
      description: 'The percentage of escrow that seller pays (0-100)',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '50',
      unit: '%',
      dependsOn: 'escrowProrationMethod'
    },

    // Additional Taxes and Fees
    specialAssessments: {
      type: 'array',
      label: 'Special Assessments',
      description: 'Special assessments on the property',
      required: false,
      schema: {
        description: { type: 'string', required: true },
        amount: { type: 'number', required: true, min: 0 },
        duration: { type: 'number', required: true, min: 0 },
        annualAmount: { type: 'number', required: true, min: 0 },
        startDate: { type: 'date', required: true },
        endDate: { type: 'date', required: true },
        prorationIncluded: { type: 'boolean', required: true }
      }
    },
    improvementAssessments: {
      type: 'array',
      label: 'Improvement Assessments',
      description: 'Improvement assessments on the property',
      required: false,
      schema: {
        description: { type: 'string', required: true },
        amount: { type: 'number', required: true, min: 0 },
        duration: { type: 'number', required: true, min: 0 },
        annualAmount: { type: 'number', required: true, min: 0 },
        startDate: { type: 'date', required: true },
        endDate: { type: 'date', required: true },
        prorationIncluded: { type: 'boolean', required: true }
      }
    },
    bondAssessments: {
      type: 'array',
      label: 'Bond Assessments',
      description: 'Bond assessments on the property',
      required: false,
      schema: {
        description: { type: 'string', required: true },
        amount: { type: 'number', required: true, min: 0 },
        duration: { type: 'number', required: true, min: 0 },
        annualAmount: { type: 'number', required: true, min: 0 },
        startDate: { type: 'date', required: true },
        endDate: { type: 'date', required: true },
        prorationIncluded: { type: 'boolean', required: true }
      }
    },

    // Market and Economic Factors
    marketAppreciationRate: {
      type: 'number',
      label: 'Market Appreciation Rate',
      description: 'Expected annual market appreciation rate',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '3.5',
      unit: '%'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate',
      description: 'Expected annual inflation rate',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '2.5',
      unit: '%'
    },
    localEconomicGrowth: {
      type: 'number',
      label: 'Local Economic Growth',
      description: 'Expected local economic growth rate',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '2.0',
      unit: '%'
    },
    propertyTaxCap: {
      type: 'number',
      label: 'Property Tax Cap',
      description: 'Maximum annual property tax increase percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '2.0',
      unit: '%'
    },

    // Historical Data
    previousYearTax: {
      type: 'number',
      label: 'Previous Year Tax',
      description: 'Property tax amount for the previous year',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '15000',
      unit: 'USD'
    },
    fiveYearAverageTax: {
      type: 'number',
      label: 'Five Year Average Tax',
      description: 'Average property tax over the past five years',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '14500',
      unit: 'USD'
    },
    tenYearAverageTax: {
      type: 'number',
      label: 'Ten Year Average Tax',
      description: 'Average property tax over the past ten years',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '14000',
      unit: 'USD'
    },
    taxHistory: {
      type: 'array',
      label: 'Tax History',
      description: 'Historical tax data for the property',
      required: false,
      schema: {
        year: { type: 'number', required: true, min: 1900, max: 2100 },
        assessedValue: { type: 'number', required: true, min: 0 },
        taxAmount: { type: 'number', required: true, min: 0 },
        taxRate: { type: 'number', required: true, min: 0 },
        paymentDate: { type: 'date', required: true },
        prorationAmount: { type: 'number', required: false, min: 0 }
      }
    },

    // Proration Analysis Parameters
    includeInflation: {
      type: 'boolean',
      label: 'Include Inflation',
      description: 'Whether to include inflation in calculations'
    },
    includeAppreciation: {
      type: 'boolean',
      label: 'Include Appreciation',
      description: 'Whether to include market appreciation in calculations'
    },
    includeExemptions: {
      type: 'boolean',
      label: 'Include Exemptions',
      description: 'Whether to include exemptions in calculations'
    },
    includeSpecialAssessments: {
      type: 'boolean',
      label: 'Include Special Assessments',
      description: 'Whether to include special assessments in calculations'
    },
    prorationAccuracy: {
      type: 'select',
      label: 'Proration Accuracy',
      description: 'The desired accuracy level for proration calculations',
      required: true,
      options: [
        { value: 'exact', label: 'Exact' },
        { value: 'estimated', label: 'Estimated' },
        { value: 'approximate', label: 'Approximate' }
      ]
    },

    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'The currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' }
      ]
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'The format for displaying numerical results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Whether to include charts in the analysis'
    },
    includeComparisons: {
      type: 'boolean',
      label: 'Include Comparisons',
      description: 'Whether to include comparison analysis'
    },
    includeTimeline: {
      type: 'boolean',
      label: 'Include Timeline',
      description: 'Whether to include timeline analysis'
    }
  },
  outputs: {
    // Basic Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'The property value used in calculations',
      unit: 'USD'
    },
    assessedValue: {
      type: 'number',
      label: 'Assessed Value',
      description: 'The assessed value of the property',
      unit: 'USD'
    },
    taxableValue: {
      type: 'number',
      label: 'Taxable Value',
      description: 'The value subject to taxation after exemptions',
      unit: 'USD'
    },
    closingDate: {
      type: 'string',
      label: 'Closing Date',
      description: 'The date of property closing'
    },
    taxYear: {
      type: 'number',
      label: 'Tax Year',
      description: 'The tax year for the proration'
    },

    // Proration Calculations
    totalDaysInYear: {
      type: 'number',
      label: 'Total Days in Year',
      description: 'Total days in the tax year based on proration method',
      unit: 'days'
    },
    sellerDays: {
      type: 'number',
      label: 'Seller Days',
      description: 'Number of days seller is responsible for',
      unit: 'days'
    },
    buyerDays: {
      type: 'number',
      label: 'Buyer Days',
      description: 'Number of days buyer is responsible for',
      unit: 'days'
    },
    sellerPercentage: {
      type: 'number',
      label: 'Seller Percentage',
      description: 'Percentage of year seller is responsible for',
      unit: '%'
    },
    buyerPercentage: {
      type: 'number',
      label: 'Buyer Percentage',
      description: 'Percentage of year buyer is responsible for',
      unit: '%'
    },

    // Tax Responsibilities
    totalAnnualTax: {
      type: 'number',
      label: 'Total Annual Tax',
      description: 'Total annual property tax amount',
      unit: 'USD'
    },
    sellerTaxResponsibility: {
      type: 'number',
      label: 'Seller Tax Responsibility',
      description: 'Seller\'s portion of the annual tax',
      unit: 'USD'
    },
    buyerTaxResponsibility: {
      type: 'number',
      label: 'Buyer Tax Responsibility',
      description: 'Buyer\'s portion of the annual tax',
      unit: 'USD'
    },
    sellerTaxCredit: {
      type: 'number',
      label: 'Seller Tax Credit',
      description: 'Tax credit due to seller at closing',
      unit: 'USD'
    },
    buyerTaxDebit: {
      type: 'number',
      label: 'Buyer Tax Debit',
      description: 'Tax debit due from buyer at closing',
      unit: 'USD'
    },

    // Tax Breakdown
    countyTax: {
      type: 'number',
      label: 'County Tax',
      description: 'County portion of the tax',
      unit: 'USD'
    },
    cityTax: {
      type: 'number',
      label: 'City Tax',
      description: 'City portion of the tax',
      unit: 'USD'
    },
    schoolTax: {
      type: 'number',
      label: 'School Tax',
      description: 'School district portion of the tax',
      unit: 'USD'
    },
    specialDistrictTax: {
      type: 'number',
      label: 'Special District Tax',
      description: 'Special district portion of the tax',
      unit: 'USD'
    },
    specialAssessmentsTotal: {
      type: 'number',
      label: 'Special Assessments Total',
      description: 'Total special assessments included in proration',
      unit: 'USD'
    },
    improvementAssessmentsTotal: {
      type: 'number',
      label: 'Improvement Assessments Total',
      description: 'Total improvement assessments included in proration',
      unit: 'USD'
    },
    bondAssessmentsTotal: {
      type: 'number',
      label: 'Bond Assessments Total',
      description: 'Total bond assessments included in proration',
      unit: 'USD'
    },

    // Exemptions
    totalExemptions: {
      type: 'number',
      label: 'Total Exemptions',
      description: 'Total amount of all exemptions',
      unit: 'USD'
    },
    exemptionSavings: {
      type: 'number',
      label: 'Exemption Savings',
      description: 'Tax savings from exemptions',
      unit: 'USD'
    },
    exemptionPercentage: {
      type: 'number',
      label: 'Exemption Percentage',
      description: 'Percentage of assessed value covered by exemptions',
      unit: '%'
    },

    // Payment Analysis
    lastPaymentDate: {
      type: 'string',
      label: 'Last Payment Date',
      description: 'Date of the last tax payment'
    },
    nextPaymentDate: {
      type: 'string',
      label: 'Next Payment Date',
      description: 'Date of the next tax payment'
    },
    daysSinceLastPayment: {
      type: 'number',
      label: 'Days Since Last Payment',
      description: 'Days since the last tax payment',
      unit: 'days'
    },
    daysUntilNextPayment: {
      type: 'number',
      label: 'Days Until Next Payment',
      description: 'Days until the next tax payment',
      unit: 'days'
    },
    sellerPaymentCredit: {
      type: 'number',
      label: 'Seller Payment Credit',
      description: 'Credit for seller\'s portion of last payment',
      unit: 'USD'
    },
    buyerPaymentDebit: {
      type: 'number',
      label: 'Buyer Payment Debit',
      description: 'Debit for buyer\'s portion of next payment',
      unit: 'USD'
    },

    // Escrow Analysis
    escrowProrationAmount: {
      type: 'number',
      label: 'Escrow Proration Amount',
      description: 'Total escrow amount to be prorated',
      unit: 'USD'
    },
    sellerEscrowCredit: {
      type: 'number',
      label: 'Seller Escrow Credit',
      description: 'Escrow credit due to seller',
      unit: 'USD'
    },
    buyerEscrowDebit: {
      type: 'number',
      label: 'Buyer Escrow Debit',
      description: 'Escrow debit due from buyer',
      unit: 'USD'
    },
    escrowDeficit: {
      type: 'number',
      label: 'Escrow Deficit',
      description: 'Amount escrow is short for annual taxes',
      unit: 'USD'
    },
    escrowSurplus: {
      type: 'number',
      label: 'Escrow Surplus',
      description: 'Amount escrow exceeds annual taxes',
      unit: 'USD'
    },

    // Proration Summary
    netSellerCredit: {
      type: 'number',
      label: 'Net Seller Credit',
      description: 'Total credit due to seller at closing',
      unit: 'USD'
    },
    netBuyerDebit: {
      type: 'number',
      label: 'Net Buyer Debit',
      description: 'Total debit due from buyer at closing',
      unit: 'USD'
    },
    prorationBalance: {
      type: 'number',
      label: 'Proration Balance',
      description: 'Net amount due at closing (positive = buyer pays)',
      unit: 'USD'
    },
    prorationAccuracy: {
      type: 'string',
      label: 'Proration Accuracy',
      description: 'The accuracy level of the proration calculation'
    },

    // Analysis Arrays
    prorationTimeline: {
      type: 'array',
      label: 'Proration Timeline',
      description: 'Timeline of proration events and amounts',
      schema: {
        date: { type: 'string', required: true },
        event: { type: 'string', required: true },
        sellerAmount: { type: 'number', required: true },
        buyerAmount: { type: 'number', required: true },
        runningBalance: { type: 'number', required: true },
        description: { type: 'string', required: true }
      }
    },
    paymentSchedule: {
      type: 'array',
      label: 'Payment Schedule',
      description: 'Schedule of future tax payments',
      schema: {
        date: { type: 'string', required: true },
        amount: { type: 'number', required: true },
        responsibleParty: { type: 'string', required: true },
        sellerShare: { type: 'number', required: true },
        buyerShare: { type: 'number', required: true },
        status: { type: 'string', required: true }
      }
    },

    // Analysis Object
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis of the proration',
      schema: {
        prorationRating: { type: 'string', required: true },
        accuracyRating: { type: 'string', required: true },
        fairnessRating: { type: 'string', required: true },
        recommendation: { type: 'string', required: true },
        keyStrengths: { type: 'array', required: true },
        keyWeaknesses: { type: 'array', required: true },
        optimizationSuggestions: { type: 'array', required: true },
        prorationRisks: { type: 'array', required: true },
        mitigationStrategies: { type: 'array', required: true },
        contingencyPlans: { type: 'array', required: true },
        costFactors: { type: 'array', required: true },
        potentialSavings: { type: 'number', required: true },
        optimizationOpportunities: { type: 'array', required: true },
        legalRequirements: { type: 'array', required: true },
        complianceIssues: { type: 'array', required: true },
        documentationNeeds: { type: 'array', required: true },
        marketFactors: { type: 'array', required: true },
        economicImpact: { type: 'array', required: true },
        futureProjections: { type: 'array', required: true },
        nextSteps: { type: 'array', required: true },
        timeline: { type: 'array', required: true },
        priorityActions: { type: 'array', required: true },
        performanceBenchmarks: { type: 'array', required: true },
        presentationPoints: { type: 'array', required: true },
        decisionFactors: { type: 'array', required: true },
        summaryPoints: { type: 'array', required: true }
      }
    },

    // Additional Metrics
    prorationEfficiency: {
      type: 'string',
      label: 'Proration Efficiency',
      description: 'Efficiency rating of the proration calculation'
    },
    prorationComplexity: {
      type: 'string',
      label: 'Proration Complexity',
      description: 'Complexity rating of the proration calculation'
    },
    prorationRisk: {
      type: 'string',
      label: 'Proration Risk',
      description: 'Risk rating of the proration calculation'
    },

    // Proration Details
    prorationMethod: {
      type: 'string',
      label: 'Proration Method',
      description: 'The method used for proration calculations'
    },
    prorationFormula: {
      type: 'string',
      label: 'Proration Formula',
      description: 'The formula used for proration calculations'
    },
    prorationNotes: {
      type: 'array',
      label: 'Proration Notes',
      description: 'Additional notes about the proration calculation'
    },

    // Settlement Summary
    settlementSummary: {
      type: 'object',
      label: 'Settlement Summary',
      description: 'Summary of settlement amounts and responsibilities',
      schema: {
        totalCredits: { type: 'number', required: true },
        totalDebits: { type: 'number', required: true },
        netAmount: { type: 'number', required: true },
        responsibleParty: { type: 'string', required: true },
        dueDate: { type: 'string', required: true }
      }
    }
  },
  features: [
    'Comprehensive property tax proration calculations',
    'Multiple proration methods (365-day, 360-day, actual days, banker\'s 30/360)',
    'Seller and buyer responsibility calculations',
    'Escrow account analysis and proration',
    'Special assessments, improvement assessments, and bond assessments',
    'Exemption calculations (homestead, senior, veteran, disability)',
    'Tax breakdown by component (county, city, school, special districts)',
    'Payment schedule analysis',
    'Timeline analysis of proration events',
    'Risk assessment and mitigation strategies',
    'Legal compliance analysis',
    'Market and economic factor considerations',
    'Performance benchmarks and comparisons',
    'Comprehensive analysis and recommendations',
    'Settlement summary with responsible party identification',
    'Multiple currency support',
    'Flexible display formats',
    'Real-time validation and error handling',
    'Cross-field validation and business logic checks',
    'Historical tax data analysis',
    'Future projections and trend analysis'
  ],
  examples: [
    {
      title: 'Standard Residential Closing',
      description: 'A typical residential property closing with homestead exemption and escrow account',
      inputs: {
        propertyValue: 500000,
        propertyType: 'single_family',
        closingDate: '2024-06-15',
        prorationMethod: '365_day',
        homesteadExemption: true,
        homesteadExemptionAmount: 7000,
        escrowAccount: true,
        escrowProrationMethod: 'split_50_50'
      }
    },
    {
      title: 'Commercial Property with Special Assessments',
      description: 'A commercial property with multiple special assessments and no exemptions',
      inputs: {
        propertyValue: 2000000,
        propertyType: 'commercial',
        closingDate: '2024-09-30',
        prorationMethod: 'actual_days',
        homesteadExemption: false,
        specialAssessments: [
          {
            description: 'Street Improvement',
            amount: 50000,
            duration: 20,
            annualAmount: 2500,
            startDate: '2024-01-01',
            endDate: '2044-01-01',
            prorationIncluded: true
          }
        ]
      }
    },
    {
      title: 'Investment Property with Multiple Exemptions',
      description: 'An investment property with senior and veteran exemptions',
      inputs: {
        propertyValue: 750000,
        propertyType: 'multi_family',
        closingDate: '2024-12-31',
        prorationMethod: '360_day',
        seniorExemption: true,
        seniorExemptionAmount: 5000,
        veteranExemption: true,
        veteranExemptionAmount: 3000
      }
    }
  ],
  relatedCalculators: [
    'property-tax',
    'mortgage-calculator',
    'closing-costs',
    'escrow-calculator',
    'real-estate-investment',
    'cap-rate',
    'cash-on-cash-return',
    'debt-service-coverage-ratio',
    'loan-to-value',
    'down-payment'
  ]
};