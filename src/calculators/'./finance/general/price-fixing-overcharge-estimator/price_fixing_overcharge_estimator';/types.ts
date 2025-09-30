export interface './finance/general/price-fixing-overcharge-estimator/price_fixing_overcharge_estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/price-fixing-overcharge-estimator/price_fixing_overcharge_estimator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/price-fixing-overcharge-estimator/price_fixing_overcharge_estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/price-fixing-overcharge-estimator/price_fixing_overcharge_estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
