import { CustomerAcquisitionCostInputs } from './types';

export function validateTotalMarketingSpend(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Total marketing spend must be 0 or greater' };
  }
  return { isValid: true };
}

export function validateNumberOfNewCustomers(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Number of new customers must be 0 or greater' };
  }
  return { isValid: true };
}

export function validateCustomerLifetimeValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Customer lifetime value cannot be negative' };
  }
  return { isValid: true };
}

export function validateConversionRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Conversion rate must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateAverageOrderValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Average order value cannot be negative' };
  }
  return { isValid: true };
}