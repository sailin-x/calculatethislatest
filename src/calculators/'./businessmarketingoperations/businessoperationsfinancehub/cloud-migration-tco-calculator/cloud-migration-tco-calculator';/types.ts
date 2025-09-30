export interface './businessmarketingoperations/businessoperationsfinancehub/cloud-migration-tco-calculator/cloud-migration-tco-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cloud-migration-tco-calculator/cloud-migration-tco-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cloud-migration-tco-calculator/cloud-migration-tco-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cloud-migration-tco-calculator/cloud-migration-tco-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
