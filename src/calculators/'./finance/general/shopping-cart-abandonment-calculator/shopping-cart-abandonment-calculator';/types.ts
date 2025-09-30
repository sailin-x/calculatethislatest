export interface './finance/general/shopping-cart-abandonment-calculator/shopping-cart-abandonment-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/shopping-cart-abandonment-calculator/shopping-cart-abandonment-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/shopping-cart-abandonment-calculator/shopping-cart-abandonment-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/shopping-cart-abandonment-calculator/shopping-cart-abandonment-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
