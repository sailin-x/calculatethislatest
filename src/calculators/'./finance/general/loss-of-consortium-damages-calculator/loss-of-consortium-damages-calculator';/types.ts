export interface './finance/general/loss-of-consortium-damages-calculator/loss-of-consortium-damages-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/loss-of-consortium-damages-calculator/loss-of-consortium-damages-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/loss-of-consortium-damages-calculator/loss-of-consortium-damages-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/loss-of-consortium-damages-calculator/loss-of-consortium-damages-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
