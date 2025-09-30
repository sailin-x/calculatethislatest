export interface garden_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface garden_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface garden_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface garden_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
