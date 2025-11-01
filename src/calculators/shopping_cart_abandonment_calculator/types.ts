export interface shopping_cart_abandonment_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface shopping_cart_abandonment_calculatorResults {
  result: number;
  analysis?: string;
}

export interface shopping_cart_abandonment_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface shopping_cart_abandonment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
