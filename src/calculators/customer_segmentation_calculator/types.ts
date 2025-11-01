export interface customer_segmentation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface customer_segmentation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface customer_segmentation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface customer_segmentation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
