export interface './finance/real-estate-crowdfunding/real-estate-crowdfunding';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-crowdfunding/real-estate-crowdfunding';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-crowdfunding/real-estate-crowdfunding';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-crowdfunding/real-estate-crowdfunding';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
