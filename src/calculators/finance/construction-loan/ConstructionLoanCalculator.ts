import { Calculator } from '../../types/calculator';
import { calculateConstructionLoan, generateConstructionLoanAnalysis } from './formulas';
import { validateConstructionLoanInputs } from './validation';

export const ConstructionLoanCalculator: Calculator = {
  id: 'construction-loan-calculator',
  name: 'Construction Loan Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate construction loan payments, interest reserves, draw schedules, and project financing analysis for real estate development projects.',
  inputs: [
    {
      id: 'projectType',
      name: 'Project Type',
      type: 'select',
      unit: '',
      required: true,
      description: 'Type of construction project',
      placeholder: 'Select project type',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'land-development', label: 'Land Development' },
        { value: 'renovation', label: 'Renovation' }
      ]
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total construction loan amount',
      placeholder: 'Enter loan amount',
      min: 100000,
      max: 100000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on construction loan',
      placeholder: 'Enter interest rate',
      min: 1,
      max: 25
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'months',
      required: true,
      description: 'Total loan term in months',
      placeholder: 'Enter loan term',
      min: 6,
      max: 36
    },
    {
      id: 'constructionPeriod',
      name: 'Construction Period',
      type: 'number',
      unit: 'months',
      required: true,
      description: 'Expected construction duration in months',
      placeholder: 'Enter construction period',
      min: 3,
      max: 24
    },
    {
      id: 'projectCost',
      name: 'Total Project Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total project cost including land, construction, and soft costs',
      placeholder: 'Enter total project cost',
      min: 100000,
      max: 200000000
    },
    {
      id: 'landCost',
      name: 'Land Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of land acquisition',
      placeholder: 'Enter land cost',
      min: 0,
      max: 100000000
    },
    {
      id: 'constructionCost',
      name: 'Construction Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Hard construction costs',
      placeholder: 'Enter construction cost',
      min: 50000,
      max: 150000000
    },
    {
      id: 'softCosts',
      name: 'Soft Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Architectural, engineering, permits, and other soft costs',
      placeholder: 'Enter soft costs',
      min: 0,
      max: 50000000
    },
    {
      id: 'contingency',
      name: 'Contingency',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Contingency reserve for unexpected costs',
      placeholder: 'Enter contingency amount',
      min: 0,
      max: 20000000
    },
    {
      id: 'equityContribution',
      name: 'Equity Contribution',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Developer equity contribution',
      placeholder: 'Enter equity contribution',
      min: 0,
      max: 100000000
    },
    {
      id: 'drawSchedule',
      name: 'Draw Schedule',
      type: 'select',
      unit: '',
      required: true,
      description: 'Frequency of construction draws',
      placeholder: 'Select draw schedule',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'bi-monthly', label: 'Bi-Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'milestone', label: 'Milestone-Based' }
      ]
    },
    {
      id: 'interestReserve',
      name: 'Interest Reserve',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Interest reserve amount (0 for no reserve)',
      placeholder: 'Enter interest reserve',
      min: 0,
      max: 10000000
    },
    {
      id: 'originationFee',
      name: 'Origination Fee',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Loan origination fee percentage',
      placeholder: 'Enter origination fee',
      min: 0,
      max: 5
    },
    {
      id: 'appraisalFee',
      name: 'Appraisal Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Appraisal fee',
      placeholder: 'Enter appraisal fee',
      min: 0,
      max: 10000
    },
    {
      id: 'legalFee',
      name: 'Legal Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Legal fees for loan documentation',
      placeholder: 'Enter legal fee',
      min: 0,
      max: 25000
    },
    {
      id: 'titleFee',
      name: 'Title Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Title insurance and escrow fees',
      placeholder: 'Enter title fee',
      min: 0,
      max: 15000
    },
    {
      id: 'inspectionFee',
      name: 'Inspection Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Construction inspection fees',
      placeholder: 'Enter inspection fee',
      min: 0,
      max: 20000
    },
    {
      id: 'loanToCost',
      name: 'Loan-to-Cost Ratio',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Maximum loan-to-cost ratio allowed',
      placeholder: 'Enter loan-to-cost ratio',
      min: 50,
      max: 90
    },
    {
      id: 'loanToValue',
      name: 'Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Maximum loan-to-value ratio allowed',
      placeholder: 'Enter loan-to-value ratio',
      min: 50,
      max: 85
    },
    {
      id: 'completionValue',
      name: 'Projected Completion Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Projected property value upon completion',
      placeholder: 'Enter completion value',
      min: 100000,
      max: 300000000
    },
    {
      id: 'exitStrategy',
      name: 'Exit Strategy',
      type: 'select',
      unit: '',
      required: true,
      description: 'Planned exit strategy for the project',
      placeholder: 'Select exit strategy',
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'hold', label: 'Hold' },
        { value: 'lease', label: 'Lease' }
      ]
    },
    {
      id: 'constructionStartDate',
      name: 'Construction Start Date',
      type: 'date',
      unit: '',
      required: true,
      description: 'Expected construction start date',
      placeholder: 'Select start date'
    },
    {
      id: 'completionDate',
      name: 'Expected Completion Date',
      type: 'date',
      unit: '',
      required: true,
      description: 'Expected project completion date',
      placeholder: 'Select completion date'
    }
  ],
  outputs: [
    {
      id: 'monthlyInterest',
      name: 'Monthly Interest Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly interest payment during construction'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total interest cost over construction period'
    },
    {
      id: 'interestReserveNeeded',
      name: 'Interest Reserve Needed',
      type: 'number',
      unit: 'USD',
      description: 'Total interest reserve needed for construction period'
    },
    {
      id: 'totalLoanCost',
      name: 'Total Loan Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost including principal, interest, and fees'
    },
    {
      id: 'loanFees',
      name: 'Total Loan Fees',
      type: 'number',
      unit: 'USD',
      description: 'Total loan fees (origination, appraisal, legal, etc.)'
    },
    {
      id: 'fundingGap',
      name: 'Funding Gap',
      type: 'number',
      unit: 'USD',
      description: 'Difference between project cost and available funding'
    },
    {
      id: 'equityRequired',
      name: 'Equity Required',
      type: 'number',
      unit: 'USD',
      description: 'Total equity required for the project'
    },
    {
      id: 'loanToCostRatio',
      name: 'Actual Loan-to-Cost Ratio',
      type: 'number',
      unit: '%',
      description: 'Actual loan-to-cost ratio based on project costs'
    },
    {
      id: 'loanToValueRatio',
      name: 'Actual Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      description: 'Actual loan-to-value ratio based on completion value'
    },
    {
      id: 'profitMargin',
      name: 'Projected Profit Margin',
      type: 'number',
      unit: '%',
      description: 'Projected profit margin based on completion value'
    },
    {
      id: 'roi',
      name: 'Return on Investment',
      type: 'number',
      unit: '%',
      description: 'Return on investment for equity contribution'
    },
    {
      id: 'breakEvenPoint',
      name: 'Break-Even Point',
      type: 'number',
      unit: 'months',
      description: 'Number of months to break even on investment'
    },
    {
      id: 'monthlyDraws',
      name: 'Monthly Draw Amount',
      type: 'number',
      unit: 'USD',
      description: 'Average monthly draw amount'
    },
    {
      id: 'drawSchedule',
      name: 'Draw Schedule',
      type: 'array',
      unit: '',
      description: 'Detailed draw schedule with dates and amounts'
    },
    {
      id: 'cashFlow',
      name: 'Cash Flow Analysis',
      type: 'array',
      unit: '',
      description: 'Monthly cash flow analysis during construction'
    },
    {
      id: 'riskAnalysis',
      name: 'Risk Analysis',
      type: 'object',
      unit: '',
      description: 'Risk assessment and mitigation recommendations'
    },
    {
      id: 'constructionLoanAnalysis',
      name: 'Construction Loan Analysis',
      type: 'string',
      unit: '',
      description: 'Comprehensive analysis of construction loan terms and project feasibility'
    }
  ],
  calculate: (inputs) => {
    return calculateConstructionLoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateConstructionLoanAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Interest Payment',
      formula: 'Monthly Interest = (Outstanding Balance × Annual Interest Rate) ÷ 12',
      description: 'Calculate monthly interest payment on outstanding loan balance'
    },
    {
      name: 'Total Interest Cost',
      formula: 'Total Interest = Sum of all monthly interest payments during construction period',
      description: 'Calculate total interest cost over the construction period'
    },
    {
      name: 'Interest Reserve Needed',
      formula: 'Interest Reserve = Total Interest Cost - Interest Reserve Provided',
      description: 'Calculate additional interest reserve needed beyond what is provided'
    },
    {
      name: 'Loan-to-Cost Ratio',
      formula: 'LTC Ratio = (Loan Amount ÷ Total Project Cost) × 100',
      description: 'Calculate actual loan-to-cost ratio'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV Ratio = (Loan Amount ÷ Completion Value) × 100',
      description: 'Calculate actual loan-to-value ratio'
    },
    {
      name: 'Profit Margin',
      formula: 'Profit Margin = ((Completion Value - Total Project Cost) ÷ Total Project Cost) × 100',
      description: 'Calculate projected profit margin'
    },
    {
      name: 'Return on Investment',
      formula: 'ROI = ((Completion Value - Total Project Cost) ÷ Equity Contribution) × 100',
      description: 'Calculate return on equity investment'
    },
    {
      name: 'Funding Gap',
      formula: 'Funding Gap = Total Project Cost - Loan Amount - Equity Contribution',
      description: 'Calculate funding gap that needs to be addressed'
    }
  ],
  examples: [
    {
      name: 'Residential Development',
      inputs: {
        projectType: 'residential',
        loanAmount: 2000000,
        interestRate: 8.5,
        loanTerm: 18,
        constructionPeriod: 12,
        projectCost: 2500000,
        landCost: 500000,
        constructionCost: 1800000,
        softCosts: 150000,
        contingency: 50000,
        equityContribution: 500000,
        drawSchedule: 'monthly',
        interestReserve: 150000,
        originationFee: 1.5,
        appraisalFee: 3000,
        legalFee: 8000,
        titleFee: 5000,
        inspectionFee: 6000,
        loanToCost: 80,
        loanToValue: 75,
        completionValue: 3200000,
        exitStrategy: 'sale',
        constructionStartDate: '2024-01-01',
        completionDate: '2024-12-31'
      },
      description: 'Residential development project with $2M loan, 12-month construction period'
    },
    {
      name: 'Commercial Office Building',
      inputs: {
        projectType: 'commercial',
        loanAmount: 8000000,
        interestRate: 7.25,
        loanTerm: 24,
        constructionPeriod: 18,
        projectCost: 10000000,
        landCost: 2000000,
        constructionCost: 7000000,
        softCosts: 800000,
        contingency: 200000,
        equityContribution: 2000000,
        drawSchedule: 'bi-monthly',
        interestReserve: 400000,
        originationFee: 1.0,
        appraisalFee: 5000,
        legalFee: 15000,
        titleFee: 8000,
        inspectionFee: 12000,
        loanToCost: 80,
        loanToValue: 70,
        completionValue: 14000000,
        exitStrategy: 'refinance',
        constructionStartDate: '2024-03-01',
        completionDate: '2025-08-31'
      },
      description: 'Commercial office building with $8M loan, 18-month construction period'
    },
    {
      name: 'Mixed-Use Development',
      inputs: {
        projectType: 'mixed-use',
        loanAmount: 15000000,
        interestRate: 6.75,
        loanTerm: 30,
        constructionPeriod: 24,
        projectCost: 20000000,
        landCost: 5000000,
        constructionCost: 13000000,
        softCosts: 1500000,
        contingency: 500000,
        equityContribution: 5000000,
        drawSchedule: 'quarterly',
        interestReserve: 800000,
        originationFee: 0.75,
        appraisalFee: 8000,
        legalFee: 25000,
        titleFee: 12000,
        inspectionFee: 20000,
        loanToCost: 75,
        loanToValue: 65,
        completionValue: 28000000,
        exitStrategy: 'hold',
        constructionStartDate: '2024-06-01',
        completionDate: '2026-05-31'
      },
      description: 'Large mixed-use development with $15M loan, 24-month construction period'
    }
  ]
};
