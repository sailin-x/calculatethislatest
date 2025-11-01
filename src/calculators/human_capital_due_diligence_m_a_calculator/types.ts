export interface human_capital_due_diligence_m_a_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface human_capital_due_diligence_m_a_calculatorResults {
  result: number;
  analysis?: string;
}

export interface human_capital_due_diligence_m_a_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface human_capital_due_diligence_m_a_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
