export interface insulation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface insulation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface insulation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface insulation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
