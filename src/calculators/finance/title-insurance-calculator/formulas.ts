import { TitleInsuranceInputs, TitleInsuranceResults } from './types';

/**
 * Calculate title insurance costs and analysis
 */
export function calculateTitleInsurance(inputs: TitleInsuranceInputs): TitleInsuranceResults {
  const {
    propertyValue,
    purchasePrice,
    loanAmount,
    ownersTitleInsuranceRate,
    lendersTitleInsuranceRate,
    titleSearchFee,
    titleExaminationFee,
    documentPreparationFee,
    notaryFee,
    recordingFee,
    transferTaxRate,
    settlementDate,
    isRefinance,
    isCashPurchase,
    includeEndorsements,
    endorsementCost,
    includeTitleCurative,
    curativeCost
  } = inputs;

  // Calculate title insurance costs
  const ownersTitleInsuranceCost = (propertyValue * ownersTitleInsuranceRate) / 100;
  const lendersTitleInsuranceCost = isCashPurchase ? 0 : (loanAmount * lendersTitleInsuranceRate) / 100;
  const totalTitleInsuranceCost = ownersTitleInsuranceCost + lendersTitleInsuranceCost;

  // Calculate title search and examination costs
  const titleSearchAndExamCost = titleSearchFee + titleExaminationFee;

  // Calculate document and recording costs
  const documentAndRecordingCost = documentPreparationFee + notaryFee + recordingFee;

  // Calculate transfer tax
  const transferTaxCost = (purchasePrice * transferTaxRate) / 100;

  // Calculate additional costs
  const endorsementsCost = includeEndorsements ? endorsementCost : 0;
  const curativeCostTotal = includeTitleCurative ? curativeCost : 0;

  // Calculate total settlement costs
  const totalSettlementCosts = totalTitleInsuranceCost + titleSearchAndExamCost +
                              documentAndRecordingCost + transferTaxCost +
                              endorsementsCost + curativeCostTotal;

  // Calculate cost analysis
  const costAsPercentageOfPurchase = purchasePrice > 0 ? (totalSettlementCosts / purchasePrice) * 100 : 0;
  const costAsPercentageOfLoan = loanAmount > 0 ? (totalSettlementCosts / loanAmount) * 100 : 0;
  const costPerThousandOfValue = propertyValue > 0 ? (totalSettlementCosts / propertyValue) * 1000 : 0;
  const costPerThousandOfLoan = loanAmount > 0 ? (totalSettlementCosts / loanAmount) * 1000 : 0;

  // Calculate estimated total cost (including potential financing)
  const estimatedTotalCost = totalSettlementCosts;

  // Calculate monthly cost if financed (assuming 30-year mortgage)
  const estimatedMonthlyCost = isRefinance && loanAmount > 0 ?
    calculateMonthlyFinancingCost(totalSettlementCosts, 6.5, 30) : 0;

  // Calculate break-even period for refinance
  const breakEvenPeriod = estimatedMonthlyCost > 0 ?
    Math.ceil(totalSettlementCosts / estimatedMonthlyCost) : 0;

  // Generate recommendations
  const costEfficiency = generateCostEfficiency(costAsPercentageOfPurchase);
  const recommendation = generateRecommendation(inputs, totalSettlementCosts, costAsPercentageOfPurchase);
  const alternativesConsidered = generateAlternativesConsidered(inputs);

  return {
    ownersTitleInsuranceCost,
    lendersTitleInsuranceCost,
    totalTitleInsuranceCost,
    titleSearchAndExamCost,
    documentAndRecordingCost,
    transferTaxCost,
    totalSettlementCosts,
    costAsPercentageOfPurchase,
    costAsPercentageOfLoan,
    costPerThousandOfValue,
    costPerThousandOfLoan,
    estimatedTotalCost,
    estimatedMonthlyCost,
    breakEvenPeriod,
    costEfficiency,
    recommendation,
    alternativesConsidered
  };
}

/**
 * Calculate monthly financing cost for title insurance
 */
function calculateMonthlyFinancingCost(amount: number, interestRate: number, termYears: number): number {
  if (amount <= 0 || termYears <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment;
}

/**
 * Generate cost efficiency assessment
 */
function generateCostEfficiency(costPercentage: number): string {
  if (costPercentage <= 1) {
    return 'Excellent - Very low closing costs';
  } else if (costPercentage <= 2) {
    return 'Good - Reasonable closing costs';
  } else if (costPercentage <= 3) {
    return 'Fair - Moderate closing costs';
  } else if (costPercentage <= 5) {
    return 'High - Elevated closing costs';
  } else {
    return 'Very High - Excessive closing costs';
  }
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: TitleInsuranceInputs,
  totalCost: number,
  costPercentage: number
): string {
  const recommendations: string[] = [];

  if (costPercentage > 5) {
    recommendations.push('Consider shopping around for better title insurance rates');
    recommendations.push('Negotiate with lender for lower fees');
    recommendations.push('Look for lenders that offer credits for closing costs');
  }

  if (inputs.isRefinance && inputs.loanAmount > 0) {
    const monthlyCost = calculateMonthlyFinancingCost(totalCost, 6.5, 30);
    if (monthlyCost > 50) {
      recommendations.push('Consider rolling closing costs into loan to avoid large upfront payment');
    }
  }

  if (inputs.includeEndorsements && inputs.endorsementCost > 500) {
    recommendations.push('Review necessity of all endorsements - some may be optional');
  }

  if (inputs.transferTaxRate > 1) {
    recommendations.push('Check if transfer tax can be reduced through exemptions or credits');
  }

  if (recommendations.length === 0) {
    recommendations.push('Costs appear reasonable for the transaction type and location');
  }

  return recommendations.join('. ');
}

/**
 * Generate alternatives considered
 */
function generateAlternativesConsidered(inputs: TitleInsuranceInputs): string {
  const alternatives: string[] = [];

  if (inputs.isRefinance) {
    alternatives.push('Cash payment vs. financing closing costs');
    alternatives.push('Lender-paid vs. borrower-paid options');
  }

  if (inputs.ownersTitleInsuranceRate > 0.5) {
    alternatives.push('Shop different title insurance providers');
    alternatives.push('Consider title insurance alternatives or waivers');
  }

  if (inputs.transferTaxRate > 0) {
    alternatives.push('Check for transfer tax exemptions');
    alternatives.push('Consider timing of purchase to minimize tax');
  }

  if (inputs.recordingFee > 100) {
    alternatives.push('Verify recording fees are accurate for jurisdiction');
  }

  if (alternatives.length === 0) {
    alternatives.push('Standard title insurance and settlement process recommended');
  }

  return alternatives.join(', ');
}

/**
 * Validate title insurance inputs
 */
export function validateTitleInsuranceInputs(inputs: TitleInsuranceInputs): string[] {
  const errors: string[] = [];

  if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }

  if (inputs.loanAmount < 0) {
    errors.push('Loan amount cannot be negative');
  }

  if (inputs.ownersTitleInsuranceRate < 0 || inputs.ownersTitleInsuranceRate > 5) {
    errors.push('Owner\'s title insurance rate must be between 0% and 5%');
  }

  if (inputs.lendersTitleInsuranceRate < 0 || inputs.lendersTitleInsuranceRate > 2) {
    errors.push('Lender\'s title insurance rate must be between 0% and 2%');
  }

  if (inputs.titleSearchFee < 0) {
    errors.push('Title search fee cannot be negative');
  }

  if (inputs.titleExaminationFee < 0) {
    errors.push('Title examination fee cannot be negative');
  }

  if (inputs.documentPreparationFee < 0) {
    errors.push('Document preparation fee cannot be negative');
  }

  if (inputs.notaryFee < 0) {
    errors.push('Notary fee cannot be negative');
  }

  if (inputs.recordingFee < 0) {
    errors.push('Recording fee cannot be negative');
  }

  if (inputs.transferTaxRate < 0 || inputs.transferTaxRate > 5) {
    errors.push('Transfer tax rate must be between 0% and 5%');
  }

  if (!inputs.settlementDate || inputs.settlementDate === '') {
    errors.push('Settlement date is required');
  }

  if (inputs.includeEndorsements && inputs.endorsementCost < 0) {
    errors.push('Endorsement cost cannot be negative');
  }

  if (inputs.includeTitleCurative && inputs.curativeCost < 0) {
    errors.push('Curative cost cannot be negative');
  }

  return errors;
}