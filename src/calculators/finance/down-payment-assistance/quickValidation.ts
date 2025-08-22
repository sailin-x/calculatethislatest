import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateHomePrice(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Home price must be a number' };
  if (num < 50000) return { isValid: false, message: 'Home price must be at least $50,000' };
  if (num > 10000000) return { isValid: false, message: 'Home price cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Down payment percentage must be a number' };
  if (num < 0) return { isValid: false, message: 'Down payment percentage cannot be negative' };
  if (num > 50) return { isValid: false, message: 'Down payment percentage cannot exceed 50%' };
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Annual income must be a number' };
  if (num < 10000) return { isValid: false, message: 'Annual income must be at least $10,000' };
  if (num > 500000) return { isValid: false, message: 'Annual income cannot exceed $500,000' };
  return { isValid: true };
}

export function validateHouseholdSize(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Household size must be a number' };
  if (num < 1) return { isValid: false, message: 'Household size must be at least 1' };
  if (num > 10) return { isValid: false, message: 'Household size cannot exceed 10' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Credit score must be a number' };
  if (num < 300) return { isValid: false, message: 'Credit score must be at least 300' };
  if (num > 850) return { isValid: false, message: 'Credit score cannot exceed 850' };
  return { isValid: true };
}

export function validateExistingDebt(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Existing debt must be a number' };
  if (num < 0) return { isValid: false, message: 'Existing debt cannot be negative' };
  if (num > 10000) return { isValid: false, message: 'Existing debt cannot exceed $10,000' };
  return { isValid: true };
}

export function validateSavingsAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Savings amount must be a number' };
  if (num < 0) return { isValid: false, message: 'Savings amount cannot be negative' };
  if (num > 1000000) return { isValid: false, message: 'Savings amount cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Interest rate must be a number' };
  if (num < 1) return { isValid: false, message: 'Interest rate must be at least 1%' };
  if (num > 20) return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Loan term must be a number' };
  if (num < 10) return { isValid: false, message: 'Loan term must be at least 10 years' };
  if (num > 50) return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY', 'DC', 'PR', 'VI'
  ];
  if (!validStates.includes(value)) return { isValid: false, message: 'Please select a valid state' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['single-family', 'condo', 'townhouse', 'manufactured', 'multi-family'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid property type' };
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['primary', 'secondary', 'investment'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid occupancy type' };
  return { isValid: true };
}

export function validateFirstTimeBuyer(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!['yes', 'no'].includes(value)) return { isValid: false, message: 'Please select yes or no' };
  return { isValid: true };
}

export function validateVeteranStatus(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStatuses = ['veteran', 'active-duty', 'reserves', 'spouse', 'none'];
  if (!validStatuses.includes(value)) return { isValid: false, message: 'Please select a valid veteran status' };
  return { isValid: true };
}

export function validateRuralArea(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!['yes', 'no'].includes(value)) return { isValid: false, message: 'Please select yes or no' };
  return { isValid: true };
}

export function validateTargetArea(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!['yes', 'no'].includes(value)) return { isValid: false, message: 'Please select yes or no' };
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'any'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid loan type' };
  return { isValid: true };
}

// Aggregated validation for all inputs
export function validateAllDownPaymentAssistanceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required fields
  const requiredFields = [
    'homePrice', 'downPaymentPercentage', 'annualIncome', 'householdSize',
    'creditScore', 'location', 'propertyType', 'occupancyType', 'firstTimeBuyer',
    'veteranStatus', 'ruralArea', 'targetArea', 'existingDebt', 'savingsAmount',
    'loanType', 'interestRate', 'loanTerm'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  // Validate individual fields if they exist
  if (inputs.homePrice !== undefined) {
    const result = validateHomePrice(inputs.homePrice);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.downPaymentPercentage !== undefined) {
    const result = validateDownPaymentPercentage(inputs.downPaymentPercentage);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualIncome !== undefined) {
    const result = validateAnnualIncome(inputs.annualIncome);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.householdSize !== undefined) {
    const result = validateHouseholdSize(inputs.householdSize);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.creditScore !== undefined) {
    const result = validateCreditScore(inputs.creditScore);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.existingDebt !== undefined) {
    const result = validateExistingDebt(inputs.existingDebt);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.savingsAmount !== undefined) {
    const result = validateSavingsAmount(inputs.savingsAmount);
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

  if (inputs.location !== undefined) {
    const result = validateLocation(inputs.location);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyType !== undefined) {
    const result = validatePropertyType(inputs.propertyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.occupancyType !== undefined) {
    const result = validateOccupancyType(inputs.occupancyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.firstTimeBuyer !== undefined) {
    const result = validateFirstTimeBuyer(inputs.firstTimeBuyer);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.veteranStatus !== undefined) {
    const result = validateVeteranStatus(inputs.veteranStatus);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.ruralArea !== undefined) {
    const result = validateRuralArea(inputs.ruralArea);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.targetArea !== undefined) {
    const result = validateTargetArea(inputs.targetArea);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanType !== undefined) {
    const result = validateLoanType(inputs.loanType);
    if (!result.isValid) errors.push(result.message!);
  }

  // Cross-field validation
  if (inputs.homePrice && inputs.downPaymentPercentage && inputs.savingsAmount) {
    const downPaymentRequired = Number(inputs.homePrice) * (Number(inputs.downPaymentPercentage) / 100);
    if (Number(inputs.savingsAmount) > downPaymentRequired * 2) {
      errors.push('Available savings significantly exceeds required down payment');
    }
  }

  if (inputs.annualIncome && inputs.existingDebt) {
    const monthlyIncome = Number(inputs.annualIncome) / 12;
    if (Number(inputs.existingDebt) > monthlyIncome * 0.8) {
      errors.push('Existing debt is very high relative to income');
    }
  }

  if (inputs.creditScore && inputs.loanType) {
    if (Number(inputs.creditScore) < 580 && inputs.loanType === 'fha') {
      errors.push('FHA loans typically require a minimum credit score of 580');
    }
    if (Number(inputs.creditScore) < 620 && inputs.loanType === 'conventional') {
      errors.push('Conventional loans typically require a minimum credit score of 620');
    }
  }

  if (inputs.veteranStatus && inputs.loanType) {
    if (inputs.veteranStatus !== 'none' && inputs.loanType !== 'va' && inputs.loanType !== 'any') {
      errors.push('Consider VA loan option for veterans');
    }
    if (inputs.veteranStatus === 'none' && inputs.loanType === 'va') {
      errors.push('VA loans are only available to eligible veterans');
    }
  }

  if (inputs.ruralArea && inputs.loanType) {
    if (inputs.ruralArea === 'yes' && inputs.loanType !== 'usda' && inputs.loanType !== 'any') {
      errors.push('Consider USDA loan option for rural properties');
    }
    if (inputs.ruralArea === 'no' && inputs.loanType === 'usda') {
      errors.push('USDA loans are only available for rural properties');
    }
  }

  if (inputs.occupancyType && inputs.loanType) {
    if (inputs.occupancyType === 'investment' && (inputs.loanType === 'fha' || inputs.loanType === 'va' || inputs.loanType === 'usda')) {
      errors.push('FHA, VA, and USDA loans are typically not available for investment properties');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
