export interface registerRequiredMinimumDistributionRmdCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRequiredMinimumDistributionRmdCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRequiredMinimumDistributionRmdCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRequiredMinimumDistributionRmdCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
