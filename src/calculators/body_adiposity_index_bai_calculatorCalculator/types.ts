export interface body_adiposity_index_bai_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface body_adiposity_index_bai_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface body_adiposity_index_bai_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface body_adiposity_index_bai_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
