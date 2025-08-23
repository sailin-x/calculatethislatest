export interface BudgetOptimizationInputs {
  budgetInfo: {
    budgetId: string;
    budgetName: string;
    totalBudget: number;
    currency: string;
  };
  
  revenueProjections: {
    revenueSource: string;
    projectedAmount: number;
    growthRate: number;
  }[];
  
  expenseCategories: {
    categoryId: string;
    categoryName: string;
    categoryType: 'fixed' | 'variable' | 'discretionary';
    priority: 'critical' | 'high' | 'medium' | 'low';
  }[];
  
  budgetLineItems: {
    lineItemId: string;
    categoryId: string;
    lineItemName: string;
    budgetedAmount: number;
    actualAmount: number;
    roi: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  optimizationParameters: {
    optimizationGoal: 'cost-reduction' | 'efficiency-improvement' | 'roi-maximization';
    targetSavings: number;
    optimizationMethod: 'linear-programming' | 'scenario-analysis';
    timeHorizon: number;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
  
  performanceMetrics: {
    kpis: {
      kpiName: string;
      currentValue: number;
      targetValue: number;
      weight: number;
    }[];
  };
  
  marketConditions: {
    economicOutlook: 'recession' | 'slowdown' | 'stable' | 'growth';
    inflationRate: number;
    competitivePressure: number;
  };
  
  riskFactors: {
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
    }[];
    operationalRisks: {
      risk: string;
      probability: number;
      impact: number;
    }[];
  };
  
  historicalData: {
    period: Date;
    totalBudget: number;
    totalExpenses: number;
    totalRevenue: number;
    variance: number;
  }[];
  
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: 'best-case' | 'worst-case' | 'most-likely';
      probability: number;
      revenueImpact: number;
      costImpact: number;
    }[];
  };
  
  analysisParameters: {
    optimizationLevel: 'basic' | 'intermediate' | 'advanced';
    includeRiskAnalysis: boolean;
    includeScenarioAnalysis: boolean;
  };
  
  reporting: {
    includeDetailedAnalysis: boolean;
    includeOptimizationProcess: boolean;
    includeScenarioResults: boolean;
    includeRiskAssessment: boolean;
  };
}

export interface BudgetOptimizationResults {
  optimizedBudget: {
    totalBudget: number;
    totalSavings: number;
    savingsPercentage: number;
    optimizationEfficiency: number;
    budgetAllocation: {
      category: string;
      originalAmount: number;
      optimizedAmount: number;
      savings: number;
      savingsPercentage: number;
    }[];
  };
  
  optimizationAnalysis: {
    optimizationMethod: string;
    optimizationScore: number;
    efficiencyImprovement: number;
    qualityMaintenance: number;
    riskReduction: number;
    roiImprovement: number;
  };
  
  categoryOptimization: {
    categories: {
      categoryName: string;
      originalBudget: number;
      optimizedBudget: number;
      savings: number;
      savingsPercentage: number;
      recommendations: string[];
      risks: string[];
    }[];
  };
  
  scenarioResults: {
    scenarios: {
      scenarioName: string;
      probability: number;
      totalBudget: number;
      totalSavings: number;
      efficiencyScore: number;
      riskScore: number;
      roi: number;
    }[];
    bestScenario: {
      scenario: string;
      rationale: string;
      expectedOutcomes: string[];
    };
  };
  
  riskAssessment: {
    optimizationRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  performanceImpact: {
    efficiencyImpact: {
      metric: string;
      beforeValue: number;
      afterValue: number;
      improvement: number;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
    qualityImpact: {
      metric: string;
      beforeValue: number;
      afterValue: number;
      change: number;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
  };
  
  implementationPlan: {
    phases: {
      phaseName: string;
      duration: number;
      deliverables: string[];
      successCriteria: string[];
    }[];
    budget: {
      implementationCost: number;
      expectedSavings: number;
      netBenefit: number;
      paybackPeriod: number;
      roi: number;
    };
  };
  
  costBenefitAnalysis: {
    implementationCosts: {
      cost: string;
      amount: number;
      category: string;
    }[];
    expectedBenefits: {
      benefit: string;
      amount: number;
      category: string;
    }[];
    netPresentValue: number;
    benefitCostRatio: number;
    paybackPeriod: number;
    roi: number;
  };
  
  optimizationOpportunities: {
    immediate: {
      opportunity: string;
      savings: number;
      implementation: string;
      timeline: string;
      risk: string;
    }[];
    shortTerm: {
      opportunity: string;
      savings: number;
      implementation: string;
      timeline: string;
      risk: string;
    }[];
    longTerm: {
      opportunity: string;
      savings: number;
      implementation: string;
      timeline: string;
      risk: string;
    }[];
  };
  
  report: string;
  
  executiveSummary: {
    totalSavings: number;
    optimizationEfficiency: number;
    keyRecommendations: string[];
    implementationTimeline: string;
    expectedOutcomes: string[];
    riskLevel: string;
    nextSteps: string[];
  };
  
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementation: string;
  }[];
  
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
