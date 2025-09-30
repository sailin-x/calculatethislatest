export interface './healthfitnessdiet/healthfitnesshub/clinical-trial-cost-estimator/clinical-trial-cost-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/clinical-trial-cost-estimator/clinical-trial-cost-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/clinical-trial-cost-estimator/clinical-trial-cost-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/clinical-trial-cost-estimator/clinical-trial-cost-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
