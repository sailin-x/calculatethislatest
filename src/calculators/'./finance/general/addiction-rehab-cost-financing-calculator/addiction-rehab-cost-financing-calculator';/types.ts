export interface './finance/general/addiction-rehab-cost-financing-calculator/addiction-rehab-cost-financing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/addiction-rehab-cost-financing-calculator/addiction-rehab-cost-financing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/addiction-rehab-cost-financing-calculator/addiction-rehab-cost-financing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/addiction-rehab-cost-financing-calculator/addiction-rehab-cost-financing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
