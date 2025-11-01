import { StudentLoanForgivenessInputs, StudentLoanForgivenessOutputs } from './types';

// Forgiveness program requirements (2024)
const FORGIVENESS_REQUIREMENTS = {
  public_service: { years: 10, employment: ['government', 'nonprofit', 'military'] },
  teacher: { years: 5, employment: ['teacher'] },
  nurse: { years: 10, employment: ['nurse'] },
  income_driven: { years: 20, employment: [] }, // IDR forgiveness after 20 years
  other: { years: 10, employment: [] }
};

export function calculateMonthlyInterest(balance: number, annualRate: number): number {
  return (balance * annualRate / 100) / 12;
}

export function calculateMonthlyPrincipal(payment: number, interest: number): number {
  return payment - interest;
}

export function checkForgivenessEligibility(
  program: string,
  employmentType: string,
  yearsOfService: number,
  requiredYears: number
): { isEligible: boolean; requirementsMet: string[]; requirementsNotMet: string[] } {
  const requirements = FORGIVENESS_REQUIREMENTS[program as keyof typeof FORGIVENESS_REQUIREMENTS];
  const requirementsMet: string[] = [];
  const requirementsNotMet: string[] = [];

  // Check years of service
  if (yearsOfService >= requiredYears) {
    requirementsMet.push(`Completed ${yearsOfService} years of required ${requiredYears} years`);
  } else {
    requirementsNotMet.push(`Need ${requiredYears - yearsOfService} more years of service`);
  }

  // Check employment type
  if (requirements.employment.length === 0 || requirements.employment.includes(employmentType)) {
    requirementsMet.push(`Employment type (${employmentType}) qualifies for ${program} forgiveness`);
  } else {
    requirementsNotMet.push(`Employment type (${employmentType}) does not qualify for ${program} forgiveness`);
  }

  return {
    isEligible: requirementsMet.length > 0 && requirementsNotMet.length === 0,
    requirementsMet,
    requirementsNotMet
  };
}

export function calculateStudentLoanForgiveness(inputs: StudentLoanForgivenessInputs): StudentLoanForgivenessOutputs {
  let balance = inputs.loanBalance;
  let totalPayments = 0;
  let totalInterest = 0;
  const paymentSchedule: StudentLoanForgivenessOutputs['paymentSchedule'] = [];

  // Calculate required years for forgiveness
  const programReqs = FORGIVENESS_REQUIREMENTS[inputs.forgivenessProgram as keyof typeof FORGIVENESS_REQUIREMENTS];
  const requiredYears = inputs.requiredYearsForForgiveness || programReqs.years;

  // Simulate payments until forgiveness
  const monthsToForgiveness = requiredYears * 12;
  let month = 0;

  while (month < monthsToForgiveness && balance > 0) {
    const interestPayment = calculateMonthlyInterest(balance, inputs.interestRate);
    const principalPayment = Math.min(calculateMonthlyPrincipal(inputs.monthlyPayment, interestPayment), balance);

    balance -= principalPayment;
    totalPayments += inputs.monthlyPayment;
    totalInterest += interestPayment;

    // Add to schedule annually
    if (month % 12 === 0) {
      const year = Math.floor(month / 12) + 1;
      paymentSchedule.push({
        year,
        beginningBalance: balance + principalPayment,
        payment: inputs.monthlyPayment * 12,
        interest: interestPayment * 12,
        principal: principalPayment * 12,
        endingBalance: balance
      });
    }

    month++;
  }

  // Calculate forgiveness amount
  const amountForgiven = balance;
  const netSavings = amountForgiven - totalInterest; // Simplified - doesn't include tax implications

  // Calculate break-even point (when cumulative payments equal remaining balance)
  const breakEvenPoint = totalPayments / inputs.monthlyPayment / 12;

  // Calculate time to forgiveness
  const timeToForgiveness = monthsToForgiveness / 12;

  // Monthly payment savings (compared to standard payment)
  const monthlyPaymentSavings = inputs.alternativePayment - inputs.monthlyPayment;

  // Tax implications (forgiven amount is taxable income)
  const taxImplications = amountForgiven * (inputs.taxBracket / 100);

  // Effective cost (total payments + taxes on forgiven amount)
  const effectiveCost = totalPayments + taxImplications;

  // Check eligibility
  const eligibility = checkForgivenessEligibility(
    inputs.forgivenessProgram,
    inputs.employmentType,
    inputs.yearsOfService,
    requiredYears
  );

  const estimatedForgivenessDate = eligibility.isEligible
    ? `${new Date().getFullYear() + (requiredYears - inputs.yearsOfService)}`
    : 'Not eligible';

  // Alternative scenarios
  const alternativeScenarios: StudentLoanForgivenessOutputs['alternativeScenarios'] = [
    {
      scenario: 'Pay off in 10 years',
      totalPayments: calculateAmortizationPayment(inputs.loanBalance, inputs.interestRate, 10) * 12 * 10,
      amountForgiven: 0,
      netSavings: amountForgiven - (totalPayments - totalInterest)
    },
    {
      scenario: 'Standard repayment (20 years)',
      totalPayments: calculateAmortizationPayment(inputs.loanBalance, inputs.interestRate, 20) * 12 * 20,
      amountForgiven: 0,
      netSavings: amountForgiven - (totalPayments - totalInterest)
    },
    {
      scenario: 'Extended repayment (25 years)',
      totalPayments: calculateAmortizationPayment(inputs.loanBalance, inputs.interestRate, 25) * 12 * 25,
      amountForgiven: 0,
      netSavings: amountForgiven - (totalPayments - totalInterest)
    }
  ];

  // Generate recommendations
  const recommendations: string[] = [];

  if (eligibility.isEligible) {
    recommendations.push(`You are eligible for ${inputs.forgivenessProgram} loan forgiveness`);
    recommendations.push(`Continue making payments for ${requiredYears - inputs.yearsOfService} more years`);
  } else {
    recommendations.push('You are not currently eligible for the selected forgiveness program');
    recommendations.push('Consider switching to a qualifying employment or forgiveness program');
  }

  if (netSavings > 0) {
    recommendations.push('Forgiveness program provides significant savings compared to full repayment');
  }

  if (taxImplications > 10000) {
    recommendations.push('Plan for significant tax liability on forgiven amount');
  }

  return {
    totalPaymentsMade: totalPayments,
    totalInterestPaid: totalInterest,
    amountForgiven,
    netSavings,
    breakEvenPoint,
    timeToForgiveness,
    monthlyPaymentSavings,
    taxImplications,
    effectiveCost,
    paymentSchedule,
    forgivenessEligibility: {
      isEligible: eligibility.isEligible,
      requirementsMet: eligibility.requirementsMet,
      requirementsNotMet: eligibility.requirementsNotMet,
      estimatedForgivenessDate
    },
    alternativeScenarios,
    recommendations
  };
}

export function calculateAmortizationPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateResult(inputs: StudentLoanForgivenessInputs): number {
  const result = calculateStudentLoanForgiveness(inputs);
  return result.netSavings;
}