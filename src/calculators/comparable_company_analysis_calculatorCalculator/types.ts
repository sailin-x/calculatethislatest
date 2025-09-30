export interface comparable_company_analysis_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface comparable_company_analysis_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface comparable_company_analysis_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface comparable_company_analysis_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
