export interface RequiredMinimumDistributionRMDInputs {
  accountBalance: number;
  birthYear: number;
  accountType: 'traditional_ira' | '401k' | 'roth_ira' | 'sep_ira' | 'simple_ira';
  currentAge?: number;
  distributionYear?: number;
  spouseBirthYear?: number;
  isSpouseBeneficialOwner?: boolean;
  hasMultipleAccounts?: boolean;
}

export interface RequiredMinimumDistributionRMDOutputs {
  requiredMinimumDistribution: number;
  distributionPercentage: number;
  lifeExpectancyFactor: number;
  remainingBalanceAfterRMD: number;
  taxImplications: string;
  rmdExplanation: string;
}