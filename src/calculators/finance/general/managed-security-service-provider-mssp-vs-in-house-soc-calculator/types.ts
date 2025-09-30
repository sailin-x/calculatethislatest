export interface managed_security_service_provider_mssp_vs_in_house_soc_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface managed_security_service_provider_mssp_vs_in_house_soc_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface managed_security_service_provider_mssp_vs_in_house_soc_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface managed_security_service_provider_mssp_vs_in_house_soc_calculatorOutputs {
  result: number;
  analysis: managed_security_service_provider_mssp_vs_in_house_soc_calculatorAnalysis;
}
