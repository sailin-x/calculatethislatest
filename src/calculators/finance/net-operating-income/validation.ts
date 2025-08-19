import { ValidationRuleFactory } from '../../../utils/ValidationRuleFactory';
import { NetOperatingIncomeInputs } from './formulas';

export function validateNetOperatingIncomeInputs(inputs: NetOperatingIncomeInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!ValidationRuleFactory.required(inputs.grossRentalIncome, 'Gross Rental Income').isValid) {
    errors.push('Gross Rental Income is required');
  }
  if (!ValidationRuleFactory.required(inputs.vacancyLoss, 'Vacancy Loss').isValid) {
    errors.push('Vacancy Loss is required');
  }
  if (!ValidationRuleFactory.required(inputs.propertyTaxes, 'Property Taxes').isValid) {
    errors.push('Property Taxes is required');
  }
  if (!ValidationRuleFactory.required(inputs.insurance, 'Insurance').isValid) {
    errors.push('Insurance is required');
  }
  if (!ValidationRuleFactory.required(inputs.utilities, 'Utilities').isValid) {
    errors.push('Utilities is required');
  }
  if (!ValidationRuleFactory.required(inputs.maintenance, 'Maintenance').isValid) {
    errors.push('Maintenance is required');
  }

  // Range validations
  if (inputs.grossRentalIncome !== undefined && inputs.grossRentalIncome < 0) {
    errors.push('Gross Rental Income must be non-negative');
  }
  if (inputs.grossRentalIncome !== undefined && inputs.grossRentalIncome > 10000000) {
    errors.push('Gross Rental Income seems unusually high - please verify the amount');
  }

  if (inputs.otherIncome !== undefined && inputs.otherIncome < 0) {
    errors.push('Other Income must be non-negative');
  }
  if (inputs.otherIncome !== undefined && inputs.otherIncome > inputs.grossRentalIncome * 2) {
    errors.push('Other Income should not exceed twice the Gross Rental Income');
  }

  if (inputs.vacancyLoss !== undefined && (inputs.vacancyLoss < 0 || inputs.vacancyLoss > 100)) {
    errors.push('Vacancy Loss must be between 0% and 100%');
  }
  if (inputs.vacancyLoss !== undefined && inputs.vacancyLoss > 50) {
    errors.push('Vacancy Loss above 50% indicates significant issues - please verify');
  }

  if (inputs.propertyManagementFee !== undefined && (inputs.propertyManagementFee < 0 || inputs.propertyManagementFee > 20)) {
    errors.push('Property Management Fee must be between 0% and 20%');
  }

  if (inputs.propertyTaxes !== undefined && inputs.propertyTaxes < 0) {
    errors.push('Property Taxes must be non-negative');
  }
  if (inputs.propertyTaxes !== undefined && inputs.propertyTaxes > inputs.grossRentalIncome * 0.5) {
    errors.push('Property Taxes seem unusually high relative to rental income');
  }

  if (inputs.insurance !== undefined && inputs.insurance < 0) {
    errors.push('Insurance must be non-negative');
  }
  if (inputs.insurance !== undefined && inputs.insurance > inputs.grossRentalIncome * 0.3) {
    errors.push('Insurance costs seem unusually high relative to rental income');
  }

  if (inputs.utilities !== undefined && inputs.utilities < 0) {
    errors.push('Utilities must be non-negative');
  }
  if (inputs.utilities !== undefined && inputs.utilities > inputs.grossRentalIncome * 0.4) {
    errors.push('Utility costs seem unusually high relative to rental income');
  }

  if (inputs.maintenance !== undefined && inputs.maintenance < 0) {
    errors.push('Maintenance must be non-negative');
  }
  if (inputs.maintenance !== undefined && inputs.maintenance > inputs.grossRentalIncome * 0.3) {
    errors.push('Maintenance costs seem unusually high relative to rental income');
  }

  // Optional expense validations
  if (inputs.landscaping !== undefined && inputs.landscaping < 0) {
    errors.push('Landscaping must be non-negative');
  }
  if (inputs.landscaping !== undefined && inputs.landscaping > inputs.grossRentalIncome * 0.15) {
    errors.push('Landscaping costs seem unusually high relative to rental income');
  }

  if (inputs.cleaning !== undefined && inputs.cleaning < 0) {
    errors.push('Cleaning must be non-negative');
  }
  if (inputs.cleaning !== undefined && inputs.cleaning > inputs.grossRentalIncome * 0.2) {
    errors.push('Cleaning costs seem unusually high relative to rental income');
  }

  if (inputs.advertising !== undefined && inputs.advertising < 0) {
    errors.push('Advertising must be non-negative');
  }
  if (inputs.advertising !== undefined && inputs.advertising > inputs.grossRentalIncome * 0.1) {
    errors.push('Advertising costs seem unusually high relative to rental income');
  }

  if (inputs.legalFees !== undefined && inputs.legalFees < 0) {
    errors.push('Legal Fees must be non-negative');
  }
  if (inputs.legalFees !== undefined && inputs.legalFees > inputs.grossRentalIncome * 0.1) {
    errors.push('Legal fees seem unusually high relative to rental income');
  }

  if (inputs.accountingFees !== undefined && inputs.accountingFees < 0) {
    errors.push('Accounting Fees must be non-negative');
  }
  if (inputs.accountingFees !== undefined && inputs.accountingFees > inputs.grossRentalIncome * 0.05) {
    errors.push('Accounting fees seem unusually high relative to rental income');
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA Fees must be non-negative');
  }
  if (inputs.hoaFees !== undefined && inputs.hoaFees > inputs.grossRentalIncome * 0.25) {
    errors.push('HOA fees seem unusually high relative to rental income');
  }

  if (inputs.trashRemoval !== undefined && inputs.trashRemoval < 0) {
    errors.push('Trash Removal must be non-negative');
  }
  if (inputs.trashRemoval !== undefined && inputs.trashRemoval > inputs.grossRentalIncome * 0.1) {
    errors.push('Trash removal costs seem unusually high relative to rental income');
  }

  if (inputs.security !== undefined && inputs.security < 0) {
    errors.push('Security must be non-negative');
  }
  if (inputs.security !== undefined && inputs.security > inputs.grossRentalIncome * 0.2) {
    errors.push('Security costs seem unusually high relative to rental income');
  }

  if (inputs.otherExpenses !== undefined && inputs.otherExpenses < 0) {
    errors.push('Other Expenses must be non-negative');
  }
  if (inputs.otherExpenses !== undefined && inputs.otherExpenses > inputs.grossRentalIncome * 0.3) {
    errors.push('Other expenses seem unusually high relative to rental income');
  }

  // Business logic validations
  if (inputs.grossRentalIncome !== undefined && inputs.vacancyLoss !== undefined) {
    const vacancyLossAmount = inputs.grossRentalIncome * (inputs.vacancyLoss / 100);
    const effectiveGrossIncome = inputs.grossRentalIncome - vacancyLossAmount;
    
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