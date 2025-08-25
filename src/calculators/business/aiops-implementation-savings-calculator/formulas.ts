import { Formula, CalculationResult } from '../../../types/calculator';
import { AIOpsImplementationSavingsCalculatorInputs, AIOpsImplementationSavingsCalculatorResults } from './types';

/**
 * AIOps Implementation Savings calculation formulas
 */
export class AIOpsImplementationSavingsFormulas {
  
  /**
   * Calculate current state costs
   */
  static calculateCurrentState(
    currentIncidentVolume: number,
    currentMTTR: number,
    currentOnCallEngineers: number,
    engineerHourlyRate: number,
    downtimeCostPerHour: number,
    incidentManagementCost: number
  ): {
    monthlyIncidentCost: number;
    monthlyLaborCost: number;
    monthlyTotalCost: number;
    annualTotalCost: number;
    efficiencyMetrics: {
      incidentsPerEngineer: number;
      averageResolutionTime: number;
      automationLevel: number;
    };
  } {
    const monthlyIncidentCost = currentIncidentVolume * currentMTTR * downtimeCostPerHour + 
                               currentIncidentVolume * incidentManagementCost;
    const monthlyLaborCost = currentOnCallEngineers * 160 * engineerHourlyRate; // 160 hours per month
    const monthlyTotalCost = monthlyIncidentCost + monthlyLaborCost;
    const annualTotalCost = monthlyTotalCost * 12;
    
    const efficiencyMetrics = {
      incidentsPerEngineer: currentIncidentVolume / currentOnCallEngineers,
      averageResolutionTime: currentMTTR,
      automationLevel: 0 // Current state has no automation
    };
    
    return {
      monthlyIncidentCost,
      monthlyLaborCost,
      monthlyTotalCost,
      annualTotalCost,
      efficiencyMetrics
    };
  }

  /**
   * Calculate projected state costs after AIOps implementation
   */
  static calculateProjectedState(
    currentIncidentVolume: number,
    currentMTTR: number,
    currentOnCallEngineers: number,
    engineerHourlyRate: number,
    downtimeCostPerHour: number,
    incidentManagementCost: number,
    licenseCostPerUser: number,
    aiopsLicenseUsers: number,
    expectedMTTRReduction: number,
    expectedIncidentReduction: number,
    expectedAutomationRate: number
  ): {
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
  } {
    const reducedIncidentVolume = currentIncidentVolume * (1 - expectedIncidentReduction / 100);
    const reducedMTTR = currentMTTR * (1 - expectedMTTRReduction / 100);
    const reducedEngineers = currentOnCallEngineers * (1 - expectedAutomationRate / 100);
    
    const monthlyIncidentCost = reducedIncidentVolume * reducedMTTR * downtimeCostPerHour + 
                               reducedIncidentVolume * incidentManagementCost;
    const monthlyLaborCost = reducedEngineers * 160 * engineerHourlyRate;
    const monthlyLicenseCost = aiopsLicenseUsers * licenseCostPerUser;
    const monthlyTotalCost = monthlyIncidentCost + monthlyLaborCost + monthlyLicenseCost;
    const annualTotalCost = monthlyTotalCost * 12;
    
    const efficiencyMetrics = {
      incidentsPerEngineer: reducedIncidentVolume / Math.max(reducedEngineers, 1),
      averageResolutionTime: reducedMTTR,
      automationLevel: expectedAutomationRate
    };
    
    return {
      monthlyIncidentCost,
      monthlyLaborCost,
      monthlyLicenseCost,
      monthlyTotalCost,
      annualTotalCost,
      efficiencyMetrics
    };
  }

  /**
   * Calculate savings analysis
   */
  static calculateSavingsAnalysis(
    currentState: any,
    projectedState: any,
    analysisPeriod: number
  ): {
    monthlySavings: number;
    annualSavings: number;
    totalSavingsOverPeriod: number;
    savingsBreakdown: {
      incidentCostSavings: number;
      laborCostSavings: number;
      efficiencySavings: number;
    };
    percentageSavings: number;
  } {
    const monthlySavings = currentState.monthlyTotalCost - projectedState.monthlyTotalCost;
    const annualSavings = monthlySavings * 12;
    const totalSavingsOverPeriod = monthlySavings * analysisPeriod;
    
    const incidentCostSavings = currentState.monthlyIncidentCost - projectedState.monthlyIncidentCost;
    const laborCostSavings = currentState.monthlyLaborCost - projectedState.monthlyLaborCost;
    const efficiencySavings = monthlySavings - incidentCostSavings - laborCostSavings;
    
    const percentageSavings = (monthlySavings / currentState.monthlyTotalCost) * 100;
    
    return {
      monthlySavings,
      annualSavings,
      totalSavingsOverPeriod,
      savingsBreakdown: {
        incidentCostSavings,
        laborCostSavings,
        efficiencySavings
      },
      percentageSavings
    };
  }

  /**
   * Calculate cost analysis
   */
  static calculateCostAnalysis(
    aiopsImplementationCost: number,
    aiopsLicenseUsers: number,
    licenseCostPerUser: number,
    currentOnCallEngineers: number,
    trainingCostPerEngineer: number,
    aiopsTrainingTime: number,
    engineerHourlyRate: number,
    analysisPeriod: number
  ): {
    implementationCost: number;
    licenseCosts: number;
    trainingCosts: number;
    totalInvestment: number;
    monthlyInvestment: number;
    annualInvestment: number;
  } {
    const implementationCost = aiopsImplementationCost;
    const licenseCosts = aiopsLicenseUsers * licenseCostPerUser * analysisPeriod;
    const trainingCosts = currentOnCallEngineers * trainingCostPerEngineer + 
                         currentOnCallEngineers * aiopsTrainingTime * engineerHourlyRate;
    
    const totalInvestment = implementationCost + licenseCosts + trainingCosts;
    const monthlyInvestment = totalInvestment / analysisPeriod;
    const annualInvestment = monthlyInvestment * 12;
    
    return {
      implementationCost,
      licenseCosts,
      trainingCosts,
      totalInvestment,
      monthlyInvestment,
      annualInvestment
    };
  }

  /**
   * Calculate ROI analysis
   */
  static calculateROIAnalysis(
    totalSavings: number,
    totalInvestment: number,
    analysisPeriod: number,
    discountRate: number
  ): {
    roi: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
    benefitCostRatio: number;
  } {
    const roi = ((totalSavings - totalInvestment) / totalInvestment) * 100;
    
    // Simplified payback period calculation
    const monthlySavings = totalSavings / analysisPeriod;
    const paybackPeriod = totalInvestment / monthlySavings;
    
    // NPV calculation
    let npv = -totalInvestment;
    for (let month = 1; month <= analysisPeriod; month++) {
      npv += (monthlySavings / Math.pow(1 + discountRate / 100 / 12, month));
    }
    
    // Simplified IRR calculation (iterative approach)
    let irr = 0;
    let npvAtIrr = -totalInvestment;
    for (let month = 1; month <= analysisPeriod; month++) {
      npvAtIrr += (monthlySavings / Math.pow(1 + irr / 12, month));
    }
    
    // Simple IRR approximation
    irr = (totalSavings / totalInvestment - 1) * 12 * 100;
    
    const benefitCostRatio = totalSavings / totalInvestment;
    
    return {
      roi,
      paybackPeriod,
      npv,
      irr,
      benefitCostRatio
    };
  }

  /**
   * Calculate payback analysis
   */
  static calculatePaybackAnalysis(
    totalInvestment: number,
    monthlySavings: number,
    analysisPeriod: number
  ): {
    paybackPeriod: number;
    cumulativeSavings: Array<{
      month: number;
      cumulativeSavings: number;
      cumulativeInvestment: number;
      netPosition: number;
    }>;
    breakevenPoint: number;
  } {
    const paybackPeriod = totalInvestment / monthlySavings;
    
    const cumulativeSavings = [];
    let cumulativeSavingsTotal = 0;
    let cumulativeInvestmentTotal = totalInvestment;
    
    for (let month = 1; month <= analysisPeriod; month++) {
      cumulativeSavingsTotal += monthlySavings;
      cumulativeSavings.push({
        month,
        cumulativeSavings: cumulativeSavingsTotal,
        cumulativeInvestment: cumulativeInvestmentTotal,
        netPosition: cumulativeSavingsTotal - cumulativeInvestmentTotal
      });
    }
    
    const breakevenPoint = paybackPeriod;
    
    return {
      paybackPeriod,
      cumulativeSavings,
      breakevenPoint
    };
  }

  /**
   * Calculate risk analysis
   */
  static calculateRiskAnalysis(
    totalInvestment: number,
    expectedSavings: number,
    implementationTime: number
  ): {
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
  } {
    const riskFactors = [
      {
        factor: 'Implementation Delays',
        probability: 0.3,
        impact: 0.2,
        riskScore: 0.06
      },
      {
        factor: 'User Adoption Resistance',
        probability: 0.4,
        impact: 0.3,
        riskScore: 0.12
      },
      {
        factor: 'Technical Integration Issues',
        probability: 0.25,
        impact: 0.4,
        riskScore: 0.10
      },
      {
        factor: 'Vendor Lock-in',
        probability: 0.2,
        impact: 0.25,
        riskScore: 0.05
      },
      {
        factor: 'Data Quality Issues',
        probability: 0.35,
        impact: 0.15,
        riskScore: 0.053
      }
    ];
    
    const mitigationStrategies = [
      {
        risk: 'Implementation Delays',
        strategy: 'Phased rollout with clear milestones',
        cost: totalInvestment * 0.1,
        effectiveness: 0.8
      },
      {
        risk: 'User Adoption Resistance',
        strategy: 'Comprehensive training and change management',
        cost: totalInvestment * 0.15,
        effectiveness: 0.7
      },
      {
        risk: 'Technical Integration Issues',
        strategy: 'Proof of concept and pilot testing',
        cost: totalInvestment * 0.2,
        effectiveness: 0.9
      }
    ];
    
    const totalRiskScore = riskFactors.reduce((sum, risk) => sum + risk.riskScore, 0);
    let riskLevel: 'low' | 'medium' | 'high';
    
    if (totalRiskScore < 0.2) riskLevel = 'low';
    else if (totalRiskScore < 0.4) riskLevel = 'medium';
    else riskLevel = 'high';
    
    return {
      riskFactors,
      mitigationStrategies,
      riskLevel
    };
  }

  /**
   * Calculate efficiency improvements
   */
  static calculateEfficiencyImprovements(
    currentMTTR: number,
    expectedMTTRReduction: number,
    currentIncidentVolume: number,
    expectedIncidentReduction: number,
    expectedAutomationRate: number,
    currentFalsePositiveRate: number,
    expectedFalsePositiveReduction: number,
    currentEscalationRate: number,
    expectedEscalationReduction: number
  ): {
    mttrImprovement: number;
    incidentVolumeReduction: number;
    automationGains: number;
    falsePositiveReduction: number;
    escalationReduction: number;
    productivityGains: number;
  } {
    const mttrImprovement = currentMTTR * (expectedMTTRReduction / 100);
    const incidentVolumeReduction = currentIncidentVolume * (expectedIncidentReduction / 100);
    const automationGains = expectedAutomationRate;
    const falsePositiveReduction = currentFalsePositiveRate * (expectedFalsePositiveReduction / 100);
    const escalationReduction = currentEscalationRate * (expectedEscalationReduction / 100);
    const productivityGains = (expectedMTTRReduction + expectedIncidentReduction + expectedAutomationRate) / 3;
    
    return {
      mttrImprovement,
      incidentVolumeReduction,
      automationGains,
      falsePositiveReduction,
      escalationReduction,
      productivityGains
    };
  }

  /**
   * Generate implementation timeline
   */
  static generateImplementationTimeline(
    aiopsImplementationTime: number,
    aiopsImplementationCost: number
  ): {
    phases: Array<{
      phase: string;
      duration: number;
      cost: number;
      milestones: string[];
    }>;
    totalDuration: number;
    criticalPath: string[];
  } {
    const phases = [
      {
        phase: 'Assessment & Planning',
        duration: Math.ceil(aiopsImplementationTime * 0.2),
        cost: aiopsImplementationCost * 0.1,
        milestones: ['Requirements gathering', 'Vendor selection', 'Project planning']
      },
      {
        phase: 'Proof of Concept',
        duration: Math.ceil(aiopsImplementationTime * 0.3),
        cost: aiopsImplementationCost * 0.2,
        milestones: ['Pilot implementation', 'Testing', 'Validation']
      },
      {
        phase: 'Full Implementation',
        duration: Math.ceil(aiopsImplementationTime * 0.4),
        cost: aiopsImplementationCost * 0.5,
        milestones: ['System deployment', 'Integration', 'Configuration']
      },
      {
        phase: 'Training & Go-Live',
        duration: Math.ceil(aiopsImplementationTime * 0.1),
        cost: aiopsImplementationCost * 0.2,
        milestones: ['User training', 'Go-live', 'Post-implementation support']
      }
    ];
    
    const totalDuration = aiopsImplementationTime;
    const criticalPath = ['Assessment & Planning', 'Proof of Concept', 'Full Implementation', 'Training & Go-Live'];
    
    return {
      phases,
      totalDuration,
      criticalPath
    };
  }

  /**
   * Generate recommendations
   */
  static generateRecommendations(
    roi: number,
    paybackPeriod: number,
    riskLevel: 'low' | 'medium' | 'high',
    expectedSavings: number,
    totalInvestment: number
  ): {
    implementation: string[];
    costOptimization: string[];
    riskMitigation: string[];
    successFactors: string[];
  } {
    const implementation = [
      'Start with a pilot program to validate benefits',
      'Implement in phases to minimize disruption',
      'Establish clear success metrics and KPIs',
      'Ensure executive sponsorship and stakeholder buy-in'
    ];
    
    const costOptimization = [
      'Negotiate volume discounts with vendors',
      'Consider open-source alternatives for cost reduction',
      'Optimize license usage based on actual needs',
      'Plan for gradual rollout to spread costs'
    ];
    
    const riskMitigation = [
      'Develop comprehensive change management plan',
      'Invest in user training and adoption programs',
      'Establish vendor performance SLAs',
      'Create rollback plan for critical systems'
    ];
    
    const successFactors = [
      'Strong executive sponsorship and governance',
      'Clear communication and stakeholder engagement',
      'Comprehensive training and change management',
      'Regular monitoring and continuous improvement'
    ];
    
    return {
      implementation,
      costOptimization,
      riskMitigation,
      successFactors
    };
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    inputs: AIOpsImplementationSavingsCalculatorInputs,
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
      // Generate random variations for key parameters
      const mttrReductionVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const incidentReductionVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const automationRateVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const implementationCostVariation = 0.9 + Math.random() * 0.2; // ±10% variation
      
      // Calculate savings with variations
      const reducedMTTR = inputs.currentMTTR * (1 - (inputs.expectedMTTRReduction * mttrReductionVariation) / 100);
      const reducedIncidentVolume = inputs.currentIncidentVolume * (1 - (inputs.expectedIncidentReduction * incidentReductionVariation) / 100);
      const reducedEngineers = inputs.currentOnCallEngineers * (1 - (inputs.expectedAutomationRate * automationRateVariation) / 100);
      
      const monthlySavings = (inputs.currentIncidentVolume * inputs.currentMTTR * inputs.downtimeCostPerHour) -
                            (reducedIncidentVolume * reducedMTTR * inputs.downtimeCostPerHour) +
                            ((inputs.currentOnCallEngineers - reducedEngineers) * 160 * inputs.engineerHourlyRate);
      
      const totalInvestment = inputs.aiopsImplementationCost * implementationCostVariation +
                             inputs.aiopsLicenseUsers * inputs.licenseCostPerUser * inputs.analysisPeriod;
      
      const netBenefit = (monthlySavings * inputs.analysisPeriod) - totalInvestment;
      results.push(netBenefit);
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
 * Main AIOps Implementation Savings Calculator formula
 */
export const aiopsImplementationSavingsCalculatorFormula: Formula = {
  id: 'aiops-implementation-savings-calculator',
  name: 'AIOps Implementation Savings Calculator',
  description: 'Comprehensive analysis of AIOps implementation costs, savings, and ROI for IT operations optimization',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const aiopsInputs = inputs as AIOpsImplementationSavingsCalculatorInputs;
    
    try {
      const {
        currentIncidentVolume,
        currentMTTR,
        currentOnCallEngineers,
        engineerHourlyRate,
        downtimeCostPerHour,
        incidentManagementCost,
        licenseCostPerUser,
        aiopsLicenseUsers,
        expectedMTTRReduction,
        expectedIncidentReduction,
        expectedAutomationRate,
        expectedFalsePositiveReduction,
        expectedEscalationReduction,
        aiopsImplementationCost,
        trainingCostPerEngineer,
        aiopsTrainingTime,
        analysisPeriod,
        discountRate,
        includeROI,
        includePaybackPeriod,
        includeRiskAnalysis,
        monteCarloSamples
      } = aiopsInputs;

      // Calculate current state
      const currentState = AIOpsImplementationSavingsFormulas.calculateCurrentState(
        currentIncidentVolume,
        currentMTTR,
        currentOnCallEngineers,
        engineerHourlyRate,
        downtimeCostPerHour,
        incidentManagementCost
      );
      
      // Calculate projected state
      const projectedState = AIOpsImplementationSavingsFormulas.calculateProjectedState(
        currentIncidentVolume,
        currentMTTR,
        currentOnCallEngineers,
        engineerHourlyRate,
        downtimeCostPerHour,
        incidentManagementCost,
        licenseCostPerUser,
        aiopsLicenseUsers,
        expectedMTTRReduction,
        expectedIncidentReduction,
        expectedAutomationRate
      );
      
      // Calculate savings analysis
      const savingsAnalysis = AIOpsImplementationSavingsFormulas.calculateSavingsAnalysis(
        currentState,
        projectedState,
        analysisPeriod
      );
      
      // Calculate cost analysis
      const costAnalysis = AIOpsImplementationSavingsFormulas.calculateCostAnalysis(
        aiopsImplementationCost,
        aiopsLicenseUsers,
        licenseCostPerUser,
        currentOnCallEngineers,
        trainingCostPerEngineer,
        aiopsTrainingTime,
        engineerHourlyRate,
        analysisPeriod
      );
      
      // Calculate ROI analysis
      let roiAnalysis = null;
      if (includeROI) {
        roiAnalysis = AIOpsImplementationSavingsFormulas.calculateROIAnalysis(
          savingsAnalysis.totalSavingsOverPeriod,
          costAnalysis.totalInvestment,
          analysisPeriod,
          discountRate
        );
      }
      
      // Calculate payback analysis
      let paybackAnalysis = null;
      if (includePaybackPeriod) {
        paybackAnalysis = AIOpsImplementationSavingsFormulas.calculatePaybackAnalysis(
          costAnalysis.totalInvestment,
          savingsAnalysis.monthlySavings,
          analysisPeriod
        );
      }
      
      // Calculate risk analysis
      let riskAnalysis = null;
      if (includeRiskAnalysis) {
        riskAnalysis = AIOpsImplementationSavingsFormulas.calculateRiskAnalysis(
          costAnalysis.totalInvestment,
          savingsAnalysis.totalSavingsOverPeriod,
          aiopsInputs.aiopsImplementationTime
        );
      }
      
      // Calculate efficiency improvements
      const efficiencyImprovements = AIOpsImplementationSavingsFormulas.calculateEfficiencyImprovements(
        currentMTTR,
        expectedMTTRReduction,
        currentIncidentVolume,
        expectedIncidentReduction,
        expectedAutomationRate,
        aiopsInputs.currentFalsePositiveRate,
        expectedFalsePositiveReduction,
        aiopsInputs.currentEscalationRate,
        expectedEscalationReduction
      );
      
      // Generate implementation timeline
      const implementationTimeline = AIOpsImplementationSavingsFormulas.generateImplementationTimeline(
        aiopsInputs.aiopsImplementationTime,
        aiopsImplementationCost
      );
      
      // Generate recommendations
      const recommendations = AIOpsImplementationSavingsFormulas.generateRecommendations(
        roiAnalysis?.roi || 0,
        paybackAnalysis?.paybackPeriod || 0,
        riskAnalysis?.riskLevel || 'medium',
        savingsAnalysis.totalSavingsOverPeriod,
        costAnalysis.totalInvestment
      );
      
      // Monte Carlo simulation
      const monteCarloResults = AIOpsImplementationSavingsFormulas.runMonteCarloSimulation(
        aiopsInputs,
        monteCarloSamples || 10000
      );
      
      const results: AIOpsImplementationSavingsCalculatorResults = {
        currentState,
        projectedState,
        savingsAnalysis,
        costAnalysis,
        roiAnalysis,
        paybackAnalysis,
        riskAnalysis,
        efficiencyImprovements,
        implementationTimeline,
        recommendations,
        summary: {
          keyMetrics: {
            totalSavings: savingsAnalysis.totalSavingsOverPeriod,
            totalInvestment: costAnalysis.totalInvestment,
            netBenefit: savingsAnalysis.totalSavingsOverPeriod - costAnalysis.totalInvestment,
            roi: roiAnalysis?.roi || 0,
            paybackPeriod: paybackAnalysis?.paybackPeriod || 0
          },
          keyInsights: [
            `Expected monthly savings: $${savingsAnalysis.monthlySavings.toLocaleString()}`,
            `ROI: ${(roiAnalysis?.roi || 0).toFixed(1)}%`,
            `Payback period: ${(paybackAnalysis?.paybackPeriod || 0).toFixed(1)} months`,
            `Risk level: ${riskAnalysis?.riskLevel || 'medium'}`
          ],
          actionItems: [
            'Conduct pilot program to validate assumptions',
            'Develop comprehensive change management plan',
            'Establish clear success metrics and monitoring',
            'Plan for phased implementation to minimize risk'
          ],
          riskLevel: riskAnalysis?.riskLevel || 'medium'
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Based on your inputs, implementing AIOps is projected to save $${savingsAnalysis.monthlySavings.toLocaleString()} per month, with a total investment of $${costAnalysis.totalInvestment.toLocaleString()}. The ROI is ${(roiAnalysis?.roi || 0).toFixed(1)}% with a payback period of ${(paybackAnalysis?.paybackPeriod || 0).toFixed(1)} months.`,
        intermediateSteps: {
          'Current Monthly Cost': `$${currentState.monthlyTotalCost.toLocaleString()}`,
          'Projected Monthly Cost': `$${projectedState.monthlyTotalCost.toLocaleString()}`,
          'Monthly Savings': `$${savingsAnalysis.monthlySavings.toLocaleString()}`,
          'Total Investment': `$${costAnalysis.totalInvestment.toLocaleString()}`,
          'ROI': `${(roiAnalysis?.roi || 0).toFixed(1)}%`
        }
      };
    } catch (error) {
      throw new Error(`AIOps Implementation Savings calculation failed: ${error}`);
    }
  }
};
