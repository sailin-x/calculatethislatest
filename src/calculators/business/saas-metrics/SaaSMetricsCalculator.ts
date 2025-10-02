import { Calculator } from '../../types/calculator';
import { saasMetricsCalculatorFormula } from './formulas';
import { getSaaSMetricsValidationRules } from './validation';

export const saasMetricsCalculator: Calculator = {
  id: 'saas-metrics-calculator',
  title: 'SaaS Metrics Calculator',
  category: 'business',
  subcategory: 'SaaS Metrics',
  description: 'Comprehensive SaaS business metrics including LTV, CAC, churn analysis, cohort modeling, growth projections, and health scoring.',
  
  usageInstructions: [
    'Enter your Monthly Recurring Revenue and total revenue figures',
    'Input customer metrics including total customers and monthly changes',
    'Add Customer Acquisition Cost and Average Revenue Per User',
    'Set your gross margin percentage',
    'Include cohort retention data if available for advanced analysis',
    'Review comprehensive SaaS metrics and growth projections'
  ],

  inputs: [
    {
      id: 'monthlyRecurringRevenue',
      label: 'Monthly Recurring Revenue (MRR)',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Predictable monthly revenue from subscriptions',
      defaultValue: 50000
    },
    {
      id: 'totalRevenue',
      label: 'Total Monthly Revenue',
      type: 'currency',
      required: true,
      placeholder: '55000',
      tooltip: 'Total monthly revenue including one-time fees',
      defaultValue: 55000
    },
    {
      id: 'totalCustomers',
      label: 'Total Customers',
      type: 'number',
      required: true,
      placeholder: '500',
      tooltip: 'Current total number of paying customers',
      defaultValue: 500
    },
    {
      id: 'newCustomersThisMonth',
      label: 'New Customers This Month',
      type: 'number',
      required: true,
      placeholder: '25',
      tooltip: 'Number of new customers acquired this month',
      defaultValue: 25
    },
    {
      id: 'churnedCustomersThisMonth',
      label: 'Churned Customers This Month',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of customers who cancelled this month',
      defaultValue: 10
    },
    {
      id: 'customerAcquisitionCost',
      label: 'Customer Acquisition Cost (CAC)',
      type: 'currency',
      required: true,
      placeholder: '200',
      tooltip: 'Average cost to acquire one new customer',
      defaultValue: 200
    },
    {
      id: 'averageRevenuePerUser',
      label: 'Average Revenue Per User (ARPU)',
      type: 'currency',
      required: true,
      placeholder: '100',
      tooltip: 'Average monthly revenue per customer',
      defaultValue: 100
    },
    {
      id: 'grossMargin',
      label: 'Gross Margin (%)',
      type: 'percentage',
      required: true,
      placeholder: '80',
      tooltip: 'Gross profit margin percentage',
      defaultValue: 80,
      step: 0.1
    },
    {
      id: 'timeHorizon',
      label: 'Projection Time Horizon (Months)',
      type: 'number',
      required: false,
      placeholder: '12',
      tooltip: 'Number of months for growth projections',
      defaultValue: 12,
      min: 1,
      max: 60
    }
  ],

  outputs: [
    {
      id: 'customerLifetimeValue',
      label: 'Customer Lifetime Value (LTV)',
      type: 'currency',
      explanation: 'Expected total revenue from a customer over their lifetime'
    },
    {
      id: 'ltvCacRatio',
      label: 'LTV:CAC Ratio',
      type: 'number',
      explanation: 'Ratio of Customer Lifetime Value to Customer Acquisition Cost'
    },
    {
      id: 'cacPaybackPeriod',
      label: 'CAC Payback Period',
      type: 'number',
      explanation: 'Months required to recover customer acquisition cost'
    },
    {
      id: 'churnRate',
      label: 'Monthly Churn Rate',
      type: 'percentage',
      explanation: 'Percentage of customers who cancel each month'
    },
    {
      id: 'retentionRate',
      label: 'Monthly Retention Rate',
      type: 'percentage',
      explanation: 'Percentage of customers retained each month'
    },
    {
      id: 'monthlyGrowthRate',
      label: 'Monthly Growth Rate',
      type: 'percentage',
      explanation: 'Month-over-month customer growth rate'
    },
    {
      id: 'annualGrowthRate',
      label: 'Annual Growth Rate',
      type: 'percentage',
      explanation: 'Annualized customer growth rate'
    },
    {
      id: 'ruleOf40',
      label: 'Rule of 40 Score',
      type: 'number',
      explanation: 'Growth rate + profit margin (healthy SaaS companies score 40+)'
    },
    {
      id: 'averageRevenuePerAccount',
      label: 'Average Revenue Per Account',
      type: 'currency',
      explanation: 'Average monthly revenue per customer account'
    },
    {
      id: 'annualRunRate',
      label: 'Annual Run Rate',
      type: 'currency',
      explanation: 'Annualized revenue based on current MRR'
    },
    {
      id: 'projectedMRRIn12Months',
      label: 'Projected MRR (12 Months)',
      type: 'currency',
      explanation: 'Projected Monthly Recurring Revenue in 12 months'
    },
    {
      id: 'projectedCustomersIn12Months',
      label: 'Projected Customers (12 Months)',
      type: 'number',
      explanation: 'Projected customer count in 12 months'
    },
    {
      id: 'healthScore',
      label: 'SaaS Health Score',
      type: 'number',
      explanation: 'Overall business health score (0-100)'
    },
    {
      id: 'healthGrade',
      label: 'Health Grade',
      type: 'text',
      explanation: 'Letter grade for overall SaaS business health'
    }
  ],

  formulas: [saasMetricsCalculatorFormula],
  validationRules: getSaaSMetricsValidationRules(),

  examples: [
    {
      title: 'Early Stage SaaS Startup',
      description: 'Small SaaS company with high growth potential',
      inputs: {
        monthlyRecurringRevenue: 25000,
        totalRevenue: 28000,
        totalCustomers: 250,
        newCustomersThisMonth: 30,
        churnedCustomersThisMonth: 5,
        customerAcquisitionCost: 150,
        averageRevenuePerUser: 100,
        grossMargin: 85,
        timeHorizon: 12
      },
      expectedOutputs: {
        customerLifetimeValue: 4250,
        ltvCacRatio: 28.3,
        churnRate: 2.0,
        monthlyGrowthRate: 10.0
      }
    },
    {
      title: 'Growth Stage SaaS Company',
      description: 'Established SaaS business with solid metrics',
      inputs: {
        monthlyRecurringRevenue: 150000,
        totalRevenue: 165000,
        totalCustomers: 1000,
        newCustomersThisMonth: 80,
        churnedCustomersThisMonth: 30,
        customerAcquisitionCost: 300,
        averageRevenuePerUser: 150,
        grossMargin: 82,
        timeHorizon: 24
      },
      expectedOutputs: {
        customerLifetimeValue: 4100,
        ltvCacRatio: 13.7,
        churnRate: 3.0,
        monthlyGrowthRate: 5.0
      }
    },
    {
      title: 'Enterprise SaaS Platform',
      description: 'Large SaaS company with high ARPU and low churn',
      inputs: {
        monthlyRecurringRevenue: 500000,
        totalRevenue: 520000,
        totalCustomers: 1000,
        newCustomersThisMonth: 25,
        churnedCustomersThisMonth: 8,
        customerAcquisitionCost: 2000,
        averageRevenuePerUser: 500,
        grossMargin: 88,
        timeHorizon: 18
      },
      expectedOutputs: {
        customerLifetimeValue: 55000,
        ltvCacRatio: 27.5,
        churnRate: 0.8,
        monthlyGrowthRate: 1.7
      }
    }
  ]
};