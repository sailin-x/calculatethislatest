export interface data_science_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface data_science_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface data_science_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface data_science_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
