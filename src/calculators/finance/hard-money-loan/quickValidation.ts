import { CalculatorInputs } from '../../../types/calculator';

export function validateLoanAmount(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan amount is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Loan amount must be a number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Loan amount must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validatePropertyValue(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Property value must be a number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Property value must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Interest rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Interest rate must be a number' };
  if (value < 5 || value > 25) return { isValid: false, message: 'Interest rate must be between 5% and 25%' };
  return { isValid: true };
}

export function validateLoanTerm(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan term is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Loan term must be a number' };
  if (value < 3 || value > 36) return { isValid: false, message: 'Loan term must be between 3 and 36 months' };
  return { isValid: true };
}

export function validatePoints(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Points are required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Points must be a number' };
  if (value < 0 || value > 10) return { isValid: false, message: 'Points must be between 0 and 10' };
  return { isValid: true };
}

export function validateDownPayment(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Down payment must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Down payment must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validateClosingCosts(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Closing costs must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Closing costs must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateRenovationBudget(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Renovation budget must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Renovation budget must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validateAfterRepairValue(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'After repair value must be a number' };
  if (value && (value < 10000 || value > 10000000)) return { isValid: false, message: 'After repair value must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateMonthlyExpenses(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Monthly expenses must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Monthly expenses must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateTimeline(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Timeline must be a number' };
  if (value && (value < 1 || value > 36)) return { isValid: false, message: 'Timeline must be between 1 and 36 months' };
  return { isValid: true };
}

export function validateBorrowerCredit(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Borrower credit score must be a number' };
  if (value && (value < 300 || value > 850)) return { isValid: false, message: 'Borrower credit score must be between 300 and 850' };
  return { isValid: true };
}

export function validatePrepaymentPenalty(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Prepayment penalty must be a number' };
  if (value && (value < 0 || value > 10)) return { isValid: false, message: 'Prepayment penalty must be between 0% and 10%' };
  return { isValid: true };
}

export function validateLateFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Late fees must be a number' };
  if (value && (value < 0 || value > 1000)) return { isValid: false, message: 'Late fees must be between $0 and $1,000' };
  return { isValid: true };
}

export function validateExtensionFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Extension fees must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Extension fees must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateAppraisalFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Appraisal fees must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Appraisal fees must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateTitleFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Title fees must be a number' };
  if (value && (value < 0 || value > 10000)) return { isValid: false, message: 'Title fees must be between $0 and $10,000' };
  return { isValid: true };
}

export function validateEscrowFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Escrow fees must be a number' };
  if (value && (value < 0 || value > 5000)) return { isValid: false, message: 'Escrow fees must be between $0 and $5,000' };
  return { isValid: true };
}

export function validateInspectionFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inspection fees must be a number' };
  if (value && (value < 0 || value > 2000)) return { isValid: false, message: 'Inspection fees must be between $0 and $2,000' };
  return { isValid: true };
}

export function validateProcessingFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Processing fees must be a number' };
  if (value && (value < 0 || value > 10000)) return { isValid: false, message: 'Processing fees must be between $0 and $10,000' };
  return { isValid: true };
}

export function validateWireFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Wire fees must be a number' };
  if (value && (value < 0 || value > 500)) return { isValid: false, message: 'Wire fees must be between $0 and $500' };
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
  const validPropertyTypes = ['single-family', 'multi-family', 'commercial', 'land', 'mixed-use', 'industrial'];
  if (!validPropertyTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateLoanPurpose(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan purpose is required' };
  const validLoanPurposes = ['purchase', 'refinance', 'fix-and-flip', 'construction', 'bridge', 'cash-out'];
  if (!validLoanPurposes.includes(value)) return { isValid: false, message: 'Invalid loan purpose' };
  return { isValid: true };
}

export function validatePropertyCondition(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property condition is required' };
  const validPropertyConditions = ['excellent', 'good', 'fair', 'poor', 'needs-repair'];
  if (!validPropertyConditions.includes(value)) return { isValid: false, message: 'Invalid property condition' };
  return { isValid: true };
}

export function validateLocation(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Location is required' };
  const validLocations = ['urban', 'suburban', 'rural'];
  if (!validLocations.includes(value)) return { isValid: false, message: 'Invalid location' };
  return { isValid: true };
}

export function validateMarketType(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Market type is required' };
  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (!validMarketTypes.includes(value)) return { isValid: false, message: 'Invalid market type' };
  return { isValid: true };
}

export function validateExitStrategy(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Exit strategy is required' };
  const validExitStrategies = ['sell', 'refinance', 'hold', 'flip'];
  if (!validExitStrategies.includes(value)) return { isValid: false, message: 'Invalid exit strategy' };
  return { isValid: true };
}

export function validateExperienceLevel(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validExperienceLevels = ['beginner', 'intermediate', 'experienced', 'professional'];
    if (!validExperienceLevels.includes(value)) return { isValid: false, message: 'Invalid experience level' };
  }
  return { isValid: true };
}

export function validateAllHardMoneyLoanInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const loanAmountResult = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountResult.isValid) errors.push(loanAmountResult.message!);

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const interestRateResult = validateInterestRate(inputs.interestRate);
  if (!interestRateResult.isValid) errors.push(interestRateResult.message!);

  const loanTermResult = validateLoanTerm(inputs.loanTerm);
  if (!loanTermResult.isValid) errors.push(loanTermResult.message!);

  const pointsResult = validatePoints(inputs.points);
  if (!pointsResult.isValid) errors.push(pointsResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const closingCostsResult = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsResult.isValid) errors.push(closingCostsResult.message!);

  const renovationBudgetResult = validateRenovationBudget(inputs.renovationBudget);
  if (!renovationBudgetResult.isValid) errors.push(renovationBudgetResult.message!);

  const afterRepairValueResult = validateAfterRepairValue(inputs.afterRepairValue);
  if (!afterRepairValueResult.isValid) errors.push(afterRepairValueResult.message!);

  const monthlyExpensesResult = validateMonthlyExpenses(inputs.monthlyExpenses);
  if (!monthlyExpensesResult.isValid) errors.push(monthlyExpensesResult.message!);

  const timelineResult = validateTimeline(inputs.timeline);
  if (!timelineResult.isValid) errors.push(timelineResult.message!);

  const borrowerCreditResult = validateBorrowerCredit(inputs.borrowerCredit);
  if (!borrowerCreditResult.isValid) errors.push(borrowerCreditResult.message!);

  const prepaymentPenaltyResult = validatePrepaymentPenalty(inputs.prepaymentPenalty);
  if (!prepaymentPenaltyResult.isValid) errors.push(prepaymentPenaltyResult.message!);

  const lateFeesResult = validateLateFees(inputs.lateFees);
  if (!lateFeesResult.isValid) errors.push(lateFeesResult.message!);

  const extensionFeesResult = validateExtensionFees(inputs.extensionFees);
  if (!extensionFeesResult.isValid) errors.push(extensionFeesResult.message!);

  const appraisalFeesResult = validateAppraisalFees(inputs.appraisalFees);
  if (!appraisalFeesResult.isValid) errors.push(appraisalFeesResult.message!);

  const titleFeesResult = validateTitleFees(inputs.titleFees);
  if (!titleFeesResult.isValid) errors.push(titleFeesResult.message!);

  const escrowFeesResult = validateEscrowFees(inputs.escrowFees);
  if (!escrowFeesResult.isValid) errors.push(escrowFeesResult.message!);

  const inspectionFeesResult = validateInspectionFees(inputs.inspectionFees);
  if (!inspectionFeesResult.isValid) errors.push(inspectionFeesResult.message!);

  const processingFeesResult = validateProcessingFees(inputs.processingFees);
  if (!processingFeesResult.isValid) errors.push(processingFeesResult.message!);

  const wireFeesResult = validateWireFees(inputs.wireFees);
  if (!wireFeesResult.isValid) errors.push(wireFeesResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const loanPurposeResult = validateLoanPurpose(inputs.loanPurpose);
  if (!loanPurposeResult.isValid) errors.push(loanPurposeResult.message!);

  const propertyConditionResult = validatePropertyCondition(inputs.propertyCondition);
  if (!propertyConditionResult.isValid) errors.push(propertyConditionResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  const exitStrategyResult = validateExitStrategy(inputs.exitStrategy);
  if (!exitStrategyResult.isValid) errors.push(exitStrategyResult.message!);

  const experienceLevelResult = validateExperienceLevel(inputs.experienceLevel);
  if (!experienceLevelResult.isValid) errors.push(experienceLevelResult.message!);

  // Logical relationship validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.afterRepairValue && inputs.propertyValue && inputs.afterRepairValue < inputs.propertyValue) {
    errors.push('After repair value should typically be higher than current property value');
  }

  if (inputs.timeline && inputs.loanTerm && inputs.timeline > inputs.loanTerm) {
    errors.push('Project timeline should not exceed loan term');
  }

  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
