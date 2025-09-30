export interface high_net_worth_divorce_asset_division_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface high_net_worth_divorce_asset_division_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface high_net_worth_divorce_asset_division_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface high_net_worth_divorce_asset_division_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
