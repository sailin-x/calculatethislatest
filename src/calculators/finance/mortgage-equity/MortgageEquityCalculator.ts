import { Calculator } from '../../../types/calculator';

export const MortgageEquityCalculator: Calculator = {
  id: 'mortgage-equity-calculator',
  title: 'Mortgage Equity Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage equity, home equity, and equity percentage to understand your property ownership value and borrowing potential for home equity loans, HELOCs, or refinancing.',
  usageInstructions: [
    'Enter your current property value and mortgage details',
    'Specify your original purchase price and down payment',
    'Include any property improvements or market changes',
    'Review equity calculations and borrowing potential',
    'Analyze equity growth over time and refinancing options'
  ],
  inputs: [
    { id: 'currentPropertyValue', label: 'Current Property Value', type: 'currency', required: true, min: 10000, max: 10000000, placeholder: '500000', tooltip: 'Current market value of your property' },
    { id: 'originalPurchasePrice', label: 'Original Purchase Price', type: 'currency', required: true, min: 10000, max: 10000000, placeholder: '400000', tooltip: 'Original price when you purchased the property' },
    { id: 'originalDownPayment', label: 'Original Down Payment', type: 'currency', required: true, min: 0, max: 5000000, placeholder: '80000', tooltip: 'Down payment made at purchase' },
    { id: 'currentMortgageBalance', label: 'Current Mortgage Balance', type: 'currency', required: true, min: 0, max: 10000000, placeholder: '280000', tooltip: 'Current outstanding mortgage balance' },
    { id: 'purchaseDate', label: 'Purchase Date', type: 'date', required: false, placeholder: '2020-01-15', tooltip: 'Date when you purchased the property' },
    { id: 'propertyImprovements', label: 'Property Improvements', type: 'currency', required: false, min: 0, max: 2000000, placeholder: '25000', tooltip: 'Total cost of improvements made to the property' },
    { id: 'marketAppreciation', label: 'Market Appreciation', type: 'percentage', required: false, min: -50, max: 200, placeholder: '15', tooltip: 'Market appreciation rate since purchase' },
    { id: 'propertyTaxes', label: 'Property Taxes', type: 'currency', required: false, min: 0, max: 100000, placeholder: '6000', tooltip: 'Annual property taxes' },
    { id: 'homeInsurance', label: 'Home Insurance', type: 'currency', required: false, min: 0, max: 10000, placeholder: '1200', tooltip: 'Annual home insurance premium' },
    { id: 'hoaFees', label: 'HOA Fees', type: 'currency', required: false, min: 0, max: 2000, placeholder: '200', tooltip: 'Monthly HOA fees' },
    { id: 'maintenanceCosts', label: 'Maintenance Costs', type: 'currency', required: false, min: 0, max: 50000, placeholder: '3000', tooltip: 'Annual maintenance and repair costs' },
    { id: 'rentalIncome', label: 'Rental Income', type: 'currency', required: false, min: 0, max: 100000, placeholder: '0', tooltip: 'Annual rental income if property is rented' },
    { id: 'occupancyType', label: 'Occupancy Type', type: 'select', required: false, options: [
      { value: 'Primary Residence', label: 'Primary Residence' },
      { value: 'Secondary Home', label: 'Secondary Home' },
      { value: 'Investment Property', label: 'Investment Property' }
    ], placeholder: 'Select occupancy type', tooltip: 'How the property is currently occupied' },
    { id: 'creditScore', label: 'Credit Score', type: 'number', required: false, min: 300, max: 850, placeholder: '750', tooltip: 'Your current credit score' },
    { id: 'debtToIncomeRatio', label: 'Debt-to-Income Ratio', type: 'percentage', required: false, min: 0, max: 100, placeholder: '35', tooltip: 'Your current debt-to-income ratio' },
    { id: 'loanType', label: 'Loan Type', type: 'select', required: false, options: [
      { value: 'Conventional', label: 'Conventional' },
      { value: 'FHA', label: 'FHA' },
      { value: 'VA', label: 'VA' },
      { value: 'USDA', label: 'USDA' },
      { value: 'Jumbo', label: 'Jumbo' },
      { value: 'ARM', label: 'ARM' },
      { value: 'Interest-Only', label: 'Interest-Only' },
      { value: 'Balloon', label: 'Balloon' }
    ], placeholder: 'Select loan type', tooltip: 'Type of current mortgage loan' },
    { id: 'interestRate', label: 'Current Interest Rate', type: 'percentage', required: false, min: 0.1, max: 20, placeholder: '6.5', tooltip: 'Current mortgage interest rate' },
    { id: 'remainingLoanTerm', label: 'Remaining Loan Term', type: 'number', required: false, min: 1, max: 50, placeholder: '25', tooltip: 'Remaining years on mortgage' },
    { id: 'monthlyPayment', label: 'Monthly Payment', type: 'currency', required: false, min: 0, max: 50000, placeholder: '1800', tooltip: 'Current monthly mortgage payment' },
    { id: 'propertyType', label: 'Property Type', type: 'select', required: false, options: [
      { value: 'Single Family Home', label: 'Single Family Home' },
      { value: 'Condo', label: 'Condo' },
      { value: 'Townhouse', label: 'Townhouse' },
      { value: 'Multi-Family', label: 'Multi-Family' },
      { value: 'Manufactured Home', label: 'Manufactured Home' },
      { value: 'Land', label: 'Land' }
    ], placeholder: 'Select property type', tooltip: 'Type of property' },
    { id: 'state', label: 'State', type: 'select', required: false, options: [
      { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
    ], placeholder: 'Select state', tooltip: 'Property state for tax and regulatory considerations' }
  ],
  outputs: [
    { id: 'totalEquity', label: 'Total Equity', type: 'text', explanation: 'Total equity in the property' },
    { id: 'equityPercentage', label: 'Equity Percentage', type: 'text', explanation: 'Equity as percentage of property value' },
    { id: 'borrowableEquity', label: 'Borrowable Equity', type: 'text', explanation: 'Maximum equity available for borrowing' },
    { id: 'equityGrowth', label: 'Equity Growth', type: 'text', explanation: 'Growth in equity since purchase' },
    { id: 'appreciationValue', label: 'Appreciation Value', type: 'text', explanation: 'Value increase from market appreciation' },
    { id: 'loanToValueRatio', label: 'Loan-to-Value Ratio', type: 'text', explanation: 'Current LTV ratio' },
    { id: 'monthlyEquityBuild', label: 'Monthly Equity Build', type: 'text', explanation: 'Monthly equity increase from payments' },
    { id: 'refinancingOptions', label: 'Refinancing Options', type: 'text', explanation: 'Available refinancing options' },
    { id: 'recommendations', label: 'Recommendations', type: 'text', explanation: 'Recommendations for equity utilization' }
  ],
  formulas: [
    {
      id: 'total-equity',
      name: 'Total Equity',
      description: 'Calculates total equity by subtracting current mortgage balance from current property value',
      calculate: (inputs: Record<string, any>) => {
        const currentPropertyValue = inputs.currentPropertyValue || 0;
        const currentMortgageBalance = inputs.currentMortgageBalance || 0;
        const totalEquity = currentPropertyValue - currentMortgageBalance;
        
        return {
          outputs: { totalEquity: Math.round(totalEquity) },
          explanation: `Total Equity = Current Property Value ($${currentPropertyValue.toLocaleString()}) - Current Mortgage Balance ($${currentMortgageBalance.toLocaleString()}) = $${Math.round(totalEquity).toLocaleString()}`
        };
      }
    },
    {
      id: 'equity-percentage',
      name: 'Equity Percentage',
      description: 'Calculates equity as a percentage of current property value',
      calculate: (inputs: Record<string, any>) => {
        const totalEquity = inputs.totalEquity || 0;
        const currentPropertyValue = inputs.currentPropertyValue || 1;
        const equityPercentage = (totalEquity / currentPropertyValue) * 100;
        
        return {
          outputs: { equityPercentage: Math.round(equityPercentage * 100) / 100 },
          explanation: `Equity Percentage = (${totalEquity} / ${currentPropertyValue}) × 100 = ${Math.round(equityPercentage * 100) / 100}%`
        };
      }
    },
    {
      id: 'borrowable-equity',
      name: 'Borrowable Equity',
      description: 'Calculates maximum equity available for borrowing (typically 80-85% of total equity)',
      calculate: (inputs: Record<string, any>) => {
        const totalEquity = inputs.totalEquity || 0;
        const borrowablePercentage = 0.85; // 85% of equity is typically borrowable
        const borrowableEquity = totalEquity * borrowablePercentage;
        
        return {
          outputs: { borrowableEquity: Math.round(borrowableEquity) },
          explanation: `Borrowable Equity = Total Equity ($${totalEquity.toLocaleString()}) × 85% = $${Math.round(borrowableEquity).toLocaleString()}`
        };
      }
    }
  ],
  examples: [
    {
      title: 'Primary Residence Equity Analysis',
      description: 'Calculate equity for a primary residence with market appreciation',
      inputs: {
        currentPropertyValue: 500000,
        originalPurchasePrice: 400000,
        originalDownPayment: 80000,
        currentMortgageBalance: 280000,
        purchaseDate: '2020-01-15',
        propertyImprovements: 25000,
        marketAppreciation: 15,
        propertyTaxes: 6000,
        homeInsurance: 1200,
        hoaFees: 200,
        maintenanceCosts: 3000,
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 35,
        loanType: 'Conventional',
        interestRate: 6.5,
        remainingLoanTerm: 25,
        monthlyPayment: 1800,
        propertyType: 'Single Family Home',
        state: 'CA'
      },
      expectedOutputs: {
        totalEquity: '$220,000 total equity',
        equityPercentage: '44% equity percentage',
        borrowableEquity: '$187,000 borrowable equity',
        equityGrowth: '$140,000 equity growth since purchase',
        appreciationValue: '$100,000 from market appreciation',
        loanToValueRatio: '56% current LTV ratio',
        monthlyEquityBuild: '$1,200 monthly equity increase',
        refinancingOptions: 'Eligible for cash-out refinance and HELOC',
        recommendations: 'Consider HELOC for home improvements or debt consolidation.'
      }
    },
    {
      title: 'Investment Property Equity Analysis',
      description: 'Calculate equity for an investment property with rental income',
      inputs: {
        currentPropertyValue: 450000,
        originalPurchasePrice: 350000,
        originalDownPayment: 70000,
        currentMortgageBalance: 250000,
        purchaseDate: '2018-06-01',
        propertyImprovements: 15000,
        marketAppreciation: 20,
        propertyTaxes: 4500,
        homeInsurance: 900,
        hoaFees: 150,
        maintenanceCosts: 4000,
        rentalIncome: 24000,
        occupancyType: 'Investment Property',
        creditScore: 720,
        debtToIncomeRatio: 40,
        loanType: 'Conventional',
        interestRate: 7.0,
        remainingLoanTerm: 28,
        monthlyPayment: 1600,
        propertyType: 'Single Family Home',
        state: 'TX'
      },
      expectedOutputs: {
        totalEquity: '$200,000 total equity',
        equityPercentage: '44.4% equity percentage',
        borrowableEquity: '$170,000 borrowable equity',
        equityGrowth: '$120,000 equity growth since purchase',
        appreciationValue: '$100,000 from market appreciation',
        loanToValueRatio: '55.6% current LTV ratio',
        monthlyEquityBuild: '$800 monthly equity increase',
        refinancingOptions: 'Eligible for investment property refinancing',
        recommendations: 'Consider refinancing to lower rate or cash-out for additional investments.'
      }
    },
    {
      title: 'New Purchase Equity Analysis',
      description: 'Calculate equity for a recently purchased property',
      inputs: {
        currentPropertyValue: 425000,
        originalPurchasePrice: 425000,
        originalDownPayment: 85000,
        currentMortgageBalance: 340000,
        purchaseDate: '2023-12-01',
        propertyImprovements: 0,
        marketAppreciation: 5,
        propertyTaxes: 5100,
        homeInsurance: 1020,
        hoaFees: 0,
        maintenanceCosts: 2000,
        occupancyType: 'Primary Residence',
        creditScore: 780,
        debtToIncomeRatio: 30,
        loanType: 'Conventional',
        interestRate: 7.5,
        remainingLoanTerm: 30,
        monthlyPayment: 2375,
        propertyType: 'Single Family Home',
        state: 'FL'
      },
      expectedOutputs: {
        totalEquity: '$85,000 total equity',
        equityPercentage: '20% equity percentage',
        borrowableEquity: '$72,250 borrowable equity',
        equityGrowth: '$21,250 equity growth since purchase',
        appreciationValue: '$21,250 from market appreciation',
        loanToValueRatio: '80% current LTV ratio',
        monthlyEquityBuild: '$1,500 monthly equity increase',
        refinancingOptions: 'Limited refinancing options due to high LTV',
        recommendations: 'Focus on building equity through payments before considering refinancing.'
      }
    }
  ],
  validationRules: [
    {
      field: 'currentPropertyValue',
      type: 'required',
      message: 'Current property value is required',
      validator: (value: any) => value && value > 0
    },
    {
      field: 'originalPurchasePrice',
      type: 'required',
      message: 'Original purchase price is required',
      validator: (value: any) => value && value > 0
    },
    {
      field: 'originalDownPayment',
      type: 'required',
      message: 'Original down payment is required',
      validator: (value: any) => value !== undefined && value >= 0
    },
    {
      field: 'currentMortgageBalance',
      type: 'required',
      message: 'Current mortgage balance is required',
      validator: (value: any) => value !== undefined && value >= 0
    },
    {
      field: 'currentPropertyValue',
      type: 'range',
      message: 'Current property value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'originalPurchasePrice',
      type: 'range',
      message: 'Original purchase price must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    }
  ]
};