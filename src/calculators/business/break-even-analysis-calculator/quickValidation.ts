import { ValidationResult } from '../../../types/validation';
import { BreakEvenAnalysisCalculatorInputs } from './types';

/**
 * Quick validation functions for break-even analysis calculator
 * All functions include the allInputs parameter to prevent runtime errors
 */

export const validateSellingPrice = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Selling price must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Selling price seems unusually high' };
  }
  return { isValid: true };
};

export const validateExpectedSalesVolume = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Expected sales volume must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Expected sales volume seems unusually high' };
  }
  return { isValid: true };
};

export const validateSalesGrowthRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < -50) {
    return { isValid: false, error: 'Sales growth rate cannot be less than -50%' };
  }
  if (value > 500) {
    return { isValid: false, error: 'Sales growth rate cannot exceed 500%' };
  }
  return { isValid: true };
};

export const validateFixedCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Fixed costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Fixed costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateVariableCostsPerUnit = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Variable costs per unit cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Variable costs per unit seem unusually high' };
  }
  
  // Check if variable costs exceed selling price
  if (allInputs?.sellingPrice && value >= allInputs.sellingPrice) {
    return { isValid: false, error: 'Variable costs per unit cannot exceed or equal selling price' };
  }
  
  return { isValid: true };
};

export const validateTotalVariableCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Total variable costs cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Total variable costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateDirectLaborCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Direct labor costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Direct labor costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateDirectMaterialCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Direct material costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Direct material costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateOverheadCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Overhead costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Overhead costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateMarketingCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Marketing costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Marketing costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateAdministrativeCosts = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Administrative costs cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Administrative costs seem unusually high' };
  }
  return { isValid: true };
};

export const validateProductionCapacity = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Production capacity must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Production capacity seems unusually high' };
  }
  return { isValid: true };
};

export const validateCapacityUtilization = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Capacity utilization cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Capacity utilization cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateUnitsProduced = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Units produced cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Units produced seems unusually high' };
  }
  
  // Check if units produced exceed production capacity
  if (allInputs?.productionCapacity && value > allInputs.productionCapacity) {
    return { isValid: false, error: 'Units produced cannot exceed production capacity' };
  }
  
  return { isValid: true };
};

export const validateMarketSize = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Market size must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Market size seems unusually high' };
  }
  return { isValid: true };
};

export const validateMarketShare = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Market share cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market share cannot exceed 100%' };
  }
  return { isValid: true };
};

export const validateCompetitorPricing = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Competitor pricing must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Competitor pricing seems unusually high' };
  }
  return { isValid: true };
};

export const validatePriceElasticity = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < -10) {
    return { isValid: false, error: 'Price elasticity cannot be less than -10' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Price elasticity cannot exceed 10' };
  }
  return { isValid: true };
};

export const validateTargetProfit = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Target profit cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Target profit seems unusually high' };
  }
  return { isValid: true };
};

export const validateTaxRate = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Tax rate cannot exceed 100%' };
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

export const validateAnalysisPeriod = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Analysis period cannot exceed 120 months' };
  }
  return { isValid: true };
};

export const validateSeasonalityFactor = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < -50) {
    return { isValid: false, error: 'Seasonality factor cannot be less than -50%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Seasonality factor cannot exceed 50%' };
  }
  return { isValid: true };
};

export const validatePriceSensitivityRange = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Price sensitivity range cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Price sensitivity range cannot exceed 50%' };
  }
  return { isValid: true };
};

export const validateCostSensitivityRange = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Cost sensitivity range cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Cost sensitivity range cannot exceed 50%' };
  }
  return { isValid: true };
};

export const validateVolumeSensitivityRange = (value: number, allInputs?: Record<string, any>): ValidationResult => {
  if (value < 0) {
    return { isValid: false, error: 'Volume sensitivity range cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Volume sensitivity range cannot exceed 50%' };
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

export const validateOptimisticScenario = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Optimistic scenario must be an object' };
  }
  
  if (value.salesVolume !== undefined && value.salesVolume < 0) {
    return { isValid: false, error: 'Optimistic scenario sales volume cannot be negative' };
  }
  
  if (value.sellingPrice !== undefined && value.sellingPrice <= 0) {
    return { isValid: false, error: 'Optimistic scenario selling price must be greater than 0' };
  }
  
  if (value.variableCosts !== undefined && value.variableCosts < 0) {
    return { isValid: false, error: 'Optimistic scenario variable costs cannot be negative' };
  }
  
  return { isValid: true };
};

export const validatePessimisticScenario = (value: any, allInputs?: Record<string, any>): ValidationResult => {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Pessimistic scenario must be an object' };
  }
  
  if (value.salesVolume !== undefined && value.salesVolume < 0) {
    return { isValid: false, error: 'Pessimistic scenario sales volume cannot be negative' };
  }
  
  if (value.sellingPrice !== undefined && value.sellingPrice <= 0) {
    return { isValid: false, error: 'Pessimistic scenario selling price must be greater than 0' };
  }
  
  if (value.variableCosts !== undefined && value.variableCosts < 0) {
    return { isValid: false, error: 'Pessimistic scenario variable costs cannot be negative' };
  }
  
  return { isValid: true };
};
