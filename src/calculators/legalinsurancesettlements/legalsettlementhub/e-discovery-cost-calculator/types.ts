export interface e_discovery_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface e_discovery_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface e_discovery_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface e_discovery_cost_calculatorOutputs {
  result: number;
  analysis: e_discovery_cost_calculatorAnalysis;
}
