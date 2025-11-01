export interface CapitalStructureOptimizationInputs {
  totalAssets: number;
  totalDebt: number;
  totalEquity: number;
  costOfDebt: number;
  costOfEquity: number;
  taxRate: number;
  riskFreeRate: number;
  marketRiskPremium: number;
  beta: number;
  targetDebtRatio: number;
  currentDebtRatio: number;
  analysisPeriod: number;
  inflationRate: number;
  growthRate: number;
  companyType: string;
  industry: string;
  creditRating: string;
}

export interface CapitalStructureOptimizationOutputs {
  optimalDebtRatio: number;
  weightedAverageCostOfCapital: number;
  costOfEquity: number;
  costOfDebtAfterTax: number;
  enterpriseValue: number;
  equityValue: number;
  debtValue: number;
  optimalCapitalStructure: {
    debtRatio: number;
    equityRatio: number;
    wacc: number;
    firmValue: number;
  };
  sensitivityAnalysis: {
    debtRatioRange: number[];
    waccRange: number[];
    firmValueRange: number[];
  };
  recommendations: string[];
}