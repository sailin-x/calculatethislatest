import { Calculator } from '../../types/calculator';

export const PricePerSquareFootCalculator: Calculator = {
  id: 'PricePerSquare-foot-calculator',
  title: 'Price Per Square Foot Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate the price per square foot for properties and compare values across different properties.',
  usageInstructions: [
    'Enter the total property price and square footage to calculate price per square foot',
    'Compare multiple properties by entering their details',
    'Use the calculator to determine if a property is priced competitively',
    'Consider location, condition, and amenities when interpreting results'
  ],
  inputs: [
    // Primary Property
    { id: 'propertyPrice', label: 'Property Price', type: 'currency', required: true, placeholder: '500000', tooltip: 'Total purchase price of the property' },
    { id: 'squareFootage', label: 'Square Footage', type: 'number', required: true, placeholder: '2500', tooltip: 'Total living area in square feet' },

    // Comparison Properties (Optional)
    { id: 'comparePrice1', label: 'Comparison Property 1 Price', type: 'currency', required: false, placeholder: '450000', tooltip: 'Price of first comparison property' },
    { id: 'compareSqft1', label: 'Comparison Property 1 SqFt', type: 'number', required: false, placeholder: '2200', tooltip: 'Square footage of first comparison property' },
    { id: 'comparePrice2', label: 'Comparison Property 2 Price', type: 'currency', required: false, placeholder: '550000', tooltip: 'Price of second comparison property' },
    { id: 'compareSqft2', label: 'Comparison Property 2 SqFt', type: 'number', required: false, placeholder: '2800', tooltip: 'Square footage of second comparison property' },
    { id: 'comparePrice3', label: 'Comparison Property 3 Price', type: 'currency', required: false, placeholder: '480000', tooltip: 'Price of third comparison property' },
    { id: 'compareSqft3', label: 'Comparison Property 3 SqFt', type: 'number', required: false, placeholder: '2400', tooltip: 'Square footage of third comparison property' },

    // Market Analysis
    { id: 'marketAverage', label: 'Market Average ($/SqFt)', type: 'currency', required: false, placeholder: '200', tooltip: 'Average price per square foot in the area' },
    { id: 'propertyType', label: 'Property Type', type: 'select', required: false, options: [
      { value: 'single-family', label: 'Single Family Home' },
      { value: 'condo', label: 'Condominium' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'multi-family', label: 'Multi-Family' },
      { value: 'commercial', label: 'Commercial' }
    ], tooltip: 'Type of property for market comparison' }
  ],
  outputs: [
    { id: 'pricePerSqft', label: 'Price Per Square Foot', type: 'currency', explanation: 'Property price divided by total square footage' },
    { id: 'marketComparison', label: 'Market Comparison', type: 'text', explanation: 'How the property compares to market average' },
    { id: 'comparison1', label: 'Comparison Property 1 ($/SqFt)', type: 'currency', explanation: 'Price per square foot of first comparison property' },
    { id: 'comparison2', label: 'Comparison Property 2 ($/SqFt)', type: 'currency', explanation: 'Price per square foot of second comparison property' },
    { id: 'comparison3', label: 'Comparison Property 3 ($/SqFt)', type: 'currency', explanation: 'Price per square foot of third comparison property' },
    { id: 'averageComparison', label: 'Average of Comparisons ($/SqFt)', type: 'currency', explanation: 'Average price per square foot of all comparison properties' },
    { id: 'valueAssessment', label: 'Value Assessment', type: 'text', explanation: 'Assessment of whether the property is fairly priced' },
    { id: 'priceRange', label: 'Price Range', type: 'text', explanation: 'Range of prices per square foot for comparison properties' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};