export interface './health/addiction-rehab-calculator/addiction_rehab_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/addiction-rehab-calculator/addiction_rehab_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/addiction-rehab-calculator/addiction_rehab_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/addiction-rehab-calculator/addiction_rehab_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
