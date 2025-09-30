export interface './legal/business-formation-calculator/business-formation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/business-formation-calculator/business-formation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/business-formation-calculator/business-formation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/business-formation-calculator/business-formation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
