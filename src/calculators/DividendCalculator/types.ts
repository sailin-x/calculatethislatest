export interface DividendCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DividendCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DividendCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DividendCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
