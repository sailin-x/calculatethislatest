import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for Paycheck Calculator
 * Individual field validation with allInputs parameter as required
 */

// Pay type validation
export function validatePayType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const isValid = value === 'hourly' || value === 'salary';
  return {
    isValid,
    errors: isValid ? {} : { payType: 'Pay type must be either "hourly" or "salary"' }
  };
}

// Hourly rate validation
export function validateHourlyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.payType !== 'hourly') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 7.25 && num <= 500; // Federal minimum to reasonable maximum

  return {
    isValid,
    errors: isValid ? {} : {
      hourlyRate: 'Hourly rate must be between $7.25 and $500'
    }
  };
}

// Hours worked validation
export function validateHoursWorked(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.payType !== 'hourly') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 168; // 0 to maximum hours in a week

  return {
    isValid,
    errors: isValid ? {} : {
      hoursWorked: 'Hours worked must be between 0 and 168'
    }
  };
}

// Overtime hours validation
export function validateOvertimeHours(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.payType !== 'hourly') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 40; // 0 to reasonable overtime limit

  return {
    isValid,
    errors: isValid ? {} : {
      overtimeHours: 'Overtime hours must be between 0 and 40'
    }
  };
}

// Annual salary validation
export function validateAnnualSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.payType !== 'salary') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 16000 && num <= 10000000; // Minimum to reasonable maximum

  return {
    isValid,
    errors: isValid ? {} : {
      annualSalary: 'Annual salary must be between $16,000 and $10,000,000'
    }
  };
}

// Pay period validation
export function validatePayPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validPeriods = ['weekly', 'biweekly', 'semimonthly', 'monthly'];
  const isValid = validPeriods.includes(value);

  return {
    isValid,
    errors: isValid ? {} : {
      payPeriod: 'Pay period must be weekly, biweekly, semimonthly, or monthly'
    }
  };
}

// Filing status validation
export function validateFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStatuses = ['single', 'married', 'headOfHousehold'];
  const isValid = validStatuses.includes(value);

  return {
    isValid,
    errors: isValid ? {} : {
      filingStatus: 'Filing status must be single, married, or head of household'
    }
  };
}

// Dependents validation
export function validateDependents(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 10; // 0 to reasonable maximum

  return {
    isValid,
    errors: isValid ? {} : {
      dependents: 'Number of dependents must be between 0 and 10'
    }
  };
}

// Additional withholding validation
export function validateAdditionalWithholding(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 10000; // 0 to reasonable maximum

  return {
    isValid,
    errors: isValid ? {} : {
      additionalWithholding: 'Additional withholding must be between $0 and $10,000'
    }
  };
}

// State tax rate validation
export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 20; // 0% to maximum reasonable rate

  return {
    isValid,
    errors: isValid ? {} : {
      stateTaxRate: 'State tax rate must be between 0% and 20%'
    }
  };
}

// Other deductions validation
export function validateOtherDeductions(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= 0 && num <= 10000; // 0 to reasonable maximum

  return {
    isValid,
    errors: isValid ? {} : {
      otherDeductions: 'Other deductions must be between $0 and $10,000'
    }
  };
}

// Business rule validation: Overtime eligibility
export function validateOvertimeEligibility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.payType !== 'hourly') {
    return { isValid: true, errors: {} };
  }

  const overtimeHours = allInputs?.overtimeHours || 0;
  const hoursWorked = allInputs?.hoursWorked || 0;

  if (overtimeHours > 0 && hoursWorked < 40) {
    return {
      isValid: false,
      errors: {
        overtimeHours: 'Overtime requires working at least 40 hours in the pay period'
      }
    };
  }

  return { isValid: true, errors: {} };
}

// Business rule validation: Required fields based on pay type
export function validatePayTypeRequirements(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === 'hourly') {
    if (!allInputs?.hourlyRate) {
      return {
        isValid: false,
        errors: {
          payType: 'Hourly pay type requires hourly rate'
        }
      };
    }
  } else if (value === 'salary') {
    if (!allInputs?.annualSalary) {
      return {
        isValid: false,
        errors: {
          payType: 'Salary pay type requires annual salary'
        }
      };
    }
  }

  return { isValid: true, errors: {} };
}