export interface './insurance/critical-illness-calculator/critical_illness_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/critical-illness-calculator/critical_illness_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/critical-illness-calculator/critical_illness_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/critical-illness-calculator/critical_illness_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
