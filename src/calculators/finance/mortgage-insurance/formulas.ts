import { MortgageInsuranceInputs } from './validation';

export interface InsuranceResult {
  loanToValueRatio: number;
  insuranceRequired: boolean;
  insuranceType: string;
  annualInsuranceCost: number;
  monthlyInsuranceCost: number;
  upfrontInsuranceCost: number;
  totalInsuranceCost: number;
  cancellationAnalysis: CancellationAnalysis;
  refinanceAnalysis: RefinanceAnalysis;
  costComparison: CostComparison;
  savingsAnalysis: SavingsAnalysis;
  recommendations: string;
  keyMetrics: KeyMetrics;
  mortgageInsuranceAnalysis: string;
}

export interface CancellationAnalysis {
  canCancelNow: boolean;
  automaticCancellationDate: string | null;
  requestCancellationDate: string | null;
  yearsToAutomaticCancellation: number | null;
  yearsToRequestCancellation: number | null;
  remainingInsuranceCost: number;
  savingsFromCancellation: number;
  cancellationStrategy: string;
}

export interface RefinanceAnalysis {
  refinanceViable: boolean;
  newLoanAmount: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  totalSavings: number;
  refinanceRecommendation: string;
  refinanceCosts: RefinanceCosts;
}

export interface RefinanceCosts {
  closingCosts: number;
  appraisalCost: number;
  titleInsurance: number;
  otherCosts: number;
  totalCosts: number;
}

export interface CostComparison {
  currentInsuranceCost: number;
  alternativeOptions: InsuranceOption[];
  bestOption: string;
  potentialSavings: number;
}

export interface InsuranceOption {
  name: string;
  annualCost: number;
  upfrontCost: number;
  totalCost: number;
  pros: string[];
  cons: string[];
}

export interface SavingsAnalysis {
  totalInsuranceCost: number;
  potentialSavings: number;
  savingsBreakdown: SavingsBreakdown;
  roiAnalysis: ROIAnalysis;
}

export interface SavingsBreakdown {
  fromCancellation: number;
  fromRefinance: number;
  fromAdditionalPayments: number;
  fromPropertyAppreciation: number;
}

export interface ROIAnalysis {
  investmentAmount: number;
  returnAmount: number;
  roi: number;
  paybackPeriod: number;
}

export interface KeyMetrics {
  ltvRatio: number;
  insuranceBurden: number;
  cancellationTimeline: string;
  costEfficiency: string;
  riskAssessment: string;
}

export const calculateMortgageInsurance = (inputs: MortgageInsuranceInputs): InsuranceResult => {
  // Calculate LTV ratio
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  
  // Determine if insurance is required
  const insuranceRequired = determineInsuranceRequirement(inputs, ltvRatio);
  
  // Calculate insurance costs based on loan type
  const insuranceCosts = calculateInsuranceCosts(inputs, ltvRatio);
  
  // Analyze cancellation options
  const cancellationAnalysis = analyzeCancellation(inputs, ltvRatio, insuranceCosts);
  
  // Analyze refinancing options
  const refinanceAnalysis = analyzeRefinancing(inputs, ltvRatio, insuranceCosts);
  
  // Compare different insurance options
  const costComparison = compareInsuranceOptions(inputs, insuranceCosts);
  
  // Analyze potential savings
  const savingsAnalysis = analyzeSavings(inputs, insuranceCosts, cancellationAnalysis, refinanceAnalysis);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, ltvRatio, insuranceCosts, cancellationAnalysis, refinanceAnalysis);
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, ltvRatio, insuranceCosts, cancellationAnalysis);
  
  // Generate comprehensive analysis
  const mortgageInsuranceAnalysis = generateComprehensiveAnalysis(inputs, ltvRatio, insuranceCosts, cancellationAnalysis, refinanceAnalysis, savingsAnalysis);
  
  return {
    loanToValueRatio: ltvRatio,
    insuranceRequired,
    insuranceType: determineInsuranceType(inputs),
    annualInsuranceCost: insuranceCosts.annualCost,
    monthlyInsuranceCost: insuranceCosts.monthlyCost,
    upfrontInsuranceCost: insuranceCosts.upfrontCost,
    totalInsuranceCost: insuranceCosts.totalCost,
    cancellationAnalysis,
    refinanceAnalysis,
    costComparison,
    savingsAnalysis,
    recommendations,
    keyMetrics,
    mortgageInsuranceAnalysis
  };
};

const determineInsuranceRequirement = (inputs: MortgageInsuranceInputs, ltvRatio: number): boolean => {
  switch (inputs.loanType) {
    case 'Conventional':
      return ltvRatio > 80;
    case 'FHA':
      return true; // FHA always requires MIP
    case 'VA':
      return false; // VA doesn't require PMI but has funding fee
    case 'USDA':
      return true; // USDA requires guarantee fee
    case 'Jumbo':
      return ltvRatio > 80;
    default:
      return ltvRatio > 80;
  }
};

const determineInsuranceType = (inputs: MortgageInsuranceInputs): string => {
  switch (inputs.loanType) {
    case 'Conventional':
      return 'Private Mortgage Insurance (PMI)';
    case 'FHA':
      return 'FHA Mortgage Insurance Premium (MIP)';
    case 'VA':
      return 'VA Funding Fee';
    case 'USDA':
      return 'USDA Guarantee Fee';
    case 'Jumbo':
      return 'Private Mortgage Insurance (PMI)';
    default:
      return 'Private Mortgage Insurance (PMI)';
  }
};

const calculateInsuranceCosts = (inputs: MortgageInsuranceInputs, ltvRatio: number) => {
  let annualCost = 0;
  let upfrontCost = 0;
  let monthlyCost = 0;
  
  switch (inputs.loanType) {
    case 'Conventional':
      if (ltvRatio > 80) {
        const pmiRate = inputs.pmiRate || getDefaultPMIRate(ltvRatio, inputs.creditScore);
        annualCost = inputs.loanAmount * (pmiRate / 100);
        monthlyCost = annualCost / 12;
      }
      break;
      
    case 'FHA':
      const upfrontMIP = inputs.fhaUpfrontMIP || 1.75;
      const annualMIP = inputs.fhaAnnualMIP || 0.85;
      upfrontCost = inputs.loanAmount * (upfrontMIP / 100);
      annualCost = inputs.loanAmount * (annualMIP / 100);
      monthlyCost = annualCost / 12;
      break;
      
    case 'VA':
      const fundingFee = inputs.vaFundingFee || getVAFundingFee(ltvRatio, inputs.occupancyType);
      upfrontCost = inputs.loanAmount * (fundingFee / 100);
      break;
      
    case 'USDA':
      const guaranteeFee = inputs.usdaGuaranteeFee || 1.0;
      annualCost = inputs.loanAmount * (guaranteeFee / 100);
      monthlyCost = annualCost / 12;
      break;
      
    case 'Jumbo':
      if (ltvRatio > 80) {
        const pmiRate = (inputs.pmiRate || 0.5) * 1.5; // Higher rates for jumbo loans
        annualCost = inputs.loanAmount * (pmiRate / 100);
        monthlyCost = annualCost / 12;
      }
      break;
  }
  
  const loanTerm = inputs.loanTerm || 30;
  const totalCost = upfrontCost + (annualCost * loanTerm);
  
  return { annualCost, upfrontCost, monthlyCost, totalCost };
};

const getDefaultPMIRate = (ltvRatio: number, creditScore?: number): number => {
  let baseRate = 0.5;
  
  if (ltvRatio > 95) baseRate = 0.8;
  else if (ltvRatio > 90) baseRate = 0.6;
  else if (ltvRatio > 85) baseRate = 0.5;
  
  if (creditScore) {
    if (creditScore >= 760) baseRate *= 0.8;
    else if (creditScore >= 700) baseRate *= 1.0;
    else if (creditScore >= 650) baseRate *= 1.2;
    else baseRate *= 1.5;
  }
  
  return baseRate;
};

const getVAFundingFee = (ltvRatio: number, occupancyType?: string): number => {
  let baseRate = 2.3;
  
  if (ltvRatio <= 90) baseRate = 1.4;
  else if (ltvRatio <= 95) baseRate = 1.65;
  
  if (occupancyType === 'Investment') baseRate *= 1.5;
  
  return baseRate;
};

const analyzeCancellation = (inputs: MortgageInsuranceInputs, ltvRatio: number, insuranceCosts: any): CancellationAnalysis => {
  const cancellationThreshold = inputs.pmiCancellationThreshold || 78;
  const canCancelNow = ltvRatio <= cancellationThreshold;
  
  let yearsToAutomaticCancellation = null;
  let yearsToRequestCancellation = null;
  let automaticCancellationDate = null;
  let requestCancellationDate = null;
  
  if (!canCancelNow) {
    const monthlyPrincipalPayment = calculateMonthlyPrincipalPayment(inputs);
    const additionalPayment = inputs.additionalPrincipalPayment || 0;
    const totalMonthlyPrincipal = monthlyPrincipalPayment + additionalPayment;
    
    const principalToPay = inputs.loanAmount - (inputs.propertyValue * 0.78 / 100);
    yearsToAutomaticCancellation = principalToPay / (totalMonthlyPrincipal * 12);
    
    const principalToRequest = inputs.loanAmount - (inputs.propertyValue * 0.80 / 100);
    yearsToRequestCancellation = principalToRequest / (totalMonthlyPrincipal * 12);
    
    if (yearsToAutomaticCancellation > 0) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + Math.ceil(yearsToAutomaticCancellation));
      automaticCancellationDate = date.toISOString().split('T')[0];
    }
    
    if (yearsToRequestCancellation > 0) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + Math.ceil(yearsToRequestCancellation));
      requestCancellationDate = date.toISOString().split('T')[0];
    }
  }
  
  const remainingInsuranceCost = canCancelNow ? 0 : insuranceCosts.totalCost;
  const savingsFromCancellation = insuranceCosts.totalCost - remainingInsuranceCost;
  
  let cancellationStrategy = 'Insurance can be cancelled immediately';
  if (!canCancelNow) {
    if (yearsToRequestCancellation && yearsToRequestCancellation < 2) {
      cancellationStrategy = 'Request cancellation in ' + Math.ceil(yearsToRequestCancellation) + ' years';
    } else {
      cancellationStrategy = 'Automatic cancellation in ' + Math.ceil(yearsToAutomaticCancellation || 0) + ' years';
    }
  }
  
  return {
    canCancelNow,
    automaticCancellationDate,
    requestCancellationDate,
    yearsToAutomaticCancellation,
    yearsToRequestCancellation,
    remainingInsuranceCost,
    savingsFromCancellation,
    cancellationStrategy
  };
};

const calculateMonthlyPrincipalPayment = (inputs: MortgageInsuranceInputs): number => {
  if (!inputs.interestRate || !inputs.loanTerm) return 0;
  
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  const monthlyPayment = inputs.monthlyPayment || 
    (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const monthlyInterest = inputs.loanAmount * monthlyRate;
  return monthlyPayment - monthlyInterest;
};

const analyzeRefinancing = (inputs: MortgageInsuranceInputs, ltvRatio: number, insuranceCosts: any): RefinanceAnalysis => {
  if (!inputs.refinanceOption || inputs.refinanceOption === 'No Refinance') {
    return {
      refinanceViable: false,
      newLoanAmount: 0,
      newMonthlyPayment: 0,
      monthlySavings: 0,
      breakEvenMonths: 0,
      totalSavings: 0,
      refinanceRecommendation: 'Refinancing not considered',
      refinanceCosts: { closingCosts: 0, appraisalCost: 0, titleInsurance: 0, otherCosts: 0, totalCosts: 0 }
    };
  }
  
  const newLoanAmount = inputs.loanAmount;
  const refinanceRate = inputs.refinanceRate || inputs.interestRate || 4.0;
  const currentRate = inputs.interestRate || 4.5;
  
  const monthlyRate = refinanceRate / 100 / 12;
  const totalPayments = (inputs.loanTerm || 30) * 12;
  const newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const currentMonthlyPayment = inputs.monthlyPayment || 
    (inputs.loanAmount * (currentRate / 100 / 12) * Math.pow(1 + currentRate / 100 / 12, totalPayments)) / 
    (Math.pow(1 + currentRate / 100 / 12, totalPayments) - 1);
  
  const monthlySavings = (currentMonthlyPayment + insuranceCosts.monthlyCost) - newMonthlyPayment;
  const closingCosts = inputs.refinanceClosingCosts || 5000;
  const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : 0;
  
  const timeHorizon = inputs.timeHorizon || 5;
  const totalSavings = (monthlySavings * 12 * timeHorizon) - closingCosts;
  
  const refinanceCosts = {
    closingCosts: closingCosts * 0.6,
    appraisalCost: closingCosts * 0.1,
    titleInsurance: closingCosts * 0.2,
    otherCosts: closingCosts * 0.1,
    totalCosts: closingCosts
  };
  
  let refinanceRecommendation = 'Refinancing not recommended';
  if (breakEvenMonths < 24 && totalSavings > 0) {
    refinanceRecommendation = 'Refinancing recommended - break-even in ' + Math.ceil(breakEvenMonths) + ' months';
  } else if (totalSavings > 0) {
    refinanceRecommendation = 'Refinancing may be beneficial over ' + timeHorizon + ' years';
  }
  
  return {
    refinanceViable: totalSavings > 0,
    newLoanAmount,
    newMonthlyPayment,
    monthlySavings,
    breakEvenMonths,
    totalSavings,
    refinanceRecommendation,
    refinanceCosts
  };
};

const compareInsuranceOptions = (inputs: MortgageInsuranceInputs, currentCosts: any): CostComparison => {
  const alternatives: InsuranceOption[] = [];
  
  // Conventional with 20% down
  if (inputs.loanType !== 'Conventional') {
    const conventionalLoan = inputs.loanAmount * 0.8;
    const conventionalCosts = conventionalLoan * 0.005; // 0.5% PMI
    alternatives.push({
      name: 'Conventional with 20% down',
      annualCost: conventionalCosts,
      upfrontCost: 0,
      totalCost: conventionalCosts * (inputs.loanTerm || 30),
      pros: ['No PMI required', 'Lower interest rates', 'More flexible terms'],
      cons: ['Requires larger down payment', 'Higher upfront costs']
    });
  }
  
  // FHA alternative
  if (inputs.loanType !== 'FHA') {
    const fhaUpfront = inputs.loanAmount * 0.0175;
    const fhaAnnual = inputs.loanAmount * 0.0085;
    alternatives.push({
      name: 'FHA Loan',
      annualCost: fhaAnnual,
      upfrontCost: fhaUpfront,
      totalCost: fhaUpfront + (fhaAnnual * (inputs.loanTerm || 30)),
      pros: ['Lower credit requirements', 'Lower down payment', 'Government backing'],
      cons: ['Higher insurance costs', 'Lifetime MIP requirement', 'Property restrictions']
    });
  }
  
  // VA alternative
  if (inputs.loanType !== 'VA') {
    const vaFundingFee = inputs.loanAmount * 0.023;
    alternatives.push({
      name: 'VA Loan',
      annualCost: 0,
      upfrontCost: vaFundingFee,
      totalCost: vaFundingFee,
      pros: ['No PMI required', 'Lower interest rates', 'No down payment required'],
      cons: ['VA eligibility required', 'Funding fee required', 'Property restrictions']
    });
  }
  
  const bestOption = alternatives.length > 0 ? 
    alternatives.reduce((best, current) => current.totalCost < best.totalCost ? current : best).name :
    'Current option is best';
  
  const potentialSavings = alternatives.length > 0 ? 
    currentCosts.totalCost - Math.min(...alternatives.map(a => a.totalCost)) : 0;
  
  return {
    currentInsuranceCost: currentCosts.totalCost,
    alternativeOptions: alternatives,
    bestOption,
    potentialSavings
  };
};

const analyzeSavings = (inputs: MortgageInsuranceInputs, insuranceCosts: any, cancellationAnalysis: CancellationAnalysis, refinanceAnalysis: RefinanceAnalysis): SavingsAnalysis => {
  const totalInsuranceCost = insuranceCosts.totalCost;
  const savingsFromCancellation = cancellationAnalysis.savingsFromCancellation;
  const savingsFromRefinance = Math.max(0, refinanceAnalysis.totalSavings);
  
  const additionalPaymentSavings = calculateAdditionalPaymentSavings(inputs, insuranceCosts);
  const appreciationSavings = calculateAppreciationSavings(inputs, insuranceCosts);
  
  const potentialSavings = savingsFromCancellation + savingsFromRefinance + additionalPaymentSavings + appreciationSavings;
  
  const savingsBreakdown = {
    fromCancellation: savingsFromCancellation,
    fromRefinance: savingsFromRefinance,
    fromAdditionalPayments: additionalPaymentSavings,
    fromPropertyAppreciation: appreciationSavings
  };
  
  const investmentAmount = (inputs.additionalPrincipalPayment || 0) * 12 * (inputs.timeHorizon || 5);
  const returnAmount = potentialSavings;
  const roi = investmentAmount > 0 ? (returnAmount / investmentAmount) * 100 : 0;
  const paybackPeriod = investmentAmount > 0 ? investmentAmount / (potentialSavings / (inputs.timeHorizon || 5)) : 0;
  
  const roiAnalysis = {
    investmentAmount,
    returnAmount,
    roi,
    paybackPeriod
  };
  
  return {
    totalInsuranceCost,
    potentialSavings,
    savingsBreakdown,
    roiAnalysis
  };
};

const calculateAdditionalPaymentSavings = (inputs: MortgageInsuranceInputs, insuranceCosts: any): number => {
  if (!inputs.additionalPrincipalPayment) return 0;
  
  const additionalPayment = inputs.additionalPrincipalPayment;
  const timeHorizon = inputs.timeHorizon || 5;
  const monthlyPrincipal = calculateMonthlyPrincipalPayment(inputs);
  const totalMonthlyPrincipal = monthlyPrincipal + additionalPayment;
  
  // Estimate how much faster insurance would be cancelled
  const principalToPay = inputs.loanAmount - (inputs.propertyValue * 0.78 / 100);
  const yearsWithAdditional = principalToPay / (totalMonthlyPrincipal * 12);
  const yearsWithoutAdditional = principalToPay / (monthlyPrincipal * 12);
  
  const yearsSaved = Math.max(0, yearsWithoutAdditional - yearsWithAdditional);
  return insuranceCosts.annualCost * yearsSaved;
};

const calculateAppreciationSavings = (inputs: MortgageInsuranceInputs, insuranceCosts: any): number => {
  if (!inputs.propertyAppreciationRate) return 0;
  
  const appreciationRate = inputs.propertyAppreciationRate / 100;
  const timeHorizon = inputs.timeHorizon || 5;
  
  let savings = 0;
  let currentValue = inputs.propertyValue;
  let currentLTV = inputs.loanAmount / currentValue;
  
  for (let year = 1; year <= timeHorizon; year++) {
    currentValue *= (1 + appreciationRate);
    currentLTV = inputs.loanAmount / currentValue;
    
    if (currentLTV <= 0.78 && currentLTV > 0.78 / (1 + appreciationRate)) {
      // Insurance would be cancelled this year due to appreciation
      savings += insuranceCosts.annualCost * (timeHorizon - year + 1);
      break;
    }
  }
  
  return savings;
};

const generateRecommendations = (inputs: MortgageInsuranceInputs, ltvRatio: number, insuranceCosts: any, cancellationAnalysis: CancellationAnalysis, refinanceAnalysis: RefinanceAnalysis): string => {
  const recommendations: string[] = [];
  
  if (cancellationAnalysis.canCancelNow) {
    recommendations.push('Contact your lender immediately to cancel mortgage insurance.');
  } else if (cancellationAnalysis.yearsToRequestCancellation && cancellationAnalysis.yearsToRequestCancellation < 2) {
    recommendations.push('Consider making additional principal payments to reach 80% LTV for early cancellation.');
  }
  
  if (refinanceAnalysis.refinanceViable && refinanceAnalysis.breakEvenMonths < 24) {
    recommendations.push('Consider refinancing to remove insurance - break-even in ' + Math.ceil(refinanceAnalysis.breakEvenMonths) + ' months.');
  }
  
  if (inputs.additionalPrincipalPayment && inputs.additionalPrincipalPayment > 0) {
    recommendations.push('Continue making additional principal payments to accelerate insurance cancellation.');
  }
  
  if (ltvRatio > 90) {
    recommendations.push('Consider increasing your down payment to reduce insurance costs.');
  }
  
  if (inputs.loanType === 'FHA' && ltvRatio <= 90) {
    recommendations.push('Consider refinancing to a conventional loan to remove lifetime MIP requirement.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Your current mortgage insurance arrangement appears optimal for your situation.');
  }
  
  return recommendations.join(' ');
};

const calculateKeyMetrics = (inputs: MortgageInsuranceInputs, ltvRatio: number, insuranceCosts: any, cancellationAnalysis: CancellationAnalysis): KeyMetrics => {
  const insuranceBurden = (insuranceCosts.monthlyCost / (inputs.monthlyPayment || 1500)) * 100;
  
  let cancellationTimeline = 'Immediate';
  if (!cancellationAnalysis.canCancelNow) {
    if (cancellationAnalysis.yearsToRequestCancellation && cancellationAnalysis.yearsToRequestCancellation < 2) {
      cancellationTimeline = 'Within 2 years with additional payments';
    } else {
      cancellationTimeline = cancellationAnalysis.yearsToAutomaticCancellation ? 
        Math.ceil(cancellationAnalysis.yearsToAutomaticCancellation) + ' years' : 'Unknown';
    }
  }
  
  const costEfficiency = insuranceBurden < 5 ? 'Low' : insuranceBurden < 10 ? 'Moderate' : 'High';
  
  let riskAssessment = 'Low';
  if (ltvRatio > 95) riskAssessment = 'High';
  else if (ltvRatio > 90) riskAssessment = 'Moderate';
  
  return {
    ltvRatio,
    insuranceBurden,
    cancellationTimeline,
    costEfficiency,
    riskAssessment
  };
};

const generateComprehensiveAnalysis = (inputs: MortgageInsuranceInputs, ltvRatio: number, insuranceCosts: any, cancellationAnalysis: CancellationAnalysis, refinanceAnalysis: RefinanceAnalysis, savingsAnalysis: SavingsAnalysis): string => {
  let analysis = `# Mortgage Insurance Analysis Report\n\n`;
  
  analysis += `## Current Situation\n`;
  analysis += `- **Loan-to-Value Ratio:** ${ltvRatio.toFixed(1)}%\n`;
  analysis += `- **Insurance Required:** ${cancellationAnalysis.canCancelNow ? 'No' : 'Yes'}\n`;
  analysis += `- **Insurance Type:** ${determineInsuranceType(inputs)}\n`;
  analysis += `- **Monthly Insurance Cost:** $${insuranceCosts.monthlyCost.toFixed(2)}\n`;
  analysis += `- **Annual Insurance Cost:** $${insuranceCosts.annualCost.toFixed(2)}\n\n`;
  
  analysis += `## Cancellation Analysis\n`;
  analysis += `- **Can Cancel Now:** ${cancellationAnalysis.canCancelNow ? 'Yes' : 'No'}\n`;
  if (!cancellationAnalysis.canCancelNow) {
    if (cancellationAnalysis.yearsToRequestCancellation) {
      analysis += `- **Request Cancellation:** ${Math.ceil(cancellationAnalysis.yearsToRequestCancellation)} years\n`;
    }
    if (cancellationAnalysis.yearsToAutomaticCancellation) {
      analysis += `- **Automatic Cancellation:** ${Math.ceil(cancellationAnalysis.yearsToAutomaticCancellation)} years\n`;
    }
  }
  analysis += `- **Remaining Insurance Cost:** $${cancellationAnalysis.remainingInsuranceCost.toFixed(2)}\n`;
  analysis += `- **Savings from Cancellation:** $${cancellationAnalysis.savingsFromCancellation.toFixed(2)}\n\n`;
  
  if (refinanceAnalysis.refinanceViable) {
    analysis += `## Refinancing Analysis\n`;
    analysis += `- **Refinance Viable:** Yes\n`;
    analysis += `- **Monthly Savings:** $${refinanceAnalysis.monthlySavings.toFixed(2)}\n`;
    analysis += `- **Break-even Period:** ${Math.ceil(refinanceAnalysis.breakEvenMonths)} months\n`;
    analysis += `- **Total Savings:** $${refinanceAnalysis.totalSavings.toFixed(2)}\n\n`;
  }
  
  analysis += `## Cost Analysis\n`;
  analysis += `- **Total Insurance Cost:** $${insuranceCosts.totalCost.toFixed(2)}\n`;
  analysis += `- **Potential Savings:** $${savingsAnalysis.potentialSavings.toFixed(2)}\n`;
  analysis += `- **Insurance Burden:** ${((insuranceCosts.monthlyCost / (inputs.monthlyPayment || 1500)) * 100).toFixed(1)}% of monthly payment\n\n`;
  
  analysis += `## Recommendations\n`;
  analysis += `${generateRecommendations(inputs, ltvRatio, insuranceCosts, cancellationAnalysis, refinanceAnalysis)}\n\n`;
  
  analysis += `## Key Takeaways\n`;
  analysis += `1. **Current LTV:** ${ltvRatio.toFixed(1)}% - ${ltvRatio > 80 ? 'Insurance required' : 'No insurance needed'}\n`;
  analysis += `2. **Monthly Cost:** $${insuranceCosts.monthlyCost.toFixed(2)} per month\n`;
  analysis += `3. **Cancellation Timeline:** ${cancellationAnalysis.cancellationStrategy}\n`;
  analysis += `4. **Potential Savings:** $${savingsAnalysis.potentialSavings.toFixed(2)}\n`;
  
  return analysis;
};

export const generateMortgageInsuranceAnalysis = (inputs: MortgageInsuranceInputs, outputs: InsuranceResult): string => {
  return outputs.mortgageInsuranceAnalysis;
};