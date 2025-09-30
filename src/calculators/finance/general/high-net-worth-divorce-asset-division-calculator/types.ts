export interface high_net_worth_divorce_asset_division_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface high_net_worth_divorce_asset_division_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface high_net_worth_divorce_asset_division_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface high_net_worth_divorce_asset_division_calculatorOutputs {
  result: number;
  analysis: high_net_worth_divorce_asset_division_calculatorAnalysis;
}
