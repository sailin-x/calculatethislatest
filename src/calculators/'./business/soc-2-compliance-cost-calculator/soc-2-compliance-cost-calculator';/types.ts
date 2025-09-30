export interface './business/soc-2-compliance-cost-calculator/soc-2-compliance-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/soc-2-compliance-cost-calculator/soc-2-compliance-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/soc-2-compliance-cost-calculator/soc-2-compliance-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/soc-2-compliance-cost-calculator/soc-2-compliance-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
