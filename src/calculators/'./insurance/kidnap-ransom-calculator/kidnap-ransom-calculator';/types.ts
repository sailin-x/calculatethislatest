export interface './insurance/kidnap-ransom-calculator/kidnap-ransom-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/kidnap-ransom-calculator/kidnap-ransom-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/kidnap-ransom-calculator/kidnap-ransom-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/kidnap-ransom-calculator/kidnap-ransom-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
