/**
 * TypeScript interfaces for AIOps Implementation Savings Calculator
 */

export interface AIOpsImplementationSavingsCalculatorInputs {
  // Current IT Operations Metrics
  currentIncidentVolume: number; // Number of incidents per month
  currentMTTR: number; // Mean Time to Resolution in hours
  currentMTBF: number; // Mean Time Between Failures in hours
  currentManualProcesses: number; // Number of manual processes
  currentOnCallEngineers: number; // Number of on-call engineers
  currentEscalationRate: number; // Percentage of incidents that require escalation
  currentFalsePositiveRate: number; // Percentage of false positive alerts
  
  // Cost Parameters
  engineerHourlyRate: number; // Average hourly rate for IT engineers
  downtimeCostPerHour: number; // Cost of downtime per hour
  incidentManagementCost: number; // Cost per incident for management overhead
  trainingCostPerEngineer: number; // Training cost per engineer
  licenseCostPerUser: number; // AIOps license cost per user per month
  
  // AIOps Implementation Parameters
  aiopsImplementationCost: number; // One-time implementation cost
  aiopsLicenseUsers: number; // Number of users requiring licenses
  aiopsImplementationTime: number; // Implementation time in months
  aiopsTrainingTime: number; // Training time per engineer in hours
  
  // Expected Improvements
  expectedMTTRReduction: number; // Expected reduction in MTTR (percentage)
  expectedIncidentReduction: number; // Expected reduction in incident volume (percentage)
  expectedAutomationRate: number; // Expected percentage of processes automated
  expectedFalsePositiveReduction: number; // Expected reduction in false positives (percentage)
  expectedEscalationReduction: number; // Expected reduction in escalations (percentage)
  
  // Analysis Parameters
  analysisPeriod: number; // Analysis period in months
  discountRate: number; // Discount rate for NPV calculation
  includeROI: boolean; // Whether to include ROI analysis
  includePaybackPeriod: boolean; // Whether to include payback period analysis
  includeRiskAnalysis: boolean; // Whether to include risk analysis
  monteCarloSamples: number; // Number of Monte Carlo simulation samples
  confidenceLevel: number; // Confidence level for statistical analysis
}

export interface AIOpsImplementationSavingsCalculatorResults {
  currentState: {
    monthlyIncidentCost: number;
    monthlyLaborCost: number;
    monthlyTotalCost: number;
    annualTotalCost: number;
    efficiencyMetrics: {
      incidentsPerEngineer: number;
      averageResolutionTime: number;
      automationLevel: number;
    };
  };
  
  projectedState: {
    monthlyIncidentCost: number;
    monthlyLaborCost: number;
    monthlyLicenseCost: number;
    monthlyTotalCost: number;
    annualTotalCost: number;
    efficiencyMetrics: {
      incidentsPerEngineer: number;
      averageResolutionTime: number;
      automationLevel: number;
    };
  };
  
  savingsAnalysis: {
    monthlySavings: number;
    annualSavings: number;
    totalSavingsOverPeriod: number;
    savingsBreakdown: {
      incidentCostSavings: number;
      laborCostSavings: number;
      efficiencySavings: number;
    };
    percentageSavings: number;
  };
  
  costAnalysis: {
    implementationCost: number;
    licenseCosts: number;
    trainingCosts: number;
    totalInvestment: number;
    monthlyInvestment: number;
    annualInvestment: number;
  };
  
  roiAnalysis?: {
    roi: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
    benefitCostRatio: number;
  };
  
  paybackAnalysis?: {
    paybackPeriod: number;
    cumulativeSavings: Array<{
      month: number;
      cumulativeSavings: number;
      cumulativeInvestment: number;
      netPosition: number;
    }>;
    breakevenPoint: number;
  };
  
  riskAnalysis?: {
    riskFactors: Array<{
      factor: string;
      probability: number;
      impact: number;
      riskScore: number;
    }>;
    mitigationStrategies: Array<{
      risk: string;
      strategy: string;
      cost: number;
      effectiveness: number;
    }>;
    riskLevel: 'low' | 'medium' | 'high';
  };
  
  efficiencyImprovements: {
    mttrImprovement: number;
    incidentVolumeReduction: number;
    automationGains: number;
    falsePositiveReduction: number;
    escalationReduction: number;
    productivityGains: number;
  };
  
  implementationTimeline: {
    phases: Array<{
      phase: string;
      duration: number;
      cost: number;
      milestones: string[];
    }>;
    totalDuration: number;
    criticalPath: string[];
  };
  
  recommendations: {
    implementation: string[];
    costOptimization: string[];
    riskMitigation: string[];
    successFactors: string[];
  };
  
  summary: {
    keyMetrics: {
      totalSavings: number;
      totalInvestment: number;
      netBenefit: number;
      roi: number;
      paybackPeriod: number;
    };
    keyInsights: string[];
    actionItems: string[];
    riskLevel: 'low' | 'medium' | 'high';
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
