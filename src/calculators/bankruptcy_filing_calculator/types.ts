export interface bankruptcy_filing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bankruptcy_filing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bankruptcy_filing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bankruptcy_filing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
