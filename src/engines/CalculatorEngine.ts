import { ValidationRule, ValidationResult, Formula, CalculationResult } from '../types/calculator';

/**
 * Core calculator engine that handles validation, calculation, and explanation generation
 * for all calculator types across the platform
 */
export class CalculatorEngine {
  private validators: Map<string, ValidationRule[]> = new Map();
  private formulas: Map<string, Formula> = new Map();
  private constants: Map<string, any> = new Map();

  constructor() {
    this.initializeConstants();
  }

  /**
   * Initialize common constants used across calculators
   */
  private initializeConstants(): void {
    // Financial constants
    this.constants.set('DAYS_PER_YEAR', 365);
    this.constants.set('MONTHS_PER_YEAR', 12);
    this.constants.set('WEEKS_PER_YEAR', 52);
    
    // Mathematical constants
    this.constants.set('PI', Math.PI);
    this.constants.set('E', Math.E);
    
    // Default precision for different calculation types
    this.constants.set('CURRENCY_PRECISION', 2);
    this.constants.set('PERCENTAGE_PRECISION', 4);
    this.constants.set('GENERAL_PRECISION', 6);
  }

  /**
   * Register validation rules for a specific calculator
   */
  registerValidationRules(calculatorId: string, rules: ValidationRule[]): void {
    this.validators.set(calculatorId, rules);
  }

  /**
   * Register a formula for a specific calculator
   */
  registerFormula(formula: Formula): void {
    this.formulas.set(formula.id, formula);
  }

  /**
   * Get a constant value
   */
  getConstant(key: string): any {
    return this.constants.get(key);
  }

  /**
   * Set a constant value
   */
  setConstant(key: string, value: any): void {
    this.constants.set(key, value);
  }

  /**
   * Validate inputs against registered validation rules
   */
  validate(calculatorId: string, inputs: Record<string, any>): ValidationResult {
    const rules = this.validators.get(calculatorId) || [];
    const errors: Record<string, string> = {};

    for (const rule of rules) {
      try {
        const isValid = rule.validator(inputs[rule.field], inputs);
        if (!isValid) {
          errors[rule.field] = rule.message;
        }
      } catch (error) {
        console.error(`Validation error for field ${rule.field}:`, error);
        errors[rule.field] = 'Validation error occurred';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Execute a calculation using a registered formula
   */
  calculate(formulaId: string, inputs: Record<string, any>): CalculationResult {
    const formula = this.formulas.get(formulaId);
    if (!formula) {
      throw new Error(`Formula with id '${formulaId}' not found`);
    }

    try {
      return formula.calculate(inputs);
    } catch (error) {
      console.error(`Calculation error for formula ${formulaId}:`, error);
      throw new Error(`Calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate a human-readable explanation of the calculation
   */
  generateExplanation(result: CalculationResult, formulaId?: string): string {
    if (result.explanation) {
      return result.explanation;
    }

    const formula = formulaId ? this.formulas.get(formulaId) : null;
    if (formula) {
      return `Calculation completed using ${formula.name}: ${formula.description}`;
    }

    return 'Calculation completed successfully.';
  }

  /**
   * Format a number based on its type and precision requirements
   */
  formatNumber(value: number, type: 'currency' | 'percentage' | 'number', precision?: number): string {
    if (isNaN(value) || !isFinite(value)) {
      return 'Invalid';
    }

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: precision || this.constants.get('CURRENCY_PRECISION'),
          maximumFractionDigits: precision || this.constants.get('CURRENCY_PRECISION')
        }).format(value);

      case 'percentage':
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: precision || this.constants.get('PERCENTAGE_PRECISION'),
          maximumFractionDigits: precision || this.constants.get('PERCENTAGE_PRECISION')
        }).format(value / 100);

      case 'number':
      default:
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: precision || this.constants.get('GENERAL_PRECISION')
        }).format(value);
    }
  }

  /**
   * Safely parse a numeric input with error handling
   */
  parseNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      // Remove common formatting characters
      const cleaned = value.replace(/[$,%\s]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
  }

  /**
   * Check if a value is within a specified range
   */
  isInRange(value: number, min?: number, max?: number): boolean {
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  }

  /**
   * Round a number to a specified number of decimal places
   */
  roundToPrecision(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  /**
   * Calculate compound interest
   */
  calculateCompoundInterest(
    principal: number,
    rate: number,
    time: number,
    compoundingFrequency: number = 12
  ): number {
    return principal * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * time);
  }

  /**
   * Calculate present value
   */
  calculatePresentValue(futureValue: number, rate: number, periods: number): number {
    return futureValue / Math.pow(1 + rate, periods);
  }

  /**
   * Calculate future value
   */
  calculateFutureValue(presentValue: number, rate: number, periods: number): number {
    return presentValue * Math.pow(1 + rate, periods);
  }

  /**
   * Calculate payment for an annuity (loan payments, etc.)
   */
  calculatePayment(principal: number, rate: number, periods: number): number {
    if (rate === 0) return principal / periods;
    return (principal * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
  }
}