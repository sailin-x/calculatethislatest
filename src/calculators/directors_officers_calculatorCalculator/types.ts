export interface directors_officers_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface directors_officers_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface directors_officers_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface directors_officers_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
