import { Calculator } from '../../engines/CalculatorEngine';
import { SocialSecurityOptimizationCalculatorInputs, SocialSecurityOptimizationCalculatorResults, SocialSecurityOptimizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class SocialSecurityOptimizationCalculatorCalculator implements Calculator<SocialSecurityOptimizationCalculatorInputs, SocialSecurityOptimizationCalculatorResults> {
  readonly id = 'SocialSecurityOptimizationCalculator';
  readonly name = 'SocialSecurityOptimizationCalculator Calculator';
  readonly description = 'Calculate SocialSecurityOptimizationCalculator values';

  calculate(inputs: SocialSecurityOptimizationCalculatorInputs): SocialSecurityOptimizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: SocialSecurityOptimizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: SocialSecurityOptimizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
