import { ValidationResult } from '../../../types/validation';
import { AIOpsImplementationSavingsCalculatorInputs } from './types';

/**
 * Quick validation functions for AIOps Implementation Savings Calculator
 * All functions include the allInputs parameter to prevent runtime errors
 */

export const validateCurrentIncidentVolume = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Current incident volume cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Current incident volume seems unusually high' };
  }
  return { isValid: true };
};

export const validateCurrentMTTR = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Current MTTR must be greater than 0' };
  }
  if (value > 168) {
    return { isValid: false, error: 'Current MTTR cannot exceed 168 hours (1 week)' };
  }
  return { isValid: true };
};

export const validateCurrentMTBF = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Current MTBF must be greater than 0' };
  }
  if (value > 8760) {
    return { isValid: false, error: 'Current MTBF cannot exceed 8760 hours (1 year)' };
  }
  return { isValid: true };
};

export const validateCurrentManualProcesses = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Current manual processes cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Current manual processes seem unusually high' };
  }
  return { isValid: true };
};

export const validateCurrentOnCallEngineers = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Current on-call engineers must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Current on-call engineers seem unusually high' };
  }
  return { isValid: true };
};

export const validateCurrentEscalationRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Current escalation rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Current escalation rate cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateCurrentFalsePositiveRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Current false positive rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Current false positive rate cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateEngineerHourlyRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Engineer hourly rate must be greater than 0' };
  }
  if (value > 500) {
    return { isValid: false, error: 'Engineer hourly rate seems unusually high' };
  }
  return { isValid: true };
};

export const validateDowntimeCostPerHour = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Downtime cost per hour cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Downtime cost per hour seems unusually high' };
  }
  return { isValid: true };
};

export const validateIncidentManagementCost = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Incident management cost cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Incident management cost seems unusually high' };
  }
  return { isValid: true };
};

export const validateTrainingCostPerEngineer = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Training cost per engineer cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Training cost per engineer seems unusually high' };
  }
  return { isValid: true };
};

export const validateLicenseCostPerUser = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'License cost per user cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'License cost per user seems unusually high' };
  }
  return { isValid: true };
};

export const validateAIOpsImplementationCost = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'AIOps implementation cost cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'AIOps implementation cost seems unusually high' };
  }
  return { isValid: true };
};

export const validateAIOpsLicenseUsers = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'AIOps license users must be greater than 0' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'AIOps license users seem unusually high' };
  }
  return { isValid: true };
};

export const validateAIOpsImplementationTime = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'AIOps implementation time must be greater than 0' };
  }
  if (value > 36) {
    return { isValid: false, error: 'AIOps implementation time cannot exceed 36 months' };
  }
  return { isValid: true };
};

export const validateAIOpsTrainingTime = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'AIOps training time cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'AIOps training time cannot exceed 200 hours' };
  }
  return { isValid: true };
};

export const validateExpectedMTTRReduction = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Expected MTTR reduction cannot be negative' };
  }
  if (value > 90) {
    return { isValid: false, error: 'Expected MTTR reduction cannot exceed 90%' };
  }
  return { isValid: true };
};

export const validateExpectedIncidentReduction = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Expected incident reduction cannot be negative' };
  }
  if (value > 90) {
    return { isValid: false, error: 'Expected incident reduction cannot exceed 90%' };
  }
  return { isValid: true };
};

export const validateExpectedAutomationRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Expected automation rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Expected automation rate cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateExpectedFalsePositiveReduction = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Expected false positive reduction cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Expected false positive reduction cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateExpectedEscalationReduction = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Expected escalation reduction cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Expected escalation reduction cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateAnalysisPeriod = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Analysis period cannot exceed 120 months' };
  }
  return { isValid: true };
};

export const validateDiscountRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Discount rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Discount rate cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateMonteCarloSamples = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 1000) {
    return { isValid: false, error: 'Monte Carlo samples must be at least 1,000' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Monte Carlo samples cannot exceed 100,000' };
  }
  return { isValid: true };
};

export const validateConfidenceLevel = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 80) {
    return { isValid: false, error: 'Confidence level must be at least 80%' };
  }
  if (value > 99.9) {
    return { isValid: false, error: 'Confidence level cannot exceed 99.9%' };
  }
  return { isValid: true };
};
