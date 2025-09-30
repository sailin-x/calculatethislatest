export interface './insurance/catastrophe-bond-pricing-model/catastrophe-bond-pricing-model';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/catastrophe-bond-pricing-model/catastrophe-bond-pricing-model';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/catastrophe-bond-pricing-model/catastrophe-bond-pricing-model';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/catastrophe-bond-pricing-model/catastrophe-bond-pricing-model';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
