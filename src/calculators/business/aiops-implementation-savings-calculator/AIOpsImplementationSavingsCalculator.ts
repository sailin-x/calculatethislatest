import { Calculator } from '../../../types/calculator';
import { aiopsImplementationSavingsCalculatorFormula } from './formulas';
import { AIOpsImplementationSavingsCalculatorInputs, AIOpsImplementationSavingsCalculatorResults } from './types';

/**
 * AIOps Implementation Savings Calculator
 * Comprehensive analysis tool for evaluating AIOps implementation costs, savings, and ROI
 */
export const aiopsImplementationSavingsCalculator: Calculator = {
  id: 'aiops-implementation-savings-calculator',
  title: 'AIOps Implementation Savings Calculator',
  description: 'Advanced calculator for analyzing AIOps (Artificial Intelligence for IT Operations) implementation costs, projected savings, ROI, and risk assessment for IT operations optimization.',
  category: 'Business',
  subcategory: 'IT Operations',
  tags: ['aiops', 'it-operations', 'automation', 'roi', 'cost-analysis', 'risk-assessment', 'implementation', 'monte-carlo'],
  
  inputs: {
    currentIncidentVolume: {
      label: 'Current Incident Volume',
      type: 'number',
      unit: 'incidents/month',
      required: true,
      description: 'Number of IT incidents handled per month',
      placeholder: '100',
      min: 0,
      max: 10000,
      step: 1
    },
    currentMTTR: {
      label: 'Current MTTR (Mean Time to Resolution)',
      type: 'number',
      unit: 'hours',
      required: true,
      description: 'Average time to resolve incidents in hours',
      placeholder: '4',
      min: 0.1,
      max: 168,
      step: 0.1
    },
    currentMTBF: {
      label: 'Current MTBF (Mean Time Between Failures)',
      type: 'number',
      unit: 'hours',
      required: false,
      description: 'Average time between system failures in hours',
      placeholder: '720',
      min: 1,
      max: 8760,
      step: 1,
      default: 720
    },
    currentManualProcesses: {
      label: 'Current Manual Processes',
      type: 'number',
      unit: 'processes',
      required: false,
      description: 'Number of manual processes that could be automated',
      placeholder: '50',
      min: 0,
      max: 1000,
      step: 1,
      default: 50
    },
    currentOnCallEngineers: {
      label: 'Current On-Call Engineers',
      type: 'number',
      unit: 'engineers',
      required: true,
      description: 'Number of engineers currently on-call',
      placeholder: '10',
      min: 1,
      max: 100,
      step: 1
    },
    currentEscalationRate: {
      label: 'Current Escalation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Percentage of incidents that require escalation',
      placeholder: '20',
      min: 0,
      max: 100,
      step: 1,
      default: 20
    },
    currentFalsePositiveRate: {
      label: 'Current False Positive Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Percentage of false positive alerts',
      placeholder: '30',
      min: 0,
      max: 100,
      step: 1,
      default: 30
    },
    engineerHourlyRate: {
      label: 'Engineer Hourly Rate',
      type: 'number',
      unit: 'USD/hour',
      required: true,
      description: 'Average hourly rate for IT engineers',
      placeholder: '75',
      min: 10,
      max: 500,
      step: 1
    },
    downtimeCostPerHour: {
      label: 'Downtime Cost per Hour',
      type: 'number',
      unit: 'USD/hour',
      required: true,
      description: 'Cost of system downtime per hour',
      placeholder: '5000',
      min: 0,
      max: 1000000,
      step: 100
    },
    incidentManagementCost: {
      label: 'Incident Management Cost',
      type: 'number',
      unit: 'USD/incident',
      required: false,
      description: 'Additional cost per incident for management overhead',
      placeholder: '200',
      min: 0,
      max: 10000,
      step: 10,
      default: 200
    },
    trainingCostPerEngineer: {
      label: 'Training Cost per Engineer',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Training cost per engineer for AIOps tools',
      placeholder: '5000',
      min: 0,
      max: 50000,
      step: 100,
      default: 5000
    },
    licenseCostPerUser: {
      label: 'License Cost per User',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'AIOps license cost per user per month',
      placeholder: '100',
      min: 0,
      max: 10000,
      step: 1
    },
    aiopsImplementationCost: {
      label: 'AIOps Implementation Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'One-time implementation cost for AIOps solution',
      placeholder: '500000',
      min: 0,
      max: 10000000,
      step: 1000
    },
    aiopsLicenseUsers: {
      label: 'AIOps License Users',
      type: 'number',
      unit: 'users',
      required: true,
      description: 'Number of users requiring AIOps licenses',
      placeholder: '15',
      min: 1,
      max: 1000,
      step: 1
    },
    aiopsImplementationTime: {
      label: 'AIOps Implementation Time',
      type: 'number',
      unit: 'months',
      required: false,
      description: 'Time required to implement AIOps solution',
      placeholder: '6',
      min: 1,
      max: 36,
      step: 1,
      default: 6
    },
    aiopsTrainingTime: {
      label: 'AIOps Training Time',
      type: 'number',
      unit: 'hours',
      required: false,
      description: 'Training time per engineer in hours',
      placeholder: '40',
      min: 0,
      max: 200,
      step: 1,
      default: 40
    },
    expectedMTTRReduction: {
      label: 'Expected MTTR Reduction',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected reduction in mean time to resolution',
      placeholder: '50',
      min: 0,
      max: 90,
      step: 1
    },
    expectedIncidentReduction: {
      label: 'Expected Incident Reduction',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected reduction in incident volume',
      placeholder: '30',
      min: 0,
      max: 90,
      step: 1
    },
    expectedAutomationRate: {
      label: 'Expected Automation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected percentage of processes that can be automated',
      placeholder: '60',
      min: 0,
      max: 100,
      step: 1
    },
    expectedFalsePositiveReduction: {
      label: 'Expected False Positive Reduction',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected reduction in false positive alerts',
      placeholder: '70',
      min: 0,
      max: 100,
      step: 1,
      default: 70
    },
    expectedEscalationReduction: {
      label: 'Expected Escalation Reduction',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected reduction in incident escalations',
      placeholder: '50',
      min: 0,
      max: 100,
      step: 1,
      default: 50
    },
    analysisPeriod: {
      label: 'Analysis Period',
      type: 'number',
      unit: 'months',
      required: false,
      description: 'Time period for analysis in months',
      placeholder: '36',
      min: 1,
      max: 120,
      step: 1,
      default: 36
    },
    discountRate: {
      label: 'Discount Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Discount rate for NPV calculation',
      placeholder: '10',
      min: 0,
      max: 100,
      step: 0.1,
      default: 10
    },
    includeROI: {
      label: 'Include ROI Analysis',
      type: 'boolean',
      required: false,
      description: 'Calculate ROI, NPV, and IRR metrics',
      default: true
    },
    includePaybackPeriod: {
      label: 'Include Payback Period Analysis',
      type: 'boolean',
      required: false,
      description: 'Calculate payback period and breakeven analysis',
      default: true
    },
    includeRiskAnalysis: {
      label: 'Include Risk Analysis',
      type: 'boolean',
      required: false,
      description: 'Perform risk assessment and mitigation analysis',
      default: true
    },
    monteCarloSamples: {
      label: 'Monte Carlo Samples',
      type: 'number',
      unit: '',
      required: false,
      description: 'Number of Monte Carlo simulation samples',
      placeholder: '10000',
      min: 1000,
      max: 100000,
      step: 1000,
      default: 10000
    },
    confidenceLevel: {
      label: 'Confidence Level',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Confidence level for statistical analysis',
      placeholder: '95',
      min: 80,
      max: 99.9,
      step: 0.1,
      default: 95
    }
  },
  
  outputs: {
    currentState: {
      label: 'Current State Analysis',
      type: 'object',
      description: 'Current IT operations costs and efficiency metrics'
    },
    projectedState: {
      label: 'Projected State Analysis',
      type: 'object',
      description: 'Projected costs and efficiency after AIOps implementation'
    },
    savingsAnalysis: {
      label: 'Savings Analysis',
      type: 'object',
      description: 'Detailed breakdown of projected savings'
    },
    costAnalysis: {
      label: 'Cost Analysis',
      type: 'object',
      description: 'Implementation costs and investment breakdown'
    },
    roiAnalysis: {
      label: 'ROI Analysis',
      type: 'object',
      description: 'Return on investment, NPV, and IRR calculations'
    },
    paybackAnalysis: {
      label: 'Payback Analysis',
      type: 'object',
      description: 'Payback period and breakeven analysis'
    },
    riskAnalysis: {
      label: 'Risk Analysis',
      type: 'object',
      description: 'Risk assessment and mitigation strategies'
    },
    efficiencyImprovements: {
      label: 'Efficiency Improvements',
      type: 'object',
      description: 'Expected efficiency gains and productivity improvements'
    },
    implementationTimeline: {
      label: 'Implementation Timeline',
      type: 'object',
      description: 'Phased implementation plan and milestones'
    },
    recommendations: {
      label: 'Strategic Recommendations',
      type: 'object',
      description: 'Actionable recommendations for implementation'
    },
    summary: {
      label: 'Executive Summary',
      type: 'object',
      description: 'Key metrics, insights, and action items'
    },
    monteCarloResults: {
      label: 'Monte Carlo Simulation Results',
      type: 'object',
      description: 'Statistical analysis of savings distribution'
    }
  },
  
  calculate: aiopsImplementationSavingsCalculatorFormula.calculate,
  
  examples: [
    {
      name: 'Medium Enterprise IT Operations',
      description: 'A medium-sized enterprise with 100 monthly incidents and 10 on-call engineers',
      inputs: {
        currentIncidentVolume: 100,
        currentMTTR: 4,
        currentOnCallEngineers: 10,
        engineerHourlyRate: 75,
        downtimeCostPerHour: 5000,
        incidentManagementCost: 200,
        licenseCostPerUser: 100,
        aiopsLicenseUsers: 15,
        aiopsImplementationCost: 500000,
        expectedMTTRReduction: 50,
        expectedIncidentReduction: 30,
        expectedAutomationRate: 60,
        analysisPeriod: 36,
        includeROI: true,
        includePaybackPeriod: true,
        includeRiskAnalysis: true
      }
    },
    {
      name: 'Large Enterprise with High Incident Volume',
      description: 'A large enterprise with 500 monthly incidents and 25 on-call engineers',
      inputs: {
        currentIncidentVolume: 500,
        currentMTTR: 6,
        currentOnCallEngineers: 25,
        engineerHourlyRate: 100,
        downtimeCostPerHour: 10000,
        incidentManagementCost: 500,
        licenseCostPerUser: 150,
        aiopsLicenseUsers: 40,
        aiopsImplementationCost: 1000000,
        expectedMTTRReduction: 60,
        expectedIncidentReduction: 40,
        expectedAutomationRate: 70,
        analysisPeriod: 48,
        includeROI: true,
        includePaybackPeriod: true,
        includeRiskAnalysis: true
      }
    },
    {
      name: 'Small Business IT Operations',
      description: 'A small business with 30 monthly incidents and 3 on-call engineers',
      inputs: {
        currentIncidentVolume: 30,
        currentMTTR: 3,
        currentOnCallEngineers: 3,
        engineerHourlyRate: 60,
        downtimeCostPerHour: 2000,
        incidentManagementCost: 100,
        licenseCostPerUser: 80,
        aiopsLicenseUsers: 5,
        aiopsImplementationCost: 200000,
        expectedMTTRReduction: 40,
        expectedIncidentReduction: 25,
        expectedAutomationRate: 50,
        analysisPeriod: 24,
        includeROI: true,
        includePaybackPeriod: true,
        includeRiskAnalysis: true
      }
    }
  ],
  
  usageInstructions: [
    'Enter your current IT operations metrics (incident volume, MTTR, team size)',
    'Specify current costs (engineer rates, downtime costs, management overhead)',
    'Input AIOps implementation parameters (costs, licenses, timeline)',
    'Set expected improvements (MTTR reduction, incident reduction, automation)',
    'Configure analysis parameters (period, discount rate, risk analysis)',
    'Review comprehensive results including ROI, payback period, and risk assessment',
    'Use recommendations to plan your AIOps implementation strategy'
  ],
  
  tips: [
    'Use realistic improvement expectations based on industry benchmarks',
    'Include all relevant costs in your current state analysis',
    'Consider both direct and indirect savings from automation',
    'Factor in training and change management costs',
    'Use Monte Carlo simulation to account for uncertainty',
    'Review risk factors and mitigation strategies carefully',
    'Plan for phased implementation to minimize disruption',
    'Establish clear success metrics and monitoring plan'
  ],
  
  relatedCalculators: [
    'roi-calculator',
    'payback-period-calculator',
    'cost-benefit-analysis-calculator',
    'it-infrastructure-cost-calculator',
    'automation-roi-calculator',
    'digital-transformation-calculator',
    'cloud-migration-calculator',
    'business-process-automation-calculator'
  ]
};
