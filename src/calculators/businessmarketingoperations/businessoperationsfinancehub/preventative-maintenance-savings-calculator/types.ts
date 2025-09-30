export interface preventative_maintenance_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface preventative_maintenance_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface preventative_maintenance_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface preventative_maintenance_savings_calculatorOutputs {
  result: number;
  analysis: preventative_maintenance_savings_calculatorAnalysis;
}
