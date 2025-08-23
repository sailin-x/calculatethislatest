export interface PaybackPeriodInputs {
  // Basic investment metrics
  initialInvestment: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  
  // Time period
  projectDuration: number; // months
  startDate: string;
  endDate: string;
  
  // Investment details
  investmentType: 'business' | 'equipment' | 'real-estate' | 'marketing' | 'software' | 'infrastructure' | 'acquisition' | 'expansion' | 'r&d' | 'other';
  investmentCategory: 'capital-expenditure' | 'operational-expense' | 'marketing-campaign' | 'development' | 'acquisition' | 'maintenance';
  
  // Cash flow details
  cashFlows: {
    period: number;
    amount: number;
    type: 'inflow' | 'outflow';
    description: string;
  }[];
  
  // Revenue and cost breakdown
  annualRevenue: number;
  annualCosts: number;
  annualSavings: number;
  annualExpenses: number;
  
  // Advanced metrics
  discountRate: number; // percentage
  inflationRate: number; // percentage
  taxRate: number; // percentage
  
  // Risk factors
  riskLevel: 'low' | 'medium' | 'high';
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  competitivePressure: number; // 1-10
  regulatoryRisk: number; // 1-10
  
  // Business context
  industry: 'technology' | 'manufacturing' | 'retail' | 'healthcare' | 'finance' | 'real-estate' | 'services' | 'other';
  businessStage: 'startup' | 'growth' | 'mature' | 'scale';
  businessModel: 'b2b' | 'b2c' | 'marketplace' | 'subscription' | 'transactional';
  
  // Performance metrics
  expectedGrowthRate: number; // percentage
  expectedDecayRate: number; // percentage
  salvageValue: number;
  depreciationRate: number; // percentage
  
  // Comparative analysis
  industryAveragePayback?: number;
  competitorPayback?: number;
  benchmarkPayback?: number;
  
  // Projection parameters
  projectionPeriod: number; // months
  confidenceLevel: number; // percentage
  
  // Sensitivity analysis
  bestCaseScenario: number;
  worstCaseScenario: number;
  mostLikelyScenario: number;
  
  // Additional factors
  opportunityCost: number; // percentage
  costOfCapital: number; // percentage
  hurdleRate: number; // percentage
  
  // Qualitative factors
  strategicValue: number; // 1-10
  operationalEfficiency: number; // 1-10
  marketDemand: number; // 1-10
  competitiveAdvantage: number; // 1-10
  
  // Risk mitigation
  riskMitigationCosts: number;
  insuranceCosts: number;
  contingencyReserve: number;
  
  // Analysis parameters
  analysisPeriod: number; // months
  granularity: 'monthly' | 'quarterly' | 'yearly';
  includeInflation: boolean;
  includeTaxes: boolean;
}

export interface PaybackPeriodResults {
  // Basic payback calculations
  simplePaybackPeriod: number;
  discountedPaybackPeriod: number;
  adjustedPaybackPeriod: number;
  
  // Time-based metrics
  paybackDate: string;
  remainingInvestment: number;
  cumulativeCashFlow: number;
  
  // Advanced financial metrics
  netPresentValue: number;
  internalRateOfReturn: number;
  profitabilityIndex: number;
  modifiedInternalRateOfReturn: number;
  
  // Risk-adjusted metrics
  riskAdjustedPaybackPeriod: number;
  confidenceInterval: { lower: number; upper: number; };
  probabilityOfPayback: number;
  
  // Cash flow analysis
  cashFlowAnalysis: {
    period: number;
    cashFlow: number;
    cumulativeCashFlow: number;
    discountedCashFlow: number;
    cumulativeDiscountedCashFlow: number;
    paybackStatus: 'paid' | 'unpaid';
    remainingBalance: number;
  }[];
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    scenario: string;
    paybackPeriod: number;
    npv: number;
    probability: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Comparative analysis
  comparativeAnalysis: {
    metric: string;
    yourValue: number;
    benchmark: number;
    difference: number;
    performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  }[];
  
  // Risk assessment
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    riskScore: number;
    mitigationStrategies: string[];
  };
  
  // Performance breakdown
  performanceBreakdown: {
    category: string;
    amount: number;
    percentage: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  
  // Projection analysis
  projectionAnalysis: {
    period: number;
    projectedCashFlow: number;
    cumulativeProjectedCashFlow: number;
    projectedPaybackPeriod: number;
    confidence: number;
  }[];
  
  // Optimization insights
  optimizationInsights: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    recommendations: string[];
  }[];
  
  // Business impact
  businessImpact: {
    metric: string;
    currentValue: number;
    projectedValue: number;
    impact: number;
    timeframe: string;
  }[];
  
  // Strategic analysis
  strategicAnalysis: {
    strategicValue: number;
    operationalEfficiency: number;
    marketDemand: number;
    competitiveAdvantage: number;
    overallScore: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    breakEvenDate: string;
    marginOfSafety: number;
    contributionMargin: number;
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementationTime: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
  }[];
}
