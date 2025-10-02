import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTenantImprovementInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'spaceSize', 'leaseTerm', 'baseRent', 'tiAllowance', 'constructionCosts',
    'designFees', 'permits', 'furniture', 'technology', 'contingency',
    'amortizationPeriod', 'interestRate', 'tenantContribution', 'landlordContribution',
    'rentEscalation', 'operatingExpenses', 'taxRate', 'depreciationPeriod', 'analysisPeriod'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Type validation
  const numericFields = [
    'spaceSize', 'leaseTerm', 'baseRent', 'tiAllowance', 'constructionCosts',
    'designFees', 'permits', 'furniture', 'technology', 'contingency',
    'amortizationPeriod', 'interestRate', 'tenantContribution', 'landlordContribution',
    'rentEscalation', 'operatingExpenses', 'taxRate', 'depreciationPeriod', 'analysisPeriod'
  ];

  for (const field of numericFields) {
    const value = inputs[field];
    if (typeof value !== 'number' || isNaN(value)) {
      errors.push(`${field} must be a valid number`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Extract values for validation
  const spaceSize = inputs.spaceSize as number;
  const leaseTerm = inputs.leaseTerm as number;
  const baseRent = inputs.baseRent as number;
  const tiAllowance = inputs.tiAllowance as number;
  const constructionCosts = inputs.constructionCosts as number;
  const designFees = inputs.designFees as number;
  const permits = inputs.permits as number;
  const furniture = inputs.furniture as number;
  const technology = inputs.technology as number;
  const contingency = inputs.contingency as number;
  const amortizationPeriod = inputs.amortizationPeriod as number;
  const interestRate = inputs.interestRate as number;
  const tenantContribution = inputs.tenantContribution as number;
  const landlordContribution = inputs.landlordContribution as number;
  const rentEscalation = inputs.rentEscalation as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const taxRate = inputs.taxRate as number;
  const depreciationPeriod = inputs.depreciationPeriod as number;
  const analysisPeriod = inputs.analysisPeriod as number;

  // Range validation
  if (spaceSize < 100 || spaceSize > 100000) {
    errors.push('Space size must be between 100 and 100,000 sq ft');
  }

  if (leaseTerm < 1 || leaseTerm > 20) {
    errors.push('Lease term must be between 1 and 20 years');
  }

  if (baseRent < 5 || baseRent > 200) {
    errors.push('Base rent must be between $5 and $200 per sq ft/year');
  }

  if (tiAllowance < 0 || tiAllowance > 100) {
    errors.push('TI allowance must be between $0 and $100 per sq ft');
  }

  if (constructionCosts < 5 || constructionCosts > 150) {
    errors.push('Construction costs must be between $5 and $150 per sq ft');
  }

  if (designFees < 0 || designFees > 500000) {
    errors.push('Design fees must be between $0 and $500,000');
  }

  if (permits < 0 || permits > 100000) {
    errors.push('Permit costs must be between $0 and $100,000');
  }

  if (furniture < 0 || furniture > 300000) {
    errors.push('Furniture costs must be between $0 and $300,000');
  }

  if (technology < 0 || technology > 200000) {
    errors.push('Technology costs must be between $0 and $200,000');
  }

  if (contingency < 0 || contingency > 25) {
    errors.push('Contingency must be between 0% and 25%');
  }

  if (amortizationPeriod < 1 || amortizationPeriod > 10) {
    errors.push('Amortization period must be between 1 and 10 years');
  }

  if (interestRate < 1 || interestRate > 15) {
    errors.push('Interest rate must be between 1% and 15%');
  }

  if (tenantContribution < 0 || tenantContribution > 1000000) {
    errors.push('Tenant contribution must be between $0 and $1,000,000');
  }

  if (landlordContribution < 0 || landlordContribution > 1000000) {
    errors.push('Landlord contribution must be between $0 and $1,000,000');
  }

  if (rentEscalation < 0 || rentEscalation > 10) {
    errors.push('Rent escalation must be between 0% and 10%');
  }

  if (operatingExpenses < 2 || operatingExpenses > 50) {
    errors.push('Operating expenses must be between $2 and $50 per sq ft/year');
  }

  if (taxRate < 0 || taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (depreciationPeriod < 5 || depreciationPeriod > 50) {
    errors.push('Depreciation period must be between 5 and 50 years');
  }

  if (analysisPeriod < 1 || analysisPeriod > 20) {
    errors.push('Analysis period must be between 1 and 20 years');
  }

  // Logical validation
  if (amortizationPeriod > leaseTerm) {
    warnings.push('Amortization period exceeds lease term. This may result in unamortized costs.');
  }

  const totalTICosts = spaceSize * constructionCosts + designFees + permits + furniture + technology;
  const totalTICostsWithContingency = totalTICosts * (1 + contingency / 100);
  const tiAllowanceTotal = spaceSize * tiAllowance + landlordContribution;
  
  if (totalTICostsWithContingency > tiAllowanceTotal * 2) {
    warnings.push('TI costs significantly exceed allowance. Consider negotiating higher allowance or reducing scope.');
  }

  if (baseRent < operatingExpenses) {
    warnings.push('Base rent is lower than operating expenses. This may indicate unfavorable lease terms.');
  }

  if (contingency < 5) {
    warnings.push('Low contingency may not provide adequate buffer for cost overruns.');
  }

  if (contingency > 15) {
    warnings.push('High contingency may indicate uncertainty in cost estimates.');
  }

  if (rentEscalation > 5) {
    warnings.push('High rent escalation may significantly impact long-term costs.');
  }

  if (interestRate > 10) {
    warnings.push('High interest rate may make TI financing expensive.');
  }

  if (analysisPeriod > leaseTerm) {
    warnings.push('Analysis period extends beyond lease term. Consider lease renewal assumptions.');
  }

  // Business logic validation
  const costPerSqFt = totalTICostsWithContingency / spaceSize;
  if (costPerSqFt > 100) {
    warnings.push('Very high cost per square foot may indicate premium improvements or overbuilding.');
  }

  if (costPerSqFt < 10) {
    warnings.push('Very low cost per square foot may indicate minimal improvements or incomplete scope.');
  }

  const effectiveRent = baseRent + (totalTICostsWithContingency / spaceSize / amortizationPeriod);
  if (effectiveRent > baseRent * 1.5) {
    warnings.push('TI amortization significantly increases effective rent. Consider longer amortization period.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
