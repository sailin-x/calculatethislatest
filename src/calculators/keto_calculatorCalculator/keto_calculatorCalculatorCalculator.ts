import { Calculator } from '../../engines/CalculatorEngine';
import { keto_calculatorCalculatorInputs, keto_calculatorCalculatorResults, keto_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class keto_calculatorCalculatorCalculator implements Calculator<keto_calculatorCalculatorInputs, keto_calculatorCalculatorResults> {
  readonly id = 'keto_calculatorCalculator';
  readonly name = 'keto_calculatorCalculator Calculator';
  readonly description = 'Calculate keto_calculatorCalculator values';

  calculate(inputs: keto_calculatorCalculatorInputs): keto_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: keto_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: keto_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
