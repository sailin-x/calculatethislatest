export interface './finance/brrrr-strategy/brrrr_strategy';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/brrrr-strategy/brrrr_strategy';Results {
  result: number;
  analysis?: string;
}

export interface './finance/brrrr-strategy/brrrr_strategy';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/brrrr-strategy/brrrr_strategy';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
