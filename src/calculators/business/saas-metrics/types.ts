export interface SaaSMetricsInputs {
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  totalCustomers: number;
  newCustomers: number;
  churnedCustomers: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  monthlyChurnRate: number;
  annualChurnRate: number;
  grossRevenueRetention: number;
  netRevenueRetention: number;
  averageRevenuePerUser: number;
  averageRevenuePerAccount: number;
  totalRevenue: number;
  costOfRevenue: number;
  grossMargin: number;
  operatingExpenses: number;
  netIncome: number;
  cashFlow: number;
  burnRate: number;
  runway: number;
}

export interface SaaSMetricsMetrics {
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  ltvToCacRatio: number;
  paybackPeriod: number;
  churnRate: number;
  retentionRate: number;
  grossRevenueRetention: number;
  netRevenueRetention: number;
  averageRevenuePerUser: number;
  averageRevenuePerAccount: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  growthRate: number;
  burnRate: number;
  runway: number;
  grossMargin: number;
  netMargin: number;
  cashFlow: number;
}

export interface SaaSMetricsAnalysis {
  isHealthy: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  keyStrengths: string[];
  keyRisks: string[];
  marketComparison: {
    averageLTV: number;
    averageCAC: number;
    averageChurn: number;
    marketPosition: 'Above Market' | 'At Market' | 'Below Market';
  };
  sensitivityAnalysis: {
    churnIncrease: number;
    cacIncrease: number;
    revenueDecrease: number;
  };
}

export interface SaaSMetricsOutputs extends SaaSMetricsMetrics {
  analysis: SaaSMetricsAnalysis;
}
