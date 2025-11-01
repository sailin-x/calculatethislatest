export interface medical_bill_negotiation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface medical_bill_negotiation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface medical_bill_negotiation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface medical_bill_negotiation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
