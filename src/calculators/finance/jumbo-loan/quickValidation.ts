import { CalculatorInputs } from '../../../types/calculator';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan amount is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 548250) return { isValid: false, message: 'Must be at least $548,250 for jumbo loans' };
  if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 0.1 || value > 20) return { isValid: false, message: 'Must be between 0.1% and 20%' };
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan term is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 5 || value > 50) return { isValid: false, message: 'Must be between 5 and 50 years' };
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Down payment is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 100000 || value > 20000000)) return { isValid: false, message: 'Must be between $100,000 and $20,000,000' };
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 50000 || value > 5000000)) return { isValid: false, message: 'Must be between $50,000 and $5,000,000' };
  return { isValid: true };
}

export function validateMonthlyDebts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 300 || value > 850)) return { isValid: false, message: 'Must be between 300 and 850' };
  return { isValid: true };
}

export function validateReserves(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  return { isValid: true };
}

export function validateARMPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 1 || value > 30)) return { isValid: false, message: 'Must be between 1 and 30 years' };
  return { isValid: true };
}

export function validatePoints(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 5) return { isValid: false, message: 'Must be 5 or less' };
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validateHomeInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  return { isValid: true };
}

export function validatePMI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 1000) return { isValid: false, message: 'Must be $1,000 or less' };
  return { isValid: true };
}

export function validateHOAFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 2000) return { isValid: false, message: 'Must be $2,000 or less' };
  return { isValid: true };
}

export function validateYearsEmployed(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 50) return { isValid: false, message: 'Must be 50 or less' };
  return { isValid: true };
}

export function validateLiquidAssets(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  return { isValid: true };
}

export function validateInvestmentAssets(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  return { isValid: true };
}

export function validateTargetDTI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 20 || value > 50)) return { isValid: false, message: 'Must be between 20% and 50%' };
  return { isValid: true };
}

export function validateTargetLTV(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 50 || value > 95)) return { isValid: false, message: 'Must be between 50% and 95%' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Investment Property'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Primary Residence', 'Second Home', 'Investment Property'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Fixed Rate', 'Adjustable Rate', 'Interest Only', 'Hybrid ARM'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateIncomeVerification(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Full Documentation', 'Stated Income', 'Bank Statement', 'Asset Depletion'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateEmploymentType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['W-2 Employee', 'Self-Employed', 'Business Owner', 'Retired', 'Other'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateMarketConditions(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Favorable', 'Normal', 'Tight', 'Very Tight'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateLenderType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Traditional Bank', 'Credit Union', 'Mortgage Banker', 'Portfolio Lender', 'Private Lender'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateAllJumboLoanInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const loanAmountResult = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountResult.isValid) errors.push(loanAmountResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const loanTermResult = validateLoanTerm(inputs.loanTerm);
  if (!loanTermResult.isValid) errors.push(loanTermResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const annualIncomeResult = validateAnnualIncome(inputs.annualIncome);
  if (!annualIncomeResult.isValid) errors.push(annualIncomeResult.message!);

  const monthlyDebtsResult = validateMonthlyDebts(inputs.monthlyDebts);
  if (!monthlyDebtsResult.isValid) errors.push(monthlyDebtsResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const reservesResult = validateReserves(inputs.reserves);
  if (!reservesResult.isValid) errors.push(reservesResult.message!);

  const armPeriodResult = validateARMPeriod(inputs.armPeriod);
  if (!armPeriodResult.isValid) errors.push(armPeriodResult.message!);

  const pointsResult = validatePoints(inputs.points);
  if (!pointsResult.isValid) errors.push(pointsResult.message!);

  const closingCostsResult = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsResult.isValid) errors.push(closingCostsResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const homeInsuranceResult = validateHomeInsurance(inputs.homeInsurance);
  if (!homeInsuranceResult.isValid) errors.push(homeInsuranceResult.message!);

  const pmiResult = validatePMI(inputs.pmi);
  if (!pmiResult.isValid) errors.push(pmiResult.message!);

  const hoaFeesResult = validateHOAFees(inputs.hoaFees);
  if (!hoaFeesResult.isValid) errors.push(hoaFeesResult.message!);

  const yearsEmployedResult = validateYearsEmployed(inputs.yearsEmployed);
  if (!yearsEmployedResult.isValid) errors.push(yearsEmployedResult.message!);

  const liquidAssetsResult = validateLiquidAssets(inputs.liquidAssets);
  if (!liquidAssetsResult.isValid) errors.push(liquidAssetsResult.message!);

  const investmentAssetsResult = validateInvestmentAssets(inputs.investmentAssets);
  if (!investmentAssetsResult.isValid) errors.push(investmentAssetsResult.message!);

  const targetDTIResult = validateTargetDTI(inputs.debtToIncomeRatio);
  if (!targetDTIResult.isValid) errors.push(targetDTIResult.message!);

  const targetLTVResult = validateTargetLTV(inputs.loanToValueRatio);
  if (!targetLTVResult.isValid) errors.push(targetLTVResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const loanTypeResult = validateLoanType(inputs.loanType);
  if (!loanTypeResult.isValid) errors.push(loanTypeResult.message!);

  const incomeVerificationResult = validateIncomeVerification(inputs.incomeVerification);
  if (!incomeVerificationResult.isValid) errors.push(incomeVerificationResult.message!);

  const employmentTypeResult = validateEmploymentType(inputs.employmentType);
  if (!employmentTypeResult.isValid) errors.push(employmentTypeResult.message!);

  const marketConditionsResult = validateMarketConditions(inputs.marketConditions);
  if (!marketConditionsResult.isValid) errors.push(marketConditionsResult.message!);

  const lenderTypeResult = validateLenderType(inputs.lenderType);
  if (!lenderTypeResult.isValid) errors.push(lenderTypeResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
