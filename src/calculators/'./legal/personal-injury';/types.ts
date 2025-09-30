export interface './legal/personal-injury';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/personal-injury';Results {
  result: number;
  analysis?: string;
}

export interface './legal/personal-injury';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/personal-injury';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
