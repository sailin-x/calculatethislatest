export interface customer_segmentation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface customer_segmentation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface customer_segmentation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface customer_segmentation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
