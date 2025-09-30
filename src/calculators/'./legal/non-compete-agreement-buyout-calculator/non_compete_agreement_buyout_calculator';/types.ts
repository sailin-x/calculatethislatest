export interface './legal/non-compete-agreement-buyout-calculator/non_compete_agreement_buyout_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/non-compete-agreement-buyout-calculator/non_compete_agreement_buyout_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/non-compete-agreement-buyout-calculator/non_compete_agreement_buyout_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/non-compete-agreement-buyout-calculator/non_compete_agreement_buyout_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
