import { Calculator } from '../../engines/CalculatorEngine';
import { intermittent_fasting_calculatorCalculatorInputs, intermittent_fasting_calculatorCalculatorResults, intermittent_fasting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class intermittent_fasting_calculatorCalculatorCalculator implements Calculator<intermittent_fasting_calculatorCalculatorInputs, intermittent_fasting_calculatorCalculatorResults> {
  readonly id = 'intermittent_fasting_calculatorCalculator';
  readonly name = 'intermittent_fasting_calculatorCalculator Calculator';
  readonly description = 'Calculate intermittent_fasting_calculatorCalculator values';

  calculate(inputs: intermittent_fasting_calculatorCalculatorInputs): intermittent_fasting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: intermittent_fasting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: intermittent_fasting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
