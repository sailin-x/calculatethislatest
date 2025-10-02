import { Calculator, Formula } from '../../types/calculator';
import { calculateRealEstateDevelopment } from './formulas';
import { getRealEstateValidationRules } from './validation';

/**
 * Real estate development pro-forma formula implementation
 */
const realEstateFormula: Formula = {
  id: 'real-estate-development-pro-forma',
  name: 'Real Estate Development Pro-Forma',
  description: 'Comprehensive real estate development financial projections and analysis',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRealEstateDevelopment(inputs);
    return {
      outputs: result,
      explanation: 'Real estate development pro-forma analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading real estate development pro-forma calculator with comprehensive features
 */
export const realEstateDevelopmentProFormaCalculator: Calculator = {
  id: 'real-estate-development-pro-forma-calculator',
  title: 'Real Estate Development Pro-Forma Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive real estate development financial projections including costs, revenue, financing, returns, and sensitivity analysis with industry-standard accuracy.',

  usageInstructions: [
    'Select the analysis type you need (Development Costs, Revenue Projections, Financing, etc.)',
    'Enter project details including land cost, construction costs, and square footage',
    'Input revenue assumptions like rental rates and occupancy',
    'Specify financing terms and equity requirements',
    'Review comprehensive pro-forma analysis including IRR, cash flow, and sensitivity'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Analysis Type',
      type: 'select',
      required: true,
      options: [
        { value: 'development_costs', label: 'Development Costs' },
        { value: 'revenue_projections', label: 'Revenue Projections' },
        { value: 'financing', label: 'Financing Analysis' },
        { value: 'investment_returns', label: 'Investment Returns' },
        { value: 'sensitivity_analysis', label: 'Sensitivity Analysis' },
        { value: 'comprehensive', label: 'Comprehensive Pro-Forma' }
      ],
      tooltip: 'Choose the type of real estate development analysis you need',
      defaultValue: 'comprehensive'
    },
    // Development cost inputs
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Total cost of land acquisition',
      defaultValue: 100000
    },
    {
      id: 'constructionCostPerSqFt',
      label: 'Construction Cost per Sq Ft',
      type: 'currency',
      required: true,
      placeholder: '150',
      tooltip: 'Construction cost per square foot',
      defaultValue: 150,
      step: 0.01
    },
    {
      id: 'totalSqFt',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      placeholder: '10000',
      tooltip: 'Total developable square footage',
      defaultValue: 10000,
      min: 100,
      max: 1000000
    },
    {
      id: 'softCostsPercentage',
      label: 'Soft Costs (%)',
      type: 'percentage',
      required: true,
      placeholder: '15',
      tooltip: 'Soft costs as percentage of hard costs (permits, design, etc.)',
      defaultValue: 15,
      min: 0,
      max: 50
    },
    {
      id: 'contingencyPercentage',
      label: 'Contingency (%)',
      type: 'percentage',
      required: true,
      placeholder: '5',
      tooltip: 'Contingency allowance as percentage of total costs',
      defaultValue: 5,
      min: 0,
      max: 20
    },
    {
      id: 'marketingCost',
      label: 'Marketing Cost',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Marketing and leasing costs',
      defaultValue: 0
    },
    {
      id: 'financingCost',
      label: 'Financing Cost',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Loan origination and financing fees',
      defaultValue: 0
    },
    // Revenue inputs
    {
      id: 'rentalRatePerSqFt',
      label: 'Rental Rate per Sq Ft',
      type: 'currency',
      required: true,
      placeholder: '25',
      tooltip: 'Annual rental rate per square foot',
      defaultValue: 25,
      step: 0.01
    },
    {
      id: 'occupancyRate',
      label: 'Occupancy Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '95',
      tooltip: 'Expected occupancy rate',
      defaultValue: 95,
      min: 0,
      max: 100
    },
    {
      id: 'annualRentIncrease',
      label: 'Annual Rent Increase (%)',
      type: 'percentage',
      required: true,
      placeholder: '3',
      tooltip: 'Annual rent increase percentage',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'holdingPeriodYears',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Number of years to hold the property',
      defaultValue: 5,
      min: 1,
      max: 30
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Capitalization rate at exit',
      defaultValue: 6,
      min: 1,
      max: 20
    },
    // Financing inputs
    {
      id: 'equityPercentage',
      label: 'Equity Percentage (%)',
      type: 'percentage',
      required: true,
      placeholder: '30',
      tooltip: 'Percentage of total cost financed with equity',
      defaultValue: 30,
      min: 0,
      max: 100
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '5',
      tooltip: 'Annual interest rate on the loan',
      defaultValue: 5,
      min: 0,
      max: 15,
      step: 0.125
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      placeholder: '25',
      tooltip: 'Term of the loan in years',
      defaultValue: 25,
      min: 1,
      max: 50
    },
    {
      id: 'constructionPeriodMonths',
      label: 'Construction Period (Months)',
      type: 'number',
      required: true,
      placeholder: '12',
      tooltip: 'Construction period in months',
      defaultValue: 12,
      min: 1,
      max: 36
    },
    {
      id: 'interestOnlyPeriodMonths',
      label: 'Interest-Only Period (Months)',
      type: 'number',
      required: true,
      placeholder: '24',
      tooltip: 'Interest-only period in months',
      defaultValue: 24,
      min: 0,
      max: 60
    },
    // Sensitivity analysis inputs
    {
      id: 'costVariance',
      label: 'Cost Variance (%)',
      type: 'text',
      required: false,
      placeholder: '-20,-10,10,20',
      tooltip: 'Cost variance scenarios for sensitivity analysis (comma-separated)',
      defaultValue: '-20,-10,10,20'
    },
    {
      id: 'revenueVariance',
      label: 'Revenue Variance (%)',
      type: 'text',
      required: false,
      placeholder: '-15,-5,5,15',
      tooltip: 'Revenue variance scenarios for sensitivity analysis (comma-separated)',
      defaultValue: '-15,-5,5,15'
    },
    {
      id: 'capRateVariance',
      label: 'Cap Rate Variance (%)',
      type: 'text',
      required: false,
      placeholder: '-10,-5,5,10',
      tooltip: 'Cap rate variance scenarios for sensitivity analysis (comma-separated)',
      defaultValue: '-10,-5,5,10'
    }
  ],

  outputs: [
    // Common outputs
    {
      id: 'calculationType',
      label: 'Analysis Type',
      type: 'text',
      explanation: 'Type of analysis performed'
    },
    // Development cost outputs
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      explanation: 'Total land acquisition cost'
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost',
      type: 'currency',
      explanation: 'Total construction cost'
    },
    {
      id: 'totalDevelopmentCost',
      label: 'Total Development Cost',
      type: 'currency',
      explanation: 'Total cost of development including all components'
    },
    {
      id: 'costPerSqFt',
      label: 'Cost per Sq Ft',
      type: 'currency',
      explanation: 'Total development cost per square foot'
    },
    // Revenue outputs
    {
      id: 'grossAnnualRent',
      label: 'Gross Annual Rent',
      type: 'currency',
      explanation: 'Total gross annual rental income'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Rental income after vacancy allowance'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Income after operating expenses'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      explanation: 'Property value at exit based on cap rate'
    },
    // Financing outputs
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      explanation: 'Total loan amount'
    },
    {
      id: 'equityAmount',
      label: 'Equity Amount',
      type: 'currency',
      explanation: 'Total equity investment required'
    },
    {
      id: 'monthlyDebtService',
      label: 'Monthly Debt Service',
      type: 'currency',
      explanation: 'Monthly loan payment'
    },
    {
      id: 'annualDebtService',
      label: 'Annual Debt Service',
      type: 'currency',
      explanation: 'Annual loan payment'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'Ratio of NOI to annual debt service'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Percentage of project financed by debt'
    },
    // Investment return outputs
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      explanation: 'Total cash flow over holding period including exit'
    },
    {
      id: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      explanation: 'Total return as multiple of equity invested'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Annualized rate of return on equity'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'First year cash flow as percentage of equity'
    },
    {
      id: 'profit',
      label: 'Total Profit',
      type: 'currency',
      explanation: 'Total profit from the investment'
    },
    // Sensitivity analysis outputs
    {
      id: 'worstCaseScenario',
      label: 'Worst Case IRR (%)',
      type: 'percentage',
      explanation: 'IRR in the worst case scenario'
    },
    {
      id: 'bestCaseScenario',
      label: 'Best Case IRR (%)',
      type: 'percentage',
      explanation: 'IRR in the best case scenario'
    }
  ],

  formulas: [realEstateFormula],

  validationRules: getRealEstateValidationRules()

  examples: [
    {
      title: 'Multifamily Development Pro-Forma',
      description: 'Complete pro-forma analysis for a 10,000 sq ft multifamily development',
      inputs: {
        calculationType: 'comprehensive',
        landCost: 100000,
        constructionCostPerSqFt: 150,
        totalSqFt: 10000,
        softCostsPercentage: 15,
        contingencyPercentage: 5,
        rentalRatePerSqFt: 25,
        occupancyRate: 95,
        annualRentIncrease: 3,
        holdingPeriodYears: 5,
        exitCapRate: 6,
        equityPercentage: 30,
        interestRate: 5,
        loanTermYears: 25,
        constructionPeriodMonths: 12,
        interestOnlyPeriodMonths: 24
      },
      expectedOutputs: {
        totalDevelopmentCost: 1650000,
        netOperatingIncome: 237500,
        equityAmount: 495000,
        internalRateOfReturn: 12.5,
        equityMultiple: 2.1
      }
    },
    {
      title: 'Office Building Development',
      description: 'Pro-forma analysis for a commercial office building',
      inputs: {
        calculationType: 'comprehensive',
        landCost: 500000,
        constructionCostPerSqFt: 200,
        totalSqFt: 25000,
        softCostsPercentage: 20,
        contingencyPercentage: 7,
        rentalRatePerSqFt: 35,
        occupancyRate: 90,
        annualRentIncrease: 2.5,
        holdingPeriodYears: 7,
        exitCapRate: 7,
        equityPercentage: 25,
        interestRate: 6,
        loanTermYears: 20,
        constructionPeriodMonths: 18,
        interestOnlyPeriodMonths: 36
      },
      expectedOutputs: {
        totalDevelopmentCost: 6125000,
        netOperatingIncome: 787500,
        equityAmount: 1531250,
        internalRateOfReturn: 11.8,
        equityMultiple: 1.9
      }
    },
    {
      title: 'Retail Center Development',
      description: 'Analysis for a neighborhood retail shopping center',
      inputs: {
        calculationType: 'comprehensive',
        landCost: 300000,
        constructionCostPerSqFt: 120,
        totalSqFt: 15000,
        softCostsPercentage: 18,
        contingencyPercentage: 6,
        rentalRatePerSqFt: 28,
        occupancyRate: 92,
        annualRentIncrease: 2,
        holdingPeriodYears: 6,
        exitCapRate: 6.5,
        equityPercentage: 35,
        interestRate: 5.5,
        loanTermYears: 25,
        constructionPeriodMonths: 15,
        interestOnlyPeriodMonths: 30
      },
      expectedOutputs: {
        totalDevelopmentCost: 2310000,
        netOperatingIncome: 386400,
        equityAmount: 808500,
        internalRateOfReturn: 13.2,
        equityMultiple: 2.3
      }
    }
  ]
};