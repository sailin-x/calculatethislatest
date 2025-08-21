import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factors and adjustments
const MARKET_ADJUSTMENTS = {
  constructionQuality: {
    basic: 0.9,
    standard: 1.0,
    premium: 1.2,
    luxury: 1.5
  },
  location: {
    suburban: 0.9,
    urban: 1.0,
    downtown: 1.15,
    prime: 1.3
  },
  buildingClass: {
    classC: 0.8,
    classB: 1.0,
    classA: 1.2,
    trophy: 1.4
  }
};

const RISK_FACTORS = {
  low: 0.8,
  medium: 1.0,
  high: 1.3
};

export function calculateTenantImprovement(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values
  const spaceSize = inputs.spaceSize as number;
  const leaseTerm = inputs.leaseTerm as number;
  const baseRent = inputs.baseRent as number;
  const tiAllowance = inputs.tiAllowance as number;
  const constructionCosts = inputs.constructionCosts as number;
  const designFees = inputs.designFees as number;
  const permits = inputs.permits as number;
  const furniture = inputs.furniture as number;
  const technology = inputs.technology as number;
  const contingency = inputs.contingency as number;
  const amortizationPeriod = inputs.amortizationPeriod as number;
  const interestRate = inputs.interestRate as number;
  const tenantContribution = inputs.tenantContribution as number;
  const landlordContribution = inputs.landlordContribution as number;
  const rentEscalation = inputs.rentEscalation as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const taxRate = inputs.taxRate as number;
  const depreciationPeriod = inputs.depreciationPeriod as number;
  const analysisPeriod = inputs.analysisPeriod as number;

  // Calculate total TI costs
  const constructionCostsTotal = spaceSize * constructionCosts;
  const totalDirectCosts = constructionCostsTotal + designFees + permits + furniture + technology;
  const contingencyAmount = totalDirectCosts * (contingency / 100);
  const totalTICosts = totalDirectCosts + contingencyAmount;

  // Calculate TI allowance and tenant out-of-pocket
  const tiAllowanceAmount = spaceSize * tiAllowance + landlordContribution;
  const tenantOutOfPocket = Math.max(0, totalTICosts - tiAllowanceAmount + tenantContribution);

  // Calculate TI rent amortization
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = amortizationPeriod * 12;
  const monthlyTIRent = totalTICosts * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  const annualTIRent = monthlyTIRent * 12;

  // Calculate effective rent
  const baseRentTotal = spaceSize * baseRent;
  const effectiveRent = baseRentTotal + annualTIRent;

  // Calculate total lease cost over analysis period
  let totalLeaseCost = 0;
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedRent = baseRentTotal * Math.pow(1 + rentEscalation / 100, year - 1);
    const operatingCosts = spaceSize * operatingExpenses * Math.pow(1 + rentEscalation / 100, year - 1);
    totalLeaseCost += escalatedRent + annualTIRent + operatingCosts;
  }

  // Calculate present value
  const discountRate = interestRate / 100;
  let presentValue = -tenantOutOfPocket;
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedRent = baseRentTotal * Math.pow(1 + rentEscalation / 100, year - 1);
    const operatingCosts = spaceSize * operatingExpenses * Math.pow(1 + rentEscalation / 100, year - 1);
    const annualCost = escalatedRent + annualTIRent + operatingCosts;
    presentValue += annualCost / Math.pow(1 + discountRate, year);
  }

  // Calculate break-even analysis
  const breakEvenYears = calculateBreakEvenYears(tenantOutOfPocket, annualTIRent, rentEscalation);

  // Calculate ROI
  const totalBenefits = calculateTotalBenefits(inputs, analysisPeriod);
  const roi = ((totalBenefits - tenantOutOfPocket) / tenantOutOfPocket) * 100;

  // Calculate cost-benefit ratio
  const costBenefitRatio = totalBenefits / tenantOutOfPocket;

  // Calculate NPV and IRR
  const netPresentValue = calculateNPV(inputs, tenantOutOfPocket, analysisPeriod);
  const internalRateOfReturn = calculateIRR(tenantOutOfPocket, inputs, analysisPeriod);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(tenantOutOfPocket, annualTIRent, rentEscalation);

  // Calculate depreciation and tax benefits
  const annualDepreciation = totalTICosts / depreciationPeriod;
  const taxSavings = annualDepreciation * (taxRate / 100);
  const afterTaxCost = tenantOutOfPocket - (taxSavings * Math.min(analysisPeriod, depreciationPeriod));

  // Calculate scoring metrics
  const valueScore = calculateValueScore(inputs, totalTICosts, tiAllowanceAmount, roi);
  const riskScore = calculateRiskScore(inputs, tenantOutOfPocket, breakEvenYears, costBenefitRatio);

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    totalTICosts,
    tiAllowanceAmount,
    tenantOutOfPocket,
    monthlyTIRent,
    annualTIRent,
    effectiveRent,
    totalLeaseCost,
    presentValue,
    breakEvenYears,
    roi,
    costBenefitRatio,
    netPresentValue,
    internalRateOfReturn,
    paybackPeriod,
    annualDepreciation,
    taxSavings,
    afterTaxCost,
    valueScore,
    riskScore,
    recommendation: ''
  });

  return {
    totalTICosts: Math.round(totalTICosts * 100) / 100,
    tiAllowanceAmount: Math.round(tiAllowanceAmount * 100) / 100,
    tenantOutOfPocket: Math.round(tenantOutOfPocket * 100) / 100,
    monthlyTIRent: Math.round(monthlyTIRent * 100) / 100,
    annualTIRent: Math.round(annualTIRent * 100) / 100,
    effectiveRent: Math.round(effectiveRent * 100) / 100,
    totalLeaseCost: Math.round(totalLeaseCost * 100) / 100,
    presentValue: Math.round(presentValue * 100) / 100,
    breakEvenYears: Math.round(breakEvenYears * 100) / 100,
    roi: Math.round(roi * 100) / 100,
    costBenefitRatio: Math.round(costBenefitRatio * 100) / 100,
    netPresentValue: Math.round(netPresentValue * 100) / 100,
    internalRateOfReturn: Math.round(internalRateOfReturn * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    annualDepreciation: Math.round(annualDepreciation * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100,
    afterTaxCost: Math.round(afterTaxCost * 100) / 100,
    valueScore: Math.round(valueScore),
    riskScore: Math.round(riskScore),
    recommendation: recommendation
  };
}

function calculateBreakEvenYears(tenantOutOfPocket: number, annualTIRent: number, rentEscalation: number): number {
  if (annualTIRent <= 0) return 999; // Never break even
  
  let cumulativeSavings = 0;
  let year = 0;
  
  while (cumulativeSavings < tenantOutOfPocket && year < 50) {
    year++;
    const savingsThisYear = annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1);
    cumulativeSavings += savingsThisYear;
  }
  
  if (cumulativeSavings >= tenantOutOfPocket) {
    const remainingAmount = tenantOutOfPocket - (cumulativeSavings - annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1));
    const partialYear = remainingAmount / (annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1));
    return year - 1 + partialYear;
  }
  
  return 999; // Never break even
}

function calculateTotalBenefits(inputs: CalculatorInputs, analysisPeriod: number): number {
  const spaceSize = inputs.spaceSize as number;
  const baseRent = inputs.baseRent as number;
  const rentEscalation = inputs.rentEscalation as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const leaseTerm = inputs.leaseTerm as number;
  
  let totalBenefits = 0;
  const baseRentTotal = spaceSize * baseRent;
  
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedRent = baseRentTotal * Math.pow(1 + rentEscalation / 100, year - 1);
    const operatingCosts = spaceSize * operatingExpenses * Math.pow(1 + rentEscalation / 100, year - 1);
    totalBenefits += escalatedRent - operatingCosts;
  }
  
  return totalBenefits;
}

function calculateNPV(inputs: CalculatorInputs, tenantOutOfPocket: number, analysisPeriod: number): number {
  const spaceSize = inputs.spaceSize as number;
  const baseRent = inputs.baseRent as number;
  const rentEscalation = inputs.rentEscalation as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const leaseTerm = inputs.leaseTerm as number;
  const interestRate = inputs.interestRate as number;
  const annualTIRent = (inputs.spaceSize as number) * (inputs.tiAllowance as number) + (inputs.landlordContribution as number);
  
  const discountRate = interestRate / 100;
  let npv = -tenantOutOfPocket;
  const baseRentTotal = spaceSize * baseRent;
  
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedRent = baseRentTotal * Math.pow(1 + rentEscalation / 100, year - 1);
    const operatingCosts = spaceSize * operatingExpenses * Math.pow(1 + rentEscalation / 100, year - 1);
    const annualCost = escalatedRent + annualTIRent + operatingCosts;
    npv += annualCost / Math.pow(1 + discountRate, year);
  }
  
  return npv;
}

function calculateIRR(tenantOutOfPocket: number, inputs: CalculatorInputs, analysisPeriod: number): number {
  // Simplified IRR calculation using trial and error
  let rate = 0.1; // Start with 10%
  let npv = -tenantOutOfPocket;
  
  const spaceSize = inputs.spaceSize as number;
  const baseRent = inputs.baseRent as number;
  const rentEscalation = inputs.rentEscalation as number;
  const operatingExpenses = inputs.operatingExpenses as number;
  const leaseTerm = inputs.leaseTerm as number;
  const annualTIRent = spaceSize * (inputs.tiAllowance as number) + (inputs.landlordContribution as number);
  const baseRentTotal = spaceSize * baseRent;
  
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedRent = baseRentTotal * Math.pow(1 + rentEscalation / 100, year - 1);
    const operatingCosts = spaceSize * operatingExpenses * Math.pow(1 + rentEscalation / 100, year - 1);
    const annualCost = escalatedRent + annualTIRent + operatingCosts;
    npv += annualCost / Math.pow(1 + rate, year);
  }
  
  // Simple adjustment based on NPV
  if (npv > 0) {
    rate += 0.02;
  } else {
    rate -= 0.02;
  }
  
  return Math.max(0, Math.min(1, rate)); // Clamp between 0% and 100%
}

function calculatePaybackPeriod(tenantOutOfPocket: number, annualTIRent: number, rentEscalation: number): number {
  if (annualTIRent <= 0) return 999; // Never payback
  
  let cumulativeCashFlow = 0;
  let year = 0;
  
  while (cumulativeCashFlow < tenantOutOfPocket && year < 50) {
    year++;
    const cashFlowThisYear = annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1);
    cumulativeCashFlow += cashFlowThisYear;
  }
  
  if (cumulativeCashFlow >= tenantOutOfPocket) {
    const remainingAmount = tenantOutOfPocket - (cumulativeCashFlow - annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1));
    const partialYear = remainingAmount / (annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1));
    return year - 1 + partialYear;
  }
  
  return 999; // Never payback
}

function calculateValueScore(inputs: CalculatorInputs, totalTICosts: number, tiAllowanceAmount: number, roi: number): number {
  let score = 0;
  
  // TI allowance coverage scoring (0-30 points)
  const coverageRatio = tiAllowanceAmount / totalTICosts;
  if (coverageRatio >= 1.0) score += 30;
  else if (coverageRatio >= 0.8) score += 25;
  else if (coverageRatio >= 0.6) score += 20;
  else if (coverageRatio >= 0.4) score += 15;
  else if (coverageRatio >= 0.2) score += 10;
  else if (coverageRatio >= 0.1) score += 5;
  
  // ROI scoring (0-30 points)
  if (roi >= 50) score += 30;
  else if (roi >= 30) score += 25;
  else if (roi >= 20) score += 20;
  else if (roi >= 10) score += 15;
  else if (roi >= 5) score += 10;
  else if (roi >= 0) score += 5;
  
  // Cost per square foot scoring (0-20 points)
  const costPerSqFt = totalTICosts / (inputs.spaceSize as number);
  if (costPerSqFt <= 25) score += 20;
  else if (costPerSqFt <= 35) score += 15;
  else if (costPerSqFt <= 45) score += 10;
  else if (costPerSqFt <= 60) score += 5;
  
  // Lease term alignment scoring (0-20 points)
  const amortizationPeriod = inputs.amortizationPeriod as number;
  const leaseTerm = inputs.leaseTerm as number;
  if (amortizationPeriod <= leaseTerm) score += 20;
  else if (amortizationPeriod <= leaseTerm + 1) score += 15;
  else if (amortizationPeriod <= leaseTerm + 2) score += 10;
  else if (amortizationPeriod <= leaseTerm + 3) score += 5;
  
  return Math.min(100, score);
}

function calculateRiskScore(inputs: CalculatorInputs, tenantOutOfPocket: number, breakEvenYears: number, costBenefitRatio: number): number {
  let score = 100; // Start with perfect score, subtract for risks
  
  // Tenant out-of-pocket risk (0-30 points deducted)
  const spaceSize = inputs.spaceSize as number;
  const costPerSqFt = tenantOutOfPocket / spaceSize;
  if (costPerSqFt > 50) score -= 30;
  else if (costPerSqFt > 35) score -= 20;
  else if (costPerSqFt > 25) score -= 15;
  else if (costPerSqFt > 15) score -= 10;
  
  // Break-even risk (0-25 points deducted)
  if (breakEvenYears > 10) score -= 25;
  else if (breakEvenYears > 7) score -= 20;
  else if (breakEvenYears > 5) score -= 15;
  else if (breakEvenYears > 3) score -= 10;
  
  // Cost-benefit ratio risk (0-25 points deducted)
  if (costBenefitRatio < 1.0) score -= 25;
  else if (costBenefitRatio < 1.5) score -= 20;
  else if (costBenefitRatio < 2.0) score -= 15;
  else if (costBenefitRatio < 2.5) score -= 10;
  
  // Lease term risk (0-20 points deducted)
  const leaseTerm = inputs.leaseTerm as number;
  if (leaseTerm < 3) score -= 20;
  else if (leaseTerm < 5) score -= 15;
  else if (leaseTerm < 7) score -= 10;
  else if (leaseTerm < 10) score -= 5;
  
  return Math.max(0, score);
}

function generateRecommendation(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const recommendations = [];
  
  // Cost coverage recommendations
  if (outputs.tenantOutOfPocket > 0) {
    recommendations.push("💰 **Cost Gap**: Tenant will need to contribute additional funds. Consider negotiating higher TI allowance.");
  } else {
    recommendations.push("✅ **Good Coverage**: TI allowance covers all costs with surplus.");
  }
  
  // ROI recommendations
  if (outputs.roi >= 20) {
    recommendations.push("📈 **Strong ROI**: Excellent return on TI investment.");
  } else if (outputs.roi >= 10) {
    recommendations.push("📊 **Moderate ROI**: Reasonable return on investment.");
  } else if (outputs.roi >= 0) {
    recommendations.push("⚠️ **Low ROI**: Consider renegotiating terms or reducing scope.");
  } else {
    recommendations.push("❌ **Negative ROI**: This investment may not be financially viable.");
  }
  
  // Break-even recommendations
  if (outputs.breakEvenYears <= 3) {
    recommendations.push("⚡ **Quick Payback**: Investment will pay for itself quickly.");
  } else if (outputs.breakEvenYears <= 5) {
    recommendations.push("📅 **Reasonable Payback**: Standard payback period.");
  } else if (outputs.breakEvenYears <= 10) {
    recommendations.push("⏳ **Long Payback**: Extended period to recover investment.");
  } else {
    recommendations.push("🚨 **Very Long Payback**: Consider if this investment aligns with business goals.");
  }
  
  // Value recommendations
  if (outputs.valueScore >= 80) {
    recommendations.push("💎 **Excellent Value**: Highly favorable TI terms.");
  } else if (outputs.valueScore >= 60) {
    recommendations.push("👍 **Good Value**: Reasonable TI arrangement.");
  } else {
    recommendations.push("⚠️ **Poor Value**: Consider renegotiating or exploring alternatives.");
  }
  
  // Risk recommendations
  if (outputs.riskScore < 60) {
    recommendations.push("⚠️ **High Risk**: Significant investment risks. Consider mitigation strategies.");
  } else if (outputs.riskScore >= 80) {
    recommendations.push("🛡️ **Low Risk**: Investment appears well-structured.");
  }
  
  return recommendations.join('\n\n');
}

function generateCostBreakdown(inputs: CalculatorInputs): any[] {
  const spaceSize = inputs.spaceSize as number;
  const constructionCosts = inputs.constructionCosts as number;
  const designFees = inputs.designFees as number;
  const permits = inputs.permits as number;
  const furniture = inputs.furniture as number;
  const technology = inputs.technology as number;
  const contingency = inputs.contingency as number;
  
  const constructionCostsTotal = spaceSize * constructionCosts;
  const totalDirectCosts = constructionCostsTotal + designFees + permits + furniture + technology;
  const contingencyAmount = totalDirectCosts * (contingency / 100);
  
  return [
    { category: 'Construction', amount: constructionCostsTotal, percentage: (constructionCostsTotal / totalDirectCosts) * 100 },
    { category: 'Design Fees', amount: designFees, percentage: (designFees / totalDirectCosts) * 100 },
    { category: 'Permits', amount: permits, percentage: (permits / totalDirectCosts) * 100 },
    { category: 'Furniture & Fixtures', amount: furniture, percentage: (furniture / totalDirectCosts) * 100 },
    { category: 'Technology', amount: technology, percentage: (technology / totalDirectCosts) * 100 },
    { category: 'Contingency', amount: contingencyAmount, percentage: contingency }
  ];
}

function generateCashFlowProjection(inputs: CalculatorInputs, outputs: CalculatorOutputs): any[] {
  const projection = [];
  const rentEscalation = inputs.rentEscalation as number;
  const analysisPeriod = inputs.analysisPeriod as number;
  const leaseTerm = inputs.leaseTerm as number;
  
  for (let year = 1; year <= Math.min(analysisPeriod, leaseTerm); year++) {
    const escalatedTIRent = outputs.annualTIRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const cumulativeCost = year === 1 ? outputs.tenantOutOfPocket : 0;
    const netCashFlow = escalatedTIRent - cumulativeCost;
    
    projection.push({
      year,
      tiRent: Math.round(escalatedTIRent * 100) / 100,
      cumulativeCost: Math.round(cumulativeCost * 100) / 100,
      netCashFlow: Math.round(netCashFlow * 100) / 100
    });
  }
  
  return projection;
}

export function generateTenantImprovementAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const costBreakdown = generateCostBreakdown(inputs);
  const cashFlowProjection = generateCashFlowProjection(inputs, outputs);
  
  return `# Tenant Improvement (TI) Allowance Analysis

## Executive Summary
This analysis evaluates the financial impact of tenant improvements for a ${inputs.spaceSize?.toLocaleString()} sq ft commercial space with a ${inputs.leaseTerm}-year lease.

### Key Metrics
- **Total TI Costs**: $${outputs.totalTICosts?.toLocaleString()}
- **TI Allowance**: $${outputs.tiAllowanceAmount?.toLocaleString()}
- **Tenant Out-of-Pocket**: $${outputs.tenantOutOfPocket?.toLocaleString()}
- **ROI**: ${outputs.roi}%
- **Break-Even**: ${outputs.breakEvenYears} years

## Cost Analysis

### Total Costs
- **Construction Costs**: $${(inputs.spaceSize as number * inputs.constructionCosts as number)?.toLocaleString()}
- **Design Fees**: $${inputs.designFees?.toLocaleString()}
- **Permits**: $${inputs.permits?.toLocaleString()}
- **Furniture & Fixtures**: $${inputs.furniture?.toLocaleString()}
- **Technology**: $${inputs.technology?.toLocaleString()}
- **Contingency (${inputs.contingency}%)**: $${(outputs.totalTICosts - (inputs.spaceSize as number * inputs.constructionCosts as number + inputs.designFees + inputs.permits + inputs.furniture + inputs.technology))?.toLocaleString()}

### Cost Breakdown

| Category | Amount | Percentage |
|----------|--------|------------|
${costBreakdown.map(c => `| ${c.category} | $${c.amount?.toLocaleString()} | ${c.percentage.toFixed(1)}% |`).join('\n')}

## Financial Impact

### Rent Structure
- **Base Rent**: $${inputs.baseRent}/sq ft/year
- **TI Rent**: $${outputs.annualTIRent?.toLocaleString()}/year
- **Effective Rent**: $${outputs.effectiveRent?.toLocaleString()}/year
- **Monthly TI Rent**: $${outputs.monthlyTIRent?.toLocaleString()}

### Investment Analysis
- **Total Lease Cost**: $${outputs.totalLeaseCost?.toLocaleString()}
- **Present Value**: $${outputs.presentValue?.toLocaleString()}
- **Net Present Value**: $${outputs.netPresentValue?.toLocaleString()}
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Payback Period**: ${outputs.paybackPeriod} years

### Tax Benefits
- **Annual Depreciation**: $${outputs.annualDepreciation?.toLocaleString()}
- **Annual Tax Savings**: $${outputs.taxSavings?.toLocaleString()}
- **After-Tax Cost**: $${outputs.afterTaxCost?.toLocaleString()}

## Cash Flow Projection

| Year | TI Rent | Cumulative Cost | Net Cash Flow |
|------|---------|-----------------|---------------|
${cashFlowProjection.map(p => `| ${p.year} | $${p.tiRent?.toLocaleString()} | $${p.cumulativeCost?.toLocaleString()} | $${p.netCashFlow?.toLocaleString()} |`).join('\n')}

## Assessment Scores
- **Value Score**: ${outputs.valueScore}/100
- **Risk Score**: ${outputs.riskScore}/100

## Recommendations

${outputs.recommendation}

## Lease Terms Analysis
- **Lease Term**: ${inputs.leaseTerm} years
- **TI Amortization**: ${inputs.amortizationPeriod} years
- **Interest Rate**: ${inputs.interestRate}%
- **Annual Rent Escalation**: ${inputs.rentEscalation}%
- **Operating Expenses**: $${inputs.operatingExpenses}/sq ft/year

## Investment Decision
Based on the analysis:
- **Overall Assessment**: ${outputs.valueScore >= 70 && outputs.riskScore >= 70 ? 'Favorable investment opportunity' : 'Consider renegotiating terms'}
- **Recommendation**: ${outputs.roi >= 15 ? 'Proceed with TI investment' : 'Reconsider scope or terms'}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
`;
}
