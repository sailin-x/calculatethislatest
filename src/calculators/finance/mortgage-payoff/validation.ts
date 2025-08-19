import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgagePayoffInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validate mortgage payoff inputs
 */
export function validateMortgagePayoffInputs(inputs: MortgagePayoffInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  const currentBalanceErrors = ValidationRuleFactory.required(inputs.currentBalance, 'Current Balance');
  if (currentBalanceErrors.length > 0) {
    errors.push({ field: 'currentBalance', message: currentBalanceErrors[0], severity: 'error' });
  }

  const interestRateErrors = ValidationRuleFactory.required(inputs.interestRate, 'Interest Rate');
  if (interestRateErrors.length > 0) {
    errors.push({ field: 'interestRate', message: interestRateErrors[0], severity: 'error' });
  }

  const remainingTermErrors = ValidationRuleFactory.required(inputs.remainingTerm, 'Remaining Term');
  if (remainingTermErrors.length > 0) {
    errors.push({ field: 'remainingTerm', message: remainingTermErrors[0], severity: 'error' });
  }

  const monthlyPaymentErrors = ValidationRuleFactory.required(inputs.monthlyPayment, 'Monthly Payment');
  if (monthlyPaymentErrors.length > 0) {
    errors.push({ field: 'monthlyPayment', message: monthlyPaymentErrors[0], severity: 'error' });
  }

  const payoffStrategyErrors = ValidationRuleFactory.required(inputs.payoffStrategy, 'Payoff Strategy');
  if (payoffStrategyErrors.length > 0) {
    errors.push({ field: 'payoffStrategy', message: payoffStrategyErrors[0], severity: 'error' });
  }

  // Range validations
  const currentBalanceRangeErrors = ValidationRuleFactory.range(inputs.currentBalance, 'Current Balance', 1000, 10000000);
  if (currentBalanceRangeErrors.length > 0) {
    errors.push({ field: 'currentBalance', message: currentBalanceRangeErrors[0], severity: 'error' });
  }

  const interestRateRangeErrors = ValidationRuleFactory.range(inputs.interestRate, 'Interest Rate', 0.1, 20);
  if (interestRateRangeErrors.length > 0) {
    errors.push({ field: 'interestRate', message: interestRateRangeErrors[0], severity: 'error' });
  }

  const remainingTermRangeErrors = ValidationRuleFactory.range(inputs.remainingTerm, 'Remaining Term', 1, 50);
  if (remainingTermRangeErrors.length > 0) {
    errors.push({ field: 'remainingTerm', message: remainingTermRangeErrors[0], severity: 'error' });
  }

  const monthlyPaymentRangeErrors = ValidationRuleFactory.range(inputs.monthlyPayment, 'Monthly Payment', 100, 50000);
  if (monthlyPaymentRangeErrors.length > 0) {
    errors.push({ field: 'monthlyPayment', message: monthlyPaymentRangeErrors[0], severity: 'error' });
  }

  // Positive validations
  const currentBalancePositiveErrors = ValidationRuleFactory.positive(inputs.currentBalance, 'Current Balance');
  if (currentBalancePositiveErrors.length > 0) {
    errors.push({ field: 'currentBalance', message: currentBalancePositiveErrors[0], severity: 'error' });
  }

  const interestRatePositiveErrors = ValidationRuleFactory.positive(inputs.interestRate, 'Interest Rate');
  if (interestRatePositiveErrors.length > 0) {
    errors.push({ field: 'interestRate', message: interestRatePositiveErrors[0], severity: 'error' });
  }

  const remainingTermPositiveErrors = ValidationRuleFactory.positive(inputs.remainingTerm, 'Remaining Term');
  if (remainingTermPositiveErrors.length > 0) {
    errors.push({ field: 'remainingTerm', message: remainingTermPositiveErrors[0], severity: 'error' });
  }

  const monthlyPaymentPositiveErrors = ValidationRuleFactory.positive(inputs.monthlyPayment, 'Monthly Payment');
  if (monthlyPaymentPositiveErrors.length > 0) {
    errors.push({ field: 'monthlyPayment', message: monthlyPaymentPositiveErrors[0], severity: 'error' });
  }

  // Non-negative validations for optional fields
  if (inputs.extraPayment !== undefined && inputs.extraPayment !== null) {
    const extraPaymentNonNegativeErrors = ValidationRuleFactory.nonNegative(inputs.extraPayment, 'Extra Payment');
    if (extraPaymentNonNegativeErrors.length > 0) {
      errors.push({ field: 'extraPayment', message: extraPaymentNonNegativeErrors[0], severity: 'error' });
    }

    const extraPaymentRangeErrors = ValidationRuleFactory.range(inputs.extraPayment, 'Extra Payment', 0, 10000);
    if (extraPaymentRangeErrors.length > 0) {
      errors.push({ field: 'extraPayment', message: extraPaymentRangeErrors[0], severity: 'error' });
    }
  }

  if (inputs.lumpSumPayment !== undefined && inputs.lumpSumPayment !== null) {
    const lumpSumNonNegativeErrors = ValidationRuleFactory.nonNegative(inputs.lumpSumPayment, 'Lump Sum Payment');
    if (lumpSumNonNegativeErrors.length > 0) {
      errors.push({ field: 'lumpSumPayment', message: lumpSumNonNegativeErrors[0], severity: 'error' });
    }

    const lumpSumRangeErrors = ValidationRuleFactory.range(inputs.lumpSumPayment, 'Lump Sum Payment', 0, 1000000);
    if (lumpSumRangeErrors.length > 0) {
      errors.push({ field: 'lumpSumPayment', message: lumpSumRangeErrors[0], severity: 'error' });
    }
  }

  // Payoff strategy validation
  const validStrategies = ['standard', 'extra-monthly', 'lump-sum', 'biweekly', 'custom'];
  if (inputs.payoffStrategy && !validStrategies.includes(inputs.payoffStrategy)) {
    errors.push({
      field: 'payoffStrategy',
      message: 'Payoff strategy must be standard, extra-monthly, lump-sum, biweekly, or custom',
      severity: 'error'
    });
  }

  // Optional field validations
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

  // Cross-field validations
  const crossFieldErrors = validateCrossFieldDependencies(inputs);
  errors.push(...crossFieldErrors);

  return errors;
}

/**
 * Validate cross-field dependencies
 */
function validateCrossFieldDependencies(inputs: MortgagePayoffInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Lump sum payment cannot exceed current balance
  if (inputs.lumpSumPayment && inputs.lumpSumPayment > inputs.currentBalance) {
    errors.push({
      field: 'lumpSumPayment',
      message: 'Lump sum payment cannot exceed current mortgage balance',
      severity: 'error'
    });
  }

  // Extra payment should not exceed monthly payment significantly
  if (inputs.extraPayment && inputs.extraPayment > inputs.monthlyPayment * 2) {
    errors.push({
      field: 'extraPayment',
      message: 'Extra payment is unusually high compared to monthly payment',
      severity: 'warning'
    });
  }

  // Monthly payment should be reasonable for the balance and term
  if (inputs.monthlyPayment && inputs.currentBalance && inputs.remainingTerm) {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalMonths = inputs.remainingTerm * 12;
    const calculatedPayment = inputs.currentBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const paymentDifference = Math.abs(inputs.monthlyPayment - calculatedPayment);
    const paymentTolerance = calculatedPayment * 0.1; // 10% tolerance
    
    if (paymentDifference > paymentTolerance) {
      errors.push({
        field: 'monthlyPayment',
        message: 'Monthly payment seems inconsistent with balance, rate, and term',
        severity: 'warning'
      });
    }
  }

  // Property value should be reasonable compared to mortgage balance
  if (inputs.propertyValue && inputs.currentBalance) {
    const ltvRatio = (inputs.currentBalance / inputs.propertyValue) * 100;
    
    if (ltvRatio > 100) {
      errors.push({
        field: 'propertyValue',
        message: 'Property value is less than mortgage balance',
        severity: 'error'
      });
    } else if (ltvRatio > 95) {
      errors.push({
        field: 'propertyValue',
        message: 'Very high loan-to-value ratio',
        severity: 'warning'
      });
    }
  }

  // Target payoff date should be reasonable
  if (inputs.targetPayoffDate) {
    const targetDate = new Date(inputs.targetPayoffDate);
    const currentDate = new Date();
    const yearsToTarget = (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    if (yearsToTarget < 0) {
      errors.push({
        field: 'targetPayoffDate',
        message: 'Target payoff date is in the past',
        severity: 'error'
      });
    } else if (yearsToTarget > inputs.remainingTerm) {
      errors.push({
        field: 'targetPayoffDate',
        message: 'Target payoff date is beyond current mortgage term',
        severity: 'warning'
      });
    }
  }

  return errors;
}

/**
 * Validate payoff strategy requirements
 */
function validatePayoffStrategyRequirements(inputs: MortgagePayoffInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (inputs.payoffStrategy) {
    case 'extra-monthly':
      if (!inputs.extraPayment || inputs.extraPayment <= 0) {
        errors.push({
          field: 'extraPayment',
          message: 'Extra monthly payment is required for extra-monthly strategy',
          severity: 'error'
        });
      }
      break;

    case 'lump-sum':
      if (!inputs.lumpSumPayment || inputs.lumpSumPayment <= 0) {
        errors.push({
          field: 'lumpSumPayment',
          message: 'Lump sum payment is required for lump-sum strategy',
          severity: 'error'
        });
      }
      break;

    case 'custom':
      if ((!inputs.extraPayment || inputs.extraPayment <= 0) && 
          (!inputs.lumpSumPayment || inputs.lumpSumPayment <= 0)) {
        errors.push({
          field: 'payoffStrategy',
          message: 'Custom strategy requires either extra payment or lump sum payment',
          severity: 'error'
        });
      }
      break;
  }

  return errors;
}

/**
 * Validate business logic rules
 */
function validateBusinessLogic(inputs: MortgagePayoffInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if payoff strategy makes sense financially
  if (inputs.investmentReturn && inputs.interestRate) {
    if (inputs.investmentReturn > inputs.interestRate * 1.5) {
      errors.push({
        field: 'payoffStrategy',
        message: 'Consider investing instead of paying off mortgage early',
        severity: 'info'
      });
    }
  }

  // Check if extra payment is affordable
  if (inputs.extraPayment && inputs.monthlyPayment) {
    const totalPayment = inputs.monthlyPayment + inputs.extraPayment;
    if (totalPayment > inputs.monthlyPayment * 1.5) {
      errors.push({
        field: 'extraPayment',
        message: 'Ensure you can afford the increased monthly payment',
        severity: 'warning'
      });
    }
  }

  return errors;
}