/**
 * Bulletproof validation wrapper to prevent allInputs is not defined errors
 */

export const createSafeValidator = <T = any>(
  validator: (value: T, allInputs?: Record<string, any>) => boolean
) => {
  return (value: T, allInputs?: Record<string, any>): boolean => {
    try {
      // Always provide allInputs, even if it's empty
      const safeInputs = allInputs || {};
      return validator(value, safeInputs);
    } catch (error) {
      console.error('Validation error in SafeValidator:', error);
      return false;
    }
  };
};

/**
 * Enhanced ValidationRuleFactory with bulletproof validators
 */
export class SafeValidationRuleFactory {
  static createRule(
    field: string,
    message: string,
    validator: (value: any, allInputs?: Record<string, any>) => boolean
  ) {
    return {
      field,
      type: 'custom' as const,
      message,
      validator: createSafeValidator(validator)
    };
  }

  static required(field: string, customMessage?: string) {
    return {
      field,
      type: 'required' as const,
      message: customMessage || `${field} is required`,
      validator: createSafeValidator((value, allInputs) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'number') return !isNaN(value);
        return Boolean(value);
      })
    };
  }

  static range(field: string, min?: number, max?: number, customMessage?: string) {
    return {
      field,
      type: 'range' as const,
      message: customMessage || `${field} must be between ${min || 'any'} and ${max || 'any'}`,
      validator: createSafeValidator((value, allInputs) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return false;
        if (min !== undefined && num < min) return false;
        if (max !== undefined && num > max) return false;
        return true;
      })
    };
  }

  static businessRule(
    field: string,
    validator: (value: any, allInputs?: Record<string, any>) => boolean,
    customMessage?: string
  ) {
    return {
      field,
      type: 'business' as const,
      message: customMessage || `${field} violates business rules`,
      validator: createSafeValidator(validator)
    };
  }
}
