export interface './business/out-of-home-oh-advertising-roi-calculator/out_of_home_oh_advertising_roi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out_of_home_oh_advertising_roi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out_of_home_oh_advertising_roi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out_of_home_oh_advertising_roi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
