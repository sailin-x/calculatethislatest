export interface './finance/real-estate-crowdfunding/real_estate_crowdfunding';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-crowdfunding/real_estate_crowdfunding';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-crowdfunding/real_estate_crowdfunding';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-crowdfunding/real_estate_crowdfunding';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
