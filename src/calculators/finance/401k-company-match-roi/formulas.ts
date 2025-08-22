import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculate401kCompanyMatchROI(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    matchVestingSchedule,
    yearsOfService,
    salaryGrowthRate,
    investmentReturn,
    inflationRate,
    taxRate,
    retirementTaxRate,
    alternativeInvestmentReturn,
    planToStay,
    companyStability,
    jobSatisfaction,
    marketConditions
  } = inputs;

  // Calculate years until retirement
  const yearsToRetirement = (retirementAge as number) - (currentAge as number);

  // Calculate current annual employer match
  const effectiveMatchRate = Math.min(employeeContribution as number, employerMatchLimit as number);
  const annualEmployerMatch = (currentSalary as number) * ((effectiveMatchRate * (employerMatch as number)) / 100);
  const monthlyMatch = annualEmployerMatch / 12;

  // Calculate vesting percentage
  const vestingPercentage = calculateVestingPercentage(matchVestingSchedule as string, yearsOfService as number);
  const vestedMatchAmount = annualEmployerMatch * (vestingPercentage / 100);
  const unvestedMatchAmount = annualEmployerMatch - vestedMatchAmount;

  // Calculate years to full vesting
  const yearsToFullVesting = calculateYearsToFullVesting(matchVestingSchedule as string, yearsOfService as number);

  // Calculate total projected match
  const totalProjectedMatch = calculateTotalProjectedMatch(inputs);
  const totalVestedMatch = calculateTotalVestedMatch(inputs);

  // Calculate match growth value
  const matchGrowthValue = calculateMatchGrowthValue(inputs, totalVestedMatch);

  // Calculate tax benefits
  const taxSavings = vestedMatchAmount * ((taxRate as number) / 100);
  const totalTaxSavings = calculateTotalTaxSavings(inputs, totalVestedMatch);

  // Calculate match ROI
  const matchROI = calculateMatchROI(inputs, totalVestedMatch);

  // Calculate match value ratio
  const matchValueRatio = (annualEmployerMatch / (currentSalary as number)) * 100;

  // Calculate alternative investment value
  const alternativeValue = calculateAlternativeValue(inputs, totalVestedMatch);

  // Calculate opportunity cost
  const opportunityCost = calculateOpportunityCost(inputs, unvestedMatchAmount);

  // Calculate stay recommendation
  const stayRecommendation = generateStayRecommendation(inputs, opportunityCost, yearsToFullVesting);

  // Calculate risk and quality scores
  const vestingRisk = calculateVestingRisk(inputs, unvestedMatchAmount, yearsToFullVesting);
  const matchQuality = calculateMatchQuality(inputs);
  const retentionValue = calculateRetentionValue(inputs, opportunityCost, yearsToFullVesting);

  // Calculate match efficiency
  const matchEfficiency = (effectiveMatchRate / (employerMatchLimit as number)) * 100;

  // Calculate compensation boost
  const compensationBoost = (annualEmployerMatch / (currentSalary as number)) * 100;

  // Calculate retirement impact
  const retirementImpact = calculateRetirementImpact(inputs, matchGrowthValue);

  // Calculate break-even years
  const breakEvenYears = calculateBreakEvenYears(inputs, opportunityCost);

  return {
    annualEmployerMatch: Math.round(annualEmployerMatch),
    effectiveMatchRate: Math.round(effectiveMatchRate * 100) / 100,
    vestingPercentage: Math.round(vestingPercentage * 100) / 100,
    vestedMatchAmount: Math.round(vestedMatchAmount),
    unvestedMatchAmount: Math.round(unvestedMatchAmount),
    yearsToFullVesting: Math.round(yearsToFullVesting * 10) / 10,
    totalProjectedMatch: Math.round(totalProjectedMatch),
    totalVestedMatch: Math.round(totalVestedMatch),
    matchGrowthValue: Math.round(matchGrowthValue),
    taxSavings: Math.round(taxSavings),
    totalTaxSavings: Math.round(totalTaxSavings),
    matchROI: Math.round(matchROI * 100) / 100,
    matchValueRatio: Math.round(matchValueRatio * 100) / 100,
    alternativeValue: Math.round(alternativeValue),
    opportunityCost: Math.round(opportunityCost),
    stayRecommendation,
    vestingRisk: Math.round(vestingRisk),
    matchQuality: Math.round(matchQuality),
    retentionValue: Math.round(retentionValue),
    monthlyMatch: Math.round(monthlyMatch),
    matchEfficiency: Math.round(matchEfficiency * 100) / 100,
    compensationBoost: Math.round(compensationBoost * 100) / 100,
    retirementImpact: Math.round(retirementImpact),
    breakEvenYears: Math.round(breakEvenYears * 10) / 10
  };
}

function calculateVestingPercentage(vestingSchedule: string, yearsOfService: number): number {
  switch (vestingSchedule) {
    case 'immediate':
      return 100;
    case 'cliff-1':
      return yearsOfService >= 1 ? 100 : 0;
    case 'cliff-3':
      return yearsOfService >= 3 ? 100 : 0;
    case 'cliff-5':
      return yearsOfService >= 5 ? 100 : 0;
    case 'graded-3':
      if (yearsOfService >= 3) return 100;
      if (yearsOfService >= 2) return 66;
      if (yearsOfService >= 1) return 33;
      return 0;
    case 'graded-5':
      if (yearsOfService >= 5) return 100;
      if (yearsOfService >= 4) return 80;
      if (yearsOfService >= 3) return 60;
      if (yearsOfService >= 2) return 40;
      if (yearsOfService >= 1) return 20;
      return 0;
    case 'graded-6':
      if (yearsOfService >= 6) return 100;
      if (yearsOfService >= 5) return 83;
      if (yearsOfService >= 4) return 67;
      if (yearsOfService >= 3) return 50;
      if (yearsOfService >= 2) return 33;
      if (yearsOfService >= 1) return 17;
      return 0;
    default:
      return 0;
  }
}

function calculateYearsToFullVesting(vestingSchedule: string, yearsOfService: number): number {
  const fullVestingYears = {
    'immediate': 0,
    'cliff-1': 1,
    'cliff-3': 3,
    'cliff-5': 5,
    'graded-3': 3,
    'graded-5': 5,
    'graded-6': 6
  };

  const requiredYears = fullVestingYears[vestingSchedule as keyof typeof fullVestingYears] || 0;
  return Math.max(0, requiredYears - yearsOfService);
}

function calculateTotalProjectedMatch(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    salaryGrowthRate
  } = inputs;

  let totalMatch = 0;
  let currentSalaryValue = currentSalary as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    const effectiveMatchRate = Math.min(employeeContribution as number, employerMatchLimit as number);
    const annualMatch = currentSalaryValue * ((effectiveMatchRate * (employerMatch as number)) / 100);
    totalMatch += annualMatch;
    
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
  }

  return totalMatch;
}

function calculateTotalVestedMatch(inputs: CalculatorInputs): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    employerMatch,
    employerMatchLimit,
    matchVestingSchedule,
    yearsOfService,
    salaryGrowthRate
  } = inputs;

  let totalVestedMatch = 0;
  let currentSalaryValue = currentSalary as number;
  let currentYearsOfService = yearsOfService as number;

  for (let year = 0; year < (retirementAge as number) - (currentAge as number); year++) {
    const effectiveMatchRate = Math.min(employeeContribution as number, employerMatchLimit as number);
    const annualMatch = currentSalaryValue * ((effectiveMatchRate * (employerMatch as number)) / 100);
    
    const vestingPercentage = calculateVestingPercentage(matchVestingSchedule as string, currentYearsOfService);
    const vestedMatch = annualMatch * (vestingPercentage / 100);
    
    totalVestedMatch += vestedMatch;
    
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    currentYearsOfService += 1;
  }

  return totalVestedMatch;
}

function calculateMatchGrowthValue(inputs: CalculatorInputs, totalVestedMatch: number): number {
  const {
    currentAge,
    retirementAge,
    investmentReturn
  } = inputs;

  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  const averageYearsInvested = yearsToRetirement / 2; // Average time invested
  
  return totalVestedMatch * Math.pow(1 + ((investmentReturn as number) / 100), averageYearsInvested);
}

function calculateTotalTaxSavings(inputs: CalculatorInputs, totalVestedMatch: number): number {
  const {
    currentAge,
    retirementAge,
    taxRate
  } = inputs;

  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  const averageTaxRate = taxRate as number;
  
  return totalVestedMatch * (averageTaxRate / 100);
}

function calculateMatchROI(inputs: CalculatorInputs, totalVestedMatch: number): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    employeeContribution,
    investmentReturn
  } = inputs;

  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  const totalEmployeeContribution = (currentSalary as number) * ((employeeContribution as number) / 100) * yearsToRetirement;
  
  if (totalEmployeeContribution === 0) return 0;
  
  return (totalVestedMatch / totalEmployeeContribution) * 100;
}

function calculateAlternativeValue(inputs: CalculatorInputs, totalVestedMatch: number): number {
  const {
    currentAge,
    retirementAge,
    alternativeInvestmentReturn
  } = inputs;

  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  const averageYearsInvested = yearsToRetirement / 2;
  
  return totalVestedMatch * Math.pow(1 + ((alternativeInvestmentReturn as number) / 100), averageYearsInvested);
}

function calculateOpportunityCost(inputs: CalculatorInputs, unvestedMatchAmount: number): number {
  const {
    currentAge,
    retirementAge,
    investmentReturn
  } = inputs;

  const yearsToRetirement = (retirementAge as number) - (currentAge as number);
  
  return unvestedMatchAmount * Math.pow(1 + ((investmentReturn as number) / 100), yearsToRetirement);
}

function generateStayRecommendation(inputs: CalculatorInputs, opportunityCost: number, yearsToFullVesting: number): string {
  const {
    planToStay,
    companyStability,
    jobSatisfaction,
    marketConditions,
    yearsOfService
  } = inputs;

  if (yearsToFullVesting <= 0) {
    return "You are fully vested. No additional vesting benefits to gain.";
  }

  if (opportunityCost < 10000) {
    return "Low opportunity cost. Consider leaving if better opportunities arise.";
  }

  if (opportunityCost > 50000) {
    return "High opportunity cost. Strongly consider staying until fully vested.";
  }

  // Factor in other considerations
  let recommendation = "";
  
  if (planToStay as boolean) {
    recommendation += "You plan to stay - good decision given the vesting timeline. ";
  } else {
    recommendation += "Consider the significant value you would lose by leaving early. ";
  }

  if (companyStability === 'very-risky' || companyStability === 'risky') {
    recommendation += "Company stability is a concern - factor this into your decision. ";
  }

  if (jobSatisfaction === 'very-low' || jobSatisfaction === 'low') {
    recommendation += "Low job satisfaction - weigh this against the financial benefits. ";
  }

  if (marketConditions === 'excellent' || marketConditions === 'good') {
    recommendation += "Good market conditions - you may have other opportunities. ";
  }

  return recommendation || "Moderate opportunity cost. Consider your personal circumstances and career goals.";
}

function calculateVestingRisk(inputs: CalculatorInputs, unvestedMatchAmount: number, yearsToFullVesting: number): number {
  const {
    companyStability,
    jobSatisfaction,
    marketConditions,
    yearsOfService
  } = inputs;

  let riskScore = 50; // Base risk

  // Company stability factor
  const stabilityRisk = {
    'very-stable': 10,
    'stable': 20,
    'moderate': 40,
    'risky': 70,
    'very-risky': 90
  };
  riskScore += stabilityRisk[companyStability as keyof typeof stabilityRisk] || 50;

  // Job satisfaction factor
  const satisfactionRisk = {
    'very-high': -20,
    'high': -10,
    'moderate': 0,
    'low': 20,
    'very-low': 40
  };
  riskScore += satisfactionRisk[jobSatisfaction as keyof typeof satisfactionRisk] || 0;

  // Market conditions factor
  const marketRisk = {
    'excellent': 30,
    'good': 20,
    'moderate': 0,
    'poor': -10,
    'very-poor': -20
  };
  riskScore += marketRisk[marketConditions as keyof typeof marketRisk] || 0;

  // Years to vesting factor
  if (yearsToFullVesting > 3) riskScore += 20;
  else if (yearsToFullVesting > 1) riskScore += 10;

  // Unvested amount factor
  if (unvestedMatchAmount > 50000) riskScore += 20;
  else if (unvestedMatchAmount > 20000) riskScore += 10;

  return Math.max(0, Math.min(100, riskScore));
}

function calculateMatchQuality(inputs: CalculatorInputs): number {
  const {
    employerMatch,
    employerMatchLimit,
    matchVestingSchedule,
    yearsOfService
  } = inputs;

  let qualityScore = 50; // Base score

  // Match percentage scoring
  if ((employerMatch as number) >= 6) qualityScore += 25;
  else if ((employerMatch as number) >= 4) qualityScore += 15;
  else if ((employerMatch as number) >= 2) qualityScore += 5;
  else if ((employerMatch as number) === 0) qualityScore -= 30;

  // Vesting schedule scoring
  const vestingQuality = {
    'immediate': 25,
    'cliff-1': 20,
    'graded-3': 15,
    'cliff-3': 10,
    'graded-5': 5,
    'cliff-5': 0,
    'graded-6': -5
  };
  qualityScore += vestingQuality[matchVestingSchedule as keyof typeof vestingQuality] || 0;

  // Current vesting status
  const currentVesting = calculateVestingPercentage(matchVestingSchedule as string, yearsOfService as number);
  if (currentVesting === 100) qualityScore += 10;
  else if (currentVesting >= 50) qualityScore += 5;

  return Math.max(0, Math.min(100, qualityScore));
}

function calculateRetentionValue(inputs: CalculatorInputs, opportunityCost: number, yearsToFullVesting: number): number {
  if (yearsToFullVesting <= 0) return 0;

  const {
    currentSalary,
    salaryGrowthRate
  } = inputs;

  // Calculate the value of staying until vested
  const futureSalary = (currentSalary as number) * Math.pow(1 + ((salaryGrowthRate as number) / 100), yearsToFullVesting);
  const salaryValue = futureSalary * yearsToFullVesting;
  
  return opportunityCost + salaryValue;
}

function calculateRetirementImpact(inputs: CalculatorInputs, matchGrowthValue: number): number {
  const {
    retirementTaxRate
  } = inputs;

  // Use 4% rule for retirement income
  const annualRetirementIncome = matchGrowthValue * 0.04;
  const afterTaxIncome = annualRetirementIncome * (1 - ((retirementTaxRate as number) / 100));
  
  return afterTaxIncome;
}

function calculateBreakEvenYears(inputs: CalculatorInputs, opportunityCost: number): number {
  const {
    currentSalary,
    salaryGrowthRate,
    alternativeInvestmentReturn
  } = inputs;

  if (opportunityCost <= 0) return 0;

  // Calculate how many years of salary growth it would take to break even
  let years = 0;
  let cumulativeSalary = 0;
  let currentSalaryValue = currentSalary as number;

  while (cumulativeSalary < opportunityCost && years < 50) {
    cumulativeSalary += currentSalaryValue * ((salaryGrowthRate as number) / 100);
    currentSalaryValue *= (1 + ((salaryGrowthRate as number) / 100));
    years++;
  }

  return years;
}

export function generate401kCompanyMatchROIAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const currentAge = inputs.currentAge as number;
  const retirementAge = inputs.retirementAge as number;
  const yearsToRetirement = retirementAge - currentAge;
  const vestingPercentage = outputs.vestingPercentage;
  const matchQuality = outputs.matchQuality;
  const vestingRisk = outputs.vestingRisk;

  return `# 401(k) Company Match ROI Analysis

## Summary
- **Current Age**: ${currentAge} years
- **Retirement Age**: ${retirementAge} years
- **Years to Retirement**: ${yearsToRetirement} years
- **Current Vesting**: ${vestingPercentage}%
- **Match Quality Score**: ${matchQuality}/100
- **Vesting Risk Score**: ${vestingRisk}/100

## Current Employer Match
- **Annual Employer Match**: $${outputs.annualEmployerMatch.toLocaleString()}
- **Monthly Match**: $${outputs.monthlyMatch.toLocaleString()}
- **Effective Match Rate**: ${outputs.effectiveMatchRate}%
- **Match Efficiency**: ${outputs.matchEfficiency}%
- **Compensation Boost**: ${outputs.compensationBoost}%

## Vesting Status
- **Current Vesting**: ${outputs.vestingPercentage}%
- **Vested Amount**: $${outputs.vestedMatchAmount.toLocaleString()}
- **Unvested Amount**: $${outputs.unvestedMatchAmount.toLocaleString()}
- **Years to Full Vesting**: ${outputs.yearsToFullVesting} years
- **Opportunity Cost**: $${outputs.opportunityCost.toLocaleString()}

## Long-term Projections
- **Total Projected Match**: $${outputs.totalProjectedMatch.toLocaleString()}
- **Total Vested Match**: $${outputs.totalVestedMatch.toLocaleString()}
- **Match Growth Value**: $${outputs.matchGrowthValue.toLocaleString()}
- **Retirement Impact**: $${outputs.retirementImpact.toLocaleString()}/year

## Financial Analysis
- **Match ROI**: ${outputs.matchROI}%
- **Match Value Ratio**: ${outputs.matchValueRatio}%
- **Alternative Investment Value**: $${outputs.alternativeValue.toLocaleString()}
- **Retention Value**: $${outputs.retentionValue.toLocaleString()}
- **Break-even Years**: ${outputs.breakEvenYears} years

## Tax Benefits
- **Annual Tax Savings**: $${outputs.taxSavings.toLocaleString()}
- **Total Tax Savings**: $${outputs.totalTaxSavings.toLocaleString()}

## Assessment Scores
- **Match Quality**: ${outputs.matchQuality}/100
- **Vesting Risk**: ${outputs.vestingRisk}/100

## Key Insights
${vestingPercentage >= 100 ? '✅ **Fully Vested**: You are fully vested in your employer match' : ''}
${vestingPercentage >= 50 && vestingPercentage < 100 ? '⚠️ **Partially Vested**: You are partially vested - consider staying until fully vested' : ''}
${vestingPercentage < 50 ? '❌ **Low Vesting**: You have low vesting - significant value at risk if you leave' : ''}

${outputs.matchQuality >= 80 ? '✅ **Excellent Match**: Your employer offers a high-quality matching program' : ''}
${outputs.matchQuality >= 60 && outputs.matchQuality < 80 ? '⚠️ **Good Match**: Your employer offers a reasonable matching program' : ''}
${outputs.matchQuality < 60 ? '❌ **Poor Match**: Your employer match could be improved' : ''}

${outputs.vestingRisk >= 70 ? '⚠️ **High Risk**: Significant risk of losing unvested match if you leave' : ''}
${outputs.vestingRisk >= 40 && outputs.vestingRisk < 70 ? '⚠️ **Moderate Risk**: Some risk of losing unvested match' : ''}
${outputs.vestingRisk < 40 ? '✅ **Low Risk**: Low risk of losing unvested match' : ''}

## Stay Recommendation
**${outputs.stayRecommendation}**

## Recommendations
${outputs.yearsToFullVesting > 0 ? `- **Consider Staying**: ${outputs.yearsToFullVesting} years to full vesting - significant value at stake` : ''}
${outputs.opportunityCost > 50000 ? '- **High Opportunity Cost**: Consider the significant financial impact of leaving early' : ''}
${outputs.matchEfficiency < 100 ? '- **Maximize Match**: Consider increasing your contribution to receive the full employer match' : ''}
${outputs.vestingRisk >= 70 ? '- **Risk Mitigation**: Consider your company stability and job satisfaction in your decision' : ''}
${outputs.breakEvenYears > 5 ? '- **Long Break-even**: It would take many years to break even if you leave early' : ''}

This analysis provides a comprehensive view of your employer match benefits and the financial implications of your vesting decisions.`;
}
