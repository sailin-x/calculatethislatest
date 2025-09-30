export interface './finance/general/heart-rate-zone-calculator/heart-rate-zone-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/heart-rate-zone-calculator/heart-rate-zone-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/heart-rate-zone-calculator/heart-rate-zone-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/heart-rate-zone-calculator/heart-rate-zone-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
