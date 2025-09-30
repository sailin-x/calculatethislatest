export interface GenerationSkippingTransferGstTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface GenerationSkippingTransferGstTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface GenerationSkippingTransferGstTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface GenerationSkippingTransferGstTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
