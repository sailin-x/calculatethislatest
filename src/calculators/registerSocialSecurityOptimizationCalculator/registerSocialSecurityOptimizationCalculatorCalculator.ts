import { Calculator } from '../../engines/CalculatorEngine';
import { registerSocialSecurityOptimizationCalculatorInputs, registerSocialSecurityOptimizationCalculatorResults, registerSocialSecurityOptimizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerSocialSecurityOptimizationCalculatorCalculator implements Calculator<registerSocialSecurityOptimizationCalculatorInputs, registerSocialSecurityOptimizationCalculatorResults> {
  readonly id = 'registerSocialSecurityOptimizationCalculator';
  readonly name = 'registerSocialSecurityOptimizationCalculator Calculator';
  readonly description = 'Calculate registerSocialSecurityOptimizationCalculator values';

  calculate(inputs: registerSocialSecurityOptimizationCalculatorInputs): registerSocialSecurityOptimizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerSocialSecurityOptimizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerSocialSecurityOptimizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
