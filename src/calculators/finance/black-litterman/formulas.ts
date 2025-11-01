import { BlackLittermanInputs, BlackLittermanMetrics, BlackLittermanAnalysis } from './types';

// Matrix operations helper functions
function matrixMultiply(A: number[][], B: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < A.length; i++) {
    result[i] = [];
    for (let j = 0; j < B[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < A[0].length; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function matrixAdd(A: number[][], B: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < A.length; i++) {
    result[i] = [];
    for (let j = 0; j < A[0].length; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }
  return result;
}

function matrixInverse(A: number[][]): number[][] {
  // Simple 2x2 matrix inverse for demonstration
  // In production, use a proper matrix library
  if (A.length === 2 && A[0].length === 2) {
    const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    return [
      [A[1][1] / det, -A[0][1] / det],
      [-A[1][0] / det, A[0][0] / det]
    ];
  }
  throw new Error('Matrix inversion not implemented for matrices larger than 2x2');
}

function matrixTranspose(A: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < A[0].length; i++) {
    result[i] = [];
    for (let j = 0; j < A.length; j++) {
      result[i][j] = A[j][i];
    }
  }
  return result;
}

function vectorMultiply(matrix: number[][], vector: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result[i] = sum;
  }
  return result;
}

export function calculateMarketImpliedReturns(inputs: BlackLittermanInputs): number[] {
  const { marketWeights, marketReturns, riskAversion } = inputs;
  return marketWeights.map(weight => weight * riskAversion);
}

export function calculatePosteriorReturns(inputs: BlackLittermanInputs): number[] {
  const { marketCovariance, investorViews, tau } = inputs;
  const marketImpliedReturns = calculateMarketImpliedReturns(inputs);

  // Simplified Black-Litterman calculation
  // In practice, this involves complex matrix operations
  const n = marketImpliedReturns.length;

  // For simplicity, assume 2 assets
  if (n !== 2) {
    throw new Error('Simplified implementation supports only 2 assets');
  }

  // Calculate posterior returns using Black-Litterman formula
  const posteriorReturns: number[] = [];

  for (let i = 0; i < n; i++) {
    let posteriorReturn = marketImpliedReturns[i];

    // Add view impact (simplified)
    if (investorViews.assets.includes(i)) {
      const viewIndex = investorViews.assets.indexOf(i);
      const viewReturn = investorViews.returns[viewIndex];
      const confidence = investorViews.confidences[viewIndex];

      posteriorReturn = (1 - confidence) * marketImpliedReturns[i] + confidence * viewReturn;
    }

    posteriorReturns.push(posteriorReturn);
  }

  return posteriorReturns;
}

export function calculatePosteriorCovariance(inputs: BlackLittermanInputs): number[][] {
  // Simplified posterior covariance calculation
  const { marketCovariance, tau } = inputs;
  return marketCovariance.map(row => row.map(val => val * (1 + tau)));
}

export function calculateOptimalWeights(inputs: BlackLittermanInputs): number[] {
  const posteriorReturns = calculatePosteriorReturns(inputs);
  const posteriorCovariance = calculatePosteriorCovariance(inputs);
  const { riskAversion } = inputs;

  // Calculate optimal weights using mean-variance optimization
  // w = (1/λ) * Σ^(-1) * μ
  try {
    const invCovariance = matrixInverse(posteriorCovariance);
    const weights = vectorMultiply(invCovariance, posteriorReturns);
    const lambda = riskAversion;

    // Normalize weights
    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map(w => w / lambda / sum);
  } catch (e) {
    // Fallback for matrix inversion failure
    return posteriorReturns.map(() => 1 / posteriorReturns.length);
  }
}

export function calculateExpectedReturn(inputs: BlackLittermanInputs): number {
  const optimalWeights = calculateOptimalWeights(inputs);
  const posteriorReturns = calculatePosteriorReturns(inputs);

  return optimalWeights.reduce((sum, weight, i) => sum + weight * posteriorReturns[i], 0);
}

export function calculatePortfolioVolatility(inputs: BlackLittermanInputs): number {
  const optimalWeights = calculateOptimalWeights(inputs);
  const posteriorCovariance = calculatePosteriorCovariance(inputs);

  let variance = 0;
  for (let i = 0; i < optimalWeights.length; i++) {
    for (let j = 0; j < optimalWeights.length; j++) {
      variance += optimalWeights[i] * optimalWeights[j] * posteriorCovariance[i][j];
    }
  }

  return Math.sqrt(variance);
}

export function calculateSharpeRatio(inputs: BlackLittermanInputs): number {
  const expectedReturn = calculateExpectedReturn(inputs);
  const volatility = calculatePortfolioVolatility(inputs);

  return expectedReturn / volatility;
}

export function calculateViewConfidence(inputs: BlackLittermanInputs): number[] {
  return inputs.investorViews.confidences;
}

export function calculateResult(inputs: BlackLittermanInputs): number {
  return calculateExpectedReturn(inputs);
}

export function generateAnalysis(inputs: BlackLittermanInputs, metrics: BlackLittermanMetrics): BlackLittermanAnalysis {
  const sharpeRatio = metrics.sharpeRatio;
  const volatility = metrics.volatility;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (volatility > 0.2) riskLevel = 'High';
  else if (volatility > 0.1) riskLevel = 'Medium';

  const diversificationScore = Math.min(100, inputs.marketWeights.length * 10);
  const viewImpact = inputs.investorViews.confidences.reduce((a, b) => a + b, 0) / inputs.investorViews.confidences.length;
  const stabilityScore = Math.min(100, Math.max(0, (sharpeRatio + 1) * 50));

  let recommendation = '';
  if (sharpeRatio > 1.5) {
    recommendation = 'Excellent risk-adjusted returns. Strong portfolio optimization.';
  } else if (sharpeRatio > 1.0) {
    recommendation = 'Good risk-adjusted performance. Consider maintaining current strategy.';
  } else {
    recommendation = 'Suboptimal risk-adjusted returns. Review investment views and risk preferences.';
  }

  return { recommendation, riskLevel, diversificationScore, viewImpact, stabilityScore };
}