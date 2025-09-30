export interface './legal/catastrophe-bond-pricing-calculator/catastrophe-bond-pricing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/catastrophe-bond-pricing-calculator/catastrophe-bond-pricing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/catastrophe-bond-pricing-calculator/catastrophe-bond-pricing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/catastrophe-bond-pricing-calculator/catastrophe-bond-pricing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
