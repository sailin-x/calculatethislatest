export interface RentalPropertyROIInputs {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  vacancyRate: number;
  propertyManagementFee: number;
  maintenanceCost: number;
  propertyTaxes: number;
  insurance: number;
  hoaFees: number;
  otherExpenses: number;
  appreciationRate: number;
  holdingPeriod: number;
  sellingCosts: number;
}

export interface RentalPropertyROIResults {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  annualizedReturn: number;
  irr: number;
  netOperatingIncome: number;
  debtServiceCoverageRatio: number;
  breakEvenRatio: number;
  totalInvestment: number;
  equityBuildUp: number;
  totalProfit: number;
  roiPercentage: number;
}