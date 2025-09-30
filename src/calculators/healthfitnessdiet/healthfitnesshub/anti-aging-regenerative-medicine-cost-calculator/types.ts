export interface anti_aging_regenerative_medicine_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface anti_aging_regenerative_medicine_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface anti_aging_regenerative_medicine_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface anti_aging_regenerative_medicine_cost_calculatorOutputs {
  result: number;
  analysis: anti_aging_regenerative_medicine_cost_calculatorAnalysis;
}
