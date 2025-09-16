import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Paycheck Calculator Validation Rules
 * Comprehensive validation for payroll calculations
 */
export const paycheckValidationRules: ValidationRule[] = [
  // Pay type validation
  ValidationRuleFactory.required('payType', 'Pay type is required'),

  // Hourly pay validation
  ValidationRuleFactory.businessRule(
    'hourlyRate',
    (hourlyRate, allInputs) => {
      if (allInputs?.payType !== 'hourly') return true;
      if (!hourlyRate || hourlyRate <= 0) {
        return false;
      }
      return hourlyRate >= 7.25; // Federal minimum wage
    },
    'Hourly rate must be at least federal minimum wage ($7.25)'
  ),

  ValidationRuleFactory.businessRule(
    'hoursWorked',
    (hoursWorked, allInputs) => {
      if (allInputs?.payType !== 'hourly') return true;
      if (!hoursWorked || hoursWorked < 0) {
        return false;
      }
      return hoursWorked <= 168; // Maximum hours in a week
    },
    'Hours worked cannot exceed 168 hours per week'
  ),

  ValidationRuleFactory.businessRule(
    'overtimeHours',
    (overtimeHours, allInputs) => {
      if (allInputs?.payType !== 'hourly') return true;
      if (!overtimeHours && overtimeHours !== 0) return true;
      if (overtimeHours < 0) {
        return false;
      }
      return overtimeHours <= 40; // Reasonable overtime limit
    },
    'Overtime hours cannot exceed 40 hours'
  ),

  // Salary validation
  ValidationRuleFactory.businessRule(
    'annualSalary',
    (annualSalary, allInputs) => {
      if (allInputs?.payType !== 'salary') return true;
      if (!annualSalary || annualSalary <= 0) {
        return false;
      }
      return annualSalary >= 16000; // Approximate minimum annual salary
    },
    'Annual salary must be at least $16,000'
  ),

  // Pay period validation
  ValidationRuleFactory.required('payPeriod', 'Pay period is required'),

  // Filing status validation
  ValidationRuleFactory.required('filingStatus', 'Filing status is required'),

  // Dependents validation
  ValidationRuleFactory.businessRule(
    'dependents',
    (dependents, allInputs) => {
      if (!dependents && dependents !== 0) return true;
      if (dependents < 0) {
        return false;
      }
      return dependents <= 10; // Reasonable maximum
    },
    'Number of dependents cannot exceed 10'
  ),

  // Additional withholding validation
  ValidationRuleFactory.businessRule(
    'additionalWithholding',
    (additionalWithholding, allInputs) => {
      if (!additionalWithholding && additionalWithholding !== 0) return true;
      return additionalWithholding >= 0;
    },
    'Additional withholding cannot be negative'
  ),

  // State tax rate validation
  ValidationRuleFactory.businessRule(
    'stateTaxRate',
    (stateTaxRate, allInputs) => {
      if (!stateTaxRate && stateTaxRate !== 0) return true;
      if (stateTaxRate < 0) {
        return false;
      }
      return stateTaxRate <= 20; // Maximum reasonable state tax rate
    },
    'State tax rate cannot exceed 20%'
  ),

  // Other deductions validation
  ValidationRuleFactory.businessRule(
    'otherDeductions',
    (otherDeductions, allInputs) => {
      if (!otherDeductions && otherDeductions !== 0) return true;
      return otherDeductions >= 0;
    },
    'Other deductions cannot be negative'
  ),

  // Business rule: Overtime eligibility
  ValidationRuleFactory.businessRule(
    'overtimeHours',
    (overtimeHours, allInputs) => {
      if (allInputs?.payType !== 'hourly') return true;
      if (!overtimeHours || overtimeHours === 0) return true;
      if (!allInputs?.hoursWorked) return true;

      // Must work at least 40 hours to be eligible for overtime
      return allInputs.hoursWorked >= 40;
    },
    'Overtime requires working at least 40 hours in the pay period'
  ),

  // Business rule: Salary vs hourly consistency
  ValidationRuleFactory.businessRule(
    'payType',
    (payType, allInputs) => {
      if (payType === 'hourly') {
        return allInputs?.hourlyRate !== undefined && allInputs?.hourlyRate !== null;
      } else if (payType === 'salary') {
        return allInputs?.annualSalary !== undefined && allInputs?.annualSalary !== null;
      }
      return true;
    },
    'Please provide the required fields for your pay type'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getPaycheckValidationRules(): ValidationRule[] {
  return paycheckValidationRules;
}

/**
 * Paycheck calculation type information
 */
export const paycheckTypeInfo = {
  hourly: {
    description: 'Paid based on hours worked',
    minimumWage: 7.25,
    overtimeThreshold: 40
  },
  salary: {
    description: 'Fixed annual salary paid in regular intervals',
    payPeriods: ['weekly', 'biweekly', 'semimonthly', 'monthly']
  }
};

/**
 * Tax information for validation context
 */
export const taxInfo = {
  federal: {
    brackets2024: {
      single: [11000, 44725, 95375, 182100],
      married: [22000, 89450, 190750, 364200],
      headOfHousehold: [15700, 59850, 96850, 182100]
    }
  },
  socialSecurity: {
    rate: 0.062,
    limit2024: 168600
  },
  medicare: {
    rate: 0.0145,
    additionalThreshold: 200000,
    additionalRate: 0.009
  }
};