export interface chapter_11_bankruptcy_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface chapter_11_bankruptcy_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface chapter_11_bankruptcy_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface chapter_11_bankruptcy_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
