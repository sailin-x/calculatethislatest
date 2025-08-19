import { QuickValidationResult } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Quick validation for mortgage balance
 */
export function quickValidateMortgageBalance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Mortgage balance is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Mortgage Balance');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Mortgage Balance');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Mortgage Balance', 1000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Consider if this mortgage balance is correct', severity: 'warning' };
  }

  if (value > 2000000) {
    return { isValid: true, message: 'This is a jumbo mortgage. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for property value
 */
export function quickValidatePropertyValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Property value is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Property Value');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Property Value');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Property Value', 1000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Property value seems low. Verify this amount.', severity: 'warning' };
  }

  if (value > 5000000) {
    return { isValid: true, message: 'High-value property. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for monthly payment
 */
export function quickValidateMonthlyPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Monthly payment is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Monthly Payment');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Monthly Payment');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Monthly Payment', 100, 50000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 500) {
    return { isValid: true, message: 'Monthly payment seems low. Verify this amount.', severity: 'warning' };
  }

  if (value > 10000) {
    return { isValid: true, message: 'High monthly payment. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for age
 */
export function quickValidateAge(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Age is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Age');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Age', 18, 85);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 25) {
    return { isValid: true, message: 'Young age typically results in lower premiums', severity: 'info' };
  }

  if (value > 65) {
    return { isValid: true, message: 'Age may limit insurance options and increase premiums', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for health status
 */
export function quickValidateHealthStatus(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Health status is required', severity: 'error' };
  }

  const validStatuses = ['excellent', 'good', 'fair', 'poor'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, message: 'Health status must be excellent, good, fair, or poor', severity: 'error' };
  }

  switch (value) {
    case 'excellent':
      return { isValid: true, message: 'Excellent health typically results in lowest premiums', severity: 'success' };
    case 'good':
      return { isValid: true, message: 'Good health typically results in favorable premiums', severity: 'success' };
    case 'fair':
      return { isValid: true, message: 'Fair health may increase premium rates', severity: 'warning' };
    case 'poor':
      return { isValid: true, message: 'Poor health may significantly increase premiums or limit options', severity: 'warning' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for smoker status
 */
export function quickValidateSmokerStatus(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Smoker status is required', severity: 'error' };
  }

  const validStatuses = ['non-smoker', 'smoker', 'former-smoker'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, message: 'Smoker status must be non-smoker, smoker, or former-smoker', severity: 'error' };
  }

  switch (value) {
    case 'non-smoker':
      return { isValid: true, message: 'Non-smoker status typically results in lowest premiums', severity: 'success' };
    case 'former-smoker':
      return { isValid: true, message: 'Former smoker status may affect premium rates', severity: 'warning' };
    case 'smoker':
      return { isValid: true, message: 'Smoking significantly increases premium rates', severity: 'warning' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for occupation risk level
 */
export function quickValidateOccupationRisk(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Occupation risk level is required', severity: 'error' };
  }

  const validLevels = ['low', 'medium', 'high'];
  if (!validLevels.includes(value)) {
    return { isValid: false, message: 'Occupation risk level must be low, medium, or high', severity: 'error' };
  }

  switch (value) {
    case 'low':
      return { isValid: true, message: 'Low-risk occupation typically results in lowest premiums', severity: 'success' };
    case 'medium':
      return { isValid: true, message: 'Medium-risk occupation may affect premium rates', severity: 'warning' };
    case 'high':
      return { isValid: true, message: 'High-risk occupation significantly increases premium rates', severity: 'warning' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for family income
 */
export function quickValidateFamilyIncome(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Family income is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Family Income');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Family Income');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Family Income', 10000, 2000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 30000) {
    return { isValid: true, message: 'Low income may affect insurance affordability', severity: 'warning' };
  }

  if (value > 500000) {
    return { isValid: true, message: 'High income. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for number of dependents
 */
export function quickValidateDependents(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Number of dependents is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Number of Dependents');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Number of Dependents', 0, 10);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: 'No dependents may reduce insurance needs', severity: 'info' };
  }

  if (value > 5) {
    return { isValid: true, message: 'Large number of dependents may increase insurance needs', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for coverage type
 */
export function quickValidateCoverageType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Coverage type is required', severity: 'error' };
  }

  const validTypes = ['decreasing', 'level', 'family'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Coverage type must be decreasing, level, or family', severity: 'error' };
  }

  switch (value) {
    case 'decreasing':
      return { isValid: true, message: 'Decreasing term matches mortgage balance over time', severity: 'info' };
    case 'level':
      return { isValid: true, message: 'Level term provides consistent coverage amount', severity: 'info' };
    case 'family':
      return { isValid: true, message: 'Family coverage includes income replacement', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for term length
 */
export function quickValidateTermLength(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Term length is required', severity: 'error' };
  }

  const validTerms = ['10', '15', '20', '25', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, message: 'Term length must be 10, 15, 20, 25, or 30 years', severity: 'error' };
  }

  switch (value) {
    case '10':
      return { isValid: true, message: 'Short term with lower premiums but limited coverage period', severity: 'info' };
    case '30':
      return { isValid: true, message: 'Long term with higher premiums but extended coverage', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for all inputs together
 */
export function quickValidateAllInputs(inputs: {
  mortgageBalance?: number;
  propertyValue?: number;
  monthlyPayment?: number;
  age?: number;
  healthStatus?: string;
  smoker?: string;
  occupation?: string;
  familyIncome?: number;
  dependents?: number;
  existingLifeInsurance?: number;
  otherDebts?: number;
  funeralExpenses?: number;
  coverageType?: string;
  termLength?: string;
}): QuickValidationResult[] {
  return [
    quickValidateMortgageBalance(inputs.mortgageBalance),
    quickValidatePropertyValue(inputs.propertyValue),
    quickValidateMonthlyPayment(inputs.monthlyPayment),
    quickValidateAge(inputs.age),
    quickValidateHealthStatus(inputs.healthStatus),
    quickValidateSmokerStatus(inputs.smoker),
    quickValidateOccupationRisk(inputs.occupation),
    quickValidateFamilyIncome(inputs.familyIncome),
    quickValidateDependents(inputs.dependents),
    quickValidateCoverageType(inputs.coverageType),
    quickValidateTermLength(inputs.termLength)
  ];
}

/**
 * Quick validation for LTV ratio
 */
export function quickValidateLTVRatio(
  mortgageBalance: number | undefined,
  propertyValue: number | undefined
): QuickValidationResult {
  if (mortgageBalance === undefined || propertyValue === undefined || mortgageBalance === null || propertyValue === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (propertyValue <= 0) {
    return { isValid: false, message: 'Property value must be positive to calculate LTV ratio', severity: 'error' };
  }

  const ltvRatio = (mortgageBalance / propertyValue) * 100;

  if (ltvRatio > 100) {
    return { isValid: false, message: 'LTV ratio cannot exceed 100%', severity: 'error' };
  }

  if (ltvRatio > 95) {
    return { isValid: true, message: 'Very high LTV ratio may affect insurance options', severity: 'warning' };
  }

  if (ltvRatio <= 80) {
    return { isValid: true, message: 'Good LTV ratio for insurance purposes', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for premium affordability
 */
export function quickValidatePremiumAffordability(
  estimatedPremium: number | undefined,
  familyIncome: number | undefined
): QuickValidationResult {
  if (estimatedPremium === undefined || familyIncome === undefined || estimatedPremium === null || familyIncome === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (familyIncome <= 0) {
    return { isValid: false, message: 'Family income must be positive to calculate affordability', severity: 'error' };
  }

  const premiumPercentage = (estimatedPremium * 12 / familyIncome) * 100;

  if (premiumPercentage > 5) {
    return { isValid: false, message: 'Insurance premiums may be unaffordable relative to income', severity: 'error' };
  }

  if (premiumPercentage > 2) {
    return { isValid: true, message: 'Insurance premiums represent a significant portion of income', severity: 'warning' };
  }

  if (premiumPercentage <= 1) {
    return { isValid: true, message: 'Insurance premiums are affordable relative to income', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}