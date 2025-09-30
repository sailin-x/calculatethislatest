export interface CustomerAcquisitionCostInputs {
  totalMarketingSpend: number;
  numberOfNewCustomers: number;
  salesRevenue: number;
  customerLifetimeValue: number;
  timePeriod: 'monthly' | 'quarterly' | 'annually';
  organicTrafficPercentage: number;
  paidTrafficPercentage: number;
  conversionRate: number;
  averageOrderValue: number;
  customerRetentionRate: number;
}

export interface CustomerAcquisitionCostMetrics {
  cacPerCustomer: number;
  cacToLtvRatio: number;
  paybackPeriod: number;
  marketingEfficiency: number;
  customerProfitability: number;
  roiPercentage: number;
}

export interface CustomerAcquisitionCostAnalysis {
  efficiencyRating: string;
  optimizationRecommendations: string[];
  benchmarkComparison: string;
}

export interface CustomerAcquisitionCostOutputs {
  cacPerCustomer: number;
  cacToLtvRatio: number;
  paybackPeriod: number;
  analysis: CustomerAcquisitionCostAnalysis;
}
