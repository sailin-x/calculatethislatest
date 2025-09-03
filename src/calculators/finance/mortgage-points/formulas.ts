import { Formula, CalculationResult } from '../../../types/calculator';

export const mortgagePointsFormulas: Formula[] = [
  {
    id: 'effective-rate-calculation',
    name: 'Effective Interest Rate Calculation',
    description: 'Calculate the effective interest rate after applying discount points',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
      const discountPoints = inputs.discountPoints || 0;
      
      // Each discount point typically reduces rate by 0.25%
      const rateReduction = discountPoints * 0.0025;
      const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
      
      return {
        outputs: { effectiveRate: Math.round(effectiveRate * 100000) / 1000 },
        explanation: `Effective rate: ${(effectiveRate * 100).toFixed(3)}% (reduced by ${(rateReduction * 100).toFixed(3)}%)`,
        intermediateSteps: { rateReduction: Math.round(rateReduction * 1000000) / 1000000 }
      };
    }
  },
  
  {
    id: 'monthly-payment-savings',
    name: 'Monthly Payment Savings Calculation',
    description: 'Calculate monthly payment savings from discount points',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const discountPoints = inputs.discountPoints || 0;
      
      const monthlyRate = baseInterestRate / 12;
      const totalPayments = loanTerm * 12;
      
      if (monthlyRate === 0) {
        return {
          outputs: { monthlyPaymentSavings: 0 },
          explanation: 'No interest rate means no savings from points',
          intermediateSteps: { monthlyRate, totalPayments }
        };
      }
      
      const monthlyPaymentBase = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const rateReduction = discountPoints * 0.0025;
      const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
      const monthlyRateEffective = effectiveRate / 12;
      
      const monthlyPaymentWithPoints = (loanAmount * monthlyRateEffective * Math.pow(1 + monthlyRateEffective, totalPayments)) / 
                                     (Math.pow(1 + monthlyRateEffective, totalPayments) - 1);
      
      const monthlyPaymentSavings = monthlyPaymentBase - monthlyPaymentWithPoints;
      
      return {
        outputs: { monthlyPaymentSavings: Math.round(monthlyPaymentSavings) },
        explanation: `Monthly savings: $${monthlyPaymentSavings.toLocaleString()}`,
        intermediateSteps: { 
          monthlyPaymentBase: Math.round(monthlyPaymentBase),
          monthlyPaymentWithPoints: Math.round(monthlyPaymentWithPoints)
        }
      };
    }
  },
  
  {
    id: 'break-even-analysis',
    name: 'Break-Even Analysis',
    description: 'Calculate how long it takes to break even on point investment',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const discountPoints = inputs.discountPoints || 0;
      const originationPoints = inputs.originationPoints || 0;
      const pointCost = inputs.pointCost || 0;
      const loanAmount = inputs.loanAmount || 0;
      const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      
      if (discountPoints === 0) {
        return {
          outputs: { breakEvenMonths: 0, breakEvenYears: 0 },
          explanation: 'No discount points purchased - no break-even analysis needed',
          intermediateSteps: { discountPoints, pointCost }
        };
      }
      
      const totalPoints = discountPoints + originationPoints;
      const totalPointCost = totalPoints * pointCost;
      
      // Calculate monthly savings
      const rateReduction = discountPoints * 0.0025;
      const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
      
      const monthlyRate = baseInterestRate / 12;
      const monthlyRateEffective = effectiveRate / 12;
      const totalPayments = loanTerm * 12;
      
      const monthlyPaymentBase = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const monthlyPaymentWithPoints = (loanAmount * monthlyRateEffective * Math.pow(1 + monthlyRateEffective, totalPayments)) / 
                                     (Math.pow(1 + monthlyRateEffective, totalPayments) - 1);
      
      const monthlyPaymentSavings = monthlyPaymentBase - monthlyPaymentWithPoints;
      
      if (monthlyPaymentSavings <= 0) {
        return {
          outputs: { breakEvenMonths: 999, breakEvenYears: 999 },
          explanation: 'No monthly savings - points will never break even',
          intermediateSteps: { monthlyPaymentSavings, totalPointCost }
        };
      }
      
      const breakEvenMonths = totalPointCost / monthlyPaymentSavings;
      const breakEvenYears = breakEvenMonths / 12;
      
      return {
        outputs: { 
          breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
          breakEvenYears: Math.round(breakEvenYears * 10) / 10
        },
        explanation: `Break-even in ${breakEvenYears.toFixed(1)} years (${breakEvenMonths.toFixed(1)} months)`,
        intermediateSteps: { 
          totalPointCost: Math.round(totalPointCost),
          monthlyPaymentSavings: Math.round(monthlyPaymentSavings)
        }
      };
    }
  },
  
  {
    id: 'roi-calculation',
    name: 'Return on Investment Calculation',
    description: 'Calculate ROI on point investment over specified analysis period',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const discountPoints = inputs.discountPoints || 0;
      const originationPoints = inputs.originationPoints || 0;
      const pointCost = inputs.pointCost || 0;
      const analysisPeriod = inputs.analysisPeriod || 7;
      const loanAmount = inputs.loanAmount || 0;
      const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      
      if (discountPoints === 0) {
        return {
          outputs: { roi: 0 },
          explanation: 'No discount points purchased - no ROI to calculate',
          intermediateSteps: { discountPoints, analysisPeriod }
        };
      }
      
      const totalPoints = discountPoints + originationPoints;
      const totalPointCost = totalPoints * pointCost;
      
      // Calculate annual savings
      const rateReduction = discountPoints * 0.0025;
      const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
      
      const monthlyRate = baseInterestRate / 12;
      const monthlyRateEffective = effectiveRate / 12;
      const totalPayments = loanTerm * 12;
      
      const monthlyPaymentBase = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const monthlyPaymentWithPoints = (loanAmount * monthlyRateEffective * Math.pow(1 + monthlyRateEffective, totalPayments)) / 
                                     (Math.pow(1 + monthlyRateEffective, totalPayments) - 1);
      
      const monthlyPaymentSavings = monthlyPaymentBase - monthlyPaymentWithPoints;
      const annualPaymentSavings = monthlyPaymentSavings * 12;
      
      // Calculate ROI over analysis period
      const totalSavingsOverPeriod = annualPaymentSavings * analysisPeriod;
      const roi = totalPointCost > 0 ? ((totalSavingsOverPeriod - totalPointCost) / totalPointCost) * 100 : 0;
      
      return {
        outputs: { roi: Math.round(roi * 10) / 10 },
        explanation: `ROI over ${analysisPeriod} years: ${roi.toFixed(1)}%`,
        intermediateSteps: { 
          annualPaymentSavings: Math.round(annualPaymentSavings),
          totalSavingsOverPeriod: Math.round(totalSavingsOverPeriod)
        }
      };
    }
  },
  
  {
    id: 'total-interest-savings',
    name: 'Total Interest Savings Calculation',
    description: 'Calculate total interest saved over the loan term from discount points',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const baseInterestRate = (inputs.baseInterestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const discountPoints = inputs.discountPoints || 0;
      
      if (discountPoints === 0) {
        return {
          outputs: { totalInterestSavings: 0 },
          explanation: 'No discount points purchased - no interest savings',
          intermediateSteps: { discountPoints, loanTerm }
        };
      }
      
      const monthlyRate = baseInterestRate / 12;
      const totalPayments = loanTerm * 12;
      
      if (monthlyRate === 0) {
        return {
          outputs: { totalInterestSavings: 0 },
          explanation: 'No interest rate means no interest savings',
          intermediateSteps: { monthlyRate, totalPayments }
        };
      }
      
      const monthlyPaymentBase = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const rateReduction = discountPoints * 0.0025;
      const effectiveRate = Math.max(0, baseInterestRate - rateReduction);
      const monthlyRateEffective = effectiveRate / 12;
      
      const monthlyPaymentWithPoints = (loanAmount * monthlyRateEffective * Math.pow(1 + monthlyRateEffective, totalPayments)) / 
                                     (Math.pow(1 + monthlyRateEffective, totalPayments) - 1);
      
      const totalInterestBase = (monthlyPaymentBase * totalPayments) - loanAmount;
      const totalInterestWithPoints = (monthlyPaymentWithPoints * totalPayments) - loanAmount;
      const totalInterestSavings = totalInterestBase - totalInterestWithPoints;
      
      return {
        outputs: { totalInterestSavings: Math.round(totalInterestSavings) },
        explanation: `Total interest saved: $${totalInterestSavings.toLocaleString()}`,
        intermediateSteps: { 
          totalInterestBase: Math.round(totalInterestBase),
          totalInterestWithPoints: Math.round(totalInterestWithPoints)
        }
      };
    }
  }
];