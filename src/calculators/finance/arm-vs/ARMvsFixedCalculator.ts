import { Calculator, CalculatorInput, CalculatorOutput } from '../../types/Calculator';

export const ARMvsFixedCalculator: Calculator = {
  id: 'ArmVsFixed',
  name: 'ARM vs. Fixed Mortgage Calculator',
  description: 'Compare adjustable-rate mortgages (ARM) with fixed-rate mortgages to determine the best option based on your financial situation and risk tolerance',
  category: 'finance',
  tags: ['mortgage', 'arm', 'fixed rate', 'comparison', 'real estate', 'loan'],
  
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      min: 10000,
      max: 10000000,
      placeholder: '400000',
      description: 'Total mortgage loan amount'
    },
    {
      id: 'fixedRate',
      label: 'Fixed Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      placeholder: '4.5',
      description: 'Interest rate for fixed-rate mortgage'
    },
    {
      id: 'armInitialRate',
      label: 'ARM Initial Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      placeholder: '3.5',
      description: 'Starting interest rate for ARM'
    },
    {
      id: 'armInitialPeriod',
      label: 'ARM Initial Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      defaultValue: '5',
      placeholder: '5',
      description: 'Years the ARM initial rate remains fixed'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 15,
      max: 40,
      defaultValue: '30',
      placeholder: '30',
      description: 'Total loan term in years'
    },
    {
      id: 'armMargin',
      label: 'ARM Margin (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 6,
      placeholder: '2.25',
      description: 'Fixed margin added to ARM index rate'
    },
    {
      id: 'currentIndex',
      label: 'Current Index Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      placeholder: '2.5',
      description: 'Current rate of ARM index (e.g., SOFR, Treasury)'
    },
    {
      id: 'armLifetimeCap',
      label: 'ARM Lifetime Cap (%)',
      type: 'percentage',
      required: false,
      min: 2,
      max: 10,
      defaultValue: '5',
      placeholder: '5',
      description: 'Maximum rate increase over ARM loan life'
    },
    {
      id: 'armPeriodicCap',
      label: 'ARM Periodic Cap (%)',
      type: 'percentage',
      required: false,
      min: 1,
      max: 5,
      defaultValue: '2',
      placeholder: '2',
      description: 'Maximum rate increase per ARM adjustment period'
    },
    {
      id: 'expectedIndexTrend',
      label: 'Expected Annual Index Change (%)',
      type: 'percentage',
      required: false,
      min: -2,
      max: 3,
      defaultValue: '0.5',
      placeholder: '0.5',
      description: 'Expected annual change in index rate'
    },
    {
      id: 'planToStay',
      label: 'Years Planning to Stay',
      type: 'number',
      required: false,
      min: 1,
      max: 40,
      defaultValue: '7',
      placeholder: '7',
      description: 'How long you plan to keep the mortgage'
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: false,
      defaultValue: 'moderate',
      options: [
        { value: 'low', label: 'Low - Prefer payment stability' },
        { value: 'moderate', label: 'Moderate - Some risk acceptable' },
        { value: 'high', label: 'High - Comfortable with rate changes' }
      ],
      description: 'Your comfort level with payment fluctuations'
    }
  ],

  outputs: [
    {
      id: 'fixedPayment',
      label: 'Fixed Rate Monthly Payment',
      type: 'currency',
      description: 'Monthly payment for fixed-rate mortgage'
    },
    {
      id: 'armInitialPayment',
      label: 'ARM Initial Monthly Payment',
      type: 'currency',
      description: 'Initial monthly payment for ARM'
    },
    {
      id: 'initialSavings',
      label: 'Initial Monthly Savings (ARM)',
      type: 'currency',
      description: 'Monthly savings with ARM during initial period'
    },
    {
      id: 'breakEvenRate',
      label: 'ARM Break-Even Rate',
      type: 'percentage',
      description: 'Rate ARM would need to reach to equal fixed payment'
    },
    {
      id: 'totalCostComparison',
      label: 'Total Cost Comparison',
      type: 'text',
      description: 'Total cost comparison over planned stay period'
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'text',
      description: 'Analysis of risks and benefits for each option'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      description: 'Personalized recommendation based on your situation'
    },
    {
      id: 'scenarioAnalysis',
      label: 'Scenario Analysis',
      type: 'text',
      description: 'Best and worst case scenarios for each mortgage type'
    }
  ],

  calculate: (inputs) => {
    const loanAmount = Number(inputs.loanAmount) || 0;
    const fixedRate = (Number(inputs.fixedRate) || 0) / 100;
    const armInitialRate = (Number(inputs.armInitialRate) || 0) / 100;
    const armInitialPeriod = Number(inputs.armInitialPeriod) || 5;
    const loanTerm = Number(inputs.loanTerm) || 30;
    const armMargin = (Number(inputs.armMargin) || 0) / 100;
    const currentIndex = (Number(inputs.currentIndex) || 0) / 100;
    const armLifetimeCap = (Number(inputs.armLifetimeCap) || 5) / 100;
    const armPeriodicCap = (Number(inputs.armPeriodicCap) || 2) / 100;
    const expectedIndexTrend = (Number(inputs.expectedIndexTrend) || 0.5) / 100;
    const planToStay = Number(inputs.planToStay) || 7;
    const riskTolerance = inputs.riskTolerance || 'moderate';

    // Calculate monthly payments
    const monthlyFixedRate = fixedRate / 12;
    const monthlyArmRate = armInitialRate / 12;
    const totalPayments = loanTerm * 12;

    // Fixed rate payment
    const fixedPayment = loanAmount * 
      (monthlyFixedRate * Math.pow(1 + monthlyFixedRate, totalPayments)) /
      (Math.pow(1 + monthlyFixedRate, totalPayments) - 1);

    // ARM initial payment
    const armInitialPayment = loanAmount * 
      (monthlyArmRate * Math.pow(1 + monthlyArmRate, totalPayments)) /
      (Math.pow(1 + monthlyArmRate, totalPayments) - 1);

    // Initial monthly savings
    const initialSavings = fixedPayment - armInitialPayment;

    // Calculate break-even rate
    const remainingBalance = calculateRemainingBalance(
      loanAmount, armInitialPayment, armInitialRate, armInitialPeriod * 12
    );
    const remainingYears = loanTerm - armInitialPeriod;
    const breakEvenRate = findBreakEvenRate(remainingBalance, fixedPayment, remainingYears);

    // Calculate total costs over planned stay period
    const fixedTotalCost = calculateFixedTotalCost(fixedPayment, planToStay);
    const armTotalCost = calculateARMTotalCost(
      loanAmount, armInitialRate, armInitialPeriod, currentIndex, armMargin,
      armPeriodicCap, armLifetimeCap, expectedIndexTrend, planToStay, loanTerm
    );

    // Generate risk analysis
    const fullyIndexedRate = currentIndex + armMargin;
    const maxPossibleRate = Math.min(armInitialRate + armLifetimeCap, fullyIndexedRate + armLifetimeCap);
    const maxArmPayment = calculateMonthlyPayment(loanAmount, maxPossibleRate, loanTerm);
    const paymentShock = ((maxArmPayment - armInitialPayment) / armInitialPayment) * 100;

    const riskFactors = [];
    if (paymentShock > 50) {
      riskFactors.push('HIGH RISK: ARM payment could increase by more than 50%');
    } else if (paymentShock > 25) {
      riskFactors.push('MODERATE RISK: ARM payment could increase by 25-50%');
    } else {
      riskFactors.push('LOW RISK: ARM payment increase limited to under 25%');
    }

    if (fullyIndexedRate > armInitialRate) {
      riskFactors.push(`ARM rate likely to increase: Current index + margin (${(fullyIndexedRate * 100).toFixed(2)}%) > initial rate`);
    } else {
      riskFactors.push(`ARM rate may stay low: Current index + margin (${(fullyIndexedRate * 100).toFixed(2)}%) ≤ initial rate`);
    }

    if (breakEvenRate > fullyIndexedRate) {
      riskFactors.push(`ARM has cushion: Break-even rate (${(breakEvenRate * 100).toFixed(2)}%) > fully indexed rate`);
    } else {
      riskFactors.push(`ARM at risk: Break-even rate (${(breakEvenRate * 100).toFixed(2)}%) ≤ fully indexed rate`);
    }

    // Generate recommendation
    let recommendation = '';
    let recommendedOption = '';

    if (planToStay <= armInitialPeriod) {
      recommendedOption = 'ARM';
      recommendation = `ARM RECOMMENDED: Since you plan to stay ${planToStay} years (within ${armInitialPeriod}-year initial period), you'll benefit from lower ARM rate without rate adjustment risk.`;
    } else if (initialSavings > 0 && breakEvenRate > fullyIndexedRate + 0.01) {
      if (riskTolerance === 'high' || (riskTolerance === 'moderate' && paymentShock < 30)) {
        recommendedOption = 'ARM';
        recommendation = `ARM RECOMMENDED: Initial savings of $${initialSavings.toLocaleString()}/month with reasonable break-even cushion. Good fit for your ${riskTolerance} risk tolerance.`;
      } else {
        recommendedOption = 'Fixed';
        recommendation = `FIXED RECOMMENDED: While ARM offers initial savings, your ${riskTolerance} risk tolerance suggests fixed-rate stability is better suited for you.`;
      }
    } else if (initialSavings <= 0) {
      recommendedOption = 'Fixed';
      recommendation = `FIXED RECOMMENDED: ARM offers minimal or no initial savings ($${Math.abs(initialSavings).toLocaleString()}/month), making fixed-rate the clear choice for payment stability.`;
    } else {
      recommendedOption = 'Fixed';
      recommendation = `FIXED RECOMMENDED: ARM break-even rate (${(breakEvenRate * 100).toFixed(2)}%) is close to or below expected rates, limiting ARM benefits while adding risk.`;
    }

    // Generate scenario analysis
    const bestCaseARM = armTotalCost.bestCase;
    const worstCaseARM = armTotalCost.worstCase;
    const fixedCaseTotal = fixedTotalCost;

    const scenarios = [
      `Fixed Rate: $${fixedCaseTotal.toLocaleString()} total cost over ${planToStay} years`,
      `ARM Best Case: $${bestCaseARM.toLocaleString()} (rates stay low)`,
      `ARM Worst Case: $${worstCaseARM.toLocaleString()} (rates rise to maximum)`,
      `ARM Expected Case: $${armTotalCost.expected.toLocaleString()} (rates follow trend)`
    ];

    // Total cost comparison
    const costDifference = armTotalCost.expected - fixedCaseTotal;
    const costComparison = costDifference > 0 
      ? `Fixed rate saves $${Math.abs(costDifference).toLocaleString()} over ${planToStay} years`
      : `ARM saves $${Math.abs(costDifference).toLocaleString()} over ${planToStay} years`;

    return {
      fixedPayment: {
        value: fixedPayment,
        formatted: `$${fixedPayment.toLocaleString()}`,
        explanation: `Monthly payment at ${(fixedRate * 100).toFixed(2)}% fixed rate for ${loanTerm} years`
      },
      armInitialPayment: {
        value: armInitialPayment,
        formatted: `$${armInitialPayment.toLocaleString()}`,
        explanation: `Initial monthly payment at ${(armInitialRate * 100).toFixed(2)}% ARM rate for first ${armInitialPeriod} years`
      },
      initialSavings: {
        value: initialSavings,
        formatted: initialSavings >= 0 
          ? `$${initialSavings.toLocaleString()} savings`
          : `$${Math.abs(initialSavings).toLocaleString()} higher`,
        explanation: initialSavings >= 0
          ? `Monthly savings with ARM during initial ${armInitialPeriod}-year period`
          : `ARM payment is higher than fixed rate during initial period`
      },
      breakEvenRate: {
        value: breakEvenRate * 100,
        formatted: `${(breakEvenRate * 100).toFixed(2)}%`,
        explanation: `ARM rate that would result in same payment as fixed rate after initial period`
      },
      totalCostComparison: {
        value: costComparison,
        formatted: costComparison,
        explanation: `Total cost comparison over your planned ${planToStay}-year stay period`
      },
      riskAnalysis: {
        value: riskFactors.join('; '),
        formatted: riskFactors.map(factor => `• ${factor}`).join('\n'),
        explanation: 'Analysis of payment stability and rate change risks'
      },
      recommendation: {
        value: `${recommendedOption}: ${recommendation}`,
        formatted: `**${recommendedOption.toUpperCase()} RECOMMENDED**\n\n${recommendation}`,
        explanation: 'Personalized recommendation based on your financial situation and risk tolerance'
      },
      scenarioAnalysis: {
        value: scenarios.join('; '),
        formatted: scenarios.map(scenario => `• ${scenario}`).join('\n'),
        explanation: `Cost scenarios over ${planToStay}-year period based on different rate environments`
      }
    };
  },

  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'PMT = P × [r(1+r)^n] / [(1+r)^n - 1]',
      description: 'Standard mortgage payment calculation'
    },
    {
      name: 'Break-Even Rate',
      formula: 'Rate where ARM Payment = Fixed Payment',
      description: 'ARM rate that results in same payment as fixed rate'
    },
    {
      name: 'Total Cost Comparison',
      formula: 'Sum of all payments over comparison period',
      description: 'Total cost including principal and interest over specified timeframe'
    }
  ],

  examples: [
    {
      name: 'Conservative Comparison',
      description: 'Conservative borrower comparing 5/1 ARM vs 30-year fixed',
      inputs: {
        loanAmount: '400000',
        fixedRate: '4.5',
        armInitialRate: '3.5',
        armInitialPeriod: '5',
        loanTerm: '30',
        armMargin: '2.25',
        currentIndex: '2.5',
        armLifetimeCap: '5',
        armPeriodicCap: '2',
        expectedIndexTrend: '0.5',
        planToStay: '7',
        riskTolerance: 'low'
      }
    },
    {
      name: 'Aggressive Comparison',
      description: 'Risk-tolerant borrower with shorter stay period',
      inputs: {
        loanAmount: '600000',
        fixedRate: '4.75',
        armInitialRate: '3.25',
        armInitialPeriod: '7',
        loanTerm: '30',
        armMargin: '2.5',
        currentIndex: '3.0',
        armLifetimeCap: '6',
        armPeriodicCap: '2',
        expectedIndexTrend: '0.75',
        planToStay: '5',
        riskTolerance: 'high'
      }
    }
  ]
};

// Helper functions
function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 12;
  const totalPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateRemainingBalance(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  paymentsMade: number
): number {
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  
  return Math.max(0, originalPrincipal * factor - monthlyPayment * (factor - 1) / monthlyRate);
}

function findBreakEvenRate(remainingBalance: number, targetPayment: number, remainingYears: number): number {
  // Binary search for break-even rate
  let low = 0.01;
  let high = 0.20;
  let rate = (low + high) / 2;
  
  for (let i = 0; i < 50; i++) {
    const payment = calculateMonthlyPayment(remainingBalance, rate, remainingYears);
    
    if (Math.abs(payment - targetPayment) < 1) {
      break;
    }
    
    if (payment < targetPayment) {
      low = rate;
    } else {
      high = rate;
    }
    
    rate = (low + high) / 2;
  }
  
  return rate;
}

function calculateFixedTotalCost(monthlyPayment: number, years: number): number {
  return monthlyPayment * years * 12;
}

function calculateARMTotalCost(
  loanAmount: number,
  initialRate: number,
  initialPeriod: number,
  currentIndex: number,
  margin: number,
  periodicCap: number,
  lifetimeCap: number,
  expectedTrend: number,
  planToStay: number,
  loanTerm: number
): { expected: number; bestCase: number; worstCase: number } {
  const monthsToStay = planToStay * 12;
  const initialPayment = calculateMonthlyPayment(loanAmount, initialRate, loanTerm);
  
  // Expected case
  let expectedTotal = 0;
  let currentRate = initialRate;
  let currentBalance = loanAmount;
  
  for (let month = 1; month <= monthsToStay; month++) {
    // Adjust rate after initial period
    if (month > initialPeriod * 12 && (month - initialPeriod * 12 - 1) % 12 === 0) {
      const yearsFromInitial = (month - initialPeriod * 12) / 12;
      const projectedIndex = currentIndex + (expectedTrend * yearsFromInitial);
      let newRate = projectedIndex + margin;
      
      // Apply caps
      newRate = Math.min(newRate, currentRate + periodicCap);
      newRate = Math.min(newRate, initialRate + lifetimeCap);
      currentRate = Math.max(newRate, 0.01);
    }
    
    const monthlyRate = currentRate / 12;
    const interest = currentBalance * monthlyRate;
    const principal = Math.min(initialPayment - interest, currentBalance);
    
    expectedTotal += interest + principal;
    currentBalance = Math.max(0, currentBalance - principal);
    
    if (currentBalance <= 0) break;
  }
  
  // Best case (rates stay at initial)
  const bestCaseTotal = initialPayment * monthsToStay;
  
  // Worst case (rates go to maximum immediately)
  const maxRate = initialRate + lifetimeCap;
  const maxPayment = calculateMonthlyPayment(loanAmount, maxRate, loanTerm);
  const worstCaseTotal = maxPayment * monthsToStay;
  
  return {
    expected: expectedTotal,
    bestCase: bestCaseTotal,
    worstCase: worstCaseTotal
  };
}

export default ARMvsFixedCalculator;