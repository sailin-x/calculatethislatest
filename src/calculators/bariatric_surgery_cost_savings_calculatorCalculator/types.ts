export interface bariatric_surgery_cost_savings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bariatric_surgery_cost_savings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bariatric_surgery_cost_savings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bariatric_surgery_cost_savings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
