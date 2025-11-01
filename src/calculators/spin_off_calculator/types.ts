export interface spin_off_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface spin_off_calculatorResults {
  result: number;
  analysis?: string;
}

export interface spin_off_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface spin_off_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
