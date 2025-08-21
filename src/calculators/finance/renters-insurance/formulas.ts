import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface RentersInsuranceInputs extends CalculatorInputs {
  rentalValue?: number;
  personalPropertyValue?: number;
  rentalType?: string;
  squareFootage?: number;
  location?: string;
  state?: string;
  zipCode?: string;
  crimeRate?: string;
  fireStationDistance?: number;
  floodZone?: string;
  earthquakeZone?: string;
  hurricaneZone?: string;
  tornadoZone?: string;
  wildfireZone?: string;
  deductible?: string;
  coverageLevel?: string;
  liabilityCoverage?: number;
  medicalPayments?: number;
  lossOfUse?: number;
  jewelryCoverage?: number;
  electronicsCoverage?: number;
  businessEquipmentCoverage?: number;
  musicalInstrumentsCoverage?: number;
  sportsEquipmentCoverage?: number;
  artworkCoverage?: number;
  collectiblesCoverage?: number;
  creditScore?: number;
  claimsHistory?: string;
  occupancyDuration?: number;
  securityFeatures?: string[];
  buildingAge?: number;
  floorLevel?: number;
  parkingType?: string;
  petOwnership?: string;
  roommates?: number;
  waterBackup?: number;
  identityTheft?: number;
  petLiability?: number;
  taxRate?: number;
  inflationRate?: number;
}

export interface RentersInsuranceOutputs extends CalculatorOutputs {
  annualPremium: number;
  monthlyPremium: number;
  personalPropertyCoverage: number;
  liabilityCoverageAmount: number;
  medicalPaymentsAmount: number;
  lossOfUseAmount: number;
  totalCoverage: number;
  coverageRatio: number;
  coverageGap: number;
  riskScore: number;
  premiumScore: number;
  coverageScore: number;
  recommendedDeductible: number;
  premiumSavings: number;
  riskFactors: string;
  discounts: string;
  recommendations: string;
  comparisonTable: string;
  annualCost: number;
  costPerThousand: number;
  coverageAdequacy: string;
  policyGrade: string;
  rentersInsuranceAnalysis: string;
}

// Base rates per $1000 of coverage (industry averages)
const BASE_RATES = {
  basic: 0.85,
  standard: 1.15,
  premium: 1.45,
  comprehensive: 1.85
};

// Location factors
const LOCATION_FACTORS = {
  urban: 1.25,
  suburban: 1.0,
  rural: 0.85
};

// Rental type factors
const RENTAL_TYPE_FACTORS = {
  apartment: 1.0,
  house: 1.15,
  condo: 0.95,
  townhouse: 1.05,
  studio: 0.9,
  duplex: 1.1,
  'mobile-home': 1.3
};

// State-specific factors (simplified)
const STATE_FACTORS = {
  california: 1.35,
  florida: 1.45,
  texas: 1.1,
  'new-york': 1.4,
  illinois: 1.15,
  pennsylvania: 1.05,
  ohio: 0.95,
  georgia: 1.0,
  'north-carolina': 0.9,
  michigan: 1.05
};

// Crime rate factors
const CRIME_RATE_FACTORS = {
  low: 0.85,
  medium: 1.0,
  high: 1.35
};

// Natural disaster factors
const NATURAL_DISASTER_FACTORS = {
  flood: { none: 1.0, a: 1.25, ae: 1.4, ah: 1.3, ao: 1.2, ar: 1.15, a99: 1.1, v: 1.5, ve: 1.6, x: 1.0 },
  earthquake: { none: 1.0, low: 1.05, moderate: 1.15, high: 1.3, 'very-high': 1.5 },
  hurricane: { none: 1.0, low: 1.1, moderate: 1.25, high: 1.4, 'very-high': 1.6 },
  tornado: { none: 1.0, low: 1.05, moderate: 1.15, high: 1.3, 'very-high': 1.45 },
  wildfire: { none: 1.0, low: 1.1, moderate: 1.25, high: 1.4, 'very-high': 1.6 }
};

// Deductible discount rates
const DEDUCTIBLE_DISCOUNTS = {
  '250': 0.0,
  '500': 0.05,
  '1000': 0.12,
  '1500': 0.18,
  '2000': 0.23,
  '2500': 0.28
};

// Security feature discounts
const SECURITY_DISCOUNTS = {
  'alarm-system': 0.05,
  'smoke-detectors': 0.03,
  'deadbolts': 0.02,
  'security-cameras': 0.04,
  'gated-community': 0.06,
  'doorman': 0.08,
  'fire-sprinklers': 0.07
};

// Claims history factors
const CLAIMS_HISTORY_FACTORS = {
  none: 1.0,
  '1-2': 1.15,
  '3-5': 1.35,
  '5-plus': 1.6
};

// Credit score factors
const CREDIT_SCORE_FACTORS = {
  excellent: 0.85,
  good: 0.95,
  fair: 1.1,
  poor: 1.35
};

export function calculateRentersInsurance(inputs: RentersInsuranceInputs): RentersInsuranceOutputs {
  const {
    rentalValue = 300000,
    personalPropertyValue = 25000,
    rentalType = 'apartment',
    location = 'urban',
    state = 'california',
    crimeRate = 'medium',
    deductible = '500',
    coverageLevel = 'standard',
    liabilityCoverage = 100000,
    medicalPayments = 1000,
    lossOfUse = 5000,
    jewelryCoverage = 0,
    electronicsCoverage = 0,
    businessEquipmentCoverage = 0,
    musicalInstrumentsCoverage = 0,
    sportsEquipmentCoverage = 0,
    artworkCoverage = 0,
    collectiblesCoverage = 0,
    creditScore = 750,
    claimsHistory = 'none',
    securityFeatures = [],
    buildingAge = 15,
    floorLevel = 1,
    parkingType = 'street',
    petOwnership = 'none',
    roommates = 0,
    waterBackup = 0,
    identityTheft = 0,
    petLiability = 0,
    floodZone = 'none',
    earthquakeZone = 'none',
    hurricaneZone = 'none',
    tornadoZone = 'none',
    wildfireZone = 'none',
    fireStationDistance = 2,
    taxRate = 8.5,
    inflationRate = 2.5
  } = inputs;

  // Base premium calculation
  const baseRate = BASE_RATES[coverageLevel as keyof typeof BASE_RATES] || BASE_RATES.standard;
  const locationFactor = LOCATION_FACTORS[location as keyof typeof LOCATION_FACTORS] || 1.0;
  const rentalTypeFactor = RENTAL_TYPE_FACTORS[rentalType as keyof typeof RENTAL_TYPE_FACTORS] || 1.0;
  const stateFactor = STATE_FACTORS[state as keyof typeof STATE_FACTORS] || 1.0;
  const crimeFactor = CRIME_RATE_FACTORS[crimeRate as keyof typeof CRIME_RATE_FACTORS] || 1.0;

  // Natural disaster factors
  const floodFactor = NATURAL_DISASTER_FACTORS.flood[floodZone as keyof typeof NATURAL_DISASTER_FACTORS.flood] || 1.0;
  const earthquakeFactor = NATURAL_DISASTER_FACTORS.earthquake[earthquakeZone as keyof typeof NATURAL_DISASTER_FACTORS.earthquake] || 1.0;
  const hurricaneFactor = NATURAL_DISASTER_FACTORS.hurricane[hurricaneZone as keyof typeof NATURAL_DISASTER_FACTORS.hurricane] || 1.0;
  const tornadoFactor = NATURAL_DISASTER_FACTORS.tornado[tornadoZone as keyof typeof NATURAL_DISASTER_FACTORS.tornado] || 1.0;
  const wildfireFactor = NATURAL_DISASTER_FACTORS.wildfire[wildfireZone as keyof typeof NATURAL_DISASTER_FACTORS.wildfire] || 1.0;

  // Additional risk factors
  const buildingAgeFactor = buildingAge > 50 ? 1.25 : buildingAge > 30 ? 1.15 : buildingAge > 15 ? 1.05 : 1.0;
  const floorLevelFactor = floorLevel > 10 ? 0.95 : floorLevel > 5 ? 0.98 : 1.0;
  const fireStationFactor = fireStationDistance > 5 ? 1.15 : fireStationDistance > 2 ? 1.05 : 1.0;
  const claimsHistoryFactor = CLAIMS_HISTORY_FACTORS[claimsHistory as keyof typeof CLAIMS_HISTORY_FACTORS] || 1.0;

  // Credit score factor
  let creditFactor = 1.0;
  if (creditScore >= 750) creditFactor = CREDIT_SCORE_FACTORS.excellent;
  else if (creditScore >= 700) creditFactor = CREDIT_SCORE_FACTORS.good;
  else if (creditScore >= 650) creditFactor = CREDIT_SCORE_FACTORS.fair;
  else creditFactor = CREDIT_SCORE_FACTORS.poor;

  // Pet and roommate factors
  const petFactor = petOwnership === 'none' ? 1.0 : petOwnership === 'dog' ? 1.05 : petOwnership === 'cat' ? 1.03 : 1.1;
  const roommateFactor = roommates > 0 ? 1.05 : 1.0;

  // Security discounts
  let securityDiscount = 0;
  securityFeatures.forEach(feature => {
    securityDiscount += SECURITY_DISCOUNTS[feature as keyof typeof SECURITY_DISCOUNTS] || 0;
  });
  securityDiscount = Math.min(securityDiscount, 0.25); // Cap at 25%

  // Base premium calculation
  const basePremium = (personalPropertyValue / 1000) * baseRate * locationFactor * rentalTypeFactor * 
    stateFactor * crimeFactor * floodFactor * earthquakeFactor * hurricaneFactor * tornadoFactor * 
    wildfireFactor * buildingAgeFactor * floorLevelFactor * fireStationFactor * claimsHistoryFactor * 
    creditFactor * petFactor * roommateFactor;

  // Apply deductible discount
  const deductibleDiscount = DEDUCTIBLE_DISCOUNTS[deductible as keyof typeof DEDUCTIBLE_DISCOUNTS] || 0;
  const finalPremium = basePremium * (1 - deductibleDiscount) * (1 - securityDiscount);

  // Coverage calculations
  const personalPropertyCoverage = personalPropertyValue * (coverageLevel === 'comprehensive' ? 1.1 : coverageLevel === 'premium' ? 1.05 : 1.0);
  const liabilityCoverageAmount = liabilityCoverage + petLiability;
  const medicalPaymentsAmount = medicalPayments;
  const lossOfUseAmount = lossOfUse;
  const totalCoverage = personalPropertyCoverage + liabilityCoverageAmount + medicalPaymentsAmount + lossOfUseAmount + 
    jewelryCoverage + electronicsCoverage + businessEquipmentCoverage + musicalInstrumentsCoverage + 
    sportsEquipmentCoverage + artworkCoverage + collectiblesCoverage + waterBackup + identityTheft;

  // Additional calculations
  const coverageRatio = (personalPropertyCoverage / personalPropertyValue) * 100;
  const coverageGap = Math.max(0, personalPropertyValue - personalPropertyCoverage);
  const monthlyPremium = finalPremium / 12;
  const annualCost = finalPremium + Number(deductible);
  const costPerThousand = (finalPremium / (personalPropertyCoverage / 1000));

  // Risk score calculation (0-100)
  const riskScore = Math.min(100, Math.max(0, 
    (locationFactor - 0.85) * 50 + 
    (crimeFactor - 0.85) * 30 + 
    (Math.max(floodFactor, earthquakeFactor, hurricaneFactor, tornadoFactor, wildfireFactor) - 1) * 40 +
    (buildingAgeFactor - 1) * 20 +
    (claimsHistoryFactor - 1) * 25 +
    (creditFactor - 0.85) * 30
  ));

  // Premium score (0-100, higher is better)
  const premiumScore = Math.min(100, Math.max(0, 100 - (costPerThousand - 1) * 20));

  // Coverage score (0-100)
  const coverageScore = Math.min(100, Math.max(0, 
    (coverageRatio / 100) * 40 + 
    (liabilityCoverageAmount >= 100000 ? 30 : liabilityCoverageAmount / 100000 * 30) +
    (medicalPaymentsAmount >= 1000 ? 15 : medicalPaymentsAmount / 1000 * 15) +
    (lossOfUseAmount >= 5000 ? 15 : lossOfUseAmount / 5000 * 15)
  ));

  // Recommended deductible
  const recommendedDeductible = personalPropertyValue > 50000 ? 1000 : 500;
  const recommendedPremium = basePremium * (1 - DEDUCTIBLE_DISCOUNTS[recommendedDeductible.toString() as keyof typeof DEDUCTIBLE_DISCOUNTS]) * (1 - securityDiscount);
  const premiumSavings = finalPremium - recommendedPremium;

  // Policy grade
  let policyGrade = 'C';
  const totalScore = (premiumScore + coverageScore) / 2;
  if (totalScore >= 90) policyGrade = 'A';
  else if (totalScore >= 80) policyGrade = 'B';
  else if (totalScore >= 70) policyGrade = 'C';
  else if (totalScore >= 60) policyGrade = 'D';
  else policyGrade = 'F';

  // Risk factors analysis
  const riskFactors = [];
  if (locationFactor > 1.1) riskFactors.push('High-risk location');
  if (crimeFactor > 1.1) riskFactors.push('High crime area');
  if (floodFactor > 1.1) riskFactors.push('Flood risk');
  if (earthquakeFactor > 1.1) riskFactors.push('Earthquake risk');
  if (hurricaneFactor > 1.1) riskFactors.push('Hurricane risk');
  if (tornadoFactor > 1.1) riskFactors.push('Tornado risk');
  if (wildfireFactor > 1.1) riskFactors.push('Wildfire risk');
  if (buildingAgeFactor > 1.1) riskFactors.push('Older building');
  if (claimsHistoryFactor > 1.1) riskFactors.push('Claims history');
  if (creditFactor > 1.1) riskFactors.push('Credit score impact');
  if (petFactor > 1.0) riskFactors.push('Pet ownership');
  if (roommateFactor > 1.0) riskFactors.push('Roommates');

  // Available discounts
  const discounts = [];
  if (securityFeatures.length > 0) discounts.push(`Security features (${(securityDiscount * 100).toFixed(1)}%)`);
  if (deductibleDiscount > 0) discounts.push(`Higher deductible (${(deductibleDiscount * 100).toFixed(1)}%)`);
  if (creditFactor < 1.0) discounts.push('Good credit score');
  if (claimsHistory === 'none') discounts.push('No claims history');

  // Coverage adequacy
  let coverageAdequacy = 'Adequate';
  if (coverageRatio < 80) coverageAdequacy = 'Inadequate';
  else if (coverageRatio < 90) coverageAdequacy = 'Marginal';
  else if (coverageRatio > 110) coverageAdequacy = 'Over-insured';

  // Deductible comparison table
  const deductibleOptions = ['250', '500', '1000', '1500', '2000', '2500'];
  const comparisonTable = deductibleOptions.map(d => {
    const discount = DEDUCTIBLE_DISCOUNTS[d as keyof typeof DEDUCTIBLE_DISCOUNTS] || 0;
    const premium = basePremium * (1 - discount) * (1 - securityDiscount);
    return `${d}: $${premium.toFixed(2)}/year (${(discount * 100).toFixed(1)}% discount)`;
  }).join('\n');

  return {
    annualPremium: finalPremium,
    monthlyPremium,
    personalPropertyCoverage,
    liabilityCoverageAmount,
    medicalPaymentsAmount,
    lossOfUseAmount,
    totalCoverage,
    coverageRatio,
    coverageGap,
    riskScore,
    premiumScore,
    coverageScore,
    recommendedDeductible,
    premiumSavings,
    riskFactors: riskFactors.join(', ') || 'Low risk factors',
    discounts: discounts.join(', ') || 'No additional discounts available',
    recommendations: generateRecommendations(inputs, finalPremium, coverageRatio, riskScore),
    comparisonTable,
    annualCost,
    costPerThousand,
    coverageAdequacy,
    policyGrade,
    rentersInsuranceAnalysis: generateRentersInsuranceAnalysis(inputs, {
      annualPremium: finalPremium,
      monthlyPremium,
      personalPropertyCoverage,
      liabilityCoverageAmount,
      medicalPaymentsAmount,
      lossOfUseAmount,
      totalCoverage,
      coverageRatio,
      coverageGap,
      riskScore,
      premiumScore,
      coverageScore,
      recommendedDeductible,
      premiumSavings,
      riskFactors: riskFactors.join(', ') || 'Low risk factors',
      discounts: discounts.join(', ') || 'No additional discounts available',
      recommendations: '',
      comparisonTable,
      annualCost,
      costPerThousand,
      coverageAdequacy,
      policyGrade,
      rentersInsuranceAnalysis: ''
    })
  };
}

function generateRecommendations(inputs: RentersInsuranceInputs, premium: number, coverageRatio: number, riskScore: number): string {
  const recommendations = [];

  if (coverageRatio < 90) {
    recommendations.push('Consider increasing personal property coverage to better protect your belongings');
  }

  if (inputs.liabilityCoverage && inputs.liabilityCoverage < 100000) {
    recommendations.push('Increase liability coverage to at least $100,000 for better protection');
  }

  if (riskScore > 70) {
    recommendations.push('Consider additional coverage for natural disasters or high-risk factors');
  }

  if (premium > 300) {
    recommendations.push('Shop around for better rates or consider increasing your deductible');
  }

  if (inputs.securityFeatures && inputs.securityFeatures.length < 2) {
    recommendations.push('Install additional security features to qualify for discounts');
  }

  if (!inputs.medicalPayments || inputs.medicalPayments < 1000) {
    recommendations.push('Consider medical payments coverage for guest injuries');
  }

  return recommendations.join('. ') + '.';
}

export function generateRentersInsuranceAnalysis(inputs: RentersInsuranceInputs, outputs: RentersInsuranceOutputs): string {
  const {
    rentalValue,
    personalPropertyValue,
    rentalType,
    location,
    state,
    deductible,
    coverageLevel
  } = inputs;

  const {
    annualPremium,
    monthlyPremium,
    personalPropertyCoverage,
    liabilityCoverageAmount,
    totalCoverage,
    coverageRatio,
    riskScore,
    premiumScore,
    coverageScore,
    policyGrade,
    riskFactors,
    discounts,
    recommendations,
    coverageAdequacy
  } = outputs;

  return `
# Renters Insurance Analysis Report

## Policy Summary
- **Annual Premium**: $${annualPremium.toFixed(2)}
- **Monthly Premium**: $${monthlyPremium.toFixed(2)}
- **Total Coverage**: $${totalCoverage.toLocaleString()}
- **Policy Grade**: ${policyGrade}

## Coverage Breakdown
- **Personal Property**: $${personalPropertyCoverage.toLocaleString()} (${coverageRatio.toFixed(1)}% of declared value)
- **Liability Protection**: $${liabilityCoverageAmount.toLocaleString()}
- **Medical Payments**: $${outputs.medicalPaymentsAmount.toLocaleString()}
- **Loss of Use**: $${outputs.lossOfUseAmount.toLocaleString()}

## Risk Assessment
- **Risk Score**: ${riskScore.toFixed(1)}/100
- **Risk Factors**: ${riskFactors}
- **Location**: ${location} area in ${state}
- **Property Type**: ${rentalType}
- **Property Value**: $${rentalValue?.toLocaleString()}

## Cost Analysis
- **Cost per $1,000 Coverage**: $${outputs.costPerThousand.toFixed(2)}
- **Premium Score**: ${premiumScore.toFixed(1)}/100
- **Coverage Score**: ${coverageScore.toFixed(1)}/100
- **Coverage Adequacy**: ${coverageAdequacy}

## Available Discounts
${discounts}

## Recommendations
${recommendations}

## Deductible Options
${outputs.comparisonTable}

## Key Insights
- This policy provides ${coverageRatio.toFixed(1)}% coverage of your declared personal property value
- Your risk profile is ${riskScore < 30 ? 'low' : riskScore < 60 ? 'moderate' : 'high'}
- The policy is ${premiumScore > 80 ? 'competitively priced' : premiumScore > 60 ? 'moderately priced' : 'expensive'}
- Overall coverage is ${coverageScore > 80 ? 'comprehensive' : coverageScore > 60 ? 'adequate' : 'inadequate'}

## Next Steps
1. Review coverage limits and adjust as needed
2. Consider additional endorsements for valuable items
3. Shop around for competitive rates
4. Maintain good credit score for better rates
5. Install security features for additional discounts
`;
}