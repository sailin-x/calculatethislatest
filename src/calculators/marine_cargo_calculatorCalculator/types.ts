export interface marine_cargo_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface marine_cargo_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface marine_cargo_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface marine_cargo_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
