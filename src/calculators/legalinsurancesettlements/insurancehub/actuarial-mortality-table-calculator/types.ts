export interface actuarial_mortality_table_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface actuarial_mortality_table_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface actuarial_mortality_table_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface actuarial_mortality_table_calculatorOutputs {
  result: number;
  analysis: actuarial_mortality_table_calculatorAnalysis;
}
