export interface './finance/general/qui-tam-whistleblower-reward-calculator/qui-tam-whistleblower-reward-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/qui-tam-whistleblower-reward-calculator/qui-tam-whistleblower-reward-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/qui-tam-whistleblower-reward-calculator/qui-tam-whistleblower-reward-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/qui-tam-whistleblower-reward-calculator/qui-tam-whistleblower-reward-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
