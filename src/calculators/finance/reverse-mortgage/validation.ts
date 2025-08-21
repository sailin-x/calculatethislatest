import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateReverseMortgageInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.borrowerAge) {
    errors.push('Borrower age is required');
  } else {
    if (inputs.borrowerAge < 62) {
      errors.push('Borrower must be at least 62 years old for a reverse mortgage');
    }
    if (inputs.borrowerAge > 100) {
      errors.push('Borrower age cannot exceed 100 years');
    }
  }

  if (!inputs.maritalStatus) {
    errors.push('Marital status is required');
  } else {
    const validStatuses = ['single', 'married', 'divorced', 'widowed'];
    if (!validStatuses.includes(inputs.maritalStatus)) {
      errors.push('Marital status must be one of: single, married, divorced, widowed');
    }
  }

  if (!inputs.occupancyType) {
    errors.push('Occupancy type is required');
  } else {
    const validOccupancy = ['primary', 'secondary', 'investment'];
    if (!validOccupancy.includes(inputs.occupancyType)) {
      errors.push('Occupancy type must be one of: primary, secondary, investment');
    }
  }

  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  } else {
    if (inputs.propertyValue < 100000) {
      errors.push('Property value must be at least $100,000');
    }
    if (inputs.propertyValue > 10000000) {
      errors.push('Property value cannot exceed $10,000,000');
    }
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  } else {
    const validTypes = ['single-family', 'condo', 'townhouse', 'manufactured', 'multi-unit'];
    if (!validTypes.includes(inputs.propertyType)) {
      errors.push('Property type must be one of: single-family, condo, townhouse, manufactured, multi-unit');
    }
  }

  if (!inputs.location) {
    errors.push('Property location is required');
  } else {
    const validLocations = ['urban', 'suburban', 'rural'];
    if (!validLocations.includes(inputs.location)) {
      errors.push('Property location must be one of: urban, suburban, rural');
    }
  }

  if (!inputs.loanType) {
    errors.push('Loan type is required');
  } else {
    const validLoanTypes = ['hecm', 'proprietary', 'single-purpose'];
    if (!validLoanTypes.includes(inputs.loanType)) {
      errors.push('Loan type must be one of: hecm, proprietary, single-purpose');
    }
  }

  if (!inputs.paymentOption) {
    errors.push('Payment option is required');
  } else {
    const validOptions = ['tenure', 'term', 'line-of-credit', 'modified-tenure', 'modified-term'];
    if (!validOptions.includes(inputs.paymentOption)) {
      errors.push('Payment option must be one of: tenure, term, line-of-credit, modified-tenure, modified-term');
    }
  }

  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  } else {
    if (inputs.interestRate < 1) {
      errors.push('Interest rate must be at least 1%');
    }
    if (inputs.interestRate > 15) {
      errors.push('Interest rate cannot exceed 15%');
    }
  }

  if (!inputs.rateType) {
    errors.push('Rate type is required');
  } else {
    const validRateTypes = ['fixed', 'adjustable'];
    if (!validRateTypes.includes(inputs.rateType)) {
      errors.push('Rate type must be one of: fixed, adjustable');
    }
  }

  // Optional field validations
  if (inputs.spouseAge !== undefined && inputs.spouseAge !== null) {
    if (inputs.spouseAge < 62) {
      errors.push('Spouse must be at least 62 years old to be a co-borrower');
    }
    if (inputs.spouseAge > 100) {
      errors.push('Spouse age cannot exceed 100 years');
    }
  }

  if (inputs.propertyAge !== undefined && inputs.propertyAge !== null) {
    if (inputs.propertyAge < 0) {
      errors.push('Property age cannot be negative');
    }
    if (inputs.propertyAge > 200) {
      errors.push('Property age cannot exceed 200 years');
    }
  }

  if (inputs.existingMortgage !== undefined && inputs.existingMortgage !== null) {
    if (inputs.existingMortgage < 0) {
      errors.push('Existing mortgage balance cannot be negative');
    }
    if (inputs.existingMortgage > 5000000) {
      errors.push('Existing mortgage balance cannot exceed $5,000,000');
    }
  }

  if (inputs.existingPayment !== undefined && inputs.existingPayment !== null) {
    if (inputs.existingPayment < 0) {
      errors.push('Existing monthly payment cannot be negative');
    }
    if (inputs.existingPayment > 10000) {
      errors.push('Existing monthly payment cannot exceed $10,000');
    }
  }

  if (inputs.otherLiens !== undefined && inputs.otherLiens !== null) {
    if (inputs.otherLiens < 0) {
      errors.push('Other liens cannot be negative');
    }
    if (inputs.otherLiens > 1000000) {
      errors.push('Other liens cannot exceed $1,000,000');
    }
  }

  if (inputs.termYears !== undefined && inputs.termYears !== null) {
    if (inputs.termYears < 1) {
      errors.push('Term length must be at least 1 year');
    }
    if (inputs.termYears > 30) {
      errors.push('Term length cannot exceed 30 years');
    }
  }

  if (inputs.monthlyIncome !== undefined && inputs.monthlyIncome !== null) {
    if (inputs.monthlyIncome < 0) {
      errors.push('Monthly income cannot be negative');
    }
    if (inputs.monthlyIncome > 100000) {
      errors.push('Monthly income cannot exceed $100,000');
    }
  }

  if (inputs.monthlyExpenses !== undefined && inputs.monthlyExpenses !== null) {
    if (inputs.monthlyExpenses < 0) {
      errors.push('Monthly expenses cannot be negative');
    }
    if (inputs.monthlyExpenses > 50000) {
      errors.push('Monthly expenses cannot exceed $50,000');
    }
  }

  if (inputs.savings !== undefined && inputs.savings !== null) {
    if (inputs.savings < 0) {
      errors.push('Savings cannot be negative');
    }
    if (inputs.savings > 10000000) {
      errors.push('Savings cannot exceed $10,000,000');
    }
  }

  if (inputs.otherAssets !== undefined && inputs.otherAssets !== null) {
    if (inputs.otherAssets < 0) {
      errors.push('Other assets cannot be negative');
    }
    if (inputs.otherAssets > 10000000) {
      errors.push('Other assets cannot exceed $10,000,000');
    }
  }

  if (inputs.originationFee !== undefined && inputs.originationFee !== null) {
    if (inputs.originationFee < 0) {
      errors.push('Origination fee cannot be negative');
    }
    if (inputs.originationFee > 100000) {
      errors.push('Origination fee cannot exceed $100,000');
    }
  }

  if (inputs.mortgageInsurance !== undefined && inputs.mortgageInsurance !== null) {
    if (inputs.mortgageInsurance < 0) {
      errors.push('Mortgage insurance premium cannot be negative');
    }
    if (inputs.mortgageInsurance > 100000) {
      errors.push('Mortgage insurance premium cannot exceed $100,000');
    }
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts !== null) {
    if (inputs.closingCosts < 0) {
      errors.push('Closing costs cannot be negative');
    }
    if (inputs.closingCosts > 50000) {
      errors.push('Closing costs cannot exceed $50,000');
    }
  }

  if (inputs.analysisPeriod !== undefined && inputs.analysisPeriod !== null) {
    if (inputs.analysisPeriod < 1) {
      errors.push('Analysis period must be at least 1 year');
    }
    if (inputs.analysisPeriod > 30) {
      errors.push('Analysis period cannot exceed 30 years');
    }
  }

  if (inputs.propertyAppreciation !== undefined && inputs.propertyAppreciation !== null) {
    if (inputs.propertyAppreciation < -10) {
      errors.push('Property appreciation rate cannot be less than -10%');
    }
    if (inputs.propertyAppreciation > 15) {
      errors.push('Property appreciation rate cannot exceed 15%');
    }
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate !== null) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    }
    if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

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
