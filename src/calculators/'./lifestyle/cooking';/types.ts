export interface './lifestyle/cooking';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/cooking';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/cooking';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/cooking';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
