import { ValidationRule, ValidationResult, Calculator } from '../types/calculator';
import { BusinessValidation } from '../utils/businessValidation';
import { ValidationMessages } from '../utils/validationMessages';

/**
 * Advanced validation engine with contextual validation and smart suggestions
 */
export class ValidationEngine {
  private rules: Map<string, ValidationRule[]> = new Map();
  private contextualValidators: Map<string, (inputs: Record<string, any>) => ValidationResult> = new Map();

  /**
   * Register validation rules for a calculator
   */
  registerRules(calculatorId: string, rules: ValidationRule[]): void {
    this.rules.set(calculatorId, rules);
  }

  /**
   * Register contextual validator for complex business logic
   */
  registerContextualValidator(
    calculatorId: string, 
    validator: (inputs: Record<string, any>) => ValidationResult
  ): void {
    this.contextualValidators.set(calculatorId, validator);
  }

  /**
   * Validate inputs with enhanced error messages and suggestions
   */
  async validate(calculatorId: string, inputs: Record<string, any>): Promise<ValidationResult> {
    const rules = this.rules.get(calculatorId) || [];
    const contextualValidator = this.contextualValidators.get(calculatorId);
    
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};
    const suggestions: Record<string, string> = {};

    // Run basic validation rules
    for (const rule of rules) {
      try {
        const fieldValue = inputs[rule.field];
        const isValid = rule.validator(fieldValue, inputs);
        
        if (!isValid) {
          if (rule.type === 'business' && this.isWarningRule(rule)) {
            warnings[rule.field] = rule.message;
          } else {
            errors[rule.field] = rule.message;
          }
        }
      } catch (error) {
        console.error(`Validation error for field ${rule.field}:`, error);
        errors[rule.field] = 'Validation error occurred';
      }
    }

    // Run contextual validation
    if (contextualValidator) {
      try {
        const contextualResult = contextualValidator(inputs);
        Object.assign(errors, contextualResult.errors);
        if ((contextualResult as any).warnings) {
          Object.assign(warnings, (contextualResult as any).warnings);
        }
      } catch (error) {
        console.error('Contextual validation error:', error);
      }
    }

    // Generate smart suggestions
    const smartSuggestions = this.generateSmartSuggestions(calculatorId, inputs, errors, warnings);
    Object.assign(suggestions, smartSuggestions);

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
      suggestions
    } as ValidationResult & { warnings: Record<string, string>; suggestions: Record<string, string> };
  }

  /**
   * Validate a single field with immediate feedback
   */
  async validateField(
    calculatorId: string, 
    fieldName: string, 
    value: any, 
    allInputs: Record<string, any>
  ): Promise<{ error?: string; warning?: string; suggestion?: string }> {
    const rules = this.rules.get(calculatorId) || [];
    const fieldRules = rules.filter(rule => rule.field === fieldName);

    for (const rule of fieldRules) {
      try {
        const isValid = rule.validator(value, allInputs);
        if (!isValid) {
          if (rule.type === 'business' && this.isWarningRule(rule)) {
            return { warning: rule.message };
          } else {
            return { error: rule.message };
          }
        }
      } catch (error) {
        console.error(`Field validation error for ${fieldName}:`, error);
        return { error: 'Validation error occurred' };
      }
    }

    // Generate field-specific suggestion
    const suggestion = this.generateFieldSuggestion(calculatorId, fieldName, value, allInputs);
    return suggestion ? { suggestion } : {};
  }

  /**
   * Get validation rules for a calculator with auto-generated business rules
   */
  getEnhancedRules(calculator: Calculator): ValidationRule[] {
    const baseRules = calculator.validationRules;
    const enhancedRules = [...baseRules];

    // Auto-generate business rules based on calculator category
    switch (calculator.category) {
      case 'finance':
        enhancedRules.push(...this.generateFinancialRules(calculator));
        break;
      case 'health':
        enhancedRules.push(...this.generateHealthRules(calculator));
        break;
      case 'business':
        enhancedRules.push(...this.generateBusinessRules(calculator));
        break;
      case 'construction':
        enhancedRules.push(...this.generateConstructionRules(calculator));
        break;
      case 'legal':
        enhancedRules.push(...this.generateLegalRules(calculator));
        break;
    }

    return enhancedRules;
  }

  /**
   * Generate smart suggestions based on input values
   */
  private generateSmartSuggestions(
    calculatorId: string,
    inputs: Record<string, any>,
    errors: Record<string, string>,
    warnings: Record<string, string>
  ): Record<string, string> {
    const suggestions: Record<string, string> = {};

    // Only generate suggestions if there are no errors
    if (Object.keys(errors).length > 0) {
      return suggestions;
    }

    // Calculator-specific suggestions
    if (calculatorId.includes('mortgage')) {
      if (inputs.creditScore && inputs.creditScore < 740) {
        suggestions.creditScore = 'Credit scores above 740 typically qualify for the best interest rates';
      }
      if (inputs.downPayment && inputs.homePrice && (inputs.downPayment / inputs.homePrice) < 0.2) {
        suggestions.downPayment = 'Consider 20% down payment to avoid PMI and reduce monthly payments';
      }
    }

    if (calculatorId.includes('investment')) {
      if (inputs.riskTolerance === 'conservative' && inputs.age && inputs.age < 35) {
        suggestions.riskTolerance = 'Younger investors can typically afford more aggressive portfolios';
      }
    }

    if (calculatorId.includes('bmi')) {
      const bmi = this.calculateBMI(inputs.weight, inputs.height);
      if (bmi && bmi > 25 && bmi < 30) {
        suggestions.general = 'Consider consulting with a healthcare provider about healthy weight management';
      }
    }

    return suggestions;
  }

  /**
   * Generate field-specific suggestion
   */
  private generateFieldSuggestion(
    calculatorId: string,
    fieldName: string,
    value: any,
    allInputs: Record<string, any>
  ): string | null {
    // Return contextual help based on field and value
    return ValidationMessages.getContextualHelp(fieldName, value, calculatorId);
  }

  /**
   * Check if a rule should be treated as a warning
   */
  private isWarningRule(rule: ValidationRule): boolean {
    return rule.message.toLowerCase().includes('warning') || 
           rule.message.toLowerCase().includes('consider') ||
           rule.message.toLowerCase().includes('may');
  }

  /**
   * Generate financial validation rules
   */
  private generateFinancialRules(calculator: Calculator): ValidationRule[] {
    const rules: ValidationRule[] = [];
    const inputIds = calculator.inputs.map(input => input.id);

    if (inputIds.includes('homePrice') && inputIds.includes('loanAmount')) {
      rules.push(BusinessValidation.loanToValue('loanAmount', 'homePrice'));
    }

    if (inputIds.includes('monthlyDebt') && inputIds.includes('monthlyIncome')) {
      rules.push(BusinessValidation.debtToIncome('monthlyDebt', 'monthlyIncome'));
    }

    if (inputIds.includes('creditScore')) {
      rules.push(BusinessValidation.creditScore('creditScore'));
    }

    if (inputIds.includes('interestRate')) {
      rules.push(BusinessValidation.interestRate('interestRate'));
    }

    return rules;
  }

  /**
   * Generate health validation rules
   */
  private generateHealthRules(calculator: Calculator): ValidationRule[] {
    const rules: ValidationRule[] = [];
    const inputIds = calculator.inputs.map(input => input.id);

    if (inputIds.includes('age')) {
      rules.push(BusinessValidation.age('age'));
    }

    if (inputIds.includes('weight')) {
      rules.push(BusinessValidation.weight('weight'));
    }

    if (inputIds.includes('height')) {
      rules.push(BusinessValidation.height('height'));
    }

    if (inputIds.includes('bodyFat') && inputIds.includes('gender')) {
      rules.push(BusinessValidation.bodyFatPercentage('bodyFat', 'gender'));
    }

    return rules;
  }

  /**
   * Generate business validation rules
   */
  private generateBusinessRules(calculator: Calculator): ValidationRule[] {
    const rules: ValidationRule[] = [];
    const inputIds = calculator.inputs.map(input => input.id);

    if (inputIds.includes('cac') && inputIds.includes('ltv')) {
      rules.push(BusinessValidation.cacToLtvRatio('cac', 'ltv'));
    }

    if (inputIds.includes('revenueGrowth')) {
      rules.push(BusinessValidation.revenueGrowthRate('revenueGrowth'));
    }

    if (inputIds.includes('profitMargin')) {
      rules.push(BusinessValidation.profitMargin('profitMargin'));
    }

    return rules;
  }

  /**
   * Generate construction validation rules
   */
  private generateConstructionRules(calculator: Calculator): ValidationRule[] {
    const rules: ValidationRule[] = [];
    const inputIds = calculator.inputs.map(input => input.id);

    if (inputIds.includes('area')) {
      rules.push(BusinessValidation.constructionArea('area'));
    }

    return rules;
  }

  /**
   * Generate legal validation rules
   */
  private generateLegalRules(calculator: Calculator): ValidationRule[] {
    const rules: ValidationRule[] = [];
    const inputIds = calculator.inputs.map(input => input.id);

    if (inputIds.includes('settlementAmount')) {
      rules.push(BusinessValidation.settlementAmount('settlementAmount'));
    }

    return rules;
  }

  /**
   * Helper method to calculate BMI
   */
  private calculateBMI(weight: number, height: number): number | null {
    if (!weight || !height || weight <= 0 || height <= 0) return null;
    return (weight / (height * height)) * 703; // Formula for lbs/inches
  }
}