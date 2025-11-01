export interface EnterpriseValueCalculatorInputs {
  marketCap: number;
  totalDebt: number;
  cashAndEquivalents: number;
  preferredStock?: number;
  minorityInterest?: number;
  enterpriseValueMultiples?: {
    evToRevenue?: number;
    evToEbitda?: number;
    evToEbit?: number;
    evToFcf?: number;
  };
}

export interface EnterpriseValueCalculatorMetrics {
  enterpriseValue: number;
  debtToEquity: number;
  cashToDebt: number;
  netDebt: number;
  enterpriseValueToRevenue: number;
}

export interface EnterpriseValueCalculatorAnalysis {
  valuation: 'undervalued' | 'fairly_valued' | 'overvalued';
  leverage: 'low' | 'moderate' | 'high';
  recommendations: string[];
  industryComparison: string;
}

export interface EnterpriseValueCalculatorOutputs {
  enterpriseValue: number;
  netDebt: number;
  debtToEquity: number;
  cashToDebt: number;
  analysis: EnterpriseValueCalculatorAnalysis;
}
