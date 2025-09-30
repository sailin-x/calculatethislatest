export interface cybersecurity_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cybersecurity_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cybersecurity_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cybersecurity_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
