export interface shopping_cart_abandonment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface shopping_cart_abandonment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface shopping_cart_abandonment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface shopping_cart_abandonment_calculatorOutputs {
  result: number;
  analysis: shopping_cart_abandonment_calculatorAnalysis;
}
