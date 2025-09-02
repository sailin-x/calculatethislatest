import { Calculator } from '@/types/calculator';
import { NetOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';

export const netOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income',
  name: 'Net Operating Income (NOI) Calculator',
  description: 'Calculate and analyze Net Operating Income (NOI) for real estate properties. Comprehensive analysis including income breakdown, expense analysis, performance metrics, market comparison, and sensitivity analysis to evaluate property profitability and investment potential.',
  category: 'finance',
  tags: ['noi', 'net-operating-income', 'real-estate', 'property', 'investment', 'profitability', 'cash-flow', 'expense-analysis', 'income-analysis', 'market-comparison', 'sensitivity-analysis', 'performance-metrics'],
  component: NetOperatingIncomeCalculator,
  inputs: {
    // Property Information
    propertyValue: {
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 10000,
      max: 100000000,
      step: 1000,
      placeholder: '1000000',
      description: 'Current market value of the property'
    },
    propertyAddress: {
      label: 'Property Address',
      type: 'text',
      required: false,
      placeholder: '123 Main St, Anytown, USA',
      description: 'Property address for reference'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'land', label: 'Land' },
        { value: 'other', label: 'Other' }
      ],
      description: 'Type of property being analyzed'
    },
    propertySize: {
      label: 'Property Size (sq ft)',
      type: 'number',
      required: true,
      min: 100,
      max: 1000000,
      step: 50,
      placeholder: '10000',
      description: 'Total square footage of the property'
    },
    propertyAge: {
      label: 'Property Age (years)',
      type: 'number',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15',
      description: 'Age of the property in years'
    },
    propertyClass: {
      label: 'Property Class',
      type: 'select',
      required: true,
      options: [
        { value: 'class_a', label: 'Class A' },
        { value: 'class_b', label: 'Class B' },
        { value: 'class_c', label: 'Class C' },
        { value: 'class_d', label: 'Class D' }
      ],
      description: 'Property class rating'
    },
    propertyCondition: {
      label: 'Property Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      description: 'Current condition of the property'
    },

    // Income Information
    grossRentalIncome: {
      label: 'Gross Rental Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '120000',
      description: 'Annual gross rental income from the property'
    },
    otherIncome: {
      label: 'Other Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '5000',
      description: 'Other annual income sources'
    },
    vacancyRate: {
      label: 'Vacancy Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '5',
      description: 'Expected vacancy rate as a percentage'
    },
    creditLossRate: {
      label: 'Credit Loss Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '2',
      description: 'Expected credit loss rate as a percentage'
    },
    lateFeeIncome: {
      label: 'Late Fee Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1000',
      description: 'Annual late fee income'
    },
    parkingIncome: {
      label: 'Parking Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '3000',
      description: 'Annual parking income'
    },
    storageIncome: {
      label: 'Storage Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 200000,
      step: 100,
      placeholder: '2000',
      description: 'Annual storage income'
    },
    laundryIncome: {
      label: 'Laundry Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1500',
      description: 'Annual laundry income'
    },
    vendingIncome: {
      label: 'Vending Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '800',
      description: 'Annual vending machine income'
    },
    advertisingIncome: {
      label: 'Advertising Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '500',
      description: 'Annual advertising income'
    },
    utilityReimbursement: {
      label: 'Utility Reimbursement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '2000',
      description: 'Annual utility reimbursement from tenants'
    },
    petFees: {
      label: 'Pet Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '1200',
      description: 'Annual pet fees'
    },
    applicationFees: {
      label: 'Application Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 25000,
      step: 25,
      placeholder: '800',
      description: 'Annual application fees'
    },
    leaseTerminationFees: {
      label: 'Lease Termination Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '500',
      description: 'Annual lease termination fees'
    },
    otherMiscellaneousIncome: {
      label: 'Other Miscellaneous Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1000',
      description: 'Other miscellaneous income sources'
    },

    // Operating Expenses
    propertyManagementFees: {
      label: 'Property Management Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '6000',
      description: 'Annual property management fees'
    },
    propertyTaxes: {
      label: 'Property Taxes',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 2000000,
      step: 100,
      placeholder: '15000',
      description: 'Annual property taxes'
    },
    propertyInsurance: {
      label: 'Property Insurance',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '8000',
      description: 'Annual property insurance costs'
    },
    utilities: {
      label: 'Utilities',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '12000',
      description: 'Annual utility costs'
    },
    maintenanceAndRepairs: {
      label: 'Maintenance & Repairs',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '10000',
      description: 'Annual maintenance and repair costs'
    },
    landscaping: {
      label: 'Landscaping',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Annual landscaping costs'
    },
    janitorial: {
      label: 'Janitorial',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 200000,
      step: 100,
      placeholder: '5000',
      description: 'Annual janitorial costs'
    },
    security: {
      label: 'Security',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 150000,
      step: 100,
      placeholder: '4000',
      description: 'Annual security costs'
    },
    pestControl: {
      label: 'Pest Control',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '1500',
      description: 'Annual pest control costs'
    },
    trashRemoval: {
      label: 'Trash Removal',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      description: 'Annual trash removal costs'
    },
    snowRemoval: {
      label: 'Snow Removal',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '1000',
      description: 'Annual snow removal costs'
    },
    advertising: {
      label: 'Advertising',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      description: 'Annual advertising costs'
    },
    legalFees: {
      label: 'Legal Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1500',
      description: 'Annual legal fees'
    },
    accountingFees: {
      label: 'Accounting Fees',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      description: 'Annual accounting fees'
    },
    professionalServices: {
      label: 'Professional Services',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1000',
      description: 'Annual professional services costs'
    },
    licensesAndPermits: {
      label: 'Licenses & Permits',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '500',
      description: 'Annual licenses and permits costs'
    },
    supplies: {
      label: 'Supplies',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '1000',
      description: 'Annual supplies costs'
    },
    equipmentRental: {
      label: 'Equipment Rental',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 50000,
      step: 50,
      placeholder: '500',
      description: 'Annual equipment rental costs'
    },
    contractServices: {
      label: 'Contract Services',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      description: 'Annual contract services costs'
    },
    otherOperatingExpenses: {
      label: 'Other Operating Expenses',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1500',
      description: 'Other annual operating expenses'
    },

    // Capital Expenditures
    roofReplacement: {
      label: 'Roof Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '5000',
      description: 'Annual roof replacement costs'
    },
    hvacReplacement: {
      label: 'HVAC Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 300000,
      step: 100,
      placeholder: '3000',
      description: 'Annual HVAC replacement costs'
    },
    plumbingReplacement: {
      label: 'Plumbing Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 200000,
      step: 100,
      placeholder: '2000',
      description: 'Annual plumbing replacement costs'
    },
    electricalReplacement: {
      label: 'Electrical Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 150000,
      step: 100,
      placeholder: '1500',
      description: 'Annual electrical replacement costs'
    },
    flooringReplacement: {
      label: 'Flooring Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 200000,
      step: 100,
      placeholder: '2000',
      description: 'Annual flooring replacement costs'
    },
    painting: {
      label: 'Painting',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1500',
      description: 'Annual painting costs'
    },
    applianceReplacement: {
      label: 'Appliance Replacement',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1000',
      description: 'Annual appliance replacement costs'
    },
    structuralRepairs: {
      label: 'Structural Repairs',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '2000',
      description: 'Annual structural repair costs'
    },
    otherCapitalExpenditures: {
      label: 'Other Capital Expenditures',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 200000,
      step: 100,
      placeholder: '1000',
      description: 'Other annual capital expenditures'
    },

    // Market Information
    marketLocation: {
      label: 'Market Location',
      type: 'select',
      required: true,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' }
      ],
      description: 'Market location type'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'growing', label: 'Growing' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ],
      description: 'Current market condition'
    },
    marketGrowthRate: {
      label: 'Market Growth Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected market growth rate'
    },
    comparableNOI: {
      label: 'Comparable NOI',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '85000',
      description: 'NOI of comparable properties'
    },
    comparableCapRate: {
      label: 'Comparable Cap Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '8.5',
      description: 'Cap rate of comparable properties'
    },

    // Analysis Parameters
    analysisPeriod: {
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '10',
      description: 'Time period for analysis'
    },
    inflationRate: {
      label: 'Inflation Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 30,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    expenseGrowthRate: {
      label: 'Expense Growth Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 30,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected annual expense growth rate'
    },
    incomeGrowthRate: {
      label: 'Income Growth Rate (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -10,
      max: 30,
      step: 0.1,
      placeholder: '3.5',
      description: 'Expected annual income growth rate'
    },
    vacancyTrend: {
      label: 'Vacancy Trend (%)',
      type: 'number',
      unit: '%',
      required: true,
      min: -20,
      max: 20,
      step: 0.1,
      placeholder: '0',
      description: 'Expected annual change in vacancy rate'
    },

    // Reporting Preferences
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' },
        { value: 'AUD', label: 'Australian Dollar (A$)' }
      ],
      description: 'Currency for calculations and display'
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      required: true,
      options: [
        { value: 'currency', label: 'Currency' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'number', label: 'Number' }
      ],
      description: 'Format for displaying numerical results'
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      description: 'Whether to include visual charts in results'
    }
  },
  outputs: {
    netOperatingIncome: {
      label: 'Net Operating Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income (NOI)'
    },
    noiMargin: {
      label: 'NOI Margin',
      type: 'number',
      unit: '%',
      description: 'NOI as a percentage of effective gross income'
    },
    noiPerSquareFoot: {
      label: 'NOI per Square Foot',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'NOI per square foot of property'
    },
    noiPerUnit: {
      label: 'NOI per Unit',
      type: 'number',
      unit: 'USD',
      description: 'NOI per unit (for multifamily properties)'
    },
    totalGrossIncome: {
      label: 'Total Gross Income',
      type: 'number',
      unit: 'USD',
      description: 'Total annual gross income from all sources'
    },
    effectiveGrossIncome: {
      label: 'Effective Gross Income',
      type: 'number',
      unit: 'USD',
      description: 'Gross income after vacancy and credit losses'
    },
    vacancyLoss: {
      label: 'Vacancy Loss',
      type: 'number',
      unit: 'USD',
      description: 'Income lost due to vacancy'
    },
    creditLoss: {
      label: 'Credit Loss',
      type: 'number',
      unit: 'USD',
      description: 'Income lost due to credit issues'
    },
    netRentalIncome: {
      label: 'Net Rental Income',
      type: 'number',
      unit: 'USD',
      description: 'Net rental income after losses'
    },
    totalOperatingExpenses: {
      label: 'Total Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total annual operating expenses'
    },
    totalCapitalExpenditures: {
      label: 'Total Capital Expenditures',
      type: 'number',
      unit: 'USD',
      description: 'Total annual capital expenditures'
    },
    totalExpenses: {
      label: 'Total Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total annual expenses (operating + capital)'
    },
    expenseRatio: {
      label: 'Expense Ratio',
      type: 'number',
      unit: '%',
      description: 'Operating expenses as percentage of effective gross income'
    },
    incomeRatio: {
      label: 'Income Ratio',
      type: 'number',
      unit: '%',
      description: 'Net rental income as percentage of effective gross income'
    },
    vacancyLossRatio: {
      label: 'Vacancy Loss Ratio',
      type: 'number',
      unit: '%',
      description: 'Vacancy loss as percentage of total gross income'
    },
    creditLossRatio: {
      label: 'Credit Loss Ratio',
      type: 'number',
      unit: '%',
      description: 'Credit loss as percentage of total gross income'
    },
    operatingEfficiency: {
      label: 'Operating Efficiency',
      type: 'number',
      unit: '%',
      description: 'NOI as percentage of effective gross income'
    },
    noiVsMarket: {
      label: 'NOI vs Market',
      type: 'number',
      unit: '%',
      description: 'Percentage difference from comparable NOI'
    },
    efficiencyVsMarket: {
      label: 'Efficiency vs Market',
      type: 'number',
      unit: '%',
      description: 'Percentage difference from comparable cap rate'
    },
    marketPosition: {
      label: 'Market Position',
      type: 'string',
      description: 'Property position relative to market (Market Leader, Above Market, etc.)'
    },
    noiTrend: {
      label: 'NOI Trend',
      type: 'string',
      description: 'Expected NOI trend (increasing, stable, decreasing)'
    },
    projectedNOI: {
      label: 'Projected NOI',
      type: 'number',
      unit: 'USD',
      description: 'Projected NOI at end of analysis period'
    },
    noiGrowthRate: {
      label: 'NOI Growth Rate',
      type: 'number',
      unit: '%',
      description: 'Annual NOI growth rate'
    },
    incomeSensitivity: {
      label: 'Income Sensitivity',
      type: 'number',
      unit: '%',
      description: 'Sensitivity of NOI to income changes'
    },
    expenseSensitivity: {
      label: 'Expense Sensitivity',
      type: 'number',
      unit: '%',
      description: 'Sensitivity of NOI to expense changes'
    },
    vacancySensitivity: {
      label: 'Vacancy Sensitivity',
      type: 'number',
      unit: '%',
      description: 'Sensitivity of NOI to vacancy changes'
    },
    breakEvenVacancy: {
      label: 'Break-Even Vacancy',
      type: 'number',
      unit: '%',
      description: 'Vacancy rate at which NOI equals zero'
    },
    analysis: {
      label: 'Analysis Report',
      type: 'object',
      description: 'Detailed analysis with recommendation, ratings, and insights'
    },
    metrics: {
      label: 'Performance Metrics',
      type: 'object',
      description: 'Comprehensive performance metrics'
    },
    incomeBreakdown: {
      label: 'Income Breakdown',
      type: 'array',
      description: 'Detailed breakdown of income sources'
    },
    expenseBreakdown: {
      label: 'Expense Breakdown',
      type: 'array',
      description: 'Detailed breakdown of operating expenses'
    },
    capitalExpenditureBreakdown: {
      label: 'Capital Expenditure Breakdown',
      type: 'array',
      description: 'Detailed breakdown of capital expenditures'
    },
    projections: {
      label: 'Projections',
      type: 'array',
      description: 'Year-by-year projections'
    },
    sensitivityMatrix: {
      label: 'Sensitivity Matrix',
      type: 'array',
      description: 'Sensitivity analysis for different scenarios'
    }
  },
  features: [
    'Comprehensive NOI calculation and analysis',
    'Detailed income and expense breakdowns',
    'Performance metrics and ratios',
    'Market comparison analysis',
    'Sensitivity analysis for key variables',
    'Trend analysis and projections',
    'Capital expenditure tracking',
    'Vacancy and credit loss analysis',
    'Operating efficiency metrics',
    'Break-even analysis',
    'Property class and condition assessment',
    'Market position evaluation',
    'Risk assessment and recommendations',
    'Visual charts and graphs',
    'Export and reporting capabilities'
  ],
  examples: [
    {
      name: 'Commercial Office Building',
      description: 'Class A office building with $1.2M annual rent and $200K operating expenses',
      inputs: {
        propertyValue: 15000000,
        propertyType: 'office',
        propertySize: 50000,
        grossRentalIncome: 1200000,
        propertyTaxes: 150000,
        propertyInsurance: 75000,
        utilities: 120000,
        maintenanceAndRepairs: 80000
      }
    },
    {
      name: 'Multifamily Apartment Complex',
      description: '200-unit apartment complex with mixed income streams',
      inputs: {
        propertyValue: 25000000,
        propertyType: 'multifamily',
        propertySize: 150000,
        grossRentalIncome: 2400000,
        parkingIncome: 120000,
        laundryIncome: 60000,
        propertyManagementFees: 120000,
        propertyTaxes: 250000,
        utilities: 180000
      }
    },
    {
      name: 'Retail Shopping Center',
      description: 'Neighborhood shopping center with anchor tenant and small shops',
      inputs: {
        propertyValue: 8000000,
        propertyType: 'retail',
        propertySize: 40000,
        grossRentalIncome: 800000,
        otherIncome: 50000,
        propertyTaxes: 80000,
        propertyInsurance: 40000,
        maintenanceAndRepairs: 60000,
        advertising: 15000
      }
    },
    {
      name: 'Industrial Warehouse',
      description: 'Modern warehouse facility with high efficiency',
      inputs: {
        propertyValue: 12000000,
        propertyType: 'warehouse',
        propertySize: 80000,
        grossRentalIncome: 960000,
        propertyTaxes: 120000,
        propertyInsurance: 60000,
        utilities: 80000,
        maintenanceAndRepairs: 40000,
        security: 24000
      }
    }
  ],
  relatedCalculators: [
    'cap-rate',
    'cash-flow',
    'cash-on-cash-return',
    'gross-rent-multiplier',
    'debt-service-coverage-ratio',
    'loan-to-value-ratio',
    'rental-property-roi',
    'commercial-real-estate',
    'property-tax',
    'mortgage-payment',
    'investment-return',
    'break-even-analysis'
  ]
};