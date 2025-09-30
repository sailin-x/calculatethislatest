export interface './health/acupuncture-cost-calculator/acupuncture-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/acupuncture-cost-calculator/acupuncture-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/acupuncture-cost-calculator/acupuncture-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/acupuncture-cost-calculator/acupuncture-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
