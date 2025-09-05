import { Calculator } from '../../types';
import { PricePerSquareFootInputs, PricePerSquareFootOutputs, PricePerSquareFootAnalysis } from './types';
import { calculatePricePerSquareFoot } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';

export class PricePerSquareFootCalculator implements Calculator<PricePerSquareFootInputs, PricePerSquareFootOutputs> {
  name = 'Price Per Square Foot Calculator';
  description = 'Calculate and analyze price per square foot for real estate properties with comprehensive market comparison and valuation';
  category = 'Finance & Investment';
  tags = ['price per square foot', 'real estate', 'valuation', 'market analysis', 'comparable sales', 'property value'];
  
  calculate(inputs: PricePerSquareFootInputs): PricePerSquareFootOutputs {
    const validation = validatePricePerSquareFootInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const metrics = calculatePricePerSquareFoot(inputs);
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      pricePerSquareFoot: metrics.pricePerSquareFoot,
      averageComparablePrice: metrics.averageComparablePrice,
      medianComparablePrice: metrics.medianComparablePrice,
      estimatedValue: metrics.estimatedValue,
      overUnderPricedPercentage: metrics.overUnderPricedPercentage,
      pricePosition: metrics.marketPosition,
      riskScore: metrics.riskScore,
      pricePerformance: metrics.pricePerformance,
      analysis,
      listPricePerSquareFoot: metrics.listPricePerSquareFoot,
      salePricePerSquareFoot: metrics.salePricePerSquareFoot,
      appraisalPricePerSquareFoot: metrics.appraisalPricePerSquareFoot,
      assessedPricePerSquareFoot: metrics.assessedPricePerSquareFoot,
      comparablePriceRange: metrics.comparablePriceRange,
      pricePercentile: metrics.pricePercentile,
      marketAveragePrice: metrics.marketAveragePrice,
      marketMedianPrice: metrics.marketMedianPrice,
      marketPriceRange: metrics.marketPriceRange,
      valueRange: metrics.valueRange,
      overUnderPriced: metrics.overUnderPriced,
      priceTrend: metrics.priceTrend,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      comparisonAnalysis: metrics.comparisonAnalysis,
      priceVolatility: metrics.priceVolatility,
      marketRisk: metrics.marketRisk,
      valuationRisk: metrics.valuationRisk,
      marketPerformance: metrics.marketPerformance,
      relativePerformance: metrics.relativePerformance,
      benchmarkAnalysis: metrics.benchmarkAnalysis
    };
  }

  private generateAnalysis(inputs: PricePerSquareFootInputs, metrics: any): PricePerSquareFootAnalysis {
    const priceRating = this.calculatePriceRating(metrics);
    const valueRating = this.calculateValueRating(metrics);
    const recommendation = this.generateRecommendation(metrics, priceRating, valueRating);

    return {
      priceRating,
      valueRating,
      recommendation,
      keyStrengths: this.identifyStrengths(inputs, metrics),
      keyWeaknesses: this.identifyWeaknesses(inputs, metrics),
      valueFactors: this.identifyValueFactors(inputs, metrics),
      opportunities: this.identifyOpportunities(inputs, metrics),
      priceSummary: this.generatePriceSummary(inputs, metrics),
      comparableAnalysis: this.generateComparableAnalysis(metrics),
      marketAnalysis: this.generateMarketAnalysis(inputs, metrics),
      valueSummary: this.generateValueSummary(metrics),
      valuationAnalysis: this.generateValuationAnalysis(metrics),
      pricePosition: this.generatePricePosition(metrics),
      marketSummary: this.generateMarketSummary(inputs, metrics),
      trendAnalysis: this.generateTrendAnalysis(metrics),
      competitiveAnalysis: this.generateCompetitiveAnalysis(metrics),
      locationSummary: this.generateLocationSummary(inputs, metrics),
      neighborhoodAnalysis: this.generateNeighborhoodAnalysis(inputs, metrics),
      amenityAnalysis: this.generateAmenityAnalysis(inputs, metrics),
      riskAssessment: this.generateRiskAssessment(inputs, metrics),
      priceRisk: this.assessPriceRisk(metrics),
      marketRisk: this.assessMarketRisk(inputs, metrics),
      locationRisk: this.assessLocationRisk(inputs, metrics),
      performanceSummary: this.generatePerformanceSummary(metrics),
      trendPerformance: this.generateTrendPerformance(metrics),
      relativePerformance: this.generateRelativePerformance(metrics),
      pricingRecommendations: this.generatePricingRecommendations(inputs, metrics),
      negotiationSuggestions: this.generateNegotiationSuggestions(inputs, metrics),
      optimizationStrategies: this.generateOptimizationStrategies(inputs, metrics),
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      nextSteps: this.generateNextSteps(inputs, metrics),
      timeline: this.generateTimeline(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      keyMetrics: this.generateKeyMetrics(metrics),
      reviewSchedule: this.generateReviewSchedule(inputs, metrics),
      riskManagement: this.generateRiskManagement(inputs, metrics),
      mitigationStrategies: this.generateMitigationStrategies(inputs, metrics),
      contingencyPlans: this.generateContingencyPlans(inputs, metrics),
      performanceBenchmarks: metrics.performanceBenchmarks,
      decisionRecommendation: this.generateDecisionRecommendation(metrics, recommendation),
      presentationPoints: this.generatePresentationPoints(inputs, metrics),
      decisionFactors: this.generateDecisionFactors(inputs, metrics)
    };
  }

  private calculatePriceRating(metrics: any): 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' {
    const pricePerSqFt = metrics.pricePerSquareFoot;
    const marketAverage = metrics.marketAveragePrice;
    const percentile = metrics.pricePercentile;
    
    if (percentile >= 90) return 'Excellent';
    if (percentile >= 75) return 'Good';
    if (percentile >= 40) return 'Average';
    if (percentile >= 20) return 'Poor';
    return 'Very Poor';
  }

  private calculateValueRating(metrics: any): 'High Value' | 'Good Value' | 'Fair Value' | 'Low Value' | 'Overpriced' {
    const overUnderPriced = metrics.overUnderPricedPercentage;
    
    if (overUnderPriced <= -20) return 'High Value';
    if (overUnderPriced <= -10) return 'Good Value';
    if (overUnderPriced <= 10) return 'Fair Value';
    if (overUnderPriced <= 20) return 'Low Value';
    return 'Overpriced';
  }

  private generateRecommendation(metrics: any, priceRating: string, valueRating: string): 'Buy' | 'Consider' | 'Negotiate' | 'Avoid' | 'Requires Review' {
    if (valueRating === 'High Value' && priceRating !== 'Very Poor') return 'Buy';
    if (valueRating === 'Good Value' && priceRating !== 'Poor') return 'Consider';
    if (valueRating === 'Fair Value') return 'Negotiate';
    if (valueRating === 'Low Value' || valueRating === 'Overpriced') return 'Avoid';
    return 'Requires Review';
  }

  private identifyStrengths(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const strengths: string[] = [];
    
    if (metrics.pricePerSquareFoot < metrics.averageComparablePrice) {
      strengths.push('Price per square foot below market average');
    }
    
    if (inputs.propertyCondition === 'excellent' || inputs.propertyCondition === 'good') {
      strengths.push('Property in excellent condition');
    }
    
    if (inputs.schoolRating >= 8) {
      strengths.push('High-rated school district');
    }
    
    if (inputs.walkScore >= 70) {
      strengths.push('High walkability score');
    }
    
    if (metrics.pricePercentile >= 75) {
      strengths.push('Strong market position');
    }
    
    return strengths;
  }

  private identifyWeaknesses(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const weaknesses: string[] = [];
    
    if (metrics.pricePerSquareFoot > metrics.averageComparablePrice) {
      weaknesses.push('Price per square foot above market average');
    }
    
    if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') {
      weaknesses.push('Property needs significant repairs');
    }
    
    if (inputs.crimeRate === 'high') {
      weaknesses.push('High crime rate in area');
    }
    
    if (inputs.walkScore < 30) {
      weaknesses.push('Low walkability score');
    }
    
    if (metrics.pricePercentile <= 25) {
      weaknesses.push('Weak market position');
    }
    
    return weaknesses;
  }

  private identifyValueFactors(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const factors: string[] = [];
    
    factors.push(`Price per square foot: $${metrics.pricePerSquareFoot.toFixed(2)}`);
    factors.push(`Market average: $${metrics.averageComparablePrice.toFixed(2)}`);
    factors.push(`Price percentile: ${metrics.pricePercentile.toFixed(0)}%`);
    factors.push(`Estimated value: $${metrics.estimatedValue.toLocaleString()}`);
    factors.push(`Over/under priced: ${metrics.overUnderPricedPercentage.toFixed(1)}%`);
    
    return factors;
  }

  private identifyOpportunities(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const opportunities: string[] = [];
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      opportunities.push('Favorable market conditions for appreciation');
    }
    
    if (metrics.overUnderPricedPercentage < -10) {
      opportunities.push('Property appears undervalued');
    }
    
    if (inputs.propertyAge < 10) {
      opportunities.push('Newer property with modern features');
    }
    
    if (inputs.amenities.length > 5) {
      opportunities.push('Property has many desirable amenities');
    }
    
    return opportunities;
  }

  private generatePriceSummary(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Property priced at $${metrics.pricePerSquareFoot.toFixed(2)} per square foot, ${metrics.overUnderPricedPercentage > 0 ? 'above' : 'below'} market average of $${metrics.averageComparablePrice.toFixed(2)}. This represents a ${Math.abs(metrics.overUnderPricedPercentage).toFixed(1)}% ${metrics.overUnderPricedPercentage > 0 ? 'premium' : 'discount'} compared to comparable properties.`;
  }

  private generateComparableAnalysis(metrics: any): string {
    return `Comparable analysis shows ${metrics.comparablePriceRange.min.toFixed(2)} to $${metrics.comparablePriceRange.max.toFixed(2)} per square foot range, with median of $${metrics.medianComparablePrice.toFixed(2)}. Property ranks in the ${metrics.pricePercentile.toFixed(0)}th percentile of comparable sales.`;
  }

  private generateMarketAnalysis(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Market analysis for ${inputs.marketLocation} shows ${inputs.marketCondition} conditions with average price of $${metrics.marketAveragePrice.toFixed(2)} per square foot. Property is positioned ${metrics.marketPosition} in the market.`;
  }

  private generateValueSummary(metrics: any): string {
    return `Value analysis indicates estimated value of $${metrics.estimatedValue.toLocaleString()} with confidence range of $${metrics.valueRange.low.toLocaleString()} to $${metrics.valueRange.high.toLocaleString()}. Property is ${metrics.overUnderPricedPercentage > 0 ? 'overpriced' : 'underpriced'} by ${Math.abs(metrics.overUnderPricedPercentage).toFixed(1)}%.`;
  }

  private generateValuationAnalysis(metrics: any): string {
    return `Valuation analysis shows property value of $${metrics.estimatedValue.toLocaleString()} based on comparable sales and market conditions. Value confidence is ${(metrics.valueRange.confidence * 100).toFixed(0)}% with range of $${metrics.valueRange.low.toLocaleString()} to $${metrics.valueRange.high.toLocaleString()}.`;
  }

  private generatePricePosition(metrics: any): string {
    return `Price position analysis shows property is ${metrics.marketPosition} in the market, ranking in the ${metrics.pricePercentile.toFixed(0)}th percentile of comparable properties.`;
  }

  private generateMarketSummary(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Market summary for ${inputs.marketLocation} indicates ${inputs.marketCondition} market conditions with ${(inputs.marketGrowthRate * 100).toFixed(1)}% growth rate. Average market price is $${metrics.marketAveragePrice.toFixed(2)} per square foot.`;
  }

  private generateTrendAnalysis(metrics: any): string {
    return `Trend analysis shows ${metrics.priceTrend.length > 0 ? 'recent price trends' : 'stable pricing'} with ${metrics.pricePerformance > 0 ? 'positive' : 'negative'} performance of ${(metrics.pricePerformance * 100).toFixed(1)}% over the analysis period.`;
  }

  private generateCompetitiveAnalysis(metrics: any): string {
    return `Competitive analysis indicates property is ${metrics.marketPosition} compared to market average. Price performance is ${metrics.relativePerformance > 0 ? 'above' : 'below'} market average by ${(Math.abs(metrics.relativePerformance) * 100).toFixed(1)}%.`;
  }

  private generateLocationSummary(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Location analysis for ${inputs.marketLocation} shows ${inputs.crimeRate} crime rate, ${inputs.schoolRating}/10 school rating, and ${inputs.walkScore} walk score. Location factors ${metrics.locationRisk < 0.3 ? 'positively' : 'negatively'} impact property value.`;
  }

  private generateNeighborhoodAnalysis(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Neighborhood analysis indicates ${inputs.crimeRate} crime rate with ${inputs.schoolRating}/10 school district rating. Walkability score of ${inputs.walkScore} and transit score of ${inputs.transitScore} provide ${inputs.walkScore >= 70 ? 'strong' : 'moderate'} neighborhood amenities.`;
  }

  private generateAmenityAnalysis(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Amenity analysis shows ${inputs.amenities.length} amenities with total value of $${inputs.amenities.reduce((sum, amenity) => sum + amenity.value, 0).toLocaleString()}. Property features ${inputs.garageSpaces} garage spaces and ${inputs.parkingSpaces} parking spaces.`;
  }

  private generateRiskAssessment(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Risk assessment shows overall risk score of ${(metrics.riskScore * 100).toFixed(0)}% with price volatility of ${(metrics.priceVolatility * 100).toFixed(1)}%. Market risk is ${metrics.marketRisk < 0.3 ? 'low' : metrics.marketRisk < 0.6 ? 'moderate' : 'high'} at ${(metrics.marketRisk * 100).toFixed(0)}%.`;
  }

  private assessPriceRisk(metrics: any): string {
    return `Price risk assessment indicates ${metrics.priceVolatility < 0.1 ? 'low' : metrics.priceVolatility < 0.2 ? 'moderate' : 'high'} price volatility of ${(metrics.priceVolatility * 100).toFixed(1)}%. Valuation risk is ${metrics.valuationRisk < 0.3 ? 'low' : 'moderate'} at ${(metrics.valuationRisk * 100).toFixed(0)}%.`;
  }

  private assessMarketRisk(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Market risk assessment shows ${inputs.marketCondition} market conditions with ${(inputs.marketGrowthRate * 100).toFixed(1)}% growth rate. Market risk is ${metrics.marketRisk < 0.3 ? 'low' : metrics.marketRisk < 0.6 ? 'moderate' : 'high'} at ${(metrics.marketRisk * 100).toFixed(0)}%.`;
  }

  private assessLocationRisk(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Location risk assessment indicates ${inputs.crimeRate} crime rate and ${inputs.schoolRating}/10 school rating. Location risk is ${inputs.crimeRate === 'low' && inputs.schoolRating >= 7 ? 'low' : inputs.crimeRate === 'high' || inputs.schoolRating < 5 ? 'high' : 'moderate'}.`;
  }

  private generatePerformanceSummary(metrics: any): string {
    return `Performance summary shows price performance of ${(metrics.pricePerformance * 100).toFixed(1)}% and market performance of ${(metrics.marketPerformance * 100).toFixed(1)}%. Relative performance is ${(metrics.relativePerformance * 100).toFixed(1)}% compared to market average.`;
  }

  private generateTrendPerformance(metrics: any): string {
    return `Trend performance analysis indicates ${metrics.pricePerformance > 0 ? 'positive' : 'negative'} price performance of ${(metrics.pricePerformance * 100).toFixed(1)}% over the analysis period.`;
  }

  private generateRelativePerformance(metrics: any): string {
    return `Relative performance shows property is performing ${metrics.relativePerformance > 0 ? 'above' : 'below'} market average by ${(Math.abs(metrics.relativePerformance) * 100).toFixed(1)}%.`;
  }

  private generatePricingRecommendations(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (metrics.overUnderPricedPercentage > 10) {
      recommendations.push('Consider reducing asking price to align with market');
    } else if (metrics.overUnderPricedPercentage < -10) {
      recommendations.push('Property appears undervalued - consider price increase');
    }
    
    if (metrics.pricePercentile < 25) {
      recommendations.push('Improve property condition to increase value');
    }
    
    if (inputs.daysOnMarket > 90) {
      recommendations.push('Property has been on market too long - review pricing strategy');
    }
    
    return recommendations;
  }

  private generateNegotiationSuggestions(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const suggestions: string[] = [];
    
    if (metrics.overUnderPricedPercentage > 5) {
      suggestions.push('Use comparable sales data to negotiate price reduction');
    }
    
    if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') {
      suggestions.push('Factor in repair costs during negotiations');
    }
    
    if (inputs.daysOnMarket > 60) {
      suggestions.push('Leverage extended market time for negotiation advantage');
    }
    
    return suggestions;
  }

  private generateOptimizationStrategies(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const strategies: string[] = [];
    
    strategies.push('Improve property condition to increase value');
    strategies.push('Highlight unique amenities and features');
    strategies.push('Consider staging to enhance appeal');
    strategies.push('Optimize marketing strategy for target buyers');
    
    return strategies;
  }

  private generateImplementationPlan(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Implementation plan: 1) Review comparable sales data, 2) Assess property condition and needed improvements, 3) Develop pricing strategy based on market analysis, 4) Implement marketing plan, 5) Monitor market conditions and adjust as needed.`;
  }

  private generateNextSteps(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    const steps: string[] = [];
    
    steps.push('Review comparable sales data for accuracy');
    steps.push('Assess property condition and needed improvements');
    steps.push('Develop pricing strategy based on market analysis');
    steps.push('Implement marketing plan');
    steps.push('Monitor market conditions and adjust pricing');
    
    return steps;
  }

  private generateTimeline(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Timeline: Immediate review of comparable sales, 1-2 weeks for condition assessment, 2-4 weeks for pricing strategy development, ongoing market monitoring and adjustment.`;
  }

  private generateMonitoringPlan(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Monitoring plan: Track comparable sales weekly, monitor market conditions monthly, review pricing strategy quarterly, and assess property condition annually.`;
  }

  private generateKeyMetrics(metrics: any): string[] {
    return [
      'Price Per Square Foot',
      'Market Position',
      'Comparable Analysis',
      'Value Estimation',
      'Risk Assessment',
      'Performance Metrics',
      'Market Trends'
    ];
  }

  private generateReviewSchedule(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Review schedule: Weekly comparable sales review, monthly market condition assessment, quarterly pricing strategy review, and annual comprehensive analysis.`;
  }

  private generateRiskManagement(inputs: PricePerSquareFootInputs, metrics: any): string {
    return `Risk management strategy includes regular market monitoring, comparable sales tracking, condition assessment, and contingency planning for market changes.`;
  }

  private generateMitigationStrategies(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    return [
      'Monitor market conditions regularly',
      'Track comparable sales data',
      'Maintain property condition',
      'Adjust pricing strategy as needed',
      'Diversify marketing approach'
    ];
  }

  private generateContingencyPlans(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    return [
      'Plan for market downturn scenarios',
      'Prepare for extended time on market',
      'Consider price reduction strategies',
      'Develop alternative marketing approaches',
      'Plan for property improvement investments'
    ];
  }

  private generateDecisionRecommendation(metrics: any, recommendation: string): string {
    return `Based on the analysis, the recommendation is to ${recommendation.toLowerCase()}. The property shows ${metrics.pricePerSquareFoot.toFixed(2)} per square foot pricing with ${metrics.overUnderPricedPercentage > 0 ? 'above' : 'below'} market positioning.`;
  }

  private generatePresentationPoints(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    return [
      `Price per square foot: $${metrics.pricePerSquareFoot.toFixed(2)}`,
      `Market position: ${metrics.marketPosition}`,
      `Price percentile: ${metrics.pricePercentile.toFixed(0)}%`,
      `Estimated value: $${metrics.estimatedValue.toLocaleString()}`,
      `Risk score: ${(metrics.riskScore * 100).toFixed(0)}%`,
      `Market condition: ${inputs.marketCondition}`
    ];
  }

  private generateDecisionFactors(inputs: PricePerSquareFootInputs, metrics: any): string[] {
    return [
      'Price per square foot analysis',
      'Comparable sales comparison',
      'Market condition assessment',
      'Property condition evaluation',
      'Location and amenity factors',
      'Risk and performance metrics'
    ];
  }
}