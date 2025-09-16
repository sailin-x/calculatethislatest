import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../../types/calculator';
import { calculatePaycheck } from './formulas';
import { getPaycheckValidationRules } from './validation';

/**
 * Paycheck Calculator
 * Industry-standard payroll calculations for hourly and salaried employees
 */
export const paycheckCalculator: Calculator = {
  id: 'paycheck-calculator',
  title: 'Paycheck Calculator',
  category: 'business',
  subcategory: 'payroll',
  description: 'Calculate your take-home pay including federal, state, and local taxes, Social Security, Medicare, and other deductions.',
  usageInstructions: [
    'Select your pay type (hourly or salary)',
    'Enter your pay rate and hours worked (for hourly)',
    'Enter your annual salary and pay period (for salary)',
    'Provide your filing status and number of dependents',
    'Enter any additional withholding or state tax information',
    'Review your calculated take-home pay and tax breakdown'
  ],
  inputs: [
    {
      id: 'payType',
      label: 'Pay Type',
      type: 'select',
      required: true,
      options: [
        { value: 'hourly', label: 'Hourly' },
        { value: 'salary', label: 'Salary' }
      ],
      tooltip: 'Select whether you are paid hourly or receive a fixed salary'
    },
    {
      id: 'hourlyRate',
      label: 'Hourly Rate ($)',
      type: 'currency',
      required: false,
      min: 7.25,
      max: 500,
      tooltip: 'Your hourly wage (must be at least federal minimum wage of $7.25)'
    },
    {
      id: 'hoursWorked',
      label: 'Hours Worked',
      type: 'number',
      required: false,
      min: 0,
      max: 168,
      tooltip: 'Total hours worked in this pay period (maximum 168 hours/week)'
    },
    {
      id: 'overtimeHours',
      label: 'Overtime Hours',
      type: 'number',
      required: false,
      min: 0,
      max: 40,
      tooltip: 'Overtime hours worked (requires working at least 40 hours total)'
    },
    {
      id: 'annualSalary',
      label: 'Annual Salary ($)',
      type: 'currency',
      required: false,
      min: 16000,
      max: 10000000,
      tooltip: 'Your annual salary before taxes and deductions'
    },
    {
      id: 'payPeriod',
      label: 'Pay Period',
      type: 'select',
      required: true,
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'biweekly', label: 'Biweekly (every 2 weeks)' },
        { value: 'semimonthly', label: 'Semimonthly (twice per month)' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often you receive your paycheck'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
        { value: 'headOfHousehold', label: 'Head of Household' }
      ],
      tooltip: 'Your federal income tax filing status'
    },
    {
      id: 'dependents',
      label: 'Number of Dependents',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 0,
      tooltip: 'Number of dependents claimed on your tax return'
    },
    {
      id: 'additionalWithholding',
      label: 'Additional Federal Withholding ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      defaultValue: 0,
      tooltip: 'Extra amount to withhold from federal taxes'
    },
    {
      id: 'additionalMedicareTax',
      label: 'Additional Medicare Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      defaultValue: 0,
      tooltip: 'Additional Medicare tax for high earners (over $200,000)'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 0,
      tooltip: 'Your state income tax rate (varies by state)'
    },
    {
      id: 'otherDeductions',
      label: 'Other Deductions ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      defaultValue: 0,
      tooltip: 'Health insurance, retirement contributions, etc.'
    }
  ],
  outputs: [
    {
      id: 'grossPay',
      label: 'Gross Pay',
      type: 'currency',
      format: 'currency',
      explanation: 'Your total earnings before taxes and deductions'
    },
    {
      id: 'federalTax',
      label: 'Federal Income Tax',
      type: 'currency',
      format: 'currency',
      explanation: 'Federal income tax withheld based on 2024 tax brackets'
    },
    {
      id: 'socialSecurityTax',
      label: 'Social Security Tax',
      type: 'currency',
      format: 'currency',
      explanation: 'Social Security tax (6.2% of gross pay, up to $168,600 limit)'
    },
    {
      id: 'medicareTax',
      label: 'Medicare Tax',
      type: 'currency',
      format: 'currency',
      explanation: 'Medicare tax (1.45% of gross pay, plus additional tax for high earners)'
    },
    {
      id: 'stateTax',
      label: 'State Income Tax',
      type: 'currency',
      format: 'currency',
      explanation: 'State income tax based on your specified rate'
    },
    {
      id: 'totalDeductions',
      label: 'Total Deductions',
      type: 'currency',
      format: 'currency',
      explanation: 'Sum of all taxes and deductions'
    },
    {
      id: 'netPay',
      label: 'Net Pay (Take-Home)',
      type: 'currency',
      format: 'currency',
      explanation: 'Your actual take-home pay after all deductions'
    }
  ],
  formulas: [
    {
      id: 'gross-pay-calculation',
      name: 'Gross Pay Calculation',
      description: 'Calculate gross pay based on hourly rate and hours worked, or annual salary and pay period',
      calculate: (inputs) => {
        const result = calculatePaycheck(inputs);
        return {
          outputs: {
            grossPay: result.grossPay,
            federalTax: result.federalTax,
            socialSecurityTax: result.socialSecurityTax,
            medicareTax: result.medicareTax,
            stateTax: result.stateTax,
            totalDeductions: result.totalDeductions,
            netPay: result.netPay
          },
          explanation: `Calculated paycheck for ${inputs.payPeriod} pay period`
        };
      }
    }
  ],
  validationRules: getPaycheckValidationRules(),
  examples: [
    {
      title: 'Hourly Employee Example',
      description: 'Calculate paycheck for an hourly employee working 45 hours with overtime',
      inputs: {
        payType: 'hourly',
        hourlyRate: 25,
        hoursWorked: 45,
        overtimeHours: 5,
        payPeriod: 'biweekly',
        filingStatus: 'single',
        dependents: 1,
        stateTaxRate: 5.0
      },
      expectedOutputs: {
        grossPay: 1187.50,
        federalTax: 89.25,
        socialSecurityTax: 73.73,
        medicareTax: 17.24,
        stateTax: 59.38,
        totalDeductions: 239.60,
        netPay: 947.90
      }
    },
    {
      title: 'Salaried Employee Example',
      description: 'Calculate paycheck for a salaried employee earning $75,000 annually',
      inputs: {
        payType: 'salary',
        annualSalary: 75000,
        payPeriod: 'biweekly',
        filingStatus: 'married',
        dependents: 2,
        stateTaxRate: 6.5
      },
      expectedOutputs: {
        grossPay: 2884.62,
        federalTax: 256.78,
        socialSecurityTax: 178.83,
        medicareTax: 41.83,
        stateTax: 187.50,
        totalDeductions: 664.94,
        netPay: 2219.68
      }
    }
  ]
};