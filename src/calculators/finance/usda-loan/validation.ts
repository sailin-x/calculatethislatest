import { CalculatorInputs } from '../../../types/calculator';

export interface USDALoanValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateUSDALoanInputs(inputs: CalculatorInputs): USDALoanValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Purchase price validation
  if (typeof inputs.purchasePrice !== 'number' || isNaN(inputs.purchasePrice)) {
    errors.push('Purchase price must be a valid number');
  } else if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  } else if (inputs.purchasePrice > 5000000) {
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
    warnings.push('USDA loans typically allow 0% down payment. Consider if down payment is necessary');
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

  // Annual income validation
  if (typeof inputs.annualIncome !== 'number' || isNaN(inputs.annualIncome)) {
    errors.push('Annual income must be a valid number');
  } else if (inputs.annualIncome <= 0) {
    errors.push('Annual income must be greater than 0');
  } else if (inputs.annualIncome > 2000000) {
    warnings.push('Annual income is very high. Verify the value is correct');
  }

  // Household size validation
  if (typeof inputs.householdSize !== 'number' || isNaN(inputs.householdSize)) {
    errors.push('Household size must be a valid number');
  } else if (inputs.householdSize <= 0) {
    errors.push('Household size must be greater than 0');
  } else if (inputs.householdSize > 20) {
    warnings.push('Household size is very large. Verify the value is correct');
  }

  // Property location validation
  if (typeof inputs.propertyLocation !== 'string' || !inputs.propertyLocation) {
    errors.push('Property location must be selected');
  }

  // Property type validation
  if (typeof inputs.propertyType !== 'string' || !inputs.propertyType) {
    errors.push('Property type must be selected');
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
  } else if (inputs.propertySize > 10000) {
    warnings.push('Property size is very large. Verify the value is correct');
  }

  // Property taxes validation
  if (typeof inputs.propertyTaxes !== 'number' || isNaN(inputs.propertyTaxes)) {
    errors.push('Property taxes must be a valid number');
  } else if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  } else if (inputs.propertyTaxes > 50000) {
    warnings.push('Property taxes are very high. Verify the value is correct');
  }

  // Homeowners insurance validation
  if (typeof inputs.homeownersInsurance !== 'number' || isNaN(inputs.homeownersInsurance)) {
    errors.push('Homeowners insurance must be a valid number');
  } else if (inputs.homeownersInsurance < 0) {
    errors.push('Homeowners insurance cannot be negative');
  } else if (inputs.homeownersInsurance > 10000) {
    warnings.push('Homeowners insurance is very high. Verify the value is correct');
  }

  // Monthly debts validation
  if (typeof inputs.monthlyDebts !== 'number' || isNaN(inputs.monthlyDebts)) {
    errors.push('Monthly debts must be a valid number');
  } else if (inputs.monthlyDebts < 0) {
    errors.push('Monthly debts cannot be negative');
  } else if (inputs.monthlyDebts > 10000) {
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
    warnings.push('Credit score is below typical USDA requirements. Consider improving credit score');
  }

  // Guarantee fee validation
  if (typeof inputs.guaranteeFee !== 'number' || isNaN(inputs.guaranteeFee)) {
    errors.push('Guarantee fee must be a valid number');
  } else if (inputs.guaranteeFee < 0.5) {
    errors.push('Guarantee fee cannot be less than 0.5%');
  } else if (inputs.guaranteeFee > 3.5) {
    errors.push('Guarantee fee cannot exceed 3.5%');
  }

  // Annual fee validation
  if (typeof inputs.annualFee !== 'number' || isNaN(inputs.annualFee)) {
    errors.push('Annual fee must be a valid number');
  } else if (inputs.annualFee < 0.1) {
    errors.push('Annual fee cannot be less than 0.1%');
  } else if (inputs.annualFee > 1.0) {
    errors.push('Annual fee cannot exceed 1.0%');
  }

  // Closing costs validation
  if (typeof inputs.closingCosts !== 'number' || isNaN(inputs.closingCosts)) {
    errors.push('Closing costs must be a valid number');
  } else if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 50000) {
    warnings.push('Closing costs are very high. Verify the value is correct');
  }

  // Prepaid items validation
  if (typeof inputs.prepaidItems !== 'number' || isNaN(inputs.prepaidItems)) {
    errors.push('Prepaid items must be a valid number');
  } else if (inputs.prepaidItems < 0) {
    errors.push('Prepaid items cannot be negative');
  } else if (inputs.prepaidItems > 20000) {
    warnings.push('Prepaid items are very high. Verify the value is correct');
  }

  // Seller credits validation
  if (typeof inputs.sellerCredits !== 'number' || isNaN(inputs.sellerCredits)) {
    errors.push('Seller credits must be a valid number');
  } else if (inputs.sellerCredits < 0) {
    errors.push('Seller credits cannot be negative');
  } else if (inputs.sellerCredits > 100000) {
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

  // USDA specific validation
  if (inputs.propertyLocation === 'urban') {
    warnings.push('Urban properties typically have limited USDA eligibility. Verify property location');
  }

  if (inputs.propertyType === 'condo') {
    warnings.push('Condominiums may have limited USDA eligibility. Verify with USDA');
  }

  if (inputs.propertyType === 'manufactured') {
    warnings.push('Manufactured homes must meet specific USDA requirements. Verify eligibility');
  }

  // Income limit check
  if (inputs.annualIncome && inputs.householdSize) {
    const incomeLimits = {
      1: 54000, 2: 62000, 3: 70000, 4: 78000, 5: 86000,
      6: 94000, 7: 102000, 8: 110000, 9: 118000, 10: 126000
    };
    const limit = incomeLimits[inputs.householdSize as keyof typeof incomeLimits] || 
                  incomeLimits[10] + (inputs.householdSize - 10) * 8000;
    
    if (inputs.annualIncome > limit * 1.15) {
      errors.push(`Annual income exceeds USDA limits for household size of ${inputs.householdSize}`);
    } else if (inputs.annualIncome > limit) {
      warnings.push(`Annual income is above USDA limits for household size of ${inputs.householdSize}. May still qualify with conditions`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
