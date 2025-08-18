import { Formula, CalculationResult } from '../../../types/calculator';

export interface HobbiesInputs {
  calculationType: 'collectible_value' | 'hobby_cost' | 'gaming_stats' | 'craft_project' | 'collection_insurance' | 'investment_analysis';
  collectibleType?: string;
  itemCondition?: string;
  originalPrice?: number;
  currentMarketValue?: number;
  rarity?: string;
  yearAcquired?: number;
  monthlyHobbyCost?: number;
  hoursPerWeek?: number;
  projectMaterialCost?: number;
  projectTimeHours?: number;
  skillLevel?: string;
  collectionSize?: number;
  averageItemValue?: number;
}

export class HobbiesFormulas {
  // Condition multipliers for different collectible types
  private static readonly CONDITION_MULTIPLIERS: Record<string, Record<string, number>> = {
    trading_cards: {
      mint: 1.0,
      near_mint: 0.85,
      excellent: 0.65,
      very_good: 0.45,
      good: 0.25,
      poor: 0.10
    },
    coins: {
      mint: 1.0,
      near_mint: 0.90,
      excellent: 0.75,
      very_good: 0.60,
      good: 0.40,
      poor: 0.15
    },
    comics: {
      mint: 1.0,
      near_mint: 0.80,
      excellent: 0.60,
      very_good: 0.40,
      good: 0.20,
      poor: 0.05
    },
    default: {
      mint: 1.0,
      near_mint: 0.85,
      excellent: 0.70,
      very_good: 0.50,
      good: 0.30,
      poor: 0.10
    }
  };

  // Rarity multipliers
  private static readonly RARITY_MULTIPLIERS: Record<string, number> = {
    common: 1.0,
    uncommon: 1.5,
    rare: 3.0,
    very_rare: 6.0,
    ultra_rare: 12.0,
    legendary: 25.0
  };

  // Market trend data (simplified - in practice would use real market data)
  private static readonly MARKET_TRENDS: Record<string, {trend: string, annualGrowth: number, volatility: string}> = {
    trading_cards: { trend: 'Strong Growth', annualGrowth: 15.2, volatility: 'High' },
    coins: { trend: 'Steady Growth', annualGrowth: 8.5, volatility: 'Medium' },
    stamps: { trend: 'Declining', annualGrowth: -2.1, volatility: 'Low' },
    comics: { trend: 'Strong Growth', annualGrowth: 12.8, volatility: 'High' },
    toys: { trend: 'Moderate Growth', annualGrowth: 6.3, volatility: 'Medium' },
    art: { trend: 'Strong Growth', annualGrowth: 18.7, volatility: 'Very High' },
    books: { trend: 'Stable', annualGrowth: 3.2, volatility: 'Low' },
    watches: { trend: 'Strong Growth', annualGrowth: 14.1, volatility: 'Medium' },
    jewelry: { trend: 'Moderate Growth', annualGrowth: 7.8, volatility: 'Medium' },
    other: { trend: 'Variable', annualGrowth: 5.0, volatility: 'Medium' }
  };

  /**
   * Calculate collectible value based on condition, rarity, and market factors
   */
  static calculateCollectibleValue(
    originalPrice: number,
    currentMarketValue: number,
    condition: string,
    rarity: string,
    collectibleType: string,
    yearAcquired?: number
  ): {
    estimatedValue: number;
    conditionAdjustment: number;
    rarityAdjustment: number;
    appreciationRate: number;
    totalReturn: number;
    marketTrend: string;
    recommendations: string[];
  } {
    const conditionMultipliers = this.CONDITION_MULTIPLIERS[collectibleType] || this.CONDITION_MULTIPLIERS.default;
    const conditionMultiplier = conditionMultipliers[condition] || 0.5;
    const rarityMultiplier = this.RARITY_MULTIPLIERS[rarity] || 1.0;
    
    // Base estimated value
    let estimatedValue = currentMarketValue * conditionMultiplier;
    
    // Apply rarity adjustment for very rare items
    if (rarityMultiplier > 3.0) {
      estimatedValue *= Math.min(rarityMultiplier / 3.0, 2.0); // Cap at 2x for rarity
    }
    
    // Calculate appreciation rate
    let appreciationRate = 0;
    if (yearAcquired) {
      const yearsHeld = new Date().getFullYear() - yearAcquired;
      if (yearsHeld > 0) {
        appreciationRate = (Math.pow(estimatedValue / originalPrice, 1 / yearsHeld) - 1) * 100;
      }
    }
    
    const totalReturn = ((estimatedValue - originalPrice) / originalPrice) * 100;
    const marketData = this.MARKET_TRENDS[collectibleType] || this.MARKET_TRENDS.other;
    
    const recommendations: string[] = [];
    
    if (condition === 'poor' || condition === 'good') {
      recommendations.push('Consider professional restoration if economically viable');
    }
    if (appreciationRate > 15) {
      recommendations.push('Strong performer - consider holding for continued growth');
    }
    if (appreciationRate < 0) {
      recommendations.push('Declining value - evaluate if this is temporary market condition');
    }
    if (rarityMultiplier > 6.0) {
      recommendations.push('Ultra-rare item - ensure proper storage and insurance');
    }
    
    return {
      estimatedValue,
      conditionAdjustment: conditionMultiplier,
      rarityAdjustment: rarityMultiplier,
      appreciationRate,
      totalReturn,
      marketTrend: `${marketData.trend} (${marketData.annualGrowth > 0 ? '+' : ''}${marketData.annualGrowth}% annually)`,
      recommendations
    };
  }

  /**
   * Analyze hobby costs and value per hour
   */
  static analyzeHobbyCosts(
    monthlySpending: number,
    hoursPerWeek: number,
    skillLevel: string
  ): {
    annualCost: number;
    costPerHour: number;
    hoursPerYear: number;
    skillMultiplier: number;
    valueAssessment: string;
    recommendations: string[];
  } {
    const hoursPerYear = hoursPerWeek * 52;
    const annualCost = monthlySpending * 12;
    const costPerHour = annualCost / hoursPerYear;
    
    const skillMultipliers: Record<string, number> = {
      beginner: 1.0,
      intermediate: 0.8,
      advanced: 0.6,
      expert: 0.4
    };
    
    const skillMultiplier = skillMultipliers[skillLevel] || 1.0;
    const adjustedCostPerHour = costPerHour * skillMultiplier;
    
    let valueAssessment: string;
    if (adjustedCostPerHour < 5) {
      valueAssessment = 'Excellent value - very cost-effective hobby';
    } else if (adjustedCostPerHour < 15) {
      valueAssessment = 'Good value - reasonable cost for enjoyment';
    } else if (adjustedCostPerHour < 30) {
      valueAssessment = 'Moderate value - consider optimizing spending';
    } else {
      valueAssessment = 'Expensive hobby - evaluate if costs align with enjoyment';
    }
    
    const recommendations: string[] = [];
    
    if (costPerHour > 25) {
      recommendations.push('Consider ways to reduce costs or increase time investment');
    }
    if (skillLevel === 'beginner') {
      recommendations.push('As skills improve, cost per hour typically decreases');
    }
    if (hoursPerWeek < 5) {
      recommendations.push('Increasing time investment could improve cost efficiency');
    }
    
    return {
      annualCost,
      costPerHour,
      hoursPerYear,
      skillMultiplier,
      valueAssessment,
      recommendations
    };
  }

  /**
   * Plan craft project costs and time
   */
  static planCraftProject(
    materialCost: number,
    timeHours: number,
    skillLevel: string
  ): {
    totalProjectCost: number;
    costPerHour: number;
    skillAdjustedTime: number;
    difficultyAssessment: string;
    recommendations: string[];
  } {
    const skillTimeMultipliers: Record<string, number> = {
      beginner: 1.5,
      intermediate: 1.2,
      advanced: 1.0,
      expert: 0.8
    };
    
    const timeMultiplier = skillTimeMultipliers[skillLevel] || 1.2;
    const skillAdjustedTime = timeHours * timeMultiplier;
    const costPerHour = materialCost / skillAdjustedTime;
    
    let difficultyAssessment: string;
    if (timeHours < 5) {
      difficultyAssessment = 'Quick project - good for beginners';
    } else if (timeHours < 20) {
      difficultyAssessment = 'Medium project - requires some commitment';
    } else if (timeHours < 50) {
      difficultyAssessment = 'Large project - significant time investment';
    } else {
      difficultyAssessment = 'Major project - consider breaking into phases';
    }
    
    const recommendations: string[] = [];
    
    if (skillLevel === 'beginner' && timeHours > 20) {
      recommendations.push('Consider starting with a smaller project to build skills');
    }
    if (costPerHour > 10) {
      recommendations.push('High material cost - ensure you have necessary skills');
    }
    if (skillAdjustedTime > timeHours * 1.3) {
      recommendations.push('Allow extra time as skill level may require more careful work');
    }
    
    return {
      totalProjectCost: materialCost,
      costPerHour,
      skillAdjustedTime,
      difficultyAssessment,
      recommendations
    };
  }

  /**
   * Calculate collection insurance value
   */
  static calculateCollectionInsurance(
    collectionSize: number,
    averageItemValue: number,
    collectibleType: string
  ): {
    totalCollectionValue: number;
    recommendedCoverage: number;
    annualPremiumEstimate: number;
    riskAssessment: string;
    recommendations: string[];
  } {
    const totalValue = collectionSize * averageItemValue;
    
    // Insurance typically covers 80-100% of appraised value
    const recommendedCoverage = totalValue * 0.9;
    
    // Premium rates vary by collectible type (as percentage of value)
    const premiumRates: Record<string, number> = {
      trading_cards: 0.015, // 1.5%
      coins: 0.012, // 1.2%
      stamps: 0.010, // 1.0%
      comics: 0.018, // 1.8%
      toys: 0.015, // 1.5%
      art: 0.025, // 2.5%
      books: 0.008, // 0.8%
      watches: 0.020, // 2.0%
      jewelry: 0.030, // 3.0%
      other: 0.015 // 1.5%
    };
    
    const premiumRate = premiumRates[collectibleType] || 0.015;
    const annualPremiumEstimate = recommendedCoverage * premiumRate;
    
    let riskAssessment: string;
    if (totalValue < 5000) {
      riskAssessment = 'Low risk - homeowner\'s insurance may provide adequate coverage';
    } else if (totalValue < 25000) {
      riskAssessment = 'Moderate risk - consider specialized collectibles insurance';
    } else if (totalValue < 100000) {
      riskAssessment = 'High risk - specialized insurance strongly recommended';
    } else {
      riskAssessment = 'Very high risk - professional appraisal and specialized coverage essential';
    }
    
    const recommendations: string[] = [];
    
    if (totalValue > 10000) {
      recommendations.push('Get professional appraisal for insurance purposes');
    }
    if (collectibleType === 'art' || collectibleType === 'jewelry') {
      recommendations.push('High-value items may need individual scheduling on policy');
    }
    recommendations.push('Document collection with photos and detailed inventory');
    recommendations.push('Store collection in climate-controlled, secure environment');
    
    return {
      totalCollectionValue: totalValue,
      recommendedCoverage,
      annualPremiumEstimate,
      riskAssessment,
      recommendations
    };
  }

  /**
   * Analyze collectible investment performance
   */
  static analyzeInvestmentPerformance(
    originalPrice: number,
    currentValue: number,
    yearAcquired: number,
    collectibleType: string
  ): {
    totalReturn: number;
    annualizedReturn: number;
    comparisonToMarket: string;
    investmentGrade: string;
    futureProjection: string;
    recommendations: string[];
  } {
    const yearsHeld = new Date().getFullYear() - yearAcquired;
    const totalReturn = ((currentValue - originalPrice) / originalPrice) * 100;
    const annualizedReturn = yearsHeld > 0 ? (Math.pow(currentValue / originalPrice, 1 / yearsHeld) - 1) * 100 : 0;
    
    const marketData = this.MARKET_TRENDS[collectibleType] || this.MARKET_TRENDS.other;
    const marketComparison = annualizedReturn - marketData.annualGrowth;
    
    let comparisonToMarket: string;
    if (marketComparison > 5) {
      comparisonToMarket = 'Significantly outperforming market average';
    } else if (marketComparison > 0) {
      comparisonToMarket = 'Outperforming market average';
    } else if (marketComparison > -5) {
      comparisonToMarket = 'Performing close to market average';
    } else {
      comparisonToMarket = 'Underperforming market average';
    }
    
    let investmentGrade: string;
    if (annualizedReturn > 15) {
      investmentGrade = 'Excellent investment';
    } else if (annualizedReturn > 8) {
      investmentGrade = 'Good investment';
    } else if (annualizedReturn > 3) {
      investmentGrade = 'Fair investment';
    } else if (annualizedReturn > 0) {
      investmentGrade = 'Poor investment';
    } else {
      investmentGrade = 'Loss-making investment';
    }
    
    const futureProjection = `Based on market trends, projected annual growth: ${marketData.annualGrowth > 0 ? '+' : ''}${marketData.annualGrowth}%`;
    
    const recommendations: string[] = [];
    
    if (annualizedReturn < 0) {
      recommendations.push('Consider if this is temporary market downturn or fundamental decline');
    }
    if (annualizedReturn > 20) {
      recommendations.push('Exceptional performance - consider taking some profits');
    }
    if (marketData.volatility === 'High') {
      recommendations.push('High volatility market - be prepared for value fluctuations');
    }
    
    return {
      totalReturn,
      annualizedReturn,
      comparisonToMarket,
      investmentGrade,
      futureProjection,
      recommendations
    };
  }
}

export const hobbiesCalculatorFormula: Formula = {
  id: 'hobbies-calculator',
  name: 'Hobbies & Collectibles Calculator',
  description: 'Comprehensive analysis of hobby costs, collectible values, and investment performance',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const hobbiesInputs = inputs as HobbiesInputs;
    
    try {
      let result: any = {};
      let explanation = '';
      let steps: any = {};

      switch (hobbiesInputs.calculationType) {
        case 'collectible_value':
          if (!hobbiesInputs.originalPrice || !hobbiesInputs.currentMarketValue) {
            throw new Error('Original price and current market value required for collectible valuation');
          }
          
          const valuation = HobbiesFormulas.calculateCollectibleValue(
            hobbiesInputs.originalPrice,
            hobbiesInputs.currentMarketValue,
            hobbiesInputs.itemCondition || 'good',
            hobbiesInputs.rarity || 'common',
            hobbiesInputs.collectibleType || 'other',
            hobbiesInputs.yearAcquired
          );
          
          result = {
            estimatedValue: valuation.estimatedValue,
            appreciationRate: valuation.appreciationRate,
            roi: valuation.totalReturn,
            marketTrend: valuation.marketTrend,
            recommendations: valuation.recommendations.join('; ')
          };
          
          explanation = `Collectible valued at $${valuation.estimatedValue.toFixed(2)} with ${valuation.appreciationRate.toFixed(1)}% annual appreciation`;
          
          steps = {
            'Original Price': `$${hobbiesInputs.originalPrice.toFixed(2)}`,
            'Market Value': `$${hobbiesInputs.currentMarketValue.toFixed(2)}`,
            'Condition Adjustment': `${(valuation.conditionAdjustment * 100).toFixed(0)}%`,
            'Rarity Multiplier': `${valuation.rarityAdjustment.toFixed(1)}x`,
            'Final Estimate': `$${valuation.estimatedValue.toFixed(2)}`
          };
          break;

        case 'hobby_cost':
          if (!hobbiesInputs.monthlyHobbyCost || !hobbiesInputs.hoursPerWeek) {
            throw new Error('Monthly cost and hours per week required for hobby cost analysis');
          }
          
          const costAnalysis = HobbiesFormulas.analyzeHobbyCosts(
            hobbiesInputs.monthlyHobbyCost,
            hobbiesInputs.hoursPerWeek,
            hobbiesInputs.skillLevel || 'intermediate'
          );
          
          result = {
            totalInvestment: costAnalysis.annualCost,
            costPerHour: costAnalysis.costPerHour,
            recommendations: costAnalysis.recommendations.join('; ')
          };
          
          explanation = `Annual hobby cost: $${costAnalysis.annualCost.toFixed(0)} (${costAnalysis.costPerHour.toFixed(2)} per hour)`;
          
          steps = {
            'Monthly Spending': `$${hobbiesInputs.monthlyHobbyCost.toFixed(2)}`,
            'Hours per Week': hobbiesInputs.hoursPerWeek.toString(),
            'Annual Hours': costAnalysis.hoursPerYear.toString(),
            'Annual Cost': `$${costAnalysis.annualCost.toFixed(0)}`,
            'Value Assessment': costAnalysis.valueAssessment
          };
          break;

        case 'craft_project':
          if (!hobbiesInputs.projectMaterialCost || !hobbiesInputs.projectTimeHours) {
            throw new Error('Material cost and project time required for craft project planning');
          }
          
          const projectPlan = HobbiesFormulas.planCraftProject(
            hobbiesInputs.projectMaterialCost,
            hobbiesInputs.projectTimeHours,
            hobbiesInputs.skillLevel || 'intermediate'
          );
          
          result = {
            projectCostBreakdown: `Materials: $${projectPlan.totalProjectCost.toFixed(2)}, Time: ${projectPlan.skillAdjustedTime.toFixed(1)} hours`,
            costPerHour: projectPlan.costPerHour,
            recommendations: projectPlan.recommendations.join('; ')
          };
          
          explanation = `Project cost: $${projectPlan.totalProjectCost.toFixed(2)} for ${projectPlan.skillAdjustedTime.toFixed(1)} hours of work`;
          
          steps = {
            'Material Cost': `$${hobbiesInputs.projectMaterialCost.toFixed(2)}`,
            'Estimated Time': `${hobbiesInputs.projectTimeHours} hours`,
            'Skill Level': hobbiesInputs.skillLevel || 'intermediate',
            'Adjusted Time': `${projectPlan.skillAdjustedTime.toFixed(1)} hours`,
            'Difficulty': projectPlan.difficultyAssessment
          };
          break;

        case 'collection_insurance':
          if (!hobbiesInputs.collectionSize || !hobbiesInputs.averageItemValue) {
            throw new Error('Collection size and average item value required for insurance calculation');
          }
          
          const insurance = HobbiesFormulas.calculateCollectionInsurance(
            hobbiesInputs.collectionSize,
            hobbiesInputs.averageItemValue,
            hobbiesInputs.collectibleType || 'other'
          );
          
          result = {
            insuranceValue: insurance.recommendedCoverage,
            totalInvestment: insurance.totalCollectionValue,
            recommendations: insurance.recommendations.join('; ')
          };
          
          explanation = `Collection valued at $${insurance.totalCollectionValue.toFixed(0)}, recommended coverage: $${insurance.recommendedCoverage.toFixed(0)}`;
          
          steps = {
            'Collection Size': `${hobbiesInputs.collectionSize} items`,
            'Average Value': `$${hobbiesInputs.averageItemValue.toFixed(2)}`,
            'Total Value': `$${insurance.totalCollectionValue.toFixed(0)}`,
            'Annual Premium': `$${insurance.annualPremiumEstimate.toFixed(0)}`,
            'Risk Level': insurance.riskAssessment
          };
          break;

        case 'investment_analysis':
          if (!hobbiesInputs.originalPrice || !hobbiesInputs.currentMarketValue || !hobbiesInputs.yearAcquired) {
            throw new Error('Original price, current value, and year acquired required for investment analysis');
          }
          
          const investment = HobbiesFormulas.analyzeInvestmentPerformance(
            hobbiesInputs.originalPrice,
            hobbiesInputs.currentMarketValue,
            hobbiesInputs.yearAcquired,
            hobbiesInputs.collectibleType || 'other'
          );
          
          result = {
            roi: investment.totalReturn,
            appreciationRate: investment.annualizedReturn,
            marketTrend: investment.comparisonToMarket,
            recommendations: investment.recommendations.join('; ')
          };
          
          explanation = `Investment performance: ${investment.totalReturn.toFixed(1)}% total return (${investment.annualizedReturn.toFixed(1)}% annually)`;
          
          steps = {
            'Original Investment': `$${hobbiesInputs.originalPrice.toFixed(2)}`,
            'Current Value': `$${hobbiesInputs.currentMarketValue.toFixed(2)}`,
            'Years Held': (new Date().getFullYear() - hobbiesInputs.yearAcquired).toString(),
            'Total Return': `${investment.totalReturn.toFixed(1)}%`,
            'Investment Grade': investment.investmentGrade
          };
          break;

        default:
          throw new Error(`Unknown calculation type: ${hobbiesInputs.calculationType}`);
      }

      return {
        outputs: result,
        explanation,
        intermediateSteps: steps
      };
    } catch (error) {
      throw new Error(`Hobbies calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};