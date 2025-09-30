export interface './business/shopping-cart-abandonment-calculator/shopping_cart_abandonment_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/shopping-cart-abandonment-calculator/shopping_cart_abandonment_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/shopping-cart-abandonment-calculator/shopping_cart_abandonment_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/shopping-cart-abandonment-calculator/shopping_cart_abandonment_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
