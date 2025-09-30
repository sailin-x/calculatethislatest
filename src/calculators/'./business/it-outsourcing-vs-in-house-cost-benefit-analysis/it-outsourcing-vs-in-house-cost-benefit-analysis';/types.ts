export interface './business/it-outsourcing-vs-in-house-cost-benefit-analysis/it-outsourcing-vs-in-house-cost-benefit-analysis';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/it-outsourcing-vs-in-house-cost-benefit-analysis/it-outsourcing-vs-in-house-cost-benefit-analysis';Results {
  result: number;
  analysis?: string;
}

export interface './business/it-outsourcing-vs-in-house-cost-benefit-analysis/it-outsourcing-vs-in-house-cost-benefit-analysis';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/it-outsourcing-vs-in-house-cost-benefit-analysis/it-outsourcing-vs-in-house-cost-benefit-analysis';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
