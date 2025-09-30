export interface economic_value_added_eva_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface economic_value_added_eva_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface economic_value_added_eva_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface economic_value_added_eva_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
