export interface biology_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface biology_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface biology_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface biology_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
