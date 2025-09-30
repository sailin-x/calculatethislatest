export interface './health/sleep-calculator/sleep-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/sleep-calculator/sleep-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/sleep-calculator/sleep-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/sleep-calculator/sleep-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
