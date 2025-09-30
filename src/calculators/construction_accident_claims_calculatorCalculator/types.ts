export interface construction_accident_claims_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface construction_accident_claims_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface construction_accident_claims_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface construction_accident_claims_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
