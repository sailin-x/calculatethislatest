export interface token_vesting_schedule_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface token_vesting_schedule_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface token_vesting_schedule_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface token_vesting_schedule_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
