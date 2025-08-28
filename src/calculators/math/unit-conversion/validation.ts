import { UnitConversionInputs } from './types';

export function validateUnitConversionInputs(inputs: UnitConversionInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (inputs.value === undefined || inputs.value === null) {
    errors.push('Value is required');
  } else if (isNaN(inputs.value)) {
    errors.push('Value must be a valid number');
  } else if (!isFinite(inputs.value)) {
    errors.push('Value must be finite');
  } else if (inputs.value > 1e15) {
    errors.push('Value seems unusually large');
  } else if (inputs.value < -1e15) {
    errors.push('Value seems unusually small');
  }

  if (!inputs.fromUnit || inputs.fromUnit.trim() === '') {
    errors.push('From unit is required');
  } else if (inputs.fromUnit.length > 50) {
    errors.push('From unit name is too long');
  }

  if (!inputs.toUnit || inputs.toUnit.trim() === '') {
    errors.push('To unit is required');
  } else if (inputs.toUnit.length > 50) {
    errors.push('To unit name is too long');
  }

  if (!inputs.category || inputs.category.trim() === '') {
    errors.push('Category is required');
  } else {
    const validCategories = ['length', 'area', 'volume', 'weight', 'temperature', 'pressure', 'energy', 'power', 'speed', 'time'];
    if (!validCategories.includes(inputs.category.toLowerCase())) {
      errors.push('Category must be one of: length, area, volume, weight, temperature, pressure, energy, power, speed, time');
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
  if (inputs.temperature !== undefined && inputs.temperature !== null) {
    if (inputs.temperature < -273.15) {
      errors.push('Temperature cannot be below absolute zero');
    } else if (inputs.temperature > 10000) {
      errors.push('Temperature seems unusually high');
    }
  }

  if (inputs.pressure !== undefined && inputs.pressure !== null) {
    if (inputs.pressure < 0) {
      errors.push('Pressure must be non-negative');
    } else if (inputs.pressure > 1e12) {
      errors.push('Pressure seems unusually high');
    }
  }

  if (inputs.density !== undefined && inputs.density !== null) {
    if (inputs.density < 0) {
      errors.push('Density must be non-negative');
    } else if (inputs.density > 1e6) {
      errors.push('Density seems unusually high');
    }
  }

  if (inputs.molecularWeight !== undefined && inputs.molecularWeight !== null) {
    if (inputs.molecularWeight < 0) {
      errors.push('Molecular weight must be non-negative');
    } else if (inputs.molecularWeight > 1e6) {
      errors.push('Molecular weight seems unusually high');
    }
  }

  // Logical validation
  if (inputs.fromUnit && inputs.toUnit && inputs.fromUnit.toLowerCase() === inputs.toUnit.toLowerCase()) {
    errors.push('From unit and to unit cannot be the same');
  }

  if (inputs.category && inputs.category.toLowerCase() === 'temperature') {
    if (inputs.temperature !== undefined && inputs.temperature < -273.15) {
      errors.push('Temperature cannot be below absolute zero (-273.15°C)');
    }
  }

  if (inputs.category && inputs.category.toLowerCase() === 'pressure') {
    if (inputs.pressure !== undefined && inputs.pressure < 0) {
      errors.push('Pressure cannot be negative');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
