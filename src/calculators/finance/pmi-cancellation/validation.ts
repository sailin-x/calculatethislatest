import { ValidationRuleFactory } from '../../../utils/validation';
import { PMICancellationInputs } from './formulas';

export function validatePMICancellationInputs(inputs: PMICancellationInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  const originalLoanAmountRule = ValidationRuleFactory.required('originalLoanAmount', 'Original Loan Amount is required');
  if (!originalLoanAmountRule.validator(inputs.originalLoanAmount)) {
    errors.push(originalLoanAmountRule.message);
  }

  const currentBalanceRule = ValidationRuleFactory.required('currentBalance', 'Current Loan Balance is required');
  if (!currentBalanceRule.validator(inputs.currentBalance)) {
    errors.push(currentBalanceRule.message);
  }

  const originalHomeValueRule = ValidationRuleFactory.required('originalHomeValue', 'Original Home Value is required');
  if (!originalHomeValueRule.validator(inputs.originalHomeValue)) {
    errors.push(originalHomeValueRule.message);
  }

  const currentHomeValueRule = ValidationRuleFactory.required('currentHomeValue', 'Current Home Value is required');
  if (!currentHomeValueRule.validator(inputs.currentHomeValue)) {
    errors.push(currentHomeValueRule.message);
  }

  const downPaymentRule = ValidationRuleFactory.required('downPayment', 'Original Down Payment is required');
  if (!downPaymentRule.validator(inputs.downPayment)) {
    errors.push(downPaymentRule.message);
  }

  const loanTermRule = ValidationRuleFactory.required('loanTerm', 'Loan Term is required');
  if (!loanTermRule.validator(inputs.loanTerm)) {
    errors.push(loanTermRule.message);
  }

  const interestRateRule = ValidationRuleFactory.required('interestRate', 'Interest Rate is required');
  if (!interestRateRule.validator(inputs.interestRate)) {
    errors.push(interestRateRule.message);
  }

  const monthlyPaymentRule = ValidationRuleFactory.required('monthlyPayment', 'Monthly Payment is required');
  if (!monthlyPaymentRule.validator(inputs.monthlyPayment)) {
    errors.push(monthlyPaymentRule.message);
  }

  const pmiRateRule = ValidationRuleFactory.required('pmiRate', 'PMI Rate is required');
  if (!pmiRateRule.validator(inputs.pmiRate)) {
    errors.push(pmiRateRule.message);
  }

  const loanStartDateRule = ValidationRuleFactory.required('loanStartDate', 'Loan Start Date is required');
  if (!loanStartDateRule.validator(inputs.loanStartDate)) {
    errors.push(loanStartDateRule.message);
  }

  const paymentHistoryRule = ValidationRuleFactory.required('paymentHistory', 'Payment History is required');
  if (!paymentHistoryRule.validator(inputs.paymentHistory)) {
    errors.push(paymentHistoryRule.message);
  }

  const loanTypeRule = ValidationRuleFactory.required('loanType', 'Loan Type is required');
  if (!loanTypeRule.validator(inputs.loanType)) {
    errors.push(loanTypeRule.message);
  }

  const propertyTypeRule = ValidationRuleFactory.required('propertyType', 'Property Type is required');
  if (!propertyTypeRule.validator(inputs.propertyType)) {
    errors.push(propertyTypeRule.message);
  }

  // Range validations
  if (inputs.originalLoanAmount !== undefined) {
    const originalLoanAmountPositiveRule = ValidationRuleFactory.positive('originalLoanAmount', 'Original Loan Amount must be positive');
    if (!originalLoanAmountPositiveRule.validator(inputs.originalLoanAmount)) {
      errors.push(originalLoanAmountPositiveRule.message);
    }
    
    const originalLoanAmountRangeRule = ValidationRuleFactory.range('originalLoanAmount', 10000, 10000000, 'Original Loan Amount must be between $10,000 and $10,000,000');
    if (!originalLoanAmountRangeRule.validator(inputs.originalLoanAmount)) {
      errors.push(originalLoanAmountRangeRule.message);
    }
  }

  if (inputs.currentBalance !== undefined) {
    const currentBalanceNonNegativeRule = ValidationRuleFactory.nonNegative('currentBalance', 'Current Loan Balance must be non-negative');
    if (!currentBalanceNonNegativeRule.validator(inputs.currentBalance)) {
      errors.push(currentBalanceNonNegativeRule.message);
    }
    
    const currentBalanceRangeRule = ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current Loan Balance must be between $0 and $10,000,000');
    if (!currentBalanceRangeRule.validator(inputs.currentBalance)) {
      errors.push(currentBalanceRangeRule.message);
    }
  }

  if (inputs.originalHomeValue !== undefined) {
    const originalHomeValuePositiveRule = ValidationRuleFactory.positive('originalHomeValue', 'Original Home Value must be positive');
    if (!originalHomeValuePositiveRule.validator(inputs.originalHomeValue)) {
      errors.push(originalHomeValuePositiveRule.message);
    }
    
    const originalHomeValueRangeRule = ValidationRuleFactory.range('originalHomeValue', 10000, 10000000, 'Original Home Value must be between $10,000 and $10,000,000');
    if (!originalHomeValueRangeRule.validator(inputs.originalHomeValue)) {
      errors.push(originalHomeValueRangeRule.message);
    }
  }

  if (inputs.currentHomeValue !== undefined) {
    const currentHomeValuePositiveRule = ValidationRuleFactory.positive('currentHomeValue', 'Current Home Value must be positive');
    if (!currentHomeValuePositiveRule.validator(inputs.currentHomeValue)) {
      errors.push(currentHomeValuePositiveRule.message);
    }
    
    const currentHomeValueRangeRule = ValidationRuleFactory.range('currentHomeValue', 10000, 10000000, 'Current Home Value must be between $10,000 and $10,000,000');
    if (!currentHomeValueRangeRule.validator(inputs.currentHomeValue)) {
      errors.push(currentHomeValueRangeRule.message);
    }
  }

  if (inputs.downPayment !== undefined) {
    const downPaymentNonNegativeRule = ValidationRuleFactory.nonNegative('downPayment', 'Original Down Payment must be non-negative');
    if (!downPaymentNonNegativeRule.validator(inputs.downPayment)) {
      errors.push(downPaymentNonNegativeRule.message);
    }
    
    const downPaymentRangeRule = ValidationRuleFactory.range('downPayment', 0, 1000000, 'Original Down Payment must be between $0 and $1,000,000');
    if (!downPaymentRangeRule.validator(inputs.downPayment)) {
      errors.push(downPaymentRangeRule.message);
    }
  }

  if (inputs.loanTerm !== undefined) {
    const loanTermPositiveRule = ValidationRuleFactory.positive('loanTerm', 'Loan Term must be positive');
    if (!loanTermPositiveRule.validator(inputs.loanTerm)) {
      errors.push(loanTermPositiveRule.message);
    }
    
    const loanTermRangeRule = ValidationRuleFactory.range('loanTerm', 10, 50, 'Loan Term must be between 10 and 50 years');
    if (!loanTermRangeRule.validator(inputs.loanTerm)) {
      errors.push(loanTermRangeRule.message);
    }
  }

  if (inputs.interestRate !== undefined) {
    const interestRatePositiveRule = ValidationRuleFactory.positive('interestRate', 'Interest Rate must be positive');
    if (!interestRatePositiveRule.validator(inputs.interestRate)) {
      errors.push(interestRatePositiveRule.message);
    }
    
    const interestRateRangeRule = ValidationRuleFactory.range('interestRate', 0.1, 20, 'Interest Rate must be between 0.1% and 20%');
    if (!interestRateRangeRule.validator(inputs.interestRate)) {
      errors.push(interestRateRangeRule.message);
    }
  }

  if (inputs.monthlyPayment !== undefined) {
    const monthlyPaymentPositiveRule = ValidationRuleFactory.positive('monthlyPayment', 'Monthly Payment must be positive');
    if (!monthlyPaymentPositiveRule.validator(inputs.monthlyPayment)) {
      errors.push(monthlyPaymentPositiveRule.message);
    }
    
    const monthlyPaymentRangeRule = ValidationRuleFactory.range('monthlyPayment', 100, 50000, 'Monthly Payment must be between $100 and $50,000');
    if (!monthlyPaymentRangeRule.validator(inputs.monthlyPayment)) {
      errors.push(monthlyPaymentRangeRule.message);
    }
  }

  if (inputs.pmiRate !== undefined) {
    const pmiRatePositiveRule = ValidationRuleFactory.positive('pmiRate', 'PMI Rate must be positive');
    if (!pmiRatePositiveRule.validator(inputs.pmiRate)) {
      errors.push(pmiRatePositiveRule.message);
    }
    
    const pmiRateRangeRule = ValidationRuleFactory.range('pmiRate', 0.1, 2, 'PMI Rate must be between 0.1% and 2%');
    if (!pmiRateRangeRule.validator(inputs.pmiRate)) {
      errors.push(pmiRateRangeRule.message);
    }
  }

  // Optional field validations
  if (inputs.appreciationRate !== undefined) {
    const appreciationRateRangeRule = ValidationRuleFactory.range('appreciationRate', -10, 20, 'Appreciation Rate must be between -10% and 20%');
    if (!appreciationRateRangeRule.validator(inputs.appreciationRate)) {
      errors.push(appreciationRateRangeRule.message);
    }
  }

  if (inputs.additionalPayments !== undefined) {
    const additionalPaymentsNonNegativeRule = ValidationRuleFactory.nonNegative('additionalPayments', 'Additional Monthly Payments must be non-negative');
    if (!additionalPaymentsNonNegativeRule.validator(inputs.additionalPayments)) {
      errors.push(additionalPaymentsNonNegativeRule.message);
    }
    
    const additionalPaymentsRangeRule = ValidationRuleFactory.range('additionalPayments', 0, 10000, 'Additional Monthly Payments must be between $0 and $10,000');
    if (!additionalPaymentsRangeRule.validator(inputs.additionalPayments)) {
      errors.push(additionalPaymentsRangeRule.message);
    }
  }

  if (inputs.lumpSumPayment !== undefined) {
    const lumpSumPaymentNonNegativeRule = ValidationRuleFactory.nonNegative('lumpSumPayment', 'Lump Sum Payment must be non-negative');
    if (!lumpSumPaymentNonNegativeRule.validator(inputs.lumpSumPayment)) {
      errors.push(lumpSumPaymentNonNegativeRule.message);
    }
    
    const lumpSumPaymentRangeRule = ValidationRuleFactory.range('lumpSumPayment', 0, 100000, 'Lump Sum Payment must be between $0 and $100,000');
    if (!lumpSumPaymentRangeRule.validator(inputs.lumpSumPayment)) {
      errors.push(lumpSumPaymentRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.originalLoanAmount !== undefined && inputs.originalHomeValue !== undefined) {
    const originalLTV = (inputs.originalLoanAmount / inputs.originalHomeValue) * 100;
    if (originalLTV > 100) {
      errors.push('Original loan amount cannot exceed original home value');
    }
    if (originalLTV < 50) {
      errors.push('Original loan-to-value ratio seems unusually low');
    }
  }

  if (inputs.currentBalance !== undefined && inputs.currentHomeValue !== undefined) {
    const currentLTV = (inputs.currentBalance / inputs.currentHomeValue) * 100;
    if (currentLTV > 100) {
      errors.push('Current loan balance cannot exceed current home value');
    }
  }

  if (inputs.originalLoanAmount !== undefined && inputs.currentBalance !== undefined) {
    if (inputs.currentBalance > inputs.originalLoanAmount) {
      errors.push('Current loan balance cannot exceed original loan amount');
    }
  }

  if (inputs.originalHomeValue !== undefined && inputs.downPayment !== undefined && inputs.originalLoanAmount !== undefined) {
    const calculatedLoanAmount = inputs.originalHomeValue - inputs.downPayment;
    const difference = Math.abs(calculatedLoanAmount - inputs.originalLoanAmount);
    if (difference > inputs.originalHomeValue * 0.1) {
      errors.push('Original loan amount, home value, and down payment do not align properly');
    }
  }

  if (inputs.monthlyPayment !== undefined && inputs.originalLoanAmount !== undefined && inputs.interestRate !== undefined && inputs.loanTerm !== undefined) {
    const calculatedPayment = calculateMonthlyPayment(
      inputs.originalLoanAmount,
      inputs.interestRate / 100 / 12,
      inputs.loanTerm * 12
    );
    const difference = Math.abs(calculatedPayment - inputs.monthlyPayment);
    if (difference > calculatedPayment * 0.2) {
      errors.push('Monthly payment seems inconsistent with loan terms');
    }
  }

  // PMI-specific validations
  if (inputs.originalLoanAmount !== undefined && inputs.originalHomeValue !== undefined) {
    const originalLTV = (inputs.originalLoanAmount / inputs.originalHomeValue) * 100;
    if (originalLTV <= 80 && inputs.pmiRate !== undefined && inputs.pmiRate > 0) {
      errors.push('PMI should not be required when original LTV is 80% or less');
    }
  }

  if (inputs.loanType === 'va' && inputs.pmiRate !== undefined && inputs.pmiRate > 0) {
    errors.push('VA loans do not require PMI');
  }

  if (inputs.loanType === 'fha' && inputs.pmiRate !== undefined && inputs.pmiRate < 0.5) {
    errors.push('FHA loans typically have higher MIP rates');
  }

  // Date validations
  if (inputs.loanStartDate) {
    const loanStartDate = new Date(inputs.loanStartDate);
    const today = new Date();
    
    if (loanStartDate > today) {
      errors.push('Loan start date cannot be in the future');
    }
    
    if (loanStartDate < new Date('1980-01-01')) {
      errors.push('Loan start date seems too far in the past');
    }
  }

  return errors;
}

/**
 * Calculate monthly payment for validation
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) return principal / totalPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}