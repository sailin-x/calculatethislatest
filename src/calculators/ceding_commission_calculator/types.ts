export interface ceding_commission_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ceding_commission_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ceding_commission_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ceding_commission_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
