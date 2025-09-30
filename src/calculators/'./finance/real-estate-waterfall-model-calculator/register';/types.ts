export interface './finance/real-estate-waterfall-model-calculator/register';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-waterfall-model-calculator/register';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-waterfall-model-calculator/register';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-waterfall-model-calculator/register';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
