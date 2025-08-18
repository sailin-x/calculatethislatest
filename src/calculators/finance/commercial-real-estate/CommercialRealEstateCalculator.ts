import { Calculator } from '../../types/calculator';
import { calculateCommercialRealEstate, generateCommercialAnalysis } from './formulas';
import { validateCommercialRealEstateInputs } from './validation';

export const CommercialRealEstateCalculator: Calculator = {
  id: 'commercial-real-estate-calculator',
  name: 'Commercial Real Estate Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate comprehensive metrics for commercial real estate investments including NOI, cap rate, cash flow, and investment analysis.',
  
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the commercial property',
      placeholder: '2500000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Purchase price of the commercial property',
      placeholder: '2300000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial cash investment (down payment)',
      placeholder: '575000',
      min: 50000,
      max: 20000000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Commercial mortgage loan amount',
      placeholder: '1725000',
      min: 50000,
      max: 80000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on the commercial loan',
      placeholder: '5.5',
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Length of the commercial mortgage in years',
      placeholder: '25',
      min: 5,
      max: 30
    },
    {
      id: 'annualRent',
      name: 'Annual Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total annual rental income',
      placeholder: '300000',
      min: 10000,
      max: 5000000
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected vacancy rate for commercial property',
      placeholder: '8.0',
      min: 0,
      max: 50,
      default: 8.0
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property tax',
      placeholder: '45000',
      min: 0,
      max: 1000000,
      default: 0
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property insurance',
      placeholder: '18000',
      min: 0,
      max: 500000,
      default: 0
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual utilities (if paid by landlord)',
      placeholder: '24000',
      min: 0,
      max: 500000,
      default: 0
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual maintenance and repairs',
      placeholder: '36000',
      min: 0,
      max: 1000000,
      default: 0
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Property management fee percentage',
      placeholder: '5.0',
      min: 0,
      max: 15,
      default: 5.0
    },
    {
      id: 'hoaFees',
      name: 'HOA/Condo Fees',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual HOA or condo association fees',
      placeholder: '0',
      min: 0,
      max: 200000,
      default: 0
    },
    {
      id: 'otherExpenses',
      name: 'Other Expenses',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Other annual expenses',
      placeholder: '12000',
      min: 0,
      max: 500000,
      default: 0
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      min: -10,
      max: 15,
      default: 3.0
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      default: 2.5
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: false,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Space' },
        { value: 'industrial', label: 'Industrial/Warehouse' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'other', label: 'Other' }
      ],
      default: 'office'
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: false,
      description: 'Property location type',
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' }
      ],
      default: 'urban'
    }
  ],
  
  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly principal and interest payment'
    },
    {
      id: 'effectiveGrossIncome',
      name: 'Effective Gross Income',
      type: 'number',
      unit: 'USD',
      description: 'Annual rental income after vacancy'
    },
    {
      id: 'totalExpenses',
      name: 'Total Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income (NOI)',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net monthly cash flow'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net annual cash flow'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate (NOI / Property Value)'
    },
    {
      id: 'cashOnCashReturn',
      name: 'Cash-on-Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual return on cash investment'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total annual return including appreciation'
    },
    {
      id: 'operatingExpenseRatio',
      name: 'Operating Expense Ratio',
      type: 'number',
      unit: '%',
      description: 'Operating expenses as percentage of effective gross income'
    },
    {
      id: 'debtServiceCoverageRatio',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: '',
      description: 'NOI divided by annual debt service'
    },
    {
      id: 'breakEvenOccupancy',
      name: 'Break-Even Occupancy',
      type: 'number',
      unit: '%',
      description: 'Minimum occupancy rate needed to break even'
    },
    {
      id: 'investmentGrade',
      name: 'Investment Grade',
      type: 'string',
      description: 'Investment quality assessment'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      description: 'Assessment of investment risks'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Investment recommendations and strategies'
    }
  ],
  
  calculate: (inputs: Record<string, any>): Record<string, any> => {
    // Validate inputs
    const validation = validateCommercialRealEstateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }
    
    // Calculate commercial real estate metrics
    const commercialMetrics = calculateCommercialRealEstate(inputs);
    
    // Generate analysis
    const analysis = generateCommercialAnalysis(inputs, commercialMetrics);
    
    return {
      monthlyPayment: commercialMetrics.monthlyPayment,
      effectiveGrossIncome: commercialMetrics.effectiveGrossIncome,
      totalExpenses: commercialMetrics.totalExpenses,
      netOperatingIncome: commercialMetrics.netOperatingIncome,
      monthlyCashFlow: commercialMetrics.monthlyCashFlow,
      annualCashFlow: commercialMetrics.annualCashFlow,
      capRate: commercialMetrics.capRate,
      cashOnCashReturn: commercialMetrics.cashOnCashReturn,
      totalReturn: commercialMetrics.totalReturn,
      operatingExpenseRatio: commercialMetrics.operatingExpenseRatio,
      debtServiceCoverageRatio: commercialMetrics.debtServiceCoverageRatio,
      breakEvenOccupancy: commercialMetrics.breakEvenOccupancy,
      investmentGrade: analysis.investmentGrade,
      riskAssessment: analysis.riskAssessment,
      recommendations: analysis.recommendations
    };
  },
  
  formulas: [
    {
      name: 'Net Operating Income (NOI)',
      formula: 'NOI = Effective Gross Income - Total Operating Expenses',
      description: 'Measures property profitability before financing'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (NOI / Property Value) × 100',
      description: 'Measures unleveraged return on property value'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash = (Annual Cash Flow / Down Payment) × 100',
      description: 'Measures annual return on cash investment'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = NOI / Annual Debt Service',
      description: 'Measures ability to cover debt payments'
    },
    {
      name: 'Operating Expense Ratio',
      formula: 'OER = (Total Operating Expenses / Effective Gross Income) × 100',
      description: 'Measures expense efficiency'
    }
  ],
  
  examples: [
    {
      name: 'Office Building Investment',
      description: 'A typical office building commercial real estate investment',
      inputs: {
        propertyValue: 2500000,
        purchasePrice: 2300000,
        downPayment: 575000,
        loanAmount: 1725000,
        interestRate: 5.5,
        loanTerm: 25,
        annualRent: 300000,
        vacancyRate: 8.0,
        propertyTax: 45000,
        insurance: 18000,
        utilities: 24000,
        maintenance: 36000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 12000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        propertyType: 'office',
        location: 'urban'
      },
      expectedOutputs: {
        monthlyPayment: 10580,
        effectiveGrossIncome: 276000,
        totalExpenses: 135000,
        netOperatingIncome: 141000,
        monthlyCashFlow: 1200,
        annualCashFlow: 14400,
        capRate: 5.6,
        cashOnCashReturn: 2.5,
        totalReturn: 5.5,
        operatingExpenseRatio: 48.9,
        debtServiceCoverageRatio: 1.11,
        breakEvenOccupancy: 89.2
      }
    },
    {
      name: 'Retail Space Investment',
      description: 'A retail commercial property with strong cash flow',
      inputs: {
        propertyValue: 1800000,
        purchasePrice: 1650000,
        downPayment: 412500,
        loanAmount: 1237500,
        interestRate: 5.0,
        loanTerm: 25,
        annualRent: 240000,
        vacancyRate: 5.0,
        propertyTax: 32000,
        insurance: 14000,
        utilities: 18000,
        maintenance: 28000,
        propertyManagement: 4.0,
        hoaFees: 0,
        otherExpenses: 8000,
        appreciationRate: 3.5,
        inflationRate: 2.5,
        propertyType: 'retail',
        location: 'suburban'
      },
      expectedOutputs: {
        monthlyPayment: 7230,
        effectiveGrossIncome: 228000,
        totalExpenses: 100000,
        netOperatingIncome: 128000,
        monthlyCashFlow: 3437,
        annualCashFlow: 41244,
        capRate: 7.1,
        cashOnCashReturn: 10.0,
        totalReturn: 13.5,
        operatingExpenseRatio: 43.9,
        debtServiceCoverageRatio: 1.48,
        breakEvenOccupancy: 76.8
      }
    }
  ]
};
