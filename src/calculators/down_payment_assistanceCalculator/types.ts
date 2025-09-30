export interface down_payment_assistanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface down_payment_assistanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface down_payment_assistanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface down_payment_assistanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
