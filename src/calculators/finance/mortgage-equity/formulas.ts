import { MortgageEquityInputs } from './validation';

export interface EquityResult {
  totalEquity: number;
  equityPercentage: number;
  availableEquity: number;
  availableEquityPercentage: number;
  loanToValueRatio: number;
  combinedLTVRatio: number;
  equityGrowth: EquityGrowth;
  helocOptions: HELOCOptions;
  homeEquityLoanOptions: HomeEquityLoanOptions;
  cashOutRefinanceOptions: CashOutRefinanceOptions;
  equityUtilization: EquityUtilization;
  riskAssessment: RiskAssessment;
  recommendations: string;
  keyMetrics: KeyMetrics;
}

export interface EquityGrowth {
  currentEquity: number;
  projectedEquity: { year: number; equity: number; appreciation: number; principalReduction: number }[];
  totalGrowth: number;
  annualGrowthRate: number;
  yearsToTargetEquity: number;
}

export interface HELOCOptions {
  maxCreditLimit: number;
  typicalCreditLimit: number;
  interestRate: number;
  monthlyPayment: number;
  drawPeriod: number;
  repaymentPeriod: number;
  fees: number;
  requirements: string[];
}

export interface HomeEquityLoanOptions {
  maxLoanAmount: number;
  typicalLoanAmount: number;
  interestRate: number;
  monthlyPayment: number;
  loanTerm: number;
  fees: number;
  requirements: string[];
}

export interface CashOutRefinanceOptions {
  maxCashOut: number;
  newLoanAmount: number;
  newInterestRate: number;
  newMonthlyPayment: number;
  closingCosts: number;
  breakEvenMonths: number;
  requirements: string[];
}

export interface EquityUtilization {
  bestOption: string;
  comparison: EquityUtilizationComparison[];
  prosAndCons: { option: string; pros: string[]; cons: string[] }[];
}

export interface EquityUtilizationComparison {
  option: string;
  maxAmount: number;
  interestRate: number;
  monthlyPayment: number;
  fees: number;
  flexibility: string;
  risk: string;
}

export interface RiskAssessment {
  overallRisk: string;
  riskFactors: RiskFactor[];
  riskScore: number;
  recommendations: string[];
}

export interface RiskFactor {
  factor: string;
  risk: string;
  impact: string;
  mitigation: string;
}

export interface KeyMetrics {
  equityGrowthRate: number;
  propertyAppreciation: number;
  principalReduction: number;
  totalDebt: number;
  debtToEquityRatio: number;
  equityUtilizationRatio: number;
  marketPosition: string;
}

export const calculateMortgageEquity = (inputs: MortgageEquityInputs): EquityResult => {
  const {
    propertyValue,
    currentMortgageBalance,
    existingHELOC = 0,
    existingHomeEquityLoan = 0,
    otherLiens = 0,
    appreciationRate = 3,
    timeHorizon = 5,
    creditScore = 750,
    debtToIncomeRatio = 35,
    income = 80000,
    interestRate = 4.5,
    monthlyPayment = 1596,
    loanTerm = 30
  } = inputs;

  // Calculate basic equity metrics
  const totalDebt = currentMortgageBalance + existingHELOC + existingHomeEquityLoan + otherLiens;
  const totalEquity = propertyValue - totalDebt;
  const equityPercentage = (totalEquity / propertyValue) * 100;
  const loanToValueRatio = (currentMortgageBalance / propertyValue) * 100;
  const combinedLTVRatio = (totalDebt / propertyValue) * 100;

  // Calculate available equity (typically 80-85% of total equity)
  const availableEquity = totalEquity * 0.85;
  const availableEquityPercentage = (availableEquity / propertyValue) * 100;

  // Calculate equity growth projection
  const equityGrowth = calculateEquityGrowth(inputs, totalEquity, timeHorizon);

  // Calculate HELOC options
  const helocOptions = calculateHELOCOptions(inputs, availableEquity);

  // Calculate home equity loan options
  const homeEquityLoanOptions = calculateHomeEquityLoanOptions(inputs, availableEquity);

  // Calculate cash-out refinance options
  const cashOutRefinanceOptions = calculateCashOutRefinanceOptions(inputs, availableEquity);

  // Analyze equity utilization options
  const equityUtilization = analyzeEquityUtilization(helocOptions, homeEquityLoanOptions, cashOutRefinanceOptions);

  // Assess risks
  const riskAssessment = assessRisks(inputs, totalEquity, combinedLTVRatio);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, totalEquity, equityUtilization, riskAssessment);

  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, totalEquity, totalDebt, equityGrowth);

  return {
    totalEquity: Math.round(totalEquity * 100) / 100,
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    availableEquity: Math.round(availableEquity * 100) / 100,
    availableEquityPercentage: Math.round(availableEquityPercentage * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    combinedLTVRatio: Math.round(combinedLTVRatio * 100) / 100,
    equityGrowth,
    helocOptions,
    homeEquityLoanOptions,
    cashOutRefinanceOptions,
    equityUtilization,
    riskAssessment,
    recommendations,
    keyMetrics
  };
};

const calculateEquityGrowth = (inputs: MortgageEquityInputs, currentEquity: number, timeHorizon: number): EquityGrowth => {
  const { propertyValue, appreciationRate = 3, interestRate = 4.5, monthlyPayment = 1596, loanTerm = 30 } = inputs;
  
  const projectedEquity: { year: number; equity: number; appreciation: number; principalReduction: number }[] = [];
  let currentPropertyValue = propertyValue;
  let currentEquityValue = currentEquity;
  let totalGrowth = 0;

  for (let year = 1; year <= timeHorizon; year++) {
    // Calculate property appreciation
    const appreciation = currentPropertyValue * (appreciationRate / 100);
    currentPropertyValue += appreciation;

    // Calculate principal reduction (simplified)
    const annualPayment = monthlyPayment * 12;
    const annualInterest = currentPropertyValue * (interestRate / 100);
    const principalReduction = annualPayment - annualInterest;

    // Update equity
    currentEquityValue += appreciation + principalReduction;
    totalGrowth += appreciation + principalReduction;

    projectedEquity.push({
      year,
      equity: Math.round(currentEquityValue * 100) / 100,
      appreciation: Math.round(appreciation * 100) / 100,
      principalReduction: Math.round(principalReduction * 100) / 100
    });
  }

  const annualGrowthRate = (totalGrowth / currentEquity) / timeHorizon * 100;
  const yearsToTargetEquity = calculateYearsToTargetEquity(currentEquity, totalGrowth, timeHorizon);

  return {
    currentEquity: Math.round(currentEquity * 100) / 100,
    projectedEquity,
    totalGrowth: Math.round(totalGrowth * 100) / 100,
    annualGrowthRate: Math.round(annualGrowthRate * 100) / 100,
    yearsToTargetEquity: Math.round(yearsToTargetEquity * 100) / 100
  };
};

const calculateYearsToTargetEquity = (currentEquity: number, totalGrowth: number, timeHorizon: number): number => {
  const targetEquity = currentEquity * 2; // Double the equity
  const annualGrowth = totalGrowth / timeHorizon;
  
  if (annualGrowth <= 0) return 999; // Never reach target
  
  return (targetEquity - currentEquity) / annualGrowth;
};

const calculateHELOCOptions = (inputs: MortgageEquityInputs, availableEquity: number): HELOCOptions => {
  const { creditScore = 750, debtToIncomeRatio = 35, propertyValue } = inputs;
  
  // Calculate credit limit based on equity and credit score
  let maxCreditLimit = availableEquity;
  let typicalCreditLimit = availableEquity * 0.8;
  
  // Adjust based on credit score
  if (creditScore < 650) {
    maxCreditLimit *= 0.7;
    typicalCreditLimit *= 0.6;
  } else if (creditScore < 700) {
    maxCreditLimit *= 0.8;
    typicalCreditLimit *= 0.7;
  } else if (creditScore >= 750) {
    maxCreditLimit *= 1.1;
    typicalCreditLimit *= 1.0;
  }

  // Calculate interest rate based on credit score and LTV
  let interestRate = 5.5; // Base rate
  if (creditScore >= 750) interestRate -= 1.0;
  else if (creditScore >= 700) interestRate -= 0.5;
  else if (creditScore < 650) interestRate += 2.0;

  const monthlyPayment = (typicalCreditLimit * (interestRate / 100)) / 12;
  const fees = Math.max(typicalCreditLimit * 0.01, 500); // 1% or $500 minimum

  const requirements = [
    'Credit score typically 680+',
    'Debt-to-income ratio under 43%',
    'Property must be owner-occupied',
    'Sufficient equity (typically 15-20% remaining)',
    'Stable income and employment'
  ];

  return {
    maxCreditLimit: Math.round(maxCreditLimit * 100) / 100,
    typicalCreditLimit: Math.round(typicalCreditLimit * 100) / 100,
    interestRate: Math.round(interestRate * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    drawPeriod: 10,
    repaymentPeriod: 20,
    fees: Math.round(fees * 100) / 100,
    requirements
  };
};

const calculateHomeEquityLoanOptions = (inputs: MortgageEquityInputs, availableEquity: number): HomeEquityLoanOptions => {
  const { creditScore = 750, debtToIncomeRatio = 35 } = inputs;
  
  let maxLoanAmount = availableEquity * 0.9;
  let typicalLoanAmount = availableEquity * 0.7;
  
  // Adjust based on credit score
  if (creditScore < 650) {
    maxLoanAmount *= 0.6;
    typicalLoanAmount *= 0.5;
  } else if (creditScore < 700) {
    maxLoanAmount *= 0.8;
    typicalLoanAmount *= 0.7;
  }

  // Calculate interest rate
  let interestRate = 6.0; // Base rate
  if (creditScore >= 750) interestRate -= 1.5;
  else if (creditScore >= 700) interestRate -= 0.8;
  else if (creditScore < 650) interestRate += 2.5;

  const loanTerm = 15;
  const monthlyPayment = calculateMonthlyPayment(typicalLoanAmount, interestRate, loanTerm);
  const fees = Math.max(typicalLoanAmount * 0.02, 1000); // 2% or $1000 minimum

  const requirements = [
    'Credit score typically 700+',
    'Debt-to-income ratio under 40%',
    'Property must be owner-occupied',
    'Sufficient equity (typically 20% remaining)',
    'Stable income and employment history'
  ];

  return {
    maxLoanAmount: Math.round(maxLoanAmount * 100) / 100,
    typicalLoanAmount: Math.round(typicalLoanAmount * 100) / 100,
    interestRate: Math.round(interestRate * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    loanTerm,
    fees: Math.round(fees * 100) / 100,
    requirements
  };
};

const calculateCashOutRefinanceOptions = (inputs: MortgageEquityInputs, availableEquity: number): CashOutRefinanceOptions => {
  const { currentMortgageBalance, interestRate = 4.5, creditScore = 750, propertyValue } = inputs;
  
  const maxCashOut = availableEquity * 0.8;
  const newLoanAmount = currentMortgageBalance + maxCashOut;
  const newInterestRate = Math.max(interestRate - 0.5, 3.5); // Assume slightly better rate
  
  const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount, newInterestRate, 30);
  const closingCosts = newLoanAmount * 0.03; // 3% of new loan amount
  
  const monthlySavings = (currentMortgageBalance * (interestRate / 100) / 12) - (newLoanAmount * (newInterestRate / 100) / 12);
  const breakEvenMonths = closingCosts / monthlySavings;

  const requirements = [
    'Credit score typically 720+',
    'Debt-to-income ratio under 43%',
    'Property must be owner-occupied',
    'Sufficient equity (typically 20% remaining)',
    'Current mortgage rate higher than new rates'
  ];

  return {
    maxCashOut: Math.round(maxCashOut * 100) / 100,
    newLoanAmount: Math.round(newLoanAmount * 100) / 100,
    newInterestRate: Math.round(newInterestRate * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    closingCosts: Math.round(closingCosts * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
    requirements
  };
};

const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                 (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return payment;
};

const analyzeEquityUtilization = (heloc: HELOCOptions, homeEquityLoan: HomeEquityLoanOptions, cashOut: CashOutRefinanceOptions): EquityUtilization => {
  const comparison: EquityUtilizationComparison[] = [
    {
      option: 'HELOC',
      maxAmount: heloc.typicalCreditLimit,
      interestRate: heloc.interestRate,
      monthlyPayment: heloc.monthlyPayment,
      fees: heloc.fees,
      flexibility: 'High - Draw as needed',
      risk: 'Variable rate, potential payment shock'
    },
    {
      option: 'Home Equity Loan',
      maxAmount: homeEquityLoan.typicalLoanAmount,
      interestRate: homeEquityLoan.interestRate,
      monthlyPayment: homeEquityLoan.monthlyPayment,
      fees: homeEquityLoan.fees,
      flexibility: 'Low - Fixed amount',
      risk: 'Fixed rate, predictable payments'
    },
    {
      option: 'Cash-Out Refinance',
      maxAmount: cashOut.maxCashOut,
      interestRate: cashOut.newInterestRate,
      monthlyPayment: cashOut.newMonthlyPayment,
      fees: cashOut.closingCosts,
      flexibility: 'Medium - One-time cash out',
      risk: 'Resets mortgage term, higher total cost'
    }
  ];

  // Determine best option based on criteria
  let bestOption = 'HELOC';
  if (cashOut.breakEvenMonths < 24 && cashOut.newInterestRate < heloc.interestRate) {
    bestOption = 'Cash-Out Refinance';
  } else if (homeEquityLoan.interestRate < heloc.interestRate && homeEquityLoan.fees < heloc.fees) {
    bestOption = 'Home Equity Loan';
  }

  const prosAndCons = [
    {
      option: 'HELOC',
      pros: ['Flexible borrowing', 'Pay interest only on amount used', 'Lower upfront costs', 'Revolving credit'],
      cons: ['Variable interest rate', 'Potential payment shock', 'Risk of overspending', 'May have annual fees']
    },
    {
      option: 'Home Equity Loan',
      pros: ['Fixed interest rate', 'Predictable payments', 'Lower interest rates than HELOC', 'No draw period'],
      cons: ['Fixed amount only', 'Higher upfront costs', 'Immediate full payment', 'Less flexibility']
    },
    {
      option: 'Cash-Out Refinance',
      pros: ['Lower interest rates', 'Consolidate debt', 'Single payment', 'Potential monthly savings'],
      cons: ['Higher closing costs', 'Resets mortgage term', 'May increase total interest', 'One-time option']
    }
  ];

  return {
    bestOption,
    comparison,
    prosAndCons
  };
};

const assessRisks = (inputs: MortgageEquityInputs, totalEquity: number, combinedLTV: number): RiskAssessment => {
  const riskFactors: RiskFactor[] = [];
  let riskScore = 0;

  // Assess LTV risk
  if (combinedLTV > 90) {
    riskFactors.push({
      factor: 'High Combined LTV',
      risk: 'High',
      impact: 'Limited borrowing capacity, higher rates',
      mitigation: 'Reduce debt or increase property value'
    });
    riskScore += 30;
  } else if (combinedLTV > 80) {
    riskFactors.push({
      factor: 'Moderate Combined LTV',
      risk: 'Medium',
      impact: 'Limited equity access, potential PMI',
      mitigation: 'Monitor LTV and consider principal payments'
    });
    riskScore += 15;
  }

  // Assess market risk
  if (inputs.marketCondition === 'Declining' || inputs.marketCondition === 'Volatile') {
    riskFactors.push({
      factor: 'Market Conditions',
      risk: 'High',
      impact: 'Property value may decrease, equity erosion',
      mitigation: 'Monitor market trends, consider timing'
    });
    riskScore += 25;
  }

  // Assess income risk
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 43) {
    riskFactors.push({
      factor: 'High Debt-to-Income Ratio',
      risk: 'High',
      impact: 'Limited borrowing capacity, higher rates',
      mitigation: 'Reduce existing debt, increase income'
    });
    riskScore += 20;
  }

  // Assess credit risk
  if (inputs.creditScore && inputs.creditScore < 650) {
    riskFactors.push({
      factor: 'Low Credit Score',
      risk: 'High',
      impact: 'Higher interest rates, limited options',
      mitigation: 'Improve credit score before borrowing'
    });
    riskScore += 25;
  }

  // Determine overall risk
  let overallRisk = 'Low';
  if (riskScore >= 60) overallRisk = 'High';
  else if (riskScore >= 30) overallRisk = 'Medium';

  const recommendations = [
    'Monitor property value and market conditions',
    'Maintain good credit score',
    'Keep debt-to-income ratio under 43%',
    'Consider principal payments to build equity',
    'Shop around for best rates and terms'
  ];

  return {
    overallRisk,
    riskFactors,
    riskScore,
    recommendations
  };
};

const generateRecommendations = (inputs: MortgageEquityInputs, totalEquity: number, equityUtilization: EquityUtilization, riskAssessment: RiskAssessment): string => {
  let recommendations = '';

  if (totalEquity < 50000) {
    recommendations += 'Your equity is limited. Consider building equity through:\n';
    recommendations += '• Making additional principal payments\n';
    recommendations += '• Home improvements that add value\n';
    recommendations += '• Waiting for property appreciation\n\n';
  } else if (totalEquity > 200000) {
    recommendations += 'You have substantial equity. Consider:\n';
    recommendations += '• HELOC for flexible access to funds\n';
    recommendations += '• Home equity loan for large expenses\n';
    recommendations += '• Cash-out refinance if rates are favorable\n\n';
  } else {
    recommendations += 'You have moderate equity. Consider:\n';
    recommendations += '• HELOC for emergency funds\n';
    recommendations += '• Home improvements to increase value\n';
    recommendations += '• Monitoring market conditions\n\n';
  }

  recommendations += `Based on your situation, the ${equityUtilization.bestOption} appears to be the best option.\n\n`;

  if (riskAssessment.overallRisk === 'High') {
    recommendations += '⚠️ HIGH RISK: Consider the following before proceeding:\n';
    recommendations += '• Improve your credit score\n';
    recommendations += '• Reduce existing debt\n';
    recommendations += '• Wait for better market conditions\n';
    recommendations += '• Consult with a financial advisor\n\n';
  } else if (riskAssessment.overallRisk === 'Medium') {
    recommendations += '⚠️ MODERATE RISK: Proceed with caution:\n';
    recommendations += '• Monitor your financial situation\n';
    recommendations += '• Consider smaller loan amounts\n';
    recommendations += '• Shop around for best terms\n\n';
  }

  recommendations += 'General Tips:\n';
  recommendations += '• Compare multiple lenders\n';
  recommendations += '• Understand all fees and terms\n';
  recommendations += '• Consider your long-term financial goals\n';
  recommendations += '• Have a plan for using the funds\n';
  recommendations += '• Maintain emergency savings\n';

  return recommendations;
};

const calculateKeyMetrics = (inputs: MortgageEquityInputs, totalEquity: number, totalDebt: number, equityGrowth: EquityGrowth): KeyMetrics => {
  const equityGrowthRate = equityGrowth.annualGrowthRate;
  const propertyAppreciation = inputs.appreciationRate || 3;
  const principalReduction = equityGrowth.totalGrowth - (inputs.propertyValue * (propertyAppreciation / 100) * (inputs.timeHorizon || 5));
  const debtToEquityRatio = (totalDebt / totalEquity) * 100;
  const equityUtilizationRatio = ((inputs.existingHELOC || 0) + (inputs.existingHomeEquityLoan || 0)) / totalEquity * 100;

  let marketPosition = 'Average';
  if (equityGrowthRate > 8) marketPosition = 'Excellent';
  else if (equityGrowthRate > 5) marketPosition = 'Good';
  else if (equityGrowthRate < 2) marketPosition = 'Poor';

  return {
    equityGrowthRate: Math.round(equityGrowthRate * 100) / 100,
    propertyAppreciation: Math.round(propertyAppreciation * 100) / 100,
    principalReduction: Math.round(principalReduction * 100) / 100,
    totalDebt: Math.round(totalDebt * 100) / 100,
    debtToEquityRatio: Math.round(debtToEquityRatio * 100) / 100,
    equityUtilizationRatio: Math.round(equityUtilizationRatio * 100) / 100,
    marketPosition
  };
};

export const generateMortgageEquityAnalysis = (inputs: MortgageEquityInputs, outputs: EquityResult): string => {
  const { totalEquity, equityPercentage, availableEquity, loanToValueRatio, combinedLTVRatio, equityGrowth, recommendations } = outputs;
  
  let analysis = `# Mortgage Equity Analysis\n\n`;
  
  analysis += `## Summary\n`;
  analysis += `- **Property Value:** $${inputs.propertyValue.toLocaleString()}\n`;
  analysis += `- **Current Mortgage Balance:** $${inputs.currentMortgageBalance.toLocaleString()}\n`;
  analysis += `- **Total Equity:** $${totalEquity.toLocaleString()}\n`;
  analysis += `- **Equity Percentage:** ${equityPercentage}%\n`;
  analysis += `- **Available Equity:** $${availableEquity.toLocaleString()}\n`;
  analysis += `- **LTV Ratio:** ${loanToValueRatio}%\n`;
  analysis += `- **Combined LTV:** ${combinedLTVRatio}%\n\n`;
  
  analysis += `## Equity Growth Projection\n\n`;
  analysis += `| Year | Equity | Appreciation | Principal Reduction |\n`;
  analysis += `|------|--------|--------------|-------------------|\n`;
  
  equityGrowth.projectedEquity.forEach(projection => {
    analysis += `| ${projection.year} | $${projection.equity.toLocaleString()} | $${projection.appreciation.toLocaleString()} | $${projection.principalReduction.toLocaleString()} |\n`;
  });
  
  analysis += `\n**Total Growth:** $${equityGrowth.totalGrowth.toLocaleString()}\n`;
  analysis += `**Annual Growth Rate:** ${equityGrowth.annualGrowthRate}%\n`;
  analysis += `**Years to Double Equity:** ${equityGrowth.yearsToTargetEquity}\n\n`;
  
  analysis += `## Borrowing Options\n\n`;
  analysis += `### HELOC Options\n`;
  analysis += `- **Max Credit Limit:** $${outputs.helocOptions.maxCreditLimit.toLocaleString()}\n`;
  analysis += `- **Typical Credit Limit:** $${outputs.helocOptions.typicalCreditLimit.toLocaleString()}\n`;
  analysis += `- **Interest Rate:** ${outputs.helocOptions.interestRate}%\n`;
  analysis += `- **Monthly Payment:** $${outputs.helocOptions.monthlyPayment.toLocaleString()}\n`;
  analysis += `- **Fees:** $${outputs.helocOptions.fees.toLocaleString()}\n\n`;
  
  analysis += `### Home Equity Loan Options\n`;
  analysis += `- **Max Loan Amount:** $${outputs.homeEquityLoanOptions.maxLoanAmount.toLocaleString()}\n`;
  analysis += `- **Typical Loan Amount:** $${outputs.homeEquityLoanOptions.typicalLoanAmount.toLocaleString()}\n`;
  analysis += `- **Interest Rate:** ${outputs.homeEquityLoanOptions.interestRate}%\n`;
  analysis += `- **Monthly Payment:** $${outputs.homeEquityLoanOptions.monthlyPayment.toLocaleString()}\n`;
  analysis += `- **Fees:** $${outputs.homeEquityLoanOptions.fees.toLocaleString()}\n\n`;
  
  analysis += `### Cash-Out Refinance Options\n`;
  analysis += `- **Max Cash Out:** $${outputs.cashOutRefinanceOptions.maxCashOut.toLocaleString()}\n`;
  analysis += `- **New Loan Amount:** $${outputs.cashOutRefinanceOptions.newLoanAmount.toLocaleString()}\n`;
  analysis += `- **New Interest Rate:** ${outputs.cashOutRefinanceOptions.newInterestRate}%\n`;
  analysis += `- **New Monthly Payment:** $${outputs.cashOutRefinanceOptions.newMonthlyPayment.toLocaleString()}\n`;
  analysis += `- **Closing Costs:** $${outputs.cashOutRefinanceOptions.closingCosts.toLocaleString()}\n`;
  analysis += `- **Break-Even Months:** ${outputs.cashOutRefinanceOptions.breakEvenMonths}\n\n`;
  
  analysis += `## Risk Assessment\n\n`;
  analysis += `**Overall Risk:** ${outputs.riskAssessment.overallRisk}\n`;
  analysis += `**Risk Score:** ${outputs.riskAssessment.riskScore}/100\n\n`;
  
  if (outputs.riskAssessment.riskFactors.length > 0) {
    analysis += `### Risk Factors\n\n`;
    outputs.riskAssessment.riskFactors.forEach(factor => {
      analysis += `- **${factor.factor}** (${factor.risk} risk): ${factor.impact}\n`;
      analysis += `  - Mitigation: ${factor.mitigation}\n\n`;
    });
  }
  
  analysis += `## Key Metrics\n\n`;
  analysis += `- **Equity Growth Rate:** ${outputs.keyMetrics.equityGrowthRate}%\n`;
  analysis += `- **Property Appreciation:** ${outputs.keyMetrics.propertyAppreciation}%\n`;
  analysis += `- **Principal Reduction:** $${outputs.keyMetrics.principalReduction.toLocaleString()}\n`;
  analysis += `- **Total Debt:** $${outputs.keyMetrics.totalDebt.toLocaleString()}\n`;
  analysis += `- **Debt-to-Equity Ratio:** ${outputs.keyMetrics.debtToEquityRatio}%\n`;
  analysis += `- **Equity Utilization:** ${outputs.keyMetrics.equityUtilizationRatio}%\n`;
  analysis += `- **Market Position:** ${outputs.keyMetrics.marketPosition}\n\n`;
  
  analysis += `## Recommendations\n\n`;
  analysis += recommendations;
  
  analysis += `## Additional Considerations\n\n`;
  analysis += `- **Market Timing:** Consider current interest rates and market conditions\n`;
  analysis += `- **Tax Implications:** Consult with a tax advisor about interest deductibility\n`;
  analysis += `- **Insurance:** Ensure adequate homeowners insurance coverage\n`;
  analysis += `- **Emergency Fund:** Maintain emergency savings before tapping equity\n`;
  analysis += `- **Long-term Goals:** Align equity utilization with your financial objectives\n`;
  
  return analysis;
};