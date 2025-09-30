export interface './finance/general/request-for-proposal-rfp-scoring-calculator/request-for-proposal-rfp-scoring-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/request-for-proposal-rfp-scoring-calculator/request-for-proposal-rfp-scoring-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/request-for-proposal-rfp-scoring-calculator/request-for-proposal-rfp-scoring-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/request-for-proposal-rfp-scoring-calculator/request-for-proposal-rfp-scoring-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
