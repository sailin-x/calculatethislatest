/**
 * Adjustable-Rate Mortgage (ARM) Calculation Formulas
 * Based on industry standards and federal regulations
 */

export interface ARMInputs {
  loanAmount: number;
  initialRate: number;
  initialPeriod: number;
  loanTerm: number;
  indexRate: number;
  margin: number;
  periodicCap: number;
  lifetimeCap: number;
  adjustmentFrequency: number;
  expectedIndexTrend: number;
}

export interface ARMResults {
  initialPayment: number;
  fullyIndexedRate: number;
  maxPossibleRate: number;
  maxPossiblePayment: number;
  totalInterestPaid: number;
  paymentSchedule: PaymentPeriod[];
  rateAdjustments: RateAdjustment[];
}

export interface PaymentPeriod {
  year: number;
  rate: number;
  monthlyPayment: number;
  remainingBalance: number;
  annualInterest: number;
  annualPrincipal: number;
}

export interface RateAdjustment {
  adjustmentDate: number; // year
  oldRate: number;
  newRate: number;
  indexRate: number;
  capApplied: boolean;
  capType: 'periodic' | 'lifetime' | 'none';
}

/**
 * Calculate monthly mortgage payment using standard formula
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (annualRate === 0) {
    return principal / (termYears * 12);
  }
  
  const monthlyRate = annualRate / 12;
  const totalPayments = termYears * 12;
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Calculate remaining balance after payments
 */
export function calculateRemainingBalance(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  paymentsMade: number
): number {
  if (annualRate === 0) {
    return Math.max(0, originalPrincipal - (monthlyPayment * paymentsMade));
  }
  
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  
  return originalPrincipal * factor - monthlyPayment * (factor - 1) / monthlyRate;
}

/**
 * Calculate fully indexed rate (index + margin)
 */
export function calculateFullyIndexedRate(indexRate: number, margin: number): number {
  return indexRate + margin;
}

/**
 * Apply rate caps to determine actual adjusted rate
 */
export function applyRateCaps(
  proposedRate: number,
  currentRate: number,
  initialRate: number,
  periodicCap: number,
  lifetimeCap: number
): {
  adjustedRate: number;
  capApplied: boolean;
  capType: 'periodic' | 'lifetime' | 'none';
} {
  let adjustedRate = proposedRate;
  let capApplied = false;
  let capType: 'periodic' | 'lifetime' | 'none' = 'none';
  
  // Apply periodic cap (maximum change per adjustment)
  const maxPeriodicIncrease = currentRate + periodicCap;
  if (adjustedRate > maxPeriodicIncrease) {
    adjustedRate = maxPeriodicIncrease;
    capApplied = true;
    capType = 'periodic';
  }
  
  // Apply lifetime cap (maximum change from initial rate)
  const maxLifetimeRate = initialRate + lifetimeCap;
  if (adjustedRate > maxLifetimeRate) {
    adjustedRate = maxLifetimeRate;
    capApplied = true;
    capType = 'lifetime';
  }
  
  // Ensure rate doesn't go below reasonable minimum
  adjustedRate = Math.max(adjustedRate, 0.01); // 1% minimum
  
  return { adjustedRate, capApplied, capType };
}

/**
 * Project index rate changes over time
 */
export function projectIndexRate(
  currentIndex: number,
  annualTrend: number,
  yearsFromNow: number
): number {
  return Math.max(0, currentIndex + (annualTrend * yearsFromNow));
}

/**
 * Simulate ARM payment schedule over loan term
 */
export function simulateARMSchedule(inputs: ARMInputs): ARMResults {
  const {
    loanAmount,
    initialRate,
    initialPeriod,
    loanTerm,
    indexRate,
    margin,
    periodicCap,
    lifetimeCap,
    adjustmentFrequency,
    expectedIndexTrend
  } = inputs;

  // Calculate initial payment
  const initialPayment = calculateMonthlyPayment(loanAmount, initialRate, loanTerm);
  
  // Calculate key rates
  const fullyIndexedRate = calculateFullyIndexedRate(indexRate, margin);
  const maxPossibleRate = initialRate + lifetimeCap;
  const maxPossiblePayment = calculateMonthlyPayment(loanAmount, maxPossibleRate, loanTerm);

  // Simulate year-by-year payment schedule
  const paymentSchedule: PaymentPeriod[] = [];
  const rateAdjustments: RateAdjustment[] = [];
  
  let currentBalance = loanAmount;
  let currentRate = initialRate;
  let currentPayment = initialPayment;
  let totalInterest = 0;

  for (let year = 1; year <= loanTerm; year++) {
    // Check if rate adjustment is needed
    if (year > initialPeriod && (year - initialPeriod - 1) % adjustmentFrequency === 0) {
      const yearsFromInitial = year - initialPeriod;
      const projectedIndex = projectIndexRate(indexRate, expectedIndexTrend, yearsFromInitial);
      const proposedRate = projectedIndex + margin;
      
      const rateAdjustment = applyRateCaps(
        proposedRate,
        currentRate,
        initialRate,
        periodicCap,
        lifetimeCap
      );
      
      const oldRate = currentRate;
      currentRate = rateAdjustment.adjustedRate;
      
      // Record rate adjustment
      rateAdjustments.push({
        adjustmentDate: year,
        oldRate,
        newRate: currentRate,
        indexRate: projectedIndex,
        capApplied: rateAdjustment.capApplied,
        capType: rateAdjustment.capType
      });
      
      // Recalculate payment with new rate and remaining balance
      const remainingYears = loanTerm - year + 1;
      if (remainingYears > 0 && currentBalance > 0) {
        currentPayment = calculateMonthlyPayment(currentBalance, currentRate, remainingYears);
      }
    }

    // Calculate annual interest and principal
    const annualInterest = currentBalance * currentRate;
    const annualPrincipal = Math.min(currentBalance, (currentPayment * 12) - annualInterest);
    
    totalInterest += annualInterest;
    currentBalance = Math.max(0, currentBalance - annualPrincipal);

    paymentSchedule.push({
      year,
      rate: currentRate,
      monthlyPayment: currentPayment,
      remainingBalance: currentBalance,
      annualInterest,
      annualPrincipal
    });

    // Break if loan is paid off
    if (currentBalance <= 0) break;
  }

  return {
    initialPayment,
    fullyIndexedRate,
    maxPossibleRate,
    maxPossiblePayment,
    totalInterestPaid: totalInterest,
    paymentSchedule,
    rateAdjustments
  };
}

/**
 * Calculate ARM vs Fixed Mortgage comparison
 */
export function compareARMvsFixed(
  loanAmount: number,
  armRate: number,
  fixedRate: number,
  termYears: number,
  armAdjustmentYear: number = 5
): {
  armPayment: number;
  fixedPayment: number;
  initialSavings: number;
  breakEvenRate: number;
  riskPremium: number;
} {
  const armPayment = calculateMonthlyPayment(loanAmount, armRate, termYears);
  const fixedPayment = calculateMonthlyPayment(loanAmount, fixedRate, termYears);
  const initialSavings = fixedPayment - armPayment;
  
  // Calculate break-even rate (rate ARM would need to reach to equal fixed payment)
  const remainingBalance = calculateRemainingBalance(
    loanAmount,
    armPayment,
    armRate,
    armAdjustmentYear * 12
  );
  
  const remainingYears = termYears - armAdjustmentYear;
  
  // Solve for rate that gives same payment as fixed mortgage
  let breakEvenRate = fixedRate;
  for (let rate = 0.01; rate <= 0.20; rate += 0.001) {
    const testPayment = calculateMonthlyPayment(remainingBalance, rate, remainingYears);
    if (testPayment >= fixedPayment) {
      breakEvenRate = rate;
      break;
    }
  }
  
  const riskPremium = breakEvenRate - armRate;
  
  return {
    armPayment,
    fixedPayment,
    initialSavings,
    breakEvenRate,
    riskPremium
  };
}

/**
 * Calculate payment shock (maximum payment increase)
 */
export function calculatePaymentShock(
  initialPayment: number,
  maxPayment: number
): {
  dollarIncrease: number;
  percentIncrease: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
} {
  const dollarIncrease = maxPayment - initialPayment;
  const percentIncrease = (dollarIncrease / initialPayment) * 100;
  
  let riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  if (percentIncrease < 15) {
    riskLevel = 'low';
  } else if (percentIncrease < 30) {
    riskLevel = 'moderate';
  } else if (percentIncrease < 50) {
    riskLevel = 'high';
  } else {
    riskLevel = 'extreme';
  }
  
  return {
    dollarIncrease,
    percentIncrease,
    riskLevel
  };
}

/**
 * Validate ARM structure for regulatory compliance
 */
export function validateARMStructure(inputs: ARMInputs): {
  isCompliant: boolean;
  warnings: string[];
  violations: string[];
} {
  const warnings: string[] = [];
  const violations: string[] = [];
  
  // Check initial period minimums
  if (inputs.initialPeriod < 2) {
    violations.push('Initial rate period should be at least 2 years for consumer protection');
  }
  
  // Check rate caps
  if (inputs.periodicCap > 0.05) { // 5%
    warnings.push('Periodic cap exceeds typical 2-5% range');
  }
  
  if (inputs.lifetimeCap > 0.10) { // 10%
    warnings.push('Lifetime cap exceeds typical 5-6% range');
  }
  
  // Check margin reasonableness
  if (inputs.margin > 0.06) { // 6%
    warnings.push('Margin exceeds typical 2-4% range');
  }
  
  // Check for teaser rate (initial rate significantly below fully indexed)
  const fullyIndexed = inputs.indexRate + inputs.margin;
  if (inputs.initialRate < fullyIndexed - 0.01) { // More than 1% below
    warnings.push('Initial rate appears to be a teaser rate - expect significant payment increase');
  }
  
  // Check payment shock potential
  const paymentShock = calculatePaymentShock(
    calculateMonthlyPayment(inputs.loanAmount, inputs.initialRate, inputs.loanTerm),
    calculateMonthlyPayment(inputs.loanAmount, inputs.initialRate + inputs.lifetimeCap, inputs.loanTerm)
  );
  
  if (paymentShock.riskLevel === 'extreme') {
    violations.push('Potential payment shock exceeds 50% - may not meet ability-to-repay requirements');
  } else if (paymentShock.riskLevel === 'high') {
    warnings.push('High payment shock potential - ensure borrower can handle payment increases');
  }
  
  return {
    isCompliant: violations.length === 0,
    warnings,
    violations
  };
}