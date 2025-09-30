export interface './finance/financial-fulfillment-calculator/financial_fulfillment_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-fulfillment-calculator/financial_fulfillment_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-fulfillment-calculator/financial_fulfillment_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-fulfillment-calculator/financial_fulfillment_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
