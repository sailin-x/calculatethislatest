/**
 * TypeScript interfaces for Balanced Scorecard (BSC) Performance Calculator
 */

export interface BalancedScorecardCalculatorInputs {
  // Financial Perspective
  financialMetrics: {
    revenue: number;
    revenueGrowth: number;
    profitMargin: number;
    returnOnInvestment: number;
    returnOnEquity: number;
    returnOnAssets: number;
    cashFlow: number;
    costReduction: number;
    marketShare: number;
    customerLifetimeValue: number;
  };
  
  // Customer Perspective
  customerMetrics: {
    customerSatisfaction: number; // 0-100
    customerRetention: number; // percentage
    customerAcquisition: number;
    customerLoyalty: number; // 0-100
    marketShare: number; // percentage
    brandRecognition: number; // 0-100
    customerComplaints: number;
    netPromoterScore: number; // -100 to 100
    customerResponseTime: number; // hours
    customerSupportQuality: number; // 0-100
  };
  
  // Internal Process Perspective
  internalProcessMetrics: {
    processEfficiency: number; // 0-100
    cycleTime: number; // days
    defectRate: number; // percentage
    onTimeDelivery: number; // percentage
    inventoryTurnover: number;
    qualityScore: number; // 0-100
    innovationRate: number; // percentage
    employeeProductivity: number; // 0-100
    processAutomation: number; // percentage
    complianceRate: number; // percentage
  };
  
  // Learning & Growth Perspective
  learningGrowthMetrics: {
    employeeSatisfaction: number; // 0-100
    employeeRetention: number; // percentage
    trainingHours: number;
    skillDevelopment: number; // 0-100
    innovationInvestment: number; // percentage of revenue
    technologyAdoption: number; // percentage
    knowledgeSharing: number; // 0-100
    employeeEngagement: number; // 0-100
    leadershipDevelopment: number; // 0-100
    organizationalCulture: number; // 0-100
  };
  
  // Strategic Objectives
  strategicObjectives: {
    financial: string[];
    customer: string[];
    internalProcess: string[];
    learningGrowth: string[];
  };
  
  // Key Performance Indicators (KPIs)
  kpis: {
    financial: Array<{
      name: string;
      target: number;
      actual: number;
      weight: number; // 0-100
    }>;
    customer: Array<{
      name: string;
      target: number;
      actual: number;
      weight: number;
    }>;
    internalProcess: Array<{
      name: string;
      target: number;
      actual: number;
      weight: number;
    }>;
    learningGrowth: Array<{
      name: string;
      target: number;
      actual: number;
      weight: number;
    }>;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // months
  includeTrendAnalysis: boolean;
  includeBenchmarking: boolean;
  includePredictiveAnalysis: boolean;
  includeRiskAssessment: boolean;
  monteCarloSamples: number;
  confidenceLevel: number;
  
  // Benchmarking Data
  benchmarkingData?: {
    industry: string;
    companySize: 'small' | 'medium' | 'large';
    region: string;
    competitorData: Array<{
      company: string;
      financialScore: number;
      customerScore: number;
      processScore: number;
      learningScore: number;
    }>;
  };
}

export interface BalancedScorecardCalculatorResults {
  perspectiveScores: {
    financial: {
      score: number;
      grade: 'A' | 'B' | 'C' | 'D' | 'F';
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
      metrics: Array<{
        name: string;
        value: number;
        target: number;
        performance: number; // percentage of target
        status: 'on-track' | 'at-risk' | 'behind' | 'exceeding';
      }>;
    };
    customer: {
      score: number;
      grade: 'A' | 'B' | 'C' | 'D' | 'F';
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
      metrics: Array<{
        name: string;
        value: number;
        target: number;
        performance: number;
        status: 'on-track' | 'at-risk' | 'behind' | 'exceeding';
      }>;
    };
    internalProcess: {
      score: number;
      grade: 'A' | 'B' | 'C' | 'D' | 'F';
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
      metrics: Array<{
        name: string;
        value: number;
        target: number;
        performance: number;
        status: 'on-track' | 'at-risk' | 'behind' | 'exceeding';
      }>;
    };
    learningGrowth: {
      score: number;
      grade: 'A' | 'B' | 'C' | 'D' | 'F';
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
      metrics: Array<{
        name: string;
        value: number;
        target: number;
        performance: number;
        status: 'on-track' | 'at-risk' | 'behind' | 'exceeding';
      }>;
    };
  };
  
  overallScore: {
    totalScore: number;
    overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    overallPerformance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
    performanceBreakdown: {
      financialWeight: number;
      customerWeight: number;
      processWeight: number;
      learningWeight: number;
    };
  };
  
  kpiAnalysis: {
    topPerformers: Array<{
      perspective: string;
      kpi: string;
      performance: number;
      contribution: number;
    }>;
    improvementAreas: Array<{
      perspective: string;
      kpi: string;
      gap: number;
      priority: 'high' | 'medium' | 'low';
      impact: number;
    }>;
    kpiCorrelations: Array<{
      kpi1: string;
      kpi2: string;
      correlation: number;
      relationship: 'positive' | 'negative' | 'neutral';
    }>;
  };
  
  trendAnalysis?: {
    historicalScores: Array<{
      period: string;
      financial: number;
      customer: number;
      process: number;
      learning: number;
      overall: number;
    }>;
    trends: {
      financial: 'improving' | 'stable' | 'declining';
      customer: 'improving' | 'stable' | 'declining';
      process: 'improving' | 'stable' | 'declining';
      learning: 'improving' | 'stable' | 'declining';
      overall: 'improving' | 'stable' | 'declining';
    };
    projections: {
      nextPeriod: {
        financial: number;
        customer: number;
        process: number;
        learning: number;
        overall: number;
      };
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    };
  };
  
  benchmarkingAnalysis?: {
    industryComparison: {
      industryAverage: number;
      percentile: number;
      ranking: 'top' | 'above-average' | 'average' | 'below-average' | 'bottom';
    };
    competitorComparison: Array<{
      competitor: string;
      score: number;
      difference: number;
      relativePosition: 'ahead' | 'behind' | 'equal';
    }>;
    bestPractices: Array<{
      area: string;
      practice: string;
      potentialImpact: number;
      implementationDifficulty: 'easy' | 'medium' | 'hard';
    }>;
  };
  
  predictiveAnalysis?: {
    riskFactors: Array<{
      factor: string;
      probability: number;
      impact: number;
      riskScore: number;
    }>;
    opportunities: Array<{
      opportunity: string;
      probability: number;
      potentialGain: number;
      priority: 'high' | 'medium' | 'low';
    }>;
    scenarios: {
      optimistic: {
        financial: number;
        customer: number;
        process: number;
        learning: number;
        overall: number;
      };
      pessimistic: {
        financial: number;
        customer: number;
        process: number;
        learning: number;
        overall: number;
      };
      mostLikely: {
        financial: number;
        customer: number;
        process: number;
        learning: number;
        overall: number;
      };
    };
  };
  
  strategicInsights: {
    strengths: Array<{
      area: string;
      strength: string;
      impact: number;
      sustainability: 'high' | 'medium' | 'low';
    }>;
    weaknesses: Array<{
      area: string;
      weakness: string;
      impact: number;
      urgency: 'high' | 'medium' | 'low';
    }>;
    opportunities: Array<{
      area: string;
      opportunity: string;
      potential: number;
      feasibility: 'high' | 'medium' | 'low';
    }>;
    threats: Array<{
      area: string;
      threat: string;
      risk: number;
      probability: 'high' | 'medium' | 'low';
    }>;
  };
  
  recommendations: {
    immediateActions: Array<{
      action: string;
      priority: 'high' | 'medium' | 'low';
      impact: number;
      timeline: string;
      resources: string[];
    }>;
    shortTermActions: Array<{
      action: string;
      priority: 'high' | 'medium' | 'low';
      impact: number;
      timeline: string;
      resources: string[];
    }>;
    longTermActions: Array<{
      action: string;
      priority: 'high' | 'medium' | 'low';
      impact: number;
      timeline: string;
      resources: string[];
    }>;
    strategicInitiatives: Array<{
      initiative: string;
      objective: string;
      successMetrics: string[];
      timeline: string;
      budget: number;
    }>;
  };
  
  summary: {
    keyMetrics: {
      overallScore: number;
      topPerformer: string;
      biggestGap: string;
      improvementPotential: number;
    };
    keyInsights: string[];
    actionItems: string[];
    performanceLevel: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
  };
  
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
