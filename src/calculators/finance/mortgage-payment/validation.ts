import { ValidationRuleFactory } from '../../../utils/validationRuleFactory';
import { MortgagePaymentInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validateMortgagePaymentInputs(inputs: Partial<MortgagePaymentInputs>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  if (inputs.loanAmount !== undefined) {
    const loanAmountErrors = ValidationRuleFactory.required(inputs.loanAmount, 'Loan Amount');
    if (loanAmountErrors.length > 0) {
      errors.push(...loanAmountErrors.map(msg => ({ field: 'loanAmount', message: msg, severity: 'error' as const })));
    } else {
      const positiveErrors = ValidationRuleFactory.positive(inputs.loanAmount, 'Loan Amount');
      if (positiveErrors.length > 0) {
        errors.push(...positiveErrors.map(msg => ({ field: 'loanAmount', message: msg, severity: 'error' as const })));
      } else {
        const rangeErrors = ValidationRuleFactory.range(inputs.loanAmount, 'Loan Amount', 1000, 10000000);
        if (rangeErrors.length > 0) {
          errors.push(...rangeErrors.map(msg => ({ field: 'loanAmount', message: msg, severity: 'error' as const })));
        }
      }
    }
  }

  if (inputs.interestRate !== undefined) {
    const interestRateErrors = ValidationRuleFactory.required(inputs.interestRate, 'Interest Rate');
    if (interestRateErrors.length > 0) {
      errors.push(...interestRateErrors.map(msg => ({ field: 'interestRate', message: msg, severity: 'error' as const })));
    } else {
      const rangeErrors = ValidationRuleFactory.range(inputs.interestRate, 'Interest Rate', 0.1, 20);
      if (rangeErrors.length > 0) {
        errors.push(...rangeErrors.map(msg => ({ field: 'interestRate', message: msg, severity: 'error' as const })));
      }
    }
  }

  if (inputs.loanTerm !== undefined) {
    const loanTermErrors = ValidationRuleFactory.required(inputs.loanTerm, 'Loan Term');
    if (loanTermErrors.length > 0) {
      errors.push(...loanTermErrors.map(msg => ({ field: 'loanTerm', message: msg, severity: 'error' as const })));
    } else {
      const validTerms = ['10', '15', '20', '30', '40'];
      if (!validTerms.includes(inputs.loanTerm)) {
        errors.push({ field: 'loanTerm', message: 'Loan term must be 10, 15, 20, 30, or 40 years', severity: 'error' });
      }
    }
  }

  if (inputs.loanType !== undefined) {
    const loanTypeErrors = ValidationRuleFactory.required(inputs.loanType, 'Loan Type');
    if (loanTypeErrors.length > 0) {
      errors.push(...loanTypeErrors.map(msg => ({ field: 'loanType', message: msg, severity: 'error' as const })));
    } else {
      const validTypes = ['conventional', 'fha', 'va', 'usda'];
      if (!validTypes.includes(inputs.loanType)) {
        errors.push({ field: 'loanType', message: 'Loan type must be conventional, FHA, VA, or USDA', severity: 'error' });
      }
    }
  }

  if (inputs.paymentFrequency !== undefined) {
    const frequencyErrors = ValidationRuleFactory.required(inputs.paymentFrequency, 'Payment Frequency');
    if (frequencyErrors.length > 0) {
      errors.push(...frequencyErrors.map(msg => ({ field: 'paymentFrequency', message: msg, severity: 'error' as const })));
    } else {
      const validFrequencies = ['monthly', 'biweekly', 'weekly'];
      if (!validFrequencies.includes(inputs.paymentFrequency)) {
        errors.push({ field: 'paymentFrequency', message: 'Payment frequency must be monthly, biweekly, or weekly', severity: 'error' });
      }
    }
  }

  // Optional field validations
  if (inputs.propertyTax !== undefined && inputs.propertyTax !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.propertyTax, 'Property Tax', 0, 50000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'propertyTax', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.homeInsurance !== undefined && inputs.homeInsurance !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.homeInsurance, 'Home Insurance', 0, 10000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'homeInsurance', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.pmiRate !== undefined && inputs.pmiRate !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.pmiRate, 'PMI Rate', 0, 2);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'pmiRate', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.downPayment !== undefined && inputs.downPayment !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.downPayment, 'Down Payment', 0, 1000000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'downPayment', message: msg, severity: 'warning' as const })));
    }
  }

  // Business logic validations
  validateLoanTypeRequirements(inputs, errors);
  validateDownPaymentRequirements(inputs, errors);
  validatePMIRequirements(inputs, errors);
  validatePaymentReasonableness(inputs, errors);

  return errors;
}

/**
 * Validate loan type specific requirements
 */
function validateLoanTypeRequirements(inputs: Partial<MortgagePaymentInputs>, errors: ValidationError[]): void {
  if (inputs.loanType && inputs.downPayment !== undefined && inputs.loanAmount !== undefined) {
    const downPaymentPercent = inputs.downPayment > 0 ? 
      (inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100 : 0;

    switch (inputs.loanType) {
      case 'fha':
        if (downPaymentPercent < 3.5) {
          errors.push({
            field: 'downPayment',
            message: 'FHA loans require a minimum 3.5% down payment',
            severity: 'error'
          });
        }
        break;
      case 'va':
        if (downPaymentPercent > 0) {
          errors.push({
            field: 'downPayment',
            message: 'VA loans typically require 0% down payment',
            severity: 'warning'
          });
        }
        break;
      case 'usda':
        if (downPaymentPercent > 0) {
          errors.push({
            field: 'downPayment',
            message: 'USDA loans typically require 0% down payment',
            severity: 'warning'
          });
        }
        break;
    }
  }
}

/**
 * Validate down payment requirements
 */
function validateDownPaymentRequirements(inputs: Partial<MortgagePaymentInputs>, errors: ValidationError[]): void {
  if (inputs.downPayment !== undefined && inputs.loanAmount !== undefined) {
    const downPaymentPercent = inputs.downPayment > 0 ? 
      (inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100 : 0;

    if (downPaymentPercent > 50) {
      errors.push({
        field: 'downPayment',
        message: 'Down payment is unusually high. Consider if this is correct.',
        severity: 'warning'
      });
    }

    if (downPaymentPercent < 3.5 && inputs.loanType !== 'va' && inputs.loanType !== 'usda') {
      errors.push({
        field: 'downPayment',
        message: 'Down payment below 3.5% may not be available for conventional loans',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate PMI requirements
 */
function validatePMIRequirements(inputs: Partial<MortgagePaymentInputs>, errors: ValidationError[]): void {
  if (inputs.downPayment !== undefined && inputs.loanAmount !== undefined && inputs.pmiRate !== undefined) {
    const downPaymentPercent = inputs.downPayment > 0 ? 
      (inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100 : 0;

    if (downPaymentPercent >= 20 && inputs.pmiRate > 0) {
      errors.push({
        field: 'pmiRate',
        message: 'PMI is not required with 20% or more down payment',
        severity: 'warning'
      });
    }

    if (downPaymentPercent < 20 && inputs.pmiRate === 0) {
      errors.push({
        field: 'pmiRate',
        message: 'PMI may be required with less than 20% down payment',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate payment reasonableness
 */
function validatePaymentReasonableness(inputs: Partial<MortgagePaymentInputs>, errors: ValidationError[]): void {
  if (inputs.loanAmount !== undefined && inputs.interestRate !== undefined && inputs.loanTerm) {
    const termYears = parseInt(inputs.loanTerm);
    const monthlyRate = (inputs.interestRate / 100) / 12;
    const totalPayments = termYears * 12;
    
    // Calculate estimated monthly payment
    let estimatedPayment: number;
    if (monthlyRate === 0) {
      estimatedPayment = inputs.loanAmount / totalPayments;
    } else {
      estimatedPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    // Add estimated taxes and insurance
    const estimatedTaxes = (inputs.propertyTax || 0) / 12;
    const estimatedInsurance = (inputs.homeInsurance || 0) / 12;
    const estimatedPMI = inputs.pmiRate && inputs.pmiRate > 0 ? 
      (inputs.loanAmount * (inputs.pmiRate / 100)) / 12 : 0;
    
    const totalEstimatedPayment = estimatedPayment + estimatedTaxes + estimatedInsurance + estimatedPMI;

    // Check if payment is reasonable (between 0.5% and 2% of loan amount)
    const paymentPercent = (totalEstimatedPayment / inputs.loanAmount) * 100;
    
    if (paymentPercent < 0.5) {
      errors.push({
        field: 'interestRate',
        message: 'Monthly payment seems unusually low. Please verify interest rate and loan terms.',
        severity: 'warning'
      });
    }

    if (paymentPercent > 2) {
      errors.push({
        field: 'interestRate',
        message: 'Monthly payment seems unusually high. Please verify interest rate and loan terms.',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate cross-field dependencies
 */
export function validateCrossFieldDependencies(inputs: Partial<MortgagePaymentInputs>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate that down payment + loan amount relationship makes sense
  if (inputs.downPayment !== undefined && inputs.loanAmount !== undefined) {
    if (inputs.downPayment >= inputs.loanAmount) {
      errors.push({
        field: 'downPayment',
        message: 'Down payment should be less than loan amount',
        severity: 'error'
      });
    }
  }

  // Validate loan type and down payment compatibility
  if (inputs.loanType && inputs.downPayment !== undefined && inputs.loanAmount !== undefined) {
    const downPaymentPercent = inputs.downPayment > 0 ? 
      (inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100 : 0;

    if (inputs.loanType === 'conventional' && downPaymentPercent < 3) {
      errors.push({
        field: 'loanType',
        message: 'Conventional loans typically require at least 3% down payment',
        severity: 'warning'
      });
    }
  }

  return errors;
}