import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageLifeInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validateMortgageLifeInputs(inputs: Partial<MortgageLifeInputs>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  if (inputs.mortgageBalance !== undefined) {
    const mortgageBalanceErrors = ValidationRuleFactory.required(inputs.mortgageBalance, 'Mortgage Balance');
    if (mortgageBalanceErrors.length > 0) {
      errors.push(...mortgageBalanceErrors.map(msg => ({ field: 'mortgageBalance', message: msg, severity: 'error' as const })));
    } else {
      const positiveErrors = ValidationRuleFactory.positive(inputs.mortgageBalance, 'Mortgage Balance');
      if (positiveErrors.length > 0) {
        errors.push(...positiveErrors.map(msg => ({ field: 'mortgageBalance', message: msg, severity: 'error' as const })));
      } else {
        const rangeErrors = ValidationRuleFactory.range(inputs.mortgageBalance, 'Mortgage Balance', 1000, 10000000);
        if (rangeErrors.length > 0) {
          errors.push(...rangeErrors.map(msg => ({ field: 'mortgageBalance', message: msg, severity: 'error' as const })));
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

  if (inputs.monthlyPayment !== undefined) {
    const monthlyPaymentErrors = ValidationRuleFactory.required(inputs.monthlyPayment, 'Monthly Payment');
    if (monthlyPaymentErrors.length > 0) {
      errors.push(...monthlyPaymentErrors.map(msg => ({ field: 'monthlyPayment', message: msg, severity: 'error' as const })));
    } else {
      const positiveErrors = ValidationRuleFactory.positive(inputs.monthlyPayment, 'Monthly Payment');
      if (positiveErrors.length > 0) {
        errors.push(...positiveErrors.map(msg => ({ field: 'monthlyPayment', message: msg, severity: 'error' as const })));
      } else {
        const rangeErrors = ValidationRuleFactory.range(inputs.monthlyPayment, 'Monthly Payment', 100, 50000);
        if (rangeErrors.length > 0) {
          errors.push(...rangeErrors.map(msg => ({ field: 'monthlyPayment', message: msg, severity: 'error' as const })));
        }
      }
    }
  }

  if (inputs.age !== undefined) {
    const ageErrors = ValidationRuleFactory.required(inputs.age, 'Age');
    if (ageErrors.length > 0) {
      errors.push(...ageErrors.map(msg => ({ field: 'age', message: msg, severity: 'error' as const })));
    } else {
      const rangeErrors = ValidationRuleFactory.range(inputs.age, 'Age', 18, 85);
      if (rangeErrors.length > 0) {
        errors.push(...rangeErrors.map(msg => ({ field: 'age', message: msg, severity: 'error' as const })));
      }
    }
  }

  if (inputs.healthStatus !== undefined) {
    const healthStatusErrors = ValidationRuleFactory.required(inputs.healthStatus, 'Health Status');
    if (healthStatusErrors.length > 0) {
      errors.push(...healthStatusErrors.map(msg => ({ field: 'healthStatus', message: msg, severity: 'error' as const })));
    } else {
      const validStatuses = ['excellent', 'good', 'fair', 'poor'];
      if (!validStatuses.includes(inputs.healthStatus)) {
        errors.push({ field: 'healthStatus', message: 'Health status must be excellent, good, fair, or poor', severity: 'error' });
      }
    }
  }

  if (inputs.smoker !== undefined) {
    const smokerErrors = ValidationRuleFactory.required(inputs.smoker, 'Smoker Status');
    if (smokerErrors.length > 0) {
      errors.push(...smokerErrors.map(msg => ({ field: 'smoker', message: msg, severity: 'error' as const })));
    } else {
      const validStatuses = ['non-smoker', 'smoker', 'former-smoker'];
      if (!validStatuses.includes(inputs.smoker)) {
        errors.push({ field: 'smoker', message: 'Smoker status must be non-smoker, smoker, or former-smoker', severity: 'error' });
      }
    }
  }

  if (inputs.occupation !== undefined) {
    const occupationErrors = ValidationRuleFactory.required(inputs.occupation, 'Occupation Risk Level');
    if (occupationErrors.length > 0) {
      errors.push(...occupationErrors.map(msg => ({ field: 'occupation', message: msg, severity: 'error' as const })));
    } else {
      const validLevels = ['low', 'medium', 'high'];
      if (!validLevels.includes(inputs.occupation)) {
        errors.push({ field: 'occupation', message: 'Occupation risk level must be low, medium, or high', severity: 'error' });
      }
    }
  }

  if (inputs.familyIncome !== undefined) {
    const familyIncomeErrors = ValidationRuleFactory.required(inputs.familyIncome, 'Family Income');
    if (familyIncomeErrors.length > 0) {
      errors.push(...familyIncomeErrors.map(msg => ({ field: 'familyIncome', message: msg, severity: 'error' as const })));
    } else {
      const positiveErrors = ValidationRuleFactory.positive(inputs.familyIncome, 'Family Income');
      if (positiveErrors.length > 0) {
        errors.push(...positiveErrors.map(msg => ({ field: 'familyIncome', message: msg, severity: 'error' as const })));
      } else {
        const rangeErrors = ValidationRuleFactory.range(inputs.familyIncome, 'Family Income', 10000, 2000000);
        if (rangeErrors.length > 0) {
          errors.push(...rangeErrors.map(msg => ({ field: 'familyIncome', message: msg, severity: 'error' as const })));
        }
      }
    }
  }

  if (inputs.dependents !== undefined) {
    const dependentsErrors = ValidationRuleFactory.required(inputs.dependents, 'Number of Dependents');
    if (dependentsErrors.length > 0) {
      errors.push(...dependentsErrors.map(msg => ({ field: 'dependents', message: msg, severity: 'error' as const })));
    } else {
      const rangeErrors = ValidationRuleFactory.range(inputs.dependents, 'Number of Dependents', 0, 10);
      if (rangeErrors.length > 0) {
        errors.push(...rangeErrors.map(msg => ({ field: 'dependents', message: msg, severity: 'error' as const })));
      }
    }
  }

  if (inputs.coverageType !== undefined) {
    const coverageTypeErrors = ValidationRuleFactory.required(inputs.coverageType, 'Coverage Type');
    if (coverageTypeErrors.length > 0) {
      errors.push(...coverageTypeErrors.map(msg => ({ field: 'coverageType', message: msg, severity: 'error' as const })));
    } else {
      const validTypes = ['decreasing', 'level', 'family'];
      if (!validTypes.includes(inputs.coverageType)) {
        errors.push({ field: 'coverageType', message: 'Coverage type must be decreasing, level, or family', severity: 'error' });
      }
    }
  }

  if (inputs.termLength !== undefined) {
    const termLengthErrors = ValidationRuleFactory.required(inputs.termLength, 'Term Length');
    if (termLengthErrors.length > 0) {
      errors.push(...termLengthErrors.map(msg => ({ field: 'termLength', message: msg, severity: 'error' as const })));
    } else {
      const validTerms = ['10', '15', '20', '25', '30'];
      if (!validTerms.includes(inputs.termLength)) {
        errors.push({ field: 'termLength', message: 'Term length must be 10, 15, 20, 25, or 30 years', severity: 'error' });
      }
    }
  }

  // Optional field validations
  if (inputs.existingLifeInsurance !== undefined && inputs.existingLifeInsurance !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.existingLifeInsurance, 'Existing Life Insurance', 0, 10000000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'existingLifeInsurance', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.otherDebts !== undefined && inputs.otherDebts !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.otherDebts, 'Other Debts', 0, 1000000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'otherDebts', message: msg, severity: 'warning' as const })));
    }
  }

  if (inputs.funeralExpenses !== undefined && inputs.funeralExpenses !== null) {
    const rangeErrors = ValidationRuleFactory.range(inputs.funeralExpenses, 'Funeral Expenses', 0, 100000);
    if (rangeErrors.length > 0) {
      errors.push(...rangeErrors.map(msg => ({ field: 'funeralExpenses', message: msg, severity: 'warning' as const })));
    }
  }

  // Business logic validations
  validateAgeRequirements(inputs, errors);
  validateIncomeRequirements(inputs, errors);
  validateCoverageRequirements(inputs, errors);

  return errors;
}

/**
 * Validate age requirements
 */
function validateAgeRequirements(inputs: Partial<MortgageLifeInputs>, errors: ValidationError[]): void {
  if (inputs.age !== undefined) {
    if (inputs.age < 18) {
      errors.push({
        field: 'age',
        message: 'Must be at least 18 years old to purchase life insurance',
        severity: 'error'
      });
    }

    if (inputs.age > 75) {
      errors.push({
        field: 'age',
        message: 'Age may limit available insurance options and increase premiums',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate income requirements
 */
function validateIncomeRequirements(inputs: Partial<MortgageLifeInputs>, errors: ValidationError[]): void {
  if (inputs.familyIncome !== undefined && inputs.monthlyPayment !== undefined) {
    const monthlyIncome = inputs.familyIncome / 12;
    const paymentRatio = (inputs.monthlyPayment / monthlyIncome) * 100;

    if (paymentRatio > 50) {
      errors.push({
        field: 'monthlyPayment',
        message: 'Monthly payment represents a very high percentage of income',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate coverage requirements
 */
function validateCoverageRequirements(inputs: Partial<MortgageLifeInputs>, errors: ValidationError[]): void {
  if (inputs.mortgageBalance !== undefined && inputs.propertyValue !== undefined) {
    const ltvRatio = (inputs.mortgageBalance / inputs.propertyValue) * 100;

    if (ltvRatio > 100) {
      errors.push({
        field: 'mortgageBalance',
        message: 'Mortgage balance cannot exceed property value',
        severity: 'error'
      });
    }

    if (ltvRatio > 95) {
      errors.push({
        field: 'mortgageBalance',
        message: 'Very high loan-to-value ratio may affect insurance options',
        severity: 'warning'
      });
    }
  }
}

/**
 * Validate cross-field dependencies
 */
export function validateCrossFieldDependencies(inputs: Partial<MortgageLifeInputs>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate that mortgage balance doesn't exceed property value
  if (inputs.mortgageBalance !== undefined && inputs.propertyValue !== undefined) {
    if (inputs.mortgageBalance > inputs.propertyValue) {
      errors.push({
        field: 'mortgageBalance',
        message: 'Mortgage balance cannot exceed property value',
        severity: 'error'
      });
    }
  }

  // Validate age and term length compatibility
  if (inputs.age !== undefined && inputs.termLength !== undefined) {
    const age = inputs.age;
    const termYears = parseInt(inputs.termLength);
    const endAge = age + termYears;

    if (endAge > 85) {
      errors.push({
        field: 'termLength',
        message: 'Term length would extend beyond typical insurance age limits',
        severity: 'warning'
      });
    }
  }

  // Validate income and premium affordability
  if (inputs.familyIncome !== undefined && inputs.mortgageBalance !== undefined && inputs.age !== undefined) {
    const estimatedPremium = (inputs.mortgageBalance / 1000) * getEstimatedRatePerThousand(inputs.age);
    const premiumPercentage = (estimatedPremium * 12 / inputs.familyIncome) * 100;

    if (premiumPercentage > 5) {
      errors.push({
        field: 'familyIncome',
        message: 'Estimated insurance premiums may be unaffordable relative to income',
        severity: 'warning'
      });
    }
  }

  return errors;
}

/**
 * Get estimated rate per thousand for validation purposes
 */
function getEstimatedRatePerThousand(age: number): number {
  if (age < 30) return 1.0;
  if (age < 40) return 1.5;
  if (age < 50) return 2.5;
  if (age < 60) return 4.0;
  return 8.0;
}