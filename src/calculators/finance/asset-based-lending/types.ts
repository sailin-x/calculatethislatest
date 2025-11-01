export interface AssetBasedLendingInputs {
  totalAssetValue: number;
  assetType: 'accounts_receivable' | 'inventory' | 'equipment' | 'real_estate' | 'securities';
  advanceRate: number;
  borrowingBase: number;
  outstandingDebt: number;
  interestRate: number;
  loanTerm: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  debtServiceCoverageRatio: number;
  collateralCoverageRatio: number;
  industry: string;
  creditRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC';
}

export interface AssetBasedLendingOutputs {
  maximumLoanAmount: number;
  availableCredit: number;
  borrowingBaseValue: number;
  loanToValueRatio: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  debtServiceCoverageRatio: number;
  riskRating: number;
  liquidityRatio: number;
  collateralCoverageRatio: number;
  netIncome: number;
  cashFlowAvailable: number;
}

export interface AssetBasedLendingMetrics {
  result: number;
  maximumLoanAmount: number;
  availableCredit: number;
  borrowingBaseValue: number;
}

export interface AssetBasedLendingAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  creditworthiness: number;
  collateralStrength: number;
  cashFlowStability: number;
}