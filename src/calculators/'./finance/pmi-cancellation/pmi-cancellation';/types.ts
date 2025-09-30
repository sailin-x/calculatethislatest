export interface './finance/pmi-cancellation/pmi-cancellation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pmi-cancellation/pmi-cancellation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pmi-cancellation/pmi-cancellation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pmi-cancellation/pmi-cancellation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
