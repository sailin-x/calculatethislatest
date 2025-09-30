export interface './finance/crypto-portfolio-rebalancing-calculator/crypto-portfolio-rebalancing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/crypto-portfolio-rebalancing-calculator/crypto-portfolio-rebalancing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/crypto-portfolio-rebalancing-calculator/crypto-portfolio-rebalancing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/crypto-portfolio-rebalancing-calculator/crypto-portfolio-rebalancing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
