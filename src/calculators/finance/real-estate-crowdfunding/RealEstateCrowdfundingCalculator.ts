import { Calculator } from '../../types';
import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs } from './types';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs, getValidationErrors } from './validation';

export const realEstateCrowdfundingCalculator: Calculator<RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs> = {
  name: 'Real Estate Crowdfunding Calculator',
  description: 'Calculate returns, fees, and risk metrics for real estate crowdfunding investments',
  category: 'Finance',
  tags: ['real estate', 'crowdfunding', 'investment', 'returns', 'fees', 'risk'],
  inputs: [
    {
      id: 'investmentAmount',
      label: 'Investment Amount',
      type: 'currency',
      placeholder: 'Enter investment amount',
      required: true,
      description: 'Amount you plan to invest in the project'
    },
    {
      id: 'projectValue',
      label: 'Total Project Value',
      type: 'currency',
      placeholder: 'Enter total project value',
      required: true,
      description: 'Total value of the real estate project'
    },
    {
      id: 'expectedHoldPeriod',
      label: 'Expected Hold Period (Years)',
      type: 'number',
      placeholder: 'Enter hold period',
      required: true,
      description: 'How long you plan to hold the investment'
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      placeholder: 'Enter expected return',
      required: true,
      description: 'Expected annual return on investment'
    },
    {
      id: 'managementFees',
      label: 'Management Fees (%)',
      type: 'percentage',
      placeholder: 'Enter management fees',
      required: true,
      description: 'Annual management fees as percentage of investment'
    },
    {
      id: 'platformFees',
      label: 'Platform Fees (%)',
      type: 'percentage',
      placeholder: 'Enter platform fees',
      required: true,
      description: 'Platform fees as percentage of investment'
    },
    {
      id: 'exitFees',
      label: 'Exit Fees (%)',
      type: 'percentage',
      placeholder: 'Enter exit fees',
      required: true,
      description: 'Fees charged when exiting the investment'
    },
    {
      id: 'minimumInvestment',
      label: 'Minimum Investment',
      type: 'currency',
      placeholder: 'Enter minimum investment',
      required: true,
      description: 'Minimum investment amount required'
    },
    {
      id: 'maximumInvestment',
      label: 'Maximum Investment',
      type: 'currency',
      placeholder: 'Enter maximum investment',
      required: true,
      description: 'Maximum investment amount allowed'
    },
    {
      id: 'projectType',
      label: 'Project Type',
      type: 'select',
      placeholder: 'Select project type',
      required: true,
      description: 'Type of real estate project',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'mixed-use', label: 'Mixed-Use' }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Enter project location',
      required: true,
      description: 'Location of the real estate project'
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Appreciation (%)',
      type: 'percentage',
      placeholder: 'Enter expected appreciation',
      required: true,
      description: 'Expected annual property appreciation'
    },
    {
      id: 'expectedCashFlow',
      label: 'Expected Annual Cash Flow',
      type: 'currency',
      placeholder: 'Enter expected cash flow',
      required: true,
      description: 'Expected annual cash flow from the project'
    },
    {
      id: 'taxBenefits',
      label: 'Tax Benefits',
      type: 'currency',
      placeholder: 'Enter tax benefits',
      required: false,
      description: 'Expected annual tax benefits (depreciation, etc.)'
    },
    {
      id: 'liquidityPeriod',
      label: 'Liquidity Period (Years)',
      type: 'number',
      placeholder: 'Enter liquidity period',
      required: false,
      description: 'Expected time until investment becomes liquid'
    }
  ],
  outputs: [
    {
      id: 'totalFees',
      label: 'Total Fees',
      type: 'currency',
      description: 'Total fees paid over the investment period'
    },
    {
      id: 'netInvestment',
      label: 'Net Investment',
      type: 'currency',
      description: 'Investment amount after fees'
    },
    {
      id: 'expectedAnnualCashFlow',
      label: 'Expected Annual Cash Flow',
      type: 'currency',
      description: 'Your share of annual cash flow'
    },
    {
      id: 'expectedTotalReturn',
      label: 'Expected Total Return',
      type: 'percentage',
      description: 'Total expected return over hold period'
    },
    {
      id: 'expectedIRR',
      label: 'Expected IRR',
      type: 'percentage',
      description: 'Internal Rate of Return'
    },
    {
      id: 'expectedMultiple',
      label: 'Expected Multiple',
      type: 'decimal',
      description: 'Multiple of original investment'
    },
    {
      id: 'expectedExitValue',
      label: 'Expected Exit Value',
      type: 'currency',
      description: 'Expected value at exit'
    },
    {
      id: 'expectedNetProfit',
      label: 'Expected Net Profit',
      type: 'currency',
      description: 'Expected profit after all costs'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      description: 'Annualized return on investment'
    }
  ],
  calculate: (inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingOutputs => {
    const validation = validateRealEstateCrowdfundingInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateCrowdfunding(inputs);
  },
  validate: validateRealEstateCrowdfundingInputs
};