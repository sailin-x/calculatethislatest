export interface critical_illness_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface critical_illness_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface critical_illness_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface critical_illness_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
