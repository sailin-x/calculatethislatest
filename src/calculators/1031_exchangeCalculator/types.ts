export interface 1031_exchangeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 1031_exchangeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 1031_exchangeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 1031_exchangeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
