export interface './legal/alimony-spousal-support-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/alimony-spousal-support-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/alimony-spousal-support-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/alimony-spousal-support-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
