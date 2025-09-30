export interface machine_learning_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface machine_learning_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface machine_learning_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface machine_learning_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
