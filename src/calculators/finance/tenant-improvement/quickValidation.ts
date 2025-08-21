import { CalculatorInputs } from '../../../types/calculator';

export function validateSpaceSize(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Space size is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Space size must be a valid number';
  }
  if (value < 100) {
    return 'Space size must be at least 100 sq ft';
  }
  if (value > 100000) {
    return 'Space size cannot exceed 100,000 sq ft';
  }
  return null;
}

export function validateLeaseTerm(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Lease term is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Lease term must be a valid number';
  }
  if (value < 1) {
    return 'Lease term must be at least 1 year';
  }
  if (value > 20) {
    return 'Lease term cannot exceed 20 years';
  }
  return null;
}

export function validateBaseRent(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Base rent is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Base rent must be a valid number';
  }
  if (value < 5) {
    return 'Base rent must be at least $5 per sq ft/year';
  }
  if (value > 200) {
    return 'Base rent cannot exceed $200 per sq ft/year';
  }
  return null;
}

export function validateTIAllowance(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'TI allowance is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'TI allowance must be a valid number';
  }
  if (value < 0) {
    return 'TI allowance cannot be negative';
  }
  if (value > 100) {
    return 'TI allowance cannot exceed $100 per sq ft';
  }
  return null;
}

export function validateConstructionCosts(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Construction costs is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Construction costs must be a valid number';
  }
  if (value < 5) {
    return 'Construction costs must be at least $5 per sq ft';
  }
  if (value > 150) {
    return 'Construction costs cannot exceed $150 per sq ft';
  }
  return null;
}

export function validateDesignFees(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Design fees is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Design fees must be a valid number';
  }
  if (value < 0) {
    return 'Design fees cannot be negative';
  }
  if (value > 500000) {
    return 'Design fees cannot exceed $500,000';
  }
  return null;
}

export function validatePermits(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Permit costs is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Permit costs must be a valid number';
  }
  if (value < 0) {
    return 'Permit costs cannot be negative';
  }
  if (value > 100000) {
    return 'Permit costs cannot exceed $100,000';
  }
  return null;
}

export function validateFurniture(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Furniture costs is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Furniture costs must be a valid number';
  }
  if (value < 0) {
    return 'Furniture costs cannot be negative';
  }
  if (value > 300000) {
    return 'Furniture costs cannot exceed $300,000';
  }
  return null;
}

export function validateTechnology(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Technology costs is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Technology costs must be a valid number';
  }
  if (value < 0) {
    return 'Technology costs cannot be negative';
  }
  if (value > 200000) {
    return 'Technology costs cannot exceed $200,000';
  }
  return null;
}

export function validateContingency(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Contingency is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Contingency must be a valid number';
  }
  if (value < 0) {
    return 'Contingency cannot be negative';
  }
  if (value > 25) {
    return 'Contingency cannot exceed 25%';
  }
  return null;
}

export function validateAmortizationPeriod(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Amortization period is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Amortization period must be a valid number';
  }
  if (value < 1) {
    return 'Amortization period must be at least 1 year';
  }
  if (value > 10) {
    return 'Amortization period cannot exceed 10 years';
  }
  return null;
}

export function validateInterestRate(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Interest rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Interest rate must be a valid number';
  }
  if (value < 1) {
    return 'Interest rate must be at least 1%';
  }
  if (value > 15) {
    return 'Interest rate cannot exceed 15%';
  }
  return null;
}

export function validateTenantContribution(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Tenant contribution is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Tenant contribution must be a valid number';
  }
  if (value < 0) {
    return 'Tenant contribution cannot be negative';
  }
  if (value > 1000000) {
    return 'Tenant contribution cannot exceed $1,000,000';
  }
  return null;
}

export function validateLandlordContribution(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Landlord contribution is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Landlord contribution must be a valid number';
  }
  if (value < 0) {
    return 'Landlord contribution cannot be negative';
  }
  if (value > 1000000) {
    return 'Landlord contribution cannot exceed $1,000,000';
  }
  return null;
}

export function validateRentEscalation(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Rent escalation is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Rent escalation must be a valid number';
  }
  if (value < 0) {
    return 'Rent escalation cannot be negative';
  }
  if (value > 10) {
    return 'Rent escalation cannot exceed 10%';
  }
  return null;
}

export function validateOperatingExpenses(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Operating expenses is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Operating expenses must be a valid number';
  }
  if (value < 2) {
    return 'Operating expenses must be at least $2 per sq ft/year';
  }
  if (value > 50) {
    return 'Operating expenses cannot exceed $50 per sq ft/year';
  }
  return null;
}

export function validateTaxRate(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Tax rate is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Tax rate must be a valid number';
  }
  if (value < 0) {
    return 'Tax rate cannot be negative';
  }
  if (value > 50) {
    return 'Tax rate cannot exceed 50%';
  }
  return null;
}

export function validateDepreciationPeriod(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Depreciation period is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Depreciation period must be a valid number';
  }
  if (value < 5) {
    return 'Depreciation period must be at least 5 years';
  }
  if (value > 50) {
    return 'Depreciation period cannot exceed 50 years';
  }
  return null;
}

export function validateAnalysisPeriod(value: number): string | null {
  if (value === undefined || value === null || value === '') {
    return 'Analysis period is required';
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return 'Analysis period must be a valid number';
  }
  if (value < 1) {
    return 'Analysis period must be at least 1 year';
  }
  if (value > 20) {
    return 'Analysis period cannot exceed 20 years';
  }
  return null;
}

export function validateAllTenantImprovementInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate each field
  const validations = [
    { field: 'spaceSize', validator: validateSpaceSize },
    { field: 'leaseTerm', validator: validateLeaseTerm },
    { field: 'baseRent', validator: validateBaseRent },
    { field: 'tiAllowance', validator: validateTIAllowance },
    { field: 'constructionCosts', validator: validateConstructionCosts },
    { field: 'designFees', validator: validateDesignFees },
    { field: 'permits', validator: validatePermits },
    { field: 'furniture', validator: validateFurniture },
    { field: 'technology', validator: validateTechnology },
    { field: 'contingency', validator: validateContingency },
    { field: 'amortizationPeriod', validator: validateAmortizationPeriod },
    { field: 'interestRate', validator: validateInterestRate },
    { field: 'tenantContribution', validator: validateTenantContribution },
    { field: 'landlordContribution', validator: validateLandlordContribution },
    { field: 'rentEscalation', validator: validateRentEscalation },
    { field: 'operatingExpenses', validator: validateOperatingExpenses },
    { field: 'taxRate', validator: validateTaxRate },
    { field: 'depreciationPeriod', validator: validateDepreciationPeriod },
    { field: 'analysisPeriod', validator: validateAnalysisPeriod }
  ];

  for (const validation of validations) {
    const error = validation.validator(inputs[validation.field] as number, inputs);
    if (error) {
      errors.push(error);
    }
  }

  // Cross-field validations
  if (inputs.amortizationPeriod && inputs.leaseTerm && (inputs.amortizationPeriod as number) > (inputs.leaseTerm as number)) {
    warnings.push('Amortization period exceeds lease term');
  }

  if (inputs.analysisPeriod && inputs.leaseTerm && (inputs.analysisPeriod as number) > (inputs.leaseTerm as number)) {
    warnings.push('Analysis period extends beyond lease term');
  }

  // Warnings for business logic
  if (inputs.contingency && (inputs.contingency as number) < 5) {
    warnings.push('Low contingency may not provide adequate buffer');
  }

  if (inputs.contingency && (inputs.contingency as number) > 15) {
    warnings.push('High contingency may indicate cost uncertainty');
  }

  if (inputs.rentEscalation && (inputs.rentEscalation as number) > 5) {
    warnings.push('High rent escalation may impact long-term costs');
  }

  if (inputs.interestRate && (inputs.interestRate as number) > 10) {
    warnings.push('High interest rate may make financing expensive');
  }

  if (inputs.baseRent && inputs.operatingExpenses && (inputs.baseRent as number) < (inputs.operatingExpenses as number)) {
    warnings.push('Base rent is lower than operating expenses');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
