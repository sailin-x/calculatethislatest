export interface supply_chain_bullwhip_effect_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface supply_chain_bullwhip_effect_calculatorResults {
  result: number;
  analysis?: string;
}

export interface supply_chain_bullwhip_effect_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface supply_chain_bullwhip_effect_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
