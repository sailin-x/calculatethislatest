export interface svod_streaming_content_licensing_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface svod_streaming_content_licensing_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface svod_streaming_content_licensing_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface svod_streaming_content_licensing_valuationOutputs {
  result: number;
  analysis: svod_streaming_content_licensing_valuationAnalysis;
}
