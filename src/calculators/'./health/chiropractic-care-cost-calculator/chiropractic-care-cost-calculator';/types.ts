export interface './health/chiropractic-care-cost-calculator/chiropractic-care-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/chiropractic-care-cost-calculator/chiropractic-care-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/chiropractic-care-cost-calculator/chiropractic-care-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/chiropractic-care-cost-calculator/chiropractic-care-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
