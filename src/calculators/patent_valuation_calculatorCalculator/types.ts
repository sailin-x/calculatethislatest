export interface patent_valuation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface patent_valuation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface patent_valuation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface patent_valuation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
