export interface './finance/401k-company-match-roi/401k_company_match_roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/401k-company-match-roi/401k_company_match_roi';Results {
  result: number;
  analysis?: string;
}

export interface './finance/401k-company-match-roi/401k_company_match_roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/401k-company-match-roi/401k_company_match_roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
