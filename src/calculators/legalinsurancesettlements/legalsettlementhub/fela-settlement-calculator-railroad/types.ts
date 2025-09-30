export interface fela_settlement_calculator_railroadInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface fela_settlement_calculator_railroadMetrics {
  result: number;
  efficiency?: number;
}

export interface fela_settlement_calculator_railroadAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface fela_settlement_calculator_railroadOutputs {
  result: number;
  analysis: fela_settlement_calculator_railroadAnalysis;
}
