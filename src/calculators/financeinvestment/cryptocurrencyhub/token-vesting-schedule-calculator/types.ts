export interface token_vesting_schedule_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface token_vesting_schedule_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface token_vesting_schedule_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface token_vesting_schedule_calculatorOutputs {
  result: number;
  analysis: token_vesting_schedule_calculatorAnalysis;
}
