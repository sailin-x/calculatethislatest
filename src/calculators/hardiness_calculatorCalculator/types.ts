export interface hardiness_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hardiness_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hardiness_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hardiness_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
