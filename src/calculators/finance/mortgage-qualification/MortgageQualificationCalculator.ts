import { Calculator } from '../../../types/calculator';

export const mortgageQualificationCalculator: Calculator = {
  id: 'mortgage-qualification-calculator',
  title: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate mortgage qualification based on income, debt, credit score, and property details',
  
  usageInstructions: [
    'Enter borrower income, employment, and credit information',
    'Input property details and loan terms',
    'Set down payment and debt information',
    'Review qualification analysis and recommendations',
    'Analyze debt-to-income ratios and housing expense ratios'
  ],

  inputs: [
    {
      id: 'borrowerIncome',
      label: 'Borrower Annual Income',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Primary borrower\'s annual gross income',
      defaultValue: 75000,
      min: 10000,
      max: 1000000
    },
    {
      id: 'coBorrowerIncome',
      label: 'Co-Borrower Annual Income',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Co-borrower\'s annual gross income (if applicable)',
      defaultValue: 0,
      min: 0,
      max: 1000000
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      placeholder: '750',
      tooltip: 'Primary borrower\'s credit score',
      defaultValue: 750,
      min: 300,
      max: 850
    },
    {
      id: 'coBorrowerCreditScore',
      label: 'Co-Borrower Credit Score',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Co-borrower\'s credit score (if applicable)',
      defaultValue: 0,
      min: 300,
      max: 850
    },
    {
      id: 'borrowerEmploymentType',
      label: 'Borrower Employment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      tooltip: 'Primary borrower\'s employment status',
      defaultValue: 'employed'
    },
    {
      id: 'borrowerEmploymentLength',
      label: 'Employment Length (years)',
      type: 'number',
      required: false,
      placeholder: '5',
      tooltip: 'Length of current employment',
      defaultValue: 5,
      min: 0,
      max: 50
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Purchase price or appraised value',
      defaultValue: 300000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '240000',
      tooltip: 'Requested loan amount',
      defaultValue: 240000,
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
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: false,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      tooltip: 'Type of mortgage loan',
      defaultValue: 'conventional'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      placeholder: '60000',
      tooltip: 'Down payment amount',
      defaultValue: 60000,
      min: 0,
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
      id: 'propertyInsurance',
      label: 'Annual Property Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance',
      defaultValue: 1200,
      min: 0,
      max: 10000
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
      id: 'creditCardDebt',
      label: 'Monthly Credit Card Payments',
      type: 'currency',
      required: false,
      placeholder: '300',
      tooltip: 'Total monthly credit card payments',
      defaultValue: 300,
      min: 0,
      max: 10000
    },
    {
      id: 'autoLoanDebt',
      label: 'Monthly Auto Loan Payments',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Total monthly auto loan payments',
      defaultValue: 400,
      min: 0,
      max: 10000
    },
    {
      id: 'studentLoanDebt',
      label: 'Monthly Student Loan Payments',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Total monthly student loan payments',
      defaultValue: 200,
      min: 0,
      max: 10000
    },
    {
      id: 'otherDebt',
      label: 'Other Monthly Debt Payments',
      type: 'currency',
      required: false,
      placeholder: '100',
      tooltip: 'Other monthly debt payments',
      defaultValue: 100,
      min: 0,
      max: 10000
    }
  ],

  outputs: [
    {
      id: 'totalIncome',
      label: 'Total Annual Income',
      type: 'currency',
      format: '$0,0',
      explanation: 'Combined annual income of all borrowers'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'currency',
      format: '$0,0',
      explanation: 'Combined monthly income of all borrowers'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Mortgage Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Principal, interest, taxes, and insurance'
    },
    {
      id: 'totalMonthlyDebt',
      label: 'Total Monthly Debt',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total monthly debt payments including mortgage'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Total debt payments as percentage of gross income'
    },
    {
      id: 'housingExpenseRatio',
      label: 'Housing Expense Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Housing costs as percentage of gross income'
    },
    {
      id: 'qualificationStatus',
      label: 'Qualification Status',
      type: 'text',
      explanation: 'Overall qualification assessment'
    },
    {
      id: 'maxLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      format: '$0,0',
      explanation: 'Maximum loan amount based on income and debt'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations to improve qualification'
    }
  ],

  formulas: [
    {
      id: 'mortgage-qualification-analysis',
      name: 'Mortgage Qualification Analysis',
      description: 'Calculate comprehensive mortgage qualification analysis including DTI ratios and qualification status',
      calculate: (inputs: Record<string, any>) => {
        const borrowerIncome = inputs.borrowerIncome || 0;
        const coBorrowerIncome = inputs.coBorrowerIncome || 0;
        const borrowerCreditScore = inputs.borrowerCreditScore || 0;
        const coBorrowerCreditScore = inputs.coBorrowerCreditScore || 0;
        const propertyValue = inputs.propertyValue || 0;
        const loanAmount = inputs.loanAmount || 0;
        const interestRate = (inputs.interestRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const downPayment = inputs.downPayment || 0;
        const propertyTaxes = inputs.propertyTaxes || 0;
        const propertyInsurance = inputs.propertyInsurance || 0;
        const hoaFees = inputs.hoaFees || 0;
        const creditCardDebt = inputs.creditCardDebt || 0;
        const autoLoanDebt = inputs.autoLoanDebt || 0;
        const studentLoanDebt = inputs.studentLoanDebt || 0;
        const otherDebt = inputs.otherDebt || 0;
        const loanType = inputs.loanType || 'conventional';
        
        // Calculate total income
        const totalIncome = borrowerIncome + coBorrowerIncome;
        const monthlyIncome = totalIncome / 12;
        
        // Calculate monthly mortgage payment
        const monthlyRate = interestRate / 12;
        const totalPayments = loanTerm * 12;
        
        let monthlyPayment = 0;
        if (monthlyRate > 0) {
          monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
        } else {
          monthlyPayment = loanAmount / totalPayments;
        }
        
        // Calculate monthly housing costs
        const monthlyPropertyTaxes = propertyTaxes / 12;
        const monthlyPropertyInsurance = propertyInsurance / 12;
        const totalHousingCosts = monthlyPayment + monthlyPropertyTaxes + monthlyPropertyInsurance + hoaFees;
        
        // Calculate total monthly debt
        const totalMonthlyDebt = totalHousingCosts + creditCardDebt + autoLoanDebt + studentLoanDebt + otherDebt;
        
        // Calculate ratios
        const debtToIncomeRatio = monthlyIncome > 0 ? (totalMonthlyDebt / monthlyIncome) * 100 : 0;
        const housingExpenseRatio = monthlyIncome > 0 ? (totalHousingCosts / monthlyIncome) * 100 : 0;
        
        // Determine qualification status
        const qualificationStatus = determineQualificationStatus(
          debtToIncomeRatio, 
          housingExpenseRatio, 
          borrowerCreditScore, 
          coBorrowerCreditScore,
          loanType
        );
        
        // Calculate maximum loan amount
        const maxLoanAmount = calculateMaxLoanAmount(
          monthlyIncome, 
          totalMonthlyDebt - totalHousingCosts, 
          interestRate, 
          loanTerm,
          monthlyPropertyTaxes + monthlyPropertyInsurance + hoaFees
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          debtToIncomeRatio,
          housingExpenseRatio,
          borrowerCreditScore,
          totalIncome,
          downPayment,
          propertyValue
        );
        
        return {
          outputs: {
            totalIncome: Math.round(totalIncome),
            monthlyIncome: Math.round(monthlyIncome),
            monthlyPayment: Math.round(monthlyPayment),
            totalMonthlyDebt: Math.round(totalMonthlyDebt),
            debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
            housingExpenseRatio: Math.round(housingExpenseRatio * 10) / 10,
            qualificationStatus,
            maxLoanAmount: Math.round(maxLoanAmount),
            recommendations
          },
          explanation: `Qualification analysis complete. DTI: ${debtToIncomeRatio.toFixed(1)}%. Housing ratio: ${housingExpenseRatio.toFixed(1)}%. Status: ${qualificationStatus}.`,
          intermediateSteps: {
            totalHousingCosts: Math.round(totalHousingCosts),
            monthlyPropertyTaxes: Math.round(monthlyPropertyTaxes),
            monthlyPropertyInsurance: Math.round(monthlyPropertyInsurance)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'borrowerIncome',
      type: 'required',
      message: 'Borrower income is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'borrowerCreditScore',
      type: 'required',
      message: 'Borrower credit score is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
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
      field: 'loanTerm',
      type: 'required',
      message: 'Loan term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'downPayment',
      type: 'required',
      message: 'Down payment is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      field: 'borrowerIncome',
      type: 'range',
      message: 'Borrower income must be between $10,000 and $1,000,000',
      validator: (value: any) => value >= 10000 && value <= 1000000
    },
    {
      field: 'borrowerCreditScore',
      type: 'range',
      message: 'Credit score must be between 300 and 850',
      validator: (value: any) => value >= 300 && value <= 850
    },
    {
      field: 'propertyValue',
      type: 'range',
      message: 'Property value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'loanAmount',
      type: 'range',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'interestRate',
      type: 'range',
      message: 'Interest rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'loanTerm',
      type: 'range',
      message: 'Loan term must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      field: 'downPayment',
      type: 'range',
      message: 'Down payment must be between $0 and $10,000,000',
      validator: (value: any) => value >= 0 && value <= 10000000
    },
    {
      field: 'loanAmount',
      type: 'business',
      message: 'Loan amount plus down payment should equal property value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        const downPayment = allInputs?.downPayment || 0;
        if (propertyValue === 0) return true; // Property value not provided
        return Math.abs((value + downPayment) - propertyValue) < 1000; // Allow small rounding differences
      }
    },
    {
      field: 'downPayment',
      type: 'business',
      message: 'Down payment should not exceed property value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        if (propertyValue === 0) return true; // Property value not provided
        return value <= propertyValue;
      }
    }
  ],

  examples: [
    {
      title: 'Standard Conventional Loan',
      description: 'Typical conventional mortgage qualification scenario',
      inputs: {
        borrowerIncome: 75000,
        coBorrowerIncome: 0,
        borrowerCreditScore: 750,
        coBorrowerCreditScore: 0,
        borrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 5,
        propertyValue: 300000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        downPayment: 60000,
        propertyTaxes: 4000,
        propertyInsurance: 1200,
        hoaFees: 0,
        creditCardDebt: 300,
        autoLoanDebt: 400,
        studentLoanDebt: 200,
        otherDebt: 100
      },
      expectedOutputs: {
        totalIncome: 75000,
        monthlyIncome: 6250,
        monthlyPayment: 1517,
        totalMonthlyDebt: 2720,
        debtToIncomeRatio: 43.5,
        housingExpenseRatio: 24.3,
        qualificationStatus: 'Qualified',
        maxLoanAmount: 280000,
        recommendations: 'Good qualification! Consider increasing down payment to reduce monthly payment and improve ratios.'
      }
    },
    {
      title: 'High DTI Scenario',
      description: 'Scenario with high debt-to-income ratio',
      inputs: {
        borrowerIncome: 60000,
        coBorrowerIncome: 0,
        borrowerCreditScore: 680,
        coBorrowerCreditScore: 0,
        borrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 2,
        propertyValue: 250000,
        loanAmount: 200000,
        interestRate: 7.0,
        loanTerm: 30,
        loanType: 'conventional',
        downPayment: 50000,
        propertyTaxes: 3500,
        propertyInsurance: 1000,
        hoaFees: 150,
        creditCardDebt: 800,
        autoLoanDebt: 600,
        studentLoanDebt: 400,
        otherDebt: 200
      },
      expectedOutputs: {
        totalIncome: 60000,
        monthlyIncome: 5000,
        monthlyPayment: 1331,
        totalMonthlyDebt: 3481,
        debtToIncomeRatio: 69.6,
        housingExpenseRatio: 29.6,
        qualificationStatus: 'May Not Qualify',
        maxLoanAmount: 180000,
        recommendations: 'High DTI ratio. Consider paying down debt, increasing income, or reducing loan amount.'
      }
    }
  ]
};

// Helper functions for calculations
function determineQualificationStatus(
  dti: number, 
  housingRatio: number, 
  borrowerCredit: number, 
  coBorrowerCredit: number,
  loanType: string
): string {
  const minCreditScore = loanType === 'fha' ? 580 : loanType === 'va' ? 620 : 620;
  const maxDTI = loanType === 'fha' ? 43 : loanType === 'va' ? 41 : 43;
  const maxHousingRatio = loanType === 'fha' ? 31 : loanType === 'va' ? 29 : 28;
  
  const creditScore = Math.min(borrowerCredit, coBorrowerCredit || 999);
  
  if (creditScore < minCreditScore) {
    return 'Credit Score Too Low';
  }
  
  if (dti > maxDTI) {
    return 'DTI Ratio Too High';
  }
  
  if (housingRatio > maxHousingRatio) {
    return 'Housing Expense Ratio Too High';
  }
  
  if (dti <= maxDTI * 0.8 && housingRatio <= maxHousingRatio * 0.8) {
    return 'Well Qualified';
  }
  
  return 'Qualified';
}

function calculateMaxLoanAmount(
  monthlyIncome: number, 
  otherDebt: number, 
  interestRate: number, 
  loanTerm: number,
  monthlyHousingCosts: number
): number {
  const maxDTI = 43; // Conservative conventional loan standard
  const maxHousingRatio = 28;
  
  const maxTotalDebt = monthlyIncome * (maxDTI / 100);
  const maxHousingDebt = monthlyIncome * (maxHousingRatio / 100);
  
  const availableForHousing = Math.min(maxTotalDebt - otherDebt, maxHousingDebt);
  const availableForMortgage = availableForHousing - monthlyHousingCosts;
  
  if (availableForMortgage <= 0) return 0;
  
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  if (monthlyRate === 0) return availableForMortgage * totalPayments;
  
  const maxLoanAmount = availableForMortgage * ((Math.pow(1 + monthlyRate, totalPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)));
  
  return Math.max(0, maxLoanAmount);
}

function generateRecommendations(
  dti: number, 
  housingRatio: number, 
  creditScore: number, 
  income: number, 
  downPayment: number, 
  propertyValue: number
): string {
  const recommendations = [];
  
  if (dti > 43) {
    recommendations.push('DTI ratio exceeds conventional loan limits. Consider FHA or VA loans, or reduce debt.');
  } else if (dti > 36) {
    recommendations.push('DTI ratio is high but manageable. Consider paying down debt to improve qualification.');
  }
  
  if (housingRatio > 28) {
    recommendations.push('Housing expense ratio is high. Consider larger down payment or less expensive property.');
  }
  
  if (creditScore < 700) {
    recommendations.push('Credit score could be improved. Focus on paying bills on time and reducing credit utilization.');
  } else if (creditScore >= 760) {
    recommendations.push('Excellent credit score! You qualify for the best rates.');
  }
  
  const downPaymentRatio = (downPayment / propertyValue) * 100;
  if (downPaymentRatio < 20) {
    recommendations.push('Down payment below 20% will require PMI. Consider saving more for down payment.');
  } else if (downPaymentRatio >= 20) {
    recommendations.push('Great down payment! No PMI required.');
  }
  
  if (income < 50000) {
    recommendations.push('Income is on the lower end. Consider co-borrower or improving income stability.');
  }
  
  return recommendations.join(' ');
}