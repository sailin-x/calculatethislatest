import { Calculator } from '../../../types/calculator';

export const mortgagePaymentCalculator: Calculator = {
  id: 'mortgage-payment-calculator',
  title: 'Mortgage Payment Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate monthly mortgage payments, amortization schedules, and total loan costs',
  
  usageInstructions: [
    'Enter loan details including amount, interest rate, and term',
    'Set down payment and property information',
    'Input additional costs like taxes, insurance, and PMI',
    'Review comprehensive payment analysis and amortization',
    'Analyze total loan costs and payment breakdown'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Principal loan amount',
      defaultValue: 300000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Annual interest rate',
      defaultValue: 6.5,
      min: 0,
      max: 20
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Loan term in years',
      defaultValue: 30,
      min: 1,
      max: 50
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '60000',
      tooltip: 'Down payment amount',
      defaultValue: 60000,
      min: 0,
      max: 10000000
    },
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'currency',
      required: false,
      placeholder: '360000',
      tooltip: 'Total home purchase price',
      defaultValue: 360000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '4000',
      tooltip: 'Annual property taxes',
      defaultValue: 4000,
      min: 0,
      max: 50000
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200,
      min: 0,
      max: 10000
    },
    {
      id: 'pmi',
      label: 'Private Mortgage Insurance',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Monthly PMI payment (if applicable)',
      defaultValue: 0,
      min: 0,
      max: 1000
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Monthly HOA fees (if applicable)',
      defaultValue: 0,
      min: 0,
      max: 2000
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'principal-interest', label: 'Principal & Interest' },
        { value: 'interest-only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      tooltip: 'Type of mortgage payment structure',
      defaultValue: 'principal-interest'
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Additional monthly payment toward principal',
      defaultValue: 0,
      min: 0,
      max: 10000
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly principal and interest payment'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total monthly payment including taxes, insurance, etc.'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total interest paid over loan term'
    },
    {
      id: 'totalLoanCost',
      label: 'Total Loan Cost',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total cost including principal and interest'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'LTV ratio at loan origination'
    },
    {
      id: 'amortizationSchedule',
      label: 'Amortization Summary',
      type: 'text',
      explanation: 'Summary of principal vs interest over time'
    },
    {
      id: 'payoffTime',
      label: 'Payoff Time (with extra payments)',
      type: 'number',
      format: '0.0',
      explanation: 'Years to pay off loan with extra payments'
    },
    {
      id: 'interestSavings',
      label: 'Interest Savings (with extra payments)',
      type: 'currency',
      format: '$0,0',
      explanation: 'Interest saved by making extra payments'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for mortgage optimization'
    }
  ],

  formulas: [
    {
      id: 'mortgage-payment-analysis',
      name: 'Mortgage Payment Analysis',
      description: 'Calculate comprehensive mortgage payment analysis and amortization',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const interestRate = (inputs.interestRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const downPayment = inputs.downPayment || 0;
        const homePrice = inputs.homePrice || 0;
        const propertyTaxes = inputs.propertyTaxes || 0;
        const homeownersInsurance = inputs.homeownersInsurance || 0;
        const pmi = inputs.pmi || 0;
        const hoaFees = inputs.hoaFees || 0;
        const paymentType = inputs.paymentType || 'principal-interest';
        const extraPayment = inputs.extraPayment || 0;
        
        // Calculate monthly interest rate
        const monthlyRate = interestRate / 12;
        const totalPayments = loanTerm * 12;
        
        // Calculate monthly payment based on payment type
        let monthlyPayment = 0;
        if (paymentType === 'principal-interest') {
          monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
        } else if (paymentType === 'interest-only') {
          monthlyPayment = loanAmount * monthlyRate;
        } else if (paymentType === 'balloon') {
          // Simplified balloon payment calculation
          const interestOnlyPayment = loanAmount * monthlyRate;
          const principalPayment = loanAmount / totalPayments;
          monthlyPayment = interestOnlyPayment + principalPayment;
        }
        
        // Calculate total monthly payment
        const monthlyPropertyTaxes = propertyTaxes / 12;
        const monthlyHomeownersInsurance = homeownersInsurance / 12;
        const totalMonthlyPayment = monthlyPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + pmi + hoaFees;
        
        // Calculate total interest and loan cost
        const totalInterestPaid = calculateTotalInterest(loanAmount, monthlyRate, totalPayments, paymentType);
        const totalLoanCost = loanAmount + totalInterestPaid;
        
        // Calculate LTV
        const loanToValueRatio = homePrice > 0 ? (loanAmount / homePrice) * 100 : 0;
        
        // Calculate amortization summary
        const amortizationSummary = generateAmortizationSummary(loanAmount, monthlyRate, totalPayments, paymentType);
        
        // Calculate payoff time with extra payments
        const payoffTime = calculatePayoffTime(loanAmount, monthlyRate, monthlyPayment, extraPayment);
        
        // Calculate interest savings
        const interestSavings = calculateInterestSavings(
          loanAmount, monthlyRate, totalPayments, monthlyPayment, extraPayment
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          loanToValueRatio, totalInterestPaid, extraPayment, payoffTime
        );
        
        return {
          outputs: {
            monthlyPayment: Math.round(monthlyPayment),
            totalMonthlyPayment: Math.round(totalMonthlyPayment),
            totalInterestPaid: Math.round(totalInterestPaid),
            totalLoanCost: Math.round(totalLoanCost),
            loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
            amortizationSchedule: amortizationSummary,
            payoffTime: Math.round(payoffTime * 10) / 10,
            interestSavings: Math.round(interestSavings),
            recommendations
          },
          explanation: `Mortgage payment analysis complete. Monthly payment: $${monthlyPayment.toLocaleString()}. Total interest: $${totalInterestPaid.toLocaleString()}. LTV: ${loanToValueRatio.toFixed(1)}%.`,
          intermediateSteps: {
            monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
            totalPayments,
            monthlyPropertyTaxes: Math.round(monthlyPropertyTaxes),
            monthlyHomeownersInsurance: Math.round(monthlyHomeownersInsurance)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'loanAmount',
      type: 'required',
      message: 'Loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'interestRate',
      type: 'required',
      message: 'Interest rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'loanAmount',
      type: 'business',
      message: 'Loan amount plus down payment should equal home price',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePrice = allInputs?.homePrice || 0;
        const downPayment = allInputs?.downPayment || 0;
        if (homePrice === 0) return true; // Home price not provided
        return Math.abs((value + downPayment) - homePrice) < 1000; // Allow small rounding differences
      }
    }
  ],

  examples: [
    {
      title: 'Standard 30-Year Fixed Mortgage',
      description: 'Typical conventional mortgage with standard terms',
      inputs: {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 60000,
        homePrice: 360000,
        propertyTaxes: 4000,
        homeownersInsurance: 1200,
        pmi: 0,
        hoaFees: 0,
        paymentType: 'principal-interest',
        extraPayment: 0
      },
      expectedOutputs: {
        monthlyPayment: 1896,
        totalMonthlyPayment: 2230,
        totalInterestPaid: 382000,
        totalLoanCost: 682000,
        loanToValueRatio: 83.3,
        amortizationSchedule: 'Standard 30-year amortization with principal increasing over time',
        payoffTime: 30.0,
        interestSavings: 0,
        recommendations: 'Good LTV ratio. Consider making extra payments to reduce total interest cost.'
      }
    },
    {
      title: '15-Year Fixed Mortgage',
      description: 'Shorter term mortgage with higher payments but lower total cost',
      inputs: {
        loanAmount: 250000,
        interestRate: 6.0,
        loanTerm: 15,
        downPayment: 50000,
        homePrice: 300000,
        propertyTaxes: 3500,
        homeownersInsurance: 1000,
        pmi: 0,
        hoaFees: 0,
        paymentType: 'principal-interest',
        extraPayment: 100
      },
      expectedOutputs: {
        monthlyPayment: 2110,
        totalMonthlyPayment: 2402,
        totalInterestPaid: 130000,
        totalLoanCost: 380000,
        loanToValueRatio: 83.3,
        amortizationSchedule: '15-year amortization with faster principal reduction',
        payoffTime: 13.2,
        interestSavings: 15000,
        recommendations: 'Excellent choice! 15-year term saves significant interest. Extra payments will pay off loan even faster.'
      }
    }
  ]
};

// Helper functions for calculations
function calculateTotalInterest(
  principal: number, 
  monthlyRate: number, 
  totalPayments: number, 
  paymentType: string
): number {
  if (monthlyRate === 0 || totalPayments === 0) return 0;
  
  if (paymentType === 'interest-only') {
    return principal * monthlyRate * totalPayments;
  } else if (paymentType === 'balloon') {
    // Simplified calculation for balloon loans
    return principal * monthlyRate * totalPayments * 0.8; // Approximate
  } else {
    // Standard amortization
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return (monthlyPayment * totalPayments) - principal;
  }
}

function generateAmortizationSummary(
  principal: number, 
  monthlyRate: number, 
  totalPayments: number, 
  paymentType: string
): string {
  if (paymentType === 'interest-only') {
    return 'Interest-only payments with no principal reduction';
  } else if (paymentType === 'balloon') {
    return 'Balloon payment structure with partial amortization';
  } else {
    return 'Standard amortization with principal increasing over time';
  }
}

function calculatePayoffTime(
  principal: number, 
  monthlyRate: number, 
  monthlyPayment: number, 
  extraPayment: number
): number {
  if (monthlyRate === 0 || monthlyPayment <= 0) return 0;
  
  const totalMonthlyPayment = monthlyPayment + extraPayment;
  if (totalMonthlyPayment <= monthlyPayment) return 0; // No extra payment
  
  // Calculate payoff time with extra payments
  const monthlyPrincipalPayment = totalMonthlyPayment - (principal * monthlyRate);
  if (monthlyPrincipalPayment <= 0) return 999; // Never pay off
  
  return Math.log(totalMonthlyPayment / monthlyPrincipalPayment) / Math.log(1 + monthlyRate) / 12;
}

function calculateInterestSavings(
  principal: number, 
  monthlyRate: number, 
  totalPayments: number, 
  monthlyPayment: number, 
  extraPayment: number
): number {
  if (extraPayment <= 0) return 0;
  
  const originalInterest = calculateTotalInterest(principal, monthlyRate, totalPayments, 'principal-interest');
  const payoffTime = calculatePayoffTime(principal, monthlyRate, monthlyPayment, extraPayment);
  const newTotalPayments = payoffTime * 12;
  const newInterest = calculateTotalInterest(principal, monthlyRate, newTotalPayments, 'principal-interest');
  
  return Math.max(0, originalInterest - newInterest);
}

function generateRecommendations(
  ltv: number, 
  totalInterest: number, 
  extraPayment: number, 
  payoffTime: number
): string {
  const recommendations = [];
  
  if (ltv > 80) {
    recommendations.push('High LTV - consider larger down payment to avoid PMI.');
  } else if (ltv <= 60) {
    recommendations.push('Excellent LTV ratio - you have strong equity position.');
  }
  
  if (totalInterest > 100000) { // Simplified check for high interest
    recommendations.push('High total interest cost - consider shorter term or refinancing.');
  }
  
  if (extraPayment > 0) {
    recommendations.push('Great job making extra payments! This will save significant interest.');
  } else {
    recommendations.push('Consider making extra payments to reduce total interest cost.');
  }
  
  if (payoffTime < 25) {
    recommendations.push('Excellent! You\'ll pay off your mortgage faster than standard terms.');
  }
  
  return recommendations.join(' ');
}