export interface './health/physical-therapy-cost-calculator/physical-therapy-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/physical-therapy-cost-calculator/physical-therapy-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/physical-therapy-cost-calculator/physical-therapy-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/physical-therapy-cost-calculator/physical-therapy-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
