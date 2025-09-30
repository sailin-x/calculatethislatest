export interface probabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface probabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface probabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface probabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
