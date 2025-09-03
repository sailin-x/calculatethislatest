import { Calculator } from '../../../types/calculator';

export const loanToCostRatioCalculator: Calculator = {
  id: 'loan-to-cost-ratio',
  title: 'Loan to Cost (LTC) Ratio Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Investment',
  description: 'Calculate the Loan to Cost ratio for real estate investments, helping assess financing requirements and project feasibility.',
  
  usageInstructions: [
    'Enter project information including total cost, land cost, and construction costs',
    'Input financing details such as requested loan amount, interest rate, and loan term',
    'Set project timeline with construction duration and stabilization period',
    'Provide market assumptions including projected rental income and operating expenses',
    'Assess risk factors for market, construction, leasing, and interest rate risks',
    'Review comprehensive LTC analysis with risk assessment and cash flow projections'
  ],

  inputs: [
    {
      id: 'projectName',
      label: 'Project Name',
      type: 'select',
      required: true,
      options: [
        { value: 'downtown-office', label: 'Downtown Office Tower' },
        { value: 'riverside-apartments', label: 'Riverside Apartments' },
        { value: 'industrial-warehouse', label: 'Industrial Warehouse' },
        { value: 'mixed-use-development', label: 'Mixed-Use Development' },
        { value: 'custom', label: 'Custom Project' }
      ],
      tooltip: 'Name of the real estate development project',
      defaultValue: 'downtown-office'
    },
    {
      id: 'projectType',
      label: 'Project Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'hospitality', label: 'Hospitality' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'educational', label: 'Educational' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'warehouse', label: 'Warehouse' }
      ],
      tooltip: 'Type of real estate development project',
      defaultValue: 'commercial'
    },
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost',
      type: 'currency',
      required: true,
      placeholder: '15000000',
      tooltip: 'Total capital required for the project including all costs',
      defaultValue: 15000000
    },
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      required: true,
      placeholder: '3000000',
      tooltip: 'Cost of the land acquisition',
      defaultValue: 3000000
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost',
      type: 'currency',
      required: true,
      placeholder: '10000000',
      tooltip: 'Total construction and hard costs',
      defaultValue: 10000000
    },
    {
      id: 'softCosts',
      label: 'Soft Costs',
      type: 'currency',
      required: false,
      placeholder: '1500000',
      tooltip: 'Architectural, engineering, permits, and other soft costs',
      defaultValue: 1500000
    },
    {
      id: 'requestedLoanAmount',
      label: 'Requested Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '12000000',
      tooltip: 'Amount of financing requested from lenders',
      defaultValue: 12000000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Annual interest rate for the loan',
      defaultValue: 6.5
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Months)',
      type: 'number',
      required: true,
      placeholder: '24',
      tooltip: 'Length of the loan in months',
      defaultValue: 24,
      min: 1,
      max: 360
    },
    {
      id: 'constructionDuration',
      label: 'Construction Duration (Months)',
      type: 'number',
      required: true,
      placeholder: '24',
      tooltip: 'Expected construction timeline in months',
      defaultValue: 24,
      min: 1,
      max: 60
    }
  ],

  outputs: [
    {
      id: 'ltcRatio',
      label: 'LTC Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Loan to Cost ratio as a percentage'
    },
    {
      id: 'equityRequirement',
      label: 'Equity Requirement',
      type: 'currency',
      format: '$0,0',
      explanation: 'Required equity investment'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly loan payment amount'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Project risk assessment score (0-100)'
    },
    {
      id: 'breakEvenRent',
      label: 'Break-Even Rent',
      type: 'currency',
      format: '$0,0',
      explanation: 'Minimum rental income needed to break even'
    }
  ],

  formulas: [
    {
      id: 'ltc-ratio',
      name: 'LTC Ratio Calculation',
      description: 'Calculate the Loan to Cost ratio for the project',
      calculate: (inputs: Record<string, any>) => {
        const totalCost = inputs.totalProjectCost || 0;
        const loanAmount = inputs.requestedLoanAmount || 0;
        const ltcRatio = totalCost > 0 ? (loanAmount / totalCost) * 100 : 0;
        
        return {
          outputs: {
            ltcRatio: Math.round(ltcRatio * 100) / 100,
            equityRequirement: totalCost - loanAmount,
            monthlyPayment: calculateMonthlyPayment(loanAmount, inputs.interestRate || 0, inputs.loanTerm || 0),
            riskScore: calculateRiskScore(inputs),
            breakEvenRent: calculateBreakEvenRent(inputs)
          },
          explanation: `The LTC ratio is ${ltcRatio.toFixed(2)}%, indicating the loan represents ${ltcRatio.toFixed(2)}% of total project costs.`,
          intermediateSteps: {
            totalProjectCost: totalCost,
            requestedLoanAmount: loanAmount,
            calculatedLtcRatio: ltcRatio
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'totalProjectCost',
      type: 'required',
      message: 'Total project cost is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'requestedLoanAmount',
      type: 'required',
      message: 'Requested loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'requestedLoanAmount',
      type: 'business',
      message: 'Loan amount cannot exceed total project cost',
      validator: (value: any, allInputs: Record<string, any>) => {
        const totalCost = allInputs?.totalProjectCost || 0;
        return value <= totalCost;
      }
    }
  ],

  examples: [
    {
      title: 'Commercial Office Development',
      description: 'A 50,000 sq ft office building development with $15M total cost and $12M loan request',
      inputs: {
        projectName: 'downtown-office',
        projectType: 'commercial',
        totalProjectCost: 15000000,
        landCost: 3000000,
        constructionCost: 10000000,
        softCosts: 1500000,
        requestedLoanAmount: 12000000,
        interestRate: 6.5,
        loanTerm: 24,
        constructionDuration: 24
      },
      expectedOutputs: {
        ltcRatio: 80,
        equityRequirement: 3000000,
        monthlyPayment: 540000,
        riskScore: 45,
        breakEvenRent: 1800000
      }
    },
    {
      title: 'Multifamily Development',
      description: 'A 200-unit apartment complex with $25M total cost and $20M loan request',
      inputs: {
        projectName: 'riverside-apartments',
        projectType: 'multifamily',
        totalProjectCost: 25000000,
        landCost: 5000000,
        constructionCost: 18000000,
        softCosts: 1500000,
        requestedLoanAmount: 20000000,
        interestRate: 7.0,
        loanTerm: 30,
        constructionDuration: 30
      },
      expectedOutputs: {
        ltcRatio: 80,
        equityRequirement: 5000000,
        monthlyPayment: 1330000,
        riskScore: 52,
        breakEvenRent: 3000000
      }
    }
  ]
};

// Helper functions for calculations
function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) return 0;
  
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                         (Math.pow(1 + monthlyRate, loanTerm) - 1);
  
  return Math.round(monthlyPayment);
}

function calculateRiskScore(inputs: Record<string, any>): number {
  let riskScore = 30; // Base risk score
  
  // LTC Ratio Risk
  const totalCost = inputs.totalProjectCost || 0;
  const loanAmount = inputs.requestedLoanAmount || 0;
  if (totalCost > 0) {
    const ltcRatio = (loanAmount / totalCost) * 100;
    if (ltcRatio > 85) riskScore += 30;
    else if (ltcRatio > 75) riskScore += 20;
    else if (ltcRatio > 65) riskScore += 10;
  }
  
  // Project Type Risk
  const projectType = inputs.projectType;
  if (projectType === 'hospitality') riskScore += 15;
  else if (projectType === 'healthcare') riskScore += 10;
  else if (projectType === 'industrial') riskScore += 5;
  
  // Construction Duration Risk
  const constructionDuration = inputs.constructionDuration || 0;
  if (constructionDuration > 36) riskScore += 15;
  else if (constructionDuration > 24) riskScore += 10;
  else if (constructionDuration > 18) riskScore += 5;
  
  // Interest Rate Risk
  const interestRate = inputs.interestRate || 0;
  if (interestRate > 20) riskScore += 25;
  else if (interestRate > 15) riskScore += 20;
  else if (interestRate > 10) riskScore += 15;
  else if (interestRate > 8) riskScore += 10;
  
  return Math.min(100, Math.max(0, riskScore));
}

function calculateBreakEvenRent(inputs: Record<string, any>): number {
  const loanAmount = inputs.requestedLoanAmount || 0;
  const interestRate = inputs.interestRate || 0;
  const annualInterest = loanAmount * (interestRate / 100);
  
  // Simplified break-even calculation
  return Math.round(annualInterest * 1.5); // Assume 1.5x coverage needed
}
