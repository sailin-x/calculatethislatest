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

export function validateHomePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Home price must be a valid number' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Home price must be at least $10,000' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Home price cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative' };
  }
  if (allInputs?.homePrice && value > allInputs.homePrice) {
    return { isValid: false, message: 'Down payment cannot exceed home price' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateOriginationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateDiscountPoints(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateAppraisalFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateCreditReportFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateFloodCertificationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateTaxServiceFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateProcessingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateUnderwritingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateDocumentPreparationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateTitleInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateTitleSearchFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Title search fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Title search fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Title search fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validateTitleEndorsements(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Title endorsements must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Title endorsements cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Title endorsements cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateEscrowFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Escrow fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Escrow fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Escrow fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateAttorneyFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Attorney fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Attorney fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, message: 'Attorney fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

export function validateSurveyFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Survey fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Survey fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Survey fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validatePestInspectionFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Pest inspection fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Pest inspection fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Pest inspection fee cannot exceed $500' };
  }
  return { isValid: true };
}

export function validateHomeInspectionFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Home inspection fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Home inspection fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Home inspection fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateRecordingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Recording fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Recording fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Recording fee cannot exceed $500' };
  }
  return { isValid: true };
}

export function validateTransferTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Transfer tax must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Transfer tax cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Transfer tax cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validatePropertyTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property tax rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property tax rate cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Property tax rate cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validatePropertyTaxMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property tax months must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property tax months cannot be negative' };
  }
  if (value > 12) {
    return { isValid: false, message: 'Property tax months cannot exceed 12' };
  }
  return { isValid: true };
}

export function validateHomeownersInsuranceAnnual(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Homeowners insurance annual must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Homeowners insurance annual cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Homeowners insurance annual cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateInsuranceMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Insurance months must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Insurance months cannot be negative' };
  }
  if (value > 12) {
    return { isValid: false, message: 'Insurance months cannot exceed 12' };
  }
  return { isValid: true };
}

export function validateMortgageInsuranceType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'string') {
    return { isValid: false, message: 'Mortgage insurance type is required' };
  }
  const validTypes = ['none', 'pmi', 'mip', 'usda', 'va'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Invalid mortgage insurance type' };
  }
  return { isValid: true };
}

export function validateMortgageInsuranceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mortgage insurance rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mortgage insurance rate cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Mortgage insurance rate cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateLenderCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateSellerCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Seller credits must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Seller credits cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Seller credits cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'string') {
    return { isValid: false, message: 'Closing date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Invalid closing date format' };
  }
  return { isValid: true };
}

export function validateFirstPaymentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'string') {
    return { isValid: false, message: 'First payment date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Invalid first payment date format' };
  }
  if (allInputs?.closingDate) {
    const closingDate = new Date(allInputs.closingDate);
    if (date <= closingDate) {
      return { isValid: false, message: 'First payment date must be after closing date' };
    }
  }
  return { isValid: true };
}

// Consolidated validation function
export function validateAllMortgageClosingCostInputs(inputs: Record<string, any>): ValidationResult {
  const validators = [
    validateLoanAmount,
    validateHomePrice,
    validateDownPayment,
    validateInterestRate,
    validateLoanTerm,
    validateOriginationFee,
    validateDiscountPoints,
    validateAppraisalFee,
    validateCreditReportFee,
    validateFloodCertificationFee,
    validateTaxServiceFee,
    validateProcessingFee,
    validateUnderwritingFee,
    validateDocumentPreparationFee,
    validateTitleInsurance,
    validateTitleSearchFee,
    validateTitleEndorsements,
    validateEscrowFee,
    validateAttorneyFee,
    validateSurveyFee,
    validatePestInspectionFee,
    validateHomeInspectionFee,
    validateRecordingFee,
    validateTransferTax,
    validatePropertyTaxRate,
    validatePropertyTaxMonths,
    validateHomeownersInsuranceAnnual,
    validateInsuranceMonths,
    validateMortgageInsuranceType,
    validateMortgageInsuranceRate,
    validateLenderCredits,
    validateSellerCredits,
    validateClosingDate,
    validateFirstPaymentDate
  ];

  for (const validator of validators) {
    const fieldName = validator.name.replace('validate', '').replace(/([A-Z])/g, (match, letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter;
    });
    const result = validator(inputs[fieldName], inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}
