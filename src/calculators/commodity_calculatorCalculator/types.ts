export interface commodity_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commodity_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commodity_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commodity_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
