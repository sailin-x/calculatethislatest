export interface sum_of_parts_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sum_of_parts_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface sum_of_parts_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sum_of_parts_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
