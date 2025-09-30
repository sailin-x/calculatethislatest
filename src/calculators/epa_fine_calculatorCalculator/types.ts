export interface epa_fine_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface epa_fine_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface epa_fine_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface epa_fine_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
