export interface ira_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ira_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ira_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ira_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
