export interface complexNumberCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface complexNumberCalculatorResults {
  result: number;
  analysis?: string;
}

export interface complexNumberCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface complexNumberCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
