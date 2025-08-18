import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Property type multipliers for sales comparison adjustments
const PROPERTY_TYPE_MULTIPLIERS = {
  office: 1.0,
  retail: 0.95,
  warehouse: 0.85,
  restaurant: 1.1,
  hotel: 1.2,
  medical: 1.15,
  manufacturing: 0.9,
  'mixed-use': 1.05,
  apartment: 1.0,
  'self-storage': 0.8
};

// Location multipliers
const LOCATION_MULTIPLIERS = {
  rural: 0.7,
  suburban: 0.9,
  urban: 1.0,
  cbd: 1.3,
  airport: 1.1,
  highway: 0.95
};

// Market condition multipliers
const MARKET_CONDITION_MULTIPLIERS = {
  declining: 0.8,
  stable: 1.0,
  growing: 1.15,
  hot: 1.3
};

// Construction quality multipliers
const CONSTRUCTION_QUALITY_MULTIPLIERS = {
  economy: 0.8,
  standard: 1.0,
  custom: 1.2,
  luxury: 1.4
};

// Condition multipliers
const CONDITION_MULTIPLIERS = {
  poor: 0.7,
  fair: 0.85,
  good: 1.0,
  excellent: 1.15
};

// Accessibility multipliers
const ACCESSIBILITY_MULTIPLIERS = {
  poor: 0.8,
  fair: 0.9,
  good: 1.0,
  excellent: 1.1
};

// Tenant quality multipliers
const TENANT_QUALITY_MULTIPLIERS = {
  poor: 0.8,
  fair: 0.9,
  good: 1.0,
  excellent: 1.1
};

// Lease terms multipliers
const LEASE_TERMS_MULTIPLIERS = {
  'month-to-month': 0.8,
  'short-term': 0.9,
  'medium-term': 1.0,
  'long-term': 1.1
};

// Age factor calculation
function calculateAgeFactor(yearBuilt: number): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBuilt;
  
  if (age <= 5) return 1.0;
  if (age <= 10) return 0.95;
  if (age <= 20) return 0.9;
  if (age <= 30) return 0.85;
  if (age <= 50) return 0.75;
  return 0.65;
}

// Calculate income approach value
function calculateIncomeApproachValue(inputs: CalculatorInputs): number {
  const annualRent = inputs.annualRent as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const vacancyRate = inputs.vacancyRate as number;
  const capRate = inputs.capRate as number;
  
  // Calculate effective gross income
  const effectiveGrossIncome = annualRent * (1 - vacancyRate / 100);
  
  // Calculate net operating income
  const netOperatingIncome = effectiveGrossIncome - operatingExpenses;
  
  // Calculate value using cap rate
  return netOperatingIncome / (capRate / 100);
}

// Calculate sales comparison approach value
function calculateSalesComparisonValue(inputs: CalculatorInputs): number {
  const squareFootage = inputs.squareFootage as number;
  const comparableSales = inputs.comparableSales as number;
  const propertyType = inputs.propertyType as keyof typeof PROPERTY_TYPE_MULTIPLIERS;
  const location = inputs.location as keyof typeof LOCATION_MULTIPLIERS;
  const marketCondition = inputs.marketCondition as keyof typeof MARKET_CONDITION_MULTIPLIERS;
  const constructionQuality = inputs.constructionQuality as keyof typeof CONSTRUCTION_QUALITY_MULTIPLIERS;
  const condition = inputs.condition as keyof typeof CONDITION_MULTIPLIERS;
  const accessibility = inputs.accessibility as keyof typeof ACCESSIBILITY_MULTIPLIERS;
  const yearBuilt = inputs.yearBuilt as number;
  
  // Apply all adjustment factors
  const propertyTypeMultiplier = PROPERTY_TYPE_MULTIPLIERS[propertyType];
  const locationMultiplier = LOCATION_MULTIPLIERS[location];
  const marketConditionMultiplier = MARKET_CONDITION_MULTIPLIERS[marketCondition];
  const constructionQualityMultiplier = CONSTRUCTION_QUALITY_MULTIPLIERS[constructionQuality];
  const conditionMultiplier = CONDITION_MULTIPLIERS[condition];
  const accessibilityMultiplier = ACCESSIBILITY_MULTIPLIERS[accessibility];
  const ageFactor = calculateAgeFactor(yearBuilt);
  
  const totalAdjustment = propertyTypeMultiplier * locationMultiplier * marketConditionMultiplier * 
                         constructionQualityMultiplier * conditionMultiplier * accessibilityMultiplier * ageFactor;
  
  return squareFootage * comparableSales * totalAdjustment;
}

// Calculate cost approach value
function calculateCostApproachValue(inputs: CalculatorInputs): number {
  const squareFootage = inputs.squareFootage as number;
  const landArea = inputs.landArea as number;
  const landValue = inputs.landValue as number;
  const replacementCost = inputs.replacementCost as number;
  const depreciation = inputs.depreciation as number;
  const constructionQuality = inputs.constructionQuality as keyof typeof CONSTRUCTION_QUALITY_MULTIPLIERS;
  
  // Calculate land value
  const totalLandValue = landArea * landValue;
  
  // Calculate building value with quality adjustment
  const constructionQualityMultiplier = CONSTRUCTION_QUALITY_MULTIPLIERS[constructionQuality];
  const adjustedReplacementCost = replacementCost * constructionQualityMultiplier;
  const buildingValue = squareFootage * adjustedReplacementCost * (1 - depreciation / 100);
  
  return totalLandValue + buildingValue;
}

// Calculate weighted final value
function calculateFinalValue(incomeValue: number, salesValue: number, costValue: number, inputs: CalculatorInputs): number {
  const propertyType = inputs.propertyType as string;
  const marketCondition = inputs.marketCondition as string;
  
  // Weight factors based on property type and market conditions
  let incomeWeight = 0.4;
  let salesWeight = 0.4;
  let costWeight = 0.2;
  
  // Adjust weights based on property type
  if (propertyType === 'office' || propertyType === 'retail') {
    incomeWeight = 0.5;
    salesWeight = 0.35;
    costWeight = 0.15;
  } else if (propertyType === 'warehouse' || propertyType === 'manufacturing') {
    incomeWeight = 0.3;
    salesWeight = 0.3;
    costWeight = 0.4;
  } else if (propertyType === 'hotel' || propertyType === 'restaurant') {
    incomeWeight = 0.6;
    salesWeight = 0.3;
    costWeight = 0.1;
  }
  
  // Adjust weights based on market conditions
  if (marketCondition === 'hot') {
    salesWeight += 0.1;
    incomeWeight -= 0.05;
    costWeight -= 0.05;
  } else if (marketCondition === 'declining') {
    costWeight += 0.1;
    salesWeight -= 0.05;
    incomeWeight -= 0.05;
  }
  
  return incomeValue * incomeWeight + salesValue * salesWeight + costValue * costWeight;
}

// Calculate confidence level
function calculateConfidenceLevel(inputs: CalculatorInputs, values: number[]): string {
  const variance = Math.max(...values) - Math.min(...values);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const coefficientOfVariation = variance / average;
  
  if (coefficientOfVariation < 0.1) return 'High';
  if (coefficientOfVariation < 0.2) return 'Medium';
  return 'Low';
}

// Generate value range
function generateValueRange(finalValue: number, confidenceLevel: string): string {
  let rangePercentage = 0.1;
  
  if (confidenceLevel === 'Medium') {
    rangePercentage = 0.15;
  } else if (confidenceLevel === 'Low') {
    rangePercentage = 0.25;
  }
  
  const lowValue = Math.round(finalValue * (1 - rangePercentage));
  const highValue = Math.round(finalValue * (1 + rangePercentage));
  
  return `$${lowValue.toLocaleString()} - $${highValue.toLocaleString()}`;
}

// Generate key factors
function generateKeyFactors(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const factors = [];
  
  const tenantQuality = inputs.tenantQuality as string;
  const location = inputs.location as string;
  const marketCondition = inputs.marketCondition as string;
  const condition = inputs.condition as string;
  
  if (tenantQuality === 'excellent') {
    factors.push('Strong tenant quality');
  }
  
  if (location === 'cbd' || location === 'urban') {
    factors.push('Prime location');
  }
  
  if (marketCondition === 'growing' || marketCondition === 'hot') {
    factors.push('Favorable market conditions');
  }
  
  if (condition === 'excellent') {
    factors.push('Excellent property condition');
  }
  
  if (factors.length === 0) {
    factors.push('Standard market conditions');
  }
  
  return factors.join(', ');
}

export function calculatePropertyValue(inputs: CalculatorInputs): CalculatorOutputs {
  const squareFootage = inputs.squareFootage as number;
  const landArea = inputs.landArea as number;
  const annualRent = inputs.annualRent as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const vacancyRate = inputs.vacancyRate as number;
  
  // Calculate values using all three approaches
  const incomeApproachValue = calculateIncomeApproachValue(inputs);
  const salesComparisonValue = calculateSalesComparisonValue(inputs);
  const costApproachValue = calculateCostApproachValue(inputs);
  
  // Calculate final weighted value
  const finalValue = calculateFinalValue(incomeApproachValue, salesComparisonValue, costApproachValue, inputs);
  
  // Calculate derived values
  const valuePerSqFt = finalValue / squareFootage;
  const valuePerAcre = finalValue / landArea;
  
  // Calculate income metrics
  const effectiveGrossIncome = annualRent * (1 - vacancyRate / 100);
  const netOperatingIncome = effectiveGrossIncome - operatingExpenses;
  const operatingExpenseRatio = (operatingExpenses / effectiveGrossIncome) * 100;
  
  // Calculate confidence and range
  const confidenceLevel = calculateConfidenceLevel(inputs, [incomeApproachValue, salesComparisonValue, costApproachValue]);
  const valueRange = generateValueRange(finalValue, confidenceLevel);
  
  // Generate key factors
  const keyFactors = generateKeyFactors(inputs, {
    incomeApproachValue,
    salesComparisonValue,
    costApproachValue,
    finalValue,
    valuePerSqFt,
    valuePerAcre,
    netOperatingIncome,
    effectiveGrossIncome,
    operatingExpenseRatio,
    valueRange,
    confidenceLevel,
    keyFactors: ''
  } as CalculatorOutputs);
  
  return {
    incomeApproachValue: Math.round(incomeApproachValue),
    salesComparisonValue: Math.round(salesComparisonValue),
    costApproachValue: Math.round(costApproachValue),
    finalValue: Math.round(finalValue),
    valuePerSqFt: Math.round(valuePerSqFt * 100) / 100,
    valuePerAcre: Math.round(valuePerAcre),
    netOperatingIncome: Math.round(netOperatingIncome),
    effectiveGrossIncome: Math.round(effectiveGrossIncome),
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10,
    valueRange,
    confidenceLevel,
    keyFactors
  };
}

export function generateValuationAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const location = inputs.location as string;
  const marketCondition = inputs.marketCondition as string;
  const finalValue = outputs.finalValue as number;
  const confidenceLevel = outputs.confidenceLevel as string;
  
  let analysis = `## Commercial Property Valuation Analysis\n\n`;
  
  analysis += `### Property Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Location**: ${location.replace(/\b\w/g, l => l.toUpperCase())}\n`;
  analysis += `- **Market Condition**: ${marketCondition.charAt(0).toUpperCase() + marketCondition.slice(1)}\n\n`;
  
  analysis += `### Valuation Summary\n`;
  analysis += `- **Final Estimated Value**: $${finalValue.toLocaleString()}\n`;
  analysis += `- **Confidence Level**: ${confidenceLevel}\n`;
  analysis += `- **Value Range**: ${outputs.valueRange as string}\n\n`;
  
  analysis += `### Valuation Approaches\n`;
  analysis += `- **Income Approach**: $${(outputs.incomeApproachValue as number).toLocaleString()}\n`;
  analysis += `- **Sales Comparison**: $${(outputs.salesComparisonValue as number).toLocaleString()}\n`;
  analysis += `- **Cost Approach**: $${(outputs.costApproachValue as number).toLocaleString()}\n\n`;
  
  analysis += `### Income Analysis\n`;
  analysis += `- **Net Operating Income**: $${(outputs.netOperatingIncome as number).toLocaleString()}\n`;
  analysis += `- **Effective Gross Income**: $${(outputs.effectiveGrossIncome as number).toLocaleString()}\n`;
  analysis += `- **Operating Expense Ratio**: ${outputs.operatingExpenseRatio as number}%\n\n`;
  
  analysis += `### Key Value Factors\n`;
  analysis += `${outputs.keyFactors as string}\n\n`;
  
  analysis += `### Recommendations\n`;
  if (confidenceLevel === 'Low') {
    analysis += `Consider obtaining additional market data and comparable sales to improve valuation accuracy.\n`;
  } else if (confidenceLevel === 'Medium') {
    analysis += `Valuation appears reasonable but consider market-specific factors for final decision.\n`;
  } else {
    analysis += `High confidence in valuation based on strong market data and comparable sales.\n`;
  }
  
  return analysis;
}
