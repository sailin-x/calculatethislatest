export interface bmi_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bmi_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bmi_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bmi_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
