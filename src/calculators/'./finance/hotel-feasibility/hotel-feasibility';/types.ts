export interface './finance/hotel-feasibility/hotel-feasibility';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/hotel-feasibility/hotel-feasibility';Results {
  result: number;
  analysis?: string;
}

export interface './finance/hotel-feasibility/hotel-feasibility';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/hotel-feasibility/hotel-feasibility';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
