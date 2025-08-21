import { CalculatorInputs } from '../../../types/calculator';

export interface VALoanValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateVALoanInputs(inputs: CalculatorInputs): VALoanValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Purchase price validation
  if (typeof inputs.purchasePrice !== 'number' || isNaN(inputs.purchasePrice)) {
    errors.push('Purchase price must be a valid number');
  } else if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  } else if (inputs.purchasePrice > 10000000) {
    warnings.push('Purchase price is very high. Verify the value is correct');
  }

  // Down payment validation
  if (typeof inputs.downPayment !== 'number' || isNaN(inputs.downPayment)) {
    errors.push('Down payment must be a valid number');
  } else if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  } else if (inputs.downPayment >= inputs.purchasePrice) {
    errors.push('Down payment must be less than purchase price');
  } else if (inputs.downPayment > 0) {
    warnings.push('VA loans typically allow 0% down payment. Consider if down payment is necessary');
  }

  // Interest rate validation
  if (typeof inputs.interestRate !== 'number' || isNaN(inputs.interestRate)) {
    errors.push('Interest rate must be a valid number');
  } else if (inputs.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  } else if (inputs.interestRate > 15) {
    warnings.push('Interest rate is very high. Verify the value is correct');
  }

  // Loan term validation
  if (typeof inputs.loanTerm !== 'number' || isNaN(inputs.loanTerm)) {
    errors.push('Loan term must be a valid number');
  } else if (inputs.loanTerm < 15) {
    errors.push('Loan term must be at least 15 years');
  } else if (inputs.loanTerm > 30) {
    errors.push('Loan term cannot exceed 30 years');
  }

  // Veteran status validation
  if (typeof inputs.veteranStatus !== 'string' || !inputs.veteranStatus) {
    errors.push('Veteran status must be selected');
  }

  // Service years validation
  if (typeof inputs.serviceYears !== 'number' || isNaN(inputs.serviceYears)) {
    errors.push('Years of service must be a valid number');
  } else if (inputs.serviceYears < 0) {
    errors.push('Years of service cannot be negative');
  } else if (inputs.serviceYears > 50) {
    warnings.push('Years of service is very high. Verify the value is correct');
  }

  // Disability rating validation
  if (typeof inputs.disabilityRating !== 'number' || isNaN(inputs.disabilityRating)) {
    errors.push('Disability rating must be a valid number');
  } else if (inputs.disabilityRating < 0) {
    errors.push('Disability rating cannot be negative');
  } else if (inputs.disabilityRating > 100) {
    errors.push('Disability rating cannot exceed 100%');
  }

  // First time use validation
  if (typeof inputs.firstTimeUse !== 'string' || !inputs.firstTimeUse) {
    errors.push('First time use must be selected');
  }

  // Property type validation
  if (typeof inputs.propertyType !== 'string' || !inputs.propertyType) {
    errors.push('Property type must be selected');
  }

  // Property location validation
  if (typeof inputs.propertyLocation !== 'string' || !inputs.propertyLocation) {
    errors.push('Property location must be selected');
  }

  // Property age validation
  if (typeof inputs.propertyAge !== 'number' || isNaN(inputs.propertyAge)) {
    errors.push('Property age must be a valid number');
  } else if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  } else if (inputs.propertyAge > 100) {
    warnings.push('Property age is very high. Verify the value is correct');
  }

  // Property size validation
  if (typeof inputs.propertySize !== 'number' || isNaN(inputs.propertySize)) {
    errors.push('Property size must be a valid number');
  } else if (inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  } else if (inputs.propertySize > 15000) {
    warnings.push('Property size is very large. Verify the value is correct');
  }

  // Property taxes validation
  if (typeof inputs.propertyTaxes !== 'number' || isNaN(inputs.propertyTaxes)) {
    errors.push('Property taxes must be a valid number');
  } else if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  } else if (inputs.propertyTaxes > 100000) {
    warnings.push('Property taxes are very high. Verify the value is correct');
  }

  // Homeowners insurance validation
  if (typeof inputs.homeownersInsurance !== 'number' || isNaN(inputs.homeownersInsurance)) {
    errors.push('Homeowners insurance must be a valid number');
  } else if (inputs.homeownersInsurance < 0) {
    errors.push('Homeowners insurance cannot be negative');
  } else if (inputs.homeownersInsurance > 20000) {
    warnings.push('Homeowners insurance is very high. Verify the value is correct');
  }

  // Monthly debts validation
  if (typeof inputs.monthlyDebts !== 'number' || isNaN(inputs.monthlyDebts)) {
    errors.push('Monthly debts must be a valid number');
  } else if (inputs.monthlyDebts < 0) {
    errors.push('Monthly debts cannot be negative');
  } else if (inputs.monthlyDebts > 15000) {
    warnings.push('Monthly debts are very high. Verify the value is correct');
  }

  // Credit score validation
  if (typeof inputs.creditScore !== 'number' || isNaN(inputs.creditScore)) {
    errors.push('Credit score must be a valid number');
  } else if (inputs.creditScore < 500) {
    errors.push('Credit score cannot be less than 500');
  } else if (inputs.creditScore > 850) {
    errors.push('Credit score cannot exceed 850');
  } else if (inputs.creditScore < 640) {
    warnings.push('Credit score is below typical VA requirements. Consider improving credit score');
  }

  // Annual income validation
  if (typeof inputs.annualIncome !== 'number' || isNaN(inputs.annualIncome)) {
    errors.push('Annual income must be a valid number');
  } else if (inputs.annualIncome <= 0) {
    errors.push('Annual income must be greater than 0');
  } else if (inputs.annualIncome > 5000000) {
    warnings.push('Annual income is very high. Verify the value is correct');
  }

  // Closing costs validation
  if (typeof inputs.closingCosts !== 'number' || isNaN(inputs.closingCosts)) {
    errors.push('Closing costs must be a valid number');
  } else if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 100000) {
    warnings.push('Closing costs are very high. Verify the value is correct');
  }

  // Prepaid items validation
  if (typeof inputs.prepaidItems !== 'number' || isNaN(inputs.prepaidItems)) {
    errors.push('Prepaid items must be a valid number');
  } else if (inputs.prepaidItems < 0) {
    errors.push('Prepaid items cannot be negative');
  } else if (inputs.prepaidItems > 50000) {
    warnings.push('Prepaid items are very high. Verify the value is correct');
  }

  // Seller credits validation
  if (typeof inputs.sellerCredits !== 'number' || isNaN(inputs.sellerCredits)) {
    errors.push('Seller credits must be a valid number');
  } else if (inputs.sellerCredits < 0) {
    errors.push('Seller credits cannot be negative');
  } else if (inputs.sellerCredits > 200000) {
    warnings.push('Seller credits are very high. Verify the value is correct');
  }

  // Analysis period validation
  if (typeof inputs.analysisPeriod !== 'number' || isNaN(inputs.analysisPeriod)) {
    errors.push('Analysis period must be a valid number');
  } else if (inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  } else if (inputs.analysisPeriod > 30) {
    warnings.push('Analysis period is very long. Consider a shorter period');
  }

  // Logical validation checks
  if (inputs.purchasePrice && inputs.annualIncome) {
    const priceToIncomeRatio = inputs.purchasePrice / inputs.annualIncome;
    if (priceToIncomeRatio > 8) {
      warnings.push('Purchase price to income ratio is very high. This may affect loan approval');
    }
  }

  if (inputs.annualIncome && inputs.monthlyDebts) {
    const debtToIncomeRatio = (inputs.monthlyDebts * 12) / inputs.annualIncome;
    if (debtToIncomeRatio > 0.5) {
      warnings.push('Existing debt to income ratio is very high. This may affect loan approval');
    }
  }

  if (inputs.propertyTaxes && inputs.purchasePrice) {
    const taxRate = inputs.propertyTaxes / inputs.purchasePrice;
    if (taxRate > 0.05) {
      warnings.push('Property tax rate is very high. Verify the values are correct');
    }
  }

  if (inputs.homeownersInsurance && inputs.purchasePrice) {
    const insuranceRate = inputs.homeownersInsurance / inputs.purchasePrice;
    if (insuranceRate > 0.02) {
      warnings.push('Homeowners insurance rate is very high. Verify the values are correct');
    }
  }

  // VA specific validation
  if (inputs.veteranStatus === 'reserves' && inputs.serviceYears < 6) {
    errors.push('Reserves/National Guard members must have at least 6 years of service');
  }

  if (inputs.veteranStatus === 'veteran' && inputs.serviceYears < 2) {
    errors.push('Veterans must have at least 2 years of service');
  }

  if (inputs.veteranStatus === 'surviving-spouse' && inputs.serviceYears < 2) {
    errors.push('Surviving spouses require at least 2 years of service from the veteran');
  }

  if (inputs.propertyType === 'condo') {
    warnings.push('Condominiums must be VA-approved. Verify eligibility');
  }

  if (inputs.propertyType === 'manufactured') {
    warnings.push('Manufactured homes must meet specific VA requirements. Verify eligibility');
  }

  // Service requirements check
  if (inputs.veteranStatus && inputs.serviceYears) {
    const minService = inputs.veteranStatus === 'reserves' ? 6 : 2;
    if (inputs.serviceYears < minService) {
      errors.push(`Minimum service requirement not met for ${inputs.veteranStatus} status`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
