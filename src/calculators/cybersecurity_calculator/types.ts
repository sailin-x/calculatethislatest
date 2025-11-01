export interface cybersecurity_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cybersecurity_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cybersecurity_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cybersecurity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
