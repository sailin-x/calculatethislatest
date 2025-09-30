export interface './business/ad-agency-commission-calculator/ad-agency-commission-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/ad-agency-commission-calculator/ad-agency-commission-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/ad-agency-commission-calculator/ad-agency-commission-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/ad-agency-commission-calculator/ad-agency-commission-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
