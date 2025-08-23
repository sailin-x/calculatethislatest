import { describe, it, expect } from 'vitest';
import { calculateBudgetOptimization } from './formulas';
import { validateBudgetOptimizationInputs } from './validation';
import { BudgetOptimizationInputs } from './types';
import * as quickValidation from './quickValidation';

describe('calculateBudgetOptimization', () => {
  const mockInputs: BudgetOptimizationInputs = {
    budgetInfo: {
      totalBudget: 1000000,
      budgetPeriod: 12,
      budgetType: 'operating',
      budgetYear: 2024,
      currency: 'USD'
    },
    revenue: {
      totalRevenue: 1500000,
      revenueStreams: [
        { name: 'Product Sales', amount: 1000000, growthRate: 10, reliability: 8, seasonality: false },
        { name: 'Services', amount: 500000, growthRate: 15, reliability: 7, seasonality: true }
      ],
      revenueGrowth: 12,
      revenueVolatility: 15
    },
    expenses: {
      personnel: { salaries: 300000, benefits: 60000, training: 15000, recruitment: 8000, overtime: 12000, contractors: 25000 },
      operations: { rent: 120000, utilities: 24000, maintenance: 18000, supplies: 12000, equipment: 30000, insurance: 15000 },
      marketing: { advertising: 80000, promotions: 25000, events: 15000, digitalMarketing: 30000, publicRelations: 10000, marketResearch: 8000 },
      technology: { software: 40000, hardware: 25000, ITservices: 20000, cybersecurity: 12000, dataStorage: 8000, systemMaintenance: 15000 },
      sales: { commissions: 60000, travel: 18000, entertainment: 8000, salesTools: 12000, leadGeneration: 20000, customerSupport: 25000 },
      administration: { legal: 15000, accounting: 12000, consulting: 18000, officeSupplies: 5000, communication: 8000, miscellaneous: 10000 }
    },
    constraints: {
      mandatoryExpenses: [
        { category: 'Personnel', minimumAmount: 250000, maximumAmount: 350000, priority: 'critical' }
      ],
      budgetLimits: [
        { category: 'Marketing', limit: 200000, flexibility: 10 }
      ],
      timingConstraints: [
        { category: 'Technology', timing: 'immediate', deadline: new Date('2024-06-30') }
      ]
    },
    objectives: {
      primaryObjective: 'cost-reduction',
      secondaryObjectives: ['efficiency-improvement', 'profit-maximization'],
      targetSavings: 15,
      targetROI: 25,
      targetEfficiency: 85,
      riskTolerance: 5
    },
    performanceMetrics: {
      currentEfficiency: 75,
      costEffectiveness: 70,
      revenueImpact: 80,
      qualityMetrics: 85,
      customerSatisfaction: 82,
      employeeSatisfaction: 78
    },
    historicalData: {
      previousBudgets: [
        { year: 2023, totalBudget: 950000, actualSpending: 920000, variance: 30000, performance: 78 }
      ],
      spendingPatterns: [
        { category: 'Personnel', averageSpending: 280000, spendingTrend: 'increasing', seasonality: false }
      ]
    },
    marketConditions: {
      inflationRate: 3.5,
      interestRate: 5.25,
      economicOutlook: 'positive',
      marketVolatility: 20,
      competitivePressure: 6
    },
    riskFactors: {
      revenueRisk: 4,
      costRisk: 5,
      operationalRisk: 3,
      marketRisk: 6,
      regulatoryRisk: 2,
      technologyRisk: 4
    },
    scenarios: [
      {
        scenario: 'Conservative',
        probability: 30,
        budgetAllocation: [
          { category: 'Personnel', allocation: 300000, expectedReturn: 45000, risk: 3 }
        ],
        constraints: ['Cost reduction focus'],
        objectives: ['Risk minimization']
      }
    ],
    includeRiskAnalysis: true,
    includeScenarioAnalysis: true,
    includeSensitivityAnalysis: true,
    includeMonteCarlo: true,
    includeRecommendations: true,
    includeDetailedBreakdown: true,
    includeMultipleScenarios: true,
    includeVisualizations: true,
    includeActionItems: true
  };

  it('should calculate budget optimization with cost reduction objective', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.optimizedBudget).toBeLessThan(mockInputs.budgetInfo.totalBudget);
    expect(results.costSavings).toBeGreaterThan(0);
    expect(results.efficiencyImprovement).toBeGreaterThan(0);
    expect(results.roiImprovement).toBeGreaterThan(0);
    expect(results.riskScore).toBeGreaterThan(0);
    expect(results.riskScore).toBeLessThanOrEqual(10);
  });

  it('should calculate budget optimization with revenue growth objective', () => {
    const growthInputs = { ...mockInputs };
    growthInputs.objectives.primaryObjective = 'revenue-growth';
    
    const results = calculateBudgetOptimization(growthInputs);
    
    expect(results.optimizedBudget).toBeGreaterThanOrEqual(mockInputs.budgetInfo.totalBudget * 0.9);
    expect(results.costSavings).toBeGreaterThanOrEqual(0);
  });

  it('should calculate budget optimization with efficiency improvement objective', () => {
    const efficiencyInputs = { ...mockInputs };
    efficiencyInputs.objectives.primaryObjective = 'efficiency-improvement';
    
    const results = calculateBudgetOptimization(efficiencyInputs);
    
    expect(results.efficiencyImprovement).toBeGreaterThan(0);
    expect(results.budgetOptimizationAnalysis.optimizationScore).toBeGreaterThan(0);
  });

  it('should generate comprehensive budget allocation analysis', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.budgetAllocationAnalysis.totalBudget).toBe(results.optimizedBudget);
    expect(results.budgetAllocationAnalysis.allocationBreakdown).toHaveLength(6);
    expect(results.budgetAllocationAnalysis.allocationEfficiency).toBeGreaterThan(0);
    expect(results.budgetAllocationAnalysis.allocationBalance).toBeGreaterThan(0);
  });

  it('should generate cost analysis with savings breakdown', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.costAnalysis.totalCosts).toBeGreaterThan(0);
    expect(results.costAnalysis.costBreakdown).toHaveLength(6);
    expect(results.costAnalysis.costSavings).toHaveLength(6);
    expect(results.costAnalysis.costEffectiveness).toBeGreaterThan(0);
  });

  it('should generate revenue impact analysis', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.revenueImpactAnalysis.revenueProjection).toBeGreaterThan(0);
    expect(results.revenueImpactAnalysis.revenueGrowth).toBe(mockInputs.revenue.revenueGrowth);
    expect(results.revenueImpactAnalysis.revenueImpact).toHaveLength(4);
    expect(results.revenueImpactAnalysis.revenueOptimization).toBeGreaterThan(0);
  });

  it('should generate efficiency analysis', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.efficiencyAnalysis.overallEfficiency).toBeGreaterThan(0);
    expect(results.efficiencyAnalysis.efficiencyBreakdown).toHaveLength(6);
    expect(results.efficiencyAnalysis.efficiencyGains).toHaveLength(6);
  });

  it('should generate risk analysis', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.riskAnalysis.overallRiskScore).toBeGreaterThan(0);
    expect(results.riskAnalysis.overallRiskScore).toBeLessThanOrEqual(10);
    expect(results.riskAnalysis.riskBreakdown).toHaveLength(6);
    expect(results.riskAnalysis.riskMitigation).toHaveLength(6);
    expect(results.riskAnalysis.riskOptimization).toBeGreaterThan(0);
  });

  it('should generate comprehensive report', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.report).toContain('Budget Optimization Analysis Report');
    expect(results.report).toContain('Executive Summary');
    expect(results.report).toContain('Key Findings');
    expect(results.report).toContain('Recommendations');
  });

  it('should generate recommendations', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.recommendations).toHaveLength(3);
    expect(results.recommendations[0]).toHaveProperty('category');
    expect(results.recommendations[0]).toHaveProperty('recommendations');
    expect(results.recommendations[0]).toHaveProperty('priority');
    expect(results.recommendations[0]).toHaveProperty('expectedImpact');
  });

  it('should generate action items', () => {
    const results = calculateBudgetOptimization(mockInputs);
    
    expect(results.actionItems).toHaveLength(3);
    expect(results.actionItems[0]).toHaveProperty('priority');
    expect(results.actionItems[0]).toHaveProperty('action');
    expect(results.actionItems[0]).toHaveProperty('owner');
    expect(results.actionItems[0]).toHaveProperty('timeline');
  });
});

describe('validateBudgetOptimizationInputs', () => {
  it('should validate correct inputs', () => {
    const validInputs: BudgetOptimizationInputs = {
      budgetInfo: {
        totalBudget: 1000000,
        budgetPeriod: 12,
        budgetType: 'operating',
        budgetYear: 2024,
        currency: 'USD'
      },
      revenue: {
        totalRevenue: 1500000,
        revenueStreams: [],
        revenueGrowth: 10,
        revenueVolatility: 15
      },
      expenses: {
        personnel: { salaries: 300000, benefits: 60000, training: 15000, recruitment: 8000, overtime: 12000, contractors: 25000 },
        operations: { rent: 120000, utilities: 24000, maintenance: 18000, supplies: 12000, equipment: 30000, insurance: 15000 },
        marketing: { advertising: 80000, promotions: 25000, events: 15000, digitalMarketing: 30000, publicRelations: 10000, marketResearch: 8000 },
        technology: { software: 40000, hardware: 25000, ITservices: 20000, cybersecurity: 12000, dataStorage: 8000, systemMaintenance: 15000 },
        sales: { commissions: 60000, travel: 18000, entertainment: 8000, salesTools: 12000, leadGeneration: 20000, customerSupport: 25000 },
        administration: { legal: 15000, accounting: 12000, consulting: 18000, officeSupplies: 5000, communication: 8000, miscellaneous: 10000 }
      },
      constraints: { mandatoryExpenses: [], budgetLimits: [], timingConstraints: [] },
      objectives: {
        primaryObjective: 'cost-reduction',
        secondaryObjectives: [],
        targetSavings: 15,
        targetROI: 25,
        targetEfficiency: 85,
        riskTolerance: 5
      },
      performanceMetrics: {
        currentEfficiency: 75,
        costEffectiveness: 70,
        revenueImpact: 80,
        qualityMetrics: 85,
        customerSatisfaction: 82,
        employeeSatisfaction: 78
      },
      historicalData: { previousBudgets: [], spendingPatterns: [] },
      marketConditions: {
        inflationRate: 3.5,
        interestRate: 5.25,
        economicOutlook: 'positive',
        marketVolatility: 20,
        competitivePressure: 6
      },
      riskFactors: {
        revenueRisk: 4,
        costRisk: 5,
        operationalRisk: 3,
        marketRisk: 6,
        regulatoryRisk: 2,
        technologyRisk: 4
      },
      scenarios: [],
      includeRiskAnalysis: true,
      includeScenarioAnalysis: true,
      includeSensitivityAnalysis: true,
      includeMonteCarlo: true,
      includeRecommendations: true,
      includeDetailedBreakdown: true,
      includeMultipleScenarios: true,
      includeVisualizations: true,
      includeActionItems: true
    };

    const validation = validateBudgetOptimizationInputs(validInputs);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it('should detect missing required fields', () => {
    const invalidInputs = {
      budgetInfo: { totalBudget: 1000000 },
      revenue: { totalRevenue: 1500000 },
      expenses: { personnel: {}, operations: {}, marketing: {}, technology: {}, sales: {}, administration: {} },
      constraints: { mandatoryExpenses: [], budgetLimits: [], timingConstraints: [] },
      objectives: { primaryObjective: 'cost-reduction' },
      performanceMetrics: { currentEfficiency: 75 },
      historicalData: { previousBudgets: [], spendingPatterns: [] },
      marketConditions: { inflationRate: 3.5 },
      riskFactors: { revenueRisk: 4 },
      scenarios: [],
      includeRiskAnalysis: true,
      includeScenarioAnalysis: true,
      includeSensitivityAnalysis: true,
      includeMonteCarlo: true,
      includeRecommendations: true,
      includeDetailedBreakdown: true,
      includeMultipleScenarios: true,
      includeVisualizations: true,
      includeActionItems: true
    };

    const validation = validateBudgetOptimizationInputs(invalidInputs as any);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  it('should detect out of range values', () => {
    const invalidInputs: BudgetOptimizationInputs = {
      budgetInfo: {
        totalBudget: -1000,
        budgetPeriod: 100,
        budgetType: 'operating',
        budgetYear: 2019,
        currency: 'USD'
      },
      revenue: {
        totalRevenue: 1500000,
        revenueStreams: [],
        revenueGrowth: 300,
        revenueVolatility: 150
      },
      expenses: {
        personnel: { salaries: 300000, benefits: 60000, training: 15000, recruitment: 8000, overtime: 12000, contractors: 25000 },
        operations: { rent: 120000, utilities: 24000, maintenance: 18000, supplies: 12000, equipment: 30000, insurance: 15000 },
        marketing: { advertising: 80000, promotions: 25000, events: 15000, digitalMarketing: 30000, publicRelations: 10000, marketResearch: 8000 },
        technology: { software: 40000, hardware: 25000, ITservices: 20000, cybersecurity: 12000, dataStorage: 8000, systemMaintenance: 15000 },
        sales: { commissions: 60000, travel: 18000, entertainment: 8000, salesTools: 12000, leadGeneration: 20000, customerSupport: 25000 },
        administration: { legal: 15000, accounting: 12000, consulting: 18000, officeSupplies: 5000, communication: 8000, miscellaneous: 10000 }
      },
      constraints: { mandatoryExpenses: [], budgetLimits: [], timingConstraints: [] },
      objectives: {
        primaryObjective: 'cost-reduction',
        secondaryObjectives: [],
        targetSavings: 150,
        targetROI: 2000,
        targetEfficiency: 150,
        riskTolerance: 15
      },
      performanceMetrics: {
        currentEfficiency: 150,
        costEffectiveness: 70,
        revenueImpact: 80,
        qualityMetrics: 85,
        customerSatisfaction: 82,
        employeeSatisfaction: 78
      },
      historicalData: { previousBudgets: [], spendingPatterns: [] },
      marketConditions: {
        inflationRate: 100,
        interestRate: 50,
        economicOutlook: 'positive',
        marketVolatility: 150,
        competitivePressure: 15
      },
      riskFactors: {
        revenueRisk: 15,
        costRisk: 5,
        operationalRisk: 3,
        marketRisk: 6,
        regulatoryRisk: 2,
        technologyRisk: 4
      },
      scenarios: [],
      includeRiskAnalysis: true,
      includeScenarioAnalysis: true,
      includeSensitivityAnalysis: true,
      includeMonteCarlo: true,
      includeRecommendations: true,
      includeDetailedBreakdown: true,
      includeMultipleScenarios: true,
      includeVisualizations: true,
      includeActionItems: true
    };

    const validation = validateBudgetOptimizationInputs(invalidInputs);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });
});

describe('Quick Validation Functions', () => {
  it('should validate total budget correctly', () => {
    expect(quickValidation.quickValidateTotalBudget(500)).toBe('Total budget must be at least $1,000');
    expect(quickValidation.quickValidateTotalBudget(2000000000)).toBe('Total budget cannot exceed $1 billion');
    expect(quickValidation.quickValidateTotalBudget(1000000)).toBeNull();
  });

  it('should validate budget period correctly', () => {
    expect(quickValidation.quickValidateBudgetPeriod(0)).toBe('Budget period must be at least 1 month');
    expect(quickValidation.quickValidateBudgetPeriod(100)).toBe('Budget period cannot exceed 60 months');
    expect(quickValidation.quickValidateBudgetPeriod(12)).toBeNull();
  });

  it('should validate total revenue correctly', () => {
    expect(quickValidation.quickValidateTotalRevenue(500)).toBe('Total revenue must be at least $1,000');
    expect(quickValidation.quickValidateTotalRevenue(2000000000)).toBe('Total revenue cannot exceed $1 billion');
    expect(quickValidation.quickValidateTotalRevenue(1500000)).toBeNull();
  });

  it('should validate target savings correctly', () => {
    expect(quickValidation.quickValidateTargetSavings(-10)).toBe('Target savings cannot be negative');
    expect(quickValidation.quickValidateTargetSavings(150)).toBe('Target savings cannot exceed 100%');
    expect(quickValidation.quickValidateTargetSavings(15)).toBeNull();
  });

  it('should validate risk tolerance correctly', () => {
    expect(quickValidation.quickValidateRiskTolerance(0)).toBe('Risk tolerance must be at least 1');
    expect(quickValidation.quickValidateRiskTolerance(15)).toBe('Risk tolerance cannot exceed 10');
    expect(quickValidation.quickValidateRiskTolerance(5)).toBeNull();
  });

  it('should validate current efficiency correctly', () => {
    expect(quickValidation.quickValidateCurrentEfficiency(-10)).toBe('Current efficiency cannot be negative');
    expect(quickValidation.quickValidateCurrentEfficiency(150)).toBe('Current efficiency cannot exceed 100%');
    expect(quickValidation.quickValidateCurrentEfficiency(75)).toBeNull();
  });

  it('should validate inflation rate correctly', () => {
    expect(quickValidation.quickValidateInflationRate(-20)).toBe('Inflation rate cannot be less than -10%');
    expect(quickValidation.quickValidateInflationRate(100)).toBe('Inflation rate cannot exceed 50%');
    expect(quickValidation.quickValidateInflationRate(3.5)).toBeNull();
  });

  it('should validate personnel expenses correctly', () => {
    expect(quickValidation.quickValidateSalaries(-1000)).toBe('Salaries cannot be negative');
    expect(quickValidation.quickValidateSalaries(200000000)).toBe('Salaries cannot exceed $100 million');
    expect(quickValidation.quickValidateSalaries(300000)).toBeNull();
  });

  it('should validate marketing expenses correctly', () => {
    expect(quickValidation.quickValidateAdvertising(-1000)).toBe('Advertising cannot be negative');
    expect(quickValidation.quickValidateAdvertising(100000000)).toBe('Advertising cannot exceed $50 million');
    expect(quickValidation.quickValidateAdvertising(80000)).toBeNull();
  });
});

describe('Edge Cases', () => {
  it('should handle zero budget', () => {
    const zeroBudgetInputs = { ...mockInputs };
    zeroBudgetInputs.budgetInfo.totalBudget = 0;
    
    const results = calculateBudgetOptimization(zeroBudgetInputs);
    expect(results.optimizedBudget).toBe(0);
    expect(results.costSavings).toBe(0);
  });

  it('should handle very high efficiency targets', () => {
    const highEfficiencyInputs = { ...mockInputs };
    highEfficiencyInputs.objectives.targetEfficiency = 95;
    highEfficiencyInputs.performanceMetrics.currentEfficiency = 90;
    
    const results = calculateBudgetOptimization(highEfficiencyInputs);
    expect(results.efficiencyImprovement).toBeGreaterThan(0);
  });

  it('should handle high risk tolerance', () => {
    const highRiskInputs = { ...mockInputs };
    highRiskInputs.objectives.riskTolerance = 9;
    highRiskInputs.riskFactors.revenueRisk = 8;
    highRiskInputs.riskFactors.marketRisk = 9;
    
    const results = calculateBudgetOptimization(highRiskInputs);
    expect(results.riskScore).toBeGreaterThan(5);
  });
});

describe('Performance Tests', () => {
  it('should handle large expense arrays efficiently', () => {
    const largeInputs = { ...mockInputs };
    largeInputs.expenses.personnel.salaries = 10000000;
    largeInputs.expenses.operations.rent = 5000000;
    largeInputs.expenses.marketing.advertising = 8000000;
    
    const startTime = Date.now();
    const results = calculateBudgetOptimization(largeInputs);
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    expect(results.optimizedBudget).toBeGreaterThan(0);
  });
});

describe('Risk Analysis', () => {
  it('should calculate risk score based on multiple factors', () => {
    const highRiskInputs = { ...mockInputs };
    highRiskInputs.riskFactors = {
      revenueRisk: 9,
      costRisk: 8,
      operationalRisk: 7,
      marketRisk: 9,
      regulatoryRisk: 6,
      technologyRisk: 8
    };
    
    const results = calculateBudgetOptimization(highRiskInputs);
    expect(results.riskScore).toBeGreaterThan(7);
  });

  it('should adjust risk based on market conditions', () => {
    const volatileMarketInputs = { ...mockInputs };
    volatileMarketInputs.marketConditions.marketVolatility = 80;
    volatileMarketInputs.marketConditions.competitivePressure = 9;
    
    const results = calculateBudgetOptimization(volatileMarketInputs);
    expect(results.riskScore).toBeGreaterThan(mockInputs.riskFactors.revenueRisk);
  });
});
