export interface r_squared_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface r_squared_calculatorResults {
  result: number;
  analysis?: string;
}

export interface r_squared_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface r_squared_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
