export interface blood_sugar_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface blood_sugar_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface blood_sugar_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface blood_sugar_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
