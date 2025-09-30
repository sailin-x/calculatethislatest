export interface './business/net-promoter-score-nps-calculator/net_promoter_score_nps_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/net-promoter-score-nps-calculator/net_promoter_score_nps_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/net-promoter-score-nps-calculator/net_promoter_score_nps_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/net-promoter-score-nps-calculator/net_promoter_score_nps_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
