import { CalculatorInputs } from '../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a number' };
  }
  if (numValue < 50000) {
    return { isValid: false, message: 'Property value must be at least $50,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'Property value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan amount must be a number' };
  }
  if (numValue < 10000) {
    return { isValid: false, message: 'Loan amount must be at least $10,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  if (numValue > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a number' };
  }
  if (numValue < 10) {
    return { isValid: false, message: 'Loan term must be at least 10 years' };
  }
  if (numValue > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Monthly payment must be a number' };
  }
  if (numValue < 100) {
    return { isValid: false, message: 'Monthly payment must be at least $100' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Monthly payment cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateCurrentEscrowBalance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Current escrow balance must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Current escrow balance cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Current escrow balance cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateAnnualPropertyTax(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual property tax must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual property tax cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Annual property tax cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateAnnualHomeInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual home insurance must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual home insurance cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Annual home insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateAnnualPMI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual PMI must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual PMI cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Annual PMI cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateAnnualFloodInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual flood insurance must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual flood insurance cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Annual flood insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateEscrowCushion(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Escrow cushion must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Escrow cushion cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Escrow cushion cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateTaxAssessmentIncrease(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Tax assessment increase must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Tax assessment increase cannot be negative' };
  }
  if (numValue > 20) {
    return { isValid: false, message: 'Tax assessment increase cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInsuranceRateIncrease(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Insurance rate increase must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Insurance rate increase cannot be negative' };
  }
  if (numValue > 30) {
    return { isValid: false, message: 'Insurance rate increase cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Analysis period must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 month' };
  }
  if (numValue > 60) {
    return { isValid: false, message: 'Analysis period cannot exceed 60 months' };
  }
  return { isValid: true };
}

export function validatePropertyTaxPaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Invalid property tax payment frequency' };
  }
  return { isValid: true };
}

export function validateInsurancePaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Invalid insurance payment frequency' };
  }
  return { isValid: true };
}

export function validatePMIPaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Invalid PMI payment frequency' };
  }
  return { isValid: true };
}

export function validateFloodInsurancePaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Invalid flood insurance payment frequency' };
  }
  return { isValid: true };
}

export function validatePaymentHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validHistory = ['current', 'late-30', 'late-60', 'late-90'];
  if (!validHistory.includes(value)) {
    return { isValid: false, message: 'Invalid payment history status' };
  }
  return { isValid: true };
}

export function validateEscrowAccountType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['required', 'voluntary', 'waived'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Invalid escrow account type' };
  }
  return { isValid: true };
}

export function validateAllEscrowAnalysisInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!inputs.propertyValue) errors.push('Property value is required');
  if (!inputs.loanAmount) errors.push('Loan amount is required');
  if (!inputs.interestRate) errors.push('Interest rate is required');
  if (!inputs.loanTerm) errors.push('Loan term is required');
  if (!inputs.monthlyPayment) errors.push('Monthly payment is required');
  if (!inputs.currentEscrowBalance) errors.push('Current escrow balance is required');
  if (!inputs.annualPropertyTax) errors.push('Annual property tax is required');
  if (!inputs.annualHomeInsurance) errors.push('Annual home insurance is required');
  if (!inputs.propertyTaxPaymentFrequency) errors.push('Property tax payment frequency is required');
  if (!inputs.insurancePaymentFrequency) errors.push('Insurance payment frequency is required');
  if (!inputs.escrowCushion) errors.push('Escrow cushion is required');
  if (!inputs.taxAssessmentIncrease) errors.push('Tax assessment increase is required');
  if (!inputs.insuranceRateIncrease) errors.push('Insurance rate increase is required');
  if (!inputs.analysisPeriod) errors.push('Analysis period is required');
  if (!inputs.paymentHistory) errors.push('Payment history is required');
  if (!inputs.escrowAccountType) errors.push('Escrow account type is required');

  // Individual field validation
  if (inputs.propertyValue) {
    const result = validatePropertyValue(inputs.propertyValue);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanAmount) {
    const result = validateLoanAmount(inputs.loanAmount);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.interestRate) {
    const result = validateInterestRate(inputs.interestRate);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanTerm) {
    const result = validateLoanTerm(inputs.loanTerm);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.monthlyPayment) {
    const result = validateMonthlyPayment(inputs.monthlyPayment);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.currentEscrowBalance) {
    const result = validateCurrentEscrowBalance(inputs.currentEscrowBalance);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualPropertyTax) {
    const result = validateAnnualPropertyTax(inputs.annualPropertyTax);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualHomeInsurance) {
    const result = validateAnnualHomeInsurance(inputs.annualHomeInsurance);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualPMI) {
    const result = validateAnnualPMI(inputs.annualPMI);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualFloodInsurance) {
    const result = validateAnnualFloodInsurance(inputs.annualFloodInsurance);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.escrowCushion) {
    const result = validateEscrowCushion(inputs.escrowCushion);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.taxAssessmentIncrease) {
    const result = validateTaxAssessmentIncrease(inputs.taxAssessmentIncrease);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.insuranceRateIncrease) {
    const result = validateInsuranceRateIncrease(inputs.insuranceRateIncrease);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.analysisPeriod) {
    const result = validateAnalysisPeriod(inputs.analysisPeriod);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyTaxPaymentFrequency) {
    const result = validatePropertyTaxPaymentFrequency(inputs.propertyTaxPaymentFrequency);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.insurancePaymentFrequency) {
    const result = validateInsurancePaymentFrequency(inputs.insurancePaymentFrequency);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.pmiPaymentFrequency) {
    const result = validatePMIPaymentFrequency(inputs.pmiPaymentFrequency);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.floodInsurancePaymentFrequency) {
    const result = validateFloodInsurancePaymentFrequency(inputs.floodInsurancePaymentFrequency);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.paymentHistory) {
    const result = validatePaymentHistory(inputs.paymentHistory);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.escrowAccountType) {
    const result = validateEscrowAccountType(inputs.escrowAccountType);
    if (!result.isValid) errors.push(result.message!);
  }

  // Logical consistency checks
  if (inputs.propertyValue && inputs.loanAmount) {
    const propertyValue = Number(inputs.propertyValue);
    const loanAmount = Number(inputs.loanAmount);
    if (loanAmount > propertyValue) {
      errors.push('Loan amount cannot exceed property value');
    }
  }

  if (inputs.currentEscrowBalance && inputs.escrowCushion) {
    const currentBalance = Number(inputs.currentEscrowBalance);
    const cushion = Number(inputs.escrowCushion);
    if (currentBalance < cushion * 0.5) {
      errors.push('Current escrow balance is very low relative to required cushion');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
