export interface nutrition_label_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface nutrition_label_calculatorResults {
  result: number;
  analysis?: string;
}

export interface nutrition_label_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface nutrition_label_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
