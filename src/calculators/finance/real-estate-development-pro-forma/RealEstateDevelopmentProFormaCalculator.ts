import { Calculator } from '../../../types/Calculator';
import { calculateRealEstateDevelopmentProForma } from './formulas';
import { validateRealEstateDevelopmentProFormaInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateDevelopmentProFormaCalculator: Calculator = {
  id: 'real-estate-development-pro-forma',
  name: 'Real Estate Development Pro-Forma Calculator',
  description: 'Comprehensive financial analysis for real estate development projects including costs, revenue projections, financing, and feasibility metrics.',
  category: 'Finance',
  tags: ['real estate', 'development', 'pro-forma', 'investment', 'feasibility', 'construction'],
  inputs: [
    {
      id: 'projectType',
      label: 'Project Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'land_development', label: 'Land Development' }
      ],
      tooltip: 'Type of real estate development project',
      defaultValue: 'residential'
    },
    {
      id: 'totalUnits',
      label: 'Total Units/Lots',
      type: 'number',
      required: true,
      min: 1,
      max: 10000,
      tooltip: 'Total number of units, lots, or spaces in the development',
      defaultValue: 100
    },
    {
      id: 'landAcquisitionCost',
      label: 'Land Acquisition Cost ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total cost to acquire the development land',
      defaultValue: 5000000
    },
    {
      id: 'hardCosts',
      label: 'Hard Construction Costs ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Direct construction and material costs',
      defaultValue: 15000000
    },
    {
      id: 'softCosts',
      label: 'Soft Costs ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Architecture, engineering, permits, legal, and other indirect costs',
      defaultValue: 3000000
    },
    {
      id: 'contingency',
      label: 'Contingency Reserve (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Percentage of total costs held as contingency reserve',
      defaultValue: 10
    },
    {
      id: 'carryingCosts',
      label: 'Carrying Costs ($/month)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Monthly costs during development (interest, taxes, insurance)',
      defaultValue: 50000
    },
    {
      id: 'developmentTimeline',
      label: 'Development Timeline (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 120,
      tooltip: 'Total development period from start to completion',
      defaultValue: 24
    },
    {
      id: 'salesPricePerUnit',
      label: 'Sales Price per Unit ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Average selling price per unit or lot',
      defaultValue: 300000
    },
    {
      id: 'rentalIncomePerUnit',
      label: 'Rental Income per Unit/Month ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      tooltip: 'Monthly rental income per unit (for rental projects)',
      defaultValue: 2500
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Expected vacancy rate for rental income',
      defaultValue: 5
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses (% of revenue)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Percentage of revenue for ongoing operating expenses',
      defaultValue: 35
    },
    {
      id: 'financingAmount',
      label: 'Financing Amount ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total amount of debt financing',
      defaultValue: 15000000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Annual interest rate on development financing',
      defaultValue: 8
    },
    {
      id: 'equityContribution',
      label: 'Equity Contribution ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total equity investment in the project',
      defaultValue: 8000000
    },
    {
      id: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'sell_all', label: 'Sell All Units' },
        { value: 'sell_partial', label: 'Sell Partial + Hold' },
        { value: 'hold_all', label: 'Hold All for Rental' },
        { value: 'refinance', label: 'Refinance and Hold' }
      ],
      tooltip: 'Strategy for exiting the development investment',
      defaultValue: 'sell_all'
    },
    {
      id: 'marketAppreciation',
      label: 'Market Appreciation (%/year)',
      type: 'number',
      required: true,
      min: -50,
      max: 50,
      tooltip: 'Expected annual market appreciation rate',
      defaultValue: 3
    },
    {
      id: 'salesCommission',
      label: 'Sales Commission (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      tooltip: 'Commission rate for selling units',
      defaultValue: 6
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Effective tax rate on project profits',
      defaultValue: 25
    }
  ],
  outputs: [
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost including land, construction, soft costs, and contingency'
    },
    {
      id: 'totalRevenue',
      label: 'Total Revenue',
      type: 'currency',
      format: 'USD',
      explanation: 'Total revenue from sales or rental income'
    },
    {
      id: 'grossProfit',
      label: 'Gross Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Revenue minus total project costs'
    },
    {
      id: 'netProfit',
      label: 'Net Profit',
      type: 'currency',
      format: 'USD',
      explanation: 'Gross profit minus taxes and other expenses'
    },
    {
      id: 'roi',
      label: 'Return on Investment (%)',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Net profit divided by total equity investment'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Annualized return considering time value of money'
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin (%)',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Net profit as percentage of total revenue'
    },
    {
      id: 'breakEvenPrice',
      label: 'Break-Even Price per Unit',
      type: 'currency',
      format: 'USD',
      explanation: 'Minimum price per unit to break even'
    },
    {
      id: 'cashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly cash flow during holding period'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      format: 'decimal',
      explanation: 'Ratio of net operating income to debt service'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (years)',
      type: 'number',
      format: 'decimal',
      explanation: 'Time to recover initial equity investment'
    },
    {
      id: 'feasibilityScore',
      label: 'Feasibility Score',
      type: 'number',
      format: 'decimal',
      explanation: 'Overall project feasibility score (0-100)'
    }
  ],
  formulas: calculateRealEstateDevelopmentProForma,
  validate: validateRealEstateDevelopmentProFormaInputs,
  quickValidate: quickValidateAllInputs,
  examples: [
    {
      name: 'Residential Subdivision',
      description: '100-unit residential subdivision with construction financing',
      inputs: {
        projectType: 'residential',
        totalUnits: 100,
        landAcquisitionCost: 5000000,
        hardCosts: 15000000,
        softCosts: 3000000,
        contingency: 10,
        carryingCosts: 50000,
        developmentTimeline: 24,
        salesPricePerUnit: 300000,
        rentalIncomePerUnit: 2500,
        vacancyRate: 5,
        operatingExpenses: 35,
        financingAmount: 15000000,
        interestRate: 8,
        equityContribution: 8000000,
        exitStrategy: 'sell_all',
        marketAppreciation: 3,
        salesCommission: 6,
        taxRate: 25
      },
      expectedOutputs: {
        totalProjectCost: 25300000,
        totalRevenue: 28200000,
        grossProfit: 1700000,
        netProfit: -700000,
        roi: -8.75,
        irr: -35.8,
        profitMargin: -2.48,
        breakEvenPrice: 253000,
        cashFlow: 0,
        debtServiceCoverage: 0,
        paybackPeriod: Infinity,
        feasibilityScore: 15
      }
    },
    {
      name: 'Commercial Office Building',
      description: '50,000 sq ft office building with rental income',
      inputs: {
        projectType: 'office',
        totalUnits: 1,
        landAcquisitionCost: 8000000,
        hardCosts: 25000000,
        softCosts: 5000000,
        contingency: 15,
        carryingCosts: 100000,
        developmentTimeline: 36,
        salesPricePerUnit: 0,
        rentalIncomePerUnit: 150000,
        vacancyRate: 8,
        operatingExpenses: 40,
        financingAmount: 25000000,
        interestRate: 7.5,
        equityContribution: 15000000,
        exitStrategy: 'hold_all',
        marketAppreciation: 2.5,
        salesCommission: 0,
        taxRate: 30
      },
      expectedOutputs: {
        totalProjectCost: 43700000,
        totalRevenue: 993600,
        grossProfit: -46306400,
        netProfit: -46306400,
        roi: -346.21,
        irr: -45.2,
        profitMargin: -4660.56,
        breakEvenPrice: 0,
        cashFlow: -694855,
        debtServiceCoverage: -0.89,
        paybackPeriod: Infinity,
        feasibilityScore: 15
      }
    },
    {
      name: 'Mixed-Use Development',
      description: 'Mixed-use project with retail and residential units',
      inputs: {
        projectType: 'mixed_use',
        totalUnits: 75,
        landAcquisitionCost: 12000000,
        hardCosts: 30000000,
        softCosts: 6000000,
        contingency: 12,
        carryingCosts: 75000,
        developmentTimeline: 30,
        salesPricePerUnit: 400000,
        rentalIncomePerUnit: 3500,
        vacancyRate: 6,
        operatingExpenses: 38,
        financingAmount: 35000000,
        interestRate: 8.5,
        equityContribution: 20000000,
        exitStrategy: 'sell_partial',
        marketAppreciation: 4,
        salesCommission: 5,
        taxRate: 28
      },
      expectedOutputs: {
        totalProjectCost: 53760000,
        totalRevenue: 23167164,
        grossProfit: -32842836,
        netProfit: -32842836,
        roi: -201.4,
        irr: -35.8,
        profitMargin: -141.8,
        breakEvenPrice: 716800,
        cashFlow: 0,
        debtServiceCoverage: 0,
        paybackPeriod: Infinity,
        feasibilityScore: 14.95
      }
    }
  ]
};