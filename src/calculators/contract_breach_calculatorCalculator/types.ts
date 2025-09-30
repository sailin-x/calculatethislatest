export interface contract_breach_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface contract_breach_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface contract_breach_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface contract_breach_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
