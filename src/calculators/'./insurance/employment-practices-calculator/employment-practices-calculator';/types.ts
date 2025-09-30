export interface './insurance/employment-practices-calculator/employment-practices-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/employment-practices-calculator/employment-practices-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/employment-practices-calculator/employment-practices-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/employment-practices-calculator/employment-practices-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
