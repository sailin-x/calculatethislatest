import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factors and adjustments
const MARKET_ADJUSTMENTS = {
  occupancy: {
    excellent: 1.1,
    good: 1.0,
    average: 0.9,
    poor: 0.8
  },
  location: {
    urban: 1.15,
    suburban: 1.0,
    rural: 0.85,
    highway: 1.05
  },
  facilityType: {
    climate: 1.1,
    standard: 1.0,
    outdoor: 0.9
  }
};

const RISK_FACTORS = {
  low: 0.8,
  medium: 1.0,
  high: 1.2
};

export function calculateSelfStorageROI(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values
  const facilitySize = inputs.facilitySize as number;
  const unitCount = inputs.unitCount as number;
  const averageUnitSize = inputs.averageUnitSize as number;
  const purchasePrice = inputs.purchasePrice as number;
  const downPayment = inputs.downPayment as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const averageRentPerSqFt = inputs.averageRentPerSqFt as number;
  const occupancyRate = inputs.occupancyRate as number;
  const annualExpenses = inputs.annualExpenses as number;
  const propertyTaxes = inputs.propertyTaxes as number;
  const insurance = inputs.insurance as number;
  const utilities = inputs.utilities as number;
  const maintenance = inputs.maintenance as number;
  const managementFee = inputs.managementFee as number;
  const appreciationRate = inputs.appreciationRate as number;
  const analysisPeriod = inputs.analysisPeriod as number;
  const rentIncreaseRate = inputs.rentIncreaseRate as number;
  const expenseIncreaseRate = inputs.expenseIncreaseRate as number;
  const vacancyLoss = inputs.vacancyLoss as number;

  // Calculate loan amount and monthly payment
  const loanAmount = purchasePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // Calculate rental income
  const effectiveOccupancyRate = occupancyRate / 100 * (1 - vacancyLoss / 100);
  const annualRentalIncome = facilitySize * averageRentPerSqFt * 12 * effectiveOccupancyRate;

  // Calculate operating expenses
  const totalAnnualExpenses = annualExpenses + propertyTaxes + insurance + utilities + maintenance;
  const managementFeeAmount = annualRentalIncome * (managementFee / 100);
  const totalOperatingExpenses = totalAnnualExpenses + managementFeeAmount;

  // Calculate operating income and cash flow
  const annualOperatingIncome = annualRentalIncome - totalOperatingExpenses;
  const annualCashFlow = annualOperatingIncome - annualDebtService;
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate key metrics
  const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
  const capRate = (annualOperatingIncome / purchasePrice) * 100;
  const debtServiceCoverage = annualOperatingIncome / annualDebtService;

  // Calculate break-even occupancy
  const breakEvenOccupancy = ((totalOperatingExpenses + annualDebtService) / (facilitySize * averageRentPerSqFt * 12)) * 100;

  // Calculate projected value and total return
  const projectedValue = purchasePrice * Math.pow(1 + appreciationRate / 100, analysisPeriod);
  const totalReturn = projectedValue - purchasePrice + (annualCashFlow * analysisPeriod);
  const totalROI = (totalReturn / downPayment) * 100;

  // Calculate NPV and IRR (simplified)
  const discountRate = 0.08; // 8% discount rate
  let npv = -downPayment;
  for (let year = 1; year <= analysisPeriod; year++) {
    const futureCashFlow = annualCashFlow * Math.pow(1 + rentIncreaseRate / 100, year);
    npv += futureCashFlow / Math.pow(1 + discountRate, year);
  }
  npv += projectedValue / Math.pow(1 + discountRate, analysisPeriod);

  // Simplified IRR calculation
  const irr = calculateIRR(downPayment, annualCashFlow, analysisPeriod, projectedValue);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(downPayment, annualCashFlow, rentIncreaseRate);

  // Calculate annualized return
  const annualizedReturn = Math.pow((totalReturn + downPayment) / downPayment, 1 / analysisPeriod) - 1;
  const annualizedReturnPercent = annualizedReturn * 100;

  // Calculate scoring metrics
  const profitabilityScore = calculateProfitabilityScore(cashOnCashReturn, capRate, debtServiceCoverage);
  const investmentScore = calculateInvestmentScore(totalROI, irr, paybackPeriod, annualizedReturnPercent);
  const riskScore = calculateRiskScore(occupancyRate, debtServiceCoverage, breakEvenOccupancy, vacancyLoss);
  const valueScore = calculateValueScore(purchasePrice, facilitySize, unitCount, averageRentPerSqFt);

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    annualRentalIncome: Math.round(annualRentalIncome * 100) / 100,
    annualOperatingIncome: Math.round(annualOperatingIncome * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    totalROI: Math.round(totalROI * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    profitabilityScore: Math.round(profitabilityScore),
    investmentScore: Math.round(investmentScore),
    riskScore: Math.round(riskScore),
    valueScore: Math.round(valueScore),
    projectedValue: Math.round(projectedValue * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    annualizedReturn: Math.round(annualizedReturnPercent * 100) / 100
  };
}

function calculateIRR(initialInvestment: number, annualCashFlow: number, years: number, finalValue: number): number {
  // Simplified IRR calculation using trial and error
  let rate = 0.1; // Start with 10%
  let npv = -initialInvestment;
  
  for (let year = 1; year <= years; year++) {
    npv += annualCashFlow / Math.pow(1 + rate, year);
  }
  npv += finalValue / Math.pow(1 + rate, years);
  
  // Simple adjustment based on NPV
  if (npv > 0) {
    rate += 0.02;
  } else {
    rate -= 0.02;
  }
  
  return Math.max(0, Math.min(1, rate)); // Clamp between 0% and 100%
}

function calculatePaybackPeriod(initialInvestment: number, annualCashFlow: number, growthRate: number): number {
  if (annualCashFlow <= 0) return 999; // Never payback
  
  let cumulativeCashFlow = 0;
  let year = 0;
  
  while (cumulativeCashFlow < initialInvestment && year < 50) {
    year++;
    const cashFlowThisYear = annualCashFlow * Math.pow(1 + growthRate / 100, year - 1);
    cumulativeCashFlow += cashFlowThisYear;
  }
  
  if (cumulativeCashFlow >= initialInvestment) {
    const remainingAmount = initialInvestment - (cumulativeCashFlow - annualCashFlow * Math.pow(1 + growthRate / 100, year - 1));
    const partialYear = remainingAmount / (annualCashFlow * Math.pow(1 + growthRate / 100, year - 1));
    return year - 1 + partialYear;
  }
  
  return 999; // Never payback
}

function calculateProfitabilityScore(cashOnCashReturn: number, capRate: number, debtServiceCoverage: number): number {
  let score = 0;
  
  // Cash-on-cash return scoring (0-30 points)
  if (cashOnCashReturn >= 12) score += 30;
  else if (cashOnCashReturn >= 8) score += 25;
  else if (cashOnCashReturn >= 6) score += 20;
  else if (cashOnCashReturn >= 4) score += 15;
  else if (cashOnCashReturn >= 2) score += 10;
  else if (cashOnCashReturn >= 0) score += 5;
  
  // Cap rate scoring (0-30 points)
  if (capRate >= 8) score += 30;
  else if (capRate >= 6) score += 25;
  else if (capRate >= 5) score += 20;
  else if (capRate >= 4) score += 15;
  else if (capRate >= 3) score += 10;
  else if (capRate >= 2) score += 5;
  
  // Debt service coverage scoring (0-40 points)
  if (debtServiceCoverage >= 1.5) score += 40;
  else if (debtServiceCoverage >= 1.3) score += 35;
  else if (debtServiceCoverage >= 1.2) score += 30;
  else if (debtServiceCoverage >= 1.1) score += 25;
  else if (debtServiceCoverage >= 1.0) score += 20;
  else if (debtServiceCoverage >= 0.9) score += 10;
  
  return Math.min(100, score);
}

function calculateInvestmentScore(totalROI: number, irr: number, paybackPeriod: number, annualizedReturn: number): number {
  let score = 0;
  
  // Total ROI scoring (0-30 points)
  if (totalROI >= 200) score += 30;
  else if (totalROI >= 150) score += 25;
  else if (totalROI >= 100) score += 20;
  else if (totalROI >= 75) score += 15;
  else if (totalROI >= 50) score += 10;
  else if (totalROI >= 25) score += 5;
  
  // IRR scoring (0-30 points)
  const irrPercent = irr * 100;
  if (irrPercent >= 20) score += 30;
  else if (irrPercent >= 15) score += 25;
  else if (irrPercent >= 12) score += 20;
  else if (irrPercent >= 10) score += 15;
  else if (irrPercent >= 8) score += 10;
  else if (irrPercent >= 5) score += 5;
  
  // Payback period scoring (0-20 points)
  if (paybackPeriod <= 3) score += 20;
  else if (paybackPeriod <= 5) score += 15;
  else if (paybackPeriod <= 7) score += 10;
  else if (paybackPeriod <= 10) score += 5;
  
  // Annualized return scoring (0-20 points)
  if (annualizedReturn >= 15) score += 20;
  else if (annualizedReturn >= 12) score += 15;
  else if (annualizedReturn >= 10) score += 10;
  else if (annualizedReturn >= 8) score += 5;
  
  return Math.min(100, score);
}

function calculateRiskScore(occupancyRate: number, debtServiceCoverage: number, breakEvenOccupancy: number, vacancyLoss: number): number {
  let score = 100; // Start with perfect score, subtract for risks
  
  // Occupancy rate risk (0-25 points deducted)
  if (occupancyRate < 70) score -= 25;
  else if (occupancyRate < 80) score -= 15;
  else if (occupancyRate < 85) score -= 10;
  else if (occupancyRate < 90) score -= 5;
  
  // Debt service coverage risk (0-30 points deducted)
  if (debtServiceCoverage < 1.0) score -= 30;
  else if (debtServiceCoverage < 1.1) score -= 20;
  else if (debtServiceCoverage < 1.2) score -= 15;
  else if (debtServiceCoverage < 1.3) score -= 10;
  
  // Break-even occupancy risk (0-25 points deducted)
  if (breakEvenOccupancy > 90) score -= 25;
  else if (breakEvenOccupancy > 80) score -= 15;
  else if (breakEvenOccupancy > 70) score -= 10;
  else if (breakEvenOccupancy > 60) score -= 5;
  
  // Vacancy loss risk (0-20 points deducted)
  if (vacancyLoss > 15) score -= 20;
  else if (vacancyLoss > 10) score -= 15;
  else if (vacancyLoss > 7) score -= 10;
  else if (vacancyLoss > 5) score -= 5;
  
  return Math.max(0, score);
}

function calculateValueScore(purchasePrice: number, facilitySize: number, unitCount: number, averageRentPerSqFt: number): number {
  let score = 0;
  
  // Price per square foot scoring (0-30 points)
  const pricePerSqFt = purchasePrice / facilitySize;
  if (pricePerSqFt <= 50) score += 30;
  else if (pricePerSqFt <= 75) score += 25;
  else if (pricePerSqFt <= 100) score += 20;
  else if (pricePerSqFt <= 125) score += 15;
  else if (pricePerSqFt <= 150) score += 10;
  else if (pricePerSqFt <= 200) score += 5;
  
  // Unit efficiency scoring (0-25 points)
  const avgUnitSize = facilitySize / unitCount;
  if (avgUnitSize >= 100 && avgUnitSize <= 200) score += 25;
  else if (avgUnitSize >= 75 && avgUnitSize <= 250) score += 20;
  else if (avgUnitSize >= 50 && avgUnitSize <= 300) score += 15;
  else if (avgUnitSize >= 25 && avgUnitSize <= 400) score += 10;
  else score += 5;
  
  // Rent per square foot scoring (0-25 points)
  if (averageRentPerSqFt >= 2.0) score += 25;
  else if (averageRentPerSqFt >= 1.5) score += 20;
  else if (averageRentPerSqFt >= 1.25) score += 15;
  else if (averageRentPerSqFt >= 1.0) score += 10;
  else if (averageRentPerSqFt >= 0.75) score += 5;
  
  // Facility size efficiency (0-20 points)
  if (facilitySize >= 30000 && facilitySize <= 100000) score += 20;
  else if (facilitySize >= 20000 && facilitySize <= 150000) score += 15;
  else if (facilitySize >= 10000 && facilitySize <= 200000) score += 10;
  else score += 5;
  
  return Math.min(100, score);
}

function generateCashFlowProjection(inputs: CalculatorInputs, annualCashFlow: number, analysisPeriod: number): any[] {
  const projection = [];
  const rentIncreaseRate = inputs.rentIncreaseRate as number;
  const expenseIncreaseRate = inputs.expenseIncreaseRate as number;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const rentIncrease = Math.pow(1 + rentIncreaseRate / 100, year);
    const expenseIncrease = Math.pow(1 + expenseIncreaseRate / 100, year);
    const projectedCashFlow = annualCashFlow * rentIncrease * (1 - (expenseIncrease - 1) * 0.3);
    
    projection.push({
      year,
      cashFlow: Math.round(projectedCashFlow * 100) / 100,
      cumulativeCashFlow: Math.round(projectedCashFlow * year * 100) / 100
    });
  }
  
  return projection;
}

function generateOccupancyAnalysis(inputs: CalculatorInputs, breakEvenOccupancy: number): any[] {
  const occupancyRates = [50, 60, 70, 80, 85, 90, 95, 100];
  const analysis = [];
  
  for (const rate of occupancyRates) {
    const effectiveRate = rate / 100 * (1 - (inputs.vacancyLoss as number) / 100);
    const annualRentalIncome = (inputs.facilitySize as number) * (inputs.averageRentPerSqFt as number) * 12 * effectiveRate;
    const totalExpenses = (inputs.annualExpenses as number) + (inputs.propertyTaxes as number) + 
                         (inputs.insurance as number) + (inputs.utilities as number) + (inputs.maintenance as number);
    const managementFee = annualRentalIncome * ((inputs.managementFee as number) / 100);
    const operatingIncome = annualRentalIncome - totalExpenses - managementFee;
    const loanAmount = (inputs.purchasePrice as number) - (inputs.downPayment as number);
    const monthlyPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate as number, inputs.loanTerm as number);
    const annualDebtService = monthlyPayment * 12;
    const cashFlow = operatingIncome - annualDebtService;
    
    analysis.push({
      occupancyRate: rate,
      cashFlow: Math.round(cashFlow * 100) / 100,
      cashOnCashReturn: Math.round((cashFlow / (inputs.downPayment as number)) * 100 * 100) / 100,
      isBreakEven: rate >= breakEvenOccupancy
    });
  }
  
  return analysis;
}

function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function generateRecommendations(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const recommendations = [];
  
  // Cash flow recommendations
  if (outputs.annualCashFlow < 0) {
    recommendations.push("⚠️ **Critical**: Negative cash flow detected. Consider renegotiating terms or improving occupancy.");
  } else if (outputs.cashOnCashReturn < 6) {
    recommendations.push("📊 **Low Returns**: Cash-on-cash return below 6%. Consider higher rent or lower purchase price.");
  }
  
  // Occupancy recommendations
  if (outputs.breakEvenOccupancy > 85) {
    recommendations.push("🎯 **High Break-Even**: Occupancy needs to be very high to break even. Consider cost reduction strategies.");
  }
  
  // Debt service recommendations
  if (outputs.debtServiceCoverage < 1.2) {
    recommendations.push("💳 **Tight Coverage**: Debt service coverage below 1.2x. Consider larger down payment or longer term.");
  }
  
  // Investment quality recommendations
  if (outputs.investmentScore >= 80) {
    recommendations.push("✅ **Strong Investment**: High investment score indicates good potential returns.");
  } else if (outputs.investmentScore < 50) {
    recommendations.push("❌ **Poor Investment**: Low investment score suggests reconsidering this opportunity.");
  }
  
  // Risk management recommendations
  if (outputs.riskScore < 60) {
    recommendations.push("⚠️ **High Risk**: Risk score indicates significant investment risks. Consider mitigation strategies.");
  }
  
  // Value recommendations
  if (outputs.valueScore >= 80) {
    recommendations.push("💎 **Good Value**: High value score suggests favorable purchase terms.");
  }
  
  return recommendations.join('\n\n');
}

export function generateSelfStorageROIAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const cashFlowProjection = generateCashFlowProjection(inputs, outputs.annualCashFlow, inputs.analysisPeriod as number);
  const occupancyAnalysis = generateOccupancyAnalysis(inputs, outputs.breakEvenOccupancy);
  const recommendations = generateRecommendations(inputs, outputs);
  
  return `# Self-Storage Facility ROI Analysis

## Executive Summary
This analysis evaluates the financial performance of a ${inputs.facilitySize?.toLocaleString()} sq ft self-storage facility with ${inputs.unitCount} units.

### Key Metrics
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Cap Rate**: ${outputs.capRate}%
- **Total ROI**: ${outputs.totalROI}%
- **Debt Service Coverage**: ${outputs.debtServiceCoverage}x
- **Break-Even Occupancy**: ${outputs.breakEvenOccupancy}%

## Financial Performance

### Income & Expenses
- **Annual Rental Income**: $${outputs.annualRentalIncome?.toLocaleString()}
- **Annual Operating Income**: $${outputs.annualOperatingIncome?.toLocaleString()}
- **Annual Cash Flow**: $${outputs.annualCashFlow?.toLocaleString()}
- **Monthly Cash Flow**: $${outputs.monthlyCashFlow?.toLocaleString()}

### Investment Returns
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Total ROI**: ${outputs.totalROI}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Annualized Return**: ${outputs.annualizedReturn}%
- **Payback Period**: ${outputs.paybackPeriod} years

### Risk Assessment
- **Profitability Score**: ${outputs.profitabilityScore}/100
- **Investment Score**: ${outputs.investmentScore}/100
- **Risk Score**: ${outputs.riskScore}/100
- **Value Score**: ${outputs.valueScore}/100

## Cash Flow Projection

| Year | Annual Cash Flow | Cumulative Cash Flow |
|------|------------------|---------------------|
${cashFlowProjection.map(p => `| ${p.year} | $${p.cashFlow?.toLocaleString()} | $${p.cumulativeCashFlow?.toLocaleString()} |`).join('\n')}

## Occupancy Sensitivity Analysis

| Occupancy Rate | Annual Cash Flow | Cash-on-Cash Return | Break-Even |
|----------------|------------------|-------------------|------------|
${occupancyAnalysis.map(a => `| ${a.occupancyRate}% | $${a.cashFlow?.toLocaleString()} | ${a.cashOnCashReturn}% | ${a.isBreakEven ? '✅' : '❌'} |`).join('\n')}

## Property Valuation
- **Purchase Price**: $${inputs.purchasePrice?.toLocaleString()}
- **Down Payment**: $${inputs.downPayment?.toLocaleString()}
- **Loan Amount**: $${(inputs.purchasePrice as number - inputs.downPayment as number)?.toLocaleString()}
- **Monthly Payment**: $${outputs.monthlyPayment?.toLocaleString()}
- **Projected Value (${inputs.analysisPeriod} years)**: $${outputs.projectedValue?.toLocaleString()}

## Market Analysis
- **Average Rent per Sq Ft**: $${inputs.averageRentPerSqFt}/sq ft/month
- **Expected Occupancy**: ${inputs.occupancyRate}%
- **Annual Rent Increase**: ${inputs.rentIncreaseRate}%
- **Annual Appreciation**: ${inputs.appreciationRate}%

## Recommendations

${recommendations}

## Investment Decision
Based on the analysis:
- **Overall Score**: ${Math.round((outputs.profitabilityScore + outputs.investmentScore + outputs.riskScore + outputs.valueScore) / 4)}/100
- **Recommendation**: ${outputs.investmentScore >= 70 ? 'Consider proceeding with investment' : 'Reconsider or renegotiate terms'}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
`;
}
