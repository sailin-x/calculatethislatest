import { GeometryInputs } from './types';

export function validateShape(value: string, allInputs?: Record<string, any>): string | null {
  const validShapes = ['circle', 'rectangle', 'triangle', 'square', 'parallelogram', 'trapezoid', 'ellipse', 'polygon', 'sphere', 'cube', 'cylinder', 'cone', 'pyramid', 'prism'];
  if (!validShapes.includes(value)) {
    return 'Shape must be one of: circle, rectangle, triangle, square, parallelogram, trapezoid, ellipse, polygon, sphere, cube, cylinder, cone, pyramid, prism';
  }
  return null;
}

export function validateOperation(value: string, allInputs?: Record<string, any>): string | null {
  const validOperations = ['area', 'perimeter', 'volume', 'surfaceArea', 'circumference', 'diagonal', 'altitude', 'angle', 'inradius', 'circumradius'];
  if (!validOperations.includes(value)) {
    return 'Operation must be one of: area, perimeter, volume, surfaceArea, circumference, diagonal, altitude, angle, inradius, circumradius';
  }
  return null;
}

export function validateLength(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Length must be a valid number';
  if (value <= 0) return 'Length must be positive';
  if (value > 1e6) return 'Length seems unusually large';
  return null;
}

export function validateWidth(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Width must be a valid number';
  if (value <= 0) return 'Width must be positive';
  if (value > 1e6) return 'Width seems unusually large';
  return null;
}

export function validateHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Height must be a valid number';
  if (value <= 0) return 'Height must be positive';
  if (value > 1e6) return 'Height seems unusually large';
  return null;
}

export function validateRadius(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Radius must be a valid number';
  if (value <= 0) return 'Radius must be positive';
  if (value > 1e6) return 'Radius seems unusually large';
  return null;
}

export function validateDiameter(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Diameter must be a valid number';
  if (value <= 0) return 'Diameter must be positive';
  if (value > 1e6) return 'Diameter seems unusually large';
  return null;
}

export function validateBase(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Base must be a valid number';
  if (value <= 0) return 'Base must be positive';
  if (value > 1e6) return 'Base seems unusually large';
  return null;
}

export function validateSide(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Side must be a valid number';
  if (value <= 0) return 'Side must be positive';
  if (value > 1e6) return 'Side seems unusually large';
  return null;
}

export function validateApothem(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Apothem must be a valid number';
  if (value <= 0) return 'Apothem must be positive';
  if (value > 1e6) return 'Apothem seems unusually large';
  return null;
}

export function validateSlantHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Slant height must be a valid number';
  if (value <= 0) return 'Slant height must be positive';
  if (value > 1e6) return 'Slant height seems unusually large';
  return null;
}

export function validateUnits(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'Units are required';
  if (value.length > 20) return 'Units description is too long';
  return null;
}

export function validatePrecision(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Precision must be non-negative';
  if (value > 20) return 'Precision cannot exceed 20 decimal places';
  if (!Number.isInteger(value)) return 'Precision must be an integer';
  return null;
}

export function validateAngleUnit(value: string, allInputs?: Record<string, any>): string | null {
  const validUnits = ['degrees', 'radians'];
  if (!validUnits.includes(value)) {
    return 'Angle unit must be either degrees or radians';
  }
  return null;
}

export function validateSides(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Number of sides must be a valid number';
  if (value < 3) return 'Number of sides must be at least 3';
  if (value > 100) return 'Number of sides seems unusually high';
  if (!Number.isInteger(value)) return 'Number of sides must be an integer';
  return null;
}
