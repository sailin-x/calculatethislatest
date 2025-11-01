export interface engineering_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface engineering_calculatorResults {
  result: number;
  analysis?: string;
}

export interface engineering_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface engineering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
