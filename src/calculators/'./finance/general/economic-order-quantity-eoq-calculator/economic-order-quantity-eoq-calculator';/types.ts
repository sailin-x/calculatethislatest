export interface './finance/general/economic-order-quantity-eoq-calculator/economic-order-quantity-eoq-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/economic-order-quantity-eoq-calculator/economic-order-quantity-eoq-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/economic-order-quantity-eoq-calculator/economic-order-quantity-eoq-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/economic-order-quantity-eoq-calculator/economic-order-quantity-eoq-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
