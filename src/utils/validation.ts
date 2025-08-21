import { ValidationRule } from '../types/calculator';

/**
 * Common validation rule factories for calculator inputs
 */
export class ValidationRuleFactory {
  /**
   * Create a required field validation rule
   */
  static required(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'required',
      message: customMessage || `${field} is required`,
      validator: (value, allInputs) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'number') return !isNaN(value);
        return Boolean(value);
      }
    };
  }

  /**
   * Create a numeric range validation rule
   */
  static range(field: string, min?: number, max?: number, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'range',
      message: customMessage || `${field} must be between ${min || 'any'} and ${max || 'any'}`,
      validator: (value, allInputs) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return false;
        if (min !== undefined && num < min) return false;
        if (max !== undefined && num > max) return false;
        return true;
      }
    };
  }

  /**
   * Create a positive number validation rule
   */
  static positive(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'range',
      message: customMessage || `${field} must be positive`,
      validator: (value, allInputs) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return !isNaN(num) && num > 0;
      }
    };
  }

  /**
   * Create a non-negative number validation rule
   */
  static nonNegative(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'range',
      message: customMessage || `${field} cannot be negative`,
      validator: (value, allInputs) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return !isNaN(num) && num >= 0;
      }
    };
  }

  /**
   * Create a percentage validation rule (0-100)
   */
  static percentage(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'range',
      message: customMessage || `${field} must be between 0 and 100`,
      validator: (value, allInputs) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return !isNaN(num) && num >= 0 && num <= 100;
      }
    };
  }

  /**
   * Create an email format validation rule
   */
  static email(field: string, customMessage?: string): ValidationRule {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      field,
      type: 'format',
      message: customMessage || `${field} must be a valid email address`,
      validator: (value, allInputs) => {
        if (typeof value !== 'string') return false;
        return emailRegex.test(value);
      }
    };
  }

  /**
   * Create a date validation rule
   */
  static date(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'format',
      message: customMessage || `${field} must be a valid date`,
      validator: (value, allInputs) => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }
    };
  }

  /**
   * Create a future date validation rule
   */
  static futureDate(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'business',
      message: customMessage || `${field} must be in the future`,
      validator: (value, allInputs) => {
        if (!value) return false;
        const date = new Date(value);
        const now = new Date();
        return !isNaN(date.getTime()) && date > now;
      }
    };
  }

  /**
   * Create a past date validation rule
   */
  static pastDate(field: string, customMessage?: string): ValidationRule {
    return {
      field,
      type: 'business',
      message: customMessage || `${field} must be in the past`,
      validator: (value, allInputs) => {
        if (!value) return false;
        const date = new Date(value);
        const now = new Date();
        return !isNaN(date.getTime()) && date < now;
      }
    };
  }

  /**
   * Create a cross-field validation rule (e.g., end date after start date)
   */
  static crossField(
    field: string,
    dependentField: string,
    validator: (value: any, dependentValue: any) => boolean,
    customMessage?: string
  ): ValidationRule {
    return {
      field,
      type: 'cross-field',
      message: customMessage || `${field} validation failed`,
      validator: (value, allInputs) => {
        if (!allInputs) return true;
        const dependentValue = allInputs[dependentField];
        return validator(value, dependentValue);
      }
    };
  }

  /**
   * Create a business rule validation (e.g., loan-to-value ratio limits)
   */
  static businessRule(
    field: string,
    validator: (value: any, allInputs?: Record<string, any>) => boolean,
    customMessage?: string
  ): ValidationRule {
    return {
      field,
      type: 'business',
      message: customMessage || `${field} violates business rules`,
      validator
    };
  }
}

/**
 * Common validation patterns for financial calculators
 */
export class FinancialValidation {
  /**
   * Validate loan-to-value ratio
   */
  static loanToValue(loanAmountField: string, homeValueField: string, maxLTV: number = 0.95): ValidationRule {
    return ValidationRuleFactory.businessRule(
      loanAmountField,
      (loanAmount, allInputs) => {
        if (!allInputs) return true;
        const homeValue = allInputs[homeValueField];
        if (!homeValue || homeValue <= 0) return true;
        const ltv = loanAmount / homeValue;
        return ltv <= maxLTV;
      },
      `Loan amount cannot exceed ${maxLTV * 100}% of home value`
    );
  }

  /**
   * Validate debt-to-income ratio
   */
  static debtToIncome(debtField: string, incomeField: string, maxDTI: number = 0.43): ValidationRule {
    return ValidationRuleFactory.businessRule(
      debtField,
      (debt, allInputs) => {
        if (!allInputs) return true;
        const income = allInputs[incomeField];
        if (!income || income <= 0) return true;
        const dti = debt / income;
        return dti <= maxDTI;
      },
      `Debt-to-income ratio cannot exceed ${maxDTI * 100}%`
    );
  }

  /**
   * Validate interest rate range
   */
  static interestRate(field: string, min: number = 0, max: number = 50): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      min,
      max,
      `Interest rate must be between ${min}% and ${max}%`
    );
  }

  /**
   * Validate loan term
   */
  static loanTerm(field: string, minYears: number = 1, maxYears: number = 50): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      minYears,
      maxYears,
      `Loan term must be between ${minYears} and ${maxYears} years`
    );
  }
}