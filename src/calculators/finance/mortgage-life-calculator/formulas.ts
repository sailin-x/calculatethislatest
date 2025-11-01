import { MortgageLifeInputs, MortgageLifeOutputs } from './types';

// Calculate remaining loan balance at a specific age
export function calculateRemainingBalance(
  loanAmount: number,
  monthlyPayment: number,
  interestRate: number,
  loanTerm: number,
  borrowerAge: number,
  currentAge: number
): number {
  const monthsElapsed = (currentAge - borrowerAge) * 12;
  const totalMonths = loanTerm * 12;

  if (monthsElapsed >= totalMonths) {
    return 0; // Loan paid off
  }

  const monthlyRate = interestRate / 100 / 12;

  // Calculate remaining balance using amortization formula
  const remainingBalance = (monthlyPayment * (1 - Math.pow(1 + monthlyRate, -(totalMonths - monthsElapsed)))) / monthlyRate;

  return Math.max(0, remainingBalance);
}

// Calculate loan payoff age
export function calculateLoanPayoffAge(
  borrowerAge: number,
  loanTerm: number
): number {
  return borrowerAge + loanTerm;
}

// Calculate total payments made by a certain age
export function calculateTotalPaymentsByAge(
  monthlyPayment: number,
  borrowerAge: number,
  targetAge: number
): number {
  const monthsPaid = Math.max(0, (targetAge - borrowerAge) * 12);
  return monthlyPayment * monthsPaid;
}

// Calculate life insurance recommendation
export function calculateLifeInsuranceRecommendation(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['lifeInsuranceRecommendation'] {
  const remainingBalance = calculateRemainingBalance(
    inputs.loanAmount,
    inputs.monthlyPayment,
    inputs.interestRate,
    inputs.loanTerm,
    inputs.borrowerAge,
    inputs.borrowerLifeExpectancy
  );

  // Recommended coverage includes mortgage balance plus additional needs
  const mortgageCoverage = remainingBalance;
  const additionalCoverage = Math.min(
    inputs.monthlyIncome * 12 * 5, // 5 years of income
    1000000 // Cap at $1M
  );

  const recommendedCoverage = mortgageCoverage + additionalCoverage;

  // Estimate premium (simplified calculation)
  const annualPremium = (recommendedCoverage / 1000) * 1.5; // $1.50 per $1000
  const monthlyPremium = annualPremium / 12;

  let rationale = `Recommended coverage of $${recommendedCoverage.toLocaleString()} includes:`;
  rationale += `\n- $${remainingBalance.toLocaleString()} for remaining mortgage balance`;
  rationale += `\n- $${additionalCoverage.toLocaleString()} for income replacement and final expenses`;

  return {
    recommendedCoverage,
    monthlyPremium,
    annualPremium,
    rationale
  };
}

// Calculate estate impact
export function calculateEstateImpact(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['estateImpact'] {
  const remainingBalance = calculateRemainingBalance(
    inputs.loanAmount,
    inputs.monthlyPayment,
    inputs.interestRate,
    inputs.loanTerm,
    inputs.borrowerAge,
    inputs.borrowerLifeExpectancy
  );

  const heirsReceive = inputs.propertyValue;
  const mortgageDebt = remainingBalance;
  const netInheritance = heirsReceive - mortgageDebt;

  const recommendations: string[] = [];

  if (netInheritance < 0) {
    recommendations.push('Consider life insurance to cover mortgage debt');
    recommendations.push('Review estate planning to protect heirs from mortgage debt');
  }

  if (remainingBalance > inputs.propertyValue * 0.5) {
    recommendations.push('Consider paying down mortgage to reduce estate burden');
  }

  return {
    heirsReceive,
    mortgageDebt,
    netInheritance,
    recommendations
  };
}

// Calculate survivor scenarios
export function calculateSurvivorScenarios(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['survivorScenarios'] {
  const borrowerDiesFirst = {
    survivingSpouseIncome: inputs.includeSpouse && inputs.spouseAge ?
      inputs.monthlyIncome * 0.6 : 0, // Assume 60% of income from survivor benefits
    survivingSpouseExpenses: inputs.monthlyExpenses,
    mortgageStress: 'Low' as 'Low' | 'Medium' | 'High',
    recommendations: [] as string[]
  };

  const spouseDiesFirst = {
    survivingBorrowerIncome: inputs.monthlyIncome,
    survivingBorrowerExpenses: inputs.monthlyExpenses,
    mortgageStress: 'Low' as 'Low' | 'Medium' | 'High',
    recommendations: [] as string[]
  };

  // Calculate mortgage stress for borrower dies first scenario
  if (inputs.includeSpouse && inputs.spouseAge) {
    const incomeRatio = borrowerDiesFirst.survivingSpouseIncome / borrowerDiesFirst.survivingSpouseExpenses;
    if (incomeRatio < 1.25) {
      borrowerDiesFirst.mortgageStress = 'High';
      borrowerDiesFirst.recommendations.push('Surviving spouse may struggle with mortgage payments');
      borrowerDiesFirst.recommendations.push('Consider life insurance or mortgage life insurance');
    } else if (incomeRatio < 1.5) {
      borrowerDiesFirst.mortgageStress = 'Medium';
      borrowerDiesFirst.recommendations.push('Monitor survivor income carefully');
    }
  }

  // Calculate mortgage stress for spouse dies first scenario
  const incomeRatio = spouseDiesFirst.survivingBorrowerIncome / spouseDiesFirst.survivingBorrowerExpenses;
  if (incomeRatio < 1.25) {
    spouseDiesFirst.mortgageStress = 'High';
    spouseDiesFirst.recommendations.push('May struggle with mortgage payments after spouse passes');
    spouseDiesFirst.recommendations.push('Consider mortgage life insurance');
  } else if (incomeRatio < 1.5) {
    spouseDiesFirst.mortgageStress = 'Medium';
    spouseDiesFirst.recommendations.push('Monitor financial situation carefully');
  }

  return {
    borrowerDiesFirst,
    spouseDiesFirst
  };
}

// Generate long-term projections
export function generateLongTermProjections(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['longTermProjections'] {
  const projections: MortgageLifeOutputs['longTermProjections'] = [];
  const endAge = Math.min(inputs.borrowerLifeExpectancy, inputs.borrowerAge + inputs.analysisPeriod);

  for (let age = inputs.borrowerAge; age <= endAge; age += 5) {
    const year = 2024 + (age - inputs.borrowerAge);
    const loanBalance = calculateRemainingBalance(
      inputs.loanAmount,
      inputs.monthlyPayment,
      inputs.interestRate,
      inputs.loanTerm,
      inputs.borrowerAge,
      age
    );

    const propertyValue = inputs.propertyValue * Math.pow(1 + inputs.propertyAppreciationRate / 100, age - inputs.borrowerAge);
    const equity = propertyValue - loanBalance;
    const cumulativePayments = calculateTotalPaymentsByAge(
      inputs.monthlyPayment,
      inputs.borrowerAge,
      age
    );

    projections.push({
      year,
      age,
      loanBalance,
      propertyValue,
      equity,
      cumulativePayments
    });
  }

  return projections;
}

// Calculate risk analysis
export function calculateRiskAnalysis(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['riskAnalysis'] {
  // Longevity risk
  const loanPayoffAge = calculateLoanPayoffAge(inputs.borrowerAge, inputs.loanTerm);
  let longevityRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.borrowerLifeExpectancy > loanPayoffAge + 10) {
    longevityRisk = 'High';
  } else if (inputs.borrowerLifeExpectancy > loanPayoffAge + 5) {
    longevityRisk = 'Medium';
  }

  // Market risk
  let marketRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.propertyAppreciationRate < 1) {
    marketRisk = 'High';
  } else if (inputs.propertyAppreciationRate < 3) {
    marketRisk = 'Medium';
  }

  // Inflation risk
  let inflationRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.inflationRate > 4) {
    inflationRisk = 'High';
  } else if (inputs.inflationRate > 3) {
    inflationRisk = 'Medium';
  }

  // Overall risk
  const riskScores = { Low: 1, Medium: 2, High: 3 };
  const averageRisk = (riskScores[longevityRisk] + riskScores[marketRisk] + riskScores[inflationRisk]) / 3;
  let overallRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (averageRisk > 2.5) overallRisk = 'High';
  else if (averageRisk > 1.5) overallRisk = 'Medium';

  // Mitigation strategies
  const mitigationStrategies: string[] = [];
  if (longevityRisk === 'High') {
    mitigationStrategies.push('Consider mortgage life insurance');
    mitigationStrategies.push('Build emergency fund for survivor');
  }
  if (marketRisk === 'High') {
    mitigationStrategies.push('Diversify investments beyond real estate');
  }
  if (inflationRisk === 'High') {
    mitigationStrategies.push('Consider adjustable rate mortgage');
    mitigationStrategies.push('Build inflation-protected assets');
  }

  return {
    longevityRisk,
    marketRisk,
    inflationRisk,
    overallRisk,
    mitigationStrategies
  };
}

// Generate financial planning recommendations
export function generateFinancialPlanning(
  inputs: MortgageLifeInputs
): MortgageLifeOutputs['financialPlanning'] {
  const recommendedActions: string[] = [];
  const insuranceNeeds: string[] = [];
  const estatePlanning: string[] = [];
  const priorityOrder: string[] = [];

  // Life insurance needs
  const lifeInsurance = calculateLifeInsuranceRecommendation(inputs);
  if (lifeInsurance.recommendedCoverage > 0) {
    insuranceNeeds.push(`Obtain life insurance coverage of $${lifeInsurance.recommendedCoverage.toLocaleString()}`);
    insuranceNeeds.push('Consider mortgage life insurance for debt coverage');
  }

  // Estate planning
  const estateImpact = calculateEstateImpact(inputs);
  if (estateImpact.netInheritance < 0) {
    estatePlanning.push('Create estate plan to handle mortgage debt');
    estatePlanning.push('Consider trust structures for asset protection');
  }

  // Recommended actions based on risk
  const riskAnalysis = calculateRiskAnalysis(inputs);
  if (riskAnalysis.overallRisk === 'High') {
    recommendedActions.push('Consult financial advisor for comprehensive planning');
    recommendedActions.push('Review insurance coverage annually');
  }

  // Priority order
  priorityOrder.push('Secure adequate life insurance');
  priorityOrder.push('Build emergency fund (6-12 months expenses)');
  priorityOrder.push('Pay down high-interest debt');
  priorityOrder.push('Maximize retirement contributions');
  priorityOrder.push('Consider mortgage payoff strategies');

  return {
    recommendedActions,
    insuranceNeeds,
    estatePlanning,
    priorityOrder
  };
}

// Main calculation function
export function calculateMortgageLife(inputs: MortgageLifeInputs): MortgageLifeOutputs {
  const loanPayoffAge = calculateLoanPayoffAge(inputs.borrowerAge, inputs.loanTerm);
  const loanPayoffYear = 2024 + (loanPayoffAge - inputs.borrowerAge);

  const totalPayments = inputs.monthlyPayment * inputs.loanTerm * 12;
  const totalInterest = totalPayments - inputs.loanAmount;

  const remainingBalanceAtDeath = calculateRemainingBalance(
    inputs.loanAmount,
    inputs.monthlyPayment,
    inputs.interestRate,
    inputs.loanTerm,
    inputs.borrowerAge,
    inputs.borrowerLifeExpectancy
  );

  const equityAtDeath = inputs.propertyValue - remainingBalanceAtDeath;

  const lifeInsuranceRecommendation = calculateLifeInsuranceRecommendation(inputs);
  const estateImpact = calculateEstateImpact(inputs);
  const survivorScenarios = calculateSurvivorScenarios(inputs);
  const longTermProjections = generateLongTermProjections(inputs);
  const riskAnalysis = calculateRiskAnalysis(inputs);
  const financialPlanning = generateFinancialPlanning(inputs);

  return {
    loanPayoffAge,
    loanPayoffYear,
    totalPayments,
    totalInterest,
    remainingBalanceAtDeath,
    equityAtDeath,
    lifeInsuranceRecommendation,
    estateImpact,
    survivorScenarios,
    longTermProjections,
    riskAnalysis,
    financialPlanning
  };
}