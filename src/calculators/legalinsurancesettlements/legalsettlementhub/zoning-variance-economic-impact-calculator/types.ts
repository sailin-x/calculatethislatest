export interface zoning_variance_economic_impact_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface zoning_variance_economic_impact_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface zoning_variance_economic_impact_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface zoning_variance_economic_impact_calculatorOutputs {
  result: number;
  analysis: zoning_variance_economic_impact_calculatorAnalysis;
}
