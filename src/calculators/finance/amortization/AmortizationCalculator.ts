import { Calculator, CalculatorInput, CalculatorOutput } from '../../../types/Calculator';

export const AmortizationCalculator: Calculator = {
  id: 'amortization-schedule',
  name: 'Amortization Schedule Calculator',
  description: 'Generate detailed amortization schedules showing principal and interest breakdown for loans with extra payment scenarios',
  category: 'finance',
  tags: ['amortization', 'loan', 'mortgage', 'schedule', 'principal', 'interest'],
  
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      min: 1000,
      max: 50000000,
      placeholder: '300000',
      description: 'Total loan principal amount'
    },
    {
      id: 'interestRate',
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 30,
      placeholder: '4.5',
      description: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      placeholder: '30',
      description: 'Length of the loan in years'
    },
    {
      id: 'startDate',
      label: 'Loan Start Date',
      type: 'date',
      required: false,
      defaultValue: new Date().toISOString().split('T')[0],
      description: 'Date when loan payments begin'
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '0',
      placeholder: '200',
      description: 'Additional principal payment each month'
    },
    {
      id: 'extraPaymentStart',
      label: 'Extra Payment Start Month',
      type: 'number',
      required: false,
      min: 1,
      defaultValue: '1',
      placeholder: '1',
      description: 'Month to start making extra payments (1 = first payment)'
    },
    {
      id: 'oneTimePayment',
      label: 'One-Time Extra Payment',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '0',
      placeholder: '10000',
      description: 'Single lump sum payment toward principal'
    },
    {
      id: 'oneTimePaymentMonth',
      label: 'One-Time Payment Month',
      type: 'number',
      required: false,
      min: 1,
      defaultValue: '12',
      placeholder: '12',
      description: 'Month to make the one-time payment'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: false,
      defaultValue: 'monthly',
      options: [
        { value: 'monthly', label: 'Monthly (12/year)' },
        { value: 'biweekly', label: 'Bi-weekly (26/year)' },
        { value: 'weekly', label: 'Weekly (52/year)' },
        { value: 'quarterly', label: 'Quarterly (4/year)' }
      ],
      description: 'How often payments are made'
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: false,
      defaultValue: 'monthly',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'daily', label: 'Daily' },
        { value: 'annually', label: 'Annually' }
      ],
      description: 'How often interest compounds'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      description: 'Required monthly payment (principal + interest)'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      description: 'Total interest paid over loan life'
    },
    {
      id: 'totalPayments',
      label: 'Total of All Payments',
      type: 'currency',
      description: 'Total amount paid including principal and interest'
    },
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'text',
      description: 'Date when loan will be fully paid off'
    },
    {
      id: 'interestSavings',
      label: 'Interest Savings (Extra Payments)',
      type: 'currency',
      description: 'Interest saved by making extra payments'
    },
    {
      id: 'timeSavings',
      label: 'Time Savings (Extra Payments)',
      type: 'text',
      description: 'Time saved by making extra payments'
    },
    {
      id: 'scheduleBreakdown',
      label: 'Payment Breakdown',
      type: 'text',
      description: 'Summary of payment allocation over loan term'
    },
    {
      id: 'yearlyTotals',
      label: 'Yearly Summary',
      type: 'text',
      description: 'Year-by-year payment and balance summary'
    }
  ],

  calculate: (inputs) => {
    const loanAmount = Number(inputs.loanAmount) || 0;
    const annualRate = (Number(inputs.interestRate) || 0) / 100;
    const loanTermYears = Number(inputs.loanTerm) || 30;
    const extraPayment = Number(inputs.extraPayment) || 0;
    const extraPaymentStart = Number(inputs.extraPaymentStart) || 1;
    const oneTimePayment = Number(inputs.oneTimePayment) || 0;
    const oneTimePaymentMonth = Number(inputs.oneTimePaymentMonth) || 12;
    const paymentFreq = inputs.paymentFrequency || 'monthly';
    const compoundingFreq = inputs.compoundingFrequency || 'monthly';

    // Calculate payment frequency multiplier
    const paymentFreqMap = {
      'monthly': 12,
      'biweekly': 26,
      'weekly': 52,
      'quarterly': 4
    };
    
    const paymentsPerYear = paymentFreqMap[paymentFreq] || 12;
    const totalPayments = loanTermYears * paymentsPerYear;
    
    // Calculate effective interest rate based on compounding
    let effectiveRate = annualRate;
    if (compoundingFreq === 'daily') {
      effectiveRate = Math.pow(1 + annualRate / 365, 365) - 1;
    }
    
    const periodRate = effectiveRate / paymentsPerYear;

    // Calculate standard monthly payment
    const monthlyPayment = loanAmount * 
      (periodRate * Math.pow(1 + periodRate, totalPayments)) /
      (Math.pow(1 + periodRate, totalPayments) - 1);

    // Generate amortization schedule
    const schedule = [];
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let paymentNumber = 1;
    let currentDate = new Date(inputs.startDate || new Date());

    // Track totals without extra payments for comparison
    let standardTotalInterest = 0;
    let standardBalance = loanAmount;
    
    // Calculate standard schedule for comparison
    for (let i = 1; i <= totalPayments; i++) {
      const standardInterest = standardBalance * periodRate;
      const standardPrincipal = monthlyPayment - standardInterest;
      standardBalance = Math.max(0, standardBalance - standardPrincipal);
      standardTotalInterest += standardInterest;
      
      if (standardBalance <= 0) break;
    }

    // Generate actual schedule with extra payments
    while (remainingBalance > 0.01 && paymentNumber <= totalPayments * 2) {
      const interestPayment = remainingBalance * periodRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      // Add extra monthly payment if applicable
      let extraPrincipal = 0;
      if (paymentNumber >= extraPaymentStart && extraPayment > 0) {
        extraPrincipal += extraPayment;
      }
      
      // Add one-time payment if applicable
      if (paymentNumber === oneTimePaymentMonth && oneTimePayment > 0) {
        extraPrincipal += oneTimePayment;
      }
      
      // Ensure we don't overpay
      const totalPrincipal = Math.min(principalPayment + extraPrincipal, remainingBalance);
      const actualPayment = interestPayment + totalPrincipal;
      
      remainingBalance -= totalPrincipal;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += totalPrincipal;

      schedule.push({
        paymentNumber,
        date: new Date(currentDate),
        payment: actualPayment,
        principal: totalPrincipal,
        interest: interestPayment,
        extraPrincipal,
        remainingBalance: Math.max(0, remainingBalance),
        cumulativeInterest: totalInterestPaid,
        cumulativePrincipal: totalPrincipalPaid
      });

      // Advance date based on payment frequency
      if (paymentFreq === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (paymentFreq === 'biweekly') {
        currentDate.setDate(currentDate.getDate() + 14);
      } else if (paymentFreq === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (paymentFreq === 'quarterly') {
        currentDate.setMonth(currentDate.getMonth() + 3);
      }

      paymentNumber++;
      
      if (remainingBalance <= 0.01) break;
    }

    const totalPaymentsAmount = totalInterestPaid + totalPrincipalPaid;
    const payoffDate = schedule[schedule.length - 1]?.date || new Date();
    
    // Calculate savings from extra payments
    const interestSavings = standardTotalInterest - totalInterestPaid;
    const paymentsWithoutExtra = Math.ceil(standardTotalInterest / monthlyPayment) + Math.ceil(loanAmount / monthlyPayment);
    const actualPayments = schedule.length;
    const paymentsSaved = Math.max(0, paymentsWithoutExtra - actualPayments);

    // Generate yearly summary
    const yearlyTotals = [];
    let currentYear = new Date(inputs.startDate || new Date()).getFullYear();
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    let yearlyPayments = 0;

    schedule.forEach((payment, index) => {
      const paymentYear = payment.date.getFullYear();
      
      if (paymentYear !== currentYear) {
        yearlyTotals.push({
          year: currentYear,
          payments: yearlyPayments,
          interest: yearlyInterest,
          principal: yearlyPrincipal,
          endingBalance: schedule[index - 1]?.remainingBalance || 0
        });
        
        currentYear = paymentYear;
        yearlyInterest = 0;
        yearlyPrincipal = 0;
        yearlyPayments = 0;
      }
      
      yearlyInterest += payment.interest;
      yearlyPrincipal += payment.principal;
      yearlyPayments += payment.payment;
    });

    // Add final year
    if (yearlyPayments > 0) {
      yearlyTotals.push({
        year: currentYear,
        payments: yearlyPayments,
        interest: yearlyInterest,
        principal: yearlyPrincipal,
        endingBalance: 0
      });
    }

    // Generate schedule breakdown summary
    const firstYearInterest = yearlyTotals[0]?.interest || 0;
    const firstYearPrincipal = yearlyTotals[0]?.principal || 0;
    const lastYearInterest = yearlyTotals[yearlyTotals.length - 1]?.interest || 0;
    const lastYearPrincipal = yearlyTotals[yearlyTotals.length - 1]?.principal || 0;

    const scheduleBreakdown = [
      `Total payments: ${schedule.length}`,
      `First year: ${((firstYearInterest / (firstYearInterest + firstYearPrincipal)) * 100).toFixed(1)}% interest, ${((firstYearPrincipal / (firstYearInterest + firstYearPrincipal)) * 100).toFixed(1)}% principal`,
      `Final year: ${((lastYearInterest / (lastYearInterest + lastYearPrincipal)) * 100).toFixed(1)}% interest, ${((lastYearPrincipal / (lastYearInterest + lastYearPrincipal)) * 100).toFixed(1)}% principal`,
      `Interest vs Principal: $${totalInterestPaid.toLocaleString()} vs $${loanAmount.toLocaleString()}`
    ];

    const yearlyTotalsSummary = yearlyTotals.map(year => 
      `${year.year}: $${year.payments.toLocaleString()} total, $${year.interest.toLocaleString()} interest, Balance: $${year.endingBalance.toLocaleString()}`
    );

    return {
      monthlyPayment: {
        value: monthlyPayment,
        formatted: `$${monthlyPayment.toLocaleString()}`,
        explanation: `${paymentFreq} payment of principal and interest at ${(annualRate * 100).toFixed(2)}% for ${loanTermYears} years`
      },
      totalInterest: {
        value: totalInterestPaid,
        formatted: `$${totalInterestPaid.toLocaleString()}`,
        explanation: `Total interest paid over ${schedule.length} payments`
      },
      totalPayments: {
        value: totalPaymentsAmount,
        formatted: `$${totalPaymentsAmount.toLocaleString()}`,
        explanation: `Total of all payments: $${loanAmount.toLocaleString()} principal + $${totalInterestPaid.toLocaleString()} interest`
      },
      payoffDate: {
        value: payoffDate.toISOString().split('T')[0],
        formatted: payoffDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        explanation: `Date when final payment is made (payment #${schedule.length})`
      },
      interestSavings: {
        value: interestSavings,
        formatted: `$${interestSavings.toLocaleString()}`,
        explanation: interestSavings > 0 
          ? `Interest saved by making extra payments of $${(extraPayment + (oneTimePayment > 0 ? oneTimePayment : 0)).toLocaleString()}`
          : 'No extra payments made'
      },
      timeSavings: {
        value: paymentsSaved,
        formatted: paymentsSaved > 0 
          ? `${Math.floor(paymentsSaved / paymentsPerYear)} years, ${paymentsSaved % paymentsPerYear} payments`
          : 'No time saved',
        explanation: paymentsSaved > 0 
          ? `Loan paid off ${paymentsSaved} payments early`
          : 'No extra payments to accelerate payoff'
      },
      scheduleBreakdown: {
        value: scheduleBreakdown.join('; '),
        formatted: scheduleBreakdown.map(item => `• ${item}`).join('\n'),
        explanation: 'Summary of payment allocation and loan structure'
      },
      yearlyTotals: {
        value: yearlyTotalsSummary.join('; '),
        formatted: yearlyTotalsSummary.map(item => `• ${item}`).join('\n'),
        explanation: 'Year-by-year breakdown of payments and remaining balance'
      }
    };
  },

  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'PMT = P × [r(1+r)^n] / [(1+r)^n - 1]',
      description: 'Standard loan payment formula where P=principal, r=periodic rate, n=total payments'
    },
    {
      name: 'Interest Payment',
      formula: 'Interest = Remaining Balance × Periodic Interest Rate',
      description: 'Interest portion of each payment'
    },
    {
      name: 'Principal Payment',
      formula: 'Principal = Monthly Payment - Interest Payment + Extra Payment',
      description: 'Principal portion of each payment including extra payments'
    }
  ],

  examples: [
    {
      name: 'Standard 30-Year Mortgage',
      description: 'Typical home mortgage with no extra payments',
      inputs: {
        loanAmount: '300000',
        interestRate: '4.5',
        loanTerm: '30',
        extraPayment: '0',
        oneTimePayment: '0',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      }
    },
    {
      name: 'Accelerated Payoff Strategy',
      description: 'Same mortgage with $200 extra monthly payment',
      inputs: {
        loanAmount: '300000',
        interestRate: '4.5',
        loanTerm: '30',
        extraPayment: '200',
        extraPaymentStart: '1',
        oneTimePayment: '10000',
        oneTimePaymentMonth: '12',
        paymentFrequency: 'monthly',
        compoundingFrequency: 'monthly'
      }
    }
  ]
};

export default AmortizationCalculator;