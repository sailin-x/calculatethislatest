import { Calculator } from '../../../types/calculator';

export const pmiCancellationCalculator: Calculator = {
  id: 'pmi-cancellation',
  title: 'PMI Cancellation Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate when you can cancel Private Mortgage Insurance (PMI) based on your loan-to-value ratio and payment history.',
  usageInstructions: [
    'Enter your original loan amount and current loan balance',
    'Input your home purchase price and current estimated value',
    'Set your loan type (conventional, FHA, VA, USDA)',
    'Include your loan start date and payment history',
    'Review when PMI can be cancelled and potential savings'
  ],
  inputs: [
    {
      id: 'originalLoanAmount',
      label: 'Original Loan Amount',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'The original mortgage loan amount when you purchased the home',
      placeholder: '300000'
    },
    {
      id: 'currentLoanBalance',
      label: 'Current Loan Balance',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      tooltip: 'Your current remaining mortgage balance',
      placeholder: '280000'
    },
    {
      id: 'homePurchasePrice',
      label: 'Home Purchase Price',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'The price you paid for the home when you purchased it',
      placeholder: '375000'
    },
    {
      id: 'currentHomeValue',
      label: 'Current Home Value',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'Current estimated market value of your home',
      placeholder: '400000'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      defaultValue: 'conventional',
      tooltip: 'Type of mortgage loan you have',
      placeholder: 'conventional'
    },
    {
      id: 'loanStartDate',
      label: 'Loan Start Date',
      type: 'date',
      required: true,
      tooltip: 'Date when your mortgage loan began',
      placeholder: '2020-01-15'
    },
    {
      id: 'originalDownPayment',
      label: 'Original Down Payment',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      tooltip: 'Down payment amount when you purchased the home',
      placeholder: '75000'
    },
    {
      id: 'downPaymentPercentage',
      label: 'Down Payment Percentage',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.5,
      tooltip: 'Down payment as percentage of home price (auto-calculated)',
      placeholder: '20.0'
    },
    {
      id: 'monthlyPMIPayment',
      label: 'Monthly PMI Payment',
      type: 'currency',
      required: true,
      min: 0,
      step: 10,
      tooltip: 'Your current monthly PMI payment amount',
      placeholder: '150'
    },
    {
      id: 'annualPMIRate',
      label: 'Annual PMI Rate',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      defaultValue: 0.5,
      tooltip: 'Annual PMI rate (if known, otherwise estimated)',
      placeholder: '0.5'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'Your credit score (affects PMI rates)',
      placeholder: '750'
    },
    {
      id: 'paymentHistory',
      label: 'Payment History',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent (0-1 late payments)' },
        { value: 'good', label: 'Good (2-3 late payments)' },
        { value: 'fair', label: 'Fair (4-5 late payments)' },
        { value: 'poor', label: 'Poor (6+ late payments)' }
      ],
      defaultValue: 'excellent',
      tooltip: 'Your mortgage payment history',
      placeholder: 'excellent'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      defaultValue: 'primary',
      tooltip: 'How you use this property',
      placeholder: 'primary'
    },
    {
      id: 'appreciationRate',
      label: 'Annual Appreciation Rate',
      type: 'percentage',
      required: false,
      min: -10,
      max: 20,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual home value appreciation rate',
      placeholder: '3.0'
    },
    {
      id: 'refinanceOption',
      label: 'Consider Refinancing',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether to analyze refinancing as an option to remove PMI',
      placeholder: 'false'
    }
  ],
  outputs: [
    {
      id: 'currentLTV',
      label: 'Current Loan-to-Value Ratio',
      type: 'percentage',
      explanation: 'Current loan balance as percentage of home value'
    },
    {
      id: 'originalLTV',
      label: 'Original Loan-to-Value Ratio',
      type: 'percentage',
      explanation: 'Original loan amount as percentage of purchase price'
    },
    {
      id: 'pmiCancellationLTV',
      label: 'PMI Cancellation LTV Threshold',
      type: 'percentage',
      explanation: 'LTV ratio required to cancel PMI'
    },
    {
      id: 'monthsToCancellation',
      label: 'Months Until PMI Cancellation',
      type: 'number',
      explanation: 'Estimated months until PMI can be cancelled'
    },
    {
      id: 'dateOfCancellation',
      label: 'Estimated Cancellation Date',
      type: 'text',
      explanation: 'Estimated date when PMI can be cancelled'
    },
    {
      id: 'totalPMICost',
      label: 'Total PMI Cost Until Cancellation',
      type: 'currency',
      explanation: 'Total PMI payments until cancellation'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Savings After Cancellation',
      type: 'currency',
      explanation: 'Monthly savings once PMI is cancelled'
    },
    {
      id: 'annualSavings',
      label: 'Annual Savings After Cancellation',
      type: 'currency',
      explanation: 'Annual savings once PMI is cancelled'
    },
    {
      id: 'lifetimeSavings',
      label: 'Lifetime Savings from Cancellation',
      type: 'currency',
      explanation: 'Total savings over the life of the loan'
    },
    {
      id: 'refinanceAnalysis',
      label: 'Refinancing Analysis',
      type: 'text',
      explanation: 'Analysis of whether refinancing makes sense to remove PMI'
    },
    {
      id: 'cancellationRequirements',
      label: 'Cancellation Requirements',
      type: 'text',
      explanation: 'Specific requirements to cancel PMI'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations for PMI cancellation'
    }
  ],
  formulas: [
    {
      id: 'pmi-cancellation-analysis',
      name: 'PMI Cancellation Analysis',
      description: 'Comprehensive analysis of PMI cancellation eligibility and timing',
      calculate: (inputs: Record<string, any>) => {
        // Extract and validate inputs
        const {
          originalLoanAmount = 0,
          currentLoanBalance = 0,
          homePurchasePrice = 0,
          currentHomeValue = 0,
          loanType = 'conventional',
          loanStartDate = new Date(),
          originalDownPayment = 0,
          monthlyPMIPayment = 0,
          annualPMIRate = 0.5,
          creditScore = 750,
          paymentHistory = 'excellent',
          propertyType = 'primary',
          appreciationRate = 3,
          refinanceOption = false
        } = inputs;

        // Calculate LTV ratios
        const currentLTV = (currentLoanBalance / currentHomeValue) * 100;
        const originalLTV = (originalLoanAmount / homePurchasePrice) * 100;
        
        // Determine PMI cancellation threshold based on loan type
        const pmiCancellationLTV = getPMICancellationThreshold(loanType, originalLTV, paymentHistory);
        
        // Calculate months until cancellation
        const monthsToCancellation = calculateMonthsToCancellation(
          currentLTV,
          pmiCancellationLTV,
          appreciationRate,
          currentLoanBalance,
          monthlyPMIPayment
        );
        
        // Calculate cancellation date
        const loanStart = new Date(loanStartDate);
        const cancellationDate = new Date(loanStart);
        cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
        
        // Calculate PMI costs and savings
        const totalPMICost = monthlyPMIPayment * monthsToCancellation;
        const monthlySavings = monthlyPMIPayment;
        const annualSavings = monthlySavings * 12;
        const lifetimeSavings = calculateLifetimeSavings(monthlySavings, monthsToCancellation);
        
        // Analyze refinancing option
        const refinanceAnalysis = analyzeRefinancingOption(
          currentLoanBalance,
          currentHomeValue,
          monthlyPMIPayment,
          refinanceOption
        );
        
        // Generate cancellation requirements
        const cancellationRequirements = generateCancellationRequirements(
          loanType,
          pmiCancellationLTV,
          paymentHistory,
          propertyType
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          currentLTV,
          pmiCancellationLTV,
          monthsToCancellation,
          refinanceAnalysis,
          monthlySavings
        );

        return {
          outputs: {
            currentLTV: Math.round(currentLTV * 100) / 100,
            originalLTV: Math.round(originalLTV * 100) / 100,
            pmiCancellationLTV: Math.round(pmiCancellationLTV * 100) / 100,
            monthsToCancellation: Math.round(monthsToCancellation),
            dateOfCancellation: cancellationDate.toISOString().split('T')[0],
            totalPMICost: Math.round(totalPMICost),
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            lifetimeSavings: Math.round(lifetimeSavings),
            refinanceAnalysis,
            cancellationRequirements,
            recommendations
          },
          explanation: `PMI Cancellation Analysis: Current LTV ${currentLTV.toFixed(1)}%, cancellation threshold ${pmiCancellationLTV.toFixed(1)}%. Estimated ${Math.round(monthsToCancellation)} months until cancellation.`,
          intermediateSteps: {
            loanType,
            paymentHistory,
            propertyType,
            appreciationRate,
            creditScore
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'originalLoanAmount',
      message: 'Original loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'currentLoanBalance',
      message: 'Current loan balance is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'homePurchasePrice',
      message: 'Home purchase price is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'currentHomeValue',
      message: 'Current home value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'loanType',
      message: 'Loan type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'required',
      field: 'loanStartDate',
      message: 'Loan start date is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'required',
      field: 'originalDownPayment',
      message: 'Original down payment is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'monthlyPMIPayment',
      message: 'Monthly PMI payment is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'range',
      field: 'originalLoanAmount',
      message: 'Original loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      type: 'range',
      field: 'currentLoanBalance',
      message: 'Current loan balance must be between $0 and $10,000,000',
      validator: (value: any) => value >= 0 && value <= 10000000
    },
    {
      type: 'range',
      field: 'homePurchasePrice',
      message: 'Home purchase price must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      type: 'range',
      field: 'currentHomeValue',
      message: 'Current home value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      type: 'range',
      field: 'annualPMIRate',
      message: 'Annual PMI rate must be between 0% and 5%',
      validator: (value: any) => value >= 0 && value <= 5
    },
    {
      type: 'range',
      field: 'creditScore',
      message: 'Credit score must be between 300 and 850',
      validator: (value: any) => value >= 300 && value <= 850
    },
    {
      type: 'range',
      field: 'appreciationRate',
      message: 'Annual appreciation rate must be between -10% and 20%',
      validator: (value: any) => value >= -10 && value <= 20
    },
    {
      type: 'business',
      field: 'currentLoanBalance',
      message: 'Current loan balance should not exceed original loan amount',
      validator: (value: any, allInputs: Record<string, any>) => {
        const originalLoanAmount = allInputs.originalLoanAmount || 0;
        return value <= originalLoanAmount;
      }
    },
    {
      type: 'business',
      field: 'originalDownPayment',
      message: 'Down payment should be reasonable relative to home price',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePurchasePrice = allInputs.homePurchasePrice || 0;
        if (homePurchasePrice === 0) return true;
        const downPaymentPercentage = (value / homePurchasePrice) * 100;
        return downPaymentPercentage >= 3 && downPaymentPercentage <= 50;
      }
    },
    {
      type: 'business',
      field: 'monthlyPMIPayment',
      message: 'PMI payment should be reasonable relative to loan amount',
      validator: (value: any, allInputs: Record<string, any>) => {
        const originalLoanAmount = allInputs.originalLoanAmount || 0;
        if (originalLoanAmount === 0) return true;
        const pmiPercentage = (value * 12 / originalLoanAmount) * 100;
        return pmiPercentage >= 0.1 && pmiPercentage <= 2;
      }
    }
  ],
  examples: [
    {
      title: 'Conventional Loan PMI Cancellation',
      description: 'A conventional loan with good payment history seeking PMI cancellation',
      inputs: {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        homePurchasePrice: 375000,
        currentHomeValue: 400000,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        originalDownPayment: 75000,
        monthlyPMIPayment: 150,
        annualPMIRate: 0.5,
        creditScore: 750,
        paymentHistory: 'excellent',
        propertyType: 'primary',
        appreciationRate: 3,
        refinanceOption: false
      },
      expectedOutputs: {
        currentLTV: 70.0,
        originalLTV: 80.0,
        pmiCancellationLTV: 78.0,
        monthsToCancellation: 12,
        totalPMICost: 1800,
        monthlySavings: 150,
        annualSavings: 1800
      }
    },
    {
      title: 'FHA Loan PMI Analysis',
      description: 'An FHA loan with PMI that may require refinancing to remove',
      inputs: {
        originalLoanAmount: 250000,
        currentLoanBalance: 240000,
        homePurchasePrice: 312500,
        currentHomeValue: 330000,
        loanType: 'fha',
        loanStartDate: '2019-06-01',
        originalDownPayment: 62500,
        monthlyPMIPayment: 125,
        annualPMIRate: 0.85,
        creditScore: 680,
        paymentHistory: 'good',
        propertyType: 'primary',
        appreciationRate: 2.5,
        refinanceOption: true
      },
      expectedOutputs: {
        currentLTV: 72.7,
        originalLTV: 80.0,
        pmiCancellationLTV: 78.0,
        monthsToCancellation: 24,
        totalPMICost: 3000,
        monthlySavings: 125,
        annualSavings: 1500
      }
    }
  ]
};

// Helper functions
function getPMICancellationThreshold(loanType: string, originalLTV: number, paymentHistory: string): number {
  switch (loanType) {
    case 'conventional':
      // Conventional loans: 78% LTV for automatic cancellation, 80% for request
      return paymentHistory === 'excellent' ? 78 : 80;
    case 'fha':
      // FHA loans: PMI typically required for life of loan unless refinanced
      return 78;
    case 'va':
      // VA loans: No PMI required
      return 0;
    case 'usda':
      // USDA loans: Guarantee fee similar to PMI
      return 78;
    default:
      return 80;
  }
}

function calculateMonthsToCancellation(
  currentLTV: number,
  targetLTV: number,
  appreciationRate: number,
  currentBalance: number,
  monthlyPayment: number
): number {
  if (currentLTV <= targetLTV) {
    return 0; // Already eligible for cancellation
  }
  
  if (appreciationRate <= 0) {
    // No appreciation, calculate based on principal payments only
    const principalReduction = monthlyPayment * 0.3; // Estimate 30% goes to principal
    const ltvReduction = (principalReduction / currentBalance) * 100;
    return Math.ceil((currentLTV - targetLTV) / ltvReduction);
  }
  
  // With appreciation, calculate months needed
  const monthlyAppreciation = appreciationRate / 12 / 100;
  const monthsNeeded = Math.log(targetLTV / currentLTV) / Math.log(1 + monthlyAppreciation);
  
  return Math.ceil(monthsNeeded);
}

function calculateLifetimeSavings(monthlySavings: number, monthsToCancellation: number): number {
  // Estimate remaining loan term (30 years = 360 months)
  const remainingMonths = Math.max(0, 360 - monthsToCancellation);
  return monthlySavings * remainingMonths;
}

function analyzeRefinancingOption(
  currentBalance: number,
  currentHomeValue: number,
  monthlyPMIPayment: number,
  refinanceOption: boolean
): string {
  if (!refinanceOption) {
    return 'Refinancing analysis not requested.';
  }
  
  const currentLTV = (currentBalance / currentHomeValue) * 100;
  
  if (currentLTV <= 80) {
    return 'Refinancing may be beneficial to remove PMI and potentially lower your rate.';
  } else if (currentLTV <= 85) {
    return 'Consider refinancing if you can get a significantly lower rate or remove PMI.';
  } else {
    return 'Refinancing may not be beneficial until LTV improves further.';
  }
}

function generateCancellationRequirements(
  loanType: string,
  targetLTV: number,
  paymentHistory: string,
  propertyType: string
): string {
  const requirements = [];
  
  if (loanType === 'conventional') {
    requirements.push(`Achieve ${targetLTV}% LTV ratio`);
    requirements.push('Have good payment history (no late payments in last 12 months)');
    requirements.push('Request cancellation in writing');
  } else if (loanType === 'fha') {
    requirements.push(`Achieve ${targetLTV}% LTV ratio`);
    requirements.push('Have made payments for at least 5 years');
    requirements.push('Request cancellation in writing');
  }
  
  if (propertyType !== 'primary') {
    requirements.push('Property must be primary residence for automatic cancellation');
  }
  
  return requirements.join('. ');
}

function generateRecommendations(
  currentLTV: number,
  targetLTV: number,
  monthsToCancellation: number,
  refinanceAnalysis: string,
  monthlySavings: number
): string {
  const recommendations = [];
  
  if (currentLTV <= targetLTV) {
    recommendations.push('You are eligible to cancel PMI now. Contact your lender immediately.');
  } else if (monthsToCancellation <= 12) {
    recommendations.push('PMI cancellation is close. Continue making payments and monitor home value.');
  } else if (monthsToCancellation <= 24) {
    recommendations.push('Consider making extra principal payments to accelerate PMI cancellation.');
  } else {
    recommendations.push('PMI cancellation is several years away. Focus on building equity through payments.');
  }
  
  if (monthlySavings > 100) {
    recommendations.push(`Cancelling PMI will save you $${monthlySavings} monthly - significant savings.`);
  }
  
  if (refinanceAnalysis.includes('beneficial')) {
    recommendations.push('Consider refinancing as an option to remove PMI sooner.');
  }
  
  return recommendations.join(' ');
}