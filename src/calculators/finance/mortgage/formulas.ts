import { Formula, CalculationResult } from '../../types/calculator';

// Mortgage Payment Calculator - Standard loan amortization formula
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalInterest(principal: number, monthlyPayment: number, numPayments: number): number {
  return (monthlyPayment * numPayments) - principal;
}

export function calculatePMI(loanAmount: number, homeValue: number, loanType: string, customRate?: number) {
  const ltvRatio = loanAmount / homeValue;

  // No PMI needed if LTV is 80% or less
  if (ltvRatio <= 0.80) {
    return { monthlyPMI: 0, pmiRate: 0, removesAt: 0 };
  }

  // PMI rates vary by loan type and LTV
  let pmiRate: number;
  if (customRate !== undefined) {
    pmiRate = customRate;
  } else if (loanType === 'fha') {
    // FHA MIP rates
    if (ltvRatio > 0.95) {
      pmiRate = 0.0085; // 0.85%
    } else if (ltvRatio > 0.90) {
      pmiRate = 0.0080; // 0.80%
    } else {
      pmiRate = 0.0075; // 0.75%
    }
  } else {
    // Conventional PMI rates
    if (ltvRatio > 0.95) {
      pmiRate = 0.0070; // 0.70%
    } else if (ltvRatio > 0.90) {
      pmiRate = 0.0055; // 0.55%
    } else if (ltvRatio > 0.85) {
      pmiRate = 0.0045; // 0.45%
    } else {
      pmiRate = 0.0035; // 0.35%
    }
  }

  const monthlyPMI = (loanAmount * pmiRate) / 12;
  const removesAt = 0.78; // Standard PMI removal threshold

  return { monthlyPMI, pmiRate, removesAt };
}

export function calculateLTV(loanAmount: number, homeValue: number): number {
  return loanAmount / homeValue;
}

export function calculateTotalMonthlyPayment(inputs: any) {
  const loanAmount = inputs.homePrice - inputs.downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);

  const propertyTax = (inputs.propertyTax || 0) / 12;
  const homeInsurance = (inputs.homeInsurance || 0) / 12;
  const hoa = inputs.hoaFees || 0;

  const pmiResult = calculatePMI(loanAmount, inputs.homePrice, inputs.loanType, inputs.pmiRate);
  const pmi = pmiResult.monthlyPMI;

  const total = monthlyPayment + propertyTax + homeInsurance + pmi + hoa;

  return {
    principalAndInterest: monthlyPayment,
    propertyTax,
    homeInsurance,
    pmi,
    hoa,
    total
  };
}

export function generateAmortizationSchedule(inputs: any) {
  const loanAmount = inputs.homePrice - inputs.downPayment;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);
  const extraPayment = inputs.extraPayment || 0;

  const schedule = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let month = 1; month <= numPayments && balance > 0.01; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance);

    balance -= principalPayment;
    totalInterest += interestPayment;

    const pmiResult = calculatePMI(loanAmount, inputs.homePrice, inputs.loanType);
    const currentLTV = balance / inputs.homePrice;
    const pmi = currentLTV > pmiResult.removesAt ? pmiResult.monthlyPMI : 0;

    schedule.push({
      month,
      payment: monthlyPayment + extraPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      pmi,
      totalInterest
    });
  }

  return schedule;
}

export function calculateRefinanceBreakEven(currentBalance: number, currentRate: number, newRate: number, remainingTerm: number, closingCosts: number) {
  const currentPayment = calculateMonthlyPayment(currentBalance, currentRate, remainingTerm);
  const newPayment = calculateMonthlyPayment(currentBalance, newRate, remainingTerm);
  const monthlySavings = currentPayment - newPayment;

  if (monthlySavings <= 0) {
    return {
      currentPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths: Infinity,
      totalSavings: -closingCosts
    };
  }

  const breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
  const totalSavings = (monthlySavings * (remainingTerm * 12 - breakEvenMonths)) - closingCosts;

  return {
    currentPayment,
    newPayment,
    monthlySavings,
    breakEvenMonths,
    totalSavings
  };
}

export function calculateAffordability(monthlyIncome: number, monthlyDebts: number, maxDTI: number) {
  const maxMonthlyPayment = monthlyIncome * maxDTI - monthlyDebts;
  const maxLoanAmount = maxMonthlyPayment * 12 * 25; // Rough estimate for 25-year loan at 7%
  const recommendedDownPayment = maxLoanAmount * 0.20;

  return {
    maxMonthlyPayment,
    maxLoanAmount,
    recommendedDownPayment
  };
}

// Export MortgageFormulas object for tests
export const MortgageFormulas = {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculatePMI,
  calculateLTV,
  calculateTotalMonthlyPayment,
  generateAmortizationSchedule,
  calculateRefinanceBreakEven,
  calculateAffordability
};

// Mortgage Calculator Formula as Formula object
export const mortgageCalculatorFormula: Formula = {
  id: 'mortgage-calculator',
  name: 'Mortgage Calculator',
  description: 'Calculate mortgage payments, PMI, and total costs',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    try {
      const loanAmount = inputs.homePrice - inputs.downPayment;
      const monthlyPayment = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);

      const propertyTax = (inputs.propertyTax || 0) / 12;
      const homeInsurance = (inputs.homeInsurance || 0) / 12;
      const hoa = inputs.hoaFees || 0;

      const pmiResult = calculatePMI(loanAmount, inputs.homePrice, inputs.loanType, inputs.pmiRate);
      const pmi = pmiResult.monthlyPMI;

      const totalMonthlyPayment = monthlyPayment + propertyTax + homeInsurance + pmi + hoa;
      const totalPayments = totalMonthlyPayment * inputs.loanTerm * 12;
      const totalInterest = totalPayments - loanAmount;
      const loanToValue = (loanAmount / inputs.homePrice) * 100;
      const payoffTimeMonths = inputs.extraPayment ?
        Math.ceil(Math.log(1 + (loanAmount * inputs.interestRate / 100 / 12) / (inputs.extraPayment + monthlyPayment - loanAmount * inputs.interestRate / 100 / 12)) / Math.log(1 + inputs.interestRate / 100 / 12)) :
        inputs.loanTerm * 12;

      return {
        outputs: {
          loanAmount,
          monthlyPayment: totalMonthlyPayment,
          principalAndInterest: monthlyPayment,
          propertyTax,
          homeInsurance,
          pmi,
          loanToValue,
          totalInterest,
          totalPayments,
          payoffTimeMonths
        },
        explanation: `Monthly mortgage payment: $${totalMonthlyPayment.toFixed(2)} including principal & interest, taxes, insurance, and PMI.`,
        intermediateSteps: {
          'Loan Amount': `$${loanAmount.toLocaleString()}`,
          'Principal & Interest': `$${monthlyPayment.toFixed(2)}/month`,
          'Property Tax': `$${(propertyTax * 12).toFixed(2)}/year ($${propertyTax.toFixed(2)}/month)`,
          'Home Insurance': `$${(homeInsurance * 12).toFixed(2)}/year ($${homeInsurance.toFixed(2)}/month)`,
          'PMI': pmi > 0 ? `$${pmi.toFixed(2)}/month` : 'None required',
          'Total Monthly Payment': `$${totalMonthlyPayment.toFixed(2)}`
        }
      };
    } catch (error) {
      throw new Error(`Mortgage calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
