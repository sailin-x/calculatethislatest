export interface './health/body-adiposity-index-calculator/body-adiposity-index-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/body-adiposity-index-calculator/body-adiposity-index-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/body-adiposity-index-calculator/body-adiposity-index-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/body-adiposity-index-calculator/body-adiposity-index-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
