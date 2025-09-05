import { LandlordInsuranceInputs, LandlordInsuranceOutputs } from './types';

export function calculateLandlordInsurance(inputs: LandlordInsuranceInputs): LandlordInsuranceOutputs {
  // Base premium calculation
  const baseRate = 0.004; // Base rate per $1000 of dwelling coverage (higher than homeowners)
  const dwellingPremium = (inputs.dwellingCoverage / 1000) * baseRate;
  
  // Personal property premium (typically 50-70% of dwelling coverage)
  const personalPropertyRate = 0.0025;
  const personalPropertyPremium = (inputs.personalPropertyCoverage / 1000) * personalPropertyRate;
  
  // Liability premium (typically $1-3 per $1000 of coverage)
  const liabilityRate = 0.0025;
  const liabilityPremium = (inputs.liabilityCoverage / 1000) * liabilityRate;
  
  // Medical payments premium (typically $0.50-1.50 per $1000 of coverage)
  const medicalPaymentsRate = 0.0015;
  const medicalPaymentsPremium = (inputs.medicalPaymentsCoverage / 1000) * medicalPaymentsRate;
  
  // Loss of rents premium (typically 10-20% of annual rent)
  const lossOfRentsRate = 0.15;
  const lossOfRentsPremium = inputs.annualRent * lossOfRentsRate;
  
  // Additional living expenses premium (typically 20-30% of dwelling premium)
  const additionalLivingExpensesPremium = dwellingPremium * 0.25;
  
  // Calculate discounts
  const multiPolicyDiscount = inputs.multiPolicyDiscount ? dwellingPremium * 0.15 : 0;
  const securitySystemDiscount = inputs.securitySystemDiscount ? dwellingPremium * 0.05 : 0;
  const smokeDetectorDiscount = inputs.smokeDetectorDiscount ? dwellingPremium * 0.02 : 0;
  const deadboltDiscount = inputs.deadboltDiscount ? dwellingPremium * 0.02 : 0;
  const newHomeDiscount = inputs.newHomeDiscount ? dwellingPremium * 0.10 : 0;
  const claimsFreeDiscount = inputs.claimsFreeDiscount ? dwellingPremium * 0.10 : 0;
  const loyaltyDiscount = inputs.loyaltyDiscount ? dwellingPremium * 0.05 : 0;
  const paperlessDiscount = inputs.paperlessDiscount ? dwellingPremium * 0.02 : 0;
  const autopayDiscount = inputs.autopayDiscount ? dwellingPremium * 0.02 : 0;
  
  const totalDiscounts = multiPolicyDiscount + securitySystemDiscount + smokeDetectorDiscount + 
                        deadboltDiscount + newHomeDiscount + claimsFreeDiscount + 
                        loyaltyDiscount + paperlessDiscount + autopayDiscount;
  
  // Risk adjustments
  const locationRiskAdjustment = calculateLocationRiskAdjustment(inputs);
  const propertyRiskAdjustment = calculatePropertyRiskAdjustment(inputs);
  const landlordRiskAdjustment = calculateLandlordRiskAdjustment(inputs);
  const rentalRiskAdjustment = calculateRentalRiskAdjustment(inputs);
  const totalRiskAdjustments = locationRiskAdjustment + propertyRiskAdjustment + 
                              landlordRiskAdjustment + rentalRiskAdjustment;
  
  // Calculate base premium
  const basePremium = dwellingPremium + personalPropertyPremium + liabilityPremium + 
                     medicalPaymentsPremium + lossOfRentsPremium + additionalLivingExpensesPremium;
  
  // Apply discounts and risk adjustments
  const adjustedPremium = basePremium - totalDiscounts + totalRiskAdjustments;
  
  // Calculate payment frequencies
  const annualPremium = Math.max(adjustedPremium, 500); // Minimum premium for landlord insurance
  const monthlyPremium = annualPremium / 12;
  const quarterlyPremium = annualPremium / 4;
  const semiannualPremium = annualPremium / 2;
  
  // Coverage analysis
  const coverageAdequacy = analyzeCoverageAdequacy(inputs);
  const recommendedDwellingCoverage = calculateRecommendedDwellingCoverage(inputs);
  const recommendedPersonalPropertyCoverage = recommendedDwellingCoverage * 0.6;
  const recommendedLiabilityCoverage = Math.max(inputs.liabilityCoverage, 500000); // Higher for landlords
  const recommendedLossOfRentsCoverage = inputs.annualRent * 1.2; // 120% of annual rent
  
  // Risk assessment
  const overallRiskScore = calculateOverallRiskScore(inputs);
  const riskFactors = identifyRiskFactors(inputs);
  const riskMitigationRecommendations = generateRiskMitigationRecommendations(inputs);
  
  // Cost analysis
  const costPerThousand = (annualPremium / inputs.dwellingCoverage) * 1000;
  const premiumToValueRatio = annualPremium / inputs.propertyValue;
  const premiumToRentRatio = annualPremium / inputs.annualRent;
  
  // Deductible impact analysis
  const deductibleImpact = calculateDeductibleImpact(inputs, annualPremium);
  
  // Rental income analysis
  const rentalIncomeAnalysis = calculateRentalIncomeAnalysis(inputs, annualPremium);
  
  // Generate recommendations
  const coverageRecommendations = generateCoverageRecommendations(inputs);
  const discountRecommendations = generateDiscountRecommendations(inputs);
  const riskReductionRecommendations = generateRiskReductionRecommendations(inputs);
  const policyOptimizationRecommendations = generatePolicyOptimizationRecommendations(inputs);
  
  // Market comparison
  const marketComparison = calculateMarketComparison(annualPremium, inputs.propertyValue);
  
  // Summary
  const summary = {
    totalAnnualCost: annualPremium,
    totalMonthlyCost: monthlyPremium,
    keyBenefits: [
      'Comprehensive property protection',
      'Liability coverage for rental activities',
      'Loss of rents coverage',
      'Landlord-specific protections'
    ],
    keyRisks: riskFactors.slice(0, 3),
    nextSteps: [
      'Review coverage limits',
      'Consider additional endorsements',
      'Shop for competitive rates',
      'Implement risk mitigation measures'
    ]
  };
  
  return {
    basePremium,
    dwellingPremium,
    personalPropertyPremium,
    liabilityPremium,
    medicalPaymentsPremium,
    lossOfRentsPremium,
    additionalLivingExpensesPremium,
    multiPolicyDiscount,
    securitySystemDiscount,
    smokeDetectorDiscount,
    deadboltDiscount,
    newHomeDiscount,
    claimsFreeDiscount,
    loyaltyDiscount,
    paperlessDiscount,
    autopayDiscount,
    totalDiscounts,
    locationRiskAdjustment,
    propertyRiskAdjustment,
    landlordRiskAdjustment,
    rentalRiskAdjustment,
    totalRiskAdjustments,
    annualPremium,
    monthlyPremium,
    quarterlyPremium,
    semiannualPremium,
    coverageAdequacy,
    recommendedDwellingCoverage,
    recommendedPersonalPropertyCoverage,
    recommendedLiabilityCoverage,
    recommendedLossOfRentsCoverage,
    overallRiskScore,
    riskFactors,
    riskMitigationRecommendations,
    costPerThousand,
    premiumToValueRatio,
    premiumToRentRatio,
    deductibleImpact,
    rentalIncomeAnalysis,
    coverageRecommendations,
    discountRecommendations,
    riskReductionRecommendations,
    policyOptimizationRecommendations,
    marketComparison,
    summary
  };
}

function calculateLocationRiskAdjustment(inputs: LandlordInsuranceInputs): number {
  let adjustment = 0;
  
  // Flood zone adjustment
  switch (inputs.floodZone) {
    case 'low_risk':
      adjustment += 0;
      break;
    case 'moderate_risk':
      adjustment += 75;
      break;
    case 'high_risk':
      adjustment += 250;
      break;
    case 'very_high_risk':
      adjustment += 600;
      break;
  }
  
  // Earthquake risk adjustment
  switch (inputs.earthquakeRisk) {
    case 'low':
      adjustment += 0;
      break;
    case 'moderate':
      adjustment += 125;
      break;
    case 'high':
      adjustment += 350;
      break;
    case 'very_high':
      adjustment += 700;
      break;
  }
  
  // Wildfire risk adjustment
  switch (inputs.wildfireRisk) {
    case 'low':
      adjustment += 0;
      break;
    case 'moderate':
      adjustment += 100;
      break;
    case 'high':
      adjustment += 250;
      break;
    case 'very_high':
      adjustment += 500;
      break;
  }
  
  // Crime rate adjustment
  switch (inputs.crimeRate) {
    case 'low':
      adjustment += 0;
      break;
    case 'moderate':
      adjustment += 50;
      break;
    case 'high':
      adjustment += 125;
      break;
    case 'very_high':
      adjustment += 250;
      break;
  }
  
  // Distance to fire station adjustment
  if (inputs.distanceToFireStation > 5) {
    adjustment += 150;
  } else if (inputs.distanceToFireStation > 2) {
    adjustment += 75;
  }
  
  return adjustment;
}

function calculatePropertyRiskAdjustment(inputs: LandlordInsuranceInputs): number {
  let adjustment = 0;
  
  // Property age adjustment
  if (inputs.propertyAge > 50) {
    adjustment += 300;
  } else if (inputs.propertyAge > 30) {
    adjustment += 150;
  } else if (inputs.propertyAge > 15) {
    adjustment += 75;
  }
  
  // Construction type adjustment
  switch (inputs.constructionType) {
    case 'frame':
      adjustment += 150;
      break;
    case 'brick':
      adjustment += 0;
      break;
    case 'stone':
      adjustment += 0;
      break;
    case 'stucco':
      adjustment += 50;
      break;
    case 'concrete':
      adjustment += 0;
      break;
    case 'steel':
      adjustment += 0;
      break;
  }
  
  // Roof type adjustment
  switch (inputs.roofType) {
    case 'asphalt_shingle':
      adjustment += 0;
      break;
    case 'metal':
      adjustment += 0;
      break;
    case 'tile':
      adjustment += 0;
      break;
    case 'slate':
      adjustment += 0;
      break;
    case 'wood_shake':
      adjustment += 200;
      break;
    case 'flat':
      adjustment += 100;
      break;
  }
  
  // Additional features adjustment
  if (inputs.swimmingPool) adjustment += 150;
  if (inputs.trampoline) adjustment += 100;
  if (inputs.aggressiveDog) adjustment += 200;
  if (inputs.homeBusiness) adjustment += 300;
  if (inputs.vacantProperty) adjustment += 500;
  if (inputs.shortTermRental) adjustment += 400;
  if (inputs.furnishedRental) adjustment += 200;
  
  return adjustment;
}

function calculateLandlordRiskAdjustment(inputs: LandlordInsuranceInputs): number {
  let adjustment = 0;
  
  // Credit score adjustment
  switch (inputs.creditScore) {
    case 'excellent':
      adjustment -= 75;
      break;
    case 'very_good':
      adjustment -= 50;
      break;
    case 'good':
      adjustment += 0;
      break;
    case 'fair':
      adjustment += 150;
      break;
    case 'poor':
      adjustment += 350;
      break;
  }
  
  // Claims history adjustment
  if (inputs.claimsHistory > 3) {
    adjustment += 500;
  } else if (inputs.claimsHistory > 1) {
    adjustment += 250;
  } else if (inputs.claimsHistory === 1) {
    adjustment += 125;
  }
  
  // Insurance score adjustment
  switch (inputs.insuranceScore) {
    case 'excellent':
      adjustment -= 50;
      break;
    case 'very_good':
      adjustment -= 25;
      break;
    case 'good':
      adjustment += 0;
      break;
    case 'fair':
      adjustment += 75;
      break;
    case 'poor':
      adjustment += 200;
      break;
  }
  
  // Landlord experience adjustment
  if (inputs.landlordExperience < 1) {
    adjustment += 200;
  } else if (inputs.landlordExperience < 3) {
    adjustment += 100;
  } else if (inputs.landlordExperience > 10) {
    adjustment -= 50;
  }
  
  // Number of properties adjustment
  if (inputs.numberOfProperties > 10) {
    adjustment += 100;
  } else if (inputs.numberOfProperties > 5) {
    adjustment += 50;
  }
  
  return adjustment;
}

function calculateRentalRiskAdjustment(inputs: LandlordInsuranceInputs): number {
  let adjustment = 0;
  
  // Occupancy rate adjustment
  if (inputs.occupancyRate < 70) {
    adjustment += 200;
  } else if (inputs.occupancyRate < 85) {
    adjustment += 100;
  } else if (inputs.occupancyRate > 95) {
    adjustment -= 50;
  }
  
  // Average tenant length adjustment
  if (inputs.averageTenantLength < 6) {
    adjustment += 150;
  } else if (inputs.averageTenantLength < 12) {
    adjustment += 75;
  } else if (inputs.averageTenantLength > 24) {
    adjustment -= 25;
  }
  
  // Tenant screening adjustment
  if (!inputs.tenantScreening) {
    adjustment += 100;
  }
  
  // Lease agreement adjustment
  if (!inputs.leaseAgreement) {
    adjustment += 150;
  }
  
  // Security deposit adjustment
  if (inputs.securityDeposit < inputs.monthlyRent) {
    adjustment += 75;
  } else if (inputs.securityDeposit > inputs.monthlyRent * 2) {
    adjustment -= 25;
  }
  
  // Risk management adjustments
  if (!inputs.propertyManagement) {
    adjustment += 100;
  }
  
  if (!inputs.regularInspections) {
    adjustment += 75;
  }
  
  if (!inputs.maintenanceProgram) {
    adjustment += 50;
  }
  
  if (!inputs.tenantInsurance) {
    adjustment += 100;
  }
  
  return adjustment;
}

function analyzeCoverageAdequacy(inputs: LandlordInsuranceInputs): 'inadequate' | 'adequate' | 'excessive' {
  const dwellingRatio = inputs.dwellingCoverage / inputs.propertyValue;
  const personalPropertyRatio = inputs.personalPropertyCoverage / inputs.dwellingCoverage;
  const liabilityRatio = inputs.liabilityCoverage / 500000; // Minimum recommended for landlords
  
  if (dwellingRatio < 0.8 || personalPropertyRatio < 0.5 || liabilityRatio < 1) {
    return 'inadequate';
  } else if (dwellingRatio > 1.2 || personalPropertyRatio > 0.8 || liabilityRatio > 2) {
    return 'excessive';
  } else {
    return 'adequate';
  }
}

function calculateRecommendedDwellingCoverage(inputs: LandlordInsuranceInputs): number {
  // Base recommendation on property value with construction cost multiplier
  const constructionCostMultiplier = 1.25; // 25% above market value for replacement cost
  return inputs.propertyValue * constructionCostMultiplier;
}

function calculateOverallRiskScore(inputs: LandlordInsuranceInputs): number {
  let score = 50; // Base score
  
  // Location risk factors
  if (inputs.floodZone === 'high_risk' || inputs.floodZone === 'very_high_risk') score += 25;
  if (inputs.earthquakeRisk === 'high' || inputs.earthquakeRisk === 'very_high') score += 20;
  if (inputs.wildfireRisk === 'high' || inputs.wildfireRisk === 'very_high') score += 20;
  if (inputs.crimeRate === 'high' || inputs.crimeRate === 'very_high') score += 15;
  
  // Property risk factors
  if (inputs.propertyAge > 30) score += 15;
  if (inputs.constructionType === 'frame') score += 10;
  if (inputs.roofType === 'wood_shake') score += 15;
  if (inputs.swimmingPool || inputs.trampoline) score += 10;
  if (inputs.aggressiveDog) score += 15;
  if (inputs.homeBusiness) score += 20;
  if (inputs.vacantProperty) score += 25;
  if (inputs.shortTermRental) score += 20;
  
  // Landlord risk factors
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') score += 15;
  if (inputs.claimsHistory > 2) score += 20;
  if (inputs.insuranceScore === 'poor' || inputs.insuranceScore === 'fair') score += 10;
  if (inputs.landlordExperience < 2) score += 15;
  
  // Rental risk factors
  if (inputs.occupancyRate < 80) score += 15;
  if (inputs.averageTenantLength < 12) score += 10;
  if (!inputs.tenantScreening) score += 15;
  if (!inputs.leaseAgreement) score += 20;
  if (!inputs.propertyManagement) score += 10;
  
  return Math.min(Math.max(score, 1), 100);
}

function identifyRiskFactors(inputs: LandlordInsuranceInputs): string[] {
  const factors: string[] = [];
  
  if (inputs.floodZone === 'high_risk' || inputs.floodZone === 'very_high_risk') {
    factors.push('High flood risk area');
  }
  if (inputs.earthquakeRisk === 'high' || inputs.earthquakeRisk === 'very_high') {
    factors.push('High earthquake risk');
  }
  if (inputs.wildfireRisk === 'high' || inputs.wildfireRisk === 'very_high') {
    factors.push('High wildfire risk');
  }
  if (inputs.crimeRate === 'high' || inputs.crimeRate === 'very_high') {
    factors.push('High crime area');
  }
  if (inputs.propertyAge > 30) {
    factors.push('Older property');
  }
  if (inputs.constructionType === 'frame') {
    factors.push('Frame construction');
  }
  if (inputs.roofType === 'wood_shake') {
    factors.push('Wood shake roof');
  }
  if (inputs.swimmingPool) {
    factors.push('Swimming pool');
  }
  if (inputs.trampoline) {
    factors.push('Trampoline');
  }
  if (inputs.aggressiveDog) {
    factors.push('Aggressive dog breed');
  }
  if (inputs.homeBusiness) {
    factors.push('Home business');
  }
  if (inputs.vacantProperty) {
    factors.push('Vacant property');
  }
  if (inputs.shortTermRental) {
    factors.push('Short-term rental');
  }
  if (inputs.claimsHistory > 2) {
    factors.push('Multiple recent claims');
  }
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    factors.push('Lower credit score');
  }
  if (inputs.landlordExperience < 2) {
    factors.push('Limited landlord experience');
  }
  if (inputs.occupancyRate < 80) {
    factors.push('Low occupancy rate');
  }
  if (inputs.averageTenantLength < 12) {
    factors.push('Short tenant stays');
  }
  if (!inputs.tenantScreening) {
    factors.push('No tenant screening');
  }
  if (!inputs.leaseAgreement) {
    factors.push('No lease agreement');
  }
  if (!inputs.propertyManagement) {
    factors.push('No property management');
  }
  
  return factors;
}

function generateRiskMitigationRecommendations(inputs: LandlordInsuranceInputs): string[] {
  const recommendations: string[] = [];
  
  if (inputs.floodZone === 'high_risk' || inputs.floodZone === 'very_high_risk') {
    recommendations.push('Consider flood insurance');
  }
  if (inputs.earthquakeRisk === 'high' || inputs.earthquakeRisk === 'very_high') {
    recommendations.push('Consider earthquake insurance');
  }
  if (inputs.wildfireRisk === 'high' || inputs.wildfireRisk === 'very_high') {
    recommendations.push('Create defensible space around property');
  }
  if (inputs.crimeRate === 'high' || inputs.crimeRate === 'very_high') {
    recommendations.push('Install security system');
  }
  if (inputs.propertyAge > 30) {
    recommendations.push('Update electrical and plumbing systems');
  }
  if (inputs.constructionType === 'frame') {
    recommendations.push('Consider fire-resistant materials');
  }
  if (inputs.roofType === 'wood_shake') {
    recommendations.push('Consider fire-resistant roofing');
  }
  if (inputs.swimmingPool) {
    recommendations.push('Install pool safety features');
  }
  if (inputs.trampoline) {
    recommendations.push('Install safety netting');
  }
  if (inputs.aggressiveDog) {
    recommendations.push('Consider liability umbrella policy');
  }
  if (inputs.homeBusiness) {
    recommendations.push('Consider business insurance');
  }
  if (inputs.vacantProperty) {
    recommendations.push('Implement vacancy protection measures');
  }
  if (inputs.shortTermRental) {
    recommendations.push('Consider short-term rental insurance');
  }
  if (inputs.landlordExperience < 2) {
    recommendations.push('Consider property management services');
  }
  if (inputs.occupancyRate < 80) {
    recommendations.push('Improve marketing and tenant retention');
  }
  if (inputs.averageTenantLength < 12) {
    recommendations.push('Implement tenant retention strategies');
  }
  if (!inputs.tenantScreening) {
    recommendations.push('Implement comprehensive tenant screening');
  }
  if (!inputs.leaseAgreement) {
    recommendations.push('Use written lease agreements');
  }
  if (!inputs.propertyManagement) {
    recommendations.push('Consider professional property management');
  }
  if (!inputs.regularInspections) {
    recommendations.push('Implement regular property inspections');
  }
  if (!inputs.maintenanceProgram) {
    recommendations.push('Develop preventive maintenance program');
  }
  if (!inputs.tenantInsurance) {
    recommendations.push('Require tenant insurance');
  }
  
  return recommendations;
}

function calculateDeductibleImpact(inputs: LandlordInsuranceInputs, annualPremium: number) {
  const currentDeductible = inputs.deductible;
  const higherDeductible = Math.min(currentDeductible * 2, 10000);
  const deductibleSavingsRate = 0.20; // 20% savings for doubling deductible
  const higherDeductiblePremium = annualPremium * (1 - deductibleSavingsRate);
  const savings = annualPremium - higherDeductiblePremium;
  
  return {
    currentDeductible,
    currentPremium: annualPremium,
    higherDeductible,
    higherDeductiblePremium,
    savings
  };
}

function calculateRentalIncomeAnalysis(inputs: LandlordInsuranceInputs, annualPremium: number) {
  const monthlyRent = inputs.monthlyRent;
  const annualRent = inputs.annualRent;
  const insuranceCostPerMonth = annualPremium / 12;
  const insuranceCostPercentage = (annualPremium / annualRent) * 100;
  const netRentalIncome = annualRent - annualPremium;
  const breakEvenOccupancy = (annualPremium / annualRent) * 100;
  
  return {
    monthlyRent,
    annualRent,
    insuranceCostPerMonth,
    insuranceCostPercentage,
    netRentalIncome,
    breakEvenOccupancy
  };
}

function generateCoverageRecommendations(inputs: LandlordInsuranceInputs): string[] {
  const recommendations: string[] = [];
  
  if (inputs.dwellingCoverage < inputs.propertyValue * 0.8) {
    recommendations.push('Increase dwelling coverage to at least 80% of property value');
  }
  if (inputs.personalPropertyCoverage < inputs.dwellingCoverage * 0.5) {
    recommendations.push('Increase personal property coverage to at least 50% of dwelling coverage');
  }
  if (inputs.liabilityCoverage < 500000) {
    recommendations.push('Consider increasing liability coverage to at least $500,000');
  }
  if (inputs.lossOfRentsCoverage < inputs.annualRent) {
    recommendations.push('Increase loss of rents coverage to at least 100% of annual rent');
  }
  if (!inputs.replacementCost) {
    recommendations.push('Consider replacement cost coverage');
  }
  if (!inputs.extendedReplacementCost) {
    recommendations.push('Consider extended replacement cost coverage');
  }
  if (!inputs.waterBackupCoverage) {
    recommendations.push('Consider water backup coverage');
  }
  if (!inputs.rentalIncomeProtection) {
    recommendations.push('Consider rental income protection');
  }
  
  return recommendations;
}

function generateDiscountRecommendations(inputs: LandlordInsuranceInputs): string[] {
  const recommendations: string[] = [];
  
  if (!inputs.multiPolicyDiscount) {
    recommendations.push('Bundle with other insurance policies for multi-policy discount');
  }
  if (!inputs.securitySystemDiscount) {
    recommendations.push('Install security system for discount');
  }
  if (!inputs.smokeDetectorDiscount) {
    recommendations.push('Install smoke detectors for discount');
  }
  if (!inputs.deadboltDiscount) {
    recommendations.push('Install deadbolt locks for discount');
  }
  if (!inputs.paperlessDiscount) {
    recommendations.push('Switch to paperless billing for discount');
  }
  if (!inputs.autopayDiscount) {
    recommendations.push('Set up automatic payments for discount');
  }
  
  return recommendations;
}

function generateRiskReductionRecommendations(inputs: LandlordInsuranceInputs): string[] {
  const recommendations: string[] = [];
  
  if (inputs.distanceToFireStation > 5) {
    recommendations.push('Consider proximity to fire station when purchasing');
  }
  if (inputs.distanceToHydrant > 1000) {
    recommendations.push('Consider proximity to fire hydrant');
  }
  if (inputs.propertyAge > 20) {
    recommendations.push('Regular maintenance and updates');
  }
  if (inputs.claimsHistory > 0) {
    recommendations.push('Maintain claims-free record');
  }
  if (inputs.landlordExperience < 3) {
    recommendations.push('Consider landlord education and training');
  }
  if (inputs.occupancyRate < 90) {
    recommendations.push('Improve tenant retention strategies');
  }
  
  return recommendations;
}

function generatePolicyOptimizationRecommendations(inputs: LandlordInsuranceInputs): string[] {
  const recommendations: string[] = [];
  
  recommendations.push('Review policy annually');
  recommendations.push('Compare rates with other insurers');
  recommendations.push('Consider higher deductible for lower premium');
  recommendations.push('Evaluate coverage needs as property value changes');
  recommendations.push('Keep detailed records of rental income and expenses');
  recommendations.push('Consider umbrella policy for additional liability protection');
  
  return recommendations;
}

function calculateMarketComparison(annualPremium: number, propertyValue: number): {
  averagePremium: number;
  premiumPercentile: number;
  savingsOpportunity: number;
} {
  // Market averages (simplified)
  const averagePremium = (propertyValue / 1000) * 4.0; // $4.00 per $1000 of property value
  const premiumPercentile = (annualPremium / averagePremium) * 50; // Simplified calculation
  const savingsOpportunity = Math.max(0, annualPremium - averagePremium * 0.8);
  
  return {
    averagePremium,
    premiumPercentile: Math.min(Math.max(premiumPercentile, 10), 90),
    savingsOpportunity
  };
}
