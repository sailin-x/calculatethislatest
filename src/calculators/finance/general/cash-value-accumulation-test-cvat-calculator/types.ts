export interface cash_value_accumulation_test_cvat_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cash_value_accumulation_test_cvat_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cash_value_accumulation_test_cvat_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cash_value_accumulation_test_cvat_calculatorOutputs {
  result: number;
  analysis: cash_value_accumulation_test_cvat_calculatorAnalysis;
}
