export interface './legal/aviation-accident-calculator/aviation-accident-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/aviation-accident-calculator/aviation-accident-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/aviation-accident-calculator/aviation-accident-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/aviation-accident-calculator/aviation-accident-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
