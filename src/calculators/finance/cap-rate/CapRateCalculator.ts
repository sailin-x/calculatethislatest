import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateCapRate, calculateNOI, generateInvestmentAnalysis } from './formulas';
import { validateCapRateInputs } from './validation';

export const CapRateCalculator: Calculator = {
  id: 'CapRateCalculator',
  name: 'Cap Rate Calculator',
  description: 'Calculate the capitalization rate (cap rate) for real estate investments to evaluate potential returns and compare investment opportunities.',
  category: 'finance',
  subcategory: 'investment',
  tags: ['cap-rate', 'real-estate', 'investment', 'roi', 'noi', 'property-analysis'],
  
  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 100000000,
      step: 1000,
      tooltip: 'Current market value or purchase price of the property',
      placeholder: '500000'
    },
    {
      id: 'grossRent',
      label: 'Annual Gross Rent ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 5000000,
      step: 100,
      tooltip: 'Total annual rental income before expenses',
      placeholder: '60000'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Expected vacancy rate as percentage of gross rent',
      placeholder: '5.0'
    },
    {
      id: 'propertyTax',
      label: 'Annual Property Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual property tax amount',
      placeholder: '8000'
    },
    {
      id: 'insurance',
      label: 'Annual Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual insurance premium',
      placeholder: '3000'
    },
    {
      id: 'utilities',
      label: 'Annual Utilities ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual utility costs (if paid by landlord)',
      placeholder: '4000'
    },
    {
      id: 'maintenance',
      label: 'Annual Maintenance ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual maintenance and repair costs',
      placeholder: '5000'
    },
    {
      id: 'propertyManagement',
      label: 'Property Management Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      tooltip: 'Property management fee as percentage of gross rent',
      placeholder: '8.0'
    },
    {
      id: 'hoaFees',
      label: 'Annual HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual homeowners association fees',
      placeholder: '2400'
    },
    {
      id: 'otherExpenses',
      label: 'Other Annual Expenses ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Other annual expenses (legal, accounting, etc.)',
      placeholder: '2000'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'multi-family', label: 'Multi-Family Building' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Property' },
        { value: 'industrial', label: 'Industrial Property' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'mixed-use', label: 'Mixed-Use Property' }
      ],
      tooltip: 'Type of property for market comparison',
      placeholder: 'single-family'
    },
    {
      id: 'location',
      label: 'Location/Market',
      type: 'select',
      required: false,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' },
        { value: 'resort', label: 'Resort/Vacation' },
        { value: 'college-town', label: 'College Town' },
        { value: 'retirement', label: 'Retirement Community' }
      ],
      tooltip: 'Property location for market analysis',
      placeholder: 'suburban'
    },
    {
      id: 'propertyAge',
      label: 'Property Age (years)',
      type: 'number',
      required: false,
      min: 0,
      max: 200,
      step: 1,
      tooltip: 'Age of the property in years',
      placeholder: '15'
    },
    {
      id: 'propertyCondition',
      label: 'Property Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'needs-rehab', label: 'Needs Rehabilitation' }
      ],
      tooltip: 'Current condition of the property',
      placeholder: 'good'
    },
    {
      id: 'marketCapRate',
      label: 'Market Cap Rate (%)',
      type: 'percentage',
      required: false,
      min: 1,
      max: 20,
      step: 0.1,
      tooltip: 'Average cap rate for similar properties in the market',
      placeholder: '6.5'
    }
  ],

  outputs: [
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Capitalization rate - annual return on investment'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income (NOI)',
      type: 'currency',
      explanation: 'Annual net operating income after all expenses'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Gross rent minus vacancy losses'
    },
    {
      id: 'totalExpenses',
      label: 'Total Annual Expenses',
      type: 'currency',
      explanation: 'Sum of all annual operating expenses'
    },
    {
      id: 'vacancyLoss',
      label: 'Vacancy Loss',
      type: 'currency',
      explanation: 'Lost income due to vacancy'
    },
    {
      id: 'operatingExpenseRatio',
      label: 'Operating Expense Ratio',
      type: 'percentage',
      explanation: 'Total expenses as percentage of effective gross income'
    },
    {
      id: 'cashOnCashReturn',
      label: 'CashOnCash Return',
      type: 'percentage',
      explanation: 'Annual cash flow relative to cash invested (if financed)'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'text',
      explanation: 'Comparison with market cap rates and investment assessment'
    },
    {
      id: 'investmentGrade',
      label: 'Investment Grade',
      type: 'text',
      explanation: 'Investment quality assessment based on cap rate analysis'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Risk factors and considerations for this investment'
    },
    {
      id: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'text',
      explanation: 'Analysis of when the investment breaks even'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Impact of changes in key variables on cap rate'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateCapRateInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate cap rate and related metrics
    const capRateMetrics = calculateCapRate(inputs);
    
    // Calculate NOI breakdown
    const noiBreakdown = calculateNOI(inputs);
    
    // Generate investment analysis
    const investmentAnalysis = generateInvestmentAnalysis(inputs, capRateMetrics);

    return {
      capRate: capRateMetrics.capRate,
      netOperatingIncome: capRateMetrics.noi,
      effectiveGrossIncome: noiBreakdown.effectiveGrossIncome,
      totalExpenses: noiBreakdown.totalExpenses,
      vacancyLoss: noiBreakdown.vacancyLoss,
      operatingExpenseRatio: noiBreakdown.operatingExpenseRatio,
      cashOnCashReturn: capRateMetrics.cashOnCashReturn,
      marketComparison: investmentAnalysis.marketComparison,
      investmentGrade: investmentAnalysis.investmentGrade,
      riskAssessment: investmentAnalysis.riskAssessment,
      breakEvenAnalysis: investmentAnalysis.breakEvenAnalysis,
      sensitivityAnalysis: investmentAnalysis.sensitivityAnalysis
    };
  },

  formulas: [
    {
      name: 'Cap Rate Formula',
      formula: 'Cap Rate = (Net Operating Income ÷ Property Value) × 100',
      description: 'Basic capitalization rate calculation'
    },
    {
      name: 'Net Operating Income (NOI)',
      formula: 'NOI = Effective Gross Income - Total Operating Expenses',
      description: 'Net income after all operating expenses but before debt service and taxes'
    },
    {
      name: 'Effective Gross Income',
      formula: 'Effective Gross Income = Gross Rent - Vacancy Loss',
      description: 'Gross rent minus expected vacancy losses'
    },
    {
      name: 'Operating Expense Ratio',
      formula: 'OER = (Total Operating Expenses ÷ Effective Gross Income) × 100',
      description: 'Operating expenses as percentage of effective gross income'
    },
    {
      name: 'CashOnCash Return',
      formula: 'CoC = (Annual Cash Flow ÷ Cash Invested) × 100',
      description: 'Return on actual cash invested (for financed properties)'
    }
  ],

  examples: [
    {
      name: 'Standard Single Family Rental',
      description: 'Typical single family home rental property',
      inputs: {
        propertyValue: 350000,
        grossRent: 42000,
        vacancyRate: 5.0,
        propertyTax: 7000,
        insurance: 2500,
        utilities: 0,
        maintenance: 4000,
        propertyManagement: 8.0,
        hoaFees: 0,
        otherExpenses: 1500,
        propertyType: 'single-family',
        location: 'suburban',
        propertyAge: 12,
        propertyCondition: 'good',
        marketCapRate: 6.5
      },
      expectedOutputs: {
        capRate: 6.2,
        netOperatingIncome: 21700,
        effectiveGrossIncome: 39900,
        totalExpenses: 18200,
        operatingExpenseRatio: 45.6
      }
    },
    {
      name: 'Multi-Family Investment Property',
      description: 'Small multi-family building with multiple units',
      inputs: {
        propertyValue: 750000,
        grossRent: 96000,
        vacancyRate: 3.0,
        propertyTax: 15000,
        insurance: 6000,
        utilities: 8000,
        maintenance: 12000,
        propertyManagement: 10.0,
        hoaFees: 0,
        otherExpenses: 3000,
        propertyType: 'multi-family',
        location: 'urban',
        propertyAge: 8,
        propertyCondition: 'excellent',
        marketCapRate: 5.8
      },
      expectedOutputs: {
        capRate: 5.9,
        netOperatingIncome: 44250,
        effectiveGrossIncome: 93120,
        totalExpenses: 48870,
        operatingExpenseRatio: 52.5
      }
    },
    {
      name: 'Commercial Office Building',
      description: 'Small commercial office building',
      inputs: {
        propertyValue: 1200000,
        grossRent: 180000,
        vacancyRate: 8.0,
        propertyTax: 24000,
        insurance: 12000,
        utilities: 15000,
        maintenance: 18000,
        propertyManagement: 6.0,
        hoaFees: 0,
        otherExpenses: 8000,
        propertyType: 'office',
        location: 'urban',
        propertyAge: 15,
        propertyCondition: 'good',
        marketCapRate: 7.2
      },
      expectedOutputs: {
        capRate: 7.1,
        netOperatingIncome: 85200,
        effectiveGrossIncome: 165600,
        totalExpenses: 80400,
        operatingExpenseRatio: 48.6
      }
    }
  ],

  usageInstructions: [
    'Enter the property value or purchase price',
    'Input the annual gross rental income',
    'Set the expected vacancy rate (typically 3-8%)',
    'Add all annual operating expenses (taxes, insurance, maintenance, etc.)',
    'Include property management fees if applicable',
    'Specify property type and location for market comparison',
    'Review the calculated cap rate and NOI',
    'Compare with market cap rates for similar properties',
    'Consider the investment grade and risk assessment',
    'Use the sensitivity analysis to understand risk factors',
    'Evaluate if the cap rate meets your investment criteria'
  ]
};
