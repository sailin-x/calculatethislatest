import { Formula, CalculationResult } from '../../../types/calculator';

export const privateMortgageInsuranceFormulas: Formula[] = [
  {
    id: 'ltv-calculation',
    name: 'Loan-to-Value Ratio Calculation',
    description: 'Calculate the current loan-to-value ratio',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, homeValue = 0 } = inputs;
      
      const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
      
      return {
        outputs: {
          loanToValueRatio: Math.round(ltvRatio * 100) / 100
        },
        explanation: `Loan-to-Value Ratio: ${ltvRatio.toFixed(2)}%`,
        intermediateSteps: {
          loanAmount,
          homeValue
        }
      };
    }
  },
  {
    id: 'pmi-requirement-determination',
    name: 'PMI Requirement Determination',
    description: 'Determine if PMI is required based on loan type and LTV',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, homeValue = 0, loanType = 'conventional', propertyType = 'single_family', occupancyType = 'primary' } = inputs;
      
      const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
      const pmiRequired = determinePMIRequirement(ltvRatio, loanType, propertyType, occupancyType);
      
      return {
        outputs: {
          pmiRequired: pmiRequired ? 'Yes' : 'No'
        },
        explanation: `PMI Required: ${pmiRequired ? 'Yes' : 'No'} (LTV: ${ltvRatio.toFixed(2)}%)`,
        intermediateSteps: {
          ltvRatio,
          loanType,
          propertyType,
          occupancyType
        }
      };
    }
  },
  {
    id: 'pmi-cost-calculation',
    name: 'PMI Cost Calculation',
    description: 'Calculate monthly and annual PMI costs',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, pmiRate = 0, loanType = 'conventional', propertyType = 'single_family', occupancyType = 'primary' } = inputs;
      
      const ltvRatio = inputs.homeValue > 0 ? (loanAmount / inputs.homeValue) * 100 : 0;
      const pmiRequired = determinePMIRequirement(ltvRatio, loanType, propertyType, occupancyType);
      
      const monthlyPMI = pmiRequired ? (loanAmount * pmiRate / 100) / 12 : 0;
      const annualPMI = monthlyPMI * 12;
      
      return {
        outputs: {
          monthlyPMI: Math.round(monthlyPMI),
          annualPMI: Math.round(annualPMI)
        },
        explanation: `Monthly PMI: $${monthlyPMI.toLocaleString()}, Annual PMI: $${annualPMI.toLocaleString()}`,
        intermediateSteps: {
          loanAmount,
          pmiRate,
          pmiRequired,
          monthlyPMI
        }
      };
    }
  },
  {
    id: 'pmi-cancellation-analysis',
    name: 'PMI Cancellation Analysis',
    description: 'Analyze when PMI can be cancelled and total cost',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, homeValue = 0, loanType = 'conventional', annualAppreciation = 3.0, pmiRate = 0 } = inputs;
      
      const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
      const pmiCancellationLTV = getPMICancellationThreshold(loanType);
      const monthsToCancellation = calculateMonthsToCancellation(
        ltvRatio,
        pmiCancellationLTV,
        annualAppreciation,
        loanAmount,
        homeValue
      );
      
      const monthlyPMI = (loanAmount * pmiRate / 100) / 12;
      const totalPMICost = monthlyPMI * monthsToCancellation;
      
      return {
        outputs: {
          pmiCancellationLTV: Math.round(pmiCancellationLTV * 100) / 100,
          monthsToCancellation: Math.round(monthsToCancellation),
          totalPMICost: Math.round(totalPMICost)
        },
        explanation: `PMI can be cancelled at ${pmiCancellationLTV}% LTV in ${monthsToCancellation} months. Total cost: $${totalPMICost.toLocaleString()}`,
        intermediateSteps: {
          ltvRatio,
          pmiCancellationLTV,
          monthsToCancellation,
          monthlyPMI,
          totalPMICost
        }
      };
    }
  },
  {
    id: 'alternative-analysis',
    name: 'PMI Alternative Analysis',
    description: 'Analyze alternatives to PMI',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, homeValue = 0, downPayment = 0, loanType = 'conventional' } = inputs;
      
      const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
      const alternativeAnalysis = generateAlternativeAnalysis(
        ltvRatio,
        downPayment,
        homeValue,
        loanType
      );
      
      return {
        outputs: {
          alternativeAnalysis
        },
        explanation: 'Alternative analysis completed',
        intermediateSteps: {
          ltvRatio,
          downPayment,
          homeValue,
          loanType
        }
      };
    }
  },
  {
    id: 'recommendations-generation',
    name: 'Recommendations Generation',
    description: 'Generate actionable recommendations for PMI management',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { loanAmount = 0, homeValue = 0, loanType = 'conventional', pmiRate = 0, annualAppreciation = 3.0 } = inputs;
      
      const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
      const pmiRequired = determinePMIRequirement(ltvRatio, loanType, 'single_family', 'primary');
      const pmiCancellationLTV = getPMICancellationThreshold(loanType);
      const monthsToCancellation = calculateMonthsToCancellation(
        ltvRatio,
        pmiCancellationLTV,
        annualAppreciation,
        loanAmount,
        homeValue
      );
      
      const monthlyPMI = pmiRequired ? (loanAmount * pmiRate / 100) / 12 : 0;
      const totalPMICost = monthlyPMI * monthsToCancellation;
      
      const recommendations = generateRecommendations(
        pmiRequired,
        ltvRatio,
        monthsToCancellation,
        totalPMICost,
        loanType
      );
      
      return {
        outputs: {
          recommendations
        },
        explanation: 'Recommendations generated',
        intermediateSteps: {
          ltvRatio,
          pmiRequired,
          monthsToCancellation,
          totalPMICost,
          loanType
        }
      };
    }
  }
];

// Helper functions
function determinePMIRequirement(
  ltvRatio: number,
  loanType: string,
  propertyType: string,
  occupancyType: string
): boolean {
  // Conventional loans: PMI required if LTV > 80%
  if (loanType === 'conventional') {
    return ltvRatio > 80;
  }
  
  // FHA loans: MIP required for all loans
  if (loanType === 'fha') {
    return true;
  }
  
  // USDA loans: Guarantee fee required
  if (loanType === 'usda') {
    return true;
  }
  
  // VA loans: No PMI required
  if (loanType === 'va') {
    return false;
  }
  
  return ltvRatio > 80;
}

function getPMICancellationThreshold(loanType: string): number {
  switch (loanType) {
    case 'conventional':
      return 78; // 78% LTV for conventional loans
    case 'fha':
      return 78; // 78% LTV for FHA loans (after 11 years)
    case 'usda':
      return 78; // 78% LTV for USDA loans
    case 'va':
      return 0; // VA loans don't have PMI
    default:
      return 78;
  }
}

function calculateMonthsToCancellation(
  currentLTV: number,
  cancellationLTV: number,
  annualAppreciation: number,
  loanAmount: number,
  homeValue: number
): number {
  if (currentLTV <= cancellationLTV) {
    return 0; // Already below threshold
  }
  
  if (annualAppreciation <= 0) {
    return 999; // Won't reach threshold without appreciation
  }
  
  // Calculate months needed for home value appreciation to reduce LTV
  const targetHomeValue = loanAmount / (cancellationLTV / 100);
  const monthsNeeded = Math.log(targetHomeValue / homeValue) / Math.log(1 + annualAppreciation / 100) * 12;
  
  return Math.max(0, Math.ceil(monthsNeeded));
}

function generateAlternativeAnalysis(
  ltvRatio: number,
  downPayment: number,
  homeValue: number,
  loanType: string
): string {
  const analysis = [];
  
  if (ltvRatio > 80) {
    const additionalDownPayment = (homeValue * 0.2) - downPayment;
    analysis.push(`Increase down payment by $${Math.round(additionalDownPayment).toLocaleString()} to reach 20% and avoid PMI`);
  }
  
  if (loanType === 'conventional' && ltvRatio > 80) {
    analysis.push('Consider piggyback loan (80/10/10 structure) to avoid PMI');
  }
  
  if (ltvRatio <= 80) {
    analysis.push('No PMI required - current down payment is sufficient');
  }
  
  return analysis.join('. ');
}

function generateRecommendations(
  pmiRequired: boolean,
  ltvRatio: number,
  monthsToCancellation: number,
  totalPMICost: number,
  loanType: string
): string {
  const recommendations = [];
  
  if (pmiRequired) {
    if (monthsToCancellation <= 24) {
      recommendations.push('PMI will be cancelled relatively soon - consider keeping current structure');
    } else {
      recommendations.push('PMI will be required for extended period - consider alternatives');
    }
    
    if (totalPMICost > 10000) {
      recommendations.push('High total PMI cost - explore refinancing or additional down payment options');
    }
  } else {
    recommendations.push('No PMI required - current loan structure is optimal');
  }
  
  if (loanType === 'fha' && ltvRatio <= 78) {
    recommendations.push('Consider refinancing to conventional loan to eliminate MIP');
  }
  
  return recommendations.join('. ');
}