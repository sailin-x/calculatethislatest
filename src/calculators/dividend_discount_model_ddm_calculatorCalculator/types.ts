export interface dividend_discount_model_ddm_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dividend_discount_model_ddm_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dividend_discount_model_ddm_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dividend_discount_model_ddm_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
