export interface './business/management-consulting-fee-model-calculator/management_consulting_fee_model_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/management-consulting-fee-model-calculator/management_consulting_fee_model_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/management-consulting-fee-model-calculator/management_consulting_fee_model_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/management-consulting-fee-model-calculator/management_consulting_fee_model_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
