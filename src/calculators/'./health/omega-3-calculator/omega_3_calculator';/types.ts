export interface './health/omega-3-calculator/omega_3_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/omega-3-calculator/omega_3_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/omega-3-calculator/omega_3_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/omega-3-calculator/omega_3_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
