export interface fund_level_irr_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fund_level_irr_calculatorResults {
  result: number;
  analysis?: string;
}

export interface fund_level_irr_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fund_level_irr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
