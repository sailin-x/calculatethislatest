export interface financial_governance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_governance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_governance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_governance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
