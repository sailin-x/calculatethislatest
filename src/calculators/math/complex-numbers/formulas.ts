import { Formula, CalculationResult } from '../../../types/calculator';

export interface ComplexNumberInputs {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'root' | 'conjugate' | 'modulus' | 'argument' | 'convert' | 'exponential' | 'logarithm';
  z1Real: number;
  z1Imaginary: number;
  z2Real?: number;
  z2Imaginary?: number;
  powerExponent?: number;
  inputFormat: 'rectangular' | 'polar';
  angleUnit: 'degrees' | 'radians';
}

export interface ComplexNumber {
  real: number;
  imaginary: number;
}

export interface PolarForm {
  modulus: number;
  argument: number; // in radians
}

export class ComplexNumberFormulas {
  /**
   * Convert degrees to radians
   */
  static degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  /**
   * Convert radians to degrees
   */
  static radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  /**
   * Convert polar to rectangular form
   */
  static polarToRectangular(modulus: number, argument: number): ComplexNumber {
    return {
      real: modulus * Math.cos(argument),
      imaginary: modulus * Math.sin(argument)
    };
  }

  /**
   * Convert rectangular to polar form
   */
  static rectangularToPolar(z: ComplexNumber): PolarForm {
    const modulus = Math.sqrt(z.real * z.real + z.imaginary * z.imaginary);
    let argument = Math.atan2(z.imaginary, z.real);
    
    // Ensure argument is in [0, 2π)
    if (argument < 0) {
      argument += 2 * Math.PI;
    }
    
    return { modulus, argument };
  }

  /**
   * Add two complex numbers
   */
  static add(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
    return {
      real: z1.real + z2.real,
      imaginary: z1.imaginary + z2.imaginary
    };
  }

  /**
   * Subtract two complex numbers
   */
  static subtract(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
    return {
      real: z1.real - z2.real,
      imaginary: z1.imaginary - z2.imaginary
    };
  }

  /**
   * Multiply two complex numbers
   */
  static multiply(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
    return {
      real: z1.real * z2.real - z1.imaginary * z2.imaginary,
      imaginary: z1.real * z2.imaginary + z1.imaginary * z2.real
    };
  }

  /**
   * Divide two complex numbers
   */
  static divide(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
    const denominator = z2.real * z2.real + z2.imaginary * z2.imaginary;
    
    if (denominator === 0) {
      throw new Error('Division by zero');
    }
    
    return {
      real: (z1.real * z2.real + z1.imaginary * z2.imaginary) / denominator,
      imaginary: (z1.imaginary * z2.real - z1.real * z2.imaginary) / denominator
    };
  }

  /**
   * Raise complex number to a power
   */
  static power(z: ComplexNumber, n: number): ComplexNumber {
    const polar = this.rectangularToPolar(z);
    const newModulus = Math.pow(polar.modulus, n);
    const newArgument = polar.argument * n;
    
    return this.polarToRectangular(newModulus, newArgument);
  }

  /**
   * Calculate nth roots of a complex number
   */
  static nthRoots(z: ComplexNumber, n: number): ComplexNumber[] {
    if (n <= 0) throw new Error('Root index must be positive');
    
    const polar = this.rectangularToPolar(z);
    const rootModulus = Math.pow(polar.modulus, 1 / n);
    const roots: ComplexNumber[] = [];
    
    for (let k = 0; k < n; k++) {
      const rootArgument = (polar.argument + 2 * Math.PI * k) / n;
      roots.push(this.polarToRectangular(rootModulus, rootArgument));
    }
    
    return roots;
  }

  /**
   * Calculate complex conjugate
   */
  static conjugate(z: ComplexNumber): ComplexNumber {
    return {
      real: z.real,
      imaginary: -z.imaginary
    };
  }

  /**
   * Calculate modulus (magnitude)
   */
  static modulus(z: ComplexNumber): number {
    return Math.sqrt(z.real * z.real + z.imaginary * z.imaginary);
  }

  /**
   * Calculate argument (phase angle)
   */
  static argument(z: ComplexNumber): number {
    return Math.atan2(z.imaginary, z.real);
  }

  /**
   * Calculate exponential of complex number
   */
  static exponential(z: ComplexNumber): ComplexNumber {
    const expReal = Math.exp(z.real);
    return {
      real: expReal * Math.cos(z.imaginary),
      imaginary: expReal * Math.sin(z.imaginary)
    };
  }

  /**
   * Calculate natural logarithm of complex number
   */
  static logarithm(z: ComplexNumber): ComplexNumber {
    const polar = this.rectangularToPolar(z);
    
    if (polar.modulus === 0) {
      throw new Error('Logarithm of zero is undefined');
    }
    
    return {
      real: Math.log(polar.modulus),
      imaginary: polar.argument
    };
  }

  /**
   * Format complex number as string
   */
  static formatRectangular(z: ComplexNumber, precision: number = 6): string {
    const real = Number(z.real.toFixed(precision));
    const imag = Number(z.imaginary.toFixed(precision));
    
    if (imag === 0) return real.toString();
    if (real === 0) return imag === 1 ? 'i' : imag === -1 ? '-i' : `${imag}i`;
    
    const imagPart = imag === 1 ? '+i' : imag === -1 ? '-i' : 
                    imag > 0 ? `+${imag}i` : `${imag}i`;
    
    return `${real}${imagPart}`;
  }

  /**
   * Format polar form as string
   */
  static formatPolar(polar: PolarForm, angleUnit: 'degrees' | 'radians', precision: number = 6): string {
    const modulus = Number(polar.modulus.toFixed(precision));
    const angle = angleUnit === 'degrees' ? 
      Number(this.radiansToDegrees(polar.argument).toFixed(precision)) :
      Number(polar.argument.toFixed(precision));
    
    const unit = angleUnit === 'degrees' ? '°' : ' rad';
    return `${modulus}∠${angle}${unit}`;
  }

  /**
   * Parse input based on format
   */
  static parseInput(
    real: number, 
    imaginary: number, 
    format: 'rectangular' | 'polar', 
    angleUnit: 'degrees' | 'radians'
  ): ComplexNumber {
    if (format === 'rectangular') {
      return { real, imaginary };
    } else {
      // Polar input: real = modulus, imaginary = argument
      const argument = angleUnit === 'degrees' ? 
        this.degreesToRadians(imaginary) : imaginary;
      return this.polarToRectangular(real, argument);
    }
  }
}

export const complexNumberCalculatorFormula: Formula = {
  id: 'complex-number-calculator',
  name: 'Advanced Complex Number Calculator',
  description: 'Comprehensive complex number operations with step-by-step solutions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const complexInputs = inputs as ComplexNumberInputs;
    
    try {
      // Parse input complex numbers
      const z1 = ComplexNumberFormulas.parseInput(
        complexInputs.z1Real,
        complexInputs.z1Imaginary,
        complexInputs.inputFormat,
        complexInputs.angleUnit
      );

      let z2: ComplexNumber | undefined;
      if (complexInputs.z2Real !== undefined && complexInputs.z2Imaginary !== undefined) {
        z2 = ComplexNumberFormulas.parseInput(
          complexInputs.z2Real,
          complexInputs.z2Imaginary,
          complexInputs.inputFormat,
          complexInputs.angleUnit
        );
      }

      let result: ComplexNumber;
      let allRoots: ComplexNumber[] = [];
      let operationDescription = '';

      // Perform the requested operation
      switch (complexInputs.operation) {
        case 'add':
          if (!z2) throw new Error('Second number required for addition');
          result = ComplexNumberFormulas.add(z1, z2);
          operationDescription = 'Addition: (a + bi) + (c + di) = (a + c) + (b + d)i';
          break;

        case 'subtract':
          if (!z2) throw new Error('Second number required for subtraction');
          result = ComplexNumberFormulas.subtract(z1, z2);
          operationDescription = 'Subtraction: (a + bi) - (c + di) = (a - c) + (b - d)i';
          break;

        case 'multiply':
          if (!z2) throw new Error('Second number required for multiplication');
          result = ComplexNumberFormulas.multiply(z1, z2);
          operationDescription = 'Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i';
          break;

        case 'divide':
          if (!z2) throw new Error('Second number required for division');
          result = ComplexNumberFormulas.divide(z1, z2);
          operationDescription = 'Division: z₁/z₂ = z₁ × conjugate(z₂) / |z₂|²';
          break;

        case 'power':
          if (complexInputs.powerExponent === undefined) throw new Error('Exponent required for power operation');
          result = ComplexNumberFormulas.power(z1, complexInputs.powerExponent);
          operationDescription = `Power: z^n using De Moivre's theorem: r^n∠(nθ)`;
          break;

        case 'root':
          if (complexInputs.powerExponent === undefined) throw new Error('Root index required for root operation');
          allRoots = ComplexNumberFormulas.nthRoots(z1, complexInputs.powerExponent);
          result = allRoots[0]; // Principal root
          operationDescription = `nth Root: ${complexInputs.powerExponent} roots using De Moivre's theorem`;
          break;

        case 'conjugate':
          result = ComplexNumberFormulas.conjugate(z1);
          operationDescription = 'Complex Conjugate: z* = a - bi';
          break;

        case 'modulus':
          const mod = ComplexNumberFormulas.modulus(z1);
          result = { real: mod, imaginary: 0 };
          operationDescription = 'Modulus: |z| = √(a² + b²)';
          break;

        case 'argument':
          const arg = ComplexNumberFormulas.argument(z1);
          result = { real: arg, imaginary: 0 };
          operationDescription = 'Argument: arg(z) = arctan(b/a)';
          break;

        case 'convert':
          result = z1; // Just return the parsed input for conversion display
          operationDescription = 'Format Conversion: Rectangular ↔ Polar';
          break;

        case 'exponential':
          result = ComplexNumberFormulas.exponential(z1);
          operationDescription = 'Exponential: e^z = e^a(cos(b) + i×sin(b))';
          break;

        case 'logarithm':
          result = ComplexNumberFormulas.logarithm(z1);
          operationDescription = 'Natural Logarithm: ln(z) = ln|z| + i×arg(z)';
          break;

        default:
          throw new Error(`Unknown operation: ${complexInputs.operation}`);
      }

      // Calculate additional properties
      const resultPolar = ComplexNumberFormulas.rectangularToPolar(result);
      const resultModulus = ComplexNumberFormulas.modulus(result);
      const resultArgument = ComplexNumberFormulas.argument(result);
      const resultConjugate = ComplexNumberFormulas.conjugate(result);

      // Format results
      const resultRectangular = ComplexNumberFormulas.formatRectangular(result);
      const resultPolarFormatted = ComplexNumberFormulas.formatPolar(resultPolar, complexInputs.angleUnit);
      const argumentFormatted = complexInputs.angleUnit === 'degrees' ? 
        `${ComplexNumberFormulas.radiansToDegrees(resultArgument).toFixed(6)}°` :
        `${resultArgument.toFixed(6)} rad`;
      const conjugateFormatted = ComplexNumberFormulas.formatRectangular(resultConjugate);

      // Format all roots if applicable
      const allRootsFormatted = allRoots.length > 0 ? 
        allRoots.map(root => ComplexNumberFormulas.formatRectangular(root)).join(', ') :
        'N/A';

      return {
        outputs: {
          resultRectangular,
          resultPolar: resultPolarFormatted,
          modulus: Number(resultModulus.toFixed(6)),
          argument: argumentFormatted,
          conjugate: conjugateFormatted,
          allRoots: allRootsFormatted
        },
        explanation: `${operationDescription}. Result: ${resultRectangular} = ${resultPolarFormatted}`,
        intermediateSteps: {
          'Operation': complexInputs.operation,
          'Input Format': complexInputs.inputFormat,
          'First Number': ComplexNumberFormulas.formatRectangular(z1),
          'Second Number': z2 ? ComplexNumberFormulas.formatRectangular(z2) : 'N/A',
          'Method': operationDescription,
          'Result (Rectangular)': resultRectangular,
          'Result (Polar)': resultPolarFormatted
        }
      };
    } catch (error) {
      throw new Error(`Complex number calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};