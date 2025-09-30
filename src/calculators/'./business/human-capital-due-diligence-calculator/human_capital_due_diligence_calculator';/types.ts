export interface './business/human-capital-due-diligence-calculator/human_capital_due_diligence_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/human-capital-due-diligence-calculator/human_capital_due_diligence_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/human-capital-due-diligence-calculator/human_capital_due_diligence_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/human-capital-due-diligence-calculator/human_capital_due_diligence_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
