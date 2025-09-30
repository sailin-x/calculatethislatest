export interface './businessmarketingoperations/marketingcreatorhub/streaming-service-subscriber-churn-cost-calculator/streaming-service-subscriber-churn-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/marketingcreatorhub/streaming-service-subscriber-churn-cost-calculator/streaming-service-subscriber-churn-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/marketingcreatorhub/streaming-service-subscriber-churn-cost-calculator/streaming-service-subscriber-churn-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/marketingcreatorhub/streaming-service-subscriber-churn-cost-calculator/streaming-service-subscriber-churn-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
