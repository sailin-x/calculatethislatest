export interface './finance/general/non-compete-agreement-buyout-calculator/non-compete-agreement-buyout-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/non-compete-agreement-buyout-calculator/non-compete-agreement-buyout-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/non-compete-agreement-buyout-calculator/non-compete-agreement-buyout-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/non-compete-agreement-buyout-calculator/non-compete-agreement-buyout-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
