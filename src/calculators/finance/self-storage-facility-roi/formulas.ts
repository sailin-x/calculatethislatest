import { SelfStorageFacilityROIInputs, SelfStorageFacilityROIOutputs } from './SelfStorageFacilityROICalculator';

export function calculateSelfStorageFacilityROI(inputs: SelfStorageFacilityROIInputs): SelfStorageFacilityROIOutputs {
  // Set default values for optional inputs
  const lateFees = inputs.lateFees || 0;
  const insuranceSales = inputs.insuranceSales || 0;
  const packingSupplySales = inputs.packingSupplySales || 0;
  const otherAncillaryIncome = inputs.otherAncillaryIncome || 0;

  // Calculate total investment
  const totalInvestment = inputs.downPayment + inputs.closingCosts;

  // Calculate loan amount
  const loanAmount = inputs.purchasePrice - inputs.downPayment;

  // Calculate monthly mortgage payment
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // Calculate annual revenue
  const baseRentRevenue = inputs.squareFootage * inputs.averageRentPerSqFt * 12 * (inputs.averageOccupancyRate / 100);
  const ancillaryRevenue = (lateFees + insuranceSales + packingSupplySales + otherAncillaryIncome) * 12;
  const annualRevenue = baseRentRevenue + ancillaryRevenue;

  // Calculate annual expenses
  const annualExpenses = inputs.propertyTaxes + inputs.insurance + inputs.utilities + 
                        inputs.maintenance + inputs.managementFees + inputs.marketing + 
                        inputs.administrative + inputs.security + inputs.landscaping + 
                        inputs.pestControl + inputs.trashRemoval;

  // Calculate net operating income
  const netOperatingIncome = annualRevenue - annualExpenses;

  // Calculate annual cash flow
  const annualCashFlow = netOperatingIncome - annualDebtService;

  // Calculate monthly cash flow
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate cash on cash return
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;

  // Calculate cap rate
  const capRate = (netOperatingIncome / inputs.propertyValue) * 100;

  // Calculate gross rent multiplier
  const grossRentMultiplier = inputs.propertyValue / annualRevenue;

  // Calculate price per square foot
  const pricePerSqFt = inputs.purchasePrice / inputs.squareFootage;

  // Calculate price per unit
  const pricePerUnit = inputs.purchasePrice / inputs.unitCount;

  // Calculate revenue per square foot
  const revenuePerSqFt = annualRevenue / inputs.squareFootage;

  // Calculate expense ratio
  const expenseRatio = (annualExpenses / annualRevenue) * 100;

  // Calculate debt service coverage ratio
  const debtServiceCoverageRatio = netOperatingIncome / annualDebtService;

  // Calculate break-even occupancy
  const breakEvenOccupancy = (annualExpenses / (inputs.squareFootage * inputs.averageRentPerSqFt * 12)) * 100;

  // Calculate profit margin
  const profitMargin = (netOperatingIncome / annualRevenue) * 100;

  // Calculate total cash flow over holding period
  let totalCashFlow = 0;
  let currentRevenue = annualRevenue;
  let currentExpenses = annualExpenses;
  let currentNOI = netOperatingIncome;
  let currentCashFlow = annualCashFlow;

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    totalCashFlow += currentCashFlow;
    
    // Apply growth rates for next year
    currentRevenue *= (1 + inputs.rentGrowthRate / 100);
    currentExpenses *= (1 + inputs.expenseGrowthRate / 100);
    currentNOI = currentRevenue - currentExpenses;
    currentCashFlow = currentNOI - annualDebtService;
  }

  // Calculate market value at exit
  const marketValue = currentNOI / (inputs.exitCapRate / 100);

  // Calculate appreciation value
  const appreciationValue = inputs.purchasePrice * Math.pow(1 + inputs.appreciationRate / 100, inputs.holdingPeriod) - inputs.purchasePrice;

  // Calculate equity build-up
  const equityBuildUp = marketValue - loanAmount - inputs.purchasePrice;

  // Calculate total return
  const totalReturn = ((totalCashFlow + appreciationValue + equityBuildUp) / totalInvestment) * 100;

  // Calculate payback period
  let paybackPeriod = 0;
  let cumulativeCashFlow = 0;
  currentCashFlow = annualCashFlow;
  
  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    cumulativeCashFlow += currentCashFlow;
    if (cumulativeCashFlow >= totalInvestment && paybackPeriod === 0) {
      paybackPeriod = year;
    }
    currentCashFlow *= (1 + inputs.rentGrowthRate / 100 - inputs.expenseGrowthRate / 100);
  }

  // Calculate net present value (simplified)
  const discountRate = inputs.interestRate / 100;
  let npv = -totalInvestment;
  currentCashFlow = annualCashFlow;
  
  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    npv += currentCashFlow / Math.pow(1 + discountRate, year);
    currentCashFlow *= (1 + inputs.rentGrowthRate / 100 - inputs.expenseGrowthRate / 100);
  }
  npv += marketValue / Math.pow(1 + discountRate, inputs.holdingPeriod);

  // Calculate internal rate of return (simplified approximation)
  const internalRateOfReturn = (totalReturn / inputs.holdingPeriod) * 100;

  // Calculate risk scores
  const marketRisk = calculateMarketRisk(inputs);
  const operationalRisk = calculateOperationalRisk(inputs);
  const financialRisk = calculateFinancialRisk(inputs, annualCashFlow, debtServiceCoverageRatio);
  const riskScore = (marketRisk + operationalRisk + financialRisk) / 3;

  // Generate recommendations
  const { recommendation, investmentGrade, keyStrengths, keyRisks, improvementSuggestions } = 
    generateRecommendations(inputs, {
      cashOnCashReturn,
      capRate,
      debtServiceCoverageRatio,
      riskScore,
      marketRisk,
      operationalRisk,
      financialRisk
    });

  return {
    totalInvestment,
    annualRevenue,
    annualExpenses,
    netOperatingIncome,
    cashOnCashReturn,
    capRate,
    totalROI: totalReturn,
    internalRateOfReturn,
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    breakEvenOccupancy,
    grossRentMultiplier,
    pricePerSqFt,
    pricePerUnit,
    revenuePerSqFt,
    expenseRatio,
    paybackPeriod,
    netPresentValue: npv,
    profitMargin,
    debtServiceCoverageRatio,
    marketValue,
    equityBuildUp,
    totalReturn,
    appreciationValue,
    riskScore,
    marketRisk,
    operationalRisk,
    financialRisk,
    recommendation,
    investmentGrade,
    keyStrengths,
    keyRisks,
    improvementSuggestions
  };
}

function calculateMarketRisk(inputs: SelfStorageFacilityROIInputs): number {
  let riskScore = 50; // Base risk score

  // Location quality impact
  switch (inputs.locationQuality) {
    case 'prime':
      riskScore -= 20;
      break;
    case 'secondary':
      riskScore += 0;
      break;
    case 'tertiary':
      riskScore += 20;
      break;
  }

  // Competition level impact
  switch (inputs.competitionLevel) {
    case 'low':
      riskScore -= 15;
      break;
    case 'medium':
      riskScore += 0;
      break;
    case 'high':
      riskScore += 15;
      break;
  }

  // Economic conditions impact
  switch (inputs.economicConditions) {
    case 'growing':
      riskScore -= 15;
      break;
    case 'stable':
      riskScore += 0;
      break;
    case 'declining':
      riskScore += 15;
      break;
  }

  // Market growth rate impact
  if (inputs.marketGrowthRate > 3) {
    riskScore -= 10;
  } else if (inputs.marketGrowthRate < 1) {
    riskScore += 10;
  }

  // Vacancy rate impact
  if (inputs.vacancyRate > 20) {
    riskScore += 15;
  } else if (inputs.vacancyRate < 10) {
    riskScore -= 10;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function calculateOperationalRisk(inputs: SelfStorageFacilityROIInputs): number {
  let riskScore = 50; // Base risk score

  // Property age impact
  if (inputs.propertyAge > 15) {
    riskScore += 20;
  } else if (inputs.propertyAge < 5) {
    riskScore -= 10;
  }

  // Property type impact
  switch (inputs.propertyType) {
    case 'climate-controlled':
      riskScore -= 10;
      break;
    case 'indoor':
      riskScore -= 5;
      break;
    case 'mixed':
      riskScore += 5;
      break;
    case 'outdoor':
      riskScore += 10;
      break;
  }

  // Occupancy rate impact
  if (inputs.averageOccupancyRate > 90) {
    riskScore -= 15;
  } else if (inputs.averageOccupancyRate < 70) {
    riskScore += 15;
  }

  // Expense ratio impact
  const expenseRatio = (inputs.propertyTaxes + inputs.insurance + inputs.utilities + 
                       inputs.maintenance + inputs.managementFees + inputs.marketing + 
                       inputs.administrative + inputs.security + inputs.landscaping + 
                       inputs.pestControl + inputs.trashRemoval) / 
                       (inputs.squareFootage * inputs.averageRentPerSqFt * 12 * (inputs.averageOccupancyRate / 100)) * 100;
  
  if (expenseRatio > 60) {
    riskScore += 20;
  } else if (expenseRatio < 40) {
    riskScore -= 15;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function calculateFinancialRisk(inputs: SelfStorageFacilityROIInputs, annualCashFlow: number, dscr: number): number {
  let riskScore = 50; // Base risk score

  // Down payment impact
  const downPaymentRatio = inputs.downPayment / inputs.purchasePrice;
  if (downPaymentRatio > 0.3) {
    riskScore -= 15;
  } else if (downPaymentRatio < 0.2) {
    riskScore += 15;
  }

  // Interest rate impact
  if (inputs.interestRate > 8) {
    riskScore += 15;
  } else if (inputs.interestRate < 5) {
    riskScore -= 10;
  }

  // Cash flow impact
  if (annualCashFlow > 0) {
    riskScore -= 20;
  } else {
    riskScore += 30;
  }

  // DSCR impact
  if (dscr > 1.5) {
    riskScore -= 15;
  } else if (dscr < 1.2) {
    riskScore += 20;
  }

  // Loan term impact
  if (inputs.loanTerm < 15) {
    riskScore += 10;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function generateRecommendations(
  inputs: SelfStorageFacilityROIInputs, 
  metrics: {
    cashOnCashReturn: number;
    capRate: number;
    debtServiceCoverageRatio: number;
    riskScore: number;
    marketRisk: number;
    operationalRisk: number;
    financialRisk: number;
  }
): {
  recommendation: string;
  investmentGrade: 'A' | 'B' | 'C' | 'D';
  keyStrengths: string[];
  keyRisks: string[];
  improvementSuggestions: string[];
} {
  const { cashOnCashReturn, capRate, debtServiceCoverageRatio, riskScore, marketRisk, operationalRisk, financialRisk } = metrics;

  // Determine investment grade
  let investmentGrade: 'A' | 'B' | 'C' | 'D';
  if (cashOnCashReturn > 8 && capRate > 7 && debtServiceCoverageRatio > 1.3 && riskScore < 40) {
    investmentGrade = 'A';
  } else if (cashOnCashReturn > 6 && capRate > 6 && debtServiceCoverageRatio > 1.2 && riskScore < 60) {
    investmentGrade = 'B';
  } else if (cashOnCashReturn > 4 && capRate > 5 && debtServiceCoverageRatio > 1.1 && riskScore < 80) {
    investmentGrade = 'C';
  } else {
    investmentGrade = 'D';
  }

  // Generate key strengths
  const keyStrengths: string[] = [];
  if (cashOnCashReturn > 6) keyStrengths.push(`Strong cash-on-cash return of ${cashOnCashReturn.toFixed(1)}%`);
  if (capRate > 6) keyStrengths.push(`Attractive cap rate of ${capRate.toFixed(1)}%`);
  if (debtServiceCoverageRatio > 1.3) keyStrengths.push(`Strong debt service coverage ratio of ${debtServiceCoverageRatio.toFixed(2)}`);
  if (inputs.averageOccupancyRate > 85) keyStrengths.push(`High occupancy rate of ${inputs.averageOccupancyRate}%`);
  if (inputs.locationQuality === 'prime') keyStrengths.push('Prime location quality');
  if (inputs.competitionLevel === 'low') keyStrengths.push('Low competition in the market');
  if (inputs.propertyType === 'climate-controlled') keyStrengths.push('Climate-controlled facility with premium pricing');

  // Generate key risks
  const keyRisks: string[] = [];
  if (cashOnCashReturn < 5) keyRisks.push(`Low cash-on-cash return of ${cashOnCashReturn.toFixed(1)}%`);
  if (capRate < 5) keyRisks.push(`Low cap rate of ${capRate.toFixed(1)}%`);
  if (debtServiceCoverageRatio < 1.2) keyRisks.push(`Weak debt service coverage ratio of ${debtServiceCoverageRatio.toFixed(2)}`);
  if (inputs.averageOccupancyRate < 75) keyRisks.push(`Low occupancy rate of ${inputs.averageOccupancyRate}%`);
  if (inputs.locationQuality === 'tertiary') keyRisks.push('Tertiary location quality');
  if (inputs.competitionLevel === 'high') keyRisks.push('High competition in the market');
  if (inputs.propertyAge > 15) keyRisks.push(`Older property (${inputs.propertyAge} years) may require significant maintenance`);
  if (inputs.interestRate > 7) keyRisks.push(`High interest rate of ${inputs.interestRate}%`);

  // Generate improvement suggestions
  const improvementSuggestions: string[] = [];
  if (cashOnCashReturn < 6) improvementSuggestions.push('Consider increasing rental rates or improving occupancy');
  if (inputs.averageOccupancyRate < 85) improvementSuggestions.push('Implement marketing strategies to improve occupancy rates');
  if (inputs.propertyAge > 10) improvementSuggestions.push('Plan for capital improvements to maintain property value');
  if (inputs.competitionLevel === 'high') improvementSuggestions.push('Develop competitive advantages through amenities or service');
  if (debtServiceCoverageRatio < 1.3) improvementSuggestions.push('Consider increasing down payment to improve cash flow');
  if (inputs.propertyType === 'outdoor') improvementSuggestions.push('Consider adding climate-controlled units to increase revenue');

  // Generate recommendation
  let recommendation = '';
  if (investmentGrade === 'A') {
    recommendation = 'Excellent investment opportunity with strong fundamentals and low risk profile.';
  } else if (investmentGrade === 'B') {
    recommendation = 'Good investment opportunity with solid returns and manageable risks.';
  } else if (investmentGrade === 'C') {
    recommendation = 'Moderate investment opportunity with acceptable returns but higher risks.';
  } else {
    recommendation = 'High-risk investment with marginal returns. Consider significant improvements or alternative investments.';
  }

  return {
    recommendation,
    investmentGrade,
    keyStrengths,
    keyRisks,
    improvementSuggestions
  };
}

export function generateSelfStorageFacilityROIAnalysis(
  inputs: SelfStorageFacilityROIInputs, 
  outputs: SelfStorageFacilityROIOutputs
): string {
  return `# Self-Storage Facility ROI Analysis Report

## Executive Summary
This analysis evaluates the investment potential of a ${inputs.squareFootage.toLocaleString()} sq ft self-storage facility with ${inputs.unitCount} units. The facility is classified as ${inputs.propertyType} and located in a ${inputs.locationQuality} market area.

## Investment Overview
- **Purchase Price**: $${inputs.purchasePrice.toLocaleString()}
- **Total Investment**: $${outputs.totalInvestment.toLocaleString()}
- **Investment Grade**: ${outputs.investmentGrade}
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn.toFixed(2)}%
- **Cap Rate**: ${outputs.capRate.toFixed(2)}%
- **Total ROI**: ${outputs.totalROI.toFixed(2)}%

## Financial Performance

### Revenue Analysis
- **Annual Revenue**: $${outputs.annualRevenue.toLocaleString()}
- **Revenue per Sq Ft**: $${outputs.revenuePerSqFt.toFixed(2)}/sq ft/year
- **Occupancy Rate**: ${inputs.averageOccupancyRate}%
- **Break-Even Occupancy**: ${outputs.breakEvenOccupancy.toFixed(1)}%

### Expense Analysis
- **Annual Expenses**: $${outputs.annualExpenses.toLocaleString()}
- **Expense Ratio**: ${outputs.expenseRatio.toFixed(1)}%
- **Net Operating Income**: $${outputs.netOperatingIncome.toLocaleString()}

### Cash Flow Analysis
- **Monthly Cash Flow**: $${outputs.monthlyCashFlow.toLocaleString()}
- **Annual Cash Flow**: $${outputs.annualCashFlow.toLocaleString()}
- **Total Cash Flow (${inputs.holdingPeriod} years)**: $${outputs.totalCashFlow.toLocaleString()}

## Investment Metrics

### Return Metrics
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn.toFixed(2)}%
- **Cap Rate**: ${outputs.capRate.toFixed(2)}%
- **Gross Rent Multiplier**: ${outputs.grossRentMultiplier.toFixed(2)}
- **Internal Rate of Return**: ${outputs.internalRateOfReturn.toFixed(2)}%

### Risk Metrics
- **Debt Service Coverage Ratio**: ${outputs.debtServiceCoverageRatio.toFixed(2)}
- **Overall Risk Score**: ${outputs.riskScore.toFixed(0)}/100
- **Market Risk**: ${outputs.marketRisk.toFixed(0)}/100
- **Operational Risk**: ${outputs.operationalRisk.toFixed(0)}/100
- **Financial Risk**: ${outputs.financialRisk.toFixed(0)}/100

## Market Analysis

### Property Metrics
- **Price per Sq Ft**: $${outputs.pricePerSqFt.toFixed(2)}
- **Price per Unit**: $${outputs.pricePerUnit.toLocaleString()}
- **Market Value at Exit**: $${outputs.marketValue.toLocaleString()}

### Growth Projections
- **Market Growth Rate**: ${inputs.marketGrowthRate}%
- **Rent Growth Rate**: ${inputs.rentGrowthRate}%
- **Appreciation Rate**: ${inputs.appreciationRate}%
- **Appreciation Value**: $${outputs.appreciationValue.toLocaleString()}

## Risk Assessment

### Key Strengths
${outputs.keyStrengths.map(strength => `- ${strength}`).join('\n')}

### Key Risks
${outputs.keyRisks.map(risk => `- ${risk}`).join('\n')}

## Recommendations

### Investment Recommendation
${outputs.recommendation}

### Improvement Suggestions
${outputs.improvementSuggestions.map(suggestion => `- ${suggestion}`).join('\n')}

## Market Conditions
- **Location Quality**: ${inputs.locationQuality}
- **Competition Level**: ${inputs.competitionLevel}
- **Economic Conditions**: ${inputs.economicConditions}
- **Regulatory Environment**: ${inputs.regulatoryEnvironment}

## Conclusion
This self-storage facility investment shows ${outputs.investmentGrade}-grade potential with a ${outputs.cashOnCashReturn.toFixed(1)}% cash-on-cash return and ${outputs.totalROI.toFixed(1)}% total ROI over ${inputs.holdingPeriod} years. The investment carries a risk score of ${outputs.riskScore.toFixed(0)}/100, indicating ${outputs.riskScore < 40 ? 'low' : outputs.riskScore < 60 ? 'moderate' : 'high'} risk levels.

${outputs.recommendation}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
*Holding Period: ${inputs.holdingPeriod} years*
*Exit Cap Rate: ${inputs.exitCapRate}%*`;
}