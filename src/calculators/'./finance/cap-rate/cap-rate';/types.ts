export interface './finance/cap-rate/cap-rate';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cap-rate/cap-rate';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cap-rate/cap-rate';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cap-rate/cap-rate';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
