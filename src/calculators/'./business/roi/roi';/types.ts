export interface './business/roi/roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/roi/roi';Results {
  result: number;
  analysis?: string;
}

export interface './business/roi/roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/roi/roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
