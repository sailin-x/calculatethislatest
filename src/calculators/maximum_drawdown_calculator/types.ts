export interface maximum_drawdown_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface maximum_drawdown_calculatorResults {
  result: number;
  analysis?: string;
}

export interface maximum_drawdown_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface maximum_drawdown_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
