export interface high_net_worth_divorce_asset_divisionCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface high_net_worth_divorce_asset_divisionCalculatorResults {
  result: number;
  analysis?: string;
}

export interface high_net_worth_divorce_asset_divisionCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface high_net_worth_divorce_asset_divisionCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
