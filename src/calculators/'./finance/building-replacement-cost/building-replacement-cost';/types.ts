export interface './finance/building-replacement-cost/building-replacement-cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/building-replacement-cost/building-replacement-cost';Results {
  result: number;
  analysis?: string;
}

export interface './finance/building-replacement-cost/building-replacement-cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/building-replacement-cost/building-replacement-cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
