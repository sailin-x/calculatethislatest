import { Formula, CalculationResult } from '../../types/calculator';
import { dataService } from '../../../services/DataService';
import { dataVersioningService } from '../../../services/DataVersioningService';

export interface EnhancedMortgageInputs {
  homePrice: number;
  downPayment: number;
  downPaymentPercent?: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'custom';
  customInterestRate?: number;
  loanTerm: string;
  state: string;
  customPropertyTax?: number;
  customInsurance?: number;
  hoaFees?: number;
  extraPayment?: number;
  includeClosingCosts?: boolean;
}

export class EnhancedMortgageFormulas {
  /**
   * Get current interest rate for loan type
   */
  static async getCurrentInterestRate(loanType: string, customRate?: number): Promise<{
    rate: number;
    source: string;
    lastUpdated: Date;
    trend: string;
  }> {
    if (loanType === 'custom' && customRate) {
      return {
        rate: customRate,
        source: 'user-provided',
        lastUpdated: new Date(),
        trend: 'custom'
      };
    }

    try {
      const rateData = await dataService.getMortgageRates();
      
      let rate: number;
      switch (loanType) {
        case 'conventional':
          rate = rateData.conventional30;
          break;
        case 'fha':
          rate = rateData.fha30;
          break;
        case 'va':
          rate = rateData.va30;
          break;
        case 'jumbo':
          rate = rateData.jumbo30;
          break;
        case 'usda':
          rate = rateData.conventional30 - 0.25; // USDA typically 0.25% lower
          break;
        default:
          rate = rateData.conventional30;
      }

      // Simple trend analysis (would be more sophisticated in real implementation)
      const trend = rate > 7.0 ? 'rising' : rate < 6.0 ? 'falling' : 'stable';

      return {
        rate,
        source: 'market-data',
        lastUpdated: rateData.lastUpdated,
        trend
      };
    } catch (error) {
      console.warn('Failed to fetch current rates, using fallback:', error);
      
      // Fallback rates
      const fallbackRates = {
        conventional: 7.25,
        fha: 7.00,
        va: 6.95,
        jumbo: 7.45,
        usda: 7.00
      };

      return {
        rate: fallbackRates[loanType as keyof typeof fallbackRates] || 7.25,
        source: 'fallback',
        lastUpdated: new Date(),
        trend: 'unknown'
      };
    }
  }

  /**
   * Get regional property tax and insurance rates
   */
  static async getRegionalRates(state: string): Promise<{
    propertyTaxRate: number;
    insuranceRate: number;
    source: string;
  }> {
    try {
      const propertyTaxRate = await dataService.getRegionalData('propertyTaxRates', state);
      const insuranceRate = await dataService.getRegionalData('insuranceRates', state);

      return {
        propertyTaxRate,
        insuranceRate,
        source: 'regional-data'
      };
    } catch (error) {
      console.warn('Failed to fetch regional data, using defaults:', error);
      
      // Fallback to national averages
      return {
        propertyTaxRate: 0.0110,
        insuranceRate: 0.0040,
        source: 'fallback'
      };
    }
  }

  /**
   * Calculate monthly mortgage payment
   */
  static calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = termYears * 12;
    
    if (monthlyRate === 0) {
      return principal / numPayments;
    }
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  /**
   * Calculate PMI amount
   */
  static calculatePMI(loanAmount: number, homeValue: number, loanType: string): number {
    const ltvRatio = loanAmount / homeValue;
    
    // No PMI needed if LTV is 80% or less
    if (ltvRatio <= 0.80) {
      return 0;
    }

    // PMI rates vary by loan type and LTV
    let pmiRate: number;
    
    if (loanType === 'fha') {
      // FHA MIP rates
      if (ltvRatio > 0.95) {
        pmiRate = 0.0085; // 0.85%
      } else if (ltvRatio > 0.90) {
        pmiRate = 0.0080; // 0.80%
      } else {
        pmiRate = 0.0075; // 0.75%
      }
    } else {
      // Conventional PMI rates
      if (ltvRatio > 0.95) {
        pmiRate = 0.0070; // 0.70%
      } else if (ltvRatio > 0.90) {
        pmiRate = 0.0055; // 0.55%
      } else if (ltvRatio > 0.85) {
        pmiRate = 0.0045; // 0.45%
      } else {
        pmiRate = 0.0035; // 0.35%
      }
    }

    return (loanAmount * pmiRate) / 12;
  }

  /**
   * Calculate closing costs
   */
  static calculateClosingCosts(loanAmount: number, homePrice: number, state: string): number {
    // Base closing costs as percentage of loan amount
    let closingCostRate = 0.025; // 2.5% average
    
    // Adjust for high-cost states
    const highCostStates = ['CA', 'NY', 'NJ', 'CT', 'MA', 'HI'];
    if (highCostStates.includes(state)) {
      closingCostRate += 0.005; // Add 0.5%
    }

    // Add title insurance and other fees
    const titleInsurance = homePrice * 0.005; // 0.5% of home price
    const otherFees = 2500; // Fixed fees (appraisal, inspection, etc.)

    return (loanAmount * closingCostRate) + titleInsurance + otherFees;
  }

  /**
   * Calculate amortization with extra payments
   */
  static calculateAmortizationWithExtra(
    principal: number,
    annualRate: number,
    termYears: number,
    extraPayment: number = 0
  ): {
    payoffMonths: number;
    totalInterest: number;
    interestSaved: number;
  } {
    const monthlyRate = annualRate / 100 / 12;
    const regularPayment = this.calculateMonthlyPayment(principal, annualRate, termYears);
    
    let balance = principal;
    let totalInterest = 0;
    let months = 0;
    
    while (balance > 0.01 && months < termYears * 12 * 2) { // Safety limit
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(regularPayment - interestPayment + extraPayment, balance);
      
      totalInterest += interestPayment;
      balance -= principalPayment;
      months++;
    }

    // Calculate interest saved compared to regular payments
    const regularTotalInterest = (regularPayment * termYears * 12) - principal;
    const interestSaved = Math.max(0, regularTotalInterest - totalInterest);

    return {
      payoffMonths: months,
      totalInterest,
      interestSaved
    };
  }

  /**
   * Generate market insights
   */
  static generateMarketInsights(
    currentRate: number,
    trend: string,
    loanAmount: number,
    monthlyPayment: number
  ): {
    rateComparison: string;
    affordabilityTip: string;
    refinanceTip: string;
    marketTiming: string;
  } {
    const rateComparison = currentRate > 7.5 ? 
      'Current rates are above historical average' :
      currentRate < 6.0 ?
      'Current rates are below historical average' :
      'Current rates are near historical average';

    const affordabilityTip = monthlyPayment > loanAmount * 0.006 ?
      'Consider a larger down payment or longer term to reduce monthly payment' :
      'Your monthly payment is reasonable for this loan amount';

    const refinanceTip = currentRate > 7.0 ?
      'If rates drop by 0.5% or more, consider refinancing' :
      'Current rates are favorable for new purchases';

    const marketTiming = trend === 'rising' ?
      'Rates are trending upward - consider locking in soon' :
      trend === 'falling' ?
      'Rates are trending downward - you might wait for better rates' :
      'Rates are stable - good time to proceed with confidence';

    return {
      rateComparison,
      affordabilityTip,
      refinanceTip,
      marketTiming
    };
  }
}

export const enhancedMortgageCalculatorFormula: Formula = {
  id: 'enhanced-mortgage-calculator',
  name: 'Enhanced Mortgage Calculator with Live Data',
  description: 'Advanced mortgage calculations with real-time market data and regional information',
  calculate: async (inputs: Record<string, any>): Promise<CalculationResult> => {
    const mortgageInputs = inputs as EnhancedMortgageInputs;
    
    try {
      // Get current interest rate
      const rateInfo = await EnhancedMortgageFormulas.getCurrentInterestRate(
        mortgageInputs.loanType,
        mortgageInputs.customInterestRate
      );

      // Get regional rates
      const regionalRates = await EnhancedMortgageFormulas.getRegionalRates(mortgageInputs.state);

      // Calculate loan details
      const loanAmount = mortgageInputs.homePrice - mortgageInputs.downPayment;
      const termYears = parseInt(mortgageInputs.loanTerm);
      
      // Calculate payments
      const monthlyPayment = EnhancedMortgageFormulas.calculateMonthlyPayment(
        loanAmount,
        rateInfo.rate,
        termYears
      );

      // Calculate PMI
      const pmiAmount = EnhancedMortgageFormulas.calculatePMI(
        loanAmount,
        mortgageInputs.homePrice,
        mortgageInputs.loanType
      );

      // Calculate property tax and insurance
      const annualPropertyTax = mortgageInputs.customPropertyTax || 
        (mortgageInputs.homePrice * regionalRates.propertyTaxRate);
      const annualInsurance = mortgageInputs.customInsurance || 
        (mortgageInputs.homePrice * regionalRates.insuranceRate);

      const monthlyPropertyTax = annualPropertyTax / 12;
      const monthlyInsurance = annualInsurance / 12;
      const monthlyHOA = mortgageInputs.hoaFees || 0;

      // Total monthly payment
      const totalMonthlyPayment = monthlyPayment + pmiAmount + monthlyPropertyTax + 
        monthlyInsurance + monthlyHOA;

      // Calculate amortization
      const amortization = EnhancedMortgageFormulas.calculateAmortizationWithExtra(
        loanAmount,
        rateInfo.rate,
        termYears,
        mortgageInputs.extraPayment || 0
      );

      // Calculate closing costs
      const closingCosts = mortgageInputs.includeClosingCosts ?
        EnhancedMortgageFormulas.calculateClosingCosts(loanAmount, mortgageInputs.homePrice, mortgageInputs.state) :
        0;

      // Generate insights
      const insights = EnhancedMortgageFormulas.generateMarketInsights(
        rateInfo.rate,
        rateInfo.trend,
        loanAmount,
        monthlyPayment
      );

      // Calculate payoff dates
      const regularPayoffDate = new Date();
      regularPayoffDate.setMonth(regularPayoffDate.getMonth() + termYears * 12);
      
      const extraPayoffDate = new Date();
      extraPayoffDate.setMonth(extraPayoffDate.getMonth() + amortization.payoffMonths);

      // Store calculation for historical tracking
      const dataVersions = {
        'mortgage-rates': 'current', // Would be actual version ID in real implementation
        'regional-property-data': 'current'
      };

      try {
        dataVersioningService.storeCalculation(
          'enhanced-mortgage-calculator',
          mortgageInputs,
          {
            monthlyPayment,
            totalMonthlyPayment,
            currentInterestRate: rateInfo.rate,
            loanAmount
          },
          dataVersions
        );
      } catch (error) {
        console.warn('Failed to store calculation history:', error);
      }

      return {
        outputs: {
          monthlyPayment: Math.round(monthlyPayment),
          totalMonthlyPayment: Math.round(totalMonthlyPayment),
          currentInterestRate: rateInfo.rate,
          loanAmount,
          totalInterest: Math.round(amortization.totalInterest),
          totalCost: Math.round(loanAmount + amortization.totalInterest),
          pmiAmount: Math.round(pmiAmount),
          propertyTax: Math.round(monthlyPropertyTax),
          homeInsurance: Math.round(monthlyInsurance),
          closingCosts: Math.round(closingCosts),
          cashToClose: Math.round(mortgageInputs.downPayment + closingCosts),
          payoffDate: regularPayoffDate.toLocaleDateString(),
          payoffDateWithExtra: mortgageInputs.extraPayment ? 
            extraPayoffDate.toLocaleDateString() : 'N/A',
          interestSaved: Math.round(amortization.interestSaved),
          dataFreshness: `Rates updated: ${rateInfo.lastUpdated.toLocaleDateString()}`,
          marketTrend: `${rateInfo.trend} (${insights.marketTiming})`
        },
        explanation: `Monthly payment of $${Math.round(monthlyPayment)} based on current ${rateInfo.rate}% rate. Total monthly cost including taxes and insurance: $${Math.round(totalMonthlyPayment)}. ${insights.rateComparison}.`,
        intermediateSteps: {
          'Home Price': `$${mortgageInputs.homePrice.toLocaleString()}`,
          'Down Payment': `$${mortgageInputs.downPayment.toLocaleString()} (${((mortgageInputs.downPayment / mortgageInputs.homePrice) * 100).toFixed(1)}%)`,
          'Loan Amount': `$${loanAmount.toLocaleString()}`,
          'Interest Rate': `${rateInfo.rate}% (${rateInfo.source})`,
          'Loan Term': `${termYears} years`,
          'Property Tax Rate': `${(regionalRates.propertyTaxRate * 100).toFixed(2)}% (${mortgageInputs.state})`,
          'Insurance Rate': `${(regionalRates.insuranceRate * 100).toFixed(2)}% (${mortgageInputs.state})`,
          'PMI Required': pmiAmount > 0 ? `Yes ($${Math.round(pmiAmount)}/month)` : 'No',
          'Market Insight': insights.marketTiming
        },
        marketInsights: {
          rateComparison: insights.rateComparison,
          affordabilityTip: insights.affordabilityTip,
          refinanceTip: insights.refinanceTip,
          marketTiming: insights.marketTiming
        }
      };
    } catch (error) {
      throw new Error(`Enhanced mortgage calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};