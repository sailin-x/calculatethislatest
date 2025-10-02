import { CalculatorInputs } from '../../types/calculator';

export interface TimberlandInvestmentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTimberlandInvestmentInputs(inputs: CalculatorInputs): TimberlandInvestmentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property size validation
  if (typeof inputs.propertySize !== 'number' || isNaN(inputs.propertySize)) {
    errors.push('Property size must be a valid number');
  } else if (inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  } else if (inputs.propertySize > 100000) {
    warnings.push('Property size is very large. Verify the value is correct');
  }

  // Purchase price validation
  if (typeof inputs.purchasePrice !== 'number' || isNaN(inputs.purchasePrice)) {
    errors.push('Purchase price must be a valid number');
  } else if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  } else if (inputs.purchasePrice > 100000000) {
    warnings.push('Purchase price is very high. Verify the value is correct');
  }

  // Down payment validation
  if (typeof inputs.downPayment !== 'number' || isNaN(inputs.downPayment)) {
    errors.push('Down payment must be a valid number');
  } else if (inputs.downPayment <= 0) {
    errors.push('Down payment must be greater than 0');
  } else if (inputs.downPayment >= inputs.purchasePrice) {
    errors.push('Down payment must be less than purchase price');
  } else if (inputs.downPayment < inputs.purchasePrice * 0.1) {
    warnings.push('Down payment is less than 10% of purchase price. This may affect loan approval');
  }

  // Interest rate validation
  if (typeof inputs.interestRate !== 'number' || isNaN(inputs.interestRate)) {
    errors.push('Interest rate must be a valid number');
  } else if (inputs.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  } else if (inputs.interestRate > 25) {
    warnings.push('Interest rate is very high. Verify the value is correct');
  }

  // Loan term validation
  if (typeof inputs.loanTerm !== 'number' || isNaN(inputs.loanTerm)) {
    errors.push('Loan term must be a valid number');
  } else if (inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  } else if (inputs.loanTerm > 30) {
    warnings.push('Loan term is longer than typical timberland loans');
  }

  // Timber type validation
  if (typeof inputs.timberType !== 'string' || !inputs.timberType) {
    errors.push('Timber type must be selected');
  }

  // Current stand age validation
  if (typeof inputs.currentStandAge !== 'number' || isNaN(inputs.currentStandAge)) {
    errors.push('Current stand age must be a valid number');
  } else if (inputs.currentStandAge < 0) {
    errors.push('Current stand age cannot be negative');
  } else if (inputs.currentStandAge > 200) {
    warnings.push('Current stand age is very high. Verify the value is correct');
  }

  // Rotation age validation
  if (typeof inputs.rotationAge !== 'number' || isNaN(inputs.rotationAge)) {
    errors.push('Rotation age must be a valid number');
  } else if (inputs.rotationAge <= 0) {
    errors.push('Rotation age must be greater than 0');
  } else if (inputs.rotationAge < inputs.currentStandAge) {
    errors.push('Rotation age must be greater than or equal to current stand age');
  } else if (inputs.rotationAge > 100) {
    warnings.push('Rotation age is very long. Verify the value is correct');
  }

  // Current volume validation
  if (typeof inputs.currentVolume !== 'number' || isNaN(inputs.currentVolume)) {
    errors.push('Current volume must be a valid number');
  } else if (inputs.currentVolume < 0) {
    errors.push('Current volume cannot be negative');
  } else if (inputs.currentVolume > 50000) {
    warnings.push('Current volume is very high. Verify the value is correct');
  }

  // Mature volume validation
  if (typeof inputs.matureVolume !== 'number' || isNaN(inputs.matureVolume)) {
    errors.push('Mature volume must be a valid number');
  } else if (inputs.matureVolume <= 0) {
    errors.push('Mature volume must be greater than 0');
  } else if (inputs.matureVolume < inputs.currentVolume) {
    errors.push('Mature volume must be greater than or equal to current volume');
  } else if (inputs.matureVolume > 100000) {
    warnings.push('Mature volume is very high. Verify the value is correct');
  }

  // Timber price validation
  if (typeof inputs.timberPrice !== 'number' || isNaN(inputs.timberPrice)) {
    errors.push('Timber price must be a valid number');
  } else if (inputs.timberPrice <= 0) {
    errors.push('Timber price must be greater than 0');
  } else if (inputs.timberPrice > 5) {
    warnings.push('Timber price is very high. Verify the value is correct');
  }

  // Price growth rate validation
  if (typeof inputs.priceGrowthRate !== 'number' || isNaN(inputs.priceGrowthRate)) {
    errors.push('Price growth rate must be a valid number');
  } else if (inputs.priceGrowthRate < -20) {
    errors.push('Price growth rate cannot be less than -20%');
  } else if (inputs.priceGrowthRate > 20) {
    warnings.push('Price growth rate is very high. Verify the value is correct');
  }

  // Volume growth rate validation
  if (typeof inputs.volumeGrowthRate !== 'number' || isNaN(inputs.volumeGrowthRate)) {
    errors.push('Volume growth rate must be a valid number');
  } else if (inputs.volumeGrowthRate < -10) {
    errors.push('Volume growth rate cannot be less than -10%');
  } else if (inputs.volumeGrowthRate > 10) {
    warnings.push('Volume growth rate is very high. Verify the value is correct');
  }

  // Harvest costs validation
  if (typeof inputs.harvestCosts !== 'number' || isNaN(inputs.harvestCosts)) {
    errors.push('Harvest costs must be a valid number');
  } else if (inputs.harvestCosts < 0) {
    errors.push('Harvest costs cannot be negative');
  } else if (inputs.harvestCosts > 1000) {
    warnings.push('Harvest costs are very high. Verify the value is correct');
  }

  // Replanting costs validation
  if (typeof inputs.replantingCosts !== 'number' || isNaN(inputs.replantingCosts)) {
    errors.push('Replanting costs must be a valid number');
  } else if (inputs.replantingCosts < 0) {
    errors.push('Replanting costs cannot be negative');
  } else if (inputs.replantingCosts > 2000) {
    warnings.push('Replanting costs are very high. Verify the value is correct');
  }

  // Annual expenses validation
  if (typeof inputs.annualExpenses !== 'number' || isNaN(inputs.annualExpenses)) {
    errors.push('Annual expenses must be a valid number');
  } else if (inputs.annualExpenses < 0) {
    errors.push('Annual expenses cannot be negative');
  } else if (inputs.annualExpenses > 500) {
    warnings.push('Annual expenses are very high. Verify the value is correct');
  }

  // Property taxes validation
  if (typeof inputs.propertyTaxes !== 'number' || isNaN(inputs.propertyTaxes)) {
    errors.push('Property taxes must be a valid number');
  } else if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  } else if (inputs.propertyTaxes > 10000) {
    warnings.push('Property taxes are very high. Verify the value is correct');
  }

  // Insurance validation
  if (typeof inputs.insurance !== 'number' || isNaN(inputs.insurance)) {
    errors.push('Insurance must be a valid number');
  } else if (inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  } else if (inputs.insurance > 5000) {
    warnings.push('Insurance is very high. Verify the value is correct');
  }

  // Management fee validation
  if (typeof inputs.managementFee !== 'number' || isNaN(inputs.managementFee)) {
    errors.push('Management fee must be a valid number');
  } else if (inputs.managementFee < 0) {
    errors.push('Management fee cannot be negative');
  } else if (inputs.managementFee > 20) {
    warnings.push('Management fee is very high. Verify the value is correct');
  }

  // Appreciation rate validation
  if (typeof inputs.appreciationRate !== 'number' || isNaN(inputs.appreciationRate)) {
    errors.push('Appreciation rate must be a valid number');
  } else if (inputs.appreciationRate < -10) {
    errors.push('Appreciation rate cannot be less than -10%');
  } else if (inputs.appreciationRate > 15) {
    warnings.push('Appreciation rate is very high. Verify the value is correct');
  }

  // Analysis period validation
  if (typeof inputs.analysisPeriod !== 'number' || isNaN(inputs.analysisPeriod)) {
    errors.push('Analysis period must be a valid number');
  } else if (inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  } else if (inputs.analysisPeriod > 50) {
    warnings.push('Analysis period is very long. Consider a shorter period');
  }

  // Harvest schedule validation
  if (typeof inputs.harvestSchedule !== 'string' || !inputs.harvestSchedule) {
    errors.push('Harvest schedule must be selected');
  }

  // Thinning volume validation
  if (typeof inputs.thinningVolume !== 'number' || isNaN(inputs.thinningVolume)) {
    errors.push('Thinning volume must be a valid number');
  } else if (inputs.thinningVolume < 0) {
    errors.push('Thinning volume cannot be negative');
  } else if (inputs.thinningVolume > inputs.matureVolume) {
    errors.push('Thinning volume cannot exceed mature volume');
  }

  // Thinning age validation
  if (typeof inputs.thinningAge !== 'number' || isNaN(inputs.thinningAge)) {
    errors.push('Thinning age must be a valid number');
  } else if (inputs.thinningAge < 0) {
    errors.push('Thinning age cannot be negative');
  } else if (inputs.thinningAge >= inputs.rotationAge) {
    errors.push('Thinning age must be less than rotation age');
  }

  // Thinning price validation
  if (typeof inputs.thinningPrice !== 'number' || isNaN(inputs.thinningPrice)) {
    errors.push('Thinning price must be a valid number');
  } else if (inputs.thinningPrice <= 0) {
    errors.push('Thinning price must be greater than 0');
  } else if (inputs.thinningPrice > inputs.timberPrice) {
    warnings.push('Thinning price is higher than mature timber price. Verify the value is correct');
  }

  // Logical validation checks
  if (inputs.propertySize && inputs.purchasePrice) {
    const pricePerAcre = inputs.purchasePrice / inputs.propertySize;
    if (pricePerAcre < 100) {
      warnings.push('Price per acre is very low. Verify the values are correct');
    } else if (pricePerAcre > 50000) {
      warnings.push('Price per acre is very high. Verify the values are correct');
    }
  }

  if (inputs.currentVolume && inputs.matureVolume) {
    const volumeRatio = inputs.currentVolume / inputs.matureVolume;
    if (volumeRatio > 0.9) {
      warnings.push('Current volume is very close to mature volume. Consider if this is accurate');
    }
  }

  if (inputs.currentStandAge && inputs.rotationAge) {
    const ageRatio = inputs.currentStandAge / inputs.rotationAge;
    if (ageRatio > 0.9) {
      warnings.push('Current stand age is very close to rotation age. Harvest may be imminent');
    }
  }

  // Debt service coverage warning
  if (inputs.purchasePrice && inputs.downPayment && inputs.interestRate && inputs.loanTerm) {
    const loanAmount = inputs.purchasePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.loanTerm * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const annualDebtService = monthlyPayment * 12;
    
    if (inputs.propertySize && inputs.annualExpenses) {
      const estimatedIncome = inputs.propertySize * inputs.matureVolume * inputs.timberPrice / inputs.rotationAge;
      const estimatedExpenses = inputs.propertySize * inputs.annualExpenses;
      const estimatedDSCR = (estimatedIncome - estimatedExpenses) / annualDebtService;
      
      if (estimatedDSCR < 1.0) {
        warnings.push('Estimated debt service coverage ratio is below 1.0. This may indicate cash flow issues');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
