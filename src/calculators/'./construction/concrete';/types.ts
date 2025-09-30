export interface './construction/concrete';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './construction/concrete';Results {
  result: number;
  analysis?: string;
}

export interface './construction/concrete';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './construction/concrete';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
