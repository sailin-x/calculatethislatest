export interface nft_royaltyCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface nft_royaltyCalculatorResults {
  result: number;
  analysis?: string;
}

export interface nft_royaltyCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface nft_royaltyCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
