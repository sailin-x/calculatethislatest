export interface required_beginning_date_rbd_for_rmds_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface required_beginning_date_rbd_for_rmds_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface required_beginning_date_rbd_for_rmds_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface required_beginning_date_rbd_for_rmds_calculatorOutputs {
  result: number;
  analysis: required_beginning_date_rbd_for_rmds_calculatorAnalysis;
}
