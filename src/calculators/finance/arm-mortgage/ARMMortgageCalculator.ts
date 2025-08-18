import { Calculator, CalculatorInput, CalculatorOutput } from '../../../types/Calculator';

export const ARMMortgageCalculator: Calculator = {
  id: 'arm-mortgage',
  name: 'Adjustable-Rate Mortgage (ARM) Calculator',
  description: 'Calculate payments, rate adjustments, and total costs for adjustable-rate mortgages with various ARM structures',
  category: 'finance',
  tags: ['mortgage', 'arm', 'adjustable rate', 'real estate', 'loan'],
  
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      min: 1000,
      max: 10000000,
      placeholder: '400000',
      description: 'Total mortgage loan amount'
    },
    {
      id: 'initialRate',
      label: 'Initial Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 20,
      placeholder: '3.5',
      description: 'Starting interest rate (teaser rate)'
    },
    {
      id: 'initialPeriod',
      label: 'Initial Rate Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      defaultValue: '5',
      placeholder: '5',
      description: 'Years the initial rate remains fixed'
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
      id: 'indexRate',
      label: 'Current Index Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      placeholder: '2.5',
      description: 'Current rate of the underlying index (e.g., SOFR, Treasury)'
    },
    {
      id: 'margin',
      label: 'Margin (%)',
      type: 'percentage',
      required: true,
      min: 0.5,
      max: 10,
      placeholder: '2.25',
      description: 'Fixed margin added to index rate'
    },
    {
      id: 'periodicCap',
      label: 'Periodic Rate Cap (%)',
      type: 'percentage',
      required: false,
      min: 0.25,
      max: 5,
      defaultValue: '2',
      placeholder: '2',
      description: 'Maximum rate increase per adjustment period'
    },
    {
      id: 'lifetimeCap',
      label: 'Lifetime Rate Cap (%)',
      type: 'percentage',
      required: false,
      min: 1,
      max: 10,
      defaultValue: '5',
      placeholder: '5',
      description: 'Maximum rate increase over loan life'
    },
    {
      id: 'adjustmentFrequency',
      label: 'Adjustment Frequency (years)',
      type: 'number',
      required: false,
      min: 1,
      max: 5,
      defaultValue: '1',
      placeholder: '1',
      description: 'How often rate adjusts after initial period'
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
    }
  ],

  outputs: [
    {
      id: 'initialPayment',
      label: 'Initial Monthly Payment',
      type: 'currency',
      description: 'Monthly payment during initial rate period'
    },
    {
      id: 'fullyIndexedRate',
      label: 'Fully Indexed Rate',
      type: 'percentage',
      description: 'Index rate + margin (rate after initial period)'
    },
    {
      id: 'maxPossibleRate',
      label: 'Maximum Possible Rate',
      type: 'percentage',
      description: 'Highest rate possible with lifetime cap'
    },
    {
      id: 'maxPossiblePayment',
      label: 'Maximum Possible Payment',
      type: 'currency',
      description: 'Highest monthly payment possible'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest (Projected)',
      type: 'currency',
      description: 'Total interest over loan life with expected rate changes'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule Summary',
      type: 'text',
      description: 'Summary of payment changes over loan term'
    },
    {
      id: 'rateAdjustments',
      label: 'Rate Adjustment Timeline',
      type: 'text',
      description: 'Timeline of expected rate adjustments'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      description: 'Analysis of ARM risks and benefits'
    }
  ],

  calculate: (inputs) => {
    const loanAmount = Number(inputs.loanAmount) || 0;
    const initialRate = (Number(inputs.initialRate) || 0) / 100;
    const initialPeriod = Number(inputs.initialPeriod) || 5;
    const loanTerm = Number(inputs.loanTerm) || 30;
    const indexRate = (Number(inputs.indexRate) || 0) / 100;
    const margin = (Number(inputs.margin) || 0) / 100;
    const periodicCap = (Number(inputs.periodicCap) || 2) / 100;
    const lifetimeCap = (Number(inputs.lifetimeCap) || 5) / 100;
    const adjustmentFreq = Number(inputs.adjustmentFrequency) || 1;
    const indexTrend = (Number(inputs.expectedIndexTrend) || 0.5) / 100;

    // Calculate initial monthly payment
    const monthlyInitialRate = initialRate / 12;
    const totalPayments = loanTerm * 12;
    const initialPayment = loanAmount * 
      (monthlyInitialRate * Math.pow(1 + monthlyInitialRate, totalPayments)) /
      (Math.pow(1 + monthlyInitialRate, totalPayments) - 1);

    // Calculate fully indexed rate
    const fullyIndexedRate = indexRate + margin;

    // Calculate maximum possible rate
    const maxPossibleRate = initialRate + lifetimeCap;

    // Calculate maximum possible payment
    const maxMonthlyRate = maxPossibleRate / 12;
    const maxPossiblePayment = loanAmount * 
      (maxMonthlyRate * Math.pow(1 + maxMonthlyRate, totalPayments)) /
      (Math.pow(1 + maxMonthlyRate, totalPayments) - 1);

    // Simulate payment schedule over loan term
    let currentBalance = loanAmount;
    let currentRate = initialRate;
    let totalInterest = 0;
    const paymentHistory = [];
    let currentPayment = initialPayment;

    for (let year = 1; year <= loanTerm; year++) {
      // Adjust rate if past initial period
      if (year > initialPeriod && (year - initialPeriod - 1) % adjustmentFreq === 0) {
        const projectedIndex = indexRate + (indexTrend * (year - initialPeriod));
        let newRate = projectedIndex + margin;
        
        // Apply periodic cap
        const maxIncrease = currentRate + periodicCap;
        newRate = Math.min(newRate, maxIncrease);
        
        // Apply lifetime cap
        const maxLifetimeRate = initialRate + lifetimeCap;
        newRate = Math.min(newRate, maxLifetimeRate);
        
        currentRate = Math.max(newRate, 0.01); // Minimum 1% rate
        
        // Recalculate payment with new rate and remaining balance
        const remainingYears = loanTerm - year + 1;
        const remainingPayments = remainingYears * 12;
        const monthlyRate = currentRate / 12;
        
        if (remainingPayments > 0 && currentBalance > 0) {
          currentPayment = currentBalance * 
            (monthlyRate * Math.pow(1 + monthlyRate, remainingPayments)) /
            (Math.pow(1 + monthlyRate, remainingPayments) - 1);
        }
      }

      // Calculate annual interest and principal
      const annualInterest = currentBalance * currentRate;
      const annualPrincipal = (currentPayment * 12) - annualInterest;
      
      totalInterest += annualInterest;
      currentBalance = Math.max(0, currentBalance - annualPrincipal);

      paymentHistory.push({
        year,
        rate: currentRate,
        payment: currentPayment,
        balance: currentBalance
      });

      if (currentBalance <= 0) break;
    }

    // Generate payment schedule summary
    const schedulePoints = [
      `Years 1-${initialPeriod}: $${initialPayment.toLocaleString()} at ${(initialRate * 100).toFixed(2)}%`,
      `Year ${initialPeriod + 1}+: Adjusts based on ${indexRate * 100}% index + ${margin * 100}% margin`,
      `Maximum payment: $${maxPossiblePayment.toLocaleString()} at ${(maxPossibleRate * 100).toFixed(2)}%`
    ];

    // Generate rate adjustment timeline
    const adjustmentTimeline = [];
    adjustmentTimeline.push(`Initial rate: ${(initialRate * 100).toFixed(2)}% for ${initialPeriod} years`);
    adjustmentTimeline.push(`First adjustment: Year ${initialPeriod + 1}`);
    adjustmentTimeline.push(`Subsequent adjustments: Every ${adjustmentFreq} year(s)`);
    adjustmentTimeline.push(`Rate caps: ${(periodicCap * 100)}% per period, ${(lifetimeCap * 100)}% lifetime`);

    // Generate risk assessment
    const riskFactors = [];
    const paymentIncrease = ((maxPossiblePayment - initialPayment) / initialPayment) * 100;
    
    if (paymentIncrease > 50) {
      riskFactors.push('HIGH RISK: Payment could increase by more than 50%');
    } else if (paymentIncrease > 25) {
      riskFactors.push('MODERATE RISK: Payment could increase by 25-50%');
    } else {
      riskFactors.push('LOW RISK: Payment increase limited to under 25%');
    }

    if (fullyIndexedRate > initialRate) {
      riskFactors.push(`Rate likely to increase: Current index + margin (${(fullyIndexedRate * 100).toFixed(2)}%) > initial rate`);
    } else {
      riskFactors.push(`Rate may decrease: Current index + margin (${(fullyIndexedRate * 100).toFixed(2)}%) < initial rate`);
    }

    if (initialPeriod >= 7) {
      riskFactors.push('BENEFIT: Long initial rate period provides payment stability');
    } else {
      riskFactors.push('CAUTION: Short initial rate period means early payment changes');
    }

    return {
      initialPayment: {
        value: initialPayment,
        formatted: `$${initialPayment.toLocaleString()}`,
        explanation: `Monthly payment for first ${initialPeriod} years at ${(initialRate * 100).toFixed(2)}% rate`
      },
      fullyIndexedRate: {
        value: fullyIndexedRate * 100,
        formatted: `${(fullyIndexedRate * 100).toFixed(2)}%`,
        explanation: `Current index rate (${(indexRate * 100).toFixed(2)}%) + margin (${(margin * 100).toFixed(2)}%)`
      },
      maxPossibleRate: {
        value: maxPossibleRate * 100,
        formatted: `${(maxPossibleRate * 100).toFixed(2)}%`,
        explanation: `Initial rate (${(initialRate * 100).toFixed(2)}%) + lifetime cap (${(lifetimeCap * 100)}%)`
      },
      maxPossiblePayment: {
        value: maxPossiblePayment,
        formatted: `$${maxPossiblePayment.toLocaleString()}`,
        explanation: `Maximum monthly payment at highest possible rate of ${(maxPossibleRate * 100).toFixed(2)}%`
      },
      totalInterestPaid: {
        value: totalInterest,
        formatted: `$${totalInterest.toLocaleString()}`,
        explanation: `Projected total interest over ${loanTerm} years with expected rate changes`
      },
      paymentSchedule: {
        value: schedulePoints.join('; '),
        formatted: schedulePoints.map(p => `• ${p}`).join('\n'),
        explanation: 'Summary of payment structure over loan term'
      },
      rateAdjustments: {
        value: adjustmentTimeline.join('; '),
        formatted: adjustmentTimeline.map(a => `• ${a}`).join('\n'),
        explanation: 'Timeline and rules for rate adjustments'
      },
      riskAssessment: {
        value: riskFactors.join('; '),
        formatted: riskFactors.map(r => `• ${r}`).join('\n'),
        explanation: 'Analysis of ARM risks and benefits for this loan structure'
      }
    };
  },

  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'PMT = P × [r(1+r)^n] / [(1+r)^n - 1]',
      description: 'Standard mortgage payment formula where P=principal, r=monthly rate, n=total payments'
    },
    {
      name: 'Fully Indexed Rate',
      formula: 'Fully Indexed Rate = Index Rate + Margin',
      description: 'The rate ARM adjusts to after initial period'
    },
    {
      name: 'Adjusted Rate with Caps',
      formula: 'New Rate = MIN(Index + Margin, Previous Rate + Periodic Cap, Initial Rate + Lifetime Cap)',
      description: 'Rate calculation considering all applicable caps'
    }
  ],

  examples: [
    {
      name: '5/1 ARM - Conservative',
      description: '5-year initial period, annual adjustments, conservative caps',
      inputs: {
        loanAmount: '400000',
        initialRate: '3.5',
        initialPeriod: '5',
        loanTerm: '30',
        indexRate: '2.5',
        margin: '2.25',
        periodicCap: '2',
        lifetimeCap: '5',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.5'
      }
    },
    {
      name: '7/1 ARM - Aggressive',
      description: '7-year initial period with higher caps',
      inputs: {
        loanAmount: '600000',
        initialRate: '3.25',
        initialPeriod: '7',
        loanTerm: '30',
        indexRate: '3.0',
        margin: '2.5',
        periodicCap: '2.5',
        lifetimeCap: '6',
        adjustmentFrequency: '1',
        expectedIndexTrend: '0.75'
      }
    }
  ]
};

export default ARMMortgageCalculator;