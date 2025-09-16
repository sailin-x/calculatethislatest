export interface RBDRMDInputs {
  birthYear: number;
  currentYear: number;
  accountBalance: number;
  lifeExpectancy: number;
  accountType: 'traditional_ira' | 'roth_ira' | '401k' | '403b' | 'sep_ira' | 'simple_ira';
  beneficiaryType: 'spouse' | 'non_spouse' | 'charity' | 'estate';
  spouseBirthYear: number;
  includeSpouse: boolean;
  taxBracket: number;
  expectedReturn: number;
  inflationRate: number;
}

export interface RBDRMDResults {
  requiredBeginningDate: number;
  annualRMD: number;
  monthlyRMD: number;
  totalLifetimeRMDs: number;
  remainingLifeExpectancy: number;
  rmdPercentage: number;
  taxOnRMD: number;
  netRMD: number;
  rmdStrategy: string;
}

export interface RBDRMDMetrics {
  rmdEfficiency: number;
  taxImpact: number;
  longevityRisk: 'low' | 'medium' | 'high';
  beneficiaryOptimization: 'low' | 'medium' | 'high';
  planningHorizon: number;
}