import { Calculator } from '../../../types/calculator';

export const loanToValueRatioCalculator: Calculator = {
  id: 'loan-to-value-ratio',
  title: 'Loan-to-Value (LTV) Ratio Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Investment',
  description: 'Calculate Loan-to-Value (LTV) ratio for real estate financing, determining maximum loan amount based on property value and lender requirements.',
  
  usageInstructions: [
    'Enter the current market value of the property',
    'Input the requested loan amount',
    'Set the maximum LTV ratio allowed by your lender',
    'Select property type, occupancy type, and loan type',
    'Provide borrower information including credit score and DTI ratio',
    'Review comprehensive LTV analysis with risk assessment and approval probability'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Current market value of the property',
      defaultValue: 500000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '400000',
      tooltip: 'Requested loan amount',
      defaultValue: 400000,
      min: 1000,
      max: 10000000
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
      id: 'maxLtvRatio',
      label: 'Maximum LTV Ratio (%)',
      type: 'percentage',
      required: false,
      placeholder: '80',
      tooltip: 'Maximum LTV ratio allowed by lender',
      defaultValue: 80,
      min: 50,
      max: 100
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'single-family', label: 'Single Family' },
        { value: 'multi-family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'investment', label: 'Investment' },
        { value: 'vacation-home', label: 'Vacation Home' },
        { value: 'manufactured-home', label: 'Manufactured Home' },
        { value: 'land', label: 'Land' },
        { value: 'mixed-use', label: 'Mixed-Use' }
      ],
      tooltip: 'Type of property',
      defaultValue: 'single-family'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: false,
      options: [
        { value: 'primary-residence', label: 'Primary Residence' },
        { value: 'secondary-home', label: 'Secondary Home' },
        { value: 'investment-property', label: 'Investment Property' },
        { value: 'vacation-rental', label: 'Vacation Rental' },
        { value: 'commercial-use', label: 'Commercial Use' }
      ],
      tooltip: 'Occupancy status',
      defaultValue: 'primary-residence'
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
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'hard-money', label: 'Hard Money' },
        { value: 'bridge-loan', label: 'Bridge Loan' },
        { value: 'construction-loan', label: 'Construction Loan' },
        { value: 'heloc', label: 'HELOC' }
      ],
      tooltip: 'Type of loan',
      defaultValue: 'conventional'
    },
    {
      id: 'creditScore',
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
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      required: false,
      placeholder: '35',
      tooltip: 'Borrower DTI ratio',
      defaultValue: 35,
      min: 0,
      max: 100
    }
  ],

  outputs: [
    {
      id: 'ltvRatio',
      label: 'LTV Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Calculated loan-to-value ratio'
    },
    {
      id: 'maxLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      format: '$0,0',
      explanation: 'Maximum loan amount based on LTV ratio'
    },
    {
      id: 'requiredDownPayment',
      label: 'Required Down Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Required down payment amount'
    },
    {
      id: 'loanApprovalStatus',
      label: 'Loan Approval Status',
      type: 'text',
      explanation: 'Loan approval status based on LTV ratio'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Overall risk assessment score (0-100)'
    },
    {
      id: 'approvalProbability',
      label: 'Approval Probability',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Probability of loan approval'
    },
    {
      id: 'pmiRequired',
      label: 'PMI Required',
      type: 'text',
      explanation: 'Whether Private Mortgage Insurance is required'
    },
    {
      id: 'pmiCost',
      label: 'PMI Cost',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly PMI cost if required'
    }
  ],

  formulas: [
    {
      id: 'ltv-ratio',
      name: 'LTV Ratio Calculation',
      description: 'Calculate the loan-to-value ratio and related metrics',
      calculate: (inputs: Record<string, any>) => {
        const propertyValue = inputs.propertyValue || 0;
        const loanAmount = inputs.loanAmount || 0;
        const maxLtvRatio = inputs.maxLtvRatio || 80;
        const creditScore = inputs.creditScore || 750;
        const debtToIncomeRatio = inputs.debtToIncomeRatio || 35;
        
        // Calculate LTV ratio
        const ltvRatio = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
        
        // Calculate maximum loan amount based on LTV
        const maxLoanAmount = propertyValue * (maxLtvRatio / 100);
        
        // Calculate required down payment
        const requiredDownPayment = propertyValue - maxLoanAmount;
        
        // Determine loan approval status
        const loanApprovalStatus = determineApprovalStatus(ltvRatio, maxLtvRatio, creditScore, debtToIncomeRatio);
        
        // Calculate risk score
        const riskScore = calculateRiskScore(inputs, ltvRatio);
        
        // Calculate approval probability
        const approvalProbability = calculateApprovalProbability(riskScore, creditScore, inputs);
        
        // Determine PMI requirements
        const pmiRequired = ltvRatio > 80;
        const pmiCost = pmiRequired ? calculatePMICost(loanAmount, ltvRatio) : 0;
        
        return {
          outputs: {
            ltvRatio: Math.round(ltvRatio * 100) / 100,
            maxLoanAmount: Math.round(maxLoanAmount),
            requiredDownPayment: Math.round(requiredDownPayment),
            loanApprovalStatus,
            riskScore,
            approvalProbability: Math.round(approvalProbability * 100) / 100,
            pmiRequired,
            pmiCost: Math.round(pmiCost)
          },
          explanation: `The LTV ratio is ${ltvRatio.toFixed(2)}%, which is ${ltvRatio > maxLtvRatio ? 'above' : 'within'} the maximum allowed ratio of ${maxLtvRatio}%.`,
          intermediateSteps: {
            propertyValue,
            loanAmount,
            calculatedLtvRatio: ltvRatio,
            maxLtvRatio
          }
        };
      }
    }
  ],

  validationRules: [
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
      field: 'loanAmount',
      type: 'business',
      message: 'Loan amount cannot exceed property value',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        return value <= propertyValue;
      }
    },
    {
      field: 'maxLtvRatio',
      type: 'range',
      message: 'Maximum LTV ratio must be between 50% and 100%',
      validator: (value: any) => value === null || value === undefined || (value >= 50 && value <= 100)
    }
  ],

  examples: [
    {
      title: 'Conventional Purchase',
      description: 'A $500,000 property with $400,000 loan request and 80% max LTV',
      inputs: {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000,
        maxLtvRatio: 80,
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        loanType: 'conventional',
        creditScore: 750,
        debtToIncomeRatio: 35
      },
      expectedOutputs: {
        ltvRatio: 80,
        maxLoanAmount: 400000,
        requiredDownPayment: 100000,
        loanApprovalStatus: 'Approved',
        riskScore: 25,
        approvalProbability: 85,
        pmiRequired: false,
        pmiCost: 0
      }
    },
    {
      title: 'High LTV Investment Property',
      description: 'A $300,000 investment property with $270,000 loan request and 90% max LTV',
      inputs: {
        propertyValue: 300000,
        loanAmount: 270000,
        downPayment: 30000,
        maxLtvRatio: 90,
        propertyType: 'investment',
        occupancyType: 'investment-property',
        loanType: 'conventional',
        creditScore: 720,
        debtToIncomeRatio: 40
      },
      expectedOutputs: {
        ltvRatio: 90,
        maxLoanAmount: 270000,
        requiredDownPayment: 30000,
        loanApprovalStatus: 'Conditional Approval',
        riskScore: 65,
        approvalProbability: 60,
        pmiRequired: true,
        pmiCost: 1350
      }
    }
  ]
};

// Helper functions for calculations
function determineApprovalStatus(ltvRatio: number, maxLtvRatio: number, creditScore: number, debtToIncomeRatio: number): string {
  if (ltvRatio > maxLtvRatio) {
    return 'Denied - LTV too high';
  }
  
  if (creditScore < 620) {
    return 'Denied - Credit score too low';
  }
  
  if (debtToIncomeRatio > 43) {
    return 'Denied - DTI too high';
  }
  
  if (ltvRatio > 80 && creditScore < 700) {
    return 'Conditional Approval - PMI required';
  }
  
  return 'Approved';
}

function calculateRiskScore(inputs: Record<string, any>, ltvRatio: number): number {
  let riskScore = 20; // Base risk score
  
  // LTV Ratio Risk
  if (ltvRatio > 90) riskScore += 30;
  else if (ltvRatio > 80) riskScore += 20;
  else if (ltvRatio > 70) riskScore += 10;
  
  // Property Type Risk
  const propertyType = inputs.propertyType;
  if (propertyType === 'investment') riskScore += 15;
  else if (propertyType === 'commercial') riskScore += 20;
  else if (propertyType === 'vacation-home') riskScore += 10;
  
  // Occupancy Risk
  const occupancyType = inputs.occupancyType;
  if (occupancyType === 'investment-property') riskScore += 15;
  else if (occupancyType === 'secondary-home') riskScore += 10;
  
  // Credit Score Risk
  const creditScore = inputs.creditScore || 750;
  if (creditScore < 650) riskScore += 25;
  else if (creditScore < 700) riskScore += 15;
  else if (creditScore < 750) riskScore += 5;
  
  // DTI Risk
  const debtToIncomeRatio = inputs.debtToIncomeRatio || 35;
  if (debtToIncomeRatio > 40) riskScore += 20;
  else if (debtToIncomeRatio > 35) riskScore += 10;
  
  return Math.min(100, Math.max(0, riskScore));
}

function calculateApprovalProbability(riskScore: number, creditScore: number, inputs: Record<string, any>): number {
  let probability = 100 - riskScore;
  
  // Credit score bonus
  if (creditScore >= 800) probability += 15;
  else if (creditScore >= 750) probability += 10;
  else if (creditScore >= 700) probability += 5;
  
  // Down payment bonus
  const propertyValue = inputs.propertyValue || 0;
  const downPayment = inputs.downPayment || 0;
  if (downPayment > propertyValue * 0.2) probability += 10;
  else if (downPayment > propertyValue * 0.1) probability += 5;
  
  // Property type bonus
  const propertyType = inputs.propertyType;
  if (propertyType === 'single-family') probability += 5;
  else if (propertyType === 'primary-residence') probability += 5;
  
  return Math.min(100, Math.max(0, probability));
}

function calculatePMICost(loanAmount: number, ltvRatio: number): number {
  // Simplified PMI calculation
  let pmiRate = 0.005; // 0.5% base rate
  
  if (ltvRatio > 95) pmiRate = 0.008;
  else if (ltvRatio > 90) pmiRate = 0.006;
  else if (ltvRatio > 85) pmiRate = 0.005;
  
  return loanAmount * pmiRate / 12; // Monthly PMI cost
}
