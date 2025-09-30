export interface './insurance/political-risk-calculator/political_risk_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/political-risk-calculator/political_risk_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/political-risk-calculator/political_risk_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/political-risk-calculator/political_risk_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
