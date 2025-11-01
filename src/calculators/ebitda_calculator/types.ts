export interface ebitda_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ebitda_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ebitda_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ebitda_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
