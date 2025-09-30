export interface './health/omega-3-calculator/omega-3-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/omega-3-calculator/omega-3-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/omega-3-calculator/omega-3-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/omega-3-calculator/omega-3-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
