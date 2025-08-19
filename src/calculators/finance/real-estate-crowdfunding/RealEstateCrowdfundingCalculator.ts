import { Calculator } from '../../types/Calculator';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateCrowdfundingCalculator: Calculator = {
  id: 'real-estate-crowdfunding',
  title: 'Real Estate Crowdfunding Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate returns and analyze real estate crowdfunding investments, including ROI, cash flow, and risk metrics',
  usageInstructions: 'Enter investment details, property information, and market data to analyze real estate crowdfunding opportunities.',
  inputs: [
    {
      id: 'investmentAmount',
      label: 'Investment Amount',
      type: 'currency',
      required: true,
      min: 1000,
      max: 1000000,
      step: 1000,
      tooltip: 'Total amount invested in the crowdfunding project',
      placeholder: '50000',
      defaultValue: 50000
    },
    {
      id: 'projectType',
      label: 'Project Type',
      type: 'select',
      required: true,
      options: [
        { value: 'equity', label: 'Equity Investment' },
        { value: 'debt', label: 'Debt Investment' },
        { value: 'preferred_equity', label: 'Preferred Equity' },
        { value: 'mezzanine', label: 'Mezzanine Debt' },
        { value: 'reit', label: 'REIT Investment' }
      ],
      tooltip: 'Type of real estate crowdfunding investment',
      defaultValue: 'equity'
    },
    {
      id: 'investmentTerm',
      label: 'Investment Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 20,
      step: 0.5,
      tooltip: 'Expected duration of the investment',
      placeholder: '5',
      defaultValue: 5
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: 5,
      max: 25,
      step: 0.5,
      tooltip: 'Expected annual return on investment',
      placeholder: '12',
      defaultValue: 12
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      tooltip: 'Total value of the underlying property',
      placeholder: '2000000',
      defaultValue: 2000000
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'land', label: 'Land Development' }
      ],
      tooltip: 'Type of property being financed',
      defaultValue: 'residential'
    },
    {
      id: 'location',
      label: 'Location',
      type: 'select',
      required: true,
      options: [
        { value: 'primary_market', label: 'Primary Market' },
        { value: 'secondary_market', label: 'Secondary Market' },
        { value: 'tertiary_market', label: 'Tertiary Market' },
        { value: 'international', label: 'International' }
      ],
      tooltip: 'Market tier of the property location',
      defaultValue: 'primary_market'
    },
    {
      id: 'platformFees',
      label: 'Platform Fees (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Fees charged by the crowdfunding platform',
      placeholder: '2',
      defaultValue: 2
    },
    {
      id: 'managementFees',
      label: 'Management Fees (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      tooltip: 'Annual management fees',
      placeholder: '1',
      defaultValue: 1
    },
    {
      id: 'cashFlowFrequency',
      label: 'Cash Flow Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'annual', label: 'Annual' },
        { value: 'exit_only', label: 'Exit Only' }
      ],
      tooltip: 'How often cash flow distributions occur',
      defaultValue: 'quarterly'
    },
    {
      id: 'exitStrategy',
      label: 'Exit Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'sale', label: 'Property Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'ipo', label: 'IPO' },
        { value: 'merger', label: 'Merger/Acquisition' },
        { value: 'hold', label: 'Long-term Hold' }
      ],
      tooltip: 'Expected exit strategy for the investment',
      defaultValue: 'sale'
    },
    {
      id: 'marketAppreciation',
      label: 'Market Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 15,
      step: 0.5,
      tooltip: 'Expected annual market appreciation',
      placeholder: '3',
      defaultValue: 3
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium_low', label: 'Medium-Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'medium_high', label: 'Medium-High Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Risk assessment of the investment',
      defaultValue: 'medium'
    },
    {
      id: 'liquidity',
      label: 'Liquidity',
      type: 'select',
      required: true,
      options: [
        { value: 'high', label: 'High Liquidity' },
        { value: 'medium', label: 'Medium Liquidity' },
        { value: 'low', label: 'Low Liquidity' },
        { value: 'illiquid', label: 'Illiquid' }
      ],
      tooltip: 'Liquidity level of the investment',
      defaultValue: 'low'
    },
    {
      id: 'taxTreatment',
      label: 'Tax Treatment',
      type: 'select',
      required: false,
      options: [
        { value: 'ordinary_income', label: 'Ordinary Income' },
        { value: 'capital_gains', label: 'Capital Gains' },
        { value: 'qualified_dividend', label: 'Qualified Dividend' },
        { value: 'tax_deferred', label: 'Tax Deferred' },
        { value: 'tax_free', label: 'Tax Free' }
      ],
      tooltip: 'Tax treatment of investment returns',
      defaultValue: 'ordinary_income'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual inflation rate',
      placeholder: '2.5',
      defaultValue: 2.5
    },
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'basic', label: 'Basic ROI Analysis' },
        { value: 'detailed', label: 'Detailed Cash Flow' },
        { value: 'risk_adjusted', label: 'Risk-Adjusted Returns' },
        { value: 'comparison', label: 'Investment Comparison' }
      ],
      tooltip: 'Type of analysis to perform',
      defaultValue: 'detailed'
    }
  ],
  outputs: [
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      format: 'USD',
      explanation: 'Total return over the investment period'
    },
    {
      id: 'totalReturnPercentage',
      label: 'Total Return (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Total return as a percentage of initial investment'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Annualized rate of return'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Net present value of the investment'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Internal rate of return (IRR)'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Annual cash-on-cash return'
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cash flow received during investment period'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      format: 'USD',
      explanation: 'Average monthly cash flow'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Expected value at exit'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return',
      type: 'percentage',
      format: 'percent',
      explanation: 'Risk-adjusted return using Sharpe ratio'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (Years)',
      type: 'number',
      format: 'number',
      explanation: 'Time to recover initial investment'
    },
    {
      id: 'investmentAnalysis',
      label: 'Investment Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Comprehensive analysis of the investment opportunity'
    }
  ],
  formulas: [
    {
      id: 'real-estate-crowdfunding-calculation',
      name: 'Real Estate Crowdfunding Calculation',
      description: 'Calculate returns and analyze real estate crowdfunding investments',
      calculate: calculateRealEstateCrowdfunding
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validateRealEstateCrowdfundingInputs
    }
  ],
  examples: [
    {
      title: 'Residential Equity Investment',
      description: 'Typical residential equity investment in a primary market',
      inputs: {
        investmentAmount: 50000,
        projectType: 'equity',
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential',
        location: 'primary_market',
        platformFees: 2,
        managementFees: 1,
        cashFlowFrequency: 'quarterly',
        exitStrategy: 'sale',
        marketAppreciation: 3,
        riskLevel: 'medium',
        liquidity: 'low',
        taxTreatment: 'capital_gains',
        inflationRate: 2.5,
        calculationType: 'detailed'
      },
      expectedOutputs: {
        totalReturn: 35000,
        totalReturnPercentage: 70,
        annualizedReturn: 11.2,
        netPresentValue: 28750,
        internalRateOfReturn: 11.2,
        cashOnCashReturn: 10.8,
        totalCashFlow: 27000,
        monthlyCashFlow: 450,
        exitValue: 58000,
        riskAdjustedReturn: 8.7,
        paybackPeriod: 4.6,
        investmentAnalysis: '**Investment Analysis:**\n- Strong cash-on-cash return of 10.8%\n- Good risk-adjusted return of 8.7%\n- Primary market location reduces risk\n- 5-year term provides good liquidity timeline'
      }
    },
    {
      title: 'Commercial Debt Investment',
      description: 'Commercial debt investment with monthly cash flow',
      inputs: {
        investmentAmount: 100000,
        projectType: 'debt',
        investmentTerm: 3,
        expectedAnnualReturn: 8,
        propertyValue: 5000000,
        propertyType: 'commercial',
        location: 'secondary_market',
        platformFees: 1.5,
        managementFees: 0.5,
        cashFlowFrequency: 'monthly',
        exitStrategy: 'refinance',
        marketAppreciation: 2,
        riskLevel: 'medium_low',
        liquidity: 'medium',
        taxTreatment: 'ordinary_income',
        inflationRate: 2.5,
        calculationType: 'detailed'
      },
      expectedOutputs: {
        totalReturn: 24000,
        totalReturnPercentage: 24,
        annualizedReturn: 7.4,
        netPresentValue: 21800,
        internalRateOfReturn: 7.4,
        cashOnCashReturn: 7.6,
        totalCashFlow: 22800,
        monthlyCashFlow: 633,
        exitValue: 112000,
        riskAdjustedReturn: 6.9,
        paybackPeriod: 3.2,
        investmentAnalysis: '**Investment Analysis:**\n- Stable monthly cash flow of $633\n- Lower risk debt investment\n- Good for income-focused investors\n- 3-year term provides moderate liquidity'
      }
    },
    {
      title: 'High-Risk Development Project',
      description: 'High-risk land development project with exit-only returns',
      inputs: {
        investmentAmount: 25000,
        projectType: 'equity',
        investmentTerm: 7,
        expectedAnnualReturn: 18,
        propertyValue: 800000,
        propertyType: 'land',
        location: 'tertiary_market',
        platformFees: 3,
        managementFees: 2,
        cashFlowFrequency: 'exit_only',
        exitStrategy: 'sale',
        marketAppreciation: 5,
        riskLevel: 'high',
        liquidity: 'illiquid',
        taxTreatment: 'capital_gains',
        inflationRate: 2.5,
        calculationType: 'risk_adjusted'
      },
      expectedOutputs: {
        totalReturn: 31500,
        totalReturnPercentage: 126,
        annualizedReturn: 12.4,
        netPresentValue: 18500,
        internalRateOfReturn: 12.4,
        cashOnCashReturn: 0,
        totalCashFlow: 0,
        monthlyCashFlow: 0,
        exitValue: 56500,
        riskAdjustedReturn: 7.4,
        paybackPeriod: 7,
        investmentAnalysis: '**Investment Analysis:**\n- High potential return of 126%\n- No cash flow during holding period\n- High risk due to development nature\n- Long-term illiquid investment'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};