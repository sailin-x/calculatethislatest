import { Formula, CalculationResult } from '../../../types/calculator';

export interface CalculusInputs {
  operationType: 'derivative' | 'integral' | 'definiteIntegral' | 'limit' | 'series' | 'partialDerivative';
  functionExpression: string;
  variable: string;
  lowerBound?: number;
  upperBound?: number;
  limitPoint?: number;
  seriesCenter?: number;
  seriesTerms?: number;
}

export class CalculusFormulas {
  /**
   * Parse and evaluate mathematical expressions (simplified)
   */
  static parseExpression(expr: string): any {
    // This is a simplified parser - in practice would use a proper math parser
    return {
      type: 'polynomial',
      terms: this.extractPolynomialTerms(expr)
    };
  }

  /**
   * Extract polynomial terms from expression
   */
  static extractPolynomialTerms(expr: string): Array<{coefficient: number, power: number}> {
    // Simplified polynomial term extraction
    const terms: Array<{coefficient: number, power: number}> = [];
    
    // Handle basic polynomial patterns
    const patterns = [
      /([+-]?\d*\.?\d*)\*?x\^(\d+)/g,
      /([+-]?\d*\.?\d*)\*?x(?!\^)/g,
      /([+-]?\d+\.?\d*)(?![x\^])/g
    ];
    
    let match;
    
    // x^n terms
    while ((match = patterns[0].exec(expr)) !== null) {
      const coeff = match[1] === '' || match[1] === '+' ? 1 : 
                   match[1] === '-' ? -1 : parseFloat(match[1]);
      const power = parseInt(match[2]);
      terms.push({ coefficient: coeff, power });
    }
    
    // x terms (power 1)
    patterns[0].lastIndex = 0;
    while ((match = patterns[1].exec(expr)) !== null) {
      const coeff = match[1] === '' || match[1] === '+' ? 1 : 
                   match[1] === '-' ? -1 : parseFloat(match[1]);
      terms.push({ coefficient: coeff, power: 1 });
    }
    
    // constant terms
    patterns[1].lastIndex = 0;
    while ((match = patterns[2].exec(expr)) !== null) {
      const coeff = parseFloat(match[1]);
      terms.push({ coefficient: coeff, power: 0 });
    }
    
    return terms.sort((a, b) => b.power - a.power);
  }

  /**
   * Calculate derivative of polynomial
   */
  static calculateDerivative(terms: Array<{coefficient: number, power: number}>): Array<{coefficient: number, power: number}> {
    return terms
      .filter(term => term.power > 0)
      .map(term => ({
        coefficient: term.coefficient * term.power,
        power: term.power - 1
      }));
  }

  /**
   * Calculate integral of polynomial
   */
  static calculateIntegral(terms: Array<{coefficient: number, power: number}>): Array<{coefficient: number, power: number}> {
    return terms.map(term => ({
      coefficient: term.coefficient / (term.power + 1),
      power: term.power + 1
    }));
  }

  /**
   * Evaluate polynomial at given x
   */
  static evaluatePolynomial(terms: Array<{coefficient: number, power: number}>, x: number): number {
    return terms.reduce((sum, term) => {
      return sum + term.coefficient * Math.pow(x, term.power);
    }, 0);
  }

  /**
   * Calculate definite integral using numerical integration (trapezoidal rule)
   */
  static calculateDefiniteIntegral(
    terms: Array<{coefficient: number, power: number}>, 
    a: number, 
    b: number, 
    n: number = 1000
  ): number {
    const h = (b - a) / n;
    let sum = this.evaluatePolynomial(terms, a) + this.evaluatePolynomial(terms, b);
    
    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      sum += 2 * this.evaluatePolynomial(terms, x);
    }
    
    return (h / 2) * sum;
  }

  /**
   * Calculate limit (simplified for polynomials)
   */
  static calculateLimit(
    terms: Array<{coefficient: number, power: number}>, 
    point: number
  ): number | string {
    // For polynomials, limit is just evaluation at the point
    if (isFinite(point)) {
      return this.evaluatePolynomial(terms, point);
    }
    
    // Handle limits at infinity
    const highestPowerTerm = terms[0];
    if (point === Infinity) {
      return highestPowerTerm.coefficient > 0 ? Infinity : -Infinity;
    } else {
      return highestPowerTerm.coefficient > 0 ? -Infinity : Infinity;
    }
  }

  /**
   * Format polynomial terms as string
   */
  static formatPolynomial(terms: Array<{coefficient: number, power: number}>): string {
    if (terms.length === 0) return '0';
    
    return terms.map((term, index) => {
      let result = '';
      
      // Handle sign
      if (index === 0) {
        if (term.coefficient < 0) result += '-';
      } else {
        result += term.coefficient >= 0 ? ' + ' : ' - ';
      }
      
      // Handle coefficient
      const absCoeff = Math.abs(term.coefficient);
      if (absCoeff !== 1 || term.power === 0) {
        result += absCoeff.toString();
      }
      
      // Handle variable and power
      if (term.power > 0) {
        result += 'x';
        if (term.power > 1) {
          result += `^${term.power}`;
        }
      }
      
      return result;
    }).join('');
  }

  /**
   * Generate Taylor series expansion (simplified)
   */
  static generateTaylorSeries(
    terms: Array<{coefficient: number, power: number}>, 
    center: number, 
    numTerms: number
  ): string {
    // Simplified Taylor series for polynomials
    let series = '';
    let currentTerms = [...terms];
    
    for (let n = 0; n < numTerms && currentTerms.length > 0; n++) {
      const value = this.evaluatePolynomial(currentTerms, center);
      const factorial = this.factorial(n);
      
      if (n === 0) {
        series += value.toString();
      } else {
        const coeff = value / factorial;
        if (coeff !== 0) {
          series += ` + ${coeff}(x - ${center})^${n}`;
        }
      }
      
      // Calculate next derivative
      currentTerms = this.calculateDerivative(currentTerms);
    }
    
    return series || '0';
  }

  /**
   * Calculate factorial
   */
  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

export const calculusCalculatorFormula: Formula = {
  id: 'calculus-calculator',
  name: 'Advanced Calculus Calculator',
  description: 'Comprehensive calculus operations with step-by-step solutions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const calculusInputs = inputs as CalculusInputs;
    
    try {
      const terms = CalculusFormulas.extractPolynomialTerms(calculusInputs.functionExpression);
      let result = '';
      let stepByStep = '';
      
      switch (calculusInputs.operationType) {
        case 'derivative':
          const derivativeTerms = CalculusFormulas.calculateDerivative(terms);
          result = CalculusFormulas.formatPolynomial(derivativeTerms);
          stepByStep = `Original: ${CalculusFormulas.formatPolynomial(terms)}\nDerivative: ${result}`;
          break;
          
        case 'integral':
          const integralTerms = CalculusFormulas.calculateIntegral(terms);
          result = CalculusFormulas.formatPolynomial(integralTerms) + ' + C';
          stepByStep = `Original: ${CalculusFormulas.formatPolynomial(terms)}\nIntegral: ${result}`;
          break;
          
        case 'definiteIntegral':
          if (calculusInputs.lowerBound !== undefined && calculusInputs.upperBound !== undefined) {
            const definiteResult = CalculusFormulas.calculateDefiniteIntegral(
              terms, 
              calculusInputs.lowerBound, 
              calculusInputs.upperBound
            );
            result = definiteResult.toFixed(6);
            stepByStep = `∫[${calculusInputs.lowerBound} to ${calculusInputs.upperBound}] ${CalculusFormulas.formatPolynomial(terms)} dx = ${result}`;
          }
          break;
          
        case 'limit':
          if (calculusInputs.limitPoint !== undefined) {
            const limitResult = CalculusFormulas.calculateLimit(terms, calculusInputs.limitPoint);
            result = limitResult.toString();
            stepByStep = `lim(x→${calculusInputs.limitPoint}) ${CalculusFormulas.formatPolynomial(terms)} = ${result}`;
          }
          break;
          
        case 'series':
          const seriesResult = CalculusFormulas.generateTaylorSeries(
            terms, 
            calculusInputs.seriesCenter || 0, 
            calculusInputs.seriesTerms || 5
          );
          result = seriesResult;
          stepByStep = `Taylor series expansion around x = ${calculusInputs.seriesCenter || 0}:\n${result}`;
          break;
      }

      return {
        outputs: {
          result: result || 'Unable to calculate',
          stepByStep: stepByStep || 'No steps available'
        },
        explanation: `Performed ${calculusInputs.operationType} operation on ${calculusInputs.functionExpression}`,
        intermediateSteps: {
          'Operation': calculusInputs.operationType,
          'Function': calculusInputs.functionExpression,
          'Variable': calculusInputs.variable,
          'Result': result
        }
      };
    } catch (error) {
      throw new Error(`Calculus calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};