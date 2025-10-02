import { Calculator, Formula } from '../../types/calculator';
import { calculateTitleInsurance, validateTitleInsuranceInputs } from './formulas';
import { getTitleInsuranceValidationRules } from './validation';

/**
 * Title insurance formula implementation
 */
const titleInsuranceFormula: Formula = {
  id: 'title-insurance',
  name: 'Title Insurance',
  description: 'Calculate title insurance costs and settlement fees',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateTitleInsurance(inputs as any);
    return {
      outputs: result,
      explanation: 'Title insurance cost analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading title insurance calculator with comprehensive features
 */
export const titleInsuranceCalculator: Calculator = {
  id: 'title-insurance-calculator',
  title: 'Title Insurance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive title insurance cost analysis including owner\'s and lender\'s policies, settlement fees, transfer taxes, and closing cost comparisons for purchase and refinance transactions.',

  usageInstructions: [
    'Enter property value and purchase price',
    'Specify title insurance rates for your area',
    'Include settlement fees and transfer taxes',
    'Review total closing costs and cost efficiency analysis'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '350000',
      tooltip: 'Appraised or assessed value of the property',
      defaultValue: 350000
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price',
      type: 'currency',
      required: true,
      placeholder: '350000',
      tooltip: 'Agreed purchase price of the property',
      defaultValue: 350000
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: false,
      placeholder: '280000',
      tooltip: 'Amount being financed (if applicable)',
      defaultValue: 280000
    },
    {
      id: 'ownersTitleInsuranceRate',
      label: 'Owner\'s Title Insurance Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '0.65',
      tooltip: 'Title insurance rate for owner\'s policy (varies by location)',
      defaultValue: 0.65,
      min: 0,
      max: 5,
      step: 0.01
    },
    {
      id: 'lendersTitleInsuranceRate',
      label: 'Lender\'s Title Insurance Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '0.35',
      tooltip: 'Title insurance rate for lender\'s policy (varies by location)',
      defaultValue: 0.35,
      min: 0,
      max: 2,
      step: 0.01
    },
    {
      id: 'titleSearchFee',
      label: 'Title Search Fee',
      type: 'currency',
      required: false,
      placeholder: '800',
      tooltip: 'Fee for title search and abstract',
      defaultValue: 800
    },
    {
      id: 'titleExaminationFee',
      label: 'Title Examination Fee',
      type: 'currency',
      required: false,
      placeholder: '600',
      tooltip: 'Fee for title examination and legal review',
      defaultValue: 600
    },
    {
      id: 'documentPreparationFee',
      label: 'Document Preparation Fee',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Fee for preparing closing documents',
      defaultValue: 400
    },
    {
      id: 'notaryFee',
      label: 'Notary Fee',
      type: 'currency',
      required: false,
      placeholder: '150',
      tooltip: 'Fee for notary services',
      defaultValue: 150
    },
    {
      id: 'recordingFee',
      label: 'Recording Fee',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Fee for recording documents with county',
      defaultValue: 500
    },
    {
      id: 'transferTaxRate',
      label: 'Transfer Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '0.75',
      tooltip: 'Transfer tax rate (varies by state/county)',
      defaultValue: 0.75,
      min: 0,
      max: 5,
      step: 0.01
    },
    {
      id: 'settlementDate',
      label: 'Settlement Date',
      type: 'date',
      required: true,
      tooltip: 'Date of property settlement/closing'
    },
    {
      id: 'isRefinance',
      label: 'Is Refinance',
      type: 'boolean',
      required: false,
      tooltip: 'Whether this is a refinance transaction',
      defaultValue: false
    },
    {
      id: 'isCashPurchase',
      label: 'Is Cash Purchase',
      type: 'boolean',
      required: false,
      tooltip: 'Whether this is a cash purchase (no loan)',
      defaultValue: false
    },
    {
      id: 'includeEndorsements',
      label: 'Include Endorsements',
      type: 'boolean',
      required: false,
      tooltip: 'Include additional title policy endorsements',
      defaultValue: false
    },
    {
      id: 'endorsementCost',
      label: 'Endorsement Cost',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Cost of title policy endorsements',
      defaultValue: 200
    },
    {
      id: 'includeTitleCurative',
      label: 'Include Title Curative',
      type: 'boolean',
      required: false,
      tooltip: 'Include title curative work',
      defaultValue: false
    },
    {
      id: 'curativeCost',
      label: 'Curative Cost',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Cost of title curative work',
      defaultValue: 1000
    }
  ],

  outputs: [
    {
      id: 'ownersTitleInsuranceCost',
      label: 'Owner\'s Title Insurance',
      type: 'currency',
      explanation: 'Cost of owner\'s title insurance policy'
    },
    {
      id: 'lendersTitleInsuranceCost',
      label: 'Lender\'s Title Insurance',
      type: 'currency',
      explanation: 'Cost of lender\'s title insurance policy'
    },
    {
      id: 'totalTitleInsuranceCost',
      label: 'Total Title Insurance',
      type: 'currency',
      explanation: 'Combined cost of all title insurance policies'
    },
    {
      id: 'titleSearchAndExamCost',
      label: 'Title Search & Exam',
      type: 'currency',
      explanation: 'Cost of title search and examination'
    },
    {
      id: 'documentAndRecordingCost',
      label: 'Document & Recording',
      type: 'currency',
      explanation: 'Cost of document preparation and recording'
    },
    {
      id: 'transferTaxCost',
      label: 'Transfer Tax',
      type: 'currency',
      explanation: 'Transfer tax amount'
    },
    {
      id: 'totalSettlementCosts',
      label: 'Total Settlement Costs',
      type: 'currency',
      explanation: 'Total of all settlement and closing costs'
    },
    {
      id: 'costAsPercentageOfPurchase',
      label: 'Cost as % of Purchase',
      type: 'percentage',
      explanation: 'Closing costs as percentage of purchase price'
    },
    {
      id: 'costAsPercentageOfLoan',
      label: 'Cost as % of Loan',
      type: 'percentage',
      explanation: 'Closing costs as percentage of loan amount'
    },
    {
      id: 'costPerThousandOfValue',
      label: 'Cost per $1K of Value',
      type: 'currency',
      explanation: 'Closing costs per thousand dollars of property value'
    },
    {
      id: 'costPerThousandOfLoan',
      label: 'Cost per $1K of Loan',
      type: 'currency',
      explanation: 'Closing costs per thousand dollars of loan amount'
    },
    {
      id: 'estimatedTotalCost',
      label: 'Estimated Total Cost',
      type: 'currency',
      explanation: 'Total estimated closing costs'
    },
    {
      id: 'estimatedMonthlyCost',
      label: 'Estimated Monthly Cost',
      type: 'currency',
      explanation: 'Monthly cost if closing costs are financed'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to break even on refinance costs'
    },
    {
      id: 'costEfficiency',
      label: 'Cost Efficiency',
      type: 'text',
      explanation: 'Assessment of closing cost efficiency'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendations based on cost analysis'
    },
    {
      id: 'alternativesConsidered',
      label: 'Alternatives Considered',
      type: 'text',
      explanation: 'Alternative options and considerations'
    }
  ],

  formulas: [titleInsuranceFormula],

  validationRules: getTitleInsuranceValidationRules(),

  examples: [
    {
      title: 'Standard Purchase with Loan',
      description: 'Typical home purchase with 80% financing',
      inputs: {
        propertyValue: 350000,
        purchasePrice: 350000,
        loanAmount: 280000,
        ownersTitleInsuranceRate: 0.65,
        lendersTitleInsuranceRate: 0.35,
        titleSearchFee: 800,
        titleExaminationFee: 600,
        documentPreparationFee: 400,
        notaryFee: 150,
        recordingFee: 500,
        transferTaxRate: 0.75,
        settlementDate: '2024-06-15',
        isRefinance: false,
        isCashPurchase: false,
        includeEndorsements: false,
        endorsementCost: 200,
        includeTitleCurative: false,
        curativeCost: 1000
      },
      expectedOutputs: {
        ownersTitleInsuranceCost: 2275,
        lendersTitleInsuranceCost: 980,
        totalTitleInsuranceCost: 3255,
        titleSearchAndExamCost: 1400,
        documentAndRecordingCost: 1050,
        transferTaxCost: 2625,
        totalSettlementCosts: 8330,
        costAsPercentageOfPurchase: 2.38,
        costAsPercentageOfLoan: 2.97,
        costPerThousandOfValue: 23.8,
        costPerThousandOfLoan: 29.75,
        estimatedTotalCost: 8330,
        estimatedMonthlyCost: 0,
        breakEvenPeriod: 0,
        costEfficiency: 'Good - Reasonable closing costs',
        recommendation: 'Costs appear reasonable for the transaction type and location',
        alternativesConsidered: 'Standard title insurance and settlement process recommended'
      }
    }
  ]
};