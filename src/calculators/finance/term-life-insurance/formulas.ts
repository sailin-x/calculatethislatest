import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base premium rates per $1,000 of coverage (simplified - actual rates vary by insurer)
const BASE_RATES = {
  male: {
    '18-25': { '10': 0.8, '20': 1.2, '30': 1.8 },
    '26-35': { '10': 1.0, '20': 1.5, '30': 2.2 },
    '36-45': { '10': 1.5, '20': 2.2, '30': 3.5 },
    '46-55': { '10': 2.5, '20': 4.0, '30': 6.5 },
    '56-65': { '10': 4.5, '20': 8.0, '30': 12.0 },
    '66-75': { '10': 8.0, '20': 15.0, '30': 25.0 }
  },
  female: {
    '18-25': { '10': 0.6, '20': 0.9, '30': 1.4 },
    '26-35': { '10': 0.8, '20': 1.2, '30': 1.8 },
    '36-45': { '10': 1.2, '20': 1.8, '30': 2.8 },
    '46-55': { '10': 2.0, '20': 3.2, '30': 5.2 },
    '56-65': { '10': 3.5, '20': 6.5, '30': 10.0 },
    '66-75': { '10': 6.0, '20': 12.0, '30': 20.0 }
  }
};

function getAgeGroup(age: number): string {
  if (age <= 25) return '18-25';
  if (age <= 35) return '26-35';
  if (age <= 45) return '36-45';
  if (age <= 55) return '46-55';
  if (age <= 65) return '56-65';
  return '66-75';
}

function getTermGroup(term: number): string {
  if (term <= 10) return '10';
  if (term <= 20) return '20';
  return '30';
}

function calculateBasePremium(age: number, gender: string, termLength: number, coverageAmount: number): number {
  const ageGroup = getAgeGroup(age);
  const termGroup = getTermGroup(termLength);
  const baseRate = BASE_RATES[gender][ageGroup][termGroup];
  return (coverageAmount / 1000) * baseRate;
}

function calculateHealthMultiplier(healthRating: string, medicalConditions: string, familyHistory: string): number {
  let multiplier = 1.0;
  
  // Health rating adjustments
  switch (healthRating) {
    case 'preferred-plus': multiplier *= 0.7; break;
    case 'preferred': multiplier *= 0.85; break;
    case 'standard-plus': multiplier *= 0.95; break;
    case 'standard': multiplier *= 1.0; break;
    case 'substandard': multiplier *= 1.5; break;
  }
  
  // Medical conditions adjustments
  switch (medicalConditions) {
    case 'diabetes': multiplier *= 1.8; break;
    case 'heart-disease': multiplier *= 2.5; break;
    case 'cancer': multiplier *= 3.0; break;
    case 'high-blood-pressure': multiplier *= 1.3; break;
    case 'multiple': multiplier *= 2.0; break;
  }
  
  // Family history adjustments
  switch (familyHistory) {
    case 'heart-disease': multiplier *= 1.2; break;
    case 'cancer': multiplier *= 1.3; break;
    case 'diabetes': multiplier *= 1.1; break;
    case 'multiple': multiplier *= 1.4; break;
  }
  
  return multiplier;
}

function calculateLifestyleMultiplier(filingStatus: string, occupation: string, hobbies: string): number {
  let multiplier = 1.0;
  
  // Smoking status
  switch (filingStatus) {
    case 'smoker': multiplier *= 2.5; break;
    case 'former-smoker': multiplier *= 1.3; break;
  }
  
  // Occupation adjustments
  switch (occupation) {
    case 'manual-labor': multiplier *= 1.2; break;
    case 'hazardous': multiplier *= 1.8; break;
    case 'military': multiplier *= 1.5; break;
    case 'aviation': multiplier *= 2.0; break;
  }
  
  // Hobby adjustments
  switch (hobbies) {
    case 'scuba-diving': multiplier *= 1.3; break;
    case 'skydiving': multiplier *= 2.0; break;
    case 'rock-climbing': multiplier *= 1.5; break;
    case 'racing': multiplier *= 1.8; break;
    case 'multiple': multiplier *= 1.6; break;
  }
  
  return multiplier;
}

function calculateRiderMultiplier(riders: string): number {
  let multiplier = 1.0;
  
  switch (riders) {
    case 'waiver-of-premium': multiplier += 0.15; break;
    case 'accelerated-death-benefit': multiplier += 0.10; break;
    case 'child-rider': multiplier += 0.05; break;
    case 'spouse-rider': multiplier += 0.20; break;
    case 'multiple': multiplier += 0.35; break;
  }
  
  return multiplier;
}

function calculateCoverageNeeded(
  annualIncome: number,
  debts: number,
  dependents: number,
  childrenAge: number,
  spouseIncome: number,
  collegeCosts: number,
  funeralExpenses: number,
  savings: number,
  existingLifeInsurance: number,
  inflationRate: number,
  termLength: number
): number {
  const incomeReplacement = annualIncome * 10; // 10 years of income replacement
  const debtCoverage = debts;
  const collegeFunding = collegeCosts * (dependents || 0);
  const funeralCosts = funeralExpenses;
  const emergencyFund = 50000; // Emergency fund for family
  
  let totalNeeded = incomeReplacement + debtCoverage + collegeFunding + funeralCosts + emergencyFund;
  
  // Adjust for spouse income
  if (spouseIncome) {
    totalNeeded -= spouseIncome * 5; // Reduce by 5 years of spouse income
  }
  
  // Adjust for existing savings
  totalNeeded -= (savings || 0);
  
  // Adjust for existing life insurance
  totalNeeded -= (existingLifeInsurance || 0);
  
  // Adjust for inflation over term
  const inflationFactor = Math.pow(1 + (inflationRate || 2.5) / 100, termLength);
  totalNeeded *= inflationFactor;
  
  return Math.max(totalNeeded, 100000); // Minimum $100k coverage
}

function calculateNPV(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((npv, cashFlow, year) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, year + 1);
  }, 0);
}

function calculateAffordabilityScore(annualPremium: number, annualIncome: number): number {
  if (!annualIncome) return 50;
  const premiumRatio = annualPremium / annualIncome;
  
  if (premiumRatio <= 0.01) return 100; // 1% or less
  if (premiumRatio <= 0.02) return 90;  // 1-2%
  if (premiumRatio <= 0.03) return 80;  // 2-3%
  if (premiumRatio <= 0.05) return 60;  // 3-5%
  if (premiumRatio <= 0.08) return 40;  // 5-8%
  if (premiumRatio <= 0.12) return 20;  // 8-12%
  return 0; // Over 12%
}

function calculateAdequacyScore(coverageAmount: number, coverageNeeded: number): number {
  if (!coverageNeeded) return 50;
  const adequacyRatio = coverageAmount / coverageNeeded;
  
  if (adequacyRatio >= 1.2) return 100; // 120% or more
  if (adequacyRatio >= 1.0) return 90;  // 100-120%
  if (adequacyRatio >= 0.8) return 70;  // 80-100%
  if (adequacyRatio >= 0.6) return 50;  // 60-80%
  if (adequacyRatio >= 0.4) return 30;  // 40-60%
  return 10; // Less than 40%
}

function calculateValueScore(annualPremium: number, coverageAmount: number, termLength: number): number {
  const costPerThousand = (annualPremium / (coverageAmount / 1000));
  const totalCost = annualPremium * termLength;
  const costRatio = totalCost / coverageAmount;
  
  let score = 100;
  
  // Penalize high cost per thousand
  if (costPerThousand > 5) score -= 30;
  else if (costPerThousand > 3) score -= 20;
  else if (costPerThousand > 2) score -= 10;
  
  // Penalize high total cost ratio
  if (costRatio > 0.5) score -= 30;
  else if (costRatio > 0.3) score -= 20;
  else if (costRatio > 0.2) score -= 10;
  
  return Math.max(score, 0);
}

function calculateRiskScore(age: number, healthRating: string, medicalConditions: string, occupation: string, hobbies: string): number {
  let score = 50;
  
  // Age risk
  if (age > 65) score += 30;
  else if (age > 55) score += 20;
  else if (age > 45) score += 10;
  
  // Health risk
  switch (healthRating) {
    case 'substandard': score += 25; break;
    case 'standard': score += 10; break;
    case 'standard-plus': score += 5; break;
  }
  
  // Medical conditions risk
  switch (medicalConditions) {
    case 'multiple': score += 30; break;
    case 'cancer': score += 25; break;
    case 'heart-disease': score += 20; break;
    case 'diabetes': score += 15; break;
    case 'high-blood-pressure': score += 10; break;
  }
  
  // Occupation risk
  switch (occupation) {
    case 'aviation': score += 20; break;
    case 'hazardous': score += 15; break;
    case 'military': score += 10; break;
    case 'manual-labor': score += 5; break;
  }
  
  // Hobby risk
  switch (hobbies) {
    case 'multiple': score += 20; break;
    case 'skydiving': score += 15; break;
    case 'racing': score += 10; break;
    case 'rock-climbing': score += 8; break;
    case 'scuba-diving': score += 5; break;
  }
  
  return Math.min(score, 100);
}

export function calculateTermLifeInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    age, gender, filingStatus, coverageAmount, termLength, policyType, riders,
    annualIncome, debts, dependents, childrenAge, spouseIncome, collegeCosts,
    funeralExpenses, savings, existingLifeInsurance, healthRating, medicalConditions,
    familyHistory, occupation, hobbies, inflationRate, investmentReturn, discountRate
  } = inputs;

  // Calculate base premium
  let basePremium = calculateBasePremium(age, gender, termLength, coverageAmount);
  
  // Apply multipliers
  const healthMultiplier = calculateHealthMultiplier(healthRating, medicalConditions, familyHistory);
  const lifestyleMultiplier = calculateLifestyleMultiplier(filingStatus, occupation, hobbies);
  const riderMultiplier = calculateRiderMultiplier(riders);
  
  const annualPremium = basePremium * healthMultiplier * lifestyleMultiplier * riderMultiplier;
  const monthlyPremium = annualPremium / 12;
  const totalPremium = annualPremium * termLength;
  
  // Calculate coverage needs
  const coverageNeeded = calculateCoverageNeeded(
    annualIncome, debts, dependents, childrenAge, spouseIncome,
    collegeCosts, funeralExpenses, savings, existingLifeInsurance,
    inflationRate, termLength
  );
  
  const coverageGap = Math.max(0, coverageNeeded - coverageAmount);
  const premiumPerThousand = annualPremium / (coverageAmount / 1000);
  const costPerDay = annualPremium / 365;
  
  // Financial analysis
  const premiumCashFlows = Array(termLength).fill(-annualPremium);
  const presentValue = -calculateNPV(premiumCashFlows, discountRate || 5);
  
  const futureValue = annualPremium * (Math.pow(1 + (investmentReturn || 7) / 100, termLength) - 1) / ((investmentReturn || 7) / 100);
  const opportunityCost = futureValue;
  
  const breakevenYears = Math.log(coverageAmount / annualPremium) / Math.log(1 + (investmentReturn || 7) / 100);
  
  // Scores
  const affordabilityScore = calculateAffordabilityScore(annualPremium, annualIncome);
  const adequacyScore = calculateAdequacyScore(coverageAmount, coverageNeeded);
  const valueScore = calculateValueScore(annualPremium, coverageAmount, termLength);
  const riskScore = calculateRiskScore(age, healthRating, medicalConditions, occupation, hobbies);
  
  // Term comparison
  const termComparison = [10, 15, 20, 25, 30].map(term => {
    const termPremium = calculateBasePremium(age, gender, term, coverageAmount) * 
                       healthMultiplier * lifestyleMultiplier * riderMultiplier;
    return {
      term,
      annualPremium: termPremium,
      totalPremium: termPremium * term,
      costPerThousand: termPremium / (coverageAmount / 1000)
    };
  });
  
  // Policy comparison
  const policyComparison = ['level-term', 'decreasing-term', 'increasing-term', 'return-of-premium'].map(type => {
    let multiplier = 1.0;
    switch (type) {
      case 'decreasing-term': multiplier = 0.8; break;
      case 'increasing-term': multiplier = 1.2; break;
      case 'return-of-premium': multiplier = 2.5; break;
    }
    return {
      type,
      annualPremium: annualPremium * multiplier,
      totalPremium: annualPremium * multiplier * termLength,
      features: type === 'return-of-premium' ? 'Premium returned if survive' : 'Standard term'
    };
  });
  
  // Needs breakdown
  const needsBreakdown = {
    incomeReplacement: (annualIncome || 0) * 10,
    debtCoverage: debts || 0,
    collegeFunding: (collegeCosts || 0) * (dependents || 0),
    funeralCosts: funeralExpenses || 15000,
    emergencyFund: 50000,
    totalNeeded: coverageNeeded
  };
  
  return {
    annualPremium,
    monthlyPremium,
    totalPremium,
    coverageNeeded,
    coverageGap,
    premiumPerThousand,
    costPerDay,
    presentValue,
    futureValue,
    opportunityCost,
    breakevenYears,
    affordabilityScore,
    adequacyScore,
    valueScore,
    riskScore,
    termComparison,
    policyComparison,
    needsBreakdown,
    recommendations: generateRecommendations(inputs, {
      annualPremium, coverageNeeded, coverageGap, affordabilityScore, adequacyScore
    }),
    keyFactors: generateKeyFactors(inputs, { annualPremium, coverageNeeded }),
    risks: generateRisks(inputs, { riskScore, coverageGap }),
    termLifeInsuranceAnalysis: generateTermLifeInsuranceAnalysis(inputs, {
      annualPremium, monthlyPremium, totalPremium, coverageNeeded, coverageGap,
      premiumPerThousand, costPerDay, affordabilityScore, adequacyScore, valueScore,
      riskScore, termComparison, policyComparison, needsBreakdown
    })
  };
}

function generateRecommendations(inputs: CalculatorInputs, outputs: any): string {
  const { coverageGap, affordabilityScore, adequacyScore } = outputs;
  const recommendations = [];
  
  if (coverageGap > 0) {
    recommendations.push(`Consider increasing coverage by $${coverageGap.toLocaleString()} to meet your family's needs`);
  }
  
  if (affordabilityScore < 50) {
    recommendations.push('Consider a longer term or lower coverage amount to improve affordability');
  }
  
  if (adequacyScore < 70) {
    recommendations.push('Your current coverage may be insufficient for your family\'s needs');
  }
  
  if (inputs.healthRating === 'standard' || inputs.healthRating === 'substandard') {
    recommendations.push('Consider improving your health to qualify for better rates');
  }
  
  if (inputs.filingStatus === 'smoker') {
    recommendations.push('Quitting smoking could significantly reduce your premiums');
  }
  
  return recommendations.join('. ') + '.';
}

function generateKeyFactors(inputs: CalculatorInputs, outputs: any): string {
  const factors = [];
  
  if (inputs.age > 50) factors.push('Age is a significant factor in premium calculation');
  if (inputs.filingStatus === 'smoker') factors.push('Smoking status significantly increases premiums');
  if (inputs.medicalConditions !== 'none') factors.push('Medical conditions affect your health rating');
  if (inputs.occupation === 'hazardous' || inputs.occupation === 'aviation') factors.push('Occupation type impacts risk assessment');
  if (inputs.hobbies !== 'none') factors.push('High-risk hobbies increase premiums');
  
  return factors.join('. ') + '.';
}

function generateRisks(inputs: CalculatorInputs, outputs: any): string {
  const risks = [];
  
  if (outputs.riskScore > 70) risks.push('High health or lifestyle risk factors');
  if (outputs.coverageGap > 0) risks.push('Insufficient coverage for family needs');
  if (inputs.age > 60) risks.push('Age-related premium increases');
  if (inputs.medicalConditions !== 'none') risks.push('Pre-existing conditions may affect coverage');
  
  return risks.join('. ') + '.';
}

export function generateTermLifeInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    annualPremium, monthlyPremium, totalPremium, coverageNeeded, coverageGap,
    premiumPerThousand, costPerDay, affordabilityScore, adequacyScore, valueScore,
    riskScore, termComparison, policyComparison, needsBreakdown
  } = outputs;

  return `# Term Life Insurance Analysis Report

## Policy Summary
- **Annual Premium:** $${annualPremium.toLocaleString()}
- **Monthly Premium:** $${monthlyPremium.toLocaleString()}
- **Total Premium (${inputs.termLength} years):** $${totalPremium.toLocaleString()}
- **Coverage Amount:** $${inputs.coverageAmount.toLocaleString()}
- **Cost per $1,000:** $${premiumPerThousand.toFixed(2)}
- **Daily Cost:** $${costPerDay.toFixed(2)}

## Coverage Analysis
- **Recommended Coverage:** $${coverageNeeded.toLocaleString()}
- **Coverage Gap:** $${coverageGap.toLocaleString()}
- **Adequacy Score:** ${adequacyScore}/100

### Needs Breakdown
- **Income Replacement:** $${needsBreakdown.incomeReplacement.toLocaleString()}
- **Debt Coverage:** $${needsBreakdown.debtCoverage.toLocaleString()}
- **College Funding:** $${needsBreakdown.collegeFunding.toLocaleString()}
- **Funeral Costs:** $${needsBreakdown.funeralCosts.toLocaleString()}
- **Emergency Fund:** $${needsBreakdown.emergencyFund.toLocaleString()}

## Financial Analysis
- **Affordability Score:** ${affordabilityScore}/100
- **Value Score:** ${valueScore}/100
- **Risk Score:** ${riskScore}/100
- **Present Value of Premiums:** $${outputs.presentValue.toLocaleString()}
- **Opportunity Cost:** $${outputs.futureValue.toLocaleString()}
- **Breakeven Years:** ${outputs.breakevenYears.toFixed(1)} years

## Term Length Comparison
${termComparison.map(term => 
  `- **${term.term} Years:** $${term.annualPremium.toLocaleString()}/year, $${term.totalPremium.toLocaleString()} total`
).join('\n')}

## Policy Type Comparison
${policyComparison.map(policy => 
  `- **${policy.type}:** $${policy.annualPremium.toLocaleString()}/year, $${policy.totalPremium.toLocaleString()} total`
).join('\n')}

## Recommendations
${outputs.recommendations}

## Key Factors
${outputs.keyFactors}

## Risks
${outputs.risks}

## Next Steps
1. Compare quotes from multiple insurers
2. Consider your health improvement timeline
3. Review coverage needs annually
4. Consider additional riders if needed
5. Plan for policy renewal or conversion options`;
}
