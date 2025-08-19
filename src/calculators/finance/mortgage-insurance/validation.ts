import { ValidationRuleFactory } from '../../../utils/validationRuleFactory';
import { MortgageInsuranceInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validateMortgageInsuranceInputs(inputs: Partial<MortgageInsuranceInputs>): ValidationError[] {
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

  if (inputs.propertyValue !== undefined) {
    const propertyValueErrors = ValidationRuleFactory.required(inputs.propertyValue, 'Property Value');
    if (propertyValueErrors.length > 0) {
      errors.push(...propertyValueErrors.map(msg => ({ field: 'propertyValue', message: msg, severity: 'error' as const })));
    } else {
      const positiveErrors = ValidationRuleFactory.positive(inputs.propertyValue, 'Property Value');
      if (positiveErrors.length > 0) {
        errors.push(...positiveErrors.map(msg => ({ field: 'propertyValue', message: msg, severity: 'error' as const })));
      } else {
        const rangeErrors = ValidationRuleFactory.range(inputs.propertyValue, 'Property Value', 1000, 10000000);
        if (rangeErrors.length > 0) {
          errors.push(...rangeErrors.map(msg => ({ field: 'propertyValue', message: msg, severity: 'error' as const })));
        }
      }
    }
  }

  if (inputs.downPayment !== undefined) {
    const downPaymentErrors = ValidationRuleFactory.required(inputs.downPayment, 'Down Payment');
    if (downPaymentErrors.length > 0) {
      errors.push(...downPaymentErrors.map(msg => ({ field: 'downPayment', message: msg, severity: 'error' as const })));
    } else {
      const rangeErrors = ValidationRuleFactory.range(inputs.downPayment, 'Down Payment', 0, 1000000);
      if (rangeErrors.length > 0) {
        errors.push(...rangeErrors.map(msg => ({ field: 'downPayment', message: msg, severity: 'error' as const })));
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

  if (inputs.occupancyType !== undefined) {
    const occupancyErrors = ValidationRuleFactory.required(inputs.occupancyType, 'Occupancy Type');
    if (occupancyErrors.length > 0) {
      errors.push(...occupancyErrors.map(msg => ({ field: 'occupancyType', message: msg, severity: 'error' as const })));
    } else {
      const validTypes = ['primary', 'secondary', 'investment'];
      if (!validTypes.includes(inputs.occupancyType)) {
        errors.push({ field: 'occupancyType', message: 'Occupancy type must be primary, secondary, or investment', severity: 'error' });
      }
    }
  }

  if (inputs.loanTerm !== undefined) {
    const loanTermErrors = ValidationRuleFactory.required(inputs.loanTerm, 'Loan Term');
    if (loanTermErrors.length > 0) {
      errors.push(...loanTermErrors.map(msg => ({ field: 'loanTerm', message: msg, severity: 'error' as const })));
    } else {
      const validTerms = ['15', '30'];
      if (!validTerms.includes(inputs.loanTerm)) {
        errors.push({ field: 'loanTerm', message: 'Loan term must be 15 or 30 years', severity: 'error' });
      }
    }
  }

  // Optional field validations
  if (inputs.creditScore !== undefined && inputs.creditScore !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.creditScore, 'Credit Score', 300, 850);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'creditScore', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.pmiRate !== undefined && inputs.pmiRate !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.pmiRate, 'PMI Rate', 0.1, 2);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'pmiRate', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.mipRate !== undefined && inputs.mipRate !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.mipRate, 'MIP Rate', 0.45, 1.75);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'mipRate', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.fundingFee !== undefined && inputs.fundingFee !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.fundingFee, 'VA Funding Fee', 0, 3.6);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'fundingFee', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.guaranteeFee !== undefined && inputs.guaranteeFee !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.guaranteeFee, 'USDA Guarantee Fee', 0, 2);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'guaranteeFee', message: msg, severity: 'warning' as const })));
    }
  }

  // Business logic validations
  validateLoanTypeRequirements(inputs, errors);
  validateDownPaymentRequirements(inputs, errors);
  validatePropertyValueRequirements(inputs, errors);
  validateInsuranceRateRequirements(inputs, errors);

  return errors;
}

/**
 * Validate loan type specific requirements
 */
function validateLoanTypeRequirements(inputs: Partial<MortgageInsuranceInputs>, errors: ValidationError[]): void {
  if (inputs.loanType && inputs.downPayment !== undefined && inputs.propertyValue !== undefined) {
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;

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
function validateDownPaymentRequirements(inputs: Partial<MortgageInsuranceInputs>, errors: ValidationError[]): void {
  if (inputs.downPayment !== undefined && inputs.propertyValue !== undefined) {
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;

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
 * Validate property value requirements
 */
function validatePropertyValueRequirements(inputs: Partial<MortgageInsuranceInputs>, errors: ValidationError[]): void {
  if (inputs.propertyValue !== undefined && inputs.loanAmount !== undefined && inputs.downPayment !== undefined) {
    const totalCost = inputs.loanAmount + inputs.downPayment;
    
    if (inputs.propertyValue < totalCost) {
      errors.push({
        field: 'propertyValue',
        message: 'Property value should be greater than or equal to loan amount plus down payment',
        severity: 'error'
      });
    }

    if (inputs.propertyValue > totalCost * 1.5) {
      errors.push({
        field: 'propertyValue',
        message: 'Property value seems unusually high compared to purchase price',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate insurance rate requirements
 */
function validateInsuranceRateRequirements(inputs: Partial<MortgageInsuranceInputs>, errors: ValidationError[]): void {
  if (inputs.loanType === 'conventional' && inputs.pmiRate !== undefined && inputs.pmiRate !== null) {
    if (inputs.pmiRate < 0.1) {
      errors.push({
        field: 'pmiRate',
        message: 'PMI rate below 0.1% is unusually low. Verify this rate.',
        severity: 'warning'
      });
    }

    if (inputs.pmiRate > 1.5) {
      errors.push({
        field: 'pmiRate',
        message: 'PMI rate above 1.5% is unusually high. Verify this rate.',
        severity: 'warning'
      });
    }
  }

  if (inputs.loanType === 'fha' && inputs.mipRate !== undefined && inputs.mipRate !== null) {
    if (inputs.mipRate < 0.45) {
      errors.push({
        field: 'mipRate',
        message: 'MIP rate below 0.45% is unusually low. Verify this rate.',
        severity: 'warning'
      });
    }

    if (inputs.mipRate > 1.75) {
      errors.push({
        field: 'mipRate',
        message: 'MIP rate above 1.75% is unusually high. Verify this rate.',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate cross-field dependencies
 */
export function validateCrossFieldDependencies(inputs: Partial<MortgageInsuranceInputs>): ValidationError[] {
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

  // Validate property value vs loan amount relationship
  if (inputs.propertyValue !== undefined && inputs.loanAmount !== undefined) {
    if (inputs.loanAmount > inputs.propertyValue) {
      errors.push({
        field: 'loanAmount',
        message: 'Loan amount cannot exceed property value',
        severity: 'error'
      });
    }
  }

  // Validate credit score requirements for different loan types
  if (inputs.loanType && inputs.creditScore !== undefined && inputs.creditScore !== null) {
    switch (inputs.loanType) {
      case 'conventional':
        if (inputs.creditScore < 620) {
          errors.push({
            field: 'creditScore',
            message: 'Conventional loans typically require a credit score of 620 or higher',
            severity: 'error'
          });
        }
        break;
      case 'fha':
        if (inputs.creditScore < 580) {
          errors.push({
            field: 'creditScore',
            message: 'FHA loans typically require a credit score of 580 or higher',
            severity: 'error'
          });
        }
        break;
      case 'va':
        if (inputs.creditScore < 620) {
          errors.push({
            field: 'creditScore',
            message: 'VA loans typically require a credit score of 620 or higher',
            severity: 'error'
          });
        }
        break;
      case 'usda':
        if (inputs.creditScore < 640) {
          errors.push({
            field: 'creditScore',
            message: 'USDA loans typically require a credit score of 640 or higher',
            severity: 'error'
          });
        }
        break;
    }
  }

  return errors;
}

/**
 * Validate LTV ratio requirements
 */
export function validateLTVRequirements(inputs: Partial<MortgageInsuranceInputs>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (inputs.loanAmount !== undefined && inputs.propertyValue !== undefined) {
    const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;

    if (ltvRatio > 100) {
      errors.push({
        field: 'loanAmount',
        message: 'Loan-to-value ratio cannot exceed 100%',
        severity: 'error'
      });
    }

    if (ltvRatio > 97 && inputs.loanType === 'conventional') {
      errors.push({
        field: 'loanAmount',
        message: 'Conventional loans typically have a maximum LTV of 97%',
        severity: 'error'
      });
    }

    if (ltvRatio > 96.5 && inputs.loanType === 'fha') {
      errors.push({
        field: 'loanAmount',
        message: 'FHA loans typically have a maximum LTV of 96.5%',
        severity: 'error'
      });
    }
  }

  return errors;
}