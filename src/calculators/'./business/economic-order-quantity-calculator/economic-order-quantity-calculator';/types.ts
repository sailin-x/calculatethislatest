export interface './business/economic-order-quantity-calculator/economic-order-quantity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/economic-order-quantity-calculator/economic-order-quantity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/economic-order-quantity-calculator/economic-order-quantity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/economic-order-quantity-calculator/economic-order-quantity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
