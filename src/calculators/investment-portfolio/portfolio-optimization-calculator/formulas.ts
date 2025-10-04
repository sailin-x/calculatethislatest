```typescript
import { PortfolioOptimizationCalculatorInputs, PortfolioOptimizationCalculatorMetrics, PortfolioOptimizationCalculatorAnalysis } from './types';

// Domain-specific helper functions for portfolio optimization

function vectorDot(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vector length mismatch in dot product');
  }
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function matrixVectorMultiply(M: number[][], v: number[]): number[] {
  const rows = M.length;
  const cols = M[0]?.length || 0;
  if (cols !== v.length) {
    throw new Error('Dimension mismatch in matrix-vector multiplication');
  }
  const result = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i] += M[i][j] * v[j];
    }
  }
  return result;
}

function computeCovariance(standardDeviations: number[], correlations: number[][]): number[][] {
  const n = standardDeviations.length;
  if (correlations.length !== n || correlations.some(row => row.length !== n)) {
    throw new Error('Correlation matrix dimensions mismatch');
  }
  const covariance: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      covariance[i][j] = standardDeviations[i] * standardDeviations[j] * correlations[i][j];
    }
  }
  return covariance;
}

function invertMatrix(A: number[][]): number[][] {
  const n = A.length;
  if (n === 0 || A.some(row => row.length !== n)) {
    throw new Error('Invalid matrix dimensions for inversion');
  }
  // Create augmented matrix [A | I]
  const augmented: number[][] = A.map((row, i) =>
    row.map(val => Number(val)).concat(new Array(n).fill(0).map((_, j) => (i === j ? 1 : 0)))
  );
  // Gauss-Jordan elimination
  for (let p = 0; p < n; p++) {
    // Find pivot row
    let maxRow = p;
    for (let i = p + 1; i < n; i++) {
      if (Math.abs(augmented[i][p]) > Math.abs(augmented[maxRow][p])) {
        maxRow = i;
      }
    }
    // Swap rows
    [augmented[p], augmented[maxRow]] = [augmented[maxRow], augmented[p]];
    // Check for singular matrix
    if (Math.abs(augmented[p][p]) < 1e-10) {
      throw new Error('Matrix is singular and cannot be inverted');
    }
    // Normalize pivot row
    const pivot = augmented[p][p];
    for (let j = 0; j < 2 * n; j++) {
      augmented[p][j] /= pivot;
    }
    // Eliminate column
    for (let i = 0; i < n; i++) {
      if (i !== p) {
        const factor = augmented[i][p];
        for (let j = 0; j < 2 * n; j++) {
          augmented[i][j] -= factor * augmented[p][j];
        }
      }
    }
  }
  // Extract the inverse (right half)
  return augmented.map(row => row.slice(n).map(val => Number(val)));
}

interface PortfolioMetrics {
  sharpe: number;
  portReturn: number;
  portVol: number;
}

function computePortfolioMetrics(inputs: PortfolioOptimizationCalculatorInputs): PortfolioMetrics {
  const { expectedReturns: mu, standardDeviations, correlations, riskFreeRate: rf } = inputs;
  const n = mu.length;
  if (n !== standardDeviations.length || n === 0) {
    throw new Error('Invalid input dimensions for portfolio optimization');
  }
  const Sigma = computeCovariance(standardDeviations, correlations);
  const excessReturns = mu.map(m => m - rf);
  const invSigma = invertMatrix(Sigma);
  const temp = matrixVectorMultiply(invSigma, excessReturns);
  const oneVec = new Array(n).fill(1);
  const denominator = vectorDot(oneVec, temp);
  if (Math.abs(denominator) < 1e-10) {
    throw new Error('Denominator near zero; check input data for optimization');
  }
  const weights = temp.map(x => x / denominator);
  const portReturn = vectorDot(weights, mu);
  const sigmaW = matrixVectorMultiply(Sigma, weights);
  const portVar = vectorDot(weights, sigmaW);
  const portVol = Math.sqrt(portVar);
  const portExcess = portReturn - rf;
  const sharpe = portVol > 0 ? portExcess / portVol : 0;
  return { sharpe, portReturn, portVol };
}

export function calculateResult(inputs: PortfolioOptimizationCalculatorInputs): number {
  // Computes the maximum Sharpe ratio for the tangency portfolio using mean-variance optimization
  // Weights: w = [Σ⁻¹ (μ - r_f)] / [1ᵀ Σ⁻¹ (μ - r_f)]
  // Sharpe = (wᵀ μ - r_f) / √(wᵀ Σ w)
  return computePortfolioMetrics(inputs).sharpe;
}

export function generateAnalysis(
  inputs: PortfolioOptimizationCalculatorInputs,
  metrics: PortfolioOptimizationCalculatorMetrics
): PortfolioOptimizationCalculatorAnalysis {
  const { portReturn, portVol } = computePortfolioMetrics(inputs);
  const riskLevel: 'Low' | 'Medium' | 'High' =
    portVol < 0.05 ? 'Low' :
    portVol < 0.15 ? 'Medium' : 'High';
  const recommendation = `The optimized portfolio, derived from mean-variance optimization, yields an expected annual return of ${(portReturn * 100).toFixed(2)}% with an annual volatility of ${(portVol * 100).toFixed(2)}% and a maximum Sharpe ratio of ${metrics.result.toFixed(2)}. This ${riskLevel.toLowerCase()} risk profile suggests efficient diversification across the provided assets, assuming no short-selling constraints. Rebalance periodically to maintain optimality amid changing market conditions.`;
  return { recommendation, riskLevel };
}
```