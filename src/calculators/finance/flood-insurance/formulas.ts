import { FloodInsuranceInputs, FloodInsuranceOutputs, FloodInsuranceMetrics, FloodInsuranceAnalysis } from './types';

export function calculateFloodInsurance(inputs: FloodInsuranceInputs): FloodInsuranceOutputs {
  // Calculate base premium based on flood zone
  const basePremium = calculateBasePremium(inputs);
  
  // Calculate coverage premium
  const coveragePremium = calculateCoveragePremium(inputs);
  
  // Calculate risk surcharge
  const riskSurcharge = calculateRiskSurcharge(inputs);
  
  // Calculate discounts
  const totalDiscounts = calculateDiscounts(inputs);
  
  // Calculate annual premium
  const annualPremium = basePremium + coveragePremium + riskSurcharge - totalDiscounts;
  const monthlyPremium = annualPremium / 12;
  const totalPremium = annualPremium * inputs.analysisPeriod;
  
  // Calculate premium metrics
  const premiumPerSquareFoot = annualPremium / inputs.propertySize;
  const premiumToValueRatio = (annualPremium / inputs.propertyValue) * 100;
  
  // Calculate coverage analysis
  const totalCoverage = inputs.buildingCoverage + inputs.contentsCoverage;
  const coverageGap = inputs.propertyValue - totalCoverage;
  const coverageAdequacy = (totalCoverage / inputs.propertyValue) * 100;
  const replacementCostCoverage = inputs.replacementCostValue ? (totalCoverage / inputs.replacementCostValue) * 100 : 0;
  
  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs);
  const floodRiskLevel = determineFloodRiskLevel(inputs.floodZone, riskScore);
  const probabilityOfFlood = calculateProbabilityOfFlood(inputs);
  const expectedLoss = inputs.propertyValue * (probabilityOfFlood / 100) * 0.3; // Assume 30% loss severity
  
  // Calculate cost analysis
  const totalCost = totalPremium;
  const costPerYear = annualPremium;
  const costPerMonth = monthlyPremium;
  const costEffectiveness = expectedLoss > 0 ? ((expectedLoss - annualPremium) / expectedLoss) * 100 : 0;
  
  // Calculate deductible analysis
  const totalDeductible = inputs.buildingDeductible + inputs.contentsDeductible;
  const deductibleImpact = calculateDeductibleImpact(inputs);
  const outOfPocketMaximum = totalDeductible;
  
  // Calculate policy efficiency
  const policyEfficiency = (coverageAdequacy + costEffectiveness) / 2;
  const coverageEfficiency = coverageAdequacy;
  const premiumEfficiency = 100 - premiumToValueRatio;
  
  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    annualPremium,
    totalCoverage,
    riskScore,
    floodRiskLevel,
    coverageAdequacy,
    costEffectiveness
  });
  
  // Calculate quality metrics
  const dataQuality = assessDataQuality(inputs);
  const modelAccuracy = assessModelAccuracy(inputs);
  const confidenceLevel = calculateConfidenceLevel(inputs, annualPremium);
  
  return {
    // Premium Analysis
    annualPremium,
    monthlyPremium,
    totalPremium,
    premiumPerSquareFoot,
    premiumToValueRatio,
    
    // Coverage Analysis
    totalCoverage,
    coverageGap,
    coverageAdequacy,
    replacementCostCoverage,
    
    // Risk Analysis
    floodRiskLevel,
    riskScore,
    probabilityOfFlood,
    expectedLoss,
    
    // Cost Analysis
    totalCost,
    costPerYear,
    costPerMonth,
    costEffectiveness,
    
    // Deductible Analysis
    totalDeductible,
    deductibleImpact,
    outOfPocketMaximum,
    
    // Policy Analysis
    policyEfficiency,
    coverageEfficiency,
    premiumEfficiency,
    
    // Analysis
    analysis,
    
    // Additional Output Metrics
    dataQuality,
    modelAccuracy,
    confidenceLevel,
    
    // Time Series Analysis
    premiumProjections: generatePremiumProjections(inputs, annualPremium),
    
    // Scenario Analysis
    scenarioAnalysis: generateScenarioAnalysis(inputs, annualPremium),
    
    // Comparative Analysis
    comparativeAnalysis: generateComparativeAnalysis(inputs, annualPremium, coverageAdequacy),
    
    // Risk Metrics
    riskMetrics: generateRiskMetrics(inputs, riskScore),
    
    // Financial Projections
    financialProjections: generateFinancialProjections(inputs, annualPremium),
    
    // Policy Timeline
    policyTimeline: generatePolicyTimeline(inputs),
    
    // Coverage Checklist
    coverageChecklist: generateCoverageChecklist(inputs),
    
    // Risk Mitigation Plan
    riskMitigationPlan: generateRiskMitigationPlan(inputs),
    
    // Policy Optimization
    policyOptimization: generatePolicyOptimization(inputs, annualPremium),
    
    // Claims History
    claimsHistory: generateClaimsHistory(inputs),
    
    // Market Analysis
    marketAnalysis: generateMarketAnalysis(inputs, annualPremium),
    
    // Performance Tracking
    performanceTracking: generatePerformanceTracking(inputs)
  };
}

function calculateBasePremium(inputs: FloodInsuranceInputs): number {
  let basePremium = 0;
  
  // Base premium by flood zone
  switch (inputs.floodZone) {
    case 'A':
    case 'AE':
    case 'AH':
    case 'AO':
    case 'AR':
    case 'A99':
      basePremium = 1000;
      break;
    case 'V':
    case 'VE':
      basePremium = 1500;
      break;
    case 'B':
    case 'C':
    case 'X':
      basePremium = 500;
      break;
    case 'D':
    case 'M':
    case 'P':
      basePremium = 300;
      break;
    default:
      basePremium = 800;
  }
  
  // Adjust for property type
  switch (inputs.propertyType) {
    case 'single_family':
      basePremium *= 1.0;
      break;
    case 'multi_family':
      basePremium *= 1.2;
      break;
    case 'condo':
      basePremium *= 0.8;
      break;
    case 'commercial':
      basePremium *= 1.5;
      break;
    default:
      basePremium *= 1.0;
  }
  
  return basePremium;
}

function calculateCoveragePremium(inputs: FloodInsuranceInputs): number {
  let coveragePremium = 0;
  
  // Building coverage premium
  coveragePremium += inputs.buildingCoverage * 0.001; // 0.1% of building coverage
  
  // Contents coverage premium
  coveragePremium += inputs.contentsCoverage * 0.002; // 0.2% of contents coverage
  
  // Additional coverage premiums
  if (inputs.lossOfUse && inputs.lossOfUseLimit) {
    coveragePremium += inputs.lossOfUseLimit * 0.005;
  }
  
  if (inputs.ordinanceOrLaw && inputs.ordinanceOrLawLimit) {
    coveragePremium += inputs.ordinanceOrLawLimit * 0.003;
  }
  
  if (inputs.sewerBackup && inputs.sewerBackupLimit) {
    coveragePremium += inputs.sewerBackupLimit * 0.004;
  }
  
  return coveragePremium;
}

function calculateRiskSurcharge(inputs: FloodInsuranceInputs): number {
  let surcharge = 0;
  
  // Flood history surcharge
  if (inputs.floodHistory) {
    surcharge += 500;
  }
  
  // Claims history surcharge
  if (inputs.numberOfPreviousClaims > 0) {
    surcharge += inputs.numberOfPreviousClaims * 200;
  }
  
  // Elevation risk surcharge
  if (inputs.elevationRisk === 'high') {
    surcharge += 300;
  } else if (inputs.elevationRisk === 'medium') {
    surcharge += 150;
  }
  
  // Coastal location surcharge
  if (inputs.coastalLocation) {
    surcharge += 400;
  }
  
  // Construction type surcharge
  switch (inputs.constructionType) {
    case 'frame':
      surcharge += 100;
      break;
    case 'masonry':
      surcharge += 50;
      break;
    default:
      surcharge += 75;
  }
  
  return surcharge;
}

function calculateDiscounts(inputs: FloodInsuranceInputs): number {
  let totalDiscounts = 0;
  const basePremium = calculateBasePremium(inputs);
  
  // Multi-policy discount
  if (inputs.multiPolicyDiscount) {
    totalDiscounts += basePremium * 0.15;
  }
  
  // Claims-free discount
  if (inputs.claimsFreeDiscount && inputs.numberOfPreviousClaims === 0) {
    totalDiscounts += basePremium * 0.10;
  }
  
  // Protective device discount
  if (inputs.protectiveDeviceDiscount && inputs.floodVents) {
    totalDiscounts += basePremium * 0.05;
  }
  
  // Community discount
  if (inputs.communityDiscount && inputs.communityRatingSystem >= 7) {
    totalDiscounts += basePremium * 0.10;
  }
  
  // Elevation discount
  if (inputs.elevationDiscount && inputs.propertyElevation > inputs.baseFloodElevation) {
    totalDiscounts += basePremium * 0.20;
  }
  
  return totalDiscounts;
}

function calculateRiskScore(inputs: FloodInsuranceInputs): number {
  let score = 5; // Base score
  
  // Flood zone risk
  switch (inputs.floodZone) {
    case 'A':
    case 'AE':
    case 'AH':
    case 'AO':
    case 'AR':
    case 'A99':
      score += 3;
      break;
    case 'V':
    case 'VE':
      score += 4;
      break;
    case 'B':
    case 'C':
    case 'X':
      score += 1;
      break;
    default:
      score += 2;
  }
  
  // Elevation risk
  if (inputs.elevationRisk === 'high') {
    score += 2;
  } else if (inputs.elevationRisk === 'medium') {
    score += 1;
  }
  
  // Flood history
  if (inputs.floodHistory) {
    score += 2;
  }
  
  // Claims history
  if (inputs.numberOfPreviousClaims > 0) {
    score += Math.min(inputs.numberOfPreviousClaims, 3);
  }
  
  // Coastal location
  if (inputs.coastalLocation) {
    score += 1;
  }
  
  // Construction type
  switch (inputs.constructionType) {
    case 'frame':
      score += 1;
      break;
    case 'masonry':
      score += 0;
      break;
    default:
      score += 0.5;
  }
  
  return Math.min(10, Math.max(1, score));
}

function determineFloodRiskLevel(floodZone: string, riskScore: number): 'low' | 'medium' | 'high' | 'very_high' {
  if (floodZone === 'V' || floodZone === 'VE' || riskScore >= 8) {
    return 'very_high';
  } else if (floodZone === 'A' || floodZone === 'AE' || riskScore >= 6) {
    return 'high';
  } else if (floodZone === 'B' || floodZone === 'C' || riskScore >= 4) {
    return 'medium';
  } else {
    return 'low';
  }
}

function calculateProbabilityOfFlood(inputs: FloodInsuranceInputs): number {
  let probability = 5; // Base probability
  
  // Flood zone probability
  switch (inputs.floodZone) {
    case 'A':
    case 'AE':
    case 'AH':
    case 'AO':
    case 'AR':
    case 'A99':
      probability += 20;
      break;
    case 'V':
    case 'VE':
      probability += 30;
      break;
    case 'B':
    case 'C':
    case 'X':
      probability += 5;
      break;
    default:
      probability += 10;
  }
  
  // Elevation impact
  if (inputs.propertyElevation && inputs.baseFloodElevation) {
    const elevationDifference = inputs.propertyElevation - inputs.baseFloodElevation;
    if (elevationDifference > 2) {
      probability -= 10;
    } else if (elevationDifference < 0) {
      probability += 15;
    }
  }
  
  // Flood history impact
  if (inputs.floodHistory) {
    probability += 10;
  }
  
  // Claims history impact
  if (inputs.numberOfPreviousClaims > 0) {
    probability += inputs.numberOfPreviousClaims * 5;
  }
  
  return Math.min(80, Math.max(1, probability));
}

function calculateDeductibleImpact(inputs: FloodInsuranceInputs): number {
  const basePremium = calculateBasePremium(inputs);
  
  // Higher deductibles reduce premium
  if (inputs.buildingDeductible > 1000) {
    return basePremium * 0.10;
  } else if (inputs.buildingDeductible > 500) {
    return basePremium * 0.05;
  }
  
  return 0;
}

function generateAnalysis(inputs: FloodInsuranceInputs, metrics: any): FloodInsuranceAnalysis {
  const isGoodCoverage = metrics.coverageAdequacy > 80;
  const isCostEffective = metrics.costEffectiveness > 50;
  const isLowRisk = metrics.floodRiskLevel === 'low' || metrics.floodRiskLevel === 'medium';
  const isReasonablePremium = metrics.premiumToValueRatio < 1;
  
  let policyRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  let recommendation: 'Purchase' | 'Consider' | 'Shop Around' | 'Avoid' | 'Require Changes' = 'Consider';
  
  // Policy rating logic
  if (isGoodCoverage && isCostEffective && isLowRisk && isReasonablePremium) {
    policyRating = 'Excellent';
  } else if (isGoodCoverage && isCostEffective && isLowRisk) {
    policyRating = 'Good';
  } else if (metrics.coverageAdequacy < 50 || metrics.costEffectiveness < 20) {
    policyRating = 'Poor';
  } else if (metrics.coverageAdequacy < 30) {
    policyRating = 'Very Poor';
  }
  
  // Risk rating logic
  if (metrics.floodRiskLevel === 'low') {
    riskRating = 'Low';
  } else if (metrics.floodRiskLevel === 'medium') {
    riskRating = 'Moderate';
  } else if (metrics.floodRiskLevel === 'high') {
    riskRating = 'High';
  } else {
    riskRating = 'Very High';
  }
  
  // Recommendation logic
  if (policyRating === 'Excellent') {
    recommendation = 'Purchase';
  } else if (policyRating === 'Good') {
    recommendation = 'Consider';
  } else if (policyRating === 'Poor') {
    recommendation = 'Shop Around';
  } else if (policyRating === 'Very Poor') {
    recommendation = 'Avoid';
  }
  
  return {
    policyRating,
    riskRating,
    recommendation,
    keyStrengths: [
      isGoodCoverage ? 'Adequate coverage' : 'Coverage needs review',
      isCostEffective ? 'Cost effective' : 'Cost effectiveness needs improvement',
      isLowRisk ? 'Low flood risk' : 'Moderate flood risk',
      isReasonablePremium ? 'Reasonable premium' : 'Premium needs optimization',
      inputs.floodVents ? 'Flood protection measures in place' : 'Consider flood protection measures'
    ],
    keyWeaknesses: [
      !isGoodCoverage ? 'Inadequate coverage' : 'Coverage is adequate',
      !isCostEffective ? 'Not cost effective' : 'Cost effectiveness is good',
      !isLowRisk ? 'High flood risk' : 'Risk level is acceptable',
      !isReasonablePremium ? 'High premium' : 'Premium is reasonable',
      !inputs.floodVents ? 'No flood protection measures' : 'Flood protection measures in place'
    ],
    riskFactors: [
      'Flood zone risk',
      'Elevation risk',
      'Construction type risk',
      'Claims history risk',
      'Coastal location risk'
    ],
    opportunities: [
      'Premium optimization',
      'Coverage enhancement',
      'Risk mitigation',
      'Discount opportunities',
      'Policy comparison'
    ],
    policySummary: `Flood insurance policy for ${inputs.propertyAddress} with $${metrics.annualPremium.toLocaleString()} annual premium.`,
    coverageAnalysis: `Total coverage of $${metrics.totalCoverage.toLocaleString()} with ${metrics.coverageAdequacy.toFixed(1)}% adequacy.`,
    costAnalysis: `Annual premium of $${metrics.annualPremium.toLocaleString()} with ${metrics.costEffectiveness.toFixed(1)}% cost effectiveness.`,
    riskAssessment: `Flood risk level: ${metrics.floodRiskLevel} with risk score of ${metrics.riskScore.toFixed(1)}/10.`,
    floodRisk: `Flood zone ${inputs.floodZone} with ${metrics.probabilityOfFlood.toFixed(0)}% probability of flood.`,
    elevationRisk: inputs.elevationRisk === 'high' ? 'High elevation risk requires attention' : 'Elevation risk is manageable',
    communityRisk: inputs.communityRatingSystem >= 7 ? 'Good community flood management' : 'Community flood management needs improvement',
    coverageAssessment: `Coverage adequacy of ${metrics.coverageAdequacy.toFixed(1)}% with $${metrics.coverageGap.toLocaleString()} gap.`,
    adequacyAnalysis: metrics.coverageAdequacy >= 80 ? 'Coverage is adequate' : 'Coverage may be insufficient',
    gapAnalysis: `Coverage gap of $${metrics.coverageGap.toLocaleString()} should be addressed`,
    costAssessment: `Annual cost of $${metrics.annualPremium.toLocaleString()} with ${metrics.premiumToValueRatio.toFixed(2)}% premium to value ratio.`,
    valueAnalysis: metrics.premiumToValueRatio < 1 ? 'Good value for premium' : 'Premium may be high relative to property value',
    affordabilityAnalysis: 'Affordability assessment requires income and budget analysis',
    coverageRecommendations: [
      'Review coverage adequacy',
      'Consider additional coverage options',
      'Optimize deductible levels',
      'Explore discount opportunities'
    ],
    costOptimization: [
      'Compare multiple quotes',
      'Review deductible options',
      'Check for available discounts',
      'Consider policy bundling'
    ],
    riskMitigation: [
      'Install flood vents',
      'Elevate utilities',
      'Improve drainage',
      'Consider flood barriers'
    ],
    implementationPlan: 'Implement recommended coverage and cost optimizations',
    nextSteps: [
      'Obtain multiple quotes',
      'Review policy terms',
      'Implement risk mitigation',
      'Schedule annual review'
    ],
    timeline: 'Complete implementation within 30 days',
    monitoringPlan: 'Annual policy review and risk assessment',
    reviewSchedule: 'Review policy annually and after major changes',
    updateTriggers: [
      'Property value changes',
      'Flood zone updates',
      'Risk mitigation improvements',
      'Market rate changes'
    ],
    riskManagement: 'Comprehensive flood risk management strategy',
    mitigationStrategies: [
      'Property elevation',
      'Flood protection measures',
      'Emergency planning',
      'Insurance optimization'
    ],
    contingencyPlans: [
      'Emergency evacuation plan',
      'Property protection measures',
      'Alternative coverage options',
      'Financial reserve planning'
    ],
    performanceBenchmarks: [
      {
        metric: 'Coverage Adequacy',
        target: 80,
        benchmark: 75,
        industry: 'Flood Insurance'
      },
      {
        metric: 'Premium to Value Ratio',
        target: 0.5,
        benchmark: 0.8,
        industry: 'Flood Insurance'
      }
    ],
    decisionRecommendation: `Recommend ${recommendation} based on ${policyRating.toLowerCase()} policy rating.`,
    presentationPoints: [
      'Comprehensive coverage analysis',
      'Risk assessment and mitigation',
      'Cost optimization opportunities',
      'Policy comparison recommendations'
    ],
    decisionFactors: [
      'Coverage adequacy',
      'Cost effectiveness',
      'Risk level',
      'Property value protection'
    ]
  };
}

function generatePremiumProjections(inputs: FloodInsuranceInputs, annualPremium: number) {
  const projections = [];
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const inflationAdjusted = annualPremium * Math.pow(1 + (inputs.inflationRate || 2.5) / 100, year - 1);
    projections.push({
      year,
      premium: annualPremium,
      inflationAdjusted,
      cumulativeCost: projections.length > 0 ? projections[projections.length - 1].cumulativeCost + inflationAdjusted : inflationAdjusted
    });
  }
  return projections;
}

function generateScenarioAnalysis(inputs: FloodInsuranceInputs, annualPremium: number) {
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      impact: annualPremium * 0.8,
      riskLevel: 'low'
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      impact: annualPremium,
      riskLevel: 'medium'
    },
    {
      scenario: 'Aggressive',
      probability: 0.2,
      impact: annualPremium * 1.3,
      riskLevel: 'high'
    }
  ];
}

function generateComparativeAnalysis(inputs: FloodInsuranceInputs, annualPremium: number, coverageAdequacy: number) {
  return [
    {
      metric: 'Annual Premium',
      thisPolicy: annualPremium,
      marketAverage: annualPremium * 0.95,
      topQuartile: annualPremium * 0.8,
      bottomQuartile: annualPremium * 1.2
    },
    {
      metric: 'Coverage Adequacy',
      thisPolicy: coverageAdequacy,
      marketAverage: 75,
      topQuartile: 85,
      bottomQuartile: 60
    }
  ];
}

function generateRiskMetrics(inputs: FloodInsuranceInputs, riskScore: number) {
  return [
    {
      metric: 'Overall Risk Score',
      value: riskScore,
      benchmark: 5,
      riskLevel: riskScore <= 4 ? 'low' : riskScore <= 6 ? 'medium' : 'high'
    },
    {
      metric: 'Flood Zone Risk',
      value: inputs.floodZone === 'A' || inputs.floodZone === 'V' ? 8 : 4,
      benchmark: 5,
      riskLevel: inputs.floodZone === 'A' || inputs.floodZone === 'V' ? 'high' : 'medium'
    }
  ];
}

function generateFinancialProjections(inputs: FloodInsuranceInputs, annualPremium: number) {
  const projections = [];
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    projections.push({
      year,
      premium: annualPremium,
      potentialLoss: inputs.propertyValue * 0.3,
      netBenefit: (inputs.propertyValue * 0.3) - annualPremium
    });
  }
  return projections;
}

function generatePolicyTimeline(inputs: FloodInsuranceInputs) {
  return [
    {
      phase: 'Policy Application',
      duration: '1-2 weeks',
      activities: ['Complete application', 'Provide documentation', 'Underwriting review'],
      deliverables: ['Policy approval', 'Premium calculation']
    },
    {
      phase: 'Policy Issuance',
      duration: '1 week',
      activities: ['Policy preparation', 'Document delivery', 'Payment processing'],
      deliverables: ['Policy documents', 'Payment confirmation']
    },
    {
      phase: 'Policy Management',
      duration: 'Ongoing',
      activities: ['Annual review', 'Premium payments', 'Claims support'],
      deliverables: ['Annual statements', 'Policy updates']
    }
  ];
}

function generateCoverageChecklist(inputs: FloodInsuranceInputs) {
  return [
    {
      category: 'Building Coverage',
      items: [
        { item: 'Building structure', status: 'covered', priority: 'high', notes: 'Primary coverage' },
        { item: 'Foundation', status: 'covered', priority: 'high', notes: 'Included in building coverage' },
        { item: 'Utilities', status: 'covered', priority: 'medium', notes: 'Above ground utilities' }
      ]
    },
    {
      category: 'Contents Coverage',
      items: [
        { item: 'Personal property', status: 'covered', priority: 'high', notes: 'Up to contents limit' },
        { item: 'Appliances', status: 'covered', priority: 'medium', notes: 'Included in contents' },
        { item: 'Furniture', status: 'covered', priority: 'medium', notes: 'Included in contents' }
      ]
    }
  ];
}

function generateRiskMitigationPlan(inputs: FloodInsuranceInputs) {
  return [
    {
      risk: 'Flood damage',
      mitigation: 'Install flood vents',
      cost: 2000,
      effectiveness: 80
    },
    {
      risk: 'Utility damage',
      mitigation: 'Elevate utilities',
      cost: 5000,
      effectiveness: 90
    },
    {
      risk: 'Foundation damage',
      mitigation: 'Improve drainage',
      cost: 3000,
      effectiveness: 70
    }
  ];
}

function generatePolicyOptimization(inputs: FloodInsuranceInputs, annualPremium: number) {
  return [
    {
      area: 'Deductible',
      current: inputs.buildingDeductible,
      recommended: inputs.buildingDeductible * 1.5,
      savings: annualPremium * 0.1
    },
    {
      area: 'Coverage',
      current: inputs.buildingCoverage,
      recommended: inputs.propertyValue * 0.8,
      savings: 0
    }
  ];
}

function generateClaimsHistory(inputs: FloodInsuranceInputs) {
  const history = [];
  if (inputs.numberOfPreviousClaims > 0) {
    for (let i = 0; i < inputs.numberOfPreviousClaims; i++) {
      history.push({
        year: new Date().getFullYear() - (i + 1),
        claimAmount: 50000,
        claimType: 'Flood damage',
        settlement: 45000
      });
    }
  }
  return history;
}

function generateMarketAnalysis(inputs: FloodInsuranceInputs, annualPremium: number) {
  return [
    {
      metric: 'Premium Rate',
      current: annualPremium,
      marketAverage: annualPremium * 0.95,
      trend: 'stable'
    },
    {
      metric: 'Coverage Limits',
      current: inputs.buildingCoverage,
      marketAverage: inputs.propertyValue * 0.75,
      trend: 'increasing'
    }
  ];
}

function generatePerformanceTracking(inputs: FloodInsuranceInputs) {
  return [
    {
      metric: 'Premium Payments',
      current: 0,
      target: 12,
      frequency: 'Monthly',
      owner: 'Policyholder'
    },
    {
      metric: 'Risk Assessment',
      current: 0,
      target: 1,
      frequency: 'Annually',
      owner: 'Insurance Agent'
    }
  ];
}

function assessDataQuality(inputs: FloodInsuranceInputs): number {
  let quality = 80;
  
  if (inputs.propertyValue <= 0) quality -= 20;
  if (inputs.buildingCoverage <= 0) quality -= 20;
  if (inputs.contentsCoverage < 0) quality -= 15;
  
  if (!inputs.propertyAddress) quality -= 10;
  if (!inputs.floodZone) quality -= 10;
  
  return Math.max(50, Math.min(100, quality));
}

function assessModelAccuracy(inputs: FloodInsuranceInputs): number {
  let accuracy = 70;
  
  if (inputs.elevationCertificate) accuracy += 10;
  if (inputs.baseFloodElevation) accuracy += 10;
  if (inputs.propertyElevation) accuracy += 10;
  
  return Math.max(60, Math.min(95, accuracy));
}

function calculateConfidenceLevel(inputs: FloodInsuranceInputs, annualPremium: number): number {
  let confidence = 70;
  
  if (inputs.elevationCertificate) confidence += 15;
  if (inputs.baseFloodElevation && inputs.propertyElevation) confidence += 10;
  if (inputs.communityRatingSystem >= 7) confidence += 10;
  
  return Math.max(50, Math.min(95, confidence));
}

export function generateFloodInsuranceAnalysis(inputs: FloodInsuranceInputs, outputs: FloodInsuranceOutputs): string {
  return `
# Flood Insurance Analysis Report

## Executive Summary
**Property**: ${inputs.propertyAddress}
**Property Type**: ${inputs.propertyType}
**Property Value**: $${inputs.propertyValue.toLocaleString()}
**Flood Zone**: ${inputs.floodZone}
**Annual Premium**: $${outputs.annualPremium.toLocaleString()}

**Policy Rating**: ${outputs.analysis.policyRating}
**Risk Rating**: ${outputs.analysis.riskRating}
**Recommendation**: ${outputs.analysis.recommendation}

## Premium Analysis
- **Annual Premium**: $${outputs.annualPremium.toLocaleString()}
- **Monthly Premium**: $${outputs.monthlyPremium.toLocaleString()}
- **Total Premium**: $${outputs.totalPremium.toLocaleString()}
- **Premium per Square Foot**: $${outputs.premiumPerSquareFoot.toFixed(2)}
- **Premium to Value Ratio**: ${outputs.premiumToValueRatio.toFixed(2)}%

## Coverage Analysis
- **Building Coverage**: $${inputs.buildingCoverage.toLocaleString()}
- **Contents Coverage**: $${inputs.contentsCoverage.toLocaleString()}
- **Total Coverage**: $${outputs.totalCoverage.toLocaleString()}
- **Coverage Gap**: $${outputs.coverageGap.toLocaleString()}
- **Coverage Adequacy**: ${outputs.coverageAdequacy.toFixed(1)}%
- **Replacement Cost Coverage**: ${outputs.replacementCostCoverage.toFixed(1)}%

## Risk Analysis
- **Flood Risk Level**: ${outputs.floodRiskLevel}
- **Risk Score**: ${outputs.riskScore.toFixed(1)}/10
- **Probability of Flood**: ${outputs.probabilityOfFlood.toFixed(0)}%
- **Expected Loss**: $${outputs.expectedLoss.toLocaleString()}

## Cost Analysis
- **Total Cost**: $${outputs.totalCost.toLocaleString()}
- **Cost per Year**: $${outputs.costPerYear.toLocaleString()}
- **Cost per Month**: $${outputs.costPerMonth.toLocaleString()}
- **Cost Effectiveness**: ${outputs.costEffectiveness.toFixed(1)}%

## Deductible Analysis
- **Building Deductible**: $${inputs.buildingDeductible.toLocaleString()}
- **Contents Deductible**: $${inputs.contentsDeductible.toLocaleString()}
- **Total Deductible**: $${outputs.totalDeductible.toLocaleString()}
- **Deductible Impact**: $${outputs.deductibleImpact.toLocaleString()}
- **Out of Pocket Maximum**: $${outputs.outOfPocketMaximum.toLocaleString()}

## Property Information
- **Property Size**: ${inputs.propertySize} sq ft
- **Year Built**: ${inputs.yearBuilt}
- **Number of Stories**: ${inputs.numberOfStories}
- **Foundation Type**: ${inputs.foundationType}
- **Construction Type**: ${inputs.constructionType || 'Not specified'}
- **Roof Type**: ${inputs.roofType || 'Not specified'}

## Location Information
- **Flood Zone**: ${inputs.floodZone}
- **Elevation Certificate**: ${inputs.elevationCertificate ? 'Yes' : 'No'}
- **Base Flood Elevation**: ${inputs.baseFloodElevation || 'Not specified'} feet
- **Property Elevation**: ${inputs.propertyElevation || 'Not specified'} feet
- **Distance to Water**: ${inputs.distanceToWater || 'Not specified'} feet
- **Coastal Location**: ${inputs.coastalLocation ? 'Yes' : 'No'}

## Policy Information
- **Policy Type**: ${inputs.policyType}
- **Policy Term**: ${inputs.policyTerm} months
- **Policy Start Date**: ${inputs.policyStartDate}
- **Policy End Date**: ${inputs.policyEndDate}
- **Insurance Company**: ${inputs.insuranceCompany || 'Not specified'}
- **Company Rating**: ${inputs.companyRating || 'Not specified'}

## Risk Factors
- **Flood History**: ${inputs.floodHistory ? 'Yes' : 'No'}
- **Number of Previous Claims**: ${inputs.numberOfPreviousClaims || 0}
- **Years Since Last Claim**: ${inputs.yearsSinceLastClaim || 'N/A'}
- **Flood Risk Score**: ${inputs.floodRiskScore || 'Not specified'}/10
- **Elevation Risk**: ${inputs.elevationRisk || 'Not specified'}

## Building Characteristics
- **Construction Type**: ${inputs.constructionType || 'Not specified'}
- **Roof Type**: ${inputs.roofType || 'Not specified'}
- **Roof Age**: ${inputs.roofAge || 'Not specified'} years
- **Foundation Height**: ${inputs.foundationHeight || 'Not specified'} feet
- **Flood Vents**: ${inputs.floodVents ? 'Yes' : 'No'}
- **Number of Flood Vents**: ${inputs.numberOfFloodVents || 0}

## Community Information
- **Community Rating System**: ${inputs.communityRatingSystem || 'Not specified'}/10
- **Floodplain Management**: ${inputs.floodplainManagement ? 'Yes' : 'No'}
- **Building Codes**: ${inputs.buildingCodes || 'Not specified'}
- **Emergency Services**: ${inputs.emergencyServices ? 'Yes' : 'No'}

## Discounts and Credits
- **Multi-Policy Discount**: ${inputs.multiPolicyDiscount ? 'Yes' : 'No'}
- **Claims-Free Discount**: ${inputs.claimsFreeDiscount ? 'Yes' : 'No'}
- **Protective Device Discount**: ${inputs.protectiveDeviceDiscount ? 'Yes' : 'No'}
- **Community Discount**: ${inputs.communityDiscount ? 'Yes' : 'No'}
- **Elevation Discount**: ${inputs.elevationDiscount ? 'Yes' : 'No'}

## Additional Coverage
- **Loss of Use**: ${inputs.lossOfUse ? 'Yes' : 'No'} ${inputs.lossOfUseLimit ? `($${inputs.lossOfUseLimit.toLocaleString()})` : ''}
- **Ordinance or Law**: ${inputs.ordinanceOrLaw ? 'Yes' : 'No'} ${inputs.ordinanceOrLawLimit ? `($${inputs.ordinanceOrLawLimit.toLocaleString()})` : ''}
- **Sewer Backup**: ${inputs.sewerBackup ? 'Yes' : 'No'} ${inputs.sewerBackupLimit ? `($${inputs.sewerBackupLimit.toLocaleString()})` : ''}

## Policy Analysis
- **Policy Efficiency**: ${outputs.policyEfficiency.toFixed(1)}%
- **Coverage Efficiency**: ${outputs.coverageEfficiency.toFixed(1)}%
- **Premium Efficiency**: ${outputs.premiumEfficiency.toFixed(1)}%

## Key Strengths
${outputs.analysis.keyStrengths.map(strength => `• ${strength}`).join('\n')}

## Key Weaknesses
${outputs.analysis.keyWeaknesses.map(weakness => `• ${weakness}`).join('\n')}

## Risk Factors
${outputs.analysis.riskFactors.map(risk => `• ${risk}`).join('\n')}

## Opportunities
${outputs.analysis.opportunities.map(opportunity => `• ${opportunity}`).join('\n')}

## Coverage Recommendations
${outputs.analysis.coverageRecommendations.map(rec => `• ${rec}`).join('\n')}

## Cost Optimization
${outputs.analysis.costOptimization.map(opt => `• ${opt}`).join('\n')}

## Risk Mitigation
${outputs.analysis.riskMitigation.map(mit => `• ${mit}`).join('\n')}

## Implementation Plan
${outputs.analysis.implementationPlan}

## Next Steps
${outputs.analysis.nextSteps.map(step => `• ${step}`).join('\n')}

## Timeline
${outputs.analysis.timeline}

## Monitoring Plan
${outputs.analysis.monitoringPlan}

## Review Schedule
${outputs.analysis.reviewSchedule}

## Update Triggers
${outputs.analysis.updateTriggers.map(trigger => `• ${trigger}`).join('\n')}

## Risk Management
${outputs.analysis.riskManagement}

## Mitigation Strategies
${outputs.analysis.mitigationStrategies.map(strategy => `• ${strategy}`).join('\n')}

## Contingency Plans
${outputs.analysis.contingencyPlans.map(plan => `• ${plan}`).join('\n')}

---
*This analysis is based on the provided inputs and industry standards. Past performance does not guarantee future results. Consider consulting with insurance professionals for personalized advice.*
  `.trim();
}
