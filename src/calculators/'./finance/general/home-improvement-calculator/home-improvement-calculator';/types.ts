export interface './finance/general/home-improvement-calculator/home-improvement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/home-improvement-calculator/home-improvement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/home-improvement-calculator/home-improvement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/home-improvement-calculator/home-improvement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
