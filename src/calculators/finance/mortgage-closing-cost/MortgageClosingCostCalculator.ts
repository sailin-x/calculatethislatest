import { Calculator } from '../../../types/calculator';

export const mortgageClosingCostCalculator: Calculator = {
  id: 'mortgage-closing-cost-calculator',
  title: 'Mortgage Closing Cost Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Calculate comprehensive mortgage closing costs including lender fees, third-party fees, prepaid items, and escrow requirements',
  
  usageInstructions: [
    'Enter loan details including amount, interest rate, and term',
    'Input home price and down payment information',
    'Set closing cost details including fees and prepaid items',
    'Review comprehensive closing cost breakdown and analysis',
    'Analyze total cost of homeownership and payment impact'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Principal loan amount',
      defaultValue: 300000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'homePrice',
      label: 'Home Purchase Price',
      type: 'currency',
      required: true,
      placeholder: '375000',
      tooltip: 'Total home purchase price',
      defaultValue: 375000,
      min: 10000,
      max: 10000000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Down payment amount',
      defaultValue: 75000,
      min: 0,
      max: 10000000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Annual interest rate',
      defaultValue: 6.5,
      min: 0,
      max: 20
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Loan term in years',
      defaultValue: 30,
      min: 1,
      max: 50
    },
    {
      id: 'originationFee',
      label: 'Loan Origination Fee',
      type: 'currency',
      required: false,
      placeholder: '1500',
      tooltip: 'Loan origination fee',
      defaultValue: 1500,
      min: 0,
      max: 100000
    },
    {
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Discount points purchased',
      defaultValue: 0,
      min: 0,
      max: 10
    },
    {
      id: 'appraisalFee',
      label: 'Appraisal Fee',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Property appraisal fee',
      defaultValue: 500,
      min: 0,
      max: 2000
    },
    {
      id: 'creditReportFee',
      label: 'Credit Report Fee',
      type: 'currency',
      required: false,
      placeholder: '50',
      tooltip: 'Credit report fee',
      defaultValue: 50,
      min: 0,
      max: 500
    },
    {
      id: 'titleInsurance',
      label: 'Title Insurance',
      type: 'currency',
      required: false,
      placeholder: '800',
      tooltip: 'Title insurance premium',
      defaultValue: 800,
      min: 0,
      max: 5000
    },
    {
      id: 'escrowFee',
      label: 'Escrow Fee',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Escrow and settlement fee',
      defaultValue: 400,
      min: 0,
      max: 2000
    },
    {
      id: 'recordingFee',
      label: 'Recording Fee',
      type: 'currency',
      required: false,
      placeholder: '150',
      tooltip: 'Document recording fee',
      defaultValue: 150,
      min: 0,
      max: 1000
    },
    {
      id: 'surveyFee',
      label: 'Survey Fee',
      type: 'currency',
      required: false,
      placeholder: '300',
      tooltip: 'Property survey fee',
      defaultValue: 300,
      min: 0,
      max: 1000
    },
    {
      id: 'floodCertification',
      label: 'Flood Certification',
      type: 'currency',
      required: false,
      placeholder: '25',
      tooltip: 'Flood certification fee',
      defaultValue: 25,
      min: 0,
      max: 200
    },
    {
      id: 'taxServiceFee',
      label: 'Tax Service Fee',
      type: 'currency',
      required: false,
      placeholder: '100',
      tooltip: 'Tax service fee',
      defaultValue: 100,
      min: 0,
      max: 500
    },
    {
      id: 'prepaidInterest',
      label: 'Prepaid Interest',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Prepaid interest (calculated automatically)',
      defaultValue: 0,
      min: 0,
      max: 10000
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes (Annual)',
      type: 'currency',
      required: false,
      placeholder: '4000',
      tooltip: 'Annual property taxes',
      defaultValue: 4000,
      min: 0,
      max: 50000
    },
    {
      id: 'homeownersInsurance',
      label: 'Homeowners Insurance (Annual)',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200,
      min: 0,
      max: 10000
    },
    {
      id: 'pmi',
      label: 'Private Mortgage Insurance',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Monthly PMI payment (if applicable)',
      defaultValue: 0,
      min: 0,
      max: 1000
    }
  ],

  outputs: [
    {
      id: 'totalClosingCosts',
      label: 'Total Closing Costs',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total closing costs excluding prepaid items'
    },
    {
      id: 'totalPrepaidItems',
      label: 'Total Prepaid Items',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total prepaid items including taxes and insurance'
    },
    {
      id: 'totalCashToClose',
      label: 'Total Cash to Close',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total cash required to close the transaction'
    },
    {
      id: 'closingCostsPercentage',
      label: 'Closing Costs % of Loan',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Closing costs as percentage of loan amount'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly principal and interest payment'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total monthly payment including taxes and insurance'
    },
    {
      id: 'breakdownByCategory',
      label: 'Cost Breakdown by Category',
      type: 'text',
      explanation: 'Detailed breakdown of closing costs by category'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'text',
      explanation: 'Comparison with typical closing costs'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for reducing closing costs'
    }
  ],

  formulas: [
    {
      id: 'mortgage-closing-cost-analysis',
      name: 'Mortgage Closing Cost Analysis',
      description: 'Calculate comprehensive mortgage closing costs and payment analysis',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const homePrice = inputs.homePrice || 0;
        const downPayment = inputs.downPayment || 0;
        const interestRate = (inputs.interestRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const originationFee = inputs.originationFee || 0;
        const discountPoints = inputs.discountPoints || 0;
        const appraisalFee = inputs.appraisalFee || 0;
        const creditReportFee = inputs.creditReportFee || 0;
        const titleInsurance = inputs.titleInsurance || 0;
        const escrowFee = inputs.escrowFee || 0;
        const recordingFee = inputs.recordingFee || 0;
        const surveyFee = inputs.surveyFee || 0;
        const floodCertification = inputs.floodCertification || 0;
        const taxServiceFee = inputs.taxServiceFee || 0;
        const propertyTaxes = inputs.propertyTaxes || 0;
        const homeownersInsurance = inputs.homeownersInsurance || 0;
        const pmi = inputs.pmi || 0;
        
        // Calculate discount points cost
        const discountPointsCost = (discountPoints / 100) * loanAmount;
        
        // Calculate prepaid interest (simplified - assumes closing at month end)
        const monthlyRate = interestRate / 12;
        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) / 
                              (Math.pow(1 + monthlyRate, loanTerm * 12) - 1);
        const dailyInterest = (loanAmount * interestRate) / 365;
        const prepaidInterest = dailyInterest * 15; // Assume 15 days of prepaid interest
        
        // Calculate total closing costs
        const lenderFees = originationFee + discountPointsCost;
        const thirdPartyFees = appraisalFee + creditReportFee + titleInsurance + escrowFee + 
                              recordingFee + surveyFee + floodCertification + taxServiceFee;
        const totalClosingCosts = lenderFees + thirdPartyFees;
        
        // Calculate prepaid items
        const prepaidTaxes = propertyTaxes / 12; // 1 month of taxes
        const prepaidInsurance = homeownersInsurance / 12; // 1 month of insurance
        const totalPrepaidItems = prepaidInterest + prepaidTaxes + prepaidInsurance;
        
        // Calculate total cash to close
        const totalCashToClose = downPayment + totalClosingCosts + totalPrepaidItems;
        
        // Calculate percentages
        const closingCostsPercentage = loanAmount > 0 ? (totalClosingCosts / loanAmount) * 100 : 0;
        
        // Calculate monthly payments
        const totalMonthlyPayment = monthlyPayment + (propertyTaxes / 12) + (homeownersInsurance / 12) + pmi;
        
        // Generate breakdown and recommendations
        const breakdownByCategory = generateBreakdownByCategory(
          lenderFees, thirdPartyFees, totalPrepaidItems
        );
        const costComparison = generateCostComparison(
          closingCostsPercentage, totalClosingCosts, loanAmount
        );
        const recommendations = generateRecommendations(
          closingCostsPercentage, lenderFees, thirdPartyFees
        );
        
        return {
          outputs: {
            totalClosingCosts: Math.round(totalClosingCosts),
            totalPrepaidItems: Math.round(totalPrepaidItems),
            totalCashToClose: Math.round(totalCashToClose),
            closingCostsPercentage: Math.round(closingCostsPercentage * 100) / 100,
            monthlyPayment: Math.round(monthlyPayment),
            totalMonthlyPayment: Math.round(totalMonthlyPayment),
            breakdownByCategory,
            costComparison,
            recommendations
          },
          explanation: `Closing cost analysis complete. Total closing costs: $${totalClosingCosts.toLocaleString()}. Total cash to close: $${totalCashToClose.toLocaleString()}.`,
          intermediateSteps: {
            lenderFees: Math.round(lenderFees),
            thirdPartyFees: Math.round(thirdPartyFees),
            discountPointsCost: Math.round(discountPointsCost),
            prepaidInterest: Math.round(prepaidInterest),
            prepaidTaxes: Math.round(prepaidTaxes),
            prepaidInsurance: Math.round(prepaidInsurance)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'loanAmount',
      type: 'required',
      message: 'Loan amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'homePrice',
      type: 'required',
      message: 'Home price is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'downPayment',
      type: 'business',
      message: 'Down payment cannot exceed home price',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePrice = allInputs?.homePrice || 0;
        return value <= homePrice;
      }
    },
    {
      field: 'loanAmount',
      type: 'business',
      message: 'Loan amount plus down payment should equal home price',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePrice = allInputs?.homePrice || 0;
        const downPayment = allInputs?.downPayment || 0;
        return Math.abs((value + downPayment) - homePrice) < 1000; // Allow small rounding differences
      }
    }
  ],

  examples: [
    {
      title: 'Standard Mortgage Closing',
      description: 'Typical closing costs for a conventional mortgage',
      inputs: {
        loanAmount: 300000,
        homePrice: 375000,
        downPayment: 75000,
        interestRate: 6.5,
        loanTerm: 30,
        originationFee: 1500,
        discountPoints: 0,
        appraisalFee: 500,
        creditReportFee: 50,
        titleInsurance: 800,
        escrowFee: 400,
        recordingFee: 150,
        surveyFee: 300,
        floodCertification: 25,
        taxServiceFee: 100,
        propertyTaxes: 4000,
        homeownersInsurance: 1200,
        pmi: 0
      },
      expectedOutputs: {
        totalClosingCosts: 3825,
        totalPrepaidItems: 1083,
        totalCashToClose: 85908,
        closingCostsPercentage: 1.3,
        monthlyPayment: 1896,
        totalMonthlyPayment: 2230,
        breakdownByCategory: 'Lender fees: $1,500, Third-party fees: $2,325, Prepaid items: $1,083',
        costComparison: 'Below average closing costs (typical range: 2-5% of loan amount)',
        recommendations: 'Good closing cost structure. Consider shopping for title insurance to potentially reduce costs.'
      }
    },
    {
      title: 'High-Cost Closing',
      description: 'Closing with higher fees and prepaid items',
      inputs: {
        loanAmount: 500000,
        homePrice: 625000,
        downPayment: 125000,
        interestRate: 7.0,
        loanTerm: 30,
        originationFee: 3000,
        discountPoints: 2,
        appraisalFee: 800,
        creditReportFee: 75,
        titleInsurance: 1200,
        escrowFee: 600,
        recordingFee: 200,
        surveyFee: 500,
        floodCertification: 50,
        taxServiceFee: 150,
        propertyTaxes: 6000,
        homeownersInsurance: 1800,
        pmi: 200
      },
      expectedOutputs: {
        totalClosingCosts: 14775,
        totalPrepaidItems: 1583,
        totalCashToClose: 141358,
        closingCostsPercentage: 3.0,
        monthlyPayment: 3328,
        totalMonthlyPayment: 3928,
        breakdownByCategory: 'Lender fees: $13,000, Third-party fees: $2,775, Prepaid items: $1,583',
        costComparison: 'Average closing costs (typical range: 2-5% of loan amount)',
        recommendations: 'Consider negotiating origination fees and shopping for better rates on third-party services.'
      }
    }
  ]
};

// Helper functions for calculations
function generateBreakdownByCategory(
  lenderFees: number, 
  thirdPartyFees: number, 
  prepaidItems: number
): string {
  return `Lender fees: $${lenderFees.toLocaleString()}, Third-party fees: $${thirdPartyFees.toLocaleString()}, Prepaid items: $${prepaidItems.toLocaleString()}`;
}

function generateCostComparison(
  percentage: number, 
  totalCosts: number, 
  loanAmount: number
): string {
  if (percentage < 2) {
    return 'Below average closing costs (typical range: 2-5% of loan amount)';
  } else if (percentage <= 3) {
    return 'Average closing costs (typical range: 2-5% of loan amount)';
  } else if (percentage <= 5) {
    return 'Above average closing costs (typical range: 2-5% of loan amount)';
  } else {
    return 'High closing costs (above typical range: 2-5% of loan amount)';
  }
}

function generateRecommendations(
  percentage: number, 
  lenderFees: number, 
  thirdPartyFees: number
): string {
  const recommendations = [];
  
  if (percentage > 3) {
    recommendations.push('Consider negotiating origination fees and shopping for better rates on third-party services.');
  }
  
  if (lenderFees > 2000) {
    recommendations.push('Lender fees are high - shop around for better mortgage rates and terms.');
  }
  
  if (thirdPartyFees > 3000) {
    recommendations.push('Third-party fees are high - compare costs across different service providers.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Good closing cost structure. Consider shopping for title insurance to potentially reduce costs.');
  }
  
  return recommendations.join(' ');
}
