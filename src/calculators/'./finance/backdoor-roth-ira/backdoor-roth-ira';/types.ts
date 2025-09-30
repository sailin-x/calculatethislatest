export interface './finance/backdoor-roth-ira/backdoor-roth-ira';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/backdoor-roth-ira/backdoor-roth-ira';Results {
  result: number;
  analysis?: string;
}

export interface './finance/backdoor-roth-ira/backdoor-roth-ira';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/backdoor-roth-ira/backdoor-roth-ira';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
