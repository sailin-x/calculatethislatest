export interface self_storage_roiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface self_storage_roiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface self_storage_roiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface self_storage_roiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
