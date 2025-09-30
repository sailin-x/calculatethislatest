export interface supply_chain_bullwhip_effect_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface supply_chain_bullwhip_effect_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface supply_chain_bullwhip_effect_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface supply_chain_bullwhip_effect_calculatorOutputs {
  result: number;
  analysis: supply_chain_bullwhip_effect_calculatorAnalysis;
}
