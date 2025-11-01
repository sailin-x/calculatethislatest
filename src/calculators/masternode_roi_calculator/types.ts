export interface masternode_roi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface masternode_roi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface masternode_roi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface masternode_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
