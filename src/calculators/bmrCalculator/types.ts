export interface bmrCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bmrCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bmrCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bmrCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
