export interface omega_3_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface omega_3_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface omega_3_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface omega_3_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
