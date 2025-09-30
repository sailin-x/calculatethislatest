export interface './finance/self-storage-facility-roi-calculator/self_storage_facility_roi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/self-storage-facility-roi-calculator/self_storage_facility_roi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/self-storage-facility-roi-calculator/self_storage_facility_roi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/self-storage-facility-roi-calculator/self_storage_facility_roi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
