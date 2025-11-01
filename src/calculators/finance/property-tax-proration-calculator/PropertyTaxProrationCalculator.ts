import { Calculator } from '../../../types/calculator';
import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs } from './types';
import { calculatePropertyTaxProration } from './formulas';
import { validatePropertyTaxProrationInputs, validatePropertyTaxProrationBusinessRules } from './validation';

export const PropertyTaxProrationCalculator: Calculator = {
  id: 'PropertyTaxProrationCalculator',
  title: 'Property Tax Proration Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate property tax proration for real estate transactions, including escrow analysis, settlement adjustments, and state-specific requirements for accurate closing cost calculations.',
  usageInstructions: [
    'Enter transaction details and closing date',
    'Input tax year information and proration method',
    'Specify buyer/seller payment responsibilities',
    'Review proration calculations and settlement adjustments'
  ],

  inputs: [
    {
      id: 'salePrice',
      label: 'Sale Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Property sale price'
    },
    {
      id: 'closingDate',
      label: 'Closing Date',
      type: 'date',
      required: true,
      tooltip: 'Date of property closing'
    },
    {
      id: 'taxYearStart',
      label: 'Tax Year Start Date',
      type: 'date',
      required: true,
      tooltip: 'Start date of the tax year'
    },
    {
      id: 'taxYearEnd',
      label: 'Tax Year End Date',
      type: 'date',
      required: true,
      tooltip: 'End date of the tax year'
    },
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total annual property tax amount'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Property tax rate'
    },
    {
      id: 'assessedValue',
      label: 'Assessed Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property assessed value'
    },
    {
      id: 'prorationMethod',
      label: 'Proration Method',
      type: 'select',
      required: false,
      options: [
        { value: 'Actual Days', label: 'Actual Days' },
        { value: '365-Day', label: '365-Day' },
        { value: '366-Day', label: '366-Day' },
        { value: '30-Day', label: '30-Day' },
        { value: 'Semi-Annual', label: 'Semi-Annual' }
      ],
      defaultValue: 'Actual Days',
      tooltip: 'Method for calculating tax proration'
    },
    {
      id: 'buyerPaysProratedTax',
      label: 'Buyer Pays Prorated Tax',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether buyer is responsible for prorated taxes'
    },
    {
      id: 'sellerCreditsTax',
      label: 'Seller Credits Tax',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether seller provides tax credits'
    },
    {
      id: 'buyerName',
      label: 'Buyer Name',
      type: 'text',
      required: true,
      tooltip: 'Name of the buyer'
    },
    {
      id: 'sellerName',
      label: 'Seller Name',
      type: 'text',
      required: true,
      tooltip: 'Name of the seller'
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text',
      required: true,
      tooltip: 'Property street address'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'Residential', label: 'Residential' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Vacant Land', label: 'Vacant Land' }
      ],
      defaultValue: 'Residential',
      tooltip: 'Type of property'
    },
    {
      id: 'state',
      label: 'State',
      type: 'text',
      required: true,
      tooltip: 'State where property is located'
    },
    {
      id: 'county',
      label: 'County',
      type: 'text',
      required: false,
      tooltip: 'County where property is located'
    },
    {
      id: 'taxDistrict',
      label: 'Tax District',
      type: 'text',
      required: false,
      tooltip: 'Tax district for the property'
    },
    {
      id: 'lastTaxPaymentDate',
      label: 'Last Tax Payment Date',
      type: 'date',
      required: false,
      tooltip: 'Date of last property tax payment'
    },
    {
      id: 'lastTaxPaymentAmount',
      label: 'Last Tax Payment Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Amount of last tax payment'
    },
    {
      id: 'nextTaxPaymentDate',
      label: 'Next Tax Payment Date',
      type: 'date',
      required: false,
      tooltip: 'Date of next property tax payment'
    },
    {
      id: 'nextTaxPaymentAmount',
      label: 'Next Tax Payment Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Amount due for next tax payment'
    },
    {
      id: 'specialAssessments',
      label: 'Special Assessments ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Special assessment amounts'
    },
    {
      id: 'taxOverrides',
      label: 'Tax Overrides ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Tax override amounts'
    },
    {
      id: 'escrowFees',
      label: 'Escrow Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Escrow service fees'
    },
    {
      id: 'titleFees',
      label: 'Title Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Title insurance and search fees'
    },
    {
      id: 'recordingFees',
      label: 'Recording Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Document recording fees'
    },
    {
      id: 'includeEscrowAnalysis',
      label: 'Include Escrow Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include escrow account analysis'
    },
    {
      id: 'includeTitleAnalysis',
      label: 'Include Title Analysis',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether to include title fee analysis'
    },
    {
      id: 'includeSettlementAnalysis',
      label: 'Include Settlement Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include settlement statement analysis'
    },
    {
      id: 'previousYearTax',
      label: 'Previous Year Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property tax amount from previous year'
    },
    {
      id: 'taxIncreasePercentage',
      label: 'Tax Increase Percentage (%)',
      type: 'percentage',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      tooltip: 'Expected percentage increase in property taxes'
    },
    {
      id: 'closingAdjustmentDays',
      label: 'Closing Adjustment Days',
      type: 'number',
      required: false,
      min: 0,
      max: 365,
      tooltip: 'Number of days for closing adjustments'
    },
    {
      id: 'adjustmentPeriodStart',
      label: 'Adjustment Period Start',
      type: 'date',
      required: false,
      tooltip: 'Start date for adjustment period'
    },
    {
      id: 'adjustmentPeriodEnd',
      label: 'Adjustment Period End',
      type: 'date',
      required: false,
      tooltip: 'End date for adjustment period'
    }
  ],

  outputs: [
    {
      id: 'totalDaysInTaxYear',
      label: 'Total Days in Tax Year',
      type: 'number',
      explanation: 'Total number of days in the tax year'
    },
    {
      id: 'daysOwnedBySeller',
      label: 'Days Owned by Seller',
      type: 'number',
      explanation: 'Number of days property owned by seller in tax year'
    },
    {
      id: 'daysOwnedByBuyer',
      label: 'Days Owned by Buyer',
      type: 'number',
      explanation: 'Number of days property owned by buyer in tax year'
    },
    {
      id: 'sellerPortionOfAnnualTax',
      label: 'Seller Portion of Annual Tax ($)',
      type: 'currency',
      explanation: 'Portion of annual tax owed by seller'
    },
    {
      id: 'buyerPortionOfAnnualTax',
      label: 'Buyer Portion of Annual Tax ($)',
      type: 'currency',
      explanation: 'Portion of annual tax owed by buyer'
    },
    {
      id: 'proratedTaxAmount',
      label: 'Prorated Tax Amount ($)',
      type: 'currency',
      explanation: 'Total prorated tax amount for the transaction'
    },
    {
      id: 'sellerOwedToBuyer',
      label: 'Seller Owed to Buyer ($)',
      type: 'currency',
      explanation: 'Amount seller owes buyer for prorated taxes'
    },
    {
      id: 'buyerOwedToSeller',
      label: 'Buyer Owed to Seller ($)',
      type: 'currency',
      explanation: 'Amount buyer owes seller for prorated taxes'
    },
    {
      id: 'netTaxAdjustment',
      label: 'Net Tax Adjustment ($)',
      type: 'currency',
      explanation: 'Net adjustment amount for property taxes'
    },
    {
      id: 'escrowTaxReserve',
      label: 'Escrow Tax Reserve ($)',
      type: 'currency',
      explanation: 'Recommended escrow reserve for property taxes'
    },
    {
      id: 'escrowShortage',
      label: 'Escrow Shortage ($)',
      type: 'currency',
      explanation: 'Shortage in escrow account for taxes'
    },
    {
      id: 'escrowSurplus',
      label: 'Escrow Surplus ($)',
      type: 'currency',
      explanation: 'Surplus in escrow account for taxes'
    },
    {
      id: 'sellerTaxCredit',
      label: 'Seller Tax Credit ($)',
      type: 'currency',
      explanation: 'Tax credit provided by seller'
    },
    {
      id: 'buyerTaxDebit',
      label: 'Buyer Tax Debit ($)',
      type: 'currency',
      explanation: 'Tax debit charged to buyer'
    },
    {
      id: 'adjustmentEntry',
      label: 'Adjustment Entry ($)',
      type: 'currency',
      explanation: 'Settlement statement adjustment entry'
    },
    {
      id: 'taxYearProgress',
      label: 'Tax Year Progress (%)',
      type: 'percentage',
      explanation: 'Percentage of tax year completed'
    },
    {
      id: 'remainingTaxYearDays',
      label: 'Remaining Tax Year Days',
      type: 'number',
      explanation: 'Days remaining in tax year'
    },
    {
      id: 'taxPeriodStatus',
      label: 'Tax Period Status',
      type: 'text',
      explanation: 'Status of current tax period'
    },
    {
      id: 'vsStandardProration',
      label: 'vs Standard Proration ($)',
      type: 'currency',
      explanation: 'Difference from standard 365-day proration'
    },
    {
      id: 'prorationEfficiency',
      label: 'Proration Efficiency (%)',
      type: 'percentage',
      explanation: 'Efficiency of proration method used'
    },
    {
      id: 'taxSavingsFromMethod',
      label: 'Tax Savings from Method ($)',
      type: 'currency',
      explanation: 'Tax savings from chosen proration method'
    },
    {
      id: 'stateProrationRules',
      label: 'State Proration Rules',
      type: 'text',
      explanation: 'State-specific proration requirements'
    },
    {
      id: 'localTaxRequirements',
      label: 'Local Tax Requirements',
      type: 'text',
      explanation: 'Local tax authority requirements'
    },
    {
      id: 'complianceStatus',
      label: 'Compliance Status',
      type: 'text',
      explanation: 'Compliance status with tax regulations'
    },
    {
      id: 'baseTaxAmount',
      label: 'Base Tax Amount ($)',
      type: 'currency',
      explanation: 'Base property tax amount'
    },
    {
      id: 'specialAssessmentAmount',
      label: 'Special Assessment Amount ($)',
      type: 'currency',
      explanation: 'Special assessment tax amount'
    },
    {
      id: 'overrideAmount',
      label: 'Override Amount ($)',
      type: 'currency',
      explanation: 'Tax override amount'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability ($)',
      type: 'currency',
      explanation: 'Total tax liability for the property'
    },
    {
      id: 'totalPaidThisYear',
      label: 'Total Paid This Year ($)',
      type: 'currency',
      explanation: 'Total property taxes paid this year'
    },
    {
      id: 'remainingBalance',
      label: 'Remaining Balance ($)',
      type: 'currency',
      explanation: 'Remaining tax balance'
    },
    {
      id: 'nextPaymentDate',
      label: 'Next Payment Date',
      type: 'text',
      explanation: 'Date of next tax payment'
    },
    {
      id: 'nextPaymentAmount',
      label: 'Next Payment Amount ($)',
      type: 'currency',
      explanation: 'Amount due for next tax payment'
    },
    {
      id: 'potentialAnnualSavings',
      label: 'Potential Annual Savings ($)',
      type: 'currency',
      explanation: 'Potential annual tax savings'
    },
    {
      id: 'potentialMonthlySavings',
      label: 'Potential Monthly Savings ($)',
      type: 'currency',
      explanation: 'Potential monthly tax savings'
    },
    {
      id: 'breakEvenPeriodMonths',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to break even on tax adjustments'
    },
    {
      id: 'taxProrationEfficiency',
      label: 'Tax Proration Efficiency (%)',
      type: 'percentage',
      explanation: 'Overall efficiency of tax proration'
    },
    {
      id: 'optimalClosingDate',
      label: 'Optimal Closing Date',
      type: 'text',
      explanation: 'Optimal date for closing to minimize taxes'
    },
    {
      id: 'taxSavingsOpportunities',
      label: 'Tax Savings Opportunities',
      type: 'text',
      explanation: 'Opportunities to save on property taxes'
    },
    {
      id: 'prorationAgreementRequired',
      label: 'Proration Agreement Required',
      type: 'text',
      explanation: 'Whether proration agreement is required'
    },
    {
      id: 'contractLanguage',
      label: 'Contract Language',
      type: 'text',
      explanation: 'Recommended contract language for proration'
    },
    {
      id: 'disputeResolutionOptions',
      label: 'Dispute Resolution Options',
      type: 'text',
      explanation: 'Options for resolving tax proration disputes'
    },
    {
      id: 'impactOnClosingCosts',
      label: 'Impact on Closing Costs ($)',
      type: 'currency',
      explanation: 'Impact of proration on total closing costs'
    },
    {
      id: 'impactOnCashToClose',
      label: 'Impact on Cash to Close ($)',
      type: 'currency',
      explanation: 'Impact on cash required at closing'
    },
    {
      id: 'taxAdjustedSalePrice',
      label: 'Tax-Adjusted Sale Price ($)',
      type: 'currency',
      explanation: 'Sale price adjusted for tax proration'
    },
    {
      id: 'projectedTaxForNextYear',
      label: 'Projected Tax for Next Year ($)',
      type: 'currency',
      explanation: 'Projected property tax for next year'
    },
    {
      id: 'projectedProrationChange',
      label: 'Projected Proration Change ($)',
      type: 'currency',
      explanation: 'Projected change in proration amount'
    },
    {
      id: 'futureTaxLiability',
      label: 'Future Tax Liability ($)',
      type: 'currency',
      explanation: 'Future tax liability for the property'
    },
    {
      id: 'prorationRiskLevel',
      label: 'Proration Risk Level',
      type: 'text',
      explanation: 'Risk level associated with proration'
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'text',
      explanation: 'Factors that could affect proration'
    },
    {
      id: 'recommendedActions',
      label: 'Recommended Actions',
      type: 'text',
      explanation: 'Recommended actions to take'
    },
    {
      id: 'prorationFacts',
      label: 'Proration Facts',
      type: 'text',
      explanation: 'Important facts about tax proration'
    },
    {
      id: 'stateSpecificTips',
      label: 'State-Specific Tips',
      type: 'text',
      explanation: 'Tips specific to the property state'
    },
    {
      id: 'negotiationTips',
      label: 'Negotiation Tips',
      type: 'text',
      explanation: 'Tips for negotiating tax proration'
    },
    {
      id: 'calculationMethodUsed',
      label: 'Calculation Method Used',
      type: 'text',
      explanation: 'Proration calculation method used'
    },
    {
      id: 'assumptionsMade',
      label: 'Assumptions Made',
      type: 'text',
      explanation: 'Assumptions made in calculations'
    },
    {
      id: 'dataSources',
      label: 'Data Sources',
      type: 'text',
      explanation: 'Sources of data used in calculations'
    },
    {
      id: 'localProrationAverages',
      label: 'Local Proration Averages ($)',
      type: 'currency',
      explanation: 'Average proration amounts in local area'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'text',
      explanation: 'Comparison to market proration amounts'
    },
    {
      id: 'competitiveAnalysis',
      label: 'Competitive Analysis',
      type: 'text',
      explanation: 'Analysis of competitive proration terms'
    },
    {
      id: 'taxAuthorityContact',
      label: 'Tax Authority Contact',
      type: 'text',
      explanation: 'Contact information for tax authority'
    },
    {
      id: 'paymentMethods',
      label: 'Payment Methods',
      type: 'text',
      explanation: 'Available tax payment methods'
    },
    {
      id: 'onlinePaymentAvailable',
      label: 'Online Payment Available',
      type: 'text',
      explanation: 'Whether online tax payments are available'
    },
    {
      id: 'reportingRequirements',
      label: 'Reporting Requirements',
      type: 'text',
      explanation: 'Tax reporting requirements'
    },
    {
      id: 'documentationNeeded',
      label: 'Documentation Needed',
      type: 'text',
      explanation: 'Required documentation for tax proration'
    },
    {
      id: 'recordRetentionPeriod',
      label: 'Record Retention Period (Years)',
      type: 'number',
      explanation: 'Years to retain tax proration records'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard Residential Property Proration',
      description: 'Property tax proration for a typical residential real estate transaction',
      inputs: {
        salePrice: 350000,
        closingDate: '2024-03-15',
        taxYearStart: '2024-01-01',
        taxYearEnd: '2024-12-31',
        annualPropertyTax: 4200,
        prorationMethod: 'Actual Days',
        buyerPaysProratedTax: true,
        buyerName: 'John Buyer',
        sellerName: 'Jane Seller',
        propertyAddress: '123 Main Street',
        state: 'CA',
        previousYearTax: 4000,
        taxIncreasePercentage: 5
      },
      expectedOutputs: {
        totalDaysInTaxYear: 366,
        daysOwnedBySeller: 74,
        daysOwnedByBuyer: 292,
        proratedTaxAmount: 4200,
        netTaxAdjustment: 850,
        recommendedActions: 'Include proration in settlement statement'
      }
    },
    {
      title: 'Commercial Property Tax Proration',
      description: 'Tax proration calculation for commercial property with special assessments',
      inputs: {
        salePrice: 750000,
        closingDate: '2024-06-30',
        taxYearStart: '2024-01-01',
        taxYearEnd: '2024-12-31',
        annualPropertyTax: 15000,
        prorationMethod: 'Semi-Annual',
        buyerPaysProratedTax: false,
        buyerName: 'ABC Corp',
        sellerName: 'XYZ Properties',
        propertyAddress: '456 Business Ave',
        propertyType: 'Commercial',
        state: 'TX',
        specialAssessments: 2500,
        previousYearTax: 14000,
        taxIncreasePercentage: 7
      },
      expectedOutputs: {
        totalDaysInTaxYear: 366,
        daysOwnedBySeller: 182,
        daysOwnedByBuyer: 184,
        proratedTaxAmount: 17250,
        netTaxAdjustment: -125,
        stateProrationRules: 'Texas allows seller to choose proration method'
      }
    }
  ]
};