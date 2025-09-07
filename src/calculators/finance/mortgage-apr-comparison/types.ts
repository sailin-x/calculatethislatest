export interface MortgageAPRComparisonInputs {
  loanAmount: number;
  loanTerm: string;
  offer1Name: string;
  offer1InterestRate: number;
  offer1ClosingCosts: number;
  offer1Points: number;
  offer2Name: string;
  offer2InterestRate: number;
  offer2ClosingCosts: number;
  offer2Points: number;
  offer3Name?: string;
  offer3InterestRate?: number;
  offer3ClosingCosts?: number;
  offer3Points?: number;
}

export interface MortgageAPRComparisonResults {
  offer1APR: number;
  offer1MonthlyPayment: number;
  offer1TotalCost: number;
  offer2APR: number;
  offer2MonthlyPayment: number;
  offer2TotalCost: number;
  offer3APR: number;
  offer3MonthlyPayment: number;
  offer3TotalCost: number;
  bestOffer: string;
  savings: number;
  totalSavings: number;
}