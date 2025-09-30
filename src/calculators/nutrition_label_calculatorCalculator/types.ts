export interface nutrition_label_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface nutrition_label_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface nutrition_label_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface nutrition_label_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
