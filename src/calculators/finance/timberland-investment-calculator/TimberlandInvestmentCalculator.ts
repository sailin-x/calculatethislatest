import { Calculator, Formula } from '../../../types/calculator';
import { calculateTimberlandInvestment, validateTimberlandInvestmentInputs } from './formulas';
import { getTimberlandInvestmentValidationRules } from './validation';

/**
 * Timberland investment formula implementation
 */
const timberlandInvestmentFormula: Formula = {
  id: 'timberland-investment',
  name: 'Timberland Investment',
  description: 'Calculate timberland investment ROI and financial metrics',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateTimberlandInvestment(inputs as any);
    return {
      outputs: result,
      explanation: 'Timberland investment analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading timberland investment calculator with comprehensive features
 */
export const timberlandInvestmentCalculator: Calculator = {
  id: 'timberland-investment-calculator',
  title: 'Timberland Investment Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive timberland investment analysis including ROI calculations, timber growth modeling, harvest scheduling, and risk assessment for forestry investments with industry-standard metrics.',

  usageInstructions: [
    'Enter property specifications and timber details',
    'Input acquisition costs and financing terms',
    'Specify operating costs and revenue assumptions',
    'Review comprehensive investment analysis and recommendations'
  ],

  inputs: [
    {
      id: 'acreage',
      label: 'Acreage',
      type: 'number',
      required: true,
      placeholder: '100',
      tooltip: 'Total acreage of the timberland property',
      defaultValue: 100,
      min: 1,
      max: 100000
    },
    {
      id: 'timberType',
      label: 'Timber Type',
      type: 'select',
      required: true,
      options: [
        { value: 'hardwood', label: 'Hardwood (Oak, Maple, etc.)' },
        { value: 'softwood', label: 'Softwood (Pine, Spruce, etc.)' },
        { value: 'mixed', label: 'Mixed Hardwood/Softwood' }
      ],
      tooltip: 'Type of timber on the property',
      defaultValue: 'mixed'
    },
    {
      id: 'ageOfTimber',
      label: 'Age of Timber (Years)',
      type: 'number',
      required: true,
      placeholder: '25',
      tooltip: 'Average age of the timber stand',
      defaultValue: 25,
      min: 0,
      max: 100
    },
    {
      id: 'timberVolumePerAcre',
      label: 'Timber Volume per Acre',
      type: 'number',
      required: true,
      placeholder: '5000',
      tooltip: 'Board feet or cubic meters per acre',
      defaultValue: 5000,
      min: 0,
      max: 10000
    },
    {
      id: 'landCostPerAcre',
      label: 'Land Cost per Acre',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Cost of the land excluding timber value',
      defaultValue: 2000
    },
    {
      id: 'timberValuePerAcre',
      label: 'Timber Value per Acre',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Value of the standing timber',
      defaultValue: 3000
    },
    {
      id: 'totalAcquisitionCost',
      label: 'Total Acquisition Cost',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total cost to acquire the property',
      defaultValue: 500000
    },
    {
      id: 'financingAmount',
      label: 'Financing Amount',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Amount of financing for the acquisition',
      defaultValue: 300000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5.5',
      tooltip: 'Interest rate on the financing',
      defaultValue: 5.5,
      min: 0,
      max: 20,
      step: 0.125
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Term length of the financing',
      defaultValue: 20,
      min: 0,
      max: 50
    },
    {
      id: 'annualManagementCost',
      label: 'Annual Management Cost',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Annual forestry management and planning costs',
      defaultValue: 5000
    },
    {
      id: 'annualInsuranceCost',
      label: 'Annual Insurance Cost',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual property and liability insurance',
      defaultValue: 3000
    },
    {
      id: 'annualPropertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '4000',
      tooltip: 'Annual property tax expense',
      defaultValue: 4000
    },
    {
      id: 'annualMaintenanceCost',
      label: 'Annual Maintenance Cost',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual road maintenance and boundary upkeep',
      defaultValue: 2000
    },
    {
      id: 'harvestingCostPerAcre',
      label: 'Harvesting Cost per Acre',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Cost to harvest timber per acre',
      defaultValue: 200
    },
    {
      id: 'timberPricePerUnit',
      label: 'Timber Price per Unit',
      type: 'currency',
      required: true,
      placeholder: '300',
      tooltip: 'Price per board foot or cubic meter',
      defaultValue: 300,
      min: 0.01,
      max: 1000
    },
    {
      id: 'annualAppreciationRate',
      label: 'Annual Appreciation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '4',
      tooltip: 'Expected annual increase in timber value',
      defaultValue: 4,
      min: -10,
      max: 20
    },
    {
      id: 'harvestCycleYears',
      label: 'Harvest Cycle (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Years between timber harvests',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'expectedHarvestVolume',
      label: 'Expected Harvest Volume',
      type: 'number',
      required: false,
      placeholder: '250000',
      tooltip: 'Total units expected from harvest',
      defaultValue: 250000
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Period over which to analyze the investment',
      defaultValue: 30,
      min: 1,
      max: 50
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6',
      tooltip: 'Rate used to discount future cash flows',
      defaultValue: 6,
      min: 0,
      max: 20
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Marginal tax rate for tax calculations',
      defaultValue: 25,
      min: 0,
      max: 50
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -5,
      max: 10
    }
  ],

  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total capital invested in the timberland property'
    },
    {
      id: 'annualRevenue',
      label: 'Annual Revenue',
      type: 'currency',
      explanation: 'Annual revenue from timber harvesting'
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
      id: 'timberValuePerAcre',
      label: 'Timber Value per Acre',
      type: 'currency',
      explanation: 'Current timber value per acre'
    },
    {
      id: 'totalTimberValue',
      label: 'Total Timber Value',
      type: 'currency',
      explanation: 'Total value of all timber on the property'
    },
    {
      id: 'annualGrowthRate',
      label: 'Annual Growth Rate (%)',
      type: 'percentage',
      explanation: 'Expected annual timber volume growth rate'
    },
    {
      id: 'harvestRevenue',
      label: 'Harvest Revenue',
      type: 'currency',
      explanation: 'Revenue from a single harvest cycle'
    },
    {
      id: 'harvestFrequency',
      label: 'Harvest Frequency (Years)',
      type: 'number',
      explanation: 'Years between harvest cycles'
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
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment of the investment'
    },
    {
      id: 'recommendation',
      label: 'Investment Recommendation',
      type: 'text',
      explanation: 'Recommendation based on the analysis'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Analysis of how changes in key variables affect ROI'
    }
  ],

  formulas: [timberlandInvestmentFormula],

  validationRules: getTimberlandInvestmentValidationRules(),

  examples: [
    {
      title: 'Southern Pine Plantation',
      description: 'Analysis of a 100-acre southern pine plantation investment',
      inputs: {
        acreage: 100,
        timberType: 'softwood',
        ageOfTimber: 25,
        timberVolumePerAcre: 5000,
        landCostPerAcre: 2000,
        timberValuePerAcre: 3000,
        totalAcquisitionCost: 500000,
        financingAmount: 300000,
        interestRate: 5.5,
        loanTerm: 20,
        annualManagementCost: 5000,
        annualInsuranceCost: 3000,
        annualPropertyTaxes: 4000,
        annualMaintenanceCost: 2000,
        harvestingCostPerAcre: 200,
        timberPricePerUnit: 300,
        annualAppreciationRate: 4,
        harvestCycleYears: 20,
        expectedHarvestVolume: 250000,
        analysisPeriod: 30,
        discountRate: 6,
        taxRate: 25,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 500000,
        annualRevenue: 37500,
        annualExpenses: 14000,
        netOperatingIncome: 23500,
        cashFlow: 18500,
        capRate: 4.7,
        cashOnCashReturn: 12.3,
        irr: 8.5,
        npv: 150000,
        timberValuePerAcre: 3000,
        totalTimberValue: 300000,
        annualGrowthRate: 6,
        harvestRevenue: 75000,
        harvestFrequency: 20,
        paybackPeriod: 13.5,
        totalReturn: 555000,
        roiPercentage: 111,
        profitMargin: 62.7,
        riskAssessment: 'Medium Risk: Moderate harvest cycle length, good timber type',
        recommendation: 'Good investment opportunity - solid returns with acceptable payback period',
        sensitivityAnalysis: 'Sensitivity Analysis:\n• Timber price $240/unit: 88.8% ROI\n• Timber price $360/unit: 133.2% ROI\n• 5% discount rate: 125.3% ROI\n• 7% discount rate: 96.7% ROI\n'
      }
    }
  ]
};