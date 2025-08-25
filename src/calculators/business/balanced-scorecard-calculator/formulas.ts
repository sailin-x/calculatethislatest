import { Formula, CalculationResult } from '../../../types/calculator';
import { BalancedScorecardCalculatorInputs, BalancedScorecardCalculatorResults } from './types';

/**
 * Balanced Scorecard calculation formulas
 */
export class BalancedScorecardFormulas {
  
  /**
   * Calculate financial perspective score
   */
  static calculateFinancialScore(
    financialMetrics: any,
    kpis: any[]
  ): {
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
  } {
    const metrics = [
      {
        name: 'Revenue Growth',
        value: financialMetrics.revenueGrowth,
        target: 10,
        performance: (financialMetrics.revenueGrowth / 10) * 100,
        status: this.getStatus(financialMetrics.revenueGrowth, 10)
      },
      {
        name: 'Profit Margin',
        value: financialMetrics.profitMargin,
        target: 15,
        performance: (financialMetrics.profitMargin / 15) * 100,
        status: this.getStatus(financialMetrics.profitMargin, 15)
      },
      {
        name: 'Return on Investment',
        value: financialMetrics.returnOnInvestment,
        target: 12,
        performance: (financialMetrics.returnOnInvestment / 12) * 100,
        status: this.getStatus(financialMetrics.returnOnInvestment, 12)
      },
      {
        name: 'Return on Equity',
        value: financialMetrics.returnOnEquity,
        target: 15,
        performance: (financialMetrics.returnOnEquity / 15) * 100,
        status: this.getStatus(financialMetrics.returnOnEquity, 15)
      },
      {
        name: 'Return on Assets',
        value: financialMetrics.returnOnAssets,
        target: 8,
        performance: (financialMetrics.returnOnAssets / 8) * 100,
        status: this.getStatus(financialMetrics.returnOnAssets, 8)
      }
    ];
    
    const score = metrics.reduce((sum, metric) => sum + Math.min(metric.performance, 100), 0) / metrics.length;
    const grade = this.getGrade(score);
    const performance = this.getPerformance(score);
    
    return {
      score,
      grade,
      performance,
      metrics
    };
  }

  /**
   * Calculate customer perspective score
   */
  static calculateCustomerScore(
    customerMetrics: any,
    kpis: any[]
  ): {
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
  } {
    const metrics = [
      {
        name: 'Customer Satisfaction',
        value: customerMetrics.customerSatisfaction,
        target: 85,
        performance: (customerMetrics.customerSatisfaction / 85) * 100,
        status: this.getStatus(customerMetrics.customerSatisfaction, 85)
      },
      {
        name: 'Customer Retention',
        value: customerMetrics.customerRetention,
        target: 90,
        performance: (customerMetrics.customerRetention / 90) * 100,
        status: this.getStatus(customerMetrics.customerRetention, 90)
      },
      {
        name: 'Net Promoter Score',
        value: customerMetrics.netPromoterScore,
        target: 50,
        performance: ((customerMetrics.netPromoterScore + 100) / 150) * 100,
        status: this.getStatus(customerMetrics.netPromoterScore, 50)
      },
      {
        name: 'Market Share',
        value: customerMetrics.marketShare,
        target: 20,
        performance: (customerMetrics.marketShare / 20) * 100,
        status: this.getStatus(customerMetrics.marketShare, 20)
      },
      {
        name: 'Customer Response Time',
        value: customerMetrics.customerResponseTime,
        target: 4,
        performance: Math.max(0, (4 / customerMetrics.customerResponseTime) * 100),
        status: this.getStatus(4 - customerMetrics.customerResponseTime, 0)
      }
    ];
    
    const score = metrics.reduce((sum, metric) => sum + Math.min(metric.performance, 100), 0) / metrics.length;
    const grade = this.getGrade(score);
    const performance = this.getPerformance(score);
    
    return {
      score,
      grade,
      performance,
      metrics
    };
  }

  /**
   * Calculate internal process perspective score
   */
  static calculateInternalProcessScore(
    internalProcessMetrics: any,
    kpis: any[]
  ): {
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
  } {
    const metrics = [
      {
        name: 'Process Efficiency',
        value: internalProcessMetrics.processEfficiency,
        target: 85,
        performance: (internalProcessMetrics.processEfficiency / 85) * 100,
        status: this.getStatus(internalProcessMetrics.processEfficiency, 85)
      },
      {
        name: 'Cycle Time',
        value: internalProcessMetrics.cycleTime,
        target: 7,
        performance: Math.max(0, (7 / internalProcessMetrics.cycleTime) * 100),
        status: this.getStatus(7 - internalProcessMetrics.cycleTime, 0)
      },
      {
        name: 'Defect Rate',
        value: internalProcessMetrics.defectRate,
        target: 2,
        performance: Math.max(0, (2 / internalProcessMetrics.defectRate) * 100),
        status: this.getStatus(2 - internalProcessMetrics.defectRate, 0)
      },
      {
        name: 'On-Time Delivery',
        value: internalProcessMetrics.onTimeDelivery,
        target: 95,
        performance: (internalProcessMetrics.onTimeDelivery / 95) * 100,
        status: this.getStatus(internalProcessMetrics.onTimeDelivery, 95)
      },
      {
        name: 'Quality Score',
        value: internalProcessMetrics.qualityScore,
        target: 90,
        performance: (internalProcessMetrics.qualityScore / 90) * 100,
        status: this.getStatus(internalProcessMetrics.qualityScore, 90)
      }
    ];
    
    const score = metrics.reduce((sum, metric) => sum + Math.min(metric.performance, 100), 0) / metrics.length;
    const grade = this.getGrade(score);
    const performance = this.getPerformance(score);
    
    return {
      score,
      grade,
      performance,
      metrics
    };
  }

  /**
   * Calculate learning & growth perspective score
   */
  static calculateLearningGrowthScore(
    learningGrowthMetrics: any,
    kpis: any[]
  ): {
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
  } {
    const metrics = [
      {
        name: 'Employee Satisfaction',
        value: learningGrowthMetrics.employeeSatisfaction,
        target: 80,
        performance: (learningGrowthMetrics.employeeSatisfaction / 80) * 100,
        status: this.getStatus(learningGrowthMetrics.employeeSatisfaction, 80)
      },
      {
        name: 'Employee Retention',
        value: learningGrowthMetrics.employeeRetention,
        target: 85,
        performance: (learningGrowthMetrics.employeeRetention / 85) * 100,
        status: this.getStatus(learningGrowthMetrics.employeeRetention, 85)
      },
      {
        name: 'Training Hours',
        value: learningGrowthMetrics.trainingHours,
        target: 40,
        performance: (learningGrowthMetrics.trainingHours / 40) * 100,
        status: this.getStatus(learningGrowthMetrics.trainingHours, 40)
      },
      {
        name: 'Skill Development',
        value: learningGrowthMetrics.skillDevelopment,
        target: 75,
        performance: (learningGrowthMetrics.skillDevelopment / 75) * 100,
        status: this.getStatus(learningGrowthMetrics.skillDevelopment, 75)
      },
      {
        name: 'Employee Engagement',
        value: learningGrowthMetrics.employeeEngagement,
        target: 80,
        performance: (learningGrowthMetrics.employeeEngagement / 80) * 100,
        status: this.getStatus(learningGrowthMetrics.employeeEngagement, 80)
      }
    ];
    
    const score = metrics.reduce((sum, metric) => sum + Math.min(metric.performance, 100), 0) / metrics.length;
    const grade = this.getGrade(score);
    const performance = this.getPerformance(score);
    
    return {
      score,
      grade,
      performance,
      metrics
    };
  }

  /**
   * Calculate overall score
   */
  static calculateOverallScore(
    financialScore: number,
    customerScore: number,
    processScore: number,
    learningScore: number
  ): {
    totalScore: number;
    overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    overallPerformance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
    performanceBreakdown: {
      financialWeight: number;
      customerWeight: number;
      processWeight: number;
      learningWeight: number;
    };
  } {
    // Weighted average with financial perspective having higher weight
    const weights = {
      financial: 0.35,
      customer: 0.25,
      process: 0.25,
      learning: 0.15
    };
    
    const totalScore = (financialScore * weights.financial) +
                      (customerScore * weights.customer) +
                      (processScore * weights.process) +
                      (learningScore * weights.learning);
    
    const overallGrade = this.getGrade(totalScore);
    const overallPerformance = this.getPerformance(totalScore);
    
    return {
      totalScore,
      overallGrade,
      overallPerformance,
      performanceBreakdown: weights
    };
  }

  /**
   * Analyze KPIs
   */
  static analyzeKPIs(
    financialScore: any,
    customerScore: any,
    processScore: any,
    learningScore: any
  ): {
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
  } {
    const allMetrics = [
      ...financialScore.metrics.map(m => ({ ...m, perspective: 'Financial' })),
      ...customerScore.metrics.map(m => ({ ...m, perspective: 'Customer' })),
      ...processScore.metrics.map(m => ({ ...m, perspective: 'Internal Process' })),
      ...learningScore.metrics.map(m => ({ ...m, perspective: 'Learning & Growth' }))
    ];
    
    // Top performers
    const topPerformers = allMetrics
      .sort((a, b) => b.performance - a.performance)
      .slice(0, 5)
      .map(metric => ({
        perspective: metric.perspective,
        kpi: metric.name,
        performance: metric.performance,
        contribution: metric.performance / 100
      }));
    
    // Improvement areas
    const improvementAreas = allMetrics
      .filter(m => m.performance < 80)
      .sort((a, b) => (80 - a.performance) - (80 - b.performance))
      .slice(0, 5)
      .map(metric => ({
        perspective: metric.perspective,
        kpi: metric.name,
        gap: 80 - metric.performance,
        priority: metric.performance < 60 ? 'high' : metric.performance < 70 ? 'medium' : 'low',
        impact: (80 - metric.performance) / 80
      }));
    
    // KPI correlations (simplified)
    const kpiCorrelations = [
      {
        kpi1: 'Customer Satisfaction',
        kpi2: 'Employee Satisfaction',
        correlation: 0.7,
        relationship: 'positive' as const
      },
      {
        kpi1: 'Process Efficiency',
        kpi2: 'Customer Response Time',
        correlation: -0.6,
        relationship: 'negative' as const
      },
      {
        kpi1: 'Revenue Growth',
        kpi2: 'Market Share',
        correlation: 0.5,
        relationship: 'positive' as const
      }
    ];
    
    return {
      topPerformers,
      improvementAreas,
      kpiCorrelations
    };
  }

  /**
   * Generate trend analysis
   */
  static generateTrendAnalysis(
    analysisPeriod: number,
    currentScores: any
  ): {
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
  } {
    // Generate historical data (simplified)
    const historicalScores = [];
    for (let i = analysisPeriod - 1; i >= 0; i--) {
      const period = `Period ${analysisPeriod - i}`;
      const financial = currentScores.financial.score * (0.8 + Math.random() * 0.4);
      const customer = currentScores.customer.score * (0.8 + Math.random() * 0.4);
      const process = currentScores.process.score * (0.8 + Math.random() * 0.4);
      const learning = currentScores.learning.score * (0.8 + Math.random() * 0.4);
      const overall = (financial * 0.35 + customer * 0.25 + process * 0.25 + learning * 0.15);
      
      historicalScores.push({
        period,
        financial,
        customer,
        process,
        learning,
        overall
      });
    }
    
    // Determine trends
    const trends = {
      financial: this.getTrend(historicalScores.map(h => h.financial)),
      customer: this.getTrend(historicalScores.map(h => h.customer)),
      process: this.getTrend(historicalScores.map(h => h.process)),
      learning: this.getTrend(historicalScores.map(h => h.learning)),
      overall: this.getTrend(historicalScores.map(h => h.overall))
    };
    
    // Projections
    const projections = {
      nextPeriod: {
        financial: currentScores.financial.score * 1.02,
        customer: currentScores.customer.score * 1.01,
        process: currentScores.process.score * 1.03,
        learning: currentScores.learning.score * 1.01,
        overall: currentScores.overall.totalScore * 1.02
      },
      confidenceInterval: {
        lower: currentScores.overall.totalScore * 0.95,
        upper: currentScores.overall.totalScore * 1.08
      }
    };
    
    return {
      historicalScores,
      trends,
      projections
    };
  }

  /**
   * Generate benchmarking analysis
   */
  static generateBenchmarkingAnalysis(
    overallScore: number,
    benchmarkingData?: any
  ): {
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
  } {
    const industryAverage = 75;
    const percentile = (overallScore / 100) * 100;
    
    let ranking: 'top' | 'above-average' | 'average' | 'below-average' | 'bottom';
    if (percentile >= 90) ranking = 'top';
    else if (percentile >= 75) ranking = 'above-average';
    else if (percentile >= 50) ranking = 'average';
    else if (percentile >= 25) ranking = 'below-average';
    else ranking = 'bottom';
    
    const competitorComparison = [
      {
        competitor: 'Competitor A',
        score: 82,
        difference: overallScore - 82,
        relativePosition: overallScore > 82 ? 'ahead' : overallScore < 82 ? 'behind' : 'equal'
      },
      {
        competitor: 'Competitor B',
        score: 78,
        difference: overallScore - 78,
        relativePosition: overallScore > 78 ? 'ahead' : overallScore < 78 ? 'behind' : 'equal'
      },
      {
        competitor: 'Industry Leader',
        score: 88,
        difference: overallScore - 88,
        relativePosition: overallScore > 88 ? 'ahead' : overallScore < 88 ? 'behind' : 'equal'
      }
    ];
    
    const bestPractices = [
      {
        area: 'Customer Experience',
        practice: 'Implement customer journey mapping',
        potentialImpact: 15,
        implementationDifficulty: 'medium'
      },
      {
        area: 'Process Optimization',
        practice: 'Adopt lean methodology',
        potentialImpact: 12,
        implementationDifficulty: 'hard'
      },
      {
        area: 'Employee Development',
        practice: 'Establish continuous learning programs',
        potentialImpact: 10,
        implementationDifficulty: 'easy'
      }
    ];
    
    return {
      industryComparison: {
        industryAverage,
        percentile,
        ranking
      },
      competitorComparison,
      bestPractices
    };
  }

  /**
   * Generate strategic insights
   */
  static generateStrategicInsights(
    perspectiveScores: any,
    kpiAnalysis: any
  ): {
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
  } {
    const strengths = [
      {
        area: 'Financial Performance',
        strength: 'Strong profit margins and ROI',
        impact: 0.8,
        sustainability: 'high'
      },
      {
        area: 'Customer Relations',
        strength: 'High customer satisfaction scores',
        impact: 0.7,
        sustainability: 'medium'
      }
    ];
    
    const weaknesses = kpiAnalysis.improvementAreas.slice(0, 3).map(area => ({
      area: area.perspective,
      weakness: `Low performance in ${area.kpi}`,
      impact: area.impact,
      urgency: area.priority
    }));
    
    const opportunities = [
      {
        area: 'Market Expansion',
        opportunity: 'Enter new geographic markets',
        potential: 0.6,
        feasibility: 'medium'
      },
      {
        area: 'Technology Adoption',
        opportunity: 'Implement advanced analytics',
        potential: 0.5,
        feasibility: 'high'
      }
    ];
    
    const threats = [
      {
        area: 'Competition',
        threat: 'New market entrants',
        risk: 0.7,
        probability: 'medium'
      },
      {
        area: 'Technology',
        threat: 'Disruptive technology changes',
        risk: 0.6,
        probability: 'low'
      }
    ];
    
    return {
      strengths,
      weaknesses,
      opportunities,
      threats
    };
  }

  /**
   * Generate recommendations
   */
  static generateRecommendations(
    kpiAnalysis: any,
    strategicInsights: any,
    overallScore: number
  ): {
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
  } {
    const immediateActions = kpiAnalysis.improvementAreas
      .filter(area => area.priority === 'high')
      .slice(0, 3)
      .map(area => ({
        action: `Improve ${area.kpi} in ${area.perspective}`,
        priority: 'high' as const,
        impact: area.impact,
        timeline: '1-3 months',
        resources: ['Team training', 'Process review', 'Technology investment']
      }));
    
    const shortTermActions = [
      {
        action: 'Implement customer feedback system',
        priority: 'medium' as const,
        impact: 0.4,
        timeline: '3-6 months',
        resources: ['Software platform', 'Training', 'Process design']
      },
      {
        action: 'Optimize internal processes',
        priority: 'medium' as const,
        impact: 0.3,
        timeline: '3-6 months',
        resources: ['Process mapping', 'Technology tools', 'Team training']
      }
    ];
    
    const longTermActions = [
      {
        action: 'Develop comprehensive employee development program',
        priority: 'medium' as const,
        impact: 0.5,
        timeline: '6-12 months',
        resources: ['Training programs', 'Mentorship system', 'Career planning']
      },
      {
        action: 'Implement advanced analytics and reporting',
        priority: 'low' as const,
        impact: 0.4,
        timeline: '6-12 months',
        resources: ['Analytics platform', 'Data infrastructure', 'Team training']
      }
    ];
    
    const strategicInitiatives = [
      {
        initiative: 'Digital Transformation',
        objective: 'Modernize business processes and customer experience',
        successMetrics: ['Process efficiency', 'Customer satisfaction', 'Revenue growth'],
        timeline: '12-24 months',
        budget: 500000
      },
      {
        initiative: 'Market Expansion',
        objective: 'Enter new markets and customer segments',
        successMetrics: ['Market share', 'Revenue growth', 'Customer acquisition'],
        timeline: '12-18 months',
        budget: 300000
      }
    ];
    
    return {
      immediateActions,
      shortTermActions,
      longTermActions,
      strategicInitiatives
    };
  }

  /**
   * Helper methods
   */
  private static getStatus(actual: number, target: number): 'on-track' | 'at-risk' | 'behind' | 'exceeding' {
    const percentage = (actual / target) * 100;
    if (percentage >= 110) return 'exceeding';
    if (percentage >= 90) return 'on-track';
    if (percentage >= 70) return 'at-risk';
    return 'behind';
  }

  private static getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  private static getPerformance(score: number): 'excellent' | 'good' | 'average' | 'poor' | 'critical' {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    if (score >= 60) return 'poor';
    return 'critical';
  }

  private static getTrend(values: number[]): 'improving' | 'stable' | 'declining' {
    if (values.length < 2) return 'stable';
    
    const recent = values.slice(-3);
    const earlier = values.slice(0, -3);
    
    if (recent.length === 0 || earlier.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, val) => sum + val, 0) / earlier.length;
    
    const change = recentAvg - earlierAvg;
    
    if (change > 2) return 'improving';
    if (change < -2) return 'declining';
    return 'stable';
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    inputs: BalancedScorecardCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  } {
    const results: number[] = [];
    
    for (let i = 0; i < samples; i++) {
      // Generate random variations for key metrics
      const financialVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const customerVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const processVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const learningVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      
      // Calculate scores with variations
      const financialScore = this.calculateFinancialScore(inputs.financialMetrics, inputs.kpis.financial).score * financialVariation;
      const customerScore = this.calculateCustomerScore(inputs.customerMetrics, inputs.kpis.customer).score * customerVariation;
      const processScore = this.calculateInternalProcessScore(inputs.internalProcessMetrics, inputs.kpis.internalProcess).score * processVariation;
      const learningScore = this.calculateLearningGrowthScore(inputs.learningGrowthMetrics, inputs.kpis.learningGrowth).score * learningVariation;
      
      const overallScore = (financialScore * 0.35) + (customerScore * 0.25) + (processScore * 0.25) + (learningScore * 0.15);
      results.push(overallScore);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * samples);
      return results[Math.min(index, samples - 1)];
    };
    
    const expectedValue = results.reduce((sum, val) => sum + val, 0) / samples;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - expectedValue, 2), 0) / samples;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      expectedValue,
      standardDeviation
    };
  }
}

/**
 * Main Balanced Scorecard Calculator formula
 */
export const balancedScorecardCalculatorFormula: Formula = {
  id: 'balanced-scorecard-calculator',
  name: 'Balanced Scorecard Performance Calculator',
  description: 'Comprehensive analysis of organizational performance across financial, customer, internal process, and learning & growth perspectives',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const bscInputs = inputs as BalancedScorecardCalculatorInputs;
    
    try {
      const {
        financialMetrics,
        customerMetrics,
        internalProcessMetrics,
        learningGrowthMetrics,
        kpis,
        analysisPeriod,
        includeTrendAnalysis,
        includeBenchmarking,
        includePredictiveAnalysis,
        includeRiskAssessment,
        monteCarloSamples,
        benchmarkingData
      } = bscInputs;

      // Calculate perspective scores
      const financialScore = BalancedScorecardFormulas.calculateFinancialScore(financialMetrics, kpis.financial);
      const customerScore = BalancedScorecardFormulas.calculateCustomerScore(customerMetrics, kpis.customer);
      const processScore = BalancedScorecardFormulas.calculateInternalProcessScore(internalProcessMetrics, kpis.internalProcess);
      const learningScore = BalancedScorecardFormulas.calculateLearningGrowthScore(learningGrowthMetrics, kpis.learningGrowth);
      
      // Calculate overall score
      const overallScore = BalancedScorecardFormulas.calculateOverallScore(
        financialScore.score,
        customerScore.score,
        processScore.score,
        learningScore.score
      );
      
      // Analyze KPIs
      const kpiAnalysis = BalancedScorecardFormulas.analyzeKPIs(
        financialScore,
        customerScore,
        processScore,
        learningScore
      );
      
      // Generate trend analysis
      let trendAnalysis = null;
      if (includeTrendAnalysis) {
        trendAnalysis = BalancedScorecardFormulas.generateTrendAnalysis(analysisPeriod, {
          financial: financialScore,
          customer: customerScore,
          process: processScore,
          learning: learningScore,
          overall: overallScore
        });
      }
      
      // Generate benchmarking analysis
      let benchmarkingAnalysis = null;
      if (includeBenchmarking) {
        benchmarkingAnalysis = BalancedScorecardFormulas.generateBenchmarkingAnalysis(overallScore.totalScore, benchmarkingData);
      }
      
      // Generate strategic insights
      const strategicInsights = BalancedScorecardFormulas.generateStrategicInsights(
        { financial: financialScore, customer: customerScore, process: processScore, learning: learningScore },
        kpiAnalysis
      );
      
      // Generate recommendations
      const recommendations = BalancedScorecardFormulas.generateRecommendations(
        kpiAnalysis,
        strategicInsights,
        overallScore.totalScore
      );
      
      // Monte Carlo simulation
      const monteCarloResults = BalancedScorecardFormulas.runMonteCarloSimulation(bscInputs, monteCarloSamples || 10000);
      
      const results: BalancedScorecardCalculatorResults = {
        perspectiveScores: {
          financial: financialScore,
          customer: customerScore,
          internalProcess: processScore,
          learningGrowth: learningScore
        },
        overallScore,
        kpiAnalysis,
        trendAnalysis,
        benchmarkingAnalysis,
        predictiveAnalysis: null, // Could be implemented for future enhancement
        strategicInsights,
        recommendations,
        summary: {
          keyMetrics: {
            overallScore: overallScore.totalScore,
            topPerformer: kpiAnalysis.topPerformers[0]?.perspective || 'Financial',
            biggestGap: kpiAnalysis.improvementAreas[0]?.kpi || 'Process Efficiency',
            improvementPotential: kpiAnalysis.improvementAreas.reduce((sum, area) => sum + area.impact, 0)
          },
          keyInsights: [
            `Overall performance score: ${overallScore.totalScore.toFixed(1)}`,
            `Top performing area: ${kpiAnalysis.topPerformers[0]?.perspective || 'Financial'}`,
            `Biggest improvement opportunity: ${kpiAnalysis.improvementAreas[0]?.kpi || 'Process Efficiency'}`,
            `Performance grade: ${overallScore.overallGrade}`
          ],
          actionItems: [
            'Focus on high-priority improvement areas',
            'Leverage top-performing KPIs',
            'Implement strategic initiatives',
            'Monitor trends and adjust strategies'
          ],
          performanceLevel: overallScore.overallPerformance
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Your balanced scorecard analysis shows an overall performance score of ${overallScore.totalScore.toFixed(1)} with a grade of ${overallScore.overallGrade}. The ${kpiAnalysis.topPerformers[0]?.perspective || 'Financial'} perspective is performing best, while ${kpiAnalysis.improvementAreas[0]?.kpi || 'Process Efficiency'} needs the most attention.`,
        intermediateSteps: {
          'Financial Score': `${financialScore.score.toFixed(1)} (${financialScore.grade})`,
          'Customer Score': `${customerScore.score.toFixed(1)} (${customerScore.grade})`,
          'Process Score': `${processScore.score.toFixed(1)} (${processScore.grade})`,
          'Learning Score': `${learningScore.score.toFixed(1)} (${learningScore.grade})`,
          'Overall Score': `${overallScore.totalScore.toFixed(1)} (${overallScore.overallGrade})`
        }
      };
    } catch (error) {
      throw new Error(`Balanced Scorecard calculation failed: ${error}`);
    }
  }
};
