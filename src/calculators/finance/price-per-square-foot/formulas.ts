import { PricePerSquareFootInputs } from './validation';

export interface PricePerSquareFootResult {
  pricePerSquareFoot: number;
  marketComparison: {
    averageMarketPrice: number;
    medianMarketPrice: number;
    priceDifference: number;
    priceDifferencePercentage: number;
    marketPosition: string;
    priceRanking: string;
  };
  valuationAnalysis: {
    estimatedValue: number;
    valueRange: {
      low: number;
      high: number;
    };
    confidenceLevel: string;
    valuationFactors: string[];
    adjustmentFactors: {
      condition: number;
      features: number;
      location: number;
      age: number;
      total: number;
    };
  };
  comparableAnalysis: {
    comparableProperties: any[];
    averageComparablePrice: number;
    medianComparablePrice: number;
    priceVariance: number;
    comparableCount: number;
    priceRange: {
      min: number;
      max: number;
    };
  };
  marketTrends: {
    trendDirection: string;
    trendStrength: string;
    priceChange: number;
    priceChangePercentage: number;
    marketVelocity: string;
    daysOnMarketAnalysis: string;
  };
  roiAnalysis: {
    potentialROI: number;
    cashOnCashReturn: number;
    capRate: number;
    appreciationPotential: number;
    investmentScore: string;
    roiFactors: string[];
  };
  rentalAnalysis: {
    rentalYield: number;
    grossRentMultiplier: number;
    netOperatingIncome: number;
    cashFlow: number;
    breakEvenRent: number;
    rentalScore: string;
  };
  priceRecommendations: string[];
  marketInsights: string[];
  propertyScore: {
    overallScore: number;
    scoreBreakdown: {
      location: number;
      condition: number;
      features: number;
      marketPosition: number;
      investment: number;
    };
    rating: string;
    strengths: string[];
    weaknesses: string[];
  };
  investmentMetrics: {
    priceToRentRatio: number;
    priceToIncomeRatio: number;
    affordabilityIndex: number;
    investmentGrade: string;
    riskLevel: string;
    marketTiming: string;
  };
  costBreakdown: {
    pricePerBedroom: number;
    pricePerBathroom: number;
    pricePerAcre: number;
    monthlyCost: number;
    annualCost: number;
    costEfficiency: string;
  };
}

export const calculatePricePerSquareFoot = (inputs: PricePerSquareFootInputs): PricePerSquareFootResult => {
  // Basic calculations
  const propertyPrice = inputs.propertyPrice || 0;
  const totalSquareFootage = inputs.totalSquareFootage || 0;
  const propertyType = inputs.propertyType || 'single_family';
  const bedrooms = inputs.bedrooms || 0;
  const bathrooms = inputs.bathrooms || 0;
  const yearBuilt = inputs.yearBuilt || 0;
  const lotSize = inputs.lotSize || 0;
  const condition = inputs.condition || 'good';
  const features = inputs.features || [];
  const averageMarketPrice = inputs.averageMarketPrice || 0;
  const medianMarketPrice = inputs.medianMarketPrice || 0;
  const marketTrend = inputs.marketTrend || 'stable';
  const daysOnMarket = inputs.daysOnMarket || 0;
  const propertyTaxes = inputs.propertyTaxes || 0;
  const hoaFees = inputs.hoaFees || 0;
  const utilities = inputs.utilities || 0;
  const rentalIncome = inputs.rentalIncome || 0;

  // Calculate price per square foot
  const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;

  // Market comparison analysis
  const priceDifference = averageMarketPrice > 0 ? pricePerSquareFoot - averageMarketPrice : 0;
  const priceDifferencePercentage = averageMarketPrice > 0 ? (priceDifference / averageMarketPrice) * 100 : 0;
  
  let marketPosition = 'Unknown';
  if (averageMarketPrice > 0) {
    if (priceDifferencePercentage > 20) {
      marketPosition = 'Significantly Above Market';
    } else if (priceDifferencePercentage > 10) {
      marketPosition = 'Above Market';
    } else if (priceDifferencePercentage > -10) {
      marketPosition = 'At Market';
    } else if (priceDifferencePercentage > -20) {
      marketPosition = 'Below Market';
    } else {
      marketPosition = 'Significantly Below Market';
    }
  }

  let priceRanking = 'Unknown';
  if (medianMarketPrice > 0) {
    if (pricePerSquareFoot > medianMarketPrice * 1.2) {
      priceRanking = 'Premium';
    } else if (pricePerSquareFoot > medianMarketPrice * 1.1) {
      priceRanking = 'Above Average';
    } else if (pricePerSquareFoot > medianMarketPrice * 0.9) {
      priceRanking = 'Average';
    } else if (pricePerSquareFoot > medianMarketPrice * 0.8) {
      priceRanking = 'Below Average';
    } else {
      priceRanking = 'Value';
    }
  }

  // Valuation analysis
  const currentYear = new Date().getFullYear();
  const propertyAge = yearBuilt > 0 ? currentYear - yearBuilt : 0;
  
  // Adjustment factors
  const conditionAdjustments = {
    excellent: 1.15,
    very_good: 1.08,
    good: 1.0,
    fair: 0.92,
    poor: 0.85,
    needs_work: 0.78
  };
  
  const conditionAdjustment = conditionAdjustments[condition] || 1.0;
  
  // Feature adjustments
  const featureAdjustments = {
    pool: 0.05,
    garage: 0.03,
    basement: 0.04,
    fireplace: 0.02,
    hardwood_floors: 0.03,
    granite_countertops: 0.02,
    stainless_steel_appliances: 0.01,
    updated_kitchen: 0.04,
    updated_bathrooms: 0.03,
    energy_efficient: 0.03,
    smart_home: 0.02,
    mountain_view: 0.08,
    ocean_view: 0.15,
    city_view: 0.05,
    garden: 0.02,
    deck: 0.02,
    fenced_yard: 0.01,
    central_air: 0.02,
    central_heat: 0.02,
    walk_in_closet: 0.01
  };
  
  const featureAdjustment = features.reduce((total, feature) => {
    return total + (featureAdjustments[feature] || 0);
  }, 0);
  
  // Age adjustment
  const ageAdjustment = propertyAge > 0 ? Math.max(0.7, 1 - (propertyAge * 0.002)) : 1.0;
  
  // Location adjustment (placeholder - would need market data)
  const locationAdjustment = 1.0;
  
  const totalAdjustment = conditionAdjustment + featureAdjustment + ageAdjustment + locationAdjustment - 3;
  
  const estimatedValue = averageMarketPrice > 0 ? 
    averageMarketPrice * totalSquareFootage * (1 + totalAdjustment) : 
    propertyPrice;
  
  const valueRange = {
    low: estimatedValue * 0.95,
    high: estimatedValue * 1.05
  };
  
  let confidenceLevel = 'Medium';
  if (averageMarketPrice > 0 && medianMarketPrice > 0 && inputs.marketData && inputs.marketData.length > 5) {
    confidenceLevel = 'High';
  } else if (averageMarketPrice > 0 || medianMarketPrice > 0) {
    confidenceLevel = 'Medium';
  } else {
    confidenceLevel = 'Low';
  }

  // Comparable analysis
  const comparableProperties = inputs.marketData || [];
  const comparablePrices = comparableProperties.map(prop => prop.pricePerSquareFoot || 0).filter(price => price > 0);
  const averageComparablePrice = comparablePrices.length > 0 ? 
    comparablePrices.reduce((sum, price) => sum + price, 0) / comparablePrices.length : 0;
  const medianComparablePrice = comparablePrices.length > 0 ? 
    comparablePrices.sort((a, b) => a - b)[Math.floor(comparablePrices.length / 2)] : 0;
  
  const priceVariance = averageComparablePrice > 0 ? 
    Math.abs(pricePerSquareFoot - averageComparablePrice) / averageComparablePrice * 100 : 0;
  
  const priceRange = comparablePrices.length > 0 ? {
    min: Math.min(...comparablePrices),
    max: Math.max(...comparablePrices)
  } : { min: 0, max: 0 };

  // Market trends analysis
  let trendDirection = 'Unknown';
  let trendStrength = 'Unknown';
  let priceChange = 0;
  let priceChangePercentage = 0;
  let marketVelocity = 'Unknown';
  
  if (inputs.priceHistory && inputs.priceHistory.length > 1) {
    const sortedHistory = inputs.priceHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstPrice = sortedHistory[0].price;
    const lastPrice = sortedHistory[sortedHistory.length - 1].price;
    priceChange = lastPrice - firstPrice;
    priceChangePercentage = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
    
    if (priceChangePercentage > 5) {
      trendDirection = 'Increasing';
      trendStrength = priceChangePercentage > 15 ? 'Strong' : 'Moderate';
    } else if (priceChangePercentage < -5) {
      trendDirection = 'Decreasing';
      trendStrength = priceChangePercentage < -15 ? 'Strong' : 'Moderate';
    } else {
      trendDirection = 'Stable';
      trendStrength = 'Weak';
    }
  }
  
  let daysOnMarketAnalysis = 'Unknown';
  if (daysOnMarket > 0) {
    if (daysOnMarket < 30) {
      daysOnMarketAnalysis = 'Fast Moving Market';
    } else if (daysOnMarket < 60) {
      daysOnMarketAnalysis = 'Normal Market';
    } else if (daysOnMarket < 90) {
      daysOnMarketAnalysis = 'Slow Market';
    } else {
      daysOnMarketAnalysis = 'Stagnant Market';
    }
  }

  // ROI analysis
  const potentialROI = rentalIncome > 0 ? (rentalIncome * 12) / propertyPrice * 100 : 0;
  const cashOnCashReturn = rentalIncome > 0 ? 
    ((rentalIncome * 12) - propertyTaxes - (hoaFees * 12) - (utilities * 12)) / propertyPrice * 100 : 0;
  const capRate = rentalIncome > 0 ? 
    ((rentalIncome * 12) - propertyTaxes - (hoaFees * 12) - (utilities * 12)) / propertyPrice * 100 : 0;
  
  let appreciationPotential = 0;
  if (marketTrend === 'appreciating') {
    appreciationPotential = 5;
  } else if (marketTrend === 'stable') {
    appreciationPotential = 2;
  } else if (marketTrend === 'declining') {
    appreciationPotential = -2;
  }
  
  let investmentScore = 'Unknown';
  if (potentialROI > 8) {
    investmentScore = 'Excellent';
  } else if (potentialROI > 6) {
    investmentScore = 'Good';
  } else if (potentialROI > 4) {
    investmentScore = 'Fair';
  } else {
    investmentScore = 'Poor';
  }

  // Rental analysis
  const rentalYield = rentalIncome > 0 ? (rentalIncome * 12) / propertyPrice * 100 : 0;
  const grossRentMultiplier = rentalIncome > 0 ? propertyPrice / (rentalIncome * 12) : 0;
  const netOperatingIncome = rentalIncome > 0 ? 
    (rentalIncome * 12) - propertyTaxes - (hoaFees * 12) - (utilities * 12) : 0;
  const cashFlow = netOperatingIncome;
  const breakEvenRent = propertyTaxes / 12 + hoaFees + utilities;
  
  let rentalScore = 'Unknown';
  if (rentalYield > 8) {
    rentalScore = 'Excellent';
  } else if (rentalYield > 6) {
    rentalScore = 'Good';
  } else if (rentalYield > 4) {
    rentalScore = 'Fair';
  } else {
    rentalScore = 'Poor';
  }

  // Generate price recommendations
  const priceRecommendations: string[] = [];
  
  if (priceDifferencePercentage > 20) {
    priceRecommendations.push('Consider reducing price by 10-15% to align with market');
  } else if (priceDifferencePercentage > 10) {
    priceRecommendations.push('Price is above market - consider minor adjustments');
  } else if (priceDifferencePercentage < -20) {
    priceRecommendations.push('Property may be underpriced - consider market value');
  } else if (priceDifferencePercentage < -10) {
    priceRecommendations.push('Good value proposition for buyers');
  }
  
  if (daysOnMarket > 90) {
    priceRecommendations.push('Extended days on market suggest price adjustment needed');
  }
  
  if (rentalYield > 8) {
    priceRecommendations.push('Strong rental potential - attractive for investors');
  }

  // Generate market insights
  const marketInsights: string[] = [];
  
  if (marketTrend === 'appreciating') {
    marketInsights.push('Market is appreciating - good time to buy');
  } else if (marketTrend === 'declining') {
    marketInsights.push('Market is declining - consider waiting or negotiating');
  }
  
  if (daysOnMarket < 30) {
    marketInsights.push('Fast-moving market - properties selling quickly');
  } else if (daysOnMarket > 90) {
    marketInsights.push('Slow market - buyers have more negotiating power');
  }
  
  if (priceVariance < 10) {
    marketInsights.push('Low price variance indicates stable market');
  } else {
    marketInsights.push('High price variance indicates market volatility');
  }

  // Property scoring
  const locationScore = 75; // Placeholder - would need market data
  const conditionScore = conditionAdjustments[condition] * 100 || 75;
  const featuresScore = Math.min(100, 75 + (featureAdjustment * 100));
  const marketPositionScore = priceDifferencePercentage > 0 ? 
    Math.max(50, 100 - (priceDifferencePercentage * 2)) : 
    Math.min(100, 100 + (priceDifferencePercentage * 2));
  const investmentScore = Math.min(100, potentialROI * 10);
  
  const overallScore = (locationScore + conditionScore + featuresScore + marketPositionScore + investmentScore) / 5;
  
  let rating = 'Unknown';
  if (overallScore >= 90) {
    rating = 'Excellent';
  } else if (overallScore >= 80) {
    rating = 'Very Good';
  } else if (overallScore >= 70) {
    rating = 'Good';
  } else if (overallScore >= 60) {
    rating = 'Fair';
  } else {
    rating = 'Poor';
  }

  // Investment metrics
  const priceToRentRatio = rentalIncome > 0 ? propertyPrice / (rentalIncome * 12) : 0;
  const priceToIncomeRatio = 0; // Would need income data
  const affordabilityIndex = 0; // Would need income data
  
  let investmentGrade = 'Unknown';
  if (capRate > 8) {
    investmentGrade = 'A';
  } else if (capRate > 6) {
    investmentGrade = 'B';
  } else if (capRate > 4) {
    investmentGrade = 'C';
  } else {
    investmentGrade = 'D';
  }
  
  let riskLevel = 'Unknown';
  if (priceVariance < 10 && marketTrend === 'stable') {
    riskLevel = 'Low';
  } else if (priceVariance < 20 && marketTrend !== 'volatile') {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }
  
  let marketTiming = 'Unknown';
  if (marketTrend === 'appreciating' && daysOnMarket < 60) {
    marketTiming = 'Good';
  } else if (marketTrend === 'declining' && daysOnMarket > 90) {
    marketTiming = 'Poor';
  } else {
    marketTiming = 'Neutral';
  }

  // Cost breakdown
  const pricePerBedroom = bedrooms > 0 ? propertyPrice / bedrooms : 0;
  const pricePerBathroom = bathrooms > 0 ? propertyPrice / bathrooms : 0;
  const pricePerAcre = lotSize > 0 ? propertyPrice / (lotSize / 43560) : 0; // Convert sq ft to acres
  const monthlyCost = (propertyTaxes / 12) + hoaFees + utilities;
  const annualCost = propertyTaxes + (hoaFees * 12) + (utilities * 12);
  
  let costEfficiency = 'Unknown';
  if (pricePerSquareFoot < averageMarketPrice * 0.9) {
    costEfficiency = 'Very Efficient';
  } else if (pricePerSquareFoot < averageMarketPrice) {
    costEfficiency = 'Efficient';
  } else if (pricePerSquareFoot < averageMarketPrice * 1.1) {
    costEfficiency = 'Average';
  } else {
    costEfficiency = 'Inefficient';
  }

  return {
    pricePerSquareFoot,
    marketComparison: {
      averageMarketPrice,
      medianMarketPrice,
      priceDifference,
      priceDifferencePercentage,
      marketPosition,
      priceRanking
    },
    valuationAnalysis: {
      estimatedValue,
      valueRange,
      confidenceLevel,
      valuationFactors: [
        `Condition adjustment: ${((conditionAdjustment - 1) * 100).toFixed(1)}%`,
        `Feature adjustment: ${(featureAdjustment * 100).toFixed(1)}%`,
        `Age adjustment: ${((ageAdjustment - 1) * 100).toFixed(1)}%`,
        `Location adjustment: ${((locationAdjustment - 1) * 100).toFixed(1)}%`
      ],
      adjustmentFactors: {
        condition: conditionAdjustment,
        features: featureAdjustment,
        location: locationAdjustment,
        age: ageAdjustment,
        total: totalAdjustment
      }
    },
    comparableAnalysis: {
      comparableProperties,
      averageComparablePrice,
      medianComparablePrice,
      priceVariance,
      comparableCount: comparableProperties.length,
      priceRange
    },
    marketTrends: {
      trendDirection,
      trendStrength,
      priceChange,
      priceChangePercentage,
      marketVelocity: daysOnMarketAnalysis,
      daysOnMarketAnalysis
    },
    roiAnalysis: {
      potentialROI,
      cashOnCashReturn,
      capRate,
      appreciationPotential,
      investmentScore,
      roiFactors: [
        `Rental yield: ${rentalYield.toFixed(2)}%`,
        `Cash-on-cash return: ${cashOnCashReturn.toFixed(2)}%`,
        `Cap rate: ${capRate.toFixed(2)}%`,
        `Appreciation potential: ${appreciationPotential.toFixed(1)}%`
      ]
    },
    rentalAnalysis: {
      rentalYield,
      grossRentMultiplier,
      netOperatingIncome,
      cashFlow,
      breakEvenRent,
      rentalScore
    },
    priceRecommendations,
    marketInsights,
    propertyScore: {
      overallScore,
      scoreBreakdown: {
        location: locationScore,
        condition: conditionScore,
        features: featuresScore,
        marketPosition: marketPositionScore,
        investment: investmentScore
      },
      rating,
      strengths: features.map(feature => `Has ${feature.replace('_', ' ')}`),
      weaknesses: []
    },
    investmentMetrics: {
      priceToRentRatio,
      priceToIncomeRatio,
      affordabilityIndex,
      investmentGrade,
      riskLevel,
      marketTiming
    },
    costBreakdown: {
      pricePerBedroom,
      pricePerBathroom,
      pricePerAcre,
      monthlyCost,
      annualCost,
      costEfficiency
    }
  };
};

export const generatePricePerSquareFootAnalysis = (inputs: PricePerSquareFootInputs, outputs: PricePerSquareFootResult): string => {
  const analysis = `# Price Per Square Foot Analysis

## Summary
**Price Per Square Foot:** $${outputs.pricePerSquareFoot.toFixed(2)}
**Property Price:** $${inputs.propertyPrice.toLocaleString()}
**Total Square Footage:** ${inputs.totalSquareFootage.toLocaleString()} sq ft
**Property Type:** ${inputs.propertyType.replace('_', ' ')}
**Market Position:** ${outputs.marketComparison.marketPosition}

## Key Metrics
- **Property Price:** $${inputs.propertyPrice.toLocaleString()}
- **Total Square Footage:** ${inputs.totalSquareFootage.toLocaleString()} sq ft
- **Price Per Square Foot:** $${outputs.pricePerSquareFoot.toFixed(2)}
- **Property Type:** ${inputs.propertyType.replace('_', ' ')}
- **Location:** ${inputs.location || 'Not specified'}
- **Bedrooms:** ${inputs.bedrooms || 'Not specified'}
- **Bathrooms:** ${inputs.bathrooms || 'Not specified'}
- **Year Built:** ${inputs.yearBuilt || 'Not specified'}

## Market Comparison
- **Average Market Price:** $${outputs.marketComparison.averageMarketPrice.toFixed(2)}/sq ft
- **Median Market Price:** $${outputs.marketComparison.medianMarketPrice.toFixed(2)}/sq ft
- **Price Difference:** $${outputs.marketComparison.priceDifference.toFixed(2)}
- **Price Difference Percentage:** ${outputs.marketComparison.priceDifferencePercentage.toFixed(1)}%
- **Market Position:** ${outputs.marketComparison.marketPosition}
- **Price Ranking:** ${outputs.marketComparison.priceRanking}

## Valuation Analysis
- **Estimated Value:** $${outputs.valuationAnalysis.estimatedValue.toLocaleString()}
- **Value Range:** $${outputs.valuationAnalysis.valueRange.low.toLocaleString()} - $${outputs.valuationAnalysis.valueRange.high.toLocaleString()}
- **Confidence Level:** ${outputs.valuationAnalysis.confidenceLevel}

### Valuation Factors
${outputs.valuationAnalysis.valuationFactors.map(factor => `- ${factor}`).join('\n')}

## Comparable Analysis
- **Comparable Properties:** ${outputs.comparableAnalysis.comparableCount}
- **Average Comparable Price:** $${outputs.comparableAnalysis.averageComparablePrice.toFixed(2)}/sq ft
- **Median Comparable Price:** $${outputs.comparableAnalysis.medianComparablePrice.toFixed(2)}/sq ft
- **Price Variance:** ${outputs.comparableAnalysis.priceVariance.toFixed(1)}%
- **Price Range:** $${outputs.comparableAnalysis.priceRange.min.toFixed(2)} - $${outputs.comparableAnalysis.priceRange.max.toFixed(2)}/sq ft

## Market Trends
- **Trend Direction:** ${outputs.marketTrends.trendDirection}
- **Trend Strength:** ${outputs.marketTrends.trendStrength}
- **Price Change:** $${outputs.marketTrends.priceChange.toFixed(2)}
- **Price Change Percentage:** ${outputs.marketTrends.priceChangePercentage.toFixed(1)}%
- **Market Velocity:** ${outputs.marketTrends.marketVelocity}
- **Days on Market Analysis:** ${outputs.marketTrends.daysOnMarketAnalysis}

## ROI Analysis
- **Potential ROI:** ${outputs.roiAnalysis.potentialROI.toFixed(2)}%
- **Cash-on-Cash Return:** ${outputs.roiAnalysis.cashOnCashReturn.toFixed(2)}%
- **Cap Rate:** ${outputs.roiAnalysis.capRate.toFixed(2)}%
- **Appreciation Potential:** ${outputs.roiAnalysis.appreciationPotential.toFixed(1)}%
- **Investment Score:** ${outputs.roiAnalysis.investmentScore}

### ROI Factors
${outputs.roiAnalysis.roiFactors.map(factor => `- ${factor}`).join('\n')}

## Rental Analysis
- **Rental Yield:** ${outputs.rentalAnalysis.rentalYield.toFixed(2)}%
- **Gross Rent Multiplier:** ${outputs.rentalAnalysis.grossRentMultiplier.toFixed(2)}
- **Net Operating Income:** $${outputs.rentalAnalysis.netOperatingIncome.toLocaleString()}
- **Cash Flow:** $${outputs.rentalAnalysis.cashFlow.toLocaleString()}
- **Break-Even Rent:** $${outputs.rentalAnalysis.breakEvenRent.toFixed(2)}/month
- **Rental Score:** ${outputs.rentalAnalysis.rentalScore}

## Price Recommendations
${outputs.priceRecommendations.map(rec => `- ${rec}`).join('\n')}

## Market Insights
${outputs.marketInsights.map(insight => `- ${insight}`).join('\n')}

## Property Score
- **Overall Score:** ${outputs.propertyScore.overallScore.toFixed(1)}/100
- **Rating:** ${outputs.propertyScore.rating}

### Score Breakdown
- **Location:** ${outputs.propertyScore.scoreBreakdown.location.toFixed(1)}/100
- **Condition:** ${outputs.propertyScore.scoreBreakdown.condition.toFixed(1)}/100
- **Features:** ${outputs.propertyScore.scoreBreakdown.features.toFixed(1)}/100
- **Market Position:** ${outputs.propertyScore.scoreBreakdown.marketPosition.toFixed(1)}/100
- **Investment:** ${outputs.propertyScore.scoreBreakdown.investment.toFixed(1)}/100

### Strengths
${outputs.propertyScore.strengths.map(strength => `- ${strength}`).join('\n')}

## Investment Metrics
- **Price-to-Rent Ratio:** ${outputs.investmentMetrics.priceToRentRatio.toFixed(2)}
- **Price-to-Income Ratio:** ${outputs.investmentMetrics.priceToIncomeRatio.toFixed(2)}
- **Affordability Index:** ${outputs.investmentMetrics.affordabilityIndex.toFixed(2)}
- **Investment Grade:** ${outputs.investmentMetrics.investmentGrade}
- **Risk Level:** ${outputs.investmentMetrics.riskLevel}
- **Market Timing:** ${outputs.investmentMetrics.marketTiming}

## Cost Breakdown
- **Price Per Bedroom:** $${outputs.costBreakdown.pricePerBedroom.toLocaleString()}
- **Price Per Bathroom:** $${outputs.costBreakdown.pricePerBathroom.toLocaleString()}
- **Price Per Acre:** $${outputs.costBreakdown.pricePerAcre.toLocaleString()}
- **Monthly Cost:** $${outputs.costBreakdown.monthlyCost.toFixed(2)}
- **Annual Cost:** $${outputs.costBreakdown.annualCost.toLocaleString()}
- **Cost Efficiency:** ${outputs.costBreakdown.costEfficiency}

## Property Details
- **Condition:** ${inputs.condition || 'Not specified'}
- **Lot Size:** ${inputs.lotSize ? `${inputs.lotSize.toLocaleString()} sq ft` : 'Not specified'}
- **Days on Market:** ${inputs.daysOnMarket || 'Not specified'}
- **Annual Property Taxes:** $${inputs.propertyTaxes || 0}
- **HOA Fees:** $${inputs.hoaFees || 0}/month
- **Monthly Utilities:** $${inputs.utilities || 0}
- **Potential Rental Income:** $${inputs.rentalIncome || 0}/month

## Special Features
${inputs.features && inputs.features.length > 0 ? 
  inputs.features.map(feature => `- ${feature.replace('_', ' ')}`).join('\n') : 
  '- No special features specified'}

---
*This analysis provides a comprehensive view of property pricing and market positioning. Always consult with real estate professionals for specific market advice.*`;

  return analysis;
};