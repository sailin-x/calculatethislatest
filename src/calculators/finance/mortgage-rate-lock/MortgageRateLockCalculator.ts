import { Calculator } from '../../../types/calculator';

export const mortgageRateLockCalculator: Calculator = {
  id: 'mortgage-rate-lock-calculator',
  title: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Mortgage',
  description: 'Analyze mortgage rate locks, calculate savings, assess risks, and optimize lock strategies',
  usageInstructions: [
    'Enter loan details including amount, locked rate, and current market rate',
    'Set rate lock information including lock dates, fees, and type',
    'Input property and closing information',
    'Configure market conditions and rate forecasts',
    'Review comprehensive rate lock analysis and recommendations'
  ],
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      tooltip: 'Total loan amount in dollars',
      placeholder: '300000'
    },
    {
      id: 'lockedRate',
      label: 'Locked Rate',
      type: 'percentage',
      required: true,
      tooltip: 'Interest rate locked in',
      placeholder: '6.5'
    },
    {
      id: 'currentMarketRate',
      label: 'Current Market Rate',
      type: 'percentage',
      required: true,
      tooltip: 'Current market interest rate',
      placeholder: '7.2'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'number',
      required: true,
      tooltip: 'Loan term in years',
      placeholder: '30'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      tooltip: 'Type of mortgage loan',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ]
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: true,
      tooltip: 'Type of mortgage payment',
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ]
    },
    {
      id: 'lockDate',
      label: 'Lock Date',
      type: 'date',
      required: true,
      tooltip: 'Date when rate was locked',
      placeholder: '2024-01-15'
    },
    {
      id: 'lockExpirationDate',
      label: 'Lock Expiration Date',
      type: 'date',
      required: true,
      tooltip: 'Date when rate lock expires',
      placeholder: '2024-04-15'
    },
    {
      id: 'lockDuration',
      label: 'Lock Duration',
      type: 'number',
      required: false,
      tooltip: 'Lock duration in days',
      placeholder: '90'
    },
    {
      id: 'lockType',
      label: 'Lock Type',
      type: 'select',
      required: true,
      tooltip: 'Type of rate lock',
      options: [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
        { value: 'float_down', label: 'Float Down' },
        { value: 'extended', label: 'Extended' }
      ]
    },
    {
      id: 'lockFee',
      label: 'Lock Fee',
      type: 'currency',
      required: false,
      tooltip: 'Fee paid for rate lock',
      placeholder: '500'
    },
    {
      id: 'lockFeeType',
      label: 'Lock Fee Type',
      type: 'select',
      required: false,
      tooltip: 'Type of lock fee',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed Amount' },
        { value: 'none', label: 'None' }
      ]
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      tooltip: 'Estimated property value',
      placeholder: '400000'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      tooltip: 'Type of property',
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ]
    },
    {
      id: 'estimatedClosingDate',
      label: 'Estimated Closing Date',
      type: 'date',
      required: true,
      tooltip: 'Estimated date of closing',
      placeholder: '2024-03-15'
    },
    {
      id: 'marketCondition',
      label: 'Market Condition',
      type: 'select',
      required: false,
      tooltip: 'Current market condition',
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'volatile', label: 'Volatile' }
      ]
    },
    {
      id: 'rateTrend',
      label: 'Rate Trend',
      type: 'select',
      required: false,
      tooltip: 'Current rate trend',
      options: [
        { value: 'falling', label: 'Falling' },
        { value: 'stable', label: 'Stable' },
        { value: 'rising', label: 'Rising' },
        { value: 'volatile', label: 'Volatile' }
      ]
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: false,
      tooltip: 'Borrower risk tolerance',
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ]
    },
    {
      id: 'maxRateIncrease',
      label: 'Max Rate Increase',
      type: 'percentage',
      required: false,
      tooltip: 'Maximum acceptable rate increase',
      placeholder: '1.0'
    }
  ],
  outputs: [
    {
      id: 'rateDifference',
      label: 'Rate Difference',
      type: 'percentage',
      explanation: 'Difference between locked and current rates'
    },
    {
      id: 'rateSavings',
      label: 'Rate Savings',
      type: 'percentage',
      explanation: 'Savings from locked rate vs current market'
    },
    {
      id: 'paymentDifference',
      label: 'Payment Difference',
      type: 'currency',
      explanation: 'Monthly payment difference'
    },
    {
      id: 'paymentSavings',
      label: 'Payment Savings',
      type: 'currency',
      explanation: 'Monthly payment savings'
    },
    {
      id: 'lockValue',
      label: 'Lock Value',
      type: 'currency',
      explanation: 'Total value of the rate lock'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      explanation: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'lockRemainingDays',
      label: 'Lock Remaining Days',
      type: 'number',
      explanation: 'Days remaining until lock expires'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break Even Point',
      type: 'number',
      explanation: 'Days to break even on lock costs'
    },
    {
      id: 'lockRating',
      label: 'Lock Rating',
      type: 'text',
      explanation: 'Overall lock quality rating'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommended action for the rate lock'
    }
  ],
  formulas: [
    {
      id: 'mortgage-rate-lock-analysis',
      name: 'Mortgage Rate Lock Analysis',
      description: 'Calculate comprehensive rate lock analysis including savings, risks, and recommendations',
      calculate: (inputs: Record<string, any>) => {
        const loanAmount = inputs.loanAmount || 0;
        const lockedRate = (inputs.lockedRate || 0) / 100;
        const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
        const loanTerm = inputs.loanTerm || 30;
        const lockFee = inputs.lockFee || 0;
        const lockDate = new Date(inputs.lockDate || new Date());
        const lockExpirationDate = new Date(inputs.lockExpirationDate || new Date());
        const estimatedClosingDate = new Date(inputs.estimatedClosingDate || new Date());
        
        // Calculate rate difference and savings
        const rateDifference = currentMarketRate - lockedRate;
        const rateSavings = rateDifference > 0 ? rateDifference : 0;
        
        // Calculate monthly payments
        const monthlyRateLocked = lockedRate / 12;
        const monthlyRateCurrent = currentMarketRate / 12;
        const totalPayments = loanTerm * 12;
        
        let lockedPayment = 0;
        let currentPayment = 0;
        
        if (monthlyRateLocked > 0) {
          lockedPayment = (loanAmount * monthlyRateLocked * Math.pow(1 + monthlyRateLocked, totalPayments)) /
                         (Math.pow(1 + monthlyRateLocked, totalPayments) - 1);
        } else {
          lockedPayment = loanAmount / totalPayments;
        }
        
        if (monthlyRateCurrent > 0) {
          currentPayment = (loanAmount * monthlyRateCurrent * Math.pow(1 + monthlyRateCurrent, totalPayments)) /
                          (Math.pow(1 + monthlyRateCurrent, totalPayments) - 1);
        } else {
          currentPayment = loanAmount / totalPayments;
        }
        
        const paymentDifference = Math.abs(currentPayment - lockedPayment);
        const paymentSavings = rateDifference > 0 ? paymentDifference : 0;
        
        // Calculate lock value
        const lockValue = rateDifference > 0 ? (paymentSavings * totalPayments) - lockFee : -lockFee;
        
        // Calculate remaining days
        const today = new Date();
        const lockRemainingDays = Math.max(0, Math.ceil((lockExpirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        
        // Calculate break even point
        const breakEvenPoint = lockFee > 0 && paymentSavings > 0 ? Math.ceil(lockFee / paymentSavings) : 0;
        
        // Calculate risk score
        const riskScore = calculateRiskScore(inputs, rateDifference, lockRemainingDays, lockValue);
        
        // Determine lock rating and recommendation
        const lockRating = determineLockRating(riskScore, lockValue, rateDifference);
        const recommendation = generateRecommendation(lockRating, lockRemainingDays, rateDifference, lockValue);
        
        return {
          outputs: {
            rateDifference: Math.round(rateDifference * 100000) / 1000,
            rateSavings: Math.round(rateSavings * 100000) / 1000,
            paymentDifference: Math.round(paymentDifference),
            paymentSavings: Math.round(paymentSavings),
            lockValue: Math.round(lockValue),
            riskScore: Math.round(riskScore),
            lockRemainingDays,
            breakEvenPoint,
            lockRating,
            recommendation
          },
          explanation: `Rate lock analysis complete. Rate difference: ${(rateDifference * 100).toFixed(2)}%. Lock value: $${lockValue.toLocaleString()}. Risk score: ${riskScore}/100.`,
          intermediateSteps: {
            monthlyRateLocked: Math.round(monthlyRateLocked * 1000000) / 1000000,
            monthlyRateCurrent: Math.round(monthlyRateCurrent * 1000000) / 1000000,
            totalPayments,
            lockFee
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
      field: 'lockedRate',
      type: 'required',
      message: 'Locked rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'currentMarketRate',
      type: 'required',
      message: 'Current market rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'loanTerm',
      type: 'required',
      message: 'Loan term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'loanType',
      type: 'required',
      message: 'Loan type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'paymentType',
      type: 'required',
      message: 'Payment type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'lockDate',
      type: 'required',
      message: 'Lock date is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'lockExpirationDate',
      type: 'required',
      message: 'Lock expiration date is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'lockType',
      type: 'required',
      message: 'Lock type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'propertyType',
      type: 'required',
      message: 'Property type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'estimatedClosingDate',
      type: 'required',
      message: 'Estimated closing date is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      field: 'loanAmount',
      type: 'range',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'lockedRate',
      type: 'range',
      message: 'Locked rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'currentMarketRate',
      type: 'range',
      message: 'Current market rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'loanTerm',
      type: 'range',
      message: 'Loan term must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      field: 'propertyValue',
      type: 'range',
      message: 'Property value must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'lockFee',
      type: 'range',
      message: 'Lock fee must be between $0 and $10,000',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
    },
    {
      field: 'maxRateIncrease',
      type: 'range',
      message: 'Maximum rate increase must be between 0% and 10%',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10)
    },
    {
      field: 'lockExpirationDate',
      type: 'business',
      message: 'Lock expiration date should be after lock date',
      validator: (value: any, allInputs: Record<string, any>) => {
        const lockDate = allInputs?.lockDate ? new Date(allInputs.lockDate) : null;
        const expirationDate = value ? new Date(value) : null;
        if (!lockDate || !expirationDate) return true;
        return expirationDate > lockDate;
      }
    },
    {
      field: 'estimatedClosingDate',
      type: 'business',
      message: 'Estimated closing date should be before lock expiration',
      validator: (value: any, allInputs: Record<string, any>) => {
        const expirationDate = allInputs?.lockExpirationDate ? new Date(allInputs.lockExpirationDate) : null;
        const closingDate = value ? new Date(value) : null;
        if (!expirationDate || !closingDate) return true;
        return closingDate <= expirationDate;
      }
    }
  ],
  examples: [
    {
      title: 'Favorable Rate Lock',
      description: 'Locked in a good rate before market increase',
      inputs: {
        loanAmount: 300000,
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        loanTerm: 30,
        loanType: 'conventional',
        paymentType: 'principal_interest',
        lockDate: '2024-01-15',
        lockExpirationDate: '2024-04-15',
        lockType: 'free',
        propertyValue: 400000,
        propertyType: 'single_family',
        estimatedClosingDate: '2024-03-15',
        marketCondition: 'growing',
        rateTrend: 'rising',
        riskTolerance: 'moderate'
      },
      expectedOutputs: {
        rateDifference: 0.7,
        rateSavings: 0.7,
        paymentDifference: 118,
        paymentSavings: 118,
        lockValue: 42480,
        riskScore: 25,
        lockRemainingDays: 45,
        breakEvenPoint: 0,
        lockRating: 'Excellent',
        recommendation: 'Maintain Lock'
      }
    },
    {
      title: 'Expiring Rate Lock',
      description: 'Rate lock approaching expiration with closing delays',
      inputs: {
        loanAmount: 250000,
        lockedRate: 6.8,
        currentMarketRate: 7.5,
        loanTerm: 30,
        loanType: 'conventional',
        paymentType: 'principal_interest',
        lockDate: '2024-01-01',
        lockExpirationDate: '2024-03-01',
        lockType: 'paid',
        lockFee: 500,
        propertyValue: 325000,
        propertyType: 'single_family',
        estimatedClosingDate: '2024-03-15',
        marketCondition: 'volatile',
        rateTrend: 'rising',
        riskTolerance: 'conservative'
      },
      expectedOutputs: {
        rateDifference: 0.7,
        rateSavings: 0.7,
        paymentDifference: 98,
        paymentSavings: 98,
        lockValue: 35230,
        riskScore: 75,
        lockRemainingDays: 5,
        breakEvenPoint: 6,
        lockRating: 'Good',
        recommendation: 'Consider Extension'
      }
    }
  ]
};

// Helper functions
function calculateRiskScore(inputs: Record<string, any>, rateDifference: number, lockRemainingDays: number, lockValue: number): number {
  let riskScore = 50; // Base risk score
  
  // Rate difference risk
  if (rateDifference < 0) {
    riskScore += 20; // Higher risk if current rate is lower
  } else if (rateDifference > 0.5) {
    riskScore -= 15; // Lower risk if significant savings
  }
  
  // Lock expiration risk
  if (lockRemainingDays <= 7) {
    riskScore += 30; // High risk if expiring soon
  } else if (lockRemainingDays <= 30) {
    riskScore += 15; // Medium risk if expiring within month
  }
  
  // Market condition risk
  const marketCondition = inputs.marketCondition;
  if (marketCondition === 'volatile') {
    riskScore += 20;
  } else if (marketCondition === 'declining') {
    riskScore += 10;
  } else if (marketCondition === 'stable') {
    riskScore -= 5;
  }
  
  // Rate trend risk
  const rateTrend = inputs.rateTrend;
  if (rateTrend === 'rising') {
    riskScore -= 10; // Lower risk if rates are rising
  } else if (rateTrend === 'falling') {
    riskScore += 15; // Higher risk if rates are falling
  }
  
  // Lock value risk
  if (lockValue < 0) {
    riskScore += 25; // Higher risk if lock has negative value
  }
  
  // Clamp risk score between 1 and 100
  return Math.max(1, Math.min(100, riskScore));
}

function determineLockRating(riskScore: number, lockValue: number, rateDifference: number): string {
  if (riskScore <= 25 && lockValue > 10000) {
    return 'Excellent';
  } else if (riskScore <= 40 && lockValue > 5000) {
    return 'Good';
  } else if (riskScore <= 60 && lockValue > 0) {
    return 'Average';
  } else if (riskScore <= 80) {
    return 'Poor';
  } else {
    return 'Very Poor';
  }
}

function generateRecommendation(lockRating: string, lockRemainingDays: number, rateDifference: number, lockValue: number): string {
  if (lockRating === 'Excellent' || lockRating === 'Good') {
    return 'Maintain Lock';
  } else if (lockRating === 'Average' && lockRemainingDays > 30) {
    return 'Monitor Closely';
  } else if (lockRemainingDays <= 14) {
    return 'Consider Extension';
  } else if (lockValue < 0) {
    return 'Let Expire';
  } else {
    return 'Requires Review';
  }
}