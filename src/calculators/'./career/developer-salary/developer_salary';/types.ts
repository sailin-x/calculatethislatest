export interface './career/developer-salary/developer_salary';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './career/developer-salary/developer_salary';Results {
  result: number;
  analysis?: string;
}

export interface './career/developer-salary/developer_salary';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './career/developer-salary/developer_salary';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
