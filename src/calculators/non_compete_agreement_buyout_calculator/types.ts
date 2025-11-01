export interface non_compete_agreement_buyout_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface non_compete_agreement_buyout_calculatorResults {
  result: number;
  analysis?: string;
}

export interface non_compete_agreement_buyout_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface non_compete_agreement_buyout_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
