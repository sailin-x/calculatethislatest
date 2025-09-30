export interface './legal/real-estate-closing-calculator/real-estate-closing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/real-estate-closing-calculator/real-estate-closing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/real-estate-closing-calculator/real-estate-closing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/real-estate-closing-calculator/real-estate-closing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
