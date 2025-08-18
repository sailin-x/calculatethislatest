import { Calculator } from '../../../types/calculator';
import { calculateMortgageAPRComparison, generateMortgageAPRComparisonAnalysis } from './formulas';
import { validateMortgageAPRComparisonInputs } from './validation';

export const MortgageAPRComparisonCalculator: Calculator = {
  id: 'mortgage-apr-comparison-calculator',
  name: 'Mortgage APR Comparison Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare Annual Percentage Rates (APR) across different mortgage offers to find the true cost of borrowing, including interest rates, fees, and closing costs.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Principal loan amount', placeholder: '400000', min: 10000, max: 10000000 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'offers', name: 'Mortgage Offers', type: 'array', required: true, description: 'Array of mortgage offers to compare', placeholder: 'Enter mortgage offers' },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: false, description: 'Property purchase price or value', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '100000', min: 0, max: 5000000 },
    { id: 'propertyTax', name: 'Property Tax', type: 'number', unit: 'USD/year', required: false, description: 'Annual property tax', placeholder: '6000', min: 0, max: 100000 },
    { id: 'homeInsurance', name: 'Home Insurance', type: 'number', unit: 'USD/year', required: false, description: 'Annual home insurance premium', placeholder: '1200', min: 0, max: 10000 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%', required: false, description: 'Private mortgage insurance rate', placeholder: '0.5', min: 0, max: 5 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '200', min: 0, max: 2000 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of mortgage loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM', 'Interest-Only', 'Balloon'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property will be occupied', placeholder: 'Select occupancy type', options: ['Primary Residence', 'Secondary Home', 'Investment Property'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Borrower debt-to-income ratio', placeholder: '36', min: 0, max: 100 },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'Property state for tax calculations', placeholder: 'Select state', options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Single Family Home', 'Condo', 'Townhouse', 'Multi-Family', 'Manufactured Home', 'Land'] },
    { id: 'purchaseType', name: 'Purchase Type', type: 'select', required: false, description: 'Type of purchase transaction', placeholder: 'Select purchase type', options: ['Purchase', 'Refinance', 'Cash-Out Refinance', 'Rate and Term Refinance'] },
    { id: 'lenderFees', name: 'Lender Fees', type: 'number', unit: 'USD', required: false, description: 'Additional lender-specific fees', placeholder: '500', min: 0, max: 10000 },
    { id: 'thirdPartyFees', name: 'Third-Party Fees', type: 'number', unit: 'USD', required: false, description: 'Third-party fees (appraisal, title, etc.)', placeholder: '1500', min: 0, max: 10000 },
    { id: 'prepaidItems', name: 'Prepaid Items', type: 'number', unit: 'USD', required: false, description: 'Prepaid items (escrow, insurance, etc.)', placeholder: '2000', min: 0, max: 20000 },
    { id: 'comparisonPeriod', name: 'Comparison Period', type: 'number', unit: 'years', required: false, description: 'Period for APR comparison', placeholder: '30', min: 1, max: 50 }
  ],
  outputs: [
    { id: 'aprComparison', name: 'APR Comparison', type: 'object', description: 'Detailed APR comparison across all offers' },
    { id: 'bestOffer', name: 'Best Offer', type: 'object', description: 'Offer with the lowest APR' },
    { id: 'monthlyPaymentComparison', name: 'Monthly Payment Comparison', type: 'object', description: 'Monthly payment comparison across offers' },
    { id: 'totalCostComparison', name: 'Total Cost Comparison', type: 'object', description: 'Total cost comparison over loan term' },
    { id: 'breakEvenAnalysis', name: 'Break-Even Analysis', type: 'object', description: 'Break-even analysis for refinancing scenarios' },
    { id: 'savingsAnalysis', name: 'Savings Analysis', type: 'object', description: 'Potential savings analysis' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Recommendations based on comparison' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key comparison metrics' },
    { id: 'aprAnalysis', name: 'APR Analysis', type: 'string', description: 'Comprehensive APR comparison analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageAPRComparison(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageAPRComparisonAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'APR Calculation',
      formula: 'APR = ((Total Finance Charge / Loan Amount) / Loan Term) × 100',
      description: 'Calculates the Annual Percentage Rate including all costs'
    },
    {
      name: 'Total Finance Charge',
      formula: 'Total Finance Charge = Total Payments - Loan Amount',
      description: 'Calculates total cost of borrowing over loan term'
    },
    {
      name: 'Monthly Payment',
      formula: 'Monthly Payment = P × (r(1+r)^n) / ((1+r)^n - 1)',
      description: 'Calculates monthly mortgage payment using amortization formula'
    },
    {
      name: 'Total Payments',
      formula: 'Total Payments = Monthly Payment × Number of Payments',
      description: 'Calculates total payments over loan term'
    },
    {
      name: 'Break-Even Point',
      formula: 'Break-Even = Closing Costs / Monthly Savings',
      description: 'Calculates months to break even on refinancing'
    }
  ],
  examples: [
    {
      name: 'Conventional vs FHA Comparison',
      inputs: {
        loanAmount: 400000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Bank A',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: 'Bank B',
            interestRate: 6.25,
            points: 1,
            originationFee: 1500,
            processingFee: 600,
            underwritingFee: 900,
            appraisalFee: 450,
            titleInsurance: 1300,
            recordingFee: 120,
            creditReport: 60,
            floodCert: 25,
            taxService: 80,
            wireFee: 30,
            otherFees: 250
          }
        ],
        propertyValue: 500000,
        downPayment: 100000,
        propertyTax: 6000,
        homeInsurance: 1200,
        pmiRate: 0.5,
        hoaFees: 200,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 36,
        state: 'CA',
        propertyType: 'Single Family Home',
        purchaseType: 'Purchase',
        lenderFees: 500,
        thirdPartyFees: 1500,
        prepaidItems: 2000,
        comparisonPeriod: 30
      },
      outputs: {
        aprComparison: {
          offers: [
            { lender: 'Bank A', apr: 6.72, monthlyPayment: 2528, totalCost: 910080 },
            { lender: 'Bank B', apr: 6.58, monthlyPayment: 2463, totalCost: 886680 }
          ]
        },
        bestOffer: {
          lender: 'Bank B',
          apr: 6.58,
          monthlyPayment: 2463,
          totalCost: 886680,
          savings: 23400
        },
        monthlyPaymentComparison: {
          difference: 65,
          percentageSavings: 2.57
        },
        totalCostComparison: {
          difference: 23400,
          percentageSavings: 2.57
        },
        breakEvenAnalysis: {
          breakEvenMonths: 0,
          recommendation: 'Bank B offers better terms immediately'
        },
        savingsAnalysis: {
          monthlySavings: 65,
          annualSavings: 780,
          totalSavings: 23400
        },
        recommendations: 'Bank B offers the best overall value with lower APR and total cost.',
        keyMetrics: {
          bestAPR: 6.58,
          monthlySavings: 65,
          totalSavings: 23400,
          breakEvenMonths: 0
        },
        aprAnalysis: 'Bank B offers the most favorable terms with a 6.58% APR compared to Bank A\'s 6.72% APR. This results in $65 monthly savings and $23,400 total savings over the 30-year term. The lower interest rate more than offsets the higher closing costs, making Bank B the clear choice.'
      }
    },
    {
      name: 'Refinance Comparison',
      inputs: {
        loanAmount: 350000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Current Loan',
            interestRate: 7.5,
            points: 0,
            originationFee: 0,
            processingFee: 0,
            underwritingFee: 0,
            appraisalFee: 0,
            titleInsurance: 0,
            recordingFee: 0,
            creditReport: 0,
            floodCert: 0,
            taxService: 0,
            wireFee: 0,
            otherFees: 0
          },
          {
            lender: 'Refinance Option A',
            interestRate: 6.0,
            points: 0,
            originationFee: 2000,
            processingFee: 800,
            underwritingFee: 1200,
            appraisalFee: 500,
            titleInsurance: 1500,
            recordingFee: 150,
            creditReport: 75,
            floodCert: 30,
            taxService: 100,
            wireFee: 40,
            otherFees: 400
          },
          {
            lender: 'Refinance Option B',
            interestRate: 5.75,
            points: 1,
            originationFee: 2500,
            processingFee: 900,
            underwritingFee: 1400,
            appraisalFee: 550,
            titleInsurance: 1600,
            recordingFee: 180,
            creditReport: 85,
            floodCert: 35,
            taxService: 110,
            wireFee: 45,
            otherFees: 450
          }
        ],
        propertyValue: 450000,
        propertyTax: 5400,
        homeInsurance: 1080,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 780,
        debtToIncomeRatio: 32,
        state: 'TX',
        propertyType: 'Single Family Home',
        purchaseType: 'Refinance',
        comparisonPeriod: 30
      },
      outputs: {
        aprComparison: {
          offers: [
            { lender: 'Current Loan', apr: 7.5, monthlyPayment: 2447, totalCost: 880920 },
            { lender: 'Refinance Option A', apr: 6.15, monthlyPayment: 2098, totalCost: 755280 },
            { lender: 'Refinance Option B', apr: 5.95, monthlyPayment: 2043, totalCost: 735480 }
          ]
        },
        bestOffer: {
          lender: 'Refinance Option B',
          apr: 5.95,
          monthlyPayment: 2043,
          totalCost: 735480,
          savings: 145440
        },
        monthlyPaymentComparison: {
          difference: 404,
          percentageSavings: 16.51
        },
        totalCostComparison: {
          difference: 145440,
          percentageSavings: 16.51
        },
        breakEvenAnalysis: {
          breakEvenMonths: 15,
          recommendation: 'Refinance Option B breaks even in 15 months'
        },
        savingsAnalysis: {
          monthlySavings: 404,
          annualSavings: 4848,
          totalSavings: 145440
        },
        recommendations: 'Refinance Option B offers the best long-term value with significant monthly and total savings.',
        keyMetrics: {
          bestAPR: 5.95,
          monthlySavings: 404,
          totalSavings: 145440,
          breakEvenMonths: 15
        },
        aprAnalysis: 'Refinance Option B provides the most favorable terms with a 5.95% APR, resulting in $404 monthly savings and $145,440 total savings over 30 years. The break-even point is reached in 15 months, making this an excellent refinancing opportunity.'
      }
    },
    {
      name: 'ARM vs Fixed Rate Comparison',
      inputs: {
        loanAmount: 300000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Fixed Rate Option',
            interestRate: 6.75,
            points: 0,
            originationFee: 1200,
            processingFee: 600,
            underwritingFee: 900,
            appraisalFee: 400,
            titleInsurance: 1100,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: '5/1 ARM Option',
            interestRate: 5.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1100,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ],
        propertyValue: 375000,
        downPayment: 75000,
        propertyTax: 4500,
        homeInsurance: 900,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 760,
        debtToIncomeRatio: 35,
        state: 'FL',
        propertyType: 'Single Family Home',
        purchaseType: 'Purchase',
        comparisonPeriod: 30
      },
      outputs: {
        aprComparison: {
          offers: [
            { lender: 'Fixed Rate Option', apr: 6.89, monthlyPayment: 1946, totalCost: 700560 },
            { lender: '5/1 ARM Option', apr: 5.65, monthlyPayment: 1703, totalCost: 613080 }
          ]
        },
        bestOffer: {
          lender: '5/1 ARM Option',
          apr: 5.65,
          monthlyPayment: 1703,
          totalCost: 613080,
          savings: 87480
        },
        monthlyPaymentComparison: {
          difference: 243,
          percentageSavings: 12.49
        },
        totalCostComparison: {
          difference: 87480,
          percentageSavings: 12.49
        },
        breakEvenAnalysis: {
          breakEvenMonths: 0,
          recommendation: 'ARM offers immediate savings but consider rate adjustment risk'
        },
        savingsAnalysis: {
          monthlySavings: 243,
          annualSavings: 2916,
          totalSavings: 87480
        },
        recommendations: 'The 5/1 ARM offers significant initial savings but consider the risk of rate increases after 5 years.',
        keyMetrics: {
          bestAPR: 5.65,
          monthlySavings: 243,
          totalSavings: 87480,
          breakEvenMonths: 0
        },
        aprAnalysis: 'The 5/1 ARM offers a lower initial APR of 5.65% compared to the fixed rate option at 6.89%, providing $243 monthly savings. However, the ARM rate will adjust after 5 years, potentially increasing payments. Consider your long-term plans and risk tolerance when choosing between these options.'
      }
    }
  ]
};