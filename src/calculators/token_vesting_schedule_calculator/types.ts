export interface token_vesting_schedule_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface token_vesting_schedule_calculatorResults {
  result: number;
  analysis?: string;
}

export interface token_vesting_schedule_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface token_vesting_schedule_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
