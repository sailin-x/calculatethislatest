export interface fix_and_flipCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fix_and_flipCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fix_and_flipCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fix_and_flipCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
