import { BusinessValuationCalculatorInputs, BusinessValuationCalculatorOutputs } from './types';

export function calculateBusinessValuation(inputs: BusinessValuationCalculatorInputs): BusinessValuationCalculatorOutputs {
  // Calculate normalized financial metrics
  const normalizedEbitda = calculateNormalizedEbitda(inputs);
  const normalizedEarnings = calculateNormalizedEarnings(inputs);
  
  // Calculate valuation using different approaches
  const incomeApproach = calculateIncomeApproach(inputs, normalizedEbitda, normalizedEarnings);
  const marketApproach = calculateMarketApproach(inputs, normalizedEbitda, normalizedEarnings);
  const assetApproach = calculateAssetApproach(inputs);
  
  // Calculate enterprise value (weighted average of approaches)
  const enterpriseValue = calculateEnterpriseValue(incomeApproach, marketApproach, assetApproach);
  
  // Calculate equity value
  const equityValue = calculateEquityValue(enterpriseValue, inputs);
  
  // Calculate value per share
  const valuePerShare = calculateValuePerShare(equityValue, inputs);
  
  // Calculate valuation multiple
  const valuationMultiple = calculateValuationMultiple(enterpriseValue, normalizedEbitda);
  
  // Calculate discount rate
  const discountRate = calculateDiscountRate(inputs);
  
  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(inputs);
  
  // Calculate sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs, enterpriseValue, equityValue);
  
  // Calculate Monte Carlo results
  const monteCarloResults = calculateMonteCarloResults(inputs, enterpriseValue);
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, enterpriseValue, riskAssessment);
  
  // Determine recommendation level
  const recommendation = determineRecommendation(enterpriseValue, riskAssessment, keyMetrics);
  
  return {
    enterpriseValue,
    equityValue,
    valuePerShare,
    valuationMultiple,
    discountRate,
    recommendation,
    incomeApproach,
    marketApproach,
    assetApproach,
    discountedCashFlow: {
      presentValue: incomeApproach.discountedCashFlow.presentValue,
      terminalValue: incomeApproach.discountedCashFlow.terminalValue,
      totalValue: incomeApproach.discountedCashFlow.totalValue
    },
    capitalizationOfEarnings: {
      normalizedEarnings: incomeApproach.capitalizationOfEarnings.normalizedEarnings,
      capitalizationRate: incomeApproach.capitalizationOfEarnings.capitalizationRate,
      value: incomeApproach.capitalizationOfEarnings.value
    },
    comparableCompanyAnalysis: {
      averageMultiple: marketApproach.comparableCompanies.averageMultiple,
      medianMultiple: marketApproach.comparableCompanies.medianMultiple,
      value: marketApproach.comparableCompanies.value
    },
    comparableTransactionAnalysis: {
      averageMultiple: marketApproach.comparableTransactions.averageMultiple,
      medianMultiple: marketApproach.comparableTransactions.medianMultiple,
      value: marketApproach.comparableTransactions.value
    },
    adjustedBookValue: {
      bookValue: assetApproach.adjustedBookValue.bookValue,
      adjustments: assetApproach.adjustedBookValue.adjustments,
      value: assetApproach.adjustedBookValue.value
    },
    liquidationValue: {
      assetValue: assetApproach.liquidationValue.assetValue,
      liquidationCosts: assetApproach.liquidationValue.liquidationCosts,
      value: assetApproach.liquidationValue.value
    },
    riskAssessment,
    sensitivityAnalysis,
    monteCarloResults,
    keyMetrics,
    recommendations
  };
}

function calculateNormalizedEbitda(inputs: BusinessValuationCalculatorInputs): number {
  const adjustments = inputs.financialInfo.normalizationAdjustments;
  const historicalFinancials = inputs.financialInfo.historicalFinancials;
  
  if (historicalFinancials.length === 0) {
    return adjustments.normalizedEbitda;
  }
  
  // Use the most recent year's EBITDA as base
  const baseEbitda = historicalFinancials[historicalFinancials.length - 1].ebitda;
  
  // Apply normalization adjustments
  let normalizedEbitda = baseEbitda;
  
  // Owner compensation adjustment
  normalizedEbitda += adjustments.ownerCompensation.adjustment;
  
  // Non-recurring items
  adjustments.nonRecurringItems.forEach(item => {
    if (item.type === 'income') {
      normalizedEbitda -= item.amount; // Remove non-recurring income
    } else {
      normalizedEbitda += item.amount; // Add back non-recurring expenses
    }
  });
  
  // Related party transactions
  adjustments.relatedPartyTransactions.forEach(transaction => {
    normalizedEbitda += transaction.adjustment;
  });
  
  // Extraordinary items
  adjustments.extraordinaryItems.forEach(item => {
    if (item.type === 'income') {
      normalizedEbitda -= item.amount * item.probability; // Remove extraordinary income
    } else {
      normalizedEbitda += item.amount * item.probability; // Add back extraordinary expenses
    }
  });
  
  return Math.max(0, normalizedEbitda);
}

function calculateNormalizedEarnings(inputs: BusinessValuationCalculatorInputs): number {
  const adjustments = inputs.financialInfo.normalizationAdjustments;
  const historicalFinancials = inputs.financialInfo.historicalFinancials;
  
  if (historicalFinancials.length === 0) {
    return adjustments.normalizedNetIncome;
  }
  
  // Use the most recent year's net income as base
  const baseNetIncome = historicalFinancials[historicalFinancials.length - 1].netIncome;
  
  // Apply normalization adjustments (similar to EBITDA but after tax)
  let normalizedEarnings = baseNetIncome;
  
  // Owner compensation adjustment (after tax)
  const taxRate = 0.25; // Assume 25% tax rate
  normalizedEarnings += adjustments.ownerCompensation.adjustment * (1 - taxRate);
  
  // Non-recurring items (after tax)
  adjustments.nonRecurringItems.forEach(item => {
    if (item.type === 'income') {
      normalizedEarnings -= item.amount * (1 - taxRate);
    } else {
      normalizedEarnings += item.amount * (1 - taxRate);
    }
  });
  
  // Related party transactions (after tax)
  adjustments.relatedPartyTransactions.forEach(transaction => {
    normalizedEarnings += transaction.adjustment * (1 - taxRate);
  });
  
  // Extraordinary items (after tax)
  adjustments.extraordinaryItems.forEach(item => {
    if (item.type === 'income') {
      normalizedEarnings -= item.amount * item.probability * (1 - taxRate);
    } else {
      normalizedEarnings += item.amount * item.probability * (1 - taxRate);
    }
  });
  
  return Math.max(0, normalizedEarnings);
}

function calculateIncomeApproach(inputs: BusinessValuationCalculatorInputs, normalizedEbitda: number, normalizedEarnings: number) {
  const dcf = calculateDiscountedCashFlow(inputs, normalizedEbitda);
  const capEarnings = calculateCapitalizationOfEarnings(inputs, normalizedEarnings);
  
  return {
    discountedCashFlow: dcf,
    capitalizationOfEarnings: capEarnings,
    totalValue: (dcf.totalValue + capEarnings.value) / 2
  };
}

function calculateDiscountedCashFlow(inputs: BusinessValuationCalculatorInputs, normalizedEbitda: number) {
  const dcf = inputs.valuationMethods.incomeApproach.discountedCashFlow;
  const discountRate = dcf.discountRate;
  const terminalGrowthRate = dcf.terminalGrowthRate;
  const projectionPeriod = dcf.projectionPeriod;
  
  // Generate projected cash flows
  const freeCashFlows: number[] = [];
  let currentEbitda = normalizedEbitda;
  
  for (let year = 1; year <= projectionPeriod; year++) {
    // Assume moderate growth in early years, declining to terminal growth
    const growthRate = Math.max(terminalGrowthRate, 0.05 * Math.exp(-0.2 * year));
    currentEbitda *= (1 + growthRate);
    
    // Convert EBITDA to free cash flow (assume 60% conversion)
    const freeCashFlow = currentEbitda * 0.6;
    freeCashFlows.push(freeCashFlow);
  }
  
  // Calculate present value of projected cash flows
  let presentValue = 0;
  for (let year = 0; year < freeCashFlows.length; year++) {
    presentValue += freeCashFlows[year] / Math.pow(1 + discountRate, year + 1);
  }
  
  // Calculate terminal value
  const terminalCashFlow = freeCashFlows[freeCashFlows.length - 1] * (1 + terminalGrowthRate);
  const terminalValue = terminalCashFlow / (discountRate - terminalGrowthRate);
  const presentTerminalValue = terminalValue / Math.pow(1 + discountRate, projectionPeriod);
  
  return {
    presentValue,
    terminalValue: presentTerminalValue,
    totalValue: presentValue + presentTerminalValue
  };
}

function calculateCapitalizationOfEarnings(inputs: BusinessValuationCalculatorInputs, normalizedEarnings: number) {
  const capEarnings = inputs.valuationMethods.incomeApproach.capitalizationOfEarnings;
  const capitalizationRate = capEarnings.capitalizationRate;
  
  const value = normalizedEarnings / capitalizationRate;
  
  return {
    normalizedEarnings,
    capitalizationRate,
    value
  };
}

function calculateMarketApproach(inputs: BusinessValuationCalculatorInputs, normalizedEbitda: number, normalizedEarnings: number) {
  const comparableCompanies = calculateComparableCompanyAnalysis(inputs, normalizedEbitda, normalizedEarnings);
  const comparableTransactions = calculateComparableTransactionAnalysis(inputs, normalizedEbitda, normalizedEarnings);
  
  return {
    comparableCompanies,
    comparableTransactions,
    totalValue: (comparableCompanies.value + comparableTransactions.value) / 2
  };
}

function calculateComparableCompanyAnalysis(inputs: BusinessValuationCalculatorInputs, normalizedEbitda: number, normalizedEarnings: number) {
  const comparables = inputs.valuationMethods.marketApproach.comparableCompanies;
  
  if (comparables.length === 0) {
    // Use industry average multiples if no comparables provided
    const averageEvToEbitda = 8.0; // Industry average
    const averagePeRatio = 15.0; // Industry average
    
    const evValue = normalizedEbitda * averageEvToEbitda;
    const peValue = normalizedEarnings * averagePeRatio;
    
    return {
      averageMultiple: averageEvToEbitda,
      medianMultiple: averageEvToEbitda,
      value: (evValue + peValue) / 2
    };
  }
  
  // Calculate average and median multiples
  const evToEbitdaMultiples = comparables.map(comp => comp.evToEbitda).filter(m => m > 0);
  const peMultiples = comparables.map(comp => comp.priceToEarnings).filter(m => m > 0);
  
  const averageEvToEbitda = evToEbitdaMultiples.length > 0 ? 
    evToEbitdaMultiples.reduce((sum, m) => sum + m, 0) / evToEbitdaMultiples.length : 8.0;
  const averagePeRatio = peMultiples.length > 0 ? 
    peMultiples.reduce((sum, m) => sum + m, 0) / peMultiples.length : 15.0;
  
  const evValue = normalizedEbitda * averageEvToEbitda;
  const peValue = normalizedEarnings * averagePeRatio;
  
  return {
    averageMultiple: averageEvToEbitda,
    medianMultiple: averageEvToEbitda,
    value: (evValue + peValue) / 2
  };
}

function calculateComparableTransactionAnalysis(inputs: BusinessValuationCalculatorInputs, normalizedEbitda: number, normalizedEarnings: number) {
  const transactions = inputs.valuationMethods.marketApproach.comparableTransactions;
  
  if (transactions.length === 0) {
    // Use transaction average multiples if no transactions provided
    const averageEvToEbitda = 10.0; // Transaction premium
    const averagePeRatio = 18.0; // Transaction premium
    
    const evValue = normalizedEbitda * averageEvToEbitda;
    const peValue = normalizedEarnings * averagePeRatio;
    
    return {
      averageMultiple: averageEvToEbitda,
      medianMultiple: averageEvToEbitda,
      value: (evValue + peValue) / 2
    };
  }
  
  // Calculate average multiples from transactions
  const evToEbitdaMultiples = transactions.map(t => t.evToEbitda).filter(m => m > 0);
  const peMultiples = transactions.map(t => t.priceToEarnings).filter(m => m > 0);
  
  const averageEvToEbitda = evToEbitdaMultiples.length > 0 ? 
    evToEbitdaMultiples.reduce((sum, m) => sum + m, 0) / evToEbitdaMultiples.length : 10.0;
  const averagePeRatio = peMultiples.length > 0 ? 
    peMultiples.reduce((sum, m) => sum + m, 0) / peMultiples.length : 18.0;
  
  const evValue = normalizedEbitda * averageEvToEbitda;
  const peValue = normalizedEarnings * averagePeRatio;
  
  return {
    averageMultiple: averageEvToEbitda,
    medianMultiple: averageEvToEbitda,
    value: (evValue + peValue) / 2
  };
}

function calculateAssetApproach(inputs: BusinessValuationCalculatorInputs) {
  const adjustedBookValue = calculateAdjustedBookValue(inputs);
  const liquidationValue = calculateLiquidationValue(inputs);
  
  return {
    adjustedBookValue,
    liquidationValue,
    totalValue: (adjustedBookValue.value + liquidationValue.value) / 2
  };
}

function calculateAdjustedBookValue(inputs: BusinessValuationCalculatorInputs) {
  const totalAssets = inputs.assetAnalysis.totalAssets;
  const totalLiabilities = inputs.financialInfo.capitalStructure.equity.totalEquity > 0 ? 
    totalAssets - inputs.financialInfo.capitalStructure.equity.totalEquity : totalAssets * 0.3;
  
  // Apply adjustments for market value vs book value
  const tangibleAssets = inputs.assetAnalysis.tangibleAssets.totalTangibleAssets;
  const intangibleAssets = inputs.assetAnalysis.intangibleAssets.totalIntangibleAssets;
  
  // Assume tangible assets are at market value, intangibles may need adjustment
  const adjustments = intangibleAssets * 0.2; // 20% adjustment for intangibles
  
  const adjustedValue = totalAssets - totalLiabilities + adjustments;
  
  return {
    bookValue: totalAssets - totalLiabilities,
    adjustments,
    value: Math.max(0, adjustedValue)
  };
}

function calculateLiquidationValue(inputs: BusinessValuationCalculatorInputs) {
  const tangibleAssets = inputs.assetAnalysis.tangibleAssets.totalTangibleAssets;
  const totalAssets = inputs.assetAnalysis.totalAssets;
  
  // Liquidation typically yields 60-80% of asset value
  const liquidationRate = 0.7;
  const assetValue = tangibleAssets * liquidationRate + (totalAssets - tangibleAssets) * 0.3;
  
  // Liquidation costs (legal, administrative, etc.)
  const liquidationCosts = assetValue * 0.1;
  
  return {
    assetValue,
    liquidationCosts,
    value: Math.max(0, assetValue - liquidationCosts)
  };
}

function calculateEnterpriseValue(incomeApproach: any, marketApproach: any, assetApproach: any): number {
  // Weight the approaches: Income (50%), Market (40%), Asset (10%)
  const weightedValue = 
    incomeApproach.totalValue * 0.5 +
    marketApproach.totalValue * 0.4 +
    assetApproach.totalValue * 0.1;
  
  return Math.max(0, weightedValue);
}

function calculateEquityValue(enterpriseValue: number, inputs: BusinessValuationCalculatorInputs): number {
  const totalDebt = inputs.financialInfo.capitalStructure.debt.totalDebt;
  const cash = inputs.financialInfo.workingCapitalAnalysis.currentAssets.cash;
  
  // Equity Value = Enterprise Value - Net Debt + Cash
  const equityValue = enterpriseValue - totalDebt + cash;
  
  return Math.max(0, equityValue);
}

function calculateValuePerShare(equityValue: number, inputs: BusinessValuationCalculatorInputs): number {
  // Assume 1,000,000 shares if not specified
  const sharesOutstanding = 1000000;
  
  return equityValue / sharesOutstanding;
}

function calculateValuationMultiple(enterpriseValue: number, normalizedEbitda: number): number {
  if (normalizedEbitda <= 0) return 0;
  return enterpriseValue / normalizedEbitda;
}

function calculateDiscountRate(inputs: BusinessValuationCalculatorInputs): number {
  return inputs.discountRates.weightedAverageCostOfCapital;
}

function calculateRiskAssessment(inputs: BusinessValuationCalculatorInputs) {
  const businessRisk = inputs.riskAnalysis.businessRisk;
  const financialRisk = inputs.riskAnalysis.financialRisk;
  const marketRisk = inputs.riskAnalysis.marketRisk;
  
  const totalRisk = (businessRisk + financialRisk + marketRisk) / 3;
  
  return {
    businessRisk,
    financialRisk,
    marketRisk,
    totalRisk
  };
}

function calculateSensitivityAnalysis(inputs: BusinessValuationCalculatorInputs, enterpriseValue: number, equityValue: number) {
  const scenarios = [
    { scenario: 'Optimistic', change: 1.2 },
    { scenario: 'Base Case', change: 1.0 },
    { scenario: 'Pessimistic', change: 0.8 }
  ];
  
  return {
    scenarios: scenarios.map(s => ({
      scenario: s.scenario,
      enterpriseValue: enterpriseValue * s.change,
      equityValue: equityValue * s.change,
      change: s.change
    }))
  };
}

function calculateMonteCarloResults(inputs: BusinessValuationCalculatorInputs, enterpriseValue: number) {
  // Simplified Monte Carlo simulation
  const meanValue = enterpriseValue;
  const standardDeviation = enterpriseValue * 0.2; // 20% volatility
  
  return {
    meanValue,
    medianValue: meanValue,
    standardDeviation,
    percentiles: {
      p5: meanValue - 1.645 * standardDeviation,
      p10: meanValue - 1.282 * standardDeviation,
      p25: meanValue - 0.674 * standardDeviation,
      p50: meanValue,
      p75: meanValue + 0.674 * standardDeviation,
      p90: meanValue + 1.282 * standardDeviation,
      p95: meanValue + 1.645 * standardDeviation
    }
  };
}

function calculateKeyMetrics(inputs: BusinessValuationCalculatorInputs) {
  const historicalFinancials = inputs.financialInfo.historicalFinancials;
  
  if (historicalFinancials.length === 0) {
    return {
      returnOnEquity: 0,
      returnOnAssets: 0,
      profitMargin: 0,
      debtToEquity: 0,
      currentRatio: 0,
      quickRatio: 0
    };
  }
  
  const latest = historicalFinancials[historicalFinancials.length - 1];
  
  return {
    returnOnEquity: latest.returnOnEquity,
    returnOnAssets: latest.returnOnAssets,
    profitMargin: latest.profitMargin,
    debtToEquity: latest.debtToEquity,
    currentRatio: latest.currentRatio,
    quickRatio: latest.quickRatio
  };
}

function generateRecommendations(inputs: BusinessValuationCalculatorInputs, enterpriseValue: number, riskAssessment: any) {
  const recommendations = [];
  
  // Financial recommendations
  if (inputs.financialInfo.capitalStructure.debtToEquity > 0.5) {
    recommendations.push({
      category: 'Financial',
      recommendation: 'Consider debt reduction to improve financial stability',
      rationale: 'High debt-to-equity ratio increases financial risk',
      expectedValue: enterpriseValue * 0.05
    });
  }
  
  // Operational recommendations
  if (inputs.riskAnalysis.operationalRisk > 0.3) {
    recommendations.push({
      category: 'Operational',
      recommendation: 'Implement operational improvements to reduce risk',
      rationale: 'High operational risk affects business valuation',
      expectedValue: enterpriseValue * 0.03
    });
  }
  
  // Market recommendations
  if (inputs.businessInfo.marketInfo.marketShare < 0.05) {
    recommendations.push({
      category: 'Market',
      recommendation: 'Focus on market share growth strategies',
      rationale: 'Low market share limits growth potential',
      expectedValue: enterpriseValue * 0.04
    });
  }
  
  return recommendations;
}

function determineRecommendation(enterpriseValue: number, riskAssessment: any, keyMetrics: any): 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement' {
  // Simple scoring system
  let score = 0;
  
  // Value-based scoring
  if (enterpriseValue > 10000000) score += 3;
  else if (enterpriseValue > 1000000) score += 2;
  else if (enterpriseValue > 100000) score += 1;
  
  // Risk-based scoring
  if (riskAssessment.totalRisk < 0.2) score += 3;
  else if (riskAssessment.totalRisk < 0.4) score += 2;
  else if (riskAssessment.totalRisk < 0.6) score += 1;
  
  // Financial metrics scoring
  if (keyMetrics.returnOnEquity > 0.15) score += 2;
  else if (keyMetrics.returnOnEquity > 0.10) score += 1;
  
  if (keyMetrics.debtToEquity < 0.3) score += 2;
  else if (keyMetrics.debtToEquity < 0.5) score += 1;
  
  // Determine recommendation based on score
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'fair';
  if (score >= 2) return 'needs_improvement';
  return 'poor';
}