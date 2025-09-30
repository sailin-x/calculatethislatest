export interface addiction_rehab_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface addiction_rehab_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface addiction_rehab_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface addiction_rehab_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
