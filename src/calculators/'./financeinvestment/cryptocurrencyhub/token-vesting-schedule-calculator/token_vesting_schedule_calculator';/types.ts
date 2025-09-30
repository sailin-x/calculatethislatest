export interface './financeinvestment/cryptocurrencyhub/token-vesting-schedule-calculator/token_vesting_schedule_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/token-vesting-schedule-calculator/token_vesting_schedule_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/token-vesting-schedule-calculator/token_vesting_schedule_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/token-vesting-schedule-calculator/token_vesting_schedule_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
