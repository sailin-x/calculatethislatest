import { JumboLoanInputs, JumboLoanOutputs } from './types';

export function calculateJumboLoan(inputs: JumboLoanInputs): JumboLoanOutputs {
  // Calculate jumbo loan components
  const conformingPortion = Math.min(inputs.loanAmount, inputs.conformingLimit);
  const jumboPortion = Math.max(0, inputs.loanAmount - inputs.conformingLimit);
  const jumboPremiumCost = jumboPortion * inputs.jumboPremium;
  
  // Calculate blended rate
  const conformingRate = inputs.interestRate;
  const jumboRate = inputs.interestRate + inputs.jumboPremium;
  const blendedRate = (conformingPortion * conformingRate + jumboPortion * jumboRate) / inputs.loanAmount;
  
  // Calculate monthly payment
  const monthlyRate = blendedRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  const monthlyPayment = inputs.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate total costs
  const totalInterest = (monthlyPayment * totalPayments) - inputs.loanAmount;
  const totalPrincipal = inputs.loanAmount;
  const totalPayments = totalInterest + totalPrincipal;
  
  // Calculate additional monthly costs
  const monthlyPropertyTaxes = inputs.propertyTaxes / 12;
  const monthlyInsurance = inputs.homeownersInsurance / 12;
  const monthlyPMI = inputs.privateMortgageInsurance / 12;
  const monthlyHOA = inputs.hoaFees / 12;
  const monthlyOtherExpenses = inputs.otherMonthlyExpenses / 12;
  
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTaxes + 
                             monthlyInsurance + monthlyPMI + monthlyHOA + monthlyOtherExpenses;
  
  // Qualification analysis
  const qualificationStatus = analyzeQualification(inputs);
  const qualificationFactors = identifyQualificationFactors(inputs);
  const qualificationRecommendations = generateQualificationRecommendations(inputs);
  
  // Cost analysis
  const costPerThousand = (totalMonthlyPayment / inputs.loanAmount) * 1000;
  const effectiveRate = blendedRate;
  const breakEvenPoint = calculateBreakEvenPoint(inputs);
  
  // Comparison analysis
  const conformingLoanComparison = calculateConformingLoanComparison(inputs);
  
  // Risk assessment
  const riskFactors = identifyRiskFactors(inputs);
  const riskMitigationStrategies = generateRiskMitigationStrategies(inputs);
  const overallRiskScore = calculateOverallRiskScore(inputs);
  
  // Alternative options
  const alternativeOptions = calculateAlternativeOptions(inputs);
  
  // Refinancing analysis
  const refinancingAnalysis = calculateRefinancingAnalysis(inputs);
  
  // Tax implications
  const taxImplications = calculateTaxImplications(inputs, totalInterest);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, qualificationStatus, riskFactors);
  
  // Summary
  const summary = {
    totalLoanAmount: inputs.loanAmount,
    monthlyPayment: totalMonthlyPayment,
    totalLoanCost: totalPayments,
    keyBenefits: [
      'Higher loan amounts available',
      'Flexible qualification criteria',
      'Competitive rates for qualified borrowers',
      'No PMI required for high LTV loans'
    ],
    keyRisks: riskFactors.slice(0, 3),
    nextSteps: [
      'Gather required documentation',
      'Compare multiple lenders',
      'Consider alternative loan structures',
      'Evaluate refinancing opportunities'
    ]
  };
  
  return {
    monthlyPayment,
    annualPayment: totalMonthlyPayment * 12,
    totalPayments,
    totalInterest,
    totalPrincipal,
    conformingPortion,
    jumboPortion,
    jumboPremiumCost,
    blendedRate,
    qualificationStatus,
    qualificationFactors,
    qualificationRecommendations,
    totalLoanCost: totalPayments,
    costPerThousand,
    effectiveRate,
    breakEvenPoint,
    conformingLoanComparison,
    riskFactors,
    riskMitigationStrategies,
    overallRiskScore,
    alternativeOptions,
    refinancingAnalysis,
    taxImplications,
    recommendations,
    summary
  };
}

function analyzeQualification(inputs: JumboLoanInputs): 'qualified' | 'marginal' | 'not_qualified' {
  let score = 0;
  
  // Credit score analysis
  switch (inputs.creditScore) {
    case 'excellent': score += 30; break;
    case 'very_good': score += 25; break;
    case 'good': score += 20; break;
    case 'fair': score += 10; break;
    case 'poor': score += 0; break;
  }
  
  // Debt-to-income ratio analysis
  if (inputs.debtToIncomeRatio <= 0.35) score += 25;
  else if (inputs.debtToIncomeRatio <= 0.43) score += 20;
  else if (inputs.debtToIncomeRatio <= 0.50) score += 10;
  else score += 0;
  
  // Loan-to-value ratio analysis
  if (inputs.loanToValueRatio <= 0.80) score += 20;
  else if (inputs.loanToValueRatio <= 0.85) score += 15;
  else if (inputs.loanToValueRatio <= 0.90) score += 10;
  else score += 5;
  
  // Reserves analysis
  if (inputs.reserves >= 12) score += 15;
  else if (inputs.reserves >= 6) score += 10;
  else if (inputs.reserves >= 3) score += 5;
  else score += 0;
  
  // Employment analysis
  if (inputs.employmentType === 'w2' && inputs.employmentLength >= 2) score += 10;
  else if (inputs.employmentType === 'self_employed' && inputs.employmentLength >= 3) score += 8;
  else if (inputs.employmentType === 'business_owner' && inputs.employmentLength >= 3) score += 6;
  else score += 2;
  
  if (score >= 80) return 'qualified';
  if (score >= 60) return 'marginal';
  return 'not_qualified';
}

function identifyQualificationFactors(inputs: JumboLoanInputs): string[] {
  const factors: string[] = [];
  
  if (inputs.creditScore === 'excellent' || inputs.creditScore === 'very_good') {
    factors.push('Strong credit score');
  } else if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    factors.push('Credit score may limit options');
  }
  
  if (inputs.debtToIncomeRatio <= 0.35) {
    factors.push('Low debt-to-income ratio');
  } else if (inputs.debtToIncomeRatio > 0.43) {
    factors.push('High debt-to-income ratio');
  }
  
  if (inputs.loanToValueRatio <= 0.80) {
    factors.push('Low loan-to-value ratio');
  } else if (inputs.loanToValueRatio > 0.90) {
    factors.push('High loan-to-value ratio');
  }
  
  if (inputs.reserves >= 12) {
    factors.push('Strong reserve position');
  } else if (inputs.reserves < 6) {
    factors.push('Limited reserves');
  }
  
  if (inputs.employmentType === 'w2' && inputs.employmentLength >= 2) {
    factors.push('Stable employment history');
  } else if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    factors.push('Self-employed or business owner');
  }
  
  if (inputs.liquidAssets > inputs.loanAmount * 0.1) {
    factors.push('Strong liquid asset position');
  }
  
  return factors;
}

function generateQualificationRecommendations(inputs: JumboLoanInputs): string[] {
  const recommendations: string[] = [];
  
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    recommendations.push('Improve credit score before applying');
  }
  
  if (inputs.debtToIncomeRatio > 0.43) {
    recommendations.push('Reduce debt-to-income ratio');
  }
  
  if (inputs.loanToValueRatio > 0.90) {
    recommendations.push('Consider larger down payment');
  }
  
  if (inputs.reserves < 6) {
    recommendations.push('Build up cash reserves');
  }
  
  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    recommendations.push('Prepare detailed financial documentation');
  }
  
  recommendations.push('Gather all required documentation');
  recommendations.push('Consider working with a mortgage broker');
  
  return recommendations;
}

function calculateBreakEvenPoint(inputs: JumboLoanInputs): number {
  // Simplified break-even calculation
  const monthlySavings = inputs.jumboPremium * inputs.jumboPortion / 12;
  const closingCosts = inputs.loanAmount * 0.02; // 2% of loan amount
  return Math.ceil(closingCosts / monthlySavings);
}

function calculateConformingLoanComparison(inputs: JumboLoanInputs): {
  conformingPayment: number;
  jumboPayment: number;
  paymentDifference: number;
  totalCostDifference: number;
  breakEvenMonths: number;
} {
  const conformingAmount = Math.min(inputs.loanAmount, inputs.conformingLimit);
  const jumboAmount = Math.max(0, inputs.loanAmount - inputs.conformingLimit);
  
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  const conformingPayment = conformingAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const jumboRate = inputs.interestRate + inputs.jumboPremium;
  const jumboMonthlyRate = jumboRate / 12;
  const jumboPayment = jumboAmount * 
    (jumboMonthlyRate * Math.pow(1 + jumboMonthlyRate, totalPayments)) / 
    (Math.pow(1 + jumboMonthlyRate, totalPayments) - 1);
  
  const paymentDifference = jumboPayment - conformingPayment;
  const totalCostDifference = (jumboPayment - conformingPayment) * totalPayments;
  const breakEvenMonths = Math.ceil(totalCostDifference / paymentDifference);
  
  return {
    conformingPayment,
    jumboPayment,
    paymentDifference,
    totalCostDifference,
    breakEvenMonths
  };
}

function identifyRiskFactors(inputs: JumboLoanInputs): string[] {
  const factors: string[] = [];
  
  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    factors.push('Lower credit score');
  }
  
  if (inputs.debtToIncomeRatio > 0.43) {
    factors.push('High debt-to-income ratio');
  }
  
  if (inputs.loanToValueRatio > 0.90) {
    factors.push('High loan-to-value ratio');
  }
  
  if (inputs.reserves < 6) {
    factors.push('Limited cash reserves');
  }
  
  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    factors.push('Self-employed or business owner');
  }
  
  if (inputs.loanType === 'adjustable') {
    factors.push('Adjustable rate mortgage');
  }
  
  if (inputs.jumboPortion > inputs.loanAmount * 0.5) {
    factors.push('Large jumbo portion');
  }
  
  if (inputs.marketConditions === 'challenging') {
    factors.push('Challenging market conditions');
  }
  
  if (inputs.rateEnvironment === 'rising') {
    factors.push('Rising interest rate environment');
  }
  
  return factors;
}

function generateRiskMitigationStrategies(inputs: JumboLoanInputs): string[] {
  const strategies: string[] = [];
  
  strategies.push('Maintain strong credit score');
  strategies.push('Keep debt-to-income ratio low');
  strategies.push('Build adequate cash reserves');
  strategies.push('Consider fixed-rate option');
  
  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    strategies.push('Maintain consistent income documentation');
  }
  
  if (inputs.loanType === 'adjustable') {
    strategies.push('Consider rate caps and conversion options');
  }
  
  strategies.push('Monitor market conditions');
  strategies.push('Consider refinancing when rates improve');
  
  return strategies;
}

function calculateOverallRiskScore(inputs: JumboLoanInputs): number {
  let score = 50; // Base score
  
  // Credit score impact
  switch (inputs.creditScore) {
    case 'excellent': score -= 10; break;
    case 'very_good': score -= 5; break;
    case 'good': break;
    case 'fair': score += 10; break;
    case 'poor': score += 20; break;
  }
  
  // DTI impact
  if (inputs.debtToIncomeRatio > 0.43) score += 15;
  else if (inputs.debtToIncomeRatio > 0.35) score += 5;
  
  // LTV impact
  if (inputs.loanToValueRatio > 0.90) score += 15;
  else if (inputs.loanToValueRatio > 0.80) score += 5;
  
  // Reserves impact
  if (inputs.reserves < 6) score += 10;
  else if (inputs.reserves < 12) score += 5;
  
  // Employment impact
  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    score += 5;
  }
  
  // Market conditions impact
  if (inputs.marketConditions === 'challenging') score += 10;
  if (inputs.rateEnvironment === 'rising') score += 5;
  
  return Math.min(Math.max(score, 1), 100);
}

function calculateAlternativeOptions(inputs: JumboLoanInputs) {
  const conformingMax = inputs.conformingLimit;
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  const conformingPayment = conformingMax * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const conformingTotalCost = conformingPayment * totalPayments;
  
  // Piggyback loan (80/10/10 structure)
  const firstMortgage = inputs.loanAmount * 0.8;
  const secondMortgage = inputs.loanAmount * 0.1;
  const downPayment = inputs.loanAmount * 0.1;
  
  const firstPayment = firstMortgage * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const secondRate = inputs.interestRate + 0.02; // 2% higher for second mortgage
  const secondMonthlyRate = secondRate / 12;
  const secondPayment = secondMortgage * 
    (secondMonthlyRate * Math.pow(1 + secondMonthlyRate, totalPayments)) / 
    (Math.pow(1 + secondMonthlyRate, totalPayments) - 1);
  
  const combinedPayment = firstPayment + secondPayment;
  const combinedTotalCost = combinedPayment * totalPayments;
  
  return {
    conformingLoan: {
      maxAmount: conformingMax,
      payment: conformingPayment,
      totalCost: conformingTotalCost,
      pros: ['Lower interest rate', 'No jumbo premium', 'Standard qualification'],
      cons: ['Limited loan amount', 'May require larger down payment']
    },
    piggybackLoan: {
      firstMortgage,
      secondMortgage,
      combinedPayment,
      totalCost: combinedTotalCost,
      pros: ['Avoid jumbo premium', 'Lower first mortgage rate', 'No PMI'],
      cons: ['Higher second mortgage rate', 'Two loans to manage', 'Complex structure']
    },
    portfolioLoan: {
      payment: inputs.loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1),
      totalCost: inputs.loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1) * totalPayments,
      pros: ['Flexible qualification', 'No jumbo premium', 'Portfolio lender benefits'],
      cons: ['Higher interest rate', 'Limited availability', 'Less standardized']
    }
  };
}

function calculateRefinancingAnalysis(inputs: JumboLoanInputs): {
  shouldConsiderRefinancing: boolean;
  refinanceTriggers: string[];
  refinanceBenefits: string[];
  refinanceCosts: number;
} {
  const refinanceTriggers: string[] = [];
  const refinanceBenefits: string[] = [];
  
  if (inputs.rateEnvironment === 'low') {
    refinanceTriggers.push('Low interest rate environment');
    refinanceBenefits.push('Lower monthly payments');
  }
  
  if (inputs.creditScore === 'excellent' || inputs.creditScore === 'very_good') {
    refinanceTriggers.push('Improved credit score');
    refinanceBenefits.push('Better interest rate');
  }
  
  if (inputs.loanToValueRatio < 0.80) {
    refinanceTriggers.push('Improved loan-to-value ratio');
    refinanceBenefits.push('Eliminate PMI');
  }
  
  const refinanceCosts = inputs.loanAmount * 0.02; // 2% of loan amount
  
  return {
    shouldConsiderRefinancing: refinanceTriggers.length > 0,
    refinanceTriggers,
    refinanceBenefits,
    refinanceCosts
  };
}

function calculateTaxImplications(inputs: JumboLoanInputs, totalInterest: number): {
  annualInterestDeduction: number;
  estimatedTaxSavings: number;
  netAfterTaxCost: number;
  taxBenefitRatio: number;
} {
  const annualInterestDeduction = inputs.loanAmount * inputs.interestRate;
  
  // Assume 25% tax bracket
  const taxRate = 0.25;
  const estimatedTaxSavings = annualInterestDeduction * taxRate;
  
  const netAfterTaxCost = annualInterestDeduction - estimatedTaxSavings;
  const taxBenefitRatio = estimatedTaxSavings / annualInterestDeduction;
  
  return {
    annualInterestDeduction,
    estimatedTaxSavings,
    netAfterTaxCost,
    taxBenefitRatio
  };
}

function generateRecommendations(inputs: JumboLoanInputs, qualificationStatus: string, riskFactors: string[]): {
  loanSuitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable';
  keyRecommendations: string[];
  optimizationStrategies: string[];
  riskWarnings: string[];
} {
  let loanSuitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable' = 'suitable';
  
  if (qualificationStatus === 'not_qualified' || riskFactors.length > 5) {
    loanSuitability = 'not_suitable';
  } else if (qualificationStatus === 'marginal' || riskFactors.length > 3) {
    loanSuitability = 'marginal';
  } else if (qualificationStatus === 'qualified' && riskFactors.length <= 2) {
    loanSuitability = 'highly_suitable';
  }
  
  const keyRecommendations: string[] = [];
  const optimizationStrategies: string[] = [];
  const riskWarnings: string[] = [];
  
  if (qualificationStatus === 'qualified') {
    keyRecommendations.push('Strong qualification profile for jumbo loan');
  } else if (qualificationStatus === 'marginal') {
    keyRecommendations.push('Consider improving qualification factors');
  } else {
    keyRecommendations.push('Consider alternative loan structures');
  }
  
  if (inputs.jumboPortion > inputs.loanAmount * 0.5) {
    keyRecommendations.push('Large jumbo portion - consider piggyback loan');
  }
  
  optimizationStrategies.push('Compare multiple lenders');
  optimizationStrategies.push('Consider rate lock options');
  optimizationStrategies.push('Evaluate prepayment penalties');
  optimizationStrategies.push('Review loan features and options');
  
  if (riskFactors.length > 0) {
    riskWarnings.push('Monitor risk factors closely');
  }
  
  if (inputs.loanType === 'adjustable') {
    riskWarnings.push('Consider rate caps and conversion options');
  }
  
  return {
    loanSuitability,
    keyRecommendations,
    optimizationStrategies,
    riskWarnings
  };
}
