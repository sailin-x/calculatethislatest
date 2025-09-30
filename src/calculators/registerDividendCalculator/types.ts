export interface registerDividendCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDividendCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDividendCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDividendCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
