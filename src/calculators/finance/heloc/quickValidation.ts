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

export function validateRequestedCreditLimit(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Requested credit limit is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Requested credit limit must be a number' };
  if (value < 1000 || value > 1000000) return { isValid: false, message: 'Requested credit limit must be between $1,000 and $1,000,000' };
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Interest rate must be a number' };
  if (value < 1 || value > 20) return { isValid: false, message: 'Interest rate must be between 1% and 20%' };
  return { isValid: true };
}

export function validateDrawPeriod(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Draw period is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Draw period must be a number' };
  if (value < 1 || value > 30) return { isValid: false, message: 'Draw period must be between 1 and 30 years' };
  return { isValid: true };
}

export function validateRepaymentPeriod(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Repayment period is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Repayment period must be a number' };
  if (value < 1 || value > 30) return { isValid: false, message: 'Repayment period must be between 1 and 30 years' };
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

export function validateAnnualFee(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Annual fee must be a number' };
  if (value && (value < 0 || value > 1000)) return { isValid: false, message: 'Annual fee must be between $0 and $1,000' };
  return { isValid: true };
}

export function validateOriginationFee(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Origination fee must be a number' };
  if (value && (value < 0 || value > 10000)) return { isValid: false, message: 'Origination fee must be between $0 and $10,000' };
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

export function validateEstimatedUsage(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Estimated usage must be a number' };
  if (value && (value < 0 || value > 100)) return { isValid: false, message: 'Estimated usage must be between 0% and 100%' };
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
  if (value && typeof value !== 'number') return { isValid: false, message: 'Property taxes must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Property taxes must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateHomeownersInsurance(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Homeowners insurance must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Homeowners insurance must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateHoaFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'HOA fees must be a number' };
  if (value && (value < 0 || value > 10000)) return { isValid: false, message: 'HOA fees must be between $0 and $10,000' };
  return { isValid: true };
}

export function validateMinimumPayment(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Minimum payment must be a number' };
  if (value && (value < 0.5 || value > 5)) return { isValid: false, message: 'Minimum payment must be between 0.5% and 5%' };
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

export function validateInactivityFee(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inactivity fee must be a number' };
  if (value && (value < 0 || value > 100)) return { isValid: false, message: 'Inactivity fee must be between $0 and $100' };
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
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validPropertyTypes = ['primary-residence', 'second-home', 'investment-property'];
  if (!validPropertyTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateOccupancyType(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Occupancy type is required' };
  const validOccupancyTypes = ['owner-occupied', 'non-owner-occupied'];
  if (!validOccupancyTypes.includes(value)) return { isValid: false, message: 'Invalid occupancy type' };
  return { isValid: true };
}

export function validatePropertyLocation(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property location is required' };
  const validPropertyLocations = ['urban', 'suburban', 'rural'];
  if (!validPropertyLocations.includes(value)) return { isValid: false, message: 'Invalid property location' };
  return { isValid: true };
}

export function validateMarketType(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Market type is required' };
  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (!validMarketTypes.includes(value)) return { isValid: false, message: 'Invalid market type' };
  return { isValid: true };
}

export function validatePurpose(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Purpose is required' };
  const validPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
  if (!validPurposes.includes(value)) return { isValid: false, message: 'Invalid purpose' };
  return { isValid: true };
}

export function validateAllHELOCInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const homeValueResult = validateHomeValue(inputs.homeValue);
  if (!homeValueResult.isValid) errors.push(homeValueResult.message!);

  const currentMortgageBalanceResult = validateCurrentMortgageBalance(inputs.currentMortgageBalance);
  if (!currentMortgageBalanceResult.isValid) errors.push(currentMortgageBalanceResult.message!);

  const requestedCreditLimitResult = validateRequestedCreditLimit(inputs.requestedCreditLimit);
  if (!requestedCreditLimitResult.isValid) errors.push(requestedCreditLimitResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const drawPeriodResult = validateDrawPeriod(inputs.drawPeriod);
  if (!drawPeriodResult.isValid) errors.push(drawPeriodResult.message!);

  const repaymentPeriodResult = validateRepaymentPeriod(inputs.repaymentPeriod);
  if (!repaymentPeriodResult.isValid) errors.push(repaymentPeriodResult.message!);

  const maxLTVResult = validateMaxLTV(inputs.maxLTV);
  if (!maxLTVResult.isValid) errors.push(maxLTVResult.message!);

  const maxCLTVResult = validateMaxCLTV(inputs.maxCLTV);
  if (!maxCLTVResult.isValid) errors.push(maxCLTVResult.message!);

  const annualFeeResult = validateAnnualFee(inputs.annualFee);
  if (!annualFeeResult.isValid) errors.push(annualFeeResult.message!);

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

  const estimatedUsageResult = validateEstimatedUsage(inputs.estimatedUsage);
  if (!estimatedUsageResult.isValid) errors.push(estimatedUsageResult.message!);

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

  const minimumPaymentResult = validateMinimumPayment(inputs.minimumPayment);
  if (!minimumPaymentResult.isValid) errors.push(minimumPaymentResult.message!);

  const prepaymentPenaltyResult = validatePrepaymentPenalty(inputs.prepaymentPenalty);
  if (!prepaymentPenaltyResult.isValid) errors.push(prepaymentPenaltyResult.message!);

  const lateFeesResult = validateLateFees(inputs.lateFees);
  if (!lateFeesResult.isValid) errors.push(lateFeesResult.message!);

  const inactivityFeeResult = validateInactivityFee(inputs.inactivityFee);
  if (!inactivityFeeResult.isValid) errors.push(inactivityFeeResult.message!);

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

  const purposeResult = validatePurpose(inputs.purpose);
  if (!purposeResult.isValid) errors.push(purposeResult.message!);

  // Logical relationship validation
  if (inputs.currentMortgageBalance && inputs.homeValue && inputs.currentMortgageBalance > inputs.homeValue) {
    errors.push('Current mortgage balance cannot exceed home value');
  }

  if (inputs.requestedCreditLimit && inputs.homeValue && inputs.currentMortgageBalance) {
    const availableEquity = inputs.homeValue - inputs.currentMortgageBalance;
    if (inputs.requestedCreditLimit > availableEquity) {
      errors.push('Requested credit limit cannot exceed available equity');
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
