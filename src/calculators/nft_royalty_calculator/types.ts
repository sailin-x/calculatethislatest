export interface nft_royalty_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface nft_royalty_calculatorResults {
  result: number;
  analysis?: string;
}

export interface nft_royalty_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface nft_royalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
