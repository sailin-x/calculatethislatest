export interface record_label_deal_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface record_label_deal_calculatorResults {
  result: number;
  analysis?: string;
}

export interface record_label_deal_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface record_label_deal_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
