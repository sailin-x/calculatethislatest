export interface './legal/car-accident-pain-calculator/car-accident-pain-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/car-accident-pain-calculator/car-accident-pain-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/car-accident-pain-calculator/car-accident-pain-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/car-accident-pain-calculator/car-accident-pain-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
