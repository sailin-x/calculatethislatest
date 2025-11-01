import { Calculator } from '../../types/calculator';
import { CrowdfundingInputs, CrowdfundingOutputs } from './types';
import {
  calculateTotalEquityOffered,
  calculatePricePerShare,
  calculateSharesOffered,
  calculateFundingProgress,
  calculateRemainingFundingNeeded,
  calculateAverageInvestmentPerInvestor,
  calculateTotalFees,
  calculateNetProceeds,
  calculatePostMoneyValuation,
  calculateOwnershipDilution,
  calculateBreakEvenInvestors,
  calculateProjectedROI,
  calculateRiskAdjustedReturn,
  calculateSuccessProbability
} from './formulas';
import { validateCrowdfundingInputs, validateCrowdfundingBusinessRules } from './validation';

export const CrowdfundingCalculator: Calculator = {
  id: 'CrowdfundingCalculator',
  title: 'Crowdfunding Calculator',
  category: 'finance',
  subcategory: 'Investment & Crowdfunding',
  description: 'Calculate equity crowdfunding campaign metrics, valuation, dilution, and success probabilities for startup funding campaigns.',
  usageInstructions: [
    'Enter total funding goal and current funding amount',
    'Input valuation and equity percentage offered',
    'Specify minimum and maximum investment amounts',
    'Include all associated fees (platform, legal, marketing)',
    'Select company stage and industry for risk assessment',
    'Review funding progress and success probability'
  ],

  inputs: [
    {
      id: 'totalFundingGoal',
      label: 'Total Funding Goal ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total amount seeking to raise through crowdfunding'
    },
    {
      id: 'minimumInvestment',
      label: 'Minimum Investment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Minimum amount per investor'
    },
    {
      id: 'maximumInvestment',
      label: 'Maximum Investment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Maximum amount per investor (optional)'
    },
    {
      id: 'currentFunding',
      label: 'Current Funding ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount raised so far'
    },
    {
      id: 'numberOfInvestors',
      label: 'Number of Investors',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Current number of investors committed'
    },
    {
      id: 'valuation',
      label: 'Pre-Money Valuation ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Company valuation before this funding round'
    },
    {
      id: 'equityPercentageOffered',
      label: 'Equity Percentage Offered (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Percentage of company equity offered to investors'
    },
    {
      id: 'platformFees',
      label: 'Platform Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Fees charged by crowdfunding platform'
    },
    {
      id: 'legalFees',
      label: 'Legal Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Legal and compliance fees'
    },
    {
      id: 'marketingFees',
      label: 'Marketing Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Marketing and promotion expenses'
    },
    {
      id: 'campaignDuration',
      label: 'Campaign Duration (Days)',
      type: 'number',
      required: true,
      min: 1,
      max: 365,
      tooltip: 'Length of crowdfunding campaign'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'percentage',
      required: false,
      min: -100,
      max: 1000,
      tooltip: 'Expected investor return on investment'
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      tooltip: 'Overall risk assessment of the investment'
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'text',
      required: true,
      tooltip: 'Industry sector of the company'
    },
    {
      id: 'companyStage',
      label: 'Company Stage',
      type: 'select',
      required: true,
      options: [
        { value: 'pre-seed', label: 'Pre-Seed' },
        { value: 'seed', label: 'Seed' },
        { value: 'early-stage', label: 'Early Stage' },
        { value: 'growth', label: 'Growth' }
      ],
      tooltip: 'Development stage of the company'
    },
    {
      id: 'investorAccreditationRequired',
      label: 'Investor Accreditation Required',
      type: 'boolean',
      required: true,
      tooltip: 'Whether investors must be accredited'
    }
  ],

  outputs: [
    {
      id: 'totalEquityOffered',
      label: 'Total Equity Offered (%)',
      type: 'percentage',
      explanation: 'Percentage of company equity being offered'
    },
    {
      id: 'pricePerShare',
      label: 'Price Per Share ($)',
      type: 'currency',
      explanation: 'Calculated price per share based on valuation'
    },
    {
      id: 'sharesOffered',
      label: 'Shares Offered',
      type: 'number',
      explanation: 'Total number of shares available for purchase'
    },
    {
      id: 'fundingProgress',
      label: 'Funding Progress (%)',
      type: 'percentage',
      explanation: 'Percentage of funding goal achieved'
    },
    {
      id: 'remainingFundingNeeded',
      label: 'Remaining Funding Needed ($)',
      type: 'currency',
      explanation: 'Amount still needed to reach funding goal'
    },
    {
      id: 'averageInvestmentPerInvestor',
      label: 'Average Investment Per Investor ($)',
      type: 'currency',
      explanation: 'Mean investment amount across current investors'
    },
    {
      id: 'totalFees',
      label: 'Total Fees ($)',
      type: 'currency',
      explanation: 'Sum of all platform, legal, and marketing fees'
    },
    {
      id: 'netProceeds',
      label: 'Net Proceeds ($)',
      type: 'currency',
      explanation: 'Funding amount after deducting all fees'
    },
    {
      id: 'postMoneyValuation',
      label: 'Post-Money Valuation ($)',
      type: 'currency',
      explanation: 'Company valuation after funding round'
    },
    {
      id: 'ownershipDilution',
      label: 'Ownership Dilution (%)',
      type: 'percentage',
      explanation: 'Percentage ownership given to new investors'
    },
    {
      id: 'breakEvenInvestors',
      label: 'Break-Even Investors',
      type: 'number',
      explanation: 'Number of investors needed to reach funding goal'
    },
    {
      id: 'projectedROI',
      label: 'Projected ROI (%)',
      type: 'percentage',
      explanation: 'Expected return on investment'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return (%)',
      type: 'percentage',
      explanation: 'Return adjusted for risk level'
    },
    {
      id: 'successProbability',
      label: 'Success Probability (%)',
      type: 'percentage',
      explanation: 'Estimated probability of campaign success'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Tech Startup Seed Round',
      description: 'Early-stage technology company seeking $500K with 10% equity offering',
      inputs: {
        totalFundingGoal: 500000,
        minimumInvestment: 1000,
        maximumInvestment: 25000,
        currentFunding: 150000,
        numberOfInvestors: 45,
        valuation: 4000000,
        equityPercentageOffered: 12.5,
        platformFees: 15000,
        legalFees: 25000,
        marketingFees: 30000,
        campaignDuration: 60,
        expectedReturn: 25,
        riskLevel: 'medium',
        industry: 'technology',
        companyStage: 'seed',
        investorAccreditationRequired: false
      },
      expectedOutputs: {
        totalEquityOffered: 12.5,
        pricePerShare: 8,
        sharesOffered: 62500,
        fundingProgress: 30,
        remainingFundingNeeded: 350000,
        averageInvestmentPerInvestor: 3333.33,
        totalFees: 70000,
        netProceeds: 80000,
        postMoneyValuation: 4150000,
        ownershipDilution: 12.5,
        breakEvenInvestors: 150,
        projectedROI: 25,
        riskAdjustedReturn: 25,
        successProbability: 55
      }
    },
    {
      title: 'Healthcare Innovation Campaign',
      description: 'Medical device startup with higher valuation and stricter requirements',
      inputs: {
        totalFundingGoal: 1000000,
        minimumInvestment: 5000,
        maximumInvestment: 100000,
        currentFunding: 750000,
        numberOfInvestors: 85,
        valuation: 15000000,
        equityPercentageOffered: 6.67,
        platformFees: 30000,
        legalFees: 50000,
        marketingFees: 75000,
        campaignDuration: 90,
        expectedReturn: 35,
        riskLevel: 'medium',
        industry: 'healthcare',
        companyStage: 'early-stage',
        investorAccreditationRequired: true
      },
      expectedOutputs: {
        totalEquityOffered: 6.67,
        pricePerShare: 15,
        sharesOffered: 66667,
        fundingProgress: 75,
        remainingFundingNeeded: 250000,
        averageInvestmentPerInvestor: 8823.53,
        totalFees: 155000,
        netProceeds: 595000,
        postMoneyValuation: 15750000,
        ownershipDilution: 6.67,
        breakEvenInvestors: 200,
        projectedROI: 35,
        riskAdjustedReturn: 35,
        successProbability: 75
      }
    }
  ]
};