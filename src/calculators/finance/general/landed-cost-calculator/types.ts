export interface landed_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface landed_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface landed_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface landed_cost_calculatorOutputs {
  result: number;
  analysis: landed_cost_calculatorAnalysis;
}
