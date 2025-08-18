import { Formula, CalculationResult } from '../../../types/calculator';

export interface MatrixInputs {
  operation: 'add' | 'subtract' | 'multiply' | 'scalar_multiply' | 'transpose' | 'determinant' | 'inverse' | 'rank' | 'trace' | 'eigenvalues' | 'eigenvectors' | 'lu_decomposition' | 'solve_system';
  matrixARows: number;
  matrixACols: number;
  matrixAElements: number[];
  matrixBRows?: number;
  matrixBCols?: number;
  matrixBElements?: number[];
  scalarValue?: number;
  vectorB?: number[];
}

export type Matrix = number[][];

export class MatrixFormulas {
  /**
   * Convert flat array to matrix
   */
  static arrayToMatrix(elements: number[], rows: number, cols: number): Matrix {
    const matrix: Matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = elements[i * cols + j];
      }
    }
    return matrix;
  }

  /**
   * Convert matrix to flat array
   */
  static matrixToArray(matrix: Matrix): number[] {
    const result: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        result.push(matrix[i][j]);
      }
    }
    return result;
  }

  /**
   * Format matrix as string
   */
  static formatMatrix(matrix: Matrix, precision: number = 6): string {
    return '[' + matrix.map(row => 
      '[' + row.map(val => Number(val.toFixed(precision))).join(', ') + ']'
    ).join(', ') + ']';
  }

  /**
   * Add two matrices
   */
  static add(A: Matrix, B: Matrix): Matrix {
    if (A.length !== B.length || A[0].length !== B[0].length) {
      throw new Error('Matrices must have the same dimensions for addition');
    }

    const result: Matrix = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < A[i].length; j++) {
        result[i][j] = A[i][j] + B[i][j];
      }
    }
    return result;
  }

  /**
   * Subtract two matrices
   */
  static subtract(A: Matrix, B: Matrix): Matrix {
    if (A.length !== B.length || A[0].length !== B[0].length) {
      throw new Error('Matrices must have the same dimensions for subtraction');
    }

    const result: Matrix = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < A[i].length; j++) {
        result[i][j] = A[i][j] - B[i][j];
      }
    }
    return result;
  }

  /**
   * Multiply two matrices
   */
  static multiply(A: Matrix, B: Matrix): Matrix {
    if (A[0].length !== B.length) {
      throw new Error('Number of columns in A must equal number of rows in B');
    }

    const result: Matrix = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < B[0].length; j++) {
        result[i][j] = 0;
        for (let k = 0; k < A[0].length; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  }

  /**
   * Multiply matrix by scalar
   */
  static scalarMultiply(A: Matrix, scalar: number): Matrix {
    const result: Matrix = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < A[i].length; j++) {
        result[i][j] = A[i][j] * scalar;
      }
    }
    return result;
  }

  /**
   * Transpose matrix
   */
  static transpose(A: Matrix): Matrix {
    const result: Matrix = [];
    for (let j = 0; j < A[0].length; j++) {
      result[j] = [];
      for (let i = 0; i < A.length; i++) {
        result[j][i] = A[i][j];
      }
    }
    return result;
  }

  /**
   * Calculate determinant using cofactor expansion
   */
  static determinant(A: Matrix): number {
    const n = A.length;
    if (n !== A[0].length) {
      throw new Error('Matrix must be square to calculate determinant');
    }

    if (n === 1) return A[0][0];
    if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];

    let det = 0;
    for (let j = 0; j < n; j++) {
      const minor = this.getMinor(A, 0, j);
      det += Math.pow(-1, j) * A[0][j] * this.determinant(minor);
    }
    return det;
  }

  /**
   * Get minor matrix (remove row i and column j)
   */
  static getMinor(A: Matrix, row: number, col: number): Matrix {
    const minor: Matrix = [];
    for (let i = 0; i < A.length; i++) {
      if (i === row) continue;
      const newRow: number[] = [];
      for (let j = 0; j < A[i].length; j++) {
        if (j === col) continue;
        newRow.push(A[i][j]);
      }
      minor.push(newRow);
    }
    return minor;
  }

  /**
   * Calculate matrix inverse using Gauss-Jordan elimination
   */
  static inverse(A: Matrix): Matrix {
    const n = A.length;
    if (n !== A[0].length) {
      throw new Error('Matrix must be square to calculate inverse');
    }

    const det = this.determinant(A);
    if (Math.abs(det) < 1e-10) {
      throw new Error('Matrix is singular (not invertible)');
    }

    // Create augmented matrix [A | I]
    const augmented: Matrix = [];
    for (let i = 0; i < n; i++) {
      augmented[i] = [...A[i]];
      for (let j = 0; j < n; j++) {
        augmented[i].push(i === j ? 1 : 0);
      }
    }

    // Gauss-Jordan elimination
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

      // Make diagonal element 1
      const pivot = augmented[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      // Eliminate column
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    // Extract inverse matrix
    const inverse: Matrix = [];
    for (let i = 0; i < n; i++) {
      inverse[i] = augmented[i].slice(n);
    }

    return inverse;
  }

  /**
   * Calculate matrix rank using Gaussian elimination
   */
  static rank(A: Matrix): number {
    const matrix = A.map(row => [...row]); // Copy matrix
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rank = 0;

    for (let col = 0; col < cols && rank < rows; col++) {
      // Find pivot
      let pivotRow = -1;
      for (let row = rank; row < rows; row++) {
        if (Math.abs(matrix[row][col]) > 1e-10) {
          pivotRow = row;
          break;
        }
      }

      if (pivotRow === -1) continue; // No pivot found

      // Swap rows
      if (pivotRow !== rank) {
        [matrix[rank], matrix[pivotRow]] = [matrix[pivotRow], matrix[rank]];
      }

      // Eliminate below pivot
      for (let row = rank + 1; row < rows; row++) {
        const factor = matrix[row][col] / matrix[rank][col];
        for (let c = col; c < cols; c++) {
          matrix[row][c] -= factor * matrix[rank][c];
        }
      }

      rank++;
    }

    return rank;
  }

  /**
   * Calculate matrix trace (sum of diagonal elements)
   */
  static trace(A: Matrix): number {
    if (A.length !== A[0].length) {
      throw new Error('Matrix must be square to calculate trace');
    }

    let trace = 0;
    for (let i = 0; i < A.length; i++) {
      trace += A[i][i];
    }
    return trace;
  }

  /**
   * Calculate eigenvalues (simplified for 2x2 matrices)
   */
  static eigenvalues(A: Matrix): number[] {
    if (A.length !== A[0].length) {
      throw new Error('Matrix must be square to calculate eigenvalues');
    }

    const n = A.length;
    
    if (n === 1) {
      return [A[0][0]];
    }
    
    if (n === 2) {
      // For 2x2 matrix: λ² - tr(A)λ + det(A) = 0
      const trace = this.trace(A);
      const det = this.determinant(A);
      const discriminant = trace * trace - 4 * det;
      
      if (discriminant >= 0) {
        const sqrt_disc = Math.sqrt(discriminant);
        return [
          (trace + sqrt_disc) / 2,
          (trace - sqrt_disc) / 2
        ];
      } else {
        // Complex eigenvalues - return real parts
        return [trace / 2, trace / 2];
      }
    }

    // For larger matrices, use power iteration (simplified)
    return this.powerIteration(A);
  }

  /**
   * Power iteration for dominant eigenvalue (simplified)
   */
  static powerIteration(A: Matrix): number[] {
    const n = A.length;
    let v = Array(n).fill(1); // Initial vector
    
    for (let iter = 0; iter < 100; iter++) {
      // Multiply A * v
      const Av = Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          Av[i] += A[i][j] * v[j];
        }
      }
      
      // Normalize
      const norm = Math.sqrt(Av.reduce((sum, val) => sum + val * val, 0));
      v = Av.map(val => val / norm);
    }
    
    // Calculate eigenvalue: λ = v^T * A * v
    const Av = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        Av[i] += A[i][j] * v[j];
      }
    }
    
    const eigenvalue = v.reduce((sum, vi, i) => sum + vi * Av[i], 0);
    return [eigenvalue]; // Return dominant eigenvalue
  }

  /**
   * Solve linear system Ax = b using Gaussian elimination
   */
  static solveSystem(A: Matrix, b: number[]): number[] {
    const n = A.length;
    if (n !== A[0].length) {
      throw new Error('Coefficient matrix must be square');
    }
    if (b.length !== n) {
      throw new Error('Vector b must have same length as matrix dimension');
    }

    // Create augmented matrix
    const augmented: Matrix = [];
    for (let i = 0; i < n; i++) {
      augmented[i] = [...A[i], b[i]];
    }

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

      // Check for singular matrix
      if (Math.abs(augmented[i][i]) < 1e-10) {
        throw new Error('Matrix is singular - no unique solution');
      }

      // Eliminate below pivot
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j <= n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }

    // Back substitution
    const solution = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = augmented[i][n];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= augmented[i][j] * solution[j];
      }
      solution[i] /= augmented[i][i];
    }

    return solution;
  }
}

export const matrixCalculatorFormula: Formula = {
  id: 'matrix-calculator',
  name: 'Advanced Matrix Calculator',
  description: 'Comprehensive matrix operations with step-by-step solutions',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const matrixInputs = inputs as MatrixInputs;
    
    try {
      const A = MatrixFormulas.arrayToMatrix(
        matrixInputs.matrixAElements,
        matrixInputs.matrixARows,
        matrixInputs.matrixACols
      );

      let B: Matrix | undefined;
      if (matrixInputs.matrixBElements && matrixInputs.matrixBRows && matrixInputs.matrixBCols) {
        B = MatrixFormulas.arrayToMatrix(
          matrixInputs.matrixBElements,
          matrixInputs.matrixBRows,
          matrixInputs.matrixBCols
        );
      }

      let result: any = {};
      let operationDescription = '';

      switch (matrixInputs.operation) {
        case 'add':
          if (!B) throw new Error('Matrix B required for addition');
          const sum = MatrixFormulas.add(A, B);
          result.result = MatrixFormulas.formatMatrix(sum);
          operationDescription = 'Matrix Addition: A + B';
          break;

        case 'subtract':
          if (!B) throw new Error('Matrix B required for subtraction');
          const diff = MatrixFormulas.subtract(A, B);
          result.result = MatrixFormulas.formatMatrix(diff);
          operationDescription = 'Matrix Subtraction: A - B';
          break;

        case 'multiply':
          if (!B) throw new Error('Matrix B required for multiplication');
          const product = MatrixFormulas.multiply(A, B);
          result.result = MatrixFormulas.formatMatrix(product);
          operationDescription = 'Matrix Multiplication: A × B';
          break;

        case 'scalar_multiply':
          if (matrixInputs.scalarValue === undefined) throw new Error('Scalar value required');
          const scalarProduct = MatrixFormulas.scalarMultiply(A, matrixInputs.scalarValue);
          result.result = MatrixFormulas.formatMatrix(scalarProduct);
          operationDescription = `Scalar Multiplication: ${matrixInputs.scalarValue} × A`;
          break;

        case 'transpose':
          const transposed = MatrixFormulas.transpose(A);
          result.result = MatrixFormulas.formatMatrix(transposed);
          operationDescription = 'Matrix Transpose: Aᵀ';
          break;

        case 'determinant':
          const det = MatrixFormulas.determinant(A);
          result.result = det.toFixed(6);
          result.determinant = det;
          operationDescription = 'Determinant calculation using cofactor expansion';
          break;

        case 'inverse':
          const inv = MatrixFormulas.inverse(A);
          result.result = MatrixFormulas.formatMatrix(inv);
          result.determinant = MatrixFormulas.determinant(A);
          result.isInvertible = 'Yes';
          operationDescription = 'Matrix Inverse using Gauss-Jordan elimination';
          break;

        case 'rank':
          const rankValue = MatrixFormulas.rank(A);
          result.result = rankValue.toString();
          result.rank = rankValue;
          operationDescription = 'Matrix Rank using Gaussian elimination';
          break;

        case 'trace':
          const traceValue = MatrixFormulas.trace(A);
          result.result = traceValue.toFixed(6);
          result.trace = traceValue;
          operationDescription = 'Matrix Trace: sum of diagonal elements';
          break;

        case 'eigenvalues':
          const eigenvals = MatrixFormulas.eigenvalues(A);
          result.result = eigenvals.map(val => val.toFixed(6)).join(', ');
          result.eigenvalues = eigenvals.map(val => val.toFixed(6)).join(', ');
          operationDescription = 'Eigenvalue calculation';
          break;

        case 'solve_system':
          if (!matrixInputs.vectorB) throw new Error('Vector b required for system solving');
          const solution = MatrixFormulas.solveSystem(A, matrixInputs.vectorB);
          result.result = '[' + solution.map(val => val.toFixed(6)).join(', ') + ']';
          operationDescription = 'Linear System Solution: Ax = b using Gaussian elimination';
          break;

        default:
          throw new Error(`Unknown operation: ${matrixInputs.operation}`);
      }

      // Calculate additional properties for square matrices
      if (matrixInputs.matrixARows === matrixInputs.matrixACols) {
        try {
          if (!result.determinant) {
            result.determinant = MatrixFormulas.determinant(A);
          }
          if (!result.trace) {
            result.trace = MatrixFormulas.trace(A);
          }
          if (!result.rank) {
            result.rank = MatrixFormulas.rank(A);
          }
          result.isInvertible = Math.abs(result.determinant) > 1e-10 ? 'Yes' : 'No';
        } catch (error) {
          // Skip if calculation fails
        }
      }

      return {
        outputs: result,
        explanation: `${operationDescription}. Matrix A is ${matrixInputs.matrixARows}×${matrixInputs.matrixACols}.`,
        intermediateSteps: {
          'Operation': matrixInputs.operation,
          'Matrix A Dimensions': `${matrixInputs.matrixARows}×${matrixInputs.matrixACols}`,
          'Matrix B Dimensions': B ? `${matrixInputs.matrixBRows}×${matrixInputs.matrixBCols}` : 'N/A',
          'Method': operationDescription,
          'Result': result.result || 'Calculated'
        }
      };
    } catch (error) {
      throw new Error(`Matrix calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};