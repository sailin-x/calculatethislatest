export interface jones_act_settlement_calculator_maritimeInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface jones_act_settlement_calculator_maritimeMetrics {
  result: number;
  efficiency?: number;
}

export interface jones_act_settlement_calculator_maritimeAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface jones_act_settlement_calculator_maritimeOutputs {
  result: number;
  analysis: jones_act_settlement_calculator_maritimeAnalysis;
}
