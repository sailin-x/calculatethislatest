import { Calculator } from '../../../types/calculator';
import { calculatePricePerSquareFoot, generatePricePerSquareFootAnalysis } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { quickValidatePricePerSquareFoot } from './quickValidation';
import { PricePerSquareFootInputs } from './validation';

export const PricePerSquareFootCalculator: Calculator = {
  id: 'price-per-square-foot',
  name: 'Price Per Square Foot Calculator',
  category: 'finance',
  description: 'Calculate and analyze price per square foot for real estate properties, including market comparisons and valuation insights.',
  tags: ['real estate', 'pricing', 'valuation', 'market analysis', 'comparison', 'square footage', 'property'],
  inputs: [
    {
      id: 'propertyPrice',
      name: 'Property Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total property price or asking price',
      placeholder: '450000'
    },
    {
      id: 'totalSquareFootage',
      name: 'Total Square Footage',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Total livable square footage of the property',
      placeholder: '2500'
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property',
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'condo', label: 'Condominium' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Land/Lot' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'duplex', label: 'Duplex' },
        { value: 'triplex', label: 'Triplex' },
        { value: 'fourplex', label: 'Fourplex' }
      ],
      default: 'single_family'
    },
    {
      id: 'location',
      name: 'Location',
      type: 'text',
      required: false,
      description: 'Property location (city, state, zip code)',
      placeholder: 'Austin, TX 78701'
    },
    {
      id: 'bedrooms',
      name: 'Bedrooms',
      type: 'number',
      required: false,
      description: 'Number of bedrooms',
      placeholder: '3'
    },
    {
      id: 'bathrooms',
      name: 'Bathrooms',
      type: 'number',
      required: false,
      description: 'Number of bathrooms',
      placeholder: '2.5'
    },
    {
      id: 'yearBuilt',
      name: 'Year Built',
      type: 'number',
      required: false,
      description: 'Year the property was built',
      placeholder: '2010'
    },
    {
      id: 'lotSize',
      name: 'Lot Size',
      type: 'number',
      unit: 'sq ft',
      required: false,
      description: 'Lot size in square feet',
      placeholder: '8000'
    },
    {
      id: 'condition',
      name: 'Property Condition',
      type: 'select',
      required: false,
      description: 'Overall condition of the property',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'very_good', label: 'Very Good' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs_work', label: 'Needs Work' }
      ],
      default: 'good'
    },
    {
      id: 'features',
      name: 'Special Features',
      type: 'multiselect',
      required: false,
      description: 'Special features that may affect value',
      options: [
        { value: 'pool', label: 'Pool' },
        { value: 'garage', label: 'Garage' },
        { value: 'basement', label: 'Basement' },
        { value: 'fireplace', label: 'Fireplace' },
        { value: 'hardwood_floors', label: 'Hardwood Floors' },
        { value: 'granite_countertops', label: 'Granite Countertops' },
        { value: 'stainless_steel_appliances', label: 'Stainless Steel Appliances' },
        { value: 'updated_kitchen', label: 'Updated Kitchen' },
        { value: 'updated_bathrooms', label: 'Updated Bathrooms' },
        { value: 'energy_efficient', label: 'Energy Efficient' },
        { value: 'smart_home', label: 'Smart Home Features' },
        { value: 'mountain_view', label: 'Mountain View' },
        { value: 'ocean_view', label: 'Ocean View' },
        { value: 'city_view', label: 'City View' },
        { value: 'garden', label: 'Garden' },
        { value: 'deck', label: 'Deck/Patio' },
        { value: 'fenced_yard', label: 'Fenced Yard' },
        { value: 'central_air', label: 'Central Air' },
        { value: 'central_heat', label: 'Central Heat' },
        { value: 'walk_in_closet', label: 'Walk-in Closet' }
      ]
    },
    {
      id: 'marketData',
      name: 'Market Comparison Data',
      type: 'array',
      required: false,
      description: 'Recent comparable sales data',
      placeholder: 'Array of comparable properties'
    },
    {
      id: 'averageMarketPrice',
      name: 'Average Market Price per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      required: false,
      description: 'Average price per square foot in the area',
      placeholder: '180'
    },
    {
      id: 'medianMarketPrice',
      name: 'Median Market Price per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      required: false,
      description: 'Median price per square foot in the area',
      placeholder: '175'
    },
    {
      id: 'marketTrend',
      name: 'Market Trend',
      type: 'select',
      required: false,
      description: 'Current market trend in the area',
      options: [
        { value: 'appreciating', label: 'Appreciating' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' },
        { value: 'volatile', label: 'Volatile' }
      ],
      default: 'stable'
    },
    {
      id: 'daysOnMarket',
      name: 'Days on Market',
      type: 'number',
      unit: 'days',
      required: false,
      description: 'Number of days the property has been on market',
      placeholder: '45'
    },
    {
      id: 'priceHistory',
      name: 'Price History',
      type: 'array',
      required: false,
      description: 'Price change history',
      placeholder: 'Array of price changes'
    },
    {
      id: 'propertyTaxes',
      name: 'Annual Property Taxes',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual property tax amount',
      placeholder: '8500'
    },
    {
      id: 'hoaFees',
      name: 'HOA Fees',
      type: 'number',
      unit: 'USD/month',
      required: false,
      description: 'Monthly HOA fees',
      placeholder: '250'
    },
    {
      id: 'utilities',
      name: 'Average Monthly Utilities',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Average monthly utility costs',
      placeholder: '200'
    },
    {
      id: 'rentalIncome',
      name: 'Potential Rental Income',
      type: 'number',
      unit: 'USD/month',
      required: false,
      description: 'Potential monthly rental income',
      placeholder: '2800'
    },
    {
      id: 'includeComparables',
      name: 'Include Comparable Analysis',
      type: 'boolean',
      required: false,
      description: 'Include detailed comparable property analysis',
      default: true
    },
    {
      id: 'includeMarketTrends',
      name: 'Include Market Trends',
      type: 'boolean',
      required: false,
      description: 'Include market trend analysis',
      default: true
    },
    {
      id: 'includeROI',
      name: 'Include ROI Analysis',
      type: 'boolean',
      required: false,
      description: 'Include return on investment analysis',
      default: false
    },
    {
      id: 'includeRentalAnalysis',
      name: 'Include Rental Analysis',
      type: 'boolean',
      required: false,
      description: 'Include rental income analysis',
      default: false
    }
  ],
  outputs: [
    {
      id: 'pricePerSquareFoot',
      name: 'Price Per Square Foot',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Calculated price per square foot'
    },
    {
      id: 'marketComparison',
      name: 'Market Comparison',
      type: 'object',
      description: 'Comparison with market averages'
    },
    {
      id: 'valuationAnalysis',
      name: 'Valuation Analysis',
      type: 'object',
      description: 'Property valuation insights'
    },
    {
      id: 'comparableAnalysis',
      name: 'Comparable Analysis',
      type: 'object',
      description: 'Analysis of comparable properties'
    },
    {
      id: 'marketTrends',
      name: 'Market Trends',
      type: 'object',
      description: 'Market trend analysis'
    },
    {
      id: 'roiAnalysis',
      name: 'ROI Analysis',
      type: 'object',
      description: 'Return on investment analysis'
    },
    {
      id: 'rentalAnalysis',
      name: 'Rental Analysis',
      type: 'object',
      description: 'Rental income analysis'
    },
    {
      id: 'priceRecommendations',
      name: 'Price Recommendations',
      type: 'array',
      description: 'Pricing recommendations'
    },
    {
      id: 'marketInsights',
      name: 'Market Insights',
      type: 'array',
      description: 'Market insights and observations'
    },
    {
      id: 'propertyScore',
      name: 'Property Score',
      type: 'object',
      description: 'Overall property score and rating'
    },
    {
      id: 'investmentMetrics',
      name: 'Investment Metrics',
      type: 'object',
      description: 'Investment-related metrics'
    },
    {
      id: 'costBreakdown',
      name: 'Cost Breakdown',
      type: 'object',
      description: 'Detailed cost breakdown analysis'
    }
  ],
  calculate: (inputs: PricePerSquareFootInputs) => {
    return calculatePricePerSquareFoot(inputs);
  },
  validate: validatePricePerSquareFootInputs,
  quickValidate: quickValidatePricePerSquareFoot,
  generateAnalysis: (inputs: PricePerSquareFootInputs, outputs: any) => {
    return generatePricePerSquareFootAnalysis(inputs, outputs);
  }
};