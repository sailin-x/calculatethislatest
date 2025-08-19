import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgagePointsInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validate mortgage points inputs
 */
export function validateMortgagePointsInputs(inputs: MortgagePointsInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  const loanAmountErrors = ValidationRuleFactory.required(inputs.loanAmount, 'Loan Amount');
  if (loanAmountErrors.length > 0) {
    errors.push({ field: 'loanAmount', message: loanAmountErrors[0], severity: 'error' });
  }

  const originalRateErrors = ValidationRuleFactory.required(inputs.originalRate, 'Original Interest Rate');
  if (originalRateErrors.length > 0) {
    errors.push({ field: 'originalRate', message: originalRateErrors[0], severity: 'error' });
  }

  const pointsToBuyErrors = ValidationRuleFactory.required(inputs.pointsToBuy, 'Points to Buy');
  if (pointsToBuyErrors.length > 0) {
    errors.push({ field: 'pointsToBuy', message: pointsToBuyErrors[0], severity: 'error' });
  }

  const rateReductionErrors = ValidationRuleFactory.required(inputs.rateReduction, 'Rate Reduction per Point');
  if (rateReductionErrors.length > 0) {
    errors.push({ field: 'rateReduction', message: rateReductionErrors[0], severity: 'error' });
  }

  const loanTermErrors = ValidationRuleFactory.required(inputs.loanTerm, 'Loan Term');
  if (loanTermErrors.length > 0) {
    errors.push({ field: 'loanTerm', message: loanTermErrors[0], severity: 'error' });
  }

  // Range validations
  const loanAmountRangeErrors = ValidationRuleFactory.range(inputs.loanAmount, 'Loan Amount', 10000, 10000000);
  if (loanAmountRangeErrors.length > 0) {
    errors.push({ field: 'loanAmount', message: loanAmountRangeErrors[0], severity: 'error' });
  }

  const originalRateRangeErrors = ValidationRuleFactory.range(inputs.originalRate, 'Original Interest Rate', 0.1, 20);
  if (originalRateRangeErrors.length > 0) {
    errors.push({ field: 'originalRate', message: originalRateRangeErrors[0], severity: 'error' });
  }

  const pointsToBuyRangeErrors = ValidationRuleFactory.range(inputs.pointsToBuy, 'Points to Buy', 0, 5);
  if (pointsToBuyRangeErrors.length > 0) {
    errors.push({ field: 'pointsToBuy', message: pointsToBuyRangeErrors[0], severity: 'error' });
  }

  const rateReductionRangeErrors = ValidationRuleFactory.range(inputs.rateReduction, 'Rate Reduction per Point', 0.125, 0.5);
  if (rateReductionRangeErrors.length > 0) {
    errors.push({ field: 'rateReduction', message: rateReductionRangeErrors[0], severity: 'error' });
  }

  const loanTermRangeErrors = ValidationRuleFactory.range(inputs.loanTerm, 'Loan Term', 1, 50);
  if (loanTermRangeErrors.length > 0) {
    errors.push({ field: 'loanTerm', message: loanTermRangeErrors[0], severity: 'error' });
  }

  // Positive validations
  const loanAmountPositiveErrors = ValidationRuleFactory.positive(inputs.loanAmount, 'Loan Amount');
  if (loanAmountPositiveErrors.length > 0) {
    errors.push({ field: 'loanAmount', message: loanAmountPositiveErrors[0], severity: 'error' });
  }

  const originalRatePositiveErrors = ValidationRuleFactory.positive(inputs.originalRate, 'Original Interest Rate');
  if (originalRatePositiveErrors.length > 0) {
    errors.push({ field: 'originalRate', message: originalRatePositiveErrors[0], severity: 'error' });
  }

  const rateReductionPositiveErrors = ValidationRuleFactory.positive(inputs.rateReduction, 'Rate Reduction per Point');
  if (rateReductionPositiveErrors.length > 0) {
    errors.push({ field: 'rateReduction', message: rateReductionPositiveErrors[0], severity: 'error' });
  }

  const loanTermPositiveErrors = ValidationRuleFactory.positive(inputs.loanTerm, 'Loan Term');
  if (loanTermPositiveErrors.length > 0) {
    errors.push({ field: 'loanTerm', message: loanTermPositiveErrors[0], severity: 'error' });
  }

  // Non-negative validations for optional fields
  if (inputs.taxRate !== undefined && inputs.taxRate !== null) {
    const taxRateRangeErrors = ValidationRuleFactory.range(inputs.taxRate, 'Tax Rate', 0, 50);
    if (taxRateRangeErrors.length > 0) {
      errors.push({ field: 'taxRate', message: taxRateRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.investmentReturn !== undefined && inputs.investmentReturn !== null) {
    const investmentReturnRangeErrors = ValidationRuleFactory.range(inputs.investmentReturn, 'Investment Return', 0, 20);
    if (investmentReturnRangeErrors.length > 0) {
      errors.push({ field: 'investmentReturn', message: investmentReturnRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate !== null) {
    const inflationRateRangeErrors = ValidationRuleFactory.range(inputs.inflationRate, 'Inflation Rate', 0, 10);
    if (inflationRateRangeErrors.length > 0) {
      errors.push({ field: 'inflationRate', message: inflationRateRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.plannedOwnershipYears !== undefined && inputs.plannedOwnershipYears !== null) {
    const plannedOwnershipRangeErrors = ValidationRuleFactory.range(inputs.plannedOwnershipYears, 'Planned Ownership', 1, 50);
    if (plannedOwnershipRangeErrors.length > 0) {
      errors.push({ field: 'plannedOwnershipYears', message: plannedOwnershipRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts !== null) {
    const closingCostsNonNegativeErrors = ValidationRuleFactory.nonNegative(inputs.closingCosts, 'Closing Costs');
    if (closingCostsNonNegativeErrors.length > 0) {
      errors.push({ field: 'closingCosts', message: closingCostsNonNegativeErrors[0], severity: 'error' });
    }

    const closingCostsRangeErrors = ValidationRuleFactory.range(inputs.closingCosts, 'Closing Costs', 0, 50000);
    if (closingCostsRangeErrors.length > 0) {
      errors.push({ field: 'closingCosts', message: closingCostsRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.propertyValue !== undefined && inputs.propertyValue !== null) {
    const propertyValuePositiveErrors = ValidationRuleFactory.positive(inputs.propertyValue, 'Property Value');
    if (propertyValuePositiveErrors.length > 0) {
      errors.push({ field: 'propertyValue', message: propertyValuePositiveErrors[0], severity: 'error' });
    }

    const propertyValueRangeErrors = ValidationRuleFactory.range(inputs.propertyValue, 'Property Value', 1000, 10000000);
    if (propertyValueRangeErrors.length > 0) {
      errors.push({ field: 'propertyValue', message: propertyValueRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.downPayment !== undefined && inputs.downPayment !== null) {
    const downPaymentNonNegativeErrors = ValidationRuleFactory.nonNegative(inputs.downPayment, 'Down Payment');
    if (downPaymentNonNegativeErrors.length > 0) {
      errors.push({ field: 'downPayment', message: downPaymentNonNegativeErrors[0], severity: 'error' });
    }

    const downPaymentRangeErrors = ValidationRuleFactory.range(inputs.downPayment, 'Down Payment', 0, 1000000);
    if (downPaymentRangeErrors.length > 0) {
      errors.push({ field: 'downPayment', message: downPaymentRangeErrors[0], severity: 'error' });
    }
  }

  // Cross-field validations
  const crossFieldErrors = validateCrossFieldDependencies(inputs);
  errors.push(...crossFieldErrors);

  return errors;
}

/**
 * Validate cross-field dependencies
 */
function validateCrossFieldDependencies(inputs: MortgagePointsInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // New rate cannot be negative
  const newRate = inputs.originalRate - (inputs.pointsToBuy * inputs.rateReduction);
  if (newRate < 0) {
    errors.push({
      field: 'pointsToBuy',
      message: 'Points purchase would result in negative interest rate',
      severity: 'error'
    });
  }

  // New rate should be reasonable
  if (newRate < 0.1) {
    errors.push({
      field: 'pointsToBuy',
      message: 'Points purchase would result in extremely low interest rate',
      severity: 'warning'
    });
  }

  // Points cost should not exceed loan amount
  const pointsCost = inputs.loanAmount * (inputs.pointsToBuy / 100);
  if (pointsCost > inputs.loanAmount) {
    errors.push({
      field: 'pointsToBuy',
      message: 'Points cost cannot exceed loan amount',
      severity: 'error'
    });
  }

  // Points cost should be reasonable compared to loan amount
  const pointsCostPercent = (pointsCost / inputs.loanAmount) * 100;
  if (pointsCostPercent > 5) {
    errors.push({
      field: 'pointsToBuy',
      message: 'Points cost is unusually high relative to loan amount',
      severity: 'warning'
    });
  }

  // Down payment should not exceed property value
  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment > inputs.propertyValue) {
    errors.push({
      field: 'downPayment',
      message: 'Down payment cannot exceed property value',
      severity: 'error'
    });
  }

  // Loan amount should not exceed property value
  if (inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push({
      field: 'loanAmount',
      message: 'Loan amount cannot exceed property value',
      severity: 'error'
    });
  }

  // Planned ownership should not exceed loan term
  if (inputs.plannedOwnershipYears && inputs.plannedOwnershipYears > inputs.loanTerm) {
    errors.push({
      field: 'plannedOwnershipYears',
      message: 'Planned ownership period cannot exceed loan term',
      severity: 'warning'
    });
  }

  // Rate reduction should be reasonable for the original rate
  const rateReductionPercent = (inputs.rateReduction / inputs.originalRate) * 100;
  if (rateReductionPercent > 20) {
    errors.push({
      field: 'rateReduction',
      message: 'Rate reduction per point seems unusually high',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * Validate business logic rules
 */
function validateBusinessLogic(inputs: MortgagePointsInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if points purchase makes sense financially
  const newRate = inputs.originalRate - (inputs.pointsToBuy * inputs.rateReduction);
  const pointsCost = inputs.loanAmount * (inputs.pointsToBuy / 100);
  const monthlyPaymentOriginal = calculateMonthlyPayment(inputs.loanAmount, inputs.originalRate, inputs.loanTerm);
  const monthlyPaymentNew = calculateMonthlyPayment(inputs.loanAmount, newRate, inputs.loanTerm);
  const monthlySavings = monthlyPaymentOriginal - monthlyPaymentNew;
  const breakEvenMonths = pointsCost / monthlySavings;

  // Break-even should be reasonable
  if (breakEvenMonths > inputs.loanTerm * 12) {
    errors.push({
      field: 'pointsToBuy',
      message: 'Points will not pay for themselves during the loan term',
      severity: 'warning'
    });
  }

  // Check if investment alternative is better
  if (inputs.investmentReturn && inputs.investmentReturn > inputs.originalRate) {
    errors.push({
      field: 'investmentReturn',
      message: 'Consider investing instead of buying points',
      severity: 'info'
    });
  }

  // Check if planned ownership period affects decision
  if (inputs.plannedOwnershipYears && breakEvenMonths > inputs.plannedOwnershipYears * 12) {
    errors.push({
      field: 'plannedOwnershipYears',
      message: 'Points may not pay for themselves during planned ownership period',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * Calculate monthly mortgage payment (helper function)
 */
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return payment;
}