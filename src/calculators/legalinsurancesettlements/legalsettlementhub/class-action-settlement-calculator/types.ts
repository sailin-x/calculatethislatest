export interface class_action_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface class_action_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface class_action_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface class_action_settlement_calculatorOutputs {
  result: number;
  analysis: class_action_settlement_calculatorAnalysis;
}
