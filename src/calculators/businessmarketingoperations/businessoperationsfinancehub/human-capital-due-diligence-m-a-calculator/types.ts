export interface human_capital_due_diligence_m_a_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface human_capital_due_diligence_m_a_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface human_capital_due_diligence_m_a_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface human_capital_due_diligence_m_a_calculatorOutputs {
  result: number;
  analysis: human_capital_due_diligence_m_a_calculatorAnalysis;
}
