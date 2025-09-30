export interface shopping_cart_abandonment_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface shopping_cart_abandonment_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface shopping_cart_abandonment_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface shopping_cart_abandonment_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
