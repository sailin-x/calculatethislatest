import { MortgageLifeInputs } from './validation';

export interface LifeInsuranceResult {
  mortgageProtectionNeeded: number;
  totalLifeInsuranceNeeded: number;
  additionalCoverageNeeded: number;
  monthlyPremium: number;
  annualPremium: number;
  totalPremiumCost: number;
  coverageAnalysis: CoverageAnalysis;
  policyComparison: PolicyComparison;
  costBenefitAnalysis: CostBenefitAnalysis;
  riskAssessment: RiskAssessment;
  recommendations: string;
  keyMetrics: KeyMetrics;
  mortgageLifeAnalysis: string;
}

export interface CoverageAnalysis {
  mortgageProtection: number;
  incomeReplacement: number;
  debtCoverage: number;
  educationFunding: number;
  finalExpenses: number;
  emergencyFund: number;
  coverageBreakdown: CoverageBreakdown;
  adequacyScore: number;
  coverageGap: number;
}

export interface CoverageBreakdown {
  immediateNeeds: number;
  shortTermNeeds: number;
  longTermNeeds: number;
  legacyNeeds: number;
}

export interface PolicyComparison {
  policyTypes: PolicyType[];
  recommendedPolicy: string;
  costComparison: CostComparison;
  featureComparison: FeatureComparison;
}

export interface PolicyType {
  name: string;
  monthlyPremium: number;
  annualPremium: number;
  totalCost: number;
  pros: string[];
  cons: string[];
  suitability: string;
}

export interface CostComparison {
  termLife: number;
  wholeLife: number;
  universalLife: number;
  mortgageProtection: number;
  bestValue: string;
}

export interface FeatureComparison {
  termLife: PolicyFeatures;
  wholeLife: PolicyFeatures;
  universalLife: PolicyFeatures;
  mortgageProtection: PolicyFeatures;
}

export interface PolicyFeatures {
  cashValue: boolean;
  guaranteedRenewal: boolean;
  conversionOption: boolean;
  ridersAvailable: boolean;
  premiumFlexibility: boolean;
}

export interface CostBenefitAnalysis {
  totalPremiumCost: number;
  totalCoverage: number;
  costBenefitRatio: number;
  breakEvenYears: number;
  roi: number;
  valueAssessment: string;
}

export interface RiskAssessment {
  healthRisk: string;
  lifestyleRisk: string;
  occupationRisk: string;
  familyHistoryRisk: string;
  overallRisk: string;
  underwritingClass: string;
  premiumMultiplier: number;
}

export interface KeyMetrics {
  coverageRatio: number;
  premiumBurden: number;
  protectionAdequacy: string;
  costEfficiency: string;
  riskLevel: string;
}

export const calculateMortgageLifeInsurance = (inputs: MortgageLifeInputs): LifeInsuranceResult => {
  // Calculate mortgage protection needs
  const mortgageProtectionNeeded = calculateMortgageProtection(inputs);
  
  // Calculate total life insurance needs
  const totalLifeInsuranceNeeded = calculateTotalLifeInsuranceNeeds(inputs);
  
  // Calculate additional coverage needed
  const additionalCoverageNeeded = Math.max(0, totalLifeInsuranceNeeded - (inputs.existingLifeInsurance || 0));
  
  // Calculate premiums
  const premiumAnalysis = calculatePremiums(inputs, additionalCoverageNeeded);
  
  // Analyze coverage
  const coverageAnalysis = analyzeCoverage(inputs, totalLifeInsuranceNeeded);
  
  // Compare policy types
  const policyComparison = comparePolicyTypes(inputs, additionalCoverageNeeded);
  
  // Analyze cost-benefit
  const costBenefitAnalysis = analyzeCostBenefit(inputs, premiumAnalysis, additionalCoverageNeeded);
  
  // Assess risk
  const riskAssessment = assessRisk(inputs);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, coverageAnalysis, policyComparison, riskAssessment);
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, coverageAnalysis, premiumAnalysis);
  
  // Generate comprehensive analysis
  const mortgageLifeAnalysis = generateComprehensiveAnalysis(inputs, coverageAnalysis, policyComparison, costBenefitAnalysis, riskAssessment);
  
  return {
    mortgageProtectionNeeded,
    totalLifeInsuranceNeeded,
    additionalCoverageNeeded,
    monthlyPremium: premiumAnalysis.monthlyPremium,
    annualPremium: premiumAnalysis.annualPremium,
    totalPremiumCost: premiumAnalysis.totalCost,
    coverageAnalysis,
    policyComparison,
    costBenefitAnalysis,
    riskAssessment,
    recommendations,
    keyMetrics,
    mortgageLifeAnalysis
  };
};

const calculateMortgageProtection = (inputs: MortgageLifeInputs): number => {
  const mortgageBalance = inputs.mortgageBalance;
  const monthlyPayment = inputs.monthlyPayment;
  const yearsToProtect = inputs.policyTerm || inputs.loanTerm || 30;
  
  // Basic mortgage protection: balance + monthly payments for protection period
  let protection = mortgageBalance + (monthlyPayment * 12 * yearsToProtect);
  
  // Adjust for inflation
  const inflationRate = inputs.inflationRate || 2.5;
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToProtect);
  protection *= inflationFactor;
  
  return protection;
};

const calculateTotalLifeInsuranceNeeds = (inputs: MortgageLifeInputs): number => {
  let totalNeed = 0;
  
  // Mortgage protection
  totalNeed += calculateMortgageProtection(inputs);
  
  // Income replacement
  if (inputs.annualIncome) {
    const yearsToRetirement = inputs.yearsToRetirement || 30;
    const taxRate = 0.25; // Estimated tax rate
    const incomeReplacement = inputs.annualIncome * yearsToRetirement * (1 - taxRate);
    totalNeed += incomeReplacement;
  }
  
  // Debt coverage (excluding mortgage)
  if (inputs.otherDebts) {
    totalNeed += inputs.otherDebts;
  }
  
  // Education funding
  if (inputs.dependents && inputs.dependentsAge) {
    const yearsToCollege = Math.max(0, 18 - inputs.dependentsAge);
    const collegeCost = 50000; // Estimated annual college cost
    const totalCollegeCost = collegeCost * 4 * inputs.dependents;
    if (yearsToCollege > 0) {
      const investmentReturn = inputs.investmentReturn || 6;
      const presentValue = totalCollegeCost / Math.pow(1 + investmentReturn / 100, yearsToCollege);
      totalNeed += presentValue;
    } else {
      totalNeed += totalCollegeCost;
    }
  }
  
  // Final expenses
  totalNeed += 15000; // Estimated final expenses
  
  // Emergency fund
  if (inputs.annualIncome) {
    totalNeed += inputs.annualIncome * 0.5; // 6 months of income
  }
  
  return totalNeed;
};

const calculatePremiums = (inputs: MortgageLifeInputs, coverageAmount: number): { monthlyPremium: number; annualPremium: number; totalCost: number } => {
  const baseRate = getBaseRate(inputs.borrowerAge, inputs.policyType || 'Term Life');
  const riskMultiplier = calculateRiskMultiplier(inputs);
  const coverageInThousands = coverageAmount / 1000;
  
  let annualPremium = baseRate * coverageInThousands * riskMultiplier;
  
  // Adjust for policy type
  const policyTypeMultiplier = getPolicyTypeMultiplier(inputs.policyType || 'Term Life');
  annualPremium *= policyTypeMultiplier;
  
  // Adjust for riders
  const riderMultiplier = calculateRiderMultiplier(inputs.riders || []);
  annualPremium *= riderMultiplier;
  
  const monthlyPremium = annualPremium / 12;
  const policyTerm = inputs.policyTerm || 30;
  const totalCost = annualPremium * policyTerm;
  
  return { monthlyPremium, annualPremium, totalCost };
};

const getBaseRate = (age: number, policyType: string): number => {
  // Base rates per $1000 of coverage (simplified)
  const baseRates: { [key: string]: { [key: number]: number } } = {
    'Term Life': {
      25: 0.5, 30: 0.6, 35: 0.8, 40: 1.2, 45: 1.8, 50: 2.5, 55: 3.5, 60: 5.0, 65: 7.5
    },
    'Whole Life': {
      25: 8.0, 30: 10.0, 35: 12.0, 40: 15.0, 45: 18.0, 50: 22.0, 55: 28.0, 60: 35.0, 65: 45.0
    },
    'Universal Life': {
      25: 6.0, 30: 7.5, 35: 9.0, 40: 11.0, 45: 13.5, 50: 16.5, 55: 20.0, 60: 25.0, 65: 32.0
    },
    'Mortgage Protection': {
      25: 0.4, 30: 0.5, 35: 0.7, 40: 1.0, 45: 1.5, 50: 2.2, 55: 3.0, 60: 4.5, 65: 6.5
    }
  };
  
  const rates = baseRates[policyType] || baseRates['Term Life'];
  const ageKey = Math.floor(age / 5) * 5;
  return rates[ageKey] || rates[65];
};

const calculateRiskMultiplier = (inputs: MortgageLifeInputs): number => {
  let multiplier = 1.0;
  
  // Health status multiplier
  const healthMultipliers = {
    'Excellent': 0.8,
    'Very Good': 0.9,
    'Good': 1.0,
    'Fair': 1.3,
    'Poor': 2.0,
    'Prefer Not to Say': 1.2
  };
  multiplier *= healthMultipliers[inputs.healthStatus as keyof typeof healthMultipliers] || 1.0;
  
  // Smoking status multiplier
  const smokingMultipliers = {
    'Non-Smoker': 1.0,
    'Former Smoker': 1.2,
    'Occasional Smoker': 1.5,
    'Regular Smoker': 2.5,
    'Prefer Not to Say': 1.3
  };
  multiplier *= smokingMultipliers[inputs.smokingStatus as keyof typeof smokingMultipliers] || 1.0;
  
  // Occupation multiplier
  const occupationMultipliers = {
    'Professional': 1.0,
    'Office Worker': 1.0,
    'Skilled Labor': 1.1,
    'Unskilled Labor': 1.2,
    'Military': 1.3,
    'Student': 0.9,
    'Retired': 1.1,
    'Self-Employed': 1.1,
    'Other': 1.1
  };
  multiplier *= occupationMultipliers[inputs.occupation as keyof typeof occupationMultipliers] || 1.0;
  
  // Family history multiplier
  const familyHistoryMultipliers = {
    'Low Risk': 1.0,
    'Moderate Risk': 1.2,
    'High Risk': 1.5,
    'Unknown': 1.1
  };
  multiplier *= familyHistoryMultipliers[inputs.familyHistory as keyof typeof familyHistoryMultipliers] || 1.0;
  
  return multiplier;
};

const getPolicyTypeMultiplier = (policyType: string): number => {
  const multipliers = {
    'Term Life': 1.0,
    'Whole Life': 3.0,
    'Universal Life': 2.5,
    'Variable Life': 2.8,
    'Mortgage Protection': 0.9,
    'Decreasing Term': 0.8,
    'Level Term': 1.0,
    'Return of Premium': 1.5
  };
  return multipliers[policyType as keyof typeof multipliers] || 1.0;
};

const calculateRiderMultiplier = (riders: string[]): number => {
  let multiplier = 1.0;
  
  const riderMultipliers = {
    'Accidental Death': 1.1,
    'Disability Waiver': 1.2,
    'Critical Illness': 1.3,
    'Long-Term Care': 1.4,
    'Child Rider': 1.05,
    'Spouse Rider': 1.15,
    'Guaranteed Insurability': 1.1,
    'Return of Premium': 1.5
  };
  
  riders.forEach(rider => {
    multiplier *= riderMultipliers[rider as keyof typeof riderMultipliers] || 1.0;
  });
  
  return multiplier;
};

const analyzeCoverage = (inputs: MortgageLifeInputs, totalNeed: number): CoverageAnalysis => {
  const mortgageProtection = calculateMortgageProtection(inputs);
  const incomeReplacement = inputs.annualIncome ? inputs.annualIncome * (inputs.yearsToRetirement || 30) * 0.75 : 0;
  const debtCoverage = inputs.otherDebts || 0;
  const educationFunding = calculateEducationFunding(inputs);
  const finalExpenses = 15000;
  const emergencyFund = inputs.annualIncome ? inputs.annualIncome * 0.5 : 0;
  
  const coverageBreakdown = {
    immediateNeeds: finalExpenses + emergencyFund,
    shortTermNeeds: mortgageProtection + debtCoverage,
    longTermNeeds: incomeReplacement + educationFunding,
    legacyNeeds: totalNeed - (finalExpenses + emergencyFund + mortgageProtection + debtCoverage + incomeReplacement + educationFunding)
  };
  
  const existingCoverage = inputs.existingLifeInsurance || 0;
  const coverageGap = Math.max(0, totalNeed - existingCoverage);
  const adequacyScore = existingCoverage > 0 ? Math.min(100, (existingCoverage / totalNeed) * 100) : 0;
  
  return {
    mortgageProtection,
    incomeReplacement,
    debtCoverage,
    educationFunding,
    finalExpenses,
    emergencyFund,
    coverageBreakdown,
    adequacyScore,
    coverageGap
  };
};

const calculateEducationFunding = (inputs: MortgageLifeInputs): number => {
  if (!inputs.dependents || !inputs.dependentsAge) return 0;
  
  const yearsToCollege = Math.max(0, 18 - inputs.dependentsAge);
  const collegeCost = 50000;
  const totalCollegeCost = collegeCost * 4 * inputs.dependents;
  
  if (yearsToCollege > 0) {
    const investmentReturn = inputs.investmentReturn || 6;
    return totalCollegeCost / Math.pow(1 + investmentReturn / 100, yearsToCollege);
  }
  
  return totalCollegeCost;
};

const comparePolicyTypes = (inputs: MortgageLifeInputs, coverageAmount: number): PolicyComparison => {
  const policyTypes: PolicyType[] = [];
  const policyOptions = ['Term Life', 'Whole Life', 'Universal Life', 'Mortgage Protection'];
  
  policyOptions.forEach(policyType => {
    const baseRate = getBaseRate(inputs.borrowerAge, policyType);
    const riskMultiplier = calculateRiskMultiplier(inputs);
    const policyMultiplier = getPolicyTypeMultiplier(policyType);
    const coverageInThousands = coverageAmount / 1000;
    
    const annualPremium = baseRate * coverageInThousands * riskMultiplier * policyMultiplier;
    const monthlyPremium = annualPremium / 12;
    const policyTerm = inputs.policyTerm || 30;
    const totalCost = annualPremium * policyTerm;
    
    const pros = getPolicyPros(policyType);
    const cons = getPolicyCons(policyType);
    const suitability = assessPolicySuitability(policyType, inputs);
    
    policyTypes.push({
      name: policyType,
      monthlyPremium,
      annualPremium,
      totalCost,
      pros,
      cons,
      suitability
    });
  });
  
  const recommendedPolicy = policyTypes.reduce((best, current) => 
    current.totalCost < best.totalCost ? current : best
  ).name;
  
  const costComparison = {
    termLife: policyTypes.find(p => p.name === 'Term Life')?.totalCost || 0,
    wholeLife: policyTypes.find(p => p.name === 'Whole Life')?.totalCost || 0,
    universalLife: policyTypes.find(p => p.name === 'Universal Life')?.totalCost || 0,
    mortgageProtection: policyTypes.find(p => p.name === 'Mortgage Protection')?.totalCost || 0,
    bestValue: recommendedPolicy
  };
  
  const featureComparison = {
    termLife: { cashValue: false, guaranteedRenewal: false, conversionOption: true, ridersAvailable: true, premiumFlexibility: false },
    wholeLife: { cashValue: true, guaranteedRenewal: true, conversionOption: false, ridersAvailable: true, premiumFlexibility: false },
    universalLife: { cashValue: true, guaranteedRenewal: false, conversionOption: false, ridersAvailable: true, premiumFlexibility: true },
    mortgageProtection: { cashValue: false, guaranteedRenewal: false, conversionOption: false, ridersAvailable: false, premiumFlexibility: false }
  };
  
  return {
    policyTypes,
    recommendedPolicy,
    costComparison,
    featureComparison
  };
};

const getPolicyPros = (policyType: string): string[] => {
  const pros = {
    'Term Life': ['Lowest cost', 'Simple and straightforward', 'High coverage amounts', 'Conversion options'],
    'Whole Life': ['Guaranteed cash value', 'Lifetime coverage', 'Fixed premiums', 'Dividend potential'],
    'Universal Life': ['Flexible premiums', 'Cash value growth', 'Adjustable coverage', 'Tax advantages'],
    'Mortgage Protection': ['Declining coverage', 'Lower initial cost', 'Mortgage-specific', 'Simple underwriting']
  };
  return pros[policyType as keyof typeof pros] || [];
};

const getPolicyCons = (policyType: string): string[] => {
  const cons = {
    'Term Life': ['No cash value', 'Coverage expires', 'Renewal costs increase', 'No investment component'],
    'Whole Life': ['Higher premiums', 'Complex product', 'Lower initial coverage', 'Limited flexibility'],
    'Universal Life': ['Complex product', 'Risk of lapse', 'Variable performance', 'Higher fees'],
    'Mortgage Protection': ['Limited flexibility', 'No cash value', 'Coverage decreases', 'Limited riders']
  };
  return cons[policyType as keyof typeof cons] || [];
};

const assessPolicySuitability = (policyType: string, inputs: MortgageLifeInputs): string => {
  if (policyType === 'Term Life') {
    if (inputs.borrowerAge < 50) return 'Excellent';
    if (inputs.borrowerAge < 60) return 'Good';
    return 'Fair';
  }
  
  if (policyType === 'Whole Life') {
    if (inputs.annualIncome && inputs.annualIncome > 100000) return 'Good';
    return 'Fair';
  }
  
  if (policyType === 'Universal Life') {
    if (inputs.annualIncome && inputs.annualIncome > 75000) return 'Good';
    return 'Fair';
  }
  
  if (policyType === 'Mortgage Protection') {
    return 'Good';
  }
  
  return 'Fair';
};

const analyzeCostBenefit = (inputs: MortgageLifeInputs, premiumAnalysis: any, coverageAmount: number): CostBenefitAnalysis => {
  const totalPremiumCost = premiumAnalysis.totalCost;
  const totalCoverage = coverageAmount;
  const costBenefitRatio = totalPremiumCost / totalCoverage;
  
  const breakEvenYears = totalPremiumCost / premiumAnalysis.annualPremium;
  const roi = ((totalCoverage - totalPremiumCost) / totalPremiumCost) * 100;
  
  let valueAssessment = 'Poor';
  if (costBenefitRatio < 0.1) valueAssessment = 'Excellent';
  else if (costBenefitRatio < 0.2) valueAssessment = 'Good';
  else if (costBenefitRatio < 0.3) valueAssessment = 'Fair';
  
  return {
    totalPremiumCost,
    totalCoverage,
    costBenefitRatio,
    breakEvenYears,
    roi,
    valueAssessment
  };
};

const assessRisk = (inputs: MortgageLifeInputs): RiskAssessment => {
  const healthRisk = assessHealthRisk(inputs.healthStatus, inputs.smokingStatus);
  const lifestyleRisk = assessLifestyleRisk(inputs.lifestyleFactors || []);
  const occupationRisk = assessOccupationRisk(inputs.occupation);
  const familyHistoryRisk = assessFamilyHistoryRisk(inputs.familyHistory);
  
  const overallRisk = calculateOverallRisk(healthRisk, lifestyleRisk, occupationRisk, familyHistoryRisk);
  const underwritingClass = determineUnderwritingClass(overallRisk);
  const premiumMultiplier = calculateRiskMultiplier(inputs);
  
  return {
    healthRisk,
    lifestyleRisk,
    occupationRisk,
    familyHistoryRisk,
    overallRisk,
    underwritingClass,
    premiumMultiplier
  };
};

const assessHealthRisk = (healthStatus?: string, smokingStatus?: string): string => {
  if (smokingStatus === 'Regular Smoker') return 'High';
  if (healthStatus === 'Poor' || smokingStatus === 'Occasional Smoker') return 'High';
  if (healthStatus === 'Fair' || smokingStatus === 'Former Smoker') return 'Moderate';
  if (healthStatus === 'Good' || smokingStatus === 'Non-Smoker') return 'Low';
  return 'Unknown';
};

const assessLifestyleRisk = (lifestyleFactors: string[]): string => {
  const highRiskFactors = ['Hazardous Hobbies', 'Military Service'];
  const moderateRiskFactors = ['Travel', 'Recreational Sports'];
  const lowRiskFactors = ['Regular Exercise', 'Healthy Diet'];
  
  if (lifestyleFactors.some(factor => highRiskFactors.includes(factor))) return 'High';
  if (lifestyleFactors.some(factor => moderateRiskFactors.includes(factor))) return 'Moderate';
  if (lifestyleFactors.some(factor => lowRiskFactors.includes(factor))) return 'Low';
  return 'Unknown';
};

const assessOccupationRisk = (occupation?: string): string => {
  const highRiskOccupations = ['Military', 'Unskilled Labor'];
  const moderateRiskOccupations = ['Skilled Labor', 'Self-Employed'];
  
  if (highRiskOccupations.includes(occupation || '')) return 'High';
  if (moderateRiskOccupations.includes(occupation || '')) return 'Moderate';
  return 'Low';
};

const assessFamilyHistoryRisk = (familyHistory?: string): string => {
  const riskMap = {
    'Low Risk': 'Low',
    'Moderate Risk': 'Moderate',
    'High Risk': 'High',
    'Unknown': 'Unknown'
  };
  return riskMap[familyHistory as keyof typeof riskMap] || 'Unknown';
};

const calculateOverallRisk = (healthRisk: string, lifestyleRisk: string, occupationRisk: string, familyHistoryRisk: string): string => {
  const riskScores = { 'Low': 1, 'Moderate': 2, 'High': 3, 'Unknown': 2 };
  const totalScore = riskScores[healthRisk as keyof typeof riskScores] + 
                    riskScores[lifestyleRisk as keyof typeof riskScores] + 
                    riskScores[occupationRisk as keyof typeof riskScores] + 
                    riskScores[familyHistoryRisk as keyof typeof riskScores];
  
  if (totalScore <= 5) return 'Low';
  if (totalScore <= 8) return 'Moderate';
  return 'High';
};

const determineUnderwritingClass = (overallRisk: string): string => {
  const classMap = {
    'Low': 'Preferred Plus',
    'Moderate': 'Standard Plus',
    'High': 'Standard'
  };
  return classMap[overallRisk as keyof typeof classMap] || 'Standard';
};

const generateRecommendations = (inputs: MortgageLifeInputs, coverageAnalysis: CoverageAnalysis, policyComparison: PolicyComparison, riskAssessment: RiskAssessment): string => {
  const recommendations: string[] = [];
  
  if (coverageAnalysis.coverageGap > 0) {
    recommendations.push(`Consider purchasing an additional $${coverageAnalysis.coverageGap.toLocaleString()} in life insurance coverage.`);
  }
  
  if (coverageAnalysis.adequacyScore < 50) {
    recommendations.push('Your current life insurance coverage is significantly inadequate. Consider increasing coverage immediately.');
  } else if (coverageAnalysis.adequacyScore < 80) {
    recommendations.push('Your life insurance coverage could be improved. Consider additional coverage to better protect your family.');
  }
  
  recommendations.push(`Based on your profile, ${policyComparison.recommendedPolicy} appears to be the most suitable option.`);
  
  if (riskAssessment.overallRisk === 'High') {
    recommendations.push('Consider improving your health and lifestyle factors to potentially qualify for better rates.');
  }
  
  if (inputs.dependents && inputs.dependents > 0) {
    recommendations.push('Consider adding child riders or separate child life insurance policies.');
  }
  
  if (inputs.coBorrowerAge) {
    recommendations.push('Consider joint life insurance policies or separate policies for both borrowers.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Your current life insurance coverage appears adequate for your situation.');
  }
  
  return recommendations.join(' ');
};

const calculateKeyMetrics = (inputs: MortgageLifeInputs, coverageAnalysis: CoverageAnalysis, premiumAnalysis: any): KeyMetrics => {
  const coverageRatio = coverageAnalysis.adequacyScore / 100;
  const premiumBurden = (premiumAnalysis.monthlyPremium / (inputs.annualIncome || 75000)) * 12 * 100;
  
  let protectionAdequacy = 'Poor';
  if (coverageAnalysis.adequacyScore >= 80) protectionAdequacy = 'Excellent';
  else if (coverageAnalysis.adequacyScore >= 60) protectionAdequacy = 'Good';
  else if (coverageAnalysis.adequacyScore >= 40) protectionAdequacy = 'Fair';
  
  let costEfficiency = 'Poor';
  const costRatio = premiumAnalysis.totalCost / (inputs.mortgageBalance + (inputs.existingLifeInsurance || 0));
  if (costRatio < 0.1) costEfficiency = 'Excellent';
  else if (costRatio < 0.2) costEfficiency = 'Good';
  else if (costRatio < 0.3) costEfficiency = 'Fair';
  
  const riskLevel = coverageAnalysis.adequacyScore < 50 ? 'High' : coverageAnalysis.adequacyScore < 80 ? 'Moderate' : 'Low';
  
  return {
    coverageRatio,
    premiumBurden,
    protectionAdequacy,
    costEfficiency,
    riskLevel
  };
};

const generateComprehensiveAnalysis = (inputs: MortgageLifeInputs, coverageAnalysis: CoverageAnalysis, policyComparison: PolicyComparison, costBenefitAnalysis: CostBenefitAnalysis, riskAssessment: RiskAssessment): string => {
  let analysis = `# Mortgage Life Insurance Analysis Report\n\n`;
  
  analysis += `## Coverage Analysis\n`;
  analysis += `- **Total Life Insurance Need:** $${coverageAnalysis.mortgageProtection.toLocaleString()}\n`;
  analysis += `- **Existing Coverage:** $${(inputs.existingLifeInsurance || 0).toLocaleString()}\n`;
  analysis += `- **Coverage Gap:** $${coverageAnalysis.coverageGap.toLocaleString()}\n`;
  analysis += `- **Protection Adequacy:** ${coverageAnalysis.adequacyScore.toFixed(1)}%\n\n`;
  
  analysis += `## Coverage Breakdown\n`;
  analysis += `- **Mortgage Protection:** $${coverageAnalysis.mortgageProtection.toLocaleString()}\n`;
  analysis += `- **Income Replacement:** $${coverageAnalysis.incomeReplacement.toLocaleString()}\n`;
  analysis += `- **Debt Coverage:** $${coverageAnalysis.debtCoverage.toLocaleString()}\n`;
  analysis += `- **Education Funding:** $${coverageAnalysis.educationFunding.toLocaleString()}\n`;
  analysis += `- **Final Expenses:** $${coverageAnalysis.finalExpenses.toLocaleString()}\n`;
  analysis += `- **Emergency Fund:** $${coverageAnalysis.emergencyFund.toLocaleString()}\n\n`;
  
  analysis += `## Policy Recommendations\n`;
  analysis += `- **Recommended Policy:** ${policyComparison.recommendedPolicy}\n`;
  analysis += `- **Estimated Monthly Premium:** $${policyComparison.policyTypes.find(p => p.name === policyComparison.recommendedPolicy)?.monthlyPremium.toFixed(2)}\n`;
  analysis += `- **Estimated Annual Premium:** $${policyComparison.policyTypes.find(p => p.name === policyComparison.recommendedPolicy)?.annualPremium.toFixed(2)}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `- **Overall Risk:** ${riskAssessment.overallRisk}\n`;
  analysis += `- **Underwriting Class:** ${riskAssessment.underwritingClass}\n`;
  analysis += `- **Health Risk:** ${riskAssessment.healthRisk}\n`;
  analysis += `- **Lifestyle Risk:** ${riskAssessment.lifestyleRisk}\n`;
  analysis += `- **Occupation Risk:** ${riskAssessment.occupationRisk}\n\n`;
  
  analysis += `## Cost-Benefit Analysis\n`;
  analysis += `- **Total Premium Cost:** $${costBenefitAnalysis.totalPremiumCost.toLocaleString()}\n`;
  analysis += `- **Total Coverage:** $${costBenefitAnalysis.totalCoverage.toLocaleString()}\n`;
  analysis += `- **Cost-Benefit Ratio:** ${(costBenefitAnalysis.costBenefitRatio * 100).toFixed(1)}%\n`;
  analysis += `- **ROI:** ${costBenefitAnalysis.roi.toFixed(1)}%\n`;
  analysis += `- **Value Assessment:** ${costBenefitAnalysis.valueAssessment}\n\n`;
  
  analysis += `## Key Recommendations\n`;
  analysis += `${generateRecommendations(inputs, coverageAnalysis, policyComparison, riskAssessment)}\n\n`;
  
  analysis += `## Next Steps\n`;
  analysis += `1. **Get Quotes:** Contact multiple insurance providers for competitive quotes\n`;
  analysis += `2. **Medical Exam:** Prepare for medical underwriting if required\n`;
  analysis += `3. **Policy Review:** Carefully review policy terms and conditions\n`;
  analysis += `4. **Beneficiary Designation:** Ensure proper beneficiary designation\n`;
  analysis += `5. **Regular Review:** Review coverage annually or when life circumstances change\n`;
  
  return analysis;
};

export const generateMortgageLifeAnalysis = (inputs: MortgageLifeInputs, outputs: LifeInsuranceResult): string => {
  return outputs.mortgageLifeAnalysis;
};