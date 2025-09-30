export interface './health/bariatric-surgery-calculator/bariatric-surgery-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/bariatric-surgery-calculator/bariatric-surgery-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/bariatric-surgery-calculator/bariatric-surgery-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/bariatric-surgery-calculator/bariatric-surgery-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
