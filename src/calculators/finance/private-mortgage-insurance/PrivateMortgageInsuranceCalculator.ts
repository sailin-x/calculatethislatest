import { Calculator } from '../../../types/calculator';

export const privateMortgageInsuranceCalculator: Calculator = {
  id: 'private-mortgage-insurance',
  title: 'Private Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate PMI costs, cancellation requirements, and analyze PMI vs. alternatives for mortgage financing.',
  usageInstructions: [
    'Enter your loan details including amount, home value, and down payment',
    'Input PMI rate and loan type information',
    'Set your credit score and loan term',
    'Review PMI costs, cancellation timeline, and alternatives analysis'
  ],
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'Total amount of the mortgage loan',
      placeholder: '300000'
    },
    {
      id: 'homeValue',
      label: 'Home Value',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'Current appraised value of the home',
      placeholder: '375000'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      tooltip: 'Amount of down payment made',
      placeholder: '75000'
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 2.0,
      step: 0.01,
      tooltip: 'Annual PMI rate as a percentage',
      placeholder: '0.5'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'usda', label: 'USDA' },
        { value: 'va', label: 'VA' }
      ],
      defaultValue: 'conventional',
      tooltip: 'Type of mortgage loan',
      placeholder: 'conventional'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'Your credit score (affects PMI rate)',
      placeholder: '720'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      tooltip: 'Length of the mortgage in years',
      placeholder: '30'
    },
    {
      id: 'annualAppreciation',
      label: 'Annual Appreciation Rate (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 20,
      step: 0.1,
      tooltip: 'Expected annual home value appreciation',
      placeholder: '3.0'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Principal & Interest',
      type: 'currency',
      required: false,
      min: 0,
      step: 10,
      tooltip: 'Monthly P&I payment (calculated if not provided)',
      placeholder: '1500'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0.1,
      max: 20,
      step: 0.01,
      tooltip: 'Annual interest rate on the mortgage',
      placeholder: '4.5'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi-Family' }
      ],
      defaultValue: 'single_family',
      tooltip: 'Type of property being financed',
      placeholder: 'single_family'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: false,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      defaultValue: 'primary',
      tooltip: 'How the property will be occupied',
      placeholder: 'primary'
    }
  ],
  outputs: [
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      explanation: 'Current LTV ratio (loan amount / home value)'
    },
    {
      id: 'pmiRequired',
      label: 'PMI Required',
      type: 'text',
      explanation: 'Whether PMI is required based on LTV ratio'
    },
    {
      id: 'monthlyPMI',
      label: 'Monthly PMI Payment',
      type: 'currency',
      explanation: 'Monthly PMI premium amount'
    },
    {
      id: 'annualPMI',
      label: 'Annual PMI Cost',
      type: 'currency',
      explanation: 'Total annual PMI cost'
    },
    {
      id: 'pmiCancellationLTV',
      label: 'PMI Cancellation LTV',
      type: 'percentage',
      explanation: 'LTV ratio at which PMI can be cancelled'
    },
    {
      id: 'monthsToCancellation',
      label: 'Months to PMI Cancellation',
      type: 'number',
      explanation: 'Estimated months until PMI can be cancelled'
    },
    {
      id: 'totalPMICost',
      label: 'Total PMI Cost',
      type: 'currency',
      explanation: 'Total PMI cost until cancellation'
    },
    {
      id: 'pmiSavings',
      label: 'PMI Cancellation Savings',
      type: 'currency',
      explanation: 'Monthly savings after PMI cancellation'
    },
    {
      id: 'alternativeAnalysis',
      label: 'Alternative Analysis',
      type: 'text',
      explanation: 'Analysis of PMI alternatives (piggyback loans, higher down payment)'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations for PMI management'
    },
    {
      id: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of PMI costs and timeline'
    },
    {
      id: 'refinanceAnalysis',
      label: 'Refinance Analysis',
      type: 'text',
      explanation: 'Analysis of refinancing to eliminate PMI'
    }
  ],
  formulas: [
    {
      id: 'pmi-analysis',
      name: 'PMI Analysis',
      description: 'Comprehensive PMI calculation and analysis',
      calculate: (inputs: Record<string, any>): any => {
        const {
          loanAmount = 0,
          homeValue = 0,
          downPayment = 0,
          pmiRate = 0,
          loanType = 'conventional',
          creditScore = 720,
          loanTerm = 30,
          annualAppreciation = 3.0,
          monthlyPayment = 0,
          interestRate = 4.5,
          propertyType = 'single_family',
          occupancyType = 'primary'
        } = inputs;

        // Calculate LTV ratio
        const ltvRatio = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
        
        // Determine if PMI is required
        const pmiRequired = determinePMIRequirement(ltvRatio, loanType, propertyType, occupancyType);
        
        // Calculate PMI costs
        const monthlyPMI = pmiRequired ? (loanAmount * pmiRate / 100) / 12 : 0;
        const annualPMI = monthlyPMI * 12;
        
        // Calculate PMI cancellation details
        const pmiCancellationLTV = getPMICancellationThreshold(loanType);
        const monthsToCancellation = calculateMonthsToCancellation(
          ltvRatio,
          pmiCancellationLTV,
          annualAppreciation,
          loanAmount,
          homeValue
        );
        
        // Calculate total PMI cost
        const totalPMICost = monthlyPMI * monthsToCancellation;
        
        // Generate analysis and recommendations
        const alternativeAnalysis = generateAlternativeAnalysis(
          ltvRatio,
          downPayment,
          homeValue,
          loanType
        );
        
        const recommendations = generateRecommendations(
          pmiRequired,
          ltvRatio,
          monthsToCancellation,
          totalPMICost,
          loanType
        );
        
        const costBreakdown = generateCostBreakdown(
          monthlyPMI,
          annualPMI,
          monthsToCancellation,
          totalPMICost,
          pmiCancellationLTV
        );
        
        const refinanceAnalysis = generateRefinanceAnalysis(
          ltvRatio,
          pmiRequired,
          totalPMICost,
          loanType,
          interestRate
        );

        return {
          outputs: {
            loanToValueRatio: Math.round(ltvRatio * 100) / 100,
            pmiRequired: pmiRequired ? 'Yes' : 'No',
            monthlyPMI: Math.round(monthlyPMI),
            annualPMI: Math.round(annualPMI),
            pmiCancellationLTV: Math.round(pmiCancellationLTV * 100) / 100,
            monthsToCancellation: Math.round(monthsToCancellation),
            totalPMICost: Math.round(totalPMICost),
            pmiSavings: Math.round(monthlyPMI),
            alternativeAnalysis,
            recommendations,
            costBreakdown,
            refinanceAnalysis
          },
          explanation: `PMI analysis completed. LTV: ${ltvRatio.toFixed(2)}%, PMI required: ${pmiRequired ? 'Yes' : 'No'}`,
          intermediateSteps: {
            ltvRatio,
            pmiRequired,
            monthlyPMI,
            annualPMI,
            pmiCancellationLTV,
            monthsToCancellation,
            totalPMICost
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'loanAmount',
      message: 'Loan amount is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'required',
      field: 'homeValue',
      message: 'Home value is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'required',
      field: 'downPayment',
      message: 'Down payment is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'required',
      field: 'pmiRate',
      message: 'PMI rate is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'required',
      field: 'loanType',
      message: 'Loan type is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'required',
      field: 'loanTerm',
      message: 'Loan term is required',
      validator: (value: any) => value !== undefined && value !== null && value !== ''
    },
    {
      type: 'range',
      field: 'loanAmount',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= 10000 && num <= 10000000;
      }
    },
    {
      type: 'range',
      field: 'homeValue',
      message: 'Home value must be between $10,000 and $50,000,000',
      validator: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= 10000 && num <= 50000000;
      }
    },
    {
      type: 'range',
      field: 'downPayment',
      message: 'Down payment must be between $0 and home value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const downPayment = Number(value);
        const homeValue = Number(allInputs.homeValue);
        return !isNaN(downPayment) && downPayment >= 0 && downPayment <= homeValue;
      }
    },
    {
      type: 'range',
      field: 'pmiRate',
      message: 'PMI rate must be between 0.1% and 2.0%',
      validator: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0.1 && num <= 2.0;
      }
    },
    {
      type: 'range',
      field: 'creditScore',
      message: 'Credit score must be between 300 and 850',
      validator: (value: any) => {
        if (value === undefined || value === null || value === '') return true; // Optional field
        const num = Number(value);
        return !isNaN(num) && num >= 300 && num <= 850;
      }
    },
    {
      type: 'range',
      field: 'loanTerm',
      message: 'Loan term must be between 10 and 50 years',
      validator: (value: any) => {
        const num = Number(value);
        return !isNaN(num) && num >= 10 && num <= 50;
      }
    },
    {
      type: 'business',
      field: 'loanAmount',
      message: 'Loan amount cannot exceed home value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const loanAmount = Number(value);
        const homeValue = Number(allInputs.homeValue);
        return !isNaN(loanAmount) && !isNaN(homeValue) && loanAmount <= homeValue;
      }
    },
    {
      type: 'business',
      field: 'downPayment',
      message: 'Down payment plus loan amount should equal home value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const downPayment = Number(value);
        const loanAmount = Number(allInputs.loanAmount);
        const homeValue = Number(allInputs.homeValue);
        
        if (isNaN(downPayment) || isNaN(loanAmount) || isNaN(homeValue)) {
          return true; // Skip validation if we don't have valid data
        }
        
        const difference = Math.abs((downPayment + loanAmount) - homeValue);
        return difference <= 1000; // Allow $1000 tolerance for rounding
      }
    }
  ],
  examples: [
    {
      title: 'Conventional Loan with PMI',
      description: 'A typical conventional loan requiring PMI due to 20% down payment',
      inputs: {
        loanAmount: 300000,
        homeValue: 375000,
        downPayment: 75000,
        pmiRate: 0.5,
        loanType: 'conventional',
        creditScore: 720,
        loanTerm: 30,
        annualAppreciation: 3.0,
        interestRate: 4.5,
        propertyType: 'single_family',
        occupancyType: 'primary'
      },
      expectedOutputs: {
        loanToValueRatio: 80.0,
        pmiRequired: true,
        monthlyPMI: 125,
        annualPMI: 1500,
        pmiCancellationLTV: 78.0,
        monthsToCancellation: 24
      }
    },
    {
      title: 'FHA Loan with MIP',
      description: 'An FHA loan with mortgage insurance premium',
      inputs: {
        loanAmount: 250000,
        homeValue: 300000,
        downPayment: 50000,
        pmiRate: 0.85,
        loanType: 'fha',
        creditScore: 680,
        loanTerm: 30,
        annualAppreciation: 2.5,
        interestRate: 5.0,
        propertyType: 'single_family',
        occupancyType: 'primary'
      },
      expectedOutputs: {
        loanToValueRatio: 83.33,
        pmiRequired: true,
        monthlyPMI: 177,
        annualPMI: 2125,
        pmiCancellationLTV: 78.0,
        monthsToCancellation: 30
      }
    }
  ]
};

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

function generateCostBreakdown(
  monthlyPMI: number,
  annualPMI: number,
  monthsToCancellation: number,
  totalPMICost: number,
  pmiCancellationLTV: number
): string {
  return `Monthly PMI: $${monthlyPMI.toLocaleString()}, Annual PMI: $${annualPMI.toLocaleString()}, Total cost until cancellation: $${totalPMICost.toLocaleString()}, Cancellation at ${pmiCancellationLTV}% LTV`;
}

function generateRefinanceAnalysis(
  ltvRatio: number,
  pmiRequired: boolean,
  totalPMICost: number,
  loanType: string,
  interestRate: number
): string {
  if (!pmiRequired) {
    return 'No PMI present - refinancing not needed for PMI elimination';
  }
  
  const analysis = [];
  
  if (ltvRatio <= 78) {
    analysis.push('Current LTV allows PMI cancellation - refinancing may not be necessary');
  } else {
    analysis.push('Refinancing could eliminate PMI if LTV can be reduced to 80% or below');
  }
  
  if (totalPMICost > 15000) {
    analysis.push('High PMI cost makes refinancing more attractive');
  }
  
  if (loanType === 'fha' && interestRate > 5.5) {
    analysis.push('FHA loan with high rate - refinancing to conventional may save money');
  }
  
  return analysis.join('. ');
}