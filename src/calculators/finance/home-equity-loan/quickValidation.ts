import { CalculatorInputs } from '../../../types/calculator';

export function validateHomeValue(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Home value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Home value must be a number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Home value must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateCurrentMortgageBalance(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Current mortgage balance is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Current mortgage balance must be a number' };
  if (value < 0 || value > 10000000) return { isValid: false, message: 'Current mortgage balance must be between $0 and $10,000,000' };
  return { isValid: true };
}

export function validateLoanAmount(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan amount is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Loan amount must be a number' };
  if (value < 1000 || value > 1000000) return { isValid: false, message: 'Loan amount must be between $1,000 and $1,000,000' };
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Interest rate must be a number' };
  if (value < 1 || value > 20) return { isValid: false, message: 'Interest rate must be between 1% and 20%' };
  return { isValid: true };
}

export function validateLoanTerm(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan term is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Loan term must be a number' };
  if (value < 1 || value > 30) return { isValid: false, message: 'Loan term must be between 1 and 30 years' };
  return { isValid: true };
}

export function validateMaxLTV(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Maximum LTV must be a number' };
  if (value && (value < 50 || value > 95)) return { isValid: false, message: 'Maximum LTV must be between 50% and 95%' };
  return { isValid: true };
}

export function validateMaxCLTV(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Maximum CLTV must be a number' };
  if (value && (value < 50 || value > 95)) return { isValid: false, message: 'Maximum CLTV must be between 50% and 95%' };
  return { isValid: true };
}

export function validateOriginationFee(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Origination fee must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Origination fee must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateAppraisalFee(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Appraisal fee must be a number' };
  if (value && (value < 0 || value > 1000)) return { isValid: false, message: 'Appraisal fee must be between $0 and $1,000' };
  return { isValid: true };
}

export function validateTitleFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Title fees must be a number' };
  if (value && (value < 0 || value > 2000)) return { isValid: false, message: 'Title fees must be between $0 and $2,000' };
  return { isValid: true };
}

export function validateClosingCosts(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Closing costs must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Closing costs must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateCreditScore(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Credit score must be a number' };
  if (value && (value < 300 || value > 850)) return { isValid: false, message: 'Credit score must be between 300 and 850' };
  return { isValid: true };
}

export function validateDebtToIncomeRatio(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Debt-to-income ratio must be a number' };
  if (value && (value < 0 || value > 100)) return { isValid: false, message: 'Debt-to-income ratio must be between 0% and 100%' };
  return { isValid: true };
}

export function validateMonthlyIncome(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly income must be a number' };
  if (value && (value < 1000 || value > 1000000)) return { isValid: false, message: 'Monthly income must be between $1,000 and $1,000,000' };
  return { isValid: true };
}

export function validateMonthlyDebtPayments(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly debt payments must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Monthly debt payments must be between $0 and $100,000' };
  return { isValid: true };
}

export function validatePropertyTaxes(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Annual property taxes must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Annual property taxes must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateHomeownersInsurance(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Annual homeowners insurance must be a number' };
  if (value && (value < 0 || value > 50000)) return { isValid: false, message: 'Annual homeowners insurance must be between $0 and $50,000' };
  return { isValid: true };
}

export function validateHoaFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly HOA fees must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Monthly HOA fees must be between $0 and $5,000' };
  return { isValid: true };
}

export function validatePrepaymentPenalty(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Prepayment penalty must be a number' };
  if (value && (value < 0 || value > 5)) return { isValid: false, message: 'Prepayment penalty must be between 0% and 5%' };
  return { isValid: true };
}

export function validateLateFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Late fees must be a number' };
  if (value && (value < 0 || value > 100)) return { isValid: false, message: 'Late fees must be between $0 and $100' };
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Tax rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateInflationRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inflation rate must be a number' };
  if (value && (value < 0 || value > 10)) return { isValid: false, message: 'Inflation rate must be between 0% and 10%' };
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family'];
    if (!validPropertyTypes.includes(value)) return { isValid: false, message: 'Invalid property type. Must be one of: single-family, condo, townhouse, multi-family' };
  }
  return { isValid: true };
}

export function validateOccupancyType(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
    if (!validOccupancyTypes.includes(value)) return { isValid: false, message: 'Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property' };
  }
  return { isValid: true };
}

export function validatePropertyLocation(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validPropertyLocations = ['urban', 'suburban', 'rural'];
    if (!validPropertyLocations.includes(value)) return { isValid: false, message: 'Invalid property location. Must be one of: urban, suburban, rural' };
  }
  return { isValid: true };
}

export function validateMarketType(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validMarketTypes = ['hot', 'stable', 'declining'];
    if (!validMarketTypes.includes(value)) return { isValid: false, message: 'Invalid market type. Must be one of: hot, stable, declining' };
  }
  return { isValid: true };
}

export function validateLoanPurpose(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validLoanPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
    if (!validLoanPurposes.includes(value)) return { isValid: false, message: 'Invalid loan purpose. Must be one of: home-improvement, debt-consolidation, education, emergency-fund, investment, other' };
  }
  return { isValid: true };
}

export function validateAllHomeEquityLoanInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const homeValueResult = validateHomeValue(inputs.homeValue);
  if (!homeValueResult.isValid) errors.push(homeValueResult.message!);

  const currentMortgageBalanceResult = validateCurrentMortgageBalance(inputs.currentMortgageBalance);
  if (!currentMortgageBalanceResult.isValid) errors.push(currentMortgageBalanceResult.message!);

  const loanAmountResult = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountResult.isValid) errors.push(loanAmountResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const loanTermResult = validateLoanTerm(inputs.loanTerm);
  if (!loanTermResult.isValid) errors.push(loanTermResult.message!);

  const maxLTVResult = validateMaxLTV(inputs.maxLTV);
  if (!maxLTVResult.isValid) errors.push(maxLTVResult.message!);

  const maxCLTVResult = validateMaxCLTV(inputs.maxCLTV);
  if (!maxCLTVResult.isValid) errors.push(maxCLTVResult.message!);

  const originationFeeResult = validateOriginationFee(inputs.originationFee);
  if (!originationFeeResult.isValid) errors.push(originationFeeResult.message!);

  const appraisalFeeResult = validateAppraisalFee(inputs.appraisalFee);
  if (!appraisalFeeResult.isValid) errors.push(appraisalFeeResult.message!);

  const titleFeesResult = validateTitleFees(inputs.titleFees);
  if (!titleFeesResult.isValid) errors.push(titleFeesResult.message!);

  const closingCostsResult = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsResult.isValid) errors.push(closingCostsResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const debtToIncomeRatioResult = validateDebtToIncomeRatio(inputs.debtToIncomeRatio);
  if (!debtToIncomeRatioResult.isValid) errors.push(debtToIncomeRatioResult.message!);

  const monthlyIncomeResult = validateMonthlyIncome(inputs.monthlyIncome);
  if (!monthlyIncomeResult.isValid) errors.push(monthlyIncomeResult.message!);

  const monthlyDebtPaymentsResult = validateMonthlyDebtPayments(inputs.monthlyDebtPayments);
  if (!monthlyDebtPaymentsResult.isValid) errors.push(monthlyDebtPaymentsResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const homeownersInsuranceResult = validateHomeownersInsurance(inputs.homeownersInsurance);
  if (!homeownersInsuranceResult.isValid) errors.push(homeownersInsuranceResult.message!);

  const hoaFeesResult = validateHoaFees(inputs.hoaFees);
  if (!hoaFeesResult.isValid) errors.push(hoaFeesResult.message!);

  const prepaymentPenaltyResult = validatePrepaymentPenalty(inputs.prepaymentPenalty);
  if (!prepaymentPenaltyResult.isValid) errors.push(prepaymentPenaltyResult.message!);

  const lateFeesResult = validateLateFees(inputs.lateFees);
  if (!lateFeesResult.isValid) errors.push(lateFeesResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const propertyLocationResult = validatePropertyLocation(inputs.propertyLocation);
  if (!propertyLocationResult.isValid) errors.push(propertyLocationResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  const loanPurposeResult = validateLoanPurpose(inputs.loanPurpose);
  if (!loanPurposeResult.isValid) errors.push(loanPurposeResult.message!);

  // Logical relationship validation
  if (inputs.currentMortgageBalance && inputs.homeValue && inputs.currentMortgageBalance > inputs.homeValue) {
    errors.push('Current mortgage balance cannot exceed home value');
  }

  if (inputs.loanAmount && inputs.homeValue && inputs.currentMortgageBalance) {
    const availableEquity = inputs.homeValue - inputs.currentMortgageBalance;
    if (inputs.loanAmount > availableEquity) {
      errors.push('Loan amount cannot exceed available equity');
    }
  }

  if (inputs.maxLTV && inputs.maxCLTV && inputs.maxLTV > inputs.maxCLTV) {
    errors.push('Maximum LTV cannot exceed maximum CLTV');
  }

  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.monthlyDebtPayments > inputs.monthlyIncome) {
    errors.push('Monthly debt payments cannot exceed monthly income');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
