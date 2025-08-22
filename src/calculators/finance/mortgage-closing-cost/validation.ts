import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageClosingCostInputs extends CalculatorInputs {
  loanAmount: number;
  propertyValue: number;
  loanType?: string;
  propertyType?: string;
  state?: string;
  creditScore?: number;
  downPaymentPercentage?: number;
  lenderOriginationFee?: number;
  lenderPoints?: number;
  applicationFee?: number;
  processingFee?: number;
  underwritingFee?: number;
  appraisalFee?: number;
  creditReportFee?: number;
  floodCertificationFee?: number;
  taxServiceFee?: number;
  titleInsuranceOwner?: number;
  titleInsuranceLender?: number;
  titleSearchFee?: number;
  titleExamFee?: number;
  titleEndorsements?: number;
  attorneyFee?: number;
  escrowFee?: number;
  recordingFee?: number;
  transferTax?: number;
  surveyFee?: number;
  homeInspectionFee?: number;
  pestInspectionFee?: number;
  homeownersInsuranceAnnual?: number;
  propertyTaxAnnual?: number;
  pmiAnnual?: number;
  mipAnnual?: number;
  vaFundingFee?: number;
  usdaGuaranteeFee?: number;
  escrowMonths?: number;
  rateLockFee?: number;
  prepaymentPenalty?: number;
  otherFees?: number;
  lenderCredits?: number;
  sellerCredits?: number;
}

export const validateMortgageClosingCostInputs = (inputs: Partial<MortgageClosingCostInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  // Range validation
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000)) {
    errors.push('Loan amount should be between $10,000 and $5,000,000');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value should be between $10,000 and $10,000,000');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score should be between 300 and 850');
  }

  if (inputs.downPaymentPercentage && (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100)) {
    errors.push('Down payment percentage should be between 0% and 100%');
  }

  if (inputs.lenderPoints && (inputs.lenderPoints < 0 || inputs.lenderPoints > 10)) {
    errors.push('Lender points should be between 0% and 10%');
  }

  if (inputs.escrowMonths && (inputs.escrowMonths < 0 || inputs.escrowMonths > 24)) {
    errors.push('Escrow months should be between 0 and 24');
  }

  // Fee validation
  if (inputs.lenderOriginationFee && inputs.lenderOriginationFee < 0) {
    errors.push('Lender origination fee cannot be negative');
  }

  if (inputs.applicationFee && inputs.applicationFee < 0) {
    errors.push('Application fee cannot be negative');
  }

  if (inputs.processingFee && inputs.processingFee < 0) {
    errors.push('Processing fee cannot be negative');
  }

  if (inputs.underwritingFee && inputs.underwritingFee < 0) {
    errors.push('Underwriting fee cannot be negative');
  }

  if (inputs.appraisalFee && inputs.appraisalFee < 0) {
    errors.push('Appraisal fee cannot be negative');
  }

  if (inputs.creditReportFee && inputs.creditReportFee < 0) {
    errors.push('Credit report fee cannot be negative');
  }

  if (inputs.floodCertificationFee && inputs.floodCertificationFee < 0) {
    errors.push('Flood certification fee cannot be negative');
  }

  if (inputs.taxServiceFee && inputs.taxServiceFee < 0) {
    errors.push('Tax service fee cannot be negative');
  }

  if (inputs.titleInsuranceOwner && inputs.titleInsuranceOwner < 0) {
    errors.push('Owner title insurance cannot be negative');
  }

  if (inputs.titleInsuranceLender && inputs.titleInsuranceLender < 0) {
    errors.push('Lender title insurance cannot be negative');
  }

  if (inputs.titleSearchFee && inputs.titleSearchFee < 0) {
    errors.push('Title search fee cannot be negative');
  }

  if (inputs.titleExamFee && inputs.titleExamFee < 0) {
    errors.push('Title examination fee cannot be negative');
  }

  if (inputs.titleEndorsements && inputs.titleEndorsements < 0) {
    errors.push('Title endorsements cannot be negative');
  }

  if (inputs.attorneyFee && inputs.attorneyFee < 0) {
    errors.push('Attorney fee cannot be negative');
  }

  if (inputs.escrowFee && inputs.escrowFee < 0) {
    errors.push('Escrow fee cannot be negative');
  }

  if (inputs.recordingFee && inputs.recordingFee < 0) {
    errors.push('Recording fee cannot be negative');
  }

  if (inputs.transferTax && inputs.transferTax < 0) {
    errors.push('Transfer tax cannot be negative');
  }

  if (inputs.surveyFee && inputs.surveyFee < 0) {
    errors.push('Survey fee cannot be negative');
  }

  if (inputs.homeInspectionFee && inputs.homeInspectionFee < 0) {
    errors.push('Home inspection fee cannot be negative');
  }

  if (inputs.pestInspectionFee && inputs.pestInspectionFee < 0) {
    errors.push('Pest inspection fee cannot be negative');
  }

  if (inputs.homeownersInsuranceAnnual && inputs.homeownersInsuranceAnnual < 0) {
    errors.push('Homeowners insurance cannot be negative');
  }

  if (inputs.propertyTaxAnnual && inputs.propertyTaxAnnual < 0) {
    errors.push('Property tax cannot be negative');
  }

  if (inputs.pmiAnnual && inputs.pmiAnnual < 0) {
    errors.push('PMI cannot be negative');
  }

  if (inputs.mipAnnual && inputs.mipAnnual < 0) {
    errors.push('MIP cannot be negative');
  }

  if (inputs.vaFundingFee && inputs.vaFundingFee < 0) {
    errors.push('VA funding fee cannot be negative');
  }

  if (inputs.usdaGuaranteeFee && inputs.usdaGuaranteeFee < 0) {
    errors.push('USDA guarantee fee cannot be negative');
  }

  if (inputs.rateLockFee && inputs.rateLockFee < 0) {
    errors.push('Rate lock fee cannot be negative');
  }

  if (inputs.prepaymentPenalty && inputs.prepaymentPenalty < 0) {
    errors.push('Prepayment penalty cannot be negative');
  }

  if (inputs.otherFees && inputs.otherFees < 0) {
    errors.push('Other fees cannot be negative');
  }

  // Credits validation (should be negative or zero)
  if (inputs.lenderCredits && inputs.lenderCredits > 0) {
    errors.push('Lender credits should be negative or zero');
  }

  if (inputs.sellerCredits && inputs.sellerCredits > 0) {
    errors.push('Seller credits should be negative or zero');
  }

  // Logical validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.downPaymentPercentage && inputs.loanAmount && inputs.propertyValue) {
    const calculatedDownPayment = (inputs.downPaymentPercentage / 100) * inputs.propertyValue;
    const calculatedLoanAmount = inputs.propertyValue - calculatedDownPayment;
    if (Math.abs(calculatedLoanAmount - inputs.loanAmount) > 1000) {
      errors.push('Loan amount and down payment percentage are inconsistent');
    }
  }

  // Loan type specific validation
  if (inputs.loanType === 'FHA' && inputs.mipAnnual === 0) {
    errors.push('FHA loans typically require MIP (Mortgage Insurance Premium)');
  }

  if (inputs.loanType === 'VA' && inputs.vaFundingFee === 0) {
    errors.push('VA loans typically require a funding fee');
  }

  if (inputs.loanType === 'USDA' && inputs.usdaGuaranteeFee === 0) {
    errors.push('USDA loans typically require a guarantee fee');
  }

  if (inputs.loanType === 'Conventional' && inputs.downPaymentPercentage && inputs.downPaymentPercentage < 20 && inputs.pmiAnnual === 0) {
    errors.push('Conventional loans with less than 20% down typically require PMI');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};