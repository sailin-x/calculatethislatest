import { MortgagePointsInputs } from './validation';

export interface PointsResult {
  pointsCost: number;
  rateReduction: number;
  monthlySavings: number;
  annualSavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalSavings: number;
  netPresentValue: number;
  roi: number;
  scenarioComparison: ScenarioComparison;
  breakEvenAnalysis: BreakEvenAnalysis;
  costBenefitAnalysis: CostBenefitAnalysis;
  recommendations: string[];
}

export interface ScenarioComparison {
  scenarios: PointsScenario[];
  bestScenario: string;
  costComparison: CostComparison;
  savingsComparison: SavingsComparison;
}

export interface PointsScenario {
  name: string;
  pointsCost: number;
  rateReduction: number;
  monthlySavings: number;
  breakEvenMonths: number;
  totalSavings: number;
  npv: number;
  roi: number;
  recommendation: string;
}

export interface CostComparison {
  lowestCost: string;
  highestCost: string;
  costRange: number;
  averageCost: number;
}

export interface SavingsComparison {
  highestSavings: string;
  lowestSavings: string;
  savingsRange: number;
  averageSavings: number;
}

export interface BreakEvenAnalysis {
  breakEvenMonths: number;
  breakEvenYears: number;
  breakEvenDate: string;
  riskAssessment: string;
  sensitivityAnalysis: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
  ownershipPeriodImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
}

export interface CostBenefitAnalysis {
  totalInvestment: number;
  totalReturn: number;
  netBenefit: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
  benefitCostRatio: number;
  riskAdjustedReturn: number;
  taxBenefits: number;
  opportunityCost: number;
  inflationImpact: number;
}

export const calculateMortgagePoints = (inputs: MortgagePointsInputs): PointsResult => {
  // Calculate points cost
  const pointsCost = calculatePointsCost(inputs);
  
  // Calculate rate reduction
  const rateReduction = inputs.originalRate - inputs.reducedRate;
  
  // Calculate monthly payments
  const originalPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.originalRate, inputs.loanTerm);
  const reducedPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.reducedRate, inputs.loanTerm);
  
  // Calculate savings
  const monthlySavings = originalPayment - reducedPayment;
  const annualSavings = monthlySavings * 12;
  
  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs, pointsCost, monthlySavings);
  
  // Calculate total savings over loan term
  const totalSavings = calculateTotalSavings(inputs, monthlySavings);
  
  // Calculate net present value
  const netPresentValue = calculateNetPresentValue(inputs, pointsCost, monthlySavings);
  
  // Calculate ROI
  const roi = calculateROI(pointsCost, totalSavings);
  
  // Generate scenario comparison
  const scenarioComparison = generateScenarioComparison(inputs);
  
  // Calculate cost-benefit analysis
  const costBenefitAnalysis = calculateCostBenefitAnalysis(inputs, pointsCost, monthlySavings, totalSavings);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, breakEvenAnalysis, costBenefitAnalysis, scenarioComparison);
  
  return {
    pointsCost,
    rateReduction,
    monthlySavings,
    annualSavings,
    breakEvenMonths: breakEvenAnalysis.breakEvenMonths,
    breakEvenYears: breakEvenAnalysis.breakEvenYears,
    totalSavings,
    netPresentValue,
    roi,
    scenarioComparison,
    breakEvenAnalysis,
    costBenefitAnalysis,
    recommendations
  };
};

const calculatePointsCost = (inputs: MortgagePointsInputs): number => {
  if (inputs.pointsCost) {
    return inputs.pointsCost;
  }
  
  if (inputs.pointsPercentage) {
    return (inputs.loanAmount * inputs.pointsPercentage) / 100;
  }
  
  // Calculate based on rate reduction (typical: 0.25% reduction per point)
  const rateReduction = inputs.originalRate - inputs.reducedRate;
  const estimatedPoints = rateReduction / 0.25;
  return (inputs.loanAmount * estimatedPoints) / 100;
};

const calculateMonthlyPayment = (loanAmount: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

const calculateBreakEvenAnalysis = (inputs: MortgagePointsInputs, pointsCost: number, monthlySavings: number): BreakEvenAnalysis => {
  const breakEvenMonths = monthlySavings > 0 ? pointsCost / monthlySavings : 0;
  const breakEvenYears = breakEvenMonths / 12;
  
  // Calculate break-even date
  const breakEvenDate = new Date();
  breakEvenDate.setMonth(breakEvenDate.getMonth() + Math.ceil(breakEvenMonths));
  
  // Risk assessment
  let riskAssessment = 'Low';
  if (breakEvenYears > 5) riskAssessment = 'High';
  else if (breakEvenYears > 3) riskAssessment = 'Medium';
  
  // Sensitivity analysis
  const optimistic = pointsCost / (monthlySavings * 1.2); // 20% higher savings
  const realistic = breakEvenMonths;
  const pessimistic = pointsCost / (monthlySavings * 0.8); // 20% lower savings
  
  // Ownership period impact
  const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
  let shortTerm = 'Not Recommended';
  let mediumTerm = 'Consider';
  let longTerm = 'Recommended';
  
  if (breakEvenYears <= plannedOwnership * 0.3) {
    shortTerm = 'Recommended';
  } else if (breakEvenYears <= plannedOwnership * 0.7) {
    mediumTerm = 'Recommended';
  }
  
  return {
    breakEvenMonths,
    breakEvenYears,
    breakEvenDate: breakEvenDate.toISOString().split('T')[0],
    riskAssessment,
    sensitivityAnalysis: {
      optimistic,
      realistic,
      pessimistic
    },
    ownershipPeriodImpact: {
      shortTerm,
      mediumTerm,
      longTerm
    }
  };
};

const calculateTotalSavings = (inputs: MortgagePointsInputs, monthlySavings: number): number => {
  const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
  const totalPayments = plannedOwnership * 12;
  return monthlySavings * totalPayments;
};

const calculateNetPresentValue = (inputs: MortgagePointsInputs, pointsCost: number, monthlySavings: number): number => {
  const discountRate = (inputs.investmentReturn || 7) / 100 / 12; // Monthly discount rate
  const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
  const totalPayments = plannedOwnership * 12;
  
  let npv = -pointsCost;
  
  for (let i = 1; i <= totalPayments; i++) {
    npv += monthlySavings / Math.pow(1 + discountRate, i);
  }
  
  return Math.round(npv * 100) / 100;
};

const calculateROI = (pointsCost: number, totalSavings: number): number => {
  if (pointsCost === 0) return 0;
  return ((totalSavings - pointsCost) / pointsCost) * 100;
};

const generateScenarioComparison = (inputs: MortgagePointsInputs): ScenarioComparison => {
  if (!inputs.compareScenarios) {
    return {
      scenarios: [],
      bestScenario: '',
      costComparison: { lowestCost: '', highestCost: '', costRange: 0, averageCost: 0 },
      savingsComparison: { highestSavings: '', lowestSavings: '', savingsRange: 0, averageSavings: 0 }
    };
  }
  
  const scenarios: PointsScenario[] = [];
  const pointsOptions = inputs.pointsOptions || ['0', '1', '2'];
  
  pointsOptions.forEach(pointsStr => {
    const points = parseFloat(pointsStr);
    const pointsCost = (inputs.loanAmount * points) / 100;
    const rateReduction = points * 0.25; // Typical rate reduction per point
    const reducedRate = inputs.originalRate - rateReduction;
    
    const originalPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.originalRate, inputs.loanTerm);
    const reducedPayment = calculateMonthlyPayment(inputs.loanAmount, reducedRate, inputs.loanTerm);
    const monthlySavings = originalPayment - reducedPayment;
    
    const breakEvenMonths = monthlySavings > 0 ? pointsCost / monthlySavings : 0;
    const totalSavings = calculateTotalSavings(inputs, monthlySavings);
    const npv = calculateNetPresentValue(inputs, pointsCost, monthlySavings);
    const roi = calculateROI(pointsCost, totalSavings);
    
    let recommendation = 'Not Recommended';
    if (breakEvenMonths <= 36 && roi > 50) recommendation = 'Highly Recommended';
    else if (breakEvenMonths <= 60 && roi > 20) recommendation = 'Recommended';
    else if (breakEvenMonths <= 84) recommendation = 'Consider';
    
    scenarios.push({
      name: `${points} Point${points !== 1 ? 's' : ''}`,
      pointsCost,
      rateReduction,
      monthlySavings,
      breakEvenMonths,
      totalSavings,
      npv,
      roi,
      recommendation
    });
  });
  
  // Find best scenario by NPV
  const bestScenario = scenarios.reduce((best, current) => 
    current.npv > best.npv ? current : best
  );
  
  // Cost comparison
  const costs = scenarios.map(s => s.pointsCost);
  const costRange = Math.max(...costs) - Math.min(...costs);
  const averageCost = costs.reduce((a, b) => a + b, 0) / costs.length;
  
  // Savings comparison
  const savings = scenarios.map(s => s.monthlySavings);
  const savingsRange = Math.max(...savings) - Math.min(...savings);
  const averageSavings = savings.reduce((a, b) => a + b, 0) / savings.length;
  
  return {
    scenarios,
    bestScenario: bestScenario.name,
    costComparison: {
      lowestCost: scenarios.reduce((a, b) => a.pointsCost < b.pointsCost ? a : b).name,
      highestCost: scenarios.reduce((a, b) => a.pointsCost > b.pointsCost ? a : b).name,
      costRange,
      averageCost
    },
    savingsComparison: {
      highestSavings: scenarios.reduce((a, b) => a.monthlySavings > b.monthlySavings ? a : b).name,
      lowestSavings: scenarios.reduce((a, b) => a.monthlySavings < b.monthlySavings ? a : b).name,
      savingsRange,
      averageSavings
    }
  };
};

const calculateCostBenefitAnalysis = (inputs: MortgagePointsInputs, pointsCost: number, monthlySavings: number, totalSavings: number): CostBenefitAnalysis => {
  const plannedOwnership = inputs.plannedOwnership || inputs.loanTerm;
  const totalPayments = plannedOwnership * 12;
  
  const totalInvestment = pointsCost;
  const totalReturn = totalSavings;
  const netBenefit = totalReturn - totalInvestment;
  const paybackPeriod = monthlySavings > 0 ? pointsCost / monthlySavings : 0;
  
  // Calculate tax benefits
  const taxBenefits = inputs.includeTaxBenefits && inputs.taxRate ? 
    (pointsCost * (inputs.taxRate / 100)) : 0;
  
  // Calculate opportunity cost
  const opportunityCost = inputs.includeOpportunityCost && inputs.investmentReturn ? 
    (pointsCost * (inputs.investmentReturn / 100) * plannedOwnership) : 0;
  
  // Calculate inflation impact
  const inflationImpact = inputs.inflationRate ? 
    (totalSavings * (inputs.inflationRate / 100) * plannedOwnership) : 0;
  
  // Calculate benefit-cost ratio
  const benefitCostRatio = totalInvestment > 0 ? totalReturn / totalInvestment : 0;
  
  // Calculate risk-adjusted return
  const riskAdjustedReturn = totalInvestment > 0 ? 
    ((totalReturn - opportunityCost) / totalInvestment) * 100 : 0;
  
  // Calculate internal rate of return (simplified)
  const irr = calculateIRR(pointsCost, monthlySavings, totalPayments);
  
  return {
    totalInvestment,
    totalReturn,
    netBenefit,
    paybackPeriod,
    internalRateOfReturn: irr,
    benefitCostRatio,
    riskAdjustedReturn,
    taxBenefits,
    opportunityCost,
    inflationImpact
  };
};

const calculateIRR = (initialInvestment: number, monthlyCashFlow: number, periods: number): number => {
  // Simplified IRR calculation using trial and error
  let rate = 0.05; // Start with 5%
  let npv = -initialInvestment;
  
  for (let i = 1; i <= periods; i++) {
    npv += monthlyCashFlow / Math.pow(1 + rate / 12, i);
  }
  
  // Simple adjustment based on NPV
  if (npv > 0) {
    rate += 0.01;
  } else {
    rate -= 0.01;
  }
  
  return Math.round(rate * 100 * 100) / 100; // Convert to percentage with 2 decimal places
};

const generateRecommendations = (inputs: MortgagePointsInputs, breakEvenAnalysis: BreakEvenAnalysis, costBenefitAnalysis: CostBenefitAnalysis, scenarioComparison: ScenarioComparison): string[] => {
  const recommendations: string[] = [];
  
  // Break-even recommendations
  if (breakEvenAnalysis.breakEvenYears <= 2) {
    recommendations.push('Points are highly recommended with a quick break-even period of less than 2 years.');
  } else if (breakEvenAnalysis.breakEvenYears <= 5) {
    recommendations.push('Points are recommended with a reasonable break-even period of 2-5 years.');
  } else if (breakEvenAnalysis.breakEvenYears <= 8) {
    recommendations.push('Consider points if you plan to stay in the home long-term (break-even in 5-8 years).');
  } else {
    recommendations.push('Points may not be cost-effective with a break-even period exceeding 8 years.');
  }
  
  // ROI recommendations
  if (costBenefitAnalysis.benefitCostRatio > 2) {
    recommendations.push('Excellent return on investment with benefits more than double the cost.');
  } else if (costBenefitAnalysis.benefitCostRatio > 1.5) {
    recommendations.push('Good return on investment with substantial benefits over cost.');
  } else if (costBenefitAnalysis.benefitCostRatio > 1.2) {
    recommendations.push('Moderate return on investment with benefits exceeding cost.');
  } else {
    recommendations.push('Limited return on investment - consider alternative uses for the funds.');
  }
  
  // Refinancing likelihood recommendations
  if (inputs.refinanceLikelihood === 'high') {
    recommendations.push('High refinancing likelihood reduces the benefit of points - consider skipping points.');
  } else if (inputs.refinanceLikelihood === 'medium') {
    recommendations.push('Medium refinancing likelihood - points may still be beneficial if break-even is under 5 years.');
  } else {
    recommendations.push('Low refinancing likelihood increases the value of points for long-term savings.');
  }
  
  // Tax considerations
  if (inputs.includeTaxBenefits && inputs.taxRate && inputs.taxRate > 20) {
    recommendations.push('Higher tax bracket increases the value of points through tax deductions.');
  }
  
  // Opportunity cost considerations
  if (inputs.includeOpportunityCost && inputs.investmentReturn && inputs.investmentReturn > 8) {
    recommendations.push('High expected investment returns may make alternative investments more attractive than points.');
  }
  
  // Best scenario recommendation
  if (scenarioComparison.bestScenario && scenarioComparison.bestScenario !== '0 Points') {
    recommendations.push(`Consider ${scenarioComparison.bestScenario} for optimal cost-benefit balance.`);
  }
  
  return recommendations;
};

export const generateMortgagePointsAnalysis = (inputs: MortgagePointsInputs, outputs: PointsResult): string => {
  const report = `
# Mortgage Points Analysis Report

## Summary
- **Loan Amount:** $${inputs.loanAmount.toLocaleString()}
- **Original Rate:** ${inputs.originalRate}%
- **Reduced Rate:** ${inputs.reducedRate}%
- **Rate Reduction:** ${outputs.rateReduction.toFixed(3)} percentage points
- **Points Cost:** $${outputs.pointsCost.toLocaleString()}

## Savings Analysis
- **Monthly Payment Savings:** $${outputs.monthlySavings.toLocaleString()}
- **Annual Savings:** $${outputs.annualSavings.toLocaleString()}
- **Total Savings (${inputs.plannedOwnership || inputs.loanTerm} years):** $${outputs.totalSavings.toLocaleString()}

## Break-Even Analysis
- **Break-Even Period:** ${outputs.breakEvenYears.toFixed(1)} years (${outputs.breakEvenMonths.toFixed(0)} months)
- **Break-Even Date:** ${outputs.breakEvenAnalysis.breakEvenDate}
- **Risk Assessment:** ${outputs.breakEvenAnalysis.riskAssessment}

## Financial Analysis
- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}
- **Return on Investment:** ${outputs.roi.toFixed(1)}%
- **Benefit-Cost Ratio:** ${outputs.costBenefitAnalysis.benefitCostRatio.toFixed(2)}

## Scenario Comparison
${outputs.scenarioComparison.scenarios.map(scenario => 
  `- **${scenario.name}:** Cost $${scenario.pointsCost.toLocaleString()}, Save $${scenario.monthlySavings.toLocaleString()}/month, Break-even in ${scenario.breakEvenMonths.toFixed(0)} months, ROI ${scenario.roi.toFixed(1)}%`
).join('\n')}

## Cost-Benefit Analysis
- **Total Investment:** $${outputs.costBenefitAnalysis.totalInvestment.toLocaleString()}
- **Total Return:** $${outputs.costBenefitAnalysis.totalReturn.toLocaleString()}
- **Net Benefit:** $${outputs.costBenefitAnalysis.netBenefit.toLocaleString()}
- **Tax Benefits:** $${outputs.costBenefitAnalysis.taxBenefits.toLocaleString()}
- **Opportunity Cost:** $${outputs.costBenefitAnalysis.opportunityCost.toLocaleString()}

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Key Considerations
1. **Ownership Period:** Longer ownership periods increase the value of points
2. **Refinancing Plans:** Frequent refinancing reduces points benefits
3. **Tax Situation:** Higher tax brackets increase points value through deductions
4. **Alternative Investments:** Compare points ROI with other investment opportunities
5. **Cash Flow:** Ensure you have sufficient cash reserves after buying points

## Next Steps
1. Review the break-even analysis for your specific situation
2. Compare with alternative uses for the points cost
3. Consider your refinancing likelihood and timeline
4. Evaluate your tax situation and potential deductions
5. Discuss options with your lender and financial advisor
`;

  return report.trim();
};