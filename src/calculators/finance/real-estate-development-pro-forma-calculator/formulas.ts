/**
 * Real Estate Development Pro-Forma Calculator Formulas
 * Comprehensive real estate development financial projections and analysis
 */

/**
 * Calculate development costs breakdown
 */
export function calculateDevelopmentCosts(
  landCost: number,
  constructionCostPerSqFt: number,
  totalSqFt: number,
  softCostsPercentage: number = 15,
  contingencyPercentage: number = 5,
  marketingCost: number = 0,
  financingCost: number = 0
): {
  landCost: number;
  constructionCost: number;
  softCosts: number;
  contingency: number;
  marketingCost: number;
  financingCost: number;
  totalDevelopmentCost: number;
  costPerSqFt: number;
  totalSqFt: number;
  costBreakdown: {
    hardCosts: number;
    softCosts: number;
    contingency: number;
    marketing: number;
    financing: number;
  };
} {
  if (landCost < 0) {
    throw new Error('Land cost cannot be negative');
  }
  if (constructionCostPerSqFt < 0) {
    throw new Error('Construction cost per square foot cannot be negative');
  }
  if (totalSqFt <= 0) {
    throw new Error('Total square footage must be positive');
  }
  if (softCostsPercentage < 0 || softCostsPercentage > 100) {
    throw new Error('Soft costs percentage must be between 0 and 100');
  }
  if (contingencyPercentage < 0 || contingencyPercentage > 100) {
    throw new Error('Contingency percentage must be between 0 and 100');
  }

  const constructionCost = constructionCostPerSqFt * totalSqFt;
  const hardCosts = landCost + constructionCost;
  const softCosts = hardCosts * (softCostsPercentage / 100);
  const contingency = hardCosts * (contingencyPercentage / 100);

  const totalDevelopmentCost = hardCosts + softCosts + contingency + marketingCost + financingCost;
  const costPerSqFt = totalDevelopmentCost / totalSqFt;

  return {
    landCost: Math.round(landCost * 100) / 100,
    constructionCost: Math.round(constructionCost * 100) / 100,
    softCosts: Math.round(softCosts * 100) / 100,
    contingency: Math.round(contingency * 100) / 100,
    marketingCost: Math.round(marketingCost * 100) / 100,
    financingCost: Math.round(financingCost * 100) / 100,
    totalDevelopmentCost: Math.round(totalDevelopmentCost * 100) / 100,
    costPerSqFt: Math.round(costPerSqFt * 100) / 100,
    totalSqFt,
    costBreakdown: {
      hardCosts: Math.round(hardCosts * 100) / 100,
      softCosts: Math.round(softCosts * 100) / 100,
      contingency: Math.round(contingency * 100) / 100,
      marketing: Math.round(marketingCost * 100) / 100,
      financing: Math.round(financingCost * 100) / 100
    }
  };
}

/**
 * Calculate revenue projections
 */
export function calculateRevenueProjections(
  totalSqFt: number,
  rentalRatePerSqFt: number,
  occupancyRate: number = 95,
  annualRentIncrease: number = 3,
  holdingPeriodYears: number = 5,
  exitCapRate: number = 6
): {
  totalSqFt: number;
  rentalRatePerSqFt: number;
  occupancyRate: number;
  annualRentIncrease: number;
  holdingPeriodYears: number;
  exitCapRate: number;
  grossAnnualRent: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  exitValue: number;
  annualCashFlow: Array<{
    year: number;
    grossRent: number;
    effectiveGrossIncome: number;
    operatingExpenses: number;
    netOperatingIncome: number;
    cashFlow: number;
  }>;
} {
  if (totalSqFt <= 0) {
    throw new Error('Total square footage must be positive');
  }
  if (rentalRatePerSqFt < 0) {
    throw new Error('Rental rate per square foot cannot be negative');
  }
  if (occupancyRate < 0 || occupancyRate > 100) {
    throw new Error('Occupancy rate must be between 0 and 100');
  }
  if (annualRentIncrease < -50 || annualRentIncrease > 50) {
    throw new Error('Annual rent increase must be between -50% and 50%');
  }
  if (holdingPeriodYears <= 0) {
    throw new Error('Holding period must be positive');
  }
  if (exitCapRate <= 0) {
    throw new Error('Exit cap rate must be positive');
  }

  const annualCashFlow = [];
  let currentRentPerSqFt = rentalRatePerSqFt;

  for (let year = 1; year <= holdingPeriodYears; year++) {
    const grossAnnualRent = totalSqFt * currentRentPerSqFt;
    const effectiveGrossIncome = grossAnnualRent * (occupancyRate / 100);
    const operatingExpenses = effectiveGrossIncome * 0.35; // Assume 35% operating expenses
    const netOperatingIncome = effectiveGrossIncome - operatingExpenses;
    const cashFlow = netOperatingIncome; // Simplified - no debt service in this calculation

    annualCashFlow.push({
      year,
      grossRent: Math.round(grossAnnualRent * 100) / 100,
      effectiveGrossIncome: Math.round(effectiveGrossIncome * 100) / 100,
      operatingExpenses: Math.round(operatingExpenses * 100) / 100,
      netOperatingIncome: Math.round(netOperatingIncome * 100) / 100,
      cashFlow: Math.round(cashFlow * 100) / 100
    });

    // Increase rent for next year
    currentRentPerSqFt *= (1 + annualRentIncrease / 100);
  }

  // Calculate exit value
  const finalYearNOI = annualCashFlow[annualCashFlow.length - 1].netOperatingIncome;
  const exitValue = finalYearNOI / (exitCapRate / 100);

  return {
    totalSqFt,
    rentalRatePerSqFt: Math.round(rentalRatePerSqFt * 100) / 100,
    occupancyRate,
    annualRentIncrease,
    holdingPeriodYears,
    exitCapRate,
    grossAnnualRent: Math.round(annualCashFlow[0].grossRent * 100) / 100,
    effectiveGrossIncome: Math.round(annualCashFlow[0].effectiveGrossIncome * 100) / 100,
    netOperatingIncome: Math.round(annualCashFlow[0].netOperatingIncome * 100) / 100,
    exitValue: Math.round(exitValue * 100) / 100,
    annualCashFlow
  };
}

/**
 * Calculate financing and debt service
 */
export function calculateDevelopmentFinancing(
  totalDevelopmentCost: number,
  equityPercentage: number = 30,
  interestRate: number = 5,
  loanTermYears: number = 25,
  constructionPeriodMonths: number = 12,
  interestOnlyPeriodMonths: number = 24
): {
  totalDevelopmentCost: number;
  equityPercentage: number;
  loanAmount: number;
  equityAmount: number;
  interestRate: number;
  loanTermYears: number;
  constructionPeriodMonths: number;
  interestOnlyPeriodMonths: number;
  monthlyDebtService: number;
  annualDebtService: number;
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  debtYield: number;
  financingSummary: {
    totalLoanPayments: number;
    totalInterestPaid: number;
    principalPaid: number;
  };
} {
  if (totalDevelopmentCost <= 0) {
    throw new Error('Total development cost must be positive');
  }
  if (equityPercentage < 0 || equityPercentage > 100) {
    throw new Error('Equity percentage must be between 0 and 100');
  }
  if (interestRate < 0) {
    throw new Error('Interest rate cannot be negative');
  }
  if (loanTermYears <= 0) {
    throw new Error('Loan term must be positive');
  }

  const equityAmount = totalDevelopmentCost * (equityPercentage / 100);
  const loanAmount = totalDevelopmentCost - equityAmount;
  const loanToValueRatio = (loanAmount / totalDevelopmentCost) * 100;

  // Calculate construction period interest
  const constructionInterest = loanAmount * (interestRate / 100) * (constructionPeriodMonths / 12);

  // Calculate permanent financing
  const permanentLoanAmount = loanAmount + constructionInterest;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  // Interest-only period
  const interestOnlyPayments = interestOnlyPeriodMonths;
  const amortizingPayments = numberOfPayments - interestOnlyPayments;

  // Monthly payment calculation
  let monthlyDebtService = 0;
  if (amortizingPayments > 0) {
    monthlyDebtService = permanentLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, amortizingPayments)) /
                        (Math.pow(1 + monthlyRate, amortizingPayments) - 1);
  } else {
    monthlyDebtService = permanentLoanAmount * monthlyRate;
  }

  const annualDebtService = monthlyDebtService * 12;
  const totalLoanPayments = monthlyDebtService * numberOfPayments;
  const totalInterestPaid = totalLoanPayments - permanentLoanAmount;
  const principalPaid = permanentLoanAmount;

  // Assume NOI for DSCR calculation (simplified)
  const assumedNOI = totalDevelopmentCost * 0.08; // 8% cap rate assumption
  const debtServiceCoverageRatio = assumedNOI / annualDebtService;
  const debtYield = (assumedNOI / loanAmount) * 100;

  return {
    totalDevelopmentCost: Math.round(totalDevelopmentCost * 100) / 100,
    equityPercentage,
    loanAmount: Math.round(loanAmount * 100) / 100,
    equityAmount: Math.round(equityAmount * 100) / 100,
    interestRate,
    loanTermYears,
    constructionPeriodMonths,
    interestOnlyPeriodMonths,
    monthlyDebtService: Math.round(monthlyDebtService * 100) / 100,
    annualDebtService: Math.round(annualDebtService * 100) / 100,
    debtServiceCoverageRatio: Math.round(debtServiceCoverageRatio * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    debtYield: Math.round(debtYield * 100) / 100,
    financingSummary: {
      totalLoanPayments: Math.round(totalLoanPayments * 100) / 100,
      totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100
    }
  };
}

/**
 * Calculate investment returns and IRR
 */
export function calculateInvestmentReturns(
  totalDevelopmentCost: number,
  equityAmount: number,
  annualCashFlow: number[],
  exitValue: number,
  holdingPeriodYears: number
): {
  totalDevelopmentCost: number;
  equityAmount: number;
  exitValue: number;
  holdingPeriodYears: number;
  totalCashFlow: number;
  equityMultiple: number;
  internalRateOfReturn: number;
  cashOnCashReturn: number;
  profit: number;
  returnMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    equityPaybackPeriod: number;
  };
} {
  if (totalDevelopmentCost <= 0) {
    throw new Error('Total development cost must be positive');
  }
  if (equityAmount <= 0) {
    throw new Error('Equity amount must be positive');
  }
  if (exitValue < 0) {
    throw new Error('Exit value cannot be negative');
  }
  if (holdingPeriodYears <= 0) {
    throw new Error('Holding period must be positive');
  }
  if (annualCashFlow.length !== holdingPeriodYears) {
    throw new Error('Annual cash flow array must match holding period');
  }

  const totalCashFlow = annualCashFlow.reduce((sum, cf) => sum + cf, 0) + exitValue;
  const profit = totalCashFlow - equityAmount;
  const equityMultiple = totalCashFlow / equityAmount;
  const cashOnCashReturn = (annualCashFlow[0] / equityAmount) * 100; // First year CoC

  // Calculate IRR using approximation
  const initialInvestment = -equityAmount;
  const cashFlows = [initialInvestment, ...annualCashFlow, exitValue];
  const internalRateOfReturn = calculateIRR(cashFlows);

  const totalReturn = ((totalCashFlow - equityAmount) / equityAmount) * 100;
  const annualizedReturn = Math.pow(equityMultiple, 1 / holdingPeriodYears) - 1;

  // Calculate payback period
  let cumulativeCashFlow = 0;
  let paybackPeriod = holdingPeriodYears;
  for (let year = 0; year < annualCashFlow.length; year++) {
    cumulativeCashFlow += annualCashFlow[year];
    if (cumulativeCashFlow >= equityAmount) {
      paybackPeriod = year + 1 - ((cumulativeCashFlow - equityAmount) / annualCashFlow[year]);
      break;
    }
  }

  return {
    totalDevelopmentCost: Math.round(totalDevelopmentCost * 100) / 100,
    equityAmount: Math.round(equityAmount * 100) / 100,
    exitValue: Math.round(exitValue * 100) / 100,
    holdingPeriodYears,
    totalCashFlow: Math.round(totalCashFlow * 100) / 100,
    equityMultiple: Math.round(equityMultiple * 100) / 100,
    internalRateOfReturn: Math.round(internalRateOfReturn * 10000) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    returnMetrics: {
      totalReturn: Math.round(totalReturn * 100) / 100,
      annualizedReturn: Math.round(annualizedReturn * 10000) / 100,
      equityPaybackPeriod: Math.round(paybackPeriod * 100) / 100
    }
  };
}

/**
 * Calculate IRR using Newton-Raphson approximation
 */
function calculateIRR(cashFlows: number[]): number {
  const maxIterations = 100;
  const tolerance = 0.0001;
  let rate = 0.1; // Initial guess of 10%

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + rate, j);
      if (j > 0) {
        dnpv -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
      }
    }

    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }

    rate = newRate;

    // Prevent infinite loops
    if (rate < -0.99 || rate > 0.99) {
      return 0; // Return 0% if calculation fails to converge
    }
  }

  return rate;
}

/**
 * Calculate sensitivity analysis
 */
export function calculateSensitivityAnalysis(
  baseCase: {
    totalCost: number;
    revenue: number;
    noi: number;
    irr: number;
  },
  variables: {
    costVariance: number[];
    revenueVariance: number[];
    capRateVariance: number[];
  }
): {
  baseCase: any;
  sensitivityMatrix: Array<{
    variable: string;
    variance: number;
    newIRR: number;
    change: number;
  }>;
  worstCaseScenario: {
    totalCost: number;
    revenue: number;
    irr: number;
    changeFromBase: number;
  };
  bestCaseScenario: {
    totalCost: number;
    revenue: number;
    irr: number;
    changeFromBase: number;
  };
} {
  const sensitivityMatrix = [];

  // Cost sensitivity
  variables.costVariance.forEach(variance => {
    const newCost = baseCase.totalCost * (1 + variance / 100);
    const newNOI = baseCase.noi * (baseCase.totalCost / newCost); // Simplified
    const newIRR = baseCase.irr * (newNOI / baseCase.noi); // Simplified approximation

    sensitivityMatrix.push({
      variable: 'Cost',
      variance,
      newIRR: Math.round(newIRR * 100) / 100,
      change: Math.round((newIRR - baseCase.irr) * 100) / 100
    });
  });

  // Revenue sensitivity
  variables.revenueVariance.forEach(variance => {
    const newRevenue = baseCase.revenue * (1 + variance / 100);
    const newNOI = baseCase.noi * (newRevenue / baseCase.revenue);
    const newIRR = baseCase.irr * (newNOI / baseCase.noi);

    sensitivityMatrix.push({
      variable: 'Revenue',
      variance,
      newIRR: Math.round(newIRR * 100) / 100,
      change: Math.round((newIRR - baseCase.irr) * 100) / 100
    });
  });

  // Cap rate sensitivity
  variables.capRateVariance.forEach(variance => {
    const newIRR = baseCase.irr * (1 + variance / 100); // Simplified

    sensitivityMatrix.push({
      variable: 'Cap Rate',
      variance,
      newIRR: Math.round(newIRR * 100) / 100,
      change: Math.round((newIRR - baseCase.irr) * 100) / 100
    });
  });

  // Find worst and best case scenarios
  const sortedByIRR = sensitivityMatrix.sort((a, b) => a.newIRR - b.newIRR);
  const worstCase = sortedByIRR[0];
  const bestCase = sortedByIRR[sortedByIRR.length - 1];

  return {
    baseCase,
    sensitivityMatrix,
    worstCaseScenario: {
      totalCost: baseCase.totalCost,
      revenue: baseCase.revenue,
      irr: worstCase.newIRR,
      changeFromBase: worstCase.change
    },
    bestCaseScenario: {
      totalCost: baseCase.totalCost,
      revenue: baseCase.revenue,
      irr: bestCase.newIRR,
      changeFromBase: bestCase.change
    }
  };
}

/**
 * Main real estate development pro-forma calculation function
 */
export function calculateRealEstateDevelopment(inputs: any): any {
  const {
    calculationType,
    landCost, constructionCostPerSqFt, totalSqFt, softCostsPercentage,
    contingencyPercentage, marketingCost, financingCost,
    rentalRatePerSqFt, occupancyRate, annualRentIncrease, holdingPeriodYears, exitCapRate,
    equityPercentage, interestRate, loanTermYears, constructionPeriodMonths, interestOnlyPeriodMonths,
    costVariance, revenueVariance, capRateVariance
  } = inputs;

  switch (calculationType) {
    case 'development_costs':
      return calculateDevelopmentCosts(
        landCost,
        constructionCostPerSqFt,
        totalSqFt,
        softCostsPercentage,
        contingencyPercentage,
        marketingCost,
        financingCost
      );

    case 'revenue_projections':
      return calculateRevenueProjections(
        totalSqFt,
        rentalRatePerSqFt,
        occupancyRate,
        annualRentIncrease,
        holdingPeriodYears,
        exitCapRate
      );

    case 'financing':
      return calculateDevelopmentFinancing(
        landCost + (constructionCostPerSqFt * totalSqFt), // Total development cost
        equityPercentage,
        interestRate,
        loanTermYears,
        constructionPeriodMonths,
        interestOnlyPeriodMonths
      );

    case 'investment_returns':
      const costs = calculateDevelopmentCosts(
        landCost || 100000,
        constructionCostPerSqFt || 150,
        totalSqFt || 10000,
        softCostsPercentage || 15,
        contingencyPercentage || 5,
        marketingCost || 0,
        financingCost || 0
      );

      const revenue = calculateRevenueProjections(
        totalSqFt || 10000,
        rentalRatePerSqFt || 25,
        occupancyRate || 95,
        annualRentIncrease || 3,
        holdingPeriodYears || 5,
        exitCapRate || 6
      );

      const financing = calculateDevelopmentFinancing(
        costs.totalDevelopmentCost,
        equityPercentage || 30,
        interestRate || 5,
        loanTermYears || 25,
        constructionPeriodMonths || 12,
        interestOnlyPeriodMonths || 24
      );

      return calculateInvestmentReturns(
        costs.totalDevelopmentCost,
        financing.equityAmount,
        revenue.annualCashFlow.map(cf => cf.cashFlow),
        revenue.exitValue,
        holdingPeriodYears || 5
      );

    case 'sensitivity_analysis':
      const baseCosts = calculateDevelopmentCosts(
        landCost || 100000,
        constructionCostPerSqFt || 150,
        totalSqFt || 10000,
        softCostsPercentage || 15,
        contingencyPercentage || 5,
        marketingCost || 0,
        financingCost || 0
      );

      const baseRevenue = calculateRevenueProjections(
        totalSqFt || 10000,
        rentalRatePerSqFt || 25,
        occupancyRate || 95,
        annualRentIncrease || 3,
        holdingPeriodYears || 5,
        exitCapRate || 6
      );

      const baseCase = {
        totalCost: baseCosts.totalDevelopmentCost,
        revenue: baseRevenue.grossAnnualRent,
        noi: baseRevenue.netOperatingIncome,
        irr: 12 // Assumed base IRR
      };

      return calculateSensitivityAnalysis(
        baseCase,
        {
          costVariance: costVariance || [-20, -10, 10, 20],
          revenueVariance: revenueVariance || [-15, -5, 5, 15],
          capRateVariance: capRateVariance || [-10, -5, 5, 10]
        }
      );

    case 'comprehensive':
      // Calculate all components for comprehensive pro-forma analysis
      const devCosts = calculateDevelopmentCosts(
        landCost || 100000,
        constructionCostPerSqFt || 150,
        totalSqFt || 10000,
        softCostsPercentage || 15,
        contingencyPercentage || 5,
        marketingCost || 0,
        financingCost || 0
      );

      const revProjection = calculateRevenueProjections(
        totalSqFt || 10000,
        rentalRatePerSqFt || 25,
        occupancyRate || 95,
        annualRentIncrease || 3,
        holdingPeriodYears || 5,
        exitCapRate || 6
      );

      const financingCalc = calculateDevelopmentFinancing(
        devCosts.totalDevelopmentCost,
        equityPercentage || 30,
        interestRate || 5,
        loanTermYears || 25,
        constructionPeriodMonths || 12,
        interestOnlyPeriodMonths || 24
      );

      const returns = calculateInvestmentReturns(
        devCosts.totalDevelopmentCost,
        financingCalc.equityAmount,
        revProjection.annualCashFlow.map(cf => cf.cashFlow),
        revProjection.exitValue,
        holdingPeriodYears || 5
      );

      return {
        developmentCosts: devCosts,
        revenueProjections: revProjection,
        financing: financingCalc,
        investmentReturns: returns,
        summary: {
          totalDevelopmentCost: devCosts.totalDevelopmentCost,
          totalEquityRequired: financingCalc.equityAmount,
          year1NOI: revProjection.netOperatingIncome,
          exitValue: revProjection.exitValue,
          irr: returns.internalRateOfReturn,
          equityMultiple: returns.equityMultiple,
          cashOnCashReturn: returns.cashOnCashReturn
        }
      };

    default:
      throw new Error('Unknown real estate development calculation type');
  }
}