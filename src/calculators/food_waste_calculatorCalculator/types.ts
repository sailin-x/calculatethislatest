export interface food_waste_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface food_waste_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface food_waste_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface food_waste_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
