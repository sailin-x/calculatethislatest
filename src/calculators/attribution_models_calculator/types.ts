export interface attribution_models_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface attribution_models_calculatorResults {
  result: number;
  analysis?: string;
}

export interface attribution_models_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface attribution_models_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
