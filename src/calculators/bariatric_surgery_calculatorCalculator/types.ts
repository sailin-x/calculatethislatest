export interface bariatric_surgery_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bariatric_surgery_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bariatric_surgery_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bariatric_surgery_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
