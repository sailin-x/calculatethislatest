import { MortgageVsRentInputs, MortgageVsRentOutputs } from './types';

// Calculate monthly mortgage payment
export function calculateMonthlyMortgagePayment(
  loanAmount: number,
  interestRate: number,
  loanTermYears: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  if (monthlyRate === 0) return loanAmount / numPayments;

  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Calculate monthly ownership costs
export function calculateMonthlyOwnershipCost(inputs: MortgageVsRentInputs): number {
  const loanAmount = inputs.propertyValue - inputs.downPayment;
  const monthlyMortgage = calculateMonthlyMortgagePayment(loanAmount, inputs.interestRate, inputs.loanTerm);

  const monthlyPropertyTaxes = inputs.annualPropertyTaxes / 12;
  const monthlyInsurance = inputs.annualHomeownersInsurance / 12;
  const monthlyMaintenance = (inputs.annualMaintenance / 100 * inputs.propertyValue) / 12;

  return monthlyMortgage + monthlyPropertyTaxes + monthlyInsurance + inputs.monthlyHOAFees + monthlyMaintenance;
}

// Calculate total ownership cost over analysis period
export function calculateTotalOwnershipCost(inputs: MortgageVsRentInputs): number {
  let totalCost = inputs.closingCosts + inputs.mortgagePoints + inputs.mortgageOriginationFees + inputs.oneTimeMovingCosts;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const monthlyCost = calculateMonthlyOwnershipCost(inputs);
    totalCost += monthlyCost * 12;
  }

  return totalCost;
}

// Calculate total rent cost over analysis period
export function calculateTotalRentCost(inputs: MortgageVsRentInputs): number {
  let totalCost = inputs.rentDeposit + inputs.oneTimeMovingCosts;
  let currentMonthlyRent = inputs.monthlyRent;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    totalCost += currentMonthlyRent * 12;
    currentMonthlyRent *= (1 + inputs.annualRentIncrease / 100);
  }

  return totalCost;
}

// Calculate equity built through homeownership
export function calculateHomeEquityBuilt(inputs: MortgageVsRentInputs): number {
  const loanAmount = inputs.propertyValue - inputs.downPayment;
  const monthlyPayment = calculateMonthlyMortgagePayment(loanAmount, inputs.interestRate, inputs.loanTerm);

  // Simplified equity calculation - in reality this would be more complex with amortization schedule
  let remainingBalance = loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;

  for (let month = 1; month <= inputs.analysisPeriod * 12; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
  }

  const homeAppreciation = inputs.propertyValue * Math.pow(1 + inputs.expectedHomeAppreciation / 100, inputs.analysisPeriod);
  const equityBuilt = (homeAppreciation - remainingBalance) - inputs.downPayment;

  return Math.max(0, equityBuilt);
}

// Calculate investment growth from rent savings
export function calculateInvestmentFromRentSavings(inputs: MortgageVsRentInputs): number {
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);
  const monthlyRentSavings = inputs.monthlyRent - monthlyOwnershipCost;

  if (monthlyRentSavings <= 0) return 0;

  let totalInvested = 0;
  let investmentValue = 0;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvested += monthlyRentSavings;
      investmentValue = totalInvested * Math.pow(1 + inputs.alternativeInvestmentReturn / 100, (year * 12 + month) / 12);
    }
  }

  return investmentValue;
}

// Calculate annual tax savings from ownership
export function calculateAnnualTaxSavings(inputs: MortgageVsRentInputs): number {
  const loanAmount = inputs.propertyValue - inputs.downPayment;
  const monthlyMortgage = calculateMonthlyMortgagePayment(loanAmount, inputs.interestRate, inputs.loanTerm);

  // Tax-deductible portion (simplified - mortgage interest + property taxes)
  const annualMortgageInterest = monthlyMortgage * 12 * 0.7; // Rough estimate of interest portion
  const taxDeductibleAmount = annualMortgageInterest + inputs.annualPropertyTaxes;

  return taxDeductibleAmount * (inputs.marginalTaxRate / 100);
}

// Calculate break-even point
export function calculateBreakEvenPoint(inputs: MortgageVsRentInputs): number {
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);
  const monthlyRentCost = inputs.monthlyRent;
  const monthlySavings = monthlyRentCost - monthlyOwnershipCost;

  if (monthlySavings <= 0) return Infinity;

  const upfrontCosts = inputs.closingCosts + inputs.mortgagePoints + inputs.mortgageOriginationFees +
                      inputs.oneTimeMovingCosts - inputs.rentDeposit;

  return upfrontCosts / (monthlySavings * 12);
}

// Calculate net present value
export function calculateNetPresentValue(inputs: MortgageVsRentInputs): number {
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);
  let currentMonthlyRent = inputs.monthlyRent;

  let npv = -(inputs.closingCosts + inputs.mortgagePoints + inputs.mortgageOriginationFees + inputs.oneTimeMovingCosts - inputs.rentDeposit);

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    for (let month = 1; month <= 12; month++) {
      const discountFactor = 1 / Math.pow(1 + inputs.alternativeInvestmentReturn / 100 / 12, (year - 1) * 12 + month);
      npv -= monthlyOwnershipCost * discountFactor;
      npv += currentMonthlyRent * discountFactor;
    }
    currentMonthlyRent *= (1 + inputs.annualRentIncrease / 100);
  }

  return npv;
}

// Generate yearly breakdown
export function generateYearlyBreakdown(inputs: MortgageVsRentInputs): MortgageVsRentOutputs['yearlyBreakdown'] {
  const breakdown = [];
  let currentMonthlyRent = inputs.monthlyRent;
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);

  let cumulativeEquity = 0;
  let cumulativeInvestment = 0;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const annualOwnershipCost = monthlyOwnershipCost * 12;
    const annualRentCost = currentMonthlyRent * 12;

    // Simplified equity calculation
    const annualEquityGrowth = (inputs.downPayment + (inputs.propertyValue - inputs.downPayment) * 0.02) *
                              Math.pow(1 + inputs.expectedHomeAppreciation / 100, year - 1) * (inputs.expectedHomeAppreciation / 100);
    cumulativeEquity += annualEquityGrowth;

    // Investment growth from rent savings
    const monthlyRentSavings = Math.max(0, currentMonthlyRent - monthlyOwnershipCost);
    const annualRentSavings = monthlyRentSavings * 12;
    cumulativeInvestment += annualRentSavings;
    cumulativeInvestment *= (1 + inputs.alternativeInvestmentReturn / 100);

    const netPosition = cumulativeEquity - cumulativeInvestment;

    breakdown.push({
      year,
      ownershipCost: annualOwnershipCost,
      rentCost: annualRentCost,
      equityBuilt: cumulativeEquity,
      investmentGrowth: cumulativeInvestment,
      netPosition
    });

    currentMonthlyRent *= (1 + inputs.annualRentIncrease / 100);
  }

  return breakdown;
}

// Generate cost comparison
export function generateCostComparison(inputs: MortgageVsRentInputs): MortgageVsRentOutputs['costComparison'] {
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);
  const loanAmount = inputs.propertyValue - inputs.downPayment;
  const monthlyMortgage = calculateMonthlyMortgagePayment(loanAmount, inputs.interestRate, inputs.loanTerm);

  return [
    {
      category: 'Housing Payment',
      ownership: monthlyMortgage,
      renting: inputs.monthlyRent,
      difference: monthlyMortgage - inputs.monthlyRent
    },
    {
      category: 'Property Taxes',
      ownership: inputs.annualPropertyTaxes / 12,
      renting: 0,
      difference: inputs.annualPropertyTaxes / 12
    },
    {
      category: 'Insurance',
      ownership: inputs.annualHomeownersInsurance / 12,
      renting: 0,
      difference: inputs.annualHomeownersInsurance / 12
    },
    {
      category: 'HOA Fees',
      ownership: inputs.monthlyHOAFees,
      renting: 0,
      difference: inputs.monthlyHOAFees
    },
    {
      category: 'Maintenance',
      ownership: (inputs.annualMaintenance / 100 * inputs.propertyValue) / 12,
      renting: 0,
      difference: (inputs.annualMaintenance / 100 * inputs.propertyValue) / 12
    }
  ];
}

// Generate sensitivity analysis
export function generateSensitivityAnalysis(inputs: MortgageVsRentInputs): MortgageVsRentOutputs['sensitivityAnalysis'] {
  const analysis = [];
  const baseNPV = calculateNetPresentValue(inputs);

  // Test different appreciation rates
  for (const change of [-2, -1, 0, 1, 2]) {
    const newInputs = { ...inputs, expectedHomeAppreciation: inputs.expectedHomeAppreciation + change };
    const newNPV = calculateNetPresentValue(newInputs);
    const impact = newNPV - baseNPV;

    let recommendation = '';
    if (impact > 10000) recommendation = 'Buying becomes more attractive';
    else if (impact < -10000) recommendation = 'Renting becomes more attractive';
    else recommendation = 'Minimal impact on decision';

    analysis.push({
      appreciationChange: change,
      impact,
      recommendation
    });
  }

  return analysis;
}

// Generate scenario analysis
export function generateScenarioAnalysis(inputs: MortgageVsRentInputs): Pick<MortgageVsRentOutputs, 'conservativeScenario' | 'expectedScenario' | 'optimisticScenario'> {
  // Conservative scenario: lower appreciation, higher costs
  const conservativeInputs = {
    ...inputs,
    expectedHomeAppreciation: Math.max(0, inputs.expectedHomeAppreciation - 2),
    annualMaintenance: inputs.annualMaintenance + 0.5,
    alternativeInvestmentReturn: Math.max(0, inputs.alternativeInvestmentReturn - 1)
  };

  // Expected scenario: as entered
  const expectedInputs = inputs;

  // Optimistic scenario: higher appreciation, lower costs
  const optimisticInputs = {
    ...inputs,
    expectedHomeAppreciation: inputs.expectedHomeAppreciation + 2,
    annualMaintenance: Math.max(0, inputs.annualMaintenance - 0.5),
    alternativeInvestmentReturn: inputs.alternativeInvestmentReturn + 1
  };

  const conservativeNPV = calculateNetPresentValue(conservativeInputs);
  const expectedNPV = calculateNetPresentValue(expectedInputs);
  const optimisticNPV = calculateNetPresentValue(optimisticInputs);

  return {
    conservativeScenario: {
      netCost: conservativeNPV,
      recommendation: conservativeNPV > 0 ? 'Renting may be better' : 'Buying still advantageous'
    },
    expectedScenario: {
      netCost: expectedNPV,
      recommendation: expectedNPV > 0 ? 'Consider renting' : 'Buying appears beneficial'
    },
    optimisticScenario: {
      netCost: optimisticNPV,
      recommendation: optimisticNPV > 0 ? 'Strong case for renting' : 'Buying is clearly better'
    }
  };
}

// Generate recommendations
export function generateRecommendations(
  inputs: MortgageVsRentInputs,
  npv: number,
  breakEvenYears: number
): Pick<MortgageVsRentOutputs, 'primaryRecommendation' | 'confidenceLevel' | 'keyFactors' | 'alternativeConsiderations'> {
  let primaryRecommendation: 'Buy' | 'Rent' | 'Depends on circumstances' = 'Depends on circumstances';
  let confidenceLevel: 'High' | 'Medium' | 'Low' = 'Medium';

  if (npv < -50000 && breakEvenYears < inputs.analysisPeriod) {
    primaryRecommendation = 'Buy';
    confidenceLevel = 'High';
  } else if (npv > 50000) {
    primaryRecommendation = 'Rent';
    confidenceLevel = 'High';
  } else if (Math.abs(npv) < 25000) {
    confidenceLevel = 'Low';
  }

  const keyFactors = [];
  if (inputs.expectedHomeAppreciation > inputs.alternativeInvestmentReturn + 2) {
    keyFactors.push('Strong home appreciation potential favors buying');
  }
  if (inputs.analysisPeriod < 5) {
    keyFactors.push('Short time horizon favors renting');
  }
  if (breakEvenYears > inputs.analysisPeriod) {
    keyFactors.push('Break-even period exceeds analysis timeframe');
  }

  const alternativeConsiderations = [
    'Consider your risk tolerance and lifestyle needs',
    'Factor in transaction costs of selling',
    'Evaluate local market conditions',
    'Consider tax implications and deductions',
    'Think about maintenance and repair responsibilities'
  ];

  return {
    primaryRecommendation,
    confidenceLevel,
    keyFactors,
    alternativeConsiderations
  };
}

// Main calculation function
export function calculateMortgageVsRent(inputs: MortgageVsRentInputs): MortgageVsRentOutputs {
  const monthlyOwnershipCost = calculateMonthlyOwnershipCost(inputs);
  const monthlyRentCost = inputs.monthlyRent;
  const monthlyCashFlowDifference = monthlyRentCost - monthlyOwnershipCost;

  const totalOwnershipCost = calculateTotalOwnershipCost(inputs);
  const totalRentCost = calculateTotalRentCost(inputs);
  const netCostDifference = totalOwnershipCost - totalRentCost;

  const homeEquityBuilt = calculateHomeEquityBuilt(inputs);
  const investmentFromRentSavings = calculateInvestmentFromRentSavings(inputs);
  const netWealthDifference = homeEquityBuilt - investmentFromRentSavings;

  const breakEvenYears = calculateBreakEvenPoint(inputs);
  const breakEvenMonths = breakEvenYears * 12;

  const netPresentValue = calculateNetPresentValue(inputs);
  const internalRateOfReturn = 0; // Simplified - would require more complex calculation
  const ownershipVsRentRatio = totalOwnershipCost / totalRentCost;

  const annualTaxSavings = calculateAnnualTaxSavings(inputs);
  const totalTaxSavings = annualTaxSavings * inputs.analysisPeriod;

  const yearlyBreakdown = generateYearlyBreakdown(inputs);
  const costComparison = generateCostComparison(inputs);
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs);
  const scenarioAnalysis = generateScenarioAnalysis(inputs);
  const recommendations = generateRecommendations(inputs, netPresentValue, breakEvenYears);

  return {
    monthlyOwnershipCost,
    monthlyRentCost,
    monthlyCashFlowDifference,
    totalOwnershipCost,
    totalRentCost,
    netCostDifference,
    homeEquityBuilt,
    investmentFromRentSavings,
    netWealthDifference,
    breakEvenYears,
    breakEvenMonths,
    netPresentValue,
    internalRateOfReturn,
    ownershipVsRentRatio,
    annualTaxSavings,
    totalTaxSavings,
    sensitivityAnalysis,
    ...scenarioAnalysis,
    ...recommendations,
    yearlyBreakdown,
    costComparison
  };
}