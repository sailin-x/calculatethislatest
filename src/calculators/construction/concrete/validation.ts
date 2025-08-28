import { ConcreteInputs } from './types';

export function validateConcreteInputs(inputs: ConcreteInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (inputs.length === undefined || inputs.length === null) {
    errors.push('Length is required');
  } else if (inputs.length < 0) {
    errors.push('Length must be non-negative');
  } else if (inputs.length > 1000) {
    errors.push('Length seems unusually high');
  }

  if (inputs.width === undefined || inputs.width === null) {
    errors.push('Width is required');
  } else if (inputs.width < 0) {
    errors.push('Width must be non-negative');
  } else if (inputs.width > 1000) {
    errors.push('Width seems unusually high');
  }

  if (inputs.height === undefined || inputs.height === null) {
    errors.push('Height is required');
  } else if (inputs.height < 0) {
    errors.push('Height must be non-negative');
  } else if (inputs.height > 100) {
    errors.push('Height seems unusually high');
  }

  if (inputs.thickness === undefined || inputs.thickness === null) {
    errors.push('Thickness is required');
  } else if (inputs.thickness < 0) {
    errors.push('Thickness must be non-negative');
  } else if (inputs.thickness > 50) {
    errors.push('Thickness seems unusually high');
  }

  // Optional field validation
  if (inputs.concreteStrength !== undefined && inputs.concreteStrength !== null) {
    if (inputs.concreteStrength < 0) {
      errors.push('Concrete strength must be non-negative');
    } else if (inputs.concreteStrength > 100) {
      errors.push('Concrete strength seems unusually high');
    }
  }

  if (inputs.reinforcementRatio !== undefined && inputs.reinforcementRatio !== null) {
    if (inputs.reinforcementRatio < 0) {
      errors.push('Reinforcement ratio must be non-negative');
    } else if (inputs.reinforcementRatio > 1) {
      errors.push('Reinforcement ratio cannot exceed 100%');
    }
  }

  if (inputs.load !== undefined && inputs.load !== null) {
    if (inputs.load < 0) {
      errors.push('Load must be non-negative');
    } else if (inputs.load > 1000000) {
      errors.push('Load seems unusually high');
    }
  }

  if (inputs.safetyFactor !== undefined && inputs.safetyFactor !== null) {
    if (inputs.safetyFactor < 1) {
      errors.push('Safety factor must be at least 1');
    } else if (inputs.safetyFactor > 10) {
      errors.push('Safety factor seems unusually high');
    }
  }

  if (inputs.costPerCubicMeter !== undefined && inputs.costPerCubicMeter !== null) {
    if (inputs.costPerCubicMeter < 0) {
      errors.push('Cost per cubic meter must be non-negative');
    } else if (inputs.costPerCubicMeter > 10000) {
      errors.push('Cost per cubic meter seems unusually high');
    }
  }

  if (inputs.laborCost !== undefined && inputs.laborCost !== null) {
    if (inputs.laborCost < 0) {
      errors.push('Labor cost must be non-negative');
    } else if (inputs.laborCost > 1000000) {
      errors.push('Labor cost seems unusually high');
    }
  }

  // Logical validation
  if (inputs.length && inputs.width && inputs.length > 0 && inputs.width > 0) {
    const area = inputs.length * inputs.width;
    if (area > 1000000) {
      errors.push('Total area seems unusually large');
    }
  }

  if (inputs.thickness && inputs.height && inputs.thickness > inputs.height) {
    errors.push('Thickness cannot exceed height');
  }

  if (inputs.concreteStrength && inputs.concreteStrength < 10) {
    errors.push('Concrete strength below 10 MPa may not be suitable for structural applications');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
