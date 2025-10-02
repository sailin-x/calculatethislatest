import { Calculator } from '../../types/calculator';
import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs } from './types';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';

export const RealEstateCrowdfundingCalculator: Calculator = {
  id: 'real-estate-crowdfunding-calculator',
  title: 'Real Estate Crowdfunding Calculator',
  category: 'finance',
  subcategory: 'Real Estate',
  description: 'Analyze real estate crowdfunding investments with comprehensive risk assessment, return projections, and fee analysis. Evaluates cash flow projections, platform fees, tax benefits, and return metrics to help investors make informed decisions.',

  inputs: [
    // Investment Information
    {
      id: 'investmentAmount',
      label: 'Investment Amount ($)',
      type: 'currency',
      required: true,
      min: 100,
      max: 10000000,
      step: 100,
      placeholder: '50000',
      tooltip: 'Amount you plan to invest in this project'
    },
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 100000000,
      step: 1000,
      placeholder: '2000000',
      tooltip: 'Total cost of the entire real estate project'
    },
    {
      id: 'minimumInvestment',
      label: 'Minimum Investment ($)',
      type: 'currency',
      required: true,
      min: 100,
      max: 1000000,
      step: 100,
      placeholder: '1000',
      tooltip: 'Minimum investment amount required'
    },
    {
      id: 'maximumInvestment',
      label: 'Maximum Investment ($)',
      type: 'currency',
      required: true,
      min: 100,
      max: 10000000,
      step: 100,
      placeholder: '100000',
      tooltip: 'Maximum investment amount allowed'
    },
    {
      id: 'numberOfInvestors',
      label: 'Number of Investors',
      type: 'number',
      required: true,
      min: 1,
      max: 10000,
      step: 1,
      placeholder: '50',
      tooltip: 'Total number of investors in this project'
    },
    {
      id: 'investorEquity',
      label: 'Total Investor Equity ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 50000000,
      step: 1000,
      placeholder: '500000',
      tooltip: 'Total equity raised from all investors'
    },

    // Project Information
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 100000000,
      step: 1000,
      placeholder: '2500000',
      tooltip: 'Current market value of the property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'industrial', label: 'Industrial' }
      ],
      placeholder: 'residential',
      tooltip: 'Type of real estate property'
    },
    {
      id: 'propertyLocation',
      label: 'Property Location',
      type: 'select',
      required: true,
      options: [
        { value: 'downtown', label: 'Downtown' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'downtown',
      tooltip: 'Location type of the property'
    },
    {
      id: 'projectStage',
      label: 'Project Stage',
      type: 'select',
      required: true,
      options: [
        { value: 'pre_construction', label: 'Pre-Construction' },
        { value: 'under_construction', label: 'Under Construction' },
        { value: 'stabilized', label: 'Stabilized' },
        { value: 'redevelopment', label: 'Redevelopment' }
      ],
      placeholder: 'pre_construction',
      tooltip: 'Current stage of the project'
    },
    {
      id: 'expectedHoldPeriod',
      label: 'Expected Hold Period (months)',
      type: 'number',
      required: true,
      min: 12,
      max: 120,
      step: 1,
      placeholder: '60',
      tooltip: 'Expected time to hold the investment'
    },
    {
      id: 'expectedExitValue',
      label: 'Expected Exit Value ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 200000000,
      step: 10000,
      placeholder: '3000000',
      tooltip: 'Expected value when exiting the investment'
    },

    // Financial Information
    {
      id: 'annualRentIncome',
      label: 'Annual Rent Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '150000',
      tooltip: 'Annual rental income from the property'
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000000,
      step: 1000,
      placeholder: '45000',
      tooltip: 'Annual operating expenses'
    },
    {
      id: 'managementFees',
      label: 'Management Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '12000',
      tooltip: 'Annual property management fees'
    },
    {
      id: 'maintenanceReserve',
      label: 'Maintenance Reserve ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '8000',
      tooltip: 'Annual maintenance reserve'
    },
    {
      id: 'insuranceCosts',
      label: 'Insurance Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '15000',
      tooltip: 'Annual insurance costs'
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '25000',
      tooltip: 'Annual property taxes'
    },

    // Crowdfunding Platform Fees
    {
      id: 'platformFee',
      label: 'Platform Fee (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '2.5',
      tooltip: 'Platform fee as percentage of investment'
    },
    {
      id: 'transactionFee',
      label: 'Transaction Fee (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '1.0',
      tooltip: 'Transaction fee as percentage'
    },
    {
      id: 'servicingFee',
      label: 'Annual Servicing Fee (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '0.5',
      tooltip: 'Annual servicing fee as percentage'
    },
    {
      id: 'exitFee',
      label: 'Exit Fee (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2.0',
      tooltip: 'Fee charged upon exit as percentage'
    },

    // Financing Information
    {
      id: 'loanToValue',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 90,
      step: 1,
      placeholder: '70',
      tooltip: 'Percentage of project cost financed by debt'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.1,
      placeholder: '6.5',
      tooltip: 'Annual interest rate on the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (months)',
      type: 'number',
      required: true,
      min: 12,
      max: 360,
      step: 12,
      placeholder: '60',
      tooltip: 'Term of the loan in months'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '1.5',
      tooltip: 'Ratio of NOI to annual debt service'
    },

    // Market Information
    {
      id: 'marketRentGrowth',
      label: 'Market Rent Growth (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0',
      tooltip: 'Expected annual market rent growth'
    },
    {
      id: 'propertyAppreciation',
      label: 'Property Appreciation (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 30,
      step: 0.5,
      placeholder: '4.0',
      tooltip: 'Expected annual property appreciation'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      step: 0.1,
      placeholder: '6.0',
      tooltip: 'Capitalization rate for the property'
    },
    {
      id: 'marketCapRate',
      label: 'Market Cap Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      step: 0.1,
      placeholder: '5.5',
      tooltip: 'Market capitalization rate'
    },

    // Risk Factors
    {
      id: 'occupancyRate',
      label: 'Occupancy Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '95',
      tooltip: 'Current occupancy rate of the property'
    },
    {
      id: 'tenantQuality',
      label: 'Tenant Quality',
      type: 'select',
      required: true,
      options: [
        { value: 'A', label: 'A (Excellent)' },
        { value: 'B', label: 'B (Good)' },
        { value: 'C', label: 'C (Fair)' },
        { value: 'D', label: 'D (Poor)' }
      ],
      placeholder: 'B',
      tooltip: 'Quality rating of tenants'
    },
    {
      id: 'locationRisk',
      label: 'Location Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium',
      tooltip: 'Risk level of the property location'
    },
    {
      id: 'marketRisk',
      label: 'Market Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium',
      tooltip: 'Risk level of the local market'
    },
    {
      id: 'regulatoryRisk',
      label: 'Regulatory Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'low',
      tooltip: 'Risk level of regulatory changes'
    },

    // Tax Information
    {
      id: 'depreciationSchedule',
      label: 'Depreciation Schedule (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 50,
      step: 1,
      placeholder: '27.5',
      tooltip: 'Useful life for depreciation purposes'
    },
    {
      id: 'depreciationBonus',
      label: 'Depreciation Bonus (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '0',
      tooltip: 'Bonus depreciation percentage'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '30',
      tooltip: 'Investor tax rate'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10',
      tooltip: 'Period for financial analysis'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.5,
      placeholder: '8',
      tooltip: 'Rate used to discount future cash flows'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 15,
      step: 0.5,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations and display'
    }
  ],

  outputs: [
    { id: 'equityPercentage', label: 'Equity Percentage', type: 'percentage', explanation: 'Your percentage ownership in the project' },
    { id: 'cashOnCashReturn', label: 'Cash-on-Cash Return', type: 'percentage', explanation: 'Annual return on invested capital' },
    { id: 'totalReturn', label: 'Total Return', type: 'percentage', explanation: 'Total return including appreciation' },
    { id: 'IRR', label: 'Internal Rate of Return', type: 'percentage', explanation: 'Internal rate of return on investment' },
    { id: 'riskScore', label: 'Risk Score', type: 'number', explanation: 'Overall risk assessment (0-100)' },
    { id: 'monthlyCashFlow', label: 'Monthly Cash Flow', type: 'currency', explanation: 'Expected monthly cash flow' },
    { id: 'annualCashFlow', label: 'Annual Cash Flow', type: 'currency', explanation: 'Expected annual cash flow' },
    { id: 'netInvestorReturn', label: 'Net Investor Return', type: 'percentage', explanation: 'Return after fees and expenses' },
    { id: 'afterTaxCashFlow', label: 'After-Tax Cash Flow', type: 'currency', explanation: 'Cash flow after taxes' },
    { id: 'paybackPeriod', label: 'Payback Period', type: 'number', explanation: 'Time to recover initial investment' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive investment analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules


  examples: [
    {
      title: 'Residential Apartment Complex',
      description: 'Analysis of a $2M residential apartment complex crowdfunding investment',
      inputs: {
        investmentAmount: 50000,
        totalProjectCost: 2000000,
        minimumInvestment: 1000,
        maximumInvestment: 100000,
        numberOfInvestors: 50,
        investorEquity: 500000,
        propertyValue: 2500000,
        propertyType: 'residential',
        propertyLocation: 'Downtown City, State',
        projectStage: 'pre_construction',
        expectedHoldPeriod: 60,
        expectedExitValue: 3000000,
        annualRentIncome: 150000,
        operatingExpenses: 45000,
        managementFees: 12000,
        maintenanceReserve: 8000,
        insuranceCosts: 15000,
        propertyTaxes: 25000,
        platformFee: 2.5,
        transactionFee: 1.0,
        servicingFee: 0.5,
        exitFee: 2.0,
        loanToValue: 70,
        interestRate: 6.5,
        loanTerm: 60,
        debtServiceCoverage: 1.5,
        marketRentGrowth: 3.0,
        propertyAppreciation: 4.0,
        capRate: 6.0,
        marketCapRate: 5.5,
        occupancyRate: 95,
        tenantQuality: 'B',
        locationRisk: 'medium',
        marketRisk: 'medium',
        regulatoryRisk: 'low',
        depreciationSchedule: 27.5,
        depreciationBonus: 0,
        taxRate: 30,
        analysisPeriod: 10,
        discountRate: 8,
        inflationRate: 2.5,
        currency: 'USD'
      },
      expectedOutputs: {
        equityPercentage: 2.5,
        cashOnCashReturn: 8.5,
        totalReturn: 85.3,
        IRR: 12.4,
        riskScore: 35,
        monthlyCashFlow: 354,
        annualCashFlow: 4250,
        netInvestorReturn: 8.2,
        afterTaxCashFlow: 2975,
        paybackPeriod: 11.8,
        analysis: 'Comprehensive investment analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your investment amount and project details',
    'Specify platform fees and financing terms',
    'Review risk factors and market conditions',
    'Analyze cash flow projections and return metrics',
    'Consider tax implications and diversification benefits'
  ]
};