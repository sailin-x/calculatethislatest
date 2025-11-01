export interface CAPMInputs {
  riskFreeRate: number;
  marketRiskPremium: number;
  beta: number;
  companyName?: string;
  industry?: string;
  analysisPeriod?: number;
  historicalBeta?: number;
  adjustedBeta?: boolean;
  taxRate?: number;
  debtRatio?: number;
}

export interface CAPMOutputs {
  costOfEquity: number;
  expectedReturn: number;
  riskPremium: number;
  systematicRisk: number;
  totalRisk: number;
  betaAnalysis: {
    unleveredBeta: number;
    leveredBeta: number;
    adjustedBeta: number;
  };
  sensitivityAnalysis: {
    betaRange: number[];
    costOfEquityRange: number[];
    expectedReturnRange: number[];
  };
  recommendations: string[];
}