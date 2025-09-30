export interface stretch_ira_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface stretch_ira_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface stretch_ira_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface stretch_ira_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
