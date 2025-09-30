export interface './finance/real-estate-syndication-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-syndication-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-syndication-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-syndication-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
