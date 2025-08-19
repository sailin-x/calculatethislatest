import { Calculator } from '../../types/Calculator';
import { calculateOpportunityZoneROI } from './formulas';
import { validateOpportunityZoneInvestmentInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const opportunityZoneInvestmentROICalculator: Calculator = {
  id: 'opportunity-zone-investment-roi',
  title: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate the return on investment for Opportunity Zone investments, including tax benefits and appreciation potential.',
  usageInstructions: 'Enter your investment details and property information to calculate the ROI for Opportunity Zone investments, including tax deferral and exclusion benefits.',
  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 100000000,
      step: 1000,
      tooltip: 'Total amount invested in the Opportunity Zone property',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      id: 'investmentDate',
      label: 'Investment Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the investment was made (affects tax benefits)',
      placeholder: '2023-01-15',
      defaultValue: '2023-01-15'
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      required: true,
      min: 1000,
      max: 100000000,
      step: 1000,
      tooltip: 'Current or projected property value',
      placeholder: '600000',
      defaultValue: 600000
    },
    {
      id: 'annualRentalIncome',
      label: 'Annual Rental Income',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Annual rental income from the property',
      placeholder: '48000',
      defaultValue: 48000
    },
    {
      id: 'annualOperatingExpenses',
      label: 'Annual Operating Expenses',
      type: 'number',
      required: true,
      min: 0,
      max: 5000000,
      step: 1000,
      tooltip: 'Annual operating expenses including maintenance, taxes, insurance',
      placeholder: '18000',
      defaultValue: 18000
    },
    {
      id: 'annualAppreciation',
      label: 'Annual Appreciation Rate (%)',
      type: 'number',
      required: true,
      min: -20,
      max: 30,
      step: 0.5,
      tooltip: 'Expected annual property appreciation rate',
      placeholder: '3.5',
      defaultValue: 3.5
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      tooltip: 'Number of years to hold the investment',
      placeholder: '10',
      defaultValue: 10
    },
    {
      id: 'originalCapitalGain',
      label: 'Original Capital Gain Amount',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      tooltip: 'Capital gain amount being deferred through Opportunity Zone investment',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      id: 'originalGainDate',
      label: 'Original Gain Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the original capital gain was realized',
      placeholder: '2022-12-15',
      defaultValue: '2022-12-15'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'number',
      required: true,
      min: 10,
      max: 37,
      step: 1,
      tooltip: 'Your current federal tax bracket percentage',
      placeholder: '24',
      defaultValue: 24
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 15,
      step: 0.1,
      tooltip: 'Your state tax rate (if applicable)',
      placeholder: '5.0',
      defaultValue: 5.0
    },
    {
      id: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'sale', label: 'Property Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'exchange', label: '1031 Exchange' },
        { value: 'hold', label: 'Long-term Hold' }
      ],
      tooltip: 'Planned exit strategy for the investment',
      defaultValue: 'sale'
    },
    {
      id: 'managementFees',
      label: 'Annual Management Fees (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Annual property management fees as percentage of rental income',
      placeholder: '8.0',
      defaultValue: 8.0
    },
    {
      id: 'financingCosts',
      label: 'Financing Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Total financing costs including loan origination fees',
      placeholder: '15000',
      defaultValue: 15000
    },
    {
      id: 'renovationCosts',
      label: 'Renovation/Improvement Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Costs for property renovations or improvements',
      placeholder: '50000',
      defaultValue: 50000
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual inflation rate for cost projections',
      placeholder: '2.5',
      defaultValue: 2.5
    }
  ],
  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      format: 'USD',
      explanation: 'Total amount invested including all costs'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual net cash flow from rental income minus expenses'
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cash flow over the holding period'
    },
    {
      id: 'propertyValueAtExit',
      label: 'Property Value at Exit',
      type: 'currency',
      format: 'USD',
      explanation: 'Projected property value at the end of holding period'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      format: 'USD',
      explanation: 'Total return including appreciation and cash flow'
    },
    {
      id: 'totalROI',
      label: 'Total ROI (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Total return on investment as a percentage'
    },
    {
      id: 'annualizedROI',
      label: 'Annualized ROI (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Annualized return on investment'
    },
    {
      id: 'taxDeferralBenefit',
      label: 'Tax Deferral Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Tax savings from deferring original capital gain'
    },
    {
      id: 'taxExclusionBenefit',
      label: 'Tax Exclusion Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Tax savings from 10-year exclusion on new gains'
    },
    {
      id: 'totalTaxBenefits',
      label: 'Total Tax Benefits',
      type: 'currency',
      format: 'USD',
      explanation: 'Combined tax benefits from deferral and exclusion'
    },
    {
      id: 'afterTaxReturn',
      label: 'After-Tax Return',
      type: 'currency',
      format: 'USD',
      explanation: 'Total return after accounting for tax benefits'
    },
    {
      id: 'afterTaxROI',
      label: 'After-Tax ROI (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Return on investment after tax benefits'
    },
    {
      id: 'analysis',
      label: 'Investment Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed analysis of the Opportunity Zone investment'
    }
  ],
  formulas: [
    {
      id: 'opportunity-zone-roi-calculation',
      name: 'Opportunity Zone Investment ROI Calculation',
      description: 'Calculate ROI for Opportunity Zone investments including tax benefits',
      calculate: calculateOpportunityZoneROI
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validateOpportunityZoneInvestmentInputs
    }
  ],
  examples: [
    {
      title: 'Standard Opportunity Zone Investment',
      description: 'Typical Opportunity Zone investment with 10-year holding period',
      inputs: {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        stateTaxRate: 5.0,
        exitStrategy: 'sale',
        managementFees: 8.0,
        financingCosts: 15000,
        renovationCosts: 50000,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 565000,
        annualCashFlow: 26160,
        totalCashFlow: 261600,
        propertyValueAtExit: 846000,
        totalReturn: 542600,
        totalROI: 96.0,
        annualizedROI: 7.0,
        taxDeferralBenefit: 24000,
        taxExclusionBenefit: 58000,
        totalTaxBenefits: 82000,
        afterTaxReturn: 624600,
        afterTaxROI: 110.5,
        analysis: 'Strong Opportunity Zone investment with significant tax benefits'
      }
    },
    {
      title: 'Long-term Hold Strategy',
      description: 'Opportunity Zone investment with 15-year holding period',
      inputs: {
        initialInvestment: 750000,
        investmentDate: '2023-06-01',
        propertyValue: 900000,
        annualRentalIncome: 72000,
        annualOperatingExpenses: 27000,
        annualAppreciation: 4.0,
        holdingPeriod: 15,
        originalCapitalGain: 150000,
        originalGainDate: '2023-05-01',
        taxBracket: 32,
        stateTaxRate: 7.0,
        exitStrategy: 'hold',
        managementFees: 6.0,
        financingCosts: 20000,
        renovationCosts: 75000,
        inflationRate: 2.0
      },
      expectedOutputs: {
        totalInvestment: 845000,
        annualCashFlow: 40680,
        totalCashFlow: 610200,
        propertyValueAtExit: 1620000,
        totalReturn: 2230200,
        totalROI: 264.0,
        annualizedROI: 8.9,
        taxDeferralBenefit: 48000,
        taxExclusionBenefit: 156000,
        totalTaxBenefits: 204000,
        afterTaxReturn: 2434200,
        afterTaxROI: 288.1,
        analysis: 'Excellent long-term Opportunity Zone investment with maximum tax benefits'
      }
    },
    {
      title: 'Short-term Development Project',
      description: 'Opportunity Zone investment with 5-year development timeline',
      inputs: {
        initialInvestment: 300000,
        investmentDate: '2023-03-01',
        propertyValue: 400000,
        annualRentalIncome: 32000,
        annualOperatingExpenses: 12000,
        annualAppreciation: 5.0,
        holdingPeriod: 5,
        originalCapitalGain: 75000,
        originalGainDate: '2023-02-01',
        taxBracket: 22,
        stateTaxRate: 4.0,
        exitStrategy: 'sale',
        managementFees: 10.0,
        financingCosts: 10000,
        renovationCosts: 25000,
        inflationRate: 3.0
      },
      expectedOutputs: {
        totalInvestment: 335000,
        annualCashFlow: 16800,
        totalCashFlow: 84000,
        propertyValueAtExit: 510000,
        totalReturn: 259000,
        totalROI: 77.3,
        annualizedROI: 12.1,
        taxDeferralBenefit: 16500,
        taxExclusionBenefit: 22000,
        totalTaxBenefits: 38500,
        afterTaxReturn: 297500,
        afterTaxROI: 88.8,
        analysis: 'Good short-term Opportunity Zone investment with moderate tax benefits'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};