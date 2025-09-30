export interface merger_acquisition_m_a_divestiture_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface merger_acquisition_m_a_divestiture_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface merger_acquisition_m_a_divestiture_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface merger_acquisition_m_a_divestiture_valuationOutputs {
  result: number;
  analysis: merger_acquisition_m_a_divestiture_valuationAnalysis;
}
