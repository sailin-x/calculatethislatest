export interface tiktok_creator_fund_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tiktok_creator_fund_calculatorResults {
  result: number;
  analysis?: string;
}

export interface tiktok_creator_fund_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tiktok_creator_fund_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
