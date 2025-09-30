export interface './finance/generation-skipping-transfer-tax-calculator/generation-skipping-transfer-tax-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/generation-skipping-transfer-tax-calculator/generation-skipping-transfer-tax-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/generation-skipping-transfer-tax-calculator/generation-skipping-transfer-tax-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/generation-skipping-transfer-tax-calculator/generation-skipping-transfer-tax-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
