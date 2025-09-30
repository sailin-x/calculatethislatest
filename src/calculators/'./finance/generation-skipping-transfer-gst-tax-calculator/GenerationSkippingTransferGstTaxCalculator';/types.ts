export interface './finance/generation-skipping-transfer-gst-tax-calculator/GenerationSkippingTransferGstTaxCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/generation-skipping-transfer-gst-tax-calculator/GenerationSkippingTransferGstTaxCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/generation-skipping-transfer-gst-tax-calculator/GenerationSkippingTransferGstTaxCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/generation-skipping-transfer-gst-tax-calculator/GenerationSkippingTransferGstTaxCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
