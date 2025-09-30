export interface nft_royalty_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface nft_royalty_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface nft_royalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface nft_royalty_calculatorOutputs {
  result: number;
  analysis: nft_royalty_calculatorAnalysis;
}
