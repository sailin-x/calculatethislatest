export interface actuarial_mortality_table_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface actuarial_mortality_table_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface actuarial_mortality_table_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface actuarial_mortality_table_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
