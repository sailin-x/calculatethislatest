import { Calculator } from '../../engines/CalculatorEngine';
import { payback_period_calculatorCalculatorInputs, payback_period_calculatorCalculatorResults, payback_period_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class payback_period_calculatorCalculatorCalculator implements Calculator<payback_period_calculatorCalculatorInputs, payback_period_calculatorCalculatorResults> {
  readonly id = 'payback_period_calculatorCalculator';
  readonly name = 'payback_period_calculatorCalculator Calculator';
  readonly description = 'Calculate payback_period_calculatorCalculator values';

  calculate(inputs: payback_period_calculatorCalculatorInputs): payback_period_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: payback_period_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: payback_period_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
