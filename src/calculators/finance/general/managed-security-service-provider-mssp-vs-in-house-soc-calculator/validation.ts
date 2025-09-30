import { managed_security_service_provider_mssp_vs_in_house_soc_calculatorInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  field?: string;
}

export function validatemanaged_security_service_provider_mssp_vs_in_house_soc_calculatorInputs(inputs: managed_security_service_provider_mssp_vs_in_house_soc_calculatorInputs): ValidationResult[] {
  const errors: ValidationResult[] = [];

  if (inputs.amount <= 0) {
    errors.push({ isValid: false, message: 'Amount must be greater than 0', field: 'amount' });
  }

  if (inputs.rate && (inputs.rate < 0 || inputs.rate > 1)) {
    errors.push({ isValid: false, message: 'Rate must be between 0 and 1', field: 'rate' });
  }

  return errors;
}

export function validatemanaged_security_service_provider_mssp_vs_in_house_soc_calculatorBusinessRules(inputs: managed_security_service_provider_mssp_vs_in_house_soc_calculatorInputs): ValidationResult[] {
  const warnings: ValidationResult[] = [];

  if (inputs.amount > 1000000) {
    warnings.push({ isValid: true, message: 'Large amount - consider professional advice', field: 'amount' });
  }

  return warnings;
}
