import { CalculatorInputs } from '../../../types/calculator';

// Individual field validation functions
export function validatePropertyValue(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Property value must be greater than 0';
  if (value > 10000000) return 'Property value cannot exceed $10,000,000';
  return null;
}

export function validatePurchasePrice(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Purchase price cannot be negative';
  if (value > 10000000) return 'Purchase price cannot exceed $10,000,000';
  return null;
}

export function validateDownPayment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Down payment cannot be negative';
  if (value > 10000000) return 'Down payment cannot exceed $10,000,000';
  return null;
}

export function validateClosingCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Closing costs cannot be negative';
  if (value > 100000) return 'Closing costs cannot exceed $100,000';
  return null;
}

export function validateRenovationCosts(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Renovation costs cannot be negative';
  if (value > 500000) return 'Renovation costs cannot exceed $500,000';
  return null;
}

export function validateMonthlyRent(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Monthly rent must be greater than 0';
  if (value > 50000) return 'Monthly rent cannot exceed $50,000';
  return null;
}

export function validateAnnualRent(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Annual rent cannot be negative';
  if (value > 600000) return 'Annual rent cannot exceed $600,000';
  return null;
}

export function validateVacancyRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Vacancy rate cannot be negative';
  if (value > 50) return 'Vacancy rate cannot exceed 50%';
  return null;
}

export function validateRentGrowthRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -10) return 'Rent growth rate cannot be less than -10%';
  if (value > 20) return 'Rent growth rate cannot exceed 20%';
  return null;
}

export function validateOtherIncome(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Other income cannot be negative';
  if (value > 5000) return 'Other income cannot exceed $5,000';
  return null;
}

export function validateLateFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Late fees cannot be negative';
  if (value > 1000) return 'Late fees cannot exceed $1,000';
  return null;
}

export function validatePropertyTaxes(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Property taxes cannot be negative';
  if (value > 50000) return 'Property taxes cannot exceed $50,000';
  return null;
}

export function validateInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Insurance cannot be negative';
  if (value > 10000) return 'Insurance cannot exceed $10,000';
  return null;
}

export function validateHOAFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'HOA fees cannot be negative';
  if (value > 2000) return 'HOA fees cannot exceed $2,000';
  return null;
}

export function validateUtilities(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Utilities cannot be negative';
  if (value > 2000) return 'Utilities cannot exceed $2,000';
  return null;
}

export function validateMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Maintenance cannot be negative';
  if (value > 5000) return 'Maintenance cannot exceed $5,000';
  return null;
}

export function validatePropertyManagement(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Property management cannot be negative';
  if (value > 20) return 'Property management cannot exceed 20%';
  return null;
}

export function validateRepairs(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Repairs cannot be negative';
  if (value > 3000) return 'Repairs cannot exceed $3,000';
  return null;
}

export function validateLandscaping(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Landscaping cannot be negative';
  if (value > 1000) return 'Landscaping cannot exceed $1,000';
  return null;
}

export function validatePestControl(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Pest control cannot be negative';
  if (value > 500) return 'Pest control cannot exceed $500';
  return null;
}

export function validateAdvertising(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Advertising cannot be negative';
  if (value > 500) return 'Advertising cannot exceed $500';
  return null;
}

export function validateLegalFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Legal fees cannot be negative';
  if (value > 5000) return 'Legal fees cannot exceed $5,000';
  return null;
}

export function validateAccountingFees(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Accounting fees cannot be negative';
  if (value > 3000) return 'Accounting fees cannot exceed $3,000';
  return null;
}

export function validateLoanAmount(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Loan amount cannot be negative';
  if (value > 10000000) return 'Loan amount cannot exceed $10,000,000';
  return null;
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Interest rate cannot be negative';
  if (value > 20) return 'Interest rate cannot exceed 20%';
  return null;
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Loan term must be at least 1 year';
  if (value > 50) return 'Loan term cannot exceed 50 years';
  return null;
}

export function validatePMI(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'PMI cannot be negative';
  if (value > 1000) return 'PMI cannot exceed $1,000';
  return null;
}

export function validatePropertyType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['single-family', 'condo', 'townhouse', 'duplex', 'triplex', 'fourplex', 'apartment', 'commercial'];
  if (!value) return 'Property type is required';
  if (!validTypes.includes(value)) return 'Invalid property type';
  return null;
}

export function validateSquareFootage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Square footage cannot be negative';
  if (value > 100000) return 'Square footage cannot exceed 100,000';
  return null;
}

export function validateBedrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Bedrooms cannot be negative';
  if (value > 20) return 'Bedrooms cannot exceed 20';
  return null;
}

export function validateBathrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Bathrooms cannot be negative';
  if (value > 20) return 'Bathrooms cannot exceed 20';
  return null;
}

export function validateYearBuilt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1800) return 'Year built must be at least 1800';
  if (value > 2030) return 'Year built cannot exceed 2030';
  return null;
}

export function validateLocation(value: string, allInputs?: Record<string, any>): string | null {
  const validLocations = ['urban', 'suburban', 'rural'];
  if (!value) return 'Location is required';
  if (!validLocations.includes(value)) return 'Invalid location';
  return null;
}

export function validateAppreciationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -20) return 'Appreciation rate cannot be less than -20%';
  if (value > 20) return 'Appreciation rate cannot exceed 20%';
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Inflation rate cannot be negative';
  if (value > 10) return 'Inflation rate cannot exceed 10%';
  return null;
}

export function validateMarketConditions(value: string, allInputs?: Record<string, any>): string | null {
  const validConditions = ['hot', 'stable', 'cooling', 'declining'];
  if (!value) return 'Market conditions is required';
  if (!validConditions.includes(value)) return 'Invalid market conditions';
  return null;
}

export function validateHoldingPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Holding period must be at least 1 year';
  if (value > 50) return 'Holding period cannot exceed 50 years';
  return null;
}

export function validateTaxRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Tax rate cannot be negative';
  if (value > 50) return 'Tax rate cannot exceed 50%';
  return null;
}

export function validateDepreciationPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Depreciation period cannot be negative';
  if (value > 50) return 'Depreciation period cannot exceed 50 years';
  return null;
}

export function validateAnalysisPeriod(value: string, allInputs?: Record<string, any>): string | null {
  const validPeriods = ['monthly', 'quarterly', 'annually', '5-year', '10-year'];
  if (!value) return 'Analysis period is required';
  if (!validPeriods.includes(value)) return 'Invalid analysis period';
  return null;
}

// Consolidated validation function
export function validateAllRentalYieldInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const propertyValueError = validatePropertyValue(inputs.propertyValue);
  if (propertyValueError) errors.push(propertyValueError);

  const monthlyRentError = validateMonthlyRent(inputs.monthlyRent);
  if (monthlyRentError) errors.push(monthlyRentError);

  // Optional field validations
  if (inputs.purchasePrice !== undefined) {
    const purchasePriceError = validatePurchasePrice(inputs.purchasePrice);
    if (purchasePriceError) errors.push(purchasePriceError);
  }

  if (inputs.downPayment !== undefined) {
    const downPaymentError = validateDownPayment(inputs.downPayment);
    if (downPaymentError) errors.push(downPaymentError);
  }

  if (inputs.closingCosts !== undefined) {
    const closingCostsError = validateClosingCosts(inputs.closingCosts);
    if (closingCostsError) errors.push(closingCostsError);
  }

  if (inputs.renovationCosts !== undefined) {
    const renovationCostsError = validateRenovationCosts(inputs.renovationCosts);
    if (renovationCostsError) errors.push(renovationCostsError);
  }

  if (inputs.annualRent !== undefined) {
    const annualRentError = validateAnnualRent(inputs.annualRent);
    if (annualRentError) errors.push(annualRentError);
  }

  if (inputs.vacancyRate !== undefined) {
    const vacancyRateError = validateVacancyRate(inputs.vacancyRate);
    if (vacancyRateError) errors.push(vacancyRateError);
  }

  if (inputs.rentGrowthRate !== undefined) {
    const rentGrowthRateError = validateRentGrowthRate(inputs.rentGrowthRate);
    if (rentGrowthRateError) errors.push(rentGrowthRateError);
  }

  if (inputs.otherIncome !== undefined) {
    const otherIncomeError = validateOtherIncome(inputs.otherIncome);
    if (otherIncomeError) errors.push(otherIncomeError);
  }

  if (inputs.lateFees !== undefined) {
    const lateFeesError = validateLateFees(inputs.lateFees);
    if (lateFeesError) errors.push(lateFeesError);
  }

  if (inputs.propertyTaxes !== undefined) {
    const propertyTaxesError = validatePropertyTaxes(inputs.propertyTaxes);
    if (propertyTaxesError) errors.push(propertyTaxesError);
  }

  if (inputs.insurance !== undefined) {
    const insuranceError = validateInsurance(inputs.insurance);
    if (insuranceError) errors.push(insuranceError);
  }

  if (inputs.hoaFees !== undefined) {
    const hoaFeesError = validateHOAFees(inputs.hoaFees);
    if (hoaFeesError) errors.push(hoaFeesError);
  }

  if (inputs.utilities !== undefined) {
    const utilitiesError = validateUtilities(inputs.utilities);
    if (utilitiesError) errors.push(utilitiesError);
  }

  if (inputs.maintenance !== undefined) {
    const maintenanceError = validateMaintenance(inputs.maintenance);
    if (maintenanceError) errors.push(maintenanceError);
  }

  if (inputs.propertyManagement !== undefined) {
    const propertyManagementError = validatePropertyManagement(inputs.propertyManagement);
    if (propertyManagementError) errors.push(propertyManagementError);
  }

  if (inputs.repairs !== undefined) {
    const repairsError = validateRepairs(inputs.repairs);
    if (repairsError) errors.push(repairsError);
  }

  if (inputs.landscaping !== undefined) {
    const landscapingError = validateLandscaping(inputs.landscaping);
    if (landscapingError) errors.push(landscapingError);
  }

  if (inputs.pestControl !== undefined) {
    const pestControlError = validatePestControl(inputs.pestControl);
    if (pestControlError) errors.push(pestControlError);
  }

  if (inputs.advertising !== undefined) {
    const advertisingError = validateAdvertising(inputs.advertising);
    if (advertisingError) errors.push(advertisingError);
  }

  if (inputs.legalFees !== undefined) {
    const legalFeesError = validateLegalFees(inputs.legalFees);
    if (legalFeesError) errors.push(legalFeesError);
  }

  if (inputs.accountingFees !== undefined) {
    const accountingFeesError = validateAccountingFees(inputs.accountingFees);
    if (accountingFeesError) errors.push(accountingFeesError);
  }

  if (inputs.loanAmount !== undefined) {
    const loanAmountError = validateLoanAmount(inputs.loanAmount);
    if (loanAmountError) errors.push(loanAmountError);
  }

  if (inputs.interestRate !== undefined) {
    const interestRateError = validateInterestRate(inputs.interestRate);
    if (interestRateError) errors.push(interestRateError);
  }

  if (inputs.loanTerm !== undefined) {
    const loanTermError = validateLoanTerm(inputs.loanTerm);
    if (loanTermError) errors.push(loanTermError);
  }

  if (inputs.pmi !== undefined) {
    const pmiError = validatePMI(inputs.pmi);
    if (pmiError) errors.push(pmiError);
  }

  if (inputs.propertyType !== undefined) {
    const propertyTypeError = validatePropertyType(inputs.propertyType);
    if (propertyTypeError) errors.push(propertyTypeError);
  }

  if (inputs.squareFootage !== undefined) {
    const squareFootageError = validateSquareFootage(inputs.squareFootage);
    if (squareFootageError) errors.push(squareFootageError);
  }

  if (inputs.bedrooms !== undefined) {
    const bedroomsError = validateBedrooms(inputs.bedrooms);
    if (bedroomsError) errors.push(bedroomsError);
  }

  if (inputs.bathrooms !== undefined) {
    const bathroomsError = validateBathrooms(inputs.bathrooms);
    if (bathroomsError) errors.push(bathroomsError);
  }

  if (inputs.yearBuilt !== undefined) {
    const yearBuiltError = validateYearBuilt(inputs.yearBuilt);
    if (yearBuiltError) errors.push(yearBuiltError);
  }

  if (inputs.location !== undefined) {
    const locationError = validateLocation(inputs.location);
    if (locationError) errors.push(locationError);
  }

  if (inputs.appreciationRate !== undefined) {
    const appreciationRateError = validateAppreciationRate(inputs.appreciationRate);
    if (appreciationRateError) errors.push(appreciationRateError);
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateError = validateInflationRate(inputs.inflationRate);
    if (inflationRateError) errors.push(inflationRateError);
  }

  if (inputs.marketConditions !== undefined) {
    const marketConditionsError = validateMarketConditions(inputs.marketConditions);
    if (marketConditionsError) errors.push(marketConditionsError);
  }

  if (inputs.holdingPeriod !== undefined) {
    const holdingPeriodError = validateHoldingPeriod(inputs.holdingPeriod);
    if (holdingPeriodError) errors.push(holdingPeriodError);
  }

  if (inputs.taxRate !== undefined) {
    const taxRateError = validateTaxRate(inputs.taxRate);
    if (taxRateError) errors.push(taxRateError);
  }

  if (inputs.depreciationPeriod !== undefined) {
    const depreciationPeriodError = validateDepreciationPeriod(inputs.depreciationPeriod);
    if (depreciationPeriodError) errors.push(depreciationPeriodError);
  }

  if (inputs.analysisPeriod !== undefined) {
    const analysisPeriodError = validateAnalysisPeriod(inputs.analysisPeriod);
    if (analysisPeriodError) errors.push(analysisPeriodError);
  }

  // Logical validation warnings
  if (inputs.purchasePrice && inputs.downPayment && inputs.downPayment > inputs.purchasePrice) {
    warnings.push('Down payment cannot exceed purchase price');
  }

  if (inputs.propertyValue && inputs.monthlyRent) {
    const rentToPriceRatio = (inputs.monthlyRent * 12) / inputs.propertyValue;
    if (rentToPriceRatio < 0.06) {
      warnings.push('Rent-to-price ratio is low - may indicate poor yield');
    } else if (rentToPriceRatio > 0.15) {
      warnings.push('Rent-to-price ratio is high - verify rent is realistic');
    }
  }

  if (inputs.vacancyRate && inputs.vacancyRate > 10) {
    warnings.push('High vacancy rate may indicate market issues');
  }

  if (inputs.appreciationRate && inputs.appreciationRate < 0) {
    warnings.push('Negative appreciation rate indicates declining market');
  }

  if (inputs.annualRent && inputs.monthlyRent) {
    const calculatedAnnual = inputs.monthlyRent * 12;
    if (Math.abs(inputs.annualRent - calculatedAnnual) > 100) {
      warnings.push('Annual rent should equal monthly rent × 12');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
