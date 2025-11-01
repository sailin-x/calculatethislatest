import { Calculator } from '../../../types/calculator';
import { OpportunityZoneInvestmentRoiInputs, OpportunityZoneInvestmentRoiOutputs } from './types';
import { calculateOpportunityZoneInvestmentRoi } from './formulas';
import { validateOpportunityZoneInvestmentRoiInputs, validateOpportunityZoneInvestmentRoiBusinessRules } from './validation';

export const OpportunityZoneInvestmentRoiCalculator: Calculator = {
  id: 'OpportunityZoneInvestmentRoiCalculator',
  title: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  subcategory: 'Real Estate Investment',
  description: 'Calculate ROI and tax benefits for Opportunity Zone investments, including capital gains tax deferral, step-up in basis, and comprehensive financial analysis with compliance tracking.',
  usageInstructions: [
    'Enter investment details and property information',
    'Specify tax benefits and holding period',
    'Input financial projections and market assumptions',
    'Review ROI analysis and compliance status'
  ],

  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total amount invested in the Opportunity Zone fund'
    },
    {
      id: 'investmentDate',
      label: 'Investment Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the investment was made'
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Number of years the investment will be held'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the underlying property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Residential', label: 'Residential' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Mixed-Use', label: 'Mixed-Use' },
        { value: 'Industrial', label: 'Industrial' }
      ],
      tooltip: 'Type of property in the Opportunity Zone'
    },
    {
      id: 'zoneDesignationDate',
      label: 'Zone Designation Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the area was designated as an Opportunity Zone'
    },
    {
      id: 'stepUpInBasis',
      label: 'Step-Up in Basis (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 10,
      tooltip: 'Percentage increase in basis after 5 years (10% or 15%)'
    },
    {
      id: 'capitalGainsTaxDeferral',
      label: 'Capital Gains Tax Deferral',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether capital gains taxes are deferred'
    },
    {
      id: 'capitalGainsTaxReduction',
      label: 'Capital Gains Tax Reduction (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 10,
      tooltip: 'Tax reduction after 7 years (0%, 10%, or 15%)'
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 30,
      defaultValue: 6,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'expectedRentalIncome',
      label: 'Expected Annual Rental Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Expected annual rental income from the property'
    },
    {
      id: 'operatingExpenses',
      label: 'Annual Operating Expenses ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual operating expenses (excluding debt service)'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 5,
      tooltip: 'Expected annual vacancy rate'
    },
    {
      id: 'leverageRatio',
      label: 'Leverage Ratio (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 90,
      defaultValue: 60,
      tooltip: 'Percentage of investment financed with debt'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 5,
      tooltip: 'Annual interest rate on financing'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      defaultValue: 25,
      tooltip: 'Term of the financing in years'
    },
    {
      id: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'select',
      required: false,
      options: [
        { value: 'Sale', label: 'Sale' },
        { value: 'Refinancing', label: 'Refinancing' },
        { value: 'Hold', label: 'Hold' }
      ],
      defaultValue: 'Sale',
      tooltip: 'Planned exit strategy for the investment'
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 6,
      tooltip: 'Capitalization rate at exit'
    },
    {
      id: 'exitYear',
      label: 'Exit Year',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      defaultValue: 7,
      tooltip: 'Year when the investment will be exited'
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 20,
      tooltip: 'Your current capital gains tax rate'
    },
    {
      id: 'ordinaryIncomeTaxRate',
      label: 'Ordinary Income Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 25,
      tooltip: 'Your ordinary income tax rate'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 5,
      tooltip: 'Additional state tax rate'
    },
    {
      id: 'acquisitionCosts',
      label: 'Acquisition Costs (% of Property Value)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 2,
      tooltip: 'Acquisition costs as percentage of property value'
    },
    {
      id: 'annualManagementFees',
      label: 'Annual Management Fees (% of Rental Income)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 8,
      tooltip: 'Annual management fees as percentage of rental income'
    },
    {
      id: 'propertyInsurance',
      label: 'Annual Property Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual property insurance premium'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'maintenanceReserves',
      label: 'Maintenance Reserves (% of Rental Income)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 1,
      tooltip: 'Annual maintenance reserves as percentage of rental income'
    },
    {
      id: 'marketGrowthRate',
      label: 'Market Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 30,
      defaultValue: 3,
      tooltip: 'Annual market growth rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 20,
      defaultValue: 3,
      tooltip: 'Annual inflation rate'
    }
  ],

  outputs: [
    {
      id: 'taxDeferralAmount',
      label: 'Tax Deferral Amount',
      type: 'currency',
      explanation: 'Amount of capital gains taxes deferred'
    },
    {
      id: 'stepUpInBasisValue',
      label: 'Step-Up in Basis Value',
      type: 'currency',
      explanation: 'Value of the basis step-up after 5 years'
    },
    {
      id: 'capitalGainsTaxSavings',
      label: 'Capital Gains Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from reduced capital gains rate'
    },
    {
      id: 'totalTaxBenefits',
      label: 'Total Tax Benefits',
      type: 'currency',
      explanation: 'Sum of all tax benefits'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'text',
      explanation: 'Year-by-year cash flow projections'
    },
    {
      id: 'cumulativeCashFlow',
      label: 'Cumulative Cash Flow',
      type: 'text',
      explanation: 'Cumulative cash flow over the holding period'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return (IRR) (%)',
      type: 'percentage',
      explanation: 'Internal rate of return on the investment'
    },
    {
      id: 'npv',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of all cash flows'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return',
      type: 'text',
      explanation: 'Annual cash-on-cash return percentages'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      explanation: 'Total return on investment'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return (%)',
      type: 'percentage',
      explanation: 'Annualized rate of return'
    },
    {
      id: 'roiPercentage',
      label: 'ROI Percentage (%)',
      type: 'percentage',
      explanation: 'Return on investment as a percentage'
    },
    {
      id: 'afterTaxRoi',
      label: 'After-Tax ROI (%)',
      type: 'percentage',
      explanation: 'ROI after accounting for taxes'
    },
    {
      id: 'taxEquivalentYield',
      label: 'Tax Equivalent Yield (%)',
      type: 'percentage',
      explanation: 'Yield equivalent considering tax benefits'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to break even on the investment'
    },
    {
      id: 'breakEvenInvestment',
      label: 'Break-Even Investment',
      type: 'currency',
      explanation: 'Investment amount needed to break even'
    },
    {
      id: 'sensitivityToAppreciation',
      label: 'Sensitivity to Appreciation',
      type: 'number',
      explanation: 'ROI change per percentage point of appreciation'
    },
    {
      id: 'sensitivityToRent',
      label: 'Sensitivity to Rent',
      type: 'number',
      explanation: 'ROI change per 1% change in rent'
    },
    {
      id: 'sensitivityToExpenses',
      label: 'Sensitivity to Expenses',
      type: 'number',
      explanation: 'ROI change per 1% change in expenses'
    },
    {
      id: 'conservativeScenario',
      label: 'Conservative Scenario',
      type: 'text',
      explanation: 'Analysis with conservative assumptions'
    },
    {
      id: 'baseCaseScenario',
      label: 'Base Case Scenario',
      type: 'text',
      explanation: 'Analysis with expected assumptions'
    },
    {
      id: 'optimisticScenario',
      label: 'Optimistic Scenario',
      type: 'text',
      explanation: 'Analysis with optimistic assumptions'
    },
    {
      id: 'investmentRecommendation',
      label: 'Investment Recommendation',
      type: 'text',
      explanation: 'Overall investment recommendation'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of investment risk'
    },
    {
      id: 'keyStrengths',
      label: 'Key Strengths',
      type: 'text',
      explanation: 'Positive aspects of the investment'
    },
    {
      id: 'keyRisks',
      label: 'Key Risks',
      type: 'text',
      explanation: 'Potential risks and concerns'
    },
    {
      id: 'actionItems',
      label: 'Action Items',
      type: 'text',
      explanation: 'Recommended next steps'
    },
    {
      id: 'investmentDeadline5Years',
      label: '5-Year Compliance Deadline',
      type: 'text',
      explanation: 'Deadline for 5-year holding requirement'
    },
    {
      id: 'investmentDeadline7Years',
      label: '7-Year Compliance Deadline',
      type: 'text',
      explanation: 'Deadline for 7-year holding requirement'
    },
    {
      id: 'complianceStatus',
      label: 'Compliance Status',
      type: 'text',
      explanation: 'Current compliance status'
    },
    {
      id: 'vsSP500',
      label: 'vs S&P 500',
      type: 'percentage',
      explanation: 'Performance vs S&P 500 index'
    },
    {
      id: 'vsRealEstateIndex',
      label: 'vs Real Estate Index',
      type: 'percentage',
      explanation: 'Performance vs real estate index'
    },
    {
      id: 'vsOpportunityZoneAverage',
      label: 'vs Opportunity Zone Average',
      type: 'percentage',
      explanation: 'Performance vs Opportunity Zone average'
    },
    {
      id: 'yearlyProjections',
      label: 'Yearly Projections',
      type: 'text',
      explanation: 'Detailed year-by-year projections'
    },
    {
      id: 'exitValuation',
      label: 'Exit Valuation',
      type: 'currency',
      explanation: 'Property value at exit'
    },
    {
      id: 'exitCashFlow',
      label: 'Exit Cash Flow',
      type: 'currency',
      explanation: 'Cash flow at exit'
    },
    {
      id: 'capitalGainsTax',
      label: 'Capital Gains Tax',
      type: 'currency',
      explanation: 'Capital gains tax at exit'
    },
    {
      id: 'afterTaxProceeds',
      label: 'After-Tax Proceeds',
      type: 'currency',
      explanation: 'Proceeds after taxes at exit'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Urban Mixed-Use Development',
      description: 'Investment in a mixed-use development project in a designated Opportunity Zone',
      inputs: {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        holdingPeriod: 7,
        propertyValue: 2000000,
        propertyType: 'Mixed-Use',
        zoneDesignationDate: '2018-03-21',
        stepUpInBasis: 10,
        capitalGainsTaxDeferral: true,
        capitalGainsTaxReduction: 10,
        expectedAppreciation: 8,
        expectedRentalIncome: 180000,
        operatingExpenses: 45000,
        vacancyRate: 3,
        leverageRatio: 65,
        interestRate: 5.5,
        loanTerm: 25,
        exitStrategy: 'Sale',
        exitCapRate: 6.5,
        exitYear: 7,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 25,
        stateTaxRate: 5,
        acquisitionCosts: 2,
        annualManagementFees: 8,
        propertyInsurance: 3000,
        propertyTaxes: 20000,
        maintenanceReserves: 1,
        marketGrowthRate: 4,
        inflationRate: 3
      },
      expectedOutputs: {
        roiPercentage: 24.5,
        irr: 18.2,
        totalTaxBenefits: 125000,
        investmentRecommendation: 'Strong Buy'
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'Investment in a commercial office building in an emerging Opportunity Zone',
      inputs: {
        initialInvestment: 750000,
        investmentDate: '2022-06-01',
        holdingPeriod: 8,
        propertyValue: 3000000,
        propertyType: 'Commercial',
        zoneDesignationDate: '2019-12-14',
        stepUpInBasis: 15,
        capitalGainsTaxDeferral: true,
        capitalGainsTaxReduction: 15,
        expectedAppreciation: 6,
        expectedRentalIncome: 240000,
        operatingExpenses: 60000,
        vacancyRate: 5,
        leverageRatio: 70,
        interestRate: 6.0,
        loanTerm: 20,
        exitStrategy: 'Sale',
        exitCapRate: 7.0,
        exitYear: 8,
        capitalGainsTaxRate: 15,
        ordinaryIncomeTaxRate: 22,
        stateTaxRate: 3,
        acquisitionCosts: 1.5,
        annualManagementFees: 6,
        propertyInsurance: 5000,
        propertyTaxes: 30000,
        maintenanceReserves: 1.5,
        marketGrowthRate: 3,
        inflationRate: 2.5
      },
      expectedOutputs: {
        roiPercentage: 28.3,
        irr: 16.8,
        totalTaxBenefits: 180000,
        investmentRecommendation: 'Buy'
      }
    }
  ]
};