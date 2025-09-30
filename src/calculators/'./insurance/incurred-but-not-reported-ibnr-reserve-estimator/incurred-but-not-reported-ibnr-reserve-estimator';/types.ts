export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred-but-not-reported-ibnr-reserve-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred-but-not-reported-ibnr-reserve-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred-but-not-reported-ibnr-reserve-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/incurred-but-not-reported-ibnr-reserve-estimator/incurred-but-not-reported-ibnr-reserve-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
