export interface './businessmarketingoperations/marketingcreatorhub/customer-segmentation-rfm-model-calculator/customer_segmentation_rfm_model_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/marketingcreatorhub/customer-segmentation-rfm-model-calculator/customer_segmentation_rfm_model_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/marketingcreatorhub/customer-segmentation-rfm-model-calculator/customer_segmentation_rfm_model_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/marketingcreatorhub/customer-segmentation-rfm-model-calculator/customer_segmentation_rfm_model_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
