export interface './financeinvestment/cryptocurrencyhub/nft-royalty-revenue-calculator/nft-royalty-revenue-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/nft-royalty-revenue-calculator/nft-royalty-revenue-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/nft-royalty-revenue-calculator/nft-royalty-revenue-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/nft-royalty-revenue-calculator/nft-royalty-revenue-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
