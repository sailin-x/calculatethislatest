export interface './insurance/professional-liability-calculator/professional-liability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/professional-liability-calculator/professional-liability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/professional-liability-calculator/professional-liability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/professional-liability-calculator/professional-liability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
