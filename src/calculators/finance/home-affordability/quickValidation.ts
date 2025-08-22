import { CalculatorInputs } from '../../../types/calculator';

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Annual income is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Annual income must be a number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Annual income must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly income must be a number' };
  if (value && (value < 833 || value > 833333)) return { isValid: false, message: 'Monthly income must be between $833 and $833,333' };
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Down payment is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Down payment must be a number' };
  if (value < 0 || value > 10000000) return { isValid: false, message: 'Down payment must be between $0 and $10,000,000' };
  return { isValid: true };
}

export function validateDownPaymentPercent(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Down payment percentage must be a number' };
  if (value && (value < 0 || value > 100)) return { isValid: false, message: 'Down payment percentage must be between 0% and 100%' };
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Interest rate must be a number' };
  if (value < 1 || value > 20) return { isValid: false, message: 'Interest rate must be between 1% and 20%' };
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan term is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Loan term must be a number' };
  if (value < 1 || value > 50) return { isValid: false, message: 'Loan term must be between 1 and 50 years' };
  return { isValid: true };
}

export function validateMonthlyDebtPayments(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly debt payments must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Monthly debt payments must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateAnnualPropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Annual property taxes must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Annual property taxes must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateAnnualHomeownersInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Annual homeowners insurance must be a number' };
  if (value && (value < 0 || value > 50000)) return { isValid: false, message: 'Annual homeowners insurance must be between $0 and $50,000' };
  return { isValid: true };
}

export function validateMonthlyHoaFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly HOA fees must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Monthly HOA fees must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateMonthlyUtilities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly utilities must be a number' };
  if (value && (value < 0 || value > 2000)) return { isValid: false, message: 'Monthly utilities must be between $0 and $2,000' };
  return { isValid: true };
}

export function validateMonthlyMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly maintenance must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Monthly maintenance must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Credit score must be a number' };
  if (value && (value < 300 || value > 850)) return { isValid: false, message: 'Credit score must be between 300 and 850' };
  return { isValid: true };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Target DTI ratio must be a number' };
  if (value && (value < 20 || value > 50)) return { isValid: false, message: 'Target DTI ratio must be between 20% and 50%' };
  return { isValid: true };
}

export function validateFrontEndDTI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Front-end DTI must be a number' };
  if (value && (value < 20 || value > 40)) return { isValid: false, message: 'Front-end DTI must be between 20% and 40%' };
  return { isValid: true };
}

export function validateBackEndDTI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Back-end DTI must be a number' };
  if (value && (value < 25 || value > 50)) return { isValid: false, message: 'Back-end DTI must be between 25% and 50%' };
  return { isValid: true };
}

export function validatePropertyTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Property tax rate must be a number' };
  if (value && (value < 0 || value > 5)) return { isValid: false, message: 'Property tax rate must be between 0% and 5%' };
  return { isValid: true };
}

export function validateInsuranceRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Insurance rate must be a number' };
  if (value && (value < 0 || value > 2)) return { isValid: false, message: 'Insurance rate must be between 0% and 2%' };
  return { isValid: true };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'PMI rate must be a number' };
  if (value && (value < 0 || value > 2)) return { isValid: false, message: 'PMI rate must be between 0% and 2%' };
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Closing costs must be a number' };
  if (value && (value < 0 || value > 50000)) return { isValid: false, message: 'Closing costs must be between $0 and $50,000' };
  return { isValid: true };
}

export function validateClosingCostsPercent(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Closing costs percentage must be a number' };
  if (value && (value < 0 || value > 10)) return { isValid: false, message: 'Closing costs percentage must be between 0% and 10%' };
  return { isValid: true };
}

export function validateReserves(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Required reserves must be a number' };
  if (value && (value < 0 || value > 24)) return { isValid: false, message: 'Required reserves must be between 0 and 24 months' };
  return { isValid: true };
}

export function validateEmergencyFund(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Emergency fund must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Emergency fund must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inflation rate must be a number' };
  if (value && (value < 0 || value > 10)) return { isValid: false, message: 'Inflation rate must be between 0% and 10%' };
  return { isValid: true };
}

export function validateIncomeGrowthRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Income growth rate must be a number' };
  if (value && (value < 0 || value > 20)) return { isValid: false, message: 'Income growth rate must be between 0% and 20%' };
  return { isValid: true };
}

export function validateHomeAppreciationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Home appreciation rate must be a number' };
  if (value && (value < 0 || value > 15)) return { isValid: false, message: 'Home appreciation rate must be between 0% and 15%' };
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Tax rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan type is required' };
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!validLoanTypes.includes(value)) return { isValid: false, message: 'Invalid loan type. Must be one of: conventional, fha, va, usda' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'];
    if (!validPropertyTypes.includes(value)) return { isValid: false, message: 'Invalid property type. Must be one of: single-family, condo, townhouse, multi-family, manufactured' };
  }
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
    if (!validOccupancyTypes.includes(value)) return { isValid: false, message: 'Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property' };
  }
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validLocations = ['urban', 'suburban', 'rural'];
    if (!validLocations.includes(value)) return { isValid: false, message: 'Invalid location. Must be one of: urban, suburban, rural' };
  }
  return { isValid: true };
}

export function validateMarketType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validMarketTypes = ['hot', 'stable', 'declining'];
    if (!validMarketTypes.includes(value)) return { isValid: false, message: 'Invalid market type. Must be one of: hot, stable, declining' };
  }
  return { isValid: true };
}

export function validateAllHomeAffordabilityInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const annualIncomeResult = validateAnnualIncome(inputs.annualIncome);
  if (!annualIncomeResult.isValid) errors.push(annualIncomeResult.message!);

  const monthlyIncomeResult = validateMonthlyIncome(inputs.monthlyIncome);
  if (!monthlyIncomeResult.isValid) errors.push(monthlyIncomeResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const downPaymentPercentResult = validateDownPaymentPercent(inputs.downPaymentPercent);
  if (!downPaymentPercentResult.isValid) errors.push(downPaymentPercentResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const loanTermResult = validateLoanTerm(inputs.loanTerm);
  if (!loanTermResult.isValid) errors.push(loanTermResult.message!);

  const monthlyDebtPaymentsResult = validateMonthlyDebtPayments(inputs.monthlyDebtPayments);
  if (!monthlyDebtPaymentsResult.isValid) errors.push(monthlyDebtPaymentsResult.message!);

  const annualPropertyTaxesResult = validateAnnualPropertyTaxes(inputs.annualPropertyTaxes);
  if (!annualPropertyTaxesResult.isValid) errors.push(annualPropertyTaxesResult.message!);

  const annualHomeownersInsuranceResult = validateAnnualHomeownersInsurance(inputs.annualHomeownersInsurance);
  if (!annualHomeownersInsuranceResult.isValid) errors.push(annualHomeownersInsuranceResult.message!);

  const monthlyHoaFeesResult = validateMonthlyHoaFees(inputs.monthlyHoaFees);
  if (!monthlyHoaFeesResult.isValid) errors.push(monthlyHoaFeesResult.message!);

  const monthlyUtilitiesResult = validateMonthlyUtilities(inputs.monthlyUtilities);
  if (!monthlyUtilitiesResult.isValid) errors.push(monthlyUtilitiesResult.message!);

  const monthlyMaintenanceResult = validateMonthlyMaintenance(inputs.monthlyMaintenance);
  if (!monthlyMaintenanceResult.isValid) errors.push(monthlyMaintenanceResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const debtToIncomeRatioResult = validateDebtToIncomeRatio(inputs.debtToIncomeRatio);
  if (!debtToIncomeRatioResult.isValid) errors.push(debtToIncomeRatioResult.message!);

  const frontEndDTIResult = validateFrontEndDTI(inputs.frontEndDTI);
  if (!frontEndDTIResult.isValid) errors.push(frontEndDTIResult.message!);

  const backEndDTIResult = validateBackEndDTI(inputs.backEndDTI);
  if (!backEndDTIResult.isValid) errors.push(backEndDTIResult.message!);

  const propertyTaxRateResult = validatePropertyTaxRate(inputs.propertyTaxRate);
  if (!propertyTaxRateResult.isValid) errors.push(propertyTaxRateResult.message!);

  const insuranceRateResult = validateInsuranceRate(inputs.insuranceRate);
  if (!insuranceRateResult.isValid) errors.push(insuranceRateResult.message!);

  const pmiRateResult = validatePmiRate(inputs.pmiRate);
  if (!pmiRateResult.isValid) errors.push(pmiRateResult.message!);

  const closingCostsResult = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsResult.isValid) errors.push(closingCostsResult.message!);

  const closingCostsPercentResult = validateClosingCostsPercent(inputs.closingCostsPercent);
  if (!closingCostsPercentResult.isValid) errors.push(closingCostsPercentResult.message!);

  const reservesResult = validateReserves(inputs.reserves);
  if (!reservesResult.isValid) errors.push(reservesResult.message!);

  const emergencyFundResult = validateEmergencyFund(inputs.emergencyFund);
  if (!emergencyFundResult.isValid) errors.push(emergencyFundResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const incomeGrowthRateResult = validateIncomeGrowthRate(inputs.incomeGrowthRate);
  if (!incomeGrowthRateResult.isValid) errors.push(incomeGrowthRateResult.message!);

  const homeAppreciationRateResult = validateHomeAppreciationRate(inputs.homeAppreciationRate);
  if (!homeAppreciationRateResult.isValid) errors.push(homeAppreciationRateResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const loanTypeResult = validateLoanType(inputs.loanType);
  if (!loanTypeResult.isValid) errors.push(loanTypeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  // Logical relationship validation
  if (inputs.monthlyIncome && inputs.annualIncome) {
    const calculatedMonthlyIncome = inputs.annualIncome / 12;
    const difference = Math.abs(inputs.monthlyIncome - calculatedMonthlyIncome);
    if (difference > calculatedMonthlyIncome * 0.1) {
      errors.push('Monthly income should be approximately annual income divided by 12');
    }
  }

  if (inputs.frontEndDTI && inputs.backEndDTI && inputs.frontEndDTI > inputs.backEndDTI) {
    errors.push('Front-end DTI cannot exceed back-end DTI');
  }

  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.monthlyDebtPayments > inputs.monthlyIncome) {
    errors.push('Monthly debt payments cannot exceed monthly income');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
