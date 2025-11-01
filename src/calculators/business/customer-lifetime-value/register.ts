import { CalculatorRegistration } from '../../types/calculator';
import { calculateCustomerLifetimeValue } from './formulas';
import { validateCustomerLifetimeValueInputs } from './validation';
import { CustomerLifetimeValueInputs } from './types';

const customerLifetimeValueCalculator: CalculatorRegistration = {
  id: 'CustomerLifetimeValue',
  name: 'Customer Lifetime Value Calculator',
  description: 'Comprehensive customer lifetime value analysis with cohort modeling, risk assessment, and optimization insights',
  category: 'business',
  tags: ['clv', 'customer-value', 'lifetime-value', 'customer-analytics', 'business-metrics', 'roi', 'acquisition', 'retention'],
  
  inputs: {
    averageOrderValue: {
      type: 'number',
      label: 'Average Order Value',
      required: true,
      min: 0.01,
      max: 100000,
      step: 0.01,
      placeholder: '100'
    },
    purchaseFrequency: {
      type: 'number',
      label: 'Purchase Frequency (per year)',
      required: true,
      min: 0.1,
      max: 365,
      step: 0.1,
      placeholder: '12'
    },
    customerLifespan: {
      type: 'number',
      label: 'Customer Lifespan (years)',
      required: true,
      min: 0.1,
      max: 50,
      step: 0.1,
      placeholder: '3'
    },
    acquisitionCost: {
      type: 'number',
      label: 'Customer Acquisition Cost',
      required: true,
      min: 0,
      max: 100000,
      step: 1,
      placeholder: '50'
    },
    grossMargin: {
      type: 'number',
      label: 'Gross Margin (%)',
      required: true,
      min: 1,
      max: 100,
      step: 0.1,
      placeholder: '70'
    },
    retentionRate: {
      type: 'number',
      label: 'Retention Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '85'
    },
    churnRate: {
      type: 'number',
      label: 'Churn Rate (%)',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '15'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '10'
    },
    referralValue: {
      type: 'number',
      label: 'Referral Value',
      required: false,
      min: 0,
      max: 10000,
      step: 1,
      placeholder: '25'
    },
    crossSellValue: {
      type: 'number',
      label: 'Cross-Sell Value',
      required: false,
      min: 0,
      max: 10000,
      step: 1,
      placeholder: '50'
    },
    upSellValue: {
      type: 'number',
      label: 'Up-Sell Value',
      required: false,
      min: 0,
      max: 10000,
      step: 1,
      placeholder: '75'
    },
    supportCost: {
      type: 'number',
      label: 'Support Cost',
      required: false,
      min: 0,
      max: 10000,
      step: 1,
      placeholder: '10'
    },
    marketingCost: {
      type: 'number',
      label: 'Marketing Cost',
      required: false,
      min: 0,
      max: 10000,
      step: 1,
      placeholder: '5'
    },
    industry: {
      type: 'select',
      label: 'Industry',
      required: false,
      options: [
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'saas', label: 'SaaS' },
        { value: 'subscription', label: 'Subscription' },
        { value: 'retail', label: 'Retail' },
        { value: 'b2b', label: 'B2B' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'other', label: 'Other' }
      ]
    },
    businessModel: {
      type: 'select',
      label: 'Business Model',
      required: false,
      options: [
        { value: 'subscription', label: 'Subscription' },
        { value: 'transactional', label: 'Transactional' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'franchise', label: 'Franchise' }
      ]
    },
    customerType: {
      type: 'select',
      label: 'Customer Type',
      required: false,
      options: [
        { value: 'b2c', label: 'B2C' },
        { value: 'b2b', label: 'B2B' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'sme', label: 'SME' },
        { value: 'startup', label: 'Startup' }
      ]
    },
    growthRate: {
      type: 'number',
      label: 'Annual Growth Rate (%)',
      required: false,
      min: -50,
      max: 200,
      step: 0.1,
      placeholder: '25'
    },
    marketRisk: {
      type: 'number',
      label: 'Market Risk (%)',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '15'
    },
    competitiveRisk: {
      type: 'number',
      label: 'Competitive Risk (%)',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '20'
    },
    economicRisk: {
      type: 'number',
      label: 'Economic Risk (%)',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '10'
    },
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (months)',
      required: false,
      min: 1,
      max: 120,
      step: 1,
      placeholder: '24'
    },
    projectionMonths: {
      type: 'number',
      label: 'Projection Months',
      required: false,
      min: 1,
      max: 120,
      step: 1,
      placeholder: '36'
    }
  },
  
  calculate: (inputs: CustomerLifetimeValueInputs, allInputs?: Record<string, any>) => {
    return calculateCustomerLifetimeValue(inputs, allInputs);
  },
  
  validate: (inputs: CustomerLifetimeValueInputs, allInputs?: Record<string, any>) => {
    return validateCustomerLifetimeValueInputs(inputs, allInputs);
  },
  
  examples: [
    {
      name: 'SaaS Subscription Business',
      inputs: {
        averageOrderValue: 50,
        purchaseFrequency: 12,
        customerLifespan: 5,
        acquisitionCost: 200,
        grossMargin: 80,
        retentionRate: 90,
        churnRate: 10,
        discountRate: 12,
        referralValue: 100,
        crossSellValue: 150,
        upSellValue: 200,
        supportCost: 20,
        marketingCost: 10,
        industry: 'saas',
        businessModel: 'subscription',
        customerType: 'b2b',
        growthRate: 30,
        marketRisk: 15,
        competitiveRisk: 20,
        economicRisk: 10,
        analysisPeriod: 24,
        projectionMonths: 36
      }
    },
    {
      name: 'E-commerce Retail Business',
      inputs: {
        averageOrderValue: 85,
        purchaseFrequency: 4,
        customerLifespan: 3,
        acquisitionCost: 25,
        grossMargin: 45,
        retentionRate: 75,
        churnRate: 25,
        discountRate: 8,
        referralValue: 30,
        crossSellValue: 40,
        upSellValue: 60,
        supportCost: 5,
        marketingCost: 8,
        industry: 'ecommerce',
        businessModel: 'transactional',
        customerType: 'b2c',
        growthRate: 15,
        marketRisk: 20,
        competitiveRisk: 25,
        economicRisk: 15,
        analysisPeriod: 18,
        projectionMonths: 24
      }
    },
    {
      name: 'B2B Enterprise Service',
      inputs: {
        averageOrderValue: 5000,
        purchaseFrequency: 2,
        customerLifespan: 8,
        acquisitionCost: 5000,
        grossMargin: 65,
        retentionRate: 95,
        churnRate: 5,
        discountRate: 10,
        referralValue: 500,
        crossSellValue: 1000,
        upSellValue: 1500,
        supportCost: 200,
        marketingCost: 100,
        industry: 'b2b',
        businessModel: 'hybrid',
        customerType: 'enterprise',
        growthRate: 20,
        marketRisk: 10,
        competitiveRisk: 15,
        economicRisk: 8,
        analysisPeriod: 36,
        projectionMonths: 48
      }
    }
  ],
  
  relatedCalculators: [
    'saas-metrics',
    'CustomerAcquisitionCost',
    'ChurnRateCalculator',
    'roi-calculator',
    'business-valuation'
  ]
};

export default customerLifetimeValueCalculator;
