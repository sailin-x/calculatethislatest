import { Formula, CalculationResult } from '../../../types/calculator';

export const pmiCancellationFormulas: Formula[] = [
  {
    id: 'ltv-calculation',
    name: 'Loan-to-Value Ratio Calculation',
    description: 'Calculate current and original loan-to-value ratios',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { currentLoanBalance = 0, currentHomeValue = 0, originalLoanAmount = 0, homePurchasePrice = 0 } = inputs;
      
      const currentLTV = (currentLoanBalance / currentHomeValue) * 100;
      const originalLTV = (originalLoanAmount / homePurchasePrice) * 100;
      
      return {
        outputs: {
          currentLTV: Math.round(currentLTV * 100) / 100,
          originalLTV: Math.round(originalLTV * 100) / 100
        },
        explanation: `Current LTV: ${currentLTV.toFixed(1)}%, Original LTV: ${originalLTV.toFixed(1)}%`,
        intermediateSteps: {
          currentLoanBalance,
          currentHomeValue,
          originalLoanAmount,
          homePurchasePrice
        }
      };
    }
  },
  {
    id: 'pmi-threshold-calculation',
    name: 'PMI Cancellation Threshold',
    description: 'Determine the LTV threshold required to cancel PMI',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanType = 'conventional', originalLTV = 0, paymentHistory = 'excellent' } = inputs;
      
      const pmiCancellationLTV = getPMICancellationThreshold(loanType, originalLTV, paymentHistory);
      
      return {
        outputs: {
          pmiCancellationLTV: Math.round(pmiCancellationLTV * 100) / 100
        },
        explanation: `PMI cancellation threshold: ${pmiCancellationLTV.toFixed(1)}% LTV for ${loanType} loan`,
        intermediateSteps: {
          loanType,
          originalLTV,
          paymentHistory
        }
      };
    }
  },
  {
    id: 'cancellation-timing-calculation',
    name: 'PMI Cancellation Timing',
    description: 'Calculate months until PMI can be cancelled',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        currentLTV = 0,
        pmiCancellationLTV = 0,
        appreciationRate = 3,
        currentLoanBalance = 0,
        monthlyPMIPayment = 0
      } = inputs;
      
      const monthsToCancellation = calculateMonthsToCancellation(
        currentLTV,
        pmiCancellationLTV,
        appreciationRate,
        currentLoanBalance,
        monthlyPMIPayment
      );
      
      // Calculate cancellation date
      const loanStartDate = new Date();
      const cancellationDate = new Date(loanStartDate);
      cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
      
      return {
        outputs: {
          monthsToCancellation: Math.round(monthsToCancellation),
          dateOfCancellation: cancellationDate.toISOString().split('T')[0]
        },
        explanation: `Estimated ${Math.round(monthsToCancellation)} months until PMI cancellation`,
        intermediateSteps: {
          currentLTV,
          pmiCancellationLTV,
          appreciationRate,
          currentLoanBalance,
          monthlyPMIPayment
        }
      };
    }
  },
  {
    id: 'pmi-cost-calculation',
    name: 'PMI Cost Analysis',
    description: 'Calculate total PMI costs and potential savings',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { monthlyPMIPayment = 0, monthsToCancellation = 0 } = inputs;
      
      const totalPMICost = monthlyPMIPayment * monthsToCancellation;
      const monthlySavings = monthlyPMIPayment;
      const annualSavings = monthlySavings * 12;
      const lifetimeSavings = calculateLifetimeSavings(monthlySavings, monthsToCancellation);
      
      return {
        outputs: {
          totalPMICost: Math.round(totalPMICost),
          monthlySavings: Math.round(monthlySavings),
          annualSavings: Math.round(annualSavings),
          lifetimeSavings: Math.round(lifetimeSavings)
        },
        explanation: `Total PMI cost: $${totalPMICost.toLocaleString()}, Monthly savings: $${monthlySavings.toLocaleString()}`,
        intermediateSteps: {
          monthlyPMIPayment,
          monthsToCancellation,
          monthlySavings,
          annualSavings
        }
      };
    }
  },
  {
    id: 'refinancing-analysis',
    name: 'Refinancing Analysis',
    description: 'Analyze whether refinancing makes sense to remove PMI',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        currentLoanBalance = 0,
        currentHomeValue = 0,
        monthlyPMIPayment = 0,
        refinanceOption = false
      } = inputs;
      
      const refinanceAnalysis = analyzeRefinancingOption(
        currentLoanBalance,
        currentHomeValue,
        monthlyPMIPayment,
        refinanceOption
      );
      
      return {
        outputs: {
          refinanceAnalysis
        },
        explanation: 'Refinancing analysis completed',
        intermediateSteps: {
          currentLoanBalance,
          currentHomeValue,
          monthlyPMIPayment,
          refinanceOption
        }
      };
    }
  },
  {
    id: 'requirements-and-recommendations',
    name: 'Cancellation Requirements and Recommendations',
    description: 'Generate cancellation requirements and actionable recommendations',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        loanType = 'conventional',
        pmiCancellationLTV = 0,
        paymentHistory = 'excellent',
        propertyType = 'primary',
        currentLTV = 0,
        monthsToCancellation = 0,
        refinanceAnalysis = '',
        monthlySavings = 0
      } = inputs;
      
      const cancellationRequirements = generateCancellationRequirements(
        loanType,
        pmiCancellationLTV,
        paymentHistory,
        propertyType
      );
      
      const recommendations = generateRecommendations(
        currentLTV,
        pmiCancellationLTV,
        monthsToCancellation,
        refinanceAnalysis,
        monthlySavings
      );
      
      return {
        outputs: {
          cancellationRequirements,
          recommendations
        },
        explanation: 'Requirements and recommendations generated',
        intermediateSteps: {
          loanType,
          pmiCancellationLTV,
          paymentHistory,
          propertyType,
          currentLTV,
          monthsToCancellation
        }
      };
    }
  }
];

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