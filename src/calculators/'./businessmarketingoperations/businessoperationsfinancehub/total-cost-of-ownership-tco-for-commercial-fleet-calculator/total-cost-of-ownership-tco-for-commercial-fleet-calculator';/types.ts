export interface './businessmarketingoperations/businessoperationsfinancehub/total-cost-of-ownership-tco-for-commercial-fleet-calculator/total-cost-of-ownership-tco-for-commercial-fleet-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/total-cost-of-ownership-tco-for-commercial-fleet-calculator/total-cost-of-ownership-tco-for-commercial-fleet-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/total-cost-of-ownership-tco-for-commercial-fleet-calculator/total-cost-of-ownership-tco-for-commercial-fleet-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/total-cost-of-ownership-tco-for-commercial-fleet-calculator/total-cost-of-ownership-tco-for-commercial-fleet-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
