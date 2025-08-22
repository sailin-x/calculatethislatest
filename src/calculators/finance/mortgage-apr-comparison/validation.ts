import { CalculatorInputs } from '../../../types/calculator';
import { MortgageOption } from './formulas';

export interface MortgageAPRComparisonInputs extends CalculatorInputs {
  loanAmount: number;
  loanTerm: number;
  propertyValue?: number;
  downPayment?: number;
  downPaymentPercentage?: number;
  creditScore?: number;
  propertyType?: string;
  occupancyType?: string;
  loanType?: string;
  state?: string;
  propertyTaxRate?: number;
  homeownersInsuranceRate?: number;
  pmiRate?: number;
  mortgageOptions: MortgageOption[];
}

export const validateMortgageAPRComparisonInputs = (inputs: Partial<MortgageAPRComparisonInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (!inputs.mortgageOptions || inputs.mortgageOptions.length === 0) {
    errors.push('At least one mortgage option must be provided');
  }

  if (inputs.mortgageOptions && inputs.mortgageOptions.length < 2) {
    errors.push('At least two mortgage options are required for comparison');
  }

  // Validate each mortgage option
  if (inputs.mortgageOptions) {
    inputs.mortgageOptions.forEach((option, index) => {
      if (!option.id || !option.name) {
        errors.push(`Mortgage option ${index + 1} must have an ID and name`);
      }

      if (!option.interestRate || option.interestRate <= 0) {
        errors.push(`Mortgage option ${index + 1} must have a valid interest rate`);
      }

      if (option.interestRate && (option.interestRate < 0.1 || option.interestRate > 25)) {
        errors.push(`Mortgage option ${index + 1} interest rate should be between 0.1% and 25%`);
      }

      if (option.closingCosts && option.closingCosts < 0) {
        errors.push(`Mortgage option ${index + 1} closing costs cannot be negative`);
      }

      if (option.points && (option.points < 0 || option.points > 10)) {
        errors.push(`Mortgage option ${index + 1} points should be between 0% and 10%`);
      }

      if (option.originationFee && option.originationFee < 0) {
        errors.push(`Mortgage option ${index + 1} origination fee cannot be negative`);
      }

      if (option.applicationFee && option.applicationFee < 0) {
        errors.push(`Mortgage option ${index + 1} application fee cannot be negative`);
      }

      if (option.appraisalFee && option.appraisalFee < 0) {
        errors.push(`Mortgage option ${index + 1} appraisal fee cannot be negative`);
      }

      if (option.titleInsurance && option.titleInsurance < 0) {
        errors.push(`Mortgage option ${index + 1} title insurance cannot be negative`);
      }

      if (option.escrowFees && option.escrowFees < 0) {
        errors.push(`Mortgage option ${index + 1} escrow fees cannot be negative`);
      }

      if (option.otherFees && option.otherFees < 0) {
        errors.push(`Mortgage option ${index + 1} other fees cannot be negative`);
      }

      if (option.rateLockFee && option.rateLockFee < 0) {
        errors.push(`Mortgage option ${index + 1} rate lock fee cannot be negative`);
      }

      if (option.prepaymentPenalty && (option.prepaymentPenalty < 0 || option.prepaymentPenalty > 20)) {
        errors.push(`Mortgage option ${index + 1} prepayment penalty should be between 0% and 20%`);
      }

      if (option.monthlyPMI && option.monthlyPMI < 0) {
        errors.push(`Mortgage option ${index + 1} monthly PMI cannot be negative`);
      }

      if (option.monthlyPropertyTax && option.monthlyPropertyTax < 0) {
        errors.push(`Mortgage option ${index + 1} monthly property tax cannot be negative`);
      }

      if (option.monthlyInsurance && option.monthlyInsurance < 0) {
        errors.push(`Mortgage option ${index + 1} monthly insurance cannot be negative`);
      }
    });
  }

  // Range validation
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000)) {
    errors.push('Loan amount should be between $10,000 and $5,000,000');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term should be between 1 and 50 years');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value should be between $10,000 and $10,000,000');
  }

  if (inputs.downPayment && inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPaymentPercentage && (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100)) {
    errors.push('Down payment percentage should be between 0% and 100%');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score should be between 300 and 850');
  }

  if (inputs.propertyTaxRate && (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 10)) {
    errors.push('Property tax rate should be between 0% and 10%');
  }

  if (inputs.homeownersInsuranceRate && (inputs.homeownersInsuranceRate < 0 || inputs.homeownersInsuranceRate > 5)) {
    errors.push('Homeowners insurance rate should be between 0% and 5%');
  }

  if (inputs.pmiRate && (inputs.pmiRate < 0 || inputs.pmiRate > 2)) {
    errors.push('PMI rate should be between 0% and 2%');
  }

  // Logical validation
  if (inputs.propertyValue && inputs.downPayment && inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  if (inputs.propertyValue && inputs.loanAmount && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.downPayment && inputs.propertyValue && inputs.downPaymentPercentage) {
    const calculatedPercentage = (inputs.downPayment / inputs.propertyValue) * 100;
    if (Math.abs(calculatedPercentage - inputs.downPaymentPercentage) > 1) {
      errors.push('Down payment percentage does not match down payment amount and property value');
    }
  }

  // Check for duplicate option IDs
  if (inputs.mortgageOptions) {
    const ids = inputs.mortgageOptions.map(option => option.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      errors.push('Mortgage options must have unique IDs');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};