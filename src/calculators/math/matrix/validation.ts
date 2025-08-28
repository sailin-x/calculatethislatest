import { MatrixInputs } from './types';

export function validateMatrixInputs(inputs: MatrixInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.operation) {
    errors.push('Operation is required');
  } else {
    const validOperations = ['add', 'subtract', 'multiply', 'determinant', 'inverse', 'transpose', 'eigenvalues', 'eigenvectors', 'rank', 'trace', 'power', 'solve', 'lu_decomposition', 'qr_decomposition', 'svd'];
    if (!validOperations.includes(inputs.operation)) {
      errors.push('Invalid operation specified');
    }
  }

  if (!inputs.matrixA) {
    errors.push('Matrix A is required');
  } else {
    if (!Array.isArray(inputs.matrixA) || inputs.matrixA.length === 0) {
      errors.push('Matrix A must be a non-empty array');
    } else {
      const rows = inputs.matrixA.length;
      const firstRowLength = inputs.matrixA[0]?.length;
      
      if (!firstRowLength) {
        errors.push('Matrix A must have at least one column');
      } else {
        for (let i = 0; i < rows; i++) {
          if (!Array.isArray(inputs.matrixA[i])) {
            errors.push(`Row ${i} must be an array`);
          } else if (inputs.matrixA[i].length !== firstRowLength) {
            errors.push(`All rows must have the same length`);
          } else {
            for (let j = 0; j < inputs.matrixA[i].length; j++) {
              if (typeof inputs.matrixA[i][j] !== 'number' || isNaN(inputs.matrixA[i][j])) {
                errors.push(`Element at [${i}][${j}] must be a valid number`);
              } else if (!isFinite(inputs.matrixA[i][j])) {
                errors.push(`Element at [${i}][${j}] must be finite`);
              }
            }
          }
        }
        
        if (rows > 100 || firstRowLength > 100) {
          errors.push('Matrix dimensions are too large');
        }
      }
    }
  }

  if (inputs.precision === undefined || inputs.precision === null) {
    errors.push('Precision is required');
  } else if (inputs.precision < 0) {
    errors.push('Precision must be non-negative');
  } else if (inputs.precision > 20) {
    errors.push('Precision cannot exceed 20 decimal places');
  } else if (!Number.isInteger(inputs.precision)) {
    errors.push('Precision must be an integer');
  }

  // Optional field validation
  if (inputs.matrixB !== undefined && inputs.matrixB !== null) {
    if (!Array.isArray(inputs.matrixB) || inputs.matrixB.length === 0) {
      errors.push('Matrix B must be a non-empty array');
    } else {
      const rows = inputs.matrixB.length;
      const firstRowLength = inputs.matrixB[0]?.length;
      
      if (!firstRowLength) {
        errors.push('Matrix B must have at least one column');
      } else {
        for (let i = 0; i < rows; i++) {
          if (!Array.isArray(inputs.matrixB[i])) {
            errors.push(`Matrix B row ${i} must be an array`);
          } else if (inputs.matrixB[i].length !== firstRowLength) {
            errors.push(`All Matrix B rows must have the same length`);
          } else {
            for (let j = 0; j < inputs.matrixB[i].length; j++) {
              if (typeof inputs.matrixB[i][j] !== 'number' || isNaN(inputs.matrixB[i][j])) {
                errors.push(`Matrix B element at [${i}][${j}] must be a valid number`);
              } else if (!isFinite(inputs.matrixB[i][j])) {
                errors.push(`Matrix B element at [${i}][${j}] must be finite`);
              }
            }
          }
        }
        
        if (rows > 100 || firstRowLength > 100) {
          errors.push('Matrix B dimensions are too large');
        }
      }
    }
  }

  if (inputs.power !== undefined && inputs.power !== null) {
    if (typeof inputs.power !== 'number' || isNaN(inputs.power)) {
      errors.push('Power must be a valid number');
    } else if (!Number.isInteger(inputs.power)) {
      errors.push('Power must be an integer');
    } else if (inputs.power < -100 || inputs.power > 100) {
      errors.push('Power must be between -100 and 100');
    }
  }

  if (inputs.method !== undefined && inputs.method !== null) {
    const validMethods = ['gaussian', 'lu', 'qr', 'svd'];
    if (!validMethods.includes(inputs.method)) {
      errors.push('Invalid method specified');
    }
  }

  if (inputs.tolerance !== undefined && inputs.tolerance !== null) {
    if (typeof inputs.tolerance !== 'number' || isNaN(inputs.tolerance)) {
      errors.push('Tolerance must be a valid number');
    } else if (inputs.tolerance <= 0) {
      errors.push('Tolerance must be positive');
    } else if (inputs.tolerance > 1) {
      errors.push('Tolerance must be less than or equal to 1');
    }
  }

  // Logical validation
  if (inputs.operation && inputs.matrixA && inputs.matrixB) {
    const matrixARows = inputs.matrixA.length;
    const matrixACols = inputs.matrixA[0]?.length;
    const matrixBRows = inputs.matrixB.length;
    const matrixBCols = inputs.matrixB[0]?.length;

    if (inputs.operation === 'add' || inputs.operation === 'subtract') {
      if (matrixARows !== matrixBRows || matrixACols !== matrixBCols) {
        errors.push('Matrices must have the same dimensions for addition/subtraction');
      }
    }

    if (inputs.operation === 'multiply') {
      if (matrixACols !== matrixBRows) {
        errors.push('Matrix A columns must equal Matrix B rows for multiplication');
      }
    }
  }

  if (inputs.operation === 'power' && inputs.power === undefined) {
    errors.push('Power is required for power operation');
  }

  if (inputs.operation === 'determinant' || inputs.operation === 'inverse' || inputs.operation === 'eigenvalues' || inputs.operation === 'eigenvectors') {
    if (inputs.matrixA && inputs.matrixA.length !== inputs.matrixA[0]?.length) {
      errors.push('Matrix must be square for this operation');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
