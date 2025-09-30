export interface './health/advertising-cost-calculator/advertising-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/advertising-cost-calculator/advertising-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/advertising-cost-calculator/advertising-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/advertising-cost-calculator/advertising-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
