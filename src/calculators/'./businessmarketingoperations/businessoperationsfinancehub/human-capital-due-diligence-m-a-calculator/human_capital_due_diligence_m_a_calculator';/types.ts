export interface './businessmarketingoperations/businessoperationsfinancehub/human-capital-due-diligence-m-a-calculator/human_capital_due_diligence_m_a_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/human-capital-due-diligence-m-a-calculator/human_capital_due_diligence_m_a_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/human-capital-due-diligence-m-a-calculator/human_capital_due_diligence_m_a_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/human-capital-due-diligence-m-a-calculator/human_capital_due_diligence_m_a_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
