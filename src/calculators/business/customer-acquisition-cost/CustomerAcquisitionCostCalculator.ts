import { Calculator } from '../../../types/calculator';
import { CustomerAcquisitionCostInputs, CustomerAcquisitionCostOutputs } from './types';
import {
  calculateCacPerCustomer,
  calculateCacToLtvRatio,
  calculatePaybackPeriod,
  calculateRoiPercentage,
  generateCacAnalysis
} from './formulas';
import { validateCustomerAcquisitionCostInputs, validateCustomerAcquisitionCostBusinessRules } from './validation';

export const CustomerAcquisitionCostCalculator: Calculator = {
  id: 'customer-acquisition-cost-calculator',
  title: 'Customer Acquisition Cost Calculator',
  category: 'business',
  subcategory: 'Marketing & Sales',
  description: 'Calculate customer acquisition cost (CAC), CAC to LTV ratio, payback period, and ROI analysis for marketing campaigns and sales efforts.',
  usageInstructions: [
    'Enter total marketing spend and number of new customers acquired',
    'Input customer lifetime value and time period',
    'Specify conversion rates and channel breakdowns',
    'Review CAC metrics and optimization recommendations'
  ],

  inputs: [
    {
      id: 'totalMarketingSpend',
      label: 'Total Marketing Spend ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total amount spent on marketing and customer acquisition'
    },
    {
      id: 'numberOfNewCustomers',
      label: 'Number of New Customers',
      type: 'number',
      required: true,
      min: 1,
      tooltip: 'Number of new customers acquired during the period'
    },
    {
      id: 'customerLifetimeValue',
      label: 'Customer Lifetime Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Average lifetime value of a customer'
    },
    {
      id: 'timePeriod',
      label: 'Time Period',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      tooltip: 'Time period for the analysis'
    },
    {
      id: 'conversionRate',
      label: 'Conversion Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Percentage of leads that convert to customers'
    },
    {
      id: 'averageOrderValue',
      label: 'Average Order Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Average value of each customer order'
    },
    {
      id: 'costPerLead',
      label: 'Cost Per Lead ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Average cost to acquire a marketing lead'
    }
  ],

  outputs: [
    {
      id: 'cacPerCustomer',
      label: 'CAC per Customer',
      type: 'currency',
      explanation: 'Customer acquisition cost per new customer'
    },
    {
      id: 'cacToLtvRatio',
      label: 'CAC to LTV Ratio',
      type: 'percentage',
      explanation: 'Ratio of customer acquisition cost to lifetime value'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period',
      type: 'number',
      explanation: 'Time required to recover acquisition costs'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'SaaS Company Marketing Campaign',
      description: 'CAC analysis for a SaaS company with $50K marketing spend',
      inputs: {
        totalMarketingSpend: 50000,
        numberOfNewCustomers: 200,
        customerLifetimeValue: 2400,
        timePeriod: 'quarterly',
        conversionRate: 3.5,
        averageOrderValue: 120,
        costPerLead: 25
      },
      expectedOutputs: {
        cacPerCustomer: 250,
        cacToLtvRatio: 10.4,
        paybackPeriod: 3
      }
    }
  ]
};