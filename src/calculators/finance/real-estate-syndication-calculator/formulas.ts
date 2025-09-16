/**
 * Real Estate Syndication Calculator Formulas
 * Comprehensive syndication structure and investor return calculations
 */

/**
 * Calculate syndication structure and ownership splits
 */
export function calculateSyndicationStructure(
  totalRaise: number,
  sponsorEquity: number,
  investorEquity: number,
  preferredReturn: number = 8,
  profitSplit: { sponsor: number; investors: number } = { sponsor: 20, investors: 80 }
): {
  totalRaise: number;
  sponsorEquity: number;
  investorEquity: number;
  totalEquity: number;
  sponsorOwnership: number;
  investorOwnership: number;
  preferredReturn: number;
  profitSplit: { sponsor: number; investors: number };
  capitalStructure: {
    sponsorEquity: number;
    investorEquity: number;
    totalEquity: number;
    sponsorPercentage: number;
    investorPercentage: number;
  };
} {
  if (totalRaise < 0) {
    throw new Error('Total raise cannot be negative');
  }
  if (sponsorEquity < 0) {
    throw new Error('Sponsor equity cannot be negative');
  }
  if (investorEquity < 0) {
    throw new Error('Investor equity cannot be negative');
  }
  if (preferredReturn < 0 || preferredReturn > 50) {
    throw new Error('Preferred return must be between 0 and 50');
  }
  if (profitSplit.sponsor + profitSplit.investors !== 100) {
    throw new Error('Profit split percentages must total 100');
  }

  const totalEquity = sponsorEquity + investorEquity;
  const sponsorOwnership = totalEquity > 0 ? (sponsorEquity / totalEquity) * 100 : 0;
  const investorOwnership = totalEquity > 0 ? (investorEquity / totalEquity) * 100 : 0;

  return {
    totalRaise: Math.round(totalRaise * 100) / 100,
    sponsorEquity: Math.round(sponsorEquity * 100) / 100,
    investorEquity: Math.round(investorEquity * 100) / 100,
    totalEquity: Math.round(totalEquity * 100) / 100,
    sponsorOwnership: Math.round(sponsorOwnership * 100) / 100,
    investorOwnership: Math.round(investorOwnership * 100) / 100,
    preferredReturn,
    profitSplit,
    capitalStructure: {
      sponsorEquity: Math.round(sponsorEquity * 100) / 100,
      investorEquity: Math.round(investorEquity * 100) / 100,
      totalEquity: Math.round(totalEquity * 100) / 100,
      sponsorPercentage: Math.round(sponsorOwnership * 100) / 100,
      investorPercentage: Math.round(investorOwnership * 100) / 100
    }
  };
}

/**
 * Calculate waterfall distribution structure
 */
export function calculateWaterfallDistribution(
  totalProfit: number,
  investorEquity: number,
  sponsorEquity: number,
  preferredReturn: number = 8,
  profitSplit: { sponsor: number; investors: number } = { sponsor: 20, investors: 80 },
  promoteStructure: 'straight' | 'tiered' = 'straight'
): {
  totalProfit: number;
  investorEquity: number;
  sponsorEquity: number;
  preferredReturn: number;
  profitSplit: { sponsor: number; investors: number };
  promoteStructure: string;
  preferredReturnAmount: number;
  remainingProfit: number;
  investorShare: number;
  sponsorShare: number;
  sponsorPromote: number;
  distributionWaterfall: {
    tier1: { description: string; amount: number; recipient: string };
    tier2: { description: string; amount: number; recipient: string };
    tier3: { description: string; amount: number; recipient: string };
  };
} {
  if (totalProfit < 0) {
    throw new Error('Total profit cannot be negative');
  }
  if (investorEquity < 0) {
    throw new Error('Investor equity cannot be negative');
  }
  if (sponsorEquity < 0) {
    throw new Error('Sponsor equity cannot be negative');
  }
  if (preferredReturn < 0 || preferredReturn > 50) {
    throw new Error('Preferred return must be between 0 and 50');
  }

  const totalEquity = investorEquity + sponsorEquity;
  const preferredReturnAmount = totalEquity * (preferredReturn / 100);
  const remainingProfit = Math.max(0, totalProfit - preferredReturnAmount);

  let investorShare = 0;
  let sponsorShare = 0;
  let sponsorPromote = 0;

  if (remainingProfit > 0) {
    investorShare = remainingProfit * (profitSplit.investors / 100);
    sponsorShare = remainingProfit * (profitSplit.sponsor / 100);
    sponsorPromote = sponsorShare;
  }

  const distributionWaterfall = {
    tier1: {
      description: 'Preferred Return',
      amount: Math.round(Math.min(preferredReturnAmount, totalProfit) * 100) / 100,
      recipient: 'Investors'
    },
    tier2: {
      description: 'Profit Split',
      amount: Math.round(investorShare * 100) / 100,
      recipient: 'Investors'
    },
    tier3: {
      description: 'Sponsor Promote',
      amount: Math.round(sponsorPromote * 100) / 100,
      recipient: 'Sponsor'
    }
  };

  return {
    totalProfit: Math.round(totalProfit * 100) / 100,
    investorEquity: Math.round(investorEquity * 100) / 100,
    sponsorEquity: Math.round(sponsorEquity * 100) / 100,
    preferredReturn,
    profitSplit,
    promoteStructure,
    preferredReturnAmount: Math.round(preferredReturnAmount * 100) / 100,
    remainingProfit: Math.round(remainingProfit * 100) / 100,
    investorShare: Math.round(investorShare * 100) / 100,
    sponsorShare: Math.round(sponsorShare * 100) / 100,
    sponsorPromote: Math.round(sponsorPromote * 100) / 100,
    distributionWaterfall
  };
}

/**
 * Calculate investor returns and IRR
 */
export function calculateInvestorReturns(
  initialInvestment: number,
  annualCashFlow: number[],
  exitValue: number,
  holdingPeriod: number
): {
  initialInvestment: number;
  annualCashFlow: number[];
  exitValue: number;
  holdingPeriod: number;
  totalCashFlow: number;
  totalReturn: number;
  multipleOfInvestedCapital: number;
  cashOnCashReturn: number;
  internalRateOfReturn: number;
  annualizedReturn: number;
  returnMetrics: {
    totalReturnPercentage: number;
    annualizedReturnPercentage: number;
    paybackPeriod: number;
  };
} {
  if (initialInvestment <= 0) {
    throw new Error('Initial investment must be positive');
  }
  if (holdingPeriod < 1) {
    throw new Error('Holding period must be at least 1 year');
  }
  if (annualCashFlow.length !== holdingPeriod) {
    throw new Error('Annual cash flow array must match holding period');
  }

  const totalCashFlow = annualCashFlow.reduce((sum, cf) => sum + cf, 0) + exitValue;
  const totalReturn = totalCashFlow - initialInvestment;
  const multipleOfInvestedCapital = totalCashFlow / initialInvestment;
  const cashOnCashReturn = annualCashFlow.length > 0 ? (annualCashFlow[0] / initialInvestment) * 100 : 0;

  // Calculate IRR using approximation
  const cashFlows = [-initialInvestment, ...annualCashFlow, exitValue];
  const internalRateOfReturn = calculateIRR(cashFlows);

  const annualizedReturn = Math.pow(multipleOfInvestedCapital, 1 / holdingPeriod) - 1;

  // Calculate payback period
  let cumulativeCashFlow = 0;
  let paybackPeriod = holdingPeriod;
  for (let year = 0; year < annualCashFlow.length; year++) {
    cumulativeCashFlow += annualCashFlow[year];
    if (cumulativeCashFlow >= initialInvestment) {
      paybackPeriod = year + 1 - ((cumulativeCashFlow - initialInvestment) / annualCashFlow[year]);
      break;
    }
  }

  return {
    initialInvestment: Math.round(initialInvestment * 100) / 100,
    annualCashFlow: annualCashFlow.map(cf => Math.round(cf * 100) / 100),
    exitValue: Math.round(exitValue * 100) / 100,
    holdingPeriod,
    totalCashFlow: Math.round(totalCashFlow * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    multipleOfInvestedCapital: Math.round(multipleOfInvestedCapital * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    internalRateOfReturn: Math.round(internalRateOfReturn * 10000) / 100,
    annualizedReturn: Math.round(annualizedReturn * 10000) / 100,
    returnMetrics: {
      totalReturnPercentage: Math.round((totalReturn / initialInvestment) * 100 * 100) / 100,
      annualizedReturnPercentage: Math.round(annualizedReturn * 100 * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100
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
 * Calculate syndication fees and costs
 */
export function calculateSyndicationFees(
  totalRaise: number,
  assetManagementFee: number = 2,
  acquisitionFee: number = 3,
  dispositionFee: number = 1,
  organizationalFees: number = 5000,
  operatingExpenseReimbursement: number = 0
): {
  totalRaise: number;
  assetManagementFee: number;
  acquisitionFee: number;
  dispositionFee: number;
  organizationalFees: number;
  operatingExpenseReimbursement: number;
  totalFees: number;
  feeBreakdown: {
    assetManagement: number;
    acquisition: number;
    disposition: number;
    organizational: number;
    operatingExpenses: number;
  };
  netRaise: number;
  feePercentage: number;
} {
  if (totalRaise < 0) {
    throw new Error('Total raise cannot be negative');
  }
  if (assetManagementFee < 0 || assetManagementFee > 20) {
    throw new Error('Asset management fee must be between 0 and 20');
  }
  if (acquisitionFee < 0 || acquisitionFee > 10) {
    throw new Error('Acquisition fee must be between 0 and 10');
  }
  if (dispositionFee < 0 || dispositionFee > 5) {
    throw new Error('Disposition fee must be between 0 and 5');
  }

  const assetManagement = totalRaise * (assetManagementFee / 100);
  const acquisition = totalRaise * (acquisitionFee / 100);
  const disposition = totalRaise * (dispositionFee / 100);

  const totalFees = assetManagement + acquisition + disposition + organizationalFees + operatingExpenseReimbursement;
  const netRaise = totalRaise - totalFees;
  const feePercentage = (totalFees / totalRaise) * 100;

  return {
    totalRaise: Math.round(totalRaise * 100) / 100,
    assetManagementFee,
    acquisitionFee,
    dispositionFee,
    organizationalFees: Math.round(organizationalFees * 100) / 100,
    operatingExpenseReimbursement: Math.round(operatingExpenseReimbursement * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    feeBreakdown: {
      assetManagement: Math.round(assetManagement * 100) / 100,
      acquisition: Math.round(acquisition * 100) / 100,
      disposition: Math.round(disposition * 100) / 100,
      organizational: Math.round(organizationalFees * 100) / 100,
      operatingExpenses: Math.round(operatingExpenseReimbursement * 100) / 100
    },
    netRaise: Math.round(netRaise * 100) / 100,
    feePercentage: Math.round(feePercentage * 100) / 100
  };
}

/**
 * Calculate syndication risk metrics
 */
export function calculateSyndicationRiskMetrics(
  totalInvestment: number,
  loanAmount: number,
  noi: number,
  dscr: number,
  ltv: number,
  stressTestScenarios: {
    noiDecline: number[];
    interestRateIncrease: number[];
    vacancyIncrease: number[];
  } = {
    noiDecline: [-10, -20, -30],
    interestRateIncrease: [1, 2, 3],
    vacancyIncrease: [5, 10, 15]
  }
): {
  totalInvestment: number;
  loanAmount: number;
  noi: number;
  dscr: number;
  ltv: number;
  riskMetrics: {
    debtServiceCoverageRatio: number;
    loanToValueRatio: number;
    debtYield: number;
    equityMultiple: number;
  };
  stressTestResults: Array<{
    scenario: string;
    stressFactor: number;
    newNOI: number;
    newDSCR: number;
    riskLevel: string;
  }>;
  overallRiskAssessment: {
    riskLevel: string;
    riskFactors: string[];
    recommendations: string[];
  };
} {
  if (totalInvestment <= 0) {
    throw new Error('Total investment must be positive');
  }
  if (loanAmount < 0) {
    throw new Error('Loan amount cannot be negative');
  }
  if (noi < 0) {
    throw new Error('NOI cannot be negative');
  }
  if (dscr < 0) {
    throw new Error('DSCR cannot be negative');
  }
  if (ltv < 0 || ltv > 100) {
    throw new Error('LTV must be between 0 and 100');
  }

  const annualDebtService = loanAmount > 0 ? loanAmount * 0.06 : 0; // Assume 6% interest
  const calculatedDSCR = annualDebtService > 0 ? noi / annualDebtService : 0;
  const calculatedLTV = (loanAmount / totalInvestment) * 100;
  const debtYield = (noi / loanAmount) * 100;
  const equityAmount = totalInvestment - loanAmount;
  const equityMultiple = equityAmount > 0 ? (noi * 10 + equityAmount) / equityAmount : 0; // Simplified 10-year projection

  const riskMetrics = {
    debtServiceCoverageRatio: Math.round(calculatedDSCR * 100) / 100,
    loanToValueRatio: Math.round(calculatedLTV * 100) / 100,
    debtYield: Math.round(debtYield * 100) / 100,
    equityMultiple: Math.round(equityMultiple * 100) / 100
  };

  // Stress test calculations
  const stressTestResults = [];

  // NOI decline scenarios
  stressTestScenarios.noiDecline.forEach(decline => {
    const newNOI = noi * (1 + decline / 100);
    const newDSCR = annualDebtService > 0 ? newNOI / annualDebtService : 0;
    const riskLevel = newDSCR < 1.25 ? 'High' : newDSCR < 1.5 ? 'Medium' : 'Low';

    stressTestResults.push({
      scenario: 'NOI Decline',
      stressFactor: decline,
      newNOI: Math.round(newNOI * 100) / 100,
      newDSCR: Math.round(newDSCR * 100) / 100,
      riskLevel
    });
  });

  // Interest rate increase scenarios
  stressTestScenarios.interestRateIncrease.forEach(increase => {
    const newDebtService = annualDebtService * (1 + increase / 100);
    const newDSCR = newDebtService > 0 ? noi / newDebtService : 0;
    const riskLevel = newDSCR < 1.25 ? 'High' : newDSCR < 1.5 ? 'Medium' : 'Low';

    stressTestResults.push({
      scenario: 'Interest Rate Increase',
      stressFactor: increase,
      newNOI: Math.round(noi * 100) / 100,
      newDSCR: Math.round(newDSCR * 100) / 100,
      riskLevel
    });
  });

  // Determine overall risk assessment
  const riskFactors = [];
  const recommendations = [];

  if (calculatedDSCR < 1.25) {
    riskFactors.push('Low DSCR');
    recommendations.push('Consider lower leverage or higher quality property');
  }
  if (calculatedLTV > 75) {
    riskFactors.push('High LTV');
    recommendations.push('Reduce leverage to improve risk profile');
  }
  if (debtYield < 8) {
    riskFactors.push('Low debt yield');
    recommendations.push('Seek properties with higher cash flow stability');
  }

  const overallRiskLevel = riskFactors.length >= 2 ? 'High' :
                          riskFactors.length === 1 ? 'Medium' : 'Low';

  return {
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    noi: Math.round(noi * 100) / 100,
    dscr: Math.round(calculatedDSCR * 100) / 100,
    ltv: Math.round(calculatedLTV * 100) / 100,
    riskMetrics,
    stressTestResults,
    overallRiskAssessment: {
      riskLevel: overallRiskLevel,
      riskFactors,
      recommendations
    }
  };
}

/**
 * Main real estate syndication calculation function
 */
export function calculateRealEstateSyndication(inputs: any): any {
  const {
    calculationType,
    totalRaise, sponsorEquity, investorEquity, preferredReturn, profitSplit,
    totalProfit, promoteStructure,
    initialInvestment, annualCashFlow, exitValue, holdingPeriod,
    assetManagementFee, acquisitionFee, dispositionFee, organizationalFees, operatingExpenseReimbursement,
    totalInvestment, loanAmount, noi, dscr, ltv, stressTestScenarios
  } = inputs;

  switch (calculationType) {
    case 'syndication_structure':
      return calculateSyndicationStructure(
        totalRaise,
        sponsorEquity,
        investorEquity,
        preferredReturn,
        profitSplit
      );

    case 'waterfall_distribution':
      return calculateWaterfallDistribution(
        totalProfit,
        investorEquity,
        sponsorEquity,
        preferredReturn,
        profitSplit,
        promoteStructure
      );

    case 'investor_returns':
      return calculateInvestorReturns(
        initialInvestment,
        annualCashFlow,
        exitValue,
        holdingPeriod
      );

    case 'syndication_fees':
      return calculateSyndicationFees(
        totalRaise,
        assetManagementFee,
        acquisitionFee,
        dispositionFee,
        organizationalFees,
        operatingExpenseReimbursement
      );

    case 'risk_metrics':
      return calculateSyndicationRiskMetrics(
        totalInvestment,
        loanAmount,
        noi,
        dscr,
        ltv,
        stressTestScenarios
      );

    case 'comprehensive':
      // Calculate comprehensive syndication analysis
      const structure = calculateSyndicationStructure(
        totalRaise || 1000000,
        sponsorEquity || 100000,
        investorEquity || 900000,
        preferredReturn || 8,
        profitSplit || { sponsor: 20, investors: 80 }
      );

      const waterfall = calculateWaterfallDistribution(
        totalProfit || 500000,
        investorEquity || 900000,
        sponsorEquity || 100000,
        preferredReturn || 8,
        profitSplit || { sponsor: 20, investors: 80 },
        promoteStructure || 'straight'
      );

      const returns = calculateInvestorReturns(
        initialInvestment || 100000,
        annualCashFlow || [8000, 8500, 9000, 9500, 10000],
        exitValue || 150000,
        holdingPeriod || 5
      );

      const fees = calculateSyndicationFees(
        totalRaise || 1000000,
        assetManagementFee || 2,
        acquisitionFee || 3,
        dispositionFee || 1,
        organizationalFees || 5000,
        operatingExpenseReimbursement || 0
      );

      return {
        syndicationStructure: structure,
        waterfallDistribution: waterfall,
        investorReturns: returns,
        syndicationFees: fees,
        summary: {
          totalRaise: totalRaise || 1000000,
          sponsorEquity: sponsorEquity || 100000,
          investorEquity: investorEquity || 900000,
          preferredReturn: preferredReturn || 8,
          totalFees: fees.totalFees,
          netRaise: fees.netRaise,
          investorIRR: returns.internalRateOfReturn,
          sponsorPromote: waterfall.sponsorPromote
        }
      };

    default:
      throw new Error('Unknown real estate syndication calculation type');
  }
}