import { GeometryInputs } from './types';

export function validateGeometryInputs(inputs: GeometryInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.shape) {
    errors.push('Shape is required');
  } else {
    const validShapes = ['circle', 'rectangle', 'triangle', 'square', 'parallelogram', 'trapezoid', 'ellipse', 'polygon', 'sphere', 'cube', 'cylinder', 'cone', 'pyramid', 'prism'];
    if (!validShapes.includes(inputs.shape)) {
      errors.push('Invalid shape specified');
    }
  }

  if (!inputs.operation) {
    errors.push('Operation is required');
  } else {
    const validOperations = ['area', 'perimeter', 'volume', 'surfaceArea', 'circumference', 'diagonal', 'altitude', 'angle', 'inradius', 'circumradius'];
    if (!validOperations.includes(inputs.operation)) {
      errors.push('Invalid operation specified');
    }
  }

  if (!inputs.units) {
    errors.push('Units are required');
  }

  if (inputs.precision === undefined || inputs.precision === null) {
    errors.push('Precision is required');
  } else if (inputs.precision < 0) {
    errors.push('Precision must be non-negative');
  } else if (inputs.precision > 20) {
    errors.push('Precision cannot exceed 20 decimal places');
  }

  if (!inputs.angleUnit) {
    errors.push('Angle unit is required');
  } else {
    const validUnits = ['degrees', 'radians'];
    if (!validUnits.includes(inputs.angleUnit)) {
      errors.push('Angle unit must be either degrees or radians');
    }
  }

  // Dimensions validation
  if (!inputs.dimensions) {
    errors.push('Dimensions are required');
  } else {
    const dims = inputs.dimensions;
    
    // Validate all dimension values
    Object.entries(dims).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push(`${key} must be a valid number`);
        } else if (value <= 0) {
          errors.push(`${key} must be positive`);
        } else if (value > 1e6) {
          errors.push(`${key} seems unusually large`);
        }
      }
    });

    // Shape-specific validation
    if (inputs.shape === 'circle' && dims.radius === undefined && dims.diameter === undefined) {
      errors.push('Circle requires either radius or diameter');
    }

    if (inputs.shape === 'rectangle' && (dims.length === undefined || dims.width === undefined)) {
      errors.push('Rectangle requires both length and width');
    }

    if (inputs.shape === 'square' && dims.side === undefined) {
      errors.push('Square requires side length');
    }

    if (inputs.shape === 'triangle' && (dims.base === undefined || dims.height === undefined)) {
      errors.push('Triangle requires both base and height');
    }

    if (inputs.shape === 'polygon' && (inputs.sides === undefined || dims.side === undefined)) {
      errors.push('Polygon requires number of sides and side length');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
