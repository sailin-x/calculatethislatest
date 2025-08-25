import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for Bill of Materials Calculator
 */

export function validateProductName(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Product name is required' };
  }

  if (value.length > 200) {
    return { isValid: false, error: 'Product name must be less than 200 characters' };
  }

  return { isValid: true };
}

export function validateProductDescription(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Product description is required' };
  }

  if (value.length > 1000) {
    return { isValid: false, error: 'Product description must be less than 1000 characters' };
  }

  return { isValid: true };
}

export function validateTargetQuantity(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Target quantity must be a valid number' };
  }

  if (value <= 0) {
    return { isValid: false, error: 'Target quantity must be greater than 0' };
  }

  if (value > 1000000) {
    return { isValid: false, error: 'Target quantity must be less than 1,000,000' };
  }

  return { isValid: true };
}

export function validateAssemblies(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Assemblies must be an array' };
  }

  if (value.length === 0) {
    return { isValid: false, error: 'At least one assembly is required' };
  }

  for (const assembly of value) {
    if (typeof assembly !== 'object' || assembly === null) {
      return { isValid: false, error: 'Each assembly must be an object' };
    }

    if (typeof assembly.name !== 'string' || assembly.name.trim().length === 0) {
      return { isValid: false, error: 'Assembly name is required' };
    }

    if (typeof assembly.laborHours !== 'number' || assembly.laborHours < 0) {
      return { isValid: false, error: 'Assembly labor hours must be a non-negative number' };
    }

    if (typeof assembly.laborRate !== 'number' || assembly.laborRate < 0) {
      return { isValid: false, error: 'Assembly labor rate must be a non-negative number' };
    }

    if (typeof assembly.overheadRate !== 'number' || assembly.overheadRate < 0) {
      return { isValid: false, error: 'Assembly overhead rate must be a non-negative number' };
    }

    if (typeof assembly.yield !== 'number' || assembly.yield <= 0 || assembly.yield > 100) {
      return { isValid: false, error: 'Assembly yield must be between 0 and 100' };
    }

    if (typeof assembly.scrapRate !== 'number' || assembly.scrapRate < 0 || assembly.scrapRate > 100) {
      return { isValid: false, error: 'Assembly scrap rate must be between 0 and 100' };
    }

    // Validate items in assembly
    if (!Array.isArray(assembly.items)) {
      return { isValid: false, error: 'Assembly items must be an array' };
    }

    for (const item of assembly.items) {
      if (typeof item !== 'object' || item === null) {
        return { isValid: false, error: 'Each item must be an object' };
      }

      if (typeof item.name !== 'string' || item.name.trim().length === 0) {
        return { isValid: false, error: 'Item name is required' };
      }

      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return { isValid: false, error: 'Item quantity must be greater than 0' };
      }

      if (typeof item.unitCost !== 'number' || item.unitCost < 0) {
        return { isValid: false, error: 'Item unit cost must be a non-negative number' };
      }

      if (typeof item.leadTime !== 'number' || item.leadTime < 0) {
        return { isValid: false, error: 'Item lead time must be a non-negative number' };
      }

      if (typeof item.minimumOrderQuantity !== 'number' || item.minimumOrderQuantity <= 0) {
        return { isValid: false, error: 'Item minimum order quantity must be greater than 0' };
      }

      if (typeof item.safetyStock !== 'number' || item.safetyStock < 0) {
        return { isValid: false, error: 'Item safety stock must be a non-negative number' };
      }
    }
  }

  return { isValid: true };
}

export function validateSuppliers(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Suppliers must be an array' };
  }

  if (value.length === 0) {
    return { isValid: false, error: 'At least one supplier is required' };
  }

  for (const supplier of value) {
    if (typeof supplier !== 'object' || supplier === null) {
      return { isValid: false, error: 'Each supplier must be an object' };
    }

    if (typeof supplier.name !== 'string' || supplier.name.trim().length === 0) {
      return { isValid: false, error: 'Supplier name is required' };
    }

    if (typeof supplier.reliability !== 'number' || supplier.reliability < 0 || supplier.reliability > 100) {
      return { isValid: false, error: 'Supplier reliability must be between 0 and 100' };
    }

    if (typeof supplier.qualityRating !== 'number' || supplier.qualityRating < 0 || supplier.qualityRating > 100) {
      return { isValid: false, error: 'Supplier quality rating must be between 0 and 100' };
    }

    if (typeof supplier.leadTimeVariability !== 'number' || supplier.leadTimeVariability < 0) {
      return { isValid: false, error: 'Supplier lead time variability must be a non-negative number' };
    }

    if (typeof supplier.minimumOrderValue !== 'number' || supplier.minimumOrderValue < 0) {
      return { isValid: false, error: 'Supplier minimum order value must be a non-negative number' };
    }

    if (typeof supplier.paymentTerms !== 'number' || supplier.paymentTerms < 0) {
      return { isValid: false, error: 'Supplier payment terms must be a non-negative number' };
    }
  }

  return { isValid: true };
}

export function validateProductionVolume(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Production volume must be a valid number' };
  }

  if (value <= 0) {
    return { isValid: false, error: 'Production volume must be greater than 0' };
  }

  if (value > 1000000) {
    return { isValid: false, error: 'Production volume must be less than 1,000,000' };
  }

  return { isValid: true };
}

export function validateProductionPeriod(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Production period must be a valid number' };
  }

  if (value <= 0) {
    return { isValid: false, error: 'Production period must be greater than 0' };
  }

  if (value > 120) {
    return { isValid: false, error: 'Production period must be less than 120 months' };
  }

  return { isValid: true };
}

export function validateLaborRates(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Labor rates are required' };
  }

  const requiredFields = ['assembly', 'testing', 'packaging', 'quality'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} labor rate must be a valid number` };
    }

    if (value[field] < 0) {
      return { isValid: false, error: `${field} labor rate must be a non-negative number` };
    }

    if (value[field] > 1000) {
      return { isValid: false, error: `${field} labor rate must be less than $1,000 per hour` };
    }
  }

  return { isValid: true };
}

export function validateOverheadRates(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Overhead rates are required' };
  }

  const requiredFields = ['manufacturing', 'quality', 'logistics', 'administration'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} overhead rate must be a valid number` };
    }

    if (value[field] < 0) {
      return { isValid: false, error: `${field} overhead rate must be a non-negative number` };
    }

    if (value[field] > 100) {
      return { isValid: false, error: `${field} overhead rate must be less than 100%` };
    }
  }

  return { isValid: true };
}

export function validateQualityCosts(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Quality costs are required' };
  }

  const requiredFields = ['inspection', 'testing', 'rework', 'scrap'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} quality cost must be a valid number` };
    }

    if (value[field] < 0) {
      return { isValid: false, error: `${field} quality cost must be a non-negative number` };
    }

    if (value[field] > 10000) {
      return { isValid: false, error: `${field} quality cost must be less than $10,000 per unit` };
    }
  }

  return { isValid: true };
}

export function validateLogisticsCosts(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Logistics costs are required' };
  }

  const requiredFields = ['inbound', 'outbound', 'warehousing', 'handling'];
  for (const field of requiredFields) {
    if (typeof value[field] !== 'number' || isNaN(value[field])) {
      return { isValid: false, error: `${field} logistics cost must be a valid number` };
    }

    if (value[field] < 0) {
      return { isValid: false, error: `${field} logistics cost must be a non-negative number` };
    }

    if (value[field] > 5000) {
      return { isValid: false, error: `${field} logistics cost must be less than $5,000 per unit` };
    }
  }

  return { isValid: true };
}

export function validateCurrency(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Currency is required' };
  }

  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'INR'];
  if (!validCurrencies.includes(value.toUpperCase())) {
    return { isValid: false, error: 'Currency must be a valid currency code' };
  }

  return { isValid: true };
}

export function validateTargetMargin(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Target margin must be a valid number' };
  }

  if (value < 0) {
    return { isValid: false, error: 'Target margin must be a non-negative number' };
  }

  if (value > 100) {
    return { isValid: false, error: 'Target margin must be less than 100%' };
  }

  return { isValid: true };
}

export function validateInflationRate(
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Inflation rate must be a valid number' };
  }

  if (value < -50) {
    return { isValid: false, error: 'Inflation rate must be greater than -50%' };
  }

  if (value > 100) {
    return { isValid: false, error: 'Inflation rate must be less than 100%' };
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

  if (value < 1000) {
    return { isValid: false, error: 'Monte Carlo samples must be at least 1,000' };
  }

  if (value > 100000) {
    return { isValid: false, error: 'Monte Carlo samples must be less than 100,000' };
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

  if (value < 0.8) {
    return { isValid: false, error: 'Confidence level must be at least 0.8' };
  }

  if (value > 0.99) {
    return { isValid: false, error: 'Confidence level must be less than 0.99' };
  }

  return { isValid: true };
}
