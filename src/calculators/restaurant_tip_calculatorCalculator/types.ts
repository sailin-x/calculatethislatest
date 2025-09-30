export interface restaurant_tip_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface restaurant_tip_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface restaurant_tip_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface restaurant_tip_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
