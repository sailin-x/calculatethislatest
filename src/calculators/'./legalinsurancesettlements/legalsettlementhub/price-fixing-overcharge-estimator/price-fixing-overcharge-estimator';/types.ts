export interface './legalinsurancesettlements/legalsettlementhub/price-fixing-overcharge-estimator/price-fixing-overcharge-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/price-fixing-overcharge-estimator/price-fixing-overcharge-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/price-fixing-overcharge-estimator/price-fixing-overcharge-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/price-fixing-overcharge-estimator/price-fixing-overcharge-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
