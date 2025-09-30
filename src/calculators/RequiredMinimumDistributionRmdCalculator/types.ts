export interface RequiredMinimumDistributionRmdCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface RequiredMinimumDistributionRmdCalculatorResults {
  result: number;
  analysis?: string;
}

export interface RequiredMinimumDistributionRmdCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface RequiredMinimumDistributionRmdCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
