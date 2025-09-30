export interface term_vs_whole_life_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface term_vs_whole_life_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface term_vs_whole_life_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface term_vs_whole_life_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
