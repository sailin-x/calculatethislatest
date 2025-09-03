import { Formula, CalculationResult } from '../../../types/calculator';

export const mortgageRateLockFormulas: Formula[] = [
  {
    id: 'rate-difference-calculation',
    name: 'Rate Difference Calculation',
    description: 'Calculate the difference between locked and current market rates',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const lockedRate = (inputs.lockedRate || 0) / 100;
      const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
      
      const rateDifference = currentMarketRate - lockedRate;
      const rateSavings = rateDifference > 0 ? rateDifference : 0;
      
      return {
        outputs: {
          rateDifference: Math.round(rateDifference * 100000) / 1000,
          rateSavings: Math.round(rateSavings * 100000) / 1000
        },
        explanation: `Rate difference: ${(rateDifference * 100).toFixed(2)}%. ${rateDifference > 0 ? 'Savings' : 'Cost'}: ${(Math.abs(rateDifference) * 100).toFixed(2)}%.`,
        intermediateSteps: {
          lockedRate: Math.round(lockedRate * 1000000) / 1000000,
          currentMarketRate: Math.round(currentMarketRate * 1000000) / 1000000
        }
      };
    }
  },
  {
    id: 'payment-calculation',
    name: 'Monthly Payment Calculation',
    description: 'Calculate monthly payments for both locked and current rates',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const lockedRate = (inputs.lockedRate || 0) / 100;
      const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
      const loanTerm = inputs.loanTerm || 30;
      
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
      const paymentSavings = currentMarketRate > lockedRate ? paymentDifference : 0;
      
      return {
        outputs: {
          lockedPayment: Math.round(lockedPayment),
          currentPayment: Math.round(currentPayment),
          paymentDifference: Math.round(paymentDifference),
          paymentSavings: Math.round(paymentSavings)
        },
        explanation: `Locked payment: $${lockedPayment.toLocaleString()}. Current payment: $${currentPayment.toLocaleString()}. Difference: $${paymentDifference.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRateLocked: Math.round(monthlyRateLocked * 1000000) / 1000000,
          monthlyRateCurrent: Math.round(monthlyRateCurrent * 1000000) / 1000000,
          totalPayments
        }
      };
    }
  },
  {
    id: 'lock-value-calculation',
    name: 'Lock Value Calculation',
    description: 'Calculate the total value of the rate lock over the loan term',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const lockedRate = (inputs.lockedRate || 0) / 100;
      const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const lockFee = inputs.lockFee || 0;
      
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
      const paymentSavings = currentMarketRate > lockedRate ? paymentDifference : 0;
      const lockValue = (paymentSavings * totalPayments) - lockFee;
      
      return {
        outputs: {
          lockValue: Math.round(lockValue),
          paymentSavings: Math.round(paymentSavings),
          totalSavings: Math.round(paymentSavings * totalPayments),
          lockFee
        },
        explanation: `Lock value: $${lockValue.toLocaleString()}. Total savings: $${(paymentSavings * totalPayments).toLocaleString()}. Lock fee: $${lockFee.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRateLocked: Math.round(monthlyRateLocked * 1000000) / 1000000,
          monthlyRateCurrent: Math.round(monthlyRateCurrent * 1000000) / 1000000,
          totalPayments
        }
      };
    }
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Calculate risk score based on various factors',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const lockedRate = (inputs.lockedRate || 0) / 100;
      const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
      const lockExpirationDate = new Date(inputs.lockExpirationDate || new Date());
      const marketCondition = inputs.marketCondition || 'stable';
      const rateTrend = inputs.rateTrend || 'stable';
      
      const rateDifference = currentMarketRate - lockedRate;
      const today = new Date();
      const lockRemainingDays = Math.max(0, Math.ceil((lockExpirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      
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
      if (marketCondition === 'volatile') {
        riskScore += 20;
      } else if (marketCondition === 'declining') {
        riskScore += 10;
      } else if (marketCondition === 'stable') {
        riskScore -= 5;
      }
      
      // Rate trend risk
      if (rateTrend === 'rising') {
        riskScore -= 10; // Lower risk if rates are rising
      } else if (rateTrend === 'falling') {
        riskScore += 15; // Higher risk if rates are falling
      }
      
      // Clamp risk score between 1 and 100
      riskScore = Math.max(1, Math.min(100, riskScore));
      
      return {
        outputs: {
          riskScore: Math.round(riskScore),
          lockRemainingDays,
          rateDifference: Math.round(rateDifference * 100000) / 1000
        },
        explanation: `Risk score: ${riskScore}/100. Days remaining: ${lockRemainingDays}. Rate difference: ${(rateDifference * 100).toFixed(2)}%.`,
        intermediateSteps: {
          rateDifference: Math.round(rateDifference * 1000000) / 1000000,
          marketCondition,
          rateTrend
        }
      };
    }
  },
  {
    id: 'break-even-analysis',
    name: 'Break-Even Analysis',
    description: 'Calculate break-even point for rate lock costs',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const lockFee = inputs.lockFee || 0;
      const lockedRate = (inputs.lockedRate || 0) / 100;
      const currentMarketRate = (inputs.currentMarketRate || 0) / 100;
      const loanAmount = inputs.loanAmount || 0;
      const loanTerm = inputs.loanTerm || 30;
      
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
      const paymentSavings = currentMarketRate > lockedRate ? paymentDifference : 0;
      
      const breakEvenPoint = lockFee > 0 && paymentSavings > 0 ? Math.ceil(lockFee / paymentSavings) : 0;
      const breakEvenMonths = breakEvenPoint;
      const breakEvenYears = breakEvenMonths / 12;
      
      return {
        outputs: {
          breakEvenPoint,
          breakEvenMonths,
          breakEvenYears: Math.round(breakEvenYears * 10) / 10,
          lockFee,
          paymentSavings: Math.round(paymentSavings)
        },
        explanation: `Break-even point: ${breakEvenPoint} months (${breakEvenYears.toFixed(1)} years). Lock fee: $${lockFee.toLocaleString()}. Monthly savings: $${paymentSavings.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRateLocked: Math.round(monthlyRateLocked * 1000000) / 1000000,
          monthlyRateCurrent: Math.round(monthlyRateCurrent * 1000000) / 1000000,
          totalPayments
        }
      };
    }
  }
];