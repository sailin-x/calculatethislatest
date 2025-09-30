export interface plant_spacing_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface plant_spacing_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface plant_spacing_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface plant_spacing_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
