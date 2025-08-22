import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculate401k(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    current401kBalance,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    salaryGrowthRate,
    investmentReturn,
    inflationRate,
    contributionIncrease,
    catchUpContribution,
    taxRate,
    retirementTaxRate,
    lifeExpectancy,
    socialSecurityIncome,
    otherRetirementIncome
  } = inputs;

  // Calculate years until retirement
  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  const yearsInRetirement = (lifeExpectancy as number) - (retirementAge as number);

  // Calculate maximum annual contribution limits
  const maxContribution = calculateMaxContribution(currentAge as number, catchUpContribution as boolean);
  const catchUpAmount = calculateCatchUpAmount(currentAge as number, catchUpContribution as boolean);

  // Calculate current annual contributions
  const annualContribution = (currentSalary as number) * ((employeeContribution as number) / 100);
  const effectiveEmployerMatch = Math.min(employeeContribution as number, employerMatchLimit as number);
  const annualEmployerMatch = (currentSalary as number) * ((effectiveEmployerMatch * (employerMatch as number)) / 100);
  const monthlyContribution = annualContribution / 12;

  // Calculate tax savings
  const annualTaxSavings = annualContribution * ((taxRate as number) / 100);
  const totalTaxSavings = calculateTotalTaxSavings(inputs);

  // Calculate projected 401(k) balance
  const projectedBalance = calculateProjectedBalance(inputs);
  const totalContributions = calculateTotalContributions(inputs);
  const totalEmployerMatch = calculateTotalEmployerMatch(inputs);
  const totalGrowth = projectedBalance - totalContributions - totalEmployerMatch - (current401kBalance as number);

  // Calculate retirement income
  const annualRetirementIncome = calculateRetirementIncome(projectedBalance, yearsInRetirement, retirementTaxRate as number);
  const monthlyRetirementIncome = annualRetirementIncome / 12;
  const totalRetirementIncome = annualRetirementIncome + (socialSecurityIncome as number) + (otherRetirementIncome as number);

  // Calculate replacement ratio
  const finalSalary = (currentSalary as number) * Math.pow(1 + ((salaryGrowthRate as number) / 100), yearsToRetirement);
  const replacementRatio = (totalRetirementIncome / finalSalary) * 100;

  // Calculate years of income
  const yearsOfIncome = projectedBalance / annualRetirementIncome;

  // Calculate contribution efficiency
  const contributionEfficiency = (annualContribution / maxContribution) * 100;

  // Calculate assessment scores
  const retirementScore = calculateRetirementScore(inputs, replacementRatio);
  const savingsScore = calculateSavingsScore(inputs, contributionEfficiency);
  const investmentScore = calculateInvestmentScore(inputs);
  const taxEfficiencyScore = calculateTaxEfficiencyScore(inputs, annualTaxSavings);

  // Calculate inflation-adjusted projected value
  const projectedValue = projectedBalance / Math.pow(1 + ((inflationRate as number) / 100), yearsToRetirement);

  // Calculate contribution gap
  const contributionGap = maxContribution - annualContribution;

  return {
    totalContributions: Math.round(totalContributions),
    totalEmployerMatch: Math.round(totalEmployerMatch),
    total401kBalance: Math.round(projectedBalance),
    annualContribution: Math.round(annualContribution),
    annualEmployerMatch: Math.round(annualEmployerMatch),
    taxSavings: Math.round(annualTaxSavings),
    totalTaxSavings: Math.round(totalTaxSavings),
    monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
    annualRetirementIncome: Math.round(annualRetirementIncome),
    totalRetirementIncome: Math.round(totalRetirementIncome),
    replacementRatio: Math.round(replacementRatio * 100) / 100,
    yearsOfIncome: Math.round(yearsOfIncome * 10) / 10,
    maxContribution: Math.round(maxContribution),
    catchUpAmount: Math.round(catchUpAmount),
    contributionGap: Math.round(contributionGap),
    retirementScore: Math.round(retirementScore),
    savingsScore: Math.round(savingsScore),
    investmentScore: Math.round(investmentScore),
    taxEfficiencyScore: Math.round(taxEfficiencyScore),
    projectedValue: Math.round(projectedValue),
    monthlyContribution: Math.round(monthlyContribution),
    employerMatchRate: Math.round(effectiveEmployerMatch * 100) / 100,
    totalGrowth: Math.round(totalGrowth),
    contributionEfficiency: Math.round(contributionEfficiency * 100) / 100
  };
}

function calculateMaxContribution(currentAge: number, catchUpContribution: boolean): number {
  const baseLimit = 22500; // 2024 limit
  if (currentAge >= 50 && catchUpContribution) {
    return baseLimit + 7500; // Catch-up contribution
  }
  return baseLimit;
}

function calculateCatchUpAmount(currentAge: number, catchUpContribution: boolean): number {
  if (currentAge >= 50 && catchUpContribution) {
    return 7500; // 2024 catch-up limit
  }
  return 0;
}

function calculateTotalContributions(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    salaryGrowthRate,
    contributionIncrease
  } = inputs;

  let totalContributions = 0;
  let currentContributionRate = employeeContribution as number;
  let currentSalaryValue = currentSalary as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    const annualContribution = currentSalaryValue * (currentContributionRate / 100);
    totalContributions += annualContribution;
    
    // Increase salary and contribution rate
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    currentContributionRate += (contributionIncrease as number);
    
    // Cap contribution rate at 100%
    currentContributionRate = Math.min(currentContributionRate, 100);
  }

  return totalContributions;
}

function calculateTotalEmployerMatch(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    salaryGrowthRate,
    contributionIncrease
  } = inputs;

  let totalEmployerMatch = 0;
  let currentContributionRate = employeeContribution as number;
  let currentSalaryValue = currentSalary as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    const effectiveMatchRate = Math.min(currentContributionRate, employerMatchLimit as number);
    const annualEmployerMatch = currentSalaryValue * ((effectiveMatchRate * (employerMatch as number)) / 100);
    totalEmployerMatch += annualEmployerMatch;
    
    // Increase salary and contribution rate
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    currentContributionRate += (contributionIncrease as number);
    
    // Cap contribution rate at 100%
    currentContributionRate = Math.min(currentContributionRate, 100);
  }

  return totalEmployerMatch;
}

function calculateProjectedBalance(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    current401kBalance,
    currentSalary,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    salaryGrowthRate,
    investmentReturn,
    contributionIncrease
  } = inputs;

  let balance = current401kBalance as number;
  let currentContributionRate = employeeContribution as number;
  let currentSalaryValue = currentSalary as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    // Calculate contributions
    const annualContribution = currentSalaryValue * (currentContributionRate / 100);
    const effectiveMatchRate = Math.min(currentContributionRate, employerMatchLimit as number);
    const annualEmployerMatch = currentSalaryValue * ((effectiveMatchRate * (employerMatch as number)) / 100);
    
    // Add contributions to balance
    balance += annualContribution + annualEmployerMatch;
    
    // Apply investment return
    balance *= (1 + ((investmentReturn as number) / 100));
    
    // Increase salary and contribution rate
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    currentContributionRate += (contributionIncrease as number);
    
    // Cap contribution rate at 100%
    currentContributionRate = Math.min(currentContributionRate, 100);
  }

  return balance;
}

function calculateTotalTaxSavings(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    taxRate,
    salaryGrowthRate,
    contributionIncrease
  } = inputs;

  let totalTaxSavings = 0;
  let currentContributionRate = employeeContribution as number;
  let currentSalaryValue = currentSalary as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    const annualContribution = currentSalaryValue * (currentContributionRate / 100);
    const annualTaxSavings = annualContribution * ((taxRate as number) / 100);
    totalTaxSavings += annualTaxSavings;
    
    // Increase salary and contribution rate
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    currentContributionRate += (contributionIncrease as number);
    
    // Cap contribution rate at 100%
    currentContributionRate = Math.min(currentContributionRate, 100);
  }

  return totalTaxSavings;
}

function calculateRetirementIncome(balance: number, yearsInRetirement: number, taxRate: number): number {
  // Use 4% rule for retirement income
  const annualWithdrawal = balance * 0.04;
  const afterTaxIncome = annualWithdrawal * (1 - (taxRate / 100));
  return afterTaxIncome;
}

function calculateRetirementScore(inputs: CalculatorInputs, replacementRatio: number): number {
  let score = 50; // Base score

  // Replacement ratio scoring
  if (replacementRatio >= 80) score += 30;
  else if (replacementRatio >= 70) score += 20;
  else if (replacementRatio >= 60) score += 10;
  else if (replacementRatio < 40) score -= 20;

  // Age-based scoring
  const currentAge = inputs.currentAge as number;
  const retirementAge = inputs.retirementAge as number;
  const yearsToRetirement = retirementAge - currentAge;

  if (yearsToRetirement >= 30) score += 10;
  else if (yearsToRetirement < 10) score -= 10;

  // Contribution rate scoring
  const contributionRate = inputs.employeeContribution as number;
  if (contributionRate >= 15) score += 15;
  else if (contributionRate >= 10) score += 10;
  else if (contributionRate >= 6) score += 5;
  else if (contributionRate < 3) score -= 15;

  // Employer match scoring
  const employerMatch = inputs.employerMatch as number;
  if (employerMatch >= 6) score += 10;
  else if (employerMatch >= 3) score += 5;
  else if (employerMatch === 0) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateSavingsScore(inputs: CalculatorInputs, contributionEfficiency: number): number {
  let score = 50; // Base score

  // Contribution efficiency scoring
  if (contributionEfficiency >= 100) score += 30;
  else if (contributionEfficiency >= 80) score += 20;
  else if (contributionEfficiency >= 60) score += 10;
  else if (contributionEfficiency < 30) score -= 20;

  // Contribution rate scoring
  const contributionRate = inputs.employeeContribution as number;
  if (contributionRate >= 15) score += 20;
  else if (contributionRate >= 10) score += 15;
  else if (contributionRate >= 6) score += 10;
  else if (contributionRate < 3) score -= 20;

  // Catch-up contribution scoring
  const currentAge = inputs.currentAge as number;
  const catchUpContribution = inputs.catchUpContribution as boolean;
  if (currentAge >= 50 && catchUpContribution) score += 10;

  return Math.max(0, Math.min(100, score));
}

function calculateInvestmentScore(inputs: CalculatorInputs): number {
  let score = 50; // Base score

  // Investment return scoring
  const investmentReturn = inputs.investmentReturn as number;
  if (investmentReturn >= 8) score += 20;
  else if (investmentReturn >= 6) score += 10;
  else if (investmentReturn < 4) score -= 15;

  // Age-appropriate risk scoring
  const currentAge = inputs.currentAge as number;
  const retirementAge = inputs.retirementAge as number;
  const yearsToRetirement = retirementAge - currentAge;

  if (yearsToRetirement > 20 && investmentReturn >= 7) score += 10;
  else if (yearsToRetirement < 10 && investmentReturn <= 5) score += 10;

  // Current balance scoring
  const currentBalance = inputs.current401kBalance as number;
  const currentSalary = inputs.currentSalary as number;
  const balanceToSalaryRatio = currentBalance / currentSalary;

  if (balanceToSalaryRatio >= 2) score += 15;
  else if (balanceToSalaryRatio >= 1) score += 10;
  else if (balanceToSalaryRatio < 0.5) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateTaxEfficiencyScore(inputs: CalculatorInputs, annualTaxSavings: number): number {
  let score = 50; // Base score

  // Tax savings scoring
  const currentSalary = inputs.currentSalary as number;
  const taxSavingsRatio = annualTaxSavings / currentSalary;

  if (taxSavingsRatio >= 0.05) score += 25;
  else if (taxSavingsRatio >= 0.03) score += 15;
  else if (taxSavingsRatio >= 0.01) score += 5;
  else if (taxSavingsRatio < 0.005) score -= 15;

  // Tax rate comparison scoring
  const currentTaxRate = inputs.taxRate as number;
  const retirementTaxRate = inputs.retirementTaxRate as number;

  if (currentTaxRate > retirementTaxRate) score += 15;
  else if (currentTaxRate < retirementTaxRate) score -= 10;

  // Contribution rate scoring
  const contributionRate = inputs.employeeContribution as number;
  if (contributionRate >= 10) score += 10;
  else if (contributionRate < 3) score -= 10;

  return Math.max(0, Math.min(100, score));
}

export function generate401kAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const currentAge = inputs.currentAge as number;
  const retirementAge = inputs.retirementAge as number;
  const yearsToRetirement = retirementAge - currentAge;
  const replacementRatio = outputs.replacementRatio;
  const retirementScore = outputs.retirementScore;

  return `# 401(k) Retirement Analysis

## Summary
- **Current Age**: ${currentAge} years
- **Retirement Age**: ${retirementAge} years
- **Years to Retirement**: ${yearsToRetirement} years
- **Retirement Readiness Score**: ${retirementScore}/100
- **Income Replacement Ratio**: ${replacementRatio}%

## Current Contributions
- **Annual Employee Contribution**: $${outputs.annualContribution.toLocaleString()}
- **Annual Employer Match**: $${outputs.annualEmployerMatch.toLocaleString()}
- **Monthly Contribution**: $${outputs.monthlyContribution.toLocaleString()}
- **Effective Employer Match Rate**: ${outputs.employerMatchRate}%
- **Contribution Efficiency**: ${outputs.contributionEfficiency}%

## Projected Results
- **Total Employee Contributions**: $${outputs.totalContributions.toLocaleString()}
- **Total Employer Match**: $${outputs.totalEmployerMatch.toLocaleString()}
- **Investment Growth**: $${outputs.totalGrowth.toLocaleString()}
- **Projected 401(k) Balance**: $${outputs.total401kBalance.toLocaleString()}
- **Inflation-Adjusted Value**: $${outputs.projectedValue.toLocaleString()}

## Tax Benefits
- **Annual Tax Savings**: $${outputs.taxSavings.toLocaleString()}
- **Total Tax Savings**: $${outputs.totalTaxSavings.toLocaleString()}
- **Tax Efficiency Score**: ${outputs.taxEfficiencyScore}/100

## Retirement Income
- **Monthly 401(k) Income**: $${outputs.monthlyRetirementIncome.toLocaleString()}
- **Annual 401(k) Income**: $${outputs.annualRetirementIncome.toLocaleString()}
- **Total Retirement Income**: $${outputs.totalRetirementIncome.toLocaleString()}
- **Years of Income**: ${outputs.yearsOfIncome} years

## Contribution Limits
- **Maximum Annual Contribution**: $${outputs.maxContribution.toLocaleString()}
- **Catch-up Amount (50+)**: $${outputs.catchUpAmount.toLocaleString()}
- **Contribution Gap**: $${outputs.contributionGap.toLocaleString()}

## Assessment Scores
- **Retirement Readiness**: ${outputs.retirementScore}/100
- **Savings Rate**: ${outputs.savingsScore}/100
- **Investment Strategy**: ${outputs.investmentScore}/100
- **Tax Efficiency**: ${outputs.taxEfficiencyScore}/100

## Key Insights
${replacementRatio >= 80 ? '✅ **Excellent**: Your retirement income should comfortably replace your pre-retirement income' : ''}
${replacementRatio >= 60 && replacementRatio < 80 ? '⚠️ **Good**: Your retirement income should provide adequate replacement, but consider increasing contributions' : ''}
${replacementRatio < 60 ? '❌ **Needs Improvement**: Consider increasing your contribution rate to improve retirement readiness' : ''}

${outputs.contributionEfficiency >= 100 ? '✅ **Maximum Contribution**: You are contributing the maximum allowed amount' : ''}
${outputs.contributionEfficiency >= 80 && outputs.contributionEfficiency < 100 ? '⚠️ **Near Maximum**: Consider increasing to reach maximum contribution' : ''}
${outputs.contributionEfficiency < 60 ? '❌ **Low Efficiency**: You are not maximizing your contribution potential' : ''}

${outputs.employerMatchRate > 0 ? `💰 **Employer Match**: You are receiving ${outputs.employerMatchRate}% employer match - great benefit!` : '❌ **No Employer Match**: Consider negotiating for employer match or look for opportunities with better benefits'}

## Recommendations
${outputs.contributionGap > 0 ? `- **Increase Contributions**: Consider contributing an additional $${outputs.contributionGap.toLocaleString()} annually to reach maximum` : ''}
${currentAge >= 45 && !(inputs.catchUpContribution as boolean) ? '- **Plan for Catch-up**: Consider catch-up contributions when you turn 50' : ''}
${outputs.replacementRatio < 70 ? '- **Boost Savings**: Consider increasing contribution rate or extending retirement age' : ''}
${outputs.investmentScore < 60 ? '- **Review Investments**: Consider adjusting your investment strategy for better returns' : ''}

This analysis provides a comprehensive view of your 401(k) retirement planning and opportunities for optimization.`;
}
