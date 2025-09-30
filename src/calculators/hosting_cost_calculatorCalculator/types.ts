export interface hosting_cost_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hosting_cost_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hosting_cost_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hosting_cost_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
