export interface './finance/merger-arbitrage-spread-calculator/merger-arbitrage-spread-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/merger-arbitrage-spread-calculator/merger-arbitrage-spread-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/merger-arbitrage-spread-calculator/merger-arbitrage-spread-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/merger-arbitrage-spread-calculator/merger-arbitrage-spread-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
