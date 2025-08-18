import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Amenity value estimates (monthly)
const AMENITY_VALUES: { [key: string]: number } = {
  'pool': 50,
  'gym': 75,
  'spa': 100,
  'tennis-court': 30,
  'basketball-court': 25,
  'playground': 20,
  'clubhouse': 40,
  'concierge': 150,
  'security': 80,
  'elevator': 30,
  'parking-garage': 60,
  'storage-unit': 25,
  'rooftop-deck': 45,
  'garden': 20,
  'bbq-area': 15,
  'dog-park': 15,
  'bike-storage': 10,
  'package-reception': 20,
  'valet-parking': 120,
  'shuttle-service': 80
};

// Utility cost estimates (monthly)
const UTILITY_COSTS: { [key: string]: number } = {
  'water': 40,
  'sewer': 30,
  'trash': 25,
  'electricity': 120,
  'gas': 80,
  'internet': 60,
  'cable': 50,
  'heat': 100,
  'ac': 80
};

// Maintenance cost estimates (monthly)
const MAINTENANCE_COSTS: { [key: string]: number } = {
  'exterior-painting': 35,
  'roof-repairs': 50,
  'landscaping': 40,
  'snow-removal': 30,
  'pest-control': 25,
  'window-cleaning': 20,
  'gutter-cleaning': 15,
  'exterior-lighting': 20,
  'sidewalk-repairs': 25
};

// Insurance cost estimates (monthly)
const INSURANCE_COSTS: { [key: string]: number } = {
  'building-insurance': 80,
  'liability-insurance': 40,
  'flood-insurance': 60,
  'earthquake-insurance': 50
};

// Market comparison factors
const MARKET_FACTORS = {
  'below-market': 0.8,
  'market-rate': 1.0,
  'above-market': 1.2,
  'premium': 1.5
};

// Location quality factors
const LOCATION_FACTORS = {
  'poor': 0.7,
  'fair': 0.85,
  'good': 1.0,
  'excellent': 1.2,
  'premium': 1.4
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'condo': 1.0,
  'townhouse': 0.9,
  'single-family': 0.8,
  'co-op': 1.1,
  'pud': 0.95
};

// Helper function to calculate amenity value
function calculateAmenityValue(amenities: string[]): number {
  if (!amenities || !Array.isArray(amenities)) return 0;
  return amenities.reduce((total, amenity) => {
    return total + (AMENITY_VALUES[amenity] || 0);
  }, 0);
}

// Helper function to calculate utility savings
function calculateUtilitySavings(utilitiesIncluded: string[]): number {
  if (!utilitiesIncluded || !Array.isArray(utilitiesIncluded)) return 0;
  return utilitiesIncluded.reduce((total, utility) => {
    return total + (UTILITY_COSTS[utility] || 0);
  }, 0);
}

// Helper function to calculate maintenance savings
function calculateMaintenanceSavings(maintenanceIncluded: string[]): number {
  if (!maintenanceIncluded || !Array.isArray(maintenanceIncluded)) return 0;
  return maintenanceIncluded.reduce((total, maintenance) => {
    return total + (MAINTENANCE_COSTS[maintenance] || 0);
  }, 0);
}

// Helper function to calculate insurance savings
function calculateInsuranceSavings(insuranceIncluded: string[]): number {
  if (!insuranceIncluded || !Array.isArray(insuranceIncluded)) return 0;
  return insuranceIncluded.reduce((total, insurance) => {
    return total + (INSURANCE_COSTS[insurance] || 0);
  }, 0);
}

// Helper function to calculate reserve fund health
function calculateReserveFundHealth(reserveFundBalance: number, annualBudget: number): string {
  if (!reserveFundBalance || !annualBudget) return 'Unknown';
  
  const ratio = (reserveFundBalance / annualBudget) * 100;
  
  if (ratio >= 25) return 'Excellent';
  else if (ratio >= 15) return 'Good';
  else if (ratio >= 10) return 'Fair';
  else if (ratio >= 5) return 'Poor';
  else return 'Critical';
}

// Helper function to calculate financial health
function calculateFinancialHealth(
  reserveFundBalance: number, 
  annualBudget: number, 
  debtObligations: number, 
  pendingLitigation: string
): string {
  let score = 0;
  
  // Reserve fund health (40% weight)
  if (reserveFundBalance && annualBudget) {
    const ratio = (reserveFundBalance / annualBudget) * 100;
    if (ratio >= 25) score += 40;
    else if (ratio >= 15) score += 30;
    else if (ratio >= 10) score += 20;
    else if (ratio >= 5) score += 10;
  }
  
  // Debt obligations (30% weight)
  if (debtObligations && annualBudget) {
    const debtRatio = (debtObligations / annualBudget) * 100;
    if (debtRatio === 0) score += 30;
    else if (debtRatio <= 10) score += 25;
    else if (debtRatio <= 25) score += 15;
    else if (debtRatio <= 50) score += 5;
  }
  
  // Litigation risk (30% weight)
  switch (pendingLitigation) {
    case 'none': score += 30; break;
    case 'minor': score += 20; break;
    case 'moderate': score += 10; break;
    case 'major': score += 0; break;
    default: score += 15;
  }
  
  if (score >= 80) return 'Excellent';
  else if (score >= 60) return 'Good';
  else if (score >= 40) return 'Fair';
  else if (score >= 20) return 'Poor';
  else return 'Critical';
}

// Helper function to calculate value score
function calculateValueScore(
  totalMonthlyFee: number,
  amenityValue: number,
  utilitySavings: number,
  maintenanceSavings: number,
  insuranceSavings: number
): number {
  if (totalMonthlyFee <= 0) return 0;
  
  const totalBenefits = amenityValue + utilitySavings + maintenanceSavings + insuranceSavings;
  const valueRatio = (totalBenefits / totalMonthlyFee) * 100;
  
  return Math.min(Math.round(valueRatio), 100);
}

// Helper function to calculate risk score
function calculateRiskScore(
  reserveFundBalance: number,
  annualBudget: number,
  debtObligations: number,
  pendingLitigation: string,
  managementCompany: string,
  hoaAge: number,
  occupancyRate: number
): number {
  let riskScore = 0;
  
  // Reserve fund risk (25% weight)
  if (reserveFundBalance && annualBudget) {
    const ratio = (reserveFundBalance / annualBudget) * 100;
    if (ratio < 5) riskScore += 25;
    else if (ratio < 10) riskScore += 20;
    else if (ratio < 15) riskScore += 15;
    else if (ratio < 25) riskScore += 10;
    else riskScore += 5;
  }
  
  // Debt risk (20% weight)
  if (debtObligations && annualBudget) {
    const debtRatio = (debtObligations / annualBudget) * 100;
    if (debtRatio > 50) riskScore += 20;
    else if (debtRatio > 25) riskScore += 15;
    else if (debtRatio > 10) riskScore += 10;
    else if (debtRatio > 0) riskScore += 5;
  }
  
  // Litigation risk (20% weight)
  switch (pendingLitigation) {
    case 'major': riskScore += 20; break;
    case 'moderate': riskScore += 15; break;
    case 'minor': riskScore += 10; break;
    case 'none': riskScore += 0; break;
    default: riskScore += 5;
  }
  
  // Management risk (15% weight)
  switch (managementCompany) {
    case 'self-managed': riskScore += 15; break;
    case 'hybrid': riskScore += 10; break;
    case 'professional-management': riskScore += 5; break;
    default: riskScore += 10;
  }
  
  // Age risk (10% weight)
  if (hoaAge > 30) riskScore += 10;
  else if (hoaAge > 20) riskScore += 8;
  else if (hoaAge > 10) riskScore += 5;
  else if (hoaAge > 5) riskScore += 3;
  
  // Occupancy risk (10% weight)
  if (occupancyRate < 70) riskScore += 10;
  else if (occupancyRate < 80) riskScore += 8;
  else if (occupancyRate < 90) riskScore += 5;
  else if (occupancyRate < 95) riskScore += 3;
  
  return Math.min(riskScore, 100);
}

// Helper function to generate recommendation
function generateRecommendation(valueScore: number, riskScore: number, totalMonthlyFee: number): string {
  if (valueScore >= 80 && riskScore <= 20) {
    return 'Excellent value with low risk. Highly recommended.';
  } else if (valueScore >= 70 && riskScore <= 30) {
    return 'Good value with acceptable risk. Recommended.';
  } else if (valueScore >= 60 && riskScore <= 40) {
    return 'Fair value with moderate risk. Consider carefully.';
  } else if (valueScore >= 50 && riskScore <= 50) {
    return 'Marginal value with elevated risk. Proceed with caution.';
  } else if (riskScore > 70) {
    return 'High risk regardless of value. Not recommended.';
  } else if (valueScore < 40) {
    return 'Poor value. Consider alternatives.';
  } else {
    return 'Mixed assessment. Review all factors carefully.';
  }
}

export function calculateHOAFee(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const monthlyHOAFee = inputs.monthlyHOAFee || 0;
  const propertyType = inputs.propertyType || 'condo';
  const squareFootage = inputs.squareFootage || 1500;
  const bedrooms = inputs.bedrooms || 2;
  const bathrooms = inputs.bathrooms || 2;
  const parkingSpaces = inputs.parkingSpaces || 1;
  const amenities = inputs.amenities || [];
  const utilitiesIncluded = inputs.utilitiesIncluded || [];
  const maintenanceIncluded = inputs.maintenanceIncluded || [];
  const insuranceIncluded = inputs.insuranceIncluded || [];
  const reserveFund = inputs.reserveFund || 0;
  const specialAssessment = inputs.specialAssessment || 0;
  const petFees = inputs.petFees || 0;
  const hoaAge = inputs.hoaAge || 10;
  const totalUnits = inputs.totalUnits || 100;
  const occupancyRate = inputs.occupancyRate || 95;
  const annualBudget = inputs.annualBudget || 500000;
  const reserveFundBalance = inputs.reserveFundBalance || 100000;
  const debtObligations = inputs.debtObligations || 0;
  const pendingLitigation = inputs.pendingLitigation || 'none';
  const managementCompany = inputs.managementCompany || 'professional-management';
  const marketComparison = inputs.marketComparison || 'market-rate';
  const locationQuality = inputs.locationQuality || 'good';
  const inflationRate = inputs.inflationRate || 3;
  const projectedIncrease = inputs.projectedIncrease || 5;

  // Calculate total monthly fee
  const totalMonthlyFee = monthlyHOAFee + reserveFund + specialAssessment + petFees;
  const annualHOACost = totalMonthlyFee * 12;

  // Calculate per-unit metrics
  const costPerSquareFoot = squareFootage > 0 ? totalMonthlyFee / squareFootage : 0;
  const costPerBedroom = bedrooms > 0 ? totalMonthlyFee / bedrooms : 0;

  // Calculate savings and values
  const amenityValue = calculateAmenityValue(amenities);
  const utilitySavings = calculateUtilitySavings(utilitiesIncluded);
  const maintenanceSavings = calculateMaintenanceSavings(maintenanceIncluded);
  const insuranceSavings = calculateInsuranceSavings(insuranceIncluded);
  const totalSavings = amenityValue + utilitySavings + maintenanceSavings + insuranceSavings;
  const netHOACost = totalMonthlyFee - totalSavings;

  // Calculate health assessments
  const reserveFundHealth = calculateReserveFundHealth(reserveFundBalance, annualBudget);
  const financialHealth = calculateFinancialHealth(reserveFundBalance, annualBudget, debtObligations, pendingLitigation);

  // Calculate scores
  const valueScore = calculateValueScore(totalMonthlyFee, amenityValue, utilitySavings, maintenanceSavings, insuranceSavings);
  const riskScore = calculateRiskScore(reserveFundBalance, annualBudget, debtObligations, pendingLitigation, managementCompany, hoaAge, occupancyRate);

  // Generate recommendation
  const recommendation = generateRecommendation(valueScore, riskScore, totalMonthlyFee);

  // Determine fee competitiveness
  let feeCompetitiveness = 'Unknown';
  if (marketComparison === 'below-market') feeCompetitiveness = 'Below market rates';
  else if (marketComparison === 'market-rate') feeCompetitiveness = 'Market rate';
  else if (marketComparison === 'above-market') feeCompetitiveness = 'Above market rates';
  else if (marketComparison === 'premium') feeCompetitiveness = 'Premium pricing';

  // Generate detailed breakdowns
  const costBreakdown = `Base HOA Fee: $${monthlyHOAFee}
Reserve Fund: $${reserveFund}
Special Assessment: $${specialAssessment}
Pet Fees: $${petFees}
Total: $${totalMonthlyFee}`;

  const savingsBreakdown = `Amenity Value: $${amenityValue}
Utility Savings: $${utilitySavings}
Maintenance Savings: $${maintenanceSavings}
Insurance Savings: $${insuranceSavings}
Total Savings: $${totalSavings}`;

  const keyMetrics = `Reserve Fund Health: ${reserveFundHealth}
Financial Health: ${financialHealth}
Occupancy Rate: ${occupancyRate}%
Total Units: ${totalUnits}
HOA Age: ${hoaAge} years
Management: ${managementCompany}`;

  const comparisonTable = `Market Comparison: ${feeCompetitiveness}
Location Quality: ${locationQuality}
Property Type: ${propertyType}
Cost per Sq Ft: $${costPerSquareFoot.toFixed(2)}
Cost per Bedroom: $${costPerBedroom.toFixed(2)}`;

  // Generate 5-year projections
  const year1 = totalMonthlyFee * (1 + projectedIncrease / 100);
  const year2 = year1 * (1 + projectedIncrease / 100);
  const year3 = year2 * (1 + projectedIncrease / 100);
  const year4 = year3 * (1 + projectedIncrease / 100);
  const year5 = year4 * (1 + projectedIncrease / 100);

  const projectedCosts = `5-Year Fee Projections (${projectedIncrease}% annual increase):
Year 1: $${Math.round(year1)}
Year 2: $${Math.round(year2)}
Year 3: $${Math.round(year3)}
Year 4: $${Math.round(year4)}
Year 5: $${Math.round(year5)}
Total 5-Year Cost: $${Math.round((year1 + year2 + year3 + year4 + year5) * 12)}`;

  return {
    totalMonthlyFee: Math.round(totalMonthlyFee),
    annualHOACost: Math.round(annualHOACost),
    costPerSquareFoot: Math.round(costPerSquareFoot * 100) / 100,
    costPerBedroom: Math.round(costPerBedroom * 100) / 100,
    amenityValue: Math.round(amenityValue),
    utilitySavings: Math.round(utilitySavings),
    maintenanceSavings: Math.round(maintenanceSavings),
    insuranceSavings: Math.round(insuranceSavings),
    totalSavings: Math.round(totalSavings),
    netHOACost: Math.round(netHOACost),
    reserveFundHealth,
    financialHealth,
    feeCompetitiveness,
    valueScore,
    riskScore,
    recommendation,
    keyMetrics,
    costBreakdown,
    savingsBreakdown,
    comparisonTable,
    projectedCosts,
    hoaFeeAnalysis: 'Comprehensive HOA fee analysis completed'
  };
}

export function generateHOAFeeAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# HOA Fee Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Value Score:** ${outputs.valueScore}/100
**Risk Score:** ${outputs.riskScore}/100

## Cost Overview
- **Total Monthly Fee:** $${outputs.totalMonthlyFee.toLocaleString()}
- **Annual HOA Cost:** $${outputs.annualHOACost.toLocaleString()}
- **Net Monthly Cost:** $${outputs.netHOACost.toLocaleString()}

## Cost Breakdown
${outputs.costBreakdown}

## Savings Analysis
${outputs.savingsBreakdown}

## Key Metrics
${outputs.keyMetrics}

## Financial Health
- **Reserve Fund Health:** ${outputs.reserveFundHealth}
- **Financial Health:** ${outputs.financialHealth}
- **Fee Competitiveness:** ${outputs.feeCompetitiveness}

## Value Assessment
- **Value Score:** ${outputs.valueScore}/100
- **Cost per Square Foot:** $${outputs.costPerSquareFoot}
- **Cost per Bedroom:** $${outputs.costPerBedroom}

## Risk Assessment
- **Risk Score:** ${outputs.riskScore}/100
- **Primary Risk Factors:** ${outputs.riskScore > 50 ? 'High debt, poor reserves, or litigation' : 'Low risk factors identified'}

## Market Comparison
${outputs.comparisonTable}

## Cost Projections
${outputs.projectedCosts}

## Recommendations
1. Review reserve fund adequacy
2. Assess management company performance
3. Compare with similar properties
4. Consider long-term fee trends
5. Evaluate amenity usage and value

## Next Steps
1. Request HOA financial documents
2. Review meeting minutes for recent decisions
3. Check for pending special assessments
4. Verify insurance coverage adequacy
5. Assess community rules and restrictions`;
}
