export interface intellectual_property_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface intellectual_property_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface intellectual_property_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface intellectual_property_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
