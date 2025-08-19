export interface MortgageInsuranceInputs {
  loanAmount: number;
  propertyValue: number;
  downPayment: number;
  loanType: string;
  creditScore?: number;
  occupancyType: string;
  loanTerm: string;
  pmiRate?: number;
  mipRate?: number;
  fundingFee?: number;
  guaranteeFee?: number;
}

export interface InsuranceBreakdown {
  year: number;
  remainingBalance: number;
  annualCost: number;
  monthlyCost: number;
  cumulativeCost: number;
  canCancel: boolean;
}

export interface MortgageInsuranceOutputs {
  loanToValueRatio: number;
  insuranceRequired: boolean;
  insuranceType: string;
  annualInsuranceCost: number;
  monthlyInsuranceCost: number;
  totalInsuranceCost: number;
  cancellationDate: string;
  equityNeededToCancel: number;
  insuranceBreakdown: InsuranceBreakdown[];
  costComparison: {
    withInsurance: number;
    withoutInsurance: number;
    savings: number;
  };
}

/**
 * Calculate mortgage insurance costs based on loan type and LTV ratio
 */
export function calculateMortgageInsurance(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs {
  const {
    loanAmount,
    propertyValue,
    downPayment,
    loanType,
    creditScore = 720,
    occupancyType,
    loanTerm,
    pmiRate = 0.5,
    mipRate = 0.85,
    fundingFee = 2.3,
    guaranteeFee = 1.0
  } = inputs;

  // Calculate LTV ratio
  const ltvRatio = (loanAmount / propertyValue) * 100;
  
  // Determine insurance requirements and costs
  let insuranceRequired = false;
  let insuranceType = 'None';
  let annualInsuranceCost = 0;
  let monthlyInsuranceCost = 0;
  let totalInsuranceCost = 0;
  let cancellationDate = '';
  let equityNeededToCancel = 0;

  switch (loanType) {
    case 'conventional':
      if (ltvRatio > 80) {
        insuranceRequired = true;
        insuranceType = 'PMI';
        annualInsuranceCost = calculatePMICost(loanAmount, ltvRatio, creditScore, pmiRate);
        monthlyInsuranceCost = annualInsuranceCost / 12;
        totalInsuranceCost = calculateTotalPMICost(loanAmount, ltvRatio, creditScore, pmiRate, parseInt(loanTerm));
        cancellationDate = calculatePMICancellationDate(loanAmount, propertyValue, ltvRatio);
        equityNeededToCancel = calculateEquityNeededToCancel(loanAmount, propertyValue);
      }
      break;

    case 'fha':
      insuranceRequired = true;
      insuranceType = 'MIP';
      annualInsuranceCost = calculateMIPCost(loanAmount, ltvRatio, mipRate);
      monthlyInsuranceCost = annualInsuranceCost / 12;
      totalInsuranceCost = calculateTotalMIPCost(loanAmount, ltvRatio, mipRate, parseInt(loanTerm));
      cancellationDate = calculateMIPCancellationDate(loanAmount, propertyValue, ltvRatio);
      equityNeededToCancel = calculateEquityNeededToCancel(loanAmount, propertyValue);
      break;

    case 'va':
      insuranceRequired = true;
      insuranceType = 'VA Funding Fee';
      annualInsuranceCost = calculateVAFundingFee(loanAmount, fundingFee);
      monthlyInsuranceCost = 0; // VA funding fee is one-time
      totalInsuranceCost = annualInsuranceCost;
      cancellationDate = 'N/A - One-time fee';
      equityNeededToCancel = 0;
      break;

    case 'usda':
      insuranceRequired = true;
      insuranceType = 'USDA Guarantee Fee';
      annualInsuranceCost = calculateUSDAGuaranteeFee(loanAmount, guaranteeFee);
      monthlyInsuranceCost = annualInsuranceCost / 12;
      totalInsuranceCost = calculateTotalUSDACost(loanAmount, guaranteeFee, parseInt(loanTerm));
      cancellationDate = 'N/A - Required for life of loan';
      equityNeededToCancel = 0;
      break;
  }

  // Generate insurance breakdown
  const insuranceBreakdown = generateInsuranceBreakdown(inputs, insuranceType, annualInsuranceCost);

  // Calculate cost comparison
  const costComparison = {
    withInsurance: loanAmount + totalInsuranceCost,
    withoutInsurance: loanAmount,
    savings: totalInsuranceCost
  };

  return {
    loanToValueRatio: ltvRatio,
    insuranceRequired,
    insuranceType,
    annualInsuranceCost,
    monthlyInsuranceCost,
    totalInsuranceCost,
    cancellationDate,
    equityNeededToCancel,
    insuranceBreakdown,
    costComparison
  };
}

/**
 * Calculate LTV ratio and determine insurance requirements
 */
export function calculateLTVAndInsurance(inputs: MortgageInsuranceInputs): {
  ltvRatio: number;
  insuranceRequired: boolean;
  insuranceType: string;
  downPaymentPercent: number;
} {
  const { loanAmount, propertyValue, downPayment, loanType } = inputs;
  
  const ltvRatio = (loanAmount / propertyValue) * 100;
  const downPaymentPercent = (downPayment / propertyValue) * 100;
  
  let insuranceRequired = false;
  let insuranceType = 'None';

  switch (loanType) {
    case 'conventional':
      if (ltvRatio > 80) {
        insuranceRequired = true;
        insuranceType = 'PMI';
      }
      break;
    case 'fha':
      insuranceRequired = true;
      insuranceType = 'MIP';
      break;
    case 'va':
      insuranceRequired = true;
      insuranceType = 'VA Funding Fee';
      break;
    case 'usda':
      insuranceRequired = true;
      insuranceType = 'USDA Guarantee Fee';
      break;
  }

  return {
    ltvRatio,
    insuranceRequired,
    insuranceType,
    downPaymentPercent
  };
}

/**
 * Analyze insurance cancellation options and costs saved
 */
export function analyzeInsuranceCancellation(inputs: MortgageInsuranceInputs): {
  canCancel: boolean;
  cancellationDate: string;
  equityNeeded: number;
  costsSaved: number;
  yearsToCancel: number;
} {
  const { loanAmount, propertyValue, loanType, ltvRatio } = calculateLTVAndInsurance(inputs);
  
  let canCancel = false;
  let cancellationDate = '';
  let equityNeeded = 0;
  let costsSaved = 0;
  let yearsToCancel = 0;

  if (loanType === 'conventional' && ltvRatio > 80) {
    canCancel = true;
    equityNeeded = (loanAmount * 0.2) - (propertyValue - loanAmount);
    cancellationDate = calculatePMICancellationDate(loanAmount, propertyValue, ltvRatio);
    
    // Estimate costs saved (simplified calculation)
    const annualPMI = calculatePMICost(loanAmount, ltvRatio, 720, 0.5);
    const yearsRemaining = Math.max(0, 30 - yearsToCancel);
    costsSaved = annualPMI * yearsRemaining;
  }

  return {
    canCancel,
    cancellationDate,
    equityNeeded,
    costsSaved,
    yearsToCancel
  };
}

/**
 * Calculate PMI cost based on LTV ratio and credit score
 */
function calculatePMICost(loanAmount: number, ltvRatio: number, creditScore: number, pmiRate: number): number {
  // Base PMI rate based on LTV ratio
  let baseRate = pmiRate;
  
  // Adjust for credit score
  if (creditScore >= 760) {
    baseRate *= 0.8;
  } else if (creditScore >= 720) {
    baseRate *= 1.0;
  } else if (creditScore >= 680) {
    baseRate *= 1.2;
  } else if (creditScore >= 640) {
    baseRate *= 1.5;
  } else {
    baseRate *= 2.0;
  }

  return (loanAmount * baseRate) / 100;
}

/**
 * Calculate total PMI cost over loan term
 */
function calculateTotalPMICost(loanAmount: number, ltvRatio: number, creditScore: number, pmiRate: number, loanTerm: number): number {
  const annualPMI = calculatePMICost(loanAmount, ltvRatio, creditScore, pmiRate);
  
  // PMI typically cancels when LTV reaches 78% (about 11 years for 30-year loan)
  const yearsWithPMI = Math.min(loanTerm, 11);
  
  return annualPMI * yearsWithPMI;
}

/**
 * Calculate MIP cost for FHA loans
 */
function calculateMIPCost(loanAmount: number, ltvRatio: number, mipRate: number): number {
  return (loanAmount * mipRate) / 100;
}

/**
 * Calculate total MIP cost over loan term
 */
function calculateTotalMIPCost(loanAmount: number, ltvRatio: number, mipRate: number, loanTerm: number): number {
  const annualMIP = calculateMIPCost(loanAmount, ltvRatio, mipRate);
  
  // MIP is required for life of loan for LTV > 90%, or 11 years for LTV ≤ 90%
  const yearsWithMIP = ltvRatio > 90 ? loanTerm : Math.min(loanTerm, 11);
  
  return annualMIP * yearsWithMIP;
}

/**
 * Calculate VA funding fee
 */
function calculateVAFundingFee(loanAmount: number, fundingFee: number): number {
  return (loanAmount * fundingFee) / 100;
}

/**
 * Calculate USDA guarantee fee
 */
function calculateUSDAGuaranteeFee(loanAmount: number, guaranteeFee: number): number {
  return (loanAmount * guaranteeFee) / 100;
}

/**
 * Calculate total USDA cost over loan term
 */
function calculateTotalUSDACost(loanAmount: number, guaranteeFee: number, loanTerm: number): number {
  const annualFee = calculateUSDAGuaranteeFee(loanAmount, guaranteeFee);
  return annualFee * loanTerm;
}

/**
 * Calculate when PMI can be cancelled
 */
function calculatePMICancellationDate(loanAmount: number, propertyValue: number, ltvRatio: number): string {
  if (ltvRatio <= 80) {
    return 'Immediate - LTV ≤ 80%';
  }

  // Estimate years to reach 80% LTV (simplified calculation)
  const yearsTo80 = Math.ceil((ltvRatio - 80) / 2); // Rough estimate
  const currentDate = new Date();
  const cancellationDate = new Date(currentDate.getFullYear() + yearsTo80, currentDate.getMonth(), currentDate.getDate());
  
  return cancellationDate.toLocaleDateString('en-US');
}

/**
 * Calculate when MIP can be cancelled
 */
function calculateMIPCancellationDate(loanAmount: number, propertyValue: number, ltvRatio: number): string {
  if (ltvRatio <= 90) {
    return '11 years from loan origination';
  } else {
    return 'Life of loan - LTV > 90%';
  }
}

/**
 * Calculate additional equity needed to cancel insurance
 */
function calculateEquityNeededToCancel(loanAmount: number, propertyValue: number): number {
  const currentEquity = propertyValue - loanAmount;
  const requiredEquity = propertyValue * 0.2; // 20% equity needed
  return Math.max(0, requiredEquity - currentEquity);
}

/**
 * Generate year-by-year insurance breakdown
 */
function generateInsuranceBreakdown(
  inputs: MortgageInsuranceInputs,
  insuranceType: string,
  annualCost: number
): InsuranceBreakdown[] {
  const { loanAmount, propertyValue, loanTerm } = inputs;
  const termYears = parseInt(loanTerm);
  const breakdown: InsuranceBreakdown[] = [];

  let remainingBalance = loanAmount;
  let cumulativeCost = 0;

  for (let year = 1; year <= termYears; year++) {
    // Calculate remaining balance (simplified)
    const monthlyPayment = calculateMonthlyPayment(loanAmount, 4.5, termYears);
    const annualPrincipal = (monthlyPayment * 12) - (remainingBalance * 0.045);
    remainingBalance = Math.max(0, remainingBalance - annualPrincipal);

    // Determine if insurance can be cancelled
    const currentLTV = (remainingBalance / propertyValue) * 100;
    const canCancel = insuranceType === 'PMI' && currentLTV <= 80;

    // Calculate insurance cost for this year
    let yearCost = 0;
    if (!canCancel && insuranceType !== 'VA Funding Fee') {
      yearCost = annualCost;
    }

    cumulativeCost += yearCost;

    breakdown.push({
      year,
      remainingBalance,
      annualCost: yearCost,
      monthlyCost: yearCost / 12,
      cumulativeCost,
      canCancel
    });
  }

  return breakdown;
}

/**
 * Calculate monthly mortgage payment (helper function)
 */
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Get PMI rate based on LTV and credit score
 */
export function getPMIRate(ltvRatio: number, creditScore: number): number {
  let baseRate = 0.5;

  // Adjust for LTV ratio
  if (ltvRatio > 95) {
    baseRate += 0.2;
  } else if (ltvRatio > 90) {
    baseRate += 0.1;
  }

  // Adjust for credit score
  if (creditScore < 640) {
    baseRate += 0.5;
  } else if (creditScore < 680) {
    baseRate += 0.3;
  } else if (creditScore < 720) {
    baseRate += 0.1;
  }

  return Math.min(baseRate, 2.0);
}

/**
 * Get MIP rate based on LTV and loan term
 */
export function getMIPRate(ltvRatio: number, loanTerm: string): number {
  if (loanTerm === '15') {
    return ltvRatio > 90 ? 0.7 : 0.45;
  } else {
    return ltvRatio > 90 ? 1.15 : 0.85;
  }
}

/**
 * Get VA funding fee based on down payment and service type
 */
export function getVAFundingFee(downPayment: number, propertyValue: number, isFirstTime: boolean = true): number {
  const downPaymentPercent = (downPayment / propertyValue) * 100;
  
  if (downPaymentPercent >= 10) {
    return isFirstTime ? 1.4 : 1.65;
  } else if (downPaymentPercent >= 5) {
    return isFirstTime ? 1.65 : 1.9;
  } else {
    return isFirstTime ? 2.3 : 2.55;
  }
}

/**
 * Generate recommendations for reducing insurance costs
 */
export function generateInsuranceRecommendations(inputs: MortgageInsuranceInputs): string[] {
  const recommendations: string[] = [];
  const { loanAmount, propertyValue, downPayment, loanType, creditScore = 720 } = inputs;
  
  const ltvRatio = (loanAmount / propertyValue) * 100;
  const downPaymentPercent = (downPayment / propertyValue) * 100;

  if (ltvRatio > 80) {
    recommendations.push('Consider increasing your down payment to 20% to avoid PMI.');
  }

  if (creditScore < 720) {
    recommendations.push('Improving your credit score can reduce PMI rates.');
  }

  if (loanType === 'fha' && ltvRatio > 90) {
    recommendations.push('FHA loans with LTV > 90% require MIP for the life of the loan.');
  }

  if (loanType === 'conventional' && downPaymentPercent < 10) {
    recommendations.push('Conventional loans with less than 10% down payment may have higher PMI rates.');
  }

  return recommendations;
}