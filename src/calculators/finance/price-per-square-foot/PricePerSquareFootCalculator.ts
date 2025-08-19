import { Calculator } from '../../types/Calculator';
import { calculatePricePerSquareFoot } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const pricePerSquareFootCalculator: Calculator = {
  id: 'price-per-square-foot',
  title: 'Price Per Square Foot Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate and compare price per square foot for real estate properties, including adjustments for features and market analysis',
  usageInstructions: 'Enter property details, square footage, and features to calculate price per square foot and compare with market data.',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Property Price',
      type: 'currency',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Total sale price or asking price of the property',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      id: 'totalSquareFootage',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 10,
      tooltip: 'Total livable square footage of the property',
      placeholder: '2500',
      defaultValue: 2500
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'condo', label: 'Condo/Apartment' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Vacant Land' }
      ],
      tooltip: 'Type of property for comparison',
      defaultValue: 'single_family'
    },
    {
      id: 'bedrooms',
      label: 'Bedrooms',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 1,
      tooltip: 'Number of bedrooms',
      placeholder: '3',
      defaultValue: 3
    },
    {
      id: 'bathrooms',
      label: 'Bathrooms',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Number of bathrooms (can include half baths)',
      placeholder: '2.5',
      defaultValue: 2.5
    },
    {
      id: 'yearBuilt',
      label: 'Year Built',
      type: 'number',
      required: false,
      min: 1800,
      max: 2030,
      step: 1,
      tooltip: 'Year the property was built',
      placeholder: '2000',
      defaultValue: 2000
    },
    {
      id: 'lotSize',
      label: 'Lot Size (sq ft)',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      tooltip: 'Lot size in square feet (for land calculations)',
      placeholder: '10000',
      defaultValue: 10000
    },
    {
      id: 'condition',
      label: 'Property Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_work', label: 'Needs Work' }
      ],
      tooltip: 'Overall condition of the property',
      defaultValue: 'good'
    },
    {
      id: 'location',
      label: 'Location Type',
      type: 'select',
      required: false,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' },
        { value: 'waterfront', label: 'Waterfront' },
        { value: 'mountain', label: 'Mountain' }
      ],
      tooltip: 'Location characteristics affecting value',
      defaultValue: 'suburban'
    },
    {
      id: 'marketAverage',
      label: 'Market Average ($/sq ft)',
      type: 'currency',
      required: false,
      min: 10,
      max: 2000,
      step: 10,
      tooltip: 'Average price per square foot in the local market',
      placeholder: '200',
      defaultValue: 200
    },
    {
      id: 'comparableProperties',
      label: 'Comparable Properties',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Number of comparable properties in the area',
      placeholder: '10',
      defaultValue: 10
    },
    {
      id: 'features',
      label: 'Special Features',
      type: 'select',
      required: false,
      multiple: true,
      options: [
        { value: 'pool', label: 'Pool' },
        { value: 'garage', label: 'Garage' },
        { value: 'basement', label: 'Basement' },
        { value: 'fireplace', label: 'Fireplace' },
        { value: 'hardwood_floors', label: 'Hardwood Floors' },
        { value: 'granite_countertops', label: 'Granite Countertops' },
        { value: 'stainless_steel_appliances', label: 'Stainless Steel Appliances' },
        { value: 'central_air', label: 'Central Air' },
        { value: 'deck_patio', label: 'Deck/Patio' },
        { value: 'garden', label: 'Garden' },
        { value: 'view', label: 'View' },
        { value: 'gated_community', label: 'Gated Community' }
      ],
      tooltip: 'Special features that may affect value',
      defaultValue: []
    },
    {
      id: 'adjustmentFactors',
      label: 'Adjustment Factors (%)',
      type: 'percentage',
      required: false,
      min: -50,
      max: 100,
      step: 1,
      tooltip: 'Additional adjustment factors (positive or negative)',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'basic', label: 'Basic Price per Sq Ft' },
        { value: 'adjusted', label: 'Adjusted Price per Sq Ft' },
        { value: 'comparison', label: 'Market Comparison' },
        { value: 'investment', label: 'Investment Analysis' }
      ],
      tooltip: 'Type of calculation to perform',
      defaultValue: 'basic'
    },
    {
      id: 'includeLand',
      label: 'Include Land Value',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      tooltip: 'Whether to include land value in calculations',
      defaultValue: 'yes'
    }
  ],
  outputs: [
    {
      id: 'basicPricePerSqFt',
      label: 'Basic Price per Sq Ft',
      type: 'currency',
      format: 'USD',
      explanation: 'Simple price per square foot calculation'
    },
    {
      id: 'adjustedPricePerSqFt',
      label: 'Adjusted Price per Sq Ft',
      type: 'currency',
      format: 'USD',
      explanation: 'Price per square foot adjusted for features and condition'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'percentage',
      format: 'percent',
      explanation: 'How the property compares to market average'
    },
    {
      id: 'valueRating',
      label: 'Value Rating',
      type: 'text',
      format: 'text',
      explanation: 'Qualitative assessment of property value'
    },
    {
      id: 'featureAdjustments',
      label: 'Feature Adjustments',
      type: 'currency',
      format: 'USD',
      explanation: 'Total value adjustments for special features'
    },
    {
      id: 'conditionAdjustment',
      label: 'Condition Adjustment',
      type: 'currency',
      format: 'USD',
      explanation: 'Value adjustment based on property condition'
    },
    {
      id: 'locationAdjustment',
      label: 'Location Adjustment',
      type: 'currency',
      format: 'USD',
      explanation: 'Value adjustment based on location type'
    },
    {
      id: 'totalAdjustments',
      label: 'Total Adjustments',
      type: 'currency',
      format: 'USD',
      explanation: 'Sum of all value adjustments'
    },
    {
      id: 'adjustedPropertyValue',
      label: 'Adjusted Property Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Property value after all adjustments'
    },
    {
      id: 'priceRange',
      label: 'Price Range',
      type: 'text',
      format: 'text',
      explanation: 'Estimated price range based on market data'
    },
    {
      id: 'investmentMetrics',
      label: 'Investment Metrics',
      type: 'text',
      format: 'markdown',
      explanation: 'Investment analysis and metrics'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'markdown',
      explanation: 'Recommendations based on analysis'
    }
  ],
  formulas: [
    {
      id: 'price-per-square-foot-calculation',
      name: 'Price Per Square Foot Calculation',
      description: 'Calculate price per square foot with adjustments and market comparison',
      calculate: calculatePricePerSquareFoot
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validatePricePerSquareFootInputs
    }
  ],
  examples: [
    {
      title: 'Standard Single Family Home',
      description: 'Typical suburban single family home with basic features',
      inputs: {
        propertyPrice: 450000,
        totalSquareFootage: 2200,
        propertyType: 'single_family',
        bedrooms: 3,
        bathrooms: 2.5,
        yearBuilt: 2005,
        lotSize: 8000,
        condition: 'good',
        location: 'suburban',
        marketAverage: 205,
        comparableProperties: 12,
        features: ['garage', 'basement', 'central_air'],
        adjustmentFactors: 0,
        calculationType: 'adjusted',
        includeLand: 'yes'
      },
      expectedOutputs: {
        basicPricePerSqFt: 204.55,
        adjustedPricePerSqFt: 218.18,
        marketComparison: 6.43,
        valueRating: 'Good Value',
        featureAdjustments: 30000,
        conditionAdjustment: 0,
        locationAdjustment: 0,
        totalAdjustments: 30000,
        adjustedPropertyValue: 480000,
        priceRange: '$430,000 - $470,000',
        investmentMetrics: '**Investment Analysis:**\n- Price per sq ft: $204.55\n- Market comparison: 6.43% above average\n- Value rating: Good Value',
        recommendations: '**Recommendations:**\n- Property is priced competitively\n- Good features for the price point\n- Consider market timing for optimal sale'
      }
    },
    {
      title: 'Luxury Condo with Premium Features',
      description: 'High-end condo with premium features and urban location',
      inputs: {
        propertyPrice: 850000,
        totalSquareFootage: 1800,
        propertyType: 'condo',
        bedrooms: 2,
        bathrooms: 2,
        yearBuilt: 2018,
        lotSize: 0,
        condition: 'excellent',
        location: 'urban',
        marketAverage: 450,
        comparableProperties: 8,
        features: ['granite_countertops', 'stainless_steel_appliances', 'hardwood_floors', 'view', 'gated_community'],
        adjustmentFactors: 5,
        calculationType: 'comparison',
        includeLand: 'no'
      },
      expectedOutputs: {
        basicPricePerSqFt: 472.22,
        adjustedPricePerSqFt: 520.83,
        marketComparison: 15.74,
        valueRating: 'Premium Value',
        featureAdjustments: 87500,
        conditionAdjustment: 42500,
        locationAdjustment: 85000,
        totalAdjustments: 215000,
        adjustedPropertyValue: 1065000,
        priceRange: '$800,000 - $900,000',
        investmentMetrics: '**Investment Analysis:**\n- Price per sq ft: $472.22\n- Market comparison: 15.74% above average\n- Value rating: Premium Value',
        recommendations: '**Recommendations:**\n- Premium pricing justified by features\n- Strong market position\n- Consider rental potential'
      }
    },
    {
      title: 'Investment Property Analysis',
      description: 'Multi-family property for investment purposes',
      inputs: {
        propertyPrice: 650000,
        totalSquareFootage: 3200,
        propertyType: 'multi_family',
        bedrooms: 6,
        bathrooms: 4,
        yearBuilt: 1995,
        lotSize: 12000,
        condition: 'fair',
        location: 'suburban',
        marketAverage: 180,
        comparableProperties: 15,
        features: ['garage', 'basement'],
        adjustmentFactors: -10,
        calculationType: 'investment',
        includeLand: 'yes'
      },
      expectedOutputs: {
        basicPricePerSqFt: 203.13,
        adjustedPricePerSqFt: 182.81,
        marketComparison: 1.58,
        valueRating: 'Fair Value',
        featureAdjustments: 32000,
        conditionAdjustment: -65000,
        locationAdjustment: 0,
        totalAdjustments: -33000,
        adjustedPropertyValue: 617000,
        priceRange: '$600,000 - $680,000',
        investmentMetrics: '**Investment Analysis:**\n- Price per sq ft: $203.13\n- Market comparison: 1.58% above average\n- Value rating: Fair Value\n- Potential for value-add improvements',
        recommendations: '**Recommendations:**\n- Consider renovation to improve value\n- Good investment potential with improvements\n- Monitor market trends for optimal timing'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};