import { NetOperatingIncomeInputs } from './types';

export function validateNetOperatingIncomeInputs(inputs: NetOperatingIncomeInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate income
  if (inputs.rentalIncome < 0) {
    errors.push({ field: 'rentalIncome', message: 'Rental income cannot be negative' });
  }

  if (inputs.otherIncome < 0) {
    errors.push({ field: 'otherIncome', message: 'Other income cannot be negative' });
  }

  // Validate expenses (all should be non-negative)
  const expenseFields = [
    'propertyManagement', 'maintenance', 'repairs', 'utilities',
    'insurance', 'propertyTaxes', 'legalFees', 'advertising',
    'supplies', 'otherExpenses'
  ];

  expenseFields.forEach(field => {
    const value = (inputs as any)[field];
    if (value < 0) {
      errors.push({ field, message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} cannot be negative` });
    }
  });

  // Validate vacancy rate
  if (inputs.includeVacancyAllowance) {
    if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) {
      errors.push({ field: 'vacancyRate', message: 'Vacancy rate must be between 0% and 100%' });
    }
  }

  // Validate replacement reserve rate
  if (inputs.includeReplacementReserve) {
    if (inputs.replacementReserveRate < 0 || inputs.replacementReserveRate > 50) {
      errors.push({ field: 'replacementReserveRate', message: 'Replacement reserve rate must be between 0% and 50%' });
    }
  }

  // Business rule: Total income should be reasonable
  const totalIncome = inputs.rentalIncome + inputs.otherIncome;
  if (totalIncome > 10000000) {
    errors.push({ field: 'rentalIncome', message: 'Total income seems unusually high - please verify' });
  }

  return errors;
}

export function validateNetOperatingIncomeBusinessRules(inputs: NetOperatingIncomeInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Calculate some basic metrics for business rule validation
  const grossIncome = inputs.rentalIncome + inputs.otherIncome;
  const totalExpenses = Object.entries(inputs)
    .filter(([key, value]) => [
      'propertyManagement', 'maintenance', 'repairs', 'utilities',
      'insurance', 'propertyTaxes', 'legalFees', 'advertising',
      'supplies', 'otherExpenses'
    ].includes(key) && typeof value === 'number')
    .reduce((sum, [, value]) => sum + (value as number), 0);

  // Warning for high expense ratio
  if (grossIncome > 0) {
    const expenseRatio = (totalExpenses / grossIncome) * 100;
    if (expenseRatio > 60) {
      warnings.push({
        field: 'totalOperatingExpenses',
        message: 'Operating expense ratio is very high (>60%) - review expense management'
      });
    }
  }

  // Warning for no vacancy allowance
  if (!inputs.includeVacancyAllowance && inputs.rentalIncome > 0) {
    warnings.push({
      field: 'includeVacancyAllowance',
      message: 'Consider including vacancy allowance for more accurate analysis'
    });
  }

  // Warning for high vacancy rate
  if (inputs.includeVacancyAllowance && inputs.vacancyRate > 15) {
    warnings.push({
      field: 'vacancyRate',
      message: 'Vacancy rate is high - may indicate property management issues'
    });
  }

  // Warning for no replacement reserve
  if (!inputs.includeReplacementReserve) {
    warnings.push({
      field: 'includeReplacementReserve',
      message: 'Consider including replacement reserve for long-term planning'
    });
  }

  return warnings;
}