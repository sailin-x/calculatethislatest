export interface './businessmarketingoperations/businessoperationsfinancehub/salary-benchmarking-pay-equity-gap-calculator/salary-benchmarking-pay-equity-gap-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/salary-benchmarking-pay-equity-gap-calculator/salary-benchmarking-pay-equity-gap-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/salary-benchmarking-pay-equity-gap-calculator/salary-benchmarking-pay-equity-gap-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/salary-benchmarking-pay-equity-gap-calculator/salary-benchmarking-pay-equity-gap-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
