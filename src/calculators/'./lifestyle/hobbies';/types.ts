export interface './lifestyle/hobbies';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/hobbies';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/hobbies';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/hobbies';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
