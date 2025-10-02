import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

export const saasMetricsValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('monthlyRecurringRevenue', 'Monthly Recurring Revenue is required'),
  ValidationRuleFactory.required('totalRevenue', 'Total revenue is required'),
  ValidationRuleFactory.required('totalCustomers', 'Total customers is required'),
  ValidationRuleFactory.required('customerAcquisitionCost', 'Customer Acquisition Cost is required'),
  ValidationRuleFactory.required('averageRevenuePerUser', 'Average Revenue Per User is required'),
  ValidationRuleFactory.required('grossMargin', 'Gross margin is required'),

  // Revenue validation
  ValidationRuleFactory.positive('monthlyRecurringRevenue', 'MRR must be positive'),
  ValidationRuleFactory.range('monthlyRecurringRevenue', 100, 100000000, 'MRR must be between $100 and $100M'),
  ValidationRuleFactory.positive('totalRevenue', 'Total revenue must be positive'),
  ValidationRuleFactory.range('totalRevenue', 1000, 1000000000, 'Total revenue must be between $1K and $1B'),

  // Customer validation
  ValidationRuleFactory.positive('totalCustomers', 'Total customers must be positive'),
  ValidationRuleFactory.range('totalCustomers', 1, 10000000, 'Total customers must be between 1 and 10M'),
  ValidationRuleFactory.nonNegative('newCustomersThisMonth', 'New customers cannot be negative'),
  ValidationRuleFactory.nonNegative('churnedCustomersThisMonth', 'Churned customers cannot be negative'),

  // Financial metrics validation
  ValidationRuleFactory.positive('customerAcquisitionCost', 'CAC must be positive'),
  ValidationRuleFactory.range('customerAcquisitionCost', 1, 100000, 'CAC must be between $1 and $100K'),
  ValidationRuleFactory.positive('averageRevenuePerUser', 'ARPU must be positive'),
  ValidationRuleFactory.range('averageRevenuePerUser', 1, 50000, 'ARPU must be between $1 and $50K'),
  ValidationRuleFactory.percentage('grossMargin', 'Gross margin must be a valid percentage'),

  // Business logic validation
  ValidationRuleFactory.businessRule(
    'churnedCustomersThisMonth',
    (churned, allInputs) => {
      if (!allInputs?.totalCustomers) return true;
      return churned <= allInputs?.totalCustomers;
    },
    'Churned customers cannot exceed total customers'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyRecurringRevenue',
    (mrr, allInputs) => {
      if (!allInputs?.totalRevenue) return true;
      return mrr <= allInputs?.totalRevenue;
    },
    'MRR cannot exceed total revenue'
  ),

  ValidationRuleFactory.businessRule(
    'averageRevenuePerUser',
    (arpu, allInputs) => {
      if (!allInputs?.monthlyRecurringRevenue || !allInputs?.totalCustomers) return true;
      const calculatedARPU = allInputs?.monthlyRecurringRevenue / allInputs?.totalCustomers;
      return Math.abs(arpu - calculatedARPU) / calculatedARPU < 0.5; // Allow 50% variance
    },
    'ARPU should be consistent with MRR and customer count'
  ),

  // SaaS-specific business rules
  ValidationRuleFactory.businessRule(
    'grossMargin',
    (grossMargin) => {
      if (grossMargin < 70) return false;
      return true;
    },
    'SaaS gross margins below 70% may indicate pricing or cost structure issues'
  ),

  ValidationRuleFactory.businessRule(
    'customerAcquisitionCost',
    (cac, allInputs) => {
      if (!allInputs?.averageRevenuePerUser) return true;
      const ratio = cac / allInputs?.averageRevenuePerUser;
      return ratio <= 12; // CAC shouldn't exceed 12 months of ARPU
    },
    'CAC seems high relative to ARPU - consider optimizing acquisition efficiency'
  )
];

export function getSaaSMetricsValidationRules(): ValidationRule[] {
  return saasMetricsValidationRules;
}