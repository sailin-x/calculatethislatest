export interface automotive_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface automotive_calculatorResults {
  result: number;
  analysis?: string;
}

export interface automotive_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface automotive_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
