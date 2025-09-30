export interface './finance/business-loan-qualification-calculator/business-loan-qualification-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/business-loan-qualification-calculator/business-loan-qualification-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/business-loan-qualification-calculator/business-loan-qualification-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/business-loan-qualification-calculator/business-loan-qualification-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
