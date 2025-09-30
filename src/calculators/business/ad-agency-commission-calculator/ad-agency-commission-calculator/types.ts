export interface ad-agency-commission-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad-agency-commission-calculatorResults {
  result: number;
  analysis?: string;
}

export interface ad-agency-commission-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad-agency-commission-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
