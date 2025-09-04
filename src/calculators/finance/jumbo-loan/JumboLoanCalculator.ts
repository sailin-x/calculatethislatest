import { Calculator } from '../../../types/calculator';

export const jumboLoanCalculator: Calculator = {
  id: 'jumbo-loan',
  title: 'Jumbo Loan Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate jumbo loan payments, costs, and requirements for high-value properties',
  
  usageInstructions: [
    'Enter loan information including amount, interest rate, and term',
    'Select loan type and payment structure',
    'Input property details and borrower information',
    'Set down payment and closing costs',
    'Review comprehensive jumbo loan analysis and qualification requirements'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '800000',
      tooltip: 'Principal loan amount',
      defaultValue: 800000,
      min: 500000,
      max: 10000000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '7.0',
      tooltip: 'Annual interest rate',
      defaultValue: 7.0,
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Loan term in years',
      defaultValue: 30,
      min: 10,
      max: 50
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed-rate', label: 'Fixed Rate' },
        { value: 'adjustable-rate', label: 'Adjustable Rate' },
        { value: 'interest-only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' }
      ],
      tooltip: 'Type of jumbo loan',
      defaultValue: 'fixed-rate'
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'principal-interest', label: 'Principal & Interest' },
        { value: 'interest-only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      tooltip: 'Type of payment structure',
      defaultValue: 'principal-interest'
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Current property value',
      defaultValue: 1000000,
      min: 500000,
      max: 20000000
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-family', label: 'Single Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi-family', label: 'Multi Family' },
        { value: 'luxury', label: 'Luxury' }
      ],
      tooltip: 'Type of property',
      defaultValue: 'single-family'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      placeholder: '200000',
      tooltip: 'Down payment amount',
      defaultValue: 200000,
      min: 100000,
      max: 10000000
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Closing costs and fees',
      defaultValue: 15000,
      min: 5000,
      max: 100000
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Annual property taxes',
      defaultValue: 8000,
      min: 1000,
      max: 100000
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 2000,
      min: 500,
      max: 20000
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
      id: 'borrowerIncome',
      label: 'Borrower Annual Income',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Annual income of the borrower',
      defaultValue: 200000,
      min: 50000,
      max: 5000000
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: false,
      placeholder: '750',
      tooltip: 'FICO credit score',
      defaultValue: 750,
      min: 300,
      max: 850
    },
    {
      id: 'conventionalLimit',
      label: 'Conventional Loan Limit',
      type: 'currency',
      required: false,
      placeholder: '726200',
      tooltip: 'Conventional loan limit in the area',
      defaultValue: 726200,
      min: 500000,
      max: 1500000
    },
    {
      id: 'jumboPremium',
      label: 'Jumbo Loan Premium',
      type: 'percentage',
      required: false,
      placeholder: '0.5',
      tooltip: 'Additional interest rate premium for jumbo loans',
      defaultValue: 0.5,
      min: 0,
      max: 2
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
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'LTV ratio at loan origination'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'DTI ratio based on total monthly payment'
    },
    {
      id: 'jumboAmount',
      label: 'Jumbo Amount',
      type: 'currency',
      format: '$0,0',
      explanation: 'Amount exceeding conventional loan limit'
    },
    {
      id: 'jumboPremiumCost',
      label: 'Jumbo Premium Cost',
      type: 'currency',
      format: '$0,0',
      explanation: 'Additional cost due to jumbo loan premium'
    },
    {
      id: 'qualificationScore',
      label: 'Qualification Score',
      type: 'number',
      format: '0',
      explanation: 'Qualification likelihood score (0-100)'
    },
    {
      id: 'qualificationStatus',
      label: 'Qualification Status',
      type: 'text',
      explanation: 'Qualification status assessment'
    },
    {
      id: 'conventionalComparison',
      label: 'Conventional Loan Comparison',
      type: 'text',
      explanation: 'Comparison with conventional loan options'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Risk assessment for jumbo loan'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for jumbo loan financing'
    }
  ],

  formulas: [
    {
      id: 'jumbo-loan-analysis',
      name: 'Jumbo Loan Analysis',
      description: 'Calculate comprehensive jumbo loan payments and qualification analysis',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const interestRate = (inputs.interestRate || 7.0) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const loanType = inputs.loanType || 'fixed-rate';
        const paymentType = inputs.paymentType || 'principal-interest';
        const propertyValue = inputs.propertyValue || 0;
        const downPayment = inputs.downPayment || 0;
        const closingCosts = inputs.closingCosts || 0;
        const propertyTaxes = inputs.propertyTaxes || 0;
        const homeownersInsurance = inputs.homeownersInsurance || 0;
        const pmi = inputs.pmi || 0;
        const hoaFees = inputs.hoaFees || 0;
        const borrowerIncome = inputs.borrowerIncome || 0;
        const conventionalLimit = inputs.conventionalLimit || 726200;
        const jumboPremium = (inputs.jumboPremium || 0.5) / 100;
        
        // Calculate effective interest rate with jumbo premium
        const effectiveRate = interestRate + jumboPremium;
        const monthlyRate = effectiveRate / 12;
        
        // Calculate monthly payment based on payment type
        let monthlyPayment = 0;
        if (paymentType === 'principal-interest') {
          const totalPayments = loanTerm * 12;
          monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
        } else if (paymentType === 'interest-only') {
          monthlyPayment = loanAmount * monthlyRate;
        } else if (paymentType === 'balloon') {
          // Simplified balloon payment calculation
          const interestOnlyPayment = loanAmount * monthlyRate;
          const principalPayment = loanAmount / (loanTerm * 12);
          monthlyPayment = interestOnlyPayment + principalPayment;
        }
        
        // Calculate total monthly payment
        const monthlyPropertyTaxes = propertyTaxes / 12;
        const monthlyHomeownersInsurance = homeownersInsurance / 12;
        const totalMonthlyPayment = monthlyPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + pmi + hoaFees;
        
        // Calculate ratios
        const loanToValueRatio = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
        const debtToIncomeRatio = borrowerIncome > 0 ? (totalMonthlyPayment * 12 / borrowerIncome) * 100 : 0;
        
        // Calculate jumbo loan specifics
        const jumboAmount = Math.max(0, loanAmount - conventionalLimit);
        const jumboPremiumCost = calculateJumboPremiumCost(loanAmount, effectiveRate, loanTerm, conventionalLimit, interestRate);
        
        // Calculate total costs
        const totalInterestCost = calculateTotalInterest(loanAmount, monthlyRate, loanTerm * 12, paymentType);
        const totalLoanCost = loanAmount + totalInterestCost;
        
        // Calculate qualification score
        const qualificationScore = calculateQualificationScore(
          inputs, loanToValueRatio, debtToIncomeRatio, jumboAmount
        );
        
        // Generate status and recommendations
        const qualificationStatus = determineQualificationStatus(qualificationScore);
        const conventionalComparison = generateConventionalComparison(
          loanAmount, conventionalLimit, jumboPremiumCost, totalInterestCost
        );
        const riskAssessment = generateRiskAssessment(
          loanToValueRatio, debtToIncomeRatio, jumboAmount, qualificationScore
        );
        const recommendations = generateRecommendations(
          qualificationScore, loanToValueRatio, debtToIncomeRatio, jumboAmount
        );
        
        return {
          outputs: {
            monthlyPayment: Math.round(monthlyPayment),
            totalMonthlyPayment: Math.round(totalMonthlyPayment),
            totalInterestCost: Math.round(totalInterestCost),
            totalLoanCost: Math.round(totalLoanCost),
            loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
            debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
            jumboAmount: Math.round(jumboAmount),
            jumboPremiumCost: Math.round(jumboPremiumCost),
            qualificationScore,
            qualificationStatus,
            conventionalComparison,
            riskAssessment,
            recommendations
          },
          explanation: `Jumbo loan analysis complete. Monthly payment: $${monthlyPayment.toLocaleString()}. LTV: ${loanToValueRatio.toFixed(1)}%. DTI: ${debtToIncomeRatio.toFixed(1)}%.`,
          intermediateSteps: {
            effectiveRate: Math.round(effectiveRate * 10000) / 10000,
            monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
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
      message: 'Loan amount must exceed conventional loan limit for jumbo loan',
      validator: (value: any, allInputs: Record<string, any>) => {
        const conventionalLimit = allInputs?.conventionalLimit || 726200;
        return value > conventionalLimit;
      }
    },
    {
      field: 'downPayment',
      type: 'business',
      message: 'Down payment must be at least 20% for jumbo loans',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        return propertyValue === 0 || value >= propertyValue * 0.2;
      }
    }
  ],

  examples: [
    {
      title: 'Standard Jumbo Loan',
      description: 'A typical jumbo loan for a luxury single-family home',
      inputs: {
        loanAmount: 800000,
        interestRate: 7.0,
        loanTerm: 30,
        loanType: 'fixed-rate',
        paymentType: 'principal-interest',
        propertyValue: 1000000,
        propertyType: 'single-family',
        downPayment: 200000,
        closingCosts: 15000,
        propertyTaxes: 8000,
        homeownersInsurance: 2000,
        pmi: 0,
        hoaFees: 0,
        borrowerIncome: 200000,
        borrowerCreditScore: 750,
        conventionalLimit: 726200,
        jumboPremium: 0.5
      },
      expectedOutputs: {
        monthlyPayment: 5324,
        totalMonthlyPayment: 6324,
        totalInterestCost: 1116640,
        totalLoanCost: 1916640,
        loanToValueRatio: 80.0,
        debtToIncomeRatio: 37.9,
        jumboAmount: 73800,
        jumboPremiumCost: 15000,
        qualificationScore: 75,
        qualificationStatus: 'Likely Qualified',
        conventionalComparison: 'Jumbo loan costs $15,000 more in interest due to premium',
        riskAssessment: 'Moderate risk - good qualification score with manageable DTI',
        recommendations: 'Good candidate for jumbo loan. Consider larger down payment to reduce LTV.'
      }
    },
    {
      title: 'High-Value Jumbo Loan',
      description: 'A large jumbo loan for an ultra-luxury property',
      inputs: {
        loanAmount: 2000000,
        interestRate: 7.5,
        loanTerm: 30,
        loanType: 'adjustable-rate',
        paymentType: 'principal-interest',
        propertyValue: 2500000,
        propertyType: 'luxury',
        downPayment: 500000,
        closingCosts: 25000,
        propertyTaxes: 15000,
        homeownersInsurance: 4000,
        pmi: 0,
        hoaFees: 500,
        borrowerIncome: 500000,
        borrowerCreditScore: 780,
        conventionalLimit: 726200,
        jumboPremium: 0.75
      },
      expectedOutputs: {
        monthlyPayment: 14000,
        totalMonthlyPayment: 16250,
        totalInterestCost: 3040000,
        totalLoanCost: 5040000,
        loanToValueRatio: 80.0,
        debtToIncomeRatio: 39.0,
        jumboAmount: 1273800,
        jumboPremiumCost: 45000,
        qualificationScore: 70,
        qualificationStatus: 'Likely Qualified',
        conventionalComparison: 'Significant jumbo premium cost of $45,000',
        riskAssessment: 'Moderate risk - high loan amount but strong borrower profile',
        recommendations: 'Qualified but consider shorter term or larger down payment to reduce risk.'
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

function calculateJumboPremiumCost(
  loanAmount: number, 
  effectiveRate: number, 
  loanTerm: number, 
  conventionalLimit: number, 
  baseRate: number
): number {
  const jumboAmount = Math.max(0, loanAmount - conventionalLimit);
  const premiumRate = effectiveRate - baseRate;
  
  // Calculate additional interest cost due to premium
  const monthlyPremiumRate = premiumRate / 12;
  const totalPayments = loanTerm * 12;
  
  if (monthlyPremiumRate === 0) return 0;
  
  const monthlyPayment = (jumboAmount * monthlyPremiumRate * Math.pow(1 + monthlyPremiumRate, totalPayments)) / 
                        (Math.pow(1 + monthlyPremiumRate, totalPayments) - 1);
  
  return (monthlyPayment * totalPayments) - jumboAmount;
}

function calculateQualificationScore(
  inputs: Record<string, any>, 
  ltv: number, 
  dti: number, 
  jumboAmount: number
): number {
  let score = 50; // Base score
  
  // Credit score impact
  const creditScore = inputs.borrowerCreditScore || 0;
  if (creditScore >= 780) score += 25;
  else if (creditScore >= 740) score += 20;
  else if (creditScore >= 700) score += 15;
  else if (creditScore >= 680) score += 10;
  else if (creditScore < 620) score -= 20;
  
  // LTV impact
  if (ltv <= 70) score += 20;
  else if (ltv <= 80) score += 15;
  else if (ltv <= 85) score += 10;
  else if (ltv > 90) score -= 15;
  
  // DTI impact
  if (dti <= 28) score += 20;
  else if (dti <= 36) score += 15;
  else if (dti <= 43) score += 10;
  else if (dti > 50) score -= 20;
  
  // Jumbo amount impact
  const jumboPercentage = inputs.propertyValue > 0 ? (jumboAmount / inputs.propertyValue) * 100 : 0;
  if (jumboPercentage <= 20) score += 10;
  else if (jumboPercentage <= 40) score += 5;
  else if (jumboPercentage > 60) score -= 10;
  
  return Math.min(100, Math.max(0, score));
}

function determineQualificationStatus(score: number): string {
  if (score >= 80) return 'Highly Qualified';
  else if (score >= 70) return 'Likely Qualified';
  else if (score >= 60) return 'Conditionally Qualified';
  else if (score >= 50) return 'Borderline Qualified';
  else return 'Not Likely Qualified';
}

function generateConventionalComparison(
  loanAmount: number, 
  conventionalLimit: number, 
  jumboPremiumCost: number, 
  totalInterestCost: number
): string {
  if (loanAmount <= conventionalLimit) {
    return 'Loan amount within conventional limits - no jumbo premium';
  }
  
  const premiumPercentage = totalInterestCost > 0 ? (jumboPremiumCost / totalInterestCost) * 100 : 0;
  return `Jumbo loan costs $${jumboPremiumCost.toLocaleString()} more in interest due to premium (${premiumPercentage.toFixed(1)}% increase)`;
}

function generateRiskAssessment(
  ltv: number, 
  dti: number, 
  jumboAmount: number, 
  qualificationScore: number
): string {
  const riskFactors = [];
  
  if (ltv > 80) riskFactors.push('High LTV ratio');
  if (dti > 43) riskFactors.push('High debt-to-income ratio');
  if (jumboAmount > 1000000) riskFactors.push('Large jumbo amount');
  if (qualificationScore < 60) riskFactors.push('Low qualification score');
  
  if (riskFactors.length === 0) {
    return 'Low risk - strong borrower profile and manageable loan terms';
  } else if (riskFactors.length <= 2) {
    return `Moderate risk - ${riskFactors.join(', ')}`;
  } else {
    return `High risk - multiple risk factors: ${riskFactors.join(', ')}`;
  }
}

function generateRecommendations(
  qualificationScore: number, 
  ltv: number, 
  dti: number, 
  jumboAmount: number
): string {
  const recommendations = [];
  
  if (qualificationScore >= 80) {
    recommendations.push('Excellent candidate for jumbo loan');
  } else if (qualificationScore >= 70) {
    recommendations.push('Good candidate for jumbo loan');
  } else if (qualificationScore >= 60) {
    recommendations.push('Conditional approval likely with improvements');
  } else {
    recommendations.push('Consider conventional loan or improve qualification factors');
  }
  
  if (ltv > 80) {
    recommendations.push('Consider larger down payment to reduce LTV');
  }
  
  if (dti > 43) {
    recommendations.push('Reduce existing debt to improve DTI ratio');
  }
  
  if (jumboAmount > 1000000) {
    recommendations.push('Large jumbo amount - consider shorter term or larger down payment');
  }
  
  return recommendations.join('. ');
}
