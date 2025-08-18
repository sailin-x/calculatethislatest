import { Formula, CalculationResult } from '../../../types/calculator';

export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  loanTerm: number; // in years
  interestRate: number; // annual percentage
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  propertyTax: number; // annual amount
  homeInsurance: number; // annual amount
  pmiRate?: number; // annual percentage
  hoaFees?: number; // monthly amount
  extraPayment?: number; // monthly extra payment
  zipCode?: string;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  pmi?: number;
}

/**
 * Industry-standard mortgage calculation formulas
 */
export class MortgageFormulas {
  
  /**
   * Calculate monthly mortgage payment using standard amortization formula
   */
  static calculateMonthlyPayment(
    principal: number,
    annualRate: number,
    termYears: number
  ): number {
    if (annualRate === 0) {
      return principal / (termYears * 12);
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = termYears * 12;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  /**
   * Calculate PMI based on loan type and LTV ratio
   */
  static calculatePMI(
    loanAmount: number,
    homeValue: number,
    loanType: string,
    customPMIRate?: number
  ): { monthlyPMI: number; pmiRate: number; removesAt: number } {
    const ltv = loanAmount / homeValue;
    
    // PMI rates by loan type and LTV
    let pmiRate = 0;
    let removesAt = 0.78; // Standard 78% LTV removal
    
    if (loanType === 'conventional') {
      if (ltv > 0.95) pmiRate = 0.85;
      else if (ltv > 0.90) pmiRate = 0.65;
      else if (ltv > 0.85) pmiRate = 0.45;
      else if (ltv > 0.80) pmiRate = 0.35;
      removesAt = 0.78;
    } else if (loanType === 'fha') {
      // FHA MIP rates (2024)
      if (ltv > 0.95) pmiRate = 0.85;
      else if (ltv > 0.90) pmiRate = 0.80;
      else pmiRate = 0.55;
      removesAt = loanAmount <= 625371 && ltv <= 0.90 ? 0.78 : 1.0; // Never removes for high LTV
    } else if (loanType === 'usda') {
      pmiRate = 0.35; // USDA guarantee fee
      removesAt = 0.80;
    }
    // VA and Jumbo typically don't have PMI
    
    if (customPMIRate) {
      pmiRate = customPMIRate;
    }
    
    const monthlyPMI = ltv > 0.80 ? (loanAmount * pmiRate / 100) / 12 : 0;
    
    return { monthlyPMI, pmiRate, removesAt };
  }

  /**
   * Generate complete amortization schedule with PMI
   */
  static generateAmortizationSchedule(inputs: MortgageInputs): AmortizationEntry[] {
    const loanAmount = inputs.homePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    const basePayment = this.calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);
    
    const pmiInfo = this.calculatePMI(loanAmount, inputs.homePrice, inputs.loanType, inputs.pmiRate);
    
    const schedule: AmortizationEntry[] = [];
    let balance = loanAmount;
    let totalInterest = 0;
    
    for (let month = 1; month <= numPayments && balance > 0.01; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = basePayment - interestPayment;
      
      // Add extra payment to principal
      if (inputs.extraPayment) {
        principalPayment += inputs.extraPayment;
      }
      
      // Don't pay more principal than remaining balance
      principalPayment = Math.min(principalPayment, balance);
      
      const actualPayment = principalPayment + interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;
      
      // Calculate PMI (removes when LTV reaches threshold)
      const currentLTV = balance / inputs.homePrice;
      const pmi = currentLTV > pmiInfo.removesAt ? pmiInfo.monthlyPMI : 0;
      
      schedule.push({
        month,
        payment: actualPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        totalInterest,
        pmi
      });
    }
    
    return schedule;
  }

  /**
   * Calculate total monthly housing payment (PITI + HOA)
   */
  static calculateTotalMonthlyPayment(inputs: MortgageInputs): {
    principalAndInterest: number;
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoa: number;
    total: number;
  } {
    const loanAmount = inputs.homePrice - inputs.downPayment;
    const principalAndInterest = this.calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.loanTerm);
    
    const propertyTax = inputs.propertyTax / 12;
    const homeInsurance = inputs.homeInsurance / 12;
    const pmi = this.calculatePMI(loanAmount, inputs.homePrice, inputs.loanType, inputs.pmiRate).monthlyPMI;
    const hoa = inputs.hoaFees || 0;
    
    const total = principalAndInterest + propertyTax + homeInsurance + pmi + hoa;
    
    return {
      principalAndInterest,
      propertyTax,
      homeInsurance,
      pmi,
      hoa,
      total
    };
  }

  /**
   * Calculate loan-to-value ratio
   */
  static calculateLTV(loanAmount: number, homeValue: number): number {
    return loanAmount / homeValue;
  }

  /**
   * Calculate total interest paid over life of loan
   */
  static calculateTotalInterest(inputs: MortgageInputs): number {
    const schedule = this.generateAmortizationSchedule(inputs);
    return schedule.reduce((total, entry) => total + entry.interest, 0);
  }

  /**
   * Calculate break-even point for refinancing
   */
  static calculateRefinanceBreakEven(
    currentBalance: number,
    currentRate: number,
    newRate: number,
    termYears: number,
    closingCosts: number
  ): {
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    breakEvenMonths: number;
    totalSavings: number;
  } {
    const currentPayment = this.calculateMonthlyPayment(currentBalance, currentRate, termYears);
    const newPayment = this.calculateMonthlyPayment(currentBalance, newRate, termYears);
    const monthlySavings = currentPayment - newPayment;
    
    const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : Infinity;
    const totalSavings = (monthlySavings * termYears * 12) - closingCosts;
    
    return {
      currentPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths,
      totalSavings
    };
  }

  /**
   * Calculate affordability based on debt-to-income ratio
   */
  static calculateAffordability(
    monthlyIncome: number,
    monthlyDebts: number,
    maxDTI: number = 0.43
  ): {
    maxMonthlyPayment: number;
    maxLoanAmount: number;
    recommendedDownPayment: number;
  } {
    const maxTotalDebt = monthlyIncome * maxDTI;
    const maxMonthlyPayment = maxTotalDebt - monthlyDebts;
    
    // Estimate loan amount (assuming 7% rate, 30 years, PITI ratio)
    const estimatedRate = 7.0;
    const estimatedTerm = 30;
    const pitiRatio = 0.75; // P&I is typically 75% of total PITI payment
    
    const maxPI = maxMonthlyPayment * pitiRatio;
    const maxLoanAmount = this.calculateLoanAmountFromPayment(maxPI, estimatedRate, estimatedTerm);
    
    const recommendedDownPayment = maxLoanAmount * 0.20; // 20% down
    
    return {
      maxMonthlyPayment,
      maxLoanAmount,
      recommendedDownPayment
    };
  }

  /**
   * Calculate loan amount from desired payment
   */
  static calculateLoanAmountFromPayment(
    monthlyPayment: number,
    annualRate: number,
    termYears: number
  ): number {
    if (annualRate === 0) {
      return monthlyPayment * termYears * 12;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = termYears * 12;
    
    return monthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) /
           (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
  }
}

/**
 * Main mortgage calculator formula
 */
export const mortgageCalculatorFormula: Formula = {
  id: 'mortgage-calculator',
  name: 'Comprehensive Mortgage Calculator',
  description: 'Industry-standard mortgage calculations with PMI, amortization, and advanced features',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const mortgageInputs = inputs as MortgageInputs;
    
    try {
      const loanAmount = mortgageInputs.homePrice - mortgageInputs.downPayment;
      const ltv = MortgageFormulas.calculateLTV(loanAmount, mortgageInputs.homePrice);
      const monthlyPayments = MortgageFormulas.calculateTotalMonthlyPayment(mortgageInputs);
      const totalInterest = MortgageFormulas.calculateTotalInterest(mortgageInputs);
      const amortizationSchedule = MortgageFormulas.generateAmortizationSchedule(mortgageInputs);
      
      // Calculate summary statistics
      const totalPayments = amortizationSchedule.reduce((sum, entry) => sum + entry.payment, 0);
      const totalPMI = amortizationSchedule.reduce((sum, entry) => sum + (entry.pmi || 0), 0);
      const payoffTime = amortizationSchedule.length;
      
      return {
        outputs: {
          loanAmount,
          monthlyPayment: monthlyPayments.total,
          principalAndInterest: monthlyPayments.principalAndInterest,
          propertyTax: monthlyPayments.propertyTax,
          homeInsurance: monthlyPayments.homeInsurance,
          pmi: monthlyPayments.pmi,
          hoaFees: monthlyPayments.hoa,
          loanToValue: ltv * 100,
          totalInterest,
          totalPayments,
          totalPMI,
          payoffTimeMonths: payoffTime,
          amortizationSchedule: amortizationSchedule.slice(0, 12) // First year for display
        },
        explanation: `Monthly payment of ${monthlyPayments.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} includes principal & interest (${monthlyPayments.principalAndInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}), property tax (${monthlyPayments.propertyTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}), insurance (${monthlyPayments.homeInsurance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}), and PMI (${monthlyPayments.pmi.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}). Total interest over ${mortgageInputs.loanTerm} years: ${totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`,
        intermediateSteps: {
          'Loan Amount': `$${mortgageInputs.homePrice.toLocaleString()} - $${mortgageInputs.downPayment.toLocaleString()} = $${loanAmount.toLocaleString()}`,
          'Loan-to-Value': `${loanAmount.toLocaleString()} ÷ ${mortgageInputs.homePrice.toLocaleString()} = ${(ltv * 100).toFixed(2)}%`,
          'Monthly Rate': `${mortgageInputs.interestRate}% ÷ 12 = ${(mortgageInputs.interestRate / 12).toFixed(4)}%`,
          'Number of Payments': `${mortgageInputs.loanTerm} years × 12 = ${mortgageInputs.loanTerm * 12} payments`
        }
      };
    } catch (error) {
      throw new Error(`Mortgage calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};