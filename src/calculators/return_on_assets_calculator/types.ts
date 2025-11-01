export interface return_on_assets_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface return_on_assets_calculatorResults {
  result: number;
  analysis?: string;
}

export interface return_on_assets_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface return_on_assets_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
