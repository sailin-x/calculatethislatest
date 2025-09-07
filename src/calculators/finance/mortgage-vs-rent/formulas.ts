import { MortgageVsRentInputs, MortgageVsRentMetrics, MortgageVsRentAnalysis } from './types';

export function calculateMonthlyMortgagePayment(inputs: MortgageVsRentInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  const principalInterest = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

  const taxes = inputs.propertyTaxes / 12;
  const insurance = inputs.propertyInsurance / 12;
  const hoa = inputs.hoaFees;
  const mortgageInsurance = inputs.mortgageInsurance / 12;

  return principalInterest + taxes + insurance + hoa + mortgageInsurance;
}

export function calculateMonthlyRentPayment(inputs: MortgageVsRentInputs): number {
  let rent = inputs.monthlyRent;

  if (inputs.annualRent > 0) {
    rent = inputs.annualRent / 12;
  }

  // Add utilities if not included in rent
  if (!inputs.rentIncludesUtilities) {
    rent += inputs.utilityCosts;
  }

  // Add renters insurance
  rent += inputs.rentersInsurance;

  return rent;
}

export function calculateMonthlyCostDifference(inputs: MortgageVsRentInputs): number {
  return calculateMonthlyMortgagePayment(inputs) - calculateMonthlyRentPayment(inputs);
}

export function calculateAnnualCostDifference(inputs: MortgageVsRentInputs): number {
  return calculateMonthlyCostDifference(inputs) * 12;
}

export function calculateTotalMortgageCost(inputs: MortgageVsRentInputs): number {
  const monthlyPayment = calculateMonthlyMortgagePayment(inputs);
  const totalPayments = monthlyPayment * inputs.analysisPeriod * 12;
  const closingCosts = inputs.closingCosts + inputs.originationFee + inputs.appraisalFee +
                     inputs.titleInsuranceFee + inputs.recordingFee + inputs.attorneyFee +
                     inputs.otherFees;
  const maintenanceCosts = inputs.maintenanceCosts * inputs.analysisPeriod * 12;

  return totalPayments + closingCosts + maintenanceCosts;
}

export function calculateTotalRentCost(inputs: MortgageVsRentInputs): number {
  let totalRent = 0;
  let currentRent = inputs.monthlyRent;

  if (inputs.annualRent > 0) {
    currentRent = inputs.annualRent / 12;
  }

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    totalRent += currentRent * 12;

    // Apply rent increase
    if (inputs.rentEscalationClause) {
      currentRent *= (1 + inputs.rentEscalationRate / 100);
    } else {
      currentRent *= (1 + inputs.rentIncreaseRate / 100);
    }
  }

  // Add utilities if not included
  if (!inputs.rentIncludesUtilities) {
    totalRent += inputs.utilityCosts * inputs.analysisPeriod * 12;
  }

  // Add renters insurance
  totalRent += inputs.rentersInsurance * inputs.analysisPeriod * 12;

  return totalRent;
}

export function calculateTotalCostDifference(inputs: MortgageVsRentInputs): number {
  return calculateTotalMortgageCost(inputs) - calculateTotalRentCost(inputs);
}

export function calculateCostSavings(inputs: MortgageVsRentInputs): number {
  const difference = calculateTotalCostDifference(inputs);
  return difference < 0 ? Math.abs(difference) : 0;
}

export function calculateBreakEvenPoint(inputs: MortgageVsRentInputs): number {
  const monthlyDifference = calculateMonthlyCostDifference(inputs);

  if (monthlyDifference <= 0) {
    return Infinity;
  }

  const closingCosts = inputs.closingCosts + inputs.originationFee + inputs.appraisalFee +
                     inputs.titleInsuranceFee + inputs.recordingFee + inputs.attorneyFee +
                     inputs.otherFees;

  return closingCosts / monthlyDifference;
}

export function calculateBreakEvenMonths(inputs: MortgageVsRentInputs): number {
  return calculateBreakEvenPoint(inputs);
}

export function calculateBreakEvenYears(inputs: MortgageVsRentInputs): number {
  return calculateBreakEvenMonths(inputs) / 12;
}

export function calculateBreakEvenPropertyValue(inputs: MortgageVsRentInputs): number {
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const monthlyRent = inputs.monthlyRent;

  if (breakEvenMonths === Infinity) {
    return 0;
  }

  return (monthlyRent * breakEvenMonths) / (inputs.downPaymentPercentage / 100);
}

export function calculateEquityBuildUp(inputs: MortgageVsRentInputs): number {
  const monthlyPayment = calculateMonthlyMortgagePayment(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;
  let remainingBalance = inputs.loanAmount;
  let totalEquity = inputs.downPayment;

  for (let month = 1; month <= inputs.analysisPeriod * 12; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;

    remainingBalance -= principalPayment;
    totalEquity += principalPayment;
  }

  // Add property appreciation
  const appreciation = inputs.propertyValue * (Math.pow(1 + inputs.propertyAppreciationRate / 100, inputs.analysisPeriod) - 1);
  totalEquity += appreciation;

  return totalEquity;
}

export function calculateEquityPercentage(inputs: MortgageVsRentInputs): number {
  const equity = calculateEquityBuildUp(inputs);
  const propertyValue = inputs.propertyValue * Math.pow(1 + inputs.propertyAppreciationRate / 100, inputs.analysisPeriod);

  return propertyValue > 0 ? (equity / propertyValue) * 100 : 0;
}

export function calculateTotalEquity(inputs: MortgageVsRentInputs): number {
  return calculateEquityBuildUp(inputs);
}

export function calculateEquityGrowth(inputs: MortgageVsRentInputs): number {
  const initialEquity = inputs.downPayment;
  const finalEquity = calculateEquityBuildUp(inputs);

  return finalEquity - initialEquity;
}

export function calculateOpportunityCost(inputs: MortgageVsRentInputs): number {
  const downPayment = inputs.downPayment;
  const monthlyRentSavings = calculateMonthlyRentPayment(inputs) - calculateMonthlyMortgagePayment(inputs);

  if (monthlyRentSavings <= 0) {
    return 0;
  }

  // Calculate what down payment could have earned if invested
  let investedAmount = downPayment;
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    investedAmount *= (1 + inputs.investmentReturnRate / 100);
  }

  // Calculate rent savings invested
  let rentSavingsInvested = 0;
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    rentSavingsInvested += monthlyRentSavings * 12;
    rentSavingsInvested *= (1 + inputs.investmentReturnRate / 100);
  }

  return investedAmount + rentSavingsInvested;
}

export function calculateInvestmentGrowth(inputs: MortgageVsRentInputs): number {
  return calculateOpportunityCost(inputs);
}

export function calculateTotalInvestmentValue(inputs: MortgageVsRentInputs): number {
  return calculateOpportunityCost(inputs);
}

export function calculateNetInvestmentBenefit(inputs: MortgageVsRentInputs): number {
  const opportunityCost = calculateOpportunityCost(inputs);
  const equity = calculateEquityBuildUp(inputs);

  return equity - opportunityCost;
}

export function calculateMortgageTaxDeduction(inputs: MortgageVsRentInputs): number {
  const monthlyPayment = calculateMonthlyMortgagePayment(inputs);
  const annualPayment = monthlyPayment * 12;
  const interestPortion = annualPayment * 0.7; // Rough estimate of interest portion

  return interestPortion * (inputs.borrowerTaxRate / 100);
}

export function calculateRentTaxDeduction(inputs: MortgageVsRentInputs): number {
  // Rent is generally not tax deductible for personal use
  return 0;
}

export function calculateTaxBenefit(inputs: MortgageVsRentInputs): number {
  return calculateMortgageTaxDeduction(inputs) - calculateRentTaxDeduction(inputs);
}

export function calculateAfterTaxCost(inputs: MortgageVsRentInputs): number {
  const mortgageCost = calculateTotalMortgageCost(inputs);
  const rentCost = calculateTotalRentCost(inputs);
  const taxBenefit = calculateTaxBenefit(inputs);

  return (mortgageCost - taxBenefit) - rentCost;
}

export function calculateMonthlyCashFlow(inputs: MortgageVsRentInputs): number {
  return calculateMonthlyCostDifference(inputs);
}

export function calculateAnnualCashFlow(inputs: MortgageVsRentInputs): number {
  return calculateAnnualCostDifference(inputs);
}

export function calculateTotalCashFlow(inputs: MortgageVsRentInputs): number {
  return calculateAnnualCashFlow(inputs) * inputs.analysisPeriod;
}

export function calculateCashFlowImprovement(inputs: MortgageVsRentInputs): number {
  const mortgagePayment = calculateMonthlyMortgagePayment(inputs);
  const rentPayment = calculateMonthlyRentPayment(inputs);
  const difference = rentPayment - mortgagePayment;

  return mortgagePayment > 0 ? (difference / mortgagePayment) * 100 : 0;
}

export function calculateSensitivityMatrix(inputs: MortgageVsRentInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Interest rate sensitivity
  const rateValues = [inputs.interestRate - 0.5, inputs.interestRate, inputs.interestRate + 0.5];
  const rateImpacts = rateValues.map(rate => {
    const testInputs = { ...inputs, interestRate: rate };
    return calculateMonthlyCostDifference(testInputs) - calculateMonthlyCostDifference(inputs);
  });

  matrix.push({
    variable: 'Interest Rate',
    values: rateValues,
    impacts: rateImpacts
  });

  // Rent increase sensitivity
  const rentValues = [inputs.rentIncreaseRate - 1, inputs.rentIncreaseRate, inputs.rentIncreaseRate + 1];
  const rentImpacts = rentValues.map(rate => {
    const testInputs = { ...inputs, rentIncreaseRate: rate };
    return calculateTotalCostDifference(testInputs) - calculateTotalCostDifference(inputs);
  });

  matrix.push({
    variable: 'Rent Increase Rate',
    values: rentValues,
    impacts: rentImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: MortgageVsRentInputs): Array<{
  scenario: string;
  probability: number;
  mortgageCost: number;
  rentCost: number;
  savings: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.4,
    mortgageCost: calculateTotalMortgageCost(inputs),
    rentCost: calculateTotalRentCost(inputs),
    savings: calculateCostSavings(inputs)
  });

  // High appreciation scenario
  const highAppreciationInputs = { ...inputs, propertyAppreciationRate: inputs.propertyAppreciationRate + 2 };
  scenarios.push({
    scenario: 'High Appreciation',
    probability: 0.2,
    mortgageCost: calculateTotalMortgageCost(highAppreciationInputs),
    rentCost: calculateTotalRentCost(highAppreciationInputs),
    savings: calculateCostSavings(highAppreciationInputs)
  });

  // High rent increase scenario
  const highRentInputs = { ...inputs, rentIncreaseRate: inputs.rentIncreaseRate + 2 };
  scenarios.push({
    scenario: 'High Rent Increase',
    probability: 0.2,
    mortgageCost: calculateTotalMortgageCost(highRentInputs),
    rentCost: calculateTotalRentCost(highRentInputs),
    savings: calculateCostSavings(highRentInputs)
  });

  // Market decline scenario
  const declineInputs = { ...inputs, propertyAppreciationRate: -2 };
  scenarios.push({
    scenario: 'Market Decline',
    probability: 0.1,
    mortgageCost: calculateTotalMortgageCost(declineInputs),
    rentCost: calculateTotalRentCost(declineInputs),
    savings: calculateCostSavings(declineInputs)
  });

  // Early move scenario
  const shortTermInputs = { ...inputs, analysisPeriod: Math.max(1, inputs.analysisPeriod - 3) };
  scenarios.push({
    scenario: 'Early Move',
    probability: 0.1,
    mortgageCost: calculateTotalMortgageCost(shortTermInputs),
    rentCost: calculateTotalRentCost(shortTermInputs),
    savings: calculateCostSavings(shortTermInputs)
  });

  return scenarios;
}

export function calculateTimelineAnalysis(inputs: MortgageVsRentInputs): Array<{
  year: number;
  mortgageCost: number;
  rentCost: number;
  equity: number;
  investment: number;
  netBenefit: number;
}> {
  const analysis = [];
  let cumulativeMortgageCost = 0;
  let cumulativeRentCost = 0;
  let currentEquity = inputs.downPayment;
  let currentInvestment = inputs.downPayment;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    // Calculate annual costs
    const annualMortgageCost = calculateMonthlyMortgagePayment(inputs) * 12;
    const annualRentCost = calculateMonthlyRentPayment(inputs) * 12;

    cumulativeMortgageCost += annualMortgageCost;
    cumulativeRentCost += annualRentCost;

    // Calculate equity build-up (simplified)
    const annualEquityGrowth = (inputs.propertyValue * inputs.propertyAppreciationRate / 100) +
                              (inputs.loanAmount / (inputs.loanTerm * 12)) * 12;
    currentEquity += annualEquityGrowth;

    // Calculate investment growth
    currentInvestment *= (1 + inputs.investmentReturnRate / 100);

    // Calculate net benefit (negative means renting is better)
    const netBenefit = cumulativeRentCost - cumulativeMortgageCost + currentEquity - currentInvestment;

    analysis.push({
      year,
      mortgageCost: cumulativeMortgageCost,
      rentCost: cumulativeRentCost,
      equity: currentEquity,
      investment: currentInvestment,
      netBenefit
    });
  }

  return analysis;
}

export function calculateComparisonAnalysis(inputs: MortgageVsRentInputs): Array<{
  metric: string;
  mortgage: number;
  rent: number;
  difference: number;
  advantage: string;
}> {
  const analysis = [];

  // Monthly cost
  const mortgageMonthly = calculateMonthlyMortgagePayment(inputs);
  const rentMonthly = calculateMonthlyRentPayment(inputs);
  analysis.push({
    metric: 'Monthly Cost',
    mortgage: mortgageMonthly,
    rent: rentMonthly,
    difference: rentMonthly - mortgageMonthly,
    advantage: mortgageMonthly < rentMonthly ? 'Mortgage' : 'Rent'
  });

  // Total cost
  const mortgageTotal = calculateTotalMortgageCost(inputs);
  const rentTotal = calculateTotalRentCost(inputs);
  analysis.push({
    metric: 'Total Cost',
    mortgage: mortgageTotal,
    rent: rentTotal,
    difference: rentTotal - mortgageTotal,
    advantage: mortgageTotal < rentTotal ? 'Mortgage' : 'Rent'
  });

  // Equity
  const equity = calculateEquityBuildUp(inputs);
  analysis.push({
    metric: 'Equity Build-up',
    mortgage: equity,
    rent: 0,
    difference: equity,
    advantage: 'Mortgage'
  });

  // Flexibility
  analysis.push({
    metric: 'Flexibility',
    mortgage: inputs.flexibilityNeeded ? 3 : 7,
    rent: 9,
    difference: (inputs.flexibilityNeeded ? 3 : 7) - 9,
    advantage: 'Rent'
  });

  return analysis;
}

export function calculateRiskScore(inputs: MortgageVsRentInputs): number {
  let score = 0;

  // Market risk
  if (inputs.marketCondition === 'declining') score += 30;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Financial risk
  if (inputs.borrowerDebtToIncomeRatio > 43) score += 20;
  if (inputs.borrowerCreditScore < 620) score += 15;

  // Lifestyle risk
  if (inputs.locationStability === 'unstable') score += 15;
  if (inputs.expectedStayDuration < 3) score += 10;

  // Maintenance risk
  if (inputs.maintenancePreference === 'low') score += 5;

  return Math.min(100, score);
}

export function calculateProbabilityOfBenefit(inputs: MortgageVsRentInputs): number {
  const breakEvenYears = calculateBreakEvenYears(inputs);
  const riskScore = calculateRiskScore(inputs);

  let probability = 50;

  // Break-even factor
  if (breakEvenYears <= 3) probability += 30;
  else if (breakEvenYears <= 5) probability += 15;
  else if (breakEvenYears <= 7) probability += 5;
  else probability -= 20;

  // Risk factor
  probability -= riskScore * 0.3;

  // Market factor
  if (inputs.marketCondition === 'growing') probability += 15;
  else if (inputs.marketCondition === 'hot') probability += 10;

  // Duration factor
  if (inputs.expectedStayDuration >= 5) probability += 10;
  else if (inputs.expectedStayDuration >= 3) probability += 5;

  return Math.max(0, Math.min(100, probability));
}

export function calculateWorstCaseScenario(inputs: MortgageVsRentInputs): number {
  const worstInputs = {
    ...inputs,
    interestRate: inputs.interestRate + 1,
    propertyAppreciationRate: -2,
    rentIncreaseRate: inputs.rentIncreaseRate + 2,
    closingCosts: inputs.closingCosts * 1.5
  };

  return calculateTotalCostDifference(worstInputs);
}

export function calculateBestCaseScenario(inputs: MortgageVsRentInputs): number {
  const bestInputs = {
    ...inputs,
    interestRate: Math.max(0, inputs.interestRate - 0.5),
    propertyAppreciationRate: inputs.propertyAppreciationRate + 2,
    rentIncreaseRate: Math.max(0, inputs.rentIncreaseRate - 1),
    closingCosts: inputs.closingCosts * 0.8
  };

  return calculateTotalCostDifference(bestInputs);
}

export function calculateMarketAnalysis(inputs: MortgageVsRentInputs): Array<{
  factor: string;
  mortgageImpact: number;
  rentImpact: number;
  netImpact: number;
}> {
  const analysis = [];

  // Property appreciation
  const appreciationImpact = inputs.propertyValue * inputs.propertyAppreciationRate / 100;
  analysis.push({
    factor: 'Property Appreciation',
    mortgageImpact: appreciationImpact,
    rentImpact: 0,
    netImpact: appreciationImpact
  });

  // Rent growth
  const rentGrowthImpact = inputs.monthlyRent * inputs.rentGrowthRate / 100 * inputs.analysisPeriod;
  analysis.push({
    factor: 'Rent Growth',
    mortgageImpact: 0,
    rentImpact: -rentGrowthImpact, // Negative because higher rent costs
    netImpact: -rentGrowthImpact
  });

  // Interest rate changes
  const rateChangeImpact = calculateMonthlyMortgagePayment(inputs) * 0.1 * inputs.analysisPeriod * 12; // 10% rate change
  analysis.push({
    factor: 'Interest Rate Changes',
    mortgageImpact: -rateChangeImpact,
    rentImpact: 0,
    netImpact: -rateChangeImpact
  });

  return analysis;
}

export function generateMortgageVsRentAnalysis(inputs: MortgageVsRentInputs, metrics: MortgageVsRentMetrics): MortgageVsRentAnalysis {
  const breakEvenYears = calculateBreakEvenYears(inputs);
  const probabilityOfBenefit = calculateProbabilityOfBenefit(inputs);
  const totalCostDifference = calculateTotalCostDifference(inputs);

  let recommendation: 'Buy' | 'Rent' | 'Consider Buying' | 'Consider Renting' | 'Requires Review';
  if (probabilityOfBenefit >= 70 && totalCostDifference < 0) {
    recommendation = 'Buy';
  } else if (probabilityOfBenefit <= 30 && totalCostDifference > 0) {
    recommendation = 'Rent';
  } else if (probabilityOfBenefit >= 60) {
    recommendation = 'Consider Buying';
  } else if (probabilityOfBenefit <= 40) {
    recommendation = 'Consider Renting';
  } else {
    recommendation = 'Requires Review';
  }

  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  if (Math.abs(totalCostDifference) > 50000) valueRating = 'High Value';
  else if (Math.abs(totalCostDifference) > 25000) valueRating = 'Good Value';
  else if (Math.abs(totalCostDifference) > 10000) valueRating = 'Moderate Value';
  else if (Math.abs(totalCostDifference) > 0) valueRating = 'Low Value';
  else valueRating = 'No Value';

  let confidenceRating: 'High' | 'Medium' | 'Low';
  if (probabilityOfBenefit >= 70 || probabilityOfBenefit <= 30) confidenceRating = 'High';
  else if (probabilityOfBenefit >= 55 || probabilityOfBenefit <= 45) confidenceRating = 'Medium';
  else confidenceRating = 'Low';

  return {
    recommendation,
    valueRating,
    confidenceRating,
    keyStrengths: [
      `Break-even period: ${breakEvenYears.toFixed(1)} years`,
      `Equity build-up: $${metrics.equityBuildUp.toLocaleString()}`,
      `Probability of benefit: ${probabilityOfBenefit.toFixed(1)}%`
    ],
    keyWeaknesses: [
      `Risk score: ${metrics.riskScore}`,
      `Market condition: ${inputs.marketCondition}`,
      `Expected stay duration: ${inputs.expectedStayDuration} years`
    ],
    valueFactors: [
      'Total cost comparison',
      'Equity accumulation',
      'Tax benefits',
      'Market appreciation'
    ],
    opportunities: [
      'Property value appreciation',
      'Equity build-up over time',
      'Tax deduction benefits',
      'Investment opportunity cost'
    ],
    costSummary: `Mortgage vs. rent analysis shows ${totalCostDifference > 0 ? 'renting' : 'buying'} is more cost-effective with $${Math.abs(totalCostDifference).toLocaleString()} ${totalCostDifference > 0 ? 'higher' : 'lower'} costs for buying.`,
    paymentAnalysis: `Monthly payments: mortgage $${metrics.monthlyMortgagePayment.toLocaleString()} vs. rent $${metrics.monthlyRentPayment.toLocaleString()} (${metrics.monthlyCostDifference > 0 ? 'rent higher' : 'mortgage higher'} by $${Math.abs(metrics.monthlyCostDifference).toLocaleString()}).`,
    totalCostAnalysis: `Total costs over ${inputs.analysisPeriod} years: mortgage $${metrics.totalMortgageCost.toLocaleString()} vs. rent $${metrics.totalRentCost.toLocaleString()}.`,
    breakEvenSummary: `Break-even analysis shows ${breakEvenYears === Infinity ? 'buying never breaks even' : `break-even at ${breakEvenYears.toFixed(1)} years`} with property value of $${metrics.breakEvenPropertyValue.toLocaleString()}.`,
    timelineAnalysis: `Timeline analysis covers ${inputs.analysisPeriod} year period with equity growth of $${metrics.equityGrowth.toLocaleString()}.`,
    riskAnalysis: `Risk analysis indicates ${metrics.riskScore} risk score with ${probabilityOfBenefit.toFixed(1)}% probability of financial benefit from buying.`,
    equitySummary: `Equity analysis shows $${metrics.equityBuildUp.toLocaleString()} total equity build-up (${metrics.equityPercentage.toFixed(1)}% of property value).`,
    equityGrowthAnalysis: `Equity growth analysis indicates $${metrics.equityGrowth.toLocaleString()} equity accumulation over ${inputs.analysisPeriod} years.`,
    investmentAnalysis: `Investment analysis shows $${metrics.opportunityCost.toLocaleString()} opportunity cost of down payment if invested.`,
    taxSummary: `Tax analysis indicates $${metrics.taxBenefit.toLocaleString()} annual tax benefit from mortgage interest deduction.`,
    deductionAnalysis: `Tax deduction analysis shows $${metrics.mortgageTaxDeduction.toLocaleString()} mortgage deduction vs. $${metrics.rentTaxDeduction.toLocaleString()} rent deduction.`,
    benefitAnalysis: `Tax benefit analysis indicates $${metrics.taxBenefit.toLocaleString()} net tax advantage for buying.`,
    cashFlowSummary: `Cash flow analysis shows $${metrics.monthlyCashFlow.toLocaleString()} monthly difference with ${metrics.cashFlowImprovement.toFixed(1)}% improvement.`,
    savingsAnalysis: `Savings analysis indicates $${metrics.costSavings.toLocaleString()} total savings from ${totalCostDifference < 0 ? 'buying' : 'renting'}.`,
    improvementAnalysis: `Cash flow improvement analysis shows ${metrics.cashFlowImprovement.toFixed(1)}% better cash flow from ${metrics.monthlyCashFlow > 0 ? 'buying' : 'renting'}.`,
    marketSummary: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate.`,
    appreciationAnalysis: `Property appreciation analysis shows ${inputs.propertyAppreciationRate}% annual appreciation potential.`,
    rentAnalysis: `Rent analysis indicates ${inputs.rentIncreaseRate}% annual increase rate with escalation clause ${inputs.rentEscalationClause ? 'present' : 'absent'}.`,
    riskAssessment: `Overall risk assessment of ${metrics.riskScore} with worst case $${metrics.worstCaseScenario.toLocaleString()} and best case $${metrics.bestCaseScenario.toLocaleString()}.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions.`,
    financialRisk: `Financial risk assessment based on ${inputs.borrowerDebtToIncomeRatio}% debt-to-income ratio and ${inputs.borrowerCreditScore} credit score.`,
    lifestyleRisk: `Lifestyle risk assessment with ${inputs.expectedStayDuration} year expected stay and ${inputs.locationStability} location stability.`,
    buyRecommendations: [
      probabilityOfBenefit >= 60 ? 'Proceed with purchase - favorable financial analysis' : 'Consider purchase with caution',
      breakEvenYears <= inputs.expectedStayDuration ? 'Expected stay duration exceeds break-even period' : 'Expected stay duration may be shorter than break-even period'
    ],
    rentRecommendations: [
      probabilityOfBenefit <= 40 ? 'Continue renting - favorable financial analysis' : 'Consider buying if long-term commitment possible',
      inputs.flexibilityNeeded ? 'Renting provides needed flexibility' : 'Consider buying if flexibility not required'
    ],
    optimizationSuggestions: [
      'Shop multiple lenders for best mortgage rates',
      'Consider rent vs. buy calculators for different scenarios',
      'Evaluate long-term financial goals and lifestyle needs',
      'Consult with financial advisor for personalized advice'
    ],
    implementationPlan: `Decision implementation plan recommends ${recommendation.toLowerCase()} with ${confidenceRating.toLowerCase()} confidence rating.`,
    nextSteps: [
      'Compare multiple mortgage offers',
      'Research local market conditions',
      'Calculate personal financial situation',
      'Consult with real estate professional'
    ],
    timeline: `${inputs.analysisPeriod} year analysis period with ${breakEvenYears.toFixed(1)} year break-even point.`,
    monitoringPlan: 'Annual review of financial situation and market conditions.',
    keyMetrics: [
      'Monthly cost difference',
      'Break-even period',
      'Equity accumulation',
      'Cash flow impact'
    ],
    reviewSchedule: 'Annual financial review and market condition assessment.',
    riskManagement: `Risk management includes monitoring ${metrics.riskScore} risk score and ${probabilityOfBenefit.toFixed(1)}% probability of benefit.`,
    mitigationStrategies: [
      'Diversify investment portfolio',
      'Maintain emergency fund',
      'Monitor market conditions',
      'Plan for lifestyle changes'
    ],
    contingencyPlans: [
      'Alternative housing options',
      'Refinancing strategies',
      'Investment portfolio adjustments',
      'Emergency fund maintenance'
    ],
    performanceBenchmarks: [
      {
        metric: 'Break-Even Period',
        target: 5,
        benchmark: breakEvenYears,
        industry: 'Real Estate Investment'
      },
      {
        metric: 'Equity Build-up',
        target: 50000,
        benchmark: metrics.equityBuildUp,
        industry: 'Real Estate Investment'
      },
      {
        metric: 'Cash Flow Improvement',
        target: 10,
        benchmark: metrics.cashFlowImprovement,
        industry: 'Real Estate Investment'
      }
    ],
    decisionRecommendation: `${recommendation} with ${valueRating.toLowerCase()} and ${confidenceRating.toLowerCase()} confidence.`,
    presentationPoints: [
      `Recommendation: ${recommendation}`,
      `Break-even: ${breakEvenYears.toFixed(1)} years`,
      `Monthly savings: $${Math.abs(metrics.monthlyCostDifference).toLocaleString()}`,
      `Equity build-up: $${metrics.equityBuildUp.toLocaleString()}`
    ],
    decisionFactors: [
      'Financial cost comparison',
      'Break-even analysis',
      'Equity accumulation potential',
      'Risk assessment',
      'Lifestyle considerations'
    ]
  };
}