export interface './legal/real-estate-closing-calculator/real_estate_closing_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/real-estate-closing-calculator/real_estate_closing_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/real-estate-closing-calculator/real_estate_closing_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/real-estate-closing-calculator/real_estate_closing_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
