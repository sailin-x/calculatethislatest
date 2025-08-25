import { Formula, CalculationResult } from '../../../types/calculator';
import { 
  BreakevenPointCalculatorInputs, 
  BreakevenPointCalculatorResults
} from './types';

/**
 * Breakeven Point calculation formulas
 */
export class BreakevenPointFormulas {
  
  /**
   * Calculate basic breakeven point
   */
  static calculateBasicBreakeven(
    sellingPrice: number,
    variableCostPerUnit: number,
    fixedCosts: number,
    targetProfit: number = 0
  ): {
    breakevenPoint: number;
    breakevenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
    safetyMargin: number;
    safetyMarginRatio: number;
    targetProfitVolume: number;
    targetProfitRevenue: number;
  } {
    const contributionMargin = sellingPrice - variableCostPerUnit;
    const contributionMarginRatio = contributionMargin / sellingPrice;
    
    const breakevenPoint = fixedCosts / contributionMargin;
    const breakevenRevenue = breakevenPoint * sellingPrice;
    
    const targetProfitVolume = (fixedCosts + targetProfit) / contributionMargin;
    const targetProfitRevenue = targetProfitVolume * sellingPrice;
    
    // Calculate safety margin (assuming expected sales volume)
    const expectedSalesVolume = breakevenPoint * 1.2; // 20% above breakeven
    const safetyMargin = expectedSalesVolume - breakevenPoint;
    const safetyMarginRatio = safetyMargin / expectedSalesVolume;
    
    return {
      breakevenPoint,
      breakevenRevenue,
      contributionMargin,
      contributionMarginRatio,
      safetyMargin,
      safetyMarginRatio,
      targetProfitVolume,
      targetProfitRevenue
    };
  }

  /**
   * Calculate comprehensive cost analysis
   */
  static calculateCostAnalysis(
    costStructure: any,
    expectedSalesVolume: number,
    variableCostPerUnit: number
  ): {
    totalVariableCosts: number;
    totalFixedCosts: number;
    totalCosts: number;
    averageCostPerUnit: number;
    marginalCost: number;
    costBreakdown: any;
    costStructureAnalysis: any;
  } {
    const totalVariableCosts = (costStructure.directMaterials + 
                               costStructure.directLabor + 
                               costStructure.variableOverhead) * expectedSalesVolume;
    
    const totalFixedCosts = costStructure.fixedOverhead + 
                           costStructure.sellingExpenses + 
                           costStructure.administrativeExpenses + 
                           costStructure.depreciation + 
                           costStructure.interest + 
                           costStructure.taxes;
    
    const totalCosts = totalVariableCosts + totalFixedCosts;
    const averageCostPerUnit = totalCosts / expectedSalesVolume;
    const marginalCost = variableCostPerUnit;
    
    const costBreakdown = {
      materials: costStructure.directMaterials * expectedSalesVolume,
      labor: costStructure.directLabor * expectedSalesVolume,
      overhead: costStructure.variableOverhead * expectedSalesVolume + costStructure.fixedOverhead,
      selling: costStructure.sellingExpenses,
      administrative: costStructure.administrativeExpenses,
      depreciation: costStructure.depreciation,
      interest: costStructure.interest,
      taxes: costStructure.taxes
    };
    
    const costStructureAnalysis = {
      fixedCostPercentage: (totalFixedCosts / totalCosts) * 100,
      variableCostPercentage: (totalVariableCosts / totalCosts) * 100,
      costEfficiency: totalCosts / expectedSalesVolume,
      economiesOfScale: totalFixedCosts / expectedSalesVolume
    };
    
    return {
      totalVariableCosts,
      totalFixedCosts,
      totalCosts,
      averageCostPerUnit,
      marginalCost,
      costBreakdown,
      costStructureAnalysis
    };
  }

  /**
   * Calculate revenue analysis
   */
  static calculateRevenueAnalysis(
    sellingPrice: number,
    expectedSalesVolume: number,
    revenueAnalysis: any
  ): {
    totalRevenue: number;
    averageRevenuePerUnit: number;
    revenueBreakdown: any;
    revenueEfficiency: any;
  } {
    const totalRevenue = sellingPrice * expectedSalesVolume;
    const averageRevenuePerUnit = sellingPrice;
    
    const revenueBreakdown = {
      productSales: totalRevenue * 0.85, // Assume 85% from product sales
      serviceRevenue: totalRevenue * 0.10, // Assume 10% from services
      otherIncome: totalRevenue * 0.05 // Assume 5% from other sources
    };
    
    const revenueEfficiency = {
      revenuePerEmployee: totalRevenue / 10, // Assume 10 employees
      revenuePerAsset: totalRevenue / 100000, // Assume $100k in assets
      revenueGrowthRate: revenueAnalysis.growthRate
    };
    
    return {
      totalRevenue,
      averageRevenuePerUnit,
      revenueBreakdown,
      revenueEfficiency
    };
  }

  /**
   * Calculate profitability analysis
   */
  static calculateProfitabilityAnalysis(
    totalRevenue: number,
    totalCosts: number,
    costBreakdown: any,
    financialParameters: any
  ): {
    grossProfit: number;
    grossProfitMargin: number;
    operatingProfit: number;
    operatingProfitMargin: number;
    netProfit: number;
    netProfitMargin: number;
    profitBreakdown: any;
    profitabilityMetrics: any;
  } {
    const grossProfit = totalRevenue - (costBreakdown.materials + costBreakdown.labor + costBreakdown.overhead);
    const grossProfitMargin = (grossProfit / totalRevenue) * 100;
    
    const operatingProfit = grossProfit - costBreakdown.selling - costBreakdown.administrative - costBreakdown.depreciation;
    const operatingProfitMargin = (operatingProfit / totalRevenue) * 100;
    
    const netProfit = operatingProfit - costBreakdown.interest - costBreakdown.taxes;
    const netProfitMargin = (netProfit / totalRevenue) * 100;
    
    const profitBreakdown = {
      contributionMargin: grossProfit,
      fixedCosts: costBreakdown.selling + costBreakdown.administrative + costBreakdown.depreciation,
      interest: costBreakdown.interest,
      taxes: costBreakdown.taxes,
      netIncome: netProfit
    };
    
    const profitabilityMetrics = {
      returnOnSales: netProfitMargin,
      returnOnAssets: (netProfit / 100000) * 100, // Assume $100k in assets
      returnOnEquity: (netProfit / 50000) * 100, // Assume $50k in equity
      returnOnInvestment: (netProfit / 75000) * 100 // Assume $75k investment
    };
    
    return {
      grossProfit,
      grossProfitMargin,
      operatingProfit,
      operatingProfitMargin,
      netProfit,
      netProfitMargin,
      profitBreakdown,
      profitabilityMetrics
    };
  }

  /**
   * Calculate sensitivity analysis
   */
  static calculateSensitivityAnalysis(
    basicBreakeven: any,
    sellingPrice: number,
    variableCostPerUnit: number,
    fixedCosts: number
  ): {
    priceSensitivity: any[];
    costSensitivity: any[];
    volumeSensitivity: any[];
    criticalFactors: any[];
  } {
    const priceSensitivity = [];
    const costSensitivity = [];
    const volumeSensitivity = [];
    
    // Price sensitivity (-20% to +20%)
    for (let i = -20; i <= 20; i += 5) {
      const newPrice = sellingPrice * (1 + i / 100);
      const newContributionMargin = newPrice - variableCostPerUnit;
      const newBreakevenPoint = fixedCosts / newContributionMargin;
      const profitImpact = (newPrice - sellingPrice) * basicBreakeven.breakevenPoint;
      
      priceSensitivity.push({
        priceChange: i,
        breakevenPoint: newBreakevenPoint,
        profitImpact,
        sensitivity: Math.abs(profitImpact / (i / 100))
      });
    }
    
    // Cost sensitivity (-20% to +20%)
    for (let i = -20; i <= 20; i += 5) {
      const newVariableCost = variableCostPerUnit * (1 + i / 100);
      const newContributionMargin = sellingPrice - newVariableCost;
      const newBreakevenPoint = fixedCosts / newContributionMargin;
      const profitImpact = -(newVariableCost - variableCostPerUnit) * basicBreakeven.breakevenPoint;
      
      costSensitivity.push({
        costChange: i,
        breakevenPoint: newBreakevenPoint,
        profitImpact,
        sensitivity: Math.abs(profitImpact / (i / 100))
      });
    }
    
    // Volume sensitivity (-20% to +20%)
    for (let i = -20; i <= 20; i += 5) {
      const newVolume = basicBreakeven.breakevenPoint * (1 + i / 100);
      const newBreakevenPoint = basicBreakeven.breakevenPoint;
      const profitImpact = (newVolume - basicBreakeven.breakevenPoint) * basicBreakeven.contributionMargin;
      
      volumeSensitivity.push({
        volumeChange: i,
        breakevenPoint: newBreakevenPoint,
        profitImpact,
        sensitivity: Math.abs(profitImpact / (i / 100))
      });
    }
    
    // Critical factors
    const criticalFactors = [
      {
        factor: 'Selling Price',
        impact: Math.abs(priceSensitivity[4].sensitivity), // 0% change
        risk: 'high',
        recommendation: 'Monitor market prices and adjust pricing strategy'
      },
      {
        factor: 'Variable Costs',
        impact: Math.abs(costSensitivity[4].sensitivity), // 0% change
        risk: 'high',
        recommendation: 'Negotiate better supplier terms and optimize production'
      },
      {
        factor: 'Fixed Costs',
        impact: fixedCosts / basicBreakeven.breakevenPoint,
        risk: 'medium',
        recommendation: 'Review fixed cost structure and identify reduction opportunities'
      },
      {
        factor: 'Sales Volume',
        impact: Math.abs(volumeSensitivity[4].sensitivity), // 0% change
        risk: 'high',
        recommendation: 'Focus on marketing and sales strategies to increase volume'
      }
    ];
    
    return {
      priceSensitivity,
      costSensitivity,
      volumeSensitivity,
      criticalFactors
    };
  }

  /**
   * Calculate scenario analysis
   */
  static calculateScenarioAnalysis(
    basicBreakeven: any,
    simulationParameters: any
  ): {
    scenarios: any[];
    bestCase: any;
    worstCase: any;
    mostLikely: any;
  } {
    const scenarios = simulationParameters.scenarios.map(scenario => {
      const newSellingPrice = basicBreakeven.breakevenRevenue / basicBreakeven.breakevenPoint * (1 + scenario.sellingPriceVariation / 100);
      const newVariableCost = (basicBreakeven.breakevenRevenue / basicBreakeven.breakevenPoint - basicBreakeven.contributionMargin) * (1 + scenario.costVariation / 100);
      const newContributionMargin = newSellingPrice - newVariableCost;
      const newBreakevenPoint = basicBreakeven.breakevenRevenue / newSellingPrice;
      const expectedProfit = (basicBreakeven.breakevenPoint * (1 + scenario.volumeVariation / 100) - newBreakevenPoint) * newContributionMargin;
      
      let riskLevel: 'low' | 'medium' | 'high';
      if (expectedProfit > 0 && scenario.probability > 0.6) riskLevel = 'low';
      else if (expectedProfit > 0 || scenario.probability > 0.4) riskLevel = 'medium';
      else riskLevel = 'high';
      
      return {
        name: scenario.name,
        probability: scenario.probability,
        breakevenPoint: newBreakevenPoint,
        expectedProfit,
        riskLevel,
        keyAssumptions: [
          `Selling price variation: ${scenario.sellingPriceVariation}%`,
          `Cost variation: ${scenario.costVariation}%`,
          `Volume variation: ${scenario.volumeVariation}%`
        ]
      };
    });
    
    // Find best, worst, and most likely cases
    const bestCase = scenarios.reduce((best, scenario) => 
      scenario.expectedProfit > best.expectedProfit ? scenario : best
    );
    
    const worstCase = scenarios.reduce((worst, scenario) => 
      scenario.expectedProfit < worst.expectedProfit ? scenario : worst
    );
    
    const mostLikely = scenarios.reduce((likely, scenario) => 
      scenario.probability > likely.probability ? scenario : likely
    );
    
    return {
      scenarios,
      bestCase,
      worstCase,
      mostLikely
    };
  }

  /**
   * Calculate risk assessment
   */
  static calculateRiskAssessment(
    basicBreakeven: any,
    costAnalysis: any,
    profitabilityAnalysis: any
  ): {
    businessRisks: any[];
    financialRisks: any[];
    marketRisks: any[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  } {
    const businessRisks = [
      {
        risk: 'High Fixed Costs',
        probability: costAnalysis.costStructureAnalysis.fixedCostPercentage > 60 ? 0.8 : 0.3,
        impact: costAnalysis.costStructureAnalysis.fixedCostPercentage / 100,
        riskScore: (costAnalysis.costStructureAnalysis.fixedCostPercentage > 60 ? 0.8 : 0.3) * (costAnalysis.costStructureAnalysis.fixedCostPercentage / 100),
        mitigation: 'Optimize cost structure and increase operational efficiency'
      },
      {
        risk: 'Low Contribution Margin',
        probability: basicBreakeven.contributionMarginRatio < 0.3 ? 0.9 : 0.2,
        impact: 1 - basicBreakeven.contributionMarginRatio,
        riskScore: (basicBreakeven.contributionMarginRatio < 0.3 ? 0.9 : 0.2) * (1 - basicBreakeven.contributionMarginRatio),
        mitigation: 'Increase selling price or reduce variable costs'
      },
      {
        risk: 'Production Inefficiency',
        probability: 0.5,
        impact: 0.4,
        riskScore: 0.5 * 0.4,
        mitigation: 'Implement lean manufacturing and quality control systems'
      }
    ];
    
    const financialRisks = [
      {
        risk: 'Cash Flow Issues',
        probability: profitabilityAnalysis.netProfitMargin < 5 ? 0.7 : 0.3,
        impact: 0.6,
        riskScore: (profitabilityAnalysis.netProfitMargin < 5 ? 0.7 : 0.3) * 0.6,
        mitigation: 'Improve working capital management and cash flow forecasting'
      },
      {
        risk: 'High Debt Burden',
        probability: 0.4,
        impact: 0.5,
        riskScore: 0.4 * 0.5,
        mitigation: 'Restructure debt and improve financial ratios'
      },
      {
        risk: 'Interest Rate Risk',
        probability: 0.6,
        impact: 0.3,
        riskScore: 0.6 * 0.3,
        mitigation: 'Hedge interest rate exposure and diversify funding sources'
      }
    ];
    
    const marketRisks = [
      {
        risk: 'Market Competition',
        probability: 0.8,
        impact: 0.5,
        riskScore: 0.8 * 0.5,
        mitigation: 'Differentiate products and strengthen competitive position'
      },
      {
        risk: 'Economic Downturn',
        probability: 0.3,
        impact: 0.7,
        riskScore: 0.3 * 0.7,
        mitigation: 'Diversify customer base and develop recession-resistant products'
      },
      {
        risk: 'Regulatory Changes',
        probability: 0.4,
        impact: 0.4,
        riskScore: 0.4 * 0.4,
        mitigation: 'Monitor regulatory environment and maintain compliance'
      }
    ];
    
    const totalRiskScore = [...businessRisks, ...financialRisks, ...marketRisks]
      .reduce((sum, risk) => sum + risk.riskScore, 0) / 9; // Average of all risks
    
    let riskLevel: 'low' | 'medium' | 'high';
    if (totalRiskScore < 0.3) riskLevel = 'low';
    else if (totalRiskScore < 0.6) riskLevel = 'medium';
    else riskLevel = 'high';
    
    return {
      businessRisks,
      financialRisks,
      marketRisks,
      overallRiskScore: totalRiskScore,
      riskLevel
    };
  }

  /**
   * Calculate cash flow analysis
   */
  static calculateCashFlowAnalysis(
    profitabilityAnalysis: any,
    costAnalysis: any,
    basicBreakeven: any
  ): {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    netCashFlow: number;
    cashFlowBreakdown: any;
    cashFlowMetrics: any;
  } {
    const operatingCashFlow = profitabilityAnalysis.operatingProfit + costAnalysis.costBreakdown.depreciation;
    const investingCashFlow = -costAnalysis.costBreakdown.depreciation * 2; // Assume 2x depreciation for CapEx
    const financingCashFlow = -costAnalysis.costBreakdown.interest;
    const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;
    
    const cashFlowBreakdown = {
      cashInflows: operatingCashFlow,
      cashOutflows: Math.abs(investingCashFlow) + Math.abs(financingCashFlow),
      workingCapital: operatingCashFlow * 0.2, // Assume 20% for working capital
      capitalExpenditure: Math.abs(investingCashFlow)
    };
    
    const cashFlowMetrics = {
      cashFlowMargin: (operatingCashFlow / (basicBreakeven.breakevenRevenue * 1.2)) * 100,
      cashFlowCoverage: operatingCashFlow / Math.abs(financingCashFlow),
      cashConversionCycle: 45, // Assume 45 days
      freeCashFlow: operatingCashFlow + investingCashFlow
    };
    
    return {
      operatingCashFlow,
      investingCashFlow,
      financingCashFlow,
      netCashFlow,
      cashFlowBreakdown,
      cashFlowMetrics
    };
  }

  /**
   * Calculate ROI analysis
   */
  static calculateROIAnalysis(
    basicBreakeven: any,
    profitabilityAnalysis: any,
    cashFlowAnalysis: any,
    financialParameters: any
  ): {
    returnOnInvestment: number;
    paybackPeriod: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    profitabilityIndex: number;
    roiBreakdown: any;
    roiMetrics: any;
  } {
    const initialInvestment = 100000; // Assume $100k initial investment
    const annualCashFlows = [cashFlowAnalysis.operatingCashFlow, cashFlowAnalysis.operatingCashFlow, cashFlowAnalysis.operatingCashFlow];
    const terminalValue = cashFlowAnalysis.operatingCashFlow * 5; // 5x multiple
    
    // Calculate NPV
    let npv = -initialInvestment;
    annualCashFlows.forEach((cashFlow, index) => {
      npv += cashFlow / Math.pow(1 + financialParameters.discountRate / 100, index + 1);
    });
    npv += terminalValue / Math.pow(1 + financialParameters.discountRate / 100, annualCashFlows.length + 1);
    
    // Calculate IRR (simplified)
    const totalCashFlow = annualCashFlows.reduce((sum, cf) => sum + cf, 0) + terminalValue;
    const irr = ((totalCashFlow / initialInvestment) ** (1 / annualCashFlows.length) - 1) * 100;
    
    // Calculate payback period
    let cumulativeCashFlow = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < annualCashFlows.length; i++) {
      cumulativeCashFlow += annualCashFlows[i];
      if (cumulativeCashFlow >= initialInvestment) {
        paybackPeriod = i + 1;
        break;
      }
    }
    if (cumulativeCashFlow < initialInvestment) {
      paybackPeriod = annualCashFlows.length + (initialInvestment - cumulativeCashFlow) / annualCashFlows[annualCashFlows.length - 1];
    }
    
    const returnOnInvestment = (profitabilityAnalysis.netProfit / initialInvestment) * 100;
    const profitabilityIndex = npv / initialInvestment;
    
    const roiBreakdown = {
      initialInvestment,
      annualCashFlows,
      terminalValue,
      discountRate: financialParameters.discountRate
    };
    
    const roiMetrics = {
      roiByYear: annualCashFlows.map(cf => (cf / initialInvestment) * 100),
      cumulativeRoi: returnOnInvestment,
      riskAdjustedRoi: returnOnInvestment * 0.8 // Assume 20% risk adjustment
    };
    
    return {
      returnOnInvestment,
      paybackPeriod,
      netPresentValue: npv,
      internalRateOfReturn: irr,
      profitabilityIndex,
      roiBreakdown,
      roiMetrics
    };
  }

  /**
   * Generate strategic insights
   */
  static generateStrategicInsights(
    basicBreakeven: any,
    costAnalysis: any,
    profitabilityAnalysis: any,
    riskAssessment: any
  ): {
    keyInsights: string[];
    recommendations: any[];
    actionItems: string[];
    successFactors: any[];
  } {
    const keyInsights = [
      `Breakeven point is ${basicBreakeven.breakevenPoint.toFixed(0)} units`,
      `Contribution margin ratio is ${(basicBreakeven.contributionMarginRatio * 100).toFixed(1)}%`,
      `Safety margin is ${basicBreakeven.safetyMargin.toFixed(0)} units`,
      `Net profit margin is ${profitabilityAnalysis.netProfitMargin.toFixed(1)}%`,
      `Overall risk level is ${riskAssessment.riskLevel}`
    ];
    
    const recommendations = [
      {
        category: 'Pricing',
        recommendation: 'Optimize pricing strategy to improve contribution margin',
        impact: 0.3,
        implementation: 'Conduct market research and competitor analysis',
        timeline: '1-3 months'
      },
      {
        category: 'Cost Management',
        recommendation: 'Reduce variable costs through supplier negotiations',
        impact: 0.4,
        implementation: 'Review supplier contracts and identify cost reduction opportunities',
        timeline: '2-4 months'
      },
      {
        category: 'Volume',
        recommendation: 'Increase sales volume through marketing initiatives',
        impact: 0.5,
        implementation: 'Develop comprehensive marketing and sales strategy',
        timeline: '3-6 months'
      },
      {
        category: 'Risk Management',
        recommendation: 'Implement risk mitigation strategies',
        impact: 0.2,
        implementation: 'Develop contingency plans and monitor key risk indicators',
        timeline: 'Ongoing'
      }
    ];
    
    const actionItems = [
      'Conduct detailed market analysis',
      'Review and optimize cost structure',
      'Develop pricing strategy',
      'Implement sales and marketing plan',
      'Monitor key performance indicators',
      'Establish risk management framework'
    ];
    
    const successFactors = [
      {
        factor: 'Market Demand',
        importance: 0.9,
        currentStatus: 'Needs assessment',
        improvementNeeded: true
      },
      {
        factor: 'Cost Control',
        importance: 0.8,
        currentStatus: 'Under review',
        improvementNeeded: true
      },
      {
        factor: 'Pricing Strategy',
        importance: 0.7,
        currentStatus: 'Being developed',
        improvementNeeded: true
      },
      {
        factor: 'Operational Efficiency',
        importance: 0.6,
        currentStatus: 'Good',
        improvementNeeded: false
      }
    ];
    
    return {
      keyInsights,
      recommendations,
      actionItems,
      successFactors
    };
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    inputs: BreakevenPointCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
  } {
    const results: number[] = [];
    
    for (let i = 0; i < samples; i++) {
      // Generate random variations for key parameters
      const priceVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const costVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const volumeVariation = 0.7 + Math.random() * 0.6; // ±30% variation
      
      const newSellingPrice = inputs.sellingPrice * priceVariation;
      const newVariableCost = inputs.variableCostPerUnit * costVariation;
      const newFixedCosts = inputs.fixedCosts * (0.9 + Math.random() * 0.2); // ±10% variation
      
      const contributionMargin = newSellingPrice - newVariableCost;
      const breakevenPoint = newFixedCosts / contributionMargin;
      const expectedVolume = breakevenPoint * volumeVariation;
      const profit = (expectedVolume - breakevenPoint) * contributionMargin;
      
      results.push(profit);
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
      standardDeviation,
      confidenceInterval: {
        lower: expectedValue - 1.96 * standardDeviation,
        upper: expectedValue + 1.96 * standardDeviation
      }
    };
  }
}

/**
 * Main Breakeven Point Calculator formula
 */
export const breakevenPointCalculatorFormula: Formula = {
  id: 'breakeven-point-calculator',
  name: 'Breakeven Point Calculator',
  description: 'Comprehensive breakeven analysis with sensitivity analysis, scenario planning, and risk assessment for business decision making',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const breakevenInputs = inputs as BreakevenPointCalculatorInputs;
    
    try {
      const {
        sellingPrice,
        variableCostPerUnit,
        fixedCosts,
        targetProfit,
        costStructure,
        revenueAnalysis,
        productionAnalysis,
        marketAnalysis,
        financialParameters,
        analysisOptions,
        simulationParameters
      } = breakevenInputs;

      // Calculate basic breakeven analysis
      const basicBreakeven = BreakevenPointFormulas.calculateBasicBreakeven(
        sellingPrice,
        variableCostPerUnit,
        fixedCosts,
        targetProfit
      );

      // Calculate cost analysis
      const costAnalysis = BreakevenPointFormulas.calculateCostAnalysis(
        costStructure,
        revenueAnalysis.expectedSalesVolume,
        variableCostPerUnit
      );

      // Calculate revenue analysis
      const revenueAnalysisResult = BreakevenPointFormulas.calculateRevenueAnalysis(
        sellingPrice,
        revenueAnalysis.expectedSalesVolume,
        revenueAnalysis
      );

      // Calculate profitability analysis
      const profitabilityAnalysis = BreakevenPointFormulas.calculateProfitabilityAnalysis(
        revenueAnalysisResult.totalRevenue,
        costAnalysis.totalCosts,
        costAnalysis.costBreakdown,
        financialParameters
      );

      // Calculate sensitivity analysis
      let sensitivityAnalysis = null;
      if (analysisOptions.includeSensitivityAnalysis) {
        sensitivityAnalysis = BreakevenPointFormulas.calculateSensitivityAnalysis(
          basicBreakeven,
          sellingPrice,
          variableCostPerUnit,
          fixedCosts
        );
      }

      // Calculate scenario analysis
      let scenarioAnalysis = null;
      if (analysisOptions.includeScenarioAnalysis) {
        scenarioAnalysis = BreakevenPointFormulas.calculateScenarioAnalysis(
          basicBreakeven,
          simulationParameters
        );
      }

      // Calculate risk assessment
      let riskAssessment = null;
      if (analysisOptions.includeRiskAssessment) {
        riskAssessment = BreakevenPointFormulas.calculateRiskAssessment(
          basicBreakeven,
          costAnalysis,
          profitabilityAnalysis
        );
      }

      // Calculate cash flow analysis
      let cashFlowAnalysis = null;
      if (analysisOptions.includeCashFlowAnalysis) {
        cashFlowAnalysis = BreakevenPointFormulas.calculateCashFlowAnalysis(
          profitabilityAnalysis,
          costAnalysis,
          basicBreakeven
        );
      }

      // Calculate ROI analysis
      let roiAnalysis = null;
      if (analysisOptions.includeROIAnalysis) {
        roiAnalysis = BreakevenPointFormulas.calculateROIAnalysis(
          basicBreakeven,
          profitabilityAnalysis,
          cashFlowAnalysis || { operatingCashFlow: 0 },
          financialParameters
        );
      }

      // Generate strategic insights
      const strategicInsights = BreakevenPointFormulas.generateStrategicInsights(
        basicBreakeven,
        costAnalysis,
        profitabilityAnalysis,
        riskAssessment || { riskLevel: 'medium' }
      );

      // Monte Carlo simulation
      let monteCarloResults = null;
      if (analysisOptions.includeMonteCarloSimulation) {
        monteCarloResults = BreakevenPointFormulas.runMonteCarloSimulation(
          breakevenInputs,
          simulationParameters.monteCarloSamples
        );
      }

      // Determine overall assessment
      const riskLevel = riskAssessment?.riskLevel || 'medium';
      const profitability = profitabilityAnalysis.netProfitMargin > 15 ? 'high' : 
                           profitabilityAnalysis.netProfitMargin > 5 ? 'medium' : 'low';
      const feasibility = basicBreakeven.safetyMarginRatio > 0.3 ? 'high' :
                         basicBreakeven.safetyMarginRatio > 0.1 ? 'medium' : 'low';

      const results: BreakevenPointCalculatorResults = {
        basicBreakeven,
        costAnalysis,
        revenueAnalysis: revenueAnalysisResult,
        profitabilityAnalysis,
        sensitivityAnalysis,
        scenarioAnalysis,
        riskAssessment,
        cashFlowAnalysis,
        roiAnalysis,
        strategicInsights,
        monteCarloResults,
        summary: {
          keyMetrics: {
            breakevenPoint: basicBreakeven.breakevenPoint,
            contributionMargin: basicBreakeven.contributionMargin,
            safetyMargin: basicBreakeven.safetyMargin,
            targetProfitVolume: basicBreakeven.targetProfitVolume,
            returnOnInvestment: roiAnalysis?.returnOnInvestment || 0,
            paybackPeriod: roiAnalysis?.paybackPeriod || 0
          },
          keyInsights: strategicInsights.keyInsights,
          actionItems: strategicInsights.actionItems,
          riskLevel,
          profitability,
          feasibility
        }
      };
      
      return {
        outputs: results,
        explanation: `Your breakeven analysis shows a breakeven point of ${basicBreakeven.breakevenPoint.toFixed(0)} units with a contribution margin of ${financialParameters.currency}${basicBreakeven.contributionMargin.toFixed(2)} per unit. The safety margin is ${basicBreakeven.safetyMargin.toFixed(0)} units, and the overall risk level is ${riskLevel}.`,
        intermediateSteps: {
          'Breakeven Point': `${basicBreakeven.breakevenPoint.toFixed(0)} units`,
          'Contribution Margin': `${financialParameters.currency}${basicBreakeven.contributionMargin.toFixed(2)}`,
          'Safety Margin': `${basicBreakeven.safetyMargin.toFixed(0)} units`,
          'Target Profit Volume': `${basicBreakeven.targetProfitVolume.toFixed(0)} units`,
          'Net Profit Margin': `${profitabilityAnalysis.netProfitMargin.toFixed(1)}%`
        }
      };
    } catch (error) {
      throw new Error(`Breakeven Point calculation failed: ${error}`);
    }
  }
};
