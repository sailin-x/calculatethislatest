export interface celebrity_endorsement_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface celebrity_endorsement_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface celebrity_endorsement_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface celebrity_endorsement_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
