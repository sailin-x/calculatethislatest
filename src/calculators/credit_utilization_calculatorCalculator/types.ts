export interface credit_utilization_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface credit_utilization_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface credit_utilization_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface credit_utilization_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
