export interface CustomerAcquisitionCostCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CustomerAcquisitionCostCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CustomerAcquisitionCostCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CustomerAcquisitionCostCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
