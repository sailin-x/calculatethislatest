export interface SaasMetricsCalculatorInputs {
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  churnRate: number;
  monthlyActiveUsers: number;
  payingCustomers: number;
  trialToPaidConversion: number;
  averageRevenuePerUser: number;
  grossMargin: number;
  salesCycle: number;
  timePeriod: 'monthly' | 'quarterly' | 'annually';
}

export interface SaasMetricsCalculatorMetrics {
  customerAcquisitionCostRatio: number;
  customerLifetimeValueRatio: number;
  monthlyChurnRate: number;
  annualChurnRate: number;
  netRevenueRetention: number;
  customerPaybackPeriod: number;
  monthlyRecurringRevenueGrowth: number;
  averageRevenuePerUser: number;
  grossRevenueChurn: number;
  netRevenueChurn: number;
}

export interface SaasMetricsCalculatorAnalysis {
  healthScore: string;
  growthStage: string;
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
}

export interface SaasMetricsCalculatorOutputs {
  customerAcquisitionCostRatio: number;
  customerLifetimeValueRatio: number;
  monthlyChurnRate: number;
  customerPaybackPeriod: number;
  analysis: SaasMetricsCalculatorAnalysis;
}