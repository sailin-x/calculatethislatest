export interface asphalt_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface asphalt_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface asphalt_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface asphalt_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
