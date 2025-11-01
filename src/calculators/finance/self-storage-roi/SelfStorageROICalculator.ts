import { Calculator } from '../../types/calculator';
import { calculateSelfStorageROI } from './formulas';
import { generateSelfStorageROIAnalysis } from './formulas';

export const SelfStorageROICalculator: Calculator = {
  id: 'SelfStorageRoi-calculator',
  name: 'Self-Storage Facility ROI Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate ROI, cash flow, and financial metrics for self-storage facility investments.',
  inputs: [
    {
      id: 'facilitySize',
      name: 'Facility Size (sq ft)',
      type: 'number',
      unit: 'sq ft',
      description: 'Total square footage of the self-storage facility',
      placeholder: '50000',
      min: 1000,
      max: 1000000,
      step: 1000,
      required: true
    },
    {
      id: 'unitCount',
      name: 'Number of Units',
      type: 'number',
      unit: 'units',
      description: 'Total number of storage units in the facility',
      placeholder: '400',
      min: 10,
      max: 10000,
      step: 1,
      required: true
    },
    {
      id: 'averageUnitSize',
      name: 'Average Unit Size (sq ft)',
      type: 'number',
      unit: 'sq ft',
      description: 'Average size of individual storage units',
      placeholder: '125',
      min: 25,
      max: 1000,
      step: 5,
      required: true
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: '$',
      description: 'Total purchase price of the facility',
      placeholder: '2500000',
      min: 100000,
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
      placeholder: '500000',
      min: 20000,
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
      id: 'averageRentPerSqFt',
      name: 'Average Rent per Sq Ft',
      type: 'number',
      unit: '$/sq ft/month',
      description: 'Average monthly rent per square foot',
      placeholder: '1.25',
      min: 0.5,
      max: 5,
      step: 0.05,
      required: true
    },
    {
      id: 'occupancyRate',
      name: 'Occupancy Rate',
      type: 'number',
      unit: '%',
      description: 'Expected average occupancy rate',
      placeholder: '85',
      min: 50,
      max: 100,
      step: 1,
      required: true
    },
    {
      id: 'annualExpenses',
      name: 'Annual Operating Expenses',
      type: 'number',
      unit: '$',
      description: 'Total annual operating expenses',
      placeholder: '150000',
      min: 10000,
      max: 5000000,
      step: 1000,
      required: true
    },
    {
      id: 'propertyTaxes',
      name: 'Annual Property Taxes',
      type: 'number',
      unit: '$',
      description: 'Annual property tax amount',
      placeholder: '25000',
      min: 1000,
      max: 500000,
      step: 1000,
      required: true
    },
    {
      id: 'insurance',
      name: 'Annual Insurance',
      type: 'number',
      unit: '$',
      description: 'Annual insurance premium',
      placeholder: '15000',
      min: 1000,
      max: 100000,
      step: 1000,
      required: true
    },
    {
      id: 'utilities',
      name: 'Annual Utilities',
      type: 'number',
      unit: '$',
      description: 'Annual utility costs',
      placeholder: '20000',
      min: 1000,
      max: 200000,
      step: 1000,
      required: true
    },
    {
      id: 'maintenance',
      name: 'Annual Maintenance',
      type: 'number',
      unit: '$',
      description: 'Annual maintenance and repair costs',
      placeholder: '30000',
      min: 1000,
      max: 300000,
      step: 1000,
      required: true
    },
    {
      id: 'managementFee',
      name: 'Management Fee',
      type: 'number',
      unit: '%',
      description: 'Property management fee percentage',
      placeholder: '5',
      min: 0,
      max: 15,
      step: 0.5,
      required: true
    },
    {
      id: 'appreciationRate',
      name: 'Annual Appreciation Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual property appreciation',
      placeholder: '3',
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
      placeholder: '10',
      min: 1,
      max: 30,
      step: 1,
      required: true
    },
    {
      id: 'rentIncreaseRate',
      name: 'Annual Rent Increase Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual rent increase rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'expenseIncreaseRate',
      name: 'Annual Expense Increase Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual expense increase rate',
      placeholder: '2',
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    {
      id: 'vacancyLoss',
      name: 'Vacancy Loss Rate',
      type: 'number',
      unit: '%',
      description: 'Expected vacancy loss percentage',
      placeholder: '5',
      min: 0,
      max: 20,
      step: 0.5,
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
      id: 'annualRentalIncome',
      name: 'Annual Rental Income',
      type: 'number',
      unit: '$',
      description: 'Total annual rental income'
    },
    {
      id: 'annualOperatingIncome',
      name: 'Annual Operating Income',
      type: 'number',
      unit: '$',
      description: 'Annual income after operating expenses'
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
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate'
    },
    {
      id: 'totalROI',
      name: 'Total ROI',
      type: 'number',
      unit: '%',
      description: 'Total return on investment including appreciation'
    },
    {
      id: 'breakEvenOccupancy',
      name: 'Break-Even Occupancy',
      type: 'number',
      unit: '%',
      description: 'Occupancy rate needed to break even'
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
      id: 'projectedValue',
      name: 'Projected Property Value',
      type: 'number',
      unit: '$',
      description: 'Projected property value at end of analysis period'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '$',
      description: 'Total return including appreciation and cash flow'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: '$',
      description: 'Net present value of the investment'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return on the investment'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover initial investment'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: '$',
      description: 'Monthly cash flow after all expenses'
    },
    {
      id: 'annualizedReturn',
      name: 'Annualized Return',
      type: 'number',
      unit: '%',
      description: 'Annualized return on investment'
    }
  ],
  calculate: calculateSelfStorageROI,
  generateReport: generateSelfStorageROIAnalysis
};
