export interface LoanToCostCalculatorInputs {
  loanAmount: number;
  totalProjectCost: number;
  landCost?: number;
  constructionCost?: number;
  softCosts?: number;
  contingency?: number;
}

export interface LoanToCostCalculatorOutputs {
  loanToCostRatio: number;
  loanToValueRatio: number;
  equityRequired: number;
  totalFinancing: number;
  riskAssessment: string;
}
