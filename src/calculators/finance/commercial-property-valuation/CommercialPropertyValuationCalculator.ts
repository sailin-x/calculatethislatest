import { Calculator } from '../../types/calculator';
import { calculatePropertyValue, generateValuationAnalysis } from './formulas';
import { validateValuationInputs } from './validation';

export const CommercialPropertyValuationCalculator: Calculator = {
  id: 'commercial-property-valuation-calculator',
  name: 'Commercial Property Valuation Calculator',
  category: 'finance',
  subcategory: 'business',
  description: 'Calculate commercial property values using multiple valuation methods including income approach, sales comparison, and cost approach.',
  
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Store' },
        { value: 'warehouse', label: 'Warehouse/Industrial' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'self-storage', label: 'Self-Storage Facility' }
      ]
    },
    {
      id: 'squareFootage',
      name: 'Square Footage',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Total building square footage',
      placeholder: '15000',
      min: 1000,
      max: 1000000
    },
    {
      id: 'landArea',
      name: 'Land Area',
      type: 'number',
      unit: 'acres',
      required: true,
      description: 'Total land area in acres',
      placeholder: '2.5',
      min: 0.1,
      max: 1000
    },
    {
      id: 'yearBuilt',
      name: 'Year Built',
      type: 'number',
      required: true,
      description: 'Year the building was constructed',
      placeholder: '1995',
      min: 1900,
      max: 2024
    },
    {
      id: 'constructionQuality',
      name: 'Construction Quality',
      type: 'select',
      required: true,
      description: 'Quality of construction and materials',
      options: [
        { value: 'economy', label: 'Economy Grade' },
        { value: 'standard', label: 'Standard Grade' },
        { value: 'custom', label: 'Custom Grade' },
        { value: 'luxury', label: 'Luxury Grade' }
      ]
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: true,
      description: 'Geographic location and market area',
      options: [
        { value: 'rural', label: 'Rural Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'urban', label: 'Urban Area' },
        { value: 'cbd', label: 'Central Business District' },
        { value: 'airport', label: 'Airport Area' },
        { value: 'highway', label: 'Highway/Interstate' }
      ]
    },
    {
      id: 'marketCondition',
      name: 'Market Condition',
      type: 'select',
      required: true,
      description: 'Current market conditions',
      options: [
        { value: 'declining', label: 'Declining Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'growing', label: 'Growing Market' },
        { value: 'hot', label: 'Hot Market' }
      ]
    },
    {
      id: 'annualRent',
      name: 'Annual Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual rental income',
      placeholder: '180000',
      min: 0,
      max: 10000000
    },
    {
      id: 'operatingExpenses',
      name: 'Operating Expenses',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual operating expenses',
      placeholder: '45000',
      min: 0,
      max: 5000000
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected vacancy rate',
      placeholder: '5',
      min: 0,
      max: 50
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Market capitalization rate',
      placeholder: '7.5',
      min: 2,
      max: 15
    },
    {
      id: 'comparableSales',
      name: 'Comparable Sales',
      type: 'number',
      unit: 'USD/sq ft',
      required: true,
      description: 'Average price per sq ft from comparable sales',
      placeholder: '150',
      min: 10,
      max: 1000
    },
    {
      id: 'landValue',
      name: 'Land Value',
      type: 'number',
      unit: 'USD/acre',
      required: true,
      description: 'Market value of land per acre',
      placeholder: '50000',
      min: 1000,
      max: 1000000
    },
    {
      id: 'replacementCost',
      name: 'Replacement Cost',
      type: 'number',
      unit: 'USD/sq ft',
      required: true,
      description: 'Cost to replace building per sq ft',
      placeholder: '120',
      min: 20,
      max: 500
    },
    {
      id: 'depreciation',
      name: 'Depreciation',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Accumulated depreciation percentage',
      placeholder: '15',
      min: 0,
      max: 90
    },
    {
      id: 'zoning',
      name: 'Zoning',
      type: 'select',
      required: true,
      description: 'Property zoning classification',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'mixed', label: 'Mixed Use' },
        { value: 'agricultural', label: 'Agricultural' }
      ]
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      type: 'select',
      required: true,
      description: 'Property accessibility and visibility',
      options: [
        { value: 'poor', label: 'Poor' },
        { value: 'fair', label: 'Fair' },
        { value: 'good', label: 'Good' },
        { value: 'excellent', label: 'Excellent' }
      ]
    },
    {
      id: 'condition',
      name: 'Property Condition',
      type: 'select',
      required: true,
      description: 'Overall property condition',
      options: [
        { value: 'poor', label: 'Poor' },
        { value: 'fair', label: 'Fair' },
        { value: 'good', label: 'Good' },
        { value: 'excellent', label: 'Excellent' }
      ]
    },
    {
      id: 'tenantQuality',
      name: 'Tenant Quality',
      type: 'select',
      required: true,
      description: 'Quality and creditworthiness of tenants',
      options: [
        { value: 'poor', label: 'Poor' },
        { value: 'fair', label: 'Fair' },
        { value: 'good', label: 'Good' },
        { value: 'excellent', label: 'Excellent' }
      ]
    },
    {
      id: 'leaseTerms',
      name: 'Lease Terms',
      type: 'select',
      required: true,
      description: 'Length and quality of lease agreements',
      options: [
        { value: 'month-to-month', label: 'Month-to-Month' },
        { value: 'short-term', label: 'Short-Term (1-3 years)' },
        { value: 'medium-term', label: 'Medium-Term (3-7 years)' },
        { value: 'long-term', label: 'Long-Term (7+ years)' }
      ]
    }
  ],

  outputs: [
    {
      id: 'incomeApproachValue',
      name: 'Income Approach Value',
      type: 'number',
      unit: 'USD',
      description: 'Property value based on income approach'
    },
    {
      id: 'salesComparisonValue',
      name: 'Sales Comparison Value',
      type: 'number',
      unit: 'USD',
      description: 'Property value based on sales comparison approach'
    },
    {
      id: 'costApproachValue',
      name: 'Cost Approach Value',
      type: 'number',
      unit: 'USD',
      description: 'Property value based on cost approach'
    },
    {
      id: 'finalValue',
      name: 'Final Estimated Value',
      type: 'number',
      unit: 'USD',
      description: 'Weighted final property value estimate'
    },
    {
      id: 'valuePerSqFt',
      name: 'Value per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Final value per square foot'
    },
    {
      id: 'valuePerAcre',
      name: 'Value per Acre',
      type: 'number',
      unit: 'USD/acre',
      description: 'Final value per acre'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'effectiveGrossIncome',
      name: 'Effective Gross Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual effective gross income'
    },
    {
      id: 'operatingExpenseRatio',
      name: 'Operating Expense Ratio',
      type: 'number',
      unit: '%',
      description: 'Operating expenses as percentage of gross income'
    },
    {
      id: 'valueRange',
      name: 'Value Range',
      type: 'string',
      description: 'Estimated value range (low-high)'
    },
    {
      id: 'confidenceLevel',
      name: 'Confidence Level',
      type: 'string',
      description: 'Confidence level in the valuation'
    },
    {
      id: 'keyFactors',
      name: 'Key Value Factors',
      type: 'string',
      description: 'Key factors affecting property value'
    }
  ],

  calculate: (inputs) => {
    const validation = validateValuationInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculatePropertyValue(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateValuationAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Income Approach',
      formula: 'Value = Net Operating Income / Cap Rate',
      description: 'Values property based on income generation potential'
    },
    {
      name: 'Sales Comparison Approach',
      formula: 'Value = Square Footage × Comparable Sales Price per Sq Ft × Adjustments',
      description: 'Values property based on recent comparable sales'
    },
    {
      name: 'Cost Approach',
      formula: 'Value = Land Value + (Replacement Cost × Square Footage × (1 - Depreciation))',
      description: 'Values property based on replacement cost minus depreciation'
    },
    {
      name: 'Net Operating Income',
      formula: 'NOI = Effective Gross Income - Operating Expenses',
      description: 'Calculates annual net operating income'
    },
    {
      name: 'Effective Gross Income',
      formula: 'EGI = Annual Rent × (1 - Vacancy Rate)',
      description: 'Calculates effective gross income after vacancy'
    }
  ],

  examples: [
    {
      name: 'Office Building Valuation',
      description: 'A modern office building in a growing market',
      inputs: {
        propertyType: 'office',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      },
      expectedOutputs: {
        incomeApproachValue: 1710000,
        salesComparisonValue: 2250000,
        costApproachValue: 1980000,
        finalValue: 1980000,
        valuePerSqFt: 132,
        valuePerAcre: 792000,
        netOperatingIncome: 128250,
        effectiveGrossIncome: 171000,
        operatingExpenseRatio: 26.3,
        valueRange: '$1,800,000 - $2,200,000',
        confidenceLevel: 'High',
        keyFactors: 'Strong tenant quality, excellent location, growing market'
      }
    },
    {
      name: 'Retail Property Valuation',
      description: 'A retail store in a stable suburban market',
      inputs: {
        propertyType: 'retail',
        squareFootage: 8000,
        landArea: 1.2,
        yearBuilt: 1995,
        constructionQuality: 'standard',
        location: 'suburban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 8,
        capRate: 8.0,
        comparableSales: 125,
        landValue: 35000,
        replacementCost: 100,
        depreciation: 25,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      },
      expectedOutputs: {
        incomeApproachValue: 1104000,
        salesComparisonValue: 1000000,
        costApproachValue: 1050000,
        finalValue: 1050000,
        valuePerSqFt: 131.25,
        valuePerAcre: 875000,
        netOperatingIncome: 88320,
        effectiveGrossIncome: 110400,
        operatingExpenseRatio: 27.2,
        valueRange: '$1,000,000 - $1,100,000',
        confidenceLevel: 'Medium',
        keyFactors: 'Stable market, good accessibility, standard construction'
      }
    }
  ]
};
