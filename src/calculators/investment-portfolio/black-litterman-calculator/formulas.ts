```typescript
import { BlackLittermanCalculatorInputs, BlackLittermanCalculatorMetrics, BlackLittermanCalculatorAnalysis } from './types';

// Helper functions for matrix and vector operations

function identity(n: number): number[][] {
  return Array.from({ length: n }, (_, i) => 
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

function matrixTranspose(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vectors must have the same length');
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function matrixTimesVector(matrix: number[][], vector: number[]): number[] {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  if (cols !== vector.length) throw new Error('Matrix columns must match vector length');
  return matrix.map(row => dotProduct(row, vector));
}

function scalarVectorMultiply(scalar: number, vector: number[]): number[] {
  return vector.map(val => scalar * val);
}

function addVectors(a: number[], b: number[]): number[] {
  if (a.length !== b.length) throw new Error('Vectors must have the same length');
  return a.map((val, i) => val + b[i]);
}

function scalarMultiplyMatrix(scalar: number, matrix: number[][]): number[][] {
  return matrix.map(row => row.map(val => scalar * val));
}

function addMatrices(A: number[][], B: number[][]): number[][] {
  const rows = A.length;
  const cols = A[0]?.length || 0;
  if (B.length !== rows || B[0]?.length !== cols) throw new Error('Matrices must have the same dimensions');
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

function zeroMatrix(n: number): number[][] {
  return Array.from({ length: n }, () => Array(n).fill(0));
}

function matrixInverse(A: number[][]): number[][] {
  const n = A.length;
  if (n !== A[0]?.length) throw new Error('Matrix must be square');
  // Create augmented matrix [A | I]
  let augmented = A.map((row, i) => [...row, ...identity(n)[i]]);
  // Gauss-Jordan elimination
  for (let i = 0; i < n; i++) {
    // Find pivot row
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    // Swap rows
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    // Check for singularity
    if (Math.abs(augmented[i][i]) < 1e-10) {
      throw new Error('Matrix is singular or nearly singular');
    }
    // Normalize pivot row
    for (let k = i; k < 2 * n; k++) {
      augmented[i][k] /= augmented[i][i];
    }
    // Eliminate column
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        const factor = augmented[j][i];
        for (let k = i; k < 2 * n; k++) {
          augmented[j][k] -= factor * augmented[i][k];
        }
      }
    }
  }
  // Extract inverse
  return augmented.map(row => row.slice(n));
}

function matrixMultiply(A: number[][], B: number[][]): number[][] {
  const m = A.length;
  const n = A[0]?.length || 0;
  const p = B[0]?.length || 0;
  if (B.length !== n) throw new Error('Incompatible matrix dimensions for multiplication');
  const result = Array.from({ length: m }, () => Array(p).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < n; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

export function calculateResult(inputs: BlackLittermanCalculatorInputs): number {
  const { marketCapWeights, covarianceMatrix, riskAversionLambda, tau, viewsP, viewsQ, viewsOmega } = inputs;
  const n = marketCapWeights.length;
  const k = viewsQ.length;

  // Validate dimensions
  if (covarianceMatrix.length !== n || covarianceMatrix[0]?.length !== n) {
    throw new Error('Covariance matrix must be n x n');
  }
  if (viewsP.length !== k || (k > 0 && viewsP[0]?.length !== n)) {
    throw new Error('Views P must be k x n');
  }
  if (viewsOmega.length !== k || (k > 0 && viewsOmega[0]?.length !== k)) {
    throw new Error('Views Omega must be k x k');
  }

  const Sigma = covarianceMatrix;
  const SigmaInv = matrixInverse(Sigma);

  // Equilibrium returns: π = λ * Σ * w_m
  const Sigma_wm = matrixTimesVector(Sigma, marketCapWeights);
  const pi = scalarVectorMultiply(riskAversionLambda, Sigma_wm);

  // (τ Σ)^{-1} = (1/τ) Σ^{-1}
  const invTauSigma = scalarMultiplyMatrix(1 / tau, SigmaInv);

  // (τ Σ)^{-1} π
  const invTauSigma_pi = matrixTimesVector(invTauSigma, pi);

  // Initialize RHS and precision addition
  let rhs = [...invTauSigma_pi];
  let prec_add = zeroMatrix(n);

  if (k > 0) {
    const OmegaInv = matrixInverse(viewsOmega);
    const PT = matrixTranspose(viewsP);

    // P^T Ω^{-1} P
    const OmegaInv_P = matrixMultiply(OmegaInv, viewsP);
    const PT_OmegaInv_P = matrixMultiply(PT, OmegaInv_P);
    prec_add = PT_OmegaInv_P;

    // P^T Ω^{-1} Q
    const OmegaInv_Q = matrixTimesVector(OmegaInv, viewsQ);
    const PT_OmegaInv_Q = matrixTimesVector(PT, OmegaInv_Q);
    rhs = addVectors(rhs, PT_OmegaInv_Q);
  }

  // Posterior precision: (τ Σ)^{-1} + P^T Ω^{-1} P
  const postPrec = addMatrices(invTauSigma, prec_add);

  // Posterior covariance: [(τ Σ)^{-1} + P^T Ω^{-1} P]^{-1}
  const postCov = matrixInverse(postPrec);

  // Posterior expected returns: μ = postCov * RHS
  const mu = matrixTimesVector(postCov, rhs);

  // Optimal weights: w = (1/λ) Σ^{-1} μ
  const SigmaInv_mu = matrixTimesVector(SigmaInv, mu);
  const optimalWeights = scalarVectorMultiply(1 / riskAversionLambda, SigmaInv_mu);

  // Portfolio expected return: w · μ
  const portfolioReturn = dotProduct(optimalWeights, mu);

  return portfolioReturn;
}

export function generateAnalysis(
  inputs: BlackLittermanCalculatorInputs,
  metrics: BlackLittermanCalculatorMetrics
): BlackLittermanCalculatorAnalysis {
  const result = metrics.result;
  const { marketCapWeights, covarianceMatrix, riskAversionLambda } = inputs;

  // Compute market equilibrium return for comparison
  const Sigma = covarianceMatrix;
  const Sigma_wm = matrixTimesVector(Sigma, marketCapWeights);
  const pi = scalarVectorMultiply(riskAversionLambda, Sigma_wm);
  const marketReturn = dotProduct(marketCapWeights, pi);

  let recommendation: string;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  if (result > marketReturn * 1.05) {
    recommendation = `The Black-Litterman model indicates an expected portfolio return of ${result.toFixed(4)} (vs. market ${marketReturn.toFixed(4)}), suggesting value in incorporating views for higher returns.`;
    riskLevel = 'High';
  } else if (result > marketReturn) {
    recommendation = `The model yields a modest improvement to ${result.toFixed(4)} over the market return of ${marketReturn.toFixed(4)}. Consider the views for slight optimization.`;
    riskLevel = 'Medium';
  } else {
    recommendation = `The posterior return of ${result.toFixed(4)} is comparable