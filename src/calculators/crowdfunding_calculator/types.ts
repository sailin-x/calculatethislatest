export interface crowdfunding_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crowdfunding_calculatorResults {
  result: number;
  analysis?: string;
}

export interface crowdfunding_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crowdfunding_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
