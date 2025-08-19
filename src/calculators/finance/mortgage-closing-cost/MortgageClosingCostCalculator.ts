import { Calculator } from '../../../types/calculator';

export const MortgageClosingCostCalculator: Calculator = {
  id: 'mortgage-closing-cost-calculator',
  title: 'Mortgage Closing Cost Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate comprehensive mortgage closing costs including lender fees, third-party fees, prepaid items, and escrow requirements to understand the total cost of obtaining a mortgage.',
  usageInstructions: [
    'Enter your loan amount and property details',
    'Add lender-specific fees and charges',
    'Include third-party service fees',
    'Specify prepaid items and escrow requirements',
    'Review detailed cost breakdown and summary'
  ],
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', required: true, min: 10000, max: 10000000, placeholder: '400000', tooltip: 'Principal loan amount' },
    { id: 'propertyValue', label: 'Property Value', type: 'currency', required: true, min: 10000, max: 10000000, placeholder: '500000', tooltip: 'Property purchase price or appraised value' },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', required: false, min: 0, max: 5000000, placeholder: '100000', tooltip: 'Down payment amount' },
    { id: 'loanType', label: 'Loan Type', type: 'select', required: false, options: [
      { value: 'Conventional', label: 'Conventional' },
      { value: 'FHA', label: 'FHA' },
      { value: 'VA', label: 'VA' },
      { value: 'USDA', label: 'USDA' },
      { value: 'Jumbo', label: 'Jumbo' },
      { value: 'ARM', label: 'ARM' },
      { value: 'Interest-Only', label: 'Interest-Only' },
      { value: 'Balloon', label: 'Balloon' }
    ], placeholder: 'Select loan type', tooltip: 'Type of mortgage loan' },
    { id: 'purchaseType', label: 'Purchase Type', type: 'select', required: false, options: [
      { value: 'Purchase', label: 'Purchase' },
      { value: 'Refinance', label: 'Refinance' },
      { value: 'Cash-Out Refinance', label: 'Cash-Out Refinance' },
      { value: 'Rate and Term Refinance', label: 'Rate and Term Refinance' }
    ], placeholder: 'Select purchase type', tooltip: 'Type of transaction' },
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
    ], placeholder: 'Select state', tooltip: 'Property state for tax calculations' },
    { id: 'propertyType', label: 'Property Type', type: 'select', required: false, options: [
      { value: 'Single Family Home', label: 'Single Family Home' },
      { value: 'Condo', label: 'Condo' },
      { value: 'Townhouse', label: 'Townhouse' },
      { value: 'Multi-Family', label: 'Multi-Family' },
      { value: 'Manufactured Home', label: 'Manufactured Home' },
      { value: 'Land', label: 'Land' }
    ], placeholder: 'Select property type', tooltip: 'Type of property' },
    { id: 'occupancyType', label: 'Occupancy Type', type: 'select', required: false, options: [
      { value: 'Primary Residence', label: 'Primary Residence' },
      { value: 'Secondary Home', label: 'Secondary Home' },
      { value: 'Investment Property', label: 'Investment Property' }
    ], placeholder: 'Select occupancy type', tooltip: 'How the property will be occupied' },
    { id: 'creditScore', label: 'Credit Score', type: 'number', required: false, min: 300, max: 850, placeholder: '750', tooltip: 'Borrower credit score' },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', required: false, min: 0.1, max: 20, placeholder: '6.5', tooltip: 'Annual interest rate' },
    { id: 'loanTerm', label: 'Loan Term', type: 'number', required: false, min: 1, max: 50, placeholder: '30', tooltip: 'Loan term in years' },
    { id: 'points', label: 'Points', type: 'number', required: false, min: 0, max: 10, placeholder: '0', tooltip: 'Discount points purchased' },
    { id: 'originationFee', label: 'Origination Fee', type: 'currency', required: false, min: 0, max: 10000, placeholder: '1000', tooltip: 'Lender origination fee' },
    { id: 'processingFee', label: 'Processing Fee', type: 'currency', required: false, min: 0, max: 5000, placeholder: '500', tooltip: 'Loan processing fee' },
    { id: 'underwritingFee', label: 'Underwriting Fee', type: 'currency', required: false, min: 0, max: 5000, placeholder: '800', tooltip: 'Underwriting fee' },
    { id: 'applicationFee', label: 'Application Fee', type: 'currency', required: false, min: 0, max: 1000, placeholder: '200', tooltip: 'Loan application fee' },
    { id: 'commitmentFee', label: 'Commitment Fee', type: 'currency', required: false, min: 0, max: 2000, placeholder: '300', tooltip: 'Loan commitment fee' },
    { id: 'appraisalFee', label: 'Appraisal Fee', type: 'currency', required: false, min: 0, max: 1000, placeholder: '400', tooltip: 'Property appraisal fee' },
    { id: 'titleInsurance', label: 'Title Insurance', type: 'currency', required: false, min: 0, max: 5000, placeholder: '1200', tooltip: 'Title insurance premium' },
    { id: 'titleSearch', label: 'Title Search', type: 'currency', required: false, min: 0, max: 500, placeholder: '150', tooltip: 'Title search fee' },
    { id: 'recordingFee', label: 'Recording Fee', type: 'currency', required: false, min: 0, max: 500, placeholder: '100', tooltip: 'Deed recording fee' },
    { id: 'creditReport', label: 'Credit Report', type: 'currency', required: false, min: 0, max: 100, placeholder: '50', tooltip: 'Credit report fee' },
    { id: 'floodCert', label: 'Flood Certification', type: 'currency', required: false, min: 0, max: 50, placeholder: '20', tooltip: 'Flood certification fee' },
    { id: 'taxService', label: 'Tax Service', type: 'currency', required: false, min: 0, max: 100, placeholder: '75', tooltip: 'Tax service fee' },
    { id: 'wireFee', label: 'Wire Fee', type: 'currency', required: false, min: 0, max: 50, placeholder: '25', tooltip: 'Wire transfer fee' },
    { id: 'surveyFee', label: 'Survey Fee', type: 'currency', required: false, min: 0, max: 1000, placeholder: '300', tooltip: 'Property survey fee' },
    { id: 'homeInspection', label: 'Home Inspection', type: 'currency', required: false, min: 0, max: 1000, placeholder: '400', tooltip: 'Home inspection fee' },
    { id: 'pestInspection', label: 'Pest Inspection', type: 'currency', required: false, min: 0, max: 200, placeholder: '100', tooltip: 'Pest inspection fee' },
    { id: 'leadPaintInspection', label: 'Lead Paint Inspection', type: 'currency', required: false, min: 0, max: 300, placeholder: '150', tooltip: 'Lead paint inspection fee' },
    { id: 'radonInspection', label: 'Radon Inspection', type: 'currency', required: false, min: 0, max: 200, placeholder: '100', tooltip: 'Radon inspection fee' },
    { id: 'septicInspection', label: 'Septic Inspection', type: 'currency', required: false, min: 0, max: 500, placeholder: '250', tooltip: 'Septic inspection fee' },
    { id: 'wellInspection', label: 'Well Inspection', type: 'currency', required: false, min: 0, max: 300, placeholder: '150', tooltip: 'Well inspection fee' },
    { id: 'attorneyFee', label: 'Attorney Fee', type: 'currency', required: false, min: 0, max: 2000, placeholder: '500', tooltip: 'Attorney or settlement fee' },
    { id: 'notaryFee', label: 'Notary Fee', type: 'currency', required: false, min: 0, max: 200, placeholder: '50', tooltip: 'Notary fee' },
    { id: 'escrowFee', label: 'Escrow Fee', type: 'currency', required: false, min: 0, max: 1000, placeholder: '200', tooltip: 'Escrow or settlement fee' },
    { id: 'courierFee', label: 'Courier Fee', type: 'currency', required: false, min: 0, max: 100, placeholder: '25', tooltip: 'Courier or overnight fee' },
    { id: 'otherFees', label: 'Other Fees', type: 'currency', required: false, min: 0, max: 2000, placeholder: '200', tooltip: 'Other miscellaneous fees' },
    { id: 'propertyTax', label: 'Property Tax', type: 'currency', required: false, min: 0, max: 100000, placeholder: '6000', tooltip: 'Annual property tax' },
    { id: 'homeInsurance', label: 'Home Insurance', type: 'currency', required: false, min: 0, max: 10000, placeholder: '1200', tooltip: 'Annual home insurance premium' },
    { id: 'hoaFees', label: 'HOA Fees', type: 'currency', required: false, min: 0, max: 2000, placeholder: '200', tooltip: 'Monthly HOA fees' },
    { id: 'pmiRate', label: 'PMI Rate', type: 'percentage', required: false, min: 0, max: 5, placeholder: '0.5', tooltip: 'Private mortgage insurance rate' },
    { id: 'prepaidInterest', label: 'Prepaid Interest', type: 'currency', required: false, min: 0, max: 10000, placeholder: '500', tooltip: 'Prepaid interest amount' },
    { id: 'prepaidInsurance', label: 'Prepaid Insurance', type: 'currency', required: false, min: 0, max: 5000, placeholder: '1000', tooltip: 'Prepaid insurance premium' },
    { id: 'prepaidTaxes', label: 'Prepaid Taxes', type: 'currency', required: false, min: 0, max: 20000, placeholder: '2000', tooltip: 'Prepaid property taxes' },
    { id: 'escrowMonths', label: 'Escrow Months', type: 'number', required: false, min: 0, max: 12, placeholder: '2', tooltip: 'Number of months for escrow account' }
  ],
  outputs: [
    { id: 'totalClosingCosts', label: 'Total Closing Costs', type: 'text', explanation: 'Sum of all closing costs' },
    { id: 'lenderFees', label: 'Lender Fees', type: 'text', explanation: 'Total fees charged by the lender' },
    { id: 'thirdPartyFees', label: 'Third-Party Fees', type: 'text', explanation: 'Fees for third-party services' },
    { id: 'prepaidItems', label: 'Prepaid Items', type: 'text', explanation: 'Prepaid expenses and escrow items' },
    { id: 'costBreakdown', label: 'Cost Breakdown', type: 'text', explanation: 'Detailed breakdown of all costs' },
    { id: 'costPercentage', label: 'Cost Percentage', type: 'text', explanation: 'Closing costs as percentage of loan amount' },
    { id: 'cashToClose', label: 'Cash to Close', type: 'text', explanation: 'Total cash required at closing' },
    { id: 'monthlyEscrow', label: 'Monthly Escrow', type: 'text', explanation: 'Monthly escrow payment amount' },
    { id: 'recommendations', label: 'Recommendations', type: 'text', explanation: 'Recommendations for reducing costs' }
  ],
  formulas: [
    {
      id: 'total-closing-costs',
      name: 'Total Closing Costs',
      description: 'Calculates the sum of all closing costs including lender fees, third-party fees, and prepaid items',
      calculate: (inputs: Record<string, any>) => {
        const lenderFees = (inputs.originationFee || 0) + (inputs.processingFee || 0) + (inputs.underwritingFee || 0) + 
                          (inputs.applicationFee || 0) + (inputs.commitmentFee || 0) + (inputs.points || 0) * (inputs.loanAmount || 0) / 100;
        const thirdPartyFees = (inputs.appraisalFee || 0) + (inputs.titleInsurance || 0) + (inputs.titleSearch || 0) + 
                              (inputs.recordingFee || 0) + (inputs.creditReport || 0) + (inputs.floodCert || 0) + 
                              (inputs.taxService || 0) + (inputs.wireFee || 0) + (inputs.surveyFee || 0) + 
                              (inputs.homeInspection || 0) + (inputs.pestInspection || 0) + (inputs.leadPaintInspection || 0) + 
                              (inputs.radonInspection || 0) + (inputs.septicInspection || 0) + (inputs.wellInspection || 0) + 
                              (inputs.attorneyFee || 0) + (inputs.notaryFee || 0) + (inputs.escrowFee || 0) + 
                              (inputs.courierFee || 0) + (inputs.otherFees || 0);
        const prepaidItems = (inputs.prepaidInterest || 0) + (inputs.prepaidInsurance || 0) + (inputs.prepaidTaxes || 0);
        const totalClosingCosts = lenderFees + thirdPartyFees + prepaidItems;
        
        return {
          outputs: { totalClosingCosts: Math.round(totalClosingCosts) },
          explanation: `Total Closing Costs = Lender Fees ($${Math.round(lenderFees)}) + Third-Party Fees ($${Math.round(thirdPartyFees)}) + Prepaid Items ($${Math.round(prepaidItems)}) = $${Math.round(totalClosingCosts)}`
        };
      }
    },
    {
      id: 'cost-percentage',
      name: 'Cost Percentage',
      description: 'Calculates closing costs as a percentage of the loan amount',
      calculate: (inputs: Record<string, any>) => {
        const totalClosingCosts = inputs.totalClosingCosts || 0;
        const loanAmount = inputs.loanAmount || 1;
        const costPercentage = (totalClosingCosts / loanAmount) * 100;
        
        return {
          outputs: { costPercentage: Math.round(costPercentage * 100) / 100 },
          explanation: `Cost Percentage = (${totalClosingCosts} / ${loanAmount}) × 100 = ${Math.round(costPercentage * 100) / 100}%`
        };
      }
    },
    {
      id: 'cash-to-close',
      name: 'Cash to Close',
      description: 'Calculates total cash required at closing including down payment and closing costs',
      calculate: (inputs: Record<string, any>) => {
        const downPayment = inputs.downPayment || 0;
        const totalClosingCosts = inputs.totalClosingCosts || 0;
        const cashToClose = downPayment + totalClosingCosts;
        
        return {
          outputs: { cashToClose: Math.round(cashToClose) },
          explanation: `Cash to Close = Down Payment ($${downPayment}) + Total Closing Costs ($${totalClosingCosts}) = $${Math.round(cashToClose)}`
        };
      }
    }
  ],
  examples: [
    {
      title: 'Conventional Purchase Closing Costs',
      description: 'Calculate closing costs for a conventional mortgage purchase',
      inputs: {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000,
        loanType: 'Conventional',
        purchaseType: 'Purchase',
        state: 'CA',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        interestRate: 6.5,
        loanTerm: 30,
        points: 0,
        originationFee: 1000,
        processingFee: 500,
        underwritingFee: 800,
        applicationFee: 200,
        appraisalFee: 400,
        titleInsurance: 1200,
        titleSearch: 150,
        recordingFee: 100,
        creditReport: 50,
        floodCert: 20,
        taxService: 75,
        wireFee: 25,
        homeInspection: 400,
        pestInspection: 100,
        attorneyFee: 500,
        escrowFee: 200,
        otherFees: 200,
        propertyTax: 6000,
        homeInsurance: 1200,
        prepaidInterest: 500,
        prepaidInsurance: 1000,
        prepaidTaxes: 2000,
        escrowMonths: 2
      },
      expectedOutputs: {
        totalClosingCosts: '$8,425 total closing costs',
        lenderFees: '$2,500 in lender fees',
        thirdPartyFees: '$3,425 in third-party fees',
        prepaidItems: '$3,500 in prepaid items',
        costBreakdown: 'Detailed breakdown of all cost categories',
        costPercentage: '2.11% of loan amount',
        cashToClose: '$111,425 total cash required',
        monthlyEscrow: '$600 monthly escrow payment',
        recommendations: 'Consider negotiating lender fees and shopping for title insurance to reduce costs.'
      }
    },
    {
      title: 'FHA Refinance Closing Costs',
      description: 'Calculate closing costs for an FHA refinance transaction',
      inputs: {
        loanAmount: 350000,
        propertyValue: 450000,
        loanType: 'FHA',
        purchaseType: 'Refinance',
        state: 'TX',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 680,
        interestRate: 6.25,
        loanTerm: 30,
        points: 0,
        originationFee: 1500,
        processingFee: 600,
        underwritingFee: 900,
        applicationFee: 300,
        appraisalFee: 450,
        titleInsurance: 1300,
        titleSearch: 180,
        recordingFee: 120,
        creditReport: 60,
        floodCert: 25,
        taxService: 80,
        wireFee: 30,
        attorneyFee: 600,
        escrowFee: 250,
        otherFees: 250,
        propertyTax: 5400,
        homeInsurance: 1080,
        prepaidInterest: 450,
        prepaidInsurance: 900,
        prepaidTaxes: 1800,
        escrowMonths: 2
      },
      expectedOutputs: {
        totalClosingCosts: '$9,235 total closing costs',
        lenderFees: '$3,300 in lender fees',
        thirdPartyFees: '$4,085 in third-party fees',
        prepaidItems: '$3,150 in prepaid items',
        costBreakdown: 'Detailed breakdown of all cost categories',
        costPercentage: '2.64% of loan amount',
        cashToClose: '$9,235 total cash required (no down payment for refinance)',
        monthlyEscrow: '$540 monthly escrow payment',
        recommendations: 'FHA loans have higher closing costs; consider conventional options if credit score allows.'
      }
    },
    {
      title: 'VA Loan Purchase Closing Costs',
      description: 'Calculate closing costs for a VA loan purchase with limited fees',
      inputs: {
        loanAmount: 300000,
        propertyValue: 375000,
        downPayment: 0,
        loanType: 'VA',
        purchaseType: 'Purchase',
        state: 'FL',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 720,
        interestRate: 6.0,
        loanTerm: 30,
        points: 0,
        originationFee: 500,
        processingFee: 300,
        underwritingFee: 400,
        applicationFee: 100,
        appraisalFee: 400,
        titleInsurance: 1000,
        titleSearch: 120,
        recordingFee: 80,
        creditReport: 45,
        floodCert: 15,
        taxService: 60,
        wireFee: 20,
        homeInspection: 350,
        pestInspection: 80,
        attorneyFee: 400,
        escrowFee: 150,
        otherFees: 150,
        propertyTax: 4500,
        homeInsurance: 900,
        prepaidInterest: 400,
        prepaidInsurance: 900,
        prepaidTaxes: 1500,
        escrowMonths: 2
      },
      expectedOutputs: {
        totalClosingCosts: '$6,420 total closing costs',
        lenderFees: '$1,300 in lender fees',
        thirdPartyFees: '$2,720 in third-party fees',
        prepaidItems: '$2,800 in prepaid items',
        costBreakdown: 'Detailed breakdown of all cost categories',
        costPercentage: '2.14% of loan amount',
        cashToClose: '$6,420 total cash required (no down payment)',
        monthlyEscrow: '$450 monthly escrow payment',
        recommendations: 'VA loans have lower closing costs; consider funding fee if applicable.'
      }
    }
  ],
  validationRules: [
    {
      field: 'loanAmount',
      type: 'required',
      message: 'Loan amount is required',
      validator: (value: any) => value && value > 0
    },
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value && value > 0
    },
    {
      field: 'loanAmount',
      type: 'range',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'propertyValue',
      type: 'range',
      message: 'Property value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    }
  ]
};