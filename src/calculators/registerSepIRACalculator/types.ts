export interface registerSepIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerSepIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerSepIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerSepIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
