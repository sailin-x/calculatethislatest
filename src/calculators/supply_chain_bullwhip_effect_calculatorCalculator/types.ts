export interface supply_chain_bullwhip_effect_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface supply_chain_bullwhip_effect_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface supply_chain_bullwhip_effect_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface supply_chain_bullwhip_effect_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
