import { BMRInputs } from './types';

export function validateBMRInputs(inputs: BMRInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (inputs.age === undefined || inputs.age === null) {
    errors.push('Age is required');
  } else if (inputs.age < 0) {
    errors.push('Age must be non-negative');
  } else if (inputs.age > 120) {
    errors.push('Age seems unusually high');
  }

  if (inputs.weight === undefined || inputs.weight === null) {
    errors.push('Weight is required');
  } else if (inputs.weight < 0) {
    errors.push('Weight must be non-negative');
  } else if (inputs.weight > 500) {
    errors.push('Weight seems unusually high');
  }

  if (inputs.height === undefined || inputs.height === null) {
    errors.push('Height is required');
  } else if (inputs.height < 0) {
    errors.push('Height must be non-negative');
  } else if (inputs.height > 300) {
    errors.push('Height seems unusually high');
  }

  if (!inputs.gender) {
    errors.push('Gender is required');
  } else if (!['male', 'female'].includes(inputs.gender)) {
    errors.push('Gender must be either male or female');
  }

  if (!inputs.activityLevel) {
    errors.push('Activity level is required');
  } else {
    const validLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
    if (!validLevels.includes(inputs.activityLevel)) {
      errors.push('Activity level must be one of: sedentary, lightly_active, moderately_active, very_active, extremely_active');
    }
  }

  // Optional field validation
  if (inputs.bodyFatPercentage !== undefined && inputs.bodyFatPercentage !== null) {
    if (inputs.bodyFatPercentage < 0) {
      errors.push('Body fat percentage must be non-negative');
    } else if (inputs.bodyFatPercentage > 100) {
      errors.push('Body fat percentage cannot exceed 100%');
    }
  }

  if (inputs.leanBodyMass !== undefined && inputs.leanBodyMass !== null) {
    if (inputs.leanBodyMass < 0) {
      errors.push('Lean body mass must be non-negative');
    } else if (inputs.weight && inputs.leanBodyMass > inputs.weight) {
      errors.push('Lean body mass cannot exceed total weight');
    }
  }

  if (inputs.targetWeight !== undefined && inputs.targetWeight !== null) {
    if (inputs.targetWeight < 0) {
      errors.push('Target weight must be non-negative');
    } else if (inputs.targetWeight > 500) {
      errors.push('Target weight seems unusually high');
    }
  }

  if (inputs.calorieDeficit !== undefined && inputs.calorieDeficit !== null) {
    if (inputs.calorieDeficit < 0) {
      errors.push('Calorie deficit must be non-negative');
    } else if (inputs.calorieDeficit > 2000) {
      errors.push('Calorie deficit seems unusually high');
    }
  }

  if (inputs.calorieSurplus !== undefined && inputs.calorieSurplus !== null) {
    if (inputs.calorieSurplus < 0) {
      errors.push('Calorie surplus must be non-negative');
    } else if (inputs.calorieSurplus > 2000) {
      errors.push('Calorie surplus seems unusually high');
    }
  }

  // Logical validation
  if (inputs.age && inputs.age < 18 && inputs.activityLevel === 'extremely_active') {
    errors.push('Extremely active level may not be appropriate for age under 18');
  }

  if (inputs.weight && inputs.height && inputs.weight > 0 && inputs.height > 0) {
    const bmi = inputs.weight / Math.pow(inputs.height / 100, 2);
    if (bmi > 60) {
      errors.push('BMI calculation suggests weight may be unusually high for height');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
