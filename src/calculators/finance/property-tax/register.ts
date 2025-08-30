import { Calculator } from '@/types/calculator';
import { PropertyTaxCalculator } from './PropertyTaxCalculator';

export const propertyTaxCalculator: Calculator = {
  id: 'property-tax',
  name: 'Property Tax Calculator',
  description: 'Calculate and analyze property taxes, including assessments, exemptions, payment schedules, and long-term projections. Provides comprehensive tax analysis with historical trends, comparative data, and optimization opportunities.',
  category: 'finance',
  tags: ['property-tax', 'real-estate', 'tax-analysis', 'assessments', 'exemptions'],
  component: PropertyTaxCalculator,
  inputs: {
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Current market value of the property',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '500000',
      unit: 'USD'
    },
    propertyAddress: {
      type: 'string',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, Anytown, CA 90210'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
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
      description: 'Size of the property in square feet',
      required: true,
      min: 100,
      max: 100000,
      step: 100,
      placeholder: '2500',
      unit: 'sq ft'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15',
      unit: 'years'
    },
    propertyUse: {
      type: 'select',
      label: 'Property Use',
      description: 'How the property is used',
      required: true,
      options: [
        { value: 'primary_residence', label: 'Primary Residence' },
        { value: 'secondary_residence', label: 'Secondary Residence' },
        { value: 'investment', label: 'Investment Property' },
        { value: 'commercial', label: 'Commercial Use' },
        { value: 'vacant', label: 'Vacant' }
      ]
    },
    propertyCondition: {
      type: 'select',
      label: 'Property Condition',
      description: 'Overall condition of the property',
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
      description: 'State where property is located',
      required: true,
      placeholder: 'CA',
      maxLength: 2
    },
    county: {
      type: 'string',
      label: 'County',
      description: 'County where property is located',
      required: true,
      placeholder: 'Los Angeles'
    },
    city: {
      type: 'string',
      label: 'City',
      description: 'City where property is located',
      required: true,
      placeholder: 'Anytown'
    },
    zipCode: {
      type: 'string',
      label: 'ZIP Code',
      description: 'ZIP code of the property',
      required: true,
      placeholder: '90210',
      pattern: '^\\d{5}(-\\d{4})?$'
    },
    schoolDistrict: {
      type: 'string',
      label: 'School District',
      description: 'School district serving the property',
      required: true,
      placeholder: 'Anytown Unified'
    },
    
    // Tax Rates and Assessments
    countyTaxRate: {
      type: 'number',
      label: 'County Tax Rate',
      description: 'County property tax rate per $1000 of assessed value',
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
      description: 'City property tax rate per $1000 of assessed value',
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
      description: 'School district property tax rate per $1000 of assessed value',
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
      description: 'Special district property tax rate per $1000 of assessed value',
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
      description: 'Ratio of assessed value to market value (percentage)',
      required: true,
      min: 1,
      max: 200,
      step: 1,
      placeholder: '100',
      unit: '%'
    },
    
    // Exemptions
    homesteadExemption: {
      type: 'checkbox',
      label: 'Homestead Exemption',
      description: 'Whether the property qualifies for homestead exemption',
      required: false
    },
    homesteadExemptionAmount: {
      type: 'number',
      label: 'Homestead Exemption Amount',
      description: 'Amount of homestead exemption',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '7000',
      unit: 'USD',
      dependsOn: 'homesteadExemption'
    },
    seniorExemption: {
      type: 'checkbox',
      label: 'Senior Exemption',
      description: 'Whether the property qualifies for senior exemption',
      required: false
    },
    seniorExemptionAmount: {
      type: 'number',
      label: 'Senior Exemption Amount',
      description: 'Amount of senior exemption',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'seniorExemption'
    },
    veteranExemption: {
      type: 'checkbox',
      label: 'Veteran Exemption',
      description: 'Whether the property qualifies for veteran exemption',
      required: false
    },
    veteranExemptionAmount: {
      type: 'number',
      label: 'Veteran Exemption Amount',
      description: 'Amount of veteran exemption',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'veteranExemption'
    },
    disabilityExemption: {
      type: 'checkbox',
      label: 'Disability Exemption',
      description: 'Whether the property qualifies for disability exemption',
      required: false
    },
    disabilityExemptionAmount: {
      type: 'number',
      label: 'Disability Exemption Amount',
      description: 'Amount of disability exemption',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0',
      unit: 'USD',
      dependsOn: 'disabilityExemption'
    },
    
    // Assessment Information
    assessedValue: {
      type: 'number',
      label: 'Assessed Value',
      description: 'Current assessed value of the property',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '500000',
      unit: 'USD'
    },
    previousAssessedValue: {
      type: 'number',
      label: 'Previous Assessed Value',
      description: 'Previous year assessed value',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '480000',
      unit: 'USD'
    },
    assessmentDate: {
      type: 'date',
      label: 'Assessment Date',
      description: 'Date of current assessment',
      required: true,
      placeholder: '2024-01-01'
    },
    lastReassessmentDate: {
      type: 'date',
      label: 'Last Reassessment Date',
      description: 'Date of last reassessment',
      required: true,
      placeholder: '2020-01-01'
    },
    reassessmentCycle: {
      type: 'number',
      label: 'Reassessment Cycle',
      description: 'Years between reassessments',
      required: true,
      min: 1,
      max: 20,
      step: 1,
      placeholder: '4',
      unit: 'years'
    },
    
    // Tax Calculation Parameters
    taxYear: {
      type: 'number',
      label: 'Tax Year',
      description: 'Year for tax calculation',
      required: true,
      min: 2000,
      max: 2050,
      step: 1,
      placeholder: '2024'
    },
    paymentSchedule: {
      type: 'select',
      label: 'Payment Schedule',
      description: 'How often property taxes are paid',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ]
    },
    escrowAccount: {
      type: 'checkbox',
      label: 'Escrow Account',
      description: 'Whether taxes are paid through escrow account',
      required: false
    },
    escrowMonthlyPayment: {
      type: 'number',
      label: 'Escrow Monthly Payment',
      description: 'Current monthly escrow payment for taxes',
      required: false,
      min: 0,
      max: 10000,
      step: 10,
      placeholder: '500',
      unit: 'USD',
      dependsOn: 'escrowAccount'
    },
    escrowBalance: {
      type: 'number',
      label: 'Escrow Balance',
      description: 'Current escrow account balance',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      unit: 'USD',
      dependsOn: 'escrowAccount'
    },
    
    // Additional Taxes and Fees
    specialAssessments: {
      type: 'array',
      label: 'Special Assessments',
      description: 'Special assessments on the property',
      required: false,
      itemSchema: {
        description: { type: 'string', label: 'Description', required: true },
        amount: { type: 'number', label: 'Total Amount', required: true, min: 0 },
        duration: { type: 'number', label: 'Duration (years)', required: true, min: 1 },
        annualAmount: { type: 'number', label: 'Annual Amount', required: true, min: 0 }
      }
    },
    improvementAssessments: {
      type: 'array',
      label: 'Improvement Assessments',
      description: 'Improvement assessments on the property',
      required: false,
      itemSchema: {
        description: { type: 'string', label: 'Description', required: true },
        amount: { type: 'number', label: 'Total Amount', required: true, min: 0 },
        duration: { type: 'number', label: 'Duration (years)', required: true, min: 1 },
        annualAmount: { type: 'number', label: 'Annual Amount', required: true, min: 0 }
      }
    },
    bondAssessments: {
      type: 'array',
      label: 'Bond Assessments',
      description: 'Bond assessments on the property',
      required: false,
      itemSchema: {
        description: { type: 'string', label: 'Description', required: true },
        amount: { type: 'number', label: 'Total Amount', required: true, min: 0 },
        duration: { type: 'number', label: 'Duration (years)', required: true, min: 1 },
        annualAmount: { type: 'number', label: 'Annual Amount', required: true, min: 0 }
      }
    },
    
    // Market and Economic Factors
    marketAppreciationRate: {
      type: 'number',
      label: 'Market Appreciation Rate',
      description: 'Expected annual market appreciation rate',
      required: true,
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
      required: true,
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
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '2.0',
      unit: '%'
    },
    propertyTaxCap: {
      type: 'number',
      label: 'Property Tax Cap',
      description: 'Maximum annual increase in property taxes',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '2.0',
      unit: '%'
    },
    
    // Historical Data
    previousYearTax: {
      type: 'number',
      label: 'Previous Year Tax',
      description: 'Property tax amount from previous year',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '15000',
      unit: 'USD'
    },
    fiveYearAverageTax: {
      type: 'number',
      label: 'Five Year Average Tax',
      description: 'Average property tax over the last 5 years',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '14500',
      unit: 'USD'
    },
    tenYearAverageTax: {
      type: 'number',
      label: 'Ten Year Average Tax',
      description: 'Average property tax over the last 10 years',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '14000',
      unit: 'USD'
    },
    taxHistory: {
      type: 'array',
      label: 'Tax History',
      description: 'Historical property tax data',
      required: false,
      itemSchema: {
        year: { type: 'number', label: 'Year', required: true, min: 2000 },
        assessedValue: { type: 'number', label: 'Assessed Value', required: true, min: 0 },
        taxAmount: { type: 'number', label: 'Tax Amount', required: true, min: 0 },
        taxRate: { type: 'number', label: 'Tax Rate', required: true, min: 0 }
      }
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period',
      description: 'Number of years for analysis and projections',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '10',
      unit: 'years'
    },
    includeInflation: {
      type: 'checkbox',
      label: 'Include Inflation',
      description: 'Include inflation in projections',
      required: false
    },
    includeAppreciation: {
      type: 'checkbox',
      label: 'Include Appreciation',
      description: 'Include market appreciation in projections',
      required: false
    },
    includeExemptions: {
      type: 'checkbox',
      label: 'Include Exemptions',
      description: 'Include exemptions in analysis',
      required: false
    },
    includeSpecialAssessments: {
      type: 'checkbox',
      label: 'Include Special Assessments',
      description: 'Include special assessments in analysis',
      required: false
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
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
      description: 'Format for displaying numbers',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    },
    includeCharts: {
      type: 'checkbox',
      label: 'Include Charts',
      description: 'Include charts in the analysis',
      required: false
    },
    includeComparisons: {
      type: 'checkbox',
      label: 'Include Comparisons',
      description: 'Include comparative analysis',
      required: false
    }
  },
  outputs: {
    // Basic Tax Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Current market value of the property',
      unit: 'USD'
    },
    assessedValue: {
      type: 'number',
      label: 'Assessed Value',
      description: 'Current assessed value of the property',
      unit: 'USD'
    },
    taxableValue: {
      type: 'number',
      label: 'Taxable Value',
      description: 'Assessed value minus exemptions',
      unit: 'USD'
    },
    totalAnnualTax: {
      type: 'number',
      label: 'Total Annual Tax',
      description: 'Total annual property tax amount',
      unit: 'USD'
    },
    totalMonthlyTax: {
      type: 'number',
      label: 'Total Monthly Tax',
      description: 'Monthly property tax amount',
      unit: 'USD'
    },
    effectiveTaxRate: {
      type: 'number',
      label: 'Effective Tax Rate',
      description: 'Effective tax rate as percentage of property value',
      unit: '%'
    },
    totalTaxRate: {
      type: 'number',
      label: 'Total Tax Rate',
      description: 'Combined tax rate per $1000 of assessed value',
      unit: 'per $1000'
    },
    
    // Tax Breakdown
    countyTax: {
      type: 'number',
      label: 'County Tax',
      description: 'County portion of property tax',
      unit: 'USD'
    },
    cityTax: {
      type: 'number',
      label: 'City Tax',
      description: 'City portion of property tax',
      unit: 'USD'
    },
    schoolTax: {
      type: 'number',
      label: 'School Tax',
      description: 'School district portion of property tax',
      unit: 'USD'
    },
    specialDistrictTax: {
      type: 'number',
      label: 'Special District Tax',
      description: 'Special district portion of property tax',
      unit: 'USD'
    },
    specialAssessmentsTotal: {
      type: 'number',
      label: 'Special Assessments Total',
      description: 'Total annual special assessments',
      unit: 'USD'
    },
    improvementAssessmentsTotal: {
      type: 'number',
      label: 'Improvement Assessments Total',
      description: 'Total annual improvement assessments',
      unit: 'USD'
    },
    bondAssessmentsTotal: {
      type: 'number',
      label: 'Bond Assessments Total',
      description: 'Total annual bond assessments',
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
      description: 'Annual tax savings from exemptions',
      unit: 'USD'
    },
    exemptionPercentage: {
      type: 'number',
      label: 'Exemption Percentage',
      description: 'Percentage of assessed value exempted',
      unit: '%'
    },
    
    // Payment Amounts
    paymentAmounts: {
      type: 'object',
      label: 'Payment Amounts',
      description: 'Tax amounts for different payment schedules',
      properties: {
        annual: { type: 'number', label: 'Annual Payment', unit: 'USD' },
        semiAnnual: { type: 'number', label: 'Semi-Annual Payment', unit: 'USD' },
        quarterly: { type: 'number', label: 'Quarterly Payment', unit: 'USD' },
        monthly: { type: 'number', label: 'Monthly Payment', unit: 'USD' }
      }
    },
    
    // Escrow Analysis
    escrowAnalysis: {
      type: 'object',
      label: 'Escrow Analysis',
      description: 'Analysis of escrow account requirements',
      properties: {
        requiredMonthlyPayment: { type: 'number', label: 'Required Monthly Payment', unit: 'USD' },
        currentEscrowPayment: { type: 'number', label: 'Current Escrow Payment', unit: 'USD' },
        escrowDeficit: { type: 'number', label: 'Escrow Deficit', unit: 'USD' },
        escrowSurplus: { type: 'number', label: 'Escrow Surplus', unit: 'USD' }
      }
    },
    
    // Assessment Analysis
    assessmentToMarketRatio: {
      type: 'number',
      label: 'Assessment to Market Ratio',
      description: 'Ratio of assessed value to market value',
      unit: '%'
    },
    assessmentChange: {
      type: 'number',
      label: 'Assessment Change',
      description: 'Change in assessed value from previous year',
      unit: 'USD'
    },
    assessmentChangePercentage: {
      type: 'number',
      label: 'Assessment Change Percentage',
      description: 'Percentage change in assessed value',
      unit: '%'
    },
    
    // Historical Analysis
    taxGrowthRate: {
      type: 'number',
      label: 'Tax Growth Rate',
      description: 'Annual growth rate of property taxes',
      unit: '%'
    },
    fiveYearProjection: {
      type: 'number',
      label: 'Five Year Projection',
      description: 'Projected tax amount in 5 years',
      unit: 'USD'
    },
    tenYearProjection: {
      type: 'number',
      label: 'Ten Year Projection',
      description: 'Projected tax amount in 10 years',
      unit: 'USD'
    },
    taxBurdenTrend: {
      type: 'string',
      label: 'Tax Burden Trend',
      description: 'Trend in tax burden over time',
      enum: ['increasing', 'decreasing', 'stable']
    },
    
    // Comparative Analysis
    stateAverageTaxRate: {
      type: 'number',
      label: 'State Average Tax Rate',
      description: 'Average tax rate in the state',
      unit: 'per $1000'
    },
    countyAverageTaxRate: {
      type: 'number',
      label: 'County Average Tax Rate',
      description: 'Average tax rate in the county',
      unit: 'per $1000'
    },
    cityAverageTaxRate: {
      type: 'number',
      label: 'City Average Tax Rate',
      description: 'Average tax rate in the city',
      unit: 'per $1000'
    },
    comparisonPercentile: {
      type: 'number',
      label: 'Comparison Percentile',
      description: 'Percentile ranking compared to similar properties',
      unit: '%'
    },
    taxEfficiency: {
      type: 'string',
      label: 'Tax Efficiency',
      description: 'Efficiency rating of the property tax burden',
      enum: ['low', 'medium', 'high']
    },
    
    // Analysis Arrays
    timelineAnalysis: {
      type: 'array',
      label: 'Timeline Analysis',
      description: 'Year-by-year tax projections',
      itemSchema: {
        year: { type: 'number', label: 'Year' },
        assessedValue: { type: 'number', label: 'Projected Assessed Value', unit: 'USD' },
        taxAmount: { type: 'number', label: 'Projected Tax Amount', unit: 'USD' },
        taxRate: { type: 'number', label: 'Projected Tax Rate', unit: 'per $1000' }
      }
    },
    sensitivityMatrix: {
      type: 'array',
      label: 'Sensitivity Matrix',
      description: 'Tax sensitivity to various factors',
      itemSchema: {
        factor: { type: 'string', label: 'Factor' },
        change: { type: 'number', label: 'Change', unit: '%' },
        taxImpact: { type: 'number', label: 'Tax Impact', unit: 'USD' }
      }
    },
    scenarios: {
      type: 'array',
      label: 'Scenarios',
      description: 'Different tax scenarios',
      itemSchema: {
        scenario: { type: 'string', label: 'Scenario' },
        description: { type: 'string', label: 'Description' },
        annualTax: { type: 'number', label: 'Annual Tax', unit: 'USD' },
        monthlyTax: { type: 'number', label: 'Monthly Tax', unit: 'USD' }
      }
    },
    comparisonAnalysis: {
      type: 'array',
      label: 'Comparison Analysis',
      description: 'Comparison with similar properties',
      itemSchema: {
        propertyType: { type: 'string', label: 'Property Type' },
        averageTax: { type: 'number', label: 'Average Tax', unit: 'USD' },
        percentile: { type: 'number', label: 'Percentile', unit: '%' }
      }
    },
    marketAnalysis: {
      type: 'array',
      label: 'Market Analysis',
      description: 'Market-based tax analysis',
      itemSchema: {
        marketFactor: { type: 'string', label: 'Market Factor' },
        impact: { type: 'string', label: 'Impact' },
        recommendation: { type: 'string', label: 'Recommendation' }
      }
    },
    
    // Comprehensive Analysis
    analysis: {
      type: 'object',
      label: 'Comprehensive Analysis',
      description: 'Overall analysis and recommendations',
      properties: {
        taxRating: { type: 'string', label: 'Tax Rating', enum: ['Low', 'Medium', 'High', 'Very High'] },
        affordabilityRating: { type: 'string', label: 'Affordability Rating', enum: ['Excellent', 'Good', 'Fair', 'Poor'] },
        recommendation: { type: 'string', label: 'Recommendation' }
      }
    },
    
    // Additional Metrics
    taxPerSquareFoot: {
      type: 'number',
      label: 'Tax Per Square Foot',
      description: 'Property tax per square foot',
      unit: 'USD/sq ft'
    },
    taxPerBedroom: {
      type: 'number',
      label: 'Tax Per Bedroom',
      description: 'Property tax per bedroom (estimated)',
      unit: 'USD/bedroom'
    },
    taxPerBathroom: {
      type: 'number',
      label: 'Tax Per Bathroom',
      description: 'Property tax per bathroom (estimated)',
      unit: 'USD/bathroom'
    },
    taxBurdenRatio: {
      type: 'number',
      label: 'Tax Burden Ratio',
      description: 'Tax burden as percentage of property value',
      unit: '%'
    },
    affordabilityIndex: {
      type: 'number',
      label: 'Affordability Index',
      description: 'Tax affordability index score',
      unit: 'score'
    },
    taxEfficiencyScore: {
      type: 'number',
      label: 'Tax Efficiency Score',
      description: 'Overall tax efficiency score',
      unit: 'score'
    },
    
    // Projections
    fiveYearTaxProjection: {
      type: 'number',
      label: 'Five Year Tax Projection',
      description: 'Projected total taxes over 5 years',
      unit: 'USD'
    },
    tenYearTaxProjection: {
      type: 'number',
      label: 'Ten Year Tax Projection',
      description: 'Projected total taxes over 10 years',
      unit: 'USD'
    },
    lifetimeTaxProjection: {
      type: 'number',
      label: 'Lifetime Tax Projection',
      description: 'Projected total taxes over 30 years',
      unit: 'USD'
    },
    
    // Risk Assessment
    taxRiskScore: {
      type: 'number',
      label: 'Tax Risk Score',
      description: 'Overall tax risk assessment score',
      unit: 'score'
    },
    assessmentRisk: {
      type: 'string',
      label: 'Assessment Risk',
      description: 'Risk level for assessment changes',
      enum: ['low', 'medium', 'high']
    },
    rateChangeRisk: {
      type: 'string',
      label: 'Rate Change Risk',
      description: 'Risk level for tax rate changes',
      enum: ['low', 'medium', 'high']
    },
    exemptionRisk: {
      type: 'string',
      label: 'Exemption Risk',
      description: 'Risk level for exemption changes',
      enum: ['low', 'medium', 'high']
    },
    
    // Optimization Opportunities
    potentialSavings: {
      type: 'number',
      label: 'Potential Savings',
      description: 'Potential annual tax savings',
      unit: 'USD'
    },
    optimizationOpportunities: {
      type: 'array',
      label: 'Optimization Opportunities',
      description: 'Opportunities to optimize tax burden',
      itemSchema: {
        opportunity: { type: 'string', label: 'Opportunity' },
        potentialSavings: { type: 'number', label: 'Potential Savings', unit: 'USD' },
        difficulty: { type: 'string', label: 'Difficulty' }
      }
    },
    exemptionOpportunities: {
      type: 'array',
      label: 'Exemption Opportunities',
      description: 'Available exemption opportunities',
      itemSchema: {
        exemption: { type: 'string', label: 'Exemption' },
        eligibility: { type: 'string', label: 'Eligibility' },
        potentialSavings: { type: 'number', label: 'Potential Savings', unit: 'USD' }
      }
    },
    appealOpportunities: {
      type: 'array',
      label: 'Appeal Opportunities',
      description: 'Assessment appeal opportunities',
      itemSchema: {
        reason: { type: 'string', label: 'Appeal Reason' },
        strength: { type: 'string', label: 'Appeal Strength' },
        potentialSavings: { type: 'number', label: 'Potential Savings', unit: 'USD' }
      }
    }
  },
  features: [
    'Comprehensive property tax calculation',
    'Multiple exemption types (homestead, senior, veteran, disability)',
    'Assessment analysis and change tracking',
    'Payment schedule calculations (annual, semi-annual, quarterly, monthly)',
    'Escrow account analysis',
    'Historical tax trend analysis',
    'Long-term tax projections',
    'Comparative analysis with similar properties',
    'Market-based tax analysis',
    'Sensitivity analysis for various factors',
    'Risk assessment and scoring',
    'Optimization opportunities identification',
    'Exemption eligibility analysis',
    'Assessment appeal recommendations',
    'Tax efficiency scoring',
    'Affordability analysis',
    'Timeline projections',
    'Scenario analysis',
    'Multiple currency support',
    'Comprehensive reporting options'
  ],
  examples: [
    {
      name: 'Single Family Home in California',
      description: 'Calculate property taxes for a $500,000 single family home in Los Angeles County with homestead exemption',
      inputs: {
        propertyValue: 500000,
        propertyType: 'single_family',
        homesteadExemption: true,
        homesteadExemptionAmount: 7000,
        countyTaxRate: 1.25,
        cityTaxRate: 0.5,
        schoolTaxRate: 1.0
      }
    },
    {
      name: 'Investment Property Analysis',
      description: 'Analyze property taxes for a $750,000 investment property with no exemptions',
      inputs: {
        propertyValue: 750000,
        propertyType: 'multi_family',
        propertyUse: 'investment',
        homesteadExemption: false,
        analysisPeriod: 15
      }
    },
    {
      name: 'Senior Citizen Exemption',
      description: 'Calculate taxes for a senior citizen with multiple exemptions',
      inputs: {
        propertyValue: 400000,
        homesteadExemption: true,
        homesteadExemptionAmount: 7000,
        seniorExemption: true,
        seniorExemptionAmount: 5000,
        veteranExemption: true,
        veteranExemptionAmount: 2000
      }
    },
    {
      name: 'High-Value Property',
      description: 'Analyze taxes for a $2 million luxury property',
      inputs: {
        propertyValue: 2000000,
        propertyType: 'single_family',
        propertySize: 8000,
        assessmentRatio: 100,
        includeAppreciation: true,
        marketAppreciationRate: 5.0
      }
    },
    {
      name: 'Commercial Property',
      description: 'Calculate taxes for a commercial property with special assessments',
      inputs: {
        propertyValue: 1200000,
        propertyType: 'commercial',
        propertyUse: 'commercial',
        specialAssessments: [
          {
            description: 'Street Improvement',
            amount: 50000,
            duration: 10,
            annualAmount: 5000
          }
        ]
      }
    }
  ],
  relatedCalculators: [
    'mortgage-calculator',
    'mortgage-payment-calculator',
    'mortgage-refinance-calculator',
    'mortgage-points-calculator',
    'mortgage-rate-lock-calculator',
    'mortgage-vs-rent-calculator',
    'debt-to-income-calculator',
    'housing-expense-ratio-calculator',
    'net-operating-income-calculator',
    'price-per-square-foot-calculator',
    'private-mortgage-insurance-calculator',
    'pmi-cancellation-calculator'
  ]
};