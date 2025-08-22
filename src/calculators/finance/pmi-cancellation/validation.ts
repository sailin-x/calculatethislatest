import { CalculatorInputs } from '../../../types/calculator';

export interface PMICancellationInputs extends CalculatorInputs {
  // Required inputs
  originalLoanAmount: number;
  currentLoanBalance: number;
  originalPropertyValue: number;
  pmiRate: number;
  loanType: 'conventional' | 'fha' | 'usda' | 'va';
  loanStartDate: string;
  
  // Optional inputs
  currentPropertyValue?: number;
  monthlyPMI?: number;
  downPayment?: number;
  downPaymentPercentage?: number;
  monthlyPayment?: number;
  interestRate?: number;
  loanTerm?: number;
  propertyAppreciation?: number;
  additionalPayments?: number;
  lumpSumPayment?: number;
  cancellationMethod?: 'automatic' | 'request' | 'automatic_78' | 'request_75' | 'refinance' | 'home_improvement';
  appraisalCost?: number;
  refinanceCosts?: number;
  newInterestRate?: number;
  
  // Analysis options
  includeAppreciation?: boolean;
  includeAdditionalPayments?: boolean;
  includeRefinance?: boolean;
  includeBreakEven?: boolean;
}

export const validatePMICancellationInputs = (inputs: Partial<PMICancellationInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    errors.push('Original loan amount is required and must be greater than 0');
  }

  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push('Current loan balance is required and must be greater than 0');
  }

  if (!inputs.originalPropertyValue || inputs.originalPropertyValue <= 0) {
    errors.push('Original property value is required and must be greater than 0');
  }

  if (!inputs.pmiRate || inputs.pmiRate <= 0) {
    errors.push('PMI rate is required and must be greater than 0');
  }

  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }

  if (!inputs.loanStartDate) {
    errors.push('Loan start date is required');
  }

  // Range validation
  if (inputs.originalLoanAmount && (inputs.originalLoanAmount < 10000 || inputs.originalLoanAmount > 10000000)) {
    errors.push('Original loan amount must be between $10,000 and $10,000,000');
  }

  if (inputs.currentLoanBalance && (inputs.currentLoanBalance < 1000 || inputs.currentLoanBalance > 10000000)) {
    errors.push('Current loan balance must be between $1,000 and $10,000,000');
  }

  if (inputs.originalPropertyValue && (inputs.originalPropertyValue < 10000 || inputs.originalPropertyValue > 20000000)) {
    errors.push('Original property value must be between $10,000 and $20,000,000');
  }

  if (inputs.pmiRate && (inputs.pmiRate < 0.1 || inputs.pmiRate > 5)) {
    errors.push('PMI rate must be between 0.1% and 5%');
  }

  if (inputs.currentPropertyValue && inputs.currentPropertyValue <= 0) {
    errors.push('Current property value must be greater than 0');
  }

  if (inputs.monthlyPMI && inputs.monthlyPMI < 0) {
    errors.push('Monthly PMI cannot be negative');
  }

  if (inputs.downPayment && inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPaymentPercentage && (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100)) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  if (inputs.monthlyPayment && inputs.monthlyPayment < 0) {
    errors.push('Monthly payment cannot be negative');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.propertyAppreciation && (inputs.propertyAppreciation < -20 || inputs.propertyAppreciation > 50)) {
    errors.push('Property appreciation rate must be between -20% and 50%');
  }

  if (inputs.additionalPayments && inputs.additionalPayments < 0) {
    errors.push('Additional payments cannot be negative');
  }

  if (inputs.lumpSumPayment && inputs.lumpSumPayment < 0) {
    errors.push('Lump sum payment cannot be negative');
  }

  if (inputs.appraisalCost && inputs.appraisalCost < 0) {
    errors.push('Appraisal cost cannot be negative');
  }

  if (inputs.refinanceCosts && inputs.refinanceCosts < 0) {
    errors.push('Refinance costs cannot be negative');
  }

  if (inputs.newInterestRate && (inputs.newInterestRate < 0 || inputs.newInterestRate > 25)) {
    errors.push('New interest rate must be between 0% and 25%');
  }

  // Logical validation
  if (inputs.currentLoanBalance && inputs.originalLoanAmount && inputs.currentLoanBalance > inputs.originalLoanAmount) {
    errors.push('Current loan balance cannot exceed original loan amount');
  }

  if (inputs.currentPropertyValue && inputs.originalPropertyValue && inputs.currentPropertyValue < inputs.originalPropertyValue * 0.5) {
    errors.push('Current property value should not be less than 50% of original value');
  }

  if (inputs.currentPropertyValue && inputs.currentLoanBalance && inputs.currentLoanBalance > inputs.currentPropertyValue) {
    errors.push('Current loan balance cannot exceed current property value');
  }

  if (inputs.downPayment && inputs.originalPropertyValue && inputs.downPayment > inputs.originalPropertyValue) {
    errors.push('Down payment cannot exceed original property value');
  }

  if (inputs.downPaymentPercentage && inputs.downPayment && inputs.originalPropertyValue) {
    const calculatedPercentage = (inputs.downPayment / inputs.originalPropertyValue) * 100;
    if (Math.abs(calculatedPercentage - inputs.downPaymentPercentage) > 1) {
      errors.push('Down payment percentage does not match down payment amount');
    }
  }

  if (inputs.lumpSumPayment && inputs.currentLoanBalance && inputs.lumpSumPayment > inputs.currentLoanBalance) {
    errors.push('Lump sum payment cannot exceed current loan balance');
  }

  if (inputs.newInterestRate && inputs.interestRate && inputs.newInterestRate >= inputs.interestRate) {
    errors.push('New interest rate should be lower than current rate for refinance analysis');
  }

  // Loan type specific validation
  if (inputs.loanType === 'fha') {
    if (inputs.downPaymentPercentage && inputs.downPaymentPercentage < 3.5) {
      errors.push('FHA loans typically require minimum 3.5% down payment');
    }
  }

  if (inputs.loanType === 'conventional') {
    if (inputs.downPaymentPercentage && inputs.downPaymentPercentage < 3) {
      errors.push('Conventional loans typically require minimum 3% down payment');
    }
  }

  if (inputs.loanType === 'va') {
    if (inputs.downPaymentPercentage && inputs.downPaymentPercentage > 0) {
      errors.push('VA loans typically require 0% down payment');
    }
  }

  // Date validation
  if (inputs.loanStartDate) {
    const loanStartDate = new Date(inputs.loanStartDate);
    const now = new Date();
    
    if (isNaN(loanStartDate.getTime())) {
      errors.push('Invalid loan start date format');
    } else if (loanStartDate > now) {
      errors.push('Loan start date cannot be in the future');
    } else if (loanStartDate < new Date('1900-01-01')) {
      errors.push('Loan start date is too far in the past');
    }
  }

  // PMI rate validation based on loan type
  if (inputs.pmiRate && inputs.loanType) {
    if (inputs.loanType === 'fha' && (inputs.pmiRate < 0.45 || inputs.pmiRate > 1.05)) {
      errors.push('FHA PMI rates are typically between 0.45% and 1.05%');
    }
    
    if (inputs.loanType === 'conventional' && (inputs.pmiRate < 0.2 || inputs.pmiRate > 2.0)) {
      errors.push('Conventional PMI rates are typically between 0.2% and 2.0%');
    }
  }

  // LTV validation
  if (inputs.currentLoanBalance && inputs.currentPropertyValue) {
    const currentLTV = (inputs.currentLoanBalance / inputs.currentPropertyValue) * 100;
    
    if (currentLTV > 100) {
      errors.push('Current LTV cannot exceed 100%');
    }
    
    if (currentLTV < 50) {
      errors.push('Current LTV seems unusually low - please verify inputs');
    }
  }

  // Payment validation
  if (inputs.monthlyPayment && inputs.currentLoanBalance && inputs.interestRate && inputs.loanTerm) {
    const calculatedPayment = calculateMonthlyPayment(inputs.currentLoanBalance, inputs.interestRate, inputs.loanTerm);
    const paymentDifference = Math.abs(inputs.monthlyPayment - calculatedPayment);
    const paymentTolerance = calculatedPayment * 0.1; // 10% tolerance
    
    if (paymentDifference > paymentTolerance) {
      errors.push('Monthly payment seems inconsistent with loan terms - please verify');
    }
  }

  // Additional payments validation
  if (inputs.additionalPayments && inputs.monthlyPayment && inputs.additionalPayments > inputs.monthlyPayment * 0.5) {
    errors.push('Additional payments seem unusually high - please verify');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper function for payment calculation
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  if (monthlyRate === 0) return principal / totalMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}