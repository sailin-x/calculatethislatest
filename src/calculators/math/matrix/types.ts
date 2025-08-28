export interface MatrixInputs {
  operation: 'add' | 'subtract' | 'multiply' | 'determinant' | 'inverse' | 'transpose' | 'eigenvalues' | 'eigenvectors' | 'rank' | 'trace' | 'power' | 'solve' | 'lu_decomposition' | 'qr_decomposition' | 'svd';
  matrixA: number[][];
  matrixB?: number[][];
  power?: number;
  precision: number;
  method?: 'gaussian' | 'lu' | 'qr' | 'svd';
  tolerance?: number;
}

export interface MatrixMetrics {
  result: number[][] | number | { eigenvalues: number[]; eigenvectors: number[][] };
  operation: string;
  precision: number;
  matrixA: {
    rows: number;
    columns: number;
    data: number[][];
  };
  matrixB?: {
    rows: number;
    columns: number;
    data: number[][];
  };
  properties: {
    determinant?: number;
    trace?: number;
    rank?: number;
    eigenvalues?: number[];
    eigenvectors?: number[][];
    conditionNumber?: number;
    norm?: number;
  };
  computation: {
    method: string;
    steps: number;
    timeComplexity: string;
    spaceComplexity: string;
  };
}

export interface MatrixAnalysis {
  isValid: boolean;
  matrixType: 'square' | 'rectangular' | 'identity' | 'zero' | 'diagonal' | 'symmetric' | 'hermitian' | 'orthogonal' | 'unitary';
  properties: {
    isSquare: boolean;
    isSymmetric: boolean;
    isDiagonal: boolean;
    isIdentity: boolean;
    isZero: boolean;
    isSingular: boolean;
    isInvertible: boolean;
    isPositiveDefinite: boolean;
    isOrthogonal: boolean;
  };
  recommendation: string;
  keyFeatures: string[];
  limitations: string[];
  numericalStability: {
    conditionNumber: number;
    stability: 'excellent' | 'good' | 'fair' | 'poor';
    warning?: string;
  };
  visualization: {
    dimensions: [number, number];
    sparsity: number;
    density: number;
  };
}

export interface MatrixOutputs extends MatrixMetrics {
  analysis: MatrixAnalysis;
}
