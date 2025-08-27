export interface TitleInsuranceInputs {
  propertyValue: number;
  purchasePrice: number;
  loanAmount: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'commercial' | 'land';
  propertyLocation: string;
  policyType: 'owner' | 'lender' | 'both';
  coverageAmount: number;
  propertyAge: number;
  titleSearchCost: number;
  titleExaminationCost: number;
  documentPreparationCost: number;
  recordingFees: number;
  transferTaxes: number;
  settlementFee: number;
  courierFee: number;
  wireFee: number;
  notaryFee: number;
  otherFees: number;
  titleDefects: {
    liens: boolean;
    easements: boolean;
    encroachments: boolean;
    boundaryDisputes: boolean;
    zoningViolations: boolean;
    buildingCodeViolations: boolean;
    taxDelinquencies: boolean;
    probateIssues: boolean;
  };
  riskFactors: {
    foreclosure: boolean;
    shortSale: boolean;
    estateSale: boolean;
    taxSale: boolean;
    newConstruction: boolean;
    subdivision: boolean;
    commercialUse: boolean;
  };
}

export interface TitleInsuranceMetrics {
  ownerPolicyPremium: number;
  lenderPolicyPremium: number;
  totalPremium: number;
  titleSearchCost: number;
  titleExaminationCost: number;
  documentPreparationCost: number;
  recordingFees: number;
  transferTaxes: number;
  settlementFee: number;
  totalFees: number;
  totalCost: number;
  premiumRate: number;
  coverageRatio: number;
  riskScore: number;
  marketComparison: number;
  savingsOpportunities: number;
}

export interface TitleInsuranceAnalysis {
  coverageGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketComparison: string;
  costAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface TitleInsuranceOutputs extends TitleInsuranceMetrics {
  analysis: TitleInsuranceAnalysis;
}
