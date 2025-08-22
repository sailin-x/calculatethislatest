import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculate401kPlan(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    current401kBalance,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    planFees,
    investmentFees,
    salaryGrowthRate,
    investmentReturn,
    inflationRate,
    contributionIncrease,
    catchUpContribution,
    taxRate,
    retirementTaxRate,
    lifeExpectancy,
    socialSecurityIncome,
    otherRetirementIncome,
    planType,
    rothPercentage,
    loanBalance,
    hardshipWithdrawals,
    investmentAllocation,
    rebalanceFrequency
  } = inputs;

  // Convert percentages to decimals
  const employeeContributionRate = employeeContribution / 100;
  const employerMatchRate = employerMatch / 100;
  const employerMatchLimitRate = employerMatchLimit / 100;
  const planFeesRate = planFees / 100;
  const investmentFeesRate = investmentFees / 100;
  const salaryGrowthRateDecimal = salaryGrowthRate / 100;
  const investmentReturnRate = investmentReturn / 100;
  const inflationRateDecimal = inflationRate / 100;
  const contributionIncreaseRate = contributionIncrease / 100;
  const taxRateDecimal = taxRate / 100;
  const retirementTaxRateDecimal = retirementTaxRate / 100;
  const rothPercentageDecimal = rothPercentage / 100;

  // Calculate years to retirement
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Calculate current annual contributions
  const annualEmployeeContribution = currentSalary * employeeContributionRate;
  const annualEmployerMatch = Math.min(
    currentSalary * employeeContributionRate * employerMatchRate,
    currentSalary * employerMatchLimitRate * employerMatchRate
  );
  const annualContribution = annualEmployeeContribution + annualEmployerMatch;

  // Calculate maximum contributions
  const maxContribution = 22500; // 2024 limit
  const catchUpAmount = catchUpContribution && currentAge >= 50 ? 7500 : 0;
  const maxTotalContribution = maxContribution + catchUpAmount;
  const contributionGap = Math.max(0, maxTotalContribution - annualContribution);

  // Calculate annual fees
  const annualFees = (current401kBalance + annualContribution) * (planFeesRate + investmentFeesRate);

  // Calculate tax savings
  const traditionalContributionRate = planType === 'roth' ? 0 : (1 - rothPercentageDecimal);
  const rothContributionRate = planType === 'traditional' ? 0 : rothPercentageDecimal;
  
  const annualTaxSavings = annualEmployeeContribution * traditionalContributionRate * taxRateDecimal;

  // Project future values
  let projectedBalance = current401kBalance;
  let totalContributions = 0;
  let totalEmployerMatch = 0;
  let totalFees = 0;
  let totalTaxSavings = 0;
  let currentSalaryProjected = currentSalary;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const currentAgeInYear = currentAge + year;
    
    // Update salary
    currentSalaryProjected *= (1 + salaryGrowthRateDecimal);
    
    // Calculate contributions for this year
    const employeeContributionThisYear = currentSalaryProjected * employeeContributionRate * (1 + contributionIncreaseRate) ** (year - 1);
    const employerMatchThisYear = Math.min(
      employeeContributionThisYear * employerMatchRate,
      currentSalaryProjected * employerMatchLimitRate * employerMatchRate
    );
    const totalContributionThisYear = employeeContributionThisYear + employerMatchThisYear;
    
    // Add catch-up contribution if eligible
    const catchUpThisYear = catchUpContribution && currentAgeInYear >= 50 ? 7500 : 0;
    const totalWithCatchUp = totalContributionThisYear + catchUpThisYear;
    
    // Calculate fees
    const feesThisYear = (projectedBalance + totalWithCatchUp) * (planFeesRate + investmentFeesRate);
    
    // Calculate tax savings
    const taxSavingsThisYear = employeeContributionThisYear * traditionalContributionRate * taxRateDecimal;
    
    // Update running totals
    totalContributions += employeeContributionThisYear;
    totalEmployerMatch += employerMatchThisYear;
    totalFees += feesThisYear;
    totalTaxSavings += taxSavingsThisYear;
    
    // Apply investment growth (net of fees)
    const netReturnRate = investmentReturnRate - planFeesRate - investmentFeesRate;
    projectedBalance = (projectedBalance + totalWithCatchUp) * (1 + netReturnRate);
  }

  // Calculate retirement income
  const monthlyRetirementIncome = calculateRetirementIncome(projectedBalance, yearsInRetirement, retirementTaxRateDecimal);
  const annualRetirementIncome = monthlyRetirementIncome * 12;
  const totalRetirementIncome = annualRetirementIncome * yearsInRetirement;

  // Calculate replacement ratio
  const finalSalary = currentSalary * (1 + salaryGrowthRateDecimal) ** yearsToRetirement;
  const replacementRatio = (annualRetirementIncome / finalSalary) * 100;

  // Calculate scores
  const retirementScore = calculateRetirementScore(projectedBalance, finalSalary, yearsInRetirement);
  const savingsScore = calculateSavingsScore(annualContribution, maxTotalContribution, yearsToRetirement);
  const investmentScore = calculateInvestmentScore(investmentAllocation, rebalanceFrequency);
  const feeEfficiencyScore = calculateFeeEfficiencyScore(planFeesRate + investmentFeesRate);

  // Calculate Roth vs Traditional breakdown
  const rothBalance = projectedBalance * rothContributionRate;
  const traditionalBalance = projectedBalance * traditionalContributionRate;
  const rothTaxFreeIncome = rothBalance / yearsInRetirement;

  // Calculate impact of loans and hardship withdrawals
  const loanRepaymentImpact = loanBalance * (1 + investmentReturnRate) ** yearsToRetirement;
  const hardshipImpact = hardshipWithdrawals * (1 + investmentReturnRate) ** yearsToRetirement;

  // Calculate rebalancing benefit
  const rebalanceBenefit = calculateRebalancingBenefit(projectedBalance, rebalanceFrequency, investmentReturnRate);

  // Calculate fee impact
  const feeImpact = totalFees * (1 + investmentReturnRate) ** yearsToRetirement;

  return {
    totalContributions,
    totalEmployerMatch,
    totalFees,
    total401kBalance: projectedBalance,
    annualContribution,
    annualEmployerMatch,
    annualFees,
    taxSavings: annualTaxSavings,
    totalTaxSavings,
    monthlyRetirementIncome,
    annualRetirementIncome,
    totalRetirementIncome,
    replacementRatio,
    yearsOfIncome: yearsInRetirement,
    maxContribution: maxTotalContribution,
    catchUpAmount,
    contributionGap,
    retirementScore,
    savingsScore,
    investmentScore,
    feeEfficiencyScore,
    projectedValue: projectedBalance,
    monthlyContribution: annualContribution / 12,
    employerMatchRate: (annualEmployerMatch / annualEmployeeContribution) * 100,
    totalGrowth: projectedBalance - current401kBalance - totalContributions - totalEmployerMatch,
    contributionEfficiency: (annualContribution / maxTotalContribution) * 100,
    feeImpact,
    rothBalance,
    traditionalBalance,
    rothTaxFreeIncome,
    loanRepaymentImpact,
    hardshipImpact,
    rebalanceBenefit
  };
}

function calculateRetirementIncome(balance: number, yearsInRetirement: number, taxRate: number): number {
  // Use 4% rule for sustainable withdrawal rate
  const withdrawalRate = 0.04;
  const annualWithdrawal = balance * withdrawalRate;
  const afterTaxIncome = annualWithdrawal * (1 - taxRate);
  return afterTaxIncome / 12;
}

function calculateRetirementScore(balance: number, finalSalary: number, yearsInRetirement: number): number {
  const targetBalance = finalSalary * 10; // 10x salary rule
  const ratio = balance / targetBalance;
  return Math.min(100, Math.max(0, ratio * 100));
}

function calculateSavingsScore(contribution: number, maxContribution: number, yearsToRetirement: number): number {
  const contributionRatio = contribution / maxContribution;
  const yearsFactor = Math.min(1, yearsToRetirement / 30);
  return Math.min(100, Math.max(0, (contributionRatio * 0.7 + yearsFactor * 0.3) * 100));
}

function calculateInvestmentScore(allocation: string, rebalanceFrequency: string): number {
  let score = 60; // Base score
  
  // Allocation scoring
  switch (allocation) {
    case 'aggressive':
      score += 20;
      break;
    case 'moderate':
      score += 15;
      break;
    case 'conservative':
      score += 10;
      break;
  }
  
  // Rebalancing scoring
  switch (rebalanceFrequency) {
    case 'quarterly':
      score += 15;
      break;
    case 'annually':
      score += 10;
      break;
    case 'monthly':
      score += 5;
      break;
    case 'never':
      score -= 10;
      break;
  }
  
  return Math.min(100, Math.max(0, score));
}

function calculateFeeEfficiencyScore(totalFees: number): number {
  // Score based on fee efficiency (lower is better)
  if (totalFees <= 0.5) return 100;
  if (totalFees <= 1.0) return 80;
  if (totalFees <= 1.5) return 60;
  if (totalFees <= 2.0) return 40;
  return 20;
}

function calculateRebalancingBenefit(balance: number, frequency: string, returnRate: number): number {
  // Estimate additional return from rebalancing
  let rebalancingBonus = 0;
  
  switch (frequency) {
    case 'quarterly':
      rebalancingBonus = 0.002; // 0.2% additional return
      break;
    case 'annually':
      rebalancingBonus = 0.001; // 0.1% additional return
      break;
    case 'monthly':
      rebalancingBonus = 0.003; // 0.3% additional return
      break;
    default:
      rebalancingBonus = 0;
  }
  
  return balance * rebalancingBonus;
}

export function generate401kPlanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    employerMatch,
    planType,
    investmentAllocation,
    rebalanceFrequency
  } = inputs;

  const {
    total401kBalance,
    totalContributions,
    totalEmployerMatch,
    totalFees,
    monthlyRetirementIncome,
    replacementRatio,
    retirementScore,
    savingsScore,
    investmentScore,
    feeEfficiencyScore,
    contributionGap,
    rothBalance,
    traditionalBalance,
    feeImpact
  } = outputs;

  return `# 401(k) Plan Analysis Report

## Executive Summary
Your 401(k) plan analysis shows a projected balance of **$${total401kBalance.toLocaleString()}** at retirement, providing **$${monthlyRetirementIncome.toLocaleString()}** in monthly retirement income. This represents a **${replacementRatio.toFixed(1)}%** income replacement ratio.

## Key Metrics

### Retirement Readiness
- **Retirement Score:** ${retirementScore.toFixed(0)}/100
- **Savings Score:** ${savingsScore.toFixed(0)}/100  
- **Investment Score:** ${investmentScore.toFixed(0)}/100
- **Fee Efficiency Score:** ${feeEfficiencyScore.toFixed(0)}/100

### Contribution Analysis
- **Current Annual Contribution:** $${(totalContributions / (retirementAge - currentAge)).toLocaleString()}
- **Employer Match:** $${(totalEmployerMatch / (retirementAge - currentAge)).toLocaleString()} annually
- **Contribution Gap:** $${contributionGap.toLocaleString()} (unused contribution room)

### Investment Strategy
- **Plan Type:** ${planType === 'traditional' ? 'Traditional 401(k)' : planType === 'roth' ? 'Roth 401(k)' : 'Split Traditional/Roth'}
- **Allocation Strategy:** ${investmentAllocation}
- **Rebalancing Frequency:** ${rebalanceFrequency}

## Detailed Breakdown

### Account Composition
${planType !== 'traditional' ? `
- **Traditional 401(k):** $${traditionalBalance.toLocaleString()} (${((traditionalBalance / total401kBalance) * 100).toFixed(1)}%)
- **Roth 401(k):** $${rothBalance.toLocaleString()} (${((rothBalance / total401kBalance) * 100).toFixed(1)}%)
` : '- **Traditional 401(k):** 100% of balance'}

### Fee Impact
- **Total Fees Paid:** $${totalFees.toLocaleString()}
- **Fee Impact on Final Balance:** $${feeImpact.toLocaleString()}
- **Fee Efficiency:** ${feeEfficiencyScore >= 80 ? 'Excellent' : feeEfficiencyScore >= 60 ? 'Good' : feeEfficiencyScore >= 40 ? 'Fair' : 'Poor'}

## Recommendations

### Immediate Actions
${contributionGap > 0 ? `1. **Increase Contributions:** You have $${contributionGap.toLocaleString()} in unused contribution room. Consider increasing your contribution rate.` : '1. **Maintain Current Contributions:** You are maximizing your 401(k) contributions.'}

2. **Review Investment Allocation:** Your current ${investmentAllocation} strategy is ${investmentScore >= 80 ? 'excellent' : investmentScore >= 60 ? 'good' : 'needs improvement'}.

### Long-term Strategy
1. **Rebalancing:** ${rebalanceFrequency === 'never' ? 'Consider implementing regular rebalancing to maintain your target allocation.' : 'Your rebalancing strategy is appropriate.'}

2. **Fee Optimization:** ${feeEfficiencyScore < 60 ? 'Consider lower-cost investment options to reduce fees.' : 'Your current fee structure is competitive.'}

3. **Catch-up Contributions:** ${currentAge >= 50 ? 'You are eligible for catch-up contributions. Consider maximizing this opportunity.' : 'You will be eligible for catch-up contributions at age 50.'}

## Risk Assessment
- **Market Risk:** Moderate to high depending on allocation
- **Longevity Risk:** ${replacementRatio >= 70 ? 'Low' : replacementRatio >= 50 ? 'Moderate' : 'High'} (consider additional savings)
- **Inflation Risk:** Moderate (consider inflation-protected investments)

## Next Steps
1. Review and adjust contribution rate if needed
2. Consider diversifying with other retirement accounts (IRA, HSA)
3. Develop a comprehensive retirement income strategy
4. Consult with a financial advisor for personalized guidance

---
*This analysis is based on current assumptions and market conditions. Actual results may vary. Consider consulting with a financial professional for personalized advice.*`;
}
