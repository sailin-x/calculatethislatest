import { Calculator } from '../../engines/CalculatorEngine';
import { social_security_optimization_calculatorCalculatorInputs, social_security_optimization_calculatorCalculatorResults, social_security_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class social_security_optimization_calculatorCalculatorCalculator implements Calculator<social_security_optimization_calculatorCalculatorInputs, social_security_optimization_calculatorCalculatorResults> {
  readonly id = 'social_security_optimization_calculatorCalculator';
  readonly name = 'social_security_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate social_security_optimization_calculatorCalculator values';

  calculate(inputs: social_security_optimization_calculatorCalculatorInputs): social_security_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: social_security_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: social_security_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
