import { Formula, CalculationResult } from '../../../types/calculator';

export interface ScientificInputs {
  calculationType: 'expression' | 'function' | 'conversion' | 'constants' | 'combinatorics' | 'sequences';
  expression?: string;
  functionType?: 'trigonometric' | 'hyperbolic' | 'logarithmic' | 'exponential' | 'gamma' | 'bessel';
  inputValue?: number;
  sourceBase?: string;
  targetBase?: string;
  numberToConvert?: string;
  precision: number;
  angleUnit: 'radians' | 'degrees' | 'gradians';
}

export class ScientificFormulas {
  // Mathematical constants with high precision
  static readonly CONSTANTS = {
    PI: 3.141592653589793238462643383279502884197,
    E: 2.718281828459045235360287471352662497757,
    GOLDEN_RATIO: 1.618033988749894848204586834365638117720,
    EULER_GAMMA: 0.577215664901532860606512090082402431042,
    SQRT_2: 1.414213562373095048801688724209698078570,
    SQRT_3: 1.732050807568877293527446341505872366943,
    LN_2: 0.693147180559945309417232121458176568076,
    LN_10: 2.302585092994045684017991454684364207601
  };

  /**
   * Convert angle units
   */
  static convertAngle(angle: number, from: string, to: string): number {
    // Convert to radians first
    let radians: number;
    switch (from) {
      case 'degrees':
        radians = angle * this.CONSTANTS.PI / 180;
        break;
      case 'gradians':
        radians = angle * this.CONSTANTS.PI / 200;
        break;
      default:
        radians = angle;
    }

    // Convert from radians to target unit
    switch (to) {
      case 'degrees':
        return radians * 180 / this.CONSTANTS.PI;
      case 'gradians':
        return radians * 200 / this.CONSTANTS.PI;
      default:
        return radians;
    }
  }

  /**
   * High-precision trigonometric functions
   */
  static sin(x: number): number {
    // Use Taylor series for high precision
    let result = 0;
    let term = x;
    let sign = 1;
    
    for (let n = 1; n <= 50; n += 2) {
      result += sign * term;
      term *= x * x / ((n + 1) * (n + 2));
      sign *= -1;
    }
    
    return result;
  }

  static cos(x: number): number {
    // Use Taylor series for high precision
    let result = 1;
    let term = 1;
    let sign = -1;
    
    for (let n = 2; n <= 50; n += 2) {
      term *= x * x / ((n - 1) * n);
      result += sign * term;
      sign *= -1;
    }
    
    return result;
  }

  static tan(x: number): number {
    const cosX = this.cos(x);
    if (Math.abs(cosX) < 1e-15) {
      throw new Error('Tangent undefined (division by zero)');
    }
    return this.sin(x) / cosX;
  }

  /**
   * Hyperbolic functions
   */
  static sinh(x: number): number {
    const expX = this.exp(x);
    const expNegX = this.exp(-x);
    return (expX - expNegX) / 2;
  }

  static cosh(x: number): number {
    const expX = this.exp(x);
    const expNegX = this.exp(-x);
    return (expX + expNegX) / 2;
  }

  static tanh(x: number): number {
    const expX = this.exp(x);
    const expNegX = this.exp(-x);
    return (expX - expNegX) / (expX + expNegX);
  }

  /**
   * High-precision exponential function
   */
  static exp(x: number): number {
    if (x === 0) return 1;
    
    // Use Taylor series
    let result = 1;
    let term = 1;
    
    for (let n = 1; n <= 100; n++) {
      term *= x / n;
      result += term;
      if (Math.abs(term) < 1e-15) break;
    }
    
    return result;
  }

  /**
   * High-precision natural logarithm
   */
  static ln(x: number): number {
    if (x <= 0) throw new Error('Logarithm undefined for non-positive numbers');
    if (x === 1) return 0;
    
    // Use series expansion for ln(1+u) where x = 1+u
    const u = x - 1;
    if (Math.abs(u) < 0.5) {
      let result = 0;
      let term = u;
      let sign = 1;
      
      for (let n = 1; n <= 100; n++) {
        result += sign * term / n;
        term *= u;
        sign *= -1;
        if (Math.abs(term / n) < 1e-15) break;
      }
      
      return result;
    } else {
      // Use built-in for values outside convergence range
      return Math.log(x);
    }
  }

  /**
   * Logarithm with arbitrary base
   */
  static log(x: number, base: number): number {
    return this.ln(x) / this.ln(base);
  }

  /**
   * Gamma function (simplified implementation)
   */
  static gamma(x: number): number {
    if (x < 0.5) {
      // Use reflection formula: Γ(z)Γ(1-z) = π/sin(πz)
      return this.CONSTANTS.PI / (this.sin(this.CONSTANTS.PI * x) * this.gamma(1 - x));
    }
    
    // Lanczos approximation
    const g = 7;
    const c = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];
    
    x -= 1;
    let a = c[0];
    for (let i = 1; i < g + 2; i++) {
      a += c[i] / (x + i);
    }
    
    const t = x + g + 0.5;
    const sqrt2pi = Math.sqrt(2 * this.CONSTANTS.PI);
    
    return sqrt2pi * Math.pow(t, x + 0.5) * this.exp(-t) * a;
  }

  /**
   * Factorial function
   */
  static factorial(n: number): number {
    if (n < 0) throw new Error('Factorial undefined for negative numbers');
    if (n === 0 || n === 1) return 1;
    if (n > 170) throw new Error('Factorial too large (overflow)');
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  /**
   * Combination (nCr)
   */
  static combination(n: number, r: number): number {
    if (r > n || r < 0) return 0;
    if (r === 0 || r === n) return 1;
    
    // Use multiplicative formula to avoid large factorials
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i) / (i + 1);
    }
    return Math.round(result);
  }

  /**
   * Permutation (nPr)
   */
  static permutation(n: number, r: number): number {
    if (r > n || r < 0) return 0;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i);
    }
    return result;
  }

  /**
   * Convert number between bases
   */
  static convertBase(number: string, fromBase: number, toBase: number): string {
    // Convert to decimal first
    let decimal = 0;
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Handle fractional part
    const parts = number.split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1] || '';
    
    // Convert integer part
    for (let i = 0; i < integerPart.length; i++) {
      const digit = digits.indexOf(integerPart[i].toUpperCase());
      if (digit >= fromBase) throw new Error('Invalid digit for base');
      decimal += digit * Math.pow(fromBase, integerPart.length - 1 - i);
    }
    
    // Convert fractional part
    for (let i = 0; i < fractionalPart.length; i++) {
      const digit = digits.indexOf(fractionalPart[i].toUpperCase());
      if (digit >= fromBase) throw new Error('Invalid digit for base');
      decimal += digit * Math.pow(fromBase, -(i + 1));
    }
    
    // Convert from decimal to target base
    if (toBase === 10) return decimal.toString();
    
    const integerDecimal = Math.floor(decimal);
    const fractionalDecimal = decimal - integerDecimal;
    
    // Convert integer part
    let integerResult = '';
    if (integerDecimal === 0) {
      integerResult = '0';
    } else {
      let temp = integerDecimal;
      while (temp > 0) {
        integerResult = digits[temp % toBase] + integerResult;
        temp = Math.floor(temp / toBase);
      }
    }
    
    // Convert fractional part
    let fractionalResult = '';
    if (fractionalDecimal > 0) {
      fractionalResult = '.';
      let temp = fractionalDecimal;
      let precision = 10; // Limit precision
      
      while (temp > 0 && precision > 0) {
        temp *= toBase;
        const digit = Math.floor(temp);
        fractionalResult += digits[digit];
        temp -= digit;
        precision--;
      }
    }
    
    return integerResult + fractionalResult;
  }

  /**
   * Parse and evaluate mathematical expressions (simplified)
   */
  static evaluateExpression(expr: string, angleUnit: string): number {
    // Replace constants
    let expression = expr
      .replace(/π|pi/gi, this.CONSTANTS.PI.toString())
      .replace(/e(?![a-z])/gi, this.CONSTANTS.E.toString())
      .replace(/φ|phi/gi, this.CONSTANTS.GOLDEN_RATIO.toString());
    
    // This is a simplified evaluator - in practice would use a proper parser
    try {
      // Handle basic trigonometric functions
      expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
        const angleValue = parseFloat(angle);
        const radians = this.convertAngle(angleValue, angleUnit, 'radians');
        return this.sin(radians).toString();
      });
      
      expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
        const angleValue = parseFloat(angle);
        const radians = this.convertAngle(angleValue, angleUnit, 'radians');
        return this.cos(radians).toString();
      });
      
      expression = expression.replace(/ln\(([^)]+)\)/g, (match, value) => {
        return this.ln(parseFloat(value)).toString();
      });
      
      // Use eval for basic arithmetic (in practice would use safer parser)
      return eval(expression);
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }

  /**
   * Convert to scientific notation
   */
  static toScientificNotation(number: number, precision: number): string {
    return number.toExponential(precision);
  }

  /**
   * Convert to fraction approximation
   */
  static toFraction(decimal: number, maxDenominator: number = 1000): string {
    if (decimal === 0) return '0';
    
    const sign = decimal < 0 ? '-' : '';
    decimal = Math.abs(decimal);
    
    let bestNumerator = 1;
    let bestDenominator = 1;
    let bestError = Math.abs(decimal - 1);
    
    for (let denominator = 1; denominator <= maxDenominator; denominator++) {
      const numerator = Math.round(decimal * denominator);
      const error = Math.abs(decimal - numerator / denominator);
      
      if (error < bestError) {
        bestNumerator = numerator;
        bestDenominator = denominator;
        bestError = error;
      }
      
      if (error < 1e-10) break;
    }
    
    if (bestDenominator === 1) {
      return sign + bestNumerator.toString();
    } else {
      return sign + bestNumerator + '/' + bestDenominator;
    }
  }
}

export const scientificCalculatorFormula: Formula = {
  id: 'scientific-calculator',
  name: 'Advanced Scientific Calculator',
  description: 'High-precision scientific calculations with advanced mathematical functions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const scientificInputs = inputs as ScientificInputs;
    
    try {
      let result: number = 0;
      let operationDescription = '';
      let steps: any = {};

      switch (scientificInputs.calculationType) {
        case 'expression':
          if (!scientificInputs.expression) throw new Error('Expression required');
          result = ScientificFormulas.evaluateExpression(
            scientificInputs.expression,
            scientificInputs.angleUnit
          );
          operationDescription = `Expression evaluation: ${scientificInputs.expression}`;
          steps['Expression'] = scientificInputs.expression;
          steps['Angle Unit'] = scientificInputs.angleUnit;
          break;

        case 'function':
          if (scientificInputs.inputValue === undefined) throw new Error('Input value required');
          const inputValue = scientificInputs.inputValue;
          
          switch (scientificInputs.functionType) {
            case 'trigonometric':
              const radians = ScientificFormulas.convertAngle(inputValue, scientificInputs.angleUnit, 'radians');
              result = ScientificFormulas.sin(radians);
              operationDescription = `sin(${inputValue}${scientificInputs.angleUnit === 'degrees' ? '°' : ' rad'})`;
              break;
            case 'logarithmic':
              result = ScientificFormulas.ln(inputValue);
              operationDescription = `ln(${inputValue})`;
              break;
            case 'exponential':
              result = ScientificFormulas.exp(inputValue);
              operationDescription = `e^${inputValue}`;
              break;
            case 'gamma':
              result = ScientificFormulas.gamma(inputValue);
              operationDescription = `Γ(${inputValue})`;
              break;
            default:
              result = inputValue;
              operationDescription = `Identity function: f(${inputValue}) = ${inputValue}`;
          }
          break;

        case 'conversion':
          if (!scientificInputs.numberToConvert || !scientificInputs.sourceBase || !scientificInputs.targetBase) {
            throw new Error('Number and bases required for conversion');
          }
          
          const converted = ScientificFormulas.convertBase(
            scientificInputs.numberToConvert,
            parseInt(scientificInputs.sourceBase),
            parseInt(scientificInputs.targetBase)
          );
          
          // For display purposes, convert to decimal for result
          result = parseFloat(ScientificFormulas.convertBase(
            scientificInputs.numberToConvert,
            parseInt(scientificInputs.sourceBase),
            10
          ));
          
          operationDescription = `Base conversion: ${scientificInputs.numberToConvert} (base ${scientificInputs.sourceBase}) to base ${scientificInputs.targetBase}`;
          steps['Original Number'] = scientificInputs.numberToConvert;
          steps['Source Base'] = scientificInputs.sourceBase;
          steps['Target Base'] = scientificInputs.targetBase;
          steps['Converted'] = converted;
          break;

        case 'constants':
          result = ScientificFormulas.CONSTANTS.PI;
          operationDescription = 'Mathematical constant: π';
          break;

        default:
          throw new Error(`Unknown calculation type: ${scientificInputs.calculationType}`);
      }

      const precision = scientificInputs.precision || 15;
      const formattedResult = result.toFixed(precision);
      const scientificNotation = ScientificFormulas.toScientificNotation(result, precision);
      const fractionApproximation = ScientificFormulas.toFraction(result);
      
      // Convert to other number systems
      const integerPart = Math.floor(Math.abs(result));
      const binaryRepresentation = integerPart.toString(2);
      const hexadecimalRepresentation = integerPart.toString(16).toUpperCase();

      return {
        outputs: {
          result: formattedResult,
          scientificNotation,
          binaryRepresentation: result >= 0 ? binaryRepresentation : '-' + binaryRepresentation,
          hexadecimalRepresentation: result >= 0 ? hexadecimalRepresentation : '-' + hexadecimalRepresentation,
          fractionApproximation,
          relatedConstants: 'π ≈ 3.14159, e ≈ 2.71828, φ ≈ 1.61803'
        },
        explanation: `${operationDescription}. Result: ${formattedResult}`,
        intermediateSteps: {
          'Calculation Type': scientificInputs.calculationType,
          'Precision': `${precision} decimal places`,
          'Operation': operationDescription,
          ...steps,
          'Final Result': formattedResult
        }
      };
    } catch (error) {
      throw new Error(`Scientific calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};