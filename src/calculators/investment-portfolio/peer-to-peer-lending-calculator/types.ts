export interface PeerToPeerLendingCalculatorInputs {
  investmentAmount: number;
  annualInterestRate: number;
  expectedDefaultRate: number;
  termInYears: number;
}

export interface PeerToPeerLendingCalculatorOutputs {
  totalReturn: number;
  totalProfit: number;
  effectiveYield: number;
}

export interface PeerToPeerLendingCalculatorMetrics {
  result: number;
  effectiveYield: number;
  totalProfit: number;
}

export interface PeerToPeerLendingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}