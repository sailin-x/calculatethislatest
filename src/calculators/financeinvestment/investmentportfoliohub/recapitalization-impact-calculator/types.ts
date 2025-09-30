export interface recapitalization_impact_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface recapitalization_impact_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface recapitalization_impact_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface recapitalization_impact_calculatorOutputs {
  result: number;
  analysis: recapitalization_impact_calculatorAnalysis;
}
