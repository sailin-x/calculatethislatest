export interface './finance/roth-conversion-tax-calculator/register';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/roth-conversion-tax-calculator/register';Results {
  result: number;
  analysis?: string;
}

export interface './finance/roth-conversion-tax-calculator/register';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/roth-conversion-tax-calculator/register';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
