export interface './finance/stretch-ira-calculator/stretch-ira-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/stretch-ira-calculator/stretch-ira-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/stretch-ira-calculator/stretch-ira-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/stretch-ira-calculator/stretch-ira-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
