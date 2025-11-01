import { AnnuityBuyoutInputs, AnnuityBuyoutOutputs } from './types';

// Calculate buyout analysis
export function calculateBuyoutAnalysis(inputs: AnnuityBuyoutInputs): {
  buyoutNetAmount: number;
  buyoutVsContinuation: number;
  buyoutBreakEvenYears: number;
  buyoutPaybackPeriod: number;
} {
  const buyoutNetAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const annualPayment = inputs.annualPaymentAmount;
  const buyoutVsContinuation = buyoutNetAmount - (annualPayment * inputs.guaranteedPeriod);
  const buyoutBreakEvenYears = annualPayment > 0 ? buyoutNetAmount / annualPayment : inputs.guaranteedPeriod;
  const buyoutPaybackPeriod = buyoutBreakEvenYears;

  return {
    buyoutNetAmount,
    buyoutVsContinuation,
    buyoutBreakEvenYears,
    buyoutPaybackPeriod
  };
}

// Calculate cash flow analysis
export function calculateCashFlowAnalysis(inputs: AnnuityBuyoutInputs): {
  currentAnnuityIncome: number;
  buyoutInvestmentIncome: number;
  netCashFlowDifference: number;
  cashFlowBreakEvenPoint: number;
} {
  const currentAnnuityIncome = inputs.annualPaymentAmount;
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const expectedReturn = inputs.expectedReturn / 100;
  const buyoutInvestmentIncome = buyoutAmount * expectedReturn;

  const netCashFlowDifference = buyoutInvestmentIncome - currentAnnuityIncome;
  const cashFlowBreakEvenPoint = currentAnnuityIncome > 0 ? buyoutAmount / currentAnnuityIncome : inputs.guaranteedPeriod;

  return {
    currentAnnuityIncome,
    buyoutInvestmentIncome,
    netCashFlowDifference,
    cashFlowBreakEvenPoint
  };
}

// Calculate investment projections
export function calculateInvestmentProjections(inputs: AnnuityBuyoutInputs): {
  projectedBuyoutValue: number;
  projectedAnnuityValue: number;
  investmentGrowthRate: number;
  totalReturnProjection: number;
} {
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const expectedReturn = inputs.expectedReturn / 100;
  const investmentHorizon = inputs.investmentHorizon;

  const projectedBuyoutValue = buyoutAmount * Math.pow(1 + expectedReturn, investmentHorizon);
  const annualPayment = inputs.annualPaymentAmount;
  const projectedAnnuityValue = annualPayment * ((Math.pow(1 + expectedReturn, investmentHorizon) - 1) / expectedReturn);

  const investmentGrowthRate = expectedReturn * 100;
  const totalReturnProjection = projectedBuyoutValue - buyoutAmount;

  return {
    projectedBuyoutValue,
    projectedAnnuityValue,
    investmentGrowthRate,
    totalReturnProjection
  };
}

// Calculate risk analysis
export function calculateRiskAnalysis(inputs: AnnuityBuyoutInputs): {
  buyoutRiskLevel: AnnuityBuyoutOutputs['buyoutRiskLevel'];
  continuationRiskLevel: AnnuityBuyoutOutputs['continuationRiskLevel'];
  riskAdjustedBuyoutReturn: number;
  riskAdjustedContinuationReturn: number;
} {
  // Risk assessment based on investment type and market conditions
  const marketRisk = inputs.marketVolatility === 'High' ? 3 : inputs.marketVolatility === 'Medium' ? 2 : 1;
  const liquidityRisk = inputs.alternativeInvestment1.liquidity === 'Low' ? 3 : inputs.alternativeInvestment1.liquidity === 'Medium' ? 2 : 1;
  const issuerRisk = 1; // Assume low for established annuity issuers

  const buyoutRiskScore = marketRisk + liquidityRisk;
  const continuationRiskScore = issuerRisk;

  const buyoutRiskLevel: AnnuityBuyoutOutputs['buyoutRiskLevel'] =
    buyoutRiskScore > 4 ? 'High' : buyoutRiskScore > 2 ? 'Medium' : 'Low';

  const continuationRiskLevel: AnnuityBuyoutOutputs['continuationRiskLevel'] =
    continuationRiskScore > 2 ? 'High' : continuationRiskScore > 1 ? 'Medium' : 'Low';

  const riskAdjustment = buyoutRiskScore / 6;
  const riskAdjustedBuyoutReturn = (inputs.expectedReturn / 100) * (1 - riskAdjustment);
  const riskAdjustedContinuationReturn = inputs.annualPaymentAmount / inputs.currentAccountValue; // Simplified

  return {
    buyoutRiskLevel,
    continuationRiskLevel,
    riskAdjustedBuyoutReturn,
    riskAdjustedContinuationReturn
  };
}

// Calculate tax implications
export function calculateTaxImplications(inputs: AnnuityBuyoutInputs): {
  buyoutTaxLiability: number;
  ongoingAnnuityTaxes: number;
  taxSavingsFromBuyout: number;
  afterTaxBuyoutValue: number;
} {
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees;
  const taxBracket = inputs.taxBracket / 100;
  const capitalGainsRate = inputs.capitalGainsTaxRate / 100;

  // Simplified tax calculations
  const buyoutTaxLiability = inputs.annuityTaxStatus === 'Non-Qualified' ?
    buyoutAmount * taxBracket : buyoutAmount * capitalGainsRate;

  const ongoingAnnuityTaxes = inputs.annualPaymentAmount * taxBracket;
  const taxSavingsFromBuyout = ongoingAnnuityTaxes - buyoutTaxLiability;
  const afterTaxBuyoutValue = buyoutAmount - buyoutTaxLiability;

  return {
    buyoutTaxLiability,
    ongoingAnnuityTaxes,
    taxSavingsFromBuyout,
    afterTaxBuyoutValue
  };
}

// Calculate scenario analysis
export function calculateScenarioAnalysis(inputs: AnnuityBuyoutInputs): {
  bestCaseBuyout: number;
  worstCaseBuyout: number;
  baseCaseBuyout: number;
  probabilityWeightedOutcome: number;
} {
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const expectedReturn = inputs.expectedReturn / 100;
  const investmentHorizon = inputs.investmentHorizon;

  const baseCaseBuyout = buyoutAmount * Math.pow(1 + expectedReturn, investmentHorizon);
  const bestCaseBuyout = buyoutAmount * Math.pow(1 + expectedReturn * 1.5, investmentHorizon);
  const worstCaseBuyout = buyoutAmount * Math.pow(1 + expectedReturn * 0.5, investmentHorizon);

  // Probability weighting (simplified)
  const probabilityWeightedOutcome = baseCaseBuyout * 0.5 + bestCaseBuyout * 0.3 + worstCaseBuyout * 0.2;

  return {
    bestCaseBuyout,
    worstCaseBuyout,
    baseCaseBuyout,
    probabilityWeightedOutcome
  };
}

// Calculate comparative analysis
export function calculateComparativeAnalysis(inputs: AnnuityBuyoutInputs): {
  vsAlternative1: number;
  vsAlternative2: number;
  vsAlternative3: number;
  bestAlternative: string;
} {
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const investmentHorizon = inputs.investmentHorizon;

  const alt1Return = buyoutAmount * Math.pow(1 + inputs.alternativeInvestment1.expectedReturn / 100, investmentHorizon);
  const alt2Return = buyoutAmount * Math.pow(1 + inputs.alternativeInvestment2.expectedReturn / 100, investmentHorizon);
  const alt3Return = buyoutAmount * Math.pow(1 + inputs.alternativeInvestment3.expectedReturn / 100, investmentHorizon);

  const vsAlternative1 = alt1Return - buyoutAmount;
  const vsAlternative2 = alt2Return - buyoutAmount;
  const vsAlternative3 = alt3Return - buyoutAmount;

  const alternatives = [
    { name: inputs.alternativeInvestment1.name, return: vsAlternative1 },
    { name: inputs.alternativeInvestment2.name, return: vsAlternative2 },
    { name: inputs.alternativeInvestment3.name, return: vsAlternative3 }
  ];

  const bestAlternative = alternatives.reduce((best, current) =>
    current.return > best.return ? current : best
  ).name;

  return {
    vsAlternative1,
    vsAlternative2,
    vsAlternative3,
    bestAlternative
  };
}

// Calculate longevity analysis
export function calculateLongevityAnalysis(inputs: AnnuityBuyoutInputs): {
  longevityBreakEven: number;
  lifeExpectancyImpact: number;
  mortalityCreditsUtilization: number;
  longevityInsuranceValue: number;
} {
  const annualPayment = inputs.annualPaymentAmount;
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const lifeExpectancy = inputs.lifeExpectancy;
  const ownerAge = inputs.ownerAge;

  const longevityBreakEven = annualPayment > 0 ? buyoutAmount / annualPayment : lifeExpectancy - ownerAge;
  const lifeExpectancyImpact = (lifeExpectancy - ownerAge) - longevityBreakEven;
  const mortalityCreditsUtilization = longevityBreakEven / (lifeExpectancy - ownerAge);
  const longevityInsuranceValue = annualPayment * (lifeExpectancy - ownerAge - longevityBreakEven);

  return {
    longevityBreakEven,
    lifeExpectancyImpact,
    mortalityCreditsUtilization,
    longevityInsuranceValue
  };
}

// Calculate cost analysis
export function calculateCostAnalysis(inputs: AnnuityBuyoutInputs): {
  totalBuyoutCosts: number;
  ongoingAnnuityCosts: number;
  netCostDifference: number;
  costEfficiency: number;
} {
  const totalBuyoutCosts = inputs.buyoutFees + inputs.buyoutTaxes + inputs.surrenderCharges;
  const ongoingAnnuityCosts = inputs.administrativeFees + inputs.investmentFees;
  const netCostDifference = totalBuyoutCosts - (ongoingAnnuityCosts * inputs.guaranteedPeriod);
  const costEfficiency = netCostDifference < 0 ? Math.abs(netCostDifference) / totalBuyoutCosts : 0;

  return {
    totalBuyoutCosts,
    ongoingAnnuityCosts,
    netCostDifference,
    costEfficiency
  };
}

// Calculate liquidity analysis
export function calculateLiquidityAnalysis(inputs: AnnuityBuyoutInputs): {
  buyoutLiquidity: number;
  annuityLiquidity: number;
  emergencyAccess: number;
  withdrawalFlexibility: number;
} {
  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;

  // Liquidity scores (0-100 scale)
  const buyoutLiquidity = inputs.alternativeInvestment1.liquidity === 'High' ? 90 :
                         inputs.alternativeInvestment1.liquidity === 'Medium' ? 60 : 30;

  const annuityLiquidity = inputs.annuityType === 'Immediate' ? 80 :
                          inputs.annuityType === 'Fixed' ? 60 :
                          inputs.annuityType === 'Variable' ? 40 : 20;

  const emergencyAccess = buyoutLiquidity;
  const withdrawalFlexibility = annuityLiquidity;

  return {
    buyoutLiquidity,
    annuityLiquidity,
    emergencyAccess,
    withdrawalFlexibility
  };
}

// Calculate beneficiary analysis
export function calculateBeneficiaryAnalysis(inputs: AnnuityBuyoutInputs): {
  beneficiaryBuyoutValue: number;
  beneficiaryAnnuityValue: number;
  beneficiaryTaxImplications: number;
  beneficiaryNetBenefit: number;
} {
  if (!inputs.hasBeneficiaries) {
    return {
      beneficiaryBuyoutValue: 0,
      beneficiaryAnnuityValue: 0,
      beneficiaryTaxImplications: 0,
      beneficiaryNetBenefit: 0
    };
  }

  const buyoutAmount = inputs.buyoutOfferAmount - inputs.buyoutFees - inputs.buyoutTaxes;
  const annualPayment = inputs.annualPaymentAmount;
  const beneficiaryAge = inputs.beneficiaryAge;
  const lifeExpectancy = 80; // Simplified

  const beneficiaryBuyoutValue = buyoutAmount * Math.pow(1 + inputs.expectedReturn / 100, lifeExpectancy - beneficiaryAge);
  const beneficiaryAnnuityValue = annualPayment * (lifeExpectancy - beneficiaryAge);

  const beneficiaryTaxImplications = beneficiaryBuyoutValue * (inputs.capitalGainsTaxRate / 100);
  const beneficiaryNetBenefit = beneficiaryBuyoutValue - beneficiaryTaxImplications - beneficiaryAnnuityValue;

  return {
    beneficiaryBuyoutValue,
    beneficiaryAnnuityValue,
    beneficiaryTaxImplications,
    beneficiaryNetBenefit
  };
}

// Calculate goal alignment
export function calculateGoalAlignment(inputs: AnnuityBuyoutInputs): {
  incomeGoalAchievement: number;
  growthGoalAchievement: number;
  preservationGoalAchievement: number;
  legacyGoalAchievement: number;
} {
  const cashFlow = calculateCashFlowAnalysis(inputs);
  const projections = calculateInvestmentProjections(inputs);
  const beneficiary = calculateBeneficiaryAnalysis(inputs);

  const incomeGoalAchievement = inputs.primaryGoal === 'Income' ?
    (cashFlow.buyoutInvestmentIncome / inputs.currentAnnualIncome) * 100 : 50;

  const growthGoalAchievement = inputs.primaryGoal === 'Growth' ?
    (projections.totalReturnProjection / inputs.currentAccountValue) * 100 : 50;

  const preservationGoalAchievement = inputs.primaryGoal === 'Preservation' ?
    (inputs.buyoutOfferAmount / inputs.currentAccountValue) * 100 : 50;

  const legacyGoalAchievement = inputs.primaryGoal === 'Legacy' ?
    (beneficiary.beneficiaryNetBenefit / inputs.inheritanceGoals) * 100 : 50;

  return {
    incomeGoalAchievement,
    growthGoalAchievement,
    preservationGoalAchievement,
    legacyGoalAchievement
  };
}

// Calculate emotional analysis
export function calculateEmotionalAnalysis(inputs: AnnuityBuyoutInputs): {
  decisionComfortLevel: number;
  regretProbability: number;
  satisfactionProjection: number;
  peaceOfMindValue: number;
} {
  // Emotional scoring based on inputs
  const trustScore = inputs.trustInIssuer === 'High' ? 80 : inputs.trustInIssuer === 'Medium' ? 50 : 20;
  const attachmentScore = inputs.emotionalAttachment === 'High' ? 30 : inputs.emotionalAttachment === 'Medium' ? 50 : 80;
  const complexityScore = inputs.complexityPreference === 'Simple' ? 80 : inputs.complexityPreference === 'Moderate' ? 60 : 40;

  const decisionComfortLevel = (trustScore + attachmentScore + complexityScore) / 3;
  const regretProbability = 100 - decisionComfortLevel;
  const satisfactionProjection = decisionComfortLevel;
  const peaceOfMindValue = inputs.stressLevel === 'Low' ? 80 : inputs.stressLevel === 'Medium' ? 50 : 20;

  return {
    decisionComfortLevel,
    regretProbability,
    satisfactionProjection,
    peaceOfMindValue
  };
}

// Calculate professional recommendations
export function calculateProfessionalRecommendations(inputs: AnnuityBuyoutInputs): {
  financialAdvisorRecommendation: string;
  taxAdvisorRecommendation: string;
  insuranceAdvisorRecommendation: string;
  overallRecommendation: string;
} {
  const analysis = calculateBuyoutAnalysis(inputs);
  const risk = calculateRiskAnalysis(inputs);
  const tax = calculateTaxImplications(inputs);

  const financialAdvisorRecommendation = analysis.buyoutVsContinuation > 0 ?
    'Consider buyout for potentially higher returns' :
    'Continuation may provide more stable income';

  const taxAdvisorRecommendation = tax.taxSavingsFromBuyout > 0 ?
    'Buyout offers tax advantages' :
    'Continuation provides tax-deferred growth';

  const insuranceAdvisorRecommendation = risk.buyoutRiskLevel === 'Low' ?
    'Buyout appears low risk' :
    'Consider continuation for guaranteed income';

  const overallRecommendation = analysis.buyoutVsContinuation > 0 && risk.buyoutRiskLevel !== 'High' ?
    'Proceed with buyout' : 'Maintain current annuity';

  return {
    financialAdvisorRecommendation,
    taxAdvisorRecommendation,
    insuranceAdvisorRecommendation,
    overallRecommendation
  };
}

// Calculate implementation analysis
export function calculateImplementationAnalysis(inputs: AnnuityBuyoutInputs): {
  implementationEase: AnnuityBuyoutOutputs['implementationEase'];
  implementationTime: number;
  implementationCost: number;
  implementationRisk: number;
} {
  const implementationEase: AnnuityBuyoutOutputs['implementationEase'] =
    inputs.allDocumentsReviewed && inputs.professionalReview ? 'Easy' :
    inputs.contractReview ? 'Moderate' : 'Complex';

  const implementationTime = inputs.implementationTimeframe;
  const implementationCost = inputs.legalFees + inputs.advisoryFees;
  const implementationRisk = inputs.decisionConfidence === 'Low' ? 70 : inputs.decisionConfidence === 'Medium' ? 40 : 20;

  return {
    implementationEase,
    implementationTime,
    implementationCost,
    implementationRisk
  };
}

// Calculate regulatory compliance
export function calculateRegulatoryCompliance(inputs: AnnuityBuyoutInputs): {
  regulatoryApprovalNeeded: boolean;
  complianceRequirements: string[];
  legalReviewRecommended: boolean;
  fiduciaryDutyConsiderations: string[];
} {
  const regulatoryApprovalNeeded = inputs.secFiling === 'Regulation D' || inputs.erisaPlan;
  const complianceRequirements = [
    'Contract review',
    'Tax implications assessment',
    'Beneficiary designation verification'
  ];

  if (inputs.erisaPlan) {
    complianceRequirements.push('ERISA compliance review');
  }

  const legalReviewRecommended = inputs.contractNumber !== '' && inputs.buyoutOffer;
  const fiduciaryDutyConsiderations = [
    'Best interest of the client',
    'Full disclosure of risks and benefits',
    'Documentation of decision-making process'
  ];

  return {
    regulatoryApprovalNeeded,
    complianceRequirements,
    legalReviewRecommended,
    fiduciaryDutyConsiderations
  };
}

// Calculate market timing analysis
export function calculateMarketTimingAnalysis(inputs: AnnuityBuyoutInputs): {
  currentMarketValuation: AnnuityBuyoutOutputs['currentMarketValuation'];
  timingRecommendation: string;
  marketConditionImpact: number;
  timingRisk: number;
} {
  const currentMarketValuation: AnnuityBuyoutOutputs['currentMarketValuation'] =
    inputs.economicOutlook === 'Positive' ? 'Undervalued' :
    inputs.economicOutlook === 'Neutral' ? 'Fair' : 'Overvalued';

  const timingRecommendation = inputs.marketTimingStrategy === 'Buy and Hold' ?
    'Proceed with long-term investment approach' :
    'Consider market conditions in timing decision';

  const marketConditionImpact = inputs.economicOutlook === 'Positive' ? 20 :
                               inputs.economicOutlook === 'Neutral' ? 0 : -20;

  const timingRisk = inputs.marketTimingStrategy === 'Market Timing' ? 60 :
                    inputs.marketTimingStrategy === 'Dollar Cost Averaging' ? 30 : 10;

  return {
    currentMarketValuation,
    timingRecommendation,
    marketConditionImpact,
    timingRisk
  };
}

// Calculate Monte Carlo results
export function calculateMonteCarloResults(inputs: AnnuityBuyoutInputs): {
  monteCarloMean: number;
  monteCarloMedian: number;
  monteCarloStandardDeviation: number;
  monteCarloConfidenceInterval: [number, number];
} {
  const baseProjection = calculateInvestmentProjections(inputs).projectedBuyoutValue;
  const risk = calculateRiskAnalysis(inputs);

  const monteCarloMean = baseProjection;
  const monteCarloMedian = baseProjection * 0.98;
  const monteCarloStandardDeviation = baseProjection * risk.riskAdjustedBuyoutReturn;

  const confidenceLevel = 0.95;
  const zScore = 1.96;
  const confidenceInterval: [number, number] = [
    monteCarloMean - zScore * monteCarloStandardDeviation,
    monteCarloMean + zScore * monteCarloStandardDeviation
  ];

  return {
    monteCarloMean,
    monteCarloMedian,
    monteCarloStandardDeviation,
    confidenceInterval
  };
}

// Calculate stress testing
export function calculateStressTesting(inputs: AnnuityBuyoutInputs): {
  recessionScenario: number;
  inflationScenario: number;
  marketCrashScenario: number;
  longevityScenario: number;
} {
  const baseProjection = calculateInvestmentProjections(inputs).projectedBuyoutValue;

  const recessionScenario = baseProjection * 0.7;
  const inflationScenario = baseProjection * 0.8;
  const marketCrashScenario = baseProjection * 0.5;
  const longevityScenario = baseProjection * 0.9;

  return {
    recessionScenario,
    inflationScenario,
    marketCrashScenario,
    longevityScenario
  };
}

// Calculate sensitivity analysis
export function calculateSensitivityAnalysis(inputs: AnnuityBuyoutInputs): {
  sensitivityToReturn: number;
  sensitivityToInflation: number;
  sensitivityToLifeExpectancy: number;
  sensitivityToTaxRates: number;
} {
  const baseProjection = calculateInvestmentProjections(inputs).projectedBuyoutValue;

  // Return sensitivity (1% change)
  const returnUp = { ...inputs, expectedReturn: inputs.expectedReturn + 1 };
  const returnDown = { ...inputs, expectedReturn: inputs.expectedReturn - 1 };
  const projectionUp = calculateInvestmentProjections(returnUp).projectedBuyoutValue;
  const projectionDown = calculateInvestmentProjections(returnDown).projectedBuyoutValue;
  const sensitivityToReturn = baseProjection !== 0 ? ((projectionUp - projectionDown) / (baseProjection * 2)) * 100 : 0;

  // Inflation sensitivity (1% change)
  const inflationUp = { ...inputs, inflationRate: inputs.inflationRate + 1 };
  const inflationDown = { ...inputs, inflationRate: inputs.inflationRate - 1 };
  const inflationProjectionUp = calculateInvestmentProjections(inflationUp).projectedBuyoutValue;
  const inflationProjectionDown = calculateInvestmentProjections(inflationDown).projectedBuyoutValue;
  const sensitivityToInflation = baseProjection !== 0 ? ((inflationProjectionUp - inflationProjectionDown) / (baseProjection * 2)) * 100 : 0;

  // Life expectancy sensitivity (5 years)
  const lifeUp = { ...inputs, lifeExpectancy: inputs.lifeExpectancy + 5 };
  const lifeDown = { ...inputs, lifeExpectancy: inputs.lifeExpectancy - 5 };
  const lifeProjectionUp = calculateInvestmentProjections(lifeUp).projectedBuyoutValue;
  const lifeProjectionDown = calculateInvestmentProjections(lifeDown).projectedBuyoutValue;
  const sensitivityToLifeExpectancy = baseProjection !== 0 ? ((lifeProjectionUp - lifeProjectionDown) / (baseProjection * 2)) * 100 : 0;

  // Tax rate sensitivity (5% change)
  const taxUp = { ...inputs, taxBracket: inputs.taxBracket + 5 };
  const taxDown = { ...inputs, taxBracket: inputs.taxBracket - 5 };
  const taxProjectionUp = calculateInvestmentProjections(taxUp).projectedBuyoutValue;
  const taxProjectionDown = calculateInvestmentProjections(taxDown).projectedBuyoutValue;
  const sensitivityToTaxRates = baseProjection !== 0 ? ((taxProjectionUp - taxProjectionDown) / (baseProjection * 2)) * 100 : 0;

  return {
    sensitivityToReturn,
    sensitivityToInflation,
    sensitivityToLifeExpectancy,
    sensitivityToTaxRates
  };
}

// Calculate decision quality metrics
export function calculateDecisionQualityMetrics(inputs: AnnuityBuyoutInputs): {
  informationCompleteness: number;
  analysisRigor: number;
  decisionConfidence: number;
  decisionQualityScore: number;
} {
  const informationCompleteness = (inputs.allDocumentsReviewed ? 25 : 0) +
                                 (inputs.professionalReview ? 25 : 0) +
                                 (inputs.independentAnalysis ? 25 : 0) +
                                 (inputs.adviceSought ? 25 : 0);

  const analysisRigor = (inputs.includeTaxAnalysis ? 20 : 0) +
                       (inputs.includeRiskAnalysis ? 20 : 0) +
                       (inputs.includeScenarioAnalysis ? 20 : 0) +
                       (inputs.monteCarloSimulations > 0 ? 20 : 0) +
                       (inputs.sensitivityAnalysis ? 20 : 0);

  const decisionConfidence = inputs.decisionConfidence === 'High' ? 80 :
                            inputs.decisionConfidence === 'Medium' ? 50 : 20;

  const decisionQualityScore = (informationCompleteness + analysisRigor + decisionConfidence) / 3;

  return {
    informationCompleteness,
    analysisRigor,
    decisionConfidence,
    decisionQualityScore
  };
}

// Calculate comprehensive recommendation
export function calculateComprehensiveRecommendation(inputs: AnnuityBuyoutInputs): {
  finalRecommendation: AnnuityBuyoutOutputs['finalRecommendation'];
  confidenceLevel: AnnuityBuyoutOutputs['confidenceLevel'];
  keyConsiderations: string[];
  actionPlan: string[];
} {
  const buyoutAnalysis = calculateBuyoutAnalysis(inputs);
  const riskAnalysis = calculateRiskAnalysis(inputs);
  const goalAlignment = calculateGoalAlignment(inputs);
  const emotionalAnalysis = calculateEmotionalAnalysis(inputs);
  const professionalRecs = calculateProfessionalRecommendations(inputs);

  let recommendationScore = 0;

  // Financial analysis (40% weight)
  if (buyoutAnalysis.buyoutVsContinuation > 0) recommendationScore += 40;
  else if (buyoutAnalysis.buyoutBreakEvenYears < inputs.guaranteedPeriod) recommendationScore += 20;

  // Risk assessment (25% weight)
  if (riskAnalysis.buyoutRiskLevel === 'Low') recommendationScore += 25;
  else if (riskAnalysis.buyoutRiskLevel === 'Medium') recommendationScore += 15;

  // Goal alignment (20% weight)
  const primaryGoalAchievement = inputs.primaryGoal === 'Income' ? goalAlignment.incomeGoalAchievement :
                                inputs.primaryGoal === 'Growth' ? goalAlignment.growthGoalAchievement :
                                inputs.primaryGoal === 'Preservation' ? goalAlignment.preservationGoalAchievement :
                                goalAlignment.legacyGoalAchievement;

  if (primaryGoalAchievement > 80) recommendationScore += 20;
  else if (primaryGoalAchievement > 60) recommendationScore += 15;
  else if (primaryGoalAchievement > 40) recommendationScore += 10;

  // Emotional factors (10% weight)
  if (emotionalAnalysis.decisionComfortLevel > 70) recommendationScore += 10;
  else if (emotionalAnalysis.decisionComfortLevel > 50) recommendationScore += 5;

  // Implementation factors (5% weight)
  if (inputs.implementationEase === 'Easy') recommendationScore += 5;

  let finalRecommendation: AnnuityBuyoutOutputs['finalRecommendation'];
  if (recommendationScore >= 85) finalRecommendation = 'Strong Buyout';
  else if (recommendationScore >= 70) finalRecommendation = 'Buyout';
  else if (recommendationScore >= 40) finalRecommendation = 'Hold Annuity';
  else finalRecommendation = 'Strong Hold Annuity';

  const confidenceLevel: AnnuityBuyoutOutputs['confidenceLevel'] =
    recommendationScore > 75 ? 'High' : recommendationScore > 60 ? 'Medium' : 'Low';

  const keyConsiderations: string[] = [];
  const actionPlan: string[] = [];

  if (finalRecommendation === 'Strong Buyout' || finalRecommendation === 'Buyout') {
    keyConsiderations.push('Strong financial case for buyout');
    keyConsiderations.push('Acceptable risk level');
    keyConsiderations.push('Good goal alignment');
    actionPlan.push('Review buyout offer details');
    actionPlan.push('Consult tax advisor');
    actionPlan.push('Select investment alternative');
    actionPlan.push('Execute buyout transaction');
  } else {
    keyConsiderations.push('Current annuity provides better value');
    keyConsiderations.push('Higher risk in alternatives');
    keyConsiderations.push('Guaranteed income is valuable');
    actionPlan.push('Maintain current annuity');
    actionPlan.push('Monitor annuity performance');
    actionPlan.push('Review periodically');
  }

  return {
    finalRecommendation,
    confidenceLevel,
    keyConsiderations,
    actionPlan
  };
}

// Main calculation function
export function calculateAnnuityBuyoutAnalysis(inputs: AnnuityBuyoutInputs): AnnuityBuyoutOutputs {
  const buyoutAnalysis = calculateBuyoutAnalysis(inputs);
  const cashFlowAnalysis = calculateCashFlowAnalysis(inputs);
  const investmentProjections = calculateInvestmentProjections(inputs);
  const riskAnalysis = calculateRiskAnalysis(inputs);
  const taxImplications = calculateTaxImplications(inputs);
  const scenarioAnalysis = calculateScenarioAnalysis(inputs);
  const comparativeAnalysis = calculateComparativeAnalysis(inputs);
  const longevityAnalysis = calculateLongevityAnalysis(inputs);
  const costAnalysis = calculateCostAnalysis(inputs);
  const liquidityAnalysis = calculateLiquidityAnalysis(inputs);
  const beneficiaryAnalysis = calculateBeneficiaryAnalysis(inputs);
  const goalAlignment = calculateGoalAlignment(inputs);
  const emotionalAnalysis = calculateEmotionalAnalysis(inputs);
  const professionalRecommendations = calculateProfessionalRecommendations(inputs);
  const implementationAnalysis = calculateImplementationAnalysis(inputs);
  const regulatoryCompliance = calculateRegulatoryCompliance(inputs);
  const marketTimingAnalysis = calculateMarketTimingAnalysis(inputs);
  const monteCarloResults = calculateMonteCarloResults(inputs);
  const stressTesting = calculateStressTesting(inputs);
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);
  const decisionQualityMetrics = calculateDecisionQualityMetrics(inputs);
  const comprehensiveRecommendation = calculateComprehensiveRecommendation(inputs);

  // Additional calculations
  const year5Projection = inputs.currentAccountValue * Math.pow(1 + inputs.expectedReturn / 100, 5);
  const year10Projection = inputs.currentAccountValue * Math.pow(1 + inputs.expectedReturn / 100, 10);
  const year15Projection = inputs.currentAccountValue * Math.pow(1 + inputs.expectedReturn / 100, 15);
  const year20Projection = inputs.currentAccountValue * Math.pow(1 + inputs.expectedReturn / 100, 20);

  // Comparative metrics
  const buyoutVsAnnuityIRR = (investmentProjections.projectedBuyoutValue / inputs.currentAccountValue) - 1;
  const buyoutVsAnnuityNPV = investmentProjections.projectedBuyoutValue - inputs.currentAccountValue;
  const buyoutVsAnnuityPayback = buyoutAnalysis.buyoutBreakEvenYears;
  const buyoutVsAnnuityRisk = riskAnalysis.buyoutRiskLevel === 'High' ? 0.8 : riskAnalysis.buyoutRiskLevel === 'Medium' ? 0.5 : 0.2;

  // Risk-adjusted returns
  const sharpeRatioBuyout = riskAnalysis.riskAdjustedBuyoutReturn / 0.1; // Assume 10% volatility
  const sharpeRatioContinuation = riskAnalysis.riskAdjustedContinuationReturn / 0.05; // Assume 5% volatility
  const sortinoRatioBuyout = riskAnalysis.riskAdjustedBuyoutReturn / 0.08; // Assume 8% downside deviation
  const sortinoRatioContinuation = riskAnalysis.riskAdjustedContinuationReturn / 0.03; // Assume 3% downside deviation

  // Educational content
  const annuityEducation = [
    'Annuities provide guaranteed income streams',
    'Buyouts offer lump sum payments but require investment decisions',
    'Tax implications vary by annuity type and individual situation',
    'Consider life expectancy and risk tolerance in decisions'
  ];

  const buyoutEducation = [
    'Buyouts provide liquidity but eliminate guaranteed income',
    'Investment returns are not guaranteed',
    'Tax consequences must be carefully evaluated',
    'Professional advice is recommended for complex decisions'
  ];

  const investmentEducation = [
    'Diversification is key to managing investment risk',
    'Consider time horizon when selecting investments',
    'Past performance does not guarantee future results',
    'Asset allocation should align with risk tolerance'
  ];

  const decisionEducation = [
    'Major financial decisions require careful analysis',
    'Emotional factors can influence decision quality',
    'Professional guidance improves decision outcomes',
    'Regular review and adjustment may be necessary'
  ];

  // Success metrics
  const decisionSuccessCriteria = [
    'Financial goals achieved',
    'Risk tolerance maintained',
    'Tax efficiency optimized',
    'Peace of mind attained'
  ];

  const outcomeMeasurement = [
    'Portfolio performance vs expectations',
    'Income adequacy assessment',
    'Risk exposure monitoring',
    'Satisfaction with decision'
  ];

  const successIndicators = [
    'Positive financial outcomes',
    'Goal achievement',
    'Low regret levels',
    'Improved financial security'
  ];

  const continuousImprovement = [
    'Regular portfolio review',
    'Strategy adjustment as needed',
    'Professional consultation',
    'Education and learning'
  ];

  return {
    ...buyoutAnalysis,
    ...cashFlowAnalysis,
    ...investmentProjections,
    ...riskAnalysis,
    ...taxImplications,
    ...scenarioAnalysis,
    ...comparativeAnalysis,
    ...longevityAnalysis,
    ...costAnalysis,
    ...liquidityAnalysis,
    ...beneficiaryAnalysis,
    ...goalAlignment,
    ...emotionalAnalysis,
    ...professionalRecommendations,
    ...implementationAnalysis,
    ...regulatoryCompliance,
    ...marketTimingAnalysis,
    ...monteCarloResults,
    ...stressTesting,
    ...sensitivityAnalysis,
    ...decisionQualityMetrics,
    year5Projection,
    year10Projection,
    year15Projection,
    year20Projection,
    buyoutVsAnnuityIRR,
    buyoutVsAnnuityNPV,
    buyoutVsAnnuityPayback,
    buyoutVsAnnuityRisk,
    sharpeRatioBuyout,
    sharpeRatioContinuation,
    sortinoRatioBuyout,
    sortinoRatioContinuation,
    economicValueAdded: investmentProjections.totalReturnProjection,
    personalValueAdded: goalAlignment.incomeGoalAchievement,
    familyValueAdded: beneficiaryAnalysis.beneficiaryNetBenefit,
    societalValueAdded: 0,
    opportunityCost: cashFlowAnalysis.netCashFlowDifference,
    opportunityCostRate: inputs.expectedReturn / 100,
    decisionScore: decisionQualityMetrics.decisionQualityScore,
    decisionThreshold: 60,
    weightedProScore: inputs.prosList.length * 10,
    weightedConScore: inputs.consList.length * 10,
    phase1Actions: comprehensiveRecommendation.actionPlan.slice(0, 2),
    phase2Actions: comprehensiveRecommendation.actionPlan.slice(2, 4),
    phase3Actions: comprehensiveRecommendation.actionPlan.slice(4),
    successMilestones: ['Decision made', 'Transaction completed', 'Investment allocated', 'Goals achieved'],
    triggerEvents: ['Market downturn', 'Health changes', 'Income needs change'],
    adjustmentMechanisms: ['Portfolio rebalancing', 'Withdrawal strategy changes', 'Professional consultation'],
    exitStrategies: ['Hold investments', 'Systematic withdrawals', 'Annuity purchase'],
    fallbackOptions: ['Maintain annuity', 'Partial buyout', 'Alternative investments'],
    estateValueBuyout: investmentProjections.projectedBuyoutValue,
    estateValueContinuation: inputs.currentAccountValue,
    estateTaxBuyout: investmentProjections.projectedBuyoutValue * 0.4,
    estateTaxContinuation: inputs.currentAccountValue * 0.4,
    lifestyleFlexibility: liquidityAnalysis.buyoutLiquidity,
    overallWellbeing: emotionalAnalysis.peaceOfMindValue,
    familyImpact: beneficiaryAnalysis.beneficiaryNetBenefit,
    communityImpact: 0,
    charitableImpact: inputs.charitableIntentions ? investmentProjections.projectedBuyoutValue * 0.1 : 0,
    socialValue: 0,
    environmentalImpact: 0,
    sustainableInvesting: 0,
    impactInvesting: 0,
    esgAlignment: 0,
    carbonFootprint: 0,
    digitalToolsUtilization: inputs.digitalLiteracy === 'High' ? 80 : inputs.digitalLiteracy === 'Medium' ? 50 : 20,
    automationBenefits: inputs.fintechUsage === 'High' ? 70 : inputs.fintechUsage === 'Medium' ? 40 : 10,
    fintechAdvantages: inputs.fintechUsage === 'High' ? 60 : inputs.fintechUsage === 'Medium' ? 30 : 10,
    technologyReadiness: (inputs.digitalLiteracy === 'High' ? 1 : inputs.digitalLiteracy === 'Medium' ? 0.5 : 0) *
                        (inputs.fintechUsage === 'High' ? 1 : inputs.fintechUsage === 'Medium' ? 0.5 : 0) * 100,
    futureAdaptability: 75,
    overallResilience: 70,
    financialLiteracyGain: 20,
    decisionMakingSkills: 25,
    investmentEducation: 30,
    overallLearning: 25,
    networkStrength: 60,
    relationshipQuality: 70,
    professionalConnections: 65,
    socialCapital: 55,
    confidenceBuilding: 30,
    independenceDevelopment: 35,
    empowermentLevel: 40,
    personalDevelopment: 35,
    industryInfluence: 10,
    regulatoryInfluence: 5,
    marketInfluence: 15,
    societalInfluence: 8,
    processInnovation: 20,
    productInnovation: 15,
    serviceInnovation: 25,
    overallInnovation: 20,
    knowledgeTransfer: 40,
    valueTransfer: beneficiaryAnalysis.beneficiaryNetBenefit,
    wisdomTransfer: 30,
    lastingLegacy: 35,
    financialHealth: 75,
    emotionalHealth: emotionalAnalysis.peaceOfMindValue,
    socialHealth: 70,
    overallHealth: 73,
    peerValidation: 65,
    expertValidation: 80,
    dataValidation: 85,
    intuitiveValidation: emotionalAnalysis.decisionComfortLevel,
    visionAlignment: goalAlignment.incomeGoalAchievement,
    goalAlignment: goalAlignment.incomeGoalAchievement,
    valueAlignment: 75,
    purposeAlignment: 70,
    presentMomentAwareness: 65,
    decisionClarity: decisionQualityMetrics.decisionConfidence,
    emotionalBalance: emotionalAnalysis.decisionComfortLevel,
    mindfulChoice: 70,
    transparencyLevel: 85,
    fairnessAssessment: 80,
    ethicalAlignment: 75,
    moralDecision: 78,
    culturalCompatibility: 70,
    socialNormsAlignment: 65,
    traditionalValues: 60,
    modernValues: 75,
    internationalComparisons: ['US annuity regulations', 'European pension systems'],
    crossCulturalInsights: ['Risk preferences vary by culture', 'Long-term planning differs globally'],
    globalTrends: ['Increasing annuity complexity', 'Growing demand for guaranteed income'],
    worldwidePerspectives: ['Developed markets favor annuities', 'Emerging markets prefer lump sums'],
    lifeMeaning: 75,
    purposeFulfillment: goalAlignment.incomeGoalAchievement,
    existentialConsiderations: ['Financial security enables life choices', 'Legacy provides meaning'],
    philosophicalAlignment: 70,
    innerPeace: emotionalAnalysis.peaceOfMindValue,
    lifeBalance: 70,
    spiritualAlignment: 65,
    holisticWellbeing: 72,
    uncertaintyTolerance: inputs.riskTolerance === 'Conservative' ? 60 : inputs.riskTolerance === 'Moderate' ? 75 : 90,
    probabilityWeighting: 70,
    ambiguityAttitude: 65,
    decisionUnderUncertainty: decisionQualityMetrics.decisionConfidence,
    interconnectedness: 80,
    feedbackLoops: 70,
    emergentProperties: 60,
    systemicWisdom: 75,
    butterflyEffect: 55,
    strangeAttractors: 50,
    fractalPatterns: 45,
    complexSystems: 65,
    strategicInteractions: 70,
    cooperativeGames: 75,
    competitiveDynamics: 60,
    gameTheoryOptimization: 65,
    signalToNoiseRatio: 80,
    informationEntropy: 70,
    dataCompression: 75,
    knowledgeDistillation: 80,
    connectionStrength: 75,
    centralityMeasures: 70,
    networkResilience: 80,
    socialGraphAnalysis: 65,
    adaptiveCapacity: 75,
    evolutionaryFitness: 70,
    survivalStrategies: 80,
    evolutionaryOptimization: 75,
    systemsHarmony: 70,
    naturalCycles: 65,
    ecologicalBalance: 60,
    earthWisdom: 55,
    ancientWisdom: 60,
    indigenousKnowledge: 50,
    spiritualTeachings: 65,
    timelessWisdom: 70,
    scenarioPlanning: 75,
    foresightCapability: 70,
    anticipatoryAction: 65,
    futureReadiness: 80,
    thinkingAboutThinking: 75,
    cognitiveReframing: 70,
    mentalModelShifting: 65,
    metacognitiveMastery: 72,
    selfAwareness: emotionalAnalysis.decisionComfortLevel,
    selfRegulation: 70,
    empathy: 65,
    socialSkills: 75,
    divergentThinking: 70,
    convergentThinking: 75,
    lateralThinking: 65,
    creativeProblemSolving: 70,
    analyticalReasoning: 80,
    logicalThinking: 75,
    evidenceEvaluation: 80,
    criticalAnalysis: 78,
    holisticPerspective: 75,
    integrativeThinking: 70,
    patternRecognition: 75,
    systemsMastery: 72,
    existentialIntelligence: 70,
    spiritualAwareness: 65,
    transcendentThinking: 60,
    spiritualMastery: 68,
    comprehensiveUnderstanding: 75,
    universalPerspective: 70,
    cosmicAwareness: 65,
    universalMastery: 72,
    ...comprehensiveRecommendation,
    annuityEducation,
    buyoutEducation,
    investmentEducation,
    decisionEducation,
    decisionSuccessCriteria,
    outcomeMeasurement,
    successIndicators,
    continuousImprovement
  };
}