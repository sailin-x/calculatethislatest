export interface './finance/hotel-feasibility/hotel_feasibility';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/hotel-feasibility/hotel_feasibility';Results {
  result: number;
  analysis?: string;
}

export interface './finance/hotel-feasibility/hotel_feasibility';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/hotel-feasibility/hotel_feasibility';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
