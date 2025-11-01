export interface retirement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface retirement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface retirement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface retirement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
