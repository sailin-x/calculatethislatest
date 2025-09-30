export interface nft_minting_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface nft_minting_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface nft_minting_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface nft_minting_cost_calculatorOutputs {
  result: number;
  analysis: nft_minting_cost_calculatorAnalysis;
}
