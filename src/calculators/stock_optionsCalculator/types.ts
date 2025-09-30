export interface stock_optionsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface stock_optionsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface stock_optionsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface stock_optionsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
