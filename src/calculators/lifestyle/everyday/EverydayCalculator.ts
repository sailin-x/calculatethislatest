import { Calculator } from '../../../types/calculator';
import { everydayCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const everydayCalculator: Calculator = {
  id: 'everyday-calculator',
  title: 'Everyday Utilities Calculator',
  category: 'lifestyle',
  subcategory: 'Daily Life & Utilities',
  description: 'Practical everyday calculators including tip calculator, bill splitter, date/time calculations, age calculator, and other daily life utilities with smart recommendations.',
  
  usageInstructions: [
    'Select the type of everyday calculation (tip, bill split, date/time, or age)',
    'Enter the relevant amounts, dates, or values',
    'For tip calculations, choose service quality and location',
    'For bill splitting, specify number of people and any special arrangements',
    'Review results with helpful suggestions and breakdowns'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'tip_calculator', label: 'Tip Calculator' },
        { value: 'bill_splitter', label: 'Bill Splitter' },
        { value: 'date_calculator', label: 'Date & Time Calculator' },
        { value: 'age_calculator', label: 'Age Calculator' },
        { value: 'time_zone', label: 'Time Zone Converter' },
        { value: 'discount_calculator', label: 'Discount & Sale Calculator' },
        { value: 'percentage_calculator', label: 'Percentage Calculator' }
      ],
      tooltip: 'Choose the type of everyday calculation'
    },
    {
      id: 'billAmount',
      label: 'Bill Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      placeholder: '85.50',
      tooltip: 'Total bill amount before tip'
    },
    {
      id: 'tipPercentage',
      label: 'Tip Percentage (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      placeholder: '18',
      tooltip: 'Tip percentage (15-20% is standard)'
    },
    {
      id: 'serviceQuality',
      label: 'Service Quality',
      type: 'select',
      required: false,
      options: [
        { value: 'poor', label: 'Poor (10-12%)' },
        { value: 'average', label: 'Average (15-18%)' },
        { value: 'good', label: 'Good (18-20%)' },
        { value: 'excellent', label: 'Excellent (20-25%)' },
        { value: 'custom', label: 'Custom Amount' }
      ],
      tooltip: 'Quality of service received'
    },
    {
      id: 'numberOfPeople',
      label: 'Number of People',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      placeholder: '4',
      tooltip: 'Number of people splitting the bill'
    },
    {
      id: 'splitType',
      label: 'Split Type',
      type: 'select',
      required: false,
      options: [
        { value: 'equal', label: 'Split Equally' },
        { value: 'by_item', label: 'Split by Items Ordered' },
        { value: 'custom', label: 'Custom Amounts' }
      ],
      defaultValue: 'equal',
      tooltip: 'How to split the bill'
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: false,
      tooltip: 'Starting date for calculation'
    },
    {
      id: 'endDate',
      label: 'End Date',
      type: 'date',
      required: false,
      tooltip: 'Ending date for calculation'
    },
    {
      id: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: false,
      tooltip: 'Date of birth for age calculation'
    },
    {
      id: 'originalPrice',
      label: 'Original Price ($)',
      type: 'currency',
      required: false,
      placeholder: '120.00',
      tooltip: 'Original price before discount'
    },
    {
      id: 'discountPercentage',
      label: 'Discount Percentage (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      placeholder: '25',
      tooltip: 'Discount percentage'
    },
    {
      id: 'salePrice',
      label: 'Sale Price ($)',
      type: 'currency',
      required: false,
      placeholder: '90.00',
      tooltip: 'Sale price after discount'
    },
    {
      id: 'percentageValue',
      label: 'Value',
      type: 'number',
      required: false,
      placeholder: '150',
      tooltip: 'Value for percentage calculation'
    },
    {
      id: 'percentageOf',
      label: 'Percentage Of',
      type: 'number',
      required: false,
      placeholder: '200',
      tooltip: 'Total value for percentage calculation'
    },
    {
      id: 'roundUp',
      label: 'Round Up Tip',
      type: 'boolean',
      required: false,
      tooltip: 'Round tip up to nearest dollar'
    }
  ],

  outputs: [
    {
      id: 'tipAmount',
      label: 'Tip Amount',
      type: 'currency',
      explanation: 'Calculated tip amount'
    },
    {
      id: 'totalAmount',
      label: 'Total Amount',
      type: 'currency',
      explanation: 'Bill amount plus tip'
    },
    {
      id: 'perPersonAmount',
      label: 'Per Person Amount',
      type: 'currency',
      explanation: 'Amount each person should pay'
    },
    {
      id: 'perPersonTip',
      label: 'Per Person Tip',
      type: 'currency',
      explanation: 'Tip amount per person'
    },
    {
      id: 'daysDifference',
      label: 'Days Difference',
      type: 'number',
      explanation: 'Number of days between dates'
    },
    {
      id: 'ageYears',
      label: 'Age in Years',
      type: 'number',
      explanation: 'Age in complete years'
    },
    {
      id: 'ageDetailed',
      label: 'Detailed Age',
      type: 'text',
      explanation: 'Age broken down by years, months, and days'
    },
    {
      id: 'discountAmount',
      label: 'Discount Amount',
      type: 'currency',
      explanation: 'Amount saved with discount'
    },
    {
      id: 'finalPrice',
      label: 'Final Price',
      type: 'currency',
      explanation: 'Price after discount'
    },
    {
      id: 'percentageResult',
      label: 'Percentage Result',
      type: 'text',
      explanation: 'Result of percentage calculation'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Helpful tips and suggestions'
    }
  ],

  formulas: [everydayCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    
    ValidationRuleFactory.businessRule(
      'billAmount',
      (amount, inputs) => {
        const tipCalcs = ['tip_calculator', 'bill_splitter'];
        if (tipCalcs.includes(inputs?.calculationType) && !amount) {
          return false;
        }
        return true;
      },
      'Bill amount is required for tip and bill splitting calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'numberOfPeople',
      (people, inputs) => {
        if (inputs?.calculationType === 'bill_splitter' && !people) {
          return false;
        }
        return true;
      },
      'Number of people is required for bill splitting'
    ),
    
    ValidationRuleFactory.businessRule(
      'birthDate',
      (date, inputs) => {
        if (inputs?.calculationType === 'age_calculator' && !date) {
          return false;
        }
        return true;
      },
      'Birth date is required for age calculation'
    ),
    
    ValidationRuleFactory.businessRule(
      'tipPercentage',
      (percentage) => {
        if (percentage !== undefined && (percentage < 0 || percentage > 50)) {
          return false;
        }
        return true;
      },
      'Tip percentage must be between 0% and 50%'
    )
  ],

  examples: [
    {
      title: 'Restaurant Tip Calculator',
      description: 'Calculate tip for $85.50 bill with good service',
      inputs: {
        calculationType: 'tip_calculator',
        billAmount: 85.50,
        serviceQuality: 'good',
        numberOfPeople: 4
      },
      expectedOutputs: {
        tipAmount: 15.39,
        totalAmount: 100.89,
        perPersonAmount: 25.22
      }
    },
    {
      title: 'Bill Splitter',
      description: 'Split $120 bill equally among 6 people',
      inputs: {
        calculationType: 'bill_splitter',
        billAmount: 120.00,
        tipPercentage: 18,
        numberOfPeople: 6,
        splitType: 'equal'
      },
      expectedOutputs: {
        totalAmount: 141.60,
        perPersonAmount: 23.60,
        perPersonTip: 3.60
      }
    }
  ]
};