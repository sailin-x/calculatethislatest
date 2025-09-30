export interface './insurance/key-person-calculator/key-person-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/key-person-calculator/key-person-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/key-person-calculator/key-person-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/key-person-calculator/key-person-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
