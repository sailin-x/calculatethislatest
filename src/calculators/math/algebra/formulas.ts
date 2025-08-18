import { Formula, CalculationResult } from '../../../types/calculator';

export interface AlgebraInputs {
  equationType: 'linear' | 'quadratic' | 'cubic' | 'polynomial' | 'system';
  coefficientA: number;
  coefficientB?: number;
  coefficientC?: number;
  coefficientD?: number;
  polynomialCoefficients?: number[];
  systemMatrix?: number[][];
  precision: number;
}

export interface ComplexNumber {
  real: number;
  imaginary: number;
}

export class AlgebraFormulas {
  /**
   * Solve linear equation ax + b = 0
   */
  static solveLinear(a: number, b: number = 0): number[] {
    if (a === 0) {
      if (b === 0) throw new Error('Infinite solutions (0 = 0)');
      throw new Error('No solution (contradiction)');
    }
    return [-b / a];
  }

  /**
   * Solve quadratic equation ax² + bx + c = 0
   */
  static solveQuadratic(a: number, b: number = 0, c: number = 0): {
    solutions: ComplexNumber[];
    discriminant: number;
    vertex: { x: number; y: number };
    axisOfSymmetry: number;
  } {
    if (a === 0) {
      const linearSolutions = this.solveLinear(b, c);
      return {
        solutions: linearSolutions.map(x => ({ real: x, imaginary: 0 })),
        discriminant: 0,
        vertex: { x: 0, y: c },
        axisOfSymmetry: 0
      };
    }

    const discriminant = b * b - 4 * a * c;
    const vertex = {
      x: -b / (2 * a),
      y: (4 * a * c - b * b) / (4 * a)
    };
    const axisOfSymmetry = -b / (2 * a);

    let solutions: ComplexNumber[];
    
    if (discriminant >= 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      solutions = [
        { real: (-b + sqrtDiscriminant) / (2 * a), imaginary: 0 },
        { real: (-b - sqrtDiscriminant) / (2 * a), imaginary: 0 }
      ];
    } else {
      const sqrtNegDiscriminant = Math.sqrt(-discriminant);
      solutions = [
        { real: -b / (2 * a), imaginary: sqrtNegDiscriminant / (2 * a) },
        { real: -b / (2 * a), imaginary: -sqrtNegDiscriminant / (2 * a) }
      ];
    }

    return { solutions, discriminant, vertex, axisOfSymmetry };
  }

  /**
   * Solve cubic equation ax³ + bx² + cx + d = 0 using Cardano's method
   */
  static solveCubic(a: number, b: number = 0, c: number = 0, d: number = 0): ComplexNumber[] {
    if (a === 0) {
      const quadResult = this.solveQuadratic(b, c, d);
      return quadResult.solutions;
    }

    // Convert to depressed cubic t³ + pt + q = 0
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

    const discriminant = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

    let solutions: ComplexNumber[];

    if (discriminant > 0) {
      // One real root
      const sqrtD = Math.sqrt(discriminant);
      const u = Math.cbrt(-q / 2 + sqrtD);
      const v = Math.cbrt(-q / 2 - sqrtD);
      const t1 = u + v;
      
      solutions = [
        { real: t1 - b / (3 * a), imaginary: 0 },
        { 
          real: -(t1) / 2 - b / (3 * a), 
          imaginary: Math.sqrt(3) * (u - v) / 2 
        },
        { 
          real: -(t1) / 2 - b / (3 * a), 
          imaginary: -Math.sqrt(3) * (u - v) / 2 
        }
      ];
    } else if (discriminant === 0) {
      // Three real roots, at least two equal
      const t1 = 3 * q / p;
      const t2 = -3 * q / (2 * p);
      
      solutions = [
        { real: t1 - b / (3 * a), imaginary: 0 },
        { real: t2 - b / (3 * a), imaginary: 0 },
        { real: t2 - b / (3 * a), imaginary: 0 }
      ];
    } else {
      // Three distinct real roots
      const rho = Math.sqrt(-(p / 3) * (p / 3) * (p / 3));
      const theta = Math.acos(-q / (2 * rho));
      
      solutions = [
        { real: 2 * Math.cbrt(rho) * Math.cos(theta / 3) - b / (3 * a), imaginary: 0 },
        { real: 2 * Math.cbrt(rho) * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a), imaginary: 0 },
        { real: 2 * Math.cbrt(rho) * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a), imaginary: 0 }
      ];
    }

    return solutions;
  }

  /**
   * Find polynomial roots using numerical methods
   */
  static solvePolynomial(coefficients: number[]): ComplexNumber[] {
    if (coefficients.length === 0) throw new Error('No coefficients provided');
    if (coefficients.length === 1) throw new Error('Constant polynomial has no roots');
    
    // Remove leading zeros
    while (coefficients.length > 1 && coefficients[0] === 0) {
      coefficients.shift();
    }

    const degree = coefficients.length - 1;
    
    if (degree === 1) {
      const roots = this.solveLinear(coefficients[0], coefficients[1]);
      return roots.map(r => ({ real: r, imaginary: 0 }));
    }
    
    if (degree === 2) {
      const result = this.solveQuadratic(coefficients[0], coefficients[1], coefficients[2]);
      return result.solutions;
    }
    
    if (degree === 3) {
      return this.solveCubic(coefficients[0], coefficients[1], coefficients[2], coefficients[3]);
    }

    // For higher degree polynomials, use numerical methods (simplified)
    return this.numericalRootFinding(coefficients);
  }

  /**
   * Numerical root finding for higher degree polynomials
   */
  static numericalRootFinding(coefficients: number[]): ComplexNumber[] {
    // Simplified numerical method - in practice would use more sophisticated algorithms
    const roots: ComplexNumber[] = [];
    const degree = coefficients.length - 1;
    
    // Use Newton's method to find real roots
    for (let i = 0; i < degree; i++) {
      let x = Math.random() * 10 - 5; // Random starting point
      
      for (let iter = 0; iter < 100; iter++) {
        const fx = this.evaluatePolynomial(coefficients, x);
        const fpx = this.evaluatePolynomialDerivative(coefficients, x);
        
        if (Math.abs(fpx) < 1e-10) break;
        
        const newX = x - fx / fpx;
        if (Math.abs(newX - x) < 1e-10) {
          roots.push({ real: newX, imaginary: 0 });
          break;
        }
        x = newX;
      }
    }
    
    return roots.slice(0, degree);
  }

  /**
   * Evaluate polynomial at given x
   */
  static evaluatePolynomial(coefficients: number[], x: number): number {
    let result = 0;
    for (let i = 0; i < coefficients.length; i++) {
      result += coefficients[i] * Math.pow(x, coefficients.length - 1 - i);
    }
    return result;
  }

  /**
   * Evaluate polynomial derivative at given x
   */
  static evaluatePolynomialDerivative(coefficients: number[], x: number): number {
    let result = 0;
    for (let i = 0; i < coefficients.length - 1; i++) {
      const power = coefficients.length - 1 - i;
      result += coefficients[i] * power * Math.pow(x, power - 1);
    }
    return result;
  }

  /**
   * Solve system of linear equations using Gaussian elimination
   */
  static solveLinearSystem(matrix: number[][]): number[] {
    const n = matrix.length;
    const augmented = matrix.map(row => [...row]);

    // Forward elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      
      // Swap rows
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
      
      // Make all rows below this one 0 in current column
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j <= n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }

    // Back substitution
    const solution = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = augmented[i][n];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= augmented[i][j] * solution[j];
      }
      solution[i] /= augmented[i][i];
    }

    return solution;
  }

  /**
   * Factor quadratic polynomial
   */
  static factorQuadratic(a: number, b: number, c: number): string {
    const result = this.solveQuadratic(a, b, c);
    
    if (result.solutions.every(s => s.imaginary === 0)) {
      const r1 = result.solutions[0].real;
      const r2 = result.solutions[1].real;
      
      if (a === 1) {
        return `(x - ${r1})(x - ${r2})`;
      } else {
        return `${a}(x - ${r1})(x - ${r2})`;
      }
    }
    
    return 'Cannot factor over real numbers';
  }

  /**
   * Format complex number as string
   */
  static formatComplexNumber(complex: ComplexNumber, precision: number): string {
    const real = Number(complex.real.toFixed(precision));
    const imag = Number(complex.imaginary.toFixed(precision));
    
    if (imag === 0) return real.toString();
    if (real === 0) return `${imag}i`;
    
    const imagPart = imag > 0 ? `+${imag}i` : `${imag}i`;
    return `${real}${imagPart}`;
  }
}

export const algebraCalculatorFormula: Formula = {
  id: 'algebra-calculator',
  name: 'Advanced Algebra Calculator',
  description: 'Comprehensive algebraic equation solver with step-by-step solutions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const algebraInputs = inputs as AlgebraInputs;
    
    try {
      const precision = algebraInputs.precision || 6;
      let solutions: ComplexNumber[] = [];
      let additionalInfo: any = {};
      
      switch (algebraInputs.equationType) {
        case 'linear':
          const linearRoots = AlgebraFormulas.solveLinear(
            algebraInputs.coefficientA,
            algebraInputs.coefficientB || 0
          );
          solutions = linearRoots.map(r => ({ real: r, imaginary: 0 }));
          break;
          
        case 'quadratic':
          const quadResult = AlgebraFormulas.solveQuadratic(
            algebraInputs.coefficientA,
            algebraInputs.coefficientB || 0,
            algebraInputs.coefficientC || 0
          );
          solutions = quadResult.solutions;
          additionalInfo = {
            discriminant: quadResult.discriminant,
            vertex: `(${quadResult.vertex.x.toFixed(precision)}, ${quadResult.vertex.y.toFixed(precision)})`,
            axisOfSymmetry: `x = ${quadResult.axisOfSymmetry.toFixed(precision)}`,
            factorization: AlgebraFormulas.factorQuadratic(
              algebraInputs.coefficientA,
              algebraInputs.coefficientB || 0,
              algebraInputs.coefficientC || 0
            )
          };
          break;
          
        case 'cubic':
          solutions = AlgebraFormulas.solveCubic(
            algebraInputs.coefficientA,
            algebraInputs.coefficientB || 0,
            algebraInputs.coefficientC || 0,
            algebraInputs.coefficientD || 0
          );
          break;
          
        case 'polynomial':
          if (algebraInputs.polynomialCoefficients) {
            solutions = AlgebraFormulas.solvePolynomial(algebraInputs.polynomialCoefficients);
          }
          break;
          
        case 'system':
          if (algebraInputs.systemMatrix) {
            const systemSolution = AlgebraFormulas.solveLinearSystem(algebraInputs.systemMatrix);
            solutions = systemSolution.map(s => ({ real: s, imaginary: 0 }));
          }
          break;
      }

      const realSolutions = solutions.filter(s => Math.abs(s.imaginary) < 1e-10);
      const complexSolutions = solutions.filter(s => Math.abs(s.imaginary) >= 1e-10);
      
      const solutionsText = solutions.map(s => 
        AlgebraFormulas.formatComplexNumber(s, precision)
      ).join(', ');
      
      const realSolutionsText = realSolutions.map(s => 
        s.real.toFixed(precision)
      ).join(', ');
      
      const complexSolutionsText = complexSolutions.map(s => 
        AlgebraFormulas.formatComplexNumber(s, precision)
      ).join(', ');

      return {
        outputs: {
          solutions: solutionsText || 'No solutions found',
          realSolutions: realSolutionsText || 'No real solutions',
          complexSolutions: complexSolutionsText || 'No complex solutions',
          ...additionalInfo,
          domain: 'All real numbers',
          range: algebraInputs.equationType === 'quadratic' ? 
            `y ≥ ${additionalInfo.vertex?.split(',')[1]?.replace(')', '').trim()}` : 'All real numbers',
          yIntercept: algebraInputs.coefficientC || 0,
          xIntercepts: realSolutionsText || 'None'
        },
        explanation: `Solved ${algebraInputs.equationType} equation with ${solutions.length} solution(s). ${realSolutions.length} real solution(s) and ${complexSolutions.length} complex solution(s) found.`,
        intermediateSteps: {
          'Equation Type': algebraInputs.equationType,
          'Coefficients': `a=${algebraInputs.coefficientA}, b=${algebraInputs.coefficientB || 0}, c=${algebraInputs.coefficientC || 0}`,
          'Solution Method': algebraInputs.equationType === 'quadratic' ? 'Quadratic Formula' : 
                           algebraInputs.equationType === 'cubic' ? 'Cardano\'s Method' : 
                           'Direct Solution',
          'Number of Solutions': solutions.length.toString()
        }
      };
    } catch (error) {
      throw new Error(`Algebra calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};