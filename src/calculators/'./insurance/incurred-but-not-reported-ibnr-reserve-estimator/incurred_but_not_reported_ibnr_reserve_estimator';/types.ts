export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred_but_not_reported_ibnr_reserve_estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred_but_not_reported_ibnr_reserve_estimator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred_but_not_reported_ibnr_reserve_estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred_but_not_reported_ibnr_reserve_estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
