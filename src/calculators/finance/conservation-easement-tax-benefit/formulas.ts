import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Deduction limits by donor type
const DEDUCTION_LIMITS = {
  'individual': 0.50, // 50% of AGI
  'partnership': 0.50, // 50% of AGI
  'corporation': 0.10, // 10% of AGI
  'llc': 0.50, // 50% of AGI (pass-through)
  'trust': 0.50, // 50% of AGI
  'estate': 0.50 // 50% of AGI
};

// Estate tax rates (simplified)
const ESTATE_TAX_RATE = 0.40; // 40% estate tax rate
const ESTATE_EXEMPTION = 12000000; // $12M exemption (2024)

// Calculate charitable deduction
function calculateCharitableDeduction(easementValue: number): number {
  return easementValue;
}

// Calculate federal tax savings
function calculateFederalTaxSavings(charitableDeduction: number, marginalTaxRate: number): number {
  return charitableDeduction * (marginalTaxRate / 100);
}

// Calculate state tax savings
function calculateStateTaxSavings(charitableDeduction: number, stateTaxRate: number): number {
  return charitableDeduction * (stateTaxRate / 100);
}

// Calculate total tax savings
function calculateTotalTaxSavings(federalTaxSavings: number, stateTaxSavings: number): number {
  return federalTaxSavings + stateTaxSavings;
}

// Calculate deduction limit
function calculateDeductionLimit(
  adjustedGrossIncome: number,
  donorType: string,
  otherCharitableDeductions: number
): number {
  const limitPercentage = DEDUCTION_LIMITS[donorType as keyof typeof DEDUCTION_LIMITS] || 0.50;
  const totalLimit = adjustedGrossIncome * limitPercentage;
  return totalLimit - otherCharitableDeductions;
}

// Calculate carryforward amount
function calculateCarryforwardAmount(charitableDeduction: number, deductionLimit: number): number {
  return Math.max(0, charitableDeduction - deductionLimit);
}

// Calculate carryforward years
function calculateCarryforwardYears(carryforwardAmount: number, deductionLimit: number): number {
  if (deductionLimit <= 0) return 0;
  return Math.ceil(carryforwardAmount / deductionLimit);
}

// Calculate transaction costs
function calculateTransactionCosts(
  appraisalCost: number,
  legalCost: number,
  surveyCost: number
): number {
  return appraisalCost + legalCost + surveyCost;
}

// Calculate net benefit
function calculateNetBenefit(totalTaxSavings: number, transactionCosts: number): number {
  return totalTaxSavings - transactionCosts;
}

// Calculate benefit-cost ratio
function calculateBenefitCostRatio(totalTaxSavings: number, transactionCosts: number): number {
  if (transactionCosts === 0) return 0;
  return totalTaxSavings / transactionCosts;
}

// Calculate easement value per acre
function calculateEasementValuePerAcre(easementValue: number, easementAcres: number): number {
  if (easementAcres === 0) return 0;
  return easementValue / easementAcres;
}

// Calculate property value reduction percentage
function calculatePropertyValueReduction(
  propertyValue: number,
  propertyValueAfter: number
): number {
  if (propertyValue === 0) return 0;
  return ((propertyValue - propertyValueAfter) / propertyValue) * 100;
}

// Calculate estate tax benefit
function calculateEstateTaxBenefit(
  easementValue: number,
  propertyValue: number,
  estateTaxRate: number = ESTATE_TAX_RATE
): number {
  // Simplified calculation - assumes easement reduces estate value
  return easementValue * estateTaxRate;
}

// Calculate annual tax savings
function calculateAnnualTaxSavings(
  totalTaxSavings: number,
  carryforwardYears: number
): number {
  const totalYears = carryforwardYears + 1; // Include current year
  return totalTaxSavings / totalYears;
}

// Validate easement value consistency
function validateEasementValue(
  propertyValue: number,
  propertyValueAfter: number,
  easementValue: number
): boolean {
  const expectedReduction = propertyValue - propertyValueAfter;
  const tolerance = Math.abs(expectedReduction - easementValue) / propertyValue;
  return tolerance <= 0.1; // Allow 10% tolerance
}

// Generate easement analysis
function generateEasementAnalysis(
  propertyType: string,
  easementValue: number,
  totalTaxSavings: number,
  netBenefit: number,
  benefitCostRatio: number,
  carryforwardYears: number,
  easementType: string,
  conservationPurpose: string[]
): string {
  const analysis = [];
  
  // Overall assessment
  if (benefitCostRatio >= 5) {
    analysis.push('Exceptional tax benefits with very high benefit-cost ratio');
  } else if (benefitCostRatio >= 3) {
    analysis.push('Strong tax benefits with good benefit-cost ratio');
  } else if (benefitCostRatio >= 2) {
    analysis.push('Moderate tax benefits with acceptable benefit-cost ratio');
  } else {
    analysis.push('Limited tax benefits - consider transaction costs carefully');
  }
  
  // Easement type assessment
  if (easementType === 'perpetual') {
    analysis.push('Perpetual easement provides maximum tax benefits and conservation value');
  } else if (easementType === 'term') {
    analysis.push('Term easement provides significant benefits with future flexibility');
  } else {
    analysis.push('Partial easement provides targeted conservation and tax benefits');
  }
  
  // Conservation purpose assessment
  const purposeCount = conservationPurpose.length;
  if (purposeCount >= 3) {
    analysis.push('Multiple conservation purposes enhance easement value and benefits');
  } else if (purposeCount >= 2) {
    analysis.push('Dual conservation purposes provide good value');
  } else {
    analysis.push('Single conservation purpose - consider additional purposes if possible');
  }
  
  // Carryforward assessment
  if (carryforwardYears === 0) {
    analysis.push('Full deduction utilization in current year');
  } else if (carryforwardYears <= 2) {
    analysis.push('Reasonable carryforward period for deduction utilization');
  } else {
    analysis.push('Extended carryforward period - consider timing of benefits');
  }
  
  // Property type specific analysis
  if (propertyType === 'farmland') {
    analysis.push('Farmland easement supports agricultural preservation and food security');
  } else if (propertyType === 'forest') {
    analysis.push('Forest easement provides carbon sequestration and wildlife habitat');
  } else if (propertyType === 'wetland') {
    analysis.push('Wetland easement supports water quality and flood control');
  } else if (propertyType === 'wildlife-habitat') {
    analysis.push('Wildlife habitat easement supports biodiversity and ecosystem health');
  }
  
  return analysis.join('. ');
}

export function calculateTaxBenefits(inputs: CalculatorInputs): CalculatorOutputs {
  const propertyType = inputs.propertyType as string;
  const propertyValue = inputs.propertyValue as number;
  const easementValue = inputs.easementValue as number;
  const propertyValueAfter = inputs.propertyValueAfter as number;
  const acres = inputs.acres as number;
  const easementAcres = inputs.easementAcres as number;
  const easementType = inputs.easementType as string;
  const easementHolder = inputs.easementHolder as string;
  const donorType = inputs.donorType as string;
  const taxYear = inputs.taxYear as number;
  const adjustedGrossIncome = inputs.adjustedGrossIncome as number;
  const marginalTaxRate = inputs.marginalTaxRate as number;
  const stateTaxRate = inputs.stateTaxRate as number;
  const otherCharitableDeductions = inputs.otherCharitableDeductions as number;
  const appraisalCost = inputs.appraisalCost as number;
  const legalCost = inputs.legalCost as number;
  const surveyCost = inputs.surveyCost as number;
  const easementDuration = inputs.easementDuration as number;
  const developmentRights = inputs.developmentRights as string[];
  const publicAccess = inputs.publicAccess as string;
  const conservationPurpose = inputs.conservationPurpose as string[];
  
  // Calculate basic tax benefits
  const charitableDeduction = calculateCharitableDeduction(easementValue);
  const federalTaxSavings = calculateFederalTaxSavings(charitableDeduction, marginalTaxRate);
  const stateTaxSavings = calculateStateTaxSavings(charitableDeduction, stateTaxRate);
  const totalTaxSavings = calculateTotalTaxSavings(federalTaxSavings, stateTaxSavings);
  
  // Calculate deduction limits and carryforward
  const deductionLimit = calculateDeductionLimit(adjustedGrossIncome, donorType, otherCharitableDeductions);
  const carryforwardAmount = calculateCarryforwardAmount(charitableDeduction, deductionLimit);
  const carryforwardYears = calculateCarryforwardYears(carryforwardAmount, deductionLimit);
  
  // Calculate costs and benefits
  const transactionCosts = calculateTransactionCosts(appraisalCost, legalCost, surveyCost);
  const netBenefit = calculateNetBenefit(totalTaxSavings, transactionCosts);
  const benefitCostRatio = calculateBenefitCostRatio(totalTaxSavings, transactionCosts);
  
  // Calculate additional metrics
  const easementValuePerAcre = calculateEasementValuePerAcre(easementValue, easementAcres);
  const propertyValueReduction = calculatePropertyValueReduction(propertyValue, propertyValueAfter);
  const estateTaxBenefit = calculateEstateTaxBenefit(easementValue, propertyValue);
  const annualTaxSavings = calculateAnnualTaxSavings(totalTaxSavings, carryforwardYears);
  
  // Generate analysis
  const easementAnalysis = generateEasementAnalysis(
    propertyType,
    easementValue,
    totalTaxSavings,
    netBenefit,
    benefitCostRatio,
    carryforwardYears,
    easementType,
    conservationPurpose
  );
  
  return {
    charitableDeduction: Math.round(charitableDeduction),
    federalTaxSavings: Math.round(federalTaxSavings),
    stateTaxSavings: Math.round(stateTaxSavings),
    totalTaxSavings: Math.round(totalTaxSavings),
    deductionLimit: Math.round(deductionLimit),
    carryforwardAmount: Math.round(carryforwardAmount),
    carryforwardYears,
    netBenefit: Math.round(netBenefit),
    benefitCostRatio: Math.round(benefitCostRatio * 10) / 10,
    easementValuePerAcre: Math.round(easementValuePerAcre),
    propertyValueReduction: Math.round(propertyValueReduction * 10) / 10,
    estateTaxBenefit: Math.round(estateTaxBenefit),
    annualTaxSavings: Math.round(annualTaxSavings),
    transactionCosts: Math.round(transactionCosts),
    easementAnalysis
  };
}

export function generateTaxBenefitAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const propertyValue = inputs.propertyValue as number;
  const easementValue = outputs.charitableDeduction as number;
  const acres = inputs.acres as number;
  const easementAcres = inputs.easementAcres as number;
  const easementType = inputs.easementType as string;
  const totalTaxSavings = outputs.totalTaxSavings as number;
  const netBenefit = outputs.netBenefit as number;
  const benefitCostRatio = outputs.benefitCostRatio as number;
  const carryforwardYears = outputs.carryforwardYears as number;
  
  let analysis = `## Conservation Easement Tax Benefit Analysis\n\n`;
  
  analysis += `### Property Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Total Acres**: ${acres.toLocaleString()}\n`;
  analysis += `- **Easement Acres**: ${easementAcres.toLocaleString()}\n`;
  analysis += `- **Property Value**: $${propertyValue.toLocaleString()}\n`;
  analysis += `- **Easement Type**: ${easementType.charAt(0).toUpperCase() + easementType.slice(1)}\n\n`;
  
  analysis += `### Tax Benefits Summary\n`;
  analysis += `- **Charitable Deduction**: $${easementValue.toLocaleString()}\n`;
  analysis += `- **Federal Tax Savings**: $${(outputs.federalTaxSavings as number).toLocaleString()}\n`;
  analysis += `- **State Tax Savings**: $${(outputs.stateTaxSavings as number).toLocaleString()}\n`;
  analysis += `- **Total Tax Savings**: $${totalTaxSavings.toLocaleString()}\n`;
  analysis += `- **Net Benefit**: $${netBenefit.toLocaleString()}\n\n`;
  
  analysis += `### Deduction Utilization\n`;
  analysis += `- **Annual Deduction Limit**: $${(outputs.deductionLimit as number).toLocaleString()}\n`;
  analysis += `- **Carryforward Amount**: $${(outputs.carryforwardAmount as number).toLocaleString()}\n`;
  analysis += `- **Carryforward Years**: ${carryforwardYears}\n`;
  analysis += `- **Annual Tax Savings**: $${(outputs.annualTaxSavings as number).toLocaleString()}\n\n`;
  
  analysis += `### Financial Metrics\n`;
  analysis += `- **Benefit-Cost Ratio**: ${benefitCostRatio}\n`;
  analysis += `- **Easement Value per Acre**: $${(outputs.easementValuePerAcre as number).toLocaleString()}\n`;
  analysis += `- **Property Value Reduction**: ${outputs.propertyValueReduction as number}%\n`;
  analysis += `- **Estate Tax Benefit**: $${(outputs.estateTaxBenefit as number).toLocaleString()}\n`;
  analysis += `- **Transaction Costs**: $${(outputs.transactionCosts as number).toLocaleString()}\n\n`;
  
  analysis += `### Conservation Impact\n`;
  analysis += `- **Development Rights Extinguished**: ${(inputs.developmentRights as string[]).join(', ')}\n`;
  analysis += `- **Public Access**: ${(inputs.publicAccess as string).charAt(0).toUpperCase() + (inputs.publicAccess as string).slice(1)}\n`;
  analysis += `- **Conservation Purposes**: ${(inputs.conservationPurpose as string[]).join(', ')}\n`;
  analysis += `- **Easement Duration**: ${inputs.easementDuration as number} years\n\n`;
  
  analysis += `### Financial Assessment\n`;
  if (benefitCostRatio >= 5) {
    analysis += `**Exceptional Value**: This easement provides exceptional tax benefits with a very high benefit-cost ratio.\n`;
  } else if (benefitCostRatio >= 3) {
    analysis += `**Strong Value**: This easement provides strong tax benefits with a good benefit-cost ratio.\n`;
  } else if (benefitCostRatio >= 2) {
    analysis += `**Moderate Value**: This easement provides moderate tax benefits with an acceptable benefit-cost ratio.\n`;
  } else {
    analysis += `**Limited Value**: This easement provides limited tax benefits - consider transaction costs carefully.\n`;
  }
  
  if (carryforwardYears === 0) {
    analysis += `**Immediate Benefits**: Full deduction utilization in the current tax year.\n`;
  } else if (carryforwardYears <= 2) {
    analysis += `**Reasonable Timeline**: Benefits spread over a reasonable carryforward period.\n`;
  } else {
    analysis += `**Extended Timeline**: Benefits spread over an extended period - consider timing.\n`;
  }
  
  analysis += `\n### Recommendations\n`;
  analysis += `1. **Professional Appraisal**: Ensure qualified appraisal supports easement value\n`;
  analysis += `2. **Legal Review**: Have conservation easement reviewed by qualified attorney\n`;
  analysis += `3. **Tax Planning**: Coordinate with tax advisor for optimal deduction timing\n`;
  analysis += `4. **Monitoring**: Establish monitoring program for easement compliance\n`;
  analysis += `5. **Documentation**: Maintain complete records for IRS compliance\n`;
  
  analysis += `\n### Conservation Impact\n`;
  analysis += `${outputs.easementAnalysis as string}\n`;
  
  return analysis;
}
