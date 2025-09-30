export interface dui_accident_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dui_accident_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dui_accident_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dui_accident_settlement_calculatorOutputs {
  result: number;
  analysis: dui_accident_settlement_calculatorAnalysis;
}
