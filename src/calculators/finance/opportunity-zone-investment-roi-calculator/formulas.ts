import { OpportunityZoneInvestmentRoiInputs, OpportunityZoneInvestmentRoiOutputs } from './types';

// Calculate tax deferral amount
export function calculateTaxDeferral(inputs: OpportunityZoneInvestmentRoiInputs): number {
  if (!inputs.capitalGainsTaxDeferral) return 0;
  // Simplified - assumes all gains are deferred
  return inputs.initialInvestment * 0.25; // Rough estimate of deferred gains
}

// Calculate step-up in basis value
export function calculateStepUpInBasis(inputs: OpportunityZoneInvestmentRoiInputs): number {
  return inputs.initialInvestment * (inputs.stepUpInBasis / 100);
}

// Calculate capital gains tax savings
export function calculateCapitalGainsTaxSavings(inputs: OpportunityZoneInvestmentRoiInputs): number {
  const deferredGains = calculateTaxDeferral(inputs);
  const taxReduction = inputs.capitalGainsTaxReduction / 100;
  return deferredGains * taxReduction * (inputs.capitalGainsTaxRate / 100);
}

// Calculate annual cash flow
export function calculateAnnualCashFlow(
  inputs: OpportunityZoneInvestmentRoiInputs,
  year: number
): number {
  const rentalIncome = inputs.expectedRentalIncome * Math.pow(1 + inputs.inflationRate / 100, year);
  const vacancyLoss = rentalIncome * (inputs.vacancyRate / 100);
  const effectiveIncome = rentalIncome - vacancyLoss;

  const operatingExpenses = inputs.operatingExpenses * Math.pow(1 + inputs.inflationRate / 100, year);
  const managementFees = effectiveIncome * (inputs.annualManagementFees / 100);
  const maintenanceReserves = effectiveIncome * (inputs.maintenanceReserves / 100);

  const totalExpenses = operatingExpenses + managementFees + maintenanceReserves +
                       inputs.propertyInsurance + inputs.propertyTaxes;

  const noi = effectiveIncome - totalExpenses;

  // Debt service calculation
  if (inputs.leverageRatio > 0) {
    const loanAmount = inputs.initialInvestment * (inputs.leverageRatio / 100);
    const monthlyPayment = loanAmount * (inputs.interestRate / 100 / 12 * Math.pow(1 + inputs.interestRate / 100 / 12, inputs.loanTerm * 12)) /
                          (Math.pow(1 + inputs.interestRate / 100 / 12, inputs.loanTerm * 12) - 1);
    const annualDebtService = monthlyPayment * 12;
    return noi - annualDebtService;
  }

  return noi;
}

// Calculate IRR using approximation method
export function calculateIRR(inputs: OpportunityZoneInvestmentRoiInputs): number {
  const cashFlows = [-inputs.initialInvestment];

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    cashFlows.push(calculateAnnualCashFlow(inputs, year));
  }

  // Add exit proceeds
  const exitValue = calculateExitValuation(inputs);
  const exitCashFlow = exitValue - (inputs.initialInvestment * (inputs.leverageRatio / 100));
  cashFlows.push(exitCashFlow);

  // Simple IRR approximation using multiple rates
  const rates = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30];

  for (const rate of rates) {
    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate, i);
    }
    if (Math.abs(npv) < 1000) { // Close enough to zero
      return rate * 100;
    }
  }

  return 15; // Default fallback
}

// Calculate NPV
export function calculateNPV(inputs: OpportunityZoneInvestmentRoiInputs, discountRate: number = 0.10): number {
  let npv = -inputs.initialInvestment;

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    const cashFlow = calculateAnnualCashFlow(inputs, year);
    npv += cashFlow / Math.pow(1 + discountRate, year);
  }

  // Add exit proceeds
  const exitValue = calculateExitValuation(inputs);
  const exitCashFlow = exitValue - (inputs.initialInvestment * (inputs.leverageRatio / 100));
  npv += exitCashFlow / Math.pow(1 + discountRate, inputs.holdingPeriod);

  return npv;
}

// Calculate exit valuation
export function calculateExitValuation(inputs: OpportunityZoneInvestmentRoiInputs): number {
  let propertyValue = inputs.propertyValue;

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    propertyValue *= (1 + inputs.expectedAppreciation / 100);
  }

  return propertyValue;
}

// Calculate total ROI
export function calculateTotalROI(inputs: OpportunityZoneInvestmentRoiInputs): number {
  const exitValue = calculateExitValuation(inputs);
  const totalCashFlows = calculateAnnualCashFlow(inputs, inputs.holdingPeriod) * inputs.holdingPeriod;
  const totalReturn = exitValue + totalCashFlows - inputs.initialInvestment;

  return (totalReturn / inputs.initialInvestment) * 100;
}

// Calculate cash-on-cash returns
export function calculateCashOnCashReturns(inputs: OpportunityZoneInvestmentRoiInputs): number[] {
  const equityInvested = inputs.initialInvestment * (1 - inputs.leverageRatio / 100);
  const returns: number[] = [];

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    const cashFlow = calculateAnnualCashFlow(inputs, year);
    returns.push((cashFlow / equityInvested) * 100);
  }

  return returns;
}

// Calculate break-even analysis
export function calculateBreakEven(inputs: OpportunityZoneInvestmentRoiInputs): { years: number; investment: number } {
  const annualCashFlow = calculateAnnualCashFlow(inputs, 1); // Simplified - assumes constant cash flow

  if (annualCashFlow <= 0) {
    return { years: Infinity, investment: Infinity };
  }

  const years = inputs.initialInvestment / annualCashFlow;
  const investment = annualCashFlow * inputs.holdingPeriod;

  return { years, investment };
}

// Generate yearly projections
export function generateYearlyProjections(inputs: OpportunityZoneInvestmentRoiInputs): OpportunityZoneInvestmentRoiOutputs['yearlyProjections'] {
  const projections = [];
  let propertyValue = inputs.propertyValue;
  let cumulativeCashFlow = 0;

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    const rentalIncome = inputs.expectedRentalIncome * Math.pow(1 + inputs.inflationRate / 100, year - 1);
    const operatingExpenses = inputs.operatingExpenses * Math.pow(1 + inputs.inflationRate / 100, year - 1);
    const noi = rentalIncome - operatingExpenses;
    const cashFlow = calculateAnnualCashFlow(inputs, year);

    cumulativeCashFlow += cashFlow;
    propertyValue *= (1 + inputs.expectedAppreciation / 100);

    const equityBuild = propertyValue - (inputs.initialInvestment * (inputs.leverageRatio / 100));
    const taxBenefits = calculateTaxDeferral(inputs) / inputs.holdingPeriod; // Simplified annual allocation

    projections.push({
      year,
      propertyValue,
      rentalIncome,
      operatingExpenses,
      noi,
      cashFlow,
      cumulativeCashFlow,
      equityBuild,
      taxBenefits
    });
  }

  return projections;
}

// Calculate sensitivity analysis
export function calculateSensitivityAnalysis(inputs: OpportunityZoneInvestmentRoiInputs): Pick<OpportunityZoneInvestmentRoiOutputs, 'sensitivityToAppreciation' | 'sensitivityToRent' | 'sensitivityToExpenses'> {
  const baseROI = calculateTotalROI(inputs);

  // Appreciation sensitivity
  const appreciationChange = 1; // 1 percentage point
  const highAppreciationInputs = { ...inputs, expectedAppreciation: inputs.expectedAppreciation + appreciationChange };
  const lowAppreciationInputs = { ...inputs, expectedAppreciation: inputs.expectedAppreciation - appreciationChange };
  const highAppreciationROI = calculateTotalROI(highAppreciationInputs);
  const lowAppreciationROI = calculateTotalROI(lowAppreciationInputs);
  const sensitivityToAppreciation = (highAppreciationROI - lowAppreciationROI) / (2 * appreciationChange);

  // Rent sensitivity
  const rentChange = 0.01; // 1%
  const highRentInputs = { ...inputs, expectedRentalIncome: inputs.expectedRentalIncome * (1 + rentChange) };
  const lowRentInputs = { ...inputs, expectedRentalIncome: inputs.expectedRentalIncome * (1 - rentChange) };
  const highRentROI = calculateTotalROI(highRentInputs);
  const lowRentROI = calculateTotalROI(lowRentInputs);
  const sensitivityToRent = (highRentROI - lowRentROI) / (2 * rentChange * 100);

  // Expense sensitivity
  const expenseChange = 0.01; // 1%
  const highExpenseInputs = { ...inputs, operatingExpenses: inputs.operatingExpenses * (1 + expenseChange) };
  const lowExpenseInputs = { ...inputs, operatingExpenses: inputs.operatingExpenses * (1 - expenseChange) };
  const highExpenseROI = calculateTotalROI(highExpenseInputs);
  const lowExpenseROI = calculateTotalROI(lowExpenseInputs);
  const sensitivityToExpenses = (highExpenseROI - lowExpenseROI) / (2 * expenseChange * 100);

  return {
    sensitivityToAppreciation,
    sensitivityToRent,
    sensitivityToExpenses
  };
}

// Generate scenario analysis
export function generateScenarioAnalysis(inputs: OpportunityZoneInvestmentRoiInputs): Pick<OpportunityZoneInvestmentRoiOutputs, 'conservativeScenario' | 'baseCaseScenario' | 'optimisticScenario'> {
  // Conservative scenario: lower appreciation, higher expenses, lower rent growth
  const conservativeInputs = {
    ...inputs,
    expectedAppreciation: Math.max(0, inputs.expectedAppreciation - 3),
    expectedRentalIncome: inputs.expectedRentalIncome * 0.95,
    operatingExpenses: inputs.operatingExpenses * 1.1,
    vacancyRate: inputs.vacancyRate + 2
  };

  // Base case: as entered
  const baseCaseInputs = inputs;

  // Optimistic scenario: higher appreciation, lower expenses, higher rent growth
  const optimisticInputs = {
    ...inputs,
    expectedAppreciation: inputs.expectedAppreciation + 3,
    expectedRentalIncome: inputs.expectedRentalIncome * 1.05,
    operatingExpenses: inputs.operatingExpenses * 0.9,
    vacancyRate: Math.max(0, inputs.vacancyRate - 1)
  };

  return {
    conservativeScenario: {
      roi: calculateTotalROI(conservativeInputs),
      irr: calculateIRR(conservativeInputs),
      riskLevel: 'Low' as const
    },
    baseCaseScenario: {
      roi: calculateTotalROI(baseCaseInputs),
      irr: calculateIRR(baseCaseInputs),
      riskLevel: 'Medium' as const
    },
    optimisticScenario: {
      roi: calculateTotalROI(optimisticInputs),
      irr: calculateIRR(optimisticInputs),
      riskLevel: 'High' as const
    }
  };
}

// Calculate compliance deadlines
export function calculateComplianceDeadlines(inputs: OpportunityZoneInvestmentRoiInputs): { deadline5Years: string; deadline7Years: string; status: string } {
  const investmentDate = new Date(inputs.investmentDate);
  const deadline5Years = new Date(investmentDate);
  deadline5Years.setFullYear(deadline5Years.getFullYear() + 5);

  const deadline7Years = new Date(investmentDate);
  deadline7Years.setFullYear(deadline7Years.getFullYear() + 7);

  const now = new Date();
  let status = 'On Track';

  if (now > deadline7Years) {
    status = 'Non-Compliant';
  } else if (now > deadline5Years) {
    status = 'At Risk';
  }

  return {
    deadline5Years: deadline5Years.toISOString().split('T')[0],
    deadline7Years: deadline7Years.toISOString().split('T')[0],
    status
  };
}

// Generate investment recommendation
export function generateInvestmentRecommendation(
  roi: number,
  irr: number,
  riskLevel: string
): OpportunityZoneInvestmentRoiOutputs['investmentRecommendation'] {
  const score = (roi / 10) + (irr / 10); // Simplified scoring

  if (score > 3 && riskLevel === 'Low') return 'Strong Buy';
  if (score > 2) return 'Buy';
  if (score > 1) return 'Hold';
  if (score > 0.5) return 'Sell';
  return 'Strong Sell';
}

// Main calculation function
export function calculateOpportunityZoneInvestmentRoi(inputs: OpportunityZoneInvestmentRoiInputs): OpportunityZoneInvestmentRoiOutputs {
  const taxDeferralAmount = calculateTaxDeferral(inputs);
  const stepUpInBasisValue = calculateStepUpInBasis(inputs);
  const capitalGainsTaxSavings = calculateCapitalGainsTaxSavings(inputs);
  const totalTaxBenefits = taxDeferralAmount + stepUpInBasisValue + capitalGainsTaxSavings;

  const annualCashFlow = [];
  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    annualCashFlow.push(calculateAnnualCashFlow(inputs, year));
  }

  const cumulativeCashFlow = annualCashFlow.reduce((acc, flow, index) => {
    acc.push((acc[index - 1] || 0) + flow);
    return acc;
  }, [] as number[]);

  const irr = calculateIRR(inputs);
  const npv = calculateNPV(inputs);
  const cashOnCashReturn = calculateCashOnCashReturns(inputs);

  const totalReturn = calculateExitValuation(inputs) + cumulativeCashFlow[cumulativeCashFlow.length - 1] - inputs.initialInvestment;
  const annualizedReturn = Math.pow(1 + totalReturn / inputs.initialInvestment, 1 / inputs.holdingPeriod) - 1;
  const roiPercentage = (totalReturn / inputs.initialInvestment) * 100;

  const afterTaxRoi = roiPercentage * (1 - inputs.capitalGainsTaxRate / 100);
  const taxEquivalentYield = roiPercentage / (1 - inputs.capitalGainsTaxRate / 100);

  // Simplified risk metrics
  const riskAdjustedReturn = roiPercentage / 2; // Simplified
  const sharpeRatio = roiPercentage / 10; // Simplified
  const maximumDrawdown = -5; // Simplified

  const breakEven = calculateBreakEven(inputs);

  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);
  const scenarioAnalysis = generateScenarioAnalysis(inputs);

  const complianceInfo = calculateComplianceDeadlines(inputs);

  const yearlyProjections = generateYearlyProjections(inputs);

  const exitValuation = calculateExitValuation(inputs);
  const exitCashFlow = calculateAnnualCashFlow(inputs, inputs.holdingPeriod);
  const capitalGainsTax = (exitValuation - inputs.initialInvestment) * (inputs.capitalGainsTaxRate / 100) * (1 - inputs.capitalGainsTaxReduction / 100);
  const afterTaxProceeds = exitValuation + exitCashFlow - capitalGainsTax;

  // Simplified comparisons
  const vsSP500 = roiPercentage - 10; // Assume S&P 500 returns 10%
  const vsRealEstateIndex = roiPercentage - 8; // Assume real estate index returns 8%
  const vsOpportunityZoneAverage = roiPercentage - 12; // Assume OZ average is 12%

  const investmentRecommendation = generateInvestmentRecommendation(roiPercentage, irr, 'Medium');
  const riskAssessment = 'Medium' as const;

  const keyStrengths = [];
  const keyRisks = [];
  const actionItems = [];

  if (roiPercentage > 15) keyStrengths.push('Strong ROI potential');
  if (totalTaxBenefits > inputs.initialInvestment * 0.1) keyStrengths.push('Significant tax benefits');
  if (irr > 12) keyStrengths.push('Attractive IRR');

  if (inputs.vacancyRate > 8) keyRisks.push('High vacancy risk');
  if (inputs.holdingPeriod < 5) keyRisks.push('Short holding period may limit tax benefits');
  if (complianceInfo.status !== 'On Track') keyRisks.push('Compliance timeline at risk');

  if (inputs.expectedAppreciation < 5) actionItems.push('Consider properties with higher growth potential');
  if (inputs.leverageRatio < 50) actionItems.push('Evaluate increasing leverage for higher returns');
  if (complianceInfo.status === 'At Risk') actionItems.push('Review compliance deadlines and requirements');

  return {
    taxDeferralAmount,
    stepUpInBasisValue,
    capitalGainsTaxSavings,
    totalTaxBenefits,
    annualCashFlow,
    cumulativeCashFlow,
    irr,
    npv,
    cashOnCashReturn,
    totalReturn,
    annualizedReturn,
    roiPercentage,
    afterTaxRoi,
    taxEquivalentYield,
    riskAdjustedReturn,
    sharpeRatio,
    maximumDrawdown,
    breakEvenYears: breakEven.years,
    breakEvenInvestment: breakEven.investment,
    ...sensitivityAnalysis,
    ...scenarioAnalysis,
    investmentDeadline5Years: complianceInfo.deadline5Years,
    investmentDeadline7Years: complianceInfo.deadline7Years,
    complianceStatus: complianceInfo.status as any,
    vsSP500,
    vsRealEstateIndex,
    vsOpportunityZoneAverage,
    investmentRecommendation,
    riskAssessment,
    keyStrengths,
    keyRisks,
    actionItems,
    yearlyProjections,
    exitValuation,
    exitCashFlow,
    capitalGainsTax,
    afterTaxProceeds
  };
}