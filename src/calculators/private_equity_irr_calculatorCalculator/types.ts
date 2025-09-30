export interface private_equity_irr_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface private_equity_irr_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface private_equity_irr_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface private_equity_irr_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
