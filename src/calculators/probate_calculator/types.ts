export interface probate_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface probate_calculatorResults {
  result: number;
  analysis?: string;
}

export interface probate_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface probate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
