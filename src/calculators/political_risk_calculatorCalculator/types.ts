export interface political_risk_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface political_risk_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface political_risk_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface political_risk_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
