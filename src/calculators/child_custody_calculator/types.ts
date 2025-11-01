export interface child_custody_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface child_custody_calculatorResults {
  result: number;
  analysis?: string;
}

export interface child_custody_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface child_custody_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
