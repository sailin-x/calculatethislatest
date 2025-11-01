import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateBRRRRStrategy, calculateRefinanceAnalysis, generateInvestmentTimeline } from './formulas';
import { validateBRRRRStrategyInputs } from './validation';

export const BRRRRStrategyCalculator: Calculator = {
  id: 'BrrrrStrategyCalculator',
  name: 'BRRRR Strategy Calculator',
  description: 'Calculate the Buy, Rehab, Rent, Refinance, Repeat (BRRRR) real estate investment strategy to analyze potential returns, cash flow, and scalability of your investment portfolio.',
  category: 'finance',
  subcategory: 'investment',
  tags: ['brrrr', 'real-estate', 'investment', 'rehab', 'refinance', 'rental', 'portfolio', 'cash-flow'],
  
  inputs: [
    {
      id: 'purchasePrice',
      label: 'Purchase Price ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000,
      tooltip: 'Purchase price of the property',
      placeholder: '150000'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 5000,
      max: 1000000,
      step: 1000,
      tooltip: 'Initial down payment for purchase',
      placeholder: '30000'
    },
    {
      id: 'purchaseLoanRate',
      label: 'Purchase Loan Rate (%)',
      type: 'percentage',
      required: true,
      min: 3,
      max: 15,
      step: 0.1,
      tooltip: 'Interest rate for initial purchase loan',
      placeholder: '7.5'
    },
    {
      id: 'purchaseLoanTerm',
      label: 'Purchase Loan Term (years)',
      type: 'number',
      required: true,
      min: 15,
      max: 30,
      step: 1,
      tooltip: 'Term of initial purchase loan',
      placeholder: '30'
    },
    {
      id: 'rehabCost',
      label: 'Rehab Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      tooltip: 'Total cost of property rehabilitation',
      placeholder: '25000'
    },
    {
      id: 'rehabTime',
      label: 'Rehab Time (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 24,
      step: 1,
      tooltip: 'Time needed to complete rehabilitation',
      placeholder: '3'
    },
    {
      id: 'afterRepairValue',
      label: 'After Repair Value (ARV) ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000,
      tooltip: 'Estimated property value after rehabilitation',
      placeholder: '220000'
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent ($)',
      type: 'currency',
      required: true,
      min: 500,
      max: 10000,
      step: 50,
      tooltip: 'Expected monthly rental income',
      placeholder: '1800'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      tooltip: 'Monthly property expenses (taxes, insurance, maintenance)',
      placeholder: '400'
    },
    {
      id: 'refinanceRate',
      label: 'Refinance Rate (%)',
      type: 'percentage',
      required: true,
      min: 3,
      max: 12,
      step: 0.1,
      tooltip: 'Interest rate for refinance loan',
      placeholder: '6.5'
    },
    {
      id: 'refinanceTerm',
      label: 'Refinance Term (years)',
      type: 'number',
      required: true,
      min: 15,
      max: 30,
      step: 1,
      tooltip: 'Term of refinance loan',
      placeholder: '30'
    },
    {
      id: 'refinanceLTV',
      label: 'Refinance LTV (%)',
      type: 'percentage',
      required: true,
      min: 60,
      max: 85,
      step: 1,
      tooltip: 'LoanToValue ratio for refinance',
      placeholder: '75'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Closing costs for purchase and refinance',
      placeholder: '8000'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Expected vacancy rate for rental property',
      placeholder: '5'
    },
    {
      id: 'propertyManagement',
      label: 'Property Management (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 15,
      step: 0.5,
      tooltip: 'Property management fee as percentage of rent',
      placeholder: '8'
    },
    {
      id: 'appreciationRate',
      label: 'Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual property appreciation rate',
      placeholder: '3'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual inflation rate',
      placeholder: '2.5'
    }
  ],

  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total cash invested (down payment + rehab costs + closing costs)'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly mortgage payment after refinance'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Net monthly cash flow after all expenses'
    },
    {
      id: 'cashOnCashReturn',
      label: 'CashOnCash Return (%)',
      type: 'percentage',
      explanation: 'Annual return on total cash invested'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Capitalization rate based on net operating income'
    },
    {
      id: 'refinanceProceeds',
      label: 'Refinance Proceeds',
      type: 'currency',
      explanation: 'Cash received from refinance after paying off original loan'
    },
    {
      id: 'equityExtracted',
      label: 'Equity Extracted (%)',
      type: 'percentage',
      explanation: 'Percentage of equity extracted through refinance'
    },
    {
      id: 'totalROI',
      label: 'Total ROI (%)',
      type: 'percentage',
      explanation: 'Total return on investment including appreciation'
    },
    {
      id: 'breakEvenTime',
      label: 'Break-even Time (months)',
      type: 'number',
      explanation: 'Time to recover total investment through cash flow'
    },
    {
      id: 'investmentTimeline',
      label: 'Investment Timeline',
      type: 'text',
      explanation: 'Summary of key dates and milestones'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of risks and considerations'
    },
    {
      id: 'scalabilityAnalysis',
      label: 'Scalability Analysis',
      type: 'text',
      explanation: 'Analysis of strategy scalability and repeatability'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateBRRRRStrategyInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate BRRRR strategy metrics
    const brrrrMetrics = calculateBRRRRStrategy(inputs);
    
    // Calculate refinance analysis
    const refinanceAnalysis = calculateRefinanceAnalysis(inputs, brrrrMetrics);
    
    // Generate investment timeline
    const investmentTimeline = generateInvestmentTimeline(inputs, brrrrMetrics);

    return {
      totalInvestment: brrrrMetrics.totalInvestment,
      monthlyPayment: brrrrMetrics.monthlyPayment,
      monthlyCashFlow: brrrrMetrics.monthlyCashFlow,
      cashOnCashReturn: brrrrMetrics.cashOnCashReturn,
      capRate: brrrrMetrics.capRate,
      refinanceProceeds: refinanceAnalysis.refinanceProceeds,
      equityExtracted: refinanceAnalysis.equityExtracted,
      totalROI: brrrrMetrics.totalROI,
      breakEvenTime: brrrrMetrics.breakEvenTime,
      investmentTimeline: investmentTimeline.summary,
      riskAssessment: brrrrMetrics.riskAssessment,
      scalabilityAnalysis: refinanceAnalysis.scalabilityAnalysis
    };
  },

  formulas: [
    {
      name: 'Total Investment',
      formula: 'Total Investment = Down Payment + Rehab Costs + Closing Costs',
      description: 'Total cash required for the BRRRR strategy'
    },
    {
      name: 'CashOnCash Return',
      formula: 'CoC Return = (Annual Cash Flow / Total Investment) × 100',
      description: 'Annual return on total cash invested'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (Net Operating Income / Property Value) × 100',
      description: 'Capitalization rate based on property value'
    },
    {
      name: 'Refinance Proceeds',
      formula: 'Refinance Proceeds = (ARV × LTV) - Remaining Loan Balance',
      description: 'Cash received from refinance after paying off original loan'
    },
    {
      name: 'Equity Extraction',
      formula: 'Equity % = (Refinance Proceeds / Total Investment) × 100',
      description: 'Percentage of original investment recovered through refinance'
    },
    {
      name: 'Total ROI',
      formula: 'Total ROI = (Cash Flow + Appreciation + Equity Extraction) / Total Investment',
      description: 'Total return including all income sources'
    }
  ],

  examples: [
    {
      name: 'Standard BRRRR Investment',
      description: 'Typical BRRRR strategy for a single-family rental property',
      inputs: {
        purchasePrice: 150000,
        downPayment: 30000,
        purchaseLoanRate: 7.5,
        purchaseLoanTerm: 30,
        rehabCost: 25000,
        rehabTime: 3,
        afterRepairValue: 220000,
        monthlyRent: 1800,
        monthlyExpenses: 400,
        refinanceRate: 6.5,
        refinanceTerm: 30,
        refinanceLTV: 75,
        closingCosts: 8000,
        vacancyRate: 5,
        propertyManagement: 8,
        appreciationRate: 3,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 63000,
        monthlyCashFlow: 450,
        cashOnCashReturn: 8.6,
        capRate: 7.2,
        refinanceProceeds: 45000,
        equityExtracted: 71.4,
        totalROI: 15.2
      }
    },
    {
      name: 'High-Value BRRRR Investment',
      description: 'BRRRR strategy for a higher-value property with extensive rehab',
      inputs: {
        purchasePrice: 300000,
        downPayment: 60000,
        purchaseLoanRate: 7.0,
        purchaseLoanTerm: 30,
        rehabCost: 75000,
        rehabTime: 6,
        afterRepairValue: 450000,
        monthlyRent: 3200,
        monthlyExpenses: 800,
        refinanceRate: 6.0,
        refinanceTerm: 30,
        refinanceLTV: 70,
        closingCosts: 15000,
        vacancyRate: 3,
        propertyManagement: 10,
        appreciationRate: 4,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 150000,
        monthlyCashFlow: 850,
        cashOnCashReturn: 6.8,
        capRate: 6.4,
        refinanceProceeds: 120000,
        equityExtracted: 80.0,
        totalROI: 12.8
      }
    },
    {
      name: 'Quick Flip BRRRR',
      description: 'Fast-paced BRRRR with minimal rehab and quick refinance',
      inputs: {
        purchasePrice: 120000,
        downPayment: 24000,
        purchaseLoanRate: 8.0,
        purchaseLoanTerm: 30,
        rehabCost: 15000,
        rehabTime: 2,
        afterRepairValue: 180000,
        monthlyRent: 1400,
        monthlyExpenses: 300,
        refinanceRate: 6.8,
        refinanceTerm: 30,
        refinanceLTV: 80,
        closingCosts: 6000,
        vacancyRate: 7,
        propertyManagement: 8,
        appreciationRate: 2.5,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 45000,
        monthlyCashFlow: 320,
        cashOnCashReturn: 8.5,
        capRate: 7.3,
        refinanceProceeds: 36000,
        equityExtracted: 80.0,
        totalROI: 14.2
      }
    }
  ],

  usageInstructions: [
    'Enter the purchase price and down payment for the property',
    'Specify the initial loan terms (rate and term)',
    'Input rehab costs and expected completion time',
    'Provide the after-repair value (ARV) estimate',
    'Set expected monthly rent and expenses',
    'Configure refinance terms (rate, term, LTV)',
    'Include closing costs and other fees',
    'Review cash flow projections and returns',
    'Analyze refinance proceeds and equity extraction',
    'Consider risks and scalability factors',
    'Use results to evaluate BRRRR strategy feasibility'
  ]
};
