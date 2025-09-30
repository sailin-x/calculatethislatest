export interface './finance/general/net-promoter-score-nps-calculator/net-promoter-score-nps-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/net-promoter-score-nps-calculator/net-promoter-score-nps-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/net-promoter-score-nps-calculator/net-promoter-score-nps-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/net-promoter-score-nps-calculator/net-promoter-score-nps-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
