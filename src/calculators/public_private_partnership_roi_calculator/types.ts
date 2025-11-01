export interface public_private_partnership_roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface public_private_partnership_roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface public_private_partnership_roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface public_private_partnership_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
