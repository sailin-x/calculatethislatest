import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateRentVsBuyInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.homePrice || inputs.homePrice <= 0) {
    errors.push('Home price is required and must be greater than 0');
  } else if (inputs.homePrice > 10000000) {
    errors.push('Home price must be between $0 and $10,000,000');
  }

  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push('Down payment is required and cannot be negative');
  } else if (inputs.downPayment > inputs.homePrice) {
    errors.push('Down payment cannot exceed home price');
  }

  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push('Interest rate is required and cannot be negative');
  } else if (inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push('Loan term is required and must be at least 1 year');
  } else if (inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (!inputs.monthlyRent || inputs.monthlyRent <= 0) {
    errors.push('Monthly rent is required and must be greater than 0');
  } else if (inputs.monthlyRent > 50000) {
    errors.push('Monthly rent must be between $0 and $50,000');
  }

  if (!inputs.timeHorizon || inputs.timeHorizon < 1) {
    errors.push('Time horizon is required and must be at least 1 year');
  } else if (inputs.timeHorizon > 50) {
    errors.push('Time horizon must be between 1 and 50 years');
  }

  // Optional field validations
  if (inputs.downPaymentPercent !== undefined) {
    if (inputs.downPaymentPercent < 0) {
      errors.push('Down payment percentage cannot be negative');
    } else if (inputs.downPaymentPercent > 100) {
      errors.push('Down payment percentage cannot exceed 100%');
    }
  }

  if (inputs.closingCosts !== undefined) {
    if (inputs.closingCosts < 0) {
      errors.push('Closing costs cannot be negative');
    } else if (inputs.closingCosts > 100000) {
      errors.push('Closing costs cannot exceed $100,000');
    }
  }

  if (inputs.closingCostsPercent !== undefined) {
    if (inputs.closingCostsPercent < 0) {
      errors.push('Closing costs percentage cannot be negative');
    } else if (inputs.closingCostsPercent > 10) {
      errors.push('Closing costs percentage cannot exceed 10%');
    }
  }

  if (inputs.loanAmount !== undefined) {
    if (inputs.loanAmount < 0) {
      errors.push('Loan amount cannot be negative');
    } else if (inputs.loanAmount > 10000000) {
      errors.push('Loan amount cannot exceed $10,000,000');
    }
  }

  if (inputs.pmi !== undefined) {
    if (inputs.pmi < 0) {
      errors.push('PMI cannot be negative');
    } else if (inputs.pmi > 1000) {
      errors.push('PMI cannot exceed $1,000');
    }
  }

  if (inputs.pmiRate !== undefined) {
    if (inputs.pmiRate < 0) {
      errors.push('PMI rate cannot be negative');
    } else if (inputs.pmiRate > 2) {
      errors.push('PMI rate cannot exceed 2%');
    }
  }

  if (inputs.rentIncreaseRate !== undefined) {
    if (inputs.rentIncreaseRate < 0) {
      errors.push('Rent increase rate cannot be negative');
    } else if (inputs.rentIncreaseRate > 20) {
      errors.push('Rent increase rate cannot exceed 20%');
    }
  }

  if (inputs.rentersInsurance !== undefined) {
    if (inputs.rentersInsurance < 0) {
      errors.push('Renters insurance cannot be negative');
    } else if (inputs.rentersInsurance > 500) {
      errors.push('Renters insurance cannot exceed $500');
    }
  }

  if (inputs.securityDeposit !== undefined) {
    if (inputs.securityDeposit < 0) {
      errors.push('Security deposit cannot be negative');
    } else if (inputs.securityDeposit > 10000) {
      errors.push('Security deposit cannot exceed $10,000');
    }
  }

  if (inputs.propertyTaxes !== undefined) {
    if (inputs.propertyTaxes < 0) {
      errors.push('Property taxes cannot be negative');
    } else if (inputs.propertyTaxes > 50000) {
      errors.push('Property taxes cannot exceed $50,000');
    }
  }

  if (inputs.propertyTaxRate !== undefined) {
    if (inputs.propertyTaxRate < 0) {
      errors.push('Property tax rate cannot be negative');
    } else if (inputs.propertyTaxRate > 5) {
      errors.push('Property tax rate cannot exceed 5%');
    }
  }

  if (inputs.homeownersInsurance !== undefined) {
    if (inputs.homeownersInsurance < 0) {
      errors.push('Homeowners insurance cannot be negative');
    } else if (inputs.homeownersInsurance > 10000) {
      errors.push('Homeowners insurance cannot exceed $10,000');
    }
  }

  if (inputs.hoaFees !== undefined) {
    if (inputs.hoaFees < 0) {
      errors.push('HOA fees cannot be negative');
    } else if (inputs.hoaFees > 2000) {
      errors.push('HOA fees cannot exceed $2,000');
    }
  }

  if (inputs.maintenance !== undefined) {
    if (inputs.maintenance < 0) {
      errors.push('Maintenance cannot be negative');
    } else if (inputs.maintenance > 5000) {
      errors.push('Maintenance cannot exceed $5,000');
    }
  }

  if (inputs.maintenancePercent !== undefined) {
    if (inputs.maintenancePercent < 0) {
      errors.push('Maintenance percentage cannot be negative');
    } else if (inputs.maintenancePercent > 5) {
      errors.push('Maintenance percentage cannot exceed 5%');
    }
  }

  if (inputs.utilities !== undefined) {
    if (inputs.utilities < 0) {
      errors.push('Utilities cannot be negative');
    } else if (inputs.utilities > 2000) {
      errors.push('Utilities cannot exceed $2,000');
    }
  }

  if (inputs.homeAppreciationRate !== undefined) {
    if (inputs.homeAppreciationRate < -20) {
      errors.push('Home appreciation rate cannot be less than -20%');
    } else if (inputs.homeAppreciationRate > 20) {
      errors.push('Home appreciation rate cannot exceed 20%');
    }
  }

  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    } else if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

  if (inputs.investmentReturn !== undefined) {
    if (inputs.investmentReturn < 0) {
      errors.push('Investment return cannot be negative');
    } else if (inputs.investmentReturn > 20) {
      errors.push('Investment return cannot exceed 20%');
    }
  }

  if (inputs.sellingCosts !== undefined) {
    if (inputs.sellingCosts < 0) {
      errors.push('Selling costs cannot be negative');
    } else if (inputs.sellingCosts > 15) {
      errors.push('Selling costs cannot exceed 15%');
    }
  }

  if (inputs.analysisPeriod !== undefined) {
    const validPeriods = ['1-year', '3-year', '5-year', '7-year', '10-year', '15-year', '30-year'];
    if (!validPeriods.includes(inputs.analysisPeriod)) {
      errors.push('Analysis period must be one of: 1-year, 3-year, 5-year, 7-year, 10-year, 15-year, 30-year');
    }
  }

  if (inputs.marginalTaxRate !== undefined) {
    if (inputs.marginalTaxRate < 0) {
      errors.push('Marginal tax rate cannot be negative');
    } else if (inputs.marginalTaxRate > 50) {
      errors.push('Marginal tax rate cannot exceed 50%');
    }
  }

  if (inputs.stateTaxRate !== undefined) {
    if (inputs.stateTaxRate < 0) {
      errors.push('State tax rate cannot be negative');
    } else if (inputs.stateTaxRate > 15) {
      errors.push('State tax rate cannot exceed 15%');
    }
  }

  if (inputs.propertyTaxDeductible !== undefined) {
    const validDeductions = ['yes', 'no', 'partial'];
    if (!validDeductions.includes(inputs.propertyTaxDeductible)) {
      errors.push('Property tax deductible must be one of: yes, no, partial');
    }
  }

  if (inputs.currentSavings !== undefined) {
    if (inputs.currentSavings < 0) {
      errors.push('Current savings cannot be negative');
    } else if (inputs.currentSavings > 10000000) {
      errors.push('Current savings cannot exceed $10,000,000');
    }
  }

  if (inputs.monthlySavings !== undefined) {
    if (inputs.monthlySavings < 0) {
      errors.push('Monthly savings cannot be negative');
    } else if (inputs.monthlySavings > 50000) {
      errors.push('Monthly savings cannot exceed $50,000');
    }
  }

  if (inputs.emergencyFund !== undefined) {
    if (inputs.emergencyFund < 0) {
      errors.push('Emergency fund cannot be negative');
    } else if (inputs.emergencyFund > 100000) {
      errors.push('Emergency fund cannot exceed $100,000');
    }
  }

  if (inputs.lifestylePreference !== undefined) {
    const validPreferences = ['flexibility', 'stability', 'neutral'];
    if (!validPreferences.includes(inputs.lifestylePreference)) {
      errors.push('Lifestyle preference must be one of: flexibility, stability, neutral');
    }
  }

  if (inputs.maintenancePreference !== undefined) {
    const validPreferences = ['avoid', 'handle', 'neutral'];
    if (!validPreferences.includes(inputs.maintenancePreference)) {
      errors.push('Maintenance preference must be one of: avoid, handle, neutral');
    }
  }

  // Logical validation warnings
  if (inputs.downPayment && inputs.homePrice && inputs.downPayment < inputs.homePrice * 0.05) {
    warnings.push('Down payment is less than 5% - may require PMI and higher interest rates');
  }

  if (inputs.downPayment && inputs.homePrice && inputs.downPayment < inputs.homePrice * 0.2) {
    warnings.push('Down payment is less than 20% - PMI will likely be required');
  }

  if (inputs.timeHorizon && inputs.timeHorizon < 3) {
    warnings.push('Short time horizon may favor renting due to transaction costs');
  }

  if (inputs.monthlyRent && inputs.homePrice) {
    const rentToPriceRatio = (inputs.monthlyRent * 12) / inputs.homePrice;
    if (rentToPriceRatio < 0.04) {
      warnings.push('Low rent-to-price ratio may indicate buying is favorable');
    } else if (rentToPriceRatio > 0.08) {
      warnings.push('High rent-to-price ratio may indicate renting is expensive');
    }
  }

  if (inputs.interestRate && inputs.interestRate > 8) {
    warnings.push('High interest rate may make renting more attractive');
  }

  if (inputs.homeAppreciationRate && inputs.homeAppreciationRate < 0) {
    warnings.push('Negative home appreciation rate may favor renting');
  }

  if (inputs.investmentReturn && inputs.homeAppreciationRate && 
      inputs.investmentReturn > inputs.homeAppreciationRate * 2) {
    warnings.push('High investment return relative to home appreciation may favor renting');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
