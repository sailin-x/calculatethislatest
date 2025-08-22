import { Calculator } from '../../../types/calculator';
import { calculateMortgageAPRComparison } from './formulas';
import { generateMortgageAPRComparisonAnalysis } from './formulas';

export const MortgageAPRComparisonCalculator: Calculator = {
  id: 'mortgage-apr-comparison-calculator',
  name: 'Mortgage APR Comparison Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare mortgage offers using APR calculations including all costs, fees, and closing expenses to determine the true cost of borrowing.',
  inputs: {
    loanAmount: {
      type: 'currency',
      value: 300000,
      unit: 'USD',
      description: 'Loan amount',
      placeholder: 'Enter loan amount',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    loanTerm: {
      type: 'number',
      value: 30,
      unit: 'years',
      description: 'Loan term in years',
      placeholder: 'Enter loan term',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    interestRate1: {
      type: 'percentage',
      value: 6.5,
      unit: '%',
      description: 'Interest rate for offer 1',
      placeholder: 'Enter interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    interestRate2: {
      type: 'percentage',
      value: 6.25,
      unit: '%',
      description: 'Interest rate for offer 2',
      placeholder: 'Enter interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    interestRate3: {
      type: 'percentage',
      value: 6.75,
      unit: '%',
      description: 'Interest rate for offer 3',
      placeholder: 'Enter interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    originationFee1: {
      type: 'currency',
      value: 1500,
      unit: 'USD',
      description: 'Origination fee for offer 1',
      placeholder: 'Enter origination fee',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    originationFee2: {
      type: 'currency',
      value: 2000,
      unit: 'USD',
      description: 'Origination fee for offer 2',
      placeholder: 'Enter origination fee',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    originationFee3: {
      type: 'currency',
      value: 1000,
      unit: 'USD',
      description: 'Origination fee for offer 3',
      placeholder: 'Enter origination fee',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    discountPoints1: {
      type: 'number',
      value: 0,
      unit: 'points',
      description: 'Discount points for offer 1',
      placeholder: 'Enter discount points',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    discountPoints2: {
      type: 'number',
      value: 1,
      unit: 'points',
      description: 'Discount points for offer 2',
      placeholder: 'Enter discount points',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    discountPoints3: {
      type: 'number',
      value: 0.5,
      unit: 'points',
      description: 'Discount points for offer 3',
      placeholder: 'Enter discount points',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    appraisalFee1: {
      type: 'currency',
      value: 500,
      unit: 'USD',
      description: 'Appraisal fee for offer 1',
      placeholder: 'Enter appraisal fee',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    appraisalFee2: {
      type: 'currency',
      value: 450,
      unit: 'USD',
      description: 'Appraisal fee for offer 2',
      placeholder: 'Enter appraisal fee',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    appraisalFee3: {
      type: 'currency',
      value: 550,
      unit: 'USD',
      description: 'Appraisal fee for offer 3',
      placeholder: 'Enter appraisal fee',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    titleInsurance1: {
      type: 'currency',
      value: 1200,
      unit: 'USD',
      description: 'Title insurance for offer 1',
      placeholder: 'Enter title insurance cost',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    titleInsurance2: {
      type: 'currency',
      value: 1100,
      unit: 'USD',
      description: 'Title insurance for offer 2',
      placeholder: 'Enter title insurance cost',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    titleInsurance3: {
      type: 'currency',
      value: 1300,
      unit: 'USD',
      description: 'Title insurance for offer 3',
      placeholder: 'Enter title insurance cost',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    escrowFees1: {
      type: 'currency',
      value: 800,
      unit: 'USD',
      description: 'Escrow fees for offer 1',
      placeholder: 'Enter escrow fees',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    escrowFees2: {
      type: 'currency',
      value: 750,
      unit: 'USD',
      description: 'Escrow fees for offer 2',
      placeholder: 'Enter escrow fees',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    escrowFees3: {
      type: 'currency',
      value: 850,
      unit: 'USD',
      description: 'Escrow fees for offer 3',
      placeholder: 'Enter escrow fees',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    creditReportFee1: {
      type: 'currency',
      value: 50,
      unit: 'USD',
      description: 'Credit report fee for offer 1',
      placeholder: 'Enter credit report fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    creditReportFee2: {
      type: 'currency',
      value: 45,
      unit: 'USD',
      description: 'Credit report fee for offer 2',
      placeholder: 'Enter credit report fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    creditReportFee3: {
      type: 'currency',
      value: 55,
      unit: 'USD',
      description: 'Credit report fee for offer 3',
      placeholder: 'Enter credit report fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    processingFee1: {
      type: 'currency',
      value: 300,
      unit: 'USD',
      description: 'Processing fee for offer 1',
      placeholder: 'Enter processing fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    processingFee2: {
      type: 'currency',
      value: 250,
      unit: 'USD',
      description: 'Processing fee for offer 2',
      placeholder: 'Enter processing fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    processingFee3: {
      type: 'currency',
      value: 350,
      unit: 'USD',
      description: 'Processing fee for offer 3',
      placeholder: 'Enter processing fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    underwritingFee1: {
      type: 'currency',
      value: 400,
      unit: 'USD',
      description: 'Underwriting fee for offer 1',
      placeholder: 'Enter underwriting fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    underwritingFee2: {
      type: 'currency',
      value: 350,
      unit: 'USD',
      description: 'Underwriting fee for offer 2',
      placeholder: 'Enter underwriting fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    underwritingFee3: {
      type: 'currency',
      value: 450,
      unit: 'USD',
      description: 'Underwriting fee for offer 3',
      placeholder: 'Enter underwriting fee',
      validation: {
        required: true,
        min: 0,
        max: 5000
      }
    },
    documentPreparationFee1: {
      type: 'currency',
      value: 200,
      unit: 'USD',
      description: 'Document preparation fee for offer 1',
      placeholder: 'Enter document preparation fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    documentPreparationFee2: {
      type: 'currency',
      value: 180,
      unit: 'USD',
      description: 'Document preparation fee for offer 2',
      placeholder: 'Enter document preparation fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    documentPreparationFee3: {
      type: 'currency',
      value: 220,
      unit: 'USD',
      description: 'Document preparation fee for offer 3',
      placeholder: 'Enter document preparation fee',
      validation: {
        required: true,
        min: 0,
        max: 2000
      }
    },
    floodCertificationFee1: {
      type: 'currency',
      value: 20,
      unit: 'USD',
      description: 'Flood certification fee for offer 1',
      placeholder: 'Enter flood certification fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    floodCertificationFee2: {
      type: 'currency',
      value: 18,
      unit: 'USD',
      description: 'Flood certification fee for offer 2',
      placeholder: 'Enter flood certification fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    floodCertificationFee3: {
      type: 'currency',
      value: 22,
      unit: 'USD',
      description: 'Flood certification fee for offer 3',
      placeholder: 'Enter flood certification fee',
      validation: {
        required: true,
        min: 0,
        max: 500
      }
    },
    taxServiceFee1: {
      type: 'currency',
      value: 75,
      unit: 'USD',
      description: 'Tax service fee for offer 1',
      placeholder: 'Enter tax service fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    taxServiceFee2: {
      type: 'currency',
      value: 70,
      unit: 'USD',
      description: 'Tax service fee for offer 2',
      placeholder: 'Enter tax service fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    taxServiceFee3: {
      type: 'currency',
      value: 80,
      unit: 'USD',
      description: 'Tax service fee for offer 3',
      placeholder: 'Enter tax service fee',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    prepaidInterest1: {
      type: 'currency',
      value: 500,
      unit: 'USD',
      description: 'Prepaid interest for offer 1',
      placeholder: 'Enter prepaid interest',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidInterest2: {
      type: 'currency',
      value: 480,
      unit: 'USD',
      description: 'Prepaid interest for offer 2',
      placeholder: 'Enter prepaid interest',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidInterest3: {
      type: 'currency',
      value: 520,
      unit: 'USD',
      description: 'Prepaid interest for offer 3',
      placeholder: 'Enter prepaid interest',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidInsurance1: {
      type: 'currency',
      value: 600,
      unit: 'USD',
      description: 'Prepaid insurance for offer 1',
      placeholder: 'Enter prepaid insurance',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidInsurance2: {
      type: 'currency',
      value: 580,
      unit: 'USD',
      description: 'Prepaid insurance for offer 2',
      placeholder: 'Enter prepaid insurance',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidInsurance3: {
      type: 'currency',
      value: 620,
      unit: 'USD',
      description: 'Prepaid insurance for offer 3',
      placeholder: 'Enter prepaid insurance',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    prepaidTaxes1: {
      type: 'currency',
      value: 1200,
      unit: 'USD',
      description: 'Prepaid taxes for offer 1',
      placeholder: 'Enter prepaid taxes',
      validation: {
        required: true,
        min: 0,
        max: 20000
      }
    },
    prepaidTaxes2: {
      type: 'currency',
      value: 1150,
      unit: 'USD',
      description: 'Prepaid taxes for offer 2',
      placeholder: 'Enter prepaid taxes',
      validation: {
        required: true,
        min: 0,
        max: 20000
      }
    },
    prepaidTaxes3: {
      type: 'currency',
      value: 1250,
      unit: 'USD',
      description: 'Prepaid taxes for offer 3',
      placeholder: 'Enter prepaid taxes',
      validation: {
        required: true,
        min: 0,
        max: 20000
      }
    },
    lenderCredits1: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Lender credits for offer 1',
      placeholder: 'Enter lender credits (negative for costs)',
      validation: {
        required: true,
        min: -50000,
        max: 50000
      }
    },
    lenderCredits2: {
      type: 'currency',
      value: -500,
      unit: 'USD',
      description: 'Lender credits for offer 2',
      placeholder: 'Enter lender credits (negative for costs)',
      validation: {
        required: true,
        min: -50000,
        max: 50000
      }
    },
    lenderCredits3: {
      type: 'currency',
      value: 200,
      unit: 'USD',
      description: 'Lender credits for offer 3',
      placeholder: 'Enter lender credits (negative for costs)',
      validation: {
        required: true,
        min: -50000,
        max: 50000
      }
    }
  },
  outputs: [
    {
      name: 'apr1',
      label: 'APR for Offer 1',
      type: 'percentage',
      unit: '%',
      description: 'Annual Percentage Rate for offer 1'
    },
    {
      name: 'apr2',
      label: 'APR for Offer 2',
      type: 'percentage',
      unit: '%',
      description: 'Annual Percentage Rate for offer 2'
    },
    {
      name: 'apr3',
      label: 'APR for Offer 3',
      type: 'percentage',
      unit: '%',
      description: 'Annual Percentage Rate for offer 3'
    },
    {
      name: 'monthlyPayment1',
      label: 'Monthly Payment - Offer 1',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly payment for offer 1'
    },
    {
      name: 'monthlyPayment2',
      label: 'Monthly Payment - Offer 2',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly payment for offer 2'
    },
    {
      name: 'monthlyPayment3',
      label: 'Monthly Payment - Offer 3',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly payment for offer 3'
    },
    {
      name: 'totalCost1',
      label: 'Total Cost - Offer 1',
      type: 'currency',
      unit: 'USD',
      description: 'Total cost including all fees for offer 1'
    },
    {
      name: 'totalCost2',
      label: 'Total Cost - Offer 2',
      type: 'currency',
      unit: 'USD',
      description: 'Total cost including all fees for offer 2'
    },
    {
      name: 'totalCost3',
      label: 'Total Cost - Offer 3',
      type: 'currency',
      unit: 'USD',
      description: 'Total cost including all fees for offer 3'
    },
    {
      name: 'closingCosts1',
      label: 'Closing Costs - Offer 1',
      type: 'currency',
      unit: 'USD',
      description: 'Total closing costs for offer 1'
    },
    {
      name: 'closingCosts2',
      label: 'Closing Costs - Offer 2',
      type: 'currency',
      unit: 'USD',
      description: 'Total closing costs for offer 2'
    },
    {
      name: 'closingCosts3',
      label: 'Closing Costs - Offer 3',
      type: 'currency',
      unit: 'USD',
      description: 'Total closing costs for offer 3'
    },
    {
      name: 'totalInterest1',
      label: 'Total Interest - Offer 1',
      type: 'currency',
      unit: 'USD',
      description: 'Total interest paid over loan term for offer 1'
    },
    {
      name: 'totalInterest2',
      label: 'Total Interest - Offer 2',
      type: 'currency',
      unit: 'USD',
      description: 'Total interest paid over loan term for offer 2'
    },
    {
      name: 'totalInterest3',
      label: 'Total Interest - Offer 3',
      type: 'currency',
      unit: 'USD',
      description: 'Total interest paid over loan term for offer 3'
    },
    {
      name: 'costComparison',
      label: 'Cost Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of total costs between offers'
    },
    {
      name: 'bestOffer',
      label: 'Best Offer',
      type: 'string',
      unit: '',
      description: 'Recommendation for the best offer based on APR'
    },
    {
      name: 'savingsAnalysis',
      label: 'Savings Analysis',
      type: 'string',
      unit: '',
      description: 'Analysis of potential savings between offers'
    },
    {
      name: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'string',
      unit: '',
      description: 'Break-even analysis for different offers'
    },
    {
      name: 'feeBreakdown1',
      label: 'Fee Breakdown - Offer 1',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of fees for offer 1'
    },
    {
      name: 'feeBreakdown2',
      label: 'Fee Breakdown - Offer 2',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of fees for offer 2'
    },
    {
      name: 'feeBreakdown3',
      label: 'Fee Breakdown - Offer 3',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of fees for offer 3'
    },
    {
      name: 'aprDifference',
      label: 'APR Differences',
      type: 'string',
      unit: '',
      description: 'APR differences between offers'
    },
    {
      name: 'monthlySavings',
      label: 'Monthly Savings',
      type: 'string',
      unit: '',
      description: 'Monthly payment differences between offers'
    },
    {
      name: 'totalSavings',
      label: 'Total Savings',
      type: 'string',
      unit: '',
      description: 'Total cost differences between offers'
    },
    {
      name: 'recommendation',
      label: 'Recommendation',
      type: 'string',
      unit: '',
      description: 'Detailed recommendation with reasoning'
    }
  ],
  calculate: calculateMortgageAPRComparison,
  generateReport: generateMortgageAPRComparisonAnalysis
};
