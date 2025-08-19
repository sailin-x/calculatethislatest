import { ValidationRuleFactory } from '../../../utils/validation';
import { NetOperatingIncomeInputs } from './formulas';

export function validateNetOperatingIncomeInputs(inputs: NetOperatingIncomeInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  const grossRentalIncomeRule = ValidationRuleFactory.required('grossRentalIncome', 'Gross Rental Income is required');
  if (!grossRentalIncomeRule.validator(inputs.grossRentalIncome)) {
    errors.push(grossRentalIncomeRule.message);
  }

  const vacancyLossRule = ValidationRuleFactory.required('vacancyLoss', 'Vacancy Loss is required');
  if (!vacancyLossRule.validator(inputs.vacancyLoss)) {
    errors.push(vacancyLossRule.message);
  }

  const propertyTaxesRule = ValidationRuleFactory.required('propertyTaxes', 'Property Taxes is required');
  if (!propertyTaxesRule.validator(inputs.propertyTaxes)) {
    errors.push(propertyTaxesRule.message);
  }

  const insuranceRule = ValidationRuleFactory.required('insurance', 'Insurance is required');
  if (!insuranceRule.validator(inputs.insurance)) {
    errors.push(insuranceRule.message);
  }

  const utilitiesRule = ValidationRuleFactory.required('utilities', 'Utilities is required');
  if (!utilitiesRule.validator(inputs.utilities)) {
    errors.push(utilitiesRule.message);
  }

  const maintenanceRule = ValidationRuleFactory.required('maintenance', 'Maintenance is required');
  if (!maintenanceRule.validator(inputs.maintenance)) {
    errors.push(maintenanceRule.message);
  }

  // Range validations
  if (inputs.grossRentalIncome !== undefined) {
    const grossRentalIncomePositiveRule = ValidationRuleFactory.positive('grossRentalIncome', 'Gross Rental Income must be positive');
    if (!grossRentalIncomePositiveRule.validator(inputs.grossRentalIncome)) {
      errors.push(grossRentalIncomePositiveRule.message);
    }
    
    const grossRentalIncomeRangeRule = ValidationRuleFactory.range('grossRentalIncome', 0, 10000000, 'Gross Rental Income seems unusually high - please verify the amount');
    if (!grossRentalIncomeRangeRule.validator(inputs.grossRentalIncome)) {
      errors.push(grossRentalIncomeRangeRule.message);
    }
  }

  if (inputs.otherIncome !== undefined) {
    const otherIncomeNonNegativeRule = ValidationRuleFactory.nonNegative('otherIncome', 'Other Income must be non-negative');
    if (!otherIncomeNonNegativeRule.validator(inputs.otherIncome)) {
      errors.push(otherIncomeNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.otherIncome > inputs.grossRentalIncome * 2) {
      errors.push('Other Income should not exceed twice the Gross Rental Income');
    }
  }

  if (inputs.vacancyLoss !== undefined) {
    const vacancyLossRangeRule = ValidationRuleFactory.range('vacancyLoss', 0, 100, 'Vacancy Loss must be between 0% and 100%');
    if (!vacancyLossRangeRule.validator(inputs.vacancyLoss)) {
      errors.push(vacancyLossRangeRule.message);
    }
    
    if (inputs.vacancyLoss > 50) {
      errors.push('Vacancy Loss above 50% indicates significant issues - please verify');
    }
  }

  if (inputs.propertyManagementFee !== undefined) {
    const propertyManagementFeeRangeRule = ValidationRuleFactory.range('propertyManagementFee', 0, 20, 'Property Management Fee must be between 0% and 20%');
    if (!propertyManagementFeeRangeRule.validator(inputs.propertyManagementFee)) {
      errors.push(propertyManagementFeeRangeRule.message);
    }
  }

  if (inputs.propertyTaxes !== undefined) {
    const propertyTaxesPositiveRule = ValidationRuleFactory.positive('propertyTaxes', 'Property Taxes must be positive');
    if (!propertyTaxesPositiveRule.validator(inputs.propertyTaxes)) {
      errors.push(propertyTaxesPositiveRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.propertyTaxes > inputs.grossRentalIncome * 0.5) {
      errors.push('Property Taxes seem unusually high relative to rental income');
    }
  }

  if (inputs.insurance !== undefined) {
    const insurancePositiveRule = ValidationRuleFactory.positive('insurance', 'Insurance must be positive');
    if (!insurancePositiveRule.validator(inputs.insurance)) {
      errors.push(insurancePositiveRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.insurance > inputs.grossRentalIncome * 0.3) {
      errors.push('Insurance costs seem unusually high relative to rental income');
    }
  }

  if (inputs.utilities !== undefined) {
    const utilitiesPositiveRule = ValidationRuleFactory.positive('utilities', 'Utilities must be positive');
    if (!utilitiesPositiveRule.validator(inputs.utilities)) {
      errors.push(utilitiesPositiveRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.utilities > inputs.grossRentalIncome * 0.4) {
      errors.push('Utility costs seem unusually high relative to rental income');
    }
  }

  if (inputs.maintenance !== undefined) {
    const maintenancePositiveRule = ValidationRuleFactory.positive('maintenance', 'Maintenance must be positive');
    if (!maintenancePositiveRule.validator(inputs.maintenance)) {
      errors.push(maintenancePositiveRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.maintenance > inputs.grossRentalIncome * 0.3) {
      errors.push('Maintenance costs seem unusually high relative to rental income');
    }
  }

  // Optional expense validations
  if (inputs.landscaping !== undefined) {
    const landscapingNonNegativeRule = ValidationRuleFactory.nonNegative('landscaping', 'Landscaping must be non-negative');
    if (!landscapingNonNegativeRule.validator(inputs.landscaping)) {
      errors.push(landscapingNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.landscaping > inputs.grossRentalIncome * 0.15) {
      errors.push('Landscaping costs seem unusually high relative to rental income');
    }
  }

  if (inputs.cleaning !== undefined) {
    const cleaningNonNegativeRule = ValidationRuleFactory.nonNegative('cleaning', 'Cleaning must be non-negative');
    if (!cleaningNonNegativeRule.validator(inputs.cleaning)) {
      errors.push(cleaningNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.cleaning > inputs.grossRentalIncome * 0.2) {
      errors.push('Cleaning costs seem unusually high relative to rental income');
    }
  }

  if (inputs.advertising !== undefined) {
    const advertisingNonNegativeRule = ValidationRuleFactory.nonNegative('advertising', 'Advertising must be non-negative');
    if (!advertisingNonNegativeRule.validator(inputs.advertising)) {
      errors.push(advertisingNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.advertising > inputs.grossRentalIncome * 0.1) {
      errors.push('Advertising costs seem unusually high relative to rental income');
    }
  }

  if (inputs.legalFees !== undefined) {
    const legalFeesNonNegativeRule = ValidationRuleFactory.nonNegative('legalFees', 'Legal Fees must be non-negative');
    if (!legalFeesNonNegativeRule.validator(inputs.legalFees)) {
      errors.push(legalFeesNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.legalFees > inputs.grossRentalIncome * 0.1) {
      errors.push('Legal fees seem unusually high relative to rental income');
    }
  }

  if (inputs.accountingFees !== undefined) {
    const accountingFeesNonNegativeRule = ValidationRuleFactory.nonNegative('accountingFees', 'Accounting Fees must be non-negative');
    if (!accountingFeesNonNegativeRule.validator(inputs.accountingFees)) {
      errors.push(accountingFeesNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.accountingFees > inputs.grossRentalIncome * 0.05) {
      errors.push('Accounting fees seem unusually high relative to rental income');
    }
  }

  if (inputs.hoaFees !== undefined) {
    const hoaFeesNonNegativeRule = ValidationRuleFactory.nonNegative('hoaFees', 'HOA Fees must be non-negative');
    if (!hoaFeesNonNegativeRule.validator(inputs.hoaFees)) {
      errors.push(hoaFeesNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.hoaFees > inputs.grossRentalIncome * 0.25) {
      errors.push('HOA fees seem unusually high relative to rental income');
    }
  }

  if (inputs.trashRemoval !== undefined) {
    const trashRemovalNonNegativeRule = ValidationRuleFactory.nonNegative('trashRemoval', 'Trash Removal must be non-negative');
    if (!trashRemovalNonNegativeRule.validator(inputs.trashRemoval)) {
      errors.push(trashRemovalNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.trashRemoval > inputs.grossRentalIncome * 0.1) {
      errors.push('Trash removal costs seem unusually high relative to rental income');
    }
  }

  if (inputs.security !== undefined) {
    const securityNonNegativeRule = ValidationRuleFactory.nonNegative('security', 'Security must be non-negative');
    if (!securityNonNegativeRule.validator(inputs.security)) {
      errors.push(securityNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.security > inputs.grossRentalIncome * 0.2) {
      errors.push('Security costs seem unusually high relative to rental income');
    }
  }

  if (inputs.otherExpenses !== undefined) {
    const otherExpensesNonNegativeRule = ValidationRuleFactory.nonNegative('otherExpenses', 'Other Expenses must be non-negative');
    if (!otherExpensesNonNegativeRule.validator(inputs.otherExpenses)) {
      errors.push(otherExpensesNonNegativeRule.message);
    }
    
    if (inputs.grossRentalIncome !== undefined && inputs.otherExpenses > inputs.grossRentalIncome * 0.3) {
      errors.push('Other expenses seem unusually high relative to rental income');
    }
  }

  // Business logic validations
  if (inputs.grossRentalIncome !== undefined && inputs.vacancyLoss !== undefined) {
    const otherIncome = inputs.otherIncome || 0;
    const grossIncome = inputs.grossRentalIncome + otherIncome;
    const vacancyLossAmount = inputs.grossRentalIncome * (inputs.vacancyLoss / 100);
    const effectiveGrossIncome = grossIncome - vacancyLossAmount;
    
    if (effectiveGrossIncome <= 0) {
      errors.push('Effective Gross Income would be zero or negative with current vacancy loss');
    }
  }

  // Total expense reasonableness check
  if (inputs.grossRentalIncome !== undefined) {
    const totalExpenses = (inputs.propertyTaxes || 0) + (inputs.insurance || 0) + 
                         (inputs.utilities || 0) + (inputs.maintenance || 0) +
                         (inputs.landscaping || 0) + (inputs.cleaning || 0) +
                         (inputs.advertising || 0) + (inputs.legalFees || 0) +
                         (inputs.accountingFees || 0) + (inputs.hoaFees || 0) +
                         (inputs.trashRemoval || 0) + (inputs.security || 0) +
                         (inputs.otherExpenses || 0);

    if (totalExpenses > inputs.grossRentalIncome * 0.9) {
      errors.push('Total operating expenses exceed 90% of gross rental income - this may indicate unsustainable operations');
    }
  }

  // Property management fee validation
  if (inputs.propertyManagementFee !== undefined && inputs.propertyManagementFee > 0) {
    if (inputs.grossRentalIncome !== undefined && inputs.vacancyLoss !== undefined) {
      const vacancyLossAmount = inputs.grossRentalIncome * (inputs.vacancyLoss / 100);
      const effectiveGrossIncome = inputs.grossRentalIncome - vacancyLossAmount;
      const propertyManagementAmount = effectiveGrossIncome * (inputs.propertyManagementFee / 100);
      
      if (propertyManagementAmount > effectiveGrossIncome * 0.15) {
        errors.push('Property management fees exceed 15% of effective gross income');
      }
    }
  }

  return errors;
}