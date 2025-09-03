import { Calculator } from '../../../types/calculator';

export const interestOnlyMortgageCalculator: Calculator = {
  id: 'interest-only-mortgage',
  title: 'Interest-Only Mortgage Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate interest-only mortgage payments, costs, and financial implications',
  
  usageInstructions: [
    'Enter loan information including amount, interest rate, and term',
    'Set interest-only period and payment frequency',
    'Input property details and additional payment information',
    'Review comprehensive payment analysis and cost comparisons',
    'Analyze financial implications and risk assessment'
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
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Total loan term in years',
      defaultValue: 30,
      min: 5,
      max: 50
    },
    {
      id: 'interestOnlyPeriod',
      label: 'Interest-Only Period (years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of years for interest-only payments',
      defaultValue: 10,
      min: 1,
      max: 20
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Biweekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      tooltip: 'Frequency of payments',
      defaultValue: 'monthly'
    },
    {
      id: 'additionalPrincipalPayment',
      label: 'Additional Principal Payment',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Additional principal payment during interest-only period',
      defaultValue: 0,
      min: 0,
      max: 10000
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: false,
      placeholder: '400000',
      tooltip: 'Current property value',
      defaultValue: 400000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'primary-residence', label: 'Primary Residence' },
        { value: 'secondary-home', label: 'Secondary Home' },
        { value: 'investment-property', label: 'Investment Property' }
      ],
      tooltip: 'Type of property',
      defaultValue: 'primary-residence'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Down payment amount',
      defaultValue: 100000,
      min: 0,
      max: 5000000
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Closing costs and fees',
      defaultValue: 8000,
      min: 0,
      max: 100000
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
      max: 500
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
      max: 1000
    }
  ],

  outputs: [
    {
      id: 'interestOnlyPayment',
      label: 'Interest-Only Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly payment during interest-only period'
    },
    {
      id: 'fullPayment',
      label: 'Full Payment (After IO Period)',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly payment after interest-only period ends'
    },
    {
      id: 'totalInterestCost',
      label: 'Total Interest Cost',
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
      id: 'principalBalanceAfterIO',
      label: 'Principal Balance After IO Period',
      type: 'currency',
      format: '$0,0',
      explanation: 'Remaining principal after interest-only period'
    },
    {
      id: 'paymentIncrease',
      label: 'Payment Increase',
      type: 'currency',
      format: '$0,0',
      explanation: 'Increase in payment after interest-only period'
    },
    {
      id: 'paymentIncreasePercentage',
      label: 'Payment Increase Percentage',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Percentage increase in payment after IO period'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total monthly payment including taxes, insurance, etc.'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'DTI ratio based on total monthly payment'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'LTV ratio at loan origination'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'number',
      format: '0.0',
      explanation: 'Years to break even compared to renting'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Risk assessment score (0-100)'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for interest-only mortgage'
    }
  ],

  formulas: [
    {
      id: 'interest-only-mortgage-analysis',
      name: 'Interest-Only Mortgage Analysis',
      description: 'Calculate comprehensive interest-only mortgage payments and financial analysis',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const interestRate = (inputs.interestRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const interestOnlyPeriod = inputs.interestOnlyPeriod || 10;
        const paymentFrequency = inputs.paymentFrequency || 'monthly';
        const additionalPrincipalPayment = inputs.additionalPrincipalPayment || 0;
        const propertyValue = inputs.propertyValue || 0;
        const downPayment = inputs.downPayment || 0;
        const closingCosts = inputs.closingCosts || 0;
        const propertyTaxes = inputs.propertyTaxes || 0;
        const homeownersInsurance = inputs.homeownersInsurance || 0;
        const pmi = inputs.pmi || 0;
        const hoaFees = inputs.hoaFees || 0;
        
        // Calculate monthly interest rate
        const monthlyRate = interestRate / 12;
        
        // Calculate interest-only payment
        const interestOnlyPayment = loanAmount * monthlyRate;
        
        // Calculate principal balance after interest-only period
        let principalBalanceAfterIO = loanAmount;
        if (additionalPrincipalPayment > 0) {
          const totalAdditionalPayments = additionalPrincipalPayment * 12 * interestOnlyPeriod;
          principalBalanceAfterIO = Math.max(0, loanAmount - totalAdditionalPayments);
        }
        
        // Calculate full payment after interest-only period
        const remainingTerm = loanTerm - interestOnlyPeriod;
        const fullPayment = remainingTerm > 0 ? 
          (principalBalanceAfterIO * monthlyRate * Math.pow(1 + monthlyRate, remainingTerm * 12)) / 
          (Math.pow(1 + monthlyRate, remainingTerm * 12) - 1) : 0;
        
        // Calculate payment increase
        const paymentIncrease = fullPayment - interestOnlyPayment;
        const paymentIncreasePercentage = interestOnlyPayment > 0 ? 
          (paymentIncrease / interestOnlyPayment) * 100 : 0;
        
        // Calculate total interest cost
        const interestOnlyInterest = interestOnlyPayment * 12 * interestOnlyPeriod;
        const fullPaymentInterest = calculateTotalInterest(principalBalanceAfterIO, monthlyRate, remainingTerm * 12);
        const totalInterestCost = interestOnlyInterest + fullPaymentInterest;
        
        // Calculate total loan cost
        const totalLoanCost = loanAmount + totalInterestCost;
        
        // Calculate total monthly payment
        const monthlyPropertyTaxes = propertyTaxes / 12;
        const monthlyHomeownersInsurance = homeownersInsurance / 12;
        const totalMonthlyPayment = interestOnlyPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + pmi + hoaFees;
        
        // Calculate ratios
        const debtToIncomeRatio = calculateDTI(totalMonthlyPayment, inputs);
        const loanToValueRatio = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
        
        // Calculate break-even point
        const breakEvenPoint = calculateBreakEvenPoint(
          totalMonthlyPayment, propertyValue, downPayment, closingCosts, inputs
        );
        
        // Calculate risk score
        const riskScore = calculateRiskScore(
          inputs, paymentIncreasePercentage, loanToValueRatio, debtToIncomeRatio
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          riskScore, paymentIncreasePercentage, loanToValueRatio, debtToIncomeRatio
        );
        
        return {
          outputs: {
            interestOnlyPayment: Math.round(interestOnlyPayment),
            fullPayment: Math.round(fullPayment),
            totalInterestCost: Math.round(totalInterestCost),
            totalLoanCost: Math.round(totalLoanCost),
            principalBalanceAfterIO: Math.round(principalBalanceAfterIO),
            paymentIncrease: Math.round(paymentIncrease),
            paymentIncreasePercentage: Math.round(paymentIncreasePercentage * 100) / 100,
            totalMonthlyPayment: Math.round(totalMonthlyPayment),
            debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
            loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
            breakEvenPoint: Math.round(breakEvenPoint * 10) / 10,
            riskScore,
            recommendations
          },
          explanation: `Interest-only mortgage analysis complete. Interest-only payment: $${interestOnlyPayment.toLocaleString()}. Payment increase after IO period: $${paymentIncrease.toLocaleString()} (${paymentIncreasePercentage.toFixed(1)}%).`,
          intermediateSteps: {
            monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
            interestOnlyInterest: Math.round(interestOnlyInterest),
            fullPaymentInterest: Math.round(fullPaymentInterest),
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
      field: 'interestOnlyPeriod',
      type: 'business',
      message: 'Interest-only period cannot exceed loan term',
      validator: (value: any, allInputs: Record<string, any>) => {
        const loanTerm = allInputs?.loanTerm || 0;
        return value <= loanTerm;
      }
    },
    {
      field: 'loanAmount',
      type: 'range',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value === null || value === undefined || (value >= 10000 && value <= 10000000)
    }
  ],

  examples: [
    {
      title: 'Standard Interest-Only Mortgage',
      description: 'A typical 30-year interest-only mortgage with 10-year IO period',
      inputs: {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        interestOnlyPeriod: 10,
        paymentFrequency: 'monthly',
        additionalPrincipalPayment: 0,
        propertyValue: 400000,
        downPayment: 100000,
        closingCosts: 8000,
        propertyTaxes: 4000,
        homeownersInsurance: 1200,
        pmi: 0,
        hoaFees: 0
      },
      expectedOutputs: {
        interestOnlyPayment: 1625,
        fullPayment: 1896,
        totalInterestCost: 389000,
        totalLoanCost: 689000,
        principalBalanceAfterIO: 300000,
        paymentIncrease: 271,
        paymentIncreasePercentage: 16.7,
        totalMonthlyPayment: 1958,
        debtToIncomeRatio: 23.5,
        loanToValueRatio: 75.0,
        breakEvenPoint: 4.2,
        riskScore: 45,
        recommendations: 'Moderate risk. Consider making additional principal payments during IO period to reduce payment shock.'
      }
    },
    {
      title: 'High-Value Interest-Only Mortgage',
      description: 'A luxury property with higher loan amount and longer IO period',
      inputs: {
        loanAmount: 800000,
        interestRate: 7.0,
        loanTerm: 30,
        interestOnlyPeriod: 15,
        paymentFrequency: 'monthly',
        additionalPrincipalPayment: 1000,
        propertyValue: 1000000,
        downPayment: 200000,
        closingCosts: 15000,
        propertyTaxes: 8000,
        homeownersInsurance: 2500,
        pmi: 0,
        hoaFees: 500
      },
      expectedOutputs: {
        interestOnlyPayment: 4667,
        fullPayment: 5324,
        totalInterestCost: 1120000,
        totalLoanCost: 1920000,
        principalBalanceAfterIO: 620000,
        paymentIncrease: 657,
        paymentIncreasePercentage: 14.1,
        totalMonthlyPayment: 5584,
        debtToIncomeRatio: 33.5,
        loanToValueRatio: 80.0,
        breakEvenPoint: 6.8,
        riskScore: 35,
        recommendations: 'Lower risk due to additional principal payments. Good strategy for high-income borrowers.'
      }
    }
  ]
};

// Helper functions for calculations
function calculateTotalInterest(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0 || totalPayments === 0) return 0;
  
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return (monthlyPayment * totalPayments) - principal;
}

function calculateDTI(totalMonthlyPayment: number, inputs: Record<string, any>): number {
  // Simplified DTI calculation - would need borrower income in real scenario
  const estimatedIncome = 100000; // Default assumption
  const monthlyIncome = estimatedIncome / 12;
  
  return monthlyIncome > 0 ? (totalMonthlyPayment / monthlyIncome) * 100 : 0;
}

function calculateBreakEvenPoint(
  totalMonthlyPayment: number, 
  propertyValue: number, 
  downPayment: number, 
  closingCosts: number, 
  inputs: Record<string, any>
): number {
  // Simplified break-even calculation
  const estimatedRent = propertyValue * 0.01 / 12; // 1% of property value per month
  const monthlySavings = estimatedRent - totalMonthlyPayment;
  
  if (monthlySavings <= 0) return 999; // Never break even
  
  const totalInvestment = downPayment + closingCosts;
  return totalInvestment / monthlySavings;
}

function calculateRiskScore(
  inputs: Record<string, any>, 
  paymentIncreasePercentage: number, 
  ltv: number, 
  dti: number
): number {
  let score = 50; // Base score
  
  // Payment increase risk
  if (paymentIncreasePercentage > 50) score += 30;
  else if (paymentIncreasePercentage > 30) score += 20;
  else if (paymentIncreasePercentage > 20) score += 15;
  else if (paymentIncreasePercentage > 10) score += 10;
  else score -= 10;
  
  // LTV risk
  if (ltv > 90) score += 25;
  else if (ltv > 80) score += 15;
  else if (ltv > 70) score += 10;
  else if (ltv < 60) score -= 10;
  
  // DTI risk
  if (dti > 43) score += 25;
  else if (dti > 36) score += 15;
  else if (dti > 28) score += 10;
  else if (dti < 20) score -= 10;
  
  // Interest-only period risk
  const interestOnlyPeriod = inputs.interestOnlyPeriod || 0;
  if (interestOnlyPeriod > 15) score += 20;
  else if (interestOnlyPeriod > 10) score += 15;
  else if (interestOnlyPeriod > 5) score += 10;
  
  return Math.min(100, Math.max(0, score));
}

function generateRecommendations(
  riskScore: number, 
  paymentIncreasePercentage: number, 
  ltv: number, 
  dti: number
): string {
  const recommendations = [];
  
  if (riskScore >= 70) {
    recommendations.push('High risk. Consider traditional mortgage or shorter IO period.');
  } else if (riskScore >= 50) {
    recommendations.push('Moderate risk. Consider making additional principal payments during IO period to reduce payment shock.');
  } else {
    recommendations.push('Lower risk. Good strategy for disciplined borrowers with stable income.');
  }
  
  if (paymentIncreasePercentage > 30) {
    recommendations.push('Prepare for significant payment increase after IO period.');
  }
  
  if (ltv > 80) {
    recommendations.push('High LTV increases risk. Consider larger down payment if possible.');
  }
  
  if (dti > 36) {
    recommendations.push('High DTI ratio. Ensure sufficient income to handle payment increase.');
  }
  
  return recommendations.join(' ');
}
