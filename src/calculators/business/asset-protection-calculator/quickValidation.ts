import { ValidationResult } from '../../../types/validation';
import { AssetProtectionCalculatorInputs } from './types';

/**
 * Quick validation functions for Asset Protection Calculator
 * All functions include the allInputs parameter to prevent runtime errors
 */

export const validatePersonalAssets = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Personal assets must be an object' };
  }
  
  const requiredFields = ['cash', 'investments', 'realEstate', 'vehicles', 'businessInterests', 'retirementAccounts', 'lifeInsurance', 'otherAssets'];
  
  for (const field of requiredFields) {
    if (value[field] === undefined || value[field] === null) {
      return { isValid: false, error: `Personal assets must include ${field}` };
    }
    if (typeof value[field] !== 'number' || value[field] < 0) {
      return { isValid: false, error: `${field} must be a non-negative number` };
    }
    if (value[field] > 1000000000) {
      return { isValid: false, error: `${field} seems unusually high` };
    }
  }
  
  return { isValid: true };
};

export const validateBusinessAssets = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Business assets must be an object' };
  }
  
  const requiredFields = ['businessValue', 'accountsReceivable', 'inventory', 'equipment', 'intellectualProperty', 'goodwill', 'otherBusinessAssets'];
  
  for (const field of requiredFields) {
    if (value[field] === undefined || value[field] === null) {
      return { isValid: false, error: `Business assets must include ${field}` };
    }
    if (typeof value[field] !== 'number' || value[field] < 0) {
      return { isValid: false, error: `${field} must be a non-negative number` };
    }
    if (value[field] > 1000000000) {
      return { isValid: false, error: `${field} seems unusually high` };
    }
  }
  
  return { isValid: true };
};

export const validateRiskFactors = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Risk factors must be an object' };
  }
  
  if (!['low-risk', 'medium-risk', 'high-risk'].includes(value.profession)) {
    return { isValid: false, error: 'Profession must be low-risk, medium-risk, or high-risk' };
  }
  
  if (!['low-risk', 'medium-risk', 'high-risk'].includes(value.businessType)) {
    return { isValid: false, error: 'Business type must be low-risk, medium-risk, or high-risk' };
  }
  
  if (typeof value.personalLiability !== 'number' || value.personalLiability < 0) {
    return { isValid: false, error: 'Personal liability must be a non-negative number' };
  }
  
  if (typeof value.businessLiability !== 'number' || value.businessLiability < 0) {
    return { isValid: false, error: 'Business liability must be a non-negative number' };
  }
  
  if (typeof value.lawsuitProbability !== 'number' || value.lawsuitProbability < 0 || value.lawsuitProbability > 100) {
    return { isValid: false, error: 'Lawsuit probability must be between 0 and 100' };
  }
  
  if (typeof value.bankruptcyRisk !== 'number' || value.bankruptcyRisk < 0 || value.bankruptcyRisk > 100) {
    return { isValid: false, error: 'Bankruptcy risk must be between 0 and 100' };
  }
  
  if (typeof value.divorceRisk !== 'number' || value.divorceRisk < 0 || value.divorceRisk > 100) {
    return { isValid: false, error: 'Divorce risk must be between 0 and 100' };
  }
  
  if (typeof value.estateTaxExposure !== 'number' || value.estateTaxExposure < 0) {
    return { isValid: false, error: 'Estate tax exposure must be a non-negative number' };
  }
  
  return { isValid: true };
};

export const validateCurrentProtection = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Current protection must be an object' };
  }
  
  const requiredFields = ['personalInsurance', 'businessInsurance', 'umbrellaPolicy', 'trusts', 'llcProtection', 'otherProtection'];
  
  for (const field of requiredFields) {
    if (value[field] === undefined || value[field] === null) {
      return { isValid: false, error: `Current protection must include ${field}` };
    }
    if (typeof value[field] !== 'number' || value[field] < 0) {
      return { isValid: false, error: `${field} must be a non-negative number` };
    }
    if (value[field] > 1000000000) {
      return { isValid: false, error: `${field} seems unusually high` };
    }
  }
  
  return { isValid: true };
};

export const validateProtectionOptions = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Protection options must be an object' };
  }
  
  const booleanFields = ['includeTrusts', 'includeLLC', 'includeInsurance', 'includeOffshore', 'includeRetirementProtection', 'includeHomesteadExemption'];
  
  for (const field of booleanFields) {
    if (typeof value[field] !== 'boolean') {
      return { isValid: false, error: `${field} must be a boolean` };
    }
  }
  
  return { isValid: true };
};

export const validateTrustConfiguration = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Trust configuration must be an object' };
  }
  
  const booleanFields = ['revocableTrust', 'irrevocableTrust', 'assetProtectionTrust', 'domesticTrust', 'offshoreTrust'];
  
  for (const field of booleanFields) {
    if (typeof value[field] !== 'boolean') {
      return { isValid: false, error: `${field} must be a boolean` };
    }
  }
  
  if (typeof value.trustSetupCost !== 'number' || value.trustSetupCost < 0) {
    return { isValid: false, error: 'Trust setup cost must be a non-negative number' };
  }
  
  if (typeof value.trustAnnualCost !== 'number' || value.trustAnnualCost < 0) {
    return { isValid: false, error: 'Trust annual cost must be a non-negative number' };
  }
  
  return { isValid: true };
};

export const validateLLCConfiguration = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'LLC configuration must be an object' };
  }
  
  const booleanFields = ['singleMemberLLC', 'multiMemberLLC', 'seriesLLC'];
  
  for (const field of booleanFields) {
    if (typeof value[field] !== 'boolean') {
      return { isValid: false, error: `${field} must be a boolean` };
    }
  }
  
  if (typeof value.llcSetupCost !== 'number' || value.llcSetupCost < 0) {
    return { isValid: false, error: 'LLC setup cost must be a non-negative number' };
  }
  
  if (typeof value.llcAnnualCost !== 'number' || value.llcAnnualCost < 0) {
    return { isValid: false, error: 'LLC annual cost must be a non-negative number' };
  }
  
  if (!['domestic', 'delaware', 'nevada', 'wyoming', 'offshore'].includes(value.llcJurisdiction)) {
    return { isValid: false, error: 'LLC jurisdiction must be domestic, delaware, nevada, wyoming, or offshore' };
  }
  
  return { isValid: true };
};

export const validateInsuranceConfiguration = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Insurance configuration must be an object' };
  }
  
  const numberFields = ['personalLiabilityInsurance', 'businessLiabilityInsurance', 'umbrellaPolicyAmount', 'professionalLiabilityInsurance', 'directorsAndOfficersInsurance', 'cyberLiabilityInsurance'];
  
  for (const field of numberFields) {
    if (typeof value[field] !== 'number' || value[field] < 0) {
      return { isValid: false, error: `${field} must be a non-negative number` };
    }
    if (value[field] > 100000000) {
      return { isValid: false, error: `${field} seems unusually high` };
    }
  }
  
  return { isValid: true };
};

export const validateAnalysisPeriod = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
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
