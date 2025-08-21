import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

/**
 * Calculate base premium based on property value and location
 */
function calculateBasePremium(
  personalPropertyValue: number,
  state: string,
  city: string,
  crimeRate: string
): number {
  // Base rate per $1,000 of coverage
  let baseRate = 15; // Default rate
  
  // State-specific adjustments
  const stateRates: { [key: string]: number } = {
    'ca': 18, 'ny': 20, 'fl': 16, 'tx': 14, 'il': 17,
    'pa': 15, 'oh': 13, 'ga': 14, 'nc': 13, 'mi': 16,
    'nj': 19, 'va': 14, 'wa': 15, 'az': 14, 'ma': 18,
    'tn': 13, 'in': 13, 'mo': 14, 'md': 16, 'co': 15
  };
  
  if (stateRates[state]) {
    baseRate = stateRates[state];
  }
  
  // City type adjustments
  const cityMultipliers: { [key: string]: number } = {
    'major-metro': 1.3,
    'suburban': 1.1,
    'small-city': 1.0,
    'rural': 0.9
  };
  
  const cityMultiplier = cityMultipliers[city] || 1.0;
  
  // Crime rate adjustments
  const crimeMultipliers: { [key: string]: number } = {
    'low': 0.9,
    'medium': 1.0,
    'high': 1.4
  };
  
  const crimeMultiplier = crimeMultipliers[crimeRate] || 1.0;
  
  // Calculate base premium
  const coverageAmount = Math.max(personalPropertyValue, 10000); // Minimum $10k coverage
  const basePremium = (coverageAmount / 1000) * baseRate * cityMultiplier * crimeMultiplier;
  
  return Math.round(basePremium);
}

/**
 * Calculate risk factors multiplier
 */
function calculateRiskMultiplier(
  smoking: string,
  pets: string,
  petBreed: string,
  age: number,
  creditScore: number,
  claimsHistory: string,
  securityFeatures: string,
  fireProtection: string,
  floodZone: string,
  earthquakeZone: string
): number {
  let multiplier = 1.0;
  
  // Smoking factor
  if (smoking === 'smoker') multiplier *= 1.25;
  else if (smoking === 'former-smoker') multiplier *= 1.1;
  
  // Pet factor
  if (pets === 'dog') {
    multiplier *= 1.15;
    // Breed-specific adjustments
    const highRiskBreeds = ['pit bull', 'rottweiler', 'doberman', 'german shepherd', 'chow chow'];
    if (highRiskBreeds.some(breed => petBreed?.toLowerCase().includes(breed))) {
      multiplier *= 1.2;
    }
  } else if (pets === 'cat') {
    multiplier *= 1.05;
  } else if (pets === 'other') {
    multiplier *= 1.1;
  }
  
  // Age factor
  if (age < 25) multiplier *= 1.2;
  else if (age < 30) multiplier *= 1.1;
  else if (age > 65) multiplier *= 1.15;
  
  // Credit score factor
  if (creditScore < 600) multiplier *= 1.3;
  else if (creditScore < 650) multiplier *= 1.2;
  else if (creditScore < 700) multiplier *= 1.1;
  else if (creditScore >= 750) multiplier *= 0.9;
  
  // Claims history factor
  if (claimsHistory === '1-2') multiplier *= 1.1;
  else if (claimsHistory === '3-5') multiplier *= 1.3;
  else if (claimsHistory === '5-plus') multiplier *= 1.5;
  
  // Security features factor
  if (securityFeatures === 'basic') multiplier *= 0.95;
  else if (securityFeatures === 'advanced') multiplier *= 0.9;
  else if (securityFeatures === 'gated') multiplier *= 0.85;
  
  // Fire protection factor
  if (fireProtection === 'smoke-detectors') multiplier *= 0.95;
  else if (fireProtection === 'sprinklers') multiplier *= 0.9;
  else if (fireProtection === 'fire-station-nearby') multiplier *= 0.95;
  
  // Natural disaster factors
  if (floodZone === 'low-risk') multiplier *= 1.1;
  else if (floodZone === 'moderate-risk') multiplier *= 1.2;
  else if (floodZone === 'high-risk') multiplier *= 1.4;
  
  if (earthquakeZone === 'low') multiplier *= 1.05;
  else if (earthquakeZone === 'moderate') multiplier *= 1.15;
  else if (earthquakeZone === 'high') multiplier *= 1.3;
  
  return multiplier;
}

/**
 * Calculate policy type multiplier
 */
function calculatePolicyMultiplier(
  policyType: string,
  replacementCost: string,
  identityTheft: string,
  waterBackup: string
): number {
  let multiplier = 1.0;
  
  // Policy type base multiplier
  const policyMultipliers: { [key: string]: number } = {
    'basic': 0.8,
    'standard': 1.0,
    'premium': 1.3,
    'comprehensive': 1.6
  };
  
  multiplier *= policyMultipliers[policyType] || 1.0;
  
  // Replacement cost factor
  if (replacementCost === 'replacement-cost') multiplier *= 1.2;
  
  // Identity theft factor
  if (identityTheft === 'basic') multiplier *= 1.05;
  else if (identityTheft === 'comprehensive') multiplier *= 1.15;
  
  // Water backup factor
  if (waterBackup === 'basic') multiplier *= 1.03;
  else if (waterBackup === 'enhanced') multiplier *= 1.08;
  
  return multiplier;
}

/**
 * Calculate risk score for insurance assessment
 */
function calculateRiskScore(
  smoking: string,
  pets: string,
  petBreed: string,
  age: number,
  creditScore: number,
  claimsHistory: string,
  crimeRate: string,
  floodZone: string,
  earthquakeZone: string,
  securityFeatures: string,
  fireProtection: string
): number {
  let riskScore = 0;
  
  // Smoking risk (20%)
  if (smoking === 'smoker') riskScore += 20;
  else if (smoking === 'former-smoker') riskScore += 10;
  
  // Pet risk (15%)
  if (pets === 'dog') {
    riskScore += 15;
    const highRiskBreeds = ['pit bull', 'rottweiler', 'doberman', 'german shepherd', 'chow chow'];
    if (highRiskBreeds.some(breed => petBreed?.toLowerCase().includes(breed))) {
      riskScore += 10;
    }
  } else if (pets === 'cat') riskScore += 5;
  else if (pets === 'other') riskScore += 10;
  
  // Age risk (15%)
  if (age < 25) riskScore += 15;
  else if (age < 30) riskScore += 10;
  else if (age > 65) riskScore += 10;
  
  // Credit risk (15%)
  if (creditScore < 600) riskScore += 15;
  else if (creditScore < 650) riskScore += 12;
  else if (creditScore < 700) riskScore += 8;
  else if (creditScore >= 750) riskScore += 2;
  
  // Claims history risk (15%)
  if (claimsHistory === '1-2') riskScore += 10;
  else if (claimsHistory === '3-5') riskScore += 15;
  else if (claimsHistory === '5-plus') riskScore += 20;
  
  // Location risk (10%)
  if (crimeRate === 'high') riskScore += 10;
  else if (crimeRate === 'medium') riskScore += 5;
  
  // Natural disaster risk (10%)
  if (floodZone === 'high-risk') riskScore += 10;
  else if (floodZone === 'moderate-risk') riskScore += 7;
  else if (floodZone === 'low-risk') riskScore += 3;
  
  if (earthquakeZone === 'high') riskScore += 10;
  else if (earthquakeZone === 'moderate') riskScore += 7;
  else if (earthquakeZone === 'low') riskScore += 3;
  
  // Security risk reduction
  if (securityFeatures === 'gated') riskScore -= 5;
  else if (securityFeatures === 'advanced') riskScore -= 3;
  else if (securityFeatures === 'basic') riskScore -= 1;
  
  if (fireProtection === 'sprinklers') riskScore -= 5;
  else if (fireProtection === 'smoke-detectors') riskScore -= 2;
  else if (fireProtection === 'fire-station-nearby') riskScore -= 2;
  
  return Math.max(0, Math.min(100, riskScore));
}

/**
 * Calculate coverage adequacy score
 */
function calculateCoverageScore(
  personalPropertyValue: number,
  personalPropertyCoverage: number,
  liabilityCoverage: number,
  medicalPayments: number,
  lossOfUse: number,
  policyType: string,
  replacementCost: string,
  identityTheft: string,
  waterBackup: string
): number {
  let score = 0;
  
  // Property coverage adequacy (40%)
  const coverageRatio = personalPropertyCoverage / personalPropertyValue;
  if (coverageRatio >= 1.0) score += 40;
  else if (coverageRatio >= 0.8) score += 35;
  else if (coverageRatio >= 0.6) score += 25;
  else if (coverageRatio >= 0.4) score += 15;
  else score += 5;
  
  // Liability coverage adequacy (25%)
  if (liabilityCoverage >= 300000) score += 25;
  else if (liabilityCoverage >= 200000) score += 20;
  else if (liabilityCoverage >= 100000) score += 15;
  else if (liabilityCoverage >= 50000) score += 10;
  else score += 5;
  
  // Medical payments adequacy (15%)
  if (medicalPayments >= 5000) score += 15;
  else if (medicalPayments >= 2000) score += 12;
  else if (medicalPayments >= 1000) score += 8;
  else score += 3;
  
  // Loss of use adequacy (10%)
  if (lossOfUse >= 10000) score += 10;
  else if (lossOfUse >= 5000) score += 8;
  else if (lossOfUse >= 2000) score += 5;
  else score += 2;
  
  // Policy features (10%)
  if (replacementCost === 'replacement-cost') score += 5;
  if (identityTheft !== 'none') score += 3;
  if (waterBackup !== 'none') score += 2;
  
  return Math.min(100, score);
}

/**
 * Calculate value for money score
 */
function calculateValueScore(
  annualPremium: number,
  totalCoverage: number,
  personalPropertyValue: number,
  policyType: string,
  deductible: number
): number {
  let score = 0;
  
  // Premium efficiency (40%)
  const premiumPerThousand = (annualPremium / (totalCoverage / 1000));
  if (premiumPerThousand <= 15) score += 40;
  else if (premiumPerThousand <= 20) score += 35;
  else if (premiumPerThousand <= 25) score += 30;
  else if (premiumPerThousand <= 30) score += 25;
  else if (premiumPerThousand <= 35) score += 20;
  else score += 10;
  
  // Coverage value (30%)
  const coverageToValueRatio = totalCoverage / personalPropertyValue;
  if (coverageToValueRatio >= 2.0) score += 30;
  else if (coverageToValueRatio >= 1.5) score += 25;
  else if (coverageToValueRatio >= 1.2) score += 20;
  else if (coverageToValueRatio >= 1.0) score += 15;
  else score += 10;
  
  // Policy type value (20%)
  const policyValueMultipliers: { [key: string]: number } = {
    'basic': 0.7,
    'standard': 1.0,
    'premium': 0.8,
    'comprehensive': 0.6
  };
  score += 20 * (policyValueMultipliers[policyType] || 1.0);
  
  // Deductible efficiency (10%)
  if (deductible <= 250) score += 10;
  else if (deductible <= 500) score += 8;
  else if (deductible <= 1000) score += 5;
  else score += 2;
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Main renters insurance calculation function
 */
export function calculateRentersInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values with defaults
  const personalPropertyValue = inputs.personalPropertyValue || 0;
  const electronicsValue = inputs.electronicsValue || 0;
  const jewelryValue = inputs.jewelryValue || 0;
  const furnitureValue = inputs.furnitureValue || 0;
  const clothingValue = inputs.clothingValue || 0;
  const artValue = inputs.artValue || 0;
  const sportsEquipmentValue = inputs.sportsEquipmentValue || 0;
  const musicalInstrumentsValue = inputs.musicalInstrumentsValue || 0;
  
  const liabilityCoverage = inputs.liabilityCoverage || 100000;
  const medicalPayments = inputs.medicalPayments || 1000;
  const lossOfUse = inputs.lossOfUse || 5000;
  const deductible = inputs.deductible || 500;
  
  const propertyType = inputs.propertyType || 'apartment';
  const squareFootage = inputs.squareFootage || 800;
  const bedrooms = inputs.bedrooms || 1;
  const bathrooms = inputs.bathrooms || 1;
  const yearBuilt = inputs.yearBuilt || 2000;
  
  const state = inputs.state || 'ca';
  const city = inputs.city || 'suburban';
  const crimeRate = inputs.crimeRate || 'medium';
  const zipCode = inputs.zipCode || '';
  
  const smoking = inputs.smoking || 'non-smoker';
  const pets = inputs.pets || 'none';
  const petBreed = inputs.petBreed || '';
  const securityFeatures = inputs.securityFeatures || 'basic';
  const fireProtection = inputs.fireProtection || 'smoke-detectors';
  const floodZone = inputs.floodZone || 'none';
  const earthquakeZone = inputs.earthquakeZone || 'none';
  
  const age = inputs.age || 30;
  const creditScore = inputs.creditScore || 750;
  const claimsHistory = inputs.claimsHistory || 'none';
  const occupation = inputs.occupation || 'professional';
  
  const policyType = inputs.policyType || 'standard';
  const replacementCost = inputs.replacementCost || 'actual-cash-value';
  const identityTheft = inputs.identityTheft || 'none';
  const waterBackup = inputs.waterBackup || 'none';
  
  // Calculate total property value
  const totalPropertyValue = personalPropertyValue + electronicsValue + jewelryValue + 
                            furnitureValue + clothingValue + artValue + sportsEquipmentValue + 
                            musicalInstrumentsValue;
  
  // Calculate base premium
  const basePremium = calculateBasePremium(totalPropertyValue, state, city, crimeRate);
  
  // Calculate risk multiplier
  const riskMultiplier = calculateRiskMultiplier(
    smoking, pets, petBreed, age, creditScore, claimsHistory,
    securityFeatures, fireProtection, floodZone, earthquakeZone
  );
  
  // Calculate policy multiplier
  const policyMultiplier = calculatePolicyMultiplier(
    policyType, replacementCost, identityTheft, waterBackup
  );
  
  // Calculate final premium
  const annualPremium = basePremium * riskMultiplier * policyMultiplier;
  const monthlyPremium = annualPremium / 12;
  
  // Calculate coverage amounts
  const personalPropertyCoverage = Math.max(totalPropertyValue, 10000);
  const liabilityCoverageAmount = liabilityCoverage;
  const medicalPaymentsCoverage = medicalPayments;
  const lossOfUseCoverage = lossOfUse;
  
  const totalCoverage = personalPropertyCoverage + liabilityCoverageAmount + 
                       medicalPaymentsCoverage + lossOfUseCoverage;
  
  // Calculate coverage analysis
  const coverageGap = Math.max(0, totalPropertyValue - personalPropertyCoverage);
  const coverageRatio = personalPropertyCoverage > 0 ? 
    (personalPropertyCoverage / totalPropertyValue) * 100 : 0;
  const premiumPerThousand = totalCoverage > 0 ? 
    (annualPremium / (totalCoverage / 1000)) : 0;
  
  const deductibleAmount = deductible;
  const outOfPocketMax = deductible;
  
  // Calculate scores
  const riskScore = calculateRiskScore(
    smoking, pets, petBreed, age, creditScore, claimsHistory,
    crimeRate, floodZone, earthquakeZone, securityFeatures, fireProtection
  );
  
  const coverageScore = calculateCoverageScore(
    totalPropertyValue, personalPropertyCoverage, liabilityCoverageAmount,
    medicalPaymentsCoverage, lossOfUseCoverage, policyType,
    replacementCost, identityTheft, waterBackup
  );
  
  const valueScore = calculateValueScore(
    annualPremium, totalCoverage, totalPropertyValue, policyType, deductible
  );
  
  const overallScore = Math.round((riskScore * 0.3 + coverageScore * 0.4 + valueScore * 0.3));
  
  // Generate recommendation
  let recommendation = 'Consider this policy';
  if (overallScore >= 80) recommendation = 'Excellent policy - strongly recommended';
  else if (overallScore >= 60) recommendation = 'Good policy - recommended';
  else if (overallScore >= 40) recommendation = 'Fair policy - consider alternatives';
  else if (overallScore >= 20) recommendation = 'Poor policy - not recommended';
  else recommendation = 'Very poor policy - avoid';
  
  // Generate key benefits
  const keyBenefits = [
    `Annual premium: $${annualPremium.toLocaleString()}`,
    `Total coverage: $${totalCoverage.toLocaleString()}`,
    `Coverage ratio: ${coverageRatio.toFixed(1)}%`,
    `Risk score: ${riskScore}/100`
  ].join(', ');
  
  // Generate key risks
  const keyRisks = [
    `Coverage gap: $${coverageGap.toLocaleString()}`,
    `Deductible: $${deductible.toLocaleString()}`,
    `Premium per $1k: $${premiumPerThousand.toFixed(2)}`,
    `Overall score: ${overallScore}/100`
  ].join(', ');
  
  return {
    annualPremium: Math.round(annualPremium * 100) / 100,
    monthlyPremium: Math.round(monthlyPremium * 100) / 100,
    personalPropertyCoverage: Math.round(personalPropertyCoverage * 100) / 100,
    liabilityCoverageAmount: Math.round(liabilityCoverageAmount * 100) / 100,
    medicalPaymentsCoverage: Math.round(medicalPaymentsCoverage * 100) / 100,
    lossOfUseCoverage: Math.round(lossOfUseCoverage * 100) / 100,
    totalCoverage: Math.round(totalCoverage * 100) / 100,
    coverageGap: Math.round(coverageGap * 100) / 100,
    coverageRatio: Math.round(coverageRatio * 100) / 100,
    premiumPerThousand: Math.round(premiumPerThousand * 100) / 100,
    deductibleAmount: Math.round(deductibleAmount * 100) / 100,
    outOfPocketMax: Math.round(outOfPocketMax * 100) / 100,
    riskScore,
    coverageScore,
    valueScore,
    overallScore,
    recommendation,
    keyBenefits,
    keyRisks,
    rentersInsuranceAnalysis: 'Comprehensive renters insurance analysis completed'
  };
}

/**
 * Generate comprehensive renters insurance analysis report
 */
export function generateRentersInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Renters Insurance Analysis Report

## Summary
**Recommendation:** ${outputs.recommendation}
**Overall Score:** ${outputs.overallScore}/100
**Risk Score:** ${outputs.riskScore}/100
**Coverage Score:** ${outputs.coverageScore}/100
**Value Score:** ${outputs.valueScore}/100

## Premium Analysis
- **Annual Premium:** $${outputs.annualPremium.toLocaleString()}
- **Monthly Premium:** $${outputs.monthlyPremium.toLocaleString()}
- **Premium per $1,000 Coverage:** $${outputs.premiumPerThousand.toFixed(2)}

## Coverage Breakdown
- **Personal Property Coverage:** $${outputs.personalPropertyCoverage.toLocaleString()}
- **Liability Coverage:** $${outputs.liabilityCoverageAmount.toLocaleString()}
- **Medical Payments:** $${outputs.medicalPaymentsCoverage.toLocaleString()}
- **Loss of Use Coverage:** $${outputs.lossOfUseCoverage.toLocaleString()}
- **Total Coverage:** $${outputs.totalCoverage.toLocaleString()}

## Coverage Analysis
- **Coverage Gap:** $${outputs.coverageGap.toLocaleString()}
- **Coverage Ratio:** ${outputs.coverageRatio.toFixed(1)}%
- **Deductible:** $${outputs.deductibleAmount.toLocaleString()}
- **Out-of-Pocket Maximum:** $${outputs.outOfPocketMax.toLocaleString()}

## Property Details
- **Total Property Value:** $${inputs.personalPropertyValue?.toLocaleString() || '0'}
- **Property Type:** ${inputs.propertyType || 'Not specified'}
- **Square Footage:** ${inputs.squareFootage || 'Not specified'}
- **Bedrooms:** ${inputs.bedrooms || 'Not specified'}
- **Bathrooms:** ${inputs.bathrooms || 'Not specified'}

## Location Factors
- **State:** ${inputs.state || 'Not specified'}
- **City Type:** ${inputs.city || 'Not specified'}
- **Crime Rate:** ${inputs.crimeRate || 'Not specified'}
- **Flood Zone:** ${inputs.floodZone || 'Not specified'}
- **Earthquake Zone:** ${inputs.earthquakeZone || 'Not specified'}

## Risk Factors
- **Smoking Status:** ${inputs.smoking || 'Not specified'}
- **Pet Ownership:** ${inputs.pets || 'Not specified'}
- **Security Features:** ${inputs.securityFeatures || 'Not specified'}
- **Fire Protection:** ${inputs.fireProtection || 'Not specified'}
- **Age:** ${inputs.age || 'Not specified'}
- **Credit Score:** ${inputs.creditScore || 'Not specified'}
- **Claims History:** ${inputs.claimsHistory || 'Not specified'}

## Policy Features
- **Policy Type:** ${inputs.policyType || 'Not specified'}
- **Replacement Cost:** ${inputs.replacementCost || 'Not specified'}
- **Identity Theft Coverage:** ${inputs.identityTheft || 'Not specified'}
- **Water Backup Coverage:** ${inputs.waterBackup || 'Not specified'}

## Key Benefits
${outputs.keyBenefits}

## Key Risks
${outputs.keyRisks}

## Recommendations
1. **Coverage Review:** Ensure adequate coverage for all personal property
2. **Deductible Selection:** Choose deductible that balances premium savings with affordability
3. **Policy Features:** Consider additional coverage for high-value items
4. **Risk Mitigation:** Implement security measures to reduce premiums
5. **Regular Review:** Update coverage annually as property value changes
6. **Claims Prevention:** Maintain good claims history for better rates
7. **Comparison Shopping:** Compare quotes from multiple insurers
8. **Documentation:** Keep detailed inventory of personal property`;
}
