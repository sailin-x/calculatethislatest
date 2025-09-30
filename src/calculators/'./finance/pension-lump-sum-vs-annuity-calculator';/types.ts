export interface './finance/pension-lump-sum-vs-annuity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pension-lump-sum-vs-annuity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pension-lump-sum-vs-annuity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pension-lump-sum-vs-annuity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
