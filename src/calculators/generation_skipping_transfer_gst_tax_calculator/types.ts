export interface generation_skipping_transfer_gst_tax_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface generation_skipping_transfer_gst_tax_calculatorResults {
  result: number;
  analysis?: string;
}

export interface generation_skipping_transfer_gst_tax_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface generation_skipping_transfer_gst_tax_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
