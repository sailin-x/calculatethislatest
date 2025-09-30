export interface sales_commission_structure_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sales_commission_structure_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sales_commission_structure_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sales_commission_structure_calculatorOutputs {
  result: number;
  analysis: sales_commission_structure_calculatorAnalysis;
}
