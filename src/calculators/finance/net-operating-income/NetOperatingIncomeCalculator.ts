import { Calculator } from '../../../types/calculator';

export const netOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income',
  title: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate the Net Operating Income (NOI) for real estate investments by analyzing gross income and operating expenses.',
  usageInstructions: [
    'Enter all sources of rental income including base rent, additional income, and other revenue streams',
    'Input all operating expenses including property management, maintenance, insurance, taxes, and utilities',
    'Exclude mortgage payments, depreciation, and capital expenditures from operating expenses',
    'Review the NOI calculation and key financial metrics',
    'Use the results for property valuation, investment analysis, and loan underwriting'
  ],
  inputs: [
    {
      id: 'baseRent',
      label: 'Base Monthly Rent',
      type: 'currency',
      required: true,
      min: 0,
      step: 100,
      tooltip: 'Monthly base rent from all units',
      placeholder: '5000'
    },
    {
      id: 'additionalIncome',
      label: 'Additional Monthly Income',
      type: 'currency',
      required: false,
      min: 0,
      step: 50,
      defaultValue: 0,
      tooltip: 'Parking fees, laundry, storage, pet fees, etc.',
      placeholder: '200'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.5,
      defaultValue: 5,
      tooltip: 'Expected vacancy rate as percentage of gross income',
      placeholder: '5.0'
    },
    {
      id: 'propertyManagementFee',
      label: 'Property Management Fee',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.25,
      defaultValue: 8,
      tooltip: 'Property management fee as percentage of gross income',
      placeholder: '8.0'
    },
    {
      id: 'maintenanceCosts',
      label: 'Monthly Maintenance Costs',
      type: 'currency',
      required: true,
      min: 0,
      step: 100,
      tooltip: 'Regular maintenance, repairs, and landscaping',
      placeholder: '300'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      tooltip: 'Annual property tax assessment',
      placeholder: '6000'
    },
    {
      id: 'propertyInsurance',
      label: 'Annual Property Insurance',
      type: 'currency',
      required: true,
      min: 0,
      step: 500,
      tooltip: 'Annual property and liability insurance',
      placeholder: '2400'
    },
    {
      id: 'utilities',
      label: 'Monthly Utilities',
      type: 'currency',
      required: false,
      min: 0,
      step: 50,
      defaultValue: 0,
      tooltip: 'Water, sewer, trash, electricity, gas if paid by owner',
      placeholder: '150'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      min: 0,
      step: 25,
      defaultValue: 0,
      tooltip: 'Homeowners association fees if applicable',
      placeholder: '0'
    },
    {
      id: 'legalFees',
      label: 'Monthly Legal Fees',
      type: 'currency',
      required: false,
      min: 0,
      step: 50,
      defaultValue: 0,
      tooltip: 'Ongoing legal expenses for property management',
      placeholder: '0'
    },
    {
      id: 'accountingFees',
      label: 'Monthly Accounting Fees',
      type: 'currency',
      required: false,
      min: 0,
      step: 50,
      defaultValue: 0,
      tooltip: 'Bookkeeping and tax preparation costs',
      placeholder: '100'
    },
    {
      id: 'advertisingCosts',
      label: 'Monthly Advertising Costs',
      type: 'currency',
      required: false,
      min: 0,
      step: 25,
      defaultValue: 0,
      tooltip: 'Marketing and advertising expenses',
      placeholder: '50'
    },
    {
      id: 'otherExpenses',
      label: 'Other Monthly Expenses',
      type: 'currency',
      required: false,
      min: 0,
      step: 50,
      defaultValue: 0,
      tooltip: 'Any other operating expenses not listed above',
      placeholder: '0'
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: false,
      min: 0,
      step: 10000,
      tooltip: 'Current market value for cap rate calculation',
      placeholder: '500000'
    }
  ],
  outputs: [
    {
      id: 'grossIncome',
      label: 'Gross Income',
      type: 'currency',
      explanation: 'Total income before expenses and vacancy'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Gross income minus vacancy losses'
    },
    {
      id: 'totalOperatingExpenses',
      label: 'Total Operating Expenses',
      type: 'currency',
      explanation: 'Sum of all operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income (NOI)',
      type: 'currency',
      explanation: 'Effective gross income minus operating expenses'
    },
    {
      id: 'operatingExpenseRatio',
      label: 'Operating Expense Ratio',
      type: 'percentage',
      explanation: 'Operating expenses as percentage of effective gross income'
    },
    {
      id: 'capRate',
      label: 'Capitalization Rate',
      type: 'percentage',
      explanation: 'NOI divided by property value (if provided)'
    },
    {
      id: 'monthlyNOI',
      label: 'Monthly NOI',
      type: 'currency',
      explanation: 'Net operating income on a monthly basis'
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin',
      type: 'percentage',
      explanation: 'NOI as percentage of effective gross income'
    },
    {
      id: 'expenseBreakdown',
      label: 'Expense Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of operating expenses'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Suggestions for improving NOI and profitability'
    }
  ],
  formulas: [
    {
      id: 'noi-calculation',
      name: 'NOI Calculation',
      description: 'Calculate Net Operating Income and related financial metrics',
      calculate: (inputs: Record<string, any>) => {
        // Extract and validate inputs
        const {
          baseRent = 0,
          additionalIncome = 0,
          vacancyRate = 0,
          propertyManagementFee = 0,
          maintenanceCosts = 0,
          propertyTaxes = 0,
          propertyInsurance = 0,
          utilities = 0,
          hoaFees = 0,
          legalFees = 0,
          accountingFees = 0,
          advertisingCosts = 0,
          otherExpenses = 0,
          propertyValue = 0
        } = inputs;

        // Calculate gross income
        const grossIncome = baseRent + additionalIncome;
        
        // Calculate vacancy loss
        const vacancyLoss = grossIncome * (vacancyRate / 100);
        const effectiveGrossIncome = grossIncome - vacancyLoss;
        
        // Calculate property management fee
        const propertyManagementCost = effectiveGrossIncome * (propertyManagementFee / 100);
        
        // Calculate total operating expenses
        const totalOperatingExpenses = propertyManagementCost + maintenanceCosts + (propertyTaxes / 12) + (propertyInsurance / 12) + utilities + hoaFees + legalFees + accountingFees + advertisingCosts + otherExpenses;
        
        // Calculate NOI
        const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
        const monthlyNOI = netOperatingIncome;
        
        // Calculate financial ratios
        const operatingExpenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
        const profitMargin = effectiveGrossIncome > 0 ? (netOperatingIncome / effectiveGrossIncome) * 100 : 0;
        const capRate = propertyValue > 0 ? (netOperatingIncome * 12 / propertyValue) * 100 : 0;
        
        // Generate expense breakdown
        const expenseBreakdown = generateExpenseBreakdown({
          propertyManagement: propertyManagementCost,
          maintenance: maintenanceCosts,
          propertyTaxes: propertyTaxes / 12,
          propertyInsurance: propertyInsurance / 12,
          utilities,
          hoaFees,
          legalFees,
          accountingFees,
          advertisingCosts,
          otherExpenses
        });
        
        // Generate recommendations
        const recommendations = generateRecommendations(operatingExpenseRatio, profitMargin, vacancyRate, capRate);

        return {
          outputs: {
            grossIncome: Math.round(grossIncome),
            effectiveGrossIncome: Math.round(effectiveGrossIncome),
            totalOperatingExpenses: Math.round(totalOperatingExpenses),
            netOperatingIncome: Math.round(netOperatingIncome),
            operatingExpenseRatio: Math.round(operatingExpenseRatio * 100) / 100,
            capRate: Math.round(capRate * 100) / 100,
            monthlyNOI: Math.round(monthlyNOI),
            profitMargin: Math.round(profitMargin * 100) / 100,
            expenseBreakdown,
            recommendations
          },
          explanation: `Net Operating Income: $${netOperatingIncome.toLocaleString()} per month. Operating expenses represent ${operatingExpenseRatio.toFixed(1)}% of effective gross income, resulting in a ${profitMargin.toFixed(1)}% profit margin.`,
          intermediateSteps: {
            vacancyLoss: Math.round(vacancyLoss),
            propertyManagementCost: Math.round(propertyManagementCost),
            monthlyPropertyTaxes: Math.round(propertyTaxes / 12),
            monthlyPropertyInsurance: Math.round(propertyInsurance / 12)
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'baseRent',
      message: 'Base monthly rent is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'vacancyRate',
      message: 'Vacancy rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'propertyManagementFee',
      message: 'Property management fee is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'maintenanceCosts',
      message: 'Monthly maintenance costs are required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'propertyTaxes',
      message: 'Annual property taxes are required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'propertyInsurance',
      message: 'Annual property insurance is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'range',
      field: 'baseRent',
      message: 'Base rent must be between $100 and $100,000',
      validator: (value: any) => value >= 100 && value <= 100000
    },
    {
      type: 'range',
      field: 'additionalIncome',
      message: 'Additional income must be between $0 and $50,000',
      validator: (value: any) => value >= 0 && value <= 50000
    },
    {
      type: 'range',
      field: 'vacancyRate',
      message: 'Vacancy rate must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      type: 'range',
      field: 'propertyManagementFee',
      message: 'Property management fee must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      type: 'range',
      field: 'maintenanceCosts',
      message: 'Maintenance costs must be between $0 and $50,000',
      validator: (value: any) => value >= 0 && value <= 50000
    },
    {
      type: 'range',
      field: 'propertyTaxes',
      message: 'Property taxes must be between $0 and $500,000',
      validator: (value: any) => value >= 0 && value <= 500000
    },
    {
      type: 'range',
      field: 'propertyInsurance',
      message: 'Property insurance must be between $0 and $100,000',
      validator: (value: any) => value >= 0 && value <= 100000
    },
    {
      type: 'range',
      field: 'utilities',
      message: 'Utilities must be between $0 and $10,000',
      validator: (value: any) => value >= 0 && value <= 10000
    },
    {
      type: 'range',
      field: 'hoaFees',
      message: 'HOA fees must be between $0 and $5,000',
      validator: (value: any) => value >= 0 && value <= 5000
    },
    {
      type: 'range',
      field: 'legalFees',
      message: 'Legal fees must be between $0 and $10,000',
      validator: (value: any) => value >= 0 && value <= 10000
    },
    {
      type: 'range',
      field: 'accountingFees',
      message: 'Accounting fees must be between $0 and $10,000',
      validator: (value: any) => value >= 0 && value <= 10000
    },
    {
      type: 'range',
      field: 'advertisingCosts',
      message: 'Advertising costs must be between $0 and $5,000',
      validator: (value: any) => value >= 0 && value <= 5000
    },
    {
      type: 'range',
      field: 'otherExpenses',
      message: 'Other expenses must be between $0 and $50,000',
      validator: (value: any) => value >= 0 && value <= 50000
    },
    {
      type: 'range',
      field: 'propertyValue',
      message: 'Property value must be between $10,000 and $50,000,000',
      validator: (value: any) => value === 0 || (value >= 10000 && value <= 50000000)
    },
    {
      type: 'business',
      field: 'vacancyRate',
      message: 'Vacancy rate should typically be between 2% and 15% for most markets',
      validator: (value: any) => value >= 2 && value <= 15
    },
    {
      type: 'business',
      field: 'operatingExpenseRatio',
      message: 'Operating expense ratio should typically be between 35% and 65%',
      validator: (value: any, allInputs: Record<string, any>) => {
        const baseRent = allInputs.baseRent || 0;
        const additionalIncome = allInputs.additionalIncome || 0;
        const vacancyRate = allInputs.vacancyRate || 0;
        const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
        
        if (effectiveGrossIncome === 0) return true;
        
        const totalExpenses = calculateTotalExpenses(allInputs);
        const ratio = (totalExpenses / effectiveGrossIncome) * 100;
        return ratio >= 35 && ratio <= 65;
      }
    }
  ],
  examples: [
    {
      title: 'Small Multi-Family Property',
      description: 'A 4-unit apartment building with moderate expenses',
      inputs: {
        baseRent: 6000,
        additionalIncome: 300,
        vacancyRate: 5,
        propertyManagementFee: 8,
        maintenanceCosts: 400,
        propertyTaxes: 7200,
        propertyInsurance: 3000,
        utilities: 200,
        hoaFees: 0,
        legalFees: 0,
        accountingFees: 150,
        advertisingCosts: 75,
        otherExpenses: 0,
        propertyValue: 450000
      },
      expectedOutputs: {
        grossIncome: 6300,
        effectiveGrossIncome: 5985,
        totalOperatingExpenses: 1895,
        netOperatingIncome: 4090,
        operatingExpenseRatio: 31.7,
        capRate: 10.9,
        monthlyNOI: 4090,
        profitMargin: 68.3
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'A small office building with higher operating costs',
      inputs: {
        baseRent: 12000,
        additionalIncome: 800,
        vacancyRate: 8,
        propertyManagementFee: 6,
        maintenanceCosts: 1200,
        propertyTaxes: 15000,
        propertyInsurance: 6000,
        utilities: 800,
        hoaFees: 500,
        legalFees: 200,
        accountingFees: 300,
        advertisingCosts: 150,
        otherExpenses: 100,
        propertyValue: 1200000
      },
      expectedOutputs: {
        grossIncome: 12800,
        effectiveGrossIncome: 11776,
        totalOperatingExpenses: 5850,
        netOperatingIncome: 5926,
        operatingExpenseRatio: 49.7,
        capRate: 5.9,
        monthlyNOI: 5926,
        profitMargin: 50.3
      }
    }
  ]
};

// Helper functions
function generateExpenseBreakdown(expenses: Record<string, number>): string {
  const breakdown = Object.entries(expenses)
    .filter(([_, amount]) => amount > 0)
    .sort(([_, a], [__, b]) => b - a)
    .map(([category, amount]) => `${category}: $${amount.toLocaleString()}`)
    .join(', ');
  
  return breakdown || 'No operating expenses';
}

function generateRecommendations(operatingExpenseRatio: number, profitMargin: number, vacancyRate: number, capRate: number): string {
  const recommendations = [];
  
  if (operatingExpenseRatio > 60) {
    recommendations.push('Consider reducing operating expenses to improve profitability');
  }
  
  if (profitMargin < 40) {
    recommendations.push('Focus on increasing rental rates or reducing costs');
  }
  
  if (vacancyRate > 10) {
    recommendations.push('Implement strategies to reduce vacancy rates');
  }
  
  if (capRate > 0 && capRate < 5) {
    recommendations.push('Property may be overvalued; consider market analysis');
  } else if (capRate > 12) {
    recommendations.push('High cap rate suggests good investment opportunity');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Property is performing well with good financial metrics');
  }
  
  return recommendations.join('. ');
}

function calculateTotalExpenses(inputs: Record<string, any>): number {
  const {
    propertyManagementFee = 0,
    maintenanceCosts = 0,
    propertyTaxes = 0,
    propertyInsurance = 0,
    utilities = 0,
    hoaFees = 0,
    legalFees = 0,
    accountingFees = 0,
    advertisingCosts = 0,
    otherExpenses = 0
  } = inputs;
  
  const baseRent = inputs.baseRent || 0;
  const additionalIncome = inputs.additionalIncome || 0;
  const vacancyRate = inputs.vacancyRate || 0;
  const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
  
  const propertyManagementCost = effectiveGrossIncome * (propertyManagementFee / 100);
  
  return propertyManagementCost + maintenanceCosts + (propertyTaxes / 12) + (propertyInsurance / 12) + utilities + hoaFees + legalFees + accountingFees + advertisingCosts + otherExpenses;
}