import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base rates by property type (per $1000 of coverage)
const BASE_RATES = {
  office: 0.45,
  retail: 0.60,
  warehouse: 0.35,
  restaurant: 0.75,
  hotel: 0.55,
  medical: 0.65,
  manufacturing: 0.50,
  'mixed-use': 0.55
};

// Location risk factors
const LOCATION_FACTORS = {
  'low-risk': 0.8,
  'medium-risk': 1.0,
  'high-risk': 1.4,
  'coastal': 1.6,
  'earthquake': 1.8,
  'flood': 2.0,
  'wildfire': 1.5
};

// Construction type factors
const CONSTRUCTION_FACTORS = {
  'frame': 1.4,
  'joisted-masonry': 1.2,
  'non-combustible': 1.0,
  'masonry-non-combustible': 0.9,
  'modified-fire-resistive': 0.8,
  'fire-resistive': 0.7
};

// Claims history factors
const CLAIMS_FACTORS = {
  '0': 1.0,
  '1': 1.15,
  '2': 1.35,
  '3+': 1.6
};

// Occupancy factors
const OCCUPANCY_FACTORS = {
  'owner-occupied': 1.0,
  'tenant-occupied': 1.1,
  'vacant': 1.5,
  'under-construction': 1.8
};

// Safety feature discounts
const SAFETY_DISCOUNTS = {
  'sprinkler-system': 0.15,
  'fire-alarm': 0.05,
  'security-system': 0.08,
  'backup-generator': 0.03,
  'storm-shutters': 0.10,
  'elevated-foundation': 0.12
};

// Additional coverage costs (as percentage of base premium)
const ADDITIONAL_COVERAGE_COSTS = {
  'earthquake': 0.25,
  'flood': 0.30,
  'windstorm': 0.20,
  'terrorism': 0.15,
  'equipment-breakdown': 0.12,
  'cyber-liability': 0.18,
  'employment-practices': 0.10,
  'directors-officers': 0.08
};

// Coverage limit percentages
const COVERAGE_LIMITS = {
  '80-percent': 0.8,
  '90-percent': 0.9,
  '100-percent': 1.0,
  'agreed-value': 1.0
};

// Age factor calculation
function calculateAgeFactor(yearBuilt: number): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBuilt;
  
  if (age <= 5) return 1.0;
  if (age <= 10) return 1.05;
  if (age <= 20) return 1.1;
  if (age <= 30) return 1.2;
  if (age <= 50) return 1.35;
  return 1.5;
}

// Calculate base premium
function calculateBasePremium(inputs: CalculatorInputs): number {
  const propertyValue = inputs.propertyValue as number;
  const propertyType = inputs.propertyType as keyof typeof BASE_RATES;
  const location = inputs.location as keyof typeof LOCATION_FACTORS;
  const constructionType = inputs.constructionType as keyof typeof CONSTRUCTION_FACTORS;
  const yearBuilt = inputs.yearBuilt as number;
  
  const baseRate = BASE_RATES[propertyType];
  const locationFactor = LOCATION_FACTORS[location];
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType];
  const ageFactor = calculateAgeFactor(yearBuilt);
  
  return (propertyValue / 1000) * baseRate * locationFactor * constructionFactor * ageFactor;
}

// Calculate risk adjustments
function calculateRiskAdjustments(inputs: CalculatorInputs, basePremium: number): number {
  const claimsHistory = inputs.claimsHistory as keyof typeof CLAIMS_FACTORS;
  const occupancy = inputs.occupancy as keyof typeof OCCUPANCY_FACTORS;
  const safetyFeatures = inputs.safetyFeatures as string[] || [];
  
  const claimsFactor = CLAIMS_FACTORS[claimsHistory];
  const occupancyFactor = OCCUPANCY_FACTORS[occupancy];
  
  // Calculate safety feature discounts
  let safetyDiscount = 0;
  safetyFeatures.forEach(feature => {
    if (feature in SAFETY_DISCOUNTS) {
      safetyDiscount += SAFETY_DISCOUNTS[feature as keyof typeof SAFETY_DISCOUNTS];
    }
  });
  
  return basePremium * (claimsFactor + occupancyFactor - 1) * (1 - safetyDiscount);
}

// Calculate additional coverage costs
function calculateAdditionalCoverageCosts(inputs: CalculatorInputs, basePremium: number): number {
  const additionalCoverages = inputs.additionalCoverages as string[] || [];
  let additionalCost = 0;
  
  additionalCoverages.forEach(coverage => {
    if (coverage in ADDITIONAL_COVERAGE_COSTS) {
      additionalCost += basePremium * ADDITIONAL_COVERAGE_COSTS[coverage as keyof typeof ADDITIONAL_COVERAGE_COSTS];
    }
  });
  
  return additionalCost;
}

// Calculate deductible adjustment
function calculateDeductibleAdjustment(inputs: CalculatorInputs, totalPremium: number): number {
  const deductible = inputs.deductible as number;
  const propertyValue = inputs.propertyValue as number;
  
  // Standard deductible is 1% of property value
  const standardDeductible = propertyValue * 0.01;
  const deductibleRatio = deductible / standardDeductible;
  
  if (deductibleRatio <= 0.5) return totalPremium * 1.2; // Higher premium for low deductible
  if (deductibleRatio <= 1.0) return totalPremium; // Standard premium
  if (deductibleRatio <= 2.0) return totalPremium * 0.9; // 10% discount
  if (deductibleRatio <= 5.0) return totalPremium * 0.8; // 20% discount
  return totalPremium * 0.7; // 30% discount for very high deductible
}

// Calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score
  
  // Location risk
  const location = inputs.location as keyof typeof LOCATION_FACTORS;
  const locationFactors = {
    'low-risk': -20,
    'medium-risk': 0,
    'high-risk': 20,
    'coastal': 30,
    'earthquake': 35,
    'flood': 40,
    'wildfire': 25
  };
  riskScore += locationFactors[location] || 0;
  
  // Construction type
  const constructionType = inputs.constructionType as keyof typeof CONSTRUCTION_FACTORS;
  const constructionFactors = {
    'frame': 20,
    'joisted-masonry': 10,
    'non-combustible': 0,
    'masonry-non-combustible': -5,
    'modified-fire-resistive': -10,
    'fire-resistive': -15
  };
  riskScore += constructionFactors[constructionType] || 0;
  
  // Claims history
  const claimsHistory = inputs.claimsHistory as keyof typeof CLAIMS_FACTORS;
  const claimsFactors = {
    '0': -10,
    '1': 5,
    '2': 15,
    '3+': 25
  };
  riskScore += claimsFactors[claimsHistory] || 0;
  
  // Occupancy
  const occupancy = inputs.occupancy as keyof typeof OCCUPANCY_FACTORS;
  const occupancyFactors = {
    'owner-occupied': -5,
    'tenant-occupied': 0,
    'vacant': 20,
    'under-construction': 30
  };
  riskScore += occupancyFactors[occupancy] || 0;
  
  // Safety features
  const safetyFeatures = inputs.safetyFeatures as string[] || [];
  safetyFeatures.forEach(feature => {
    if (feature in SAFETY_DISCOUNTS) {
      riskScore -= 5; // Reduce risk score for each safety feature
    }
  });
  
  return Math.max(1, Math.min(100, riskScore));
}

// Generate recommendations
function generateRecommendations(inputs: CalculatorInputs, outputs: CalculatorOutputs): { recommendedCoverage: string; savingsOpportunities: string } {
  const riskScore = outputs.riskScore as number;
  const premiumRate = outputs.premiumRate as number;
  const safetyFeatures = inputs.safetyFeatures as string[] || [];
  
  let recommendedCoverage = 'Adequate coverage for current risk profile';
  let savingsOpportunities = 'No immediate savings opportunities identified';
  
  // Coverage recommendations based on risk score
  if (riskScore > 70) {
    recommendedCoverage = 'Consider increasing coverage limits and adding additional protections';
  } else if (riskScore < 30) {
    recommendedCoverage = 'Current coverage appears adequate, consider reviewing deductible options';
  }
  
  // Savings opportunities
  const savings = [];
  
  if (!safetyFeatures.includes('sprinkler-system')) {
    savings.push('Install sprinkler system for 15% premium reduction');
  }
  
  if (!safetyFeatures.includes('security-system')) {
    savings.push('Add security system for 8% premium reduction');
  }
  
  if (premiumRate > 1.0) {
    savings.push('Consider increasing deductible to reduce premium rate');
  }
  
  if (savings.length > 0) {
    savingsOpportunities = savings.join(', ');
  }
  
  return { recommendedCoverage, savingsOpportunities };
}

export function calculateInsuranceCosts(inputs: CalculatorInputs): CalculatorOutputs {
  const propertyValue = inputs.propertyValue as number;
  const buildingValue = inputs.buildingValue as number;
  const contentsValue = inputs.contentsValue as number;
  const businessIncome = inputs.businessIncome as number;
  const squareFootage = inputs.squareFootage as number;
  const coverageLimits = inputs.coverageLimits as keyof typeof COVERAGE_LIMITS;
  
  // Calculate base premium
  const basePremium = calculateBasePremium(inputs);
  
  // Calculate risk adjustments
  const riskAdjustment = calculateRiskAdjustments(inputs, basePremium);
  
  // Calculate additional coverage costs
  const additionalCosts = calculateAdditionalCoverageCosts(inputs, basePremium);
  
  // Calculate total premium before deductible adjustment
  const totalPremium = basePremium + riskAdjustment + additionalCosts;
  
  // Apply deductible adjustment
  const annualPremium = calculateDeductibleAdjustment(inputs, totalPremium);
  
  // Calculate monthly premium
  const monthlyPremium = annualPremium / 12;
  
  // Calculate coverage limits
  const coveragePercentage = COVERAGE_LIMITS[coverageLimits];
  const propertyCoverage = propertyValue * coveragePercentage;
  
  // Calculate business interruption coverage (18 months of income)
  const businessInterruption = businessIncome * 1.5;
  
  // Calculate liability coverage (typically 1M for commercial properties)
  const liabilityCoverage = 1000000;
  
  // Calculate premium rate
  const premiumRate = (annualPremium / propertyValue) * 100;
  
  // Calculate cost per square foot
  const costPerSqFt = annualPremium / squareFootage;
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs);
  
  // Generate recommendations
  const { recommendedCoverage, savingsOpportunities } = generateRecommendations(inputs, {
    riskScore,
    premiumRate
  } as CalculatorOutputs);
  
  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium * 100) / 100,
    propertyCoverage: Math.round(propertyCoverage),
    businessInterruption: Math.round(businessInterruption),
    liabilityCoverage,
    premiumRate: Math.round(premiumRate * 100) / 100,
    costPerSqFt: Math.round(costPerSqFt * 100) / 100,
    riskScore: Math.round(riskScore),
    recommendedCoverage,
    savingsOpportunities
  };
}

export function generateInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const location = inputs.location as string;
  const riskScore = outputs.riskScore as number;
  const annualPremium = outputs.annualPremium as number;
  const premiumRate = outputs.premiumRate as number;
  
  let analysis = `## Commercial Property Insurance Analysis\n\n`;
  
  analysis += `### Property Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Location Risk**: ${location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
  analysis += `- **Risk Score**: ${riskScore}/100\n\n`;
  
  analysis += `### Premium Summary\n`;
  analysis += `- **Annual Premium**: $${annualPremium.toLocaleString()}\n`;
  analysis += `- **Monthly Premium**: $${(outputs.monthlyPremium as number).toLocaleString()}\n`;
  analysis += `- **Premium Rate**: ${premiumRate}% of property value\n\n`;
  
  analysis += `### Coverage Summary\n`;
  analysis += `- **Property Coverage**: $${(outputs.propertyCoverage as number).toLocaleString()}\n`;
  analysis += `- **Business Interruption**: $${(outputs.businessInterruption as number).toLocaleString()}\n`;
  analysis += `- **Liability Coverage**: $${(outputs.liabilityCoverage as number).toLocaleString()}\n\n`;
  
  analysis += `### Risk Assessment\n`;
  if (riskScore <= 30) {
    analysis += `**Low Risk Profile**: Excellent risk characteristics with minimal premium impact.\n`;
  } else if (riskScore <= 60) {
    analysis += `**Moderate Risk Profile**: Standard risk level with typical premium rates.\n`;
  } else {
    analysis += `**High Risk Profile**: Elevated risk factors requiring attention and potentially higher premiums.\n`;
  }
  
  analysis += `\n### Recommendations\n`;
  analysis += `- **Coverage**: ${outputs.recommendedCoverage as string}\n`;
  analysis += `- **Savings**: ${outputs.savingsOpportunities as string}\n`;
  
  return analysis;
}
