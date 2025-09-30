export interface './legal/employment-law-calculator/employment-law-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/employment-law-calculator/employment-law-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/employment-law-calculator/employment-law-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/employment-law-calculator/employment-law-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
