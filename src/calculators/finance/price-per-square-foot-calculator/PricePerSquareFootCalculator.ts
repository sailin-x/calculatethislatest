import { Calculator } from '../../../types/calculator';
import { PricePerSquareFootInputs, PricePerSquareFootOutputs } from './types';
import { calculatePricePerSquareFoot } from './formulas';
import { validatePricePerSquareFootInputs, validatePricePerSquareFootBusinessRules } from './validation';

export const PricePerSquareFootCalculator: Calculator = {
  id: 'PricePerSquareFootCalculator',
  title: 'Price Per Square Foot Calculator',
  category: 'finance',
  subcategory: 'Real Estate Valuation',
  description: 'Calculate and analyze property values per square foot, including market comparisons, investment analysis, and comprehensive real estate metrics for informed buying, selling, and investment decisions.',
  usageInstructions: [
    'Enter property details and location information',
    'Provide market data and comparable sales',
    'Input property features and condition',
    'Review price per square foot analysis and recommendations'
  ],

  inputs: [
    {
      id: 'propertyPrice',
      label: 'Property Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'The total price of the property'
    },
    {
      id: 'totalSquareFootage',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Total square footage of the entire property'
    },
    {
      id: 'livingAreaSquareFootage',
      label: 'Living Area Square Footage',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Square footage of the living area (heated/cooled space)'
    },
    {
      id: 'lotSizeSquareFootage',
      label: 'Lot Size (Square Feet)',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Total square footage of the lot/land'
    },
    {
      id: 'zipCode',
      label: 'Zip Code',
      type: 'text',
      required: true,
      tooltip: 'Property zip code for market analysis'
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      required: true,
      tooltip: 'Property city'
    },
    {
      id: 'state',
      label: 'State',
      type: 'text',
      required: true,
      tooltip: 'Property state'
    },
    {
      id: 'neighborhood',
      label: 'Neighborhood',
      type: 'text',
      required: false,
      tooltip: 'Property neighborhood or subdivision'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Single Family', label: 'Single Family' },
        { value: 'Condo', label: 'Condo' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Multi-Family', label: 'Multi-Family' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Land', label: 'Land' }
      ],
      tooltip: 'Type of property'
    },
    {
      id: 'averagePricePerSqFt',
      label: 'Market Average Price/Sq Ft ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Average price per square foot in the market area'
    },
    {
      id: 'medianPricePerSqFt',
      label: 'Market Median Price/Sq Ft ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Median price per square foot in the market area'
    },
    {
      id: 'pricePerSqFtRangeLow',
      label: 'Market Price/Sq Ft Range Low ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Low end of market price per square foot range'
    },
    {
      id: 'pricePerSqFtRangeHigh',
      label: 'Market Price/Sq Ft Range High ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'High end of market price per square foot range'
    },
    {
      id: 'bedrooms',
      label: 'Number of Bedrooms',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Total number of bedrooms'
    },
    {
      id: 'bathrooms',
      label: 'Number of Bathrooms',
      type: 'number',
      required: false,
      min: 0,
      step: 0.5,
      tooltip: 'Total number of bathrooms (include half baths)'
    },
    {
      id: 'garageSpaces',
      label: 'Garage Spaces',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Number of garage parking spaces'
    },
    {
      id: 'yearBuilt',
      label: 'Year Built',
      type: 'number',
      required: false,
      min: 1800,
      tooltip: 'Year the property was originally built'
    },
    {
      id: 'lotSizeAcres',
      label: 'Lot Size (Acres)',
      type: 'number',
      required: false,
      min: 0,
      step: 0.01,
      tooltip: 'Lot size in acres'
    },
    {
      id: 'propertyCondition',
      label: 'Property Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'Poor', label: 'Poor' },
        { value: 'Fair', label: 'Fair' },
        { value: 'Good', label: 'Good' },
        { value: 'Excellent', label: 'Excellent' },
        { value: 'New', label: 'New' }
      ],
      defaultValue: 'Good',
      tooltip: 'Overall condition of the property'
    },
    {
      id: 'kitchenQuality',
      label: 'Kitchen Quality',
      type: 'select',
      required: false,
      options: [
        { value: 'Basic', label: 'Basic' },
        { value: 'Standard', label: 'Standard' },
        { value: 'Upgraded', label: 'Upgraded' },
        { value: 'Luxury', label: 'Luxury' }
      ],
      defaultValue: 'Standard',
      tooltip: 'Quality level of the kitchen'
    },
    {
      id: 'bathroomQuality',
      label: 'Bathroom Quality',
      type: 'select',
      required: false,
      options: [
        { value: 'Basic', label: 'Basic' },
        { value: 'Standard', label: 'Standard' },
        { value: 'Upgraded', label: 'Upgraded' },
        { value: 'Luxury', label: 'Luxury' }
      ],
      defaultValue: 'Standard',
      tooltip: 'Quality level of the bathrooms'
    },
    {
      id: 'marketTrend',
      label: 'Market Trend',
      type: 'select',
      required: false,
      options: [
        { value: 'Buyers', label: 'Buyers Market' },
        { value: 'Sellers', label: 'Sellers Market' },
        { value: 'Balanced', label: 'Balanced Market' }
      ],
      defaultValue: 'Balanced',
      tooltip: 'Current market conditions'
    },
    {
      id: 'daysOnMarket',
      label: 'Days on Market',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Number of days the property has been listed for sale'
    },
    {
      id: 'comparableSalesCount',
      label: 'Comparable Sales Count',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Number of comparable sales in the area'
    },
    {
      id: 'annualPropertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'includeLotSize',
      label: 'Include Lot Size in Analysis',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether to include lot size in price per square foot calculations'
    },
    {
      id: 'analysisType',
      label: 'Analysis Type',
      type: 'select',
      required: false,
      options: [
        { value: 'Basic', label: 'Basic Analysis' },
        { value: 'Detailed', label: 'Detailed Analysis' },
        { value: 'Comparative', label: 'Comparative Analysis' }
      ],
      defaultValue: 'Detailed',
      tooltip: 'Level of analysis to perform'
    }
  ],

  outputs: [
    {
      id: 'pricePerTotalSqFt',
      label: 'Price per Total Sq Ft ($)',
      type: 'currency',
      explanation: 'Property price divided by total square footage'
    },
    {
      id: 'pricePerLivingSqFt',
      label: 'Price per Living Sq Ft ($)',
      type: 'currency',
      explanation: 'Property price divided by living area square footage'
    },
    {
      id: 'pricePerLotSqFt',
      label: 'Price per Lot Sq Ft ($)',
      type: 'currency',
      explanation: 'Property price divided by lot square footage'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'text',
      explanation: 'How the property compares to market averages'
    },
    {
      id: 'marketAdjustment',
      label: 'Market Adjustment (%)',
      type: 'percentage',
      explanation: 'Percentage difference from market average'
    },
    {
      id: 'marketPercentile',
      label: 'Market Percentile (%)',
      type: 'percentage',
      explanation: 'Percentile ranking in the local market'
    },
    {
      id: 'estimatedFairMarketValue',
      label: 'Estimated Fair Market Value ($)',
      type: 'currency',
      explanation: 'Estimated fair market value based on market data'
    },
    {
      id: 'valueRangeLow',
      label: 'Value Range Low ($)',
      type: 'currency',
      explanation: 'Low end of estimated value range'
    },
    {
      id: 'valueRangeHigh',
      label: 'Value Range High ($)',
      type: 'currency',
      explanation: 'High end of estimated value range'
    },
    {
      id: 'averageComparablePricePerSqFt',
      label: 'Avg Comparable Price/Sq Ft ($)',
      type: 'currency',
      explanation: 'Average price per square foot of comparable properties'
    },
    {
      id: 'comparableAdjustment',
      label: 'Comparable Adjustment (%)',
      type: 'percentage',
      explanation: 'Adjustment needed to match comparable properties'
    },
    {
      id: 'comparableScore',
      label: 'Comparable Score (0-100)',
      type: 'number',
      explanation: 'Quality score based on comparable analysis'
    },
    {
      id: 'pricePerBedroom',
      label: 'Price per Bedroom ($)',
      type: 'currency',
      explanation: 'Property price divided by number of bedrooms'
    },
    {
      id: 'pricePerBathroom',
      label: 'Price per Bathroom ($)',
      type: 'currency',
      explanation: 'Property price divided by number of bathrooms'
    },
    {
      id: 'pricePerGarageSpace',
      label: 'Price per Garage Space ($)',
      type: 'currency',
      explanation: 'Property price divided by number of garage spaces'
    },
    {
      id: 'annualCostPerSqFt',
      label: 'Annual Cost per Sq Ft ($)',
      type: 'currency',
      explanation: 'Annual ownership costs per square foot'
    },
    {
      id: 'totalMonthlyCostPerSqFt',
      label: 'Monthly Cost per Sq Ft ($)',
      type: 'currency',
      explanation: 'Monthly ownership costs per square foot'
    },
    {
      id: 'conditionAdjustment',
      label: 'Condition Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on property condition'
    },
    {
      id: 'qualityAdjustment',
      label: 'Quality Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on finish quality'
    },
    {
      id: 'locationAdjustment',
      label: 'Location Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on location factors'
    },
    {
      id: 'marketTimingScore',
      label: 'Market Timing Score (0-100)',
      type: 'number',
      explanation: 'Score indicating optimal timing for sale'
    },
    {
      id: 'optimalSellingTime',
      label: 'Optimal Selling Time',
      type: 'text',
      explanation: 'Recommended time period for selling'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility',
      type: 'text',
      explanation: 'Assessment of market price stability'
    },
    {
      id: 'pricingRisk',
      label: 'Pricing Risk',
      type: 'text',
      explanation: 'Risk level associated with current pricing'
    },
    {
      id: 'marketRisk',
      label: 'Market Risk',
      type: 'text',
      explanation: 'Overall market risk assessment'
    },
    {
      id: 'pricingStrategy',
      label: 'Pricing Strategy',
      type: 'text',
      explanation: 'Recommended pricing approach'
    },
    {
      id: 'marketingRecommendations',
      label: 'Marketing Recommendations',
      type: 'text',
      explanation: 'Suggested marketing strategies'
    },
    {
      id: 'negotiationTips',
      label: 'Negotiation Tips',
      type: 'text',
      explanation: 'Tips for negotiation and closing'
    },
    {
      id: 'projectedValue1Year',
      label: 'Projected Value (1 Year) ($)',
      type: 'currency',
      explanation: 'Estimated property value in one year'
    },
    {
      id: 'projectedValue3Years',
      label: 'Projected Value (3 Years) ($)',
      type: 'currency',
      explanation: 'Estimated property value in three years'
    },
    {
      id: 'projectedValue5Years',
      label: 'Projected Value (5 Years) ($)',
      type: 'currency',
      explanation: 'Estimated property value in five years'
    },
    {
      id: 'annualAppreciationRate',
      label: 'Annual Appreciation Rate (%)',
      type: 'percentage',
      explanation: 'Expected annual property appreciation'
    },
    {
      id: 'neighborhoodAveragePricePerSqFt',
      label: 'Neighborhood Avg Price/Sq Ft ($)',
      type: 'currency',
      explanation: 'Average price per square foot in the neighborhood'
    },
    {
      id: 'neighborhoodMedianPricePerSqFt',
      label: 'Neighborhood Median Price/Sq Ft ($)',
      type: 'currency',
      explanation: 'Median price per square foot in the neighborhood'
    },
    {
      id: 'neighborhoodPriceRange',
      label: 'Neighborhood Price Range ($)',
      type: 'text',
      explanation: 'Price range in the neighborhood'
    },
    {
      id: 'propertyTypeAveragePricePerSqFt',
      label: 'Property Type Avg Price/Sq Ft ($)',
      type: 'currency',
      explanation: 'Average price per square foot for this property type'
    },
    {
      id: 'propertyTypeMedianPricePerSqFt',
      label: 'Property Type Median Price/Sq Ft ($)',
      type: 'currency',
      explanation: 'Median price per square foot for this property type'
    },
    {
      id: 'sizeCategory',
      label: 'Size Category',
      type: 'text',
      explanation: 'Property size classification'
    },
    {
      id: 'sizeAdjustment',
      label: 'Size Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on property size'
    },
    {
      id: 'propertyAge',
      label: 'Property Age (Years)',
      type: 'number',
      explanation: 'Age of the property in years'
    },
    {
      id: 'ageAdjustment',
      label: 'Age Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on property age'
    },
    {
      id: 'bedroomAdjustment',
      label: 'Bedroom Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment per bedroom'
    },
    {
      id: 'bathroomAdjustment',
      label: 'Bathroom Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment per bathroom'
    },
    {
      id: 'garageAdjustment',
      label: 'Garage Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment per garage space'
    },
    {
      id: 'seasonalAdjustment',
      label: 'Seasonal Adjustment (%)',
      type: 'percentage',
      explanation: 'Price adjustment based on selling season'
    },
    {
      id: 'bestSellingMonth',
      label: 'Best Selling Month',
      type: 'text',
      explanation: 'Month with historically best selling prices'
    },
    {
      id: 'localEconomicHealth',
      label: 'Local Economic Health',
      type: 'text',
      explanation: 'Assessment of local economic conditions'
    },
    {
      id: 'employmentRate',
      label: 'Local Employment Rate (%)',
      type: 'percentage',
      explanation: 'Local employment rate'
    },
    {
      id: 'populationGrowth',
      label: 'Population Growth (%)',
      type: 'percentage',
      explanation: 'Local population growth rate'
    },
    {
      id: 'investmentGrade',
      label: 'Investment Grade',
      type: 'text',
      explanation: 'Investment quality rating'
    },
    {
      id: 'rentalDemand',
      label: 'Rental Demand',
      type: 'text',
      explanation: 'Level of rental demand'
    },
    {
      id: 'appreciationPotential',
      label: 'Appreciation Potential',
      type: 'text',
      explanation: 'Potential for future value increase'
    },
    {
      id: 'propertyTaxRate',
      label: 'Property Tax Rate (%)',
      type: 'percentage',
      explanation: 'Local property tax rate'
    },
    {
      id: 'taxAssessmentRatio',
      label: 'Tax Assessment Ratio (%)',
      type: 'percentage',
      explanation: 'Ratio of assessed value to market value'
    },
    {
      id: 'taxSavingsPotential',
      label: 'Tax Savings Potential ($)',
      type: 'currency',
      explanation: 'Potential tax savings from deductions'
    },
    {
      id: 'insuranceCostPerSqFt',
      label: 'Insurance Cost per Sq Ft ($)',
      type: 'currency',
      explanation: 'Annual insurance cost per square foot'
    },
    {
      id: 'floodRisk',
      label: 'Flood Risk',
      type: 'text',
      explanation: 'Flood risk assessment'
    },
    {
      id: 'estimatedMaintenancePerSqFt',
      label: 'Maintenance Cost per Sq Ft ($)',
      type: 'currency',
      explanation: 'Estimated annual maintenance cost per square foot'
    },
    {
      id: 'annualMaintenanceCost',
      label: 'Annual Maintenance Cost ($)',
      type: 'currency',
      explanation: 'Total estimated annual maintenance cost'
    },
    {
      id: 'energyRating',
      label: 'Energy Rating',
      type: 'text',
      explanation: 'Energy efficiency rating'
    },
    {
      id: 'energyCostPerSqFt',
      label: 'Energy Cost per Sq Ft ($)',
      type: 'currency',
      explanation: 'Annual energy cost per square foot'
    },
    {
      id: 'energySavingsPotential',
      label: 'Energy Savings Potential ($)',
      type: 'currency',
      explanation: 'Potential annual energy cost savings'
    },
    {
      id: 'environmentalRisk',
      label: 'Environmental Risk',
      type: 'text',
      explanation: 'Environmental risk assessment'
    },
    {
      id: 'naturalHazardRisk',
      label: 'Natural Hazard Risk',
      type: 'text',
      explanation: 'Risk from natural hazards'
    },
    {
      id: 'walkabilityScore',
      label: 'Walkability Score (0-100)',
      type: 'number',
      explanation: 'Walkability score for the location'
    },
    {
      id: 'amenityScore',
      label: 'Amenity Score (0-100)',
      type: 'number',
      explanation: 'Amenity score for the location'
    },
    {
      id: 'schoolDistrictRating',
      label: 'School District Rating (0-10)',
      type: 'number',
      explanation: 'Local school district rating'
    },
    {
      id: 'commuteTime',
      label: 'Average Commute Time (Minutes)',
      type: 'number',
      explanation: 'Average commute time to major employment centers'
    },
    {
      id: 'publicTransportAccess',
      label: 'Public Transport Access',
      type: 'text',
      explanation: 'Quality of public transportation access'
    },
    {
      id: 'medianHouseholdIncome',
      label: 'Median Household Income ($)',
      type: 'currency',
      explanation: 'Median household income in the area'
    },
    {
      id: 'averageAge',
      label: 'Average Age',
      type: 'number',
      explanation: 'Average age of residents in the area'
    },
    {
      id: 'educationLevel',
      label: 'Education Level',
      type: 'text',
      explanation: 'Education level of residents'
    },
    {
      id: 'shortTermOutlook',
      label: 'Short-Term Market Outlook',
      type: 'text',
      explanation: 'Market outlook for the next 6-12 months'
    },
    {
      id: 'longTermOutlook',
      label: 'Long-Term Market Outlook',
      type: 'text',
      explanation: 'Market outlook for the next 3-5 years'
    },
    {
      id: 'forecastConfidence',
      label: 'Forecast Confidence',
      type: 'text',
      explanation: 'Confidence level in market forecasts'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Urban Single Family Home',
      description: 'Analysis of a 2,500 sq ft single family home in a suburban market',
      inputs: {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        livingAreaSquareFootage: 2200,
        lotSizeSquareFootage: 8500,
        zipCode: '12345',
        city: 'Springfield',
        state: 'IL',
        neighborhood: 'Maple Grove',
        propertyType: 'Single Family',
        averagePricePerSqFt: 180,
        medianPricePerSqFt: 175,
        pricePerSqFtRangeLow: 160,
        pricePerSqFtRangeHigh: 200,
        bedrooms: 4,
        bathrooms: 2.5,
        garageSpaces: 2,
        yearBuilt: 2010,
        lotSizeAcres: 0.2,
        propertyCondition: 'Good',
        kitchenQuality: 'Upgraded',
        bathroomQuality: 'Standard',
        marketTrend: 'Balanced',
        daysOnMarket: 45,
        comparableSalesCount: 12,
        annualPropertyTaxes: 5400,
        homeownersInsurance: 1200,
        hoaFees: 0,
        includeLotSize: false,
        analysisType: 'Detailed'
      },
      expectedOutputs: {
        pricePerTotalSqFt: 180,
        pricePerLivingSqFt: 204.55,
        marketComparison: 'At Market',
        estimatedFairMarketValue: 440000,
        pricingStrategy: 'Competitive'
      }
    },
    {
      title: 'Downtown Condo',
      description: 'Analysis of a 1,200 sq ft downtown condo in an urban market',
      inputs: {
        propertyPrice: 325000,
        totalSquareFootage: 1200,
        livingAreaSquareFootage: 1200,
        zipCode: '60601',
        city: 'Chicago',
        state: 'IL',
        propertyType: 'Condo',
        averagePricePerSqFt: 270,
        medianPricePerSqFt: 265,
        pricePerSqFtRangeLow: 250,
        pricePerSqFtRangeHigh: 290,
        bedrooms: 2,
        bathrooms: 2,
        garageSpaces: 1,
        yearBuilt: 2015,
        propertyCondition: 'Excellent',
        kitchenQuality: 'Upgraded',
        bathroomQuality: 'Upgraded',
        marketTrend: 'Sellers',
        daysOnMarket: 15,
        comparableSalesCount: 8,
        annualPropertyTaxes: 4800,
        homeownersInsurance: 1800,
        hoaFees: 450,
        includeLotSize: false,
        analysisType: 'Detailed'
      },
      expectedOutputs: {
        pricePerTotalSqFt: 270.83,
        pricePerLivingSqFt: 270.83,
        marketComparison: 'At Market',
        estimatedFairMarketValue: 325000,
        pricingStrategy: 'Competitive'
      }
    }
  ]
};