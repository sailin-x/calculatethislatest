import { ValidationResult } from '../../../types/calculator';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan amount must be a valid number' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Loan amount must be at least $10,000' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateInterestRate1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInterestRate2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInterestRate3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateOriginationFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Origination fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Origination fee cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Origination fee cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateOriginationFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Origination fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Origination fee cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Origination fee cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateOriginationFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Origination fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Origination fee cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Origination fee cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateDiscountPoints1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Discount points must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Discount points cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateDiscountPoints2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Discount points must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Discount points cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateDiscountPoints3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Discount points must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Discount points cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateAppraisalFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Appraisal fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Appraisal fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Appraisal fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateAppraisalFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Appraisal fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Appraisal fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Appraisal fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateAppraisalFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Appraisal fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Appraisal fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Appraisal fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateTitleInsurance1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Title insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Title insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Title insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateTitleInsurance2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Title insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Title insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Title insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateTitleInsurance3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Title insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Title insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Title insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateEscrowFees1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Escrow fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Escrow fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Escrow fees cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateEscrowFees2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Escrow fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Escrow fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Escrow fees cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateEscrowFees3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Escrow fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Escrow fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Escrow fees cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateCreditReportFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Credit report fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Credit report fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Credit report fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateCreditReportFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Credit report fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Credit report fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Credit report fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateCreditReportFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Credit report fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Credit report fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Credit report fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateProcessingFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Processing fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Processing fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Processing fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateProcessingFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Processing fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Processing fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Processing fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateProcessingFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Processing fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Processing fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Processing fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateUnderwritingFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Underwriting fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Underwriting fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Underwriting fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateUnderwritingFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Underwriting fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Underwriting fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Underwriting fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateUnderwritingFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Underwriting fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Underwriting fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Underwriting fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateDocumentPreparationFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Document preparation fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Document preparation fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Document preparation fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validateDocumentPreparationFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Document preparation fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Document preparation fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Document preparation fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validateDocumentPreparationFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Document preparation fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Document preparation fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Document preparation fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validateFloodCertificationFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Flood certification fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Flood certification fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Flood certification fee cannot exceed $500' };
  }
  return { isValid: true };
}

export function validateFloodCertificationFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Flood certification fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Flood certification fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Flood certification fee cannot exceed $500' };
  }
  return { isValid: true };
}

export function validateFloodCertificationFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Flood certification fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Flood certification fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Flood certification fee cannot exceed $500' };
  }
  return { isValid: true };
}

export function validateTaxServiceFee1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Tax service fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Tax service fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Tax service fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateTaxServiceFee2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Tax service fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Tax service fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Tax service fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateTaxServiceFee3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Tax service fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Tax service fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Tax service fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInterest1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid interest must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid interest cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid interest cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInterest2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid interest must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid interest cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid interest cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInterest3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid interest must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid interest cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid interest cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInsurance1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInsurance2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidInsurance3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Prepaid insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePrepaidTaxes1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid taxes cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, message: 'Prepaid taxes cannot exceed $20,000' };
  }
  return { isValid: true };
}

export function validatePrepaidTaxes2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid taxes cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, message: 'Prepaid taxes cannot exceed $20,000' };
  }
  return { isValid: true };
}

export function validatePrepaidTaxes3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid taxes cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, message: 'Prepaid taxes cannot exceed $20,000' };
  }
  return { isValid: true };
}

export function validateLenderCredits1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Lender credits must be a valid number' };
  }
  if (value < -50000) {
    return { isValid: false, message: 'Lender credits cannot be less than -$50,000' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Lender credits cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateLenderCredits2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Lender credits must be a valid number' };
  }
  if (value < -50000) {
    return { isValid: false, message: 'Lender credits cannot be less than -$50,000' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Lender credits cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateLenderCredits3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Lender credits must be a valid number' };
  }
  if (value < -50000) {
    return { isValid: false, message: 'Lender credits cannot be less than -$50,000' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Lender credits cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateAllMortgageAPRComparisonInputs(inputs: Record<string, any>): ValidationResult {
  const validators = [
    validateLoanAmount,
    validateLoanTerm,
    validateInterestRate1,
    validateInterestRate2,
    validateInterestRate3,
    validateOriginationFee1,
    validateOriginationFee2,
    validateOriginationFee3,
    validateDiscountPoints1,
    validateDiscountPoints2,
    validateDiscountPoints3,
    validateAppraisalFee1,
    validateAppraisalFee2,
    validateAppraisalFee3,
    validateTitleInsurance1,
    validateTitleInsurance2,
    validateTitleInsurance3,
    validateEscrowFees1,
    validateEscrowFees2,
    validateEscrowFees3,
    validateCreditReportFee1,
    validateCreditReportFee2,
    validateCreditReportFee3,
    validateProcessingFee1,
    validateProcessingFee2,
    validateProcessingFee3,
    validateUnderwritingFee1,
    validateUnderwritingFee2,
    validateUnderwritingFee3,
    validateDocumentPreparationFee1,
    validateDocumentPreparationFee2,
    validateDocumentPreparationFee3,
    validateFloodCertificationFee1,
    validateFloodCertificationFee2,
    validateFloodCertificationFee3,
    validateTaxServiceFee1,
    validateTaxServiceFee2,
    validateTaxServiceFee3,
    validatePrepaidInterest1,
    validatePrepaidInterest2,
    validatePrepaidInterest3,
    validatePrepaidInsurance1,
    validatePrepaidInsurance2,
    validatePrepaidInsurance3,
    validatePrepaidTaxes1,
    validatePrepaidTaxes2,
    validatePrepaidTaxes3,
    validateLenderCredits1,
    validateLenderCredits2,
    validateLenderCredits3
  ];

  for (const validator of validators) {
    const fieldName = validator.name.replace('validate', '').replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
    const value = inputs[fieldName];
    const result = validator(value, inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}
