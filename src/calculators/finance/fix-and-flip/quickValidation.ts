import { CalculatorInputs } from '../../../types/calculator';

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Purchase price must be a number' };
  }
  if (numValue < 10000) {
    return { isValid: false, message: 'Purchase price must be at least $10,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'Purchase price cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Down payment must be a number' };
  }
  if (numValue < 1000) {
    return { isValid: false, message: 'Down payment must be at least $1,000' };
  }
  if (numValue > 5000000) {
    return { isValid: false, message: 'Down payment cannot exceed $5,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  if (numValue > 25) {
    return { isValid: false, message: 'Interest rate cannot exceed 25%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a number' };
  }
  if (numValue < 3) {
    return { isValid: false, message: 'Loan term must be at least 3 months' };
  }
  if (numValue > 36) {
    return { isValid: false, message: 'Loan term cannot exceed 36 months' };
  }
  return { isValid: true };
}

export function validateRenovationBudget(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Renovation budget must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Renovation budget cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, message: 'Renovation budget cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateRenovationTime(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Renovation time must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Renovation time must be at least 1 month' };
  }
  if (numValue > 24) {
    return { isValid: false, message: 'Renovation time cannot exceed 24 months' };
  }
  return { isValid: true };
}

export function validateAfterRepairValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'After repair value must be a number' };
  }
  if (numValue < 10000) {
    return { isValid: false, message: 'After repair value must be at least $10,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'After repair value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateSellingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Selling costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Selling costs cannot be negative' };
  }
  if (numValue > 500000) {
    return { isValid: false, message: 'Selling costs cannot exceed $500,000' };
  }
  return { isValid: true };
}

export function validateHoldingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Monthly holding costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Monthly holding costs cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Monthly holding costs cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['single-family', 'duplex', 'townhouse', 'condo', 'multi-family', 'commercial'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  return { isValid: true };
}

export function validatePropertyCondition(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs-major-repairs'];
  if (!validConditions.includes(value)) {
    return { isValid: false, message: 'Please select a valid property condition' };
  }
  return { isValid: true };
}

export function validateMarketType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['hot', 'stable', 'slow', 'declining'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid market type' };
  }
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Location is required' };
  }
  return { isValid: true };
}

export function validateAllFixAndFlipInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  const requiredFields = [
    'purchasePrice', 'downPayment', 'interestRate', 'loanTerm', 'renovationBudget',
    'renovationTime', 'afterRepairValue', 'sellingCosts', 'holdingCosts',
    'propertyType', 'propertyCondition', 'marketType', 'location'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  });

  // Individual field validation
  if (inputs.purchasePrice !== undefined) {
    const result = validatePurchasePrice(inputs.purchasePrice);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.downPayment !== undefined) {
    const result = validateDownPayment(inputs.downPayment);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.interestRate !== undefined) {
    const result = validateInterestRate(inputs.interestRate);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanTerm !== undefined) {
    const result = validateLoanTerm(inputs.loanTerm);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.renovationBudget !== undefined) {
    const result = validateRenovationBudget(inputs.renovationBudget);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.renovationTime !== undefined) {
    const result = validateRenovationTime(inputs.renovationTime);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.afterRepairValue !== undefined) {
    const result = validateAfterRepairValue(inputs.afterRepairValue);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.sellingCosts !== undefined) {
    const result = validateSellingCosts(inputs.sellingCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.holdingCosts !== undefined) {
    const result = validateHoldingCosts(inputs.holdingCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyType !== undefined) {
    const result = validatePropertyType(inputs.propertyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyCondition !== undefined) {
    const result = validatePropertyCondition(inputs.propertyCondition);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.marketType !== undefined) {
    const result = validateMarketType(inputs.marketType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.location !== undefined) {
    const result = validateLocation(inputs.location);
    if (!result.isValid) errors.push(result.message!);
  }

  // Cross-field validation
  if (inputs.purchasePrice && inputs.downPayment) {
    const purchasePrice = Number(inputs.purchasePrice);
    const downPayment = Number(inputs.downPayment);
    if (downPayment > purchasePrice) {
      errors.push('Down payment cannot exceed purchase price');
    } else {
      const downPaymentPercentage = (downPayment / purchasePrice) * 100;
      if (downPaymentPercentage < 10) {
        errors.push('Down payment should be at least 10% of purchase price');
      }
    }
  }

  if (inputs.purchasePrice && inputs.afterRepairValue) {
    const purchasePrice = Number(inputs.purchasePrice);
    const afterRepairValue = Number(inputs.afterRepairValue);
    if (afterRepairValue <= purchasePrice) {
      errors.push('After repair value should be higher than purchase price');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
