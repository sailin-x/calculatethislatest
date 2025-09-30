export interface economic_order_quantity_eoq_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface economic_order_quantity_eoq_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface economic_order_quantity_eoq_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface economic_order_quantity_eoq_calculatorOutputs {
  result: number;
  analysis: economic_order_quantity_eoq_calculatorAnalysis;
}
