export interface management_consulting_fee_model_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface management_consulting_fee_model_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface management_consulting_fee_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface management_consulting_fee_model_calculatorOutputs {
  result: number;
  analysis: management_consulting_fee_model_calculatorAnalysis;
}
