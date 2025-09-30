export interface './business/request-for-proposal-scoring-calculator/request-for-proposal-scoring-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/request-for-proposal-scoring-calculator/request-for-proposal-scoring-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/request-for-proposal-scoring-calculator/request-for-proposal-scoring-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/request-for-proposal-scoring-calculator/request-for-proposal-scoring-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
