export interface AssetBasedLendingCalculatorInputs {
  assetValue: number;
  advanceRate: number; // Percentage (0-100)
  interestRate: number; // Annual percentage
  loanTerm: number; // In months
  originationFee: number; // Percentage
  monitoringFee: number; // Annual percentage
}

export interface AssetBasedLendingCalculatorOutputs {
  maximumLoanAmount: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalFees: number;
  totalCost: number;
  effectiveInterestRate: number;
}
