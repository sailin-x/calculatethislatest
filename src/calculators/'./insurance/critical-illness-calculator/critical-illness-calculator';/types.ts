export interface './insurance/critical-illness-calculator/critical-illness-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/critical-illness-calculator/critical-illness-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/critical-illness-calculator/critical-illness-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/critical-illness-calculator/critical-illness-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
