export interface record_label_deal_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface record_label_deal_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface record_label_deal_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface record_label_deal_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
