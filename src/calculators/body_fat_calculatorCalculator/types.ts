export interface body_fat_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface body_fat_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface body_fat_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface body_fat_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
