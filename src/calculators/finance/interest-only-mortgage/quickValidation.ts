import { CalculatorInputs } from '../../../types/calculator';

export function validateLoanAmount(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan amount is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 0.1 || value > 20) return { isValid: false, message: 'Must be between 0.1% and 20%' };
  return { isValid: true };
}

export function validateInterestOnlyPeriod(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest-only period is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1 || value > 30) return { isValid: false, message: 'Must be between 1 and 30 years' };
  return { isValid: true };
}

export function validateTotalLoanTerm(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total loan term is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 5 || value > 50) return { isValid: false, message: 'Must be between 5 and 50 years' };
  return { isValid: true };
}

export function validatePropertyValue(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 10000 || value > 20000000) return { isValid: false, message: 'Must be between $10,000 and $20,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  }
  return { isValid: true };
}

export function validateDownPaymentPercentage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100) return { isValid: false, message: 'Must be 100% or less' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  }
  return { isValid: true };
}

export function validatePropertyTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10% or less' };
  }
  return { isValid: true };
}

export function validateHomeownersInsurance(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  }
  return { isValid: true };
}

export function validateInsuranceRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5) return { isValid: false, message: 'Must be 5% or less' };
  }
  return { isValid: true };
}

export function validatePMI(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000) return { isValid: false, message: 'Must be $10,000 or less' };
  }
  return { isValid: true };
}

export function validatePMIRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5) return { isValid: false, message: 'Must be 5% or less' };
  }
  return { isValid: true };
}

export function validateHOAFees(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less' };
  }
  return { isValid: true };
}

export function validateUtilities(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 2000) return { isValid: false, message: 'Must be $2,000 or less' };
  }
  return { isValid: true };
}

export function validateMaintenance(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less' };
  }
  return { isValid: true };
}

export function validateAppreciationRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number') return { isValid: false, message: 'Must be a number' };
    if (value < -10 || value > 20) return { isValid: false, message: 'Must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateIncomeTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50) return { isValid: false, message: 'Must be 50% or less' };
  }
  return { isValid: true };
}

export function validateAlternativeInvestmentReturn(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateRefinanceRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 0.1 || value > 20) return { isValid: false, message: 'Must be between 0.1% and 20%' };
  }
  return { isValid: true };
}

export function validateRefinanceCosts(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  }
  return { isValid: true };
}

export function validateSellingCosts(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 15) return { isValid: false, message: 'Must be 15% or less' };
  }
  return { isValid: true };
}

export function validateExitStrategy(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validStrategies = ['refinance', 'sell', 'pay-off', 'extend'];
    if (!validStrategies.includes(value)) return { isValid: false, message: 'Invalid exit strategy' };
  }
  return { isValid: true };
}

export function validateRiskTolerance(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validTolerances = ['conservative', 'moderate', 'aggressive'];
    if (!validTolerances.includes(value)) return { isValid: false, message: 'Invalid risk tolerance' };
  }
  return { isValid: true };
}

export function validateInvestmentHorizon(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 50) return { isValid: false, message: 'Must be between 1 and 50 years' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1000 || value > 1000000) return { isValid: false, message: 'Must be between $1,000 and $1,000,000' };
  }
  return { isValid: true };
}

export function validateMonthlyDebts(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  }
  return { isValid: true };
}

export function validateEmergencyFund(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 1000000) return { isValid: false, message: 'Must be $1,000,000 or less' };
  }
  return { isValid: true };
}

export function validateCreditScore(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 300 || value > 850) return { isValid: false, message: 'Must be between 300 and 850' };
  }
  return { isValid: true };
}

export function validateLoanType(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validTypes = ['fixed-rate', 'adjustable-rate', 'hybrid-arm'];
    if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid loan type' };
  }
  return { isValid: true };
}

export function validateARMIndex(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateARMMargin(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10% or less' };
  }
  return { isValid: true };
}

export function validateARMAdjustmentPeriod(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 60) return { isValid: false, message: 'Must be between 1 and 60 months' };
  }
  return { isValid: true };
}

export function validateARMCaps(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validCaps = ['1-1-5', '2-2-5', '5-2-5', 'no-caps'];
    if (!validCaps.includes(value)) return { isValid: false, message: 'Invalid ARM caps' };
  }
  return { isValid: true };
}

export function validatePrepaymentPenalty(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10% or less' };
  }
  return { isValid: true };
}

export function validatePrepaymentPenaltyPeriod(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10 years or less' };
  }
  return { isValid: true };
}

export function validateLenderFees(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  }
  return { isValid: true };
}

export function validateTitleInsurance(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000) return { isValid: false, message: 'Must be $10,000 or less' };
  }
  return { isValid: true };
}

export function validateAppraisalFee(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less' };
  }
  return { isValid: true };
}

export function validateEscrowAccount(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validAccounts = ['yes', 'no', 'optional'];
    if (!validAccounts.includes(value)) return { isValid: false, message: 'Invalid escrow account option' };
  }
  return { isValid: true };
}

export function validateEscrowAmount(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  }
  return { isValid: true };
}

export function validateAllInterestOnlyMortgageInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const loanAmountResult = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountResult.isValid) errors.push(loanAmountResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const interestOnlyPeriodResult = validateInterestOnlyPeriod(inputs.interestOnlyPeriod);
  if (!interestOnlyPeriodResult.isValid) errors.push(interestOnlyPeriodResult.message!);

  const totalLoanTermResult = validateTotalLoanTerm(inputs.totalLoanTerm);
  if (!totalLoanTermResult.isValid) errors.push(totalLoanTermResult.message!);

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const downPaymentPercentageResult = validateDownPaymentPercentage(inputs.downPaymentPercentage);
  if (!downPaymentPercentageResult.isValid) errors.push(downPaymentPercentageResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const propertyTaxRateResult = validatePropertyTaxRate(inputs.propertyTaxRate);
  if (!propertyTaxRateResult.isValid) errors.push(propertyTaxRateResult.message!);

  const homeownersInsuranceResult = validateHomeownersInsurance(inputs.homeownersInsurance);
  if (!homeownersInsuranceResult.isValid) errors.push(homeownersInsuranceResult.message!);

  const insuranceRateResult = validateInsuranceRate(inputs.insuranceRate);
  if (!insuranceRateResult.isValid) errors.push(insuranceRateResult.message!);

  const pmiResult = validatePMI(inputs.pmi);
  if (!pmiResult.isValid) errors.push(pmiResult.message!);

  const pmiRateResult = validatePMIRate(inputs.pmiRate);
  if (!pmiRateResult.isValid) errors.push(pmiRateResult.message!);

  const hoaFeesResult = validateHOAFees(inputs.hoaFees);
  if (!hoaFeesResult.isValid) errors.push(hoaFeesResult.message!);

  const utilitiesResult = validateUtilities(inputs.utilities);
  if (!utilitiesResult.isValid) errors.push(utilitiesResult.message!);

  const maintenanceResult = validateMaintenance(inputs.maintenance);
  if (!maintenanceResult.isValid) errors.push(maintenanceResult.message!);

  const appreciationRateResult = validateAppreciationRate(inputs.appreciationRate);
  if (!appreciationRateResult.isValid) errors.push(appreciationRateResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const incomeTaxRateResult = validateIncomeTaxRate(inputs.incomeTaxRate);
  if (!incomeTaxRateResult.isValid) errors.push(incomeTaxRateResult.message!);

  const alternativeInvestmentReturnResult = validateAlternativeInvestmentReturn(inputs.alternativeInvestmentReturn);
  if (!alternativeInvestmentReturnResult.isValid) errors.push(alternativeInvestmentReturnResult.message!);

  const refinanceRateResult = validateRefinanceRate(inputs.refinanceRate);
  if (!refinanceRateResult.isValid) errors.push(refinanceRateResult.message!);

  const refinanceCostsResult = validateRefinanceCosts(inputs.refinanceCosts);
  if (!refinanceCostsResult.isValid) errors.push(refinanceCostsResult.message!);

  const sellingCostsResult = validateSellingCosts(inputs.sellingCosts);
  if (!sellingCostsResult.isValid) errors.push(sellingCostsResult.message!);

  const exitStrategyResult = validateExitStrategy(inputs.exitStrategy);
  if (!exitStrategyResult.isValid) errors.push(exitStrategyResult.message!);

  const riskToleranceResult = validateRiskTolerance(inputs.riskTolerance);
  if (!riskToleranceResult.isValid) errors.push(riskToleranceResult.message!);

  const investmentHorizonResult = validateInvestmentHorizon(inputs.investmentHorizon);
  if (!investmentHorizonResult.isValid) errors.push(investmentHorizonResult.message!);

  const monthlyIncomeResult = validateMonthlyIncome(inputs.monthlyIncome);
  if (!monthlyIncomeResult.isValid) errors.push(monthlyIncomeResult.message!);

  const monthlyDebtsResult = validateMonthlyDebts(inputs.monthlyDebts);
  if (!monthlyDebtsResult.isValid) errors.push(monthlyDebtsResult.message!);

  const emergencyFundResult = validateEmergencyFund(inputs.emergencyFund);
  if (!emergencyFundResult.isValid) errors.push(emergencyFundResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const loanTypeResult = validateLoanType(inputs.loanType);
  if (!loanTypeResult.isValid) errors.push(loanTypeResult.message!);

  const armIndexResult = validateARMIndex(inputs.armIndex);
  if (!armIndexResult.isValid) errors.push(armIndexResult.message!);

  const armMarginResult = validateARMMargin(inputs.armMargin);
  if (!armMarginResult.isValid) errors.push(armMarginResult.message!);

  const armAdjustmentPeriodResult = validateARMAdjustmentPeriod(inputs.armAdjustmentPeriod);
  if (!armAdjustmentPeriodResult.isValid) errors.push(armAdjustmentPeriodResult.message!);

  const armCapsResult = validateARMCaps(inputs.armCaps);
  if (!armCapsResult.isValid) errors.push(armCapsResult.message!);

  const prepaymentPenaltyResult = validatePrepaymentPenalty(inputs.prepaymentPenalty);
  if (!prepaymentPenaltyResult.isValid) errors.push(prepaymentPenaltyResult.message!);

  const prepaymentPenaltyPeriodResult = validatePrepaymentPenaltyPeriod(inputs.prepaymentPenaltyPeriod);
  if (!prepaymentPenaltyPeriodResult.isValid) errors.push(prepaymentPenaltyPeriodResult.message!);

  const lenderFeesResult = validateLenderFees(inputs.lenderFees);
  if (!lenderFeesResult.isValid) errors.push(lenderFeesResult.message!);

  const titleInsuranceResult = validateTitleInsurance(inputs.titleInsurance);
  if (!titleInsuranceResult.isValid) errors.push(titleInsuranceResult.message!);

  const appraisalFeeResult = validateAppraisalFee(inputs.appraisalFee);
  if (!appraisalFeeResult.isValid) errors.push(appraisalFeeResult.message!);

  const escrowAccountResult = validateEscrowAccount(inputs.escrowAccount);
  if (!escrowAccountResult.isValid) errors.push(escrowAccountResult.message!);

  const escrowAmountResult = validateEscrowAmount(inputs.escrowAmount);
  if (!escrowAmountResult.isValid) errors.push(escrowAmountResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
