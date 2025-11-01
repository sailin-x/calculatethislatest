export interface TrustFundDistributionInputs {
  trustPrincipal: number;
  annualIncome: number;
  beneficiaryAge: number;
  trustDuration: number;
  distributionFrequency: 'monthly' | 'quarterly' | 'annually';
  inflationRate: number;
  taxRate: number;
  trustType: 'revocable' | 'irrevocable' | 'charitable' | 'special_needs';
  stateOfResidence: string;
  numberOfBeneficiaries: number;
  investmentReturn: number;
  administrativeCosts: number;
  requiredMinimumDistribution: boolean;
  generationSkipping: boolean;
}

export interface TrustFundDistributionOutputs {
  monthlyDistribution: number;
  annualDistribution: number;
  totalDistributions: number;
  remainingPrincipal: number;
  taxLiability: number;
  netDistribution: number;
  trustDurationYears: number;
  inflationAdjustedValue: number;
  beneficiaryIncome: number;
  administrativeCostPercentage: number;
  distributionSchedule: string[];
  taxEfficiency: number;
}

export interface TrustFundDistributionMetrics {
  result: number;
}

export interface TrustFundDistributionAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}