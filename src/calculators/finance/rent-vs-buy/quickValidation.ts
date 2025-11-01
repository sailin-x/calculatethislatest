import { CalculatorInputs } from '../../types/calculator';

// Individual field validation functions
export function validateHomePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Home price must be greater than 0';
  if (value > 10000000) return 'Home price cannot exceed $10,000,000';
  return null;
}

export function validateDownPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'Down payment must be greater than or equal to 0';
  if (value > 10000000) return 'Down payment cannot exceed $10,000,000';
  return null;
}

export function validateDownPaymentPercent(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Down payment percentage cannot be negative';
  if (value > 100) return 'Down payment percentage cannot exceed 100%';
  return null;
}

export function validateClosingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Closing costs cannot be negative';
  if (value > 100000) return 'Closing costs cannot exceed $100,000';
  return null;
}

export function validateClosingCostsPercent(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Closing costs percentage cannot be negative';
  if (value > 10) return 'Closing costs percentage cannot exceed 10%';
  return null;
}

export function validateLoanAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Loan amount cannot be negative';
  if (value > 10000000) return 'Loan amount cannot exceed $10,000,000';
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 0) return 'Interest rate must be greater than or equal to 0';
  if (value > 20) return 'Interest rate cannot exceed 20%';
  return null;
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 1) return 'Loan term must be at least 1 year';
  if (value > 50) return 'Loan term cannot exceed 50 years';
  return null;
}

export function validatePMI(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'PMI cannot be negative';
  if (value > 1000) return 'PMI cannot exceed $1,000';
  return null;
}

export function validatePMIRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'PMI rate cannot be negative';
  if (value > 2) return 'PMI rate cannot exceed 2%';
  return null;
}

export function validateMonthlyRent(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Monthly rent must be greater than 0';
  if (value > 50000) return 'Monthly rent cannot exceed $50,000';
  return null;
}

export function validateRentIncreaseRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Rent increase rate cannot be negative';
  if (value > 20) return 'Rent increase rate cannot exceed 20%';
  return null;
}

export function validateRentersInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Renters insurance cannot be negative';
  if (value > 500) return 'Renters insurance cannot exceed $500';
  return null;
}

export function validateSecurityDeposit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Security deposit cannot be negative';
  if (value > 10000) return 'Security deposit cannot exceed $10,000';
  return null;
}

export function validatePropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Property taxes cannot be negative';
  if (value > 50000) return 'Property taxes cannot exceed $50,000';
  return null;
}

export function validatePropertyTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Property tax rate cannot be negative';
  if (value > 5) return 'Property tax rate cannot exceed 5%';
  return null;
}

export function validateHomeownersInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Homeowners insurance cannot be negative';
  if (value > 10000) return 'Homeowners insurance cannot exceed $10,000';
  return null;
}

export function validateHOAFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'HOA fees cannot be negative';
  if (value > 2000) return 'HOA fees cannot exceed $2,000';
  return null;
}

export function validateMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Maintenance cannot be negative';
  if (value > 5000) return 'Maintenance cannot exceed $5,000';
  return null;
}

export function validateMaintenancePercent(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Maintenance percentage cannot be negative';
  if (value > 5) return 'Maintenance percentage cannot exceed 5%';
  return null;
}

export function validateUtilities(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Utilities cannot be negative';
  if (value > 2000) return 'Utilities cannot exceed $2,000';
  return null;
}

export function validateHomeAppreciationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -20) return 'Home appreciation rate cannot be less than -20%';
  if (value > 20) return 'Home appreciation rate cannot exceed 20%';
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Inflation rate cannot be negative';
  if (value > 10) return 'Inflation rate cannot exceed 10%';
  return null;
}

export function validateInvestmentReturn(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Investment return cannot be negative';
  if (value > 20) return 'Investment return cannot exceed 20%';
  return null;
}

export function validateSellingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Selling costs cannot be negative';
  if (value > 15) return 'Selling costs cannot exceed 15%';
  return null;
}

export function validateTimeHorizon(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value < 1) return 'Time horizon must be at least 1 year';
  if (value > 50) return 'Time horizon cannot exceed 50 years';
  return null;
}

export function validateAnalysisPeriod(value: string, allInputs?: Record<string, any>): string | null {
  const validPeriods = ['1-year', '3-year', '5-year', '7-year', '10-year', '15-year', '30-year'];
  if (!value) return 'Analysis period is required';
  if (!validPeriods.includes(value)) return 'Invalid analysis period';
  return null;
}

export function validateMarginalTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Marginal tax rate cannot be negative';
  if (value > 50) return 'Marginal tax rate cannot exceed 50%';
  return null;
}

export function validateStateTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'State tax rate cannot be negative';
  if (value > 15) return 'State tax rate cannot exceed 15%';
  return null;
}

export function validatePropertyTaxDeductible(value: string, allInputs?: Record<string, any>): string | null {
  const validDeductions = ['yes', 'no', 'partial'];
  if (!value) return 'Property tax deductible is required';
  if (!validDeductions.includes(value)) return 'Invalid property tax deductible';
  return null;
}

export function validateCurrentSavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Current savings cannot be negative';
  if (value > 10000000) return 'Current savings cannot exceed $10,000,000';
  return null;
}

export function validateMonthlySavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Monthly savings cannot be negative';
  if (value > 50000) return 'Monthly savings cannot exceed $50,000';
  return null;
}

export function validateEmergencyFund(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Emergency fund cannot be negative';
  if (value > 100000) return 'Emergency fund cannot exceed $100,000';
  return null;
}

export function validateLifestylePreference(value: string, allInputs?: Record<string, any>): string | null {
  const validPreferences = ['flexibility', 'stability', 'neutral'];
  if (!value) return 'Lifestyle preference is required';
  if (!validPreferences.includes(value)) return 'Invalid lifestyle preference';
  return null;
}

export function validateMaintenancePreference(value: string, allInputs?: Record<string, any>): string | null {
  const validPreferences = ['avoid', 'handle', 'neutral'];
  if (!value) return 'Maintenance preference is required';
  if (!validPreferences.includes(value)) return 'Invalid maintenance preference';
  return null;
}

// Consolidated validation function
export function validateAllRentVsBuyInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const homePriceError = validateHomePrice(inputs.homePrice);
  if (homePriceError) errors.push(homePriceError);

  const downPaymentError = validateDownPayment(inputs.downPayment);
  if (downPaymentError) errors.push(downPaymentError);

  const interestRateError = validateInterestRate(inputs.interestRate);
  if (interestRateError) errors.push(interestRateError);

  const loanTermError = validateLoanTerm(inputs.loanTerm);
  if (loanTermError) errors.push(loanTermError);

  const monthlyRentError = validateMonthlyRent(inputs.monthlyRent);
  if (monthlyRentError) errors.push(monthlyRentError);

  const timeHorizonError = validateTimeHorizon(inputs.timeHorizon);
  if (timeHorizonError) errors.push(timeHorizonError);

  // Optional field validations
  if (inputs.downPaymentPercent !== undefined) {
    const downPaymentPercentError = validateDownPaymentPercent(inputs.downPaymentPercent);
    if (downPaymentPercentError) errors.push(downPaymentPercentError);
  }

  if (inputs.closingCosts !== undefined) {
    const closingCostsError = validateClosingCosts(inputs.closingCosts);
    if (closingCostsError) errors.push(closingCostsError);
  }

  if (inputs.closingCostsPercent !== undefined) {
    const closingCostsPercentError = validateClosingCostsPercent(inputs.closingCostsPercent);
    if (closingCostsPercentError) errors.push(closingCostsPercentError);
  }

  if (inputs.loanAmount !== undefined) {
    const loanAmountError = validateLoanAmount(inputs.loanAmount);
    if (loanAmountError) errors.push(loanAmountError);
  }

  if (inputs.pmi !== undefined) {
    const pmiError = validatePMI(inputs.pmi);
    if (pmiError) errors.push(pmiError);
  }

  if (inputs.pmiRate !== undefined) {
    const pmiRateError = validatePMIRate(inputs.pmiRate);
    if (pmiRateError) errors.push(pmiRateError);
  }

  if (inputs.rentIncreaseRate !== undefined) {
    const rentIncreaseRateError = validateRentIncreaseRate(inputs.rentIncreaseRate);
    if (rentIncreaseRateError) errors.push(rentIncreaseRateError);
  }

  if (inputs.rentersInsurance !== undefined) {
    const rentersInsuranceError = validateRentersInsurance(inputs.rentersInsurance);
    if (rentersInsuranceError) errors.push(rentersInsuranceError);
  }

  if (inputs.securityDeposit !== undefined) {
    const securityDepositError = validateSecurityDeposit(inputs.securityDeposit);
    if (securityDepositError) errors.push(securityDepositError);
  }

  if (inputs.propertyTaxes !== undefined) {
    const propertyTaxesError = validatePropertyTaxes(inputs.propertyTaxes);
    if (propertyTaxesError) errors.push(propertyTaxesError);
  }

  if (inputs.propertyTaxRate !== undefined) {
    const propertyTaxRateError = validatePropertyTaxRate(inputs.propertyTaxRate);
    if (propertyTaxRateError) errors.push(propertyTaxRateError);
  }

  if (inputs.homeownersInsurance !== undefined) {
    const homeownersInsuranceError = validateHomeownersInsurance(inputs.homeownersInsurance);
    if (homeownersInsuranceError) errors.push(homeownersInsuranceError);
  }

  if (inputs.hoaFees !== undefined) {
    const hoaFeesError = validateHOAFees(inputs.hoaFees);
    if (hoaFeesError) errors.push(hoaFeesError);
  }

  if (inputs.maintenance !== undefined) {
    const maintenanceError = validateMaintenance(inputs.maintenance);
    if (maintenanceError) errors.push(maintenanceError);
  }

  if (inputs.maintenancePercent !== undefined) {
    const maintenancePercentError = validateMaintenancePercent(inputs.maintenancePercent);
    if (maintenancePercentError) errors.push(maintenancePercentError);
  }

  if (inputs.utilities !== undefined) {
    const utilitiesError = validateUtilities(inputs.utilities);
    if (utilitiesError) errors.push(utilitiesError);
  }

  if (inputs.homeAppreciationRate !== undefined) {
    const homeAppreciationRateError = validateHomeAppreciationRate(inputs.homeAppreciationRate);
    if (homeAppreciationRateError) errors.push(homeAppreciationRateError);
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateError = validateInflationRate(inputs.inflationRate);
    if (inflationRateError) errors.push(inflationRateError);
  }

  if (inputs.investmentReturn !== undefined) {
    const investmentReturnError = validateInvestmentReturn(inputs.investmentReturn);
    if (investmentReturnError) errors.push(investmentReturnError);
  }

  if (inputs.sellingCosts !== undefined) {
    const sellingCostsError = validateSellingCosts(inputs.sellingCosts);
    if (sellingCostsError) errors.push(sellingCostsError);
  }

  if (inputs.analysisPeriod !== undefined) {
    const analysisPeriodError = validateAnalysisPeriod(inputs.analysisPeriod);
    if (analysisPeriodError) errors.push(analysisPeriodError);
  }

  if (inputs.marginalTaxRate !== undefined) {
    const marginalTaxRateError = validateMarginalTaxRate(inputs.marginalTaxRate);
    if (marginalTaxRateError) errors.push(marginalTaxRateError);
  }

  if (inputs.stateTaxRate !== undefined) {
    const stateTaxRateError = validateStateTaxRate(inputs.stateTaxRate);
    if (stateTaxRateError) errors.push(stateTaxRateError);
  }

  if (inputs.propertyTaxDeductible !== undefined) {
    const propertyTaxDeductibleError = validatePropertyTaxDeductible(inputs.propertyTaxDeductible);
    if (propertyTaxDeductibleError) errors.push(propertyTaxDeductibleError);
  }

  if (inputs.currentSavings !== undefined) {
    const currentSavingsError = validateCurrentSavings(inputs.currentSavings);
    if (currentSavingsError) errors.push(currentSavingsError);
  }

  if (inputs.monthlySavings !== undefined) {
    const monthlySavingsError = validateMonthlySavings(inputs.monthlySavings);
    if (monthlySavingsError) errors.push(monthlySavingsError);
  }

  if (inputs.emergencyFund !== undefined) {
    const emergencyFundError = validateEmergencyFund(inputs.emergencyFund);
    if (emergencyFundError) errors.push(emergencyFundError);
  }

  if (inputs.lifestylePreference !== undefined) {
    const lifestylePreferenceError = validateLifestylePreference(inputs.lifestylePreference);
    if (lifestylePreferenceError) errors.push(lifestylePreferenceError);
  }

  if (inputs.maintenancePreference !== undefined) {
    const maintenancePreferenceError = validateMaintenancePreference(inputs.maintenancePreference);
    if (maintenancePreferenceError) errors.push(maintenancePreferenceError);
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
      warnings.push('Low RentToPrice ratio may indicate buying is favorable');
    } else if (rentToPriceRatio > 0.08) {
      warnings.push('High RentToPrice ratio may indicate renting is expensive');
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
