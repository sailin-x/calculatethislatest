export interface instagram_engagement_rate_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface instagram_engagement_rate_calculatorResults {
  result: number;
  analysis?: string;
}

export interface instagram_engagement_rate_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface instagram_engagement_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
