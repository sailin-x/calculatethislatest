import { Calculator } from '../../types/calculator';

export const OpportunityZoneInvestmentCalculator: Calculator = {
  id: 'OpportunityZoneInvestment-calculator',
  title: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate the return on investment for Opportunity Zone investments with tax benefits and capital gains deferral.',
  usageInstructions: [
    'Enter your initial investment amount and holding period',
    'Input the expected appreciation rate and rental yield',
    'Include tax information for capital gains calculations',
    'Review the tax benefits and total ROI including deferral and exclusion'
  ],
  inputs: [
    // Investment Information
    { id: 'initialInvestment', label: 'Initial Investment Amount', type: 'currency', required: true, placeholder: '100000', tooltip: 'Amount invested in the Opportunity Zone fund' },
    { id: 'holdingPeriod', label: 'Holding Period (Years)', type: 'number', required: true, placeholder: '7', tooltip: 'Number of years you plan to hold the investment' },

    // Property Appreciation
    { id: 'appreciationRate', label: 'Annual Appreciation Rate (%)', type: 'percentage', required: false, placeholder: '8.0', tooltip: 'Expected annual property value increase' },
    { id: 'rentalYield', label: 'Annual Rental Yield (%)', type: 'percentage', required: false, placeholder: '6.0', tooltip: 'Annual rental income as percentage of property value' },

    // Tax Information
    { id: 'capitalGainsTax', label: 'Capital Gains Tax Rate (%)', type: 'percentage', required: false, placeholder: '20.0', tooltip: 'Your ordinary capital gains tax rate' },
    { id: 'stateTaxRate', label: 'State Tax Rate (%)', type: 'percentage', required: false, placeholder: '5.0', tooltip: 'Your state capital gains tax rate' },

    // Opportunity Zone Benefits
    { id: 'deferralPeriod', label: 'Deferral Period (Years)', type: 'number', required: false, placeholder: '7', tooltip: 'Years until capital gains tax is due' },
    { id: 'stepUpPercentage', label: 'Step-Up Percentage (%)', type: 'percentage', required: false, placeholder: '10', tooltip: 'Percentage of deferred gains excluded from tax after 5 years' },
    { id: 'fullExclusionPercentage', label: 'Full Exclusion (%)', type: 'percentage', required: false, placeholder: '15', tooltip: 'Percentage of deferred gains excluded from tax after 7 years' },

    // Financing
    { id: 'leverageRatio', label: 'Leverage Ratio (%)', type: 'percentage', required: false, placeholder: '75', tooltip: 'Percentage of investment financed with debt' },
    { id: 'interestRate', label: 'Interest Rate (%)', type: 'percentage', required: false, placeholder: '5.0', tooltip: 'Annual interest rate on borrowed funds' },

    // Additional Costs
    { id: 'managementFees', label: 'Annual Management Fees (%)', type: 'percentage', required: false, placeholder: '2.0', tooltip: 'Annual management and operating fees' },
    { id: 'transactionFees', label: 'Transaction Fees (%)', type: 'percentage', required: false, placeholder: '1.0', tooltip: 'One-time transaction and acquisition fees' }
  ],
  outputs: [
    { id: 'totalInvestment', label: 'Total Investment', type: 'currency', explanation: 'Total amount invested including leverage' },
    { id: 'projectedValue', label: 'Projected Property Value', type: 'currency', explanation: 'Expected property value at end of holding period' },
    { id: 'annualRentalIncome', label: 'Annual Rental Income', type: 'currency', explanation: 'Expected annual rental income' },
    { id: 'totalRentalIncome', label: 'Total Rental Income', type: 'currency', explanation: 'Total rental income over holding period' },
    { id: 'capitalGains', label: 'Capital Gains', type: 'currency', explanation: 'Total capital gains from appreciation' },
    { id: 'taxDeferred', label: 'Tax Deferred Amount', type: 'currency', explanation: 'Capital gains tax deferred until exit' },
    { id: 'taxSavings5Years', label: 'Tax Savings (5 Years)', type: 'currency', explanation: 'Tax savings from 10% exclusion after 5 years' },
    { id: 'taxSavings7Years', label: 'Tax Savings (7 Years)', type: 'currency', explanation: 'Tax savings from 15% exclusion after 7 years' },
    { id: 'netProceeds', label: 'Net Proceeds After Tax', type: 'currency', explanation: 'Final amount after taxes and fees' },
    { id: 'totalROI', label: 'Total ROI (%)', type: 'percentage', explanation: 'Total return on investment including tax benefits' },
    { id: 'annualizedReturn', label: 'Annualized Return (%)', type: 'percentage', explanation: 'Annualized rate of return' },
    { id: 'breakEvenPoint', label: 'Break-Even Appreciation (%)', type: 'percentage', explanation: 'Minimum appreciation needed for positive ROI' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};