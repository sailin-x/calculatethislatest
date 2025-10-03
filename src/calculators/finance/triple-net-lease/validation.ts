import { CalculatorInputs } from '../../../types/calculator';

export interface TripleNetLeaseROIValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTripleNetLeaseROIInputs(inputs: CalculatorInputs): TripleNetLeaseROIValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property value validation
  if (typeof inputs.propertyValue !== 'number' || isNaN(inputs.propertyValue)) {
    errors.push('Property value must be a valid number');
  } else if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  } else if (inputs.propertyValue > 100000000) {
    warnings.push('Property value is very high. Verify the value is correct');
  }

  // Down payment validation
  if (typeof inputs.downPayment !== 'number' || isNaN(inputs.downPayment)) {
    errors.push('Down payment must be a valid number');
  } else if (inputs.downPayment <= 0) {
    errors.push('Down payment must be greater than 0');
  } else if (inputs.downPayment >= inputs.propertyValue) {
    errors.push('Down payment must be less than property value');
  } else if (inputs.downPayment < inputs.propertyValue * 0.1) {
    warnings.push('Down payment is less than 10% of property value. This may affect loan approval');
  }

  // Interest rate validation
  if (typeof inputs.interestRate !== 'number' || isNaN(inputs.interestRate)) {
    errors.push('Interest rate must be a valid number');
  } else if (inputs.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  } else if (inputs.interestRate > 25) {
    warnings.push('Interest rate is very high. Verify the value is correct');
  }

  // Loan term validation
  if (typeof inputs.loanTerm !== 'number' || isNaN(inputs.loanTerm)) {
    errors.push('Loan term must be a valid number');
  } else if (inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  } else if (inputs.loanTerm > 30) {
    warnings.push('Loan term is longer than typical commercial loans');
  }

  // Annual rent validation
  if (typeof inputs.annualRent !== 'number' || isNaN(inputs.annualRent)) {
    errors.push('Annual rent must be a valid number');
  } else if (inputs.annualRent <= 0) {
    errors.push('Annual rent must be greater than 0');
  } else if (inputs.annualRent > 10000000) {
    warnings.push('Annual rent is very high. Verify the value is correct');
  }

  // Property taxes validation
  if (typeof inputs.propertyTaxes !== 'number' || isNaN(inputs.propertyTaxes)) {
    errors.push('Property taxes must be a valid number');
  } else if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  } else if (inputs.propertyTaxes > 1000000) {
    warnings.push('Property taxes are very high. Verify the value is correct');
  }

  // Insurance validation
  if (typeof inputs.insurance !== 'number' || isNaN(inputs.insurance)) {
    errors.push('Insurance must be a valid number');
  } else if (inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  } else if (inputs.insurance > 100000) {
    warnings.push('Insurance is very high. Verify the value is correct');
  }

  // Maintenance validation
  if (typeof inputs.maintenance !== 'number' || isNaN(inputs.maintenance)) {
    errors.push('Maintenance must be a valid number');
  } else if (inputs.maintenance < 0) {
    errors.push('Maintenance cannot be negative');
  } else if (inputs.maintenance > 500000) {
    warnings.push('Maintenance costs are very high. Verify the value is correct');
  }

  // Property management validation
  if (typeof inputs.propertyManagement !== 'number' || isNaN(inputs.propertyManagement)) {
    errors.push('Property management fee must be a valid number');
  } else if (inputs.propertyManagement < 0) {
    errors.push('Property management fee cannot be negative');
  } else if (inputs.propertyManagement > 20) {
    warnings.push('Property management fee is very high. Verify the value is correct');
  }

  // Vacancy rate validation
  if (typeof inputs.vacancyRate !== 'number' || isNaN(inputs.vacancyRate)) {
    errors.push('Vacancy rate must be a valid number');
  } else if (inputs.vacancyRate < 0) {
    errors.push('Vacancy rate cannot be negative');
  } else if (inputs.vacancyRate > 50) {
    errors.push('Vacancy rate cannot exceed 50%');
  }

  // Appreciation rate validation
  if (typeof inputs.appreciationRate !== 'number' || isNaN(inputs.appreciationRate)) {
    errors.push('Appreciation rate must be a valid number');
  } else if (inputs.appreciationRate < -10) {
    errors.push('Appreciation rate cannot be less than -10%');
  } else if (inputs.appreciationRate > 15) {
    warnings.push('Appreciation rate is very high. Verify the value is correct');
  }

  // Rent escalation validation
  if (typeof inputs.rentEscalation !== 'number' || isNaN(inputs.rentEscalation)) {
    errors.push('Rent escalation rate must be a valid number');
  } else if (inputs.rentEscalation < -5) {
    errors.push('Rent escalation rate cannot be less than -5%');
  } else if (inputs.rentEscalation > 10) {
    warnings.push('Rent escalation rate is very high. Verify the value is correct');
  }

  // Lease term validation
  if (typeof inputs.leaseTerm !== 'number' || isNaN(inputs.leaseTerm)) {
    errors.push('Lease term must be a valid number');
  } else if (inputs.leaseTerm <= 0) {
    errors.push('Lease term must be greater than 0');
  } else if (inputs.leaseTerm > 50) {
    warnings.push('Lease term is very long. Verify the value is correct');
  }

  // Tenant credit rating validation
  if (typeof inputs.tenantCreditRating !== 'string' || !inputs.tenantCreditRating) {
    errors.push('Tenant credit rating must be selected');
  }

  // Property type validation
  if (typeof inputs.propertyType !== 'string' || !inputs.propertyType) {
    errors.push('Property type must be selected');
  }

  // Analysis period validation
  if (typeof inputs.analysisPeriod !== 'number' || isNaN(inputs.analysisPeriod)) {
    errors.push('Analysis period must be a valid number');
  } else if (inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  } else if (inputs.analysisPeriod > 30) {
    warnings.push('Analysis period is very long. Consider a shorter period');
  }

  // Closing costs validation
  if (typeof inputs.closingCosts !== 'number' || isNaN(inputs.closingCosts)) {
    errors.push('Closing costs must be a valid number');
  } else if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 1000000) {
    warnings.push('Closing costs are very high. Verify the value is correct');
  }

  // Exit cap rate validation
  if (typeof inputs.exitCapRate !== 'number' || isNaN(inputs.exitCapRate)) {
    errors.push('Exit cap rate must be a valid number');
  } else if (inputs.exitCapRate < 3) {
    errors.push('Exit cap rate cannot be less than 3%');
  } else if (inputs.exitCapRate > 12) {
    errors.push('Exit cap rate cannot exceed 12%');
  }

  // Logical validation checks
  if (inputs.propertyValue && inputs.annualRent) {
    const rentToValueRatio = inputs.annualRent / inputs.propertyValue;
    if (rentToValueRatio < 0.02) {
      warnings.push('Rent to value ratio is very low. Verify the values are correct');
    } else if (rentToValueRatio > 0.25) {
      warnings.push('Rent to value ratio is very high. Verify the values are correct');
    }
  }

  if (inputs.propertyValue && inputs.propertyTaxes) {
    const taxRate = inputs.propertyTaxes / inputs.propertyValue;
    if (taxRate > 0.05) {
      warnings.push('Property tax rate is very high. Verify the values are correct');
    }
  }

  if (inputs.annualRent && inputs.propertyTaxes && inputs.insurance && inputs.maintenance) {
    const totalExpenses = inputs.propertyTaxes + inputs.insurance + inputs.maintenance;
    const expenseRatio = totalExpenses / inputs.annualRent;
    if (expenseRatio > 0.5) {
      warnings.push('Total expenses are very high relative to rent. Verify the values are correct');
    }
  }

  // Debt service coverage warning
  if (inputs.propertyValue && inputs.downPayment && inputs.interestRate && inputs.loanTerm && inputs.annualRent) {
    const loanAmount = inputs.propertyValue - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.loanTerm * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const annualDebtService = monthlyPayment * 12;
    
    const estimatedNOI = inputs.annualRent * (1 - inputs.vacancyRate / 100);
    const estimatedDSCR = estimatedNOI / annualDebtService;
    
    if (estimatedDSCR < 1.0) {
      warnings.push('Estimated debt service coverage ratio is below 1.0. This may indicate cash flow issues');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
