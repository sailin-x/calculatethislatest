export interface './finance/real-estate-investment/real-estate-investment';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-investment/real-estate-investment';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-investment/real-estate-investment';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-investment/real-estate-investment';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
