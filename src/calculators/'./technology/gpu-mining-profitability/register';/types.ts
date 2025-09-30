export interface './technology/gpu-mining-profitability/register';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './technology/gpu-mining-profitability/register';Results {
  result: number;
  analysis?: string;
}

export interface './technology/gpu-mining-profitability/register';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './technology/gpu-mining-profitability/register';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
