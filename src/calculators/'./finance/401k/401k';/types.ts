export interface './finance/401k/401k';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/401k/401k';Results {
  result: number;
  analysis?: string;
}

export interface './finance/401k/401k';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/401k/401k';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
