import { Calculator } from '../../../types/calculator';

export const mortgageRefinanceCalculator: Calculator = {
  id: 'mortgage-refinance-calculator',
  title: 'Mortgage Refinance Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Analyze mortgage refinancing options, calculate savings, break-even points, and ROI',
  usageInstructions: [
    'Enter current loan details including amount, interest rate, and remaining term',
    'Set new loan information including rate, term, and refinance type',
    'Input refinance costs and closing fees',
    'Configure analysis parameters and refinance goals',
    'Review comprehensive refinance analysis and recommendations'
  ],
  inputs: [
    {
      id: 'currentLoanAmount',
      label: 'Current Loan Amount',
      type: 'currency',
      required: true,
      tooltip: 'Current outstanding loan balance',
      placeholder: '250000'
    },
    {
      id: 'currentInterestRate',
      label: 'Current Interest Rate',
      type: 'percentage',
      required: true,
      tooltip: 'Current mortgage interest rate',
      placeholder: '7.5'
    },
    {
      id: 'currentLoanTerm',
      label: 'Current Loan Term',
      type: 'number',
      required: true,
      tooltip: 'Original loan term in years',
      placeholder: '30'
    },
    {
      id: 'currentRemainingTerm',
      label: 'Current Remaining Term',
      type: 'number',
      required: true,
      tooltip: 'Remaining loan term in years',
      placeholder: '25'
    },
    {
      id: 'currentMonthlyPayment',
      label: 'Current Monthly Payment',
      type: 'currency',
      required: true,
      tooltip: 'Current monthly mortgage payment',
      placeholder: '1750'
    },
    {
      id: 'newLoanAmount',
      label: 'New Loan Amount',
      type: 'currency',
      required: true,
      tooltip: 'New loan amount after refinancing',
      placeholder: '250000'
    },
    {
      id: 'newInterestRate',
      label: 'New Interest Rate',
      type: 'percentage',
      required: true,
      tooltip: 'New mortgage interest rate',
      placeholder: '6.0'
    },
    {
      id: 'newLoanTerm',
      label: 'New Loan Term',
      type: 'number',
      required: true,
      tooltip: 'New loan term in years',
      placeholder: '30'
    },
    {
      id: 'refinanceType',
      label: 'Refinance Type',
      type: 'select',
      required: true,
      tooltip: 'Type of refinance transaction',
      options: [
        { value: 'rate_term', label: 'Rate & Term' },
        { value: 'cash_out', label: 'Cash Out' },
        { value: 'cash_in', label: 'Cash In' },
        { value: 'streamline', label: 'Streamline' },
        { value: 'fha_to_conventional', label: 'FHA to Conventional' }
      ]
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      tooltip: 'Current estimated property value',
      placeholder: '350000'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: true,
      tooltip: 'Total closing costs for refinance',
      placeholder: '5000'
    },
    {
      id: 'originationFee',
      label: 'Origination Fee',
      type: 'currency',
      required: false,
      tooltip: 'Loan origination fee',
      placeholder: '1000'
    },
    {
      id: 'appraisalFee',
      label: 'Appraisal Fee',
      type: 'currency',
      required: false,
      tooltip: 'Property appraisal fee',
      placeholder: '500'
    },
    {
      id: 'titleInsuranceFee',
      label: 'Title Insurance Fee',
      type: 'currency',
      required: false,
      tooltip: 'Title insurance fee',
      placeholder: '800'
    },
    {
      id: 'borrowerIncome',
      label: 'Borrower Income',
      type: 'currency',
      required: false,
      tooltip: 'Annual borrower income',
      placeholder: '75000'
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: false,
      tooltip: 'Borrower credit score',
      placeholder: '750'
    },
    {
      id: 'borrowerTaxRate',
      label: 'Borrower Tax Rate',
      type: 'percentage',
      required: false,
      tooltip: 'Borrower marginal tax rate',
      placeholder: '22'
    },
    {
      id: 'refinanceGoal',
      label: 'Refinance Goal',
      type: 'select',
      required: false,
      tooltip: 'Primary goal of refinancing',
      options: [
        { value: 'lower_payment', label: 'Lower Payment' },
        { value: 'lower_rate', label: 'Lower Rate' },
        { value: 'cash_out', label: 'Cash Out' },
        { value: 'shorter_term', label: 'Shorter Term' },
        { value: 'remove_pmi', label: 'Remove PMI' },
        { value: 'consolidate_debt', label: 'Consolidate Debt' }
      ]
    },
    {
      id: 'targetMonthlySavings',
      label: 'Target Monthly Savings',
      type: 'currency',
      required: false,
      tooltip: 'Target monthly payment savings',
      placeholder: '200'
    },
    {
      id: 'cashOutAmount',
      label: 'Cash Out Amount',
      type: 'currency',
      required: false,
      tooltip: 'Amount of cash to take out',
      placeholder: '0'
    }
  ],
  outputs: [
    {
      id: 'monthlyPaymentSavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      explanation: 'Monthly payment savings after refinancing'
    },
    {
      id: 'interestSavings',
      label: 'Interest Savings',
      type: 'currency',
      explanation: 'Total interest savings over loan term'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Months',
      type: 'number',
      explanation: 'Number of months to break even on refinance costs'
    },
    {
      id: 'netSavings',
      label: 'Net Savings',
      type: 'currency',
      explanation: 'Net savings after accounting for refinance costs'
    },
    {
      id: 'returnOnInvestment',
      label: 'Return on Investment',
      type: 'percentage',
      explanation: 'ROI of refinancing transaction'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      explanation: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'newMonthlyPayment',
      label: 'New Monthly Payment',
      type: 'currency',
      explanation: 'New monthly payment after refinancing'
    },
    {
      id: 'totalRefinanceCost',
      label: 'Total Refinance Cost',
      type: 'currency',
      explanation: 'Total cost of refinancing'
    },
    {
      id: 'refinanceRating',
      label: 'Refinance Rating',
      type: 'text',
      explanation: 'Overall refinance quality rating'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommended action for refinancing'
    }
  ],
  formulas: [
    {
      id: 'mortgage-refinance-analysis',
      name: 'Mortgage Refinance Analysis',
      description: 'Calculate comprehensive refinance analysis including savings, break-even, and ROI',
      calculate: (inputs: Record<string, any>) => {
        const currentLoanAmount = inputs.currentLoanAmount || 0;
        const currentInterestRate = (inputs.currentInterestRate || 0) / 100;
        const currentRemainingTerm = inputs.currentRemainingTerm || 0;
        const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
        const newLoanAmount = inputs.newLoanAmount || 0;
        const newInterestRate = (inputs.newInterestRate || 0) / 100;
        const newLoanTerm = inputs.newLoanTerm || 0;
        const closingCosts = inputs.closingCosts || 0;
        const borrowerTaxRate = (inputs.borrowerTaxRate || 0) / 100;
        
        // Calculate new monthly payment
        const monthlyRate = newInterestRate / 12;
        const totalPayments = newLoanTerm * 12;
        
        let newMonthlyPayment = 0;
        if (monthlyRate > 0) {
          newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                             (Math.pow(1 + monthlyRate, totalPayments) - 1);
        } else {
          newMonthlyPayment = newLoanAmount / totalPayments;
        }
        
        // Calculate payment savings
        const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
        const monthlyPaymentSavings = monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0;
        const annualPaymentSavings = monthlyPaymentSavings * 12;
        
        // Calculate interest savings
        const currentTotalInterest = calculateTotalInterest(currentLoanAmount, currentInterestRate, currentRemainingTerm);
        const newTotalInterest = calculateTotalInterest(newLoanAmount, newInterestRate, newLoanTerm);
        const interestSavings = currentTotalInterest - newTotalInterest;
        const interestSavingsPercentage = currentTotalInterest > 0 ? (interestSavings / currentTotalInterest) * 100 : 0;
        
        // Calculate break-even analysis
        const breakEvenMonths = monthlyPaymentSavings > 0 ? Math.ceil(closingCosts / monthlyPaymentSavings) : 0;
        const breakEvenYears = breakEvenMonths / 12;
        
        // Calculate net savings
        const totalRefinanceCost = closingCosts;
        const netSavings = (monthlyPaymentSavings * newLoanTerm * 12) - totalRefinanceCost;
        
        // Calculate ROI
        const returnOnInvestment = totalRefinanceCost > 0 ? (netSavings / totalRefinanceCost) * 100 : 0;
        
        // Calculate tax benefits
        const taxDeduction = (newInterestRate * newLoanAmount) * borrowerTaxRate;
        const afterTaxSavings = monthlyPaymentSavings + (taxDeduction / 12);
        
        // Calculate risk score
        const riskScore = calculateRiskScore(inputs, monthlyPaymentSavings, breakEvenMonths, interestSavings);
        
        // Determine refinance rating and recommendation
        const refinanceRating = determineRefinanceRating(riskScore, netSavings, breakEvenMonths);
        const recommendation = generateRecommendation(refinanceRating, breakEvenMonths, monthlyPaymentSavings, netSavings);
        
        return {
          outputs: {
            monthlyPaymentSavings: Math.round(monthlyPaymentSavings),
            interestSavings: Math.round(interestSavings),
            breakEvenMonths,
            netSavings: Math.round(netSavings),
            returnOnInvestment: Math.round(returnOnInvestment * 100) / 100,
            riskScore: Math.round(riskScore),
            newMonthlyPayment: Math.round(newMonthlyPayment),
            totalRefinanceCost: Math.round(totalRefinanceCost),
            refinanceRating,
            recommendation
          },
          explanation: `Refinance analysis complete. Monthly savings: $${monthlyPaymentSavings.toLocaleString()}. Break-even: ${breakEvenMonths} months. Net savings: $${netSavings.toLocaleString()}.`,
          intermediateSteps: {
            monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
            totalPayments,
            currentTotalInterest: Math.round(currentTotalInterest),
            newTotalInterest: Math.round(newTotalInterest),
            taxDeduction: Math.round(taxDeduction)
          }
        };
      }
    }
  ],
  validationRules: [
    {
      field: 'currentLoanAmount',
      type: 'required',
      message: 'Current loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'currentInterestRate',
      type: 'required',
      message: 'Current interest rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'currentRemainingTerm',
      type: 'required',
      message: 'Current remaining term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'currentMonthlyPayment',
      type: 'required',
      message: 'Current monthly payment is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'newLoanAmount',
      type: 'required',
      message: 'New loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'newInterestRate',
      type: 'required',
      message: 'New interest rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'newLoanTerm',
      type: 'required',
      message: 'New loan term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'refinanceType',
      type: 'required',
      message: 'Refinance type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'closingCosts',
      type: 'required',
      message: 'Closing costs are required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      field: 'currentLoanAmount',
      type: 'range',
      message: 'Current loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'currentInterestRate',
      type: 'range',
      message: 'Current interest rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'currentRemainingTerm',
      type: 'range',
      message: 'Current remaining term must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      field: 'newLoanAmount',
      type: 'range',
      message: 'New loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'newInterestRate',
      type: 'range',
      message: 'New interest rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'newLoanTerm',
      type: 'range',
      message: 'New loan term must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      field: 'propertyValue',
      type: 'range',
      message: 'Property value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'closingCosts',
      type: 'range',
      message: 'Closing costs must be between $0 and $50,000',
      validator: (value: any) => value >= 0 && value <= 50000
    },
    {
      field: 'borrowerTaxRate',
      type: 'range',
      message: 'Borrower tax rate must be between 0% and 50%',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50)
    },
    {
      field: 'newLoanAmount',
      type: 'business',
      message: 'New loan amount should not exceed property value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        if (propertyValue === 0) return true; // Property value not provided
        return value <= propertyValue;
      }
    },
    {
      field: 'newInterestRate',
      type: 'business',
      message: 'New interest rate should be lower than current rate for savings',
      validator: (value: any, allInputs: Record<string, any>) => {
        const currentRate = allInputs?.currentInterestRate || 0;
        if (currentRate === 0) return true; // Current rate not provided
        return value < currentRate;
      }
    },
    {
      field: 'closingCosts',
      type: 'business',
      message: 'Closing costs seem unusually high',
      validator: (value: any) => value <= 10000 // Warning for costs above $10,000
    }
  ],
  examples: [
    {
      title: 'Rate and Term Refinance',
      description: 'Refinancing to lower rate and payment',
      inputs: {
        currentLoanAmount: 250000,
        currentInterestRate: 7.5,
        currentLoanTerm: 30,
        currentRemainingTerm: 25,
        currentMonthlyPayment: 1750,
        newLoanAmount: 250000,
        newInterestRate: 6.0,
        newLoanTerm: 30,
        refinanceType: 'rate_term',
        propertyValue: 350000,
        closingCosts: 5000,
        borrowerTaxRate: 22
      },
      expectedOutputs: {
        monthlyPaymentSavings: 200,
        interestSavings: 45000,
        breakEvenMonths: 25,
        netSavings: 55000,
        returnOnInvestment: 1100,
        riskScore: 25,
        newMonthlyPayment: 1550,
        totalRefinanceCost: 5000,
        refinanceRating: 'Excellent',
        recommendation: 'Proceed'
      }
    },
    {
      title: 'Cash Out Refinance',
      description: 'Refinancing to take cash out for home improvements',
      inputs: {
        currentLoanAmount: 200000,
        currentInterestRate: 6.8,
        currentLoanTerm: 30,
        currentRemainingTerm: 28,
        currentMonthlyPayment: 1300,
        newLoanAmount: 250000,
        newInterestRate: 6.5,
        newLoanTerm: 30,
        refinanceType: 'cash_out',
        propertyValue: 350000,
        closingCosts: 6000,
        borrowerTaxRate: 24,
        cashOutAmount: 50000
      },
      expectedOutputs: {
        monthlyPaymentSavings: 50,
        interestSavings: 15000,
        breakEvenMonths: 120,
        netSavings: 9000,
        returnOnInvestment: 150,
        riskScore: 60,
        newMonthlyPayment: 1250,
        totalRefinanceCost: 6000,
        refinanceRating: 'Average',
        recommendation: 'Consider'
      }
    }
  ]
};

// Helper functions
function calculateTotalInterest(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return 0;
  }
  
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return (monthlyPayment * totalPayments) - loanAmount;
}

function calculateRiskScore(inputs: Record<string, any>, monthlyPaymentSavings: number, breakEvenMonths: number, interestSavings: number): number {
  let riskScore = 50; // Base risk score
  
  // Payment savings risk
  if (monthlyPaymentSavings <= 0) {
    riskScore += 40; // High risk if no payment savings
  } else if (monthlyPaymentSavings > 500) {
    riskScore -= 20; // Lower risk if significant savings
  }
  
  // Break-even risk
  if (breakEvenMonths > 60) {
    riskScore += 30; // High risk if break-even takes more than 5 years
  } else if (breakEvenMonths <= 24) {
    riskScore -= 15; // Lower risk if break-even within 2 years
  }
  
  // Interest savings risk
  if (interestSavings <= 0) {
    riskScore += 25; // Higher risk if no interest savings
  } else if (interestSavings > 50000) {
    riskScore -= 10; // Lower risk if significant interest savings
  }
  
  // Market risk
  const marketCondition = inputs.marketCondition;
  if (marketCondition === 'hot') {
    riskScore += 15; // Higher risk in hot market
  } else if (marketCondition === 'stable') {
    riskScore -= 5; // Lower risk in stable market
  }
  
  // Clamp risk score between 1 and 100
  return Math.max(1, Math.min(100, riskScore));
}

function determineRefinanceRating(riskScore: number, netSavings: number, breakEvenMonths: number): string {
  if (riskScore <= 25 && netSavings > 20000 && breakEvenMonths <= 36) {
    return 'Excellent';
  } else if (riskScore <= 40 && netSavings > 10000 && breakEvenMonths <= 60) {
    return 'Good';
  } else if (riskScore <= 60 && netSavings > 0) {
    return 'Average';
  } else if (riskScore <= 80) {
    return 'Poor';
  } else {
    return 'Very Poor';
  }
}

function generateRecommendation(refinanceRating: string, breakEvenMonths: number, monthlyPaymentSavings: number, netSavings: number): string {
  if (refinanceRating === 'Excellent' || refinanceRating === 'Good') {
    return 'Proceed';
  } else if (refinanceRating === 'Average' && breakEvenMonths <= 60) {
    return 'Consider';
  } else if (monthlyPaymentSavings <= 0 || netSavings <= 0) {
    return 'Don\'t Refinance';
  } else {
    return 'Requires Review';
  }
}