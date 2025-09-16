export interface TitleInsuranceInputs {
  // Property Information
  propertyValue: number;
  purchasePrice: number;
  loanAmount: number;

  // Title Insurance Costs
  ownersTitleInsuranceRate: number; // Percentage of property value
  lendersTitleInsuranceRate: number; // Percentage of loan amount
  titleSearchFee: number;
  titleExaminationFee: number;
  documentPreparationFee: number;
  notaryFee: number;
  recordingFee: number;
  transferTaxRate: number; // Percentage of purchase price

  // Settlement Information
  settlementDate: string;
  isRefinance: boolean;
  isCashPurchase: boolean;

  // Additional Options
  includeEndorsements: boolean;
  endorsementCost: number;
  includeTitleCurative: boolean;
  curativeCost: number;
}

export interface TitleInsuranceResults {
  // Cost Breakdown
  ownersTitleInsuranceCost: number;
  lendersTitleInsuranceCost: number;
  totalTitleInsuranceCost: number;
  titleSearchAndExamCost: number;
  documentAndRecordingCost: number;
  transferTaxCost: number;
  totalSettlementCosts: number;

  // Cost Analysis
  costAsPercentageOfPurchase: number;
  costAsPercentageOfLoan: number;
  costPerThousandOfValue: number;
  costPerThousandOfLoan: number;

  // Comparisons
  estimatedTotalCost: number;
  estimatedMonthlyCost: number; // If financed
  breakEvenPeriod: number; // Months to break even on refinance

  // Recommendations
  costEfficiency: string;
  recommendation: string;
  alternativesConsidered: string;
}