export interface './finance/self-storage-roi/self-storage-roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/self-storage-roi/self-storage-roi';Results {
  result: number;
  analysis?: string;
}

export interface './finance/self-storage-roi/self-storage-roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/self-storage-roi/self-storage-roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
