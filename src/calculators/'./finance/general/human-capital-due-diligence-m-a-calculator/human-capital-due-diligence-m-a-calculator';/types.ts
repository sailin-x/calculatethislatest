export interface './finance/general/human-capital-due-diligence-m-a-calculator/human-capital-due-diligence-m-a-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/human-capital-due-diligence-m-a-calculator/human-capital-due-diligence-m-a-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/human-capital-due-diligence-m-a-calculator/human-capital-due-diligence-m-a-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/human-capital-due-diligence-m-a-calculator/human-capital-due-diligence-m-a-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
