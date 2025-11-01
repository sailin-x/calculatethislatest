export interface cryptography_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cryptography_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cryptography_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cryptography_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
