export interface streaming_service_subscriber_churn_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface streaming_service_subscriber_churn_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface streaming_service_subscriber_churn_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface streaming_service_subscriber_churn_cost_calculatorOutputs {
  result: number;
  analysis: streaming_service_subscriber_churn_cost_calculatorAnalysis;
}
