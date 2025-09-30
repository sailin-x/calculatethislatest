export interface soil_amendment_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface soil_amendment_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface soil_amendment_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface soil_amendment_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
