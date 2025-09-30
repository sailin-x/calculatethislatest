export interface financial_analysis_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_analysis_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_analysis_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_analysis_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
