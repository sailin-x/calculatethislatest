import { HomeownersInsuranceInputs, HomeownersInsuranceOutputs } from './types';

export function calculateHomeownersInsurance(inputs: HomeownersInsuranceInputs): HomeownersInsuranceOutputs {
  const baseRate = 0.0035;
  const dwellingPremium = (inputs.dwellingCoverage / 1000) * baseRate;
  const personalPropertyPremium = (inputs.personalPropertyCoverage / 1000) * 0.002;
  const liabilityPremium = (inputs.liabilityCoverage / 1000) * 0.002;
  const medicalPaymentsPremium = (inputs.medicalPaymentsCoverage / 1000) * 0.001;
  const additionalLivingExpensesPremium = dwellingPremium * 0.25;
  
  const totalDiscounts = calculateDiscounts(inputs, dwellingPremium);
  const totalRiskAdjustments = calculateRiskAdjustments(inputs);
  
  const basePremium = dwellingPremium + personalPropertyPremium + liabilityPremium + 
                     medicalPaymentsPremium + additionalLivingExpensesPremium;
  const adjustedPremium = basePremium - totalDiscounts + totalRiskAdjustments;
  const annualPremium = Math.max(adjustedPremium, 300);
  
  return {
    basePremium,
    dwellingPremium,
    personalPropertyPremium,
    liabilityPremium,
    medicalPaymentsPremium,
    additionalLivingExpensesPremium,
    multiPolicyDiscount: inputs.multiPolicyDiscount ? dwellingPremium * 0.15 : 0,
    securitySystemDiscount: inputs.securitySystemDiscount ? dwellingPremium * 0.05 : 0,
    smokeDetectorDiscount: inputs.smokeDetectorDiscount ? dwellingPremium * 0.02 : 0,
    deadboltDiscount: inputs.deadboltDiscount ? dwellingPremium * 0.02 : 0,
    newHomeDiscount: inputs.newHomeDiscount ? dwellingPremium * 0.10 : 0,
    claimsFreeDiscount: inputs.claimsFreeDiscount ? dwellingPremium * 0.10 : 0,
    loyaltyDiscount: inputs.loyaltyDiscount ? dwellingPremium * 0.05 : 0,
    paperlessDiscount: inputs.paperlessDiscount ? dwellingPremium * 0.02 : 0,
    autopayDiscount: inputs.autopayDiscount ? dwellingPremium * 0.02 : 0,
    totalDiscounts,
    locationRiskAdjustment: 0,
    propertyRiskAdjustment: 0,
    personalRiskAdjustment: 0,
    totalRiskAdjustments,
    annualPremium,
    monthlyPremium: annualPremium / 12,
    quarterlyPremium: annualPremium / 4,
    semiannualPremium: annualPremium / 2,
    coverageAdequacy: 'adequate',
    recommendedDwellingCoverage: inputs.propertyValue * 1.2,
    recommendedPersonalPropertyCoverage: inputs.propertyValue * 0.72,
    recommendedLiabilityCoverage: Math.max(inputs.liabilityCoverage, 300000),
    overallRiskScore: 50,
    riskFactors: [],
    riskMitigationRecommendations: [],
    costPerThousand: (annualPremium / inputs.dwellingCoverage) * 1000,
    premiumToValueRatio: annualPremium / inputs.propertyValue,
    deductibleImpact: {
      currentDeductible: inputs.deductible,
      currentPremium: annualPremium,
      higherDeductible: Math.min(inputs.deductible * 2, 5000),
      higherDeductiblePremium: annualPremium * 0.85,
      savings: annualPremium * 0.15
    },
    coverageRecommendations: [],
    discountRecommendations: [],
    riskReductionRecommendations: [],
    policyOptimizationRecommendations: [],
    marketComparison: {
      averagePremium: (inputs.propertyValue / 1000) * 3.5,
      premiumPercentile: 50,
      savingsOpportunity: 0
    },
    summary: {
      totalAnnualCost: annualPremium,
      totalMonthlyCost: annualPremium / 12,
      keyBenefits: ['Property protection', 'Liability coverage'],
      keyRisks: [],
      nextSteps: ['Review coverage', 'Compare rates']
    }
  };
}

function calculateDiscounts(inputs: HomeownersInsuranceInputs, dwellingPremium: number): number {
  let total = 0;
  if (inputs.multiPolicyDiscount) total += dwellingPremium * 0.15;
  if (inputs.securitySystemDiscount) total += dwellingPremium * 0.05;
  if (inputs.smokeDetectorDiscount) total += dwellingPremium * 0.02;
  if (inputs.deadboltDiscount) total += dwellingPremium * 0.02;
  if (inputs.newHomeDiscount) total += dwellingPremium * 0.10;
  if (inputs.claimsFreeDiscount) total += dwellingPremium * 0.10;
  if (inputs.loyaltyDiscount) total += dwellingPremium * 0.05;
  if (inputs.paperlessDiscount) total += dwellingPremium * 0.02;
  if (inputs.autopayDiscount) total += dwellingPremium * 0.02;
  return total;
}

function calculateRiskAdjustments(inputs: HomeownersInsuranceInputs): number {
  let adjustment = 0;
  
  if (inputs.floodZone === 'high_risk') adjustment += 200;
  if (inputs.earthquakeRisk === 'high') adjustment += 300;
  if (inputs.wildfireRisk === 'high') adjustment += 200;
  if (inputs.crimeRate === 'high') adjustment += 75;
  if (inputs.propertyAge > 30) adjustment += 100;
  if (inputs.constructionType === 'frame') adjustment += 100;
  if (inputs.swimmingPool) adjustment += 100;
  if (inputs.aggressiveDog) adjustment += 150;
  if (inputs.claimsHistory > 2) adjustment += 300;
  if (inputs.creditScore === 'poor') adjustment += 250;
  
  return adjustment;
}
