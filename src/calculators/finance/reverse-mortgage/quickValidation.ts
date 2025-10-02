import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateBorrowerAge(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Borrower age is required';
  if (value < 62) return 'Borrower must be at least 62 years old for a reverse mortgage';
  if (value > 100) return 'Borrower age cannot exceed 100 years';
  return null;
}

export function validateSpouseAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 62) return 'Spouse must be at least 62 years old to be a co-borrower';
  if (value > 100) return 'Spouse age cannot exceed 100 years';
  return null;
}

export function validateMaritalStatus(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Marital status is required';
  const validStatuses = ['single', 'married', 'divorced', 'widowed'];
  if (!validStatuses.includes(value)) {
    return 'Marital status must be one of: single, married, divorced, widowed';
  }
  return null;
}

export function validateOccupancyType(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Occupancy type is required';
  const validOccupancy = ['primary', 'secondary', 'investment'];
  if (!validOccupancy.includes(value)) {
    return 'Occupancy type must be one of: primary, secondary, investment';
  }
  return null;
}

export function validatePropertyValue(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Property value is required';
  if (value < 100000) return 'Property value must be at least $100,000';
  if (value > 10000000) return 'Property value cannot exceed $10,000,000';
  return null;
}

export function validatePropertyType(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Property type is required';
  const validTypes = ['single-family', 'condo', 'townhouse', 'manufactured', 'multi-unit'];
  if (!validTypes.includes(value)) {
    return 'Property type must be one of: single-family, condo, townhouse, manufactured, multi-unit';
  }
  return null;
}

export function validatePropertyAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Property age cannot be negative';
  if (value > 200) return 'Property age cannot exceed 200 years';
  return null;
}

export function validateLocation(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Property location is required';
  const validLocations = ['urban', 'suburban', 'rural'];
  if (!validLocations.includes(value)) {
    return 'Property location must be one of: urban, suburban, rural';
  }
  return null;
}

export function validateExistingMortgage(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Existing mortgage balance cannot be negative';
  if (value > 5000000) return 'Existing mortgage balance cannot exceed $5,000,000';
  return null;
}

export function validateExistingPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Existing monthly payment cannot be negative';
  if (value > 10000) return 'Existing monthly payment cannot exceed $10,000';
  return null;
}

export function validateOtherLiens(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Other liens cannot be negative';
  if (value > 1000000) return 'Other liens cannot exceed $1,000,000';
  return null;
}

export function validateLoanType(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Loan type is required';
  const validLoanTypes = ['hecm', 'proprietary', 'single-purpose'];
  if (!validLoanTypes.includes(value)) {
    return 'Loan type must be one of: hecm, proprietary, single-purpose';
  }
  return null;
}

export function validatePaymentOption(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Payment option is required';
  const validOptions = ['tenure', 'term', 'line-of-credit', 'modified-tenure', 'modified-term'];
  if (!validOptions.includes(value)) {
    return 'Payment option must be one of: tenure, term, line-of-credit, modified-tenure, modified-term';
  }
  return null;
}

export function validateTermYears(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 1) return 'Term length must be at least 1 year';
  if (value > 30) return 'Term length cannot exceed 30 years';
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Interest rate is required';
  if (value < 1) return 'Interest rate must be at least 1%';
  if (value > 15) return 'Interest rate cannot exceed 15%';
  return null;
}

export function validateRateType(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return 'Rate type is required';
  const validRateTypes = ['fixed', 'adjustable'];
  if (!validRateTypes.includes(value)) {
    return 'Rate type must be one of: fixed, adjustable';
  }
  return null;
}

export function validateMonthlyIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Monthly income cannot be negative';
  if (value > 100000) return 'Monthly income cannot exceed $100,000';
  return null;
}

export function validateMonthlyExpenses(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Monthly expenses cannot be negative';
  if (value > 50000) return 'Monthly expenses cannot exceed $50,000';
  return null;
}

export function validateSavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Savings cannot be negative';
  if (value > 10000000) return 'Savings cannot exceed $10,000,000';
  return null;
}

export function validateOtherAssets(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Other assets cannot be negative';
  if (value > 10000000) return 'Other assets cannot exceed $10,000,000';
  return null;
}

export function validateOriginationFee(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Origination fee cannot be negative';
  if (value > 100000) return 'Origination fee cannot exceed $100,000';
  return null;
}

export function validateMortgageInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Mortgage insurance premium cannot be negative';
  if (value > 100000) return 'Mortgage insurance premium cannot exceed $100,000';
  return null;
}

export function validateClosingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Closing costs cannot be negative';
  if (value > 50000) return 'Closing costs cannot exceed $50,000';
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 1) return 'Analysis period must be at least 1 year';
  if (value > 30) return 'Analysis period cannot exceed 30 years';
  return null;
}

export function validatePropertyAppreciation(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < -10) return 'Property appreciation rate cannot be less than -10%';
  if (value > 15) return 'Property appreciation rate cannot exceed 15%';
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value === undefined || value === null) return null;
  if (value < 0) return 'Inflation rate cannot be negative';
  if (value > 10) return 'Inflation rate cannot exceed 10%';
  return null;
}

// Consolidated validation function
export function validateAllReverseMortgageInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  const borrowerAgeError = validateBorrowerAge(inputs.borrowerAge);
  if (borrowerAgeError) errors.push(borrowerAgeError);

  const maritalStatusError = validateMaritalStatus(inputs.maritalStatus);
  if (maritalStatusError) errors.push(maritalStatusError);

  const occupancyTypeError = validateOccupancyType(inputs.occupancyType);
  if (occupancyTypeError) errors.push(occupancyTypeError);

  const propertyValueError = validatePropertyValue(inputs.propertyValue);
  if (propertyValueError) errors.push(propertyValueError);

  const propertyTypeError = validatePropertyType(inputs.propertyType);
  if (propertyTypeError) errors.push(propertyTypeError);

  const locationError = validateLocation(inputs.location);
  if (locationError) errors.push(locationError);

  const loanTypeError = validateLoanType(inputs.loanType);
  if (loanTypeError) errors.push(loanTypeError);

  const paymentOptionError = validatePaymentOption(inputs.paymentOption);
  if (paymentOptionError) errors.push(paymentOptionError);

  const interestRateError = validateInterestRate(inputs.interestRate);
  if (interestRateError) errors.push(interestRateError);

  const rateTypeError = validateRateType(inputs.rateType);
  if (rateTypeError) errors.push(rateTypeError);

  // Optional fields
  const spouseAgeError = validateSpouseAge(inputs.spouseAge);
  if (spouseAgeError) errors.push(spouseAgeError);

  const propertyAgeError = validatePropertyAge(inputs.propertyAge);
  if (propertyAgeError) errors.push(propertyAgeError);

  const existingMortgageError = validateExistingMortgage(inputs.existingMortgage);
  if (existingMortgageError) errors.push(existingMortgageError);

  const existingPaymentError = validateExistingPayment(inputs.existingPayment);
  if (existingPaymentError) errors.push(existingPaymentError);

  const otherLiensError = validateOtherLiens(inputs.otherLiens);
  if (otherLiensError) errors.push(otherLiensError);

  const termYearsError = validateTermYears(inputs.termYears);
  if (termYearsError) errors.push(termYearsError);

  const monthlyIncomeError = validateMonthlyIncome(inputs.monthlyIncome);
  if (monthlyIncomeError) errors.push(monthlyIncomeError);

  const monthlyExpensesError = validateMonthlyExpenses(inputs.monthlyExpenses);
  if (monthlyExpensesError) errors.push(monthlyExpensesError);

  const savingsError = validateSavings(inputs.savings);
  if (savingsError) errors.push(savingsError);

  const otherAssetsError = validateOtherAssets(inputs.otherAssets);
  if (otherAssetsError) errors.push(otherAssetsError);

  const originationFeeError = validateOriginationFee(inputs.originationFee);
  if (originationFeeError) errors.push(originationFeeError);

  const mortgageInsuranceError = validateMortgageInsurance(inputs.mortgageInsurance);
  if (mortgageInsuranceError) errors.push(mortgageInsuranceError);

  const closingCostsError = validateClosingCosts(inputs.closingCosts);
  if (closingCostsError) errors.push(closingCostsError);

  const analysisPeriodError = validateAnalysisPeriod(inputs.analysisPeriod);
  if (analysisPeriodError) errors.push(analysisPeriodError);

  const propertyAppreciationError = validatePropertyAppreciation(inputs.propertyAppreciation);
  if (propertyAppreciationError) errors.push(propertyAppreciationError);

  const inflationRateError = validateInflationRate(inputs.inflationRate);
  if (inflationRateError) errors.push(inflationRateError);

  // Logical validation warnings
  const totalLiens = (inputs.existingMortgage || 0) + (inputs.otherLiens || 0);
  if (totalLiens >= inputs.propertyValue) {
    warnings.push('Total liens exceed or equal property value - no equity available for reverse mortgage');
  }

  if (inputs.borrowerAge && inputs.borrowerAge < 65) {
    warnings.push('Younger borrowers typically receive lower principal limits');
  }

  if (inputs.propertyType === 'manufactured') {
    warnings.push('Manufactured homes may have additional requirements and restrictions');
  }

  if (inputs.propertyType === 'condo') {
    warnings.push('Condominiums must be FHA-approved for HECM loans');
  }

  if (inputs.occupancyType === 'secondary') {
    warnings.push('Secondary homes may have different eligibility requirements');
  }

  if (inputs.occupancyType === 'investment') {
    warnings.push('Investment properties are typically not eligible for reverse mortgages');
  }

  if (inputs.loanType === 'hecm' && inputs.propertyValue > 970800) {
    warnings.push('HECM loans have a maximum claim amount of $970,800 for 2024');
  }

  if (inputs.paymentOption === 'term' && !inputs.termYears) {
    warnings.push('Term length is required for term payment options');
  }

  if (inputs.paymentOption === 'modified-term' && !inputs.termYears) {
    warnings.push('Term length is required for modified term payment options');
  }

  if (inputs.monthlyIncome && inputs.monthlyExpenses) {
    const expenseRatio = inputs.monthlyExpenses / inputs.monthlyIncome;
    if (expenseRatio > 0.8) {
      warnings.push('Monthly expenses are very high relative to income');
    }
  }

  if (inputs.propertyAge && inputs.propertyAge > 50) {
    warnings.push('Very old properties may have maintenance issues that affect eligibility');
  }

  if (inputs.location === 'rural') {
    warnings.push('Rural properties may have limited lender options');
  }

  if (inputs.interestRate && inputs.interestRate > 10) {
    warnings.push('High interest rates will significantly reduce principal limits');
  }

  if (inputs.rateType === 'adjustable') {
    warnings.push('Adjustable rates can change over time, affecting loan costs');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
