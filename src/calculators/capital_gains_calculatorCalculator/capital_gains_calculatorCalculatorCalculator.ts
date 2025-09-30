import { Calculator } from '../../engines/CalculatorEngine';
import { capital_gains_calculatorCalculatorInputs, capital_gains_calculatorCalculatorResults, capital_gains_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class capital_gains_calculatorCalculatorCalculator implements Calculator<capital_gains_calculatorCalculatorInputs, capital_gains_calculatorCalculatorResults> {
  readonly id = 'capital_gains_calculatorCalculator';
  readonly name = 'capital_gains_calculatorCalculator Calculator';
  readonly description = 'Calculate capital_gains_calculatorCalculator values';

  calculate(inputs: capital_gains_calculatorCalculatorInputs): capital_gains_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: capital_gains_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: capital_gains_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
