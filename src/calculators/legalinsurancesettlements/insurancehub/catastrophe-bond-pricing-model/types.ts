export interface catastrophe_bond_pricing_modelInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface catastrophe_bond_pricing_modelMetrics {
  result: number;
  efficiency?: number;
}

export interface catastrophe_bond_pricing_modelAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface catastrophe_bond_pricing_modelOutputs {
  result: number;
  analysis: catastrophe_bond_pricing_modelAnalysis;
}
