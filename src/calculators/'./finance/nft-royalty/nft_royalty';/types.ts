export interface './finance/nft-royalty/nft_royalty';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/nft-royalty/nft_royalty';Results {
  result: number;
  analysis?: string;
}

export interface './finance/nft-royalty/nft_royalty';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/nft-royalty/nft_royalty';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
