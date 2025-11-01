import { NetOperatingIncomeNoiInputs, NetOperatingIncomeNoiOutputs } from './types';

// Calculate gross income
export function calculateGrossIncome(inputs: NetOperatingIncomeNoiInputs): number {
  return inputs.grossRentalIncome + inputs.otherIncome;
}

// Calculate effective gross income (accounting for vacancy)
export function calculateEffectiveGrossIncome(inputs: NetOperatingIncomeNoiInputs): number {
  const grossIncome = calculateGrossIncome(inputs);
  const vacancyLoss = grossIncome * (inputs.vacancyRate / 100);
  return grossIncome - vacancyLoss;
}

// Calculate total operating expenses
export function calculateTotalOperatingExpenses(inputs: NetOperatingIncomeNoiInputs): number {
  const propertyManagementExpense = inputs.grossRentalIncome * (inputs.propertyManagement / 100);
  const maintenanceExpense = inputs.grossRentalIncome * (inputs.maintenance / 100);

  return propertyManagementExpense + maintenanceExpense + inputs.utilities +
         inputs.insurance + inputs.propertyTaxes + inputs.legalFees +
         inputs.accountingFees + inputs.advertising + inputs.supplies + inputs.otherExpenses;
}

// Calculate NOI
export function calculateNetOperatingIncome(inputs: NetOperatingIncomeNoiInputs): number {
  const effectiveGrossIncome = calculateEffectiveGrossIncome(inputs);
  const totalOperatingExpenses = calculateTotalOperatingExpenses(inputs);
  return effectiveGrossIncome - totalOperatingExpenses;
}

// Calculate NOI margin
export function calculateNoiMargin(effectiveGrossIncome: number, noi: number): number {
  if (effectiveGrossIncome === 0) return 0;
  return (noi / effectiveGrossIncome) * 100;
}

// Calculate NOI per unit
export function calculateNoiPerUnit(noi: number, numberOfUnits: number): number {
  if (numberOfUnits === 0) return 0;
  return noi / numberOfUnits;
}

// Calculate NOI per square foot
export function calculateNoiPerSqFt(noi: number, squareFootage: number): number {
  if (squareFootage === 0) return 0;
  return noi / squareFootage;
}

// Calculate NOI yield
export function calculateNoiYield(noi: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return (noi / propertyValue) * 100;
}

// Calculate cap rate
export function calculateCapRate(noi: number, propertyValue: number): number {
  return calculateNoiYield(noi, propertyValue);
}

// Calculate implied property value based on NOI and cap rate
export function calculateImpliedPropertyValue(noi: number, capRate: number): number {
  if (capRate === 0) return 0;
  return noi / (capRate / 100);
}

// Calculate annual debt service
export function calculateAnnualDebtService(inputs: NetOperatingIncomeNoiInputs): number {
  if (inputs.loanAmount === 0 || inputs.interestRate === 0 || inputs.loanTerm === 0) return 0;

  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment * 12;
}

// Calculate cash flow before tax
export function calculateCashFlowBeforeTax(noi: number, annualDebtService: number): number {
  return noi - annualDebtService;
}

// Calculate cash flow after tax
export function calculateCashFlowAfterTax(
  cashFlowBeforeTax: number,
  depreciation: number,
  marginalTaxRate: number
): number {
  const taxableIncome = cashFlowBeforeTax - depreciation;
  const taxAmount = Math.max(0, taxableIncome) * (marginalTaxRate / 100);
  return cashFlowBeforeTax - taxAmount;
}

// Calculate cash-on-cash return
export function calculateCashOnCashReturn(
  cashFlowAfterTax: number,
  downPaymentAmount: number
): number {
  if (downPaymentAmount === 0) return 0;
  return (cashFlowAfterTax / downPaymentAmount) * 100;
}

// Calculate debt service coverage ratio
export function calculateDebtServiceCoverageRatio(noi: number, annualDebtService: number): number {
  if (annualDebtService === 0) return 0;
  return noi / annualDebtService;
}

// Calculate break-even ratio
export function calculateBreakEvenRatio(
  totalOperatingExpenses: number,
  effectiveGrossIncome: number
): number {
  if (effectiveGrossIncome === 0) return 0;
  return (totalOperatingExpenses / effectiveGrossIncome) * 100;
}

// Calculate gross rent multiplier
export function calculateGrossRentMultiplier(propertyValue: number, grossRentalIncome: number): number {
  if (grossRentalIncome === 0) return 0;
  return propertyValue / grossRentalIncome;
}

// Calculate depreciation
export function calculateDepreciation(propertyValue: number, depreciationYears: number): number {
  // Simplified straight-line depreciation
  return propertyValue / depreciationYears;
}

// Generate 5-year NOI projection
export function generateNoiProjection5Year(
  inputs: NetOperatingIncomeNoiInputs,
  baseNoi: number
): number[] {
  const projection = [baseNoi];

  for (let year = 1; year < 5; year++) {
    const incomeGrowth = baseNoi * (inputs.incomeGrowthRate / 100);
    const expenseGrowth = baseNoi * (inputs.expenseGrowthRate / 100);
    const projectedNoi = projection[year - 1] + incomeGrowth - expenseGrowth;
    projection.push(projectedNoi);
  }

  return projection;
}

// Generate 5-year cash flow projection
export function generateCashFlowProjection5Year(
  noiProjection: number[],
  annualDebtService: number,
  depreciation: number,
  marginalTaxRate: number
): number[] {
  return noiProjection.map(noi => {
    const cashFlowBeforeTax = noi - annualDebtService;
    return calculateCashFlowAfterTax(cashFlowBeforeTax, depreciation, marginalTaxRate);
  });
}

// Calculate NOI sensitivity to rent changes
export function calculateNoiSensitivityToRent(effectiveGrossIncome: number, noi: number): number {
  // Approximate percentage change in NOI per 1% change in rent
  if (effectiveGrossIncome === 0) return 0;
  return (noi / effectiveGrossIncome) * 100;
}

// Calculate NOI sensitivity to expense changes
export function calculateNoiSensitivityToExpenses(totalOperatingExpenses: number, noi: number): number {
  // Approximate percentage change in NOI per 1% change in expenses
  if (totalOperatingExpenses === 0) return 0;
  return (totalOperatingExpenses / (noi + totalOperatingExpenses)) * 100;
}

// Calculate occupancy rate
export function calculateOccupancyRate(vacancyRate: number): number {
  return 100 - vacancyRate;
}

// Generate value-add analysis
export function generateValueAddAnalysis(inputs: NetOperatingIncomeNoiInputs): NetOperatingIncomeNoiOutputs['valueAddAnalysis'] {
  const analysis = [];

  // Property management efficiency
  const currentMgmtFee = inputs.grossRentalIncome * (inputs.propertyManagement / 100);
  const efficientMgmtFee = inputs.grossRentalIncome * 0.08; // 8% is efficient
  const mgmtSavings = currentMgmtFee - efficientMgmtFee;

  if (mgmtSavings > 0) {
    analysis.push({
      category: 'Property Management',
      currentAmount: currentMgmtFee,
      potentialSavings: mgmtSavings,
      roi: (mgmtSavings / 1000) * 100 // Simplified ROI calculation
    });
  }

  // Maintenance optimization
  const currentMaintenance = inputs.grossRentalIncome * (inputs.maintenance / 100);
  const optimizedMaintenance = inputs.grossRentalIncome * 0.015; // 1.5% is well-maintained
  const maintenanceSavings = currentMaintenance - optimizedMaintenance;

  if (maintenanceSavings > 0) {
    analysis.push({
      category: 'Maintenance',
      currentAmount: currentMaintenance,
      potentialSavings: maintenanceSavings,
      roi: (maintenanceSavings / 2000) * 100
    });
  }

  // Rent optimization
  const marketRent = inputs.squareFootage * inputs.marketRentPerSqFt * 12;
  const currentRent = inputs.grossRentalIncome;
  const rentIncrease = marketRent - currentRent;

  if (rentIncrease > 0) {
    analysis.push({
      category: 'Rent Optimization',
      currentAmount: currentRent,
      potentialSavings: 0, // This increases income, not savings
      roi: (rentIncrease / currentRent) * 100
    });
  }

  return analysis;
}

// Generate investment recommendation
export function generateInvestmentRecommendation(
  capRate: number,
  marketCapRate: number,
  dscr: number,
  cashOnCashReturn: number
): NetOperatingIncomeNoiOutputs['investmentRecommendation'] {
  let score = 0;

  // Cap rate vs market
  if (capRate > marketCapRate * 1.2) score += 2; // Significantly above market
  else if (capRate > marketCapRate) score += 1; // Above market
  else if (capRate < marketCapRate * 0.8) score -= 2; // Significantly below market
  else if (capRate < marketCapRate) score -= 1; // Below market

  // DSCR
  if (dscr > 1.5) score += 2;
  else if (dscr > 1.25) score += 1;
  else if (dscr < 1.0) score -= 2;
  else if (dscr < 1.1) score -= 1;

  // Cash-on-cash return
  if (cashOnCashReturn > 10) score += 2;
  else if (cashOnCashReturn > 8) score += 1;
  else if (cashOnCashReturn < 4) score -= 2;
  else if (cashOnCashReturn < 6) score -= 1;

  if (score >= 4) return 'Strong Buy';
  if (score >= 2) return 'Buy';
  if (score >= -1) return 'Hold';
  if (score >= -3) return 'Sell';
  return 'Strong Sell';
}

// Generate risk assessment
export function generateRiskAssessment(
  vacancyRate: number,
  expenseRatio: number,
  dscr: number
): NetOperatingIncomeNoiOutputs['riskAssessment'] {
  let riskScore = 0;

  if (vacancyRate > 10) riskScore += 2;
  else if (vacancyRate > 5) riskScore += 1;

  if (expenseRatio > 50) riskScore += 2;
  else if (expenseRatio > 40) riskScore += 1;

  if (dscr < 1.1) riskScore += 2;
  else if (dscr < 1.25) riskScore += 1;

  if (riskScore >= 4) return 'High';
  if (riskScore >= 2) return 'Medium';
  return 'Low';
}

// Main calculation function
export function calculateNetOperatingIncomeNoi(inputs: NetOperatingIncomeNoiInputs): NetOperatingIncomeNoiOutputs {
  const grossIncome = calculateGrossIncome(inputs);
  const effectiveGrossIncome = calculateEffectiveGrossIncome(inputs);
  const totalOperatingExpenses = calculateTotalOperatingExpenses(inputs);
  const noi = calculateNetOperatingIncome(inputs);

  const noiMargin = calculateNoiMargin(effectiveGrossIncome, noi);
  const noiPerUnit = calculateNoiPerUnit(noi, inputs.numberOfUnits);
  const noiPerSqFt = calculateNoiPerSqFt(noi, inputs.squareFootage);
  const noiYield = calculateNoiYield(noi, inputs.propertyValue);
  const capRate = calculateCapRate(noi, inputs.propertyValue);

  const impliedPropertyValue = calculateImpliedPropertyValue(noi, inputs.marketCapRate);
  const targetPropertyValue = calculateImpliedPropertyValue(noi, inputs.targetCapRate);

  const annualDebtService = calculateAnnualDebtService(inputs);
  const cashFlowBeforeTax = calculateCashFlowBeforeTax(noi, annualDebtService);

  const depreciation = calculateDepreciation(inputs.propertyValue, inputs.depreciationYears);
  const cashFlowAfterTax = calculateCashFlowAfterTax(cashFlowBeforeTax, depreciation, inputs.marginalTaxRate);

  const downPaymentAmount = inputs.propertyValue * (inputs.downPayment / 100);
  const cashOnCashReturn = calculateCashOnCashReturn(cashFlowAfterTax, downPaymentAmount);

  const debtServiceCoverageRatio = calculateDebtServiceCoverageRatio(noi, annualDebtService);
  const breakEvenRatio = calculateBreakEvenRatio(totalOperatingExpenses, effectiveGrossIncome);
  const grossRentMultiplier = calculateGrossRentMultiplier(inputs.propertyValue, inputs.grossRentalIncome);

  const noiProjection5Year = generateNoiProjection5Year(inputs, noi);
  const cashFlowProjection5Year = generateCashFlowProjection5Year(
    noiProjection5Year,
    annualDebtService,
    depreciation,
    inputs.marginalTaxRate
  );

  const noiSensitivityToRent = calculateNoiSensitivityToRent(effectiveGrossIncome, noi);
  const noiSensitivityToExpenses = calculateNoiSensitivityToExpenses(totalOperatingExpenses, noi);

  const occupancyRate = calculateOccupancyRate(inputs.vacancyRate);
  const rentCollectionRate = 100 - inputs.vacancyRate; // Simplified assumption

  const valueAddAnalysis = generateValueAddAnalysis(inputs);
  const potentialNoiImprovement = valueAddAnalysis.reduce((sum, item) => sum + item.potentialSavings, 0);

  const marketNoiPerSqFt = noiPerSqFt * 1.1; // Simplified market comparison
  const marketComparison = noiPerSqFt > marketNoiPerSqFt ? 'Above Market' :
                          noiPerSqFt < marketNoiPerSqFt * 0.9 ? 'Below Market' : 'At Market';

  const investmentRecommendation = generateInvestmentRecommendation(
    capRate,
    inputs.marketCapRate,
    debtServiceCoverageRatio,
    cashOnCashReturn
  );

  const riskAssessment = generateRiskAssessment(
    inputs.vacancyRate,
    (totalOperatingExpenses / effectiveGrossIncome) * 100,
    debtServiceCoverageRatio
  );

  const keyStrengths = [];
  const keyConcerns = [];
  const actionItems = [];

  if (capRate > inputs.marketCapRate) keyStrengths.push('Above-market cap rate');
  if (debtServiceCoverageRatio > 1.25) keyStrengths.push('Strong debt service coverage');
  if (cashOnCashReturn > 8) keyStrengths.push('Good cash-on-cash return');

  if (inputs.vacancyRate > 8) keyConcerns.push('High vacancy rate');
  if (breakEvenRatio > 50) keyConcerns.push('High break-even ratio');
  if (debtServiceCoverageRatio < 1.1) keyConcerns.push('Weak debt service coverage');

  if (valueAddAnalysis.length > 0) actionItems.push('Consider value-add opportunities');
  if (inputs.vacancyRate > 5) actionItems.push('Implement marketing to reduce vacancy');
  if (totalOperatingExpenses / effectiveGrossIncome > 0.45) actionItems.push('Review expense management');

  return {
    grossIncome,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome: noi,
    noiMargin,
    noiPerUnit,
    noiPerSqFt,
    noiYield,
    impliedPropertyValue,
    capRate,
    targetPropertyValue,
    annualDebtService,
    cashFlowBeforeTax,
    cashFlowAfterTax,
    cashOnCashReturn,
    debtServiceCoverageRatio,
    breakEvenRatio,
    grossRentMultiplier,
    noiProjection5Year,
    cashFlowProjection5Year,
    noiSensitivityToRent,
    noiSensitivityToExpenses,
    occupancyRate,
    rentCollectionRate,
    potentialNoiImprovement,
    valueAddAnalysis,
    marketNoiPerSqFt,
    marketComparison,
    investmentRecommendation,
    riskAssessment,
    keyStrengths,
    keyConcerns,
    actionItems
  };
}