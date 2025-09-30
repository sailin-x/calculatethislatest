export interface './finance/401k-company-match-roi/401k-company-match-roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/401k-company-match-roi/401k-company-match-roi';Results {
  result: number;
  analysis?: string;
}

export interface './finance/401k-company-match-roi/401k-company-match-roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/401k-company-match-roi/401k-company-match-roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
