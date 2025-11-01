export interface ShitcoinInvestmentInputs {
  // Investment details
  investmentAmount: number;
  shitcoinName: string;
  currentPrice: number;
  marketCap: number;
  tokenSupply: number;

  // Project fundamentals
  projectMaturity: 'Pre-launch' | 'Early Stage' | 'MVP' | 'Beta' | 'Live' | 'Established';
  teamExperience: 'Anonymous' | 'Beginner' | 'Experienced' | 'Expert';
  codeQuality: 'No Code' | 'Poor' | 'Average' | 'Good' | 'Excellent';
  tokenomics: 'Poor' | 'Average' | 'Good' | 'Excellent';

  // Market analysis
  marketPosition: 'First Mover' | 'Fast Follower' | 'Late Entrant' | 'Copycat';
  competitiveLandscape: 'No Competition' | 'Light Competition' | 'Moderate Competition' | 'Crowded';
  hypeLevel: 'None' | 'Low' | 'Medium' | 'High' | 'Insane';

  // Risk assessment
  rugPullRisk: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  liquidityRisk: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  regulatoryRisk: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  technicalRisk: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';

  // Investment strategy
  investmentHorizon: 'Short-term' | 'Medium-term' | 'Long-term' | 'Diamond Hands';
  riskTolerance: 'Degenerate' | 'High' | 'Medium' | 'Low' | 'Conservative';
  diversificationLevel: 'YOLO Single' | 'Few Projects' | 'Moderate' | 'Well Diversified';

  // Market conditions
  cryptoMarketCycle: 'Bear' | 'Accumulation' | 'Bull' | 'Euphoria' | 'Capitulation';
  altcoinSeason: 'Winter' | 'Spring' | 'Summer' | 'Fall';
  bitcoinDominance: number;

  // Technical analysis
  priceAction: 'Strong Uptrend' | 'Weak Uptrend' | 'Sideways' | 'Weak Downtrend' | 'Strong Downtrend';
  volumeProfile: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  socialSentiment: 'Very Bearish' | 'Bearish' | 'Neutral' | 'Bullish' | 'Very Bullish';

  // Community factors
  communitySize: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Massive';
  communityEngagement: 'Ghost Town' | 'Low' | 'Moderate' | 'High' | 'Insane';
  influencerEndorsements: 'None' | 'Few' | 'Some' | 'Many' | 'Celebrities';

  // Financial projections
  expectedReturn: number; // Percentage
  timeToMoon: number; // Months
  probabilityOfSuccess: number; // Percentage
  maxLossTolerance: number; // Percentage

  // Cost analysis
  transactionFees: number;
  gasFees: number;
  exchangeFees: number;
  walletFees: number;

  // Analysis options
  includeMemePotential: boolean;
  includeHypeFactor: boolean;
  includeLuckElement: boolean;
  includeDiamondHandsFactor: boolean;

  // Comparative analysis
  compareToBitcoin: boolean;
  compareToEthereum: boolean;
  compareToOtherShitcoins: boolean;
  compareToTraditionalInvestments: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Goal alignment
  primaryGoal: 'Get Rich Quick' | 'Portfolio Diversification' | 'Fun/Hobby' | 'Long-term Hold';
  secondaryGoal: 'Get Rich Quick' | 'Portfolio Diversification' | 'Fun/Hobby' | 'Long-term Hold';

  // Behavioral factors
  fomoLevel: 'None' | 'Low' | 'Medium' | 'High' | 'Extreme';
  greedIndex: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Insane';
  fearIndex: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Paralyzing';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';
  technologyOutlook: 'Stable' | 'Disruptive' | 'Transformative';

  // Regulatory compliance
  secCompliance: boolean;
  kycRequirements: boolean;
  taxReporting: boolean;
  internationalCompliance: boolean;

  // Performance tracking
  reviewFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Never';
  profitTakingStrategy: 'None' | 'Partial' | 'Full' | 'HODL Forever';
  stopLossStrategy: 'None' | 'Loose' | 'Moderate' | 'Tight' | 'Very Tight';

  // Education and communication
  cryptoKnowledge: 'NGMI' | 'Basic' | 'Intermediate' | 'Advanced' | 'WAGMI';
  riskEducation: 'None' | 'Basic' | 'Comprehensive';
  communityInvolvement: 'None' | 'Observer' | 'Participant' | 'Influencer';

  // Documentation
  whitepaper: boolean;
  auditReports: boolean;
  tokenMetrics: boolean;
  roadmap: boolean;

  // Timeline
  investmentDuration: number; // Months
  exitStrategy: 'Quick Flip' | 'Medium Term' | 'Long Term' | 'Diamond Hands';

  // Contingency planning
  rugPullProtection: boolean;
  diversificationBackup: boolean;
  emergencyExit: boolean;

  // Quality of life
  stressLevel: 'None' | 'Low' | 'Medium' | 'High' | 'Heart Attack';
  sleepQuality: 'Excellent' | 'Good' | 'Poor' | 'Insomnia';
  relationshipImpact: 'Positive' | 'Neutral' | 'Negative' | 'Divorce';

  // Future flexibility
  portfolioRebalancing: boolean;
  strategyAdaptation: boolean;
  exitFlexibility: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
    memePotential: 'Low' | 'Medium' | 'High' | 'Viral';
  }>;

  // Historical performance
  investmentHistory: number[];
  shitcoinPerformance: number[];
  marketPerformance: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  communityPressure: string;
  peerInfluence: string;
  socialProof: string;

  // Technological factors
  blockchainQuality: 'Poor' | 'Average' | 'Good' | 'Excellent';
  smartContractSecurity: 'Unknown' | 'Audited' | 'Battle Tested';
  scalability: 'Poor' | 'Average' | 'Good' | 'Excellent';

  // Regulatory changes
  pendingRegulations: boolean;
  complianceChanges: boolean;

  // Market timing
  entryTiming: 'Perfect' | 'Good' | 'Poor' | 'Terrible';
  exitTiming: 'Perfect' | 'Good' | 'Poor' | 'Terrible';

  // Professional advice
  financialAdvisor: boolean;
  cryptoExpert: boolean;
  technicalAnalyst: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  riskComfort: 'High' | 'Medium' | 'Low';
  volatilityTolerance: 'High' | 'Medium' | 'Low';

  // Financial readiness
  capitalAvailable: number;
  riskCapital: number;
  emergencyFund: 'Adequate' | 'Minimal' | 'None';

  // Knowledge assessment
  shitcoinUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  marketUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  riskUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  communitySupport: boolean;
  expertNetwork: boolean;
  peerNetwork: boolean;
  familySupport: boolean;

  // Decision framework
  prosList: string[];
  consList: string[];
  decisionCriteria: string[];
  weightedCriteria: Array<{ criterion: string; weight: number }>;

  // Implementation plan
  actionSteps: string[];
  timeline: string[];
  responsibleParties: string[];
  successMetrics: string[];

  // Contingency plans
  bestCaseScenario: string;
  worstCaseScenario: string;
  mostLikelyScenario: string;
  riskMitigation: string[];

  // Long-term vision
  oneYearVision: string;
  threeYearVision: string;
  fiveYearVision: string;

  // Values alignment
  personalValues: string[];
  investmentValues: string[];
  decisionAlignment: number;

  // Mindfulness and reflection
  strategicThinking: boolean;
  stakeholderConsideration: boolean;
  longTermPerspective: number;

  // External validation
  peerReview: boolean;
  expertValidation: boolean;
  marketValidation: boolean;

  // Final checklist
  allFactorsConsidered: boolean;
  dueDiligenceComplete: boolean;
  professionalAdviceObtained: boolean;
  documentationComplete: boolean;
}

export interface ShitcoinInvestmentOutputs {
  // Investment returns
  expectedReturn: number;
  potentialMoonshot: number;
  rugPullProbability: number;
  diamondHandsReward: number;

  // Risk analysis
  totalRiskScore: number;
  volatilityIndex: number;
  blackSwanProbability: number;
  totalLossPotential: number;

  // Meme analysis
  hypeFactor: number;
  viralPotential: number;
  communityStrength: number;
  influencerImpact: number;

  // Technical analysis
  priceMomentum: number;
  volumeAnalysis: number;
  chartPatterns: string[];
  technicalScore: number;

  // Fundamental analysis
  projectViability: number;
  teamStrength: number;
  tokenomicsScore: number;
  competitiveAdvantage: number;

  // Scenario analysis
  bestCaseReturn: number;
  worstCaseReturn: number;
  baseCaseReturn: number;
  probabilityOfMoon: number;

  // Comparative analysis
  vsBitcoin: number;
  vsEthereum: number;
  vsOtherShitcoins: number;
  vsTraditionalInvestments: number;

  // Cost analysis
  totalInvestmentCost: number;
  ongoingCosts: number;
  opportunityCost: number;
  emotionalCost: number;

  // Efficiency metrics
  riskAdjustedReturn: number;
  efficiencyRatio: number;
  memeEfficiency: number;
  timeEfficiency: number;

  // Decision quality metrics
  informationCompleteness: number;
  analysisRigor: number;
  decisionConfidence: number;
  decisionQualityScore: number;

  // Behavioral insights
  cognitiveBiases: string[];
  emotionalFactors: string[];
  socialInfluences: string[];
  behavioralRecommendations: string[];

  // Financial impact
  portfolioDiversification: number;
  wealthCreationPotential: number;
  riskExposure: number;
  opportunityCost: number;

  // Regulatory compliance
  complianceRisk: number;
  regulatoryExposure: number;
  legalProtection: number;
  reportingRequirements: number;

  // Performance attribution
  projectSuccessAttribution: number;
  marketTimingAttribution: number;
  luckAttribution: number;
  strategyAttribution: number;

  // Sustainability analysis
  projectSustainability: number;
  marketSustainability: number;
  personalSustainability: number;
  longTermViability: number;

  // Technology integration
  blockchainEfficiency: number;
  smartContractReliability: number;
  scalabilityPotential: number;
  innovationPotential: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  investorPsychology: number;

  // Market analysis
  marketPosition: number;
  sectorPerformance: number;
  timingEfficiency: number;
  momentumIndicators: number;

  // Economic analysis
  economicSensitivity: number;
  inflationImpact: number;
  interestRateSensitivity: number;
  macroeconomicFactors: number;

  // Geographic analysis
  globalAdoption: number;
  regionalInterest: number;
  jurisdictionalRisk: number;
  internationalExposure: number;

  // Innovation opportunities
  technologicalInnovation: number;
  businessModelInnovation: number;
  marketInnovation: number;
  disruptivePotential: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  communitySatisfaction: number;
  investorSatisfaction: number;
  teamSatisfaction: number;
  ecosystemImpact: number;

  // Success metrics
  investmentSuccess: number;
  portfolioEnhancement: number;
  memeSuccess: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'YOLO Buy' | 'Diamond Hands Hold' | 'Partial Position' | 'NGMI Avoid';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  shitcoinEducation: string[];
  riskEducation: string[];
  strategyEducation: string[];
  marketEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  implementationSuccess: number;
  overallAchievement: number;

  // Future considerations
  regulatoryOutlook: string[];
  marketTrends: string[];
  technologyImpact: string[];
  evolutionPotential: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];
  monitoringRequirements: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  legalCompliance: number;
  taxCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  investmentMetrics: string[];
  portfolioMetrics: string[];
  memeMetrics: string[];
  overallMetrics: string[];

  // Risk monitoring
  riskIndicators: string[];
  earlyWarningSignals: string[];
  mitigationStrategies: string[];
  contingencyPlans: string[];

  // Value optimization
  optimizationOpportunities: string[];
  efficiencyImprovements: string[];
  riskReductions: string[];
  valueEnhancements: string[];

  // Stakeholder engagement
  communityEngagement: number;
  investorEngagement: number;
  teamEngagement: number;
  ecosystemEngagement: number;

  // Innovation metrics
  technologicalInnovation: number;
  processInnovation: number;
  serviceInnovation: number;
  overallInnovation: number;

  // Sustainability analysis
  longTermSustainability: number;
  environmentalImpact: number;
  socialImpact: number;
  governanceImpact: number;

  // Holistic assessment
  financialHealth: number;
  psychologicalHealth: number;
  socialHealth: number;
  overallHealth: number;

  // Decision validation
  peerValidation: number;
  expertValidation: number;
  dataValidation: number;
  intuitiveValidation: number;

  // Future vision alignment
  visionAlignment: number;
  goalAlignment: number;
  valueAlignment: number;
  purposeAlignment: number;

  // Mindfulness metrics
  presentMomentAwareness: number;
  decisionClarity: number;
  emotionalBalance: number;
  mindfulChoice: number;

  // Comprehensive recommendation
  finalRecommendation: 'Ape In' | 'Strategic Buy' | 'Wait and Watch' | 'Hard Pass';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  cryptocurrencyEducation: string[];
  behavioralFinanceEducation: string[];
  technicalAnalysisEducation: string[];
  decisionMakingEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  projectAttribution: number;
  marketAttribution: number;
  timingAttribution: number;
  luckAttribution: number;

  // Stress testing results
  stressTestResults: {
    marketCrash: number;
    rugPull: number;
    regulatoryCrackdown: number;
    communityAbandonment: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    blueChipCrypto: number;
    diversifiedShitcoin: number;
    traditionalInvestments: number;
    cashHolding: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioVolatility: number;
  portfolioReturnPotential: number;
  portfolioRiskAdjustment: number;

  // Legacy value
  investmentLegacy: number;
  portfolioLegacy: number;
  memeLegacy: number;
  lastingLegacy: number;

  // Innovation impact
  technologyAdvancement: number;
  processImprovement: number;
  userExperience: number;
  competitiveAdvantage: number;

  // Future outlook
  trendAnalysis: string[];
  opportunityAssessment: string[];
  riskAssessment: string[];
  strategicDirection: string[];

  // Action planning
  immediateActions: string[];
  shortTermGoals: string[];
  mediumTermObjectives: string[];
  longTermVision: string[];

  // Monitoring and evaluation
  keyPerformanceIndicators: string[];
  successMetrics: string[];
  reviewFrequency: string;
  adjustmentTriggers: string[];

  // Value creation
  financialValue: number;
  entertainmentValue: number;
  socialValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}