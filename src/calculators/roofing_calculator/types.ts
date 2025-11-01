export interface roofing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roofing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface roofing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roofing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
