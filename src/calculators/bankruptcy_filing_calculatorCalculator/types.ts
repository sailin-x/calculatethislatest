export interface bankruptcy_filing_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bankruptcy_filing_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bankruptcy_filing_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bankruptcy_filing_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
