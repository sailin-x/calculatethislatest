export interface './finance/pmi-cancellation/pmi_cancellation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pmi-cancellation/pmi_cancellation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pmi-cancellation/pmi_cancellation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pmi-cancellation/pmi_cancellation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
