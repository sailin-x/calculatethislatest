import { Calculator } from '../../../types/calculator';

export const mortgagePointsCalculator: Calculator = {
  id: 'mortgage-points-calculator',
  title: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate the cost and benefits of mortgage discount points and origination points',
  
  usageInstructions: [
    'Enter loan details including amount, base interest rate, and term',
    'Set points information (discount points, origination points, cost per point)',
    'Input property and borrower information for comprehensive analysis',
    'Review points analysis including break-even calculations and ROI',
    'Compare different point scenarios to optimize mortgage strategy'
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
      id: 'baseInterestRate',
      label: 'Base Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Interest rate without points',
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
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: false,
      placeholder: '1.0',
      tooltip: 'Number of discount points to purchase',
      defaultValue: 1.0,
      min: 0,
      max: 5,
      step: 0.125
    },
    {
      id: 'originationPoints',
      label: 'Origination Points',
      type: 'number',
      required: false,
      placeholder: '0.5',
      tooltip: 'Number of origination points',
      defaultValue: 0.5,
      min: 0,
      max: 3,
      step: 0.125
    },
    {
      id: 'pointCost',
      label: 'Cost per Point',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Cost per point (typically 1% of loan amount)',
      defaultValue: 1000,
      min: 100,
      max: 10000
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: false,
      placeholder: '375000',
      tooltip: 'Total property value',
      defaultValue: 375000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '75000',
      tooltip: 'Down payment amount',
      defaultValue: 75000,
      min: 0,
      max: 10000000
    },
    {
      id: 'borrowerCreditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      placeholder: '750',
      tooltip: 'Borrower credit score',
      defaultValue: 750,
      min: 300,
      max: 850
    },
    {
      id: 'borrowerTaxRate',
      label: 'Tax Rate',
      type: 'percentage',
      required: false,
      placeholder: '24',
      tooltip: 'Borrower marginal tax rate',
      defaultValue: 24,
      min: 0,
      max: 50
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: false,
      placeholder: '7',
      tooltip: 'Period to analyze for break-even and ROI',
      defaultValue: 7,
      min: 1,
      max: 30
    }
  ],

  outputs: [
    {
      id: 'totalPoints',
      label: 'Total Points',
      type: 'number',
      format: '0.000',
      explanation: 'Total points (discount + origination)'
    },
    {
      id: 'totalPointCost',
      label: 'Total Point Cost',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total cost of all points'
    },
    {
      id: 'effectiveRate',
      label: 'Effective Interest Rate',
      type: 'percentage',
      format: '0.000%',
      explanation: 'Interest rate after applying discount points'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly payment with points'
    },
    {
      id: 'monthlyPaymentSavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly savings from discount points'
    },
    {
      id: 'totalInterestSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total interest saved over loan term'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even (months)',
      type: 'number',
      format: '0.0',
      explanation: 'Months to break even on point investment'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even (years)',
      type: 'number',
      format: '0.0',
      explanation: 'Years to break even on point investment'
    },
    {
      id: 'roi',
      label: 'Return on Investment',
      type: 'percentage',
      format: '0.0%',
      explanation: 'ROI on point investment over analysis period'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for point strategy'
    }
  ],

  formulas: [
    {
      id: 'mortgage-points-analysis',
      name: 'Mortgage Points Analysis',
      description: 'Calculate comprehensive analysis of mortgage points including costs, savings, and break-even analysis',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const discountPoints = inputs.discountPoints || 0;
        const originationPoints = inputs.originationPoints || 0;
        const pointCost = inputs.pointCost || (loanAmount * 0.01);
        const propertyValue = inputs.propertyValue || 0;
        const downPayment = inputs.downPayment || 0;
        const borrowerCreditScore = inputs.borrowerCreditScore || 750;
        const borrowerTaxRate = (inputs.borrowerTaxRate || 24) / 100;
        const analysisPeriod = inputs.analysisPeriod || 7;
        
        // Calculate total points and cost
        const totalPoints = discountPoints + originationPoints;
        const totalPointCost = totalPoints * pointCost;
        
        // Calculate effective interest rate (each discount point reduces rate by ~0.25%)
        const rateReduction = discountPoints * 0.0025;
        const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
        
        // Calculate monthly payments
        const monthlyRate = baseInterestRate / 12;
        const totalPayments = loanTerm * 12;
        const monthlyPaymentBase = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
        
        const monthlyRateEffective = effectiveRate / 12;
        const monthlyPaymentWithPoints = (loanAmount * monthlyRateEffective * Math.pow(1 + monthlyRateEffective, totalPayments)) / 
                                       (Math.pow(1 + monthlyRateEffective, totalPayments) - 1);
        
        // Calculate savings
        const monthlyPaymentSavings = monthlyPaymentBase - monthlyPaymentWithPoints;
        const annualPaymentSavings = monthlyPaymentSavings * 12;
        
        // Calculate total interest savings
        const totalInterestBase = (monthlyPaymentBase * totalPayments) - loanAmount;
        const totalInterestWithPoints = (monthlyPaymentWithPoints * totalPayments) - loanAmount;
        const totalInterestSavings = totalInterestBase - totalInterestWithPoints;
        
        // Calculate break-even analysis
        const breakEvenMonths = totalPointCost / monthlyPaymentSavings;
        const breakEvenYears = breakEvenMonths / 12;
        
        // Calculate ROI over analysis period
        const totalSavingsOverPeriod = annualPaymentSavings * analysisPeriod;
        const roi = ((totalSavingsOverPeriod - totalPointCost) / totalPointCost) * 100;
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          breakEvenYears, 
          analysisPeriod, 
          totalInterestSavings, 
          borrowerCreditScore,
          inputs.loanType || 'conventional'
        );
        
        return {
          outputs: {
            totalPoints: Math.round(totalPoints * 1000) / 1000,
            totalPointCost: Math.round(totalPointCost),
            effectiveRate: Math.round(effectiveRate * 100000) / 1000,
            monthlyPayment: Math.round(monthlyPaymentWithPoints),
            monthlyPaymentSavings: Math.round(monthlyPaymentSavings),
            totalInterestSavings: Math.round(totalInterestSavings),
            breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
            breakEvenYears: Math.round(breakEvenYears * 10) / 10,
            roi: Math.round(roi * 10) / 10,
            recommendations
          },
          explanation: `Mortgage points analysis complete. Total cost: $${totalPointCost.toLocaleString()}. Monthly savings: $${monthlyPaymentSavings.toLocaleString()}. Break-even: ${breakEvenYears.toFixed(1)} years.`,
          intermediateSteps: {
            rateReduction: Math.round(rateReduction * 1000000) / 1000000,
            monthlyPaymentBase: Math.round(monthlyPaymentBase),
            annualPaymentSavings: Math.round(annualPaymentSavings)
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
      field: 'baseInterestRate',
      type: 'required',
      message: 'Base interest rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'loanTerm',
      type: 'required',
      message: 'Loan term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'discountPoints',
      type: 'range',
      message: 'Discount points must be between 0 and 5',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 5)
    },
    {
      field: 'originationPoints',
      type: 'range',
      message: 'Origination points must be between 0 and 3',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 3)
    },
    {
      field: 'pointCost',
      type: 'range',
      message: 'Cost per point must be between $100 and $10,000',
      validator: (value: any) => value === null || value === undefined || (value >= 100 && value <= 10000)
    },
    {
      field: 'borrowerCreditScore',
      type: 'range',
      message: 'Credit score must be between 300 and 850',
      validator: (value: any) => value === null || value === undefined || (value >= 300 && value <= 850)
    },
    {
      field: 'borrowerTaxRate',
      type: 'range',
      message: 'Tax rate must be between 0% and 50%',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50)
    },
    {
      field: 'analysisPeriod',
      type: 'range',
      message: 'Analysis period must be between 1 and 30 years',
      validator: (value: any) => value === null || value === undefined || (value >= 1 && value <= 30)
    }
  ],

  examples: [
    {
      title: 'Standard 1-Point Purchase',
      description: 'Typical scenario of purchasing 1 discount point to reduce interest rate',
      inputs: {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        discountPoints: 1.0,
        originationPoints: 0.5,
        pointCost: 1000,
        propertyValue: 375000,
        downPayment: 75000,
        borrowerCreditScore: 750,
        borrowerTaxRate: 24,
        analysisPeriod: 7
      },
      expectedOutputs: {
        totalPoints: 1.5,
        totalPointCost: 1500,
        effectiveRate: 6.25,
        monthlyPayment: 1847,
        monthlyPaymentSavings: 49,
        totalInterestSavings: 17640,
        breakEvenMonths: 30.6,
        breakEvenYears: 2.6,
        roi: 128.0,
        recommendations: 'Good investment! Break-even in 2.6 years with strong ROI. Points make sense for long-term ownership.'
      }
    },
    {
      title: 'High-Cost Market Scenario',
      description: 'Scenario with higher point costs in expensive markets',
      inputs: {
        loanAmount: 800000,
        baseInterestRate: 7.0,
        loanTerm: 30,
        loanType: 'jumbo',
        discountPoints: 2.0,
        originationPoints: 1.0,
        pointCost: 2000,
        propertyValue: 1000000,
        downPayment: 200000,
        borrowerCreditScore: 780,
        borrowerTaxRate: 32,
        analysisPeriod: 10
      },
      expectedOutputs: {
        totalPoints: 3.0,
        totalPointCost: 6000,
        effectiveRate: 6.5,
        monthlyPayment: 5056,
        monthlyPaymentSavings: 246,
        totalInterestSavings: 88560,
        breakEvenMonths: 24.4,
        breakEvenYears: 2.0,
        roi: 310.0,
        recommendations: 'Excellent investment! Break-even in 2.0 years with outstanding ROI. High-value property makes points very attractive.'
      }
    }
  ]
};

// Helper function for recommendations
function generateRecommendations(
  breakEvenYears: number, 
  analysisPeriod: number, 
  totalInterestSavings: number, 
  creditScore: number,
  loanType: string
): string {
  const recommendations = [];
  
  if (breakEvenYears < analysisPeriod) {
    recommendations.push('Points are a good investment - you\'ll break even before your analysis period.');
  } else if (breakEvenYears < 5) {
    recommendations.push('Points may be worthwhile if you plan to keep the loan long-term.');
  } else {
    recommendations.push('Points may not be cost-effective given your timeline.');
  }
  
  if (totalInterestSavings > 50000) {
    recommendations.push('Significant interest savings make points very attractive.');
  } else if (totalInterestSavings > 20000) {
    recommendations.push('Moderate interest savings provide good value for points.');
  }
  
  if (creditScore >= 750) {
    recommendations.push('Excellent credit score - you qualify for the best point pricing.');
  } else if (creditScore >= 700) {
    recommendations.push('Good credit score - consider improving it for better point rates.');
  }
  
  if (loanType === 'conventional' || loanType === 'jumbo') {
    recommendations.push('Conventional loans typically offer the best point pricing.');
  } else if (loanType === 'fha') {
    recommendations.push('FHA loans have different point structures - verify pricing.');
  }
  
  return recommendations.join(' ');
}