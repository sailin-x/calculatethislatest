export interface registerGenerationSkippingTransferGstTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerGenerationSkippingTransferGstTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerGenerationSkippingTransferGstTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerGenerationSkippingTransferGstTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
