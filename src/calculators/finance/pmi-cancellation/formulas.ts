export interface PMICancellationInputs {
  originalLoanAmount: number;
  currentBalance: number;
  originalHomeValue: number;
  currentHomeValue: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  pmiRate: number;
  loanStartDate: string;
  paymentHistory: 'perfect' | 'good' | 'fair' | 'poor';
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  propertyType: 'primary' | 'secondary' | 'investment';
  appreciationRate?: number;
  additionalPayments?: number;
  lumpSumPayment?: number;
}

export interface PMICancellationOutputs {
  currentLTV: number;
  originalLTV: number;
  pmiCancellationDate: string;
  monthsToCancellation: number;
  currentPMI: number;
  annualPMISavings: number;
  totalPMISavings: number;
  newMonthlyPayment: number;
  equityGain: number;
  equityPercentage: number;
  cancellationMethod: string;
  requirements: string;
  analysis: string;
}

/**
 * Calculate PMI Cancellation
 */
export function calculatePMICancellation(inputs: PMICancellationInputs): PMICancellationOutputs {
  const {
    originalLoanAmount,
    currentBalance,
    originalHomeValue,
    currentHomeValue,
    downPayment,
    loanTerm,
    interestRate,
    monthlyPayment,
    pmiRate,
    loanStartDate,
    paymentHistory,
    loanType,
    propertyType,
    appreciationRate = 3.0,
    additionalPayments = 0,
    lumpSumPayment = 0
  } = inputs;

  // Calculate LTV ratios
  const currentLTV = (currentBalance / currentHomeValue) * 100;
  const originalLTV = (originalLoanAmount / originalHomeValue) * 100;

  // Calculate current PMI
  const currentPMI = (currentBalance * (pmiRate / 100)) / 12;

  // Calculate equity metrics
  const equityGain = currentHomeValue - originalHomeValue + downPayment;
  const equityPercentage = ((currentHomeValue - currentBalance) / currentHomeValue) * 100;

  // Determine PMI cancellation eligibility and timeline
  const cancellationInfo = determinePMICancellation(
    currentLTV,
    loanType,
    loanStartDate,
    paymentHistory,
    currentBalance,
    currentHomeValue,
    additionalPayments,
    lumpSumPayment,
    appreciationRate,
    interestRate,
    loanTerm
  );

  // Calculate savings
  const annualPMISavings = currentPMI * 12;
  const totalPMISavings = calculateTotalPMISavings(
    currentPMI,
    cancellationInfo.monthsToCancellation,
    loanTerm,
    currentBalance,
    interestRate
  );

  // Calculate new monthly payment
  const newMonthlyPayment = monthlyPayment - currentPMI;

  // Generate analysis
  const analysis = generateAnalysis(
    inputs,
    currentLTV,
    originalLTV,
    cancellationInfo,
    currentPMI,
    annualPMISavings,
    totalPMISavings,
    equityGain,
    equityPercentage
  );

  return {
    currentLTV,
    originalLTV,
    pmiCancellationDate: cancellationInfo.cancellationDate,
    monthsToCancellation: cancellationInfo.monthsToCancellation,
    currentPMI,
    annualPMISavings,
    totalPMISavings,
    newMonthlyPayment,
    equityGain,
    equityPercentage,
    cancellationMethod: cancellationInfo.method,
    requirements: cancellationInfo.requirements,
    analysis
  };
}

interface CancellationInfo {
  cancellationDate: string;
  monthsToCancellation: number;
  method: string;
  requirements: string;
}

/**
 * Determine PMI cancellation eligibility and timeline
 */
function determinePMICancellation(
  currentLTV: number,
  loanType: string,
  loanStartDate: string,
  paymentHistory: string,
  currentBalance: number,
  currentHomeValue: number,
  additionalPayments: number,
  lumpSumPayment: number,
  appreciationRate: number,
  interestRate: number,
  loanTerm: number
): CancellationInfo {
  const startDate = new Date(loanStartDate);
  const today = new Date();
  const monthsSinceStart = (today.getFullYear() - startDate.getFullYear()) * 12 + 
    (today.getMonth() - startDate.getMonth());

  // Apply lump sum payment
  let adjustedBalance = currentBalance - lumpSumPayment;
  let adjustedLTV = (adjustedBalance / currentHomeValue) * 100;

  // Calculate future balance with additional payments
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const remainingPayments = totalPayments - monthsSinceStart;

  // Calculate principal portion of current payment
  const monthlyPayment = calculateMonthlyPayment(adjustedBalance, monthlyInterestRate, remainingPayments);
  const principalPayment = monthlyPayment - (adjustedBalance * monthlyInterestRate);
  const totalMonthlyPrincipal = principalPayment + additionalPayments;

  // Calculate months to reach 80% LTV
  const targetBalance = currentHomeValue * 0.8;
  const monthsTo80LTV = calculateMonthsToTarget(adjustedBalance, targetBalance, totalMonthlyPrincipal, monthlyInterestRate);

  // Determine cancellation method based on loan type
  if (loanType === 'conventional') {
    return determineConventionalCancellation(
      adjustedLTV,
      monthsTo80LTV,
      monthsSinceStart,
      paymentHistory,
      startDate,
      additionalPayments,
      lumpSumPayment
    );
  } else if (loanType === 'fha') {
    return determineFHACancellation(
      adjustedLTV,
      monthsSinceStart,
      startDate,
      additionalPayments,
      lumpSumPayment
    );
  } else if (loanType === 'va') {
    return determineVACancellation(
      adjustedLTV,
      monthsTo80LTV,
      startDate,
      additionalPayments,
      lumpSumPayment
    );
  } else {
    // USDA loans
    return determineUSDACancellation(
      adjustedLTV,
      monthsTo80LTV,
      startDate,
      additionalPayments,
      lumpSumPayment
    );
  }
}

/**
 * Determine conventional loan PMI cancellation
 */
function determineConventionalCancellation(
  currentLTV: number,
  monthsTo80LTV: number,
  monthsSinceStart: number,
  paymentHistory: string,
  startDate: Date,
  additionalPayments: number,
  lumpSumPayment: number
): CancellationInfo {
  let method = '';
  let requirements = '';
  let monthsToCancellation = 0;

  // Check if already eligible
  if (currentLTV <= 80) {
    method = 'Immediate (80% LTV reached)';
    requirements = 'Loan-to-value ratio is 80% or less';
    monthsToCancellation = 0;
  } else {
    // Calculate when 80% LTV will be reached
    monthsToCancellation = Math.max(0, monthsTo80LTV);
    method = additionalPayments > 0 || lumpSumPayment > 0 ? 
      'Accelerated (Additional payments)' : 'Automatic (80% LTV)';
    requirements = 'Loan-to-value ratio must be 80% or less';
  }

  // Check payment history requirements
  if (paymentHistory === 'poor') {
    requirements += ' and good payment history required';
  }

  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsSinceStart + monthsToCancellation);

  return {
    cancellationDate: cancellationDate.toISOString().split('T')[0],
    monthsToCancellation,
    method,
    requirements
  };
}

/**
 * Determine FHA loan MIP cancellation
 */
function determineFHACancellation(
  currentLTV: number,
  monthsSinceStart: number,
  startDate: Date,
  additionalPayments: number,
  lumpSumPayment: number
): CancellationInfo {
  const yearsSinceStart = monthsSinceStart / 12;
  const requiredYears = 11; // FHA requires 11 years for MIP cancellation
  const requiredLTV = 78; // FHA requires 78% LTV

  let method = 'FHA 11-year rule';
  let requirements = 'FHA loans require 11 years of payments and 78% LTV';
  let monthsToCancellation = 0;

  if (yearsSinceStart >= requiredYears && currentLTV <= requiredLTV) {
    method = 'Immediate (FHA requirements met)';
    monthsToCancellation = 0;
  } else {
    const yearsToWait = Math.max(0, requiredYears - yearsSinceStart);
    monthsToCancellation = Math.ceil(yearsToWait * 12);
  }

  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsSinceStart + monthsToCancellation);

  return {
    cancellationDate: cancellationDate.toISOString().split('T')[0],
    monthsToCancellation,
    method,
    requirements
  };
}

/**
 * Determine VA loan funding fee cancellation
 */
function determineVACancellation(
  currentLTV: number,
  monthsTo80LTV: number,
  startDate: Date,
  additionalPayments: number,
  lumpSumPayment: number
): CancellationInfo {
  let method = 'VA loan (No PMI)';
  let requirements = 'VA loans do not require PMI';
  let monthsToCancellation = 0;

  // VA loans don't have PMI, but funding fee can be reduced with 10% down payment
  if (currentLTV <= 90) {
    method = 'VA loan (Reduced funding fee)';
    requirements = 'VA loans with 10% down payment have reduced funding fee';
  }

  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsTo80LTV);

  return {
    cancellationDate: cancellationDate.toISOString().split('T')[0],
    monthsToCancellation,
    method,
    requirements
  };
}

/**
 * Determine USDA loan guarantee fee cancellation
 */
function determineUSDACancellation(
  currentLTV: number,
  monthsTo80LTV: number,
  startDate: Date,
  additionalPayments: number,
  lumpSumPayment: number
): CancellationInfo {
  let method = 'USDA loan (Guarantee fee)';
  let requirements = 'USDA loans have annual guarantee fee instead of PMI';
  let monthsToCancellation = 0;

  // USDA loans have guarantee fees that can be reduced with higher equity
  if (currentLTV <= 80) {
    method = 'USDA loan (Reduced guarantee fee)';
    requirements = 'USDA loans with 20% equity have reduced guarantee fee';
  }

  const cancellationDate = new Date(startDate);
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsTo80LTV);

  return {
    cancellationDate: cancellationDate.toISOString().split('T')[0],
    monthsToCancellation,
    method,
    requirements
  };
}

/**
 * Calculate months to reach target balance
 */
function calculateMonthsToTarget(
  currentBalance: number,
  targetBalance: number,
  monthlyPrincipal: number,
  monthlyInterestRate: number
): number {
  if (monthlyPrincipal <= 0) return Infinity;
  
  let balance = currentBalance;
  let months = 0;
  
  while (balance > targetBalance && months < 360) { // Max 30 years
    const interest = balance * monthlyInterestRate;
    const principal = Math.min(monthlyPrincipal, balance - targetBalance);
    balance -= principal;
    months++;
  }
  
  return months;
}

/**
 * Calculate total PMI savings
 */
function calculateTotalPMISavings(
  monthlyPMI: number,
  monthsToCancellation: number,
  loanTerm: number,
  currentBalance: number,
  interestRate: number
): number {
  const remainingMonths = Math.min(monthsToCancellation, loanTerm * 12);
  return monthlyPMI * remainingMonths;
}

/**
 * Calculate monthly payment
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) return principal / totalPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Generate detailed analysis
 */
function generateAnalysis(
  inputs: PMICancellationInputs,
  currentLTV: number,
  originalLTV: number,
  cancellationInfo: CancellationInfo,
  currentPMI: number,
  annualPMISavings: number,
  totalPMISavings: number,
  equityGain: number,
  equityPercentage: number
): string {
  const {
    originalLoanAmount,
    currentBalance,
    originalHomeValue,
    currentHomeValue,
    loanType,
    propertyType,
    additionalPayments = 0,
    lumpSumPayment = 0
  } = inputs;

  let analysis = `# PMI Cancellation Analysis\n\n`;

  // Current status
  analysis += `## Current Status\n`;
  analysis += `- **Current LTV:** ${currentLTV.toFixed(1)}%\n`;
  analysis += `- **Original LTV:** ${originalLTV.toFixed(1)}%\n`;
  analysis += `- **Current PMI:** $${currentPMI.toFixed(2)}/month\n`;
  analysis += `- **Annual PMI Cost:** $${(currentPMI * 12).toFixed(2)}\n`;
  analysis += `- **Current Equity:** $${(currentHomeValue - currentBalance).toLocaleString()} (${equityPercentage.toFixed(1)}%)\n`;
  analysis += `- **Equity Gain:** $${equityGain.toLocaleString()}\n\n`;

  // Cancellation timeline
  analysis += `## Cancellation Timeline\n`;
  analysis += `- **Cancellation Method:** ${cancellationInfo.method}\n`;
  analysis += `- **Months to Cancellation:** ${cancellationInfo.monthsToCancellation}\n`;
  analysis += `- **Cancellation Date:** ${cancellationInfo.cancellationDate}\n`;
  analysis += `- **Requirements:** ${cancellationInfo.requirements}\n\n`;

  // Savings analysis
  analysis += `## Savings Analysis\n`;
  analysis += `- **Annual Savings:** $${annualPMISavings.toFixed(2)}\n`;
  analysis += `- **Total Savings:** $${totalPMISavings.toFixed(2)}\n`;
  analysis += `- **New Monthly Payment:** $${(inputs.monthlyPayment - currentPMI).toFixed(2)}\n`;
  analysis += `- **Monthly Savings:** $${currentPMI.toFixed(2)}\n\n`;

  // Loan type specific information
  analysis += `## Loan Type Information\n`;
  if (loanType === 'conventional') {
    analysis += `- **Conventional Loan:** PMI can be cancelled at 80% LTV\n`;
    analysis += `- **Automatic Cancellation:** Required at 78% LTV\n`;
    analysis += `- **Manual Cancellation:** Available at 80% LTV with good payment history\n`;
  } else if (loanType === 'fha') {
    analysis += `- **FHA Loan:** MIP (Mortgage Insurance Premium) applies\n`;
    analysis += `- **Cancellation:** Requires 11 years of payments and 78% LTV\n`;
    analysis += `- **Note:** FHA loans have different rules than conventional PMI\n`;
  } else if (loanType === 'va') {
    analysis += `- **VA Loan:** No PMI required\n`;
    analysis += `- **Funding Fee:** One-time fee at closing\n`;
    analysis += `- **Reduction:** 10% down payment reduces funding fee\n`;
  } else {
    analysis += `- **USDA Loan:** Annual guarantee fee instead of PMI\n`;
    analysis += `- **Reduction:** Higher equity may reduce guarantee fee\n`;
  }

  // Recommendations
  analysis += `\n## Recommendations\n`;
  
  if (cancellationInfo.monthsToCancellation === 0) {
    analysis += `- **✅ Immediate Action:** Contact your lender to cancel PMI\n`;
    analysis += `- **📋 Documentation:** Prepare home value documentation\n`;
    analysis += `- **📞 Follow-up:** Follow up with lender if no response\n`;
  } else if (cancellationInfo.monthsToCancellation <= 12) {
    analysis += `- **⏰ Near Term:** PMI cancellation is within 1 year\n`;
    analysis += `- **💰 Consider:** Additional payments to accelerate cancellation\n`;
    analysis += `- **📊 Monitor:** Track home value appreciation\n`;
  } else {
    analysis += `- **📈 Long Term:** PMI cancellation is ${cancellationInfo.monthsToCancellation} months away\n`;
    analysis += `- **💡 Strategy:** Consider refinancing if rates are favorable\n`;
    analysis += `- **🏠 Appreciation:** Home value growth will help reach 80% LTV\n`;
  }

  // Additional payment analysis
  if (additionalPayments > 0 || lumpSumPayment > 0) {
    analysis += `\n## Additional Payment Impact\n`;
    if (additionalPayments > 0) {
      analysis += `- **Monthly Additional:** $${additionalPayments}\n`;
      analysis += `- **Annual Additional:** $${(additionalPayments * 12).toLocaleString()}\n`;
    }
    if (lumpSumPayment > 0) {
      analysis += `- **Lump Sum Payment:** $${lumpSumPayment.toLocaleString()}\n`;
    }
    analysis += `- **Acceleration:** Additional payments reduce time to cancellation\n`;
  }

  // Property considerations
  analysis += `\n## Property Considerations\n`;
  analysis += `- **Property Type:** ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Home Value:** $${currentHomeValue.toLocaleString()}\n`;
  analysis += `- **Appreciation:** Home value has increased by $${(currentHomeValue - originalHomeValue).toLocaleString()}\n`;
  
  if (equityPercentage >= 20) {
    analysis += `- **✅ Strong Equity:** 20%+ equity provides financial flexibility\n`;
  } else if (equityPercentage >= 10) {
    analysis += `- **📊 Good Equity:** Building equity steadily\n`;
  } else {
    analysis += `- **⚠️ Limited Equity:** Consider strategies to build equity faster\n`;
  }

  return analysis;
}

/**
 * Calculate years between dates
 */
export function calculateYearsBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Calculate months between dates
 */
export function calculateMonthsBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
}