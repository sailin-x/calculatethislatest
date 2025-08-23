import { Calculator } from '../../types/calculator';
import { calculateBudgetOptimization } from './formulas';
import { validateBudgetOptimizationInputs } from './validation';

export const budgetOptimizationCalculator: Calculator = {
  id: 'budget-optimization-calculator',
  name: 'Budget Optimization Calculator',
  description: 'Comprehensive budget optimization tool for businesses to maximize efficiency, reduce costs, and improve ROI through intelligent resource allocation and strategic planning.',
  category: 'Business & Operations',
  tags: ['budget', 'optimization', 'cost-reduction', 'efficiency', 'resource-allocation', 'financial-planning', 'business-strategy'],
  
  inputs: [
    {
      id: 'budgetInfo.totalBudget',
      label: 'Total Budget',
      type: 'number',
      required: true,
      min: 1000,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter total available budget',
      description: 'Total available budget for the period'
    },
    {
      id: 'budgetInfo.budgetPeriod',
      label: 'Budget Period (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 60,
      step: 1,
      placeholder: 'Enter budget period in months',
      description: 'Duration of the budget period'
    },
    {
      id: 'budgetInfo.budgetType',
      label: 'Budget Type',
      type: 'select',
      required: true,
      options: [
        { value: 'operating', label: 'Operating Budget' },
        { value: 'capital', label: 'Capital Budget' },
        { value: 'project', label: 'Project Budget' },
        { value: 'department', label: 'Department Budget' },
        { value: 'organization', label: 'Organization Budget' }
      ],
      placeholder: 'Select budget type',
      description: 'Type of budget being optimized'
    },
    {
      id: 'budgetInfo.budgetYear',
      label: 'Budget Year',
      type: 'number',
      required: true,
      min: 2020,
      max: 2030,
      step: 1,
      placeholder: 'Enter budget year',
      description: 'Year for the budget period'
    },
    {
      id: 'revenue.totalRevenue',
      label: 'Total Revenue',
      type: 'number',
      required: true,
      min: 1000,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter total projected revenue',
      description: 'Total projected revenue for the period'
    },
    {
      id: 'revenue.revenueGrowth',
      label: 'Revenue Growth Rate (%)',
      type: 'number',
      required: false,
      min: -50,
      max: 200,
      step: 0.1,
      placeholder: 'Enter expected revenue growth rate',
      description: 'Expected revenue growth rate'
    },
    {
      id: 'revenue.revenueVolatility',
      label: 'Revenue Volatility (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter revenue volatility percentage',
      description: 'Revenue volatility percentage'
    },
    {
      id: 'objectives.primaryObjective',
      label: 'Primary Objective',
      type: 'select',
      required: true,
      options: [
        { value: 'cost-reduction', label: 'Cost Reduction' },
        { value: 'efficiency-improvement', label: 'Efficiency Improvement' },
        { value: 'revenue-growth', label: 'Revenue Growth' },
        { value: 'profit-maximization', label: 'Profit Maximization' },
        { value: 'risk-minimization', label: 'Risk Minimization' }
      ],
      placeholder: 'Select primary objective',
      description: 'Primary optimization objective'
    },
    {
      id: 'objectives.targetSavings',
      label: 'Target Cost Savings (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter target cost savings percentage',
      description: 'Target cost savings percentage'
    },
    {
      id: 'objectives.targetROI',
      label: 'Target ROI (%)',
      type: 'number',
      required: true,
      min: -100,
      max: 1000,
      step: 0.1,
      placeholder: 'Enter target return on investment',
      description: 'Target return on investment'
    },
    {
      id: 'objectives.targetEfficiency',
      label: 'Target Efficiency (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter target efficiency percentage',
      description: 'Target efficiency improvement'
    },
    {
      id: 'objectives.riskTolerance',
      label: 'Risk Tolerance (1-10)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter risk tolerance level',
      description: 'Risk tolerance level from 1 (conservative) to 10 (aggressive)'
    },
    {
      id: 'performanceMetrics.currentEfficiency',
      label: 'Current Efficiency (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter current efficiency score',
      description: 'Current efficiency score'
    },
    {
      id: 'performanceMetrics.costEffectiveness',
      label: 'Cost Effectiveness (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter cost effectiveness score',
      description: 'Cost effectiveness score'
    },
    {
      id: 'performanceMetrics.revenueImpact',
      label: 'Revenue Impact (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter revenue impact score',
      description: 'Revenue impact score'
    },
    {
      id: 'performanceMetrics.customerSatisfaction',
      label: 'Customer Satisfaction (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter customer satisfaction score',
      description: 'Customer satisfaction score'
    },
    {
      id: 'performanceMetrics.employeeSatisfaction',
      label: 'Employee Satisfaction (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter employee satisfaction score',
      description: 'Employee satisfaction score'
    },
    {
      id: 'marketConditions.inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: false,
      min: -10,
      max: 50,
      step: 0.1,
      placeholder: 'Enter expected inflation rate',
      description: 'Expected inflation rate'
    },
    {
      id: 'marketConditions.interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 30,
      step: 0.01,
      placeholder: 'Enter current interest rate',
      description: 'Current interest rate'
    },
    {
      id: 'marketConditions.marketVolatility',
      label: 'Market Volatility (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter market volatility percentage',
      description: 'Market volatility percentage'
    },
    {
      id: 'marketConditions.competitivePressure',
      label: 'Competitive Pressure (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter competitive pressure level',
      description: 'Competitive pressure level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.revenueRisk',
      label: 'Revenue Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter revenue risk level',
      description: 'Revenue risk level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.costRisk',
      label: 'Cost Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter cost risk level',
      description: 'Cost risk level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.operationalRisk',
      label: 'Operational Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter operational risk level',
      description: 'Operational risk level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.marketRisk',
      label: 'Market Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter market risk level',
      description: 'Market risk level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.regulatoryRisk',
      label: 'Regulatory Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter regulatory risk level',
      description: 'Regulatory risk level from 1 (low) to 10 (high)'
    },
    {
      id: 'riskFactors.technologyRisk',
      label: 'Technology Risk (1-10)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      step: 1,
      placeholder: 'Enter technology risk level',
      description: 'Technology risk level from 1 (low) to 10 (high)'
    }
  ],
  
  calculate: calculateBudgetOptimization,
  validate: validateBudgetOptimizationInputs,
  
  examples: [
    {
      name: 'Cost Reduction Focus',
      description: 'Optimize budget for maximum cost savings while maintaining operational efficiency',
      inputs: {
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
          riskTolerance: 4
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
      }
    },
    {
      name: 'Revenue Growth Focus',
      description: 'Optimize budget to maximize revenue growth and market expansion',
      inputs: {
        budgetInfo: {
          totalBudget: 2000000,
          budgetPeriod: 12,
          budgetType: 'operating',
          budgetYear: 2024,
          currency: 'USD'
        },
        revenue: {
          totalRevenue: 3000000,
          revenueStreams: [],
          revenueGrowth: 25,
          revenueVolatility: 25
        },
        expenses: {
          personnel: { salaries: 500000, benefits: 100000, training: 25000, recruitment: 15000, overtime: 20000, contractors: 40000 },
          operations: { rent: 200000, utilities: 40000, maintenance: 30000, supplies: 20000, equipment: 50000, insurance: 25000 },
          marketing: { advertising: 150000, promotions: 50000, events: 30000, digitalMarketing: 60000, publicRelations: 20000, marketResearch: 15000 },
          technology: { software: 80000, hardware: 50000, ITservices: 40000, cybersecurity: 20000, dataStorage: 15000, systemMaintenance: 25000 },
          sales: { commissions: 120000, travel: 30000, entertainment: 15000, salesTools: 20000, leadGeneration: 40000, customerSupport: 40000 },
          administration: { legal: 25000, accounting: 20000, consulting: 30000, officeSupplies: 8000, communication: 12000, miscellaneous: 15000 }
        },
        constraints: { mandatoryExpenses: [], budgetLimits: [], timingConstraints: [] },
        objectives: {
          primaryObjective: 'revenue-growth',
          secondaryObjectives: [],
          targetSavings: 5,
          targetROI: 35,
          targetEfficiency: 80,
          riskTolerance: 7
        },
        performanceMetrics: {
          currentEfficiency: 70,
          costEffectiveness: 65,
          revenueImpact: 85,
          qualityMetrics: 80,
          customerSatisfaction: 85,
          employeeSatisfaction: 75
        },
        historicalData: { previousBudgets: [], spendingPatterns: [] },
        marketConditions: {
          inflationRate: 4.0,
          interestRate: 5.5,
          economicOutlook: 'positive',
          marketVolatility: 30,
          competitivePressure: 7
        },
        riskFactors: {
          revenueRisk: 6,
          costRisk: 4,
          operationalRisk: 5,
          marketRisk: 7,
          regulatoryRisk: 3,
          technologyRisk: 5
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
      }
    },
    {
      name: 'Efficiency Improvement Focus',
      description: 'Optimize budget to improve operational efficiency and process optimization',
      inputs: {
        budgetInfo: {
          totalBudget: 800000,
          budgetPeriod: 12,
          budgetType: 'operating',
          budgetYear: 2024,
          currency: 'USD'
        },
        revenue: {
          totalRevenue: 1200000,
          revenueStreams: [],
          revenueGrowth: 8,
          revenueVolatility: 10
        },
        expenses: {
          personnel: { salaries: 250000, benefits: 50000, training: 20000, recruitment: 10000, overtime: 15000, contractors: 30000 },
          operations: { rent: 100000, utilities: 20000, maintenance: 25000, supplies: 15000, equipment: 40000, insurance: 20000 },
          marketing: { advertising: 60000, promotions: 20000, events: 12000, digitalMarketing: 25000, publicRelations: 8000, marketResearch: 6000 },
          technology: { software: 60000, hardware: 35000, ITservices: 30000, cybersecurity: 18000, dataStorage: 12000, systemMaintenance: 20000 },
          sales: { commissions: 50000, travel: 15000, entertainment: 6000, salesTools: 10000, leadGeneration: 18000, customerSupport: 22000 },
          administration: { legal: 12000, accounting: 15000, consulting: 20000, officeSupplies: 6000, communication: 10000, miscellaneous: 12000 }
        },
        constraints: { mandatoryExpenses: [], budgetLimits: [], timingConstraints: [] },
        objectives: {
          primaryObjective: 'efficiency-improvement',
          secondaryObjectives: [],
          targetSavings: 10,
          targetROI: 20,
          targetEfficiency: 90,
          riskTolerance: 6
        },
        performanceMetrics: {
          currentEfficiency: 65,
          costEffectiveness: 60,
          revenueImpact: 75,
          qualityMetrics: 80,
          customerSatisfaction: 78,
          employeeSatisfaction: 70
        },
        historicalData: { previousBudgets: [], spendingPatterns: [] },
        marketConditions: {
          inflationRate: 3.0,
          interestRate: 5.0,
          economicOutlook: 'neutral',
          marketVolatility: 15,
          competitivePressure: 5
        },
        riskFactors: {
          revenueRisk: 3,
          costRisk: 4,
          operationalRisk: 6,
          marketRisk: 4,
          regulatoryRisk: 2,
          technologyRisk: 5
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
      }
    }
  ],
  
  relatedCalculators: [
    'break-even-analysis-calculator',
    'roi-calculator',
    'cost-benefit-analysis-calculator',
    'financial-forecasting-calculator',
    'business-valuation-calculator',
    'cash-flow-calculator',
    'profit-margin-calculator',
    'operational-efficiency-calculator'
  ]
};
