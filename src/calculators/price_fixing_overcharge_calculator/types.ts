export interface price_fixing_overcharge_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface price_fixing_overcharge_calculatorResults {
  result: number;
  analysis?: string;
}

export interface price_fixing_overcharge_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface price_fixing_overcharge_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
