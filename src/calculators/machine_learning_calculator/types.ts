export interface machine_learning_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface machine_learning_calculatorResults {
  result: number;
  analysis?: string;
}

export interface machine_learning_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface machine_learning_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
