export interface './business/net-promoter-score-calculator/net-promoter-score-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/net-promoter-score-calculator/net-promoter-score-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/net-promoter-score-calculator/net-promoter-score-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/net-promoter-score-calculator/net-promoter-score-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
