import { Calculator } from '../../../types/calculator';
import { calculateMortgageClosingCosts, generateMortgageClosingCostAnalysis } from './formulas';
import { validateMortgageClosingCostInputs } from './validation';

export const MortgageClosingCostCalculator: Calculator = {
  id: 'mortgage-closing-cost-calculator',
  name: 'Mortgage Closing Cost Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate comprehensive mortgage closing costs including lender fees, third-party fees, prepaid items, and escrow requirements to understand total upfront costs.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total loan amount', placeholder: '300000', min: 10000, max: 5000000 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Property purchase price or appraised value', placeholder: '375000', min: 10000, max: 10000000 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of mortgage loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM', 'Interest Only', 'Balloon'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Primary Residence', 'Secondary Home', 'Investment Property', 'Condominium', 'Townhouse', 'Manufactured Home', 'Multi-Family', 'Commercial'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'Property state', placeholder: 'Select state', options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'downPaymentPercentage', name: 'Down Payment Percentage', type: 'number', unit: '%', required: false, description: 'Down payment as percentage of property value', placeholder: '20', min: 0, max: 100 },
    { id: 'lenderOriginationFee', name: 'Lender Origination Fee', type: 'number', unit: 'USD', required: false, description: 'Lender origination fee', placeholder: '1000', min: 0, max: 10000 },
    { id: 'lenderPoints', name: 'Lender Points', type: 'number', unit: '%', required: false, description: 'Lender points (percentage of loan amount)', placeholder: '1', min: 0, max: 10 },
    { id: 'applicationFee', name: 'Application Fee', type: 'number', unit: 'USD', required: false, description: 'Loan application fee', placeholder: '500', min: 0, max: 5000 },
    { id: 'processingFee', name: 'Processing Fee', type: 'number', unit: 'USD', required: false, description: 'Loan processing fee', placeholder: '300', min: 0, max: 3000 },
    { id: 'underwritingFee', name: 'Underwriting Fee', type: 'number', unit: 'USD', required: false, description: 'Underwriting fee', placeholder: '400', min: 0, max: 4000 },
    { id: 'appraisalFee', name: 'Appraisal Fee', type: 'number', unit: 'USD', required: false, description: 'Property appraisal fee', placeholder: '400', min: 0, max: 2000 },
    { id: 'creditReportFee', name: 'Credit Report Fee', type: 'number', unit: 'USD', required: false, description: 'Credit report fee', placeholder: '50', min: 0, max: 500 },
    { id: 'floodCertificationFee', name: 'Flood Certification Fee', type: 'number', unit: 'USD', required: false, description: 'Flood certification fee', placeholder: '20', min: 0, max: 200 },
    { id: 'taxServiceFee', name: 'Tax Service Fee', type: 'number', unit: 'USD', required: false, description: 'Tax service fee', placeholder: '75', min: 0, max: 500 },
    { id: 'titleInsuranceOwner', name: 'Title Insurance (Owner)', type: 'number', unit: 'USD', required: false, description: 'Owner title insurance premium', placeholder: '800', min: 0, max: 5000 },
    { id: 'titleInsuranceLender', name: 'Title Insurance (Lender)', type: 'number', unit: 'USD', required: false, description: 'Lender title insurance premium', placeholder: '400', min: 0, max: 3000 },
    { id: 'titleSearchFee', name: 'Title Search Fee', type: 'number', unit: 'USD', required: false, description: 'Title search fee', placeholder: '200', min: 0, max: 1000 },
    { id: 'titleExamFee', name: 'Title Examination Fee', type: 'number', unit: 'USD', required: false, description: 'Title examination fee', placeholder: '150', min: 0, max: 800 },
    { id: 'titleEndorsements', name: 'Title Endorsements', type: 'number', unit: 'USD', required: false, description: 'Title endorsements', placeholder: '100', min: 0, max: 1000 },
    { id: 'attorneyFee', name: 'Attorney Fee', type: 'number', unit: 'USD', required: false, description: 'Attorney or settlement fee', placeholder: '300', min: 0, max: 2000 },
    { id: 'escrowFee', name: 'Escrow Fee', type: 'number', unit: 'USD', required: false, description: 'Escrow or settlement fee', placeholder: '200', min: 0, max: 1500 },
    { id: 'recordingFee', name: 'Recording Fee', type: 'number', unit: 'USD', required: false, description: 'Recording fees', placeholder: '100', min: 0, max: 500 },
    { id: 'transferTax', name: 'Transfer Tax', type: 'number', unit: 'USD', required: false, description: 'Property transfer tax', placeholder: '1500', min: 0, max: 10000 },
    { id: 'surveyFee', name: 'Survey Fee', type: 'number', unit: 'USD', required: false, description: 'Property survey fee', placeholder: '300', min: 0, max: 2000 },
    { id: 'homeInspectionFee', name: 'Home Inspection Fee', type: 'number', unit: 'USD', required: false, description: 'Home inspection fee', placeholder: '400', min: 0, max: 1000 },
    { id: 'pestInspectionFee', name: 'Pest Inspection Fee', type: 'number', unit: 'USD', required: false, description: 'Pest inspection fee', placeholder: '100', min: 0, max: 500 },
    { id: 'homeownersInsuranceAnnual', name: 'Homeowners Insurance (Annual)', type: 'number', unit: 'USD', required: false, description: 'Annual homeowners insurance premium', placeholder: '1200', min: 0, max: 10000 },
    { id: 'propertyTaxAnnual', name: 'Property Tax (Annual)', type: 'number', unit: 'USD', required: false, description: 'Annual property tax', placeholder: '4500', min: 0, max: 50000 },
    { id: 'pmiAnnual', name: 'PMI (Annual)', type: 'number', unit: 'USD', required: false, description: 'Annual private mortgage insurance', placeholder: '1800', min: 0, max: 10000 },
    { id: 'mipAnnual', name: 'MIP (Annual)', type: 'number', unit: 'USD', required: false, description: 'Annual mortgage insurance premium (FHA)', placeholder: '2700', min: 0, max: 15000 },
    { id: 'vaFundingFee', name: 'VA Funding Fee', type: 'number', unit: 'USD', required: false, description: 'VA funding fee', placeholder: '0', min: 0, max: 50000 },
    { id: 'usdaGuaranteeFee', name: 'USDA Guarantee Fee', type: 'number', unit: 'USD', required: false, description: 'USDA guarantee fee', placeholder: '0', min: 0, max: 50000 },
    { id: 'escrowMonths', name: 'Escrow Months', type: 'number', unit: 'months', required: false, description: 'Number of months to escrow', placeholder: '12', min: 0, max: 24 },
    { id: 'rateLockFee', name: 'Rate Lock Fee', type: 'number', unit: 'USD', required: false, description: 'Rate lock fee', placeholder: '0', min: 0, max: 5000 },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalty', type: 'number', unit: 'USD', required: false, description: 'Prepayment penalty', placeholder: '0', min: 0, max: 50000 },
    { id: 'otherFees', name: 'Other Fees', type: 'number', unit: 'USD', required: false, description: 'Other miscellaneous fees', placeholder: '200', min: 0, max: 5000 },
    { id: 'lenderCredits', name: 'Lender Credits', type: 'number', unit: 'USD', required: false, description: 'Lender credits (negative value)', placeholder: '0', min: -10000, max: 0 },
    { id: 'sellerCredits', name: 'Seller Credits', type: 'number', unit: 'USD', required: false, description: 'Seller credits (negative value)', placeholder: '0', min: -50000, max: 0 }
  ],
  outputs: [
    { id: 'totalClosingCosts', name: 'Total Closing Costs', type: 'number', unit: 'USD', description: 'Total closing costs' },
    { id: 'lenderFees', name: 'Lender Fees', type: 'number', unit: 'USD', description: 'Total lender fees' },
    { id: 'thirdPartyFees', name: 'Third-Party Fees', type: 'number', unit: 'USD', description: 'Total third-party fees' },
    { id: 'prepaidItems', name: 'Prepaid Items', type: 'number', unit: 'USD', description: 'Total prepaid items' },
    { id: 'escrowItems', name: 'Escrow Items', type: 'number', unit: 'USD', description: 'Total escrow items' },
    { id: 'governmentFees', name: 'Government Fees', type: 'number', unit: 'USD', description: 'Total government fees' },
    { id: 'insuranceFees', name: 'Insurance Fees', type: 'number', unit: 'USD', description: 'Total insurance fees' },
    { id: 'titleFees', name: 'Title Fees', type: 'number', unit: 'USD', description: 'Total title fees' },
    { id: 'inspectionFees', name: 'Inspection Fees', type: 'number', unit: 'USD', description: 'Total inspection fees' },
    { id: 'closingCostPercentage', name: 'Closing Cost Percentage', type: 'number', unit: '%', description: 'Closing costs as percentage of loan amount' },
    { id: 'closingCostPerSquareFoot', name: 'Closing Cost per Square Foot', type: 'number', unit: 'USD/sqft', description: 'Closing costs per square foot (if property size provided)' },
    { id: 'cashToClose', name: 'Cash to Close', type: 'number', unit: 'USD', description: 'Total cash required to close' },
    { id: 'breakdownByCategory', name: 'Breakdown by Category', type: 'object', description: 'Detailed breakdown of closing costs by category' },
    { id: 'feeComparison', name: 'Fee Comparison', type: 'object', description: 'Comparison with average closing costs' },
    { id: 'costAnalysis', name: 'Cost Analysis', type: 'object', description: 'Analysis of closing cost components' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Recommendations for reducing closing costs' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key closing cost metrics' },
    { id: 'mortgageClosingCostAnalysis', name: 'Mortgage Closing Cost Analysis', type: 'string', description: 'Comprehensive mortgage closing cost analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageClosingCosts(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageClosingCostAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Closing Costs',
      formula: 'Total Closing Costs = Lender Fees + Third-Party Fees + Prepaid Items + Escrow Items + Government Fees + Insurance Fees + Title Fees + Inspection Fees - Credits',
      description: 'Calculates the total closing costs'
    },
    {
      name: 'Lender Fees',
      formula: 'Lender Fees = Origination Fee + Points + Application Fee + Processing Fee + Underwriting Fee + Rate Lock Fee',
      description: 'Calculates total lender fees'
    },
    {
      name: 'Third-Party Fees',
      formula: 'Third-Party Fees = Appraisal Fee + Credit Report Fee + Flood Certification Fee + Tax Service Fee + Attorney Fee + Escrow Fee + Survey Fee + Other Fees',
      description: 'Calculates total third-party fees'
    },
    {
      name: 'Title Fees',
      formula: 'Title Fees = Owner Title Insurance + Lender Title Insurance + Title Search Fee + Title Exam Fee + Title Endorsements',
      description: 'Calculates total title fees'
    },
    {
      name: 'Prepaid Items',
      formula: 'Prepaid Items = Prepaid Interest + Prepaid Insurance + Prepaid Taxes',
      description: 'Calculates total prepaid items'
    },
    {
      name: 'Escrow Items',
      formula: 'Escrow Items = (Annual Insurance + Annual Taxes + Annual PMI/MIP) × (Escrow Months / 12)',
      description: 'Calculates total escrow items'
    },
    {
      name: 'Closing Cost Percentage',
      formula: 'Closing Cost Percentage = (Total Closing Costs / Loan Amount) × 100',
      description: 'Calculates closing costs as percentage of loan amount'
    },
    {
      name: 'Cash to Close',
      formula: 'Cash to Close = Down Payment + Total Closing Costs',
      description: 'Calculates total cash required to close'
    }
  ]
};