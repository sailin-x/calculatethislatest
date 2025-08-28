import { SaaSMetricsInputs } from './types';

export function validateMonthlyRecurringRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly recurring revenue must be non-negative';
  if (value > 1000000000) return 'Monthly recurring revenue seems unusually high';
  return null;
}

export function validateAnnualRecurringRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Annual recurring revenue must be non-negative';
  if (value > 10000000000) return 'Annual recurring revenue seems unusually high';
  return null;
}

export function validateTotalCustomers(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Total customers must be non-negative';
  if (value > 10000000) return 'Total customers seems unusually high';
  return null;
}

export function validateNewCustomers(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'New customers must be non-negative';
  if (allInputs && value > (allInputs.totalCustomers || 0)) {
    return 'New customers cannot exceed total customers';
  }
  return null;
}

export function validateChurnedCustomers(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Churned customers must be non-negative';
  if (allInputs && value > (allInputs.totalCustomers || 0)) {
    return 'Churned customers cannot exceed total customers';
  }
  return null;
}

export function validateCustomerAcquisitionCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Customer acquisition cost must be non-negative';
  if (value > 100000) return 'Customer acquisition cost seems unusually high';
  return null;
}

export function validateCustomerLifetimeValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Customer lifetime value must be non-negative';
  if (value > 1000000) return 'Customer lifetime value seems unusually high';
  return null;
}

export function validateMonthlyChurnRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly churn rate must be non-negative';
  if (value > 1) return 'Monthly churn rate cannot exceed 100%';
  return null;
}

export function validateAnnualChurnRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Annual churn rate must be non-negative';
  if (value > 1) return 'Annual churn rate cannot exceed 100%';
  return null;
}

export function validateGrossRevenueRetention(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Gross revenue retention must be non-negative';
  if (value > 1) return 'Gross revenue retention cannot exceed 100%';
  return null;
}

export function validateNetRevenueRetention(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Net revenue retention must be non-negative';
  if (value > 2) return 'Net revenue retention seems unusually high';
  return null;
}

export function validateAverageRevenuePerUser(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Average revenue per user must be non-negative';
  if (value > 10000) return 'Average revenue per user seems unusually high';
  return null;
}

export function validateAverageRevenuePerAccount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Average revenue per account must be non-negative';
  if (value > 100000) return 'Average revenue per account seems unusually high';
  return null;
}

export function validateTotalRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Total revenue must be non-negative';
  if (value > 10000000000) return 'Total revenue seems unusually high';
  return null;
}

export function validateCostOfRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Cost of revenue must be non-negative';
  if (allInputs && value > (allInputs.totalRevenue || 0)) {
    return 'Cost of revenue cannot exceed total revenue';
  }
  return null;
}

export function validateGrossMargin(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Gross margin must be non-negative';
  if (value > 1) return 'Gross margin cannot exceed 100%';
  return null;
}

export function validateOperatingExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Operating expenses must be non-negative';
  if (value > 1000000000) return 'Operating expenses seems unusually high';
  return null;
}

export function validateNetIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value > 1000000000) return 'Net income seems unusually high';
  if (value < -1000000000) return 'Net income seems unusually low';
  return null;
}

export function validateCashFlow(value: number, allInputs?: Record<string, any>): string | null {
  if (value > 1000000000) return 'Cash flow seems unusually high';
  if (value < -1000000000) return 'Cash flow seems unusually low';
  return null;
}

export function validateBurnRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Burn rate must be non-negative';
  if (value > 10000000) return 'Burn rate seems unusually high';
  return null;
}

export function validateRunway(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Runway must be non-negative';
  if (value > 1000) return 'Runway seems unusually high';
  return null;
}
