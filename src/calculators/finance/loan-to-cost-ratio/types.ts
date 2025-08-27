export interface LoanToCostRatioInputs {
  loanAmount: number;
  totalCost: number;
  propertyValue: number;
  constructionCost: number;
  landCost: number;
  softCosts: number;
  hardCosts: number;
  contingency: number;
  developerProfit: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'mixed-use';
  projectType: 'new-construction' | 'renovation' | 'rehabilitation' | 'conversion';
  location: string;
  marketConditions: 'strong' | 'moderate' | 'weak';
  interestRate: number;
  loanTerm: number;
  loanType: 'construction' | 'permanent' | 'bridge' | 'mezzanine';
  lenderType: 'bank' | 'credit-union' | 'private-lender' | 'hard-money';
  borrowerCreditScore: number;
  borrowerExperience: number;
  projectTimeline: number;
  constructionPhase: 'pre-construction' | 'foundation' | 'framing' | 'finishing' | 'complete';
  completionPercentage: number;
  drawSchedule: Array<{
    phase: string;
    percentage: number;
    amount: number;
    date: string;
  }>;
  costBreakdown: {
    siteWork: number;
    foundation: number;
    structural: number;
    exterior: number;
    interior: number;
    mechanical: number;
    electrical: number;
    plumbing: number;
    finishes: number;
    fixtures: number;
    appliances: number;
    landscaping: number;
    permits: number;
    inspections: number;
    insurance: number;
    legal: number;
    architecture: number;
    engineering: number;
    surveying: number;
    environmental: number;
    other: number;
  };
  riskFactors: {
    marketRisk: number;
    constructionRisk: number;
    financingRisk: number;
    regulatoryRisk: number;
    environmentalRisk: number;
    weatherRisk: number;
    laborRisk: number;
    materialRisk: number;
    timelineRisk: number;
    budgetRisk: number;
  };
}

export interface LoanToCostRatioMetrics {
  loanToCostRatio: number;
  loanToValueRatio: number;
  costToValueRatio: number;
  equityRequirement: number;
  maximumLoanAmount: number;
  availableEquity: number;
  projectFeasibility: number;
  riskScore: number;
  lenderComfortLevel: string;
  approvalProbability: number;
  recommendedLoanAmount: number;
  recommendedEquity: number;
  costOverrunBuffer: number;
  profitMargin: number;
  returnOnEquity: number;
  returnOnInvestment: number;
  breakEvenPoint: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  cashFlowProjection: Array<{
    period: string;
    income: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface LoanToCostRatioAnalysis {
  feasibilityGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketAnalysis: string;
  financingAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface LoanToCostRatioOutputs extends LoanToCostRatioMetrics {
  analysis: LoanToCostRatioAnalysis;
}
