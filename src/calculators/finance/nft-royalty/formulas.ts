import { NFTRoyaltyInputs, NFTRoyaltyOutputs, NFTRoyaltyMetrics, MarketplaceComparison } from './types';

export function calculateNFTRoyaltyProfitability(inputs: NFTRoyaltyInputs): NFTRoyaltyOutputs {
  const metrics = calculateDetailedMetrics(inputs);
  
  return {
    royaltyPerSale: metrics.royaltyPerSale,
    monthlyRoyalties: metrics.monthlyRoyalties,
    yearlyRoyalties: metrics.yearlyRoyalties,
    totalLifetimeRoyalties: metrics.totalLifetimeRoyalties,
    breakEvenMonths: metrics.breakEvenMonths,
    marketplaceComparison: metrics.marketplaceComparison,
    optimalMarketplace: metrics.optimalMarketplace,
    conservativeGrowth: metrics.conservativeGrowth,
    moderateGrowth: metrics.moderateGrowth,
    optimisticGrowth: metrics.optimisticGrowth,
    primarySales: metrics.primarySales,
    secondarySales: metrics.secondarySales,
    totalRevenue: metrics.totalRevenue,
    roi: metrics.roi,
    efficiencyRating: metrics.efficiencyRating,
    riskLevel: metrics.riskLevel,
    report: generateNFTRoyaltyReport(inputs, metrics)
  };
}

function calculateDetailedMetrics(inputs: NFTRoyaltyInputs): NFTRoyaltyMetrics {
  const {
    collectionSize,
    mintPrice,
    royaltyPercentage,
    averageResalePrice,
    monthlyTrades,
    floorPrice,
    marketplace,
    customMarketplaceFee = 2.5,
    collectionType,
    priceAppreciation = 20,
    tradingVolumeGrowth = 30,
    activePeriod = 5,
    includePrimarySales = true,
    includeSecondarySales = true,
    includeUtilityRevenue = false,
    utilityRevenue = 0
  } = inputs;

  // Marketplace configurations
  const marketplaces = {
    opensea: { name: 'OpenSea', fee: 2.5, marketShare: 45 },
    blur: { name: 'Blur', fee: 0.5, marketShare: 25 },
    looksrare: { name: 'LooksRare', fee: 2.0, marketShare: 8 },
    x2y2: { name: 'X2Y2', fee: 0.5, marketShare: 5 },
    foundation: { name: 'Foundation', fee: 5.0, marketShare: 3 },
    superrare: { name: 'SuperRare', fee: 3.0, marketShare: 2 },
    rarible: { name: 'Rarible', fee: 2.5, marketShare: 7 },
    'magic-eden': { name: 'Magic Eden', fee: 2.0, marketShare: 5 },
    custom: { name: 'Custom', fee: customMarketplaceFee, marketShare: 0 }
  };

  // Collection type multipliers
  const typeMultipliers = {
    pfp: 1.0,
    art: 1.5,
    gaming: 1.2,
    utility: 0.8,
    music: 1.3,
    photography: 1.1,
    generative: 1.0,
    metaverse: 1.4,
    collectibles: 1.1,
    custom: 1.0
  };

  const typeMultiplier = typeMultipliers[collectionType];
  const selectedMarketplace = marketplaces[marketplace];
  const marketplaceFee = selectedMarketplace.fee;

  // Basic royalty calculations
  const royaltyPerSale = (averageResalePrice * royaltyPercentage) / 100;
  const netRoyaltyRate = royaltyPerSale * (1 - marketplaceFee / 100);
  const monthlyRoyalties = netRoyaltyRate * monthlyTrades;
  const yearlyRoyalties = monthlyRoyalties * 12;

  // Growth and appreciation factors
  const appreciationFactor = Math.pow(1 + priceAppreciation / 100, activePeriod);
  const volumeGrowthFactor = Math.pow(1 + tradingVolumeGrowth / 100, activePeriod);

  // Lifetime projections
  const totalLifetimeRoyalties = yearlyRoyalties * activePeriod * appreciationFactor * volumeGrowthFactor * typeMultiplier;

  // Revenue breakdown
  const primarySales = includePrimarySales ? collectionSize * mintPrice : 0;
  const secondarySales = includeSecondarySales ? monthlyTrades * 12 * averageResalePrice : 0;
  const utilityRevenueProjection = includeUtilityRevenue ? utilityRevenue * 12 * activePeriod : 0;
  const totalRevenue = primarySales + totalLifetimeRoyalties + utilityRevenueProjection;

  // Development costs estimation (based on collection size and complexity)
  const baseDevelopmentCost = Math.min(collectionSize * 5, 50000); // $5 per NFT, max $50k
  const typeComplexityMultiplier = {
    pfp: 1.0, art: 2.0, gaming: 1.8, utility: 1.5, music: 1.3,
    photography: 1.1, generative: 1.2, metaverse: 2.2, collectibles: 1.0, custom: 1.0
  }[collectionType];
  const totalDevelopmentCosts = baseDevelopmentCost * typeComplexityMultiplier;

  // Break-even calculation
  const breakEvenMonths = totalDevelopmentCosts > 0 ? totalDevelopmentCosts / (monthlyRoyalties + (utilityRevenue || 0)) : 0;

  // ROI calculation
  const roi = totalDevelopmentCosts > 0 ? ((totalRevenue - totalDevelopmentCosts) / totalDevelopmentCosts) * 100 : 0;

  // Marketplace comparison
  const marketplaceComparison: MarketplaceComparison[] = Object.entries(marketplaces).map(([key, mp]) => {
    const netRoyalty = royaltyPerSale * (1 - mp.fee / 100);
    const annualProjection = netRoyalty * monthlyTrades * 12 * (mp.marketShare / 100);
    return {
      marketplace: mp.name,
      fee: mp.fee,
      netRoyalty,
      annualProjection,
      marketShare: mp.marketShare
    };
  });

  // Find optimal marketplace
  const optimalMarketplace = marketplaceComparison.reduce((best, current) => 
    current.annualProjection > best.annualProjection ? current : best
  ).marketplace;

  // Growth scenarios
  const baseAnnual = yearlyRoyalties;
  const conservativeGrowth = baseAnnual * 1.5 * typeMultiplier; // 50% growth
  const moderateGrowth = baseAnnual * 3.0 * typeMultiplier;     // 200% growth
  const optimisticGrowth = baseAnnual * 6.0 * typeMultiplier;   // 500% growth

  // Risk assessment
  const riskScore = calculateRiskScore(inputs, {
    royaltyPercentage,
    averageResalePrice,
    mintPrice,
    monthlyTrades,
    collectionType,
    priceAppreciation
  });
  const riskLevel = assessRiskLevel(riskScore);

  // Efficiency metrics
  const efficiencyScore = calculateEfficiencyScore(roi, riskScore, typeMultiplier, marketplaceFee);
  const efficiencyRating = assessEfficiencyRating(efficiencyScore);

  // Market factors
  const marketVolatility = calculateMarketVolatility(priceAppreciation, tradingVolumeGrowth);
  const competitionFactor = calculateCompetitionFactor(collectionType, royaltyPercentage);

  // Trading volume projection
  const tradingVolumeProjection = monthlyTrades * 12 * volumeGrowthFactor;

  return {
    royaltyPerSale,
    monthlyRoyalties,
    yearlyRoyalties,
    totalLifetimeRoyalties,
    breakEvenMonths,
    marketplaceComparison,
    optimalMarketplace,
    conservativeGrowth,
    moderateGrowth,
    optimisticGrowth,
    primarySales,
    secondarySales,
    totalRevenue,
    roi,
    efficiencyRating,
    riskLevel,
    typeMultiplier,
    appreciationFactor,
    volumeGrowthFactor,
    marketplaceFee,
    netRoyaltyRate,
    tradingVolumeProjection,
    utilityRevenueProjection,
    totalDevelopmentCosts,
    riskScore,
    efficiencyScore,
    marketVolatility,
    competitionFactor
  };
}

function calculateRiskScore(inputs: NFTRoyaltyInputs, factors: any): number {
  let score = 0;
  
  // Royalty percentage risk (higher = more risk)
  if (factors.royaltyPercentage > 10) score += 30;
  else if (factors.royaltyPercentage > 7.5) score += 20;
  else if (factors.royaltyPercentage > 5) score += 10;
  
  // Price sustainability risk
  const priceRatio = factors.averageResalePrice / factors.mintPrice;
  if (priceRatio < 0.5) score += 25; // Below mint price
  else if (priceRatio < 1) score += 15;
  else if (priceRatio > 10) score += 20; // Unsustainable high prices
  
  // Trading volume risk
  if (factors.monthlyTrades < 10) score += 20;
  else if (factors.monthlyTrades < 50) score += 10;
  
  // Collection type risk
  const typeRisk = {
    pfp: 15, art: 25, gaming: 20, utility: 10, music: 30,
    photography: 20, generative: 15, metaverse: 35, collectibles: 15, custom: 20
  }[factors.collectionType];
  score += typeRisk;
  
  // Price appreciation risk
  if (factors.priceAppreciation > 100) score += 25;
  else if (factors.priceAppreciation > 50) score += 15;
  else if (factors.priceAppreciation < 0) score += 20;
  
  return Math.min(score, 100);
}

function assessRiskLevel(riskScore: number): string {
  if (riskScore >= 80) return 'Very High';
  if (riskScore >= 60) return 'High';
  if (riskScore >= 40) return 'Medium';
  if (riskScore >= 20) return 'Low';
  return 'Very Low';
}

function calculateEfficiencyScore(roi: number, riskScore: number, typeMultiplier: number, marketplaceFee: number): number {
  const riskAdjustedROI = roi / Math.max(riskScore, 1);
  const typeBonus = typeMultiplier * 10;
  const feeEfficiency = (10 - marketplaceFee) * 5; // Lower fees = higher efficiency
  
  return Math.max(0, riskAdjustedROI + typeBonus + feeEfficiency);
}

function assessEfficiencyRating(efficiencyScore: number): string {
  if (efficiencyScore >= 80) return 'Excellent';
  if (efficiencyScore >= 60) return 'Very Good';
  if (efficiencyScore >= 40) return 'Good';
  if (efficiencyScore >= 20) return 'Fair';
  return 'Poor';
}

function calculateMarketVolatility(priceAppreciation: number, volumeGrowth: number): number {
  return Math.sqrt(Math.pow(priceAppreciation / 100, 2) + Math.pow(volumeGrowth / 100, 2)) * 100;
}

function calculateCompetitionFactor(collectionType: string, royaltyPercentage: number): number {
  const competitionLevels = {
    pfp: 0.9, art: 0.7, gaming: 0.8, utility: 0.6, music: 0.8,
    photography: 0.7, generative: 0.9, metaverse: 0.8, collectibles: 0.8, custom: 0.8
  };
  
  const baseCompetition = competitionLevels[collectionType as keyof typeof competitionLevels] || 0.8;
  const royaltyPenalty = Math.max(0, (royaltyPercentage - 5) * 0.02); // Penalty for high royalties
  
  return Math.max(0.1, baseCompetition - royaltyPenalty);
}

function generateNFTRoyaltyReport(inputs: NFTRoyaltyInputs, metrics: NFTRoyaltyMetrics): string {
  const {
    collectionSize,
    mintPrice,
    royaltyPercentage,
    averageResalePrice,
    monthlyTrades,
    marketplace,
    collectionType,
    activePeriod = 5
  } = inputs;

  const {
    royaltyPerSale,
    monthlyRoyalties,
    yearlyRoyalties,
    totalLifetimeRoyalties,
    breakEvenMonths,
    optimalMarketplace,
    primarySales,
    totalRevenue,
    roi,
    riskLevel,
    efficiencyRating,
    marketplaceComparison
  } = metrics;

  const collectionTypeNames = {
    pfp: 'PFP/Avatar',
    art: '1/1 Art',
    gaming: 'Gaming Assets',
    utility: 'Utility NFTs',
    music: 'Music NFTs',
    photography: 'Photography',
    generative: 'Generative Art',
    metaverse: 'Metaverse Assets',
    collectibles: 'Collectibles',
    custom: 'Custom'
  };

  return `# NFT Royalty & Revenue Analysis

## 📊 Collection Overview
- **Collection Size**: ${collectionSize.toLocaleString()} NFTs
- **Collection Type**: ${collectionTypeNames[collectionType]}
- **Mint Price**: $${mintPrice.toFixed(3)} per NFT
- **Royalty Rate**: ${royaltyPercentage}%
- **Primary Marketplace**: ${marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}

## 💰 Revenue Projections
- **Primary Sales**: $${primarySales.toLocaleString()}
- **Royalty Per Sale**: $${royaltyPerSale.toFixed(3)}
- **Monthly Royalties**: $${monthlyRoyalties.toLocaleString()}
- **Annual Royalties**: $${yearlyRoyalties.toLocaleString()}
- **Lifetime Royalties (${activePeriod} years)**: $${totalLifetimeRoyalties.toLocaleString()}

## 📈 Performance Metrics
- **Total Revenue**: $${totalRevenue.toLocaleString()}
- **ROI**: ${roi.toFixed(1)}%
- **Break-Even**: ${breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} months` : 'Immediate'}
- **Risk Level**: ${riskLevel}
- **Efficiency Rating**: ${efficiencyRating}

## 🏪 Marketplace Analysis
- **Optimal Marketplace**: ${optimalMarketplace}
- **Current Trading**: ${monthlyTrades} trades/month at $${averageResalePrice.toFixed(3)} avg

### Marketplace Comparison:
${marketplaceComparison.map(mp => 
  `- **${mp.marketplace}**: ${mp.fee}% fee, $${mp.netRoyalty.toFixed(3)} net royalty, $${mp.annualProjection.toLocaleString()} annual projection`
).join('\n')}

## 🎯 Key Insights
${generateInsights(inputs, metrics)}

## 📋 Recommendations
${generateRecommendations(inputs, metrics)}

## ⚠️ Risk Factors
${generateRiskFactors(inputs, metrics)}
`;
}

function generateInsights(inputs: NFTRoyaltyInputs, metrics: NFTRoyaltyMetrics): string {
  const insights = [];
  
  if (metrics.roi > 200) {
    insights.push("- **Excellent ROI Potential**: This collection shows exceptional return potential");
  }
  
  if (inputs.royaltyPercentage > 10) {
    insights.push("- **High Royalty Warning**: Royalty rate above 10% may discourage trading");
  }
  
  if (inputs.averageResalePrice < inputs.mintPrice) {
    insights.push("- **Price Sustainability**: Resale prices below mint indicate weak demand");
  }
  
  if (inputs.monthlyTrades > 1000) {
    insights.push("- **High Trading Volume**: Strong community engagement and liquidity");
  }
  
  if (metrics.breakEvenMonths < 6) {
    insights.push("- **Quick Break-Even**: Fast return on development investment");
  }
  
  if (metrics.efficiencyRating === 'Excellent') {
    insights.push("- **Optimal Efficiency**: Excellent risk-adjusted returns");
  }
  
  return insights.length > 0 ? insights.join('\n') : "- **Balanced Opportunity**: Standard NFT collection with moderate potential";
}

function generateRecommendations(inputs: NFTRoyaltyInputs, metrics: NFTRoyaltyMetrics): string {
  const recommendations = [];
  
  if (inputs.royaltyPercentage > 10) {
    recommendations.push("- **Lower Royalties**: Consider reducing royalty rate to 5-7.5% to encourage trading");
  }
  
  if (inputs.monthlyTrades < 50) {
    recommendations.push("- **Build Community**: Focus on community engagement to increase trading volume");
  }
  
  if (metrics.optimalMarketplace !== inputs.marketplace) {
    recommendations.push(`- **Switch Marketplace**: Consider moving to ${metrics.optimalMarketplace} for better returns`);
  }
  
  if (inputs.averageResalePrice < inputs.mintPrice) {
    recommendations.push("- **Add Utility**: Implement utility features to maintain floor price above mint");
  }
  
  if (metrics.riskLevel === 'High' || metrics.riskLevel === 'Very High') {
    recommendations.push("- **Risk Mitigation**: Diversify revenue streams and build sustainable utility");
  }
  
  recommendations.push("- **Multi-Platform Strategy**: List on multiple marketplaces to maximize exposure");
  recommendations.push("- **Community Engagement**: Regular updates and community events to maintain interest");
  
  return recommendations.join('\n');
}

function generateRiskFactors(inputs: NFTRoyaltyInputs, metrics: NFTRoyaltyMetrics): string {
  const risks = [];
  
  if (inputs.royaltyPercentage > 7.5) {
    risks.push("- **High Royalty Risk**: May reduce secondary market activity");
  }
  
  if (inputs.monthlyTrades < 20) {
    risks.push("- **Low Liquidity**: Limited trading activity may impact long-term sustainability");
  }
  
  if (inputs.priceAppreciation && inputs.priceAppreciation > 50) {
    risks.push("- **Unrealistic Growth**: High price appreciation assumptions may not materialize");
  }
  
  if (metrics.marketVolatility > 50) {
    risks.push("- **Market Volatility**: High volatility increases investment risk");
  }
  
  risks.push("- **Market Dependency**: NFT market conditions significantly impact returns");
  risks.push("- **Competition**: Increasing competition in NFT space");
  risks.push("- **Regulatory Risk**: Potential regulatory changes affecting NFT markets");
  
  return risks.join('\n');
}
