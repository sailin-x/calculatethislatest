export interface debt_to_income_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface debt_to_income_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface debt_to_income_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface debt_to_income_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
