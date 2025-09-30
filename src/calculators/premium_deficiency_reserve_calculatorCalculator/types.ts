export interface premium_deficiency_reserve_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface premium_deficiency_reserve_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface premium_deficiency_reserve_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface premium_deficiency_reserve_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
