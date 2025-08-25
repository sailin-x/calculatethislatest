import { Formula, CalculationResult } from '../../../types/calculator';
import { BreakEvenAnalysisCalculatorInputs, BreakEvenAnalysisCalculatorResults } from './types';

/**
 * Advanced break-even analysis calculation formulas
 */
export class BreakEvenAnalysisFormulas {
  
  /**
   * Calculate basic break-even point
   */
  static calculateBreakEvenPoint(
    fixedCosts: number,
    sellingPrice: number,
    variableCostsPerUnit: number
  ): { breakEvenPoint: number; breakEvenRevenue: number; contributionMargin: number; contributionMarginRatio: number } {
    const contributionMargin = sellingPrice - variableCostsPerUnit;
    const contributionMarginRatio = contributionMargin / sellingPrice;
    
    if (contributionMargin <= 0) {
      return {
        breakEvenPoint: Infinity,
        breakEvenRevenue: Infinity,
        contributionMargin: 0,
        contributionMarginRatio: 0
      };
    }
    
    const breakEvenPoint = fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenPoint * sellingPrice;
    
    return {
      breakEvenPoint,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio
    };
  }

  /**
   * Calculate safety margin
   */
  static calculateSafetyMargin(
    expectedSalesVolume: number,
    breakEvenPoint: number,
    sellingPrice: number
  ): { safetyMargin: number; safetyMarginRatio: number } {
    const safetyMargin = expectedSalesVolume - breakEvenPoint;
    const safetyMarginRatio = safetyMargin / expectedSalesVolume;
    
    return { safetyMargin, safetyMarginRatio };
  }

  /**
   * Calculate profitability metrics
   */
  static calculateProfitability(
    sellingPrice: number,
    variableCostsPerUnit: number,
    fixedCosts: number,
    expectedSalesVolume: number,
    targetProfit: number,
    taxRate: number
  ): {
    grossProfit: number;
    grossProfitMargin: number;
    netProfit: number;
    netProfitMargin: number;
    operatingProfit: number;
    operatingMargin: number;
    targetProfitVolume: number;
    targetProfitRevenue: number;
  } {
    const totalRevenue = sellingPrice * expectedSalesVolume;
    const totalVariableCosts = variableCostsPerUnit * expectedSalesVolume;
    const grossProfit = totalRevenue - totalVariableCosts;
    const grossProfitMargin = grossProfit / totalRevenue;
    
    const operatingProfit = grossProfit - fixedCosts;
    const operatingMargin = operatingProfit / totalRevenue;
    
    const netProfit = operatingProfit * (1 - taxRate / 100);
    const netProfitMargin = netProfit / totalRevenue;
    
    // Calculate volume needed for target profit
    const contributionMargin = sellingPrice - variableCostsPerUnit;
    const targetProfitBeforeTax = targetProfit / (1 - taxRate / 100);
    const targetProfitVolume = (fixedCosts + targetProfitBeforeTax) / contributionMargin;
    const targetProfitRevenue = targetProfitVolume * sellingPrice;
    
    return {
      grossProfit,
      grossProfitMargin,
      netProfit,
      netProfitMargin,
      operatingProfit,
      operatingMargin,
      targetProfitVolume,
      targetProfitRevenue
    };
  }

  /**
   * Calculate cost analysis
   */
  static calculateCostAnalysis(
    fixedCosts: number,
    variableCostsPerUnit: number,
    expectedSalesVolume: number
  ): {
    totalFixedCosts: number;
    totalVariableCosts: number;
    totalCosts: number;
    averageCostPerUnit: number;
    marginalCost: number;
    costStructure: {
      fixedCostsPercentage: number;
      variableCostsPercentage: number;
    };
  } {
    const totalVariableCosts = variableCostsPerUnit * expectedSalesVolume;
    const totalCosts = fixedCosts + totalVariableCosts;
    const averageCostPerUnit = totalCosts / expectedSalesVolume;
    const marginalCost = variableCostsPerUnit;
    
    const costStructure = {
      fixedCostsPercentage: (fixedCosts / totalCosts) * 100,
      variableCostsPercentage: (totalVariableCosts / totalCosts) * 100
    };
    
    return {
      totalFixedCosts: fixedCosts,
      totalVariableCosts,
      totalCosts,
      averageCostPerUnit,
      marginalCost,
      costStructure
    };
  }

  /**
   * Calculate revenue analysis
   */
  static calculateRevenueAnalysis(
    sellingPrice: number,
    expectedSalesVolume: number,
    salesGrowthRate: number,
    breakEvenRevenue: number
  ): {
    totalRevenue: number;
    averageRevenuePerUnit: number;
    revenueAtBreakEven: number;
    revenueGrowth: number;
    priceVolumeAnalysis: {
      priceImpact: number;
      volumeImpact: number;
      combinedImpact: number;
    };
  } {
    const totalRevenue = sellingPrice * expectedSalesVolume;
    const averageRevenuePerUnit = sellingPrice;
    const revenueGrowth = totalRevenue * (salesGrowthRate / 100);
    
    // Price-volume analysis (simplified)
    const priceImpact = sellingPrice * 0.1; // 10% price change impact
    const volumeImpact = expectedSalesVolume * 0.1; // 10% volume change impact
    const combinedImpact = priceImpact + volumeImpact;
    
    return {
      totalRevenue,
      averageRevenuePerUnit,
      revenueAtBreakEven: breakEvenRevenue,
      revenueGrowth,
      priceVolumeAnalysis: {
        priceImpact,
        volumeImpact,
        combinedImpact
      }
    };
  }

  /**
   * Calculate production analysis
   */
  static calculateProductionAnalysis(
    unitsProduced: number,
    productionCapacity: number,
    totalCosts: number,
    sellingPrice: number,
    variableCostsPerUnit: number
  ): {
    capacityUtilization: number;
    efficiencyRatio: number;
    productionCosts: number;
    costPerUnit: number;
    economiesOfScale: number;
    optimalProductionLevel: number;
  } {
    const capacityUtilization = (unitsProduced / productionCapacity) * 100;
    const efficiencyRatio = capacityUtilization / 100;
    const productionCosts = totalCosts;
    const costPerUnit = productionCosts / unitsProduced;
    
    // Simplified economies of scale calculation
    const economiesOfScale = Math.max(0, (productionCapacity - unitsProduced) / productionCapacity);
    
    // Optimal production level (simplified)
    const optimalProductionLevel = productionCapacity * 0.85; // 85% capacity utilization
    
    return {
      capacityUtilization,
      efficiencyRatio,
      productionCosts,
      costPerUnit,
      economiesOfScale,
      optimalProductionLevel
    };
  }

  /**
   * Calculate market analysis
   */
  static calculateMarketAnalysis(
    expectedSalesVolume: number,
    marketSize: number,
    sellingPrice: number,
    competitorPricing: number
  ): {
    marketShare: number;
    marketPosition: number;
    competitiveAdvantage: number;
    priceCompetitiveness: number;
    marketPenetration: number;
    growthPotential: number;
  } {
    const marketShare = (expectedSalesVolume / marketSize) * 100;
    const marketPosition = marketShare / 10; // Simplified market position score
    const competitiveAdvantage = ((sellingPrice - competitorPricing) / competitorPricing) * 100;
    const priceCompetitiveness = competitorPricing / sellingPrice;
    const marketPenetration = marketShare;
    const growthPotential = Math.max(0, 100 - marketShare);
    
    return {
      marketShare,
      marketPosition,
      competitiveAdvantage,
      priceCompetitiveness,
      marketPenetration,
      growthPotential
    };
  }

  /**
   * Calculate sensitivity analysis
   */
  static calculateSensitivityAnalysis(
    baseBreakEvenPoint: number,
    baseProfit: number,
    baseRevenue: number,
    sellingPrice: number,
    variableCostsPerUnit: number,
    fixedCosts: number,
    expectedSalesVolume: number,
    priceSensitivityRange: number,
    costSensitivityRange: number,
    volumeSensitivityRange: number
  ): {
    priceSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      revenueImpact: number;
    };
    costSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      costImpact: number;
    };
    volumeSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      volumeImpact: number;
    };
  } {
    // Price sensitivity (10% change)
    const newPrice = sellingPrice * (1 + priceSensitivityRange / 100);
    const priceBreakEven = this.calculateBreakEvenPoint(fixedCosts, newPrice, variableCostsPerUnit);
    const priceProfit = (newPrice - variableCostsPerUnit) * expectedSalesVolume - fixedCosts;
    const priceRevenue = newPrice * expectedSalesVolume;
    
    // Cost sensitivity (10% change)
    const newVariableCosts = variableCostsPerUnit * (1 + costSensitivityRange / 100);
    const costBreakEven = this.calculateBreakEvenPoint(fixedCosts, sellingPrice, newVariableCosts);
    const costProfit = (sellingPrice - newVariableCosts) * expectedSalesVolume - fixedCosts;
    const costImpact = (newVariableCosts - variableCostsPerUnit) * expectedSalesVolume;
    
    // Volume sensitivity (10% change)
    const newVolume = expectedSalesVolume * (1 + volumeSensitivityRange / 100);
    const volumeBreakEven = baseBreakEvenPoint; // Break-even point doesn't change with volume
    const volumeProfit = (sellingPrice - variableCostsPerUnit) * newVolume - fixedCosts;
    const volumeImpact = newVolume - expectedSalesVolume;
    
    return {
      priceSensitivity: {
        breakEvenPoint: priceBreakEven.breakEvenPoint,
        profitImpact: priceProfit - baseProfit,
        revenueImpact: priceRevenue - baseRevenue
      },
      costSensitivity: {
        breakEvenPoint: costBreakEven.breakEvenPoint,
        profitImpact: costProfit - baseProfit,
        costImpact
      },
      volumeSensitivity: {
        breakEvenPoint: volumeBreakEven,
        profitImpact: volumeProfit - baseProfit,
        volumeImpact
      }
    };
  }

  /**
   * Calculate scenario analysis
   */
  static calculateScenarioAnalysis(
    baseBreakEvenPoint: number,
    baseProfit: number,
    baseRevenue: number,
    optimisticScenario: { salesVolume: number; sellingPrice: number; variableCosts: number },
    pessimisticScenario: { salesVolume: number; sellingPrice: number; variableCosts: number },
    fixedCosts: number
  ): {
    optimistic: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
    baseCase: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
    pessimistic: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
  } {
    // Optimistic scenario
    const optimisticBreakEven = this.calculateBreakEvenPoint(
      fixedCosts,
      optimisticScenario.sellingPrice,
      optimisticScenario.variableCosts
    );
    const optimisticProfit = (optimisticScenario.sellingPrice - optimisticScenario.variableCosts) * 
      optimisticScenario.salesVolume - fixedCosts;
    const optimisticRevenue = optimisticScenario.sellingPrice * optimisticScenario.salesVolume;
    
    // Pessimistic scenario
    const pessimisticBreakEven = this.calculateBreakEvenPoint(
      fixedCosts,
      pessimisticScenario.sellingPrice,
      pessimisticScenario.variableCosts
    );
    const pessimisticProfit = (pessimisticScenario.sellingPrice - pessimisticScenario.variableCosts) * 
      pessimisticScenario.salesVolume - fixedCosts;
    const pessimisticRevenue = pessimisticScenario.sellingPrice * pessimisticScenario.salesVolume;
    
    return {
      optimistic: {
        breakEvenPoint: optimisticBreakEven.breakEvenPoint,
        profit: optimisticProfit,
        revenue: optimisticRevenue,
        probability: 25 // 25% probability
      },
      baseCase: {
        breakEvenPoint: baseBreakEvenPoint,
        profit: baseProfit,
        revenue: baseRevenue,
        probability: 50 // 50% probability
      },
      pessimistic: {
        breakEvenPoint: pessimisticBreakEven.breakEvenPoint,
        profit: pessimisticProfit,
        revenue: pessimisticRevenue,
        probability: 25 // 25% probability
      }
    };
  }

  /**
   * Calculate time analysis
   */
  static calculateTimeAnalysis(
    breakEvenPoint: number,
    expectedSalesVolume: number,
    analysisPeriod: number,
    seasonalityFactor: number,
    discountRate: number
  ): {
    timeToBreakEven: number;
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    seasonalVariations: Array<{
      month: number;
      salesVolume: number;
      revenue: number;
      profit: number;
    }>;
  } {
    // Time to break-even (simplified)
    const timeToBreakEven = breakEvenPoint / (expectedSalesVolume / analysisPeriod);
    
    // Payback period (simplified)
    const paybackPeriod = timeToBreakEven;
    
    // Discounted payback period (simplified)
    const discountedPaybackPeriod = paybackPeriod * (1 + discountRate / 100);
    
    // Seasonal variations
    const seasonalVariations = [];
    for (let month = 1; month <= 12; month++) {
      const seasonalFactor = 1 + (seasonalityFactor / 100) * Math.sin((month - 1) * Math.PI / 6);
      const monthlyVolume = (expectedSalesVolume / 12) * seasonalFactor;
      const monthlyRevenue = monthlyVolume * 100; // Assuming $100 selling price
      const monthlyProfit = monthlyRevenue * 0.2; // Assuming 20% profit margin
      
      seasonalVariations.push({
        month,
        salesVolume: monthlyVolume,
        revenue: monthlyRevenue,
        profit: monthlyProfit
      });
    }
    
    return {
      timeToBreakEven,
      paybackPeriod,
      discountedPaybackPeriod,
      seasonalVariations
    };
  }

  /**
   * Calculate risk analysis
   */
  static calculateRiskAnalysis(
    baseProfit: number,
    optimisticProfit: number,
    pessimisticProfit: number,
    breakEvenPoint: number,
    expectedSalesVolume: number
  ): {
    probabilityOfProfit: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    expectedValue: number;
    riskLevel: 'low' | 'medium' | 'high';
    keyRiskFactors: string[];
  } {
    const probabilityOfProfit = expectedSalesVolume > breakEvenPoint ? 75 : 25;
    const worstCaseScenario = pessimisticProfit;
    const bestCaseScenario = optimisticProfit;
    const expectedValue = (optimisticProfit * 0.25) + (baseProfit * 0.5) + (pessimisticProfit * 0.25);
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high';
    const profitVolatility = Math.abs(optimisticProfit - pessimisticProfit) / Math.abs(baseProfit);
    
    if (profitVolatility < 0.3) riskLevel = 'low';
    else if (profitVolatility < 0.7) riskLevel = 'medium';
    else riskLevel = 'high';
    
    const keyRiskFactors = [];
    if (expectedSalesVolume < breakEvenPoint * 1.2) keyRiskFactors.push('Low sales volume relative to break-even');
    if (Math.abs(optimisticProfit - pessimisticProfit) > Math.abs(baseProfit)) keyRiskFactors.push('High profit volatility');
    if (breakEvenPoint > expectedSalesVolume * 0.8) keyRiskFactors.push('High break-even point');
    
    return {
      probabilityOfProfit,
      worstCaseScenario,
      bestCaseScenario,
      expectedValue,
      riskLevel,
      keyRiskFactors
    };
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    inputs: BreakEvenAnalysisCalculatorInputs,
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
      // Generate random variations
      const priceVariation = 0.9 + Math.random() * 0.2; // ±10% price variation
      const costVariation = 0.9 + Math.random() * 0.2; // ±10% cost variation
      const volumeVariation = 0.8 + Math.random() * 0.4; // ±20% volume variation
      
      const randomPrice = inputs.sellingPrice * priceVariation;
      const randomVariableCosts = inputs.variableCostsPerUnit * costVariation;
      const randomVolume = inputs.expectedSalesVolume * volumeVariation;
      
      const breakEven = this.calculateBreakEvenPoint(
        inputs.fixedCosts,
        randomPrice,
        randomVariableCosts
      );
      
      const profit = (randomPrice - randomVariableCosts) * randomVolume - inputs.fixedCosts;
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
      standardDeviation
    };
  }
}

/**
 * Main break-even analysis calculator formula
 */
export const breakEvenAnalysisCalculatorFormula: Formula = {
  id: 'break-even-analysis-calculator',
  name: 'Break-Even Analysis Calculator',
  description: 'Comprehensive break-even analysis for business planning and decision making',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const beInputs = inputs as BreakEvenAnalysisCalculatorInputs;
    
    try {
      const {
        sellingPrice,
        expectedSalesVolume,
        salesGrowthRate,
        fixedCosts,
        variableCostsPerUnit,
        totalVariableCosts,
        directLaborCosts,
        directMaterialCosts,
        overheadCosts,
        marketingCosts,
        administrativeCosts,
        productionCapacity,
        capacityUtilization,
        unitsProduced,
        marketSize,
        marketShare,
        competitorPricing,
        priceElasticity,
        targetProfit,
        taxRate,
        discountRate,
        analysisPeriod,
        seasonalityFactor,
        includeSensitivityAnalysis,
        priceSensitivityRange,
        costSensitivityRange,
        volumeSensitivityRange,
        includeScenarioAnalysis,
        optimisticScenario,
        pessimisticScenario,
        monteCarloSamples
      } = beInputs;

      // Basic break-even analysis
      const basicAnalysis = BreakEvenAnalysisFormulas.calculateBreakEvenPoint(
        fixedCosts, sellingPrice, variableCostsPerUnit
      );
      
      const safetyMargin = BreakEvenAnalysisFormulas.calculateSafetyMargin(
        expectedSalesVolume, basicAnalysis.breakEvenPoint, sellingPrice
      );
      
      // Profitability analysis
      const profitabilityAnalysis = BreakEvenAnalysisFormulas.calculateProfitability(
        sellingPrice, variableCostsPerUnit, fixedCosts, expectedSalesVolume, targetProfit, taxRate
      );
      
      // Cost analysis
      const costAnalysis = BreakEvenAnalysisFormulas.calculateCostAnalysis(
        fixedCosts, variableCostsPerUnit, expectedSalesVolume
      );
      
      // Revenue analysis
      const revenueAnalysis = BreakEvenAnalysisFormulas.calculateRevenueAnalysis(
        sellingPrice, expectedSalesVolume, salesGrowthRate, basicAnalysis.breakEvenRevenue
      );
      
      // Production analysis
      const productionAnalysis = BreakEvenAnalysisFormulas.calculateProductionAnalysis(
        unitsProduced, productionCapacity, costAnalysis.totalCosts, sellingPrice, variableCostsPerUnit
      );
      
      // Market analysis
      const marketAnalysis = BreakEvenAnalysisFormulas.calculateMarketAnalysis(
        expectedSalesVolume, marketSize, sellingPrice, competitorPricing
      );
      
      // Sensitivity analysis
      let sensitivityAnalysis = null;
      if (includeSensitivityAnalysis) {
        sensitivityAnalysis = BreakEvenAnalysisFormulas.calculateSensitivityAnalysis(
          basicAnalysis.breakEvenPoint,
          profitabilityAnalysis.netProfit,
          revenueAnalysis.totalRevenue,
          sellingPrice,
          variableCostsPerUnit,
          fixedCosts,
          expectedSalesVolume,
          priceSensitivityRange,
          costSensitivityRange,
          volumeSensitivityRange
        );
      }
      
      // Scenario analysis
      let scenarioAnalysis = null;
      if (includeScenarioAnalysis) {
        scenarioAnalysis = BreakEvenAnalysisFormulas.calculateScenarioAnalysis(
          basicAnalysis.breakEvenPoint,
          profitabilityAnalysis.netProfit,
          revenueAnalysis.totalRevenue,
          optimisticScenario,
          pessimisticScenario,
          fixedCosts
        );
      }
      
      // Time analysis
      const timeAnalysis = BreakEvenAnalysisFormulas.calculateTimeAnalysis(
        basicAnalysis.breakEvenPoint,
        expectedSalesVolume,
        analysisPeriod,
        seasonalityFactor,
        discountRate
      );
      
      // Risk analysis
      const riskAnalysis = BreakEvenAnalysisFormulas.calculateRiskAnalysis(
        profitabilityAnalysis.netProfit,
        scenarioAnalysis?.optimistic.profit || profitabilityAnalysis.netProfit * 1.5,
        scenarioAnalysis?.pessimistic.profit || profitabilityAnalysis.netProfit * 0.5,
        basicAnalysis.breakEvenPoint,
        expectedSalesVolume
      );
      
      // Monte Carlo simulation
      const monteCarloResults = BreakEvenAnalysisFormulas.runMonteCarloSimulation(
        beInputs, monteCarloSamples || 10000
      );
      
      // Generate recommendations
      const recommendations = {
        pricingStrategy: [
          sellingPrice < competitorPricing ? 'Consider price increase to improve margins' : 'Current pricing is competitive',
          'Monitor price elasticity for optimization opportunities'
        ],
        costOptimization: [
          variableCostsPerUnit > sellingPrice * 0.6 ? 'High variable costs - consider cost reduction strategies' : 'Variable costs are reasonable',
          'Review fixed costs for optimization opportunities'
        ],
        volumeStrategies: [
          expectedSalesVolume < basicAnalysis.breakEvenPoint * 1.2 ? 'Focus on increasing sales volume' : 'Sales volume is above break-even',
          'Consider marketing strategies to boost demand'
        ],
        riskMitigation: [
          riskAnalysis.riskLevel === 'high' ? 'Implement risk mitigation strategies' : 'Risk level is manageable',
          'Diversify revenue streams to reduce dependency'
        ],
        growthOpportunities: [
          marketAnalysis.growthPotential > 50 ? 'Significant market growth potential' : 'Limited market growth potential',
          'Consider expanding to new markets or products'
        ]
      };
      
      const results: BreakEvenAnalysisCalculatorResults = {
        basicAnalysis: {
          ...basicAnalysis,
          ...safetyMargin
        },
        costAnalysis,
        revenueAnalysis,
        profitabilityAnalysis,
        productionAnalysis,
        marketAnalysis,
        sensitivityAnalysis,
        scenarioAnalysis,
        timeAnalysis,
        riskAnalysis,
        recommendations,
        summary: {
          breakEvenVolume: basicAnalysis.breakEvenPoint,
          breakEvenRevenue: basicAnalysis.breakEvenRevenue,
          currentProfit: profitabilityAnalysis.netProfit,
          profitMargin: profitabilityAnalysis.netProfitMargin * 100,
          keyInsights: [
            `Break-even point: ${basicAnalysis.breakEvenPoint.toFixed(0)} units`,
            `Safety margin: ${safetyMargin.safetyMarginRatio.toFixed(1)}%`,
            `Risk level: ${riskAnalysis.riskLevel}`,
            `Market share: ${marketAnalysis.marketShare.toFixed(1)}%`
          ],
          actionItems: [
            'Monitor sales volume relative to break-even point',
            'Review pricing strategy for optimization',
            'Analyze cost structure for reduction opportunities',
            'Develop contingency plans for risk mitigation'
          ]
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Based on your inputs, the break-even point is ${basicAnalysis.breakEvenPoint.toFixed(0)} units ($${basicAnalysis.breakEvenRevenue.toLocaleString()}). With expected sales of ${expectedSalesVolume.toLocaleString()} units, you have a safety margin of ${safetyMargin.safetyMarginRatio.toFixed(1)}%. The current profit margin is ${(profitabilityAnalysis.netProfitMargin * 100).toFixed(1)}%.`,
        intermediateSteps: {
          'Selling Price': `$${sellingPrice.toFixed(2)}`,
          'Variable Costs per Unit': `$${variableCostsPerUnit.toFixed(2)}`,
          'Fixed Costs': `$${fixedCosts.toLocaleString()}`,
          'Expected Sales Volume': expectedSalesVolume.toLocaleString(),
          'Break-Even Point': `${basicAnalysis.breakEvenPoint.toFixed(0)} units`,
          'Contribution Margin': `$${basicAnalysis.contributionMargin.toFixed(2)}`
        }
      };
    } catch (error) {
      throw new Error(`Break-even analysis calculation failed: ${error}`);
    }
  }
};
