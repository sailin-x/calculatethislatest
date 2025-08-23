export interface ROIInputs {
  // Basic ROI metrics
  initialInvestment: number;
  finalValue: number;
  totalReturn: number;
  
  // Time period
  investmentPeriod: number; // months
  startDate: string;
  endDate: string;
  
  // Investment details
  investmentType: 'business' | 'marketing' | 'real-estate' | 'stocks' | 'crypto' | 'startup' | 'equipment' | 'software' | 'advertising' | 'other';
  investmentCategory: 'capital-expenditure' | 'operational-expense' | 'marketing-campaign' | 'acquisition' | 'development' | 'infrastructure';
  
  // Revenue and costs
  additionalRevenue: number;
  costSavings: number;
  operationalCosts: number;
  maintenanceCosts: number;
  marketingCosts: number;
  personnelCosts: number;
  
  // Advanced metrics
  cashFlows: {
    period: number;
    amount: number;
    type: 'inflow' | 'outflow';
    description: string;
  }[];
  
  // Risk factors
  riskLevel: 'low' | 'medium' | 'high';
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  competitivePressure: number; // 1-10
  regulatoryRisk: number; // 1-10
  
  // Business context
  industry: 'technology' | 'healthcare' | 'finance' | 'retail' | 'manufacturing' | 'services' | 'real-estate' | 'other';
  businessStage: 'startup' | 'growth' | 'mature' | 'scale';
  businessModel: 'b2b' | 'b2c' | 'marketplace' | 'subscription' | 'transactional';
  
  // Performance metrics
  customerAcquisitionCost?: number;
  customerLifetimeValue?: number;
  conversionRate?: number;
  marketShare?: number;
  
  // Time value of money
  discountRate: number; // percentage
  inflationRate: number; // percentage
  opportunityCost: number; // percentage
  
  // Comparative analysis
  benchmarkROI?: number;
  industryAverageROI?: number;
  competitorROI?: number;
  
  // Projection parameters
  projectionPeriod: number; // months
  growthRate: number; // percentage
  decayRate: number; // percentage
  
  // Sensitivity analysis
  bestCaseScenario: number;
  worstCaseScenario: number;
  mostLikelyScenario: number;
  
  // Additional factors
  taxRate: number; // percentage
  depreciationRate: number; // percentage
  salvageValue: number;
  
  // Qualitative factors
  strategicValue: number; // 1-10
  marketPositioning: number; // 1-10
  competitiveAdvantage: number; // 1-10
  scalability: number; // 1-10
}

export interface ROIResults {
  // Basic ROI calculations
  basicROI: number;
  annualizedROI: number;
  adjustedROI: number;
  netROI: number;
  
  // Time-based metrics
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  breakEvenPoint: number;
  
  // Advanced financial metrics
  netPresentValue: number;
  internalRateOfReturn: number;
  modifiedInternalRateOfReturn: number;
  profitabilityIndex: number;
  
  // Risk-adjusted metrics
  riskAdjustedROI: number;
  sharpeRatio: number;
  valueAtRisk: number;
  expectedReturn: number;
  
  // Cash flow analysis
  cashFlowAnalysis: {
    period: number;
    cumulativeCashFlow: number;
    discountedCashFlow: number;
    paybackStatus: 'paid' | 'unpaid';
  }[];
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    scenario: string;
    roi: number;
    npv: number;
    paybackPeriod: number;
    probability: number;
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
    projectedValue: number;
    projectedROI: number;
    cumulativeReturn: number;
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
    marketPositioning: number;
    competitiveAdvantage: number;
    scalability: number;
    overallScore: number;
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
