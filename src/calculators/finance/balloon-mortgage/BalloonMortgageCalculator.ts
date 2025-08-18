import { Calculator, CalculatorInput, CalculatorOutput } from '../../../types/Calculator';

export const BalloonMortgageCalculator: Calculator = {
  id: 'balloon-mortgage',
  name: 'Balloon Mortgage Calculator',
  description: 'Calculate balloon mortgage payments, balloon payment amount, and compare with traditional mortgages to evaluate financing options',
  category: 'finance',
  tags: ['mortgage', 'balloon', 'payment', 'financing', 'real estate'],
  
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      placeholder: '400000',
      description: 'Total mortgage loan amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      placeholder: '5.25',
      description: 'Annual interest rate for the loan'
    },
    {
      id: 'balloonTerm',
      label: 'Balloon Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      placeholder: '5',
      description: 'Years until balloon payment is due'
    },
    {
      id: 'amortizationPeriod',
      label: 'Amortization Period (years)',
      type: 'number',
      required: true,
      min: 15,
      max: 40,
      defaultValue: '30',
      placeholder: '30',
      description: 'Period over which payments are calculated (typically 30 years)'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      min: 0,
      placeholder: '80000',
      description: 'Initial down payment amount'
    },
    {
      id: 'balloonType',
      label: 'Balloon Type',
      type: 'select',
      required: false,
      defaultValue: 'interest-principal',
      options: [
        { value: 'interest-principal', label: 'Interest + Principal Payments' },
        { value: 'interest-only', label: 'Interest-Only Payments' },
        { value: 'partial-amortization', label: 'Partial Amortization' }
      ],
      description: 'Type of balloon mortgage structure'
    },
    {
      id: 'partialAmortizationYears',
      label: 'Partial Amortization Years',
      type: 'number',
      required: false,
      min: 10,
      max: 25,
      defaultValue: '15',
      placeholder: '15',
      description: 'Amortization period for partial amortization balloon (if applicable)'
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Property Appreciation (%/year)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 15,
      defaultValue: '3',
      placeholder: '3',
      description: 'Expected annual property value appreciation'
    },
    {
      id: 'refinanceRate',
      label: 'Expected Refinance Rate (%)',
      type: 'percentage',
      required: false,
      min: 1,
      max: 15,
      placeholder: '5.5',
      description: 'Expected interest rate when refinancing balloon payment'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '5000',
      placeholder: '5000',
      description: 'Estimated closing costs for the loan'
    },
    {
      id: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'select',
      required: false,
      defaultValue: 'refinance',
      options: [
        { value: 'refinance', label: 'Refinance the balloon payment' },
        { value: 'sell', label: 'Sell the property' },
        { value: 'cash', label: 'Pay cash from savings/investments' },
        { value: 'extend', label: 'Negotiate loan extension' }
      ],
      description: 'Planned strategy for handling balloon payment'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      description: 'Monthly payment amount during balloon term'
    },
    {
      id: 'balloonPayment',
      label: 'Balloon Payment',
      type: 'currency',
      description: 'Final balloon payment amount due'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      description: 'Total interest paid during balloon term'
    },
    {
      id: 'principalPaid',
      label: 'Principal Paid',
      type: 'currency',
      description: 'Principal amount paid down during balloon term'
    },
    {
      id: 'remainingBalance',
      label: 'Remaining Balance',
      type: 'currency',
      description: 'Loan balance remaining at balloon payment date'
    },
    {
      id: 'traditionalComparison',
      label: 'vs. Traditional Mortgage',
      type: 'text',
      description: 'Comparison with traditional 30-year mortgage'
    },
    {
      id: 'cashFlowAnalysis',
      label: 'Cash Flow Analysis',
      type: 'text',
      description: 'Monthly cash flow impact and savings'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      description: 'Analysis of balloon mortgage risks and considerations'
    },
    {
      id: 'exitStrategyAnalysis',
      label: 'Exit Strategy Analysis',
      type: 'text',
      description: 'Analysis of chosen exit strategy feasibility'
    },
    {
      id: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'text',
      description: 'Property appreciation needed to break even'
    }
  ],

  calculate: (inputs) => {
    const loanAmount = Number(inputs.loanAmount) || 0;
    const interestRate = (Number(inputs.interestRate) || 0) / 100;
    const balloonTerm = Number(inputs.balloonTerm) || 5;
    const amortizationPeriod = Number(inputs.amortizationPeriod) || 30;
    const downPayment = Number(inputs.downPayment) || 0;
    const balloonType = inputs.balloonType || 'interest-principal';
    const partialAmortizationYears = Number(inputs.partialAmortizationYears) || 15;
    const expectedAppreciation = (Number(inputs.expectedAppreciation) || 3) / 100;
    const refinanceRate = (Number(inputs.refinanceRate) || 5.5) / 100;
    const closingCosts = Number(inputs.closingCosts) || 5000;
    const exitStrategy = inputs.exitStrategy || 'refinance';

    const netLoanAmount = loanAmount - downPayment;

    // Calculate monthly payment based on balloon type
    let monthlyPayment: number;
    let balloonPayment: number;
    let principalPaid: number;
    let totalInterestPaid: number;

    if (balloonType === 'interest-only') {
      monthlyPayment = (netLoanAmount * interestRate) / 12;
      balloonPayment = netLoanAmount;
      principalPaid = 0;
      totalInterestPaid = monthlyPayment * balloonTerm * 12;
    } else if (balloonType === 'partial-amortization') {
      monthlyPayment = calculateMonthlyPayment(netLoanAmount, interestRate, partialAmortizationYears);
      const remainingBalance = calculateRemainingBalance(netLoanAmount, monthlyPayment, interestRate, balloonTerm * 12);
      balloonPayment = remainingBalance;
      principalPaid = netLoanAmount - remainingBalance;
      totalInterestPaid = (monthlyPayment * balloonTerm * 12) - principalPaid;
    } else {
      // Standard interest + principal based on amortization period
      monthlyPayment = calculateMonthlyPayment(netLoanAmount, interestRate, amortizationPeriod);
      const remainingBalance = calculateRemainingBalance(netLoanAmount, monthlyPayment, interestRate, balloonTerm * 12);
      balloonPayment = remainingBalance;
      principalPaid = netLoanAmount - remainingBalance;
      totalInterestPaid = (monthlyPayment * balloonTerm * 12) - principalPaid;
    }

    // Traditional mortgage comparison
    const traditionalPayment = calculateMonthlyPayment(netLoanAmount, interestRate, 30);
    const monthlySavings = traditionalPayment - monthlyPayment;
    const totalSavings = monthlySavings * balloonTerm * 12;

    // Property value analysis
    const propertyValue = loanAmount + downPayment;
    const futurePropertyValue = propertyValue * Math.pow(1 + expectedAppreciation, balloonTerm);
    const equityAtBalloon = futurePropertyValue - balloonPayment;

    // Risk assessment
    const riskAnalysis = generateRiskAssessment(
      balloonPayment, futurePropertyValue, balloonTerm, balloonType, 
      interestRate, refinanceRate, exitStrategy
    );

    // Exit strategy analysis
    const exitAnalysis = analyzeExitStrategy(
      exitStrategy, balloonPayment, futurePropertyValue, refinanceRate,
      balloonTerm, closingCosts, equityAtBalloon
    );

    // Cash flow analysis
    const cashFlowAnalysis = [
      `Monthly payment: $${monthlyPayment.toLocaleString()} vs $${traditionalPayment.toLocaleString()} traditional`,
      `Monthly savings: $${monthlySavings.toLocaleString()}`,
      `Total savings over ${balloonTerm} years: $${totalSavings.toLocaleString()}`,
      `Cash needed at balloon: $${balloonPayment.toLocaleString()}`
    ];

    // Break-even analysis
    const breakEvenAppreciation = calculateBreakEvenAppreciation(
      propertyValue, balloonPayment, totalSavings, balloonTerm
    );

    const breakEvenAnalysis = [
      `Property needs ${(breakEvenAppreciation * 100).toFixed(2)}% annual appreciation to break even`,
      `Expected equity at balloon: $${equityAtBalloon.toLocaleString()}`,
      `Loan-to-value at balloon: ${((balloonPayment / futurePropertyValue) * 100).toFixed(1)}%`
    ];

    // Traditional comparison
    const traditionalTotalCost = traditionalPayment * balloonTerm * 12;
    const balloonTotalCost = (monthlyPayment * balloonTerm * 12) + balloonPayment;
    const comparison = [
      `Balloon total cost: $${balloonTotalCost.toLocaleString()}`,
      `Traditional cost (${balloonTerm} years): $${traditionalTotalCost.toLocaleString()}`,
      `Difference: ${balloonTotalCost < traditionalTotalCost ? 'Balloon saves' : 'Balloon costs'} $${Math.abs(balloonTotalCost - traditionalTotalCost).toLocaleString()}`
    ];

    return {
      monthlyPayment: {
        value: monthlyPayment,
        formatted: `$${monthlyPayment.toLocaleString()}`,
        explanation: `Monthly payment for ${balloonType} balloon mortgage over ${balloonTerm} years`
      },
      balloonPayment: {
        value: balloonPayment,
        formatted: `$${balloonPayment.toLocaleString()}`,
        explanation: `Balloon payment due after ${balloonTerm} years`
      },
      totalInterestPaid: {
        value: totalInterestPaid,
        formatted: `$${totalInterestPaid.toLocaleString()}`,
        explanation: `Total interest paid during ${balloonTerm}-year balloon term`
      },
      principalPaid: {
        value: principalPaid,
        formatted: `$${principalPaid.toLocaleString()}`,
        explanation: `Principal amount paid down during balloon term`
      },
      remainingBalance: {
        value: balloonPayment,
        formatted: `$${balloonPayment.toLocaleString()}`,
        explanation: `Loan balance remaining at balloon payment date`
      },
      traditionalComparison: {
        value: comparison.join('; '),
        formatted: comparison.map(item => `• ${item}`).join('\\n'),
        explanation: `Cost comparison with traditional 30-year mortgage`
      },
      cashFlowAnalysis: {
        value: cashFlowAnalysis.join('; '),
        formatted: cashFlowAnalysis.map(item => `• ${item}`).join('\\n'),
        explanation: `Monthly cash flow impact and total savings analysis`
      },
      riskAssessment: {
        value: riskAnalysis.summary,
        formatted: riskAnalysis.details.map(item => `• ${item}`).join('\\n'),
        explanation: `Analysis of balloon mortgage risks and market considerations`
      },
      exitStrategyAnalysis: {
        value: exitAnalysis.summary,
        formatted: exitAnalysis.details.map(item => `• ${item}`).join('\\n'),
        explanation: `Feasibility analysis of chosen exit strategy`
      },
      breakEvenAnalysis: {
        value: breakEvenAnalysis.join('; '),
        formatted: breakEvenAnalysis.map(item => `• ${item}`).join('\\n'),
        explanation: `Property appreciation needed to justify balloon mortgage`
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
      name: 'Balloon Payment',
      formula: 'Balloon = P × [(1+r)^n - (1+r)^t] / [(1+r)^n - 1]',
      description: 'Remaining balance after balloon term'
    },
    {
      name: 'Interest-Only Payment',
      formula: 'Payment = P × r / 12',
      description: 'Monthly interest-only payment'
    },
    {
      name: 'Break-Even Appreciation',
      formula: 'Required Appreciation = (Balloon - Savings) / Property Value / Years',
      description: 'Annual appreciation needed to break even'
    }
  ],

  examples: [
    {
      name: 'Standard 5-Year Balloon',
      description: 'Typical 5-year balloon mortgage with 30-year amortization',
      inputs: {
        loanAmount: '400000',
        interestRate: '5.25',
        balloonTerm: '5',
        amortizationPeriod: '30',
        downPayment: '80000',
        balloonType: 'interest-principal',
        expectedAppreciation: '3',
        refinanceRate: '5.75',
        closingCosts: '5000',
        exitStrategy: 'refinance'
      }
    },
    {
      name: 'Interest-Only Commercial',
      description: 'Interest-only balloon for commercial property',
      inputs: {
        loanAmount: '1000000',
        interestRate: '6.0',
        balloonTerm: '7',
        amortizationPeriod: '25',
        downPayment: '250000',
        balloonType: 'interest-only',
        expectedAppreciation: '4',
        refinanceRate: '6.25',
        closingCosts: '15000',
        exitStrategy: 'sell'
      }
    },
    {
      name: 'Partial Amortization',
      description: 'Balloon with partial amortization over 15 years',
      inputs: {
        loanAmount: '600000',
        interestRate: '4.75',
        balloonTerm: '7',
        amortizationPeriod: '30',
        downPayment: '120000',
        balloonType: 'partial-amortization',
        partialAmortizationYears: '15',
        expectedAppreciation: '2.5',
        refinanceRate: '5.0',
        closingCosts: '8000',
        exitStrategy: 'refinance'
      }
    }
  ]
};

// Helper functions
function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  if (annualRate === 0) return principal / (termYears * 12);
  
  const monthlyRate = annualRate / 12;
  const totalPayments = termYears * 12;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateRemainingBalance(principal: number, payment: number, annualRate: number, paymentsMade: number): number {
  if (annualRate === 0) return Math.max(0, principal - (payment * paymentsMade));
  
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  return Math.max(0, principal * factor - payment * (factor - 1) / monthlyRate);
}

function generateRiskAssessment(
  balloonPayment: number, futurePropertyValue: number, balloonTerm: number,
  balloonType: string, currentRate: number, refinanceRate: number, exitStrategy: string
): { summary: string; details: string[] } {
  const details = [];
  let riskLevel = 'MODERATE';

  // Interest rate risk
  const rateIncrease = refinanceRate - currentRate;
  if (rateIncrease > 0.01) {
    details.push(`Interest rates expected to rise by ${(rateIncrease * 100).toFixed(2)}% - refinancing risk`);
    riskLevel = 'HIGH';
  } else {
    details.push('Interest rate environment appears stable for refinancing');
  }

  // Loan-to-value risk
  const ltvAtBalloon = (balloonPayment / futurePropertyValue) * 100;
  if (ltvAtBalloon > 80) {
    details.push(`High LTV at balloon (${ltvAtBalloon.toFixed(1)}%) may limit refinancing options`);
    riskLevel = 'HIGH';
  } else {
    details.push(`Reasonable LTV at balloon (${ltvAtBalloon.toFixed(1)}%) should allow refinancing`);
  }

  // Market risk
  if (balloonTerm <= 3) {
    details.push('Short balloon term reduces market timing risk');
  } else if (balloonTerm >= 7) {
    details.push('Long balloon term increases market uncertainty');
    riskLevel = riskLevel === 'LOW' ? 'MODERATE' : 'HIGH';
  }

  // Balloon type risk
  if (balloonType === 'interest-only') {
    details.push('Interest-only structure provides no principal paydown - higher risk');
    riskLevel = 'HIGH';
  } else {
    details.push('Principal paydown reduces balloon payment risk');
  }

  // Exit strategy risk
  if (exitStrategy === 'cash') {
    details.push('Cash payment strategy eliminates refinancing risk but requires liquidity');
  } else if (exitStrategy === 'sell') {
    details.push('Sale strategy depends on market conditions at balloon date');
  }

  return {
    summary: `${riskLevel} RISK - Balloon mortgage requires careful planning`,
    details
  };
}

function analyzeExitStrategy(
  strategy: string, balloonPayment: number, futurePropertyValue: number,
  refinanceRate: number, balloonTerm: number, closingCosts: number, equity: number
): { summary: string; details: string[] } {
  const details = [];

  switch (strategy) {
    case 'refinance':
      const newLoanAmount = balloonPayment + closingCosts;
      const ltvForRefinance = (newLoanAmount / futurePropertyValue) * 100;
      details.push(`Refinance LTV: ${ltvForRefinance.toFixed(1)}%`);
      details.push(`New payment at ${(refinanceRate * 100).toFixed(2)}%: $${calculateMonthlyPayment(balloonPayment, refinanceRate, 30).toLocaleString()}`);
      if (ltvForRefinance > 80) {
        details.push('May require PMI or higher rates due to high LTV');
      }
      break;

    case 'sell':
      const netProceeds = futurePropertyValue - balloonPayment - (futurePropertyValue * 0.06); // 6% selling costs
      details.push(`Expected net proceeds: $${netProceeds.toLocaleString()}`);
      details.push(`Equity after sale: $${Math.max(0, netProceeds).toLocaleString()}`);
      if (netProceeds < 0) {
        details.push('WARNING: May need cash to complete sale');
      }
      break;

    case 'cash':
      details.push(`Cash required: $${balloonPayment.toLocaleString()}`);
      details.push('Eliminates refinancing and market risks');
      details.push('Requires significant liquidity planning');
      break;

    case 'extend':
      details.push('Loan extension depends on lender willingness');
      details.push('May involve rate adjustment and fees');
      details.push('Not guaranteed - have backup plan');
      break;
  }

  return {
    summary: `${strategy.toUpperCase()} strategy analysis`,
    details
  };
}

function calculateBreakEvenAppreciation(
  propertyValue: number, balloonPayment: number, totalSavings: number, years: number
): number {
  // Property value needed to break even: balloon payment + total savings
  const neededValue = balloonPayment + totalSavings;
  const requiredGrowth = neededValue / propertyValue;
  return Math.pow(requiredGrowth, 1 / years) - 1;
}

export default BalloonMortgageCalculator;