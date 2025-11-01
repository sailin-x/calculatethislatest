import { Calculator } from '../../types/calculator';
import { calculateTimberlandInvestment } from './formulas';
import { generateTimberlandInvestmentAnalysis } from './formulas';

export const TimberlandInvestmentCalculator: Calculator = {
  id: 'TimberlandInvestmentCalculator',
  name: 'Timberland Investment Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate ROI, cash flow, and financial metrics for timberland investments.',
  inputs: [
    {
      id: 'propertySize',
      name: 'Property Size (acres)',
      type: 'number',
      unit: 'acres',
      description: 'Total acreage of the timberland property',
      placeholder: '1000',
      min: 10,
      max: 100000,
      step: 10,
      required: true
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: '$',
      description: 'Total purchase price of the timberland',
      placeholder: '2000000',
      min: 50000,
      max: 100000000,
      step: 10000,
      required: true
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: '$',
      description: 'Down payment amount',
      placeholder: '400000',
      min: 10000,
      max: 20000000,
      step: 10000,
      required: true
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      description: 'Annual interest rate on the loan',
      placeholder: '5.5',
      min: 1,
      max: 15,
      step: 0.1,
      required: true
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      description: 'Loan term in years',
      placeholder: '25',
      min: 5,
      max: 30,
      step: 1,
      required: true
    },
    {
      id: 'timberType',
      name: 'Primary Timber Type',
      type: 'select',
      description: 'Primary species of timber on the property',
      placeholder: 'Select timber type',
      required: true,
      options: [
        { value: 'pine', label: 'Pine' },
        { value: 'oak', label: 'Oak' },
        { value: 'maple', label: 'Maple' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'walnut', label: 'Walnut' },
        { value: 'mixed', label: 'Mixed Hardwoods' },
        { value: 'douglas-fir', label: 'Douglas Fir' },
        { value: 'redwood', label: 'Redwood' },
        { value: 'cedar', label: 'Cedar' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'currentStandAge',
      name: 'Current Stand Age',
      type: 'number',
      unit: 'years',
      description: 'Average age of current timber stand',
      placeholder: '15',
      min: 0,
      max: 100,
      step: 1,
      required: true
    },
    {
      id: 'rotationAge',
      name: 'Rotation Age',
      type: 'number',
      unit: 'years',
      description: 'Optimal harvest age for the timber type',
      placeholder: '25',
      min: 5,
      max: 80,
      step: 1,
      required: true
    },
    {
      id: 'currentVolume',
      name: 'Current Volume per Acre',
      type: 'number',
      unit: 'board feet/acre',
      description: 'Current timber volume per acre',
      placeholder: '5000',
      min: 0,
      max: 50000,
      step: 100,
      required: true
    },
    {
      id: 'matureVolume',
      name: 'Mature Volume per Acre',
      type: 'number',
      unit: 'board feet/acre',
      description: 'Expected volume per acre at rotation age',
      placeholder: '15000',
      min: 1000,
      max: 100000,
      step: 100,
      required: true
    },
    {
      id: 'timberPrice',
      name: 'Timber Price per Board Foot',
      type: 'number',
      unit: '$/board foot',
      description: 'Current market price for timber',
      placeholder: '0.35',
      min: 0.05,
      max: 5,
      step: 0.01,
      required: true
    },
    {
      id: 'priceGrowthRate',
      name: 'Timber Price Growth Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual growth in timber prices',
      placeholder: '2.5',
      min: -5,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'volumeGrowthRate',
      name: 'Volume Growth Rate',
      type: 'number',
      unit: '%',
      description: 'Annual growth rate of timber volume',
      placeholder: '3.5',
      min: 0,
      max: 15,
      step: 0.5,
      required: true
    },
    {
      id: 'harvestCosts',
      name: 'Harvest Costs per Acre',
      type: 'number',
      unit: '$/acre',
      description: 'Costs to harvest timber per acre',
      placeholder: '800',
      min: 100,
      max: 5000,
      step: 50,
      required: true
    },
    {
      id: 'replantingCosts',
      name: 'Replanting Costs per Acre',
      type: 'number',
      unit: '$/acre',
      description: 'Costs to replant after harvest',
      placeholder: '300',
      min: 50,
      max: 2000,
      step: 25,
      required: true
    },
    {
      id: 'annualExpenses',
      name: 'Annual Operating Expenses',
      type: 'number',
      unit: '$/acre',
      description: 'Annual property management and maintenance costs',
      placeholder: '25',
      min: 5,
      max: 200,
      step: 1,
      required: true
    },
    {
      id: 'propertyTaxes',
      name: 'Annual Property Taxes',
      type: 'number',
      unit: '$',
      description: 'Annual property tax amount',
      placeholder: '15000',
      min: 100,
      max: 500000,
      step: 100,
      required: true
    },
    {
      id: 'insurance',
      name: 'Annual Insurance',
      type: 'number',
      unit: '$',
      description: 'Annual insurance premium',
      placeholder: '8000',
      min: 100,
      max: 100000,
      step: 100,
      required: true
    },
    {
      id: 'managementFee',
      name: 'Management Fee',
      type: 'number',
      unit: '%',
      description: 'Property management fee percentage',
      placeholder: '3',
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'appreciationRate',
      name: 'Land Appreciation Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual land value appreciation',
      placeholder: '2',
      min: -5,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period',
      type: 'number',
      unit: 'years',
      description: 'Number of years for the analysis',
      placeholder: '30',
      min: 5,
      max: 50,
      step: 1,
      required: true
    },
    {
      id: 'harvestSchedule',
      name: 'Harvest Schedule',
      type: 'select',
      description: 'Harvest strategy for the property',
      placeholder: 'Select harvest schedule',
      required: true,
      options: [
        { value: 'clear-cut', label: 'Clear Cut (Full Rotation)' },
        { value: 'selective', label: 'Selective Harvest' },
        { value: 'thinning', label: 'Thinning + Final Harvest' },
        { value: 'continuous', label: 'Continuous Harvest' }
      ]
    },
    {
      id: 'thinningVolume',
      name: 'Thinning Volume per Acre',
      type: 'number',
      unit: 'board feet/acre',
      description: 'Volume removed during thinning (if applicable)',
      placeholder: '2000',
      min: 0,
      max: 20000,
      step: 100,
      required: true
    },
    {
      id: 'thinningAge',
      name: 'Thinning Age',
      type: 'number',
      unit: 'years',
      description: 'Age when thinning occurs (if applicable)',
      placeholder: '15',
      min: 5,
      max: 50,
      step: 1,
      required: true
    },
    {
      id: 'thinningPrice',
      name: 'Thinning Price per Board Foot',
      type: 'number',
      unit: '$/board foot',
      description: 'Price for thinned timber (usually lower)',
      placeholder: '0.20',
      min: 0.05,
      max: 3,
      step: 0.01,
      required: true
    }
  ],
  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: '$',
      description: 'Monthly mortgage payment amount'
    },
    {
      id: 'annualOperatingIncome',
      name: 'Annual Operating Income',
      type: 'number',
      unit: '$',
      description: 'Annual income from timber operations'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: '$',
      description: 'Annual cash flow after all expenses and mortgage'
    },
    {
      id: 'cashOnCashReturn',
      name: 'CashOnCash Return',
      type: 'number',
      unit: '%',
      description: 'Annual CashOnCash return on investment'
    },
    {
      id: 'totalROI',
      name: 'Total ROI',
      type: 'number',
      unit: '%',
      description: 'Total return on investment including appreciation'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return on the investment'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: '$',
      description: 'Net present value of the investment'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover initial investment'
    },
    {
      id: 'harvestRevenue',
      name: 'Total Harvest Revenue',
      type: 'number',
      unit: '$',
      description: 'Total revenue from timber harvests over analysis period'
    },
    {
      id: 'landValue',
      name: 'Projected Land Value',
      type: 'number',
      unit: '$',
      description: 'Projected land value at end of analysis period'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '$',
      description: 'Total return including harvest revenue and land appreciation'
    },
    {
      id: 'annualizedReturn',
      name: 'Annualized Return',
      type: 'number',
      unit: '%',
      description: 'Annualized return on investment'
    },
    {
      id: 'debtServiceCoverage',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: 'x',
      description: 'Ratio of operating income to debt service'
    },
    {
      id: 'profitabilityScore',
      name: 'Profitability Score',
      type: 'number',
      unit: '/100',
      description: 'Overall profitability assessment score'
    },
    {
      id: 'investmentScore',
      name: 'Investment Score',
      type: 'number',
      unit: '/100',
      description: 'Overall investment quality score'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      unit: '/100',
      description: 'Investment risk assessment score'
    },
    {
      id: 'valueScore',
      name: 'Value Score',
      type: 'number',
      unit: '/100',
      description: 'Value proposition assessment score'
    },
    {
      id: 'nextHarvestYear',
      name: 'Next Harvest Year',
      type: 'number',
      unit: 'years',
      description: 'Years until next harvest opportunity'
    },
    {
      id: 'harvestSchedule',
      name: 'Harvest Schedule',
      type: 'array',
      description: 'Projected harvest schedule over analysis period'
    },
    {
      id: 'recommendation',
      name: 'Recommendation',
      type: 'string',
      description: 'Professional recommendation based on analysis'
    }
  ],
  calculate: calculateTimberlandInvestment,
  generateReport: generateTimberlandInvestmentAnalysis
};
