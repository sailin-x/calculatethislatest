export interface RMDRMDInputs {
  accountBalance: number;
  currentAge: number;
  lifeExpectancy: number;
  accountType: 'traditional_ira' | 'roth_ira' | '401k' | '403b' | 'sep_ira' | 'simple_ira';
  beneficiaryType: 'spouse' | 'non_spouse' | 'charity' | 'estate';
  spouseAge: number;
  includeSpouse: boolean;
  taxBracket: number;
  expectedReturn: number;
  inflationRate: number;
  previousYearBalance: number;
  qualifiedCharitableDistribution: number;
}

export interface RMDRMDResults {
  annualRMD: number;
  monthlyRMD: number;
  quarterlyRMD: number;
  remainingLifeExpectancy: number;
  rmdPercentage: number;
  taxOnRMD: number;
  netRMD: number;
  penaltyAmount: number;
  totalRMDRequired: number;
  rmdStrategy: string;
}

export interface RMDRMDMetrics {
  rmdEfficiency: number;
  taxOptimization: number;
  penaltyRisk: 'low' | 'medium' | 'high';
  beneficiaryOptimization: 'low' | 'medium' | 'high';
  withdrawalStrategy: 'lump_sum' | 'monthly' | 'quarterly' | 'annually';
}