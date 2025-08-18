import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// NFIP base rates (simplified for calculator)
const NFIP_BASE_RATES = {
  building: {
    'X': 0.25, 'A': 1.25, 'AE': 1.25, 'AH': 1.25, 'AO': 1.25, 'AR': 1.25, 'A99': 1.25,
    'V': 1.75, 'VE': 1.75, 'B': 0.65, 'C': 0.65, 'D': 1.25
  },
  contents: {
    'X': 0.25, 'A': 1.25, 'AE': 1.25, 'AH': 1.25, 'AO': 1.25, 'AR': 1.25, 'A99': 1.25,
    'V': 1.75, 'VE': 1.75, 'B': 0.65, 'C': 0.65, 'D': 1.25
  }
};

// Private insurance base rates
const PRIVATE_BASE_RATES = {
  building: {
    'X': 0.15, 'A': 0.85, 'AE': 0.85, 'AH': 0.85, 'AO': 0.85, 'AR': 0.85, 'A99': 0.85,
    'V': 1.25, 'VE': 1.25, 'B': 0.45, 'C': 0.45, 'D': 0.85
  },
  contents: {
    'X': 0.15, 'A': 0.85, 'AE': 0.85, 'AH': 0.85, 'AO': 0.85, 'AR': 0.85, 'A99': 0.85,
    'V': 1.25, 'VE': 1.25, 'B': 0.45, 'C': 0.45, 'D': 0.85
  }
};

// Flood zone risk factors
const ZONE_RISK_FACTORS = {
  'X': 0.1, 'A': 0.8, 'AE': 0.8, 'AH': 0.8, 'AO': 0.8, 'AR': 0.8, 'A99': 0.8,
  'V': 1.0, 'VE': 1.0, 'B': 0.3, 'C': 0.3, 'D': 0.8
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'single-family': 1.0,
  'multi-family': 1.2,
  'condo': 1.1,
  'commercial': 1.5,
  'rental': 1.3
};

// Occupancy type factors
const OCCUPANCY_FACTORS = {
  'primary-residence': 1.0,
  'secondary-home': 1.25,
  'rental': 1.15,
  'business': 1.4
};

// Community Rating System discounts
const CRS_DISCOUNTS = {
  'class-1': 0.45, 'class-2': 0.40, 'class-3': 0.35, 'class-4': 0.30, 'class-5': 0.25,
  'class-6': 0.20, 'class-7': 0.15, 'class-8': 0.10, 'class-9': 0.05, 'class-10': 0.00
};

// Mitigation measure discounts
const MITIGATION_DISCOUNTS = {
  'elevated-foundation': 0.15,
  'flood-walls': 0.20,
  'sump-pump': 0.10,
  'backflow-valve': 0.08,
  'waterproofing': 0.12,
  'none': 0.00
};

// NFIP coverage limits
const NFIP_LIMITS = {
  building: 250000,
  contents: 100000
};

// Private insurance coverage limits
const PRIVATE_LIMITS = {
  building: 1000000,
  contents: 500000
};

function calculateElevationFactor(buildingElevation: number, baseFloodElevation: number): number {
  if (!buildingElevation || !baseFloodElevation) return 1.0;
  
  const elevationDifference = buildingElevation - baseFloodElevation;
  const bfe = baseFloodElevation;
  
  if (elevationDifference >= 2) return 0.5; // 50% discount for 2+ feet above BFE
  if (elevationDifference >= 1) return 0.7; // 30% discount for 1+ feet above BFE
  if (elevationDifference >= 0) return 0.9; // 10% discount for at or above BFE
  if (elevationDifference >= -1) return 1.2; // 20% increase for 1 foot below BFE
  if (elevationDifference >= -2) return 1.5; // 50% increase for 2 feet below BFE
  return 2.0; // 100% increase for more than 2 feet below BFE
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score
  
  // Flood zone risk
  const zoneRisk = ZONE_RISK_FACTORS[inputs.floodZone as keyof typeof ZONE_RISK_FACTORS] || 0.5;
  riskScore += zoneRisk * 30;
  
  // Elevation risk
  if (inputs.buildingElevation && inputs.baseFloodElevation) {
    const elevationFactor = calculateElevationFactor(Number(inputs.buildingElevation), Number(inputs.baseFloodElevation));
    if (elevationFactor > 1.5) riskScore += 20;
    else if (elevationFactor < 0.7) riskScore -= 15;
  }
  
  // Location risk
  if (inputs.coastalArea === 'yes') riskScore += 15;
  if (inputs.stormSurgeRisk === 'high') riskScore += 10;
  if (inputs.stormSurgeRisk === 'very-high') riskScore += 20;
  
  // Property risk
  if (inputs.floodHistory === 'severe') riskScore += 20;
  else if (inputs.floodHistory === 'moderate') riskScore += 10;
  else if (inputs.floodHistory === 'minor') riskScore += 5;
  
  // Distance to water
  if (inputs.distanceToWater) {
    const distance = Number(inputs.distanceToWater);
    if (distance < 100) riskScore += 15;
    else if (distance < 500) riskScore += 10;
    else if (distance < 1000) riskScore += 5;
  }
  
  return Math.max(1, Math.min(100, riskScore));
}

function calculateNFIPPremium(inputs: CalculatorInputs): { buildingPremium: number; contentsPremium: number } {
  const buildingValue = Number(inputs.buildingValue);
  const contentsValue = Number(inputs.contentsValue);
  const floodZone = inputs.floodZone as keyof typeof NFIP_BASE_RATES.building;
  const propertyType = inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS;
  const occupancyType = inputs.occupancyType as keyof typeof OCCUPANCY_FACTORS;
  
  // Base rates
  const buildingBaseRate = NFIP_BASE_RATES.building[floodZone] || 1.25;
  const contentsBaseRate = NFIP_BASE_RATES.contents[floodZone] || 1.25;
  
  // Apply factors
  const propertyFactor = PROPERTY_TYPE_FACTORS[propertyType] || 1.0;
  const occupancyFactor = OCCUPANCY_FACTORS[occupancyType] || 1.0;
  
  // Elevation factor
  let elevationFactor = 1.0;
  if (inputs.buildingElevation && inputs.baseFloodElevation) {
    elevationFactor = calculateElevationFactor(Number(inputs.buildingElevation), Number(inputs.baseFloodElevation));
  }
  
  // Calculate premiums
  const buildingPremium = buildingValue * (buildingBaseRate / 100) * propertyFactor * occupancyFactor * elevationFactor;
  const contentsPremium = contentsValue * (contentsBaseRate / 100) * occupancyFactor;
  
  return {
    buildingPremium: Math.max(buildingPremium, 600), // Minimum premium
    contentsPremium: Math.max(contentsPremium, 150)  // Minimum premium
  };
}

function calculatePrivatePremium(inputs: CalculatorInputs): { buildingPremium: number; contentsPremium: number } {
  const buildingValue = Number(inputs.buildingValue);
  const contentsValue = Number(inputs.contentsValue);
  const floodZone = inputs.floodZone as keyof typeof PRIVATE_BASE_RATES.building;
  const riskScore = calculateRiskScore(inputs);
  
  // Base rates
  const buildingBaseRate = PRIVATE_BASE_RATES.building[floodZone] || 0.85;
  const contentsBaseRate = PRIVATE_BASE_RATES.contents[floodZone] || 0.85;
  
  // Risk factor based on risk score
  const riskFactor = riskScore / 50; // Normalize to 0.5-2.0 range
  
  // Calculate premiums
  const buildingPremium = buildingValue * (buildingBaseRate / 100) * riskFactor;
  const contentsPremium = contentsValue * (contentsBaseRate / 100) * riskFactor;
  
  return {
    buildingPremium: Math.max(buildingPremium, 300), // Minimum premium
    contentsPremium: Math.max(contentsPremium, 100)  // Minimum premium
  };
}

function calculateDiscounts(inputs: CalculatorInputs, basePremium: number): number {
  let totalDiscount = 0;
  
  // Community Rating System discount
  if (inputs.communityRating) {
    const crsDiscount = CRS_DISCOUNTS[inputs.communityRating as keyof typeof CRS_DISCOUNTS] || 0;
    totalDiscount += basePremium * crsDiscount;
  }
  
  // Mitigation measures discount
  if (inputs.mitigationMeasures) {
    const measures = Array.isArray(inputs.mitigationMeasures) ? inputs.mitigationMeasures : [inputs.mitigationMeasures];
    measures.forEach(measure => {
      const discount = MITIGATION_DISCOUNTS[measure as keyof typeof MITIGATION_DISCOUNTS] || 0;
      totalDiscount += basePremium * discount;
    });
  }
  
  // Other discounts
  if (inputs.discounts) {
    const discounts = Array.isArray(inputs.discounts) ? inputs.discounts : [inputs.discounts];
    discounts.forEach(discount => {
      switch (discount) {
        case 'elevation-discount':
          totalDiscount += basePremium * 0.15;
          break;
        case 'loyalty-discount':
          totalDiscount += basePremium * 0.05;
          break;
        case 'multi-policy':
          totalDiscount += basePremium * 0.10;
          break;
      }
    });
  }
  
  return totalDiscount;
}

function calculateSurcharges(inputs: CalculatorInputs, basePremium: number): number {
  let totalSurcharge = 0;
  
  if (inputs.surcharges) {
    const surcharges = Array.isArray(inputs.surcharges) ? inputs.surcharges : [inputs.surcharges];
    surcharges.forEach(surcharge => {
      switch (surcharge) {
        case 'late-fee':
          totalSurcharge += 25;
          break;
        case 'administrative-fee':
          totalSurcharge += basePremium * 0.05;
          break;
        case 'risk-surcharge':
          totalSurcharge += basePremium * 0.10;
          break;
        case 'coastal-surcharge':
          totalSurcharge += basePremium * 0.15;
          break;
      }
    });
  }
  
  return totalSurcharge;
}

function generateFloodZoneRisk(inputs: CalculatorInputs): string {
  const zone = inputs.floodZone;
  let risk = '';
  
  switch (zone) {
    case 'X':
      risk = 'Low Risk - Minimal flood hazard area';
      break;
    case 'A':
    case 'AE':
    case 'AH':
    case 'AO':
    case 'AR':
    case 'A99':
      risk = 'High Risk - Special flood hazard area';
      break;
    case 'V':
    case 'VE':
      risk = 'High Risk - Coastal flood hazard area';
      break;
    case 'B':
    case 'C':
      risk = 'Moderate Risk - Shallow flooding area';
      break;
    case 'D':
      risk = 'Undetermined Risk - Unstudied area';
      break;
    default:
      risk = 'Unknown Risk - Zone not specified';
  }
  
  return `Flood Zone ${zone}: ${risk}`;
}

function generateElevationRisk(inputs: CalculatorInputs): string {
  if (!inputs.buildingElevation || !inputs.baseFloodElevation) {
    return 'Elevation Risk: Unknown - Elevation certificate data not available';
  }
  
  const buildingElevation = Number(inputs.buildingElevation);
  const baseFloodElevation = Number(inputs.baseFloodElevation);
  const difference = buildingElevation - baseFloodElevation;
  
  if (difference >= 2) {
    return `Elevation Risk: Very Low - Building is ${difference.toFixed(1)} feet above BFE (significant discount available)`;
  } else if (difference >= 1) {
    return `Elevation Risk: Low - Building is ${difference.toFixed(1)} feet above BFE (discount available)`;
  } else if (difference >= 0) {
    return `Elevation Risk: Moderate - Building is at or slightly above BFE`;
  } else if (difference >= -1) {
    return `Elevation Risk: High - Building is ${Math.abs(difference).toFixed(1)} feet below BFE (premium increase)`;
  } else {
    return `Elevation Risk: Very High - Building is ${Math.abs(difference).toFixed(1)} feet below BFE (significant premium increase)`;
  }
}

function generateMitigationBenefits(inputs: CalculatorInputs): string {
  if (!inputs.mitigationMeasures || inputs.mitigationMeasures === 'none') {
    return 'Mitigation Benefits: No mitigation measures identified - consider implementing flood protection measures to reduce premiums';
  }
  
  const measures = Array.isArray(inputs.mitigationMeasures) ? inputs.mitigationMeasures : [inputs.mitigationMeasures];
  let benefits = 'Mitigation Benefits:\n';
  let totalDiscount = 0;
  
  measures.forEach(measure => {
    const discount = MITIGATION_DISCOUNTS[measure as keyof typeof MITIGATION_DISCOUNTS] || 0;
    totalDiscount += discount;
    
    switch (measure) {
      case 'elevated-foundation':
        benefits += '• Elevated Foundation: 15% premium discount\n';
        break;
      case 'flood-walls':
        benefits += '• Flood Walls: 20% premium discount\n';
        break;
      case 'sump-pump':
        benefits += '• Sump Pump: 10% premium discount\n';
        break;
      case 'backflow-valve':
        benefits += '• Backflow Valve: 8% premium discount\n';
        break;
      case 'waterproofing':
        benefits += '• Waterproofing: 12% premium discount\n';
        break;
    }
  });
  
  benefits += `\nTotal Mitigation Discount: ${(totalDiscount * 100).toFixed(1)}%`;
  return benefits;
}

function generatePolicyComparison(inputs: CalculatorInputs): string {
  const nfipPremium = calculateNFIPPremium(inputs);
  const privatePremium = calculatePrivatePremium(inputs);
  
  let comparison = 'Policy Comparison:\n\n';
  
  // NFIP Policy
  comparison += 'NFIP Policy:\n';
  comparison += `• Building Premium: $${nfipPremium.buildingPremium.toLocaleString()}\n`;
  comparison += `• Contents Premium: $${nfipPremium.contentsPremium.toLocaleString()}\n`;
  comparison += `• Total Annual Premium: $${(nfipPremium.buildingPremium + nfipPremium.contentsPremium).toLocaleString()}\n`;
  comparison += `• Building Coverage Limit: $${NFIP_LIMITS.building.toLocaleString()}\n`;
  comparison += `• Contents Coverage Limit: $${NFIP_LIMITS.contents.toLocaleString()}\n\n`;
  
  // Private Policy
  comparison += 'Private Insurance:\n';
  comparison += `• Building Premium: $${privatePremium.buildingPremium.toLocaleString()}\n`;
  comparison += `• Contents Premium: $${privatePremium.contentsPremium.toLocaleString()}\n`;
  comparison += `• Total Annual Premium: $${(privatePremium.buildingPremium + privatePremium.contentsPremium).toLocaleString()}\n`;
  comparison += `• Building Coverage Limit: $${PRIVATE_LIMITS.building.toLocaleString()}\n`;
  comparison += `• Contents Coverage Limit: $${PRIVATE_LIMITS.contents.toLocaleString()}\n\n`;
  
  // Recommendation
  const nfipTotal = nfipPremium.buildingPremium + nfipPremium.contentsPremium;
  const privateTotal = privatePremium.buildingPremium + privatePremium.contentsPremium;
  
  if (privateTotal < nfipTotal * 0.8) {
    comparison += 'Recommendation: Private insurance may offer better value with higher coverage limits';
  } else if (nfipTotal < privateTotal * 0.8) {
    comparison += 'Recommendation: NFIP policy offers better value for current coverage needs';
  } else {
    comparison += 'Recommendation: Both options are competitive - consider coverage limits and policy terms';
  }
  
  return comparison;
}

function generateCostBreakdown(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let breakdown = 'Cost Breakdown:\n\n';
  
  breakdown += `Annual Premium: $${outputs.annualPremium.toLocaleString()}\n`;
  
  // Fees
  const agentFee = Number(inputs.agentFee || 0);
  const inspectionFee = Number(inputs.inspectionFee || 0);
  const applicationFee = Number(inputs.applicationFee || 0);
  
  if (agentFee > 0) breakdown += `Agent Fee: $${agentFee.toLocaleString()}\n`;
  if (inspectionFee > 0) breakdown += `Inspection Fee: $${inspectionFee.toLocaleString()}\n`;
  if (applicationFee > 0) breakdown += `Application Fee: $${applicationFee.toLocaleString()}\n`;
  
  // Discounts
  if (outputs.annualSavings > 0) {
    breakdown += `Discounts: -$${outputs.annualSavings.toLocaleString()}\n`;
  }
  
  breakdown += `\nTotal Annual Cost: $${outputs.totalCost.toLocaleString()}\n`;
  breakdown += `Monthly Cost: $${outputs.costPerMonth.toLocaleString()}\n`;
  
  return breakdown;
}

function generateSavingsOpportunities(inputs: CalculatorInputs): string {
  let opportunities = 'Savings Opportunities:\n\n';
  
  if (inputs.elevationCertificate === 'no') {
    opportunities += '• Get an elevation certificate - may qualify for significant discounts\n';
  }
  
  if (!inputs.mitigationMeasures || inputs.mitigationMeasures === 'none') {
    opportunities += '• Install flood mitigation measures (elevated foundation, flood walls, sump pump)\n';
  }
  
  if (inputs.communityRating === 'class-10' || !inputs.communityRating) {
    opportunities += '• Check if your community participates in NFIP Community Rating System\n';
  }
  
  if (inputs.policyType === 'nfip-standard' && inputs.floodZone === 'X') {
    opportunities += '• Consider NFIP Preferred Risk Policy for lower premiums\n';
  }
  
  opportunities += '• Compare quotes from multiple private insurers\n';
  opportunities += '• Consider higher deductibles to reduce premiums\n';
  opportunities += '• Bundle with other insurance policies for multi-policy discounts\n';
  
  return opportunities;
}

function generateRiskMitigation(inputs: CalculatorInputs): string {
  let recommendations = 'Risk Mitigation Recommendations:\n\n';
  
  const riskScore = calculateRiskScore(inputs);
  
  if (riskScore > 80) {
    recommendations += '🔴 HIGH RISK - Immediate action recommended:\n';
    recommendations += '• Consider relocating to a lower-risk area\n';
    recommendations += '• Implement comprehensive flood protection measures\n';
    recommendations += '• Maintain maximum insurance coverage\n';
  } else if (riskScore > 60) {
    recommendations += '🟡 MODERATE-HIGH RISK - Action recommended:\n';
    recommendations += '• Install flood mitigation systems\n';
    recommendations += '• Elevate utilities and appliances\n';
    recommendations += '• Create emergency flood response plan\n';
  } else if (riskScore > 40) {
    recommendations += '🟡 MODERATE RISK - Consider improvements:\n';
    recommendations += '• Install sump pump and backflow valve\n';
    recommendations += '• Waterproof basement/crawlspace\n';
    recommendations += '• Maintain adequate insurance coverage\n';
  } else {
    recommendations += '🟢 LOW RISK - Standard precautions:\n';
    recommendations += '• Maintain basic flood insurance\n';
    recommendations += '• Keep emergency supplies on hand\n';
    recommendations += '• Monitor weather alerts during storms\n';
  }
  
  return recommendations;
}

function generateComplianceStatus(inputs: CalculatorInputs): string {
  let compliance = 'Compliance Status:\n\n';
  
  // Check if flood insurance is required
  const highRiskZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE'];
  const moderateRiskZones = ['B', 'C'];
  
  if (highRiskZones.includes(inputs.floodZone)) {
    compliance += '✅ Flood insurance REQUIRED for federally backed mortgages\n';
    compliance += '• Minimum coverage: Outstanding mortgage balance or 80% of building value\n';
    compliance += '• Recommended: Full replacement cost coverage\n';
  } else if (moderateRiskZones.includes(inputs.floodZone)) {
    compliance += '⚠️ Flood insurance RECOMMENDED but not required\n';
    compliance += '• Consider coverage for financial protection\n';
    compliance += '• Check lender requirements\n';
  } else {
    compliance += 'ℹ️ Flood insurance OPTIONAL\n';
    compliance += '• Low-risk area but flooding can still occur\n';
    compliance += '• Consider basic coverage for peace of mind\n';
  }
  
  // Check building code compliance
  if (inputs.buildingCode === 'non-compliant') {
    compliance += '\n⚠️ Building Code: Non-compliant with flood-resistant standards\n';
    compliance += '• May face higher premiums\n';
    compliance += '• Consider retrofitting to meet standards\n';
  } else if (inputs.buildingCode === 'compliant') {
    compliance += '\n✅ Building Code: Compliant with flood-resistant standards\n';
    compliance += '• May qualify for premium discounts\n';
  }
  
  return compliance;
}

export function calculateFloodInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract and convert inputs
  const propertyValue = Number(inputs.propertyValue);
  const buildingValue = Number(inputs.buildingValue);
  const contentsValue = Number(inputs.contentsValue);
  const deductible = Number(inputs.deductible);
  const policyType = inputs.policyType;
  
  // Calculate premiums based on policy type
  let buildingPremium = 0;
  let contentsPremium = 0;
  
  if (policyType === 'nfip-standard' || policyType === 'nfip-prefered-risk') {
    const nfipPremiums = calculateNFIPPremium(inputs);
    buildingPremium = nfipPremiums.buildingPremium;
    contentsPremium = nfipPremiums.contentsPremium;
  } else if (policyType === 'private-insurance') {
    const privatePremiums = calculatePrivatePremium(inputs);
    buildingPremium = privatePremiums.buildingPremium;
    contentsPremium = privatePremiums.contentsPremium;
  }
  
  // Calculate coverage amounts
  let buildingCoverage = 0;
  let contentsCoverage = 0;
  
  if (inputs.coverageType === 'building-only' || inputs.coverageType === 'building-and-contents') {
    buildingCoverage = Math.min(buildingValue, policyType.includes('nfip') ? NFIP_LIMITS.building : PRIVATE_LIMITS.building);
  }
  
  if (inputs.coverageType === 'contents-only' || inputs.coverageType === 'building-and-contents') {
    contentsCoverage = Math.min(contentsValue, policyType.includes('nfip') ? NFIP_LIMITS.contents : PRIVATE_LIMITS.contents);
  }
  
  const totalCoverage = buildingCoverage + contentsCoverage;
  const basePremium = buildingPremium + contentsPremium;
  
  // Calculate discounts and surcharges
  const discounts = calculateDiscounts(inputs, basePremium);
  const surcharges = calculateSurcharges(inputs, basePremium);
  
  // Calculate fees
  const agentFee = Number(inputs.agentFee || 0);
  const inspectionFee = Number(inputs.inspectionFee || 0);
  const applicationFee = Number(inputs.applicationFee || 0);
  const totalFees = agentFee + inspectionFee + applicationFee;
  
  // Calculate final premiums and costs
  const annualPremium = basePremium - discounts + surcharges;
  const monthlyPremium = annualPremium / 12;
  const totalCost = annualPremium + totalFees;
  const costPerMonth = totalCost / 12;
  
  // Calculate additional metrics
  const riskScore = calculateRiskScore(inputs);
  const premiumRate = totalCoverage > 0 ? (annualPremium / totalCoverage) * 100 : 0;
  const coverageRatio = propertyValue > 0 ? (totalCoverage / propertyValue) * 100 : 0;
  const outOfPocketMax = deductible + totalFees;
  const replacementCostRatio = Number(inputs.replacementCost) > 0 ? (buildingCoverage / Number(inputs.replacementCost)) * 100 : 0;
  const annualSavings = discounts;
  
  // Calculate affordability score
  const budget = Number(inputs.budget || 0);
  const affordabilityScore = budget > 0 ? Math.max(0, Math.min(100, ((budget - costPerMonth) / budget) * 100)) : 50;
  
  // Calculate recommended coverage
  const recommendedCoverage = Math.max(buildingValue * 0.8, buildingValue - 50000);
  const minimumRequired = Math.max(buildingValue * 0.8, 50000);
  const excessCoverage = Math.max(0, propertyValue - totalCoverage);
  
  // Generate analysis reports
  const floodZoneRisk = generateFloodZoneRisk(inputs);
  const elevationRisk = generateElevationRisk(inputs);
  const mitigationBenefits = generateMitigationBenefits(inputs);
  const policyComparison = generatePolicyComparison(inputs);
  const costBreakdown = generateCostBreakdown(inputs, { annualPremium, annualSavings, totalCost, costPerMonth } as CalculatorOutputs);
  const savingsOpportunities = generateSavingsOpportunities(inputs);
  const riskMitigation = generateRiskMitigation(inputs);
  const complianceStatus = generateComplianceStatus(inputs);
  
  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium * 100) / 100,
    buildingCoverage: Math.round(buildingCoverage),
    contentsCoverage: Math.round(contentsCoverage),
    totalCoverage: Math.round(totalCoverage),
    riskScore: Math.round(riskScore),
    premiumRate: Math.round(premiumRate * 100) / 100,
    coverageRatio: Math.round(coverageRatio * 100) / 100,
    deductibleAmount: Math.round(deductible),
    outOfPocketMax: Math.round(outOfPocketMax),
    replacementCostRatio: Math.round(replacementCostRatio * 100) / 100,
    annualSavings: Math.round(annualSavings),
    totalCost: Math.round(totalCost),
    costPerMonth: Math.round(costPerMonth * 100) / 100,
    affordabilityScore: Math.round(affordabilityScore),
    recommendedCoverage: Math.round(recommendedCoverage),
    minimumRequired: Math.round(minimumRequired),
    excessCoverage: Math.round(excessCoverage),
    floodZoneRisk,
    elevationRisk,
    mitigationBenefits,
    policyComparison,
    costBreakdown,
    savingsOpportunities,
    riskMitigation,
    complianceStatus,
    floodInsuranceAnalysis: 'Comprehensive flood insurance analysis completed'
  };
}

export function generateFloodInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# Flood Insurance Analysis\n\n`;
  
  analysis += `## Property Information\n`;
  analysis += `**Location:** ${inputs.location}\n`;
  analysis += `**Property Value:** $${Number(inputs.propertyValue).toLocaleString()}\n`;
  analysis += `**Building Value:** $${Number(inputs.buildingValue).toLocaleString()}\n`;
  analysis += `**Contents Value:** $${Number(inputs.contentsValue).toLocaleString()}\n`;
  analysis += `**Flood Zone:** ${inputs.floodZone}\n`;
  analysis += `**Policy Type:** ${inputs.policyType}\n\n`;
  
  analysis += `## Premium Summary\n`;
  analysis += `**Annual Premium:** $${outputs.annualPremium.toLocaleString()}\n`;
  analysis += `**Monthly Premium:** $${outputs.monthlyPremium.toLocaleString()}\n`;
  analysis += `**Total Annual Cost:** $${outputs.totalCost.toLocaleString()}\n`;
  analysis += `**Monthly Cost:** $${outputs.costPerMonth.toLocaleString()}\n\n`;
  
  analysis += `## Coverage Details\n`;
  analysis += `**Building Coverage:** $${outputs.buildingCoverage.toLocaleString()}\n`;
  analysis += `**Contents Coverage:** $${outputs.contentsCoverage.toLocaleString()}\n`;
  analysis += `**Total Coverage:** $${outputs.totalCoverage.toLocaleString()}\n`;
  analysis += `**Coverage Ratio:** ${outputs.coverageRatio}%\n`;
  analysis += `**Deductible:** $${outputs.deductibleAmount.toLocaleString()}\n`;
  analysis += `**Out of Pocket Maximum:** $${outputs.outOfPocketMax.toLocaleString()}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score:** ${outputs.riskScore}/100\n`;
  analysis += `**Premium Rate:** ${outputs.premiumRate}%\n`;
  analysis += `**Affordability Score:** ${outputs.affordabilityScore}/100\n\n`;
  
  analysis += `## Analysis Reports\n\n`;
  analysis += `### ${outputs.floodZoneRisk}\n`;
  analysis += `### ${outputs.elevationRisk}\n`;
  analysis += `### ${outputs.mitigationBenefits}\n`;
  analysis += `### ${outputs.policyComparison}\n`;
  analysis += `### ${outputs.costBreakdown}\n`;
  analysis += `### ${outputs.savingsOpportunities}\n`;
  analysis += `### ${outputs.riskMitigation}\n`;
  analysis += `### ${outputs.complianceStatus}\n`;
  
  return analysis;
}
