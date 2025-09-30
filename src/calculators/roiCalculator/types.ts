export interface roiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface roiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
