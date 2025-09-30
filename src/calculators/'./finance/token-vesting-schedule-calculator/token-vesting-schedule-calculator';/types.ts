export interface './finance/token-vesting-schedule-calculator/token-vesting-schedule-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/token-vesting-schedule-calculator/token-vesting-schedule-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/token-vesting-schedule-calculator/token-vesting-schedule-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/token-vesting-schedule-calculator/token-vesting-schedule-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
