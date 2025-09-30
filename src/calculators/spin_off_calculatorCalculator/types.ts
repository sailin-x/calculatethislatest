export interface spin_off_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface spin_off_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface spin_off_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface spin_off_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
