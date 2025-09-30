export interface './technology/gpu-mining-profitability/gpu-mining-profitability';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './technology/gpu-mining-profitability/gpu-mining-profitability';Results {
  result: number;
  analysis?: string;
}

export interface './technology/gpu-mining-profitability/gpu-mining-profitability';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './technology/gpu-mining-profitability/gpu-mining-profitability';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
