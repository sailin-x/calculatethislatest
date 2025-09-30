export interface './finance/hotel-feasibility-adr/hotel-feasibility-adr';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/hotel-feasibility-adr/hotel-feasibility-adr';Results {
  result: number;
  analysis?: string;
}

export interface './finance/hotel-feasibility-adr/hotel-feasibility-adr';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/hotel-feasibility-adr/hotel-feasibility-adr';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
