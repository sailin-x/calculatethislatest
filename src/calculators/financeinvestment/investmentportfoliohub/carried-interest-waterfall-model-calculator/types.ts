export interface carried_interest_waterfall_model_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface carried_interest_waterfall_model_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface carried_interest_waterfall_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface carried_interest_waterfall_model_calculatorOutputs {
  result: number;
  analysis: carried_interest_waterfall_model_calculatorAnalysis;
}
