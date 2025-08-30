import { Calculator } from '@/types/calculator';
import { PricePerSquareFootCalculator } from './PricePerSquareFootCalculator';

export const pricePerSquareFootCalculator: Calculator = {
  id: 'price-per-square-foot',
  name: 'Price Per Square Foot Calculator',
  description: 'Calculate and analyze property values using price per square foot metrics, comparable property analysis, and comprehensive market evaluation to determine fair market value and investment potential.',
  category: 'finance',
  tags: ['price-per-square-foot', 'property-valuation', 'real-estate', 'market-analysis', 'comparable-sales', 'investment-analysis', 'property-investment', 'market-value', 'appraisal', 'valuation'],
  component: PricePerSquareFootCalculator,
  inputs: {
    // Property Information
    propertyAddress: {
      label: 'Property Address',
      type: 'text',
      required: true,
      description: 'Full address of the property being analyzed',
      placeholder: '123 Main St, Anytown, USA'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property being analyzed',
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'multi_family', label: 'Multi-Family Property' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'industrial', label: 'Industrial Property' },
        { value: 'land', label: 'Land' },
        { value: 'mixed_use', label: 'Mixed Use Property' }
      ]
    },
    propertySize: {
      label: 'Property Size (sq ft)',
      type: 'number',
      required: true,
      description: 'Total square footage of the property',
      placeholder: '2000',
      min: 1,
      max: 100000
    },
    propertyAge: {
      label: 'Property Age (years)',
      type: 'number',
      required: true,
      description: 'Age of the property in years',
      placeholder: '15',
      min: 0,
      max: 200
    },
    numberOfUnits: {
      label: 'Number of Units',
      type: 'number',
      required: true,
      description: 'Number of units in the property',
      placeholder: '1',
      min: 1,
      max: 1000
    },
    numberOfBedrooms: {
      label: 'Number of Bedrooms',
      type: 'number',
      required: true,
      description: 'Total number of bedrooms',
      placeholder: '3',
      min: 0,
      max: 20
    },
    numberOfBathrooms: {
      label: 'Number of Bathrooms',
      type: 'number',
      required: true,
      description: 'Total number of bathrooms',
      placeholder: '2',
      min: 0,
      max: 20
    },

    // Price Information
    propertyPrice: {
      label: 'Property Price ($)',
      type: 'number',
      required: true,
      description: 'Current or asking price of the property',
      placeholder: '400000',
      min: 1,
      max: 100000000
    },
    listPrice: {
      label: 'List Price ($)',
      type: 'number',
      required: true,
      description: 'Original listing price of the property',
      placeholder: '425000',
      min: 1,
      max: 100000000
    },
    salePrice: {
      label: 'Sale Price ($)',
      type: 'number',
      required: true,
      description: 'Actual sale price (0 if not sold)',
      placeholder: '0',
      min: 0,
      max: 100000000
    },
    appraisalValue: {
      label: 'Appraisal Value ($)',
      type: 'number',
      required: true,
      description: 'Professional appraisal value',
      placeholder: '410000',
      min: 1,
      max: 100000000
    },
    assessedValue: {
      label: 'Assessed Value ($)',
      type: 'number',
      required: true,
      description: 'Tax assessed value of the property',
      placeholder: '380000',
      min: 1,
      max: 100000000
    },

    // Comparable Properties
    comparableProperties: {
      label: 'Comparable Properties',
      type: 'array',
      required: true,
      description: 'List of comparable properties for analysis',
      itemType: 'object',
      itemSchema: {
        address: { type: 'text', required: true },
        salePrice: { type: 'number', required: true },
        size: { type: 'number', required: true },
        age: { type: 'number', required: true },
        bedrooms: { type: 'number', required: true },
        bathrooms: { type: 'number', required: true },
        saleDate: { type: 'date', required: true },
        condition: { type: 'text', required: true },
        location: { type: 'text', required: true },
        adjustments: { type: 'number', required: true }
      }
    },

    // Market Information
    marketLocation: {
      label: 'Market Location',
      type: 'text',
      required: true,
      description: 'Geographic market area for analysis',
      placeholder: 'Anytown, USA'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      required: true,
      description: 'Current market condition in the area',
      options: [
        { value: 'declining', label: 'Declining Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'growing', label: 'Growing Market' },
        { value: 'hot', label: 'Hot Market' }
      ]
    },
    marketGrowthRate: {
      label: 'Market Growth Rate (%)',
      type: 'number',
      required: true,
      description: 'Annual market growth rate',
      placeholder: '5.2',
      min: -50,
      max: 100
    },
    daysOnMarket: {
      label: 'Days on Market',
      type: 'number',
      required: true,
      description: 'Average days properties stay on market',
      placeholder: '45',
      min: 0,
      max: 1000
    },

    // Property Features
    propertyCondition: {
      label: 'Property Condition',
      type: 'select',
      required: true,
      description: 'Overall condition of the property',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'average', label: 'Average' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_repair', label: 'Needs Repair' }
      ]
    },
    propertyStyle: {
      label: 'Property Style',
      type: 'select',
      required: true,
      description: 'Architectural style of the property',
      options: [
        { value: 'modern', label: 'Modern' },
        { value: 'traditional', label: 'Traditional' },
        { value: 'contemporary', label: 'Contemporary' },
        { value: 'colonial', label: 'Colonial' },
        { value: 'ranch', label: 'Ranch' },
        { value: 'other', label: 'Other' }
      ]
    },
    lotSize: {
      label: 'Lot Size (sq ft)',
      type: 'number',
      required: true,
      description: 'Size of the lot in square feet',
      placeholder: '8000',
      min: 1,
      max: 1000000
    },
    garageSpaces: {
      label: 'Garage Spaces',
      type: 'number',
      required: true,
      description: 'Number of garage parking spaces',
      placeholder: '2',
      min: 0,
      max: 20
    },
    parkingSpaces: {
      label: 'Parking Spaces',
      type: 'number',
      required: true,
      description: 'Total number of parking spaces',
      placeholder: '4',
      min: 0,
      max: 100
    },

    // Amenities
    amenities: {
      label: 'Amenities',
      type: 'array',
      required: true,
      description: 'List of property amenities and their values',
      itemType: 'object',
      itemSchema: {
        amenity: { type: 'text', required: true },
        value: { type: 'number', required: true },
        included: { type: 'boolean', required: true }
      }
    },

    // Location Factors
    schoolDistrict: {
      label: 'School District',
      type: 'text',
      required: true,
      description: 'School district serving the property',
      placeholder: 'Anytown School District'
    },
    schoolRating: {
      label: 'School Rating (1-10)',
      type: 'number',
      required: true,
      description: 'Overall school district rating',
      placeholder: '8.5',
      min: 0,
      max: 10
    },
    crimeRate: {
      label: 'Crime Rate',
      type: 'select',
      required: true,
      description: 'Crime rate in the area',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    walkScore: {
      label: 'Walk Score (0-100)',
      type: 'number',
      required: true,
      description: 'Walkability score of the area',
      placeholder: '75',
      min: 0,
      max: 100
    },
    transitScore: {
      label: 'Transit Score (0-100)',
      type: 'number',
      required: true,
      description: 'Public transit accessibility score',
      placeholder: '65',
      min: 0,
      max: 100
    },
    bikeScore: {
      label: 'Bike Score (0-100)',
      type: 'number',
      required: true,
      description: 'Bike-friendliness score of the area',
      placeholder: '80',
      min: 0,
      max: 100
    },

    // Analysis Parameters
    analysisPeriod: {
      label: 'Analysis Period (months)',
      type: 'number',
      required: true,
      description: 'Time period for analysis and projections',
      placeholder: '60',
      min: 1,
      max: 120
    },
    inflationRate: {
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: -50,
      max: 100
    },
    propertyAppreciationRate: {
      label: 'Property Appreciation Rate (%)',
      type: 'number',
      required: true,
      description: 'Expected annual property appreciation rate',
      placeholder: '4.0',
      min: -50,
      max: 100
    },
    discountRate: {
      label: 'Discount Rate (%)',
      type: 'number',
      required: true,
      description: 'Discount rate for present value calculations',
      placeholder: '6.0',
      min: -100,
      max: 1000
    },

    // Reporting Preferences
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      description: 'Currency for financial calculations',
      options: [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' },
        { value: 'AUD', label: 'Australian Dollar (A$)' }
      ]
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      required: true,
      description: 'Format for displaying numerical results',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      description: 'Include visual charts in the analysis',
      default: true
    }
  },
  outputs: {
    // Core Metrics
    pricePerSquareFoot: {
      label: 'Price Per Square Foot',
      type: 'number',
      description: 'Property price divided by square footage',
      unit: '$/sq ft'
    },
    listPricePerSquareFoot: {
      label: 'List Price Per Square Foot',
      type: 'number',
      description: 'List price divided by square footage',
      unit: '$/sq ft'
    },
    salePricePerSquareFoot: {
      label: 'Sale Price Per Square Foot',
      type: 'number',
      description: 'Sale price divided by square footage',
      unit: '$/sq ft'
    },
    appraisalPricePerSquareFoot: {
      label: 'Appraisal Price Per Square Foot',
      type: 'number',
      description: 'Appraisal value divided by square footage',
      unit: '$/sq ft'
    },
    assessedPricePerSquareFoot: {
      label: 'Assessed Price Per Square Foot',
      type: 'number',
      description: 'Assessed value divided by square footage',
      unit: '$/sq ft'
    },

    // Comparable Analysis
    averageComparablePrice: {
      label: 'Average Comparable Price',
      type: 'number',
      description: 'Average price per square foot of comparable properties',
      unit: '$/sq ft'
    },
    medianComparablePrice: {
      label: 'Median Comparable Price',
      type: 'number',
      description: 'Median price per square foot of comparable properties',
      unit: '$/sq ft'
    },
    comparablePriceRange: {
      label: 'Comparable Price Range',
      type: 'object',
      description: 'Range of comparable property prices',
      properties: {
        min: { type: 'number', description: 'Minimum comparable price' },
        max: { type: 'number', description: 'Maximum comparable price' }
      }
    },

    // Valuation Metrics
    estimatedValue: {
      label: 'Estimated Value',
      type: 'number',
      description: 'Estimated fair market value based on analysis',
      unit: '$'
    },
    overUnderPricedPercentage: {
      label: 'Over/Under Priced Percentage',
      type: 'number',
      description: 'Percentage the property is over or under priced',
      unit: '%'
    },
    pricePosition: {
      label: 'Price Position',
      type: 'string',
      description: 'Position of property price relative to market'
    },
    pricePercentile: {
      label: 'Price Percentile',
      type: 'number',
      description: 'Percentile rank of property price in market',
      unit: '%'
    },

    // Market Analysis
    marketAveragePrice: {
      label: 'Market Average Price',
      type: 'number',
      description: 'Average price per square foot in the market',
      unit: '$/sq ft'
    },
    marketMedianPrice: {
      label: 'Market Median Price',
      type: 'number',
      description: 'Median price per square foot in the market',
      unit: '$/sq ft'
    },

    // Risk Assessment
    riskScore: {
      label: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (0-100)',
      unit: 'score'
    },
    priceVolatility: {
      label: 'Price Volatility',
      type: 'number',
      description: 'Measure of price volatility in the market',
      unit: '%'
    },
    marketRisk: {
      label: 'Market Risk',
      type: 'number',
      description: 'Risk assessment for the market area',
      unit: 'score'
    },
    valuationRisk: {
      label: 'Valuation Risk',
      type: 'number',
      description: 'Risk assessment for the valuation',
      unit: 'score'
    },

    // Performance Metrics
    pricePerformance: {
      label: 'Price Performance',
      type: 'number',
      description: 'Performance rating of the property price',
      unit: 'score'
    },
    marketPerformance: {
      label: 'Market Performance',
      type: 'number',
      description: 'Performance rating of the market',
      unit: 'score'
    },
    relativePerformance: {
      label: 'Relative Performance',
      type: 'number',
      description: 'Property performance relative to market',
      unit: 'score'
    },

    // Analysis
    analysis: {
      label: 'Analysis',
      type: 'object',
      description: 'Comprehensive analysis and recommendations',
      properties: {
        priceRating: { type: 'string', description: 'Rating of the property price' },
        valueRating: { type: 'string', description: 'Rating of the property value' },
        recommendation: { type: 'string', description: 'Investment recommendation' },
        summary: { type: 'string', description: 'Executive summary of analysis' },
        details: { type: 'array', description: 'Detailed analysis points' }
      }
    },

    // Trend Analysis
    priceTrend: {
      label: 'Price Trend',
      type: 'array',
      description: 'Projected price trend over analysis period',
      itemType: 'object',
      itemSchema: {
        month: { type: 'number', description: 'Month number' },
        price: { type: 'number', description: 'Projected price per square foot' }
      }
    },

    // Sensitivity Analysis
    sensitivityMatrix: {
      label: 'Sensitivity Matrix',
      type: 'array',
      description: 'Sensitivity analysis for different scenarios',
      itemType: 'object',
      itemSchema: {
        scenario: { type: 'string', description: 'Scenario name' },
        impact: { type: 'number', description: 'Impact on value' }
      }
    },

    // Scenarios
    scenarios: {
      label: 'Scenarios',
      type: 'array',
      description: 'Different market scenarios and outcomes',
      itemType: 'object',
      itemSchema: {
        name: { type: 'string', description: 'Scenario name' },
        probability: { type: 'number', description: 'Probability of scenario' },
        outcome: { type: 'number', description: 'Expected outcome' }
      }
    },

    // Comparison Analysis
    comparisonAnalysis: {
      label: 'Comparison Analysis',
      type: 'array',
      description: 'Comparison with various benchmarks',
      itemType: 'object',
      itemSchema: {
        metric: { type: 'string', description: 'Metric name' },
        value: { type: 'number', description: 'Property value' },
        benchmark: { type: 'number', description: 'Benchmark value' }
      }
    },

    // Benchmark Analysis
    benchmarkAnalysis: {
      label: 'Benchmark Analysis',
      type: 'array',
      description: 'Analysis against industry benchmarks',
      itemType: 'object',
      itemSchema: {
        benchmark: { type: 'string', description: 'Benchmark name' },
        value: { type: 'number', description: 'Benchmark value' },
        performance: { type: 'number', description: 'Performance relative to benchmark' }
      }
    }
  },
  features: [
    'Comprehensive price per square foot analysis',
    'Comparable property analysis with adjustments',
    'Market condition assessment',
    'Risk scoring and evaluation',
    'Property valuation and appraisal comparison',
    'Investment performance analysis',
    'Price trend projections',
    'Sensitivity analysis for different scenarios',
    'Market benchmark comparisons',
    'Location factor analysis (schools, crime, walkability)',
    'Amenity value assessment',
    'Property condition and style analysis',
    'Multi-currency support',
    'Visual charts and graphs',
    'Detailed investment recommendations',
    'Comprehensive reporting and analysis'
  ],
  examples: [
    {
      name: 'Single Family Home Analysis',
      description: 'Analyze a 2,000 sq ft single family home in a growing market',
      inputs: {
        propertyAddress: '123 Main St, Anytown, USA',
        propertyType: 'single_family',
        propertySize: 2000,
        propertyPrice: 400000,
        listPrice: 425000,
        comparableProperties: [
          {
            address: '456 Oak Ave',
            salePrice: 380000,
            size: 1900,
            age: 12,
            bedrooms: 3,
            bathrooms: 2,
            saleDate: new Date('2024-01-15'),
            condition: 'good',
            location: 'similar',
            adjustments: 5000
          }
        ],
        marketCondition: 'growing',
        marketGrowthRate: 5.2
      }
    },
    {
      name: 'Condominium Investment Analysis',
      description: 'Evaluate a 1,200 sq ft condominium for investment potential',
      inputs: {
        propertyAddress: '789 Condo Blvd, City Center, USA',
        propertyType: 'condo',
        propertySize: 1200,
        propertyPrice: 280000,
        listPrice: 295000,
        comparableProperties: [
          {
            address: '101 Condo Ave',
            salePrice: 275000,
            size: 1150,
            age: 8,
            bedrooms: 2,
            bathrooms: 2,
            saleDate: new Date('2024-02-01'),
            condition: 'excellent',
            location: 'similar',
            adjustments: 2000
          }
        ],
        marketCondition: 'hot',
        marketGrowthRate: 8.5
      }
    },
    {
      name: 'Multi-Family Property Analysis',
      description: 'Analyze a 4-unit multi-family property for rental income potential',
      inputs: {
        propertyAddress: '321 Investment St, Rental Town, USA',
        propertyType: 'multi_family',
        propertySize: 4800,
        numberOfUnits: 4,
        propertyPrice: 650000,
        listPrice: 675000,
        comparableProperties: [
          {
            address: '555 Rental Ave',
            salePrice: 620000,
            size: 4600,
            age: 15,
            bedrooms: 8,
            bathrooms: 8,
            saleDate: new Date('2024-01-20'),
            condition: 'good',
            location: 'similar',
            adjustments: 10000
          }
        ],
        marketCondition: 'stable',
        marketGrowthRate: 3.2
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'rental-property-analysis',
    'real-estate-investment-roi',
    'property-appreciation',
    'cap-rate-calculator',
    'cash-on-cash-return',
    'net-operating-income',
    'debt-service-coverage-ratio',
    'loan-to-value-ratio',
    'mortgage-refinance'
  ]
};