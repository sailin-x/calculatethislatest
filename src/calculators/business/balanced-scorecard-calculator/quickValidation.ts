import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for Balanced Scorecard Calculator
 */

export function validateFinancialMetrics(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Financial metrics are required' };
  }

  const requiredFields = ['revenueGrowth', 'profitMargin', 'returnOnInvestment', 'returnOnEquity', 'returnOnAssets'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} must be a valid number` };
    }
  }

  if (value.revenueGrowth < -50 || value.revenueGrowth > 200) {
    return { isValid: false, error: 'Revenue growth must be between -50% and 200%' };
  }

  return { isValid: true };
}

export function validateCustomerMetrics(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Customer metrics are required' };
  }

  const requiredFields = ['customerSatisfaction', 'customerRetention', 'netPromoterScore', 'marketShare', 'customerResponseTime'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} must be a valid number` };
    }
  }

  if (value.customerSatisfaction < 0 || value.customerSatisfaction > 100) {
    return { isValid: false, error: 'Customer satisfaction must be between 0 and 100' };
  }

  return { isValid: true };
}

export function validateInternalProcessMetrics(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Internal process metrics are required' };
  }

  const requiredFields = ['processEfficiency', 'cycleTime', 'defectRate', 'onTimeDelivery', 'qualityScore'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} must be a valid number` };
    }
  }

  if (value.processEfficiency < 0 || value.processEfficiency > 100) {
    return { isValid: false, error: 'Process efficiency must be between 0 and 100' };
  }

  return { isValid: true };
}

export function validateLearningGrowthMetrics(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Learning & growth metrics are required' };
  }

  const requiredFields = ['employeeSatisfaction', 'employeeRetention', 'trainingHours', 'skillDevelopment', 'employeeEngagement'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} must be a valid number` };
    }
  }

  if (value.employeeSatisfaction < 0 || value.employeeSatisfaction > 100) {
    return { isValid: false, error: 'Employee satisfaction must be between 0 and 100' };
  }

  return { isValid: true };
}

export function validateKPIs(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'KPIs are required' };
  }

  const requiredPerspectives = ['financial', 'customer', 'internalProcess', 'learningGrowth'];
  for (const perspective of requiredPerspectives) {
    if (!Array.isArray(value[perspective]) || value[perspective].length === 0) {
      return { isValid: false, error: `${perspective} KPIs must be a non-empty array` };
    }
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Analysis period must be a valid number' };
  }

  if (value < 1 || value > 60) {
    return { isValid: false, error: 'Analysis period must be between 1 and 60 months' };
  }

  return { isValid: true };
}

export function validateMonteCarloSamples(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Monte Carlo samples must be a valid number' };
  }

  if (value < 1000 || value > 100000) {
    return { isValid: false, error: 'Monte Carlo samples must be between 1,000 and 100,000' };
  }

  return { isValid: true };
}

export function validateConfidenceLevel(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Confidence level must be a valid number' };
  }

  if (value < 0.8 || value > 0.99) {
    return { isValid: false, error: 'Confidence level must be between 0.8 and 0.99' };
  }

  return { isValid: true };
}
