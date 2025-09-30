export interface contract_breach_damages_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface contract_breach_damages_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface contract_breach_damages_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface contract_breach_damages_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
