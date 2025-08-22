export interface MortgageLifeInputs {
  loanAmount: number;
  currentLoanBalance: number;
  borrowerAge: number;
  coBorrowerAge: number;
  loanTerm: number;
  yearsRemaining: number;
  monthlyPayment: number;
  annualIncome: number;
  otherDebts: number;
  savings: number;
  dependents: number;
  healthStatus: 'excellent' | 'very-good' | 'good' | 'fair' | 'poor';
  smokingStatus: 'non-smoker' | 'former-smoker' | 'smoker';
  occupation: 'low-risk' | 'medium-risk' | 'high-risk';
  hobbies: 'low-risk' | 'medium-risk' | 'high-risk';
  existingLifeInsurance: number;
  mortgageLifePremium: number;
  termLifePremium: number;
  inflationRate: number;
  investmentReturn: number;
  state: string;
  coverageType: 'decreasing' | 'level' | 'joint' | 'survivorship';
  beneficiaryType: 'family' | 'trust' | 'estate' | 'charity';
}

export interface MortgageLifeOutputs {
  mortgageLifeCoverage: number;
  totalLifeInsuranceNeeded: number;
  additionalCoverageNeeded: number;
  mortgageLifeCost: number;
  termLifeCost: number;
  costDifference: number;
  totalCostOverTerm: number;
  coverageComparison: string;
  benefitAnalysis: string;
  recommendations: string;
  riskAssessment: string;
  costBenefitAnalysis: string;
  alternativeStrategies: string;
  taxImplications: string;
  coverageTimeline: string;
  familyProtection: string;
  policyFeatures: string;
  underwritingConsiderations: string;
  conversionOptions: string;
  claimProcess: string;
  financialImpact: string;
  estatePlanning: string;
  nextSteps: string;
}
