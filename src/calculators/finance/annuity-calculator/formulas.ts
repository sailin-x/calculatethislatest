import { Formula, CalculationResult } from '../../../types/calculator';
import { AnnuityCalculatorInputs, AnnuityCalculatorResults } from './types';

/**
 * Advanced annuity calculation formulas
 */
export class AnnuityFormulas {
  
  /**
   * Calculate immediate annuity payment
   */
  static calculateImmediateAnnuity(
    principal: number,
    rate: number,
    term: number,
    paymentFrequency: number
  ): { periodicPayment: number; totalPayments: number; totalInterest: number } {
    const r = rate / 100 / paymentFrequency;
    const n = term * paymentFrequency;
    
    if (r === 0) {
      const periodicPayment = principal / n;
      return {
        periodicPayment,
        totalPayments: periodicPayment * n,
        totalInterest: 0
      };
    }
    
    const periodicPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayments = periodicPayment * n;
    const totalInterest = totalPayments - principal;
    
    return { periodicPayment, totalPayments, totalInterest };
  }

  /**
   * Calculate deferred annuity
   */
  static calculateDeferredAnnuity(
    principal: number,
    accumulationRate: number,
    deferralPeriod: number,
    payoutRate: number,
    payoutTerm: number,
    paymentFrequency: number
  ): { accumulationValue: number; payoutValue: number; totalAccumulation: number; totalPayout: number } {
    // Accumulation phase
    const accumulationValue = principal * Math.pow(1 + accumulationRate / 100, deferralPeriod);
    
    // Payout phase
    const { periodicPayment, totalPayments } = this.calculateImmediateAnnuity(
      accumulationValue,
      payoutRate,
      payoutTerm,
      paymentFrequency
    );
    
    const totalAccumulation = accumulationValue - principal;
    const totalPayout = totalPayments - accumulationValue;
    
    return {
      accumulationValue,
      payoutValue: periodicPayment,
      totalAccumulation,
      totalPayout
    };
  }

  /**
   * Calculate variable annuity with Monte Carlo simulation
   */
  static calculateVariableAnnuity(
    principal: number,
    expectedReturn: number,
    volatility: number,
    term: number,
    paymentFrequency: number,
    samples: number = 10000
  ): { expectedValue: number; worstCase: number; bestCase: number; probabilityOfLoss: number } {
    const results: number[] = [];
    const annualReturn = expectedReturn / 100;
    const annualVol = volatility / 100;
    
    for (let i = 0; i < samples; i++) {
      let value = principal;
      
      for (let year = 0; year < term; year++) {
        // Generate random return using normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        
        const yearlyReturn = annualReturn + (annualVol * z);
        value *= (1 + yearlyReturn);
      }
      
      results.push(value);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const expectedValue = results.reduce((sum, val) => sum + val, 0) / samples;
    const worstCase = results[0];
    const bestCase = results[results.length - 1];
    const lossCount = results.filter(r => r < principal).length;
    const probabilityOfLoss = (lossCount / samples) * 100;
    
    return { expectedValue, worstCase, bestCase, probabilityOfLoss };
  }

  /**
   * Calculate present value of annuity
   */
  static calculatePresentValue(
    payment: number,
    rate: number,
    term: number,
    paymentFrequency: number
  ): number {
    const r = rate / 100 / paymentFrequency;
    const n = term * paymentFrequency;
    
    if (r === 0) {
      return payment * n;
    }
    
    return payment * ((1 - Math.pow(1 + r, -n)) / r);
  }

  /**
   * Calculate future value of annuity
   */
  static calculateFutureValue(
    payment: number,
    rate: number,
    term: number,
    paymentFrequency: number
  ): number {
    const r = rate / 100 / paymentFrequency;
    const n = term * paymentFrequency;
    
    if (r === 0) {
      return payment * n;
    }
    
    return payment * ((Math.pow(1 + r, n) - 1) / r);
  }

  /**
   * Calculate tax impact on annuity
   */
  static calculateTaxImpact(
    annuityValue: number,
    principal: number,
    taxRate: number
  ): { afterTaxValue: number; taxPaid: number; effectiveAfterTaxRate: number } {
    const gain = annuityValue - principal;
    const taxPaid = gain * (taxRate / 100);
    const afterTaxValue = annuityValue - taxPaid;
    const effectiveAfterTaxRate = ((afterTaxValue / principal) - 1) * 100;
    
    return { afterTaxValue, taxPaid, effectiveAfterTaxRate };
  }

  /**
   * Calculate inflation-adjusted annuity value
   */
  static calculateInflationAdjusted(
    annuityValue: number,
    inflationRate: number,
    term: number
  ): { realValue: number; purchasingPower: number; realReturn: number } {
    const realValue = annuityValue / Math.pow(1 + inflationRate / 100, term);
    const purchasingPower = realValue / annuityValue;
    const realReturn = ((realValue / annuityValue) - 1) * 100;
    
    return { realValue, purchasingPower, realReturn };
  }

  /**
   * Generate annuity payment schedule
   */
  static generatePaymentSchedule(
    principal: number,
    rate: number,
    term: number,
    paymentFrequency: number
  ): Array<{
    period: number;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
  }> {
    const schedule = [];
    const { periodicPayment } = this.calculateImmediateAnnuity(principal, rate, term, paymentFrequency);
    const r = rate / 100 / paymentFrequency;
    let balance = principal;
    
    for (let period = 1; period <= term * paymentFrequency; period++) {
      const interest = balance * r;
      const principalPayment = periodicPayment - interest;
      balance = Math.max(0, balance - principalPayment);
      
      schedule.push({
        period,
        payment: periodicPayment,
        interest,
        principal: principalPayment,
        balance
      });
    }
    
    return schedule;
  }

  /**
   * Calculate surrender charges
   */
  static calculateSurrenderCharges(
    surrenderValue: number,
    surrenderChargeSchedule: number[],
    yearsHeld: number
  ): number {
    if (yearsHeld >= surrenderChargeSchedule.length) {
      return 0;
    }
    
    const chargeRate = surrenderChargeSchedule[Math.floor(yearsHeld)];
    return surrenderValue * (chargeRate / 100);
  }

  /**
   * Compare annuity with alternative investments
   */
  static compareWithAlternatives(
    annuityValue: number,
    principal: number,
    term: number,
    bondRate: number = 3,
    stockReturn: number = 8
  ): { vsLumpSum: number; vsBondInvestment: number; vsStockInvestment: number; breakevenPeriod: number } {
    // Lump sum comparison
    const vsLumpSum = annuityValue - principal;
    
    // Bond investment comparison
    const bondValue = principal * Math.pow(1 + bondRate / 100, term);
    const vsBondInvestment = annuityValue - bondValue;
    
    // Stock investment comparison
    const stockValue = principal * Math.pow(1 + stockReturn / 100, term);
    const vsStockInvestment = annuityValue - stockValue;
    
    // Breakeven period
    const breakevenPeriod = Math.log(annuityValue / principal) / Math.log(1 + bondRate / 100);
    
    return { vsLumpSum, vsBondInvestment, vsStockInvestment, breakevenPeriod };
  }

  /**
   * Run Monte Carlo simulation for annuity
   */
  static runMonteCarloSimulation(
    inputs: AnnuityCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  } {
    const results: number[] = [];
    
    for (let i = 0; i < samples; i++) {
      let value = inputs.principal;
      
      if (inputs.annuityType === 'deferred' && inputs.deferralPeriod) {
        // Accumulation phase
        const accumulationRate = inputs.accumulationRate || inputs.annualRate;
        value = value * Math.pow(1 + accumulationRate / 100, inputs.deferralPeriod);
      }
      
      // Payout phase
      if (inputs.annuityType === 'variable' && inputs.expectedReturn && inputs.volatility) {
        const annualReturn = inputs.expectedReturn / 100;
        const annualVol = inputs.volatility / 100;
        
        for (let year = 0; year < inputs.term; year++) {
          const u1 = Math.random();
          const u2 = Math.random();
          const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          
          const yearlyReturn = annualReturn + (annualVol * z);
          value *= (1 + yearlyReturn);
        }
      } else {
        // Fixed annuity
        value = value * Math.pow(1 + inputs.annualRate / 100, inputs.term);
      }
      
      results.push(value);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * samples);
      return results[Math.min(index, samples - 1)];
    };
    
    const expectedValue = results.reduce((sum, val) => sum + val, 0) / samples;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - expectedValue, 2), 0) / samples;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      expectedValue,
      standardDeviation
    };
  }
}

/**
 * Main annuity calculator formula
 */
export const annuityCalculatorFormula: Formula = {
  id: 'annuity-calculator',
  name: 'Advanced Annuity Calculator',
  description: 'Comprehensive annuity calculations including immediate, deferred, fixed, and variable annuities with tax and inflation considerations',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const annuityInputs = inputs as AnnuityCalculatorInputs;
    
    try {
      const {
        annuityType,
        principal,
        annualRate,
        term,
        paymentFrequency,
        paymentMode,
        deferralPeriod,
        accumulationRate,
        expectedReturn,
        volatility,
        taxRate,
        includeTaxes,
        inflationRate,
        includeInflation,
        monteCarloSamples
      } = annuityInputs;

      // Basic annuity calculation
      let basicResult;
      if (annuityType === 'immediate') {
        basicResult = AnnuityFormulas.calculateImmediateAnnuity(
          principal, annualRate, term, paymentFrequency
        );
      } else if (annuityType === 'deferred' && deferralPeriod) {
        const deferredResult = AnnuityFormulas.calculateDeferredAnnuity(
          principal,
          accumulationRate || annualRate,
          deferralPeriod,
          annualRate,
          term,
          paymentFrequency
        );
        basicResult = {
          periodicPayment: deferredResult.payoutValue,
          totalPayments: deferredResult.totalPayout,
          totalInterest: deferredResult.totalAccumulation + deferredResult.totalPayout
        };
      } else {
        // Default to immediate annuity
        basicResult = AnnuityFormulas.calculateImmediateAnnuity(
          principal, annualRate, term, paymentFrequency
        );
      }

      // Calculate present and future values
      const presentValue = AnnuityFormulas.calculatePresentValue(
        basicResult.periodicPayment, annualRate, term, paymentFrequency
      );
      const futureValue = AnnuityFormulas.calculateFutureValue(
        basicResult.periodicPayment, annualRate, term, paymentFrequency
      );

      // Variable annuity calculations
      let variableResults = null;
      if (annuityType === 'variable' && expectedReturn && volatility) {
        variableResults = AnnuityFormulas.calculateVariableAnnuity(
          principal, expectedReturn, volatility, term, paymentFrequency, 5000
        );
      }

      // Tax analysis
      let taxAnalysis = null;
      if (includeTaxes) {
        const totalValue = annuityType === 'variable' && variableResults ? 
          variableResults.expectedValue : futureValue;
        taxAnalysis = AnnuityFormulas.calculateTaxImpact(totalValue, principal, taxRate);
      }

      // Inflation analysis
      let inflationAnalysis = null;
      if (includeInflation) {
        const totalValue = annuityType === 'variable' && variableResults ? 
          variableResults.expectedValue : futureValue;
        inflationAnalysis = AnnuityFormulas.calculateInflationAdjusted(
          totalValue, inflationRate, term
        );
      }

      // Generate payment schedule
      const paymentSchedule = AnnuityFormulas.generatePaymentSchedule(
        principal, annualRate, term, paymentFrequency
      );

      // Comparison analysis
      const comparison = AnnuityFormulas.compareWithAlternatives(
        futureValue, principal, term
      );

      // Monte Carlo simulation
      const monteCarloResults = AnnuityFormulas.runMonteCarloSimulation(
        annuityInputs, monteCarloSamples || 10000
      );

      // Risk analysis
      const riskAnalysis = {
        probabilityOfSuccess: 100 - (variableResults?.probabilityOfLoss || 0),
        worstCaseScenario: variableResults?.worstCase || futureValue * 0.8,
        bestCaseScenario: variableResults?.bestCase || futureValue * 1.2,
        medianScenario: monteCarloResults.percentile50,
        valueAtRisk: futureValue - monteCarloResults.percentile10
      };

      // Generate recommendations
      const recommendations = [];
      if (annuityType === 'variable' && variableResults?.probabilityOfLoss > 20) {
        recommendations.push('Consider fixed annuity for more predictable returns');
      }
      if (includeTaxes && taxAnalysis?.taxPaid > futureValue * 0.1) {
        recommendations.push('Consider tax-advantaged annuity options');
      }
      if (includeInflation && inflationAnalysis?.realReturn < 0) {
        recommendations.push('Consider inflation-protected annuity options');
      }

      const results: AnnuityCalculatorResults = {
        basicCalculation: {
          presentValue,
          futureValue,
          totalPayments: basicResult.totalPayments,
          totalInterest: basicResult.totalInterest,
          effectiveRate: ((futureValue / principal) - 1) * 100
        },
        paymentAnalysis: {
          periodicPayment: basicResult.periodicPayment,
          totalPayments: basicResult.totalPayments,
          interestEarned: basicResult.totalInterest,
          principalReturned: principal,
          paymentSchedule: paymentSchedule.slice(0, 12) // First year for display
        },
        variableResults,
        taxAnalysis,
        inflationAnalysis,
        riskAnalysis,
        comparison,
        summary: {
          totalValue: futureValue,
          totalCost: principal,
          netBenefit: futureValue - principal,
          annualizedReturn: ((futureValue / principal) - 1) * 100,
          keyRecommendations: recommendations
        },
        monteCarloResults
      };

      return {
        outputs: results,
        explanation: `Based on a ${annuityType} annuity with a principal of $${principal.toLocaleString()} at ${annualRate}% annual rate over ${term} years, you would receive $${basicResult.periodicPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} per payment period. The total value would be $${futureValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} with $${basicResult.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in interest earned.`,
        intermediateSteps: {
          'Principal Amount': `$${principal.toLocaleString()}`,
          'Annual Interest Rate': `${annualRate}%`,
          'Term': `${term} years`,
          'Payment Frequency': `${paymentFrequency} times per year`,
          'Periodic Payment': `$${basicResult.periodicPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          'Total Payments': `$${basicResult.totalPayments.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
        }
      };
    } catch (error) {
      throw new Error(`Annuity calculation failed: ${error}`);
    }
  }
};
