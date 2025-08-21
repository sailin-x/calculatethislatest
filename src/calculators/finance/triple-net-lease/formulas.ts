import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Tenant credit rating factors
const TENANT_CREDIT_FACTORS = {
  aaa: { riskMultiplier: 0.8, rentPremium: 1.05, capRateAdjustment: -0.5 },
  aa: { riskMultiplier: 0.85, rentPremium: 1.03, capRateAdjustment: -0.3 },
  a: { riskMultiplier: 0.9, rentPremium: 1.02, capRateAdjustment: -0.2 },
  bbb: { riskMultiplier: 1.0, rentPremium: 1.0, capRateAdjustment: 0 },
  bb: { riskMultiplier: 1.1, rentPremium: 0.98, capRateAdjustment: 0.2 },
  b: { riskMultiplier: 1.2, rentPremium: 0.95, capRateAdjustment: 0.5 },
  ccc: { riskMultiplier: 1.4, rentPremium: 0.9, capRateAdjustment: 1.0 }
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  retail: { vacancyRisk: 1.0, appreciationMultiplier: 1.0, capRateAdjustment: 0 },
  office: { vacancyRisk: 1.1, appreciationMultiplier: 0.9, capRateAdjustment: 0.2 },
  industrial: { vacancyRisk: 0.9, appreciationMultiplier: 1.1, capRateAdjustment: -0.2 },
  medical: { vacancyRisk: 0.8, appreciationMultiplier: 1.2, capRateAdjustment: -0.3 },
  restaurant: { vacancyRisk: 1.2, appreciationMultiplier: 0.8, capRateAdjustment: 0.4 },
  bank: { vacancyRisk: 0.7, appreciationMultiplier: 1.1, capRateAdjustment: -0.2 },
  pharmacy: { vacancyRisk: 0.8, appreciationMultiplier: 1.1, capRateAdjustment: -0.2 },
  convenience: { vacancyRisk: 0.9, appreciationMultiplier: 1.0, capRateAdjustment: 0 },
  other: { vacancyRisk: 1.0, appreciationMultiplier: 1.0, capRateAdjustment: 0 }
};

export function calculateTripleNetLeaseROI(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values
  const propertyValue = inputs.propertyValue as number;
  const downPayment = inputs.downPayment as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const annualRent = inputs.annualRent as number;
  const propertyTaxes = inputs.propertyTaxes as number;
  const insurance = inputs.insurance as number;
  const maintenance = inputs.maintenance as number;
  const propertyManagement = inputs.propertyManagement as number;
  const vacancyRate = inputs.vacancyRate as number;
  const appreciationRate = inputs.appreciationRate as number;
  const rentEscalation = inputs.rentEscalation as number;
  const leaseTerm = inputs.leaseTerm as number;
  const tenantCreditRating = inputs.tenantCreditRating as string;
  const propertyType = inputs.propertyType as string;
  const analysisPeriod = inputs.analysisPeriod as number;
  const closingCosts = inputs.closingCosts as number;
  const exitCapRate = inputs.exitCapRate as number;

  // Calculate loan amount and monthly payment
  const loanAmount = propertyValue - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // Apply tenant credit and property type adjustments
  const tenantFactors = TENANT_CREDIT_FACTORS[tenantCreditRating as keyof typeof TENANT_CREDIT_FACTORS] || TENANT_CREDIT_FACTORS.bbb;
  const propertyFactors = PROPERTY_TYPE_FACTORS[propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || PROPERTY_TYPE_FACTORS.other;
  
  const adjustedVacancyRate = vacancyRate * propertyFactors.vacancyRisk;
  const adjustedAppreciationRate = appreciationRate * propertyFactors.appreciationMultiplier;
  const adjustedExitCapRate = exitCapRate + tenantFactors.capRateAdjustment + propertyFactors.capRateAdjustment;

  // Calculate effective rent (accounting for vacancy and tenant credit)
  const effectiveRent = annualRent * (1 - adjustedVacancyRate / 100) * tenantFactors.rentPremium;

  // Calculate Net Operating Income (NOI)
  // In NNN leases, tenant pays taxes, insurance, and maintenance
  const propertyManagementFee = effectiveRent * (propertyManagement / 100);
  const netOperatingIncome = effectiveRent - propertyManagementFee;

  // Calculate cash flow
  const cashFlow = netOperatingIncome - annualDebtService;

  // Calculate key metrics
  const cashOnCashReturn = (cashFlow / (downPayment + closingCosts)) * 100;
  const capRate = (netOperatingIncome / propertyValue) * 100;
  const debtServiceCoverage = netOperatingIncome / annualDebtService;

  // Calculate break-even occupancy
  const breakEvenOccupancy = ((annualDebtService + propertyManagementFee) / annualRent) * 100;

  // Calculate projected property value and total return
  const projectedValue = propertyValue * Math.pow(1 + adjustedAppreciationRate / 100, analysisPeriod);
  const totalReturn = projectedValue - propertyValue + (cashFlow * analysisPeriod);
  const totalROI = (totalReturn / (downPayment + closingCosts)) * 100;

  // Calculate NPV and IRR
  const discountRate = interestRate / 100;
  let npv = -(downPayment + closingCosts);
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const escalatedRent = annualRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const escalatedEffectiveRent = escalatedRent * (1 - adjustedVacancyRate / 100) * tenantFactors.rentPremium;
    const escalatedNOI = escalatedEffectiveRent - (escalatedEffectiveRent * propertyManagement / 100);
    const escalatedCashFlow = escalatedNOI - annualDebtService;
    
    npv += escalatedCashFlow / Math.pow(1 + discountRate, year);
  }
  npv += projectedValue / Math.pow(1 + discountRate, analysisPeriod);

  const irr = calculateIRR(downPayment + closingCosts, analysisPeriod, annualRent, rentEscalation, adjustedVacancyRate, 
                         tenantFactors, propertyManagement, annualDebtService, projectedValue);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(downPayment + closingCosts, cashFlow, rentEscalation, analysisPeriod);

  // Calculate annualized return
  const annualizedReturn = Math.pow((totalReturn + downPayment + closingCosts) / (downPayment + closingCosts), 1 / analysisPeriod) - 1;
  const annualizedReturnPercent = annualizedReturn * 100;

  // Calculate scoring metrics
  const tenantRiskScore = calculateTenantRiskScore(tenantCreditRating, leaseTerm, debtServiceCoverage, adjustedVacancyRate);
  const investmentScore = calculateInvestmentScore(cashOnCashReturn, totalROI, irr, paybackPeriod, annualizedReturnPercent, capRate);

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    cashOnCashReturn,
    totalROI,
    debtServiceCoverage,
    tenantRiskScore,
    investmentScore,
    capRate,
    breakEvenOccupancy,
    recommendation: ''
  });

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    annualDebtService: Math.round(annualDebtService * 100) / 100,
    netOperatingIncome: Math.round(netOperatingIncome * 100) / 100,
    cashFlow: Math.round(cashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    totalROI: Math.round(totalROI * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    projectedValue: Math.round(projectedValue * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualizedReturnPercent * 100) / 100,
    tenantRiskScore: Math.round(tenantRiskScore),
    investmentScore: Math.round(investmentScore),
    recommendation: recommendation
  };
}

function calculateIRR(initialInvestment: number, analysisPeriod: number, annualRent: number, rentEscalation: number, 
                     vacancyRate: number, tenantFactors: any, propertyManagement: number, annualDebtService: number, 
                     projectedValue: number): number {
  // Simplified IRR calculation using trial and error
  let rate = 0.1; // Start with 10%
  let npv = -initialInvestment;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const escalatedRent = annualRent * Math.pow(1 + rentEscalation / 100, year - 1);
    const escalatedEffectiveRent = escalatedRent * (1 - vacancyRate / 100) * tenantFactors.rentPremium;
    const escalatedNOI = escalatedEffectiveRent - (escalatedEffectiveRent * propertyManagement / 100);
    const escalatedCashFlow = escalatedNOI - annualDebtService;
    
    npv += escalatedCashFlow / Math.pow(1 + rate, year);
  }
  npv += projectedValue / Math.pow(1 + rate, analysisPeriod);
  
  // Simple adjustment based on NPV
  if (npv > 0) {
    rate += 0.02;
  } else {
    rate -= 0.02;
  }
  
  return Math.max(0, Math.min(1, rate)); // Clamp between 0% and 100%
}

function calculatePaybackPeriod(initialInvestment: number, initialCashFlow: number, rentEscalation: number, analysisPeriod: number): number {
  let cumulativeCashFlow = 0;
  let year = 0;
  
  while (cumulativeCashFlow < initialInvestment && year < analysisPeriod) {
    year++;
    const escalatedCashFlow = initialCashFlow * Math.pow(1 + rentEscalation / 100, year - 1);
    cumulativeCashFlow += escalatedCashFlow;
  }
  
  if (cumulativeCashFlow >= initialInvestment) {
    const remainingAmount = initialInvestment - (cumulativeCashFlow - initialCashFlow * Math.pow(1 + rentEscalation / 100, year - 1));
    const lastCashFlow = initialCashFlow * Math.pow(1 + rentEscalation / 100, year - 1);
    const partialYear = remainingAmount / lastCashFlow;
    return year - 1 + partialYear;
  }
  
  return 999; // Never payback
}

function calculateTenantRiskScore(tenantCreditRating: string, leaseTerm: number, debtServiceCoverage: number, vacancyRate: number): number {
  let score = 100; // Start with perfect score, subtract for risks
  
  // Tenant credit risk (0-40 points deducted)
  const creditRiskDeductions = {
    aaa: 0, aa: 5, a: 10, bbb: 20, bb: 30, b: 40, ccc: 50
  };
  score -= creditRiskDeductions[tenantCreditRating as keyof typeof creditRiskDeductions] || 20;
  
  // Lease term risk (0-25 points deducted)
  if (leaseTerm < 3) score -= 25;
  else if (leaseTerm < 5) score -= 20;
  else if (leaseTerm < 10) score -= 15;
  else if (leaseTerm < 15) score -= 10;
  else if (leaseTerm < 20) score -= 5;
  
  // Debt service coverage risk (0-20 points deducted)
  if (debtServiceCoverage < 1.0) score -= 20;
  else if (debtServiceCoverage < 1.2) score -= 15;
  else if (debtServiceCoverage < 1.3) score -= 10;
  else if (debtServiceCoverage < 1.5) score -= 5;
  
  // Vacancy risk (0-15 points deducted)
  if (vacancyRate > 15) score -= 15;
  else if (vacancyRate > 10) score -= 10;
  else if (vacancyRate > 5) score -= 5;
  
  return Math.max(0, score);
}

function calculateInvestmentScore(cashOnCashReturn: number, totalROI: number, irr: number, paybackPeriod: number, 
                                 annualizedReturn: number, capRate: number): number {
  let score = 0;
  
  // Cash-on-cash return scoring (0-25 points)
  if (cashOnCashReturn >= 8) score += 25;
  else if (cashOnCashReturn >= 6) score += 20;
  else if (cashOnCashReturn >= 4) score += 15;
  else if (cashOnCashReturn >= 2) score += 10;
  else if (cashOnCashReturn >= 0) score += 5;
  
  // Total ROI scoring (0-25 points)
  if (totalROI >= 150) score += 25;
  else if (totalROI >= 100) score += 20;
  else if (totalROI >= 75) score += 15;
  else if (totalROI >= 50) score += 10;
  else if (totalROI >= 25) score += 5;
  
  // IRR scoring (0-20 points)
  const irrPercent = irr * 100;
  if (irrPercent >= 12) score += 20;
  else if (irrPercent >= 10) score += 15;
  else if (irrPercent >= 8) score += 10;
  else if (irrPercent >= 6) score += 5;
  
  // Payback period scoring (0-15 points)
  if (paybackPeriod <= 5) score += 15;
  else if (paybackPeriod <= 8) score += 10;
  else if (paybackPeriod <= 12) score += 5;
  
  // Cap rate scoring (0-15 points)
  if (capRate >= 7) score += 15;
  else if (capRate >= 6) score += 10;
  else if (capRate >= 5) score += 5;
  
  return Math.min(100, score);
}

function generateRecommendation(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const recommendations = [];
  
  // Cash flow recommendations
  if (outputs.cashFlow < 0) {
    recommendations.push("⚠️ **Critical**: Negative cash flow detected. Consider larger down payment or renegotiate terms.");
  } else if (outputs.cashOnCashReturn < 4) {
    recommendations.push("📊 **Low Returns**: Cash-on-cash return below 4%. Consider alternative investments or renegotiate terms.");
  }
  
  // Debt service coverage recommendations
  if (outputs.debtServiceCoverage < 1.2) {
    recommendations.push("💳 **Tight Coverage**: Debt service coverage below 1.2x. Consider larger down payment or longer term.");
  }
  
  // Tenant risk recommendations
  if (outputs.tenantRiskScore < 60) {
    recommendations.push("👤 **High Tenant Risk**: Low tenant risk score indicates significant credit or lease term risks.");
  }
  
  // Investment quality recommendations
  if (outputs.investmentScore >= 80) {
    recommendations.push("✅ **Strong Investment**: High investment score indicates excellent potential returns.");
  } else if (outputs.investmentScore < 50) {
    recommendations.push("❌ **Poor Investment**: Low investment score suggests reconsidering this opportunity.");
  }
  
  // Cap rate recommendations
  if (outputs.capRate < 5) {
    recommendations.push("📉 **Low Cap Rate**: Cap rate below 5% may indicate overpriced property or low returns.");
  } else if (outputs.capRate > 8) {
    recommendations.push("📈 **High Cap Rate**: Cap rate above 8% may indicate higher risk or value-add opportunity.");
  }
  
  // Break-even occupancy recommendations
  if (outputs.breakEvenOccupancy > 90) {
    recommendations.push("⚠️ **High Break-Even**: Break-even occupancy above 90% leaves little margin for vacancy.");
  }
  
  // Property type specific recommendations
  const propertyType = inputs.propertyType as string;
  if (propertyType === 'medical' || propertyType === 'bank') {
    recommendations.push("🏥 **Stable Tenant**: Medical and bank properties typically offer stable, long-term tenants.");
  } else if (propertyType === 'restaurant') {
    recommendations.push("🍽️ **Restaurant Risk**: Restaurant properties may have higher tenant turnover risk.");
  }
  
  // Tenant credit specific recommendations
  const tenantCredit = inputs.tenantCreditRating as string;
  if (tenantCredit === 'aaa' || tenantCredit === 'aa') {
    recommendations.push("⭐ **Premium Tenant**: High credit rating tenant reduces risk and may command premium pricing.");
  } else if (tenantCredit === 'ccc') {
    recommendations.push("⚠️ **High Risk Tenant**: CCC credit rating indicates significant default risk.");
  }
  
  return recommendations.join('\n\n');
}

export function generateTripleNetLeaseROIAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Triple Net (NNN) Lease ROI Analysis

## Executive Summary
This analysis evaluates the financial performance of a ${inputs.propertyType} property with a ${inputs.tenantCreditRating.toUpperCase()} rated tenant under a triple net lease structure.

### Key Metrics
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Total ROI**: ${outputs.totalROI}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Debt Service Coverage**: ${outputs.debtServiceCoverage}x
- **Cap Rate**: ${outputs.capRate}%

## Financial Performance

### Investment Returns
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Total ROI**: ${outputs.totalROI}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Annualized Return**: ${outputs.annualizedReturn}%
- **Payback Period**: ${outputs.paybackPeriod} years

### Cash Flow Analysis
- **Net Operating Income**: $${outputs.netOperatingIncome?.toLocaleString()}
- **Annual Cash Flow**: $${outputs.cashFlow?.toLocaleString()}
- **Monthly Mortgage Payment**: $${outputs.monthlyPayment?.toLocaleString()}
- **Annual Debt Service**: $${outputs.annualDebtService?.toLocaleString()}

### Property Metrics
- **Cap Rate**: ${outputs.capRate}%
- **Break-Even Occupancy**: ${outputs.breakEvenOccupancy}%
- **Projected Property Value**: $${outputs.projectedValue?.toLocaleString()}
- **Total Return**: $${outputs.totalReturn?.toLocaleString()}

## Property Details
- **Property Type**: ${inputs.propertyType}
- **Property Value**: $${inputs.propertyValue?.toLocaleString()}
- **Tenant Credit Rating**: ${inputs.tenantCreditRating.toUpperCase()}
- **Lease Term**: ${inputs.leaseTerm} years
- **Analysis Period**: ${inputs.analysisPeriod} years

## Financial Terms
- **Down Payment**: $${inputs.downPayment?.toLocaleString()}
- **Loan Amount**: $${(inputs.propertyValue as number - inputs.downPayment as number)?.toLocaleString()}
- **Interest Rate**: ${inputs.interestRate}%
- **Loan Term**: ${inputs.loanTerm} years
- **Closing Costs**: $${inputs.closingCosts?.toLocaleString()}

## Lease Structure (NNN)
- **Annual Rent**: $${inputs.annualRent?.toLocaleString()}
- **Property Taxes**: $${inputs.propertyTaxes?.toLocaleString()} (paid by tenant)
- **Insurance**: $${inputs.insurance?.toLocaleString()} (paid by tenant)
- **Maintenance**: $${inputs.maintenance?.toLocaleString()} (paid by tenant)
- **Property Management**: ${inputs.propertyManagement}%

## Market Assumptions
- **Rent Escalation**: ${inputs.rentEscalation}%
- **Property Appreciation**: ${inputs.appreciationRate}%
- **Vacancy Rate**: ${inputs.vacancyRate}%
- **Exit Cap Rate**: ${inputs.exitCapRate}%

## Assessment Scores
- **Tenant Risk Score**: ${outputs.tenantRiskScore}/100
- **Investment Score**: ${outputs.investmentScore}/100

## NNN Lease Benefits
- **Triple Net Structure**: Tenant pays property taxes, insurance, and maintenance
- **Predictable Cash Flow**: Fixed rent with scheduled escalations
- **Reduced Management**: Minimal landlord responsibilities
- **Long-term Stability**: Typically longer lease terms than traditional leases

## Recommendations

${outputs.recommendation}

## Investment Decision
Based on the analysis:
- **Overall Score**: ${Math.round((outputs.tenantRiskScore + outputs.investmentScore) / 2)}/100
- **Recommendation**: ${outputs.investmentScore >= 70 ? 'Consider proceeding with investment' : 'Reconsider or renegotiate terms'}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
`;
}
