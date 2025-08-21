import { MortgageClosingCostInputs } from './validation';

export const quickValidateMortgageClosingCost = (inputs: Partial<MortgageClosingCostInputs>): boolean => {
  // Basic required field checks
  if (!inputs.loanAmount || inputs.loanAmount <= 0) return false;
  if (!inputs.propertyValue || inputs.propertyValue <= 0) return false;

  // Basic logical checks
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) return false;

  // Basic range checks
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000)) return false;
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) return false;

  // Basic fee checks (should not be negative)
  const fees = [
    inputs.lenderOriginationFee,
    inputs.applicationFee,
    inputs.processingFee,
    inputs.underwritingFee,
    inputs.appraisalFee,
    inputs.creditReportFee,
    inputs.floodCertificationFee,
    inputs.taxServiceFee,
    inputs.titleInsuranceOwner,
    inputs.titleInsuranceLender,
    inputs.titleSearchFee,
    inputs.titleExamFee,
    inputs.titleEndorsements,
    inputs.attorneyFee,
    inputs.escrowFee,
    inputs.recordingFee,
    inputs.transferTax,
    inputs.surveyFee,
    inputs.homeInspectionFee,
    inputs.pestInspectionFee,
    inputs.homeownersInsuranceAnnual,
    inputs.propertyTaxAnnual,
    inputs.pmiAnnual,
    inputs.mipAnnual,
    inputs.vaFundingFee,
    inputs.usdaGuaranteeFee,
    inputs.rateLockFee,
    inputs.prepaymentPenalty,
    inputs.otherFees
  ];

  for (const fee of fees) {
    if (fee !== undefined && fee < 0) return false;
  }

  // Credits should be negative or zero
  if (inputs.lenderCredits && inputs.lenderCredits > 0) return false;
  if (inputs.sellerCredits && inputs.sellerCredits > 0) return false;

  return true;
};