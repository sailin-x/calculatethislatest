export interface './legal/qui-tam-reward-calculator/qui-tam-reward-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/qui-tam-reward-calculator/qui-tam-reward-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/qui-tam-reward-calculator/qui-tam-reward-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/qui-tam-reward-calculator/qui-tam-reward-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
