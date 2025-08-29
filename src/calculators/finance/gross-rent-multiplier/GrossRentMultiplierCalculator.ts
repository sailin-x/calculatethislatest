import { Calculator } from '../../types';
import { GrossRentMultiplierInputs, GrossRentMultiplierOutputs } from './types';
import { calculateGrossRentMultiplier } from './formulas';
import { validateGrossRentMultiplierInputs } from './validation';
import { generateGrossRentMultiplierReport } from './formulas';

export const GrossRentMultiplierCalculator: Calculator<GrossRentMultiplierInputs, GrossRentMultiplierOutputs> = {
  id: 'gross-rent-multiplier',
  name: 'Gross Rent Multiplier Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Comprehensive gross rent multiplier analysis for real estate investment evaluation',
  longDescription: `A professional-grade gross rent multiplier (GRM) calculator that provides comprehensive analysis of real estate investments using the GRM method. This calculator evaluates investment potential by comparing property value to gross rental income, offering insights into market positioning, investment returns, and risk assessment.

Key Features:
• Gross rent multiplier calculation and market comparison
• Net rent multiplier and effective gross rent multiplier analysis
• Cash flow analysis and return on investment calculations
• Market comparison with comparable properties
• Risk assessment including vacancy, market, and expense risks
• Sensitivity analysis for key variables
• Scenario analysis for different market conditions
• Comprehensive due diligence checklist and investment recommendations

This calculator is essential for real estate investors, appraisers, and property managers evaluating investment opportunities. It provides the analytical framework needed to assess property value relative to rental income and make informed investment decisions based on market standards and risk factors.`,

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
      description: 'Type of property being analyzed',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'commercial', label: 'Commercial' },
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
    lotSize: {
      type: 'number',
      label: 'Lot Size (sq ft)',
      description: 'Total lot size in square feet',
      required: true,
      min: 0,
      unit: 'sq ft'
    },
    yearBuilt: {
      type: 'number',
      label: 'Year Built',
      description: 'Year the property was built',
      required: true,
      min: 1800,
      max: 2030,
      unit: 'year'
    },
    propertyCondition: {
      type: 'select',
      label: 'Property Condition',
      description: 'Current condition of the property',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_work', label: 'Needs Work' }
      ]
    },
    bedrooms: {
      type: 'number',
      label: 'Number of Bedrooms',
      description: 'Total number of bedrooms',
      required: true,
      min: 0,
      max: 50,
      unit: 'bedrooms'
    },
    bathrooms: {
      type: 'number',
      label: 'Number of Bathrooms',
      description: 'Total number of bathrooms',
      required: true,
      min: 0,
      max: 50,
      unit: 'bathrooms'
    },

    // Financial Information
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price',
      description: 'Purchase price of the property',
      required: true,
      min: 0,
      unit: 'USD'
    },
    marketValue: {
      type: 'number',
      label: 'Market Value',
      description: 'Current market value of the property',
      required: true,
      min: 0,
      unit: 'USD'
    },
    annualGrossRent: {
      type: 'number',
      label: 'Annual Gross Rent',
      description: 'Total annual gross rental income',
      required: true,
      min: 0,
      unit: 'USD'
    },
    monthlyGrossRent: {
      type: 'number',
      label: 'Monthly Gross Rent',
      description: 'Total monthly gross rental income',
      required: true,
      min: 0,
      unit: 'USD'
    },
    annualOperatingExpenses: {
      type: 'number',
      label: 'Annual Operating Expenses',
      description: 'Total annual operating expenses',
      required: true,
      min: 0,
      unit: 'USD'
    },
    monthlyOperatingExpenses: {
      type: 'number',
      label: 'Monthly Operating Expenses',
      description: 'Total monthly operating expenses',
      required: true,
      min: 0,
      unit: 'USD'
    },
    annualNetOperatingIncome: {
      type: 'number',
      label: 'Annual Net Operating Income',
      description: 'Annual net operating income (NOI)',
      required: true,
      min: 0,
      unit: 'USD'
    },
    monthlyNetOperatingIncome: {
      type: 'number',
      label: 'Monthly Net Operating Income',
      description: 'Monthly net operating income (NOI)',
      required: true,
      min: 0,
      unit: 'USD'
    },

    // Rent Information
    numberOfUnits: {
      type: 'number',
      label: 'Number of Units',
      description: 'Total number of rental units',
      required: true,
      min: 1,
      max: 1000,
      unit: 'units'
    },
    vacancyRate: {
      type: 'number',
      label: 'Vacancy Rate (%)',
      description: 'Expected vacancy rate as a percentage',
      required: true,
      min: 0,
      max: 100,
      unit: '%'
    },
    collectionLoss: {
      type: 'number',
      label: 'Collection Loss (%)',
      description: 'Expected collection loss as a percentage',
      required: true,
      min: 0,
      max: 20,
      unit: '%'
    },
    effectiveGrossIncome: {
      type: 'number',
      label: 'Effective Gross Income',
      description: 'Effective gross income after adjustments',
      required: true,
      min: 0,
      unit: 'USD'
    },

    // Expense Breakdown
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
    utilities: {
      type: 'number',
      label: 'Annual Utilities',
      description: 'Annual utility costs',
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
    propertyManagement: {
      type: 'number',
      label: 'Annual Property Management',
      description: 'Annual property management fees',
      required: true,
      min: 0,
      unit: 'USD'
    },
    repairs: {
      type: 'number',
      label: 'Annual Repairs',
      description: 'Annual repair costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    landscaping: {
      type: 'number',
      label: 'Annual Landscaping',
      description: 'Annual landscaping costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    pestControl: {
      type: 'number',
      label: 'Annual Pest Control',
      description: 'Annual pest control costs',
      required: true,
      min: 0,
      unit: 'USD'
    },
    otherExpenses: {
      type: 'number',
      label: 'Other Annual Expenses',
      description: 'Other annual operating expenses',
      required: true,
      min: 0,
      unit: 'USD'
    },

    // Market Information
    marketGRM: {
      type: 'number',
      label: 'Market GRM',
      description: 'Market gross rent multiplier for similar properties',
      required: true,
      min: 0,
      max: 50,
      unit: 'multiplier'
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
    marketRent: {
      type: 'number',
      label: 'Market Rent (per sq ft/year)',
      description: 'Market rent per square foot per year',
      required: true,
      min: 0,
      unit: 'USD/sq ft/year'
    },

    // Location Information
    city: {
      type: 'string',
      label: 'City',
      description: 'City where the property is located',
      required: true,
      placeholder: 'New York'
    },
    state: {
      type: 'string',
      label: 'State',
      description: 'State where the property is located',
      required: true,
      placeholder: 'NY'
    },
    zipCode: {
      type: 'string',
      label: 'ZIP Code',
      description: 'ZIP code of the property',
      required: true,
      placeholder: '10001'
    },
    neighborhood: {
      type: 'string',
      label: 'Neighborhood',
      description: 'Neighborhood or area of the property',
      required: true,
      placeholder: 'Downtown'
    },
    marketType: {
      type: 'select',
      label: 'Market Type',
      description: 'Type of real estate market',
      required: true,
      options: [
        { value: 'hot', label: 'Hot Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'declining', label: 'Declining Market' },
        { value: 'emerging', label: 'Emerging Market' }
      ]
    },
    marketTrend: {
      type: 'select',
      label: 'Market Trend',
      description: 'Current market trend',
      required: true,
      options: [
        { value: 'appreciating', label: 'Appreciating' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ]
    },

    // Property Features
    parkingSpaces: {
      type: 'number',
      label: 'Parking Spaces',
      description: 'Number of parking spaces available',
      required: true,
      min: 0,
      max: 1000,
      unit: 'spaces'
    },
    hasPool: {
      type: 'boolean',
      label: 'Has Pool',
      description: 'Whether the property has a pool',
      required: true
    },
    hasGym: {
      type: 'boolean',
      label: 'Has Gym',
      description: 'Whether the property has a gym',
      required: true
    },
    hasLaundry: {
      type: 'boolean',
      label: 'Has Laundry',
      description: 'Whether the property has laundry facilities',
      required: true
    },
    hasStorage: {
      type: 'boolean',
      label: 'Has Storage',
      description: 'Whether the property has storage facilities',
      required: true
    },
    hasBalcony: {
      type: 'boolean',
      label: 'Has Balcony',
      description: 'Whether the property has balconies',
      required: true
    },
    hasFireplace: {
      type: 'boolean',
      label: 'Has Fireplace',
      description: 'Whether the property has fireplaces',
      required: true
    },
    hasCentralAC: {
      type: 'boolean',
      label: 'Has Central AC',
      description: 'Whether the property has central air conditioning',
      required: true
    },
    hasDishwasher: {
      type: 'boolean',
      label: 'Has Dishwasher',
      description: 'Whether the property has dishwashers',
      required: true
    },

    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for analysis in years',
      required: true,
      min: 1,
      max: 30,
      unit: 'years'
    },
    rentGrowthRate: {
      type: 'number',
      label: 'Rent Growth Rate (%)',
      description: 'Expected annual rent growth rate',
      required: true,
      min: -10,
      max: 20,
      unit: '%'
    },
    expenseGrowthRate: {
      type: 'number',
      label: 'Expense Growth Rate (%)',
      description: 'Expected annual expense growth rate',
      required: true,
      min: -5,
      max: 15,
      unit: '%'
    },
    appreciationRate: {
      type: 'number',
      label: 'Appreciation Rate (%)',
      description: 'Expected annual property appreciation rate',
      required: true,
      min: -10,
      max: 20,
      unit: '%'
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
    // GRM Analysis
    grossRentMultiplier: {
      type: 'number',
      label: 'Gross Rent Multiplier',
      description: 'Gross rent multiplier (Property Value / Annual Gross Rent)',
      unit: 'multiplier'
    },
    netRentMultiplier: {
      type: 'number',
      label: 'Net Rent Multiplier',
      description: 'Net rent multiplier (Property Value / Annual Net Operating Income)',
      unit: 'multiplier'
    },
    effectiveGrossRentMultiplier: {
      type: 'number',
      label: 'Effective Gross Rent Multiplier',
      description: 'Effective gross rent multiplier using effective gross income',
      unit: 'multiplier'
    },
    marketGRMComparison: {
      type: 'number',
      label: 'Market GRM Comparison',
      description: 'Difference from market GRM',
      unit: 'multiplier'
    },

    // Financial Metrics
    totalInvestment: {
      type: 'number',
      label: 'Total Investment',
      description: 'Total investment amount',
      unit: 'USD'
    },
    annualCashFlow: {
      type: 'number',
      label: 'Annual Cash Flow',
      description: 'Annual net cash flow',
      unit: 'USD'
    },
    monthlyCashFlow: {
      type: 'number',
      label: 'Monthly Cash Flow',
      description: 'Monthly net cash flow',
      unit: 'USD'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'Cash on Cash Return',
      description: 'Cash on cash return on investment',
      unit: '%'
    },
    returnOnInvestment: {
      type: 'number',
      label: 'Return on Investment',
      description: 'Return on investment percentage',
      unit: '%'
    },

    // Income Analysis
    grossIncome: {
      type: 'number',
      label: 'Gross Income',
      description: 'Gross rental income',
      unit: 'USD'
    },
    netIncome: {
      type: 'number',
      label: 'Net Income',
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
    marketValuePerUnit: {
      type: 'number',
      label: 'Market Value per Unit',
      description: 'Market value per unit',
      unit: 'USD/unit'
    },
    comparableValue: {
      type: 'number',
      label: 'Comparable Value',
      description: 'Value based on comparable sales',
      unit: 'USD'
    },

    // Performance Metrics
    breakEvenRent: {
      type: 'number',
      label: 'Break-Even Rent',
      description: 'Rent needed to break even',
      unit: 'USD'
    },
    breakEvenOccupancy: {
      type: 'number',
      label: 'Break-Even Occupancy',
      description: 'Occupancy rate needed to break even',
      unit: '%'
    },
    profitMargin: {
      type: 'number',
      label: 'Profit Margin',
      description: 'Profit margin percentage',
      unit: '%'
    },
    operatingExpenseRatio: {
      type: 'number',
      label: 'Operating Expense Ratio',
      description: 'Operating expense ratio',
      unit: '%'
    },

    // Risk Metrics
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk score (1-10 scale)',
      unit: 'score'
    },
    vacancyRisk: {
      type: 'number',
      label: 'Vacancy Risk',
      description: 'Risk due to vacancy',
      unit: '%'
    },
    marketRisk: {
      type: 'number',
      label: 'Market Risk',
      description: 'Risk due to market conditions',
      unit: '%'
    },
    expenseRisk: {
      type: 'number',
      label: 'Expense Risk',
      description: 'Risk due to expense volatility',
      unit: '%'
    },

    // Analysis
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis and recommendations'
    }
  },

  calculate: (inputs: GrossRentMultiplierInputs): GrossRentMultiplierOutputs => {
    // Validate inputs
    const validationResult = validateGrossRentMultiplierInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Calculate GRM metrics
    const metrics = calculateGrossRentMultiplier(inputs);
    
    // Generate analysis
    const analysis = generateGrossRentMultiplierReport(inputs, metrics);

    return {
      ...metrics,
      analysis
    };
  },

  generateReport: (inputs: GrossRentMultiplierInputs, outputs: GrossRentMultiplierOutputs): string => {
    return generateGrossRentMultiplierReport(inputs, outputs);
  },

  formulas: {
    grossRentMultiplier: 'GRM = Property Value / Annual Gross Rent',
    netRentMultiplier: 'Net RM = Property Value / Annual Net Operating Income',
    effectiveGrossRentMultiplier: 'Effective GRM = Property Value / Effective Gross Income',
    cashOnCashReturn: 'CoC = Annual Cash Flow / Total Investment',
    expenseRatio: 'Expense Ratio = Total Expenses / Gross Income',
    breakEvenRent: 'Break-Even Rent = Total Expenses / (1 - Vacancy Rate)'
  },

  examples: [
    {
      name: 'Single Family Rental',
      description: 'A single family home rental property analysis',
      inputs: {
        propertyAddress: '123 Oak Street, Suburban, CA 90210',
        propertyType: 'single_family',
        propertySize: 2000,
        lotSize: 8000,
        yearBuilt: 2010,
        propertyCondition: 'good',
        bedrooms: 3,
        bathrooms: 2,
        purchasePrice: 450000,
        marketValue: 475000,
        annualGrossRent: 36000,
        monthlyGrossRent: 3000,
        annualOperatingExpenses: 12000,
        monthlyOperatingExpenses: 1000,
        annualNetOperatingIncome: 24000,
        monthlyNetOperatingIncome: 2000,
        numberOfUnits: 1,
        vacancyRate: 5,
        collectionLoss: 2,
        effectiveGrossIncome: 33480,
        propertyTaxes: 5000,
        insurance: 1500,
        utilities: 0,
        maintenance: 2000,
        propertyManagement: 1800,
        repairs: 1000,
        landscaping: 500,
        pestControl: 200,
        otherExpenses: 1000,
        marketGRM: 12.5,
        marketCapRate: 5.5,
        marketRent: 18,
        city: 'Suburban',
        state: 'CA',
        zipCode: '90210',
        neighborhood: 'Oak Street',
        marketType: 'stable',
        marketTrend: 'appreciating',
        parkingSpaces: 2,
        hasPool: false,
        hasGym: false,
        hasLaundry: true,
        hasStorage: true,
        hasBalcony: false,
        hasFireplace: true,
        hasCentralAC: true,
        hasDishwasher: true,
        analysisPeriod: 10,
        rentGrowthRate: 3.0,
        expenseGrowthRate: 2.5,
        appreciationRate: 4.0,
        discountRate: 8.0,
        currency: 'USD',
        displayFormat: 'percentage',
        includeCharts: true
      }
    },
    {
      name: 'Multi-Family Property',
      description: 'A 4-unit apartment building analysis',
      inputs: {
        propertyAddress: '456 Main Avenue, Urban, NY 10001',
        propertyType: 'multi_family',
        propertySize: 4000,
        lotSize: 6000,
        yearBuilt: 2005,
        propertyCondition: 'excellent',
        bedrooms: 8,
        bathrooms: 8,
        purchasePrice: 800000,
        marketValue: 850000,
        annualGrossRent: 96000,
        monthlyGrossRent: 8000,
        annualOperatingExpenses: 24000,
        monthlyOperatingExpenses: 2000,
        annualNetOperatingIncome: 72000,
        monthlyNetOperatingIncome: 6000,
        numberOfUnits: 4,
        vacancyRate: 3,
        collectionLoss: 1,
        effectiveGrossIncome: 92160,
        propertyTaxes: 12000,
        insurance: 3000,
        utilities: 0,
        maintenance: 4000,
        propertyManagement: 4800,
        repairs: 2000,
        landscaping: 800,
        pestControl: 400,
        otherExpenses: 2000,
        marketGRM: 10.0,
        marketCapRate: 6.0,
        marketRent: 24,
        city: 'Urban',
        state: 'NY',
        zipCode: '10001',
        neighborhood: 'Main Avenue',
        marketType: 'hot',
        marketTrend: 'appreciating',
        parkingSpaces: 4,
        hasPool: false,
        hasGym: false,
        hasLaundry: true,
        hasStorage: true,
        hasBalcony: true,
        hasFireplace: false,
        hasCentralAC: true,
        hasDishwasher: true,
        analysisPeriod: 15,
        rentGrowthRate: 4.0,
        expenseGrowthRate: 3.0,
        appreciationRate: 5.0,
        discountRate: 9.0,
        currency: 'USD',
        displayFormat: 'percentage',
        includeCharts: true
      }
    }
  ],

  tags: [
    'gross rent multiplier',
    'grm',
    'real estate',
    'investment analysis',
    'rental property',
    'cash flow',
    'market analysis',
    'property valuation',
    'investment returns',
    'risk assessment',
    'commercial real estate',
    'residential real estate',
    'property management',
    'financial modeling',
    'investment metrics'
  ],

  category_info: {
    category: 'finance',
    subcategory: 'real-estate',
    name: 'Gross Rent Multiplier',
    description: 'Professional gross rent multiplier analysis and investment evaluation tools',
    icon: '🏠',
    color: '#2196F3'
  }
};
