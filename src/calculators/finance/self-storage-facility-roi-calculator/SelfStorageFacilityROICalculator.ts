import { Calculator, Formula } from '../../../types/calculator';
import { calculateSelfStorageFacilityROI, validateSelfStorageFacilityROIInputs } from './formulas';
import { getSelfStorageFacilityROIValidationRules } from './validation';

/**
 * Self-storage facility ROI formula implementation
 */
const selfStorageFacilityROIFormula: Formula = {
  id: 'self-storage-facility-roi',
  name: 'Self-Storage Facility ROI',
  description: 'Calculate ROI and financial metrics for self-storage facility investment',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateSelfStorageFacilityROI(inputs as any);
    return {
      outputs: result,
      explanation: 'Self-storage facility ROI analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading self-storage facility ROI calculator with comprehensive features
 */
export const selfStorageFacilityROICalculator: Calculator = {
  id: 'self-storage-facility-roi-calculator',
  title: 'Self-Storage Facility ROI Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive self-storage facility investment analysis including ROI calculations, cash flow projections, occupancy modeling, and risk assessment with industry-standard metrics.',

  usageInstructions: [
    'Enter facility specifications and current occupancy rate',
    'Input all acquisition and operating costs',
    'Specify financing terms and revenue assumptions',
    'Review detailed ROI analysis and investment recommendations'
  ],

  inputs: [
    {
      id: 'totalUnits',
      label: 'Total Units',
      type: 'number',
      required: true,
      placeholder: '200',
      tooltip: 'Total number of storage units in the facility',
      defaultValue: 200
    },
    {
      id: 'averageUnitSize',
      label: 'Average Unit Size (sq ft)',
      type: 'number',
      required: true,
      placeholder: '100',
      tooltip: 'Average size of storage units in square feet',
      defaultValue: 100
    },
    {
      id: 'totalSquareFootage',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      placeholder: '20000',
      tooltip: 'Total rentable square footage of the facility',
      defaultValue: 20000
    },
    {
      id: 'occupancyRate',
      label: 'Occupancy Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '85',
      tooltip: 'Current occupancy rate of the facility',
      defaultValue: 85,
      min: 0,
      max: 100
    },
    {
      id: 'acquisitionCost',
      label: 'Acquisition Cost',
      type: 'currency',
      required: false,
      placeholder: '1500000',
      tooltip: 'Cost to acquire the existing facility',
      defaultValue: 1500000
    },
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Cost of the land',
      defaultValue: 300000
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost',
      type: 'currency',
      required: false,
      placeholder: '1200000',
      tooltip: 'Cost to construct the facility',
      defaultValue: 1200000
    },
    {
      id: 'softCosts',
      label: 'Soft Costs',
      type: 'currency',
      required: false,
      placeholder: '150000',
      tooltip: 'Permits, fees, and other soft costs',
      defaultValue: 150000
    },
    {
      id: 'financingAmount',
      label: 'Financing Amount',
      type: 'currency',
      required: false,
      placeholder: '1800000',
      tooltip: 'Amount of financing for the project',
      defaultValue: 1800000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Interest rate on the financing',
      defaultValue: 6.5,
      min: 0,
      max: 20,
      step: 0.125
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: false,
      placeholder: '25',
      tooltip: 'Term length of the financing',
      defaultValue: 25,
      min: 0,
      max: 50
    },
    {
      id: 'averageMonthlyRent',
      label: 'Average Monthly Rent',
      type: 'currency',
      required: true,
      placeholder: '150',
      tooltip: 'Average monthly rent per unit',
      defaultValue: 150
    },
    {
      id: 'annualRentIncrease',
      label: 'Annual Rent Increase (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual rent increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'otherIncome',
      label: 'Other Income (Annual)',
      type: 'currency',
      required: false,
      placeholder: '10000',
      tooltip: 'Additional income from sources other than unit rentals',
      defaultValue: 10000
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Annual property tax expense',
      defaultValue: 25000
    },
    {
      id: 'insurance',
      label: 'Annual Insurance',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Annual insurance premium',
      defaultValue: 15000
    },
    {
      id: 'maintenance',
      label: 'Annual Maintenance',
      type: 'currency',
      required: false,
      placeholder: '20000',
      tooltip: 'Annual maintenance and repair costs',
      defaultValue: 20000
    },
    {
      id: 'utilities',
      label: 'Annual Utilities',
      type: 'currency',
      required: false,
      placeholder: '12000',
      tooltip: 'Annual utility costs',
      defaultValue: 12000
    },
    {
      id: 'managementFees',
      label: 'Annual Management Fees',
      type: 'currency',
      required: false,
      placeholder: '30000',
      tooltip: 'Annual property management fees',
      defaultValue: 30000
    },
    {
      id: 'marketing',
      label: 'Annual Marketing',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Annual marketing and advertising costs',
      defaultValue: 8000
    },
    {
      id: 'supplies',
      label: 'Annual Supplies',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual supplies and miscellaneous costs',
      defaultValue: 3000
    },
    {
      id: 'security',
      label: 'Annual Security',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Annual security system and monitoring costs',
      defaultValue: 5000
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of years to analyze',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '7',
      tooltip: 'Capitalization rate at exit for terminal value calculation',
      defaultValue: 7,
      min: 0,
      max: 20
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'Discount rate for NPV calculation',
      defaultValue: 8,
      min: 0,
      max: 20
    },
    {
      id: 'terminalValue',
      label: 'Terminal Value',
      type: 'currency',
      required: false,
      placeholder: '2000000',
      tooltip: 'Estimated value of the property at end of analysis period',
      defaultValue: 2000000
    }
  ],

  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total capital invested in the project'
    },
    {
      id: 'annualRevenue',
      label: 'Annual Revenue',
      type: 'currency',
      explanation: 'Total annual revenue from all sources'
    },
    {
      id: 'annualExpenses',
      label: 'Annual Expenses',
      type: 'currency',
      explanation: 'Total annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Annual revenue minus operating expenses'
    },
    {
      id: 'cashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      explanation: 'Net operating income minus debt service'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Capitalization rate (NOI / Total Investment)'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'Annual cash flow divided by equity invested'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Internal rate of return on the investment'
    },
    {
      id: 'npv',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of all future cash flows'
    },
    {
      id: 'revenuePerSquareFoot',
      label: 'Revenue per Sq Ft',
      type: 'currency',
      explanation: 'Annual revenue divided by total square footage'
    },
    {
      id: 'expenseRatio',
      label: 'Expense Ratio (%)',
      type: 'percentage',
      explanation: 'Operating expenses as percentage of revenue'
    },
    {
      id: 'breakEvenOccupancy',
      label: 'Break-Even Occupancy (%)',
      type: 'percentage',
      explanation: 'Occupancy rate needed to break even'
    },
    {
      id: 'averageRentPerUnit',
      label: 'Average Rent per Unit',
      type: 'currency',
      explanation: 'Average monthly rent per occupied unit'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (Years)',
      type: 'number',
      explanation: 'Years needed to recover initial investment'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      explanation: 'Total cash flow over analysis period'
    },
    {
      id: 'roiPercentage',
      label: 'ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment percentage'
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin (%)',
      type: 'percentage',
      explanation: 'Net profit as percentage of revenue'
    },
    {
      id: 'dscr',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'NOI divided by annual debt service'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment of the investment'
    },
    {
      id: 'recommendation',
      label: 'Investment Recommendation',
      type: 'text',
      explanation: 'Recommendation based on analysis'
    }
  ],

  formulas: [selfStorageFacilityROIFormula],

  validationRules: getSelfStorageFacilityROIValidationRules(),

  examples: [
    {
      title: 'Established Self-Storage Facility',
      description: 'Analysis of an established 200-unit facility with 85% occupancy',
      inputs: {
        totalUnits: 200,
        averageUnitSize: 100,
        totalSquareFootage: 20000,
        occupancyRate: 85,
        acquisitionCost: 1500000,
        landCost: 300000,
        constructionCost: 1200000,
        softCosts: 150000,
        financingAmount: 1800000,
        interestRate: 6.5,
        loanTerm: 25,
        averageMonthlyRent: 150,
        annualRentIncrease: 3,
        otherIncome: 10000,
        propertyTaxes: 25000,
        insurance: 15000,
        maintenance: 20000,
        utilities: 12000,
        managementFees: 30000,
        marketing: 8000,
        supplies: 3000,
        security: 5000,
        analysisPeriod: 10,
        exitCapRate: 7,
        discountRate: 8,
        terminalValue: 2000000
      },
      expectedOutputs: {
        totalInvestment: 3150000,
        annualRevenue: 318000,
        annualExpenses: 118000,
        netOperatingIncome: 200000,
        cashFlow: 152000,
        capRate: 6.3,
        cashOnCashReturn: 12.7,
        irr: 8.5,
        npv: 850000,
        revenuePerSquareFoot: 15.9,
        expenseRatio: 37.1,
        breakEvenOccupancy: 65.2,
        averageRentPerUnit: 150,
        paybackPeriod: 5.8,
        totalReturn: 1520000,
        roiPercentage: 48.3,
        profitMargin: 62.9,
        dscr: 1.8,
        riskAssessment: 'Medium Risk: Moderate expense ratio, good DSCR',
        recommendation: 'Good investment opportunity - solid returns with acceptable payback period'
      }
    }
  ]
};