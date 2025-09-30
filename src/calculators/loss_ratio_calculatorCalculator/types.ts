export interface loss_ratio_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loss_ratio_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface loss_ratio_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loss_ratio_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
