export interface './finance/cloud-repatriation-savings-calculator/cloud-repatriation-savings-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cloud-repatriation-savings-calculator/cloud-repatriation-savings-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cloud-repatriation-savings-calculator/cloud-repatriation-savings-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cloud-repatriation-savings-calculator/cloud-repatriation-savings-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
