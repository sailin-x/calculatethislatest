import { Calculator } from '../../types/calculator';
import { automotiveCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const automotiveCalculator: Calculator = {
  id: 'automotive-calculator',
  title: 'Comprehensive Automotive Calculator',
  category: 'lifestyle',
  subcategory: 'Automotive & Transportation',
  description: 'Complete automotive financial calculator supporting lease vs buy analysis, depreciation calculations, total cost of ownership, fuel efficiency, and vehicle financing with detailed comparisons.',
  
  usageInstructions: [
    'Select the type of automotive calculation (lease vs buy, depreciation, TCO, or fuel efficiency)',
    'Enter vehicle details including price, financing terms, and usage patterns',
    'For lease vs buy analysis, provide both lease and purchase options',
    'Include maintenance, insurance, and fuel costs for accurate TCO calculations',
    'Review comprehensive analysis with recommendations and break-even points'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'lease_vs_buy', label: 'Lease vs Buy Analysis' },
        { value: 'depreciation', label: 'Vehicle Depreciation' },
        { value: 'total_cost_ownership', label: 'Total Cost of Ownership' },
        { value: 'fuel_efficiency', label: 'Fuel Efficiency & Costs' },
        { value: 'loan_calculator', label: 'Auto Loan Calculator' },
        { value: 'trade_in_value', label: 'Trade-in Value Estimator' }
      ],
      tooltip: 'Choose the type of automotive calculation'
    },
    {
      id: 'vehiclePrice',
      label: 'Vehicle Price ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 500000,
      placeholder: '35000',
      tooltip: 'Purchase price or MSRP of the vehicle'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: false,
      min: 0,
      placeholder: '5000',
      tooltip: 'Initial down payment amount'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (months)',
      type: 'number',
      required: false,
      min: 12,
      max: 84,
      placeholder: '60',
      tooltip: 'Length of auto loan in months'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 30,
      placeholder: '4.5',
      tooltip: 'Annual interest rate for financing'
    },
    {
      id: 'leaseMonthlyPayment',
      label: 'Lease Monthly Payment ($)',
      type: 'currency',
      required: false,
      placeholder: '399',
      tooltip: 'Monthly lease payment amount'
    },
    {
      id: 'leaseTerm',
      label: 'Lease Term (months)',
      type: 'number',
      required: false,
      min: 12,
      max: 48,
      placeholder: '36',
      tooltip: 'Length of lease in months'
    },
    {
      id: 'leaseDownPayment',
      label: 'Lease Down Payment ($)',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Initial lease down payment'
    },
    {
      id: 'residualValue',
      label: 'Residual Value ($)',
      type: 'currency',
      required: false,
      placeholder: '18000',
      tooltip: 'Expected value at end of lease'
    },
    {
      id: 'annualMileage',
      label: 'Annual Mileage',
      type: 'number',
      required: false,
      min: 1000,
      max: 50000,
      placeholder: '12000',
      tooltip: 'Expected miles driven per year'
    },
    {
      id: 'fuelPrice',
      label: 'Fuel Price ($/gallon)',
      type: 'currency',
      required: false,
      min: 1,
      max: 10,
      placeholder: '3.50',
      tooltip: 'Current fuel price per gallon'
    },
    {
      id: 'mpg',
      label: 'Miles Per Gallon (MPG)',
      type: 'number',
      required: false,
      min: 5,
      max: 100,
      placeholder: '28',
      tooltip: 'Vehicle fuel efficiency'
    },
    {
      id: 'annualInsurance',
      label: 'Annual Insurance ($)',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual insurance premium'
    },
    {
      id: 'annualMaintenance',
      label: 'Annual Maintenance ($)',
      type: 'currency',
      required: false,
      placeholder: '800',
      tooltip: 'Annual maintenance and repair costs'
    },
    {
      id: 'ownershipPeriod',
      label: 'Ownership Period (years)',
      type: 'number',
      required: false,
      min: 1,
      max: 20,
      placeholder: '5',
      tooltip: 'How long you plan to keep the vehicle'
    }
  ],

  outputs: [
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Best financial option based on your situation'
    },
    {
      id: 'totalCostBuy',
      label: 'Total Cost to Buy',
      type: 'currency',
      explanation: 'Total cost of purchasing and owning the vehicle'
    },
    {
      id: 'totalCostLease',
      label: 'Total Cost to Lease',
      type: 'currency',
      explanation: 'Total cost of leasing the vehicle'
    },
    {
      id: 'monthlyCostBuy',
      label: 'Monthly Cost (Buy)',
      type: 'currency',
      explanation: 'Average monthly cost of ownership'
    },
    {
      id: 'monthlyCostLease',
      label: 'Monthly Cost (Lease)',
      type: 'currency',
      explanation: 'Average monthly cost of leasing'
    },
    {
      id: 'depreciation',
      label: 'Total Depreciation',
      type: 'currency',
      explanation: 'Expected depreciation over ownership period'
    },
    {
      id: 'equityBuilt',
      label: 'Equity Built',
      type: 'currency',
      explanation: 'Vehicle equity after loan payments'
    },
    {
      id: 'annualFuelCost',
      label: 'Annual Fuel Cost',
      type: 'currency',
      explanation: 'Estimated annual fuel expenses'
    },
    {
      id: 'costPerMile',
      label: 'Cost Per Mile',
      type: 'currency',
      explanation: 'Total cost per mile driven'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-even Point',
      type: 'text',
      explanation: 'When buying becomes more cost-effective than leasing'
    }
  ],

  formulas: [automotiveCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    ValidationRuleFactory.required('vehiclePrice', 'Vehicle price is required'),
    
    ValidationRuleFactory.businessRule(
      'downPayment',
      (downPayment, inputs) => {
        if (downPayment && inputs?.vehiclePrice) {
          return downPayment <= inputs.vehiclePrice * 0.5;
        }
        return true;
      },
      'Down payment cannot exceed 50% of vehicle price'
    ),
    
    ValidationRuleFactory.businessRule(
      'leaseMonthlyPayment',
      (payment, inputs) => {
        if (inputs?.calculationType === 'lease_vs_buy' && !payment) {
          return false;
        }
        return true;
      },
      'Lease monthly payment is required for lease vs buy analysis'
    ),
    
    ValidationRuleFactory.businessRule(
      'loanTerm',
      (term, inputs) => {
        if (inputs?.calculationType === 'loan_calculator' && !term) {
          return false;
        }
        return true;
      },
      'Loan term is required for loan calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'interestRate',
      (rate) => {
        if (rate !== undefined && (rate < 0 || rate > 30)) {
          return false;
        }
        return true;
      },
      'Interest rate must be between 0% and 30%'
    )
  ],

  examples: [
    {
      title: 'Lease vs Buy Analysis',
      description: 'Compare leasing vs buying a $35,000 vehicle',
      inputs: {
        calculationType: 'lease_vs_buy',
        vehiclePrice: 35000,
        downPayment: 5000,
        loanTerm: 60,
        interestRate: 4.5,
        leaseMonthlyPayment: 399,
        leaseTerm: 36,
        leaseDownPayment: 2000,
        residualValue: 18000,
        annualMileage: 12000,
        ownershipPeriod: 5
      },
      expectedOutputs: {
        recommendation: 'Buy',
        totalCostBuy: 42500,
        totalCostLease: 16364
      }
    },
    {
      title: 'Total Cost of Ownership',
      description: 'Calculate 5-year TCO for a vehicle',
      inputs: {
        calculationType: 'total_cost_ownership',
        vehiclePrice: 30000,
        annualMileage: 15000,
        fuelPrice: 3.50,
        mpg: 25,
        annualInsurance: 1200,
        annualMaintenance: 1000,
        ownershipPeriod: 5
      },
      expectedOutputs: {
        totalCostBuy: 45600,
        annualFuelCost: 2100,
        costPerMile: 0.608
      }
    }
  ]
};