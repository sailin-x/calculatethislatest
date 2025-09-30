export interface customer_segmentation_rfm_model_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface customer_segmentation_rfm_model_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface customer_segmentation_rfm_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface customer_segmentation_rfm_model_calculatorOutputs {
  result: number;
  analysis: customer_segmentation_rfm_model_calculatorAnalysis;
}
